<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :extra_params="extra_params"
                      :base_url="base_url"
                      :headers="headers">
        <template slot="form">
            <PermissionAddForm/>
        </template>
    </DefaultDataTable>
</template>
<script>
    import PermissionAddForm from './PermissionAddForm';
    import DefaultDataTable from "../../../base/DefaultDataTable";

    export default {
        components: {
            DefaultDataTable,
            PermissionAddForm
        },
        data() {
            return {
                namespace:null,
                base_url: `${this.$config.domen}/api-base/permission/`,
                module_name: 'permissions',
                extra_params: {expand: 'content_type_data'},
                headers: [
                    {
                        text: 'Назва',
                        align: 'left',
                        value: 'name',
                        visible: true
                    },                    {
                        text: 'Code',
                        align: 'left',
                        value: 'codename',
                        visible: true},
                    {
                        text: 'APP',
                        align: 'left',
                        value: 'content_type_data.app_label',
                        visible: true
                    },

                    {
                        text: 'Дії',
                        value: 'id',
                        visible: true
                    },
                ]
            }
        },
    }
</script>
