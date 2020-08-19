<template>
    <div>
        <v-btn small fab color="primary"
               @click.stop="openAddObjectForm({module:module_name,namespace:namespace,initial: initial})">
            <v-icon>add</v-icon>
        </v-btn>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Деталі послуги</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Ціна"
                                                  v-model="fields.price"
                                                  :error-messages='form_errors.price'
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="ПДВ"
                                                  v-model="fields.pdv"
                                                  :error-messages='form_errors.pdv'
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Ціна з ПДВ"
                                                  v-model="fields.price_pdv"
                                                  :error-messages='form_errors.price_pdv'
                                                  required>

                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <DataPicker label="Початок дії тарифу"
                                                v-model="fields.start_period"
                                                :error-messages='form_errors.start_period'>

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
    import FormBase from "../../../mixins/FormBase";
    import DataPicker from "../../../base/DataPicker";

    export default {
        components: {DataPicker},
        props: {
            initial:
                {
                    type: Object,
                    required:true
                }
        },
        mixins: [FormBase],
        watch: {
            fields: {
                handler(newVal, oldVal) {

                    if (newVal.price) {
                        let price = parseFloat(newVal.price);
                        let pdv = (price * 0.2);
                        this.fields.pdv = pdv.toFixed(2);
                        this.fields.price_pdv = (price + pdv).toFixed(2);
                    }
                },
                deep: true
            }
        },
        data() {
            return {
                namespace: 'dict',
                module_name: 'product_details',
                base_url: `${this.$config.domen}/dict/product-details/`,
                form_errors:{},

            }
        },
    }
</script>
