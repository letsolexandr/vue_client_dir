<template>
    <div>
        <v-btn fab bottom right color="primary" dark fixed
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace})">
            <v-icon>add</v-icon>
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">
                            Заявка на підключення до Системи ЦНАП
                        </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Номер звернення"
                                                  :error-messages='form_errors.reg_number'
                                                  v-model="fields.reg_number"
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select label="Тип заявки"
                                              v-model="fields.statement_type"
                                              :error-messages='form_errors.statement_type'
                                              :items="choices.statement_type"
                                              item-text="display_name"
                                              item-value="value"
                                              required>

                                    </v-select>
                                </v-flex>
                                <v-flex v-if="fields.statement_type==='integration'" xs12>
                                    <v-select label="Пакет інтеграції"
                                              v-model="fields.integration_type"
                                              :error-messages='form_errors.integration_type'
                                              :items="choices.integration_type"
                                              item-text="display_name"
                                              item-value="value"
                                              required>

                                    </v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <DataPicker
                                            v-model="fields.statement_date"
                                            :error_messages="form_errors.statement_date"
                                            label="Дата заявки">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select label="Статус заявки"
                                              v-model="fields.status"
                                              :error-messages='form_errors.status'
                                              :items="choices.status"
                                              item-text="display_name"
                                              item-value="value">
                                    </v-select>
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
    import DataPicker from "../../../base/DataPicker";

    export default {
        components: {DataPicker},
        mixins: [FormBase],
        data() {
            return {
                namespace: 'statement',
                module_name: 'sed_statement',
                base_url: `${this.$config.vulik_root}/statement/cnap-statement/`

            }
        },
    }
</script>
