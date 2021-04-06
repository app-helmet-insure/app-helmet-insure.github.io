<template>
  <div ref="container" id="chartWrap"></div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
import { totalSupply, getLPTOKEN } from "~/interface/deposite";
import { fixD } from "~/assets/js/util.js";
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
  async mounted() {
    this.windowWidth = document.body.clientWidth;
    this.onResize();
    let pool_name = "IIO_HELMETBNB_POOL";
    let DepositedVolume = await getLPTOKEN(pool_name);
    let DepositeTotal = await totalSupply(pool_name);
    // 总抵押
    this.initChart(DepositedVolume, DepositeTotal);
    setTimeout(() => {
      this.getBalance();
    }, 1000);
  },

  methods: {
    async getBalance() {
      let pool_name = "IIO_HELMETBNB_POOL";
      // 已抵押数量
      let DepositedVolume = await getLPTOKEN(pool_name);
      // 总抵押
      let DepositeTotal = await totalSupply(pool_name);
      let data = {
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
            depth: this.showDom ? 10 : 8,
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
            size: this.showDom ? "120%" : "150%",
            type: "pie",
            name: "份额占比",
            data: [
              ["其他份额", Number(DepositeTotal)],
              ["我的份额", Number(DepositedVolume)],
            ],
            colors: ["#FF9600", "#FFDFB2"],
          },
        ],
      };
      let dom = this.$refs.container;
      Highcharts.chart(dom, data);
    },
    initChart() {
      HighchartsMore(Highcharts);
      HighchartsDrilldown(Highcharts);
      Highcharts3D(Highcharts);
      // 已抵押数量
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
    width: 120px;
    height: 120px;
    pointer-events: none;
    transform: translateY(20px);
    margin-right: 100px;
  }
}
</style>