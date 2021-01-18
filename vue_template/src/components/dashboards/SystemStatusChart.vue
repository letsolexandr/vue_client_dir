<template>
    <v-card>
        <LoaderBar :show-loading="loaderBar"></LoaderBar>

        <v-list v-show="!loaderBar" two-line subheader>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title> СЕВ ОВВ</v-list-item-title>
                    <v-list-item-subtitle> перевірено {{last_sev_check}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn v-show="!is_sev_active" icon>
                        <span class="overline"> недоступний </span>
                        <v-icon color="red">mdi-alert-decagram</v-icon>
                    </v-btn>
                    <v-btn v-show="is_sev_active" icon>
                        <span class="overline"> активний </span>
                        <v-icon color="green">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>


            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title> Трембіта (основний)</v-list-item-title>
                    <v-list-item-subtitle> перевірено {{last_sev_check}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn v-show="!is_trembita_main_active" icon>
                        <span class="overline"> недоступний </span>
                        <v-icon color="red">mdi-alert-decagram</v-icon>
                    </v-btn>
                    <v-btn v-show="is_trembita_main_active" icon>
                        <span class="overline"> активний </span>
                        <v-icon color="green">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title> Трембіта (резервний)</v-list-item-title>
                    <v-list-item-subtitle> перевірено {{is_trembita_main_check}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn v-show="!is_trembita_reserv_active" icon>
                        <span class="overline"> недоступний </span>
                        <v-icon color="red">mdi-alert-decagram</v-icon>
                    </v-btn>
                    <v-btn v-show="is_trembita_reserv_active" icon>
                        <span class="overline"> активний </span>
                        <v-icon color="green">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>


            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title> Вулик (app)</v-list-item-title>
                    <v-list-item-subtitle> перевірено {{vulyk_app_check_time}} <span class="overline" style="color: darkred">  {{vulyk_app_error}}</span>
                    </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn v-show="!is_vulyk_app_active" icon>
                        <span class="overline"> недоступний </span>
                        <v-icon color="red">mdi-alert-decagram</v-icon>
                    </v-btn>
                    <v-btn v-show="is_vulyk_app_active" icon>
                        <span class="overline"> активний </span>
                        <v-icon color="green">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title> Вулик (vulyk.gov.ua)</v-list-item-title>
                    <v-list-item-subtitle> перевірено {{vulyk_gov_check_time}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn v-show="!is_vulyk_gov_active" icon>
                        <span class="overline"> недоступний </span>
                        <v-icon color="red">mdi-alert-decagram</v-icon>
                    </v-btn>
                    <v-btn v-show="is_vulyk_gov_active" icon>
                        <span class="overline"> активний </span>
                        <v-icon color="green">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title> Вулик (info.vulyk.gov.ua)</v-list-item-title>
                    <v-list-item-subtitle> перевірено {{vulyk_info_check_time}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn v-show="!is_vulyk_info_active" icon>
                        <span class="overline"> недоступний </span>
                        <v-icon color="red">mdi-alert-decagram</v-icon>
                    </v-btn>
                    <v-btn v-show="is_vulyk_info_active" icon>
                        <span class="overline"> активний </span>
                        <v-icon color="green">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
    import LoaderBar from "../../base/LoaderBar";
    import axios from 'axios';

    export default {
        components: {LoaderBar},
        props: {
            isActivated: {
                type: Boolean,
                default: () => false
            },
            chart_id: {
                type: String,
                default: () => ''
            },
            title: {
                type: String,
                default: () => ''
            },
            chart_data: {
                type: Array,
                default: () => []
            }
        },

        data() {
            return {
                chart: null,
                loaderBar: false,
                request_interval:1000*40,
                proxy_path: "http://185.65.244.215:9090/api/api-report/proxy",
                inner_proxy_path: "http://10.0.30.220:9999/api/api-base/proxy/",
                is_sev_active: false,
                last_sev_check: null,
                is_trembita_main_active: false,
                is_trembita_main_check: null,
                is_trembita_reserv_active: false,
                is_trembita_reserv_check: false,

                is_vulyk_app_active: false,
                vulyk_app_check_time: null,
                vulyk_app_error: null,

                is_vulyk_gov_active: false,
                vulyk_gov_check_time: null,

                is_vulyk_info_active: false,
                vulyk_info_check_time: null,
            }
        },
        watch: {
            isActivated: {
                handler: function (val, oldVal) {

                    //debugger
                    this.createChart()

                }
            },
        },
        mounted() {
            //debugger


            this.createChart()

        },
        activated() {
            //debugger


            this.createChart()

        },
        methods: {
            createChart() {
                this.checkAll()
                this.activateRefresh()

            },
            checkAll() {
                this.checkSEV()
                this.checkTremditaPromMain()
                this.checkTremditaReservMain()
                this.checkVulykAPP()
                this.checkVulykGOV()
                this.checkVulykInfo()
            },
            activateRefresh() {
                setTimeout(() => {
                    this.checkAll()
                    this.activateRefresh()
                }, this.request_interval)
            },
            checkSEV() {
                const url = 'http://sev.dir.gov.ua:4435/csp/dirbus/bus.esb.IntegrationService.cls';

                const base = `${this.inner_proxy_path}${url}`;

                axios.get(base).then((response) => {

                        this.is_sev_active = true;
                        this.last_sev_check = (new Date()).toLocaleTimeString()
                    }
                ).catch((error) => {

                    this.is_sev_active = false;
                    this.last_sev_check = (new Date()).toLocaleTimeString()
                })
            },
            checkTremditaPromMain() {
                const url ='http://77.222.146.74/internalconf';
                const base = `${this.inner_proxy_path}${url}`;


                axios.get(base).then((response) => {
                    debugger
                        this.is_trembita_main_active = true;
                        this.is_trembita_main_check = (new Date()).toLocaleTimeString()
                    }
                ).catch((error) => {
                    debugger
                    this.is_trembita_main_active = false;
                    this.is_trembita_main_check = (new Date()).toLocaleTimeString()
                })
            },
            checkTremditaReservMain() {
                const url = 'http://195.78.69.134/internalconf';
                const base = `${this.inner_proxy_path}${url}`;
                axios.get(base).then((response) => {
                    debugger
                        this.is_trembita_reserv_active = true;
                        this.is_trembita_reserv_check = (new Date()).toLocaleTimeString();
                    }
                ).catch((error) => {
                    debugger
                    this.is_trembita_reserv_active = false;
                    this.is_trembita_reserv_check = (new Date()).toLocaleTimeString();
                })
            },
            checkVulykAPP() {
                const url = 'https://app.vulyk.gov.ua/share/page/private-folder-files';
                const base = `${this.inner_proxy_path}${url}`;
                axios.get(base, {timeout: 10000}).then((response) => {
                    debugger
                        this.is_vulyk_app_active = true;
                        this.vulyk_app_error = null;
                        this.vulyk_app_check_time = (new Date()).toLocaleTimeString();
                    }
                ).catch((error) => {
                    debugger
                    this.is_vulyk_app_active = false;
                    this.vulyk_app_error = error.message
                    this.vulyk_app_check_time = (new Date()).toLocaleTimeString();
                })
            },
            checkVulykGOV() {
                const param = 'https://vulyk.gov.ua/';
                const url = `${this.inner_proxy_path}${param}`;
                axios.get(url).then((response) => {
                    debugger
                        this.is_vulyk_gov_active = true;
                        this.vulyk_gov_check_time = (new Date()).toLocaleTimeString();
                    }
                ).catch((error) => {
                    debugger
                    this.is_vulyk_gov_active = false;
                    this.vulyk_gov_check_time = (new Date()).toLocaleTimeString();
                })
            },
            checkVulykInfo() {
                const url = 'https://info.vulyk.gov.ua/login';
                const base = `${this.inner_proxy_path}${url}`;
                axios.get(base).then((response) => {
                    debugger
                        this.is_vulyk_info_active = true;
                        this.vulyk_info_check_time = (new Date()).toLocaleTimeString();
                    }
                ).catch((error) => {
                    debugger
                    this.is_vulyk_info_active = false;
                    this.vulyk_info_check_time = (new Date()).toLocaleTimeString();
                })
            },
        }
    }
</script>


<style scoped>

</style>