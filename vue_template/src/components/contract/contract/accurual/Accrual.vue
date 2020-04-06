<template>
    <BaseDataTable :namespace="namespace"
                   :module_name="module_name"
                   :base_url="base_url"
                   :headers="headers"
                   :extra_watch="extra_watch"
                   :object_id="contract_id"
                   :reload_after_delete="reload_after_delete"
                   :static_model_params="static_model_params"
                   :extra_params="extra_params">
        <template slot="form">
            <RegisterAccrualForm></RegisterAccrualForm>
        </template>
        <template slot="table-actions">
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary"
                           fab dark small
                           @click="calculateAccrual($event)">
                        <v-icon>mdi-calculator</v-icon>
                    </v-btn>
                </template>
                <span>Сформувати нарахування по договору</span>
            </v-tooltip>
        </template>
    </BaseDataTable>
</template>
<script>

    import RegisterAccrualForm from "./AccrualForm"
    import BaseDataTable from "../../../../base/BaseDataTable"
    import axios from 'axios';

    export default {
        components: {BaseDataTable, RegisterAccrualForm},
        props: {
            contract_id: {
                type: Number,
                required: true,
                default: () => {
                    return 0
                }
            }
        },
        data() {
            return {
                namespace: 'contract',
                module_name: 'register_accurual',
                extra_params: {expand: 'contract'},
                static_model_params: {
                    app_label: 'contracts',
                    model: 'registeraccrual',
                },
                extra_watch: {
                    param_name: 'contract__id',
                },
                reload_after_delete: false,
                base_url: `${this.$config.domen}/contracts/register-accurual/`,
                headers: [
                    {
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
                        text: 'Баланс',
                        align: 'left',
                        visible: true,
                        value: 'balance'
                    },
                    {
                        text: 'Призначення',
                        align: 'left',
                        visible: true,
                        value: 'title'
                    },
                    {
                        text: 'До сплати',
                        align: 'left',
                        visible: true,
                        value: 'pay_size'
                    },
                    {
                        text: 'Пеня за попередній період',
                        align: 'left',
                        visible: true,
                        value: 'penalty'
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
                        text: 'Дії',
                        visible: true,
                        value: 'id'
                    },
                ]
            }
        },
        methods: {
            calculateAccrual(event) {
                const url = `${this.$config.domen}/api-base/rpc`;
                const params = {
                    app_label: 'contracts',
                    model: 'contract',
                    method: 'calculate_accrual',
                    pk: this.contract_id
                };
                debugger
                let info_dialog = this.$store.state.info_dialog.infoDialog
                info_dialog.open({
                    title: 'Формування нарахувань',
                    message: 'Це може зайняти деякий час. Будь ласка, дочекайтесь закінчення ...',
                    show_loader: true,
                    disabled_close: true
                });
                const update_element = this
                axios.get(url, {params: params}).then((response) => {
                        //info_dialog.close();

                        info_dialog.open({
                            title: 'Успішно',
                            message: 'Формування нарахувань закінчено',
                            disabled_close: false,
                            update_element: update_element
                        });
                    }
                ).catch((error) => {
                    info_dialog.close();
                })
            }
        }
    }

</script>
