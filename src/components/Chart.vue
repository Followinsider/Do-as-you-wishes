<template>
    <div ref="chartDom"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import {BarChart } from 'echarts/charts';
import {TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';
echarts.use([BarChart, TitleComponent, TooltipComponent, GridComponent, CanvasRenderer])

import {addListener, removeListener} from "resize-detector";
import debounce from "debounce";
export default {
    name: "Chart",
    props: {
        options: {
            type: Object,
            default: ()=> {}
        }
    },
    watch: {
        options(value) {
            this.chart.setOption(value);
        }
    },
    created() {
        this.resize = debounce(this.resize, 400);
    },
    mounted() {
        this.renderChart();
        addListener(this.$refs.chartDom, this.resize);
    },
    beforeDestroy() {
        removeListener(this.$refs.chartDom, this.resize);
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        resize() {
            this.chart.resize()
        },
        renderChart() {
             this.chart = echarts.init(this.$refs.chartDom);
             this.chart.setOption(this.options)
        }
    }
}
</script>

<style>

</style>