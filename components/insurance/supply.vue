<template>
  <div class="issue-insurance">
    <div
      class="issue-call"
      v-if="InsureTypeActive == 'Call' || InsureTypeActive == 'All'"
    >
      <p class="insure">
        <span>{{ $t("Content.InsurancePrice") }}</span>
        <span>
          {{ ActiveData.InsuranceName }} :
          {{ ActiveData.Call.StrikePrice }}
          {{ ActiveData.Call.UnderlyingSymbol }}
        </span>
      </p>
      <div class="dpr">
        <span class="left">DPR</span>
        <div class="info">
          <el-tooltip
            effect="dark"
            placement="top-start"
            :content="$t(`Tip.Dpr`)"
          >
            <svg
              t="1617039040708"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1287"
              width="16px"
              height="16px"
            >
              <path
                d="M512 43.904c258.112 0 468.096 209.984 468.096 468.096 0 258.112-209.984 468.096-468.096 468.096C253.888 980.096 43.904 770.112 43.904 512 43.904 253.888 253.888 43.904 512 43.904z m0 643.648a58.432 58.432 0 1 0-0.128 116.928A58.432 58.432 0 0 0 512 687.552z m0-468.096c-96.768 0-175.552 71.424-175.552 159.232 0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.112-20.352 50.112-45.568 0-37.632 33.792-68.224 75.264-68.224 41.472 0 75.264 30.592 75.264 68.224 0 37.696-33.792 68.288-75.264 68.288-27.712 0-50.176 20.352-50.176 45.504v91.008c0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.176-20.352 50.176-45.568V530.56c72.192-19.712 125.376-79.936 125.376-151.872 0-87.808-78.72-159.232-175.552-159.232z"
                p-id="1288"
              ></path>
            </svg>
          </el-tooltip>
        </div>
        <el-select v-model="CallDpr" style="width: 100%">
          <el-option key="0.0014" value="0.0014" label="0.14%">0.14%</el-option>
          <el-option key="0.0028" value="0.0028" label="0.28%">0.28%</el-option>
          <el-option key="0.0056" value="0.0056" label="0.56%">0.56%</el-option>
        </el-select>
      </div>
      <p class="expect_earn">
        {{ $t("Content.Earning") }}: {{ callRent }} HELMET
      </p>
      <div class="input">
        <el-input v-model="CallPolicyNumber" type="number" />
        <span class="text">{{ ActiveData.Call.CollateralSymbol }}</span>
        <span
          class="max"
          @click="callInsuranceNum = BalanceArray[activeInsurance]"
          >{{ $t("Table.ALL") }}</span
        >
      </div>
      <p class="balance">
        {{ $t("Content.UsableBalance") }}: {{ BalanceArray[activeInsurance] }}
        {{ activeInsurance }}
      </p>
      <button class="button call" @click="submitSupply(1)">
        {{ $t("Insurance.Insurance_text9") }}
      </button>
    </div>
    <i></i>
    <div
      class="issue-put"
      v-if="InsureTypeActive == 'Put' || InsureTypeActive == 'All'"
    >
      <p class="insure">
        <span>{{ $t("Content.InsurancePrice") }}</span>
        <span>
          {{ ActiveData.InsuranceName }} :
          {{ ActiveData.Put.StrikePrice }}
          {{ ActiveData.Call.UnderlyingSymbol }}
        </span>
      </p>
      <div class="dpr">
        <span class="left">DPR</span>
        <div class="info">
          <el-tooltip
            effect="dark"
            placement="top-start"
            :content="$t(`Tip.Dpr`)"
          >
            <svg
              t="1617039040708"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1287"
              width="16px"
              height="16px"
            >
              <path
                d="M512 43.904c258.112 0 468.096 209.984 468.096 468.096 0 258.112-209.984 468.096-468.096 468.096C253.888 980.096 43.904 770.112 43.904 512 43.904 253.888 253.888 43.904 512 43.904z m0 643.648a58.432 58.432 0 1 0-0.128 116.928A58.432 58.432 0 0 0 512 687.552z m0-468.096c-96.768 0-175.552 71.424-175.552 159.232 0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.112-20.352 50.112-45.568 0-37.632 33.792-68.224 75.264-68.224 41.472 0 75.264 30.592 75.264 68.224 0 37.696-33.792 68.288-75.264 68.288-27.712 0-50.176 20.352-50.176 45.504v91.008c0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.176-20.352 50.176-45.568V530.56c72.192-19.712 125.376-79.936 125.376-151.872 0-87.808-78.72-159.232-175.552-159.232z"
                p-id="1288"
              ></path>
            </svg>
          </el-tooltip>
        </div>
        <el-select v-model="CallDpr" style="width: 100%">
          <el-option key="0.0014" value="0.0014" label="0.14%">0.14%</el-option>
          <el-option key="0.0028" value="0.0028" label="0.28%">0.28%</el-option>
          <el-option key="0.0056" value="0.0056" label="0.56%">0.56%</el-option>
        </el-select>
      </div>
      <p class="expect_earn">
        {{ $t("Content.Earning") }}: {{ putRent }} HELMET
      </p>
      <div class="input">
        <el-input v-model="PutPolicyNumber" type="number" />
        <span class="text">{{ ActiveData.Put.CollateralSymbol }}</span>
        <span
          class="max"
          @click="callInsuranceNum = BalanceArray[activeInsurance]"
          >{{ $t("Table.ALL") }}</span
        >
      </div>
      <p class="balance">
        {{ $t("Content.UsableBalance") }}:
        {{ BalanceArray[putType] }}
        {{ putType }}
      </p>
      <button class="button put" @click="submitSupply(2)">
        {{ $t("Insurance.Insurance_text10") }}
      </button>
    </div>
  </div>
</template>

<script>
import precision from "~/assets/js/precision.js";
import { onIssueSell, onIssueSellOnETH } from "~/interface/order.js";
import { fixD, toRounding } from "~/assets/js/util.js";
import BigNumber from "bignumber.js";
export default {
  props: ["ActiveData", "InsureTypeActive"],
  data() {
    return {
      dprList: [
        { num: 0.14, warn: false, show: "0.14%" },
        { num: 0.28, warn: false, show: "0.28%" },
        { num: 0.56, warn: true, show: "0.56%" },
      ],
      precision,
      callDpr: 0.14,
      callDprShow: "0.14%",
      callRent: 0,
      callOptionFlag: false,
      putDpr: 0.14,
      putDprShow: "0.14%",
      putRent: 0,
      putOptionFlag: false,
      CallPolicyNumber: "",
      PutPolicyNumber: "",
      putType: "",
      CallDpr: "0.14%",
      PutDpr: "0.14%",
    };
  },
  computed: {
    allDueDate() {
      return this.$store.state.allDueDate;
    },
    // 保费参数
    RentGrounp() {
      return {
        callDpr: this.callDpr,
        putDpr: this.putDpr,
        callInsuranceNum: this.callInsuranceNum,
        putInsuranceNum: this.putInsuranceNum,
        _expiry: this.getTime(this.activeInsurance),
      };
    },
    IndexPxArray() {
      return this.$store.state.allIndexPrice;
    },
    BalanceArray() {
      return this.$store.state.BalanceArray;
    },
    strikePriceArray() {
      return this.$store.state.strikePriceArray;
    },
    HelmetPrice() {
      return this.$store.state.allHelmetPrice;
    },
    HELMET_BUSD() {
      return this.$store.state.HELMET_BUSD;
    }, // 抵押物
    policyColArray() {
      return this.$store.state.policyColArray;
    },
    // 标的物
    policyUndArray() {
      return this.$store.state.policyUndArray;
    },
  },
  mounted() {
    this.getPutType();
  },
  watch: {
    RentGrounp: {
      handler: {
        handler: "watchRent",
        immediate: true,
      },
    },
  },
  methods: {
    getPutType() {
      let putType =
        this.policyColArray[1][this.activeInsurance] == "WBNB"
          ? "BNB"
          : this.policyColArray[1][this.activeInsurance];
      this.putType = putType;
    },
    handleClickDpr(type) {
      if (type == "call") {
        this.callOptionFlag = !this.callOptionFlag;
      } else {
        this.putOptionFlag = !this.putOptionFlag;
      }
    },
    checkDpr(item, type) {
      if (type == "call") {
        this.callDpr = item.num;
        this.callDprShow = item.show;
        this.callOptionFlag = false;
      } else {
        this.putDpr = item.num;
        this.putDprShow = item.show;
        this.putOptionFlag = false;
      }
    },
    toAll() {
      if (this.currentType == 1) {
        if (this.BalanceArray) {
          this.volume = this.BalanceArray[this.activeInsurance];
        }
      } else {
        this.volume = this.BalanceArray["BNB"];
      }
    },
    watchRent(newValue) {
      if (
        (!newValue.callDpr && !newValue.callInsuranceNum) ||
        (!newValue.putDpr && !newValue.putInsuranceNum)
      ) {
        this.Rent = 0;
        return;
      }
      let { callDpr, putDpr, callInsuranceNum, putInsuranceNum, _expiry } =
        newValue;
      if (
        (newValue.callDpr && newValue.callInsuranceNum && newValue._expiry) ||
        (newValue.putDpr && newValue.putInsuranceNum && newValue._expiry)
      ) {
        // 翻倍执行价
        let callStrikePrice = this.strikePriceArray[0][this.activeInsurance];
        // 翻倍指数价
        let callIndexPx = this.IndexPxArray[0][this.activeInsurance];
        // 腰斩执行价
        let putStrikePrice = this.strikePriceArray[1][this.activeInsurance];
        // 腰斩指数价
        let putIndexPx = this.IndexPxArray[1][this.activeInsurance];
        // 翻倍DPR
        let callDPR = precision.divide(callDpr, 100);
        // 腰斩DPR
        let putDPR = precision.divide(putDpr, 100);
        // 保险到期时间
        let time1 = new Date(_expiry).getTime();
        // 当前时间
        let time2 = new Date().getTime();
        // 剩余天数 不足一天按一天算
        let day = parseInt((time1 - time2) / (1000 * 60 * 60 * 24)) + 1;
        let premium;
        let earnings;
        let number;
        // call
        if (callInsuranceNum.length) {
          if (this.activeInsurance == "HELMET") {
            number = precision.times(callDPR, callInsuranceNum, day);
          } else {
            number = precision.times(
              callDPR,
              this.HelmetPrice[1][this.activeInsurance] *
                Number(callInsuranceNum),
              day
            );
          }
          premium = precision.minus(
            number,
            Math.min(precision.minus(callStrikePrice, callIndexPx), 0)
          );
          earnings = -(Math.max(callIndexPx - callStrikePrice, 0) - premium);
          earnings = BigNumber(earnings.toString()).toFixed();
          this.callRent = fixD(earnings < 0 ? 0 : earnings, 8);
        } else {
          this.callRent = 0;
        }
        // put
        if (putInsuranceNum.length) {
          if (this.activeInsurance == "WBNB") {
            number = precision.times(
              putDPR,
              this.HELMET_BUSD * putInsuranceNum,
              day
            );
          } else {
            number = precision.times(
              putDPR,
              precision.times(this.IndexPxArray[0]["HELMET"], putInsuranceNum),
              day
            );
          }
          premium = precision.minus(
            number,
            Math.min(precision.minus(putIndexPx, putStrikePrice), 0)
          );
          earnings = -(Math.max(putStrikePrice - putIndexPx, 0) - premium);
          this.putRent = fixD(earnings < 0 ? 0 : earnings, 8);
        } else {
          this.putRent = 0;
        }
      }
    },
    // 获取保险时间
    getTime(coin) {
      return this.allDueDate[0][coin];
    },
    submitSupply(type) {
      // 私有化  不要
      // 标的物
      // 执行价格 行权价
      // 到期日
      // 结算token
      // 单价
      data = {};
      let data = {
        private: false, //
        annual: type == 1 ? this.callDpr : this.putDpr,
        category: this.policyUndArray[type - 1][this.activeInsurance], //标的物
        currency: this.policyColArray[type - 1][this.activeInsurance], //抵押物
        expire: this.getTime(this.activeInsurance), //
        premium: type == 1 ? this.callRent : this.putRent,
        price: this.strikePriceArray[type - 1][this.activeInsurance],
        volume: type == 1 ? this.callInsuranceNum : this.putInsuranceNum, //
        settleToken: "HELMET",
        showType: this.activeInsurance == "WBNB" ? "BUSD" : "BNB",
        _yield: 0,
      };
      let object = {
        title: "WARNING",
        layout: "layout1",
        activeTip: true,
        activeTipText1: "Please double check the price above，",
        activeTipText2: "Helmet team will not cover your loss on this.",
        loading: false,
        button: true,
        buttonText: "Confirm",
        showDialog: true,
      };
      if (data.category == "WBNB" && data.currency == "BUSD") {
        data["divide"] = true;
      }
      if (data.currency == "WBNB" && data.category != "BUSD" && type == 2) {
        object.conText = `<p>You will supply <span>${
          data.volume
        } ${"BNB"}</span> Policies, with strike price of <span>${
          data.price
        } ${"BNB"}</span></p>`;
        this.$bus.$emit("OPEN_STATUS_DIALOG", object);
        this.$bus.$on("PROCESS_ACTION", (res) => {
          if (res) {
            onIssueSellOnETH(data, (status) => {
              data = {};
            });
          } else {
            data = {};
            return;
          }
          data = {};
          return;
        });
      } else {
        object.conText = `<p>You will supply <span>${data.volume} ${data.currency}</span> Policies , with strike price of <span>${data.price} ${data.showType}</span></p>`;
        this.$bus.$emit("OPEN_STATUS_DIALOG", object);
        this.$bus.$on("PROCESS_ACTION", (res) => {
          if (res) {
            onIssueSell(data, (status) => {});
          } else {
            data = {};
            return;
          }
          data = {};
          return;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.insure {
  display: flex;
  flex-direction: column;
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
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 16px;
      margin-top: 12px;
    }
  }
}
.dpr {
  margin-top: 20px;
  width: 370px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 14px;
  position: relative;
  .left {
    position: absolute;
    @include themeify {
      color: themed("color-17173a");
    }
    left: 12px;
    z-index: 9;
  }
  .info {
    position: absolute;
    display: flex;
    align-items: center;
    left: 40px;
    height: 100%;
    justify-content: center;
    z-index: 9;
    svg {
      margin: 0 4px 0 2px;
      cursor: pointer;
      width: 16px !important;
      height: 16px !important;
      fill: rgba(164, 162, 178, 1);
      &:hover {
        fill: #fd7e14;
      }
    }
  }
  ::v-deep .el-input__inner {
    padding-left: 60px;
  }
}
.expect_earn {
  font-size: 14px;
  font-family: IBMPlexSans;
  line-height: 20px;
  @include themeify {
    color: darken($color: themed("color-17173a"), $amount: 30%);
  }
}
.input {
  margin-top: 16px;
  width: 370px;
  height: 40px;
  border-radius: 5px;
  @include themeify {
    background: themed("color-ffffff");
  }
  display: flex;
  align-items: center;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    font-size: 14px;
    font-family: IBMPlexSans;
    @include themeify {
      background: themed("color-ffffff");
      color: themed("color-17173a");
    }
  }
  .text {
    position: absolute;
    font-size: 14px;
    font-family: IBMPlexSans;
    @include themeify {
      color: themed("color-17173a");
    }
    right: 62px;
  }
  .max {
    position: absolute;
    right: 12px;
    padding: 0px 8px;
    min-width: 40px;
    height: 24px;
    @include themeify {
      background: themed("insure_button");
      border: 1px solid themed("insure_button_border");
      color: themed("color-17173a");
    }
    &:hover {
      border: 1px solid themed("color-fd7e14") !important;
      color: themed("color-fd7e14") !important;
    }
    border-radius: 5px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
.balance {
  font-size: 14px;
  font-family: IBMPlexSans;
  line-height: 20px;
  @include themeify {
    color: darken($color: themed("color-17173a"), $amount: 30%);
  }
}
.button {
  display: block;
  width: 370px;
  height: 40px;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  margin-top: 20px;
}
.call {
  background: #28a745;
  &:hover {
    background: #3daf57;
  }
}
.put {
  background: #dc3545;
  &:hover {
    background: #df4857;
  }
}
@media screen and (min-width: 750px) {
  .issue-insurance {
    display: flex;
    justify-content: space-evenly;
    padding: 40px 0;

    > i {
      display: block;
      width: 1px;
      height: auto;
      @include themeify {
        background: themed("color-e8e8eb");
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .icon {
    width: 20px;
    height: 20px;
  }
  .issue-insurance {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 16px 18px;
    > div {
      width: 100%;
      > p {
        display: flex;
        flex-direction: column;
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
            font-size: 16px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 600;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 16px;
            margin-top: 12px;
          }
        }
      }
      > span {
        font-size: 12px;
        font-family: IBMPlexSans;
        @include themeify {
          color: darken($color: themed("color-17173a"), $amount: 30%);
        }
        line-height: 14px;
      }
      > button {
        display: block;
        width: 100%;
        height: 40px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        margin-top: 20px;
      }
      .call {
        background: #28a745;
        &:hover {
          background: #3daf57;
        }
      }
      .put {
        background: #dc3545;
        &:hover {
          background: #df4857;
        }
      }
    }

    .input {
      margin-top: 16px;
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      position: relative;
      @include themeify {
        background: themed("color-ffffff");
        border: 2px solid themed("color-e8e8eb");
      }
      input {
        width: 100%;
        height: 100%;
        padding-left: 10px;
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          background: themed("color-ffffff");
          color: themed("color-17173a");
        }
      }
      .text {
        position: absolute;
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          color: themed("color-17173a");
        }
        right: 62px;
      }
      .max {
        position: absolute;
        right: 12px;
        padding: 0px 8px;
        min-width: 40px;
        height: 24px;
        @include themeify {
          background: themed("color-f8f9fa");
          border: 1px solid themed("color-e8e8eb");
          color: themed("color-17173a");
        }
        &:hover {
          border: 1px solid themed("color-fd7e14") !important;
          color: themed("color-fd7e14") !important;
        }
        border-radius: 5px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }

    > i {
      display: none;
    }
  }
}
</style>
