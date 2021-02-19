<template>
  <div class="insurance_form">
    <div>
      <div class="dpr">
        <input type="text" v-model="dpr" @click="handleClickDpr()" readonly />
        <div class="option" v-if="optionFlag">
          <p
            v-for="item in this.dprList"
            :key="item.num"
            @click="checkDpr(item)"
            :class="dpr == item.num ? 'opfocus' : ''"
          >
            {{ item.num }}%
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
        <span class="right">%</span>
      </div>
      <div class="num">
        <input type="text" v-model="volume" />
        <i>{{ unit == "FORTUBE" ? "FOR" : unit }}</i>
        <span class="right" @click="toAll">{{ $t("Table.ALL") }}</span>
      </div>
      <button class="b_b_button" @click="submitSupply">
        {{ $t("Content.Supply") }}
      </button>
    </div>
    <div class="pay">
      <!-- <p>
        折合：<span>{{ strikePrice * volume }} {{ unit }}</span>
      </p> -->
      <p>
        {{ $t("Content.Earning") }}：
        <span>
          {{ Rent }}
          HELMET
        </span>
      </p>
      <!-- <p>
        保费：<span>{{ Rent }} BNB</span>
      </p> -->
      <!-- <p>预期最大收益：<span>11111 BNB</span></p> -->
    </div>
    <!-- <span>
      如果在行权日之前，价格没有达到
      <i></i>
      ，您将获得无风险收益。
    </span> -->
  </div>
</template>

<script>
import { onIssueSell, onIssueSellOnETH } from "~/interface/order.js";
import precision from "~/assets/js/precision.js";
import {
  fixD,
  addCommom,
  autoRounding,
  toRounding,
  fixInput,
} from "~/assets/js/util.js";
export default {
  props: ["currentCoin", "currentType"],
  data() {
    return {
      dpr: 0.07, //DPR
      volume: "", //数量
      precision,
      Rent: 0,
      indexPx: 0.0033,
      strikePrice: 0.0049,
      unit: "BNB",
      currency: "WBNB",
      earnings: 0,
      fixD,
      addCommom,
      autoRounding,
      toRounding,
      optionFlag: false,
      dprList: [
        { num: 0.07, warn: false },
        { num: 0.14, warn: false },
        { num: 0.28, warn: true },
      ],
    };
  },
  computed: {
    undAndCol() {
      if (this.currentCoin && this.currentType) {
        return {
          underly: this.currentCoin,
          curType: this.currentType,
        };
      }
    },
    allDueDate() {
      return this.$store.state.allDueDate;
    },
    // 保费参数
    RentGrounp() {
      return {
        dpr: this.dpr,
        indexPx: this.indexPx,
        strikePrice: this.strikePrice,
        _expiry: this.getTime(this.currentCoin),
        num: this.volume,
      };
    },
    IndexPxArray() {
      return this.$store.state.allIndexPrice;
    },
    HelmetPrice() {
      return this.$store.state.allHelmetPrice;
    },
    BalanceArray() {
      return this.$store.state.BalanceArray;
    },
    BNB_BUSD() {
      return this.$store.state.BNB_BUSD;
    },
    strikePriceArray() {
      return this.$store.state.strikePriceArray;
    },
    // 抵押物
    policyColArray() {
      return this.$store.state.policyColArray;
    },
    // 标的物
    policyUndArray() {
      return this.$store.state.policyUndArray;
    },
    HELMET_BUSD() {
      return this.$store.state.HELMET_BUSD;
    },
  },
  watch: {
    dpr(newValue, val) {
      this.dpr = fixInput(newValue, 2);
      if (newValue > 10) {
        this.dpr = 10;
      }
    },
    volume(newValue, val) {
      this.volume = fixInput(newValue, 4);
    },
    currentCoin(val) {
      this.currentCoin = val;
    },
    currentType(val) {
      this.currentType = val;
    },
    undAndCol: {
      handler: "undAndColWatch",
      immediate: true,
    },
    RentGrounp: {
      handler: {
        handler: "watchRent",
        immediate: true,
      },
    },
  },
  methods: {
    getTime(coin) {
      return this.allDueDate[0][coin];
    },
    handleClickDpr() {
      this.optionFlag = !this.optionFlag;
    },
    checkDpr(item) {
      this.dpr = item.num;
      this.optionFlag = false;
    },
    toAll() {
      if (this.currentType == 1) {
        if (this.BalanceArray) {
          this.volume = this.BalanceArray[this.currentCoin];
        }
      } else {
        this.volume = this.BalanceArray["BNB"];
      }
    },
    submitSupply() {
      // 私有化  不要
      // 标的物
      // 执行价格 行权价
      // 到期日
      // 结算token
      // 单价
      let data;
      data = {
        private: false, //
        annual: this.dpr,
        category: this.policyUndArray[this.currentType - 1][this.currentCoin], //标的物
        currency: this.policyColArray[this.currentType - 1][this.currentCoin], //抵押物
        expire: this.getTime(this.currentCoin), //
        premium: this.Rent,
        price: this.strikePriceArray[this.currentType - 1][this.currentCoin],
        volume: this.volume, //
        settleToken: "HELMET",
        showType: this.currentCoin == "WBNB" ? "BUSD" : "HELMET",
        _yield: 0,
      };
      if (data.category == "WBNB" && data.currency == "BUSD") {
        data["divide"] = true;
      }
      if (data.currency == "WBNB" && data.category != "BUSD") {
        onIssueSellOnETH(data, (status) => {});
      } else {
        onIssueSell(data, (status) => {});
      }
    },
    watchRent(newValue) {
      if (!newValue.dpr || !newValue.num) {
        this.Rent = 0;
        return;
      }
      let { dpr, indexPx, num, strikePrice, _expiry } = newValue;
      if (
        newValue.dpr &&
        newValue.num &&
        newValue.indexPx &&
        newValue.strikePrice &&
        newValue._expiry
      ) {
        let DPR = precision.divide(dpr, 100);
        let time1 = new Date(_expiry).getTime();
        let time2 = new Date().getTime();
        let day = parseInt((time1 - time2) / (1000 * 60 * 60 * 24)) + 1;
        let premium;
        let earnings;
        let number;
        if (this.currentType == 1) {
          if (this.currentCoin == "HELMET") {
            number = precision.times(DPR, num, day);
          } else {
            number = precision.times(
              DPR,
              this.HelmetPrice[1][this.currentCoin] * num,
              day
            );
          }
          console.log(DPR, this.HelmetPrice[1][this.currentCoin], num, day);
          premium = precision.minus(
            number,
            Math.min(precision.minus(strikePrice, indexPx), 0)
          );
          earnings = -(Math.max(indexPx - strikePrice, 0) - premium);
        } else {
          if (this.currentCoin == "WBNB") {
            number = precision.times(DPR, this.HELMET_BUSD * num, day);
            console.log(DPR, this.HELMET_BUSD, num, day);
          } else {
            number = precision.times(
              DPR,
              precision.times(this.IndexPxArray[0]["HELMET"], num),
              day
            );
          }

          premium = precision.minus(
            number,
            Math.min(precision.minus(indexPx, strikePrice), 0)
          );
          earnings = -(Math.max(strikePrice - indexPx, 0) - premium);
        }
        this.Rent = fixD(premium, 8);
        this.earnings = fixD(earnings, 8);
        return toRounding(premium, 8);
      } else {
        return 0;
      }
    },
    undAndColWatch(newValue) {
      let list = this.IndexPxArray;
      let coin = newValue.underly;
      let type = newValue.curType;
      let px;
      let exPx;
      if (!list.length) {
        return;
      }
      if (type == 1) {
        px = list[1][coin];
        exPx = list[1][coin] * 2;
        this.unit = coin;
        if (this.currentCoin == "HELMET") {
          this.strikePrice = addCommom(0.2 / this.BNB_BUSD, 4);
        }
      } else {
        px = list[1][coin];
        exPx = list[1][coin] * 0.5;
        this.unit = this.currentCoin == "WBNB" ? "BUSD" : "BNB";
        if (this.currentCoin == "HELMET") {
          this.strikePrice = addCommom(0.12 / this.BNB_BUSD, 4);
        }
      }
      if (this.currentCoin == "HELMET") {
        return;
      }
      this.indexPx = px;
      this.strikePrice = exPx;
    },
  },
};
</script>

<style lang='scss' scoped>
input:focus {
  border-color: #ff9600 !important;
}
@media screen and (min-width: 750px) {
  .insurance_form {
    > div {
      display: flex;
      .dpr {
        width: 320px;
        display: flex;
        align-items: center;
        font-size: 14px;
        position: relative;
        .info {
          position: absolute;
          width: 500px;
          display: flex;
          align-items: center;
          > i {
            display: block;
            position: absolute;
            width: 16px;
            height: 16px;
            background-image: url("../../assets/img/helmet/info.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            left: 42px;
            cursor: pointer;
          }
          > p {
            display: none;
            padding: 5px 8px;
            background: #1d1d1d;
            min-width: 340px;
            position: absolute;
            top: -45px;
            font-size: 14px;
            color: #f7f7fa;
            border-radius: 3px;
            left: 30px;
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
          background: #ededf0;
          top: calc(100% + 7px);
          .opfocus {
            background: #f7f7fa;
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
          border: 1px solid #cfcfd2;
          padding: 0 30px 0 55px;
          color: #121212;
          text-align: right;
        }
        .left {
          position: absolute;
          left: 12px;
        }
        .right {
          position: absolute;
          right: 12px;
        }
      }
      .num {
        width: 320px;
        position: relative;
        display: flex;
        align-items: center;
        font-size: 14px;
        margin: 0 20px 0 10px;

        input {
          width: 100%;
          height: 40px;
          border: 1px solid #cfcfd2;
          padding: 0 60px 0 12px;
          color: #121212;
        }
        i {
          position: absolute;
          right: 50px;
        }
        .right {
          color: #ff9600;
          cursor: pointer;
          position: absolute;
          right: 12px;
          &:hover {
            color: #ffa000;
          }
        }
      }
    }
    .pay {
      > p {
        margin: 8px 30px 4px 0;
        font-size: 14px;
        color: #919aa6;
        span {
          color: #121212;
        }
      }
    }

    > span {
      font-size: 14px;
      color: #ff9600;
      font-weight: 500;
    }
  }
}
@media screen and (max-width: 750px) {
  .insurance_form {
    > div {
      display: flex;
      flex-direction: column;

      .dpr {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        font-size: 14px;
        .info {
          position: absolute;
          width: 200px;
          display: flex;
          align-items: center;
          > i {
            display: block;
            position: absolute;
            width: 16px;
            height: 16px;
            background-image: url("../../assets/img/helmet/info.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            left: 42px;
            cursor: pointer;
          }
          > p {
            display: none;
            padding: 5px 8px;
            background: #1d1d1d;
            min-width: 200px;
            position: absolute;
            top: -70px;
            font-size: 14px;
            color: #f7f7fa;
            border-radius: 3px;
            left: 30px;
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
          background: #ededf0;
          top: calc(100% + 7px);
          z-index: 1;
          .opfocus {
            background: #f7f7fa;
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
          width: 100%;
          height: 40px;
          border: 1px solid #cfcfd2;
          padding: 0 30px 0 55px;
          color: #919aa6;
          text-align: right;
          &:focus {
            border: 1px solid #cfcfd2 !important;
          }
        }
        .left {
          position: absolute;
          left: 12px;
        }
        .right {
          position: absolute;
          right: 12px;
        }
      }
      .num {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        font-size: 14px;
        margin: 15px 0;
        input {
          width: 100%;
          height: 40px;
          border: 1px solid #cfcfd2;
          padding: 0 60px 0 12px;
          color: #919aa6;
        }

        i {
          position: absolute;
          right: 50px;
        }
        .right {
          color: #ff9600;
          cursor: pointer;
          position: absolute;
          right: 12px;
          &:hover {
            color: #ffa000;
          }
        }
      }
    }
    > p {
      margin: 8px 0 4px 0;
      font-size: 14px;
      color: #919aa6;
      span {
        color: #121212;
      }
    }
    > span {
      font-size: 14px;
      color: #ff9600;
      font-weight: 500;
    }
  }
}
</style>