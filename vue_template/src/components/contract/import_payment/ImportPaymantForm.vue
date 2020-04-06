<template>
    <div>
        <v-btn small color="primary" class="mx-2"
               @click.stop="openAddObjectForm({module:module_name,form_name: form_name})">
            Імпортувати платежі
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Імпорт обмінного файлу</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>

                                    <FileFieldV1 label="Початок періоду" outlined
                                                 :errormessages='form_errors.in_file'
                                                 v-model="fields.in_file">
                                    </FileFieldV1>

                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="uploadPayment()">Завантажити
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import axios from 'axios';
    import FormBase from "@/mixins/FormBase";
    import FileFieldV1 from "../../../base/FileFieldV1";


    export default {
        mixins: [FormBase],
        props: {
            upload_element: {
                type: Object,
                required: true,
                default: ()=>{return {}}
            }
        },
        components: {
            FileFieldV1,
        },
        data() {
            return {
                namespace: null,
                form_name: 'upload_paument',
                fields: {in_file: null},
                module_name: 'register_payment_import',
                base_url: `${this.$config.domen}/contracts/upload-client-bunk/`

            }
        },
        methods: {
            uploadPayment() {
                this.LoaderBar = true;
                let info_dialog = this.$store.state.info_dialog.infoDialog;
                const url = this.base_url;
                const form_data = new FormData()
                form_data.append('in_file', this.fields.in_file)
                this.dialog = false;
                info_dialog.open({
                    title: 'Імпорт платежів',
                    message: 'Це може зайняти деякий час. Будь ласка, дочекайтесь закінчення ...',
                    show_loader: true,
                    disabled_close: true
                });
                debugger
                axios.post(url, form_data).then((response) => {
                        info_dialog.open({
                            title: 'Успішно',
                            message: 'Імпорт платежів закінчено',
                            disabled_close: false,
                            update_element: this.upload_element
                        });
                        this.fields.in_file = null;
                    }
                ).catch((error) => {
                    debugger
                    this.loaderBar = false;
                    this.fields.in_file = null;
                    info_dialog.close();
                    this.form_errors = null;
                    this.dialog = true;
                })
            }
        }
    }
</script>
