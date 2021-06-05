<template>
  <div class="issue-insurance">
    <div
      class="issue-call"
      v-if="InsureTypeActive == 'CALL' || InsureTypeActive == 'ALL'"
    >
      <p>
        <span>{{ $t("Content.InsurancePrice") }}</span>
        <span>
          {{ activeInsurance }}:
          {{ strikePriceArray[0][activeInsurance] }}
          {{ activeInsurance == "WBNB" ? "BUSD" : "BNB" }}
        </span>
      </p>
      <div class="dpr">
        <input
          type="text"
          v-model="callDprShow"
          @click="handleClickDpr('call')"
          readonly
        />
        <div class="option" v-if="callOptionFlag">
          <p
            v-for="item in this.dprList"
            :key="item.num"
            @click="checkDpr(item, 'call')"
            :class="callDpr == item.num ? 'opfocus' : ''"
          >
            {{ item.show }}
            <i v-if="item.warn"></i>
          </p>
        </div>
        <div class="info">
          <i
            ><svg
              t="1617039040708"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1287"
              width="16"
              height="16"
            >
              <path
                d="M512 43.904c258.112 0 468.096 209.984 468.096 468.096 0 258.112-209.984 468.096-468.096 468.096C253.888 980.096 43.904 770.112 43.904 512 43.904 253.888 253.888 43.904 512 43.904z m0 643.648a58.432 58.432 0 1 0-0.128 116.928A58.432 58.432 0 0 0 512 687.552z m0-468.096c-96.768 0-175.552 71.424-175.552 159.232 0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.112-20.352 50.112-45.568 0-37.632 33.792-68.224 75.264-68.224 41.472 0 75.264 30.592 75.264 68.224 0 37.696-33.792 68.288-75.264 68.288-27.712 0-50.176 20.352-50.176 45.504v91.008c0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.176-20.352 50.176-45.568V530.56c72.192-19.712 125.376-79.936 125.376-151.872 0-87.808-78.72-159.232-175.552-159.232z"
                p-id="1288"
              ></path></svg
          ></i>
          <p>
            {{ $t("Tip.Dpr") }}
            <i></i>
          </p>
        </div>
        <span class="left">DPR</span>
        <span class="right"><i></i></span>
      </div>
      <span>{{ $t("Content.Earning") }}: {{ callRent }} HELMET</span>
      <div class="input">
        <input
          type="text"
          v-model="callInsuranceNum"
          maxlength="6"
          :min="1000"
        />
        <span class="text">{{ policyColArray[0][activeInsurance] }}</span>
        <span
          class="max"
          @click="callInsuranceNum = BalanceArray[activeInsurance]"
          >{{ $t("Table.ALL") }}</span
        >
      </div>
      <span
        >{{ $t("Content.UsableBalance") }}: {{ BalanceArray[activeInsurance] }}
        {{ activeInsurance }}</span
      >
      <button class="call" @click="submitSupply(1)">
        {{ $t("Insurance.Insurance_text9") }}
      </button>
    </div>
    <i></i>
    <div
      class="issue-put"
      v-if="InsureTypeActive == 'PUT' || InsureTypeActive == 'ALL'"
    >
      <p>
        <span>{{ $t("Content.InsurancePrice") }}</span>
        <span>
          {{ activeInsurance }}:
          {{ strikePriceArray[1][activeInsurance] }}
          {{ activeInsurance == "WBNB" ? "BUSD" : "BNB" }}
        </span>
      </p>
      <div class="dpr">
        <input
          type="text"
          v-model="putDprShow"
          @click="handleClickDpr('put')"
          readonly
        />
        <div class="option" v-if="putOptionFlag">
          <p
            v-for="item in this.dprList"
            :key="item.num"
            @click="checkDpr(item, 'put')"
            :class="putDpr == item.num ? 'opfocus' : ''"
          >
            {{ item.show }}
            <i v-if="item.warn"></i>
          </p>
        </div>
        <div class="info">
          <i
            ><svg
              t="1617039040708"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1287"
              width="16"
              height="16"
            >
              <path
                d="M512 43.904c258.112 0 468.096 209.984 468.096 468.096 0 258.112-209.984 468.096-468.096 468.096C253.888 980.096 43.904 770.112 43.904 512 43.904 253.888 253.888 43.904 512 43.904z m0 643.648a58.432 58.432 0 1 0-0.128 116.928A58.432 58.432 0 0 0 512 687.552z m0-468.096c-96.768 0-175.552 71.424-175.552 159.232 0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.112-20.352 50.112-45.568 0-37.632 33.792-68.224 75.264-68.224 41.472 0 75.264 30.592 75.264 68.224 0 37.696-33.792 68.288-75.264 68.288-27.712 0-50.176 20.352-50.176 45.504v91.008c0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.176-20.352 50.176-45.568V530.56c72.192-19.712 125.376-79.936 125.376-151.872 0-87.808-78.72-159.232-175.552-159.232z"
                p-id="1288"
              ></path></svg
          ></i>
          <p>
            {{ $t("Tip.Dpr") }}
            <i></i>
          </p>
        </div>
        <span class="left">DPR</span>
        <span class="right"><i></i></span>
      </div>
      <span>{{ $t("Content.Earning") }}: {{ putRent }} HELMET</span>
      <div class="input">
        <input type="text" v-model="putInsuranceNum" maxlength="6" />
        <span class="text">{{ putType }}</span>
        <span class="max" @click="putInsuranceNum = BalanceArray[putType]">{{
          $t("Table.ALL")
        }}</span>
      </div>
      <span
        >{{ $t("Content.UsableBalance") }}:
        {{ BalanceArray[putType] }}
        {{ putType }}</span
      >
      <button class="put" @click="submitSupply(2)">
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
  props: ["activeInsurance", "InsureTypeActive"],
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
      callInsuranceNum: "",
      putInsuranceNum: "",
      putType: "",
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
      let {
        callDpr,
        putDpr,
        callInsuranceNum,
        putInsuranceNum,
        _expiry,
      } = newValue;
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
          console.log(earnings);
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
@media screen and (min-width: 750px) {
  .icon {
    width: 20px;
    height: 20px;
  }
  .issue-insurance {
    display: flex;
    justify-content: space-evenly;
    padding: 40px 0;
    > div {
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
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          color: darken($color: themed("color-17173a"), $amount: 30%);
        }
        line-height: 14px;
      }
      > button {
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
      > input {
        color: themed("color-17173a");
      }
      .info {
        position: absolute;
        display: flex;
        align-items: center;
        left: 40px;
        height: 100%;
        width: 30px;
        justify-content: center;
        margin-top: 4px;
        > i {
          margin: 0 4px 0 2px;
          cursor: pointer;
          svg {
            width: 16px;
            height: 16px;
            fill: rgba(164, 162, 178, 1);
          }
          &:hover {
            svg {
              fill: #fd8a2b;
            }
          }
        }
        > p {
          display: none;
          padding: 5px 8px;
          @include themeify {
            background: themed("color-1d1d1d");
            color: themed("color-f8f9fa");
          }
          min-width: 340px;
          position: absolute;
          top: -55px;
          font-size: 14px;
          border-radius: 3px;
          left: -10px;
          z-index: 9;
          i {
            @include themeify {
              border-top: 5px solid themed("color-1d1d1d");
            }
            border-bottom: 5px solid transparent;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            position: absolute;
            left: 15px;
            bottom: -10px;
          }
        }
        > i:hover + p {
          display: block;
        }
      }
      .option {
        position: absolute;
        width: 100%;
        @include themeify {
          background: themed("color-f8f9fa");
        }
        top: calc(100% + 7px);
        z-index: 1;
        .opfocus {
          background: #fd7e14;
        }
        p {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          cursor: pointer;
          @include themeify {
            color: themed("color-000000");
          }
          i {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../../assets/img/helmet/wran.png");
            background-repeat: no-repeat;
            background-size: cover;
            position: absolute;
            left: 60%;
          }
          &:hover {
            @include themeify {
              background: themed("color-e8e8eb");
            }
          }
        }
      }
      input {
        cursor: pointer;
        width: 100%;
        height: 40px;
        padding: 0 30px 0 65px;
        border-radius: 5px;
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          background: themed("color-ffffff");
          border: 2px solid themed("color-e8e8eb");
        }
      }
      .left {
        position: absolute;
        @include themeify {
          color: themed("color-ededf0");
        }
        left: 12px;
        font-weight: 600;
      }
      .right {
        position: absolute;
        right: 12px;
        i {
          display: block;
          width: 16px;
          height: 16px;
          background-repeat: no-repeat;
          background-image: url("../../assets/img/insurancelist/select_down.png");
          background-size: 100%;
        }
      }
    }
    .input {
      margin-top: 16px;
      width: 370px;
      height: 40px;
      border-radius: 5px;
      @include themeify {
        background: themed("color-ffffff");
        border: 2px solid themed("color-e8e8eb");
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
              background: themed("color-17173a");
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
    .dpr {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      font-size: 14px;
      position: relative;
      > input {
        color: themed("color-17173a");
      }
      .info {
        position: absolute;
        display: flex;
        align-items: center;
        left: 42px;
        height: 100%;
        width: 30px;
        margin-top: 4px;
        justify-content: center;
        > i {
          display: flex;
          cursor: pointer;
          svg {
            width: 16px;
            height: 16px;
            fill: rgba(164, 162, 178, 1);
          }
          &:hover {
            svg {
              fill: #fd8a2b;
            }
          }
        }
        > p {
          display: none;
          padding: 5px 8px;
          min-width: 260px;
          position: absolute;
          top: -55px;
          font-size: 14px;
          @include themeify {
            color: themed("color-f8f9fa");
            background: themed("color-1d1d1d");
          }
          border-radius: 3px;
          left: -10px;
          z-index: 9;
          i {
            @include themeify {
              border-top: 5px solid themed("color-1d1d1d");
            }
            border-bottom: 5px solid transparent;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            position: absolute;
            left: 15px;
            bottom: -10px;
          }
        }
        > i:hover + p {
          display: block;
        }
      }
      .option {
        position: absolute;
        width: 100%;
        @include themeify {
          background: themed("color-f8f9fa");
        }
        top: calc(100% + 7px);
        z-index: 1;
        .opfocus {
          background: #fd7e14;
        }
        p {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          cursor: pointer;
          @include themeify {
            color: themed("color-000000");
          }
          i {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../../assets/img/helmet/wran.png");
            background-repeat: no-repeat;
            background-size: cover;
            position: absolute;
            left: 60%;
          }
          &:hover {
            @include themeify {
              background: themed("color-e8e8eb");
            }
          }
        }
      }
      input {
        cursor: pointer;
        width: 100%;
        height: 40px;
        border: 2px solid #e8e8eb;
        padding: 0 30px 0 65px;
        border-radius: 5px;
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          background: themed("color-ffffff");
        }
      }
      .left {
        position: absolute;
        @include themeify {
          color: themed("color-ededf0");
        }
        left: 12px;
        font-weight: 600;
      }
      .right {
        position: absolute;
        right: 12px;
        i {
          display: block;
          width: 16px;
          height: 16px;
          background-repeat: no-repeat;
          background-image: url("../../assets/img/insurancelist/select_down.png");
          background-size: 100%;
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
          background: themed("color-17173a");
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
