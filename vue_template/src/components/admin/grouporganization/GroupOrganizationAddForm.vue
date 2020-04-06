<template>
  <div>
  <v-btn fab bottom right color="primary" dark fixed
  @click.stop="openAddObjectForm('group-organization')">
    <v-icon>add</v-icon>
  </v-btn>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Організація</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Назва" v-model="fields.name"
                hint="це поле обовязкове"
                required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
          <v-btn color="primary"
          @click="saveObject({module:'group-organization'})">Зберегти</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </div>
</template>

<script>
import config from '@/config';
import {mapGetters, mapActions} from 'vuex';
  export default {
      data() {
        return {
        dialog:false,
        fields:{},
        config:config,
        form_errors:{name:null,
                     area:null,},
      }
        },
    created() {
    let self = this;
    this.$store.dispatch('addFormToStore',{name:'group-organization', form:self});
  },
    methods: {
      ...mapActions([,
        'openAddObjectForm',
        'saveObject'
      ]),
      updateField(evt,field){
        this.fields[field]=evt;
      }
}

  }
</script>
