<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <div class="headline">План платежів</div>
            </div>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <PayPlanForm :object_id="contract_id"></PayPlanForm>
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
            >
                <template slot="date_start_period" slot-scope="{ props }">
                    з {{props.item.date_start_period}} по  {{props.item.date_end_period}}
                </template>
            </BaseDataTable>
        </v-card-text>

    </v-card>


</template>

<script>
    import PayPlanForm from "./PayPlanForm";
    import BaseDataTable from "../../../../base/BaseDataTable";


    export default {
        components: {BaseDataTable, PayPlanForm},
        props: {
            contract_id: {
                type: [Number],
                default: 0,
                required: true,
            }
        },
        data() {
            return {
                namespace: 'contract',
                module_name: 'pay_plan',
                base_url: `${this.$config.domen}/contracts/pay-plan/`,
                extra_watch: {
                    param_name: 'contract__id',
                },
                extra_params: {},
                static_model_params:{
                    app_label:'contracts',
                    model:'payplan',
                },
                headers: [
                    {text: 'Період', value: 'date_start_period', visible: true},
                    {text: 'Дата нарахування', value: 'date_accrual', visible: true},
                    {text: 'кінцева дата оплати', value: 'date_pay', visible: true},
                    {text: 'Плановий платіж', value: 'size_accrual', visible: true},
                    {text: 'Дії', value: 'id', visible: true},
                ],
            }
        }
    }
</script>
