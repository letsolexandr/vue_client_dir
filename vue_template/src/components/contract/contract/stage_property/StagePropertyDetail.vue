<template>
    <v-container>
        <template v-if="object_details.name">
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline"> Реквізити:</div>
                        <ContractStagePropertyForm
                                :extra_fields=({contract:object_id,id:object_details.id})></ContractStagePropertyForm>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Назва організації:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.name}}
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Адреса:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.address}}
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Розрахунковий рахунок:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.settlement_account}}
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                МФО:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.mfo}}
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                ЄДРПОУ:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.edrpou}}
                            <p/>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Банк:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.bank_name}}
                            <p/>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                ІПН:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.ipn}}
                            <p/>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Номер платника податків:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.certificate_number}}
                            <p/>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Уповноважена особа:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.main_unit_state}} {{object_details.main_unit}}
                            <p/>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Працює на підставі:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.work_reason}}
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Статутні документи:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                <a :href="object_details.statute_copy" target="_blank">{{getFileName(object_details.statute_copy)}}</a>
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                Телефон:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.phone}}
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                EMAIL:
                            </p>
                        </v-flex>
                        <v-flex xs6>
                            <p class="text-sm-left">
                                {{object_details.email}}
                            </p>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </template>
        <template v-else>
            <v-skeleton-loader
                    class="mx-auto"
                    height="600"
                    type="card, article, article,  actions"
            ></v-skeleton-loader>
        </template>
    </v-container>
</template>
<script>
    import DetailCard from "../../../../mixins/DetailCard";
    import {getFileName} from '../../../../js'
    import ContractStagePropertyForm from "./ContractStagePropertyForm";
    import config from "../config";

    export default {
        components: {ContractStagePropertyForm},
        mixins: [DetailCard],

        data() {
            return {
                title: 'Реквізити',
                namespace: 'contract',
                module_name: 'stage_property',
                object_details: {},
                base_url: `${config.domen}/contracts/stage-property/`,
            }
        },
        methods: {
            getFileName(file_url) {
                return getFileName(file_url)
            }
        }
    }
</script>
