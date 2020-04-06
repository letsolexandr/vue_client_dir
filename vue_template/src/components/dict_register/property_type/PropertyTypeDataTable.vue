<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers">
        <template slot="form">
            <PropertyTypeForm/>
        </template>
    </DefaultDataTable>
</template>

<script>
     import PropertyTypeForm from "./PropertyTypeForm"
    import DefaultDataTable from "../../../base/DefaultDataTable"


    export default {
        components: {DefaultDataTable, PropertyTypeForm},
        data() {
            return {
                namespace: 'dict',
                module_name: 'property_type',
                base_url: `${this.$config.domen}/dict/property-type/`,
                headers: [{
                    text: 'Код',
                    align: 'left',
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
