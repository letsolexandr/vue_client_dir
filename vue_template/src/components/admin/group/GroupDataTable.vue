<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers">
        <template slot="form">
            <GroupAddForm/>
        </template>
    </DefaultDataTable>
</template>
<script>
    import GroupAddForm from './GroupAddForm';
    import DefaultDataTable from "../../../base/DefaultDataTable";

    export default {
        components: {
            DefaultDataTable,
            GroupAddForm
        },
        data() {
            return {
                base_url: `${this.$config.domen}/api-base/group/`,
                module_name: 'group',
                headers: [
                    {
                        text: 'Назва',
                        align: 'left',
                        value: '__str__',
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
