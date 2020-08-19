<template>

    <v-card>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            Повна назва:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.integrator.company_info.full_name}}
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            Назва:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.integrator.company_info.name}}
                        </p>
                    </v-col>

                    <v-col cols="6">
                        <p class="text-sm-left">
                            ЄДРПОУ:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.integrator.company_info.edrpou}}
                        </p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <p class="headline"> Відповідальна особа</p>

                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            ПІБ:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.integrator.responsible_user.last_name}}
                            {{object_details.all_data.integrator.responsible_user.first_name}}
                            {{object_details.all_data.integrator.responsible_user.middle_name}}
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            email:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.integrator.responsible_user.email}}

                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            Телефон:
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <p class="text-sm-left">
                            {{object_details.all_data.integrator.responsible_user.phone}}
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