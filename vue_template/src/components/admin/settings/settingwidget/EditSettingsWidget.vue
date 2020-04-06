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
      
      <td class="text-xs-left">{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.group }}</td>
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
  <EditSettingsForm
  :data="cur_data"
  v-model="form_visible"
  @update:data="updateData($event)"
  />
</div>
</template>
<script>
import EditSettingsForm from './EditSettingsForm';
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: () => 'XXXXX'
    }
  },
  components: {
    EditSettingsForm
  },
  data() {
    return {
      form_visible:false,
      cur_data:null,
      headers: [{
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
            text: 'Group',
            align: 'left',
            sortable: false,
            value: 'group'
          },
        {
          text: 'Дії',
          sortable: false,
          value: 'id'
        },
      ]

    }
  },

  methods: {
    getMaxID(){
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
