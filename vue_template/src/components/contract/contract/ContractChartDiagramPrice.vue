<template>
    <v-card class="mt-2">
        <div class="text-xs-center" style="min-height:400px" id='contract_data_price'>
        </div>
    </v-card>
</template>

<script>
    const echarts = require('echarts/lib/echarts');
    import axios from 'axios';
    require('echarts/lib/chart/bar');
    // include tooltip and title component
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    import config from "./config";

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
                chart: null
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
            getData() {
                return axios.get(`${config.domen}/contracts/report-contract-summary-data`).then((response) => {
                    this.xAxis_data = response.data.map((item) => {
                        return item.month_contract
                    });
                    this.series_data = response.data.map((item) => {
                        return item.total_price
                    });
                })

        },
        async createChart() {
            //debugger
            this.chart = echarts.init(document.getElementById("contract_data_price"));
            debugger
            await this.getData();
            debugger
            let option = {
                title: {
                    text: 'Вартість заключених договорів (грн)',
                    subtext: '',
                },
                toolbox: {
                    // y: 'bottom',
                    feature: {
                                  saveAsImage: {
                            pixelRatio: 2
                        }
                    }
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.xAxis_data,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Сума за договорами (грн)',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.series_data
                    }
                ]
            };

            this.chart.setOption(option)
        }
    }
    }
</script>
