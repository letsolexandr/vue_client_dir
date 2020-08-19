<template>
    <DefaultDataTable :base_url="base_url"
                      :namespace="namespace"
                      :module_name="module_name"
                      :headers="headers"
                      :enable-filters="false"
                      :extra_params="{subscription:subscription}"
                      :object_id="subscription">
        <template slot="table-actions">
            <SubscriptionDetailsForm :initial="{subscription:subscription}" on_save_call_event="reload-dict-subscription_details-card"></SubscriptionDetailsForm>
        </template>
    </DefaultDataTable>
</template>

<script>
    import DefaultDataTable from "../../../base/DefaultDataTable";
    import config from "../../contract/contract/config";
    import SubscriptionDetailsForm from "./SubscriptionDetailsForm";

    export default {
        props: {
            subscription: {
                type: Number,
                required: true
            }
        },
        components: {SubscriptionDetailsForm, DefaultDataTable},
        data() {
            return {
                namespace: 'dict',
                module_name: 'subscription_details',
                base_url: `${config.domen}/dict/subscription-details/`,
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
