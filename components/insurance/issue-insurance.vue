<template>
  <div class="issue-insurance">
    <div class="issue-call">
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
          <i></i>
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
        <input type="text" v-model="callInsuranceNum" />
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
    <div class="issue-put">
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
        <input type="text" v-model="putInsuranceNum" />
        <span class="text">{{
          policyColArray[1][activeInsurance] == "WBNB"
            ? "BNB"
            : policyColArray[1][activeInsurance]
        }}</span>
        <span
          class="max"
          @click="putInsuranceNum = BalanceArray[activeInsurance]"
          >{{ $t("Table.ALL") }}</span
        >
      </div>
      <span
        >{{ $t("Content.UsableBalance") }}: {{ BalanceArray["BNB"] }} BNB</span
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
import { fixD } from "~/assets/js/util.js";
export default {
  props: ["activeInsurance"],
  data() {
    return {
      dprList: [
        { num: 0.14, warn: false, show: "0.14%" },
        { num: 0.28, warn: true, show: "0.28%" },
        { num: 0.56, warn: false, show: "0.56%" },
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
  watch: {
    RentGrounp: {
      handler: {
        handler: "watchRent",
        immediate: true,
      },
    },
  },
  methods: {
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
          console.log(number);
          premium = precision.minus(
            number,
            Math.min(precision.minus(callStrikePrice, callIndexPx), 0)
          );
          console.log(callInsuranceNum);
          earnings = -(Math.max(callIndexPx - callStrikePrice, 0) - premium);
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
      let data;
      data = {
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
      console.log(data);
      if (data.category == "WBNB" && data.currency == "BUSD") {
        data["divide"] = true;
      }
      if (data.currency == "WBNB" && data.category != "BUSD") {
        onIssueSellOnETH(data, (status) => {});
      } else {
        onIssueSell(data, (status) => {});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
            color: rgba(23, 23, 58, 0.5);
            line-height: 14px;
          }
          &:nth-of-type(2) {
            font-size: 16px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 600;
            color: #17173a;
            line-height: 16px;
            margin-top: 12px;
          }
        }
      }
      > span {
        font-size: 14px;
        font-family: IBMPlexSans;
        color: rgba(23, 23, 58, 0.7);
        line-height: 14px;
      }
      > button {
        display: block;
        width: 370px;
        height: 40px;
        border-radius: 5px;
        font-size: 14px;
        color: #ffffff;
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
      .info {
        position: absolute;
        width: 500px;
        display: flex;
        align-items: center;
        left: 40px;
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
          background: #1d1d1d;
          min-width: 340px;
          position: absolute;
          top: -35px;
          font-size: 14px;
          color: #f7f7fa;
          border-radius: 3px;
          left: -10px;
          z-index: 9;
          i {
            border: 5px solid #1d1d1d;
            border-bottom-color: transparent;
            border-left-color: transparent;
            border-right-color: transparent;
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
        background: #f8f9fa;
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
            background: #f7f7fa;
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
        color: #121212;
      }
      .left {
        position: absolute;
        color: rgba(23, 23, 58, 0.4);
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
      border: 2px solid #e8e8eb;
      display: flex;
      align-items: center;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        padding-left: 10px;
        font-size: 14px;
        font-family: IBMPlexSans;
        color: #17173a;
      }
      .text {
        position: absolute;
        font-size: 14px;
        font-family: IBMPlexSans;
        color: #121212;
        right: 62px;
      }
      .max {
        position: absolute;
        right: 12px;
        padding: 0px 8px;
        min-width: 40px;
        height: 24px;
        background: #f8f9fa;
        border-radius: 5px;
        border: 1px solid #e8e8eb;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #17173a;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }

    > i {
      display: block;
      width: 1px;
      height: auto;
      background: #e8e8eb;
    }
  }
}
</style>
