<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers">
        <template slot="form">
            <StatementConnectionCNAPForm/>
        </template>
    </DefaultDataTable>
</template>
<script>
    import DefaultDataTable from "../../../base/DefaultDataTable";
    import StatementConnectionCNAPForm from "./StatementConnectionCNAPForm";

    export default {
        components: {StatementConnectionCNAPForm, DefaultDataTable},
        data() {
            return {
                namespace: 'statement',
                module_name: 'sed_statement',
                base_url: `${this.$config.vulik_root}/statement/cnap-statement/`,
                headers: [{
                    text: 'Номер звернення',
                    align: 'center',
                    visible: true,
                    value: 'reg_number',
                    filter: {type: 'text', value: null, request_param: 'reg_number__icontains'},
                }, {
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
                        choice_name: 'integration_type',
                        value: 'integration_type'
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