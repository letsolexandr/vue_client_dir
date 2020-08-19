<template>
    <v-card>
        <v-container>
            <v-row>
                <v-col cols="4">
                    <v-card elevation="6">
                        <v-card-title> Послуга</v-card-title>
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <td>Назва</td>
                                    <td>{{ object_details.name }}</td>
                                </tr>
                                <tr>
                                    <td>Ціна</td>
                                    <td>{{ object_details.price }}</td>
                                </tr>
                                <tr>
                                    <td>ПДВ</td>
                                    <td>{{ object_details.pdv }}</td>
                                </tr>
                                <tr>
                                    <td>Ціна з ПДВ</td>
                                    <td>{{ object_details.price_pdv }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                </v-col>
                <v-col cols="8">
                    <SubscriptionCardDetailsDataTable :subscription="id"></SubscriptionCardDetailsDataTable>
                </v-col>
            </v-row>

        </v-container>
    </v-card>
</template>

<script>

    import SubscriptionCardDetailsDataTable from "./SubscriptionCardDetailsDataTable";
    import Card from "../../../mixins/Card";

    export default {
        mixins:[Card],
        components: {SubscriptionCardDetailsDataTable},
        data() {
            return {
                namespace: 'dict',
                module_name: 'subscription_details',
                component_name:'card',
                base_url:`${this.$config.domen}/dict/subscription/`,
                id: null,
                object_details: null
            }
        }
    }
</script>
