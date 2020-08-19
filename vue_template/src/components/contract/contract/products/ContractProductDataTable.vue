<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <div class="headline">Деталі послуг по договору</div>
            </div>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <ContractProductForm :contract_id="contract_id"></ContractProductForm>
        </v-card-title>
        <v-card-text>
            <BaseDataTable :namespace="namespace"
                           dense
                           :module_name="module_name"
                           :base_url="base_url"
                           :headers="headers"
                           :extra_params="extra_params"
                           :extra_watch="extra_watch"
                           :object_id="contract_id"
                           :static_model_params="static_model_params"
                           :reload_after_delete="reload_after_delete"
            >
            </BaseDataTable>
        </v-card-text>

    </v-card>
</template>

<script>
    import ContractProductForm from "./ContractProductForm";
    import BaseDataTable from "../../../../base/BaseDataTable";
    import config from "../config";

    export default {
        name: "ContractProductDataTable",
        components: {BaseDataTable, ContractProductForm},
        props: {
            contract_id: {
                type: Number,
                required: true,
                default: () => {
                    return 0
                }
            }
        },
        data() {
            return {
                namespace: 'contract',
                module_name: 'products',
                base_url: `${config.domen}/contracts/contract-products/`,
                object_details: [],
                reload_after_delete: true,
                extra_params: {},
                extra_watch: {
                    param_name: 'contract__id',
                },
                static_model_params:{
                    app_label:'contracts',
                    model:'contractproducts',
                },
                headers: [
                    {
                        text: 'Послуга',
                        value: '__str__',
                        visible: true,
                    },
                    {
                        text: 'Ціна',
                        value: 'price',
                        visible: true,
                    },
                    {
                        text: 'Кількість',
                        value: 'count',
                        visible: true,
                    },
                    {
                        text: 'Вартість',
                        value: 'total_price',
                        visible: true,
                    },
                    {
                        text: 'Вартість (з ПДВ)',
                        value: 'total_price_pdv',
                        visible: true,
                    },
                    {
                        text: 'Дії',
                        value: 'id',
                        visible: true,
                    },

                ],
            }
        },
    }
</script>
