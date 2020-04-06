<template>
    <extendDataTable :namespace="namespace"
                     :module_name="module_name"
                     :base_url="base_url"
                     :headers="headers"
                     :choices="choices"
                     :custom_filters="custom_filters"
                     :static_model_params="static_model_params"
                     :extra_params="extra_params">
        <template slot="form">
            <RegisterAccrualForm></RegisterAccrualForm>
        </template>
        <template slot="table-actions">
            <CalculateAccrualForm></CalculateAccrualForm>
        </template>
    </extendDataTable>
</template>
<script>
    import RegisterAccrualForm from "./RegisterAccrualForm";
    import CalculateAccrualForm from "./CalculateAccrualForm";
    import extendDataTable from "./extendDataTable";

    const accrual_months = [

        {display_name: 'Січень', value: 1},
        {display_name: 'Лютий', value: 2},
        {display_name: 'Березень', value: 3},
        {display_name: 'Квітень', value: 4},
        {display_name: 'Травень', value: 5},
        {display_name: 'Червень', value: 6},
        {display_name: 'Липень', value: 7},
        {display_name: 'Серпень', value: 8},
        {display_name: 'Вересень', value: 9},
        {display_name: 'Жовтень', value: 10},
        {display_name: 'Листопад', value: 11},
        {display_name: 'Грудень', value: 12},
    ];
    export default {
        //mixins:[BaseDataTable],
        components: {CalculateAccrualForm, extendDataTable, RegisterAccrualForm},
        data() {
            return {
                namespace: null,
                module_name: 'register_accurual',
                extra_params: {expand: 'contract'},
                static_model_params: {
                    app_label: 'contracts',
                    model: 'registeraccrual',
                },
                choices: {
                    year: [
                        {display_name: '2020', value: 2020},
                        {display_name: '2019', value: 2019},
                        {display_name: '2018', value: 2018}],
                    accrual_months: accrual_months,
                },
                base_url: `${this.$config.domen}/contracts/register-accurual/`,
                custom_filters: [
                    {
                        text: 'Рік',
                        choice_name: 'year',
                        value: 'year',
                        filter: {
                            type: 'select_choices', value: 1900 + (new Date()).getYear(),
                            request_param: 'date_accrual__year'
                        },
                    },
                    {
                        text: 'Місяць',
                        choice_name: 'accrual_months',
                        value: 'month',

                        filter: {
                            type: 'select_choices', value: (new Date()).getMonth() + 1,
                            request_param: 'date_accrual__month',
                        },
                    },
                ],

                headers: [{
                    text: '№ Договору',
                    align: 'left',
                    visible: true,
                    value: 'contract.__str__',
                    filter: {
                        type: 'autocomplete',
                        url: `${this.$config.domen}/contracts/contract/`,
                        request_param: 'contract__id',
                        value: null
                    }
                },
                    {
                        text: 'Розмір нарахування',
                        align: 'left',
                        visible: true,
                        value: 'size_accrual'
                    },
                    {
                        text: 'Дата нарахування',
                        align: 'left',
                        visible: true,
                        value: 'date_accrual',
                        filter: {type: 'date', value: null}
                    },
                    {text: 'Рахунок', value: 'accrual_docx', visible: true, widget: 'href'},
                    {
                        text: 'Розмір нарахування',
                        align: 'left',
                        visible: true,
                        value: 'size_accrual'
                    },
                    {
                        text: 'Дата відправлення рахунку',
                        align: 'left',
                        visible: true,
                        value: 'date_sending_doc'
                    },
                    {
                        text: 'Дії',
                        visible: true,
                        value: 'id'
                    },
                ]
            }
        },

    }
</script>
