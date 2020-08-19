<template>
    <div>
        <v-btn v-if="!child" fab bottom right color="primary" dark fixed
               @click.stop="openAddObjectForm({module:module_name})">
            <v-icon>add</v-icon>
        </v-btn>
        <v-btn v-else small color="primary"
               @click.stop="openAddObjectForm({module:module_name, initial:initial})">
            {{btn_title}}
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
                                    <Autocomplete
                                            label="Батьківський елемент"
                                            :url="`${config.domen}/contracts/contract/`"
                                            v-model="fields.parent_element"
                                            :error-messages='form_errors.parent_element'>
                                    </Autocomplete>
                                </v-flex>
                                <v-flex xs12>
                                    <Autocomplete
                                            label="Заявка"
                                            :url="`${config.domen}/statement/sed-statement/`"
                                            v-model="fields.statement"
                                            :error-messages='form_errors.statement'>
                                    </Autocomplete>
                                </v-flex>

                                <v-flex xs6>
                                    <v-text-field label="Номер договору"
                                                  :error-messages='form_errors.number_contract'
                                                  v-model="fields.number_contract"
                                                  required></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-checkbox label="Згенерувати автоматично"
                                                  v-model="fields.automatic_number_gen"
                                                  ></v-checkbox>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Предмет договору"
                                                :error-messages='form_errors.subject_contract'
                                                v-model="fields.subject_contract"
                                                required>

                                    </v-textarea>
                                </v-flex>
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.start_date"
                                            :error_messages="form_errors.start_date"
                                            label="Дата початку договору">
                                    </DataPicker>
                                </v-flex>
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
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.start_payment"
                                            :error_messages="form_errors.start_payment"
                                            label="Дата початку оплати">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs12>
                                    <Autocomplete
                                            label="Контрагент"
                                            :url="`${config.domen}/api-base/organization/`"
                                            v-model="fields.contractor"
                                            model="organization"
                                            :error_messages='form_errors.contractor'
                                    >
                                    </Autocomplete>
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
                                    <v-text-field label="Ціна договору (Загальна вартість)"
                                                  :error-messages='form_errors.price_contract'
                                                  v-model="fields.price_contract"
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
                               @click="saveObject({module:module_name})">Зберегти
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

    import FormBase from "@/mixins/FormBase";
    import DataPicker from "@/base/DataPicker";
    import FileFieldV1 from "@/base/FileFieldV1";
    import OrganizationAddForm from "../../admin/organization/OrganizationAddForm";
    import config from "./config";

    export default {
        mixins: [FormBase],
        components: {
            OrganizationAddForm,
            FileFieldV1,
            DataPicker,
            Autocomplete
        },
        props: {
            child: {
                type: Boolean,
                required: false,
                default: false
            },
            btn_title: {
                type: String,
                default: '+'
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
                module_name: 'contract',
                form_errors: {},
                redirect_to_card: true,
                card_url: '/main/contracts/',
                file_fields: ['copy_contract'],
                config,
                base_url: `${config.domen}/contracts/contract/`

            }
        },
    }
</script>
