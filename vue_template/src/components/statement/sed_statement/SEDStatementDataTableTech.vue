<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :extra_params="extra_params"
                      :headers="headers"
                      :edit_form_name="edit_form_name"
                      :choices="choices"
                      disableDelete
                      use_card>
        <template slot="form">
            <SEDStatementTechForm></SEDStatementTechForm>
        </template>

    </DefaultDataTable>
</template>
<script>

    import DefaultDataTable from "../../../base/DefaultDataTable";
    import SEDStatementTechForm from "./SEDStatementTechForm";
    import config from "./conf";

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
        components: {SEDStatementTechForm, DefaultDataTable},
        data() {
            return {
                edit_form_name:'tech_statement',
                extra_params: {
                    expand: 'contractor_expand',
                    is_send_to_technician: true,
                    is_contractor_connected: false
                },
                choices: {
                    is_contractor_connected: default_yes_no,
                    is_send_to_technician: default_yes_no
                },
                headers: [{
                    text: 'Номер звернення',
                    align: 'center',
                    visible: true,
                    url: `/main/sed_statement_tech_new/`,
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
                        text: 'Дата заявки',
                        align: 'center',
                        visible: true,
                        value: 'statement_date'
                    },
                    {
                        text: 'Контрагента підключено?',
                        align: 'center',
                        visible: true,
                        widget:'boolean',
                        //choice_name: 'is_contractor_connected',
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