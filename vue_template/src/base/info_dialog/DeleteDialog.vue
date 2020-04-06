<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="700">
            <v-card>
                <v-card-title class="headline warning">Ви дійсно хочете видалити {{title}} ?</v-card-title>
                <v-card-text>

                    <template v-if="related_objects.length">
                        <div class="title">
                            Будуть видалені пов'язані обєкти!
                        </div>
                        <v-treeview :items="related_objects" open-all></v-treeview>
                    </template>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="confirmDelete()">Так</v-btn>
                    <v-btn color="green" @click="close()">Ні</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
    import axios from 'axios';
    import {reloadPage} from '@/js'
    //import {mapActions} from 'vuex';

    export default {
        name: "deleteDialog",
        data() {
            return {
                dialog: false,
                message: null,
                reload_after_delete: true,
                related_objects: [],
                module_name: 'info_dialog',
                form_name: 'deleteDialog',
                reload_on_save: true,
                update_element: null,
                title: null,
                delete_url: null,
                object_id: null
            }
        },
        mounted() {
            this.$store.dispatch('addFormToStore', {
                module_name: this.module_name,
                form: this,
                form_name: this.form_name
            })
                .then(() => {
                })
                .catch((err) => {
                })
        },
        methods: {
            reloadPage,
            open({base_url, id, update_element, reload_after_delete}) {
                //debugger
                if (typeof reload_after_delete !== 'undefined') {
                    this.reload_after_delete = reload_after_delete
                }

                this.clear_data()
                this.update_element = update_element
                let url = `${base_url}${id}`
                this.delete_url = url
                let params = {fields: 'id,related_objects,is_protected,__str__'}
                axios.get(url, {params}).then((response) => {
                        this.title = response.data.__str__
                        this.related_objects = response.data.related_objects
                        if (response.data.is_protected){
                            this.$store.dispatch('showMessage', {message: 'Обєкт захищено від видалення! Звернітся до адміністратора.'})
                            return
                        }
                        this.dialog = true
                    }
                ).catch((error) => {
                    this.clear_data()
                    console.log(error)
                })
            },
            confirmDelete(mode) {
                const params = {mode}
                axios.delete(this.delete_url, {params}).then((response) => {
                        //debugger
                        if (this.reload_after_delete) {
                            this.reloadPage()
                        }
                        this.update_element.reloadData()
                        this.$store.dispatch('showMessage', {message: 'Видалено'})
                        this.clear_data()
                    }
                ).catch((error) => {
                    this.clear_data()
                    this.$store.dispatch('handleError', {error})
                    console.log(error)
                })

            },
            clear_data() {
                this.message = null
                this.title = null
                this.dialog = false
                this.delete_url = null
                this.update_element = null
            },
            close() {
                this.clear_data()
            }
        }
    }
</script>
