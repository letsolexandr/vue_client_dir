<template>
    <BaseDataTable :namespace="namespace"
                   :module_name="module_name"
                   :base_url="base_url"
                   :headers="headers"
                   :choices="choices"
                   :custom_filters="custom_filters"
                   :static_model_params="static_model_params"
                   :extra_params="extra_params">
        <template slot="form">
            <RegisterPaymentForm></RegisterPaymentForm>
        </template>
    </BaseDataTable>
</template>
<script>

    import RegisterPaymentForm from "./RegisterPaymentForm";
    import BaseDataTable from "../../../base/BaseDataTable";


    export default {
        components: {BaseDataTable, RegisterPaymentForm},
        data() {
            return {
                namespace: null,
                module_name: 'register_payment',
                extra_params: {expand: 'contract'},
                static_model_params: {
                    app_label: 'contracts',
                    model: 'registerpayment',
                },
                base_url: `${this.$config.domen}/contracts/register-payment/`,
                headers: [{
                    text: '№ Договору',
                    align: 'left',
                    visible: true,
                    value: 'contract_data.__str__',
                    filter: {
                        type: 'autocomplete',
                        url: `${this.$config.domen}/contracts/contract/`,
                        request_param: 'contract__id',
                        value: null
                    }
                },
                    {
                        text: 'Розмір платежу',
                        align: 'left',
                        visible: true,
                        value: 'sum_payment'
                    },
                    {
                        text: 'Дата платежу',
                        align: 'left',
                        visible: true,
                        value: 'payment_date',
                        filter: {type: 'date', value: null}
                    },
                    {
                        text: 'Контрагент',
                        align: 'left',
                        visible: true,
                        value: 'contractor_name'
                    },
                    {
                        text: 'Дії',
                        visible: true,
                        value: 'id'
                    },
                ]
            }
        }
    }
</script>
