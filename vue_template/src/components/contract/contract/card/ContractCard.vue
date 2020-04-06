<template>
    <v-card>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                <v-flex xs12 md4>
                    <ContractDetail :contract_id="id"/>
                </v-flex>
                <v-flex xs12  md8>
                    <v-tabs
                            next-icon="mdi-arrow-right-bold-box-outline"
                            prev-icon="mdi-arrow-left-bold-box-outline"
                            show-arrows
                            v-model="tabs"
                            centered
                    >
                        <v-tab key="stage_property">
                            РЕКВІЗИТИ
                        </v-tab>
                        <v-tab key="details">
                            ДЕТАЛІ
                        </v-tab>
                        <v-tab key="details2">
                            ДЕТАЛІ2
                        </v-tab>
                        <v-tab key="coordination">
                            ПОГОДЖЕННЯ
                        </v-tab>

                        <v-tab key="register_accrual">
                            НАРАХУВАННЯ
                        </v-tab>
                        <v-tab key="register_act">
                            AKTИ
                        </v-tab>
                        <v-tab key="register_payment">
                            ПЛАТЕЖІ
                        </v-tab>
                        <v-tab key="files">
                            ФАЙЛИ
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tabs">
                        <v-tab-item key="stage_property">
                            <StagePropertyDetail :object_id="id" filter_field_name="contract__id"></StagePropertyDetail>
                        </v-tab-item>
                        <v-tab-item key="details">
                            <DetailDataTable :contract_id="id" ></DetailDataTable>
                        </v-tab-item>
                        <v-tab-item key="details2">
                            <ContractProductDataTable :contract_id="id" ></ContractProductDataTable>
                        </v-tab-item>
                        <v-tab-item key="coordination">
                            <CoordinationDataTable :object_id="id"></CoordinationDataTable>
                        </v-tab-item>
                        <v-tab-item key="register_accrual">
                            <Accrual :contract_id="id"/>
                        </v-tab-item>
                        <v-tab-item key="register_act">
                            <RegisterAct :contract_id="id"/>
                        </v-tab-item>
                        <v-tab-item key="register_payment">
                            <RegisterPayment :contract_id="id"/>
                        </v-tab-item>
                        <v-tab-item key="files">
                            <DropzoneComponent :unique_uuid="unique_uuid"></DropzoneComponent>
                        </v-tab-item>
                    </v-tabs-items>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>

    import ContractDetail from "./ContractDetail";
    import axios from 'axios';
    import RegisterAct from "../act/RegisterAct";
    import RegisterPayment from "../payment/RegisterPayment";
    import CoordinationDataTable from "../coordination/CoordinationDataTable";
    import PayPlanDataTable from "../pay_plan/PayPlanDataTable";
    import StagePropertyDetail from "../stage_property/StagePropertyDetail";
    import Accrual from "../accurual/Accrual";
    import DropzoneComponent from "../../../../base/dropzone/DropzoneComponent";
    import DetailDataTable from "../detail/DetailDataTable";
    import ContractProductDataTable from "../products/ContractProductDataTable";

    export default {
        name: "ContractCard",
        components: {
            ContractProductDataTable,
            DropzoneComponent,
            Accrual,
            StagePropertyDetail,
            CoordinationDataTable,
            RegisterAct,
            PayPlanDataTable,
            RegisterPayment,
            ContractDetail,
            DetailDataTable
        },
        data() {
            return {
                id: 0,
                tabs: null,
                unique_uuid: '',
                base_url: `${this.$config.domen}/contracts/contract/`,

            }
        },
        activated() {
            if (this.$route.params.id) {
                this.id = parseInt(this.$route.params.id)
                this.getData()
            }
            if (!this.$route.params.id) {
                this.id = 0
                this.getData()
            }
        },
        watch: {
            $route() {
                if (this.$route.params.id) {
                    this.id = parseInt(this.$route.params.id)
                    this.getData()
                }
                if (!this.$route.params.id) {
                    this.id = 0
                    this.getData()
                }
            }
        },
        methods: {
            getData() {
                let url = this.base_url + this.id
                axios.get(url).then((response) => {
                        this.unique_uuid = response.data.unique_uuid
                        debugger
                    }
                ).catch((error) => {
                    console.log(error)
                    this.unique_uuid = ''
                })
            }
        }
    }
</script>

<style scoped>

</style>