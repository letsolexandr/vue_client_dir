<template>
  <div>
  <v-layout row justify-center>
    <v-dialog v-model="value" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Налаштування</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12  sm6 >
                <v-text-field label="Назва" v-model="fields.name"
                :error-messages='form_errors.name'
                ></v-text-field>
              </v-flex>
              <v-flex xs12  sm6 >
                <v-text-field label="Група" v-model="fields.group"
                :error-messages='form_errors.group'
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="changeVisible(false)">Закрити</v-btn>
          <v-btn color="primary"
          @click="saveItem()">Зберегти</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      fields:{},
      form_errors:{}
  }
},
watch:{
  data: {
      handler: function (val, oldVal) {
        this.fields = val
      },
      deep: true
    },
},
  methods: {
    changeVisible(value){
      this.$emit('input',value)
    },
    saveItem () {
      this.$emit('update:data',this.fields)
      this.$emit('input',false)
    }
  }
}
</script>
