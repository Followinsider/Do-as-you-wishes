<template>
    <div>
        <!-- 简单体现国际化风格 -->
        {{$t("message") ["app.dashboard.analysis.timeLabel"] }} : 
        <a-date-picker></a-date-picker>

        <!-- Echart图表 -->
        <Chart :options="chartOptions" style="height: 400px;"/>

        <!-- 可交互的组件文档 -->
        <pre v-highlightjs="chartCode"><code class="html"></code></pre>
    </div>
</template>

<script>
import request from '../../utils/request';
import Chart from "../../components/Chart.vue";
import chartCode from '!!raw-loader!../../components/Chart.vue';
export default {
    name: "Analysis",
    components:{ Chart },
    data() {
        return {
            chartOptions: {},
            chartCode,
        }
    },
    mounted() {
        this.getChartData();

    },
    methods: {
        getChartData() {
            request({
                url: '/api/dashboard/chart',
                method: 'get',
                params: {ID: 12345}
            })
            .then(response => {
                this.chartOptions = {
                        title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '销量',
                            type: 'bar',
                            data: response.data
                        }
                    ]
                }
            })

        }
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
}
</script>

<style scoped>
@import 'highlight.js/styles/github.css';
</style>