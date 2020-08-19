<template>
    <v-container>
        <template v-if="object_details.number_contract">
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline"> Договір: {{object_details.number_contract}}</div>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Статус:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                <template v-if="object_details.status==='future'">
                                    <v-chip color="warning">Укладається</v-chip>
                                </template>
                                <template v-if="object_details.status==='actual'">
                                    <v-chip color="success">Укладений</v-chip>
                                </template>
                                <template v-if="object_details.status==='archive'">
                                    <v-chip color="error">Архів</v-chip>
                                </template>

                            </p>
                        </v-flex>
                        <template v-if="object_details.status==='future'">
                            <v-flex xs12>
                                <ConfirmContractForm :id="object_details.id"></ConfirmContractForm>
                            </v-flex>
                        </template>
                        <template v-if="object_details.status==='actual'">
                            <v-flex xs12>
                                <SendToArchiveContractForm :id="object_details.id"></SendToArchiveContractForm>
                            </v-flex>
                        </template>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Укладений:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.start_date}}
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Початок сплати:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.start_payment}}
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Предмет договору:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.subject_contract}}
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Контрагент:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.contractor_name}}
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Вартість договору:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.price_contract}}
                            <p/>
                        </v-flex>

                        <v-flex xs6>
                            <p class="text-sm-left">
                                Тарифний план (за місяць):
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.price_contract_by_month}}
                            <p/>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Вартість підключення та дод. послуг:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.price_additional_services}}
                            <p/>
                        </v-flex>
                        <template v-if="object_details.contractfinance">
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    Нараховано:
                                </p>
                            </v-flex>
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    {{object_details.contractfinance.total_size_accrual}}
                                <p/>
                            </v-flex>
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    Сплачено:
                                </p>
                            </v-flex>
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    {{object_details.contractfinance.total_size_pay}}
                                <p/>
                            </v-flex>
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    Баланс:
                                </p>
                            </v-flex>
                            <v-flex xs6>
                                <p class="text-sm-left" :style="getStyle(object_details.contractfinance.total_balance)">
                                    <template v-if="object_details.contractfinance.total_balance>0">+</template>
                                    {{object_details.contractfinance.total_balance}}
                                <p/>
                            </v-flex>
                        </template>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Дата закінчення:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.expiration_date}}
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Проект договору:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                <a v-show="object_details.contract_docx" :href="object_details.contract_docx"
                                   target="_blank">{{getFileName(object_details.contract_docx)}}</a><br>
                                <v-btn :loading="btn_loading" small color="primary"
                                       v-show="object_details.contract_docx"
                                       @click="generateDoc">Згенерувати заново
                                </v-btn>
                                <v-btn :loading="btn_loading" small color="primary"
                                       v-show="!object_details.contract_docx"
                                       @click="generateDoc">Згенерувати
                                </v-btn>
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Копія договору:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                <a :href="object_details.copy_contract"
                                   target="_blank">{{getFileName(object_details.copy_contract)}}</a><br>
                            </p>
                        </v-flex>

                    </v-layout>
                </v-card-text>
            </v-card>
        </template>
        <template v-else>
            <v-skeleton-loader
                    class="mx-auto"
                    max-width="600"
                    height="600"
                    type="card, article, actions"
            ></v-skeleton-loader>
        </template>
    </v-container>
</template>
<script>

    import {mapActions} from 'vuex';
    import {getFileName} from "../../../../js";
    import config from "../config";
    import ConfirmContractForm from "./ConfirmContractForm";
    import SendToArchiveContractForm from "./SendToArchiveContractForm";

    export default {
        name: "ContractDetail",
        components: {SendToArchiveContractForm, ConfirmContractForm},
        props: ['contract_id'],
        data() {
            return {
                base_url: `${config.domen}/contracts/contract/`,
                object_details: {},
                btn_loading: false,
            }
        },
        watch: {
            contract_id(newContractId, oldId) {
                // debugger
                if (newContractId) {
                    this.getData()
                }
            }
        },
        methods: {
            ...mapActions([
                'openAddObjectForm',
                'saveObject',
                'getObject',
            ]),
            getFileName,
            getStyle(value) {
                return {color: value > 0 ? 'green' : 'red'};
            },
            getData() {
                let url = this.base_url + this.contract_id

                this.axios.get(url).then((response) => {
                        this.object_details = response.data
                    }
                ).catch((error) => {
                    console.log(error)
                })
            },
            generateDoc() {
                this.btn_loading = true;
                let url = `${config.domen}/contracts/generate-contract-doc/${this.contract_id}/`

                this.axios.patch(url,).then((response) => {
                        this.btn_loading = false;
                        this.getData()

                    }
                ).catch((error) => {
                    this.btn_loading = false;
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>