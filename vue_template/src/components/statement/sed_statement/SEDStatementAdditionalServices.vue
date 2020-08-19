<template>
    <v-card>
        <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">Послуга</th>
                        <th class="text-left">Кількість</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in object_details.additional_services" :key="item.product">
                        <td>{{ item.product }}</td>
                        <td>{{ item.count }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>

        </v-card-text>
    </v-card>

</template>
<script>

    import DetailCard from "../../../mixins/DetailCard"
    import conf from "./conf";

    export default {
        mixins: [DetailCard, conf],
        components: {},
        data() {
            return {
                base_url: `http://10.0.200.103/api/statement/statement-uuid-info/`,
            }
        },
    }
</script>

<style scoped>

</style>