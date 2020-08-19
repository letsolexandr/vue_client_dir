<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers"
                      :choices="choices"
                      use_card>
    </DefaultDataTable>
</template>
<script>
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
import conf from "./conf";
    export default {
        mixins:[conf],
        components: {DefaultDataTable},
        data() {
            return {
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
                        text: 'Статус',
                        align: 'center',
                        visible: true,
                        choice_name: 'status',
                        value: 'status',
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