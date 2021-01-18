<template>
    <v-simple-table v-if="info" >
        <tbody>
        <tr>
            <td> Підписант</td>
            <td>{{ info.pszSubjFullName }}</td>
        </tr>
        <tr>
            <td> Серійний номер</td>
            <td>{{info.pszSerial }}</td>
        </tr>
        <tr>
            <td> Місце знаходження</td>
            <td>{{ info.pszSubjLocality }}</td>
        </tr>
        <tr>
            <td> Мітка часу</td>
            <td>
                <v-chip v-if="info.bTimeStamp" class="ma-2"
                        x-small
                        color="success" >
                    Так
                </v-chip>
                <v-chip v-else class="ma-2"
                        x-small
                        color="error" >
                   Ні
                </v-chip>

            </td>
        </tr>
        <tr>
            <td> Дата підписання</td>
            <td>{{ formatSignDate(info.Time) }}</td>
        </tr>
        </tbody>
    </v-simple-table>
</template>

<script>
    export default {
        props: {
            info: {
                type: Object

            }
        },
        methods: {
            formatSignDate(t) {
                return new Date(t.wYear, t.wMonth, t.wDay, t.wHour, t.wMinute, t.wSecond).toLocaleString()
            },
        }
    }
</script>

<style scoped>

</style>