<template>
   <div class="text-xs-center" style="min-height:300px" :id='chart_id'>
    </div>
</template>
<script>
var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie');
// include tooltip and title component
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {

  props: {
  isActivated:{
    type: Boolean,
    default: () => false
  },
  chart_id:{
    type: String,
    default: () => ''
  },
  title:{
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
      chart:null
    }
  },
  watch:{
    isActivated:{
        handler: function (val, oldVal) {
          if (this.chart_data){
            //debugger
            this.createChart()
          }
        }
    },
  },
  mounted(){
    //debugger
    if (this.chart_id&&this.chart_data){

      this.createChart()
    }
  },
  activated(){
    //debugger
    if (this.chart_id&&this.chart_data){

      this.createChart()
    }
  },
  methods:{
    createChart(){
      //debugger
      this.chart = echarts.init(document.getElementById(this.chart_id))
      let option = option = {
    title : {
        text: this.title,
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: '',
            type: 'pie',
            radius : '55%',
            center: ['50%', '45%'],
            data:this.chart_data,
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
