<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <div class="headline"> Заявка: № {{object_details.reg_number}}</div>
            </div>
        </v-card-title>
        <v-card-text>
            <template v-if="object_details.reg_number">
                <v-layout row wrap>
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

                    <v-flex xs12>
                        <p class="text-sm-left">
                            <ContractFormStatement :initial='{statement:object_details.id}'
                                                   btn_title="Сформувати договір"></ContractFormStatement>
                        </p>
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

        </v-card-text>
    </v-card>
</template>
<script>

    import DetailCard from "@/mixins/DetailCard"
    import ContractFormStatement from "./ContractFormStatement";

    export default {
        components: {ContractFormStatement},
        mixins: [DetailCard],
        data() {
            return {
                namespace: 'statement',
                module_name: 'sed_statement',
                base_url: `${this.$config.domen}/statement/sed-statement/`,
                extra_params: {expand: 'contractor_expand'},

            }
        },
    }
</script>

<style scoped>

</style>