<template>
  <div class="stepTwo">
    <div class="step_title">抵押 LPT 领取 iTOKEN 奖励</div>
    <div class="step_action">
      <label>
        <p>
          <span>{{ $t("Table.AmountDeposit") }}</span>
          <span>
            {{ showMsg.DepositeVolume }} LPT {{ $t("Table.DAvailable") }}
          </span>
        </p>
        <div class="input">
          <input type="text" v-model="DepositeNum" />
          <span @click="DepositeNum = showMsg.DepositeVolume">
            {{ $t("Table.Max") }}
          </span>
        </div>
      </label>
      <button @click="toDeposite" :class="stakeLoading ? 'disable ' : ''">
        <i :class="stakeLoading ? 'loading_pic' : ''"></i>
        {{ $t("Table.ConfirmDeposit") }}
      </button>
    </div>
    <div class="step_details">
      <p class="text">
        <span>
          {{ $t("Table.MyDeposits") }}/{{ $t("Table.TotalDeposited") }}：
        </span>
        <span>
          {{ showMsg.DepositedVolume }}/{{ showMsg.DepositeTotal }} LPT
        </span>
      </p>
      <p class="text">
        <span>{{ $t("Table.MyPoolShare") }}： </span>
        <span> {{ showMsg.MyPoolShare }}%</span>
      </p>
      <a
        href="https://exchange.pancakeswap.finance/?_gl=1*zq5iue*_ga*MTYwNTE3ODIwNC4xNjEwNjQzNjU4*_ga_334KNG3DMQ*MTYxMDk0NjUzNC4yMy4wLjE2MTA5NDY1MzUuMA..#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
        >Get HELMET-BNB LPT</a
      >
      <i></i>
      <p class="text">
        <span>预计可获得： </span>
        <span> 100 iTOKEN <i class="question"></i> </span>
      </p>
      <a>什么是 iTOKEN ？</a>
    </div>
    <button class="getReward" @click="getReward">
      <i :class="claimLoading ? 'loading_pic' : ''"></i>领取奖励
    </button>
  </div>
</template>

<script>
import {
  totalSupply,
  getLPTOKEN,
  getBalance,
  toDeposite,
} from "~/interface/deposite";
import { fixD } from "~/assets/js/util.js";
import { getReward3 } from "~/interface/iio.js";
export default {
  data() {
    return {
      showMsg: {
        DepositeVolume: 0, //可抵押
        DepositedVolume: 0, //已抵押
        DepositeTotal: 0, //总抵押
        MyPoolShare: 0, //我的池子份额
      },
      DepositeNum: "",
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
    };
  },
  mounted() {
    this.$bus.$on("DEPOSITE_LOADING_IIO_HELMETBNB_POOL", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_IIO_HELMETBNB_POOL", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("EXIT_LOADING_IIO_HELMETBNB_POOL", (data) => {
      this.exitLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_IIO_HELMETBNB_POOL", () => {
      this.getBalance();
    });
    this.$bus.$on("REFRESH_MINING", (data) => {
      this.getBalance();
    });
    setTimeout(() => {
      this.getBalance();
    }, 1000);
  },
  methods: {
    async getBalance() {
      let lpt_name = "IIO_HELMETBNB_LPT";
      let pool_name = "IIO_HELMETBNB_POOL";
      // 可抵押数量
      let DepositeVolume = await getBalance(lpt_name);
      // 已抵押数量
      let DepositedVolume = await getLPTOKEN(pool_name);
      // 总抵押
      let DepositeTotal = await totalSupply(pool_name);

      this.showMsg.DepositeVolume = fixD(DepositeVolume, 4);
      this.showMsg.DepositedVolume = fixD(DepositedVolume, 4);
      this.showMsg.DepositeTotal = fixD(DepositeTotal, 4);
      this.showMsg.MyPoolShare = fixD(
        (DepositedVolume / DepositeTotal) * 100,
        2
      );
      if (DepositeVolume) {
        this.DepositeNum = DepositeVolume;
      }
    },
    // 领取奖励
    async getReward() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let pool_name = "IIO_HELMETBNB_POOL";
      let res = await getReward3(pool_name);
    },
    // 抵押
    toDeposite() {
      if (!this.DepositeNum) {
        return;
      }
      if (this.stakeLoading) {
        return;
      }
      this.stakeLoading = true;
      let type = "IIO_HELMETBNB_POOL";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {});
    },
  },
};
</script>

<style lang='scss' scped>
.disable {
  pointer-events: none;
}
.loading_pic {
  display: block;
  width: 24px;
  height: 24px;
  background-image: url("../../assets/img/helmet/loading.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
}
@media screen and (min-width: 750px) {
  .stepTwo {
    width: 420px;
    margin: 0 auto;
    .step_title {
      font-size: 18px;
      font-weight: 600;
      color: #121212;
    }
    .step_action {
      > label {
        > p {
          margin: 20px 0 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 14px;
            color: #9b9b9b;
          }
        }
        .input {
          width: 100%;
          height: 40px;
          position: relative;
          display: flex;
          align-items: center;
          input {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            border: 1px solid #cfcfd2;
            padding-left: 12px;
            &:focus {
              height: 39px;
              border: 2px solid #ff9600;
              padding-left: 11px;
            }
          }
          span {
            position: absolute;
            font-size: 14px;
            color: #121212;
            right: 15px;
            cursor: pointer;
          }
        }
      }
      > button {
        margin-top: 20px;
        width: 100%;
        height: 40px;
        background: #121212;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
    .step_details {
      margin-top: 12px;
      .text {
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            color: #9b9b9b;
            line-height: 20px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            color: #121212;
            line-height: 20px;
            display: flex;
            align-items: center;
          }
        }
      }
      > a {
        display: inline-block;
        font-size: 14px;
        font-weight: 600;
        color: #ff9600;
        line-height: 20px;
        margin-top: 4px;
      }
    }
    .getReward {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      background: #ff9600;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #ffa000;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .stepTwo {
    width: 100%;
    .step_title {
      font-size: 14px;
      font-weight: 600;
      color: #121212;
    }
    .step_action {
      > span {
        font-size: 14px;
        font-weight: 600;
        color: #121212;
        display: block;
        margin-top: 20px;
      }
      > label {
        > p {
          margin: 12px 0 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 12px;
            color: #9b9b9b;
          }
        }
        .input {
          width: 100%;
          height: 40px;
          position: relative;
          display: flex;
          align-items: center;
          input {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            border: 1px solid #cfcfd2;
            background: #f7f7fa;
            padding-left: 12px;
            &:focus {
              height: 39px;
              border: 2px solid #ff9600;
              padding-left: 11px;
            }
          }
          span {
            position: absolute;
            font-size: 14px;
            color: #121212;
            right: 15px;
            cursor: pointer;
          }
        }
      }
      > button {
        margin-top: 20px;
        width: 100%;
        height: 40px;
        background: #121212;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
    .step_details {
      margin-top: 20px;
      .text {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            color: #9b9b9b;
            line-height: 20px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            color: #121212;
            line-height: 20px;
          }
        }
      }
      > i {
        display: block;
        width: 100%;
        height: 1px;
        border: 1px dashed #ebe9e3;
        margin-top: 10px;
      }
      > a {
        display: block;
        margin-top: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #ff9600;
        line-height: 20px;
      }
    }
    .getReward {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      background: #ff9600;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #ffa000;
      }
    }
  }
}
</style>