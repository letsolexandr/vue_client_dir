<template>
    <v-card>
        <v-card-title>
            {{label}}
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table style="height: 400px; overflow: auto"
                      :loading="loading"
                      v-model="selected"
                      show-select
                      :options.sync="pagination"
                      item-key="id"
                      :headers="headers"
                      :items="getItems()"
                      :search="search"
                      class="elevation-4">

            <template v-slot:items="props">
                <td>
                    <v-checkbox
                            v-model="props.selected"
                            primary
                            hide-details
                    ></v-checkbox>
                </td>
                <td class="text-xs-left">{{ props.item.name }}</td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    //import {mapGetters, mapActions} from 'vuex';
    import axios from 'axios';

    export default {
        props: ['items', 'value', 'label', 'id', 'url', 'dataHandler'],
        components: {},
        data() {
            return {
                selected: [],
                search: '',
                loading: false,
                loaded_items: [],
                pagination: {
                    itemsPerPage: -1,
                    rowsPerPage: -1
                },
                headers: [
                    {
                        text: 'Назва',
                        align: 'left',
                        //sortable: false,
                        value: 'name'
                    }
                ]
            }
        },
        watch: {
            async value(newVal,oldVal) {
                debugger
                if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
                    return
                }
                await this.loadDataFromUrl()
                //
                if (newVal !== this.getSelectedIds()) {
                    //debugger

                    this.selected = this.getSelectedItems(null, newVal);
                }
            },
            selected (newSelected, oldSelected) {
                debugger
                if (JSON.stringify(newSelected) === JSON.stringify(oldSelected)) {
                    return
                }
                if (!newSelected || !newSelected.length) {
                    this.$emit('input', [])
                }
                let ids = this.getSelectedIds(newSelected);
                //debugger
                this.$emit('input', ids)
            },
            id: function (newid, oldid) {
                let selected = [];
                if (newid !== oldid) {
                    this.selected = selected
                } else {

                    if (!this.value || !this.value.length) {
                        this.selected = []
                    } else {
                        this.selected = this.getSelectedItems()
                    }
                }
            }
        },
        created() {
            debugger
            //this.loadDataFromUrl()
        },
        methods: {
            getItems() {
                return this.items || this.loaded_items
            },
            getSelectedIds(input_selected = null) {
                let selected = input_selected || this.selected || [];
                return selected.map((item) => {
                    return item.id
                })
            },
            getSelectedItems(input_data, input_value) {
                let data = input_data || this.getItems();
                let value = input_value || this.value;
                if (!value  ||!value.length){
                    return []
                }
                let result = data.filter((item) => {
                    if (value.indexOf(item.id) !== -1) {
                        return true
                    }
                });
                //debugger
                return result;
            },
            loadDataFromUrl() {
                if(this.getItems().length){
                    return Promise.resolve()
                }

                this.loading = true;
                if (!this.items && this.url) {
                    return axios.get(`${this.url}`)
                        .then((response) => {
                            if (this.dataHandler) {
                                this.loaded_items = this.dataHandler(response.data);
                            } else {
                                this.loaded_items = response.data.results;
                            }
                            this.loading = false;
                            this.data_loaded = true;
                        })
                        .catch(error => {
                            this.loading = false;
                            this.data_loaded = true;
                            console.log(error)

                        })
                }
            },
        }
    }
</script>
