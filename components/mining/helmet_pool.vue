<template>
  <div class="helmet_pool">
    <div class="text">
      <div class="coin">
        <h3>{{ list.name }} <img src="~/assets/img/helmet/5x.png" alt="" /></h3>
        <div>
          <p>
            <img src="~/assets/img/helmet/helmetCoin.png" alt="" />
            100%
            <span> HELMET </span>
          </p>
          <!-- <p>
            <img src="~/assets/img/helmet/bnbCoin.png" alt="" />

            50%
            <span> BNB </span>
          </p> -->
        </div>
      </div>
      <div class="index">
        <p v-for="(item, index) in textList" :key="index">
          <span>{{ item.text }}</span>
          <span :style="`color:${item.color}`"
            >{{ item.num
            }}<i v-if="item.unit" style="color: #919aa6">{{ item.unit }}</i>
          </span>
        </p>
      </div>
    </div>
    <div class="pool">
      <div class="deposit">
        <div class="title">
          <span>{{ $t("Table.Deposit") }}</span>
          <p>
            {{ balance.Deposite.length > 60 ? 0 : balance.Deposite }} LPT
            {{ $t("Table.Available") }}
          </p>
        </div>
        <div class="content">
          <label for="deposit">{{ $t("Table.AmountDeposit") }}</label>
          <div class="input">
            <input name="deposit" type="text" v-model="DepositeNum" />
            <!-- <span @click="DepositeNum = balance.Deposite">{{
              $t("Table.Max")
            }}</span> -->
          </div>
        </div>
        <div class="button">
          <button
            @click="toDeposite"
            :class="stakeLoading ? 'disable b_button' : 'b_button'"
          >
            <i :class="stakeLoading ? 'loading_pic' : ''"></i
            >{{ $t("Table.ConfirmDeposit") }}
          </button>
          <p>
            <span
              >{{ $t("Table.MyDeposits") }}/{{
                $t("Table.TotalDeposited")
              }}：</span
            >
            <span> {{ balance.Withdraw }} LPT/{{ balance.TotalLPT }} LPT</span>
          </p>
          <p>
            <span>My Pool Share：</span>
            <span> {{ balance.Share }} %</span>
          </p>
        </div>
      </div>
      <div class="withdraw">
        <div class="title">
          <span>{{ $t("Table.Withdraw") }}</span>
          <p>{{ balance.Withdraw }} LPT {{ $t("Table.Available") }}</p>
        </div>
        <div class="content">
          <label for="withdraw">{{ $t("Table.AmountWithdraw") }}</label>
          <div class="input">
            <input name="withdraw" type="text" v-model="WithdrawNum" />
            <!-- <span @click="WithdrawNum = balance.Withdraw">{{
              $t("Table.Max")
            }}</span> -->
          </div>
        </div>
        <div class="button">
          <button
            @click="toExit"
            :class="exitLoading ? 'disable b_button' : 'b_button'"
          >
            <i :class="exitLoading ? 'loading_pic' : ''"></i
            >{{ $t("Table.ConfirmWithdraw") }} &
            {{ $t("Table.ClaimRewards") }}
          </button>
          <p>
            <span>{{ $t("Table.HELMETRewards") }}：</span>
            <span>
              <span>
                {{ balance.Helmet.length > 60 ? 0 : balance.Helmet }}
                HELMET</span
              >
            </span>
          </p>
          <button
            @click="toClaim"
            :class="claimLoading ? 'disable o_button' : 'o_button'"
          >
            <i :class="claimLoading ? 'loading_pic' : ''"></i
            >{{ $t("Table.ClaimAllRewards") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  totalSupply,
  balanceOf,
  getLPTOKEN,
  CangetPAYA,
  CangetUNI,
  getDoubleReward,
  exitStake,
  getLastTime,
  approveStatus,
  getBalance,
  toDeposite,
  getMined,
  WithdrawAvailable,
  getAllHelmet,
  Rewards,
} from "~/interface/deposite";
import precision from "~/assets/js/precision.js";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
export default {
  data() {
    return {
      list: {
        name: "HELMET-BNB",
      },
      textList: [
        {
          text: this.$t("Table.RewardsDistribution"),
          num: 0,
          color: "#00B900",
          unit: "（weekly）",
        },
        {
          text: this.$t("Table.PoolAPY"),
          num: 0,
          color: "#00B900",
          unit: "",
        },
        //  {
        //   text: this.$t('Table.TotalDeposited'),
        //   num: 0,
        //   color: '#121212',
        //   unit: ''
        // },
        //  {
        //   text: this.$t('Table.MyDeposits'),
        //   num: 0,
        //   color: '#121212',
        //   unit: ''
        // },
        // {
        //   text: this.$t('Table.MyRewards'),
        //   num: 0,
        //   color: '#00B900',
        //   unit: ''
        // }
      ],
      balance: {
        Deposite: 0,
        Withdraw: 0,
        Helmet: 0,
        TotalLPT: 0,
        Share: 0,
      },
      DepositeNum: "",
      WithdrawNum: "",
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
      helmetPrice: 0,
      apy: 0,
    };
  },
  mounted() {
    this.$bus.$on("DEPOSITE_LOADING", (data) => {
      this.stakeLoading = false;
    });
    this.$bus.$on("CLAIM_LOADING", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("EXIT_LOADING", (data) => {
      this.exitLoading = false;
    });
    setTimeout(() => {
      this.getBalance();
      this.getPrice();
    }, 1000);
    setInterval(() => {
      setTimeout(() => {
        this.getPrice();
      });
    }, 2000);
  },
  watch: {
    indexArray: {
      handler: "WatchIndexArray",
      immediate: true,
    },
    apy(newValue, value) {
      this.textList[1].num = newValue + "%";
    },
  },
  computed: {
    indexArray() {
      return this.$store.state.allIndexPrice;
      this.textList[1].num = this.apy + "%";
    },
  },
  methods: {
    WatchIndexArray(newValue, value) {
      if (newValue) {
        this.getPrice();
      }
    },
    async getPrice() {
      // this.helmetPrice = this.indexArray[1]["HELMET"];
      // let cakePrice = this.$store.state.CAKE_BUSD;
      // let bnbPrice = this.$store.state.BNB_BUSD;
      // // 总LPT
      // let totalHelmet = await totalSupply("HELMETBNB_LPT");
      // let HelmetAllowance = await getAllHelmet("HELMET", "FARM", "HELMETBNB");
      // let helmetReward = await Rewards("HELMETBNB", "0");
      // // BNB总价值
      // let bnbValue = (await balanceOf("WBNB", "HELMETBNB_LPT")) * 2;
      // // BNB总价值不翻倍
      // let cakeValue = await balanceOf("HELMETBNB_LPT", "CAKEHELMET", true);
      // let dayHelmet = totalHelmet;
      // let helmetapy = precision.divide(
      //   precision.divide(
      //     precision.times(
      //       precision.times(
      //         this.helmetPrice,
      //         precision.minus(HelmetAllowance, helmetReward)
      //       ),
      //       365
      //     ),
      //     1000
      //   ),
      //   bnbValue
      // );
      let HelmetVolume = await totalSupply("HELMETPOOL");
      this.apy = precision.times(
        precision.divide(precision.times(159000, 365), HelmetVolume),
        100
      );
      this.textList[1].num = this.apy + "%";
    },
    async getBalance() {
      let helmetType = "HELMETBNB_LPT";
      let type = "HELMETPOOL";
      // 可抵押数量
      let Deposite = await getBalance(helmetType);
      // 可赎回数量
      let Withdraw = await getLPTOKEN(type);
      // 总抵押
      let TotalLPT = await totalSupply(type);
      // 可领取Helmet
      let Helmet = await CangetPAYA(type);
      // 总Helmet
      let totalHelmet = await totalSupply(helmetType);

      this.balance.Deposite = toRounding(Deposite, 4);
      this.balance.Withdraw = toRounding(Withdraw, 4);
      this.balance.Helmet = toRounding(Helmet, 8);
      this.balance.TotalLPT = toRounding(TotalLPT, 4);
      this.balance.Share = toRounding((Withdraw / TotalLPT) * 100, 1);
      this.textList[0].num = toRounding(159000 * 7);
      // this.textList[3].num = addCommom(Deposite, 4)
      // this.textList[4].num = addCommom(Helmet, 4)
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
      let type = "HELMETPOOL";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {});
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "HELMETPOOL";
      let res = await getDoubleReward(type);
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return;
      }
      this.exitLoading = true;
      let type = "HELMETPOOL";
      let res = await exitStake(type);
    },
  },
};
</script>

<style lang='scss' scoped>
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878;
  overflow: hidden;
}
.b_button {
  width: 100%;
  margin-top: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.o_button {
  width: 100%;
  margin-top: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
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
.disable {
  pointer-events: none;
}
@media screen and (min-width: 750px) {
  .helmet_pool {
    margin-bottom: 20px;
    height: 536px;
    background: #ffffff;
    padding: 40px;
    > h3 {
      text-align: center;
    }
    .text {
      display: flex;
      // padding: 0 140px;
      justify-content: space-between;
      margin-top: 28px;
      .coin {
        display: flex;
        flex-direction: column;
        h3 {
          height: 32px;
          display: flex;
          margin-bottom: 8px;
          font-size: 24px;
          line-height: 32px;
          img {
            margin-left: 4px;
            width: 32px;
            height: 32px;
          }
        }
        > div {
          display: flex;
          > p {
            display: flex;
            align-items: center;
            color: #121212;
            font-size: 14px;
            margin-right: 14px;
            img {
              width: 32px;
              height: 32px;
              margin-right: 4px;
            }
            span {
              margin-left: 4px;
              color: #919aa6;
            }
          }
        }
      }
      .index {
        display: flex;
        > p {
          display: flex;
          flex-direction: column;
          margin-left: 100px;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              color: #919aa6;
            }
            &:nth-of-type(2) {
              margin-top: 12px;
            }
          }
        }
      }
    }
    .pool {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      > div {
        width: 540px;
        height: 293px;
        padding: 30px 40px;
        .title {
          display: flex;
          justify-content: space-between;
          font-weight: 500;
          line-height: 16px;
          p {
            color: #919aa6;
            font-size: 14px;
            line-height: 16px;
          }
        }
        .content {
          margin-top: 20px;
          label {
            font-size: 14px;
            color: #919aa6;
            line-height: 20px;
          }
          input {
            width: 100%;
            height: 40px;
            border: 1px solid #cfcfd2;
            background: transparent;
            padding: 0 100px 0 12px;
            color: #121212;
          }
          .input {
            margin-top: 4px;
            position: relative;
            display: flex;
            align-items: center;
            span {
              position: absolute;
              right: 15px;
              font-size: 14px;
              color: #121212;
              cursor: pointer;
            }
          }
        }
        .button {
          p {
            margin-top: 11px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              font-size: 14px;
              color: #121212;
              > &:first-of-type {
                font-size: 14px;
                color: #919aa6;
              }
            }
          }
        }
      }
      .deposit {
        border-top: 2px solid #00b900;
        background: rgba(0, 185, 0, 0.04);
        .title {
          > span {
            color: #00b900;
          }
        }
      }
      .withdraw {
        border-top: 2px solid #ff6400;
        background: rgba(255, 100, 0, 0.04);
        .title {
          > span {
            color: #ff6400;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .helmet_pool {
    background: #ffffff;
    padding: 40px 16px;
    > h3 {
      text-align: center;
    }
    .coin {
      margin-top: 12px;
      justify-content: center;
      display: flex;
      align-items: center;
      p {
        display: flex;
        align-items: center;
        color: #121212;
        font-size: 14px;
        margin: 0 10px;
        .icon {
          margin-right: 4px;
        }
        span {
          margin-left: 4px;
          color: #919aa6;
        }
      }
    }
    .text {
      display: flex;
      // padding: 0 140px;
      justify-content: flex-end;
      margin-top: 28px;
      p {
        display: flex;
        flex-direction: column;
        margin-left: 100px;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            color: #919aa6;
          }
          &:nth-of-type(2) {
            margin-top: 12px;
          }
        }
      }
    }
    .pool {
      display: flex;
      // justify-content: space-between;
      flex-direction: column;
      margin-top: 30px;
      > div {
        height: 293px;
        padding: 30px 16px;
        .title {
          display: flex;
          justify-content: space-between;
          font-weight: 500;
          line-height: 16px;
          p {
            color: #919aa6;
            font-size: 14px;
            line-height: 16px;
          }
        }
        .content {
          margin-top: 20px;
          label {
            font-size: 14px;
            color: #919aa6;
            line-height: 20px;
          }
          input {
            width: 100%;
            height: 40px;
            border: 1px solid #cfcfd2;
            background: transparent;
            padding: 0 100px 0 12px;
            color: #121212;
          }
          .input {
            margin-top: 4px;
            position: relative;
            display: flex;
            align-items: center;
            span {
              position: absolute;
              right: 15px;
              font-size: 14px;
              color: #121212;
              cursor: pointer;
            }
          }
        }
        .button {
          p {
            margin-top: 11px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              font-size: 14px;
              color: #121212;
              &:first-of-type {
                font-size: 14px;
                color: #919aa6;
              }
              span {
                display: flex;
                flex-direction: column;
              }
            }
          }
        }
      }
      .deposit {
        border-top: 2px solid #00b900;
        background: rgba(0, 185, 0, 0.04);
        .title {
          > span {
            color: #00b900;
          }
        }
      }
      .withdraw {
        border-top: 2px solid #ff6400;
        background: rgba(255, 100, 0, 0.04);
        .title {
          > span {
            color: #ff6400;
          }
        }
      }
    }
  }
}
</style>