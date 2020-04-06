<template>
    <div>
        <v-btn v-if="!extra_fields.id" small color="primary"
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace, initial:extra_fields})">
            <v-icon>add</v-icon>
        </v-btn>
        <v-btn v-else small color="primary"
               @click="getObject({id:extra_fields.id,module:module_name,  namespace:namespace})">
            <v-icon>edit</v-icon>
        </v-btn>

        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Тип власності</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <v-flex xs12>
                                    <v-text-field label="Контрагент"
                                                  :error-messages='form_errors.name'
                                                  v-model="fields.name"
                                                  required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Адреса"
                                                  :error-messages='form_errors.address'
                                                  v-model="fields.address"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Розрахунковий рахунок"
                                                  :error-messages='form_errors.settlement_account'
                                                  v-model="fields.settlement_account"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="МФО"
                                                  :error-messages='form_errors.mfo'
                                                  v-model="fields.mfo"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="ЄДРПОУ"
                                                  :error-messages='form_errors.edrpou'
                                                  v-model="fields.edrpou"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Банк"
                                                  :error-messages='form_errors.bank_name'
                                                  v-model="fields.bank_name"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="ІПН"
                                                  :error-messages='form_errors.ipn'
                                                  v-model="fields.ipn"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Номер платника податків"
                                                  :error-messages='form_errors.certificate_number'
                                                  v-model="fields.certificate_number"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Відповідальна особа"
                                                  :error-messages='form_errors.main_unit'
                                                  v-model="fields.main_unit"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Посада відповідальної особи"
                                                  :error-messages='form_errors.main_unit_state'
                                                  v-model="fields.main_unit_state"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Телефон"
                                                  :error-messages='form_errors.phone'
                                                  v-model="fields.phone"
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="EMAIL"
                                                  :error-messages='form_errors.email'
                                                  v-model="fields.email"
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Працює на підставі" v-model="fields.work_reason"
                                                  :error-messages='form_errors.work_reason'></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <FileFieldV1 label="Статутні документи"
                                                 :errormessages='form_errors.statute_copy'
                                                 v-model="fields.statute_copy">
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
        data() {
            return {
                namespace: 'contract',
                reload_on_save: true,
                module_name: 'stage_property',
                base_url: `${this.$config.domen}/contracts/stage-property/`,

            }
        },

    }
</script>
