<template>

    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :xlsx-base-url="xlsx_base_url"
                      :static_model_params="static_model_params"
                      :headers="headers"
                      use_card
                      export-excel
                      show-diagram>
        <template slot="form">
            <ContractForm/>
        </template>
        <template slot="diagram">
            <ContractChartDiagram></ContractChartDiagram>
            <ContractChartDiagramPrice></ContractChartDiagramPrice>
            <ContractChartDiagramAccrual></ContractChartDiagramAccrual>
            <ContractChartDiagramLargestDebtors></ContractChartDiagramLargestDebtors>
        </template>
        <template slot="contractfinance.total_balance" slot-scope="{props}">
            <ColoredBadge :value="props.item.contractfinance.total_balance"> </ColoredBadge>
        </template>
        <template slot="one_time_service" slot-scope="{props}">
            <template v-if="props.item.one_time_service">
                <v-chip class="ma-2" small>K</v-chip>
            </template>
            <template v-else>
                <v-chip class="ma-2" small>П</v-chip>
            </template>

        </template>
    </DefaultDataTable>
</template>

<script>
    import ContractForm from "./ContractForm";
    import DefaultDataTable from "../../../base/DefaultDataTable";
    import config from "./config";
    import ContractChartDiagram from "./ContractChartDiagram";
    import ContractChartDiagramPrice from "./ContractChartDiagramPrice";
    import ContractChartDiagramAccrual from "./ContractChartDiagramAccrual";
    import ColoredBadge from "./ColoredBadge";
    import ContractChartDiagramLargestDebtors from "./ContractChartDiagramLargestDebtors";

    export default {
        components: {
            ContractChartDiagramLargestDebtors,
            ColoredBadge,
            ContractChartDiagramAccrual,
            ContractChartDiagramPrice, ContractChartDiagram, DefaultDataTable, ContractForm},
        data() {
            return {
                namespace: null,
                module_name: 'contract',
                base_url: `${config.domen}/contracts/contract/`,
                xlsx_base_url: `${config.domen}/contracts/xlsxcontract/`,
                static_model_params: {status:'actual'},
                headers: [{
                    text: '№ Договору',
                    align: 'left',
                    //sortable: false,
                    url: '/main/contracts-finance/',
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
                        text: 'Тип договору',
                        value: 'one_time_service',
                        visible: true,
                        sortable:false
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
                        //filter: {type: 'select_choices', value: null},
                    },
                    {
                        text: 'На контролі в бухгалтерії',
                        value: 'finance_control',
                        visible: true,
                        widget:'boolean',
                        //choice_name: 'finance_control',
                        filter: {type: 'checkbox', value: null},
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
