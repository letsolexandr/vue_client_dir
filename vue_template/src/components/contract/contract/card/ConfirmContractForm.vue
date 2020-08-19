<template>
    <div>

        <v-btn x-small block
               @click="getObject({id:id,
                                  form_name: form_name,
                                  module: module_name})">
            Підтвердити укладання договору
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
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.start_of_contract"
                                            :error_messages="form_errors.start_of_contract"
                                            label="Дата початку дії договору">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.expiration_date"
                                            :error_messages="form_errors.expiration_date"
                                            label="Дата закінчення договору">
                                    </DataPicker>
                                </v-flex>


                                <v-flex xs12>
                                    <v-text-field label="Ціна договору(За місяць)"
                                                  :error-messages='form_errors.price_contract_by_month'
                                                  v-model="fields.price_contract_by_month"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Вартість додаткових послуг та підключення"
                                                  :error-messages='form_errors.price_additional_services'
                                                  v-model="fields.price_additional_services"
                                                  required>
                                    </v-text-field>
                                </v-flex>


                                <v-flex xs12>
                                    <FileFieldV1 label="Копія договору"
                                                 :errormessages='form_errors.copy_contract'
                                                 v-model="fields.copy_contract">
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
                allowed_to_send: ['id', 'start_of_contract', 'expiration_date', 'price_contract_by_month',
                    'price_additional_services', 'copy_contract','status'],
                module_name: 'contract',
                static_form_fields: {status:'actual'},
                form_name: 'confirm_contract_form',
                reload_on_save: true,
                file_fields: ['copy_contract'],
                config,
                base_url: `${config.domen}/contracts/contract/`

            }
        },
    }
</script>
