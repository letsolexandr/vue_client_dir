<template>
    <v-card v-resize="resize">
        <LoaderBar :show-loading="loaderBar"></LoaderBar>
        <div v-show="!loaderBar" class="text-xs-center" style="min-height:400px" id='chart_id2'>
        </div>
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
                xAxis_data:null,
                series_data:null,

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
                axios.get('http://10.0.30.220:9999/api/statistic/sev-queue?dbase=PROM&date=now').then((response) => {
                    self.loaderBar = false;
                    self.xAxis_data = response.data.result.filter((item)=>{ return item.shortname}).map((item)=>{return item.shortname});
                    self.series_data = response.data.result.filter((item)=>{ return item.queue}).map((item)=>{return item.queue});

                    let option = {
                        title: {
                            text: `Моніотринг черги СЕВ ОВВ за ${(((new Date()).toLocaleDateString()))}`,
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
                                data: this.xAxis_data,//["ОПУ", "Апарат виконавчого органу Київської міської ради", "Генеральна прокуратура України", "Держпраці інспекція  України", "Державна служба зайнятості України", "Державна служба України у справах ветеранів війни та учасників антитерористичної операції"],
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
                                data: this.series_data,//[2946, 361, 305, 155, 140, 111]
                            }
                        ]
                    };
                    if (self.chart){
                        self.chart.clear()
                        //self.chart.hideLoading()
                    }
                    self.chart = echarts.init(document.getElementById("chart_id2"));
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