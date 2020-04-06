<template>
    <div>
        <v-btn v-if="!child" fab bottom right color="primary" dark fixed
               @click.stop="openAddObjectForm('organization')">
            <v-icon>add</v-icon>
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Організація</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs6>
                                    <v-text-field label="ЕДРПОУ*" v-model="fields.edrpou"
                                                  :error-messages='form_errors.edrpou'
                                                  hint="це поле обовязкове"
                                                  append-icon="mdi-account-search"
                                                  @click:append="searchEdrpou($event)"
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Назва*" v-model="fields.name"
                                                  hint="це поле обовязкове"
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Повна назва*" v-model="fields.full_name"
                                                hint="це поле обовязкове"
                                                required>

                                    </v-textarea>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Розрахунковий рахунок" v-model="fields.settlement_account"
                                                  :error-messages='form_errors.settlement_account'
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select label="Тип розрахункового рахунку"
                                              v-model="fields.bank"
                                              :error-messages='form_errors.bank'
                                              :items="choices.bank"
                                              item-text="display_name"
                                              item-value="value">
                                    </v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="МФО" v-model="fields.mfo"
                                                  :error-messages='form_errors.mfo'
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Номер свідотства ПДВ" v-model="fields.certificate_number"
                                                  :error-messages='form_errors.certificate_number'
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="ІПН" v-model="fields.ipn"
                                                  :error-messages='form_errors.ipn'
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Банк" v-model="fields.bank_name"
                                                  :error-messages='form_errors.bank_name'
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Уповноважена особа:" v-model="fields.main_unit"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Посада уповноваженої особи" v-model="fields.main_unit_state"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Адреса" v-model="fields.address"
                                                required>
                                    </v-textarea>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Статус" v-model="fields.status"
                                                  required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field label="Телефон" v-model="fields.phone"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field label="Факс" v-model="fields.fax"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Email" v-model="fields.email"
                                                  :error-messages='form_errors.email'></v-text-field>
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
                                <v-flex xs12>
                                    <v-text-field label="Сайт" v-model="fields.site"
                                                  :error-messages='form_errors.site'></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Примітка" v-model="fields.note"
                                                required>
                                    </v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>Для реєстрації потрібно заповнити всі поля, позначені *</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="dialog = false">Закрити</v-btn>
                        <v-btn color="primary"
                               @click="saveObject({module:'organization'})">Зберегти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import store from '@/store';
    import axios from 'axios';
    import FormBase from "@/mixins/FormBase";
    import Autocomplete from '@/base/Autocomplete';
    import FileFieldV1 from "../../../base/FileFieldV1";

    export default {
        mixins: [FormBase],
        props: {
            child: {
                type: Boolean,
                default: false
            },
        },
        components: {
            FileFieldV1,
            Autocomplete
        },
        data() {
            //debugger
            return {
                store: store,
                module_name: 'organization',
                base_url: `${this.$config.domen}/api-base/organization/`,
            }
        },
        methods: {
            searchEdrpou(event) {
                //debugger
                const url = 'https://edr.data-gov-ua.org/graphql/'
                const params = {
                    query: `{
                    companies(searchByEdrpou: ${this.fields.edrpou}) {
                    edges {
                        node {
                            id
                            officialName
                            name
                            address
                            edrpou
                            mainPerson
                            occupation
                            status
                        }
                    }
                }
                }`
                };
                axios.get(url, {
                    params: params
                }).then((response) => {
                        if (response.data.data.companies.edges.length) {
                            let data = response.data.data.companies.edges[0].node
                            this.fields.full_name = data.officialName;
                            this.fields.edrpou = data.edrpou;
                            this.fields.name = data.name;
                            this.fields.address = data.address;
                            this.fields.main_unit = data.mainPerson;
                            this.fields.status = data.status;
                            this.fields.main_activity_text = data.occupation;
                        } else {
                            this.$store.state.info_dialog.infoDialog.open({
                                message: 'Такий ЄДРПОУ не знайдено в реєстрі ЄДРПОУ',
                                title: 'Реєстр ЕДРПОУ'
                            })
                        }
                    }
                ).catch((error) => {
                    this.$store.state.info_dialog.infoDialog.open({
                        message: 'Помилка вводу ЄДРПОУ. код може містити лише цифри та не може починатись з нуля.',
                        title: 'Реєстр ЕДРПОУ'
                    })
                })
            }
        }
    }
</script>
