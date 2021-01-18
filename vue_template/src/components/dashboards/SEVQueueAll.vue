<template>
    <v-card v-resize="resize">
        <LoaderBar :show-loading="loaderBar"></LoaderBar>
        <div  v-show="!loaderBar" class="text-xs-center" style="min-height:400px" id='chart_id10'>
        </div >
    </v-card>
</template>

<script>
    import axios from 'axios';
    import LoaderBar from "../../base/LoaderBar";
    var echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/bar');
    // include tooltip and title component
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
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
                loaderBar:false,
                xAxis_data:[],
                series_data:[],

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
            this.createChart(true)
        },
        activated() {
            //debugger
            this.createChart(true)
        },
        methods: {
            resize(){
                if (this.chart){
                }
            },
            createChart(loader=false) {
                //debugger
                 const self = this;
                self.loaderBar = loader;
                if (self.chart){
                    //self.chart.showLoading()
                }
                axios.get('http://10.0.30.220:9999/api/statistic/sev-queue?dbase=PROM').then((response) => {
                    self.loaderBar = false;
                    self.xAxis_data = response.data.result.filter((item)=>{ return item.shortname}).map((item)=>{return item.shortname});
                    self.series_data = response.data.result.filter((item)=>{ return item.queue}).map((item)=>{return item.queue});

                    let option = {
                        title: {
                            text: 'Моніторинг черги СЕВ ОВВ загальний',
                            subtext: 'ТОП-6 по розміру черги',
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
                                type: 'bar',
                                barWidth: '60%',
                                data: this.series_data,
                            }
                        ]
                    };
                    if (self.chart){
                        self.chart.clear()
                        //self.chart.hideLoading()
                    }
                    self.chart = echarts.init(document.getElementById("chart_id10"));
                    self.chart.setOption(option);
                    setTimeout(()=>{
                        self.chart.resize();
                    },200)
                    setTimeout(()=>{
                        self.createChart()
                    },1000*60*9)

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