<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex md4 xs12>
                <SystemStatusChart/>
            </v-flex>
            <v-flex md4 xs12>
                <SEVQueueAllTable></SEVQueueAllTable>
            </v-flex>
            <v-flex md4 xs12 >
                <DynamicTable></DynamicTable>
            </v-flex>
            <v-flex xs4>
                <ServiceDesk></ServiceDesk>
            </v-flex>
            <!--<v-flex xs4>
                <DynamicArea></DynamicArea>
            </v-flex>
            <v-flex xs4>
                <DynamicTimeLine></DynamicTimeLine>
            </v-flex>-->
        </v-layout>
    </v-container>

</template>

<script>
    import SystemStatusChart from "./SystemStatusChart";
    import Dynamic from "./Dynamic";
    import DynamicLine from "./DynamicLine";
    import DynamicArea from "./DynamicArea";
    import DynamicTimeLine from "./DynamicTimeLine";
    import DynamicTimeLineZumeble from "./DynamicTimeLineZumeble";

    import ServiceDesk from "./ServiceDesk";
    import DynamicTable from "./DynamicTable";
    import SEVQueueAllTable from "./SEVQueueAllTable";

    var echarts = require('echarts/lib/echarts')
    require('echarts/lib/chart/pie');
    // include tooltip and title component
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');

    export default {
        components: {
            SEVQueueAllTable,
            DynamicTable,
            ServiceDesk,

            DynamicTimeLineZumeble, DynamicTimeLine, DynamicArea, DynamicLine, Dynamic, SystemStatusChart},
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
            createChart() {
                //debugger
                this.chart = echarts.init(document.getElementById("chart_id1"))
                let option = option = {
                    title: {
                        text: "this.title",
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '45%'],
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1548, name: '搜索引擎'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
                this.chart.setOption(option)
            }
        }
    }
</script>


<style scoped>

</style>