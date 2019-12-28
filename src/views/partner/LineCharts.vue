<template>
  <div
    :id="id"
    v-loading="listLoading"
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { getPartnerInfo } from '@/api/cert'

export default {
  mixins: [resize],
  props: {
    query: {
      type: Object,
      default: () => ({})
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      listLoading: false
    }
  },
  watch: {
    query: {
      handler(val, oldVal) {
        this.getInfo()
      },
      deep: true
    }
  },
  mounted() {
    this.getInfo()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getInfo() {
      this.listLoading = true
      getPartnerInfo(this.query).then(res => {
        const { partnerStatVoList } = res.data
        this.list = partnerStatVoList.map(item => [item.period, item.val])
        this.initChart()
        this.listLoading = false
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        title: {
          top: 0,
          text: '合伙人',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: 'red'
          },
          left: '46%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        xAxis: [{
          type: 'category',
          name: '日期',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          name: '邀请人数',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: '合伙人',
          type: 'line',
          smooth: 0.2,
          symbol: 'circle',
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(219,50,51)',
              borderColor: 'rgba(219,50,51,0.2)',
              borderWidth: 12
            }
          },
          data: this.list
        }]
      })
    }
  }
}
</script>
