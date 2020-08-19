<template>
    <div>
        <v-btn small color="primary"
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace, initial:Object.assign({contract:contract_id,start_period,end_period},initial_data)})">
            Додати
        </v-btn>
        <v-layout row>
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
                                                  @loadData="loadProductPrice($event)"
                                                  :url="`${config.domen}/contracts/contract/`"
                                    ></Autocomplete>
                                </v-flex>
                                <v-flex xs12>
                                    <Autocomplete label="Послуга"
                                                  :error-messages='form_errors.product'
                                                  v-model="fields.product"
                                                  :url="`${config.domen}/dict/subscription/`"
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
                                <v-flex xs12>
                                    <v-text-field label="Вартість з ПДВ"
                                                  :error-messages='form_errors.total_price_pdv'
                                                  v-model="fields.total_price_pdv"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.start_period"
                                            :error_messages="form_errors.start_period"
                                            label="Початок дії тарифу">
                                    </DataPicker>
                                </v-flex>
                                <v-flex xs6>
                                    <DataPicker
                                            v-model="fields.end_period"
                                            :error_messages="form_errors.end_period"
                                            label="Закінчення дії тарифу">
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
                               @click="saveObject({module:module_name, namespace:namespace})">Зберегти
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import Autocomplete from '../../../../base/Autocomplete';
    import FormBase from "../../../../mixins/FormBase";
    import DataPicker from "../../../../base/DataPicker";
    import axios from 'axios';
    import config from "../config";

    export default {
        props: {
            contract_id: {
                type: Number,
                default: 0,
            },
            start_period: {
                type: String,
                required: false,
            },
            end_period: {
                type: String,
                required: false,
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
                    debugger
                    if (newVal.product !== this._cashed_subscription_id) {
                        this.loadProductPrice(newVal.product);
                        return
                    }

                    this.handlePrice(newVal.price);


                },
                deep: true
            }
        },
        data() {
            return {
                namespace: 'contract',
                module_name: 'subscription',
                form_errors: {},
                config,
                _cashed_subscription_id:null,
                reload_on_save: true,
                initial_data: {count: 1},
                base_url: `${config.domen}/contracts/contract-subscription/`,
                subscription_url: `${config.domen}/api/dict/subscription/`,
            }
        },
        methods: {
            handlePrice(new_price) {
                if(!new_price){
                    return
                }
                let price = parseFloat(new_price);
                let count = parseInt(this.fields.count) || 1;
                let total_price = count * price;
                let pdv = (total_price * 0.2);
                let total_price_pdv = total_price + pdv;
                this.fields.price = price;
                this.fields.pdv = parseFloat(pdv.toFixed(2));
                this.fields.total_price = total_price;
                this.fields.total_price_pdv = parseFloat(total_price_pdv.toFixed(2));
                this.$forceUpdate();


            },
             loadProductPrice(subscription_id) {
                 debugger
                if (!subscription_id || this.fields.total_price_pdv){
                    return
                }

                 axios.get(this.subscription_url + subscription_id,)
                    .then((response) => {
                        debugger
                        this._cashed_subscription_id = subscription_id;
                        this.fields.price = response.data.price;
                        this.handlePrice(response.data.price);


                    })
                    .catch(error => {
                        debugger
                        console.log(error)
                    })
             ;
            }
        }
    }
</script>
