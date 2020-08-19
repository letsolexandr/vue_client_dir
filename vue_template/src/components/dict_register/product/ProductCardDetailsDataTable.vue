<template>
    <DefaultDataTable :base_url="base_url"
                      :namespace="namespace"
                      :module_name="module_name"
                      :headers="headers"
                      :enable-filters="false"
                      :extra_params="{product:product}"
                      :object_id="product">
        <template slot="table-actions">
            <ProductDetailsForm :initial="{product:product}" on_save_call_event="reload-dict-product_details-card"></ProductDetailsForm>
        </template>
    </DefaultDataTable>
</template>

<script>
    import DefaultDataTable from "../../../base/DefaultDataTable";
    import config from "../../contract/contract/config";
    import ProductDetailsForm from "./ProductDetailsForm";

    export default {
        props: {
            product: {
                type: Number,
                required: true
            }
        },
        name: "ProductCardDetailsDataTable",
        components: {ProductDetailsForm, DefaultDataTable},
        data() {
            return {
                namespace: 'dict',
                module_name: 'product_details',
                base_url: `${config.domen}/dict/product-details/`,
                headers: [{
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
                        text: 'Початок дії тарифу',
                        value: 'start_period',
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
