<template>
  <div class="balance">
    <section>
      <div>
        <span>{{ $t("Content.InsurancePrice") }}</span>
        <p>
          1 {{ currentCoin == "FORTUBE" ? "FOR" : currentCoin }} :
          {{ strikePriceArray[this.currentType - 1][this.currentCoin]
          }}{{ policyColArray[1][this.currentCoin] }}
        </p>
      </div>
      <div>
        <span>{{ $t("Content.ProtectTheCycle") }}</span>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-time"></use>
          </svg>
          {{ getTime(currentCoin) }}
        </p>
      </div>
    </section>

    <div>
      <span>{{ $t("Content.UsableBalance") }}</span>
      <div>
        <p v-if="TradeType == 'sell'">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Helmet"></use>
          </svg>
          {{ isLogin ? BalanceArray[underly] : "--" }}
          {{ underly == "FORTUBE" ? "FOR" : underly }}
        </p>
        <p v-else>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Helmet"></use>
          </svg>
          {{ isLogin ? BalanceArray["HELMET"] : "--" }}
          HELMET
        </p>
        <p v-if="TradeType != 'buy'">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-BNB"></use>
          </svg>
          {{ isLogin ? BalanceArray["BNB"] : "--" }} BNB
        </p>
        <!-- <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Qusd"></use></svg
          >{{ this.QUSD }} QUSD
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/svg/iconfont.js";
import { uniswap } from "~/assets/utils/address-pool.js";
import precision from "~/assets/js/precision.js";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import { toWei, fromWei } from "~/assets/utils/web3-fun.js";
export default {
  props: ["currentCoin", "currentType", "TradeType"],
  data() {
    return {
      underly: "HELMET", //标的物
      curType: 1,
      collateral: "WBNB", //抵押物
      QUSD: 0,
      BNB: 0,
      CAKE: 0,
      HELMET: 0,
      CKT: 0,
      FORTUBE: 0,
      indexPx: 0.0033,
      unit: "WBNB",
      precision,
      toRounding,
      autoRounding,
      fixD,
      addCommom,
      strikePrice: 0.0049,
      isLogin: false,
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
    IndexPxArray() {
      let list = this.$store.state.allIndexPrice;
      return list;
    },
    BalanceArray() {
      let obj = this.$store.state.BalanceArray;
      return obj;
    },
    BNB_BUSD() {
      let num = this.$store.state.BNB_BUSD;
      return num;
    },
    strikePriceArray() {
      return this.$store.state.strikePriceArray;
    },
    policyColArray() {
      return this.$store.state.policyColArray;
    },
    allDueDate() {
      return this.$store.state.allDueDate;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    currentCoin(val, oldVal) {
      if (val) {
        this.underly = val;
        this.currentCoin = val;
      }
    },
    currentType(val, oldVal) {
      if (val) {
        this.curType = val;
        this.currentType = val;
      }
    },
    TradeType(val) {
      if (val) {
        this.TradeType = val;
      }
    },
    undAndCol: {
      handler: "undAndColWatch",
      deep: true,
      immediate: true,
    },
    strikePrice(newValue, value) {
      if (newValue) {
        this.strikePrice = newValue;
      }
    },
    IndexPxArray(newValue, value) {
      if (newValue) {
        this.strikePrice = addCommom(
          this.IndexPxArray[1][this.currentCoin] * 2,
          4
        );
        // this.strikePrice = addCommom(0.2 / this.BNB_BUSD, 4);
      }
    },
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
  },
  methods: {
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin;
      }
    },
    getTime(coin) {
      return this.allDueDate[0][coin];
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
        this.unit = "WBNB";
        if (this.currentCoin == "HELMET") {
          this.strikePrice = addCommom(0.2 / this.BNB_BUSD, 4);
        }
      } else {
        px = list[1][coin];
        exPx = list[1][coin] * 0.5;
        this.unit = "WBNB";
        if (this.currentCoin == "HELMET") {
          this.strikePrice = addCommom(0.12 / this.BNB_BUSD, 4);
        }
      }
      if (this.currentCoin == "HELMET") {
        return;
      }
      this.indexPx = fixD(toRounding(px, 4), 4);
      this.strikePrice = fixD(toRounding(exPx, 4), 4);
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .balance {
    margin-bottom: 30px;
    display: flex;
    section {
      display: flex;
      > div {
        margin-right: 30px;
        span {
          font-size: 14px;
          color: #919aa6;
        }
        p {
          display: flex;
          align-items: center;
          margin-top: 8px;
          line-height: 24px;
          font-size: 14px;
          font-weight: bold;
          color: #121212;
          .icon {
            margin-right: 4px;
          }
        }
      }
    }
    > div {
      span {
        font-size: 14px;
        color: #919aa6;
      }
      p {
        display: flex;
        align-items: center;
        margin-top: 8px;
        line-height: 24px;
        font-size: 14px;
        font-weight: bold;
        color: #121212;
        .icon {
          margin-right: 4px;
        }
      }
      div {
        display: flex;
        p {
          margin-right: 50px;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .balance {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    section {
      display: flex;
      > div {
        flex: 1;
        span {
          font-size: 14px;
          color: #919aa6;
        }
        p {
          display: flex;
          align-items: center;
          margin-top: 8px;
          line-height: 24px;
          font-size: 14px;
          font-weight: bold;
          color: #121212;
          .icon {
            margin-right: 4px;
          }
        }
      }
    }
    > div {
      margin-top: 20px;
      span {
        font-size: 14px;
        color: #919aa6;
      }
      p {
        flex: 1;
        display: flex;
        align-items: center;
        margin-top: 8px;
        line-height: 24px;
        font-size: 14px;
        font-weight: bold;
        color: #121212;
        .icon {
          margin-right: 4px;
        }
      }
      div {
        display: flex;
      }
    }
  }
}
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878;
  overflow: hidden;
}
</style>