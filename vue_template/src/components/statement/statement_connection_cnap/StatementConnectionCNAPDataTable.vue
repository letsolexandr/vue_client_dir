<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers"
                      disable-delete>
        <template slot="form">
            <StatementConnectionCNAPForm/>
        </template>
    </DefaultDataTable>
</template>
<script>
    import DefaultDataTable from "../../../base/DefaultDataTable";
    import StatementConnectionCNAPForm from "./StatementConnectionCNAPForm";
    import TableBase from "@/mixins/TableBase"

    export default {
        mixins: [TableBase],
        components: {StatementConnectionCNAPForm, DefaultDataTable},
        data() {
            return {
                namespace: 'statement',
                module_name: 'sed_statement',
                base_url: `${this.$config.vulik_root}/statement/cnap-statement/`,
                headers: [
                    {
                        text: 'Унікальний номер заяви',
                        align: 'center',
                        visible: true,
                        value: 'unique_uuid',
                    },
                    {
                        text: 'Орган що створив ЦНАП',
                        align: 'center',
                        visible: true,
                        value: 'name_manage_company',
                        filter: {type: 'text', value: null, request_param: 'name_manage_company__icontains'},
                    }, {
                        text: 'ЄДРПОУ органу, що прийняв рішення про створення ЦНАП',
                        align: 'center',
                        visible: true,
                        value: 'edrpou_manage_company',
                    },
                    {
                        text: 'Дата заявки',
                        align: 'center',
                        visible: true,
                        widget:'date',
                        value: 'date_add',
                    },
                    {
                        text: 'ЄДРПОУ ЦНАП',
                        align: 'center',
                        visible: true,
                        value: 'edrpou_cnap'
                    }, {
                        text: 'ЦНАП',
                        align: 'center',
                        visible: true,
                        value: 'short_name_cnap'
                    },
                    {
                        text: 'Розшифрований документ',
                        align: 'center',
                        visible: true,
                        value: 'decrypted_doc',
                        widget: 'href'
                    },
                    {
                        text: 'Тип інтегратора',
                        align: 'center',
                        visible: true,
                        choice_name: 'cnap_user',
                        value: 'cnap_user',
                        filter: {type: 'select_choices', value: null},
                    },
                    {
                        text: 'Статус',
                        align: 'center',
                        visible: true,
                        choice_name: 'status',
                        widget:'colored_badge',
                        choice_colors:{
                            '1':"#e56e8a",
                            '2':"#FDD835",
                            '3':"#81af70",
                            '4':"#a09b9a"
                        },
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