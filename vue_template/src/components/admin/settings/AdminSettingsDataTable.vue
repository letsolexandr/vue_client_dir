<template>
<v-card>
  <v-card-title>
  Поля
  <v-spacer></v-spacer>
  <v-text-field
    v-model="search"
    append-icon="search"
    label="Пошук"
    single-line
    hide-details
  ></v-text-field>
</v-card-title>
  <v-data-table :headers="headers"
    :items="items"
    :pagination.sync="pagination"
    :server-items-length="totalItems"
    :loading="loading"

    class="elevation-1">
    <template v-slot:items="props">
      <td class="text-xs-left">{{ props.item.name }}</td>
      <td class="justify-center layout px-0">
        <v-icon small class="mr-2" @click="getObject(
                                                    {id:props.item.id,
                                                    module:table_name})">
          edit
        </v-icon>
        <v-icon small @click="openDeleteDialog({
          module:table_name,
          id:props.item.id,
          confirm_del_message:props.item.__str__})">
          delete
        </v-icon>
      </td>
    </template>

  </v-data-table>
<AdminSettingsAddForm/>
<DeleteDialog/>

 </v-card>
</template>

<script>
import config from '@/config';
import AdminSettingsAddForm from './AdminSettingsAddForm';
import DeleteDialog from '@/components/admin/DeleteDialog';
import {mapGetters, mapActions} from 'vuex';
import {pagination, search,created} from '@/js'

export default {
  components:{
              AdminSettingsAddForm,
              DeleteDialog
            },
  data() {
    return {
      base_url:`${config.domen}/api-base/admin-settings/`,
      table_name:'adminsettings',
      items: [],
      config:config,
      totalItems:null,
      loading: true,
      pagination: {},
      search: '',
      headers: [{
          text: 'Назва',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Дії',
          value: 'id'
        },
      ]
    }
  },
  watch: {
    pagination,
    search,
  },
  created
,
  methods: {
    ...mapActions([
     'getObject',
     'togleDeleteDialog',
     'openDeleteDialog',
    ]),


  }
}
</script>
