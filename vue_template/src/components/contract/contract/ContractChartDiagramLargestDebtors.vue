<template>
    <v-card>
        <div class="text-xs-center" style="min-height:400px" id='contract_largest_debtors'>
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
                return axios.get(`${config.domen}/contracts/report-contract-largest-debtors`).then((response) => {
                    this.xAxis_data = response.data.map((item) => {
                        return item.full_name
                    });
                    this.series_data = response.data.map((item) => {
                        return item.s
                    });
                })

        },
        async createChart() {
            //debugger
            this.chart = echarts.init(document.getElementById("contract_largest_debtors"));
            debugger
            await this.getData();
            debugger
            let option = {
                title: {
                    text: 'Найбільші боржники',
                    subtext: 'ТОП-10 по заборгованості',
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
                        type: 'value'
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: this.xAxis_data,
                        axisLabel: {
                            inside: true,
                            show:true,
                            align: 'left',
                            verticalAlign:'middle',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        z: 10,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                series: [
                    {
                        name: 'Розмір боргу',
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
