<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers">
        <template slot="form">
            <OrganizationAddForm/>
        </template>
    </DefaultDataTable>
</template>
<script>
    import OrganizationAddForm from './OrganizationAddForm';
    import DefaultDataTable from "../../../base/DefaultDataTable";

    export default {
        components: {
            DefaultDataTable,
            OrganizationAddForm
        },
        data() {
            return {
                base_url: `${this.$config.domen}/api-base/organization/`,
                module_name: 'organization',
                headers: [
                    {
                        text: 'ЄДРПОУ',
                        align: 'left',
                        value: 'edrpou',
                        visible: true
                    },
                    {
                        text: 'Назва',
                        align: 'left',
                        value: 'full_name',
                        visible: true
                    },
                    {
                        text: 'Тип рахунку',
                        align: 'left',
                        value: 'bank',
                        choice_name: 'bank',
                        filter: {type: 'select_choices', value: null},
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
