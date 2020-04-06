<template>
    <div>
        <v-btn small color="primary"
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace, initial:Object.assign({contract:contract_id},initial_data)})">
            Додати послугу
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Послуга</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <Autocomplete label="Договір"
                                                  :error-messages='form_errors.contract'
                                                  v-model="fields.contract"
                                                  @loadData="loadProduct($event)"
                                                  :url="`${this.$config.domen}/contracts/contract/`"
                                    ></Autocomplete>
                                </v-flex>
                                <v-flex xs12>
                                    <Autocomplete label="Послуга"
                                                  :error-messages='form_errors.product'
                                                  v-model="fields.product"
                                                  :url="`${this.$config.domen}/dict/subscription/`"
                                    ></Autocomplete>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Кількість"
                                                  :error-messages='form_errors.count'
                                                  v-model="fields.count"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Ціна"
                                                  :error-messages='form_errors.price'
                                                  v-model="fields.price"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Вартість"
                                                  :error-messages='form_errors.total_price'
                                                  v-model="fields.total_price"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="ПДВ"
                                                  :error-messages='form_errors.pdv'
                                                  v-model="fields.pdv"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Вартість з ПДВ"
                                                  :error-messages='form_errors.total_price_pdv'
                                                  v-model="fields.total_price_pdv"
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
        watch: {
            fields: {
                handler(newVal, oldVal) {
                    if (newVal.price) {
                        let price = parseFloat(newVal.price);
                        let count = parseInt(newVal.count) || 1;
                        let total_price = count * price;
                        let pdv = (total_price * 0.2);
                        let total_price_pdv = total_price + pdv;
                        this.fields.pdv = pdv.toFixed(2);
                        this.fields.total_price = total_price.toFixed(2);
                        this.fields.price_pdv = total_price_pdv.toFixed(2);
                    }
                },
                deep: true
            }
        },
        data() {
            return {
                namespace: 'contract',
                module_name: 'subscription',
                form_errors: {},
                reload_on_save: true,
                initial_data: {count: 1},
                base_url: `${this.$config.domen}/contracts/contract-subscription/`
            }
        },
        methods: {
            loadProduct(v) {
                debugger;
            }
        }
    }
</script>
