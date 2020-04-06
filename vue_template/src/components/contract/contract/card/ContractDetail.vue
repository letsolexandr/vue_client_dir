<template>
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
                        <a v-show="object_details.contract_docx" :href="object_details.contract_docx" target="_blank">{{getFileName(object_details.contract_docx)}}</a><br>
                        <v-btn :loading="btn_loading" small color="primary" v-show="object_details.contract_docx"
                               @click="generateDoc">Згенерувати заново
                        </v-btn>
                        <v-btn :loading="btn_loading" small color="primary" v-show="!object_details.contract_docx"
                               @click="generateDoc">Згенерувати
                        </v-btn>
                    </p>
                </v-flex>

            </v-layout>
        </v-card-text>
    </v-card>
</template>
<script>
    import axios from 'axios';
    import {getFileName} from "../../../../js";

    export default {
        name: "ContractDetail",
        props: ['contract_id'],
        data() {
            return {
                base_url: `${this.$config.domen}/contracts/contract/`,
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
            getFileName,
            getStyle(value) {
                return {color: value > 0 ? 'green' : 'red'};
            },
            getData() {
                let url = this.base_url + this.contract_id

                axios.get(url).then((response) => {
                        this.object_details = response.data
                    }
                ).catch((error) => {
                    console.log(error)
                })
            },
            generateDoc() {
                this.btn_loading = true;
                let url = `${this.$config.domen}/api-base/rpc`
                const params = {
                    app_label: 'contracts',
                    model: 'contract',
                    method: 'generate_doc_and_save',
                    pk: this.contract_id
                };

                axios.get(url, {params}).then((response) => {
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