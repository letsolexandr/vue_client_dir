<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :extra_params="extra_params"
                      :headers="headers"
                      :edit_form_name="edit_form_name"
                      :choices="choices">
        <template slot="form">
            <SEDStatementTechForm/>
        </template>

    </DefaultDataTable>
</template>
<script>
    import SEDStatementTechForm from "./SEDStatementTechForm";
    import DefaultDataTable from "../../../base/DefaultDataTable";

    const default_yes_no = [
        {
            value: false,
            display_name: 'Ні'
        },
        {
            value: true,
            display_name: 'Так'
        },
        {
            value: null,
            display_name: 'Не вказано'
        }
    ];

    export default {
        components: {DefaultDataTable, SEDStatementTechForm},
        data() {
            return {
                namespace: 'statement',
                module_name: 'sed_statement',
                edit_form_name:'tech_statement',
                base_url: `${this.$config.domen}/statement/sed-statement/`,
                extra_params: {
                    expand: 'contractor_expand', is_send_to_technician: true,
                    is_contractor_connected: true
                },
                choices: {
                    is_contractor_connected: default_yes_no,
                    is_send_to_technician: default_yes_no
                },
                headers: [{
                    text: 'Номер звернення',
                    align: 'center',
                    visible: true,
                    value: 'reg_number',
                    filter: {type: 'text', value: null, request_param: 'reg_number__icontains'},
                },
                    {
                        text: 'Контрагент',
                        value: 'contractor_expand.__str__',
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
                        text: 'Тип заявки',
                        align: 'center',
                        visible: true,
                        choice_name: 'statement_type',
                        value: 'statement_type',
                        filter: {type: 'select_choices', value: null},
                    },
                    {
                        text: 'Тип інтеграції',
                        align: 'center',
                        visible: true,
                        choice_name: 'int_integration_type',
                        value: 'int_integration_type'
                    },
                    {
                        text: 'Дата заявки',
                        align: 'center',
                        visible: true,
                        value: 'statement_date'
                    },
                    {
                        text: 'Статус',
                        align: 'center',
                        visible: true,
                        choice_name: 'status',
                        value: 'status'
                    },
                    {
                        text: 'Контрагента підключено?',
                        align: 'center',
                        visible: true,
                        choice_name: 'is_contractor_connected',
                        value: 'is_contractor_connected',

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