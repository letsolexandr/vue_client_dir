<template>
    <v-card v-resize="resize">
        <v-card-title>
            <span class="title font-weight-light">{{text}}</span>
        </v-card-title>
        <v-data-table
                dense
                :loading="loaderBar"
                :headers="headers"
                :items="items"
                :items-per-page="15"
                class="elevation-1"
        ></v-data-table>
    </v-card>
</template>

<script>
    import axios from 'axios';

    export default {

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
                text: `Моніотринг черги СЕВ ОВВ за ${(((new Date()).toLocaleDateString()))}`,
                subtext: 'ТОП-6 по розміру черги',
                headers: [
                    {
                        text: 'Організація',
                        align: 'left',
                        value: 'shortname',
                    },
                    {text: 'Розмір черги', value: 'queue'},

                ],
                items: []
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
            resize() {
                if (this.chart) {
                }
            },
            createChart() {
                //debugger
                const self = this;
                self.loaderBar = true;
                axios.get('http://10.0.30.220:9999/api/statistic/sev-queue?dbase=PROM&date=now').then((response) => {
                        self.loaderBar = false;
                        self.items = response.data.result;
                        debugger
                    }
                ).catch((error) => {
                    console.log(error)
                })

            }
        }
    }
</script>


<style scoped>

</style>