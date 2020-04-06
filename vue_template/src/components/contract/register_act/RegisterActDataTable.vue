<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers"
                      :choices="choices"
                      :extra_params="extra_params"
    >
        <template slot="form">
            <RegisterActForm></RegisterActForm>
        </template>
    </DefaultDataTable>
</template>
<script>

    import DefaultDataTable from "../../../base/DefaultDataTable";
    import RegisterActForm from "./RegisterActForm";

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
        components: {RegisterActForm, DefaultDataTable},
        data() {
            return {
                namespace: null,
                module_name: 'register_act',
                base_url: `${this.$config.domen}/contracts/register-act/`,
                extra_params: {expand: 'contract'},
                static_model_params: {
                    app_label: 'contracts',
                    model: 'registeract',
                },
                choices: {
                    is_send_successful: default_yes_no,
                },
                headers: [
                    {
                        text: '№ акту',
                        visible: true,
                        value: 'number_act'
                    },
                    {
                        text: 'Договір',
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
                        text: 'Дата акту',
                        visible: true,
                        value: 'date_formation_act'
                    },
                    {text: 'Акт', value: 'copy_act', visible: true, widget: 'href'},
                    {
                        text: 'Акт відправлено?',
                        visible: true,
                        value: 'is_send_successful',
                        choice_name: 'is_send_successful',
                        filter: {type: 'select_choices', value: null},
                    },
                    {
                        text: 'Дії',
                        visible: true,
                        value: 'id'
                    },
                ],
            }
        }
    }
</script>
