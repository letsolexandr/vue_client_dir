<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <div class="headline">Акти</div>
            </div>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <ActForm></ActForm>
        </v-card-title>
        <v-card-text>
            <BaseDataTable :namespace="namespace"
                           :module_name="module_name"
                           :base_url="base_url"
                           :headers="headers"
                           :extra_params="extra_params"
                           :extra_watch="extra_watch"
                           :object_id="contract_id"
                           :static_model_params="static_model_params"
                           :reload_after_delete="reload_after_delete"
            >
            </BaseDataTable>
        </v-card-text>

    </v-card>
</template>

<script>

    import ActForm from "./ActForm";
    import BaseDataTable from "../../../../base/BaseDataTable";

    export default {
        name: "RegisterAct",
        components: {BaseDataTable, ActForm},
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
                module_name: 'register_act',
                base_url: `${this.$config.domen}/contracts/register-act/`,
                extra_watch: {
                    param_name: 'contract',
                },
                static_model_params:{
                    app_label:'contracts',
                    model:'registeract',
                },
                reload_after_delete: true,
                extra_params: {expand: 'accrual'},
                headers: [
                    {text: 'Нарахування', value: 'accrual.size_accrual', visible: false},
                    {text: 'Дата нарахування', value: 'accrual.date_accrual', visible: false},
                    {text: '№ акту', value: 'number_act', visible: true},
                    {text: 'Дата акту', value: 'date_formation_act', visible: true},
                    {text: 'Акт успішно відправлено?', value: 'is_send_successful', visible: true, widget: 'checkbox'},
                    {text: 'Акт', value: 'copy_act', visible: true, widget: 'href'},
                    {text: 'Дата сплати', value: 'payments.0.payment_date', visible: false},
                    {text: 'Сума сплати', value: 'payments.0.sum_payment', visible: false},
                    {text: 'Дії', value: 'id', visible: true},
                ],
            }
        }
    }
</script>

<style scoped>

</style>