<template>
    <DefaultDataTable :namespace="namespace"
                      :module_name="module_name"
                      :base_url="base_url"
                      use_card
                      :headers="headers">
        <template slot="form">
            <ProductForm/>
        </template>
    </DefaultDataTable>
</template>
<script>

    import ProductForm from "./ProductForm";
    import DefaultDataTable from "../../../base/DefaultDataTable";

    export default {
        components: {DefaultDataTable, ProductForm},
        data() {
            return {
                namespace: 'dict',
                module_name: 'product',
                base_url: `${this.$config.domen}/dict/product/`,
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
                        url: '/main/product/',
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
