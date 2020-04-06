<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      :headers="headers">
        <template slot="form">
            <ProductForm/>
        </template>
    </DefaultDataTable>
</template>
<script>

    import ProductForm from "./SubscriptionForm";
    import DefaultDataTable from "../../../base/DefaultDataTable";

    export default {
        components: {DefaultDataTable, ProductForm},
        data() {
            return {
                namespace: 'dict',
                module_name: 'subscription',
                base_url: `${this.$config.domen}/dict/subscription/`,
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
                        text: 'Ціна',
                        value: 'price',
                        visible: true,
                    },
                    {
                        text: 'ПДВ',
                        value: 'pdv',
                        visible: true,
                    },
                    {
                        text: 'Кількість в тарифі',
                        value: 's_count',
                        visible: true,
                    },

                    {
                        text: 'Ціна з ПДВ',
                        value: 'price_pdv',
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
