<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers">
        <template slot="form">
            <OrganizationTypeForm/>
        </template>
    </DefaultDataTable>
</template>

<script>
    import OrganizationTypeForm from "./OrganizationTypeForm"
    import DefaultDataTable from "../../../base/DefaultDataTable"

    export default {
        components: {DefaultDataTable, OrganizationTypeForm},
        data() {
            return {
                namespace: 'dict',
                module_name: 'organization_type',
                base_url: `${this.$config.domen}/dict/organization-type/`,
                headers: [{
                    text: 'Код',
                    align: 'left',
                    value: 'code',
                    visible: true
                },
                    {
                        text: 'Назва',
                        value: 'name',
                        visible: true
                    },
                    {
                        text: 'Дії',
                        value: 'id',
                        visible: true
                    },
                ]
            }
        }
    }
</script>
