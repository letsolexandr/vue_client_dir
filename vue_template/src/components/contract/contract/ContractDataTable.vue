<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers"
                      use_card>
        <template slot="form">
            <ContractForm/>
        </template>
    </DefaultDataTable>
</template>

<script>
    import ContractForm from "./ContractForm";
    import DefaultDataTable from "../../../base/DefaultDataTable";

    export default {
        components: {DefaultDataTable, ContractForm},
        data() {
            return {
                namespace: null,
                module_name: 'contract',
                base_url: `${this.$config.domen}/contracts/contract/`,
                extra_params: {},
                headers: [{
                    text: '№ Договору',
                    align: 'left',
                    //sortable: false,
                    url: '/main/contracts/',
                    value: 'number_contract',
                    visible: true,
                    filter: {type: 'text', value: null, request_param: 'number_contract__icontains'},
                },
                    {
                        text: 'Дата заключення договору',
                        value: 'start_date',
                        visible: false,
                        filter: {type: 'date', value: null}
                    },
                    {
                        text: 'Початок дії договору',
                        value: 'start_of_contract',
                        visible: true
                    },

                    {
                        text: 'Початок оплати',
                        value: 'start_payment',
                        visible: true
                    },
                    {
                        text: 'Дата закінчення договору',
                        value: 'expiration_date',
                        visible: true
                    },
                    {
                        text: 'Контрагент',
                        value: 'contractor_name',
                        sort_value: 'contractor__name',
                        visible: true,
                        filter: {
                            type: 'autocomplete',
                            url: `${this.$config.domen}/api-base/organization/`,
                            request_param: 'contractor',
                            value: null
                        }
                    },
                    {
                        text: 'Ціна договору',
                        value: 'price_contract',
                        visible: true
                    },
                    {
                        text: 'Сума нарахувань',
                        value: 'contractfinance.total_size_accrual',
                        visible: true
                    },
                    {
                        text: 'Сума платежів',
                        value: 'contractfinance.total_size_pay',
                        visible: true,
                        filter: {
                            type: 'comparison',
                            request_param: null,
                            comparison_items: [
                                {name: ' ', value: null},
                                {name: '==', value: 'contractfinance__total_size_pay'},
                                {name: '>', value: 'contractfinance__total_size_pay__gte'},
                                {name: '<', value: 'contractfinance__total_size_pay__lte'}],
                            value: null
                        }
                    },
                    {
                        text: 'Баланс',
                        value: 'contractfinance.total_balance',
                        widget: 'colored_badge',
                        visible: true,
                        filter: {
                            type: 'comparison',
                            request_param: null,
                            comparison_items: [
                                {name: ' ', value: null},
                                {name: '==', value: 'contractfinance__total_balance'},
                                {name: '>', value: 'contractfinance__total_balance__gte'},
                                {name: '<', value: 'contractfinance__total_balance__lte'}],
                            value: null
                        }
                    },
                    {
                        text: 'Статус',
                        value: 'status',
                        visible: true,
                        choice_name: 'status',
                        filter: {type: 'select_choices', value: null},
                    },
                    {
                        text: 'Дії',
                        value: 'id',
                        visible: true
                    },
                ]
            }
        },
    }
</script>
