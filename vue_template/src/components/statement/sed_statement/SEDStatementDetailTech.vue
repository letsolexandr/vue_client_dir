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
                            <v-container>
                                <v-row>
                                    <v-col cols="6">
                                        <p class="text-sm-left">
                                            Контрагент:
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="text-sm-left">
                                            {{object_details.contractor_expand.__str__}}
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="text-sm-left">
                                            Дата заявки:
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="text-sm-left">
                                            {{object_details.statement_date}}
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="text-sm-left">
                                            Дата контролю:
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="text-sm-left">
                                            {{object_details.control_date}}
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="text-sm-left">
                                            Сертифікат:
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <a target="_blank" :href="object_details.ecp_certificate">
                                            <v-icon large>mdi-certificate</v-icon>
                                        </a>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="text-sm-left">
                                            Організація підключена:
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="text-sm-left">
                                            <TrueFalseChip
                                                    :status="object_details.is_contractor_connected"></TrueFalseChip>
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="text-sm-left">
                                            Примітка:
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="text-sm-left">
                                            {{object_details.note}}
                                        </p>
                                    </v-col>

                                    <v-flex xs12>
                                        <p>
                                            <SEDStatementTechForm show-btn title-btn="Змінити відмітку про підключення"
                                                                  :object_id="object_details.id"></SEDStatementTechForm>
                                        </p>
                                    </v-flex>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs8>
                    <v-card>
                        <v-tabs
                                v-model="tab"

                        >
                            <v-tabs-slider></v-tabs-slider>

                            <v-tab v-for="item in tab_items"
                                   :key="item.key">
                                {{ item.title }}
                            </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">

                            <v-tab-item key="pdf">
                                <v-card>
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
                                        <IframeViewer :src="object_details.statement_doc"></IframeViewer>


                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item key="contragent">
                                <SEDStatementContragentDetail
                                        :object_id="object_details.unique_uuid"></SEDStatementContragentDetail>
                            </v-tab-item>
                            <v-tab-item key="users">
                                <SEDStatementUsers :object_id="object_details.unique_uuid"></SEDStatementUsers>
                            </v-tab-item>
                            <v-tab-item key="additional_services">
                                <SEDStatementAdditionalServices
                                        :object_id="object_details.unique_uuid"></SEDStatementAdditionalServices>
                            </v-tab-item>
                            <v-tab-item key="integrator_details">
                                <SEDStatementIntegratorDetail
                                        :object_id="object_details.unique_uuid"></SEDStatementIntegratorDetail>
                            </v-tab-item>
                            <v-tab-item key="integration_system">
                                <SEDStatementIntegratsinSystemDetail
                                        :object_id="object_details.unique_uuid"></SEDStatementIntegratsinSystemDetail>
                            </v-tab-item>
                        </v-tabs-items>
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
    import axios from 'axios';
    import {domen} from "./config";
    import DetailCard from "../../../mixins/DetailCard"
    import ContractFormStatement from "./ContractFormStatement";
    import conf from "./conf";
    import PDFViewer from "../../../base/PDFViewer";
    import SEDStatementContragentDetail from "./SEDStatementContragentDetail";
    import SEDStatementUsers from "./SEDStatementUsers";
    import SADStatementAdditionalServices from "./SEDStatementAdditionalServices";
    import SEDStatementIntegratorDetail from "./SEDStatementIntegratorDetail";
    import SEDStatementIntegratsinSystemDetail from "./SEDStatementIntegratsinSystemDetail";
    import IframeViewer from "../../../base/IframeViewer";
    import SEDStatementTechForm from "./SEDStatementTechForm";
    import TrueFalseChip from "../../../base/TrueFalseChip";


    export default {
        mixins: [DetailCard, conf],
        components: {
            TrueFalseChip,
            SEDStatementTechForm,
            IframeViewer,

            SEDStatementIntegratsinSystemDetail,
            SEDStatementIntegratorDetail,
            SEDStatementAdditionalServices: SADStatementAdditionalServices,
            SEDStatementUsers, SEDStatementContragentDetail, PDFViewer, ContractFormStatement
        },
        data() {
            return {
                tab: null,
                tab_items: [
                    {key: 'pdf', title: 'Заява'},
                    {key: 'contragent', title: 'Контрагент'},
                    {key: 'users', title: 'Користувачі'},
                    {key: 'additional_services', title: 'Додаткові послуги'},
                    {key: 'integrator_details', title: 'Інтегратор'},
                    {key: 'integration_system', title: 'Інформація про систему'},
                ],
                extra_params: {expand: 'contractor_expand'},

            }
        },
        mounted() {

        },
        methods: {
            getAllData(statement_uuid) {
                let url = `${domen}/statement/statement-uuid-info/${statement_uuid}`
                if (this.object_id === 0) {
                    return
                }
                debugger
                axios.get(url).then((response) => {
                        if (response.data.results && response.data.results.length) {
                            this.statement_data = response.data.results[0]
                        } else if (response.data) {
                            this.statement_data = response.data;
                        }
                    }
                ).catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>


<style>
    .iframe-wrapper {
        border: 1px solid gray;
        height: 600px;
    }

    .vue-friendly-iframe {
        height: 100%;
        width: 100%;
    }

    iframe {
        height: 100%;
        width: 100%;
    }

</style>

