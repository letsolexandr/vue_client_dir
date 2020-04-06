<template>
    <div>
        <v-btn fab bottom right color="primary" dark fixed
               @click.stop="openAddObjectForm({module:module_name})">
            <v-icon>add</v-icon>
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Нарахування</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <Autocomplete
                                            label="Догвір"
                                            :url="`${this.$config.domen}/contracts/contract/`"
                                            v-model="fields.contract"
                                            :error-messages='form_errors.contract'
                                            model="contract">
                                    </Autocomplete>
                                </v-flex>
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.payment_date"
                                            :error_messages="form_errors.payment_date"
                                            label="Дата платежу">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Розмір платежу"
                                                  :error-messages='form_errors.sum_payment'
                                                  v-model="fields.sum_payment"
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
    import DataPicker from "../../../base/DataPicker";

    export default {
        mixins: [FormBase],
        components: {
            DataPicker,
            Autocomplete
        },
        data() {
            return {
                namespace: null,
                module_name: 'register_payment',
                base_url: `${this.$config.domen}/contracts/register-payment/`

            }
        },
    }
</script>
