<template>
    <div>

        <v-btn x-small block
               @click="getObject({id:id,
                                  form_name: form_name,
                                  module: module_name})">
            Відпривити в архів
        </v-btn>

        <v-layout row justify-center>

            <v-dialog v-model="dialog" persistent max-width="800px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Договір</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <v-flex xs12>
                                    <v-text-field label="Вкажіть причину перенесення в архів"
                                                  :error-messages='form_errors.change_status_reason'
                                                  v-model="fields.change_status_reason"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="saveObject({module:module_name,form_name:form_name})">Зберегти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <OrganizationAddForm child></OrganizationAddForm>
    </div>
</template>

<script>
    import Autocomplete from '@/base/Autocomplete';

    import FormBase from "../../../../mixins/FormBase";
    import DataPicker from "@/base/DataPicker";
    import FileFieldV1 from "@/base/FileFieldV1";
    import OrganizationAddForm from "../../../admin/organization/OrganizationAddForm";
    import config from "../config";

    export default {
        mixins: [FormBase],
        components: {
            OrganizationAddForm,
            FileFieldV1,
            DataPicker,
            Autocomplete
        },
        props: {
            id: {
                type: Number,
                required: true,

            },
            initial: {
                type: Object,
                required: false,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                allowed_to_send: ['id', 'status','change_status_reason'],
                module_name: 'contract',
                static_form_fields: {status:'archive'},
                form_name: 'confirm_contract_form',
                reload_on_save: true,
                config,
                base_url: `${config.domen}/contracts/contract/`

            }
        },
    }
</script>
