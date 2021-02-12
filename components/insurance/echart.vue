<template>
  <div class="echart">
    <svg id="canvas" width="100%" height="200px" x="200" y="200">
      <line
        v-for="item in xAis"
        :key="item"
        x1="40"
        :y1="item"
        x2="100%"
        :y2="item"
        stroke-width="1"
        stroke="rgba(255, 150, 0, 0.2)"
      />
      <line
        v-for="(item, index) in line"
        :key="item.line"
        x1="40"
        :y1="item.line + '%'"
        x2="100%"
        :y2="item.line + '%'"
        :stroke-dasharray="index == 1 ? '6 2' : ''"
        stroke-width="1"
        :stroke="item.color"
      />
      <text
        v-for="(item, index) in line"
        :key="index"
        x="0"
        :y="item.line + 1.5 + '%'"
        style="font-size: 12px"
        fill="#919AA6"
      >
        {{ item.num }}
      </text>

      <path :d="this.upCover" style="fill: rgba(0, 185, 0, 0.1)" />
      <path :d="this.dwCover" style="fill: rgba(255, 100, 0, 0.1)" />
      <rect
        v-for="(item, index) in line"
        :key="index + 'keyRect'"
        :x="item.rectX + '%'"
        :y="item.line - 12 + '%'"
        :width="RectWidth"
        height="24"
        :fill="item.color"
      />
      <text
        v-for="(item, index) in line"
        :key="index + 'key'"
        :x="item.rectX + 0.5 + '%'"
        :y="item.line - 4 + '%'"
        style="font-size: 12px"
        fill="#fff"
        class="TextWidth"
      >
        {{ item.title }}(${{ fixD(item.num * BNB_BUSD, 2) }})
      </text>
    </svg>
  </div>
</template>

<script>
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
export default {
  data() {
    return {
      str: "0,150 500,150 1080,0",
      xAis: ["25%", "50%", "75%"],
      curCoin: "HELMET",
      price: {},
      linePrice: {},
      toRounding,
      autoRounding,
      fixD,
      max: 0,
      line: [],
      upCover: "",
      dwCover: "",
      drawFlag: false,
      RectWidth: 130,
    };
  },
  mounted() {
    this.$bus.$on("WATCH_COIN", (coin) => {
      this.curCoin = coin;
    });
    setTimeout(() => {
      this.draw();
    }, 1000);
    this.$bus.$on("DRAW_ECHART", (data) => {
      this.draw();
      this.drawFlag = data.drawFlag;
    });
  },
  computed: {
    IndexPrice() {
      return this.$store.state.strikePriceArray;
    },
    BNB_BUSD() {
      return this.$store.state.BNB_BUSD;
    },
    locale() {
      return this.$store.state.locale;
    },
  },
  watch: {
    locale(newValue, Val) {
      if (newValue == "en_US") {
        this.RectWidth = 130;
      } else {
        this.RectWidth = 100;
      }
    },
    curCoin(newVal, Val) {
      let arr = this.$store.state.strikePriceArray[0];
      let arr1 = this.$store.state.strikePriceArray[1];
      let arr2 = this.$store.state.allIndexPrice[1];
      let MaxNum = newVal == "CAKE" ? 2.5 : 1.5;
      let max = toRounding(arr[this.curCoin] * MaxNum, 4);
      this.max = max;
      if (newVal) {
        this.price = {
          IndexPrice: toRounding(Number(arr2[this.curCoin]), 4),
          Cover100: toRounding(arr[this.curCoin], 4),
          Cover50: toRounding(arr1[this.curCoin], 4),
        };
        this.line = [
          {
            line: 100 - toRounding((arr[this.curCoin] / max) * 100, 0),
            cover: 1 - toRounding(arr[this.curCoin] / max, 2),
            num: toRounding(arr[this.curCoin], 4),
            color: "#00B900",
            title: this.$t("Content.ChartUp"),
            rectX: 30,
          },
          {
            line: 100 - toRounding(Number(arr2[this.curCoin] / max) * 100, 0),
            cover: 1 - toRounding(Number(arr2[this.curCoin] / max), 2),
            num: toRounding(arr2[this.curCoin], 4),
            color: "#FF9600",
            title: this.$t("Content.ChartPrice"),
            rectX: 45,
          },
          {
            line: 100 - toRounding((arr1[this.curCoin] / max) * 100, 0),
            cover: 1 - toRounding(arr1[this.curCoin] / max, 2),
            num: toRounding(arr1[this.curCoin], 4),
            color: "#FF6400",
            title: this.$t("Content.ChartOff"),
            rectX: 60,
          },
        ];
        this.upCover = `M40 0 L1080 0 L1080 ${this.line[0].cover * 200} L40 ${
          this.line[0].cover * 200
        } Z`;
        this.dwCover = `M40 200 L1080 200 L1080 ${
          this.line[2].cover * 200
        } L40 ${this.line[2].cover * 200} Z`;
      }
    },
    drawFlag(newVal, val) {},
  },

  methods: {
    draw() {
      setTimeout(() => {
        let arr = this.$store.state.strikePriceArray[0];
        let arr1 = this.$store.state.strikePriceArray[1];
        let arr2 = this.$store.state.allIndexPrice[1];
        let MaxNum = this.curCoin == "CAKE" ? 2.5 : 1.5;
        if (arr.BNB != 0) {
          let max = toRounding(arr[this.curCoin] * MaxNum, 4);
          this.max = max;
          this.price = {
            IndexPrice: toRounding(Number(arr2[this.curCoin]), 4),
            Cover100: toRounding(arr[this.curCoin], 4),
            Cover50: toRounding(arr1[this.curCoin], 4),
          };
          this.line = [
            {
              line: 100 - toRounding((arr[this.curCoin] / max) * 100, 0),
              cover: 1 - toRounding(arr[this.curCoin] / max, 2),
              num: toRounding(arr[this.curCoin], 4),
              color: "#00B900",
              title: this.$t("Content.ChartUp"),
              rectX: 30,
            },
            {
              line: 100 - toRounding(Number(arr2[this.curCoin] / max) * 100, 0),
              cover: 1 - toRounding(Number(arr2[this.curCoin] / max), 2),
              num: toRounding(arr2[this.curCoin], 4),
              color: "#FF9600",
              title: this.$t("Content.ChartPrice"),
              rectX: 45,
            },
            {
              line: 100 - toRounding((arr1[this.curCoin] / max) * 100, 0),
              cover: 1 - toRounding(arr1[this.curCoin] / max, 2),
              num: toRounding(arr1[this.curCoin], 4),
              color: "#FF6400",
              title: this.$t("Content.ChartOff"),
              rectX: 60,
            },
          ];
          this.upCover = `M40 0 L1080 0 L1080 ${this.line[0].cover * 200} L40 ${
            this.line[0].cover * 200
          } Z`;
          this.dwCover = `M40 200 L1080 200 L1080 ${
            this.line[2].cover * 200
          } L40 ${this.line[2].cover * 200} Z`;
        }
      }, 1000);
    },
  },
};
</script>

<style lang='scss' scoped>
.echart {
  width: 100%;
  height: 200px;
  // background: #fcc;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}
</style>