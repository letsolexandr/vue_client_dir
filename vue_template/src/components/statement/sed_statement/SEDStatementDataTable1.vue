<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :extra_params="extra_params"
                      :headers="headers"
                      :choices="choices"
                      >
        <template slot="form">
            <SEDStatementForm/>
        </template>
    </DefaultDataTable>
</template>
<script>
    import SEDStatementForm from "./SEDStatementForm";
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
    import {domen} from "./config";
    import conf from "./conf";
    export default {
        mixins:[conf],
        components: {DefaultDataTable, SEDStatementForm},
        data() {
            return {
                extra_params: {expand: 'contractor_expand', status: 1},
                choices: {
                    is_contractor_connected: default_yes_no,
                    is_send_to_technician: default_yes_no
                },
                headers: [{
                    text: 'Номер звернення',
                    align: 'center',
                    visible: true,
                    url: `/main/sed_statement/`,
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
                            url: `${domen}/api-base/organization/`,
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
                        value: 'status',
                        widget:'colored_badge',
                        choice_colors:{
                            '1':"#e56e8a",
                            '2':"#FDD835",
                            '3':"#81af70",
                            '4':"#a09b9a"
                        },
                    },
                    {
                        text: 'Контрагента підключено?',
                        align: 'center',
                        visible: true,
                        choice_name: 'is_contractor_connected',
                        value: 'is_contractor_connected',
                        filter: {type: 'select_choices', value: null},
                    },
                    {
                        text: 'Направлено в технічний відділ?',
                        align: 'center',
                        visible: true,
                        choice_name: 'is_send_to_technician',
                        value: 'is_send_to_technician',
                        filter: {type: 'select_choices', value: null},
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