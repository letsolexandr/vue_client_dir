<template>

    <v-card>
        <v-card-text>
            <v-container>
                <v-row >

                    <v-col cols="6">
                        <p class="text-sm-left">
                            Повна назва:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.subject.full_name}}
                        </p>
                    </v-col>

                    <v-col cols="6">
                        <p class="text-sm-left">
                            ЄДРПОУ:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.subject.edrpou}}
                        </p>
                    </v-col>

                    <v-col cols="6">
                        <p class="text-sm-left">
                            Уповноважена особа:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.subject.main_unit}}
                        </p>
                    </v-col>

                    <v-col cols="6">
                        <p class="text-sm-left">
                            Адреса:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.subject.address}}
                        </p>
                    </v-col>

                    <v-col cols="6">
                        <p class="text-sm-left">
                            Телефон:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.subject.phone}}
                        </p>
                    </v-col>

                    <v-col cols="6">
                        <p class="text-sm-left">
                            Електронна пошта:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.subject.email}}
                        </p>
                    </v-col>

                    <v-col cols="6">
                        <p class="text-sm-left">
                            Банк:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.subject.bank_name}}
                        </p>
                    </v-col>

                    <v-col cols="6">
                        <p class="text-sm-left">
                            Розрахунковий рахунок:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.subject.settlement_account}}
                        </p>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>

</template>
<script>

    import DetailCard from "../../../mixins/DetailCard"
    import conf from "./conf";
    import {root} from "./config";

    export default {
        mixins: [DetailCard, conf],
        components: {},
        data() {
            return {
                base_url: `${root}/api/statement/statement-uuid-info/`,
            }
        },
    }
</script>

<style scoped>

</style>