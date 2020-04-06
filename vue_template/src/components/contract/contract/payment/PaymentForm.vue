<template>
    <div>
        <v-btn small color="primary"
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace, initial:{contract:contract_id}})">
            Додати платіж
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Платіж</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <Autocomplete label="Номер Договору"
                                                  :error-messages='form_errors.contract'
                                                  v-model="fields.contract"
                                                  :url="`${this.$config.domen}/contracts/contract/`"
                                    ></Autocomplete>
                                </v-flex>
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.payment_date"
                                            :error_messages="form_errors.payment_date"
                                            label="Дата оплати">
                                    </DataPicker>
                                </v-flex>

                                <v-flex xs6>
                                    <v-text-field label="Розмір сплати"
                                                  :error-messages='form_errors.sum_payment'
                                                  v-model="fields.sum_payment"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="saveObject({module:module_name, namespace:namespace})">Зберегти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import Autocomplete from '@/base/Autocomplete';
    import FormBase from "@/mixins/FormBase";
    import DataPicker from "../../../../base/DataPicker";

    export default {
        props: {
            contract_id: {
                type: Number,
                default: 0,
            }
        },
        mixins: [FormBase],
        components: {
            DataPicker,
            Autocomplete
        },
        data() {
            return {
                namespace: 'contract',
                module_name: 'register_payment',
                form_errors: {},
                reload_on_save: true,
                fields: {
                    contract: null,
                    payment_date: null,
                    sum_payment: null
                },
                base_url: `${this.$config.domen}/contracts/register-payment/`
            }
        },
    }
</script>
