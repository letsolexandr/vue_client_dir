<template>
    <div>
        <v-btn small color="primary"
               @click.stop="openAddObjectForm({module:module_name, initial:Object.assign(initial,initial_expand),form_name: form_name})">
            {{btn_title}}
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="800px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Додати договір</span>
                    </v-card-title>
                    <v-card-text>
                        <LoaderBar :showLoading="loadingPGBar"/>
                        <div v-show="!loadingPGBar">
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field v-show="false"
                                                      v-model="fields.statement"
                                                      :error-messages='form_errors.statement'>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-switch label="Згенерувати номер автоматично?"
                                                  :error-messages='form_errors.automatic_number_gen'
                                                  v-model="fields.automatic_number_gen"
                                        ></v-switch>
                                    </v-flex>
                                    <v-flex v-if="!fields.automatic_number_gen" xs12>
                                        <v-text-field label="Номер договору"
                                                      :error-messages='form_errors.number_contract'
                                                      v-model="fields.number_contract"
                                                      required></v-text-field>
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
                                </v-layout>
                            </v-container>
                            <small>*indicates required field</small>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="primary" @click="dialog = false" :disabled="loadingPGBar">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="saveObject({module:module_name,form_name: form_name})" :disabled="loadingPGBar">
                            Зберегти
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
    import LoaderBar from "../../../base/LoaderBar";

    function getExpirationDate() {
        let date = `${(new Date()).getFullYear()}-12-31`
        return date;

    }

    export default {
        mixins: [FormBase],
        components: {
            LoaderBar,
            OrganizationAddForm,
            FileFieldV1,
            DataPicker,
            Autocomplete
        },
        props: {
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
        watch: {
            fields: {
                handler(newVal) {
                    this.set_start_of_contract(newVal)

                },
                deep: true
            }
        },
        data() {
            return {
                module_name: 'contract',
                form_errors: {},
                fields: {},
                loadingPGBar: false,
                initial_expand: {expiration_date: getExpirationDate()},
                form_name: 'statement_contract',
                redirect_to_card: true,
                card_url: '/main/contracts/',
                base_url: `${this.$config.domen}/statement/create-contract/`

            }
        },
        methods:{
            set_start_of_contract(newVal){
                if (newVal.start_date) {
                    let start_date = new Date(newVal.start_date);
                    let sd;
                    if (start_date.getDate() > 10) {

                        sd = new Date(start_date.getFullYear(), start_date.getMonth() + 1, 1).toLocaleDateString().split('.')
                    } else {
                        sd = new Date(start_date.getFullYear(), start_date.getMonth(), 1).toLocaleDateString().split('.')
                    }
                    //debugger
                    this.fields.start_of_contract=`${sd[2]}-${sd[1]}-${sd[0]}`

                }
            }
        }
    }
</script>
