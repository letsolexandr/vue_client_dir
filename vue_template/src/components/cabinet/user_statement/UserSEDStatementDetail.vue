<template>
    <v-container>
        <template v-if="object_details.reg_number">
            <v-layout row wrap>
                <v-flex xs4>
                    <v-card>
                        <v-card-title primary-title>
                            <div>
                                <div class="headline"> Заявка: № {{object_details.reg_number}}</div>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    Контрагент:
                                </p>
                            </v-flex>
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    {{object_details.contractor_expand.__str__}}
                                </p>
                            </v-flex>
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    Дата заявки:
                                </p>
                            </v-flex>
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    {{object_details.statement_date}}
                                </p>
                            </v-flex>
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    Дата контролю:
                                </p>
                            </v-flex>
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    {{object_details.control_date}}
                                </p>
                            </v-flex>
                            <v-flex xs6>
                                <p class="text-sm-left">
                                    Сертифікат:
                                </p>
                            </v-flex>
                            <v-flex xs6>
                                <a target="_blank" :href="object_details.ecp_certificate">
                                        <v-icon large>mdi-certificate</v-icon>
                                    </a>
                            </v-flex>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs8>
                    <v-card>
                        <v-card-title>
                            Заява
                        </v-card-title>
                        <v-card-text>

                            <v-simple-table v-if="false" dense>
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th class="text-left">Назва</th>
                                        <th class="text-left">Кількість</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in object_details.additional_services">
                                        <td>{{ item.product }}</td>
                                        <td>{{ item.count }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <PDFViewer :pdf_url="object_details.statement_doc"></PDFViewer>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </template>
        <template v-else>
            <v-skeleton-loader
                    class="mx-auto"
                    max-width="300"
                    type="card"
            ></v-skeleton-loader>
        </template>

    </v-container>
</template>
<script>

    import DetailCard from "../../../mixins/DetailCard"
    import conf from "./conf";
    import PDFViewer from "../../../base/PDFViewer";

    export default {
        mixins: [DetailCard, conf],
        components: {PDFViewer},
        data() {
            return {
                extra_params: {expand: 'contractor_expand'},

            }
        },
    }
</script>

<style scoped>

</style>