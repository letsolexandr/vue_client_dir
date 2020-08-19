<template>
    <v-card>
        <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">Прізвище</th>
                        <th class="text-left">Імя</th>
                        <th class="text-left">По батькові</th>
                        <th class="text-left">email</th>
                        <th class="text-left">Посада</th>
                        <th class="text-left">Режим доступу</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in object_details.all_data.users" :key="item.email">
                        <td>{{ item.last_name }}</td>
                        <td>{{ item.first_name }}</td>
                        <td>{{ item.middle_name }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.state }}</td>
                        <td>{{ item.access_mode }}</td>
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
    import {domen} from "./config";

    export default {
        mixins: [DetailCard, conf],
        components: {},
        data() {
            return {
                base_url: `${domen}/statement/statement-uuid-info/`,
            }
        },
    }
</script>

<style scoped>

</style>