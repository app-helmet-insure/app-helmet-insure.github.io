<template>
  <div class="helmet_pool">
    <img src="~/assets/img/helmet/star.png" alt="" />
    <div class="text">
      <div class="coin">
        <h3>
          {{ list.name }}
          <!-- <img src="~/assets/img/helmet/5x.png" alt="" /> -->
        </h3>
        <div>
          <p>
            <img src="~/assets/img/helmet/helmetCoin.png" alt="" />
            100%
            <span> HELMET </span>
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
            HELMET
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
              HELMET</span
            >
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
          <p>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Withdraw)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            HELMET {{ $t("Table.WAvailable") }}
          </p>
        </div>
        <div class="content">
          <label for="withdraw">{{ $t("Table.AmountWithdraw") }}</label>
          <div class="input">
            <input
              name="withdraw"
              type="text"
              v-model="balance.Withdraw"
              disabled
            />
            <!-- <input name="withdraw" type="text" v-model="WithdrawNum" /> -->
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
            <span>HELMET {{ $t("Table.HELMETRewards") }}：</span>
            <span>
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
            @click="toCompound"
            :class="claimLoading ? 'disable o_button' : 'o_button'"
          >
            <i :class="claimLoading ? 'loading_pic' : ''"></i
            >{{ $t("Table.Compound") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  totalSupply,
  getLPTOKEN,
  CangetPAYA,
  getPAYA,
  exitStake,
  getBalance,
  toDeposite,
  RewardsDuration,
  compound,
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
        name: "HELMET POOL",
      },
      textList: [
        {
          text: this.$t("Table.RewardsDistribution") + "（weekly）",
          num: 0,
          color: "#00B900",
          unit: "",
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
      isLogin: false,
    };
  },
  mounted() {
    this.$bus.$on("DEPOSITE_LOADING_HELMETPOOL", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_HELMETPOOL", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("EXIT_LOADING_HELMETPOOL", (data) => {
      this.exitLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_HELMETPOOL", () => {
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
    apy(newValue, value) {
      this.apy = newValue;
    },
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
  },
  computed: {
    indexArray() {
      return this.$store.state.allIndexPrice;
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
      let HelmetVolume = await totalSupply("HELMETPOOL");
      let helmetTime = (await RewardsDuration("HELMETPOOL")) / 86400;
      // （1+日产量/总质押量）^365
      let apy = fixD(
        Math.pow(
          precision.plus(1, precision.divide(33057.57, HelmetVolume)),
          365
        ) * 100,
        2
      );

      // let apy = fixD(
      //   precision.times(
      //     precision.divide(
      //       precision.times(33057.57, 365),
      //       Number(HelmetVolume)
      //     ),
      //     100
      //   ),
      //   2
      // );
      this.apy = HelmetVolume ? apy : 0;
      this.textList[1].num = this.apy + "%";
    },
    async getBalance() {
      let helmetType = "HELMETPOOL_LPT";
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

      this.balance.Deposite = fixD(Deposite, 4);
      this.balance.Withdraw = fixD(Withdraw, 4);
      this.balance.Helmet = fixD(Helmet, 8);
      this.balance.TotalLPT = fixD(TotalLPT, 4);
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2);
      this.textList[0].num = fixD(33057.57 * 7, 2) + " HELMET";
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
    // 复投
    toCompound() {
      this.$bus.$emit("OPEN_COMPOUND", {
        title: "Compound HELMET Earned",
        number: this.balance.Helmet,
        pool: "HELMETPOOL",
      });
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "HELMETPOOL";
      let res = await getPAYA(type);
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

<style lang='scss' soped>
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
.compound {
  width: auto !important;
  min-width: 106px;
}
.disable {
  pointer-events: none;
}
.ContractAddress {
  font-size: 13px;
  color: #ff9600;
  margin-top: 8px;
  span {
    color: #121212;
  }
  p {
    display: flex;
    margin-top: 4px;
    align-items: center;
    font-weight: 550;
  }
  i {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-image: url("../../assets/img/helmet/copy.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    margin-left: 4px;
  }
}
@media screen and (min-width: 750px) {
  .helmet_pool {
    margin-bottom: 20px;
    height: 476px;
    background: #ffffff;
    padding: 40px;
    position: relative;
    > img {
      position: absolute;
      width: 36px;
      height: 36px;
      top: 0;
      transform: translateY(-5px);
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
        height: 313px;
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
            > span {
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
  .ContractAddress {
    p {
      font-size: 12px;
    }
  }
  .helmet_pool {
    background: #ffffff;
    padding: 40px 16px;
    position: relative;
    margin-top: 10px;
    > img {
      position: absolute;
      width: 36px;
      height: 36px;
      top: 0;
      transform: translateY(-5px);
    }
    > h3 {
      text-align: center;
    }
    .text {
      display: flex;
      flex-direction: column;
      // padding: 0 140px;
      // justify-content: space-between;
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
        height: 340px;
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