.<template>
  <div class="insurance_title">
    <div class="strikePrice">
      <span>{{ $t("Content.InsurancePrice") }}</span>
      <span>
        {{ activeInsurance }} :
        {{
          activeType == "CALL"
            ? callStrikePrice[activeInsurance]
            : putStrikePrice[activeInsurance]
        }}
        {{
          activeType == "CALL"
            ? callStrikeUnit[activeInsurance]
            : putStrikeUnit[activeInsurance]
        }}</span
      >
    </div>
    <div class="echartPrice">
      <div class="bg_progress_bar">
        <!--  对应替换数据即可  -->
        <div class="progress_bar_left" style="width: 33.3%">
          <p style="right: 0">
            {{ $t("Insurance.Insurance_text19") }}
            <span>{{ putStrikePrice[activeInsurance] }}</span>
          </p>
        </div>
        <div class="progress_bar_center" style="width: 33.3%">
          <i :style="`left: ${positionLeft}%`"></i>
          <p style="left: 50%">
            {{ $t("Insurance.Insurance_text20") }}
            <span v-if="activeInsurance == 'SHIB'">
              {{ fixD(indexPrice[activeInsurance], 10) }}
            </span>
            <span v-else>{{
              activeInsurance == "WBNB"
                ? toRounding(indexPrice[activeInsurance] * BNB_BUSD, 4)
                : toRounding(indexPrice[activeInsurance], 4)
            }}</span>
          </p>
        </div>
        <div class="progress_bar_right" style="width: 33.3%">
          <p style="left: 0">
            {{ $t("Insurance.Insurance_text21") }}
            <span>{{ callStrikePrice[activeInsurance] }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="myBalance">
      <span>{{ $t("Content.UsableBalance") }}</span>
      <p>
        <span>
          <img src="~/assets/img/insurancelist/bnbCoin.png" alt="" />
          <i>{{ BalanceArray["BNB"] ? BalanceArray["BNB"] : 0 }} BNB</i>
        </span>
        <span>
          <img src="~/assets/img/insurancelist/helmetCoin.png" alt="" />
          <i
            >{{ BalanceArray["HELMET"] ? BalanceArray["HELMET"] : 0 }} HELMET</i
          ></span
        >
      </p>
    </div>
  </div>
</template>

<script>
import {
  fixD,
  addCommom,
  autoRounding,
  toRounding,
  fixDEAdd,
} from "~/assets/js/util.js";
export default {
  props: ["activeInsurance", "activeType"],
  data() {
    return {
      fixD,
      addCommom,
      autoRounding,
      toRounding,
      fixDEAdd,
      positionLeft: 50,
    };
  },
  computed: {
    putStrikePrice() {
      return this.$store.state.strikePriceArray[1];
    },
    putStrikeUnit() {
      return this.$store.state.policyColArray[1];
    },
    callStrikePrice() {
      return this.$store.state.strikePriceArray[0];
    },
    callStrikeUnit() {
      return this.$store.state.policyUndArray[0];
    },
    indexPrice() {
      return this.$store.state.allIndexPrice[1];
    },
    BalanceArray() {
      return this.$store.state.BalanceArray;
    },
    BNB_BUSD() {
      return this.$store.state.BNB_BUSD;
    },
  },
  mounted() {
    let timer = setTimeout(() => {
      this.initEchart();
      clearTimeout();
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearTimeout(timer);
    });
  },
  methods: {
    initEchart() {
      let callPrice = this.callStrikePrice[this.activeInsurance];
      let putPrice = this.putStrikePrice[this.activeInsurance];

      let curPrice =
        this.activeInsurance == "WBNB"
          ? this.indexPrice[this.activeInsurance] * this.BNB_BUSD
          : this.indexPrice[this.activeInsurance];
      let number = (curPrice - putPrice) / (callPrice - putPrice);
      this.positionLeft = number * 100;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .insurance_title {
    width: 100%;
    height: 110px;
    display: flex;
    align-items: center;
    .strikePrice {
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          @include themeify {
            color: darken($color: themed("color-17173a"), $amount: 50%);
          }
          line-height: 14px;
        }
        &:nth-of-type(2) {
          margin-top: 13px;
          font-size: 16px;
          font-family: Helvetica;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 16px;
          font-weight: 600;
        }
      }
    }
    .echartPrice {
      width: 450px;
      margin-left: 40px;
      .bg_progress_bar {
        position: relative;
        width: 100%;
        height: 6px;
        @include themeify {
          background: themed("color-e8e8eb");
        }
        border-radius: 3px;
      }
      .progress_bar_left {
        position: absolute;
        left: 0;
        top: 0;
        width: 33%;
        height: 100%;
        border-radius: 3px 0 0 3px;
        background: linear-gradient(180deg, #f0657b 0%, #dc3545 100%);
        &:after {
          content: "";
          position: absolute;
          top: -2px;
          right: 0;
          width: 1px;
          height: 10px;
          background: linear-gradient(180deg, #f0657b 0%, #dc3545 100%);
        }
        p {
          position: absolute;
          top: 14px;
          right: 0;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          @include themeify {
            color: darken($color: themed("color-17173a"), $amount: 55%);
          }
          line-height: 12px;
          text-align: center;
          span {
            font-size: 12px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 500;
            color: #dc3545;
            line-height: 12px;
          }
        }
      }
      .progress_bar_right {
        position: absolute;
        right: 0;
        top: 0;
        width: 33%;
        height: 100%;
        border-radius: 0 3px 3px 0;
        background: linear-gradient(180deg, #51d37b 0%, #28a745 100%);
        &:after {
          content: "";
          position: absolute;
          top: -2px;
          left: 0;
          width: 1px;
          height: 10px;
          background: linear-gradient(180deg, #51d37b 0%, #28a745 100%);
        }
        p {
          position: absolute;
          top: 14px;
          left: 0;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          @include themeify {
            color: darken($color: themed("color-17173a"), $amount: 55%);
          }
          line-height: 12px;
          text-align: center;
          span {
            font-size: 12px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 500;
            color: #28a745;
            line-height: 12px;
          }
        }
      }
      .progress_bar_center {
        position: absolute;
        left: 33%;
        top: 0;
        width: 33%;
        height: 100%;
        i {
          position: absolute;
          top: -2px;
          left: 45%;
          width: 1px;
          height: 10px;
          @include themeify {
            background: themed("color-e8e8eb");
          }
        }
        p {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px 6px;
          width: 100%;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          @include themeify {
            color: darken($color: themed("color-17173a"), $amount: 55%);
          }
          line-height: 12px;
          @include themeify {
            background: themed("color-f8f9fa");
          }
          text-align: center;
          &:after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: -4px;
            transform: translateX(-50%);
            border-right: 4px solid transparent;
            border-top: 5px solid #f8f9fa;
            border-left: 4px solid transparent;
          }
          span {
            font-size: 12px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 500;
            color: #fd7e14;
            line-height: 12px;
          }
        }
      }
    }
    .myBalance {
      margin-left: 40px;
      display: flex;
      flex-direction: column;
      > span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        @include themeify {
          color: darken($color: themed("color-17173a"), $amount: 50%);
        }
        line-height: 14px;
      }
      p {
        margin-top: 13px;
        display: flex;
        align-items: center;
        span {
          display: flex;
          align-items: center;
          &:nth-of-type(1) {
            margin-right: 20px;
          }
          img {
            width: 18px;
            height: 18px;
            margin-right: 4px;
          }
          i {
            font-size: 16px;
            font-family: Helvetica;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 16px;
            font-weight: 600;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .insurance_title {
    width: 100%;
    display: flex;
    flex-direction: column;
    @include themeify {
      border-bottom: 1px solid themed("color-e8e8eb");
    }
    .strikePrice {
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          @include themeify {
            color: darken($color: themed("color-17173a"), $amount: 50%);
          }
          line-height: 14px;
        }
        &:nth-of-type(2) {
          margin-top: 13px;
          font-size: 16px;
          font-family: Helvetica;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 16px;
          font-weight: 600;
        }
      }
    }
    .echartPrice {
      margin-top: 50px;
      width: 100%;
      .bg_progress_bar {
        position: relative;
        width: 100%;
        height: 6px;
        @include themeify {
          background: themed("color-e8e8eb");
        }
        border-radius: 3px;
      }
      .progress_bar_left {
        position: absolute;
        left: 0;
        top: 0;
        width: 33%;
        height: 100%;
        border-radius: 3px 0 0 3px;
        background: linear-gradient(180deg, #f0657b 0%, #dc3545 100%);
        &:after {
          content: "";
          position: absolute;
          top: -2px;
          right: 0;
          width: 1px;
          height: 10px;
          background: linear-gradient(180deg, #f0657b 0%, #dc3545 100%);
        }
        p {
          position: absolute;
          top: 14px;
          right: 0;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          @include themeify {
            color: darken($color: themed("color-17173a"), $amount: 55%);
          }
          line-height: 12px;
          text-align: center;
          span {
            font-size: 12px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 500;
            color: #dc3545;
            line-height: 12px;
          }
        }
      }
      .progress_bar_right {
        position: absolute;
        right: 0;
        top: 0;
        width: 33%;
        height: 100%;
        border-radius: 0 3px 3px 0;
        background: linear-gradient(180deg, #51d37b 0%, #28a745 100%);
        &:after {
          content: "";
          position: absolute;
          top: -2px;
          left: 0;
          width: 1px;
          height: 10px;
          background: linear-gradient(180deg, #51d37b 0%, #28a745 100%);
        }
        p {
          position: absolute;
          top: 14px;
          left: 0;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          @include themeify {
            color: darken($color: themed("color-17173a"), $amount: 55%);
          }
          line-height: 12px;
          text-align: center;
          span {
            font-size: 12px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 500;
            color: #28a745;
            line-height: 12px;
          }
        }
      }
      .progress_bar_center {
        position: absolute;
        left: 33%;
        top: 0;
        width: 33%;
        height: 100%;
        i {
          position: absolute;
          top: -2px;
          left: 45%;
          width: 1px;
          height: 10px;
          @include themeify {
            background: themed("color-e8e8eb");
          }
        }
        p {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px 6px;
          width: 100%;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          @include themeify {
            color: darken($color: themed("color-17173a"), $amount: 55%);
          }
          line-height: 12px;
          @include themeify {
            background: themed("color-f8f9fa");
          }
          text-align: center;
          &:after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: -4px;
            transform: translateX(-50%);
            border-right: 4px solid transparent;
            border-top: 5px solid #f8f9fa;
            border-left: 4px solid transparent;
          }
          span {
            font-size: 12px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 500;
            color: #fd7e14;
            line-height: 12px;
          }
        }
      }
    }
    .myBalance {
      margin-top: 50px;
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      > span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        @include themeify {
          color: darken($color: themed("color-17173a"), $amount: 50%);
        }
        line-height: 14px;
      }
      p {
        margin-top: 4px;
        display: flex;
        align-items: center;
        span {
          display: flex;
          align-items: center;
          &:nth-of-type(1) {
            margin-right: 20px;
          }
          img {
            width: 18px;
            height: 18px;
            margin-right: 4px;
          }
          i {
            font-size: 16px;
            font-family: Helvetica;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 16px;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
