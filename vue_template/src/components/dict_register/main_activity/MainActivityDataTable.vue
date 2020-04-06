<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers">
        <template slot="form">
            <MainActivityForm/>
        </template>
    </DefaultDataTable>
</template>
<script>

    import MainActivityForm from "./MainActivityForm";
    import DefaultDataTable from "../../../base/DefaultDataTable";

    export default {
        components: {DefaultDataTable, MainActivityForm},
        data() {
            return {
                namespace: 'dict',
                module_name: 'main_activity',
                base_url: `${this.$config.domen}/dict/main-activity/`,
                headers: [{
                    text: 'Код',
                    align: 'left',
                    //sortable: false,
                    value: 'code',
                    visible: true,
                },
                    {
                        text: 'Назва',
                        value: 'name',
                        visible: true,
                    },
                    {
                        text: 'Дії',
                        value: 'id',
                        visible: true,
                    },
                ]
            }
        }
    }
</script>
