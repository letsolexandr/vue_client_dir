<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <div class="headline">Платежі</div>
            </div>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <PaymentForm :contract_id="contract_id"></PaymentForm>
        </v-card-title>
        <v-card-text>
            <BaseDataTable :namespace="namespace"
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
    import PaymentForm from "./PaymentForm";
    import BaseDataTable from "../../../../base/BaseDataTable";
    import config from "../config";
    export default {
        name: "RegisterAct",
        components: {BaseDataTable, PaymentForm},
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
                module_name: 'register_payment',
                base_url: `${config.domen}/contracts/register-payment/`,
                object_details: [],
                reload_after_delete: true,
                extra_params: {},
                extra_watch: {
                    param_name: 'contract__id',
                },
                static_model_params:{
                    app_label:'contracts',
                    model:'registerpayment',
                },
                headers: [
                    {
                        text: 'Дата сплати',
                        value: 'payment_date',
                        visible: true,
                    },
                    {
                        text: 'Сума сплати',
                        value: 'sum_payment',
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

<style scoped>

</style>