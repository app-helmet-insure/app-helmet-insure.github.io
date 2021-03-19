<template>
  <div>
    <div ref="container" id="chartWrap"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";

export default {
  data() {
    return {
      windowWidth: 1280,
      showDom: false,
    };
  },
  watch: {
    windowWidth(val) {
      if (val <= 750) {
        this.showDom = false;
      } else {
        this.showDom = true;
      }
    },
  },
  mounted() {
    this.windowWidth = document.body.clientWidth;
    this.onResize();
    this.initChart();
  },
  methods: {
    initChart() {
      HighchartsMore(Highcharts);
      HighchartsDrilldown(Highcharts);
      Highcharts3D(Highcharts);
      let dom = this.$refs.container;
      var chart = Highcharts.chart(dom, {
        title: {
          text: null,
        },
        chart: {
          backgroundColor: "#f7f7fa",
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0,
          },
        },
        credits: {
          enabled: false, // 默认值，如果想去掉版权信息，设置为false即可
        },
        plotOptions: {
          pie: {
            depth: this.showDom ? 3 : 12,
            dataLabels: {
              enabled: false,
              format: "{point.name}",
            },
          },
        },
        tooltip: {
          enabled: false,
        },
        dataLabels: {
          enabled: false,
        },
        series: [
          {
            size: "100%",
            type: "pie",
            name: "份额占比",
            data: [
              ["Firefox", 96],
              ["我的份额", 4],
            ],
            colors: ["#FF9600", "#FFDFB2"],
          },
        ],
      });
    },
    onResize() {
      window.onresize = () => {
        return (() => {
          window.fullWidth = document.documentElement.clientWidth;
          this.windowWidth = window.fullWidth; // 宽
        })();
      };
    },
  },
};
</script>

<style lang='scss' socped>
@media screen and (min-width: 750px) {
  #chartWrap {
    width: 200px;
    height: 200px;
    pointer-events: none;
  }
}
@media screen and (max-width: 750px) {
  #chartWrap {
    width: 100px;
    height: 100px;
    pointer-events: none;
  }
}
</style>