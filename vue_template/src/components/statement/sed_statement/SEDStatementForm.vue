<template>
    <div>
        <v-btn fab bottom right color="primary" dark fixed
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace})">
            <v-icon>add</v-icon>
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-overlay
                            absolute
                            :value="loadingPGBar"
                            opacity="0.8"
                    >
                        <v-progress-circular indeterminate size="64"></v-progress-circular>
                    </v-overlay>
                    <v-card-title>
                        <span class="headline">
                            Заявка на підключення до СЕВ СЕВ
                        </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Номер звернення"
                                                  :error-messages='form_errors.reg_number'
                                                  v-model="fields.reg_number"
                                                  disabled>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select label="Тип заявки"
                                              v-model="fields.statement_type"
                                              :error-messages='form_errors.statement_type'
                                              :items="choices.statement_type"
                                              item-text="display_name"
                                              item-value="value"
                                              disabled>

                                    </v-select>
                                </v-flex>
                                <!-- Інтеграція -->
                                <template v-if="fields.statement_type==='integration'">
                                    <v-flex xs12>
                                        <Autocomplete
                                                label="Пакет інтеграції"
                                                :url="`${this.$config.domen}/dict/subscription/`"
                                                v-model="fields.int_integration_type"
                                                :error_messages='form_errors.int_integration_type'
                                                disabled="1"
                                        >
                                        </Autocomplete>
                                    </v-flex>
                                    <!--                                    <v-flex xs12>-->
                                    <!--                                        <v-checkbox label="Надання доступу шляхом підключення СЕД до СЕВ ОВВ"-->
                                    <!--                                                    v-model="fields.int_access_to_SEV_OVV"-->
                                    <!--                                                    :error-messages='form_errors.int_access_to_SEV_OVV'>-->
                                    <!--                                        </v-checkbox>-->
                                    <!--                                    </v-flex>-->
                                </template>
                                <!-- Інтеграція -->
                                <!-- ВЕБ-доступ -->
                                <template v-if="fields.statement_type==='web'">
                                    <v-flex xs12>
                                        <Autocomplete
                                                label="Тарифний план"
                                                :url="`${this.$config.domen}/dict/subscription/`"
                                                v-model="fields.web_tariff_plan"
                                                :error_messages='form_errors.web_tariff_plan'
                                                disabled="1">
                                        </Autocomplete>
                                    </v-flex>

                                    <!--                                    <v-flex xs12>-->
                                    <!--                                        <v-checkbox-->
                                    <!--                                                label="Надання веб-доступу для додаткових користувачів"-->
                                    <!--                                                v-model="fields.web_access_per_month"-->
                                    <!--                                                :error-messages='form_errors.web_access_per_month'>-->
                                    <!--                                        </v-checkbox>-->
                                    <!--                                    </v-flex>-->
                                    <!--                                    <v-flex v-if="fields.web_access_per_month" xs12>-->
                                    <!--                                        <v-text-field label="Кількість додаткових користувачів"-->
                                    <!--                                                      v-model="fields.web_access_count"-->
                                    <!--                                                      :error-messages='form_errors.web_access_count'>-->
                                    <!--                                        </v-text-field>-->
                                    <!--                                    </v-flex>-->
                                    <!--                                    <v-flex xs12>-->
                                    <!--                                        <v-checkbox-->
                                    <!--                                                label='Послуги по установці на ПК користувача засобу криптографічного захисту інформації "Крипто автограф"'-->
                                    <!--                                                v-model="fields.web_service_install_crypto_autograph"-->
                                    <!--                                                :error-messages='form_errors.web_service_install_crypto_autograph'>-->
                                    <!--                                        </v-checkbox>-->
                                    <!--                                    </v-flex>-->
                                    <!--                                    <v-flex v-if="fields.web_service_install_crypto_autograph" xs12>-->
                                    <!--                                        <v-text-field label="Кількість установок крипто-автограф"-->
                                    <!--                                                      v-model="fields.crypto_autograph_count"-->
                                    <!--                                                      :error-messages='form_errors.crypto_autograph_count'>-->
                                    <!--                                        </v-text-field>-->
                                    <!--                                    </v-flex>-->
                                    <!--                                    <v-flex xs12>-->
                                    <!--                                        <v-checkbox-->
                                    <!--                                                label='Послуги по установці на ПК користувача програмного криптографічного захисту інформації CISCO U VPN-ZAS'-->
                                    <!--                                                v-model="fields.web_service_install_cisco_vpn_onPC"-->
                                    <!--                                                :error-messages='form_errors.web_service_install_cisco_vpn_onPC'>-->
                                    <!--                                        </v-checkbox>-->
                                    <!--                                    </v-flex>-->
                                    <!--                                    <v-flex xs12>-->
                                    <!--                                        <v-checkbox-->
                                    <!--                                                label='Послуги по установці на серверну частину клієнта програмного криптографічного захисту інформації CISCO U VPN-ZAS'-->
                                    <!--                                                v-model="fields.web_service_install_cisco_vpn_onServer"-->
                                    <!--                                                :error-messages='form_errors.web_service_install_cisco_vpn_onServer'>-->
                                    <!--                                        </v-checkbox>-->
                                    <!--                                    </v-flex>-->
                                    <!--                                    <v-flex xs12>-->
                                    <!--                                        <v-checkbox-->
                                    <!--                                                label='Послуги по навчанню на робочому місці користувача системи електронної взаємодії органів виконавчої влади версія 2.0'-->
                                    <!--                                                v-model="fields.web_service_study_SEV_OVV"-->
                                    <!--                                                :error-messages='form_errors.web_service_study_SEV_OVV'>-->
                                    <!--                                        </v-checkbox>-->
                                    <!--                                    </v-flex>-->
                                    <!--                                    <v-flex xs12>-->
                                    <!--                                        <v-checkbox-->
                                    <!--                                                label='Навчально-консультаційний семінар-практикум «Застосування інформаційних технологій в роботі СЕВ ОВВ» на одну особу'-->
                                    <!--                                                v-model="fields.web_seminar_use_IT_in_SEV_OVV"-->
                                    <!--                                                :error-messages='form_errors.web_seminar_use_IT_in_SEV_OVV'>-->
                                    <!--                                        </v-checkbox>-->
                                    <!--                                    </v-flex>-->
                                </template>
                                <!-- ВЕБ-доступ -->
                                <!-- Загальні -->
                                <!--                                <v-flex xs12>-->
                                <!--                                    <v-checkbox-->
                                <!--                                            label='Технічна підтримка в режимі 8/5'-->
                                <!--                                            v-model="fields.support"-->
                                <!--                                            :error-messages='form_errors.support'>-->
                                <!--                                    </v-checkbox>-->
                                <!--                                </v-flex>-->
                                <!--                                &lt;!&ndash; Додаткові &ndash;&gt;-->
                                <!--                                <div class="title mx-auto"> Додаткові послуги</div>-->
                                <!--                                <v-flex xs12>-->
                                <!--                                    <v-checkbox-->
                                <!--                                            label='Передача данних, за 1 Мб, понад тарифного плану'-->
                                <!--                                            v-model="fields.data_transfer"-->
                                <!--                                            :error-messages='form_errors.data_transfer'>-->
                                <!--                                    </v-checkbox>-->
                                <!--                                </v-flex>-->
                                <!--                                <v-flex xs12>-->
                                <!--                                    <v-checkbox-->
                                <!--                                            label='Послуги по отриманню юридично значимої електронної квитанції в СЕВ ОВВ'-->
                                <!--                                            v-model="fields.electronic_receipt"-->
                                <!--                                            :error-messages='form_errors.electronic_receipt'>-->
                                <!--                                    </v-checkbox>-->
                                <!--                                </v-flex>-->
                                <!-- Додаткові -->
                                <v-flex xs12>
                                    <DataPicker
                                            v-model="fields.statement_date"
                                            :error_messages="form_errors.statement_date"
                                            label="Дата заявки"
                                            disabled="1">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs12>
                                    <DataPicker
                                            v-model="fields.control_date"
                                            :error_messages="form_errors.control_date"
                                            label="Дата контролю"
                                            disabled="1">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs12>
                                    <Autocomplete
                                            label="Контрагент"
                                            :url="`http://10.0.200.103/api/api-base/organization/`"
                                            v-model="fields.contractor"
                                            :error_messages='form_errors.contractor'
                                            disabled="1"
                                    >
                                    </Autocomplete>
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
                                <v-flex xs12>
                                    <v-select label="Тип фінансування організації замовника"
                                              v-model="fields.finance_type"
                                              :error-messages='form_errors.finance_type'
                                              :items="choices.finance_type"
                                              item-text="display_name"
                                              item-value="value">
                                    </v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea v-show="fields.status==='4'" v-model="fields.reject_reason"
                                                label="Причина відмови"></v-textarea>

                                </v-flex>

                                <v-flex xs12>
                                    <v-checkbox v-show="fields.status==='3'"
                                                label="Відправити заявку в технічний відділ?"
                                                v-model="fields.is_send_to_technician"
                                                color="primary">
                                    </v-checkbox>
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
        <OrganizationAddForm child>

        </OrganizationAddForm>
    </div>
</template>

<script>
    import FormBase from "@/mixins/FormBase";
    import DataPicker from "../../../base/DataPicker";
    import OrganizationAddForm from "../../admin/organization/OrganizationAddForm";
    import Autocomplete from "../../../base/Autocomplete";
    import conf from "./conf";

    export default {
        components: {Autocomplete, OrganizationAddForm, DataPicker},
        mixins: [FormBase, conf],
        data() {
            return {
                loadingPGBar:false,
                allowed_to_send: ['status', 'is_contractor_connected', 'is_send_to_technician', 'status', 'reject_reason','finance_type'],
            }
        }
    }
</script>
