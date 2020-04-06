<template>
  <div>
  <v-btn fab bottom right color="primary" dark fixed
  @click.stop="openAddObjectForm('adminsettings')">
    <v-icon>add</v-icon>
  </v-btn>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Налаштування</span>
          <p style="color:red">{{form_errors.non_field_errors}}</p>
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
              <v-flex xs12>
                <TableWidget
                v-model="fields.data"
                :headers="headers" 
                label='Налаштування'/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
          <v-btn color="primary"
          @click="saveObject({module:'adminsettings'})">Зберегти</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>
import config from '@/config';
import Autocomplete from '@/components/base/Autocomplete';
//import EditSettingsWidget from './settingwidget/EditSettingsWidget';
import TableWidget from '@/components/base/datatablewidget/TableWidget';


import {mapGetters, mapActions} from 'vuex';
  export default {
    components: {
      Autocomplete,
      TableWidget
    },
      data() {
        return {
        dialog:false,
        fields:{},
        config:config,
        form_errors:{name:null,
                     group:null,
                     data:null},
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
    created() {
    let self = this;
    this.$store.dispatch('addFormToStore',{name:'adminsettings', form:self});
  },
    methods: {
      ...mapActions([,
        'openAddObjectForm',
        'saveObject'
      ])
}

  }
</script>
