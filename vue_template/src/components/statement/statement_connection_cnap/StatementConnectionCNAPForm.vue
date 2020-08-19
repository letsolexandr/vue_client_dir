<template>
    <div>
        <!--<v-btn fab bottom right color="primary" dark fixed
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace})">
            <v-icon>add</v-icon>
        </v-btn>-->
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
                                    <v-text-field label="Скорочена назва ЦНАП"
                                                  :error-messages='form_errors.short_name_cnap'
                                                  v-model="fields.short_name_cnap"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Адреса ЦНАП"
                                                  :error-messages='form_errors.address_cnap'
                                                  v-model="fields.address_cnap"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="ЄДРПОУ ЦНАП"
                                                  :error-messages='form_errors.edrpou_cnap'
                                                  v-model="fields.edrpou_cnap"
                                                  required>
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field label="Телефон"
                                                  :error-messages='form_errors.phone_cnap'
                                                  v-model="fields.phone_cnap"
                                                  required>
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field label="ЄДРПОУ органу, що прийняв рішення про створення ЦНАП"
                                                  :error-messages='form_errors.edrpou_manage_company'
                                                  v-model="fields.edrpou_manage_company"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select disabled label="Тип інтегратора"
                                              v-model="fields.cnap_user"
                                              :error-messages='form_errors.cnap_user'
                                              :items="choices.cnap_user"
                                              item-text="display_name"
                                              item-value="value">
                                    </v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-show="fields.cnap_user==='1'"  disabled label="Імя"
                                                  :error-messages='form_errors.first_name'
                                                  v-model="fields.first_name"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-show="fields.cnap_user==='1'" disabled label="По батькові"
                                                  :error-messages='form_errors.middle_name'
                                                  v-model="fields.middle_name"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-show="fields.cnap_user==='1'" disabled label="Прізвище"
                                                  :error-messages='form_errors.last_name'
                                                  v-model="fields.last_name"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field  v-show="fields.cnap_user==='1'" disabled label="Електронна пошта"
                                                  :error-messages='form_errors.mail_integrator'
                                                  v-model="fields.mail_integrator"
                                                  required>
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <DataPicker
                                            v-model="fields.date_add"
                                            :error_messages="form_errors.date_add"
                                            label="Дата заявки">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs12>
                                    <FileFieldV1 label="Розшифрований документ"
                                                 :errormessages='form_errors.decrypted_doc'
                                                 v-model="fields.decrypted_doc">
                                    </FileFieldV1>
                                </v-flex>
                                <v-flex xs12 >
                                    <FileFieldV1 v-show="fields.cnap_user==='1'" label="Сертифікат"
                                                 :errormessages='form_errors.ecp_certificate'
                                                 v-model="fields.ecp_certificate">
                                    </FileFieldV1>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select :disabled="['3','4'].indexOf(fields.status)!==-1" label="Статус заявки"
                                              v-model="fields.status"
                                              :error-messages='form_errors.status'
                                              :items="choices.status"
                                              item-text="display_name"
                                              item-value="value">
                                    </v-select>
                                </v-flex>
                                <v-flex xs12>
                                <v-textarea v-show="fields.status==='4'" v-model="fields.reject_reason"
                                            label="Причина відмови"></v-textarea>
                                </v-flex>

                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn  color="primary"
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
    import FileFieldV1 from "../../../base/FileFieldV1";

    export default {
        components: {FileFieldV1, DataPicker},
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
