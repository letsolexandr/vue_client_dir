<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <div class="headline">Деталі послуг по договору</div>
            </div>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <DetailForm :contract_id="contract_id"></DetailForm>
        </v-card-title>
        <v-card-text>
            <BaseDataTable :namespace="namespace"
                           dense="1"
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
    import DetailForm from "./DetailForm";
    import BaseDataTable from "../../../../base/BaseDataTable";

    export default {
        name: "DetailDataTable",
        components: {BaseDataTable, DetailForm},
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
                module_name: 'subscription',
                base_url: `${this.$config.domen}/contracts/contract-subscription/`,
                object_details: [],
                reload_after_delete: true,
                extra_params: {},
                extra_watch: {
                    param_name: 'contract__id',
                },
                static_model_params:{
                    app_label:'contracts',
                    model:'contractsubscription',
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
