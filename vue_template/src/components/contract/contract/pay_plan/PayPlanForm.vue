<template>
    <div>
        <v-btn small color="primary"
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace, initial:{contract:object_id}})">
            <v-icon>add</v-icon>
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Плановий платіж</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field hidden
                                                  :error-messages='form_errors.contract'
                                                  v-model="fields.contract"
                                                  disabled>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Розмір платежу"
                                                  :error-messages='form_errors.size_accrual'
                                                  v-model="fields.size_accrual"
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.date_accrual"
                                            :error_messages="form_errors.date_accrual"
                                            label="Дата нарахування">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.date_pay"
                                            :error_messages="form_errors.date_pay"
                                            label="Конроль оплати">
                                    </DataPicker>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="saveObject({module:module_name,namespace:namespace})">Зберегти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import FormBase from "@/mixins/FormBase";
    import DataPicker from "../../../../base/DataPicker";
    import FileFieldV1 from "../../../../base/FileFieldV1";

    export default {
        components: {FileFieldV1, DataPicker},
        mixins: [FormBase],
        props: {
            object_id: {
                type: Number,
                default: 0,
                required: true
            }
        },
        data() {
            return {
                namespace: 'contract',
                module_name: 'pay_plan',

                base_url: `${this.$config.domen}/contracts/pay-plan/`,

            }
        },
    }
</script>
