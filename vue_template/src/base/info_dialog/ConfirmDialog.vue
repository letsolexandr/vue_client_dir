<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="700">
            <v-card>
                <v-card-title class="headline warning">{{title}}</v-card-title>
                <v-card-text>
                    {{message}}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="confirmAction()">Так</v-btn>
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

    export default {
        name: "confirmDialog",
        data() {
            return {
                dialog: false,
                message: null,
                reload_after_action: true,
                module_name: 'info_dialog',
                form_name: 'confirmDialog',
                reload_on_save: true,
                update_element: null,
                title: null,
                default_title: 'Підтвердження операції',
                action_params: null,
                action: null,

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
            open(action, action_params, update_element, message, title, reload_after_action) {
                this.dialog = true;
                this.title = title || this.default_title;
                this.message = message;
                this.action = action;
                this.action_params = action_params;
                this.update_element = update_element;
                this.reload_after_action = reload_after_action;
            },
            confirmAction() {
                const self = this;
                const action = this.action(this.action_params);
                action.then((response) => {
                        debugger

                        let message = response.data.result.message;
                        let title = response.data.result.status_ua;
                        self.$store.state.info_dialog.infoDialog.open({
                            title: title,
                            message: message,
                            update_element: self.update_element
                        });

                        /* necessarily call after */
                        self.close();
                    }
                ).catch((error) => {
                    console.log(error);
                    debugger
                    let message;
                    try {
                        message = error.response.data.detail
                    }
                    catch(error) {
                        message = error.message;
                    }

                    self.$store.state.info_dialog.infoDialog.open({
                        title: error.name,
                        message: message,
                        update_element: this.update_element
                    });
                })
            },
            clear_data() {
                this.message = this.default_title
                this.title = null
                this.dialog = false
                this.update_element = null
            },
            close() {
                this.clear_data()
            }
        }
    }
</script>
