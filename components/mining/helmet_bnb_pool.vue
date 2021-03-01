<template>
  <div class="helmetbnb_pool">
    <img src="~/assets/img/helmet/Combo.png" alt="" class="combo" />
    <div class="text">
      <div class="coin">
        <h3>
          {{ list.name }}
          <img src="~/assets/img/helmet/3x.png" alt="" />
          <img src="~/assets/img/flashmining/helmetlogo.png" alt="" />
          +
          <img src="~/assets/img/flashmining/cakelogo.png" alt="" />
        </h3>
        <div>
          <p>
            <img src="~/assets/img/helmet/helmetCoin.png" alt="" />
            50%
            <span> HELMET </span>
          </p>
          <p>
            <img src="~/assets/img/helmet/bnbCoin.png" alt="" />

            50%
            <span> BNB </span>
          </p>
        </div>
      </div>
      <div class="index">
        <p v-for="(item, index) in textList" :key="index" v-if="index != 0">
          <span>{{ item.text }}</span>
          <span :style="`color:${item.color}`">{{ item.num }} </span>
        </p>
      </div>
    </div>
    <div class="pool">
      <div class="deposit">
        <div class="title">
          <span>{{ $t("Table.Deposit") }}</span>
          <p>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Deposite)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            LPT
            {{ $t("Table.DAvailable") }}
          </p>
        </div>
        <div class="content">
          <label for="deposit">{{ $t("Table.AmountDeposit") }}</label>
          <div class="input">
            <input name="deposit" type="text" v-model="DepositeNum" />
            <span @click="DepositeNum = balance.Deposite">{{
              $t("Table.Max")
            }}</span>
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
            <span style="display: flex; align-self: flex-start">
              <countTo
                v-if="isLogin"
                :startVal="Number(0)"
                :endVal="Number(balance.Withdraw)"
                :duration="2000"
                :decimals="4"
              />
              <span v-else>--</span>
              /
              <countTo
                v-if="isLogin"
                :startVal="Number(0)"
                :endVal="Number(balance.TotalLPT)"
                :duration="2000"
                :decimals="4"
              />
              <span v-else>--</span>
              LPT</span
            >
          </p>

          <section>
            <p>
              <span>My Pool Share：</span>
              <span> {{ isLogin ? balance.Share : "--" }} %</span>
            </p>
            <a
              href="https://exchange.pancakeswap.finance/?_gl=1*zq5iue*_ga*MTYwNTE3ODIwNC4xNjEwNjQzNjU4*_ga_334KNG3DMQ*MTYxMDk0NjUzNC4yMy4wLjE2MTA5NDY1MzUuMA..#/add/ETH/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
              target="_blank"
              >Get HELMET-BNB LPT</a
            >
          </section>
        </div>
      </div>
      <div class="withdraw">
        <div class="title">
          <span>{{ $t("Table.Withdraw") }}</span>
          <p>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Withdraw)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            LPT {{ $t("Table.WAvailable") }}
          </p>
        </div>
        <div class="content">
          <label for="withdraw">{{ $t("Table.AmountWithdraw") }}</label>
          <div class="input">
            <!-- <input name="withdraw" type="text" v-model="WithdrawNum" /> -->
            <input
              name="withdraw"
              type="text"
              v-model="balance.Withdraw"
              disabled
            />
            <span @click="WithdrawNum = balance.Withdraw">{{
              $t("Table.Max")
            }}</span>
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
            <span>TOKEN {{ $t("Table.HELMETRewards") }}：</span>
            <span>
              <span>
                <countTo
                  v-if="isLogin"
                  :startVal="Number(0)"
                  :endVal="Number(balance.Cake)"
                  :duration="2000"
                  :decimals="8"
                />
                <span v-else>--</span>
                CAKE</span
              >
              <span>
                <countTo
                  v-if="isLogin"
                  :startVal="Number(0)"
                  :endVal="Number(balance.Helmet)"
                  :duration="2000"
                  :decimals="8"
                />
                <span v-else>--</span>
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
  RewardsDuration,
} from "~/interface/deposite";
import precision from "~/assets/js/precision.js";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import countTo from "vue-count-to";
export default {
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: "HELMET-BNB",
      },
      textList: [
        {
          text: this.$t("Table.RewardsDistribution") + "（weekly）",
          num: 0,
          color: "#00B900",
          unit: "（weekly）",
        },
        {
          text: this.$t("Table.PoolAPR"),
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
        Cake: 0,
        TotalLPT: 0,
        Share: 0,
      },
      DepositeNum: "",
      WithdrawNum: "",
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
      helmetPrice: 0,
      helmetapy: 0,
      cakeapy: 0,
      isLogin: false,
    };
  },
  mounted() {
    this.$bus.$on("DEPOSITE_LOADING_HELMETBNB", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_HELMETBNB", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("EXIT_LOADING_HELMETBNB", (data) => {
      this.exitLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_HELMETBNB", () => {
      this.getBalance();
    });
    this.$bus.$on("REFRESH_MINING", (data) => {
      this.getBalance();
    });
    setTimeout(() => {
      this.getBalance();
      this.getAPY();
    }, 1000);
    setInterval(() => {
      setTimeout(() => {
        this.getAPY();
      });
    }, 20000);
  },
  watch: {
    indexArray: {
      handler: "WatchIndexArray",
      immediate: true,
    },
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
    helmetapy(newValue, value) {
      if (newValue) {
        this.textList[1].num =
          precision.plus(fixD(newValue * 100, 2), fixD(this.cakeapy * 100, 2)) +
          "%";
      }
    },
    cakeapy(newValue, value) {
      if (newValue) {
        this.textList[1].num =
          precision.plus(
            fixD(this.helmetapy * 100, 2),
            fixD(newValue * 100, 2)
          ) + "%";
      }
    },
  },
  computed: {
    indexArray() {
      return this.$store.state.allIndexPrice;
      this.textList[1].num = this.apy + "%";
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin;
      }
    },
    WatchIndexArray(newValue, value) {
      if (newValue) {
        this.getAPY();
      }
    },
    async getAPY() {
      this.helmetPrice = this.indexArray[1]["HELMET"];
      let cakePrice = this.$store.state.CAKE_BUSD;
      let bnbPrice = this.$store.state.BNB_BUSD;
      // 总LPT
      let totalHelmet = await totalSupply("HELMETBNB_LPT");
      let HelmetAllowance = await getAllHelmet("HELMET", "FARM", "HELMETBNB");
      let helmetReward = await Rewards("HELMETBNB", "0");
      // BNB总价值
      let bnbValue = (await balanceOf("WBNB", "HELMETBNB_LPT")) * 2;
      // BNB总价值不翻倍
      let cakeValue = await balanceOf("HELMETBNB_LPT", "CAKEHELMET", true);
      let miningTime = (await RewardsDuration("HELMETBNB")) / 86400;
      let dayHelmet = totalHelmet;
      // (helmetPrice*(HelmetAllowance-helmetReward)*365)/(100*bnbValue)
      let helmetapy = precision.divide(
        precision.times(
          this.helmetPrice,
          precision.minus(HelmetAllowance, helmetReward),
          365
        ),
        precision.times(miningTime, bnbValue)
      );
      let cakeapy = precision.divide(
        precision.times(cakePrice, 1480000),
        precision.times(
          precision.divide(bnbValue, totalHelmet),
          cakeValue,
          bnbPrice
        )
      );

      this.helmetapy = helmetapy;
      this.cakeapy = cakeapy;
      this.textList[1].num =
        precision.plus(fixD(helmetapy * 100, 2), fixD(cakeapy * 100, 2)) + "%";
    },
    async getBalance() {
      let helmetType = "HELMETBNB_LPT";
      let type = "HELMETBNB";
      // 可抵押数量
      let Deposite = await getBalance(helmetType);
      // 可赎回数量
      let Withdraw = await getLPTOKEN(type);
      // 总抵押
      let TotalLPT = await totalSupply(type);
      // 可领取Helmet
      let Helmet = await CangetPAYA(type);
      //  可领取Cake
      let Cake = await CangetUNI(type);
      // 总Helmet
      let HelmetAllowance = await getAllHelmet("HELMET", "FARM", "HELMETBNB");
      let helmetReward = await Rewards("HELMETBNB", "0");
      this.balance.Deposite = fixD(Deposite, 4);
      this.balance.Withdraw = fixD(Withdraw, 4);
      this.balance.Helmet = fixD(Helmet, 8);
      this.balance.Cake = fixD(Cake, 8);
      this.balance.TotalLPT = fixD(TotalLPT, 4);
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2);
      this.textList[0].num =
        fixD((precision.minus(HelmetAllowance, helmetReward) / 365) * 7, 2) +
        " HELMET";
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
      let type = "HELMETBNB";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => { });
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "HELMETBNB";
      let res = await getDoubleReward(type);
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return;
      }
      this.exitLoading = true;
      let type = "HELMETBNB";
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
  .helmetbnb_pool {
    height: 506px;
    background: #ffffff;
    padding: 40px;
    margin-bottom: 20px;
    > .combo {
      width: 148px;
      transform: translateY(-8px);
    }
    > h3 {
      text-align: center;
    }
    .text {
      display: flex;
      // padding: 0 140px;
      justify-content: space-between;
      .coin {
        display: flex;
        flex-direction: column;
        h3 {
          height: 32px;
          display: flex;
          margin-bottom: 8px;
          font-size: 24px;
          line-height: 32px;
          align-items: center;
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
          section {
            a {
              display: block;
              margin-top: 4px;
              font-size: 14px;
              text-decoration: underline;
              font-weight: 500;
              color: #ff9600;
              line-height: 20px;
            }
          }
          .column {
            flex-direction: column;
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
        .button {
          p {
            margin-top: 11px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            > span:first-child {
              color: #919aa6;
            }
            > span:last-child {
              color: #121212;
            }
            > span {
              font-size: 14px;
              span {
                display: flex;
                color: #121212;
              }
            }
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
        .button {
          p {
            margin-top: 11px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:nth-of-type(1) span {
              font-size: 14px;
            }
            > span {
              font-size: 14px;
              color: #919aa6;
              display: flex;
              span {
                display: flex;
                color: #121212;
                margin-left: 2px;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .helmetbnb_pool {
    background: #ffffff;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 40px 16px;
    > .combo {
      width: 148px;
      transform: translateY(-8px);
    }
    > h3 {
      text-align: center;
    }
    .text {
      display: flex;
      flex-direction: column;
      // padding: 0 140px;
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
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        > p {
          display: flex;
          flex-direction: column;
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
      }
      .deposit {
        border-top: 2px solid #00b900;
        background: rgba(0, 185, 0, 0.04);
        .title {
          > span {
            color: #00b900;
          }
        }
        .button {
          section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            a {
              font-size: 14px;
              font-weight: 500;
              color: #ff9600;
              line-height: 20px;
              text-decoration: underline;
            }
          }
          p {
            margin-top: 11px;
            display: flex;
            flex-direction: column;
            > span:first-child {
              color: #919aa6;
            }
            > span:last-child {
              color: #121212;
            }
            > span {
              font-size: 14px;
              span {
                display: flex;
                flex-direction: column;
                color: #121212;
              }
            }
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
        .button {
          p {
            margin-top: 11px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:nth-of-type(1) span {
              font-size: 14px;
            }
            > span {
              font-size: 14px;
              color: #919aa6;
              span {
                display: flex;
                color: #121212;
              }
            }
          }
        }
      }
    }
  }
}
</style>