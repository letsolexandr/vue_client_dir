<template>
<div>
  <v-toolbar text color="white">
    <v-toolbar-title>{{label}}</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn small  color="primary" dark class="mb-2" @click="addItem">Додати</v-btn>
  </v-toolbar>
  <v-data-table :headers="headers"
    :items="value"
    class="elevation-1">
    <template v-slot:items="props">

      <td  v-for="val in getValues(props.item)"  class="text-xs-left">{{ val }}</td>
      <td class="justify-center layout px-0">
        <v-icon small class="mr-2" @click="editItem(props.item.id)">
          edit
        </v-icon>
        <v-icon small @click="deleteItem(props.item.id)">
          delete
        </v-icon>
      </td>
    </template>
  </v-data-table>
  <slot name="form">
  <EditForm
  :data="cur_data"
  v-model="form_visible"
  @update:data="updateData($event)"
  />
  </slot>
</div>
</template>
<script>
import EditForm from './EditForm';
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array
    },
    label: {
      type: String,
      default: () => 'XXXXX'
    }
  },
  components: {
    EditForm
  },
  data() {
    return {
      form_visible:false,
      cur_data:null,
    }
  },

  methods: {
    getValues(item){
      /**/
      let data = []
      this.headers.forEach((el)=>{
      //  debugger
        let d = item[el.value]
        if (el.value!='id'){
          data.push(d)
        }
      })
      //debugger
      return data
    },
    getMaxID(){
      /**/
      var max_id = 0
      this.value.forEach((item)=>{
        //debugger
        if(item.id>=max_id){
          max_id = item.id+1
        }
      })
      return max_id
    },
    addItem() {
      this.cur_data={id:this.getMaxID()}
      //this.$emit('input',this.cur_data)
      this.form_visible= true;
    },
    editItem(id) {
      this.cur_data=this.value.filter((item)=>{
        if(item.id==id){
          return true
        }
      })[0]
      this.form_visible= true;
    },
    changeVisible() {
      this.form_visible= true;
    },
    updateData(data) {
      let _value=Object.assign([],this.value)
      //debugger

      let index = this.value.filter((item)=>{
        if(item.id==data.id){
          return true
        }
      })
      //debugger
      if (index.length){
        _value[index[0]]=data
      }
      else{
          _value.push(data)
      }

      this.$emit('input',_value)

    },
    deleteItem(id) {
      debugger
      var index
      this.value.forEach((item, i)=>{
        if(item.id==id){
        index = i
        }
      })
      debugger
      this.$delete(this.value, index)
    }
  }
}
</script>
