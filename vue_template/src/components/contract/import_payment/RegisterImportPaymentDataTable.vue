<template>
    <BaseDataTable :namespace="namespace"
                   :module_name="module_name"
                   :base_url="base_url"
                   :headers="headers"
                   :static_model_params="static_model_params"
                   :extra_params="extra_params">
        <template slot="table-actions">
            <ImportPaymantForm :upload_element="getThis()"></ImportPaymantForm>
        </template>
    </BaseDataTable>
</template>
<script>

    import BaseDataTable from "../../../base/BaseDataTable";
    import TableBase from "../../../mixins/TableBase";
    import ImportPaymantForm from "./ImportPaymantForm";


    export default {
        mixins: [TableBase],
        components: {ImportPaymantForm, BaseDataTable},
        data() {
            return {
                namespace: null,
                module_name: 'register_payment_import',
                extra_params: {expand: 'contract'},
                static_model_params: {
                    app_label: 'contracts',
                    model: 'importpayment',
                },
                base_url: `${this.$config.domen}/contracts/import-client-bank/`,
                headers: [
                    {
                        text: 'Дата завантаження',
                        align: 'left',
                        visible: true,
                        value: 'date_add',
                        filter: {type: 'date', value: null}
                    },
                    {text: 'Назва файлу', value: 'in_file', visible: true, widget: 'href'},
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
