<template>
  <div class="mining_pool">
    <div class="deposit">
      <div class="title">
        <span>{{ $t("Table.DAvailable") }}：</span>
        <p>
          <countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(balance.Deposite)"
            :duration="2000"
            :decimals="8"
          />
          <span v-else>--</span>
          DLP
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="deposit"
            type="text"
            v-model="DepositeNum"
            :class="activeType == 'STAKE' ? 'activeInput' : ''"
          />
          <span @click="DepositeNum = balance.Deposite">最大量</span>
        </div>
      </div>
      <div class="button">
        <button
          @click="toDeposite"
          :class="stakeLoading ? 'disable b_button' : 'b_button'"
          :style="
            expired ? 'background: #ccc !important; pointer-events:none' : ''
          "
        >
          <i :class="stakeLoading ? 'loading_pic' : ''"></i
          >{{ $t("Table.ConfirmDeposit") }}
        </button>
        <p>
          <span>{{ $t("Table.MyDeposits") }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Withdraw)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;DLP</span
          >
        </p>
        <p>
          <span>{{ $t("Table.TotalDeposited") }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.TotalLPT)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;DLP</span
          >
        </p>

        <section>
          <p>
            <span>{{ $t("Table.MyPoolShare") }}：</span>
            <span> {{ isLogin ? balance.Share : "--" }} %</span>
          </p>
          <a
            href="https://app.dodoex.io/liquidity?poolAddress=0x7f6ea24c10e32c8a5fd1c9b2c1239340671460cc"
            target="_blank"
            >From <i class="dodo"></i>Get HELMET-hDODO DLP</a
          >
        </section>
      </div>
      <div class="ContractAddress">
        <span>hDODO Contract Address：</span>
        <p>
          0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3')
            "
          ></i>
        </p>
      </div>
    </div>
    <div class="withdraw">
      <div class="title">
        <span>可赎回抵押：</span>
        <p>
          <countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(balance.Withdraw)"
            :duration="2000"
            :decimals="8"
          />
          <span v-else>--</span>
          DLP
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="withdraw"
            type="text"
            v-model="balance.Withdraw"
            disabled
            :class="activeType == 'CLAIM' ? 'activeInput' : ''"
          />
          <span @click="WithdrawNum = balance.Withdraw">最大量</span>
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
          <span>DODO {{ $t("Table.HELMETRewards") }}：</span>
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
              DODO</span
            >
          </span>
        </p>
        <p>
          <span>HELMET {{ $t("Table.HELMETRewards") }}：</span>
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
        </p>
        <button
          @click="toClaim"
          :class="claimLoading ? 'disable o_button' : 'o_button'"
          :style="
            expired ? 'background: #ccc !important; pointer-events: none' : ''
          "
        >
          <i :class="claimLoading ? 'loading_pic' : ''"></i
          >{{ $t("Table.ClaimAllRewards") }}
        </button>
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
  getBalance,
  toDeposite,
} from "~/interface/deposite";
import precision from "~/assets/js/precision.js";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import { uniswap } from "~/assets/utils/address-pool.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import countTo from "vue-count-to";
export default {
  props: ["activeType"],
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: "HELMET-hDODO DLP",
        dueDate: "2021/04/10 00:00",
        DownTime: {
          day: "00",
          hour: "00",
          minute: "00",
          second: "00",
        },
      },
      textList: [
        {
          text: this.$t("Table.RewardsDistribution") + `（weekly）`,
          num: 0,
          color: "#00B900",
          unit: "",
          num1: 0,
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
      MingTime: "",
      isLogin: false,
      expired: false,
    };
  },
  mounted() {
    setInterval(() => {
      setTimeout(() => {
        this.getMiningTime();
        this.getDownTime();
      });
      clearTimeout();
    }, 1000);
    this.$bus.$on("DEPOSITE_LOADING_DODOHELMET", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_DODOHELMET", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("EXIT_LOADING_DODOHELMET", (data) => {
      this.exitLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_DODOHELMET", () => {
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
    showOnepager() {
      this.$bus.$emit("OPEN_ONEPAGER", {
        showFlag: true,
        title: "What is $hDODO?",
        text: [
          "hDODO is the call option of DODO.",
          "Total Supply: 75,000 (22,000 for vDODO holders, 40,000 for FLASH Mining, 10,000 for Burning BOX) Reasonable strike price: 1 DODO= 10 HELMET",
          "Expire date: Apr. 14th 24:00 SGT",
          "Example: If you get 1 hDODO, you could swap 10 HELMET to 1 DODO by click the 'activate' button on TradingView Tab. To be specific, if DODO hit $21 and HELMET hit $2, you could get $1 profit by this 'Activate' behavior.",
          "If hDODO get expired, it could be souvenir token",
          "Please do not trade heavily on hDODO.",
        ],
      });
    },
    getDownTime() {
      let now = new Date() * 1;
      let dueDate = this.list.dueDate;
      dueDate = new Date(dueDate);
      let DonwTime = dueDate - now;
      let day = Math.floor(DonwTime / (24 * 3600000));
      let hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000);
      let minute = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
      );
      let second = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      );
      let template;

      if (dueDate > now) {
        template = {
          day: day > 9 ? day : "0" + day,
          hour: hour > 9 ? hour : "0" + hour,
        };
      } else {
        template = {
          day: "00",
          hour: "00",
        };
        this.expired = true;
      }
      this.list.DownTime = template;
    },
    getMiningTime() {
      let now = new Date() * 1;
      let dueDate = "2021/03/20 00:00";
      dueDate = new Date(dueDate);
      let DonwTime = dueDate - now;
      let day = Math.floor(DonwTime / (24 * 3600000));
      let hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000);
      let minute = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
      );
      let second = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      );
      let template;
      if (dueDate < now) {
        template = ``;
      } else {
        template = `${hour}${this.$t("Content.HourD")} ${minute}${this.$t(
          "Content.MinD"
        )} ${second}${this.$t("Content.SecondD")}`;
      }
      this.MingTime = template;
    },
    copyAdress(e, text) {
      let _this = this;
      let copys = new ClipboardJS(".copy", { text: () => text });
      copys.on("success", function (e) {
        Message({
          message: "Successfully copied",
          type: "success",
          // duration: 0,
        });
        copys.destroy();
      });
      copys.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
        copys.destroy();
      });
    },
    WatchIndexArray(newValue, value) {
      if (newValue) {
        this.getAPY();
      }
    },
    async getAPY() {
      // FOR的helmet价值
      let lptBnbValue = await uniswap("DODO", "WBNB");
      let lptHelmetValue = await uniswap("WBNB", "HELMET");
      let DODOHELMET = lptBnbValue * lptHelmetValue;
      let allVolume = DODOHELMET * 10000;
      //总抵押
      let supplyVolume = await totalSupply("DODOHELMET"); //数量
      // 总发行
      let stakeVolue = await totalSupply("DODOHELMET_LPT"); //数量
      // 抵押总价值
      let stakeValue = await balanceOf("HELMET", "DODOHELMET_LPT", true);
      let burgerApy = fixD(
        precision.times(
          precision.divide(
            precision.times(precision.divide(allVolume, 21), 365),
            precision.times(
              precision.divide(precision.times(stakeValue, 2), stakeVolue),
              supplyVolume
            )
          ),
          100
        ),
        2
      );
      let helmetApy = fixD(
        precision.times(
          precision.divide(
            precision.times(precision.divide(25000, 21), 365),
            precision.times(
              precision.divide(precision.times(stakeValue, 2), stakeVolue),
              supplyVolume
            )
          ),
          100
        ),
        2
      );

      let apy = precision.plus(burgerApy, helmetApy);
      this.apy = apy ? apy : 0;
      if (this.expired) {
        this.textList[1].num = "--";
      } else {
        this.textList[1].num = this.apy + "%";
      }
    },
    async getBalance() {
      let helmetType = "DODOHELMET_LPT";
      let type = "DODOHELMET";
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

      // 赋值
      this.balance.Deposite = fixD(Deposite, 4);
      this.balance.Withdraw = fixD(Withdraw, 4);
      this.balance.Helmet = fixD(Helmet, 8);
      this.balance.Cake = fixD(Cake, 8);
      this.balance.TotalLPT = fixD(TotalLPT, 4);
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2);

      if (this.expired) {
        this.textList[0].num = "--";
        this.textList[0].num1 = "--";
      } else {
        this.textList[0].num = fixD((25000 / 21) * 7, 2) + " HELMET";
        this.textList[0].num1 = fixD((10000 / 21) * 7, 2) + " DODO";
      }
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
      let type = "DODOHELMET";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {});
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "DODOHELMET";
      let res = await getDoubleReward(type);
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return;
      }
      this.exitLoading = true;
      let type = "DODOHELMET";
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
  .mining_pool {
    padding: 40px 0;
    display: flex;
    justify-content: space-evenly;
    > i {
      display: block;
      width: 1px;
      height: auto;
      background: #e8e8eb;
    }
    > div {
      width: 420px;
      .title {
        display: flex;
        justify-content: space-between;
        font-weight: 500;
        line-height: 16px;
        > span {
          font-size: 14px;
          font-weight: 500;
          color: rgba(23, 23, 58, 0.75);
          line-height: 14px;
        }
        p {
          font-size: 14px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          color: #17173a;
          line-height: 14px;
        }
      }
      .content {
        margin-top: 20px;
        input {
          width: 100%;
          height: 40px;
          background: transparent;
          padding: 0 100px 0 12px;
          color: #121212;
          border-radius: 5px;
          border: 1px solid #e8e8eb;
        }
        .input {
          margin-top: 4px;
          position: relative;
          display: flex;
          align-items: center;
          span {
            display: flex;
            align-items: center;
            padding: 0 8px;
            height: 24px;
            position: absolute;
            right: 15px;
            font-size: 12px;
            cursor: pointer;
            color: #17173a;
            background: #f8f9fa;
            border-radius: 5px;
            border: 1px solid #e8e8eb;
          }
        }
      }
      .button {
        section {
          a {
            margin-top: 4px;
            font-size: 14px;
            font-weight: 500;
            color: #ff9600;
            line-height: 20px;
            display: flex;
            align-items: center;
            i {
              display: block;
              width: 20px;
              height: 20px;
              background-image: url("../../assets/img/icon/pancake@2x.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin: 0 2px;
            }
          }
        }
      }
    }
    .deposit {
      .button {
        p {
          margin-top: 11px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          > span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              color: rgba(23, 23, 58, 0.7);
              line-height: 14px;
            }
            &:nth-of-type(2) {
              display: flex;
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #17173a;
              line-height: 14px;
            }
          }
        }
      }
    }
    .withdraw {
      .button {
        p {
          margin-top: 11px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          > span {
            &:nth-of-type(1) {
              font-size: 14px;
              color: rgba(23, 23, 58, 0.7);
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #17173a;
              line-height: 14px;
            }
          }
        }
      }
    }
  }
  .activeInput {
    border: 1px solid #ff9600 !important;
  }
}
@media screen and (max-width: 750px) {
  .miningTime {
    position: absolute;
    right: 16px;
    top: 0px;
    font-size: 14px;
  }
  .mining_pool {
    background: #ffffff;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 40px 16px;
    position: relative;
    > .combo {
      width: 148px;
      transform: translateY(-8px);
      height: 28px;
    }
    .finished {
      position: absolute;
      width: 102px;
      height: 102px;
      top: 0;
      right: 0;
      transform: translateY(0);
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
          height: 55px;
          display: flex;
          margin-bottom: 8px;
          font-size: 24px;
          line-height: 32px;
          flex-direction: column;
          align-items: flex-start;
          img {
            margin-left: 4px;
            width: 32px;
            height: 32px;
          }
          p {
            margin: 4px 0;
            height: 16px;
            background: rgba(255, 150, 0, 0.1);
            border-radius: 8px;
            font-size: 12px;
            color: #ff9600;
            line-height: 16px;
            display: flex;
            align-items: center;
            cursor: pointer;
            &:hover {
              color: #ff8200;
            }
            i {
              display: inline-block;
              width: 16px;
              height: 16px;
              background-image: url("../../assets/img/helmet/icon_long.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin-right: 3px;
            }
          }
        }
        > div {
          display: flex;
          flex-direction: column;
          > h4 {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            img {
              width: 58px;
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
          > p {
            margin-top: 5px;
            > span {
              display: flex;
              align-items: center;
              > i {
                display: inline-block;
                width: 12px;
                height: 12px;
                background-image: url("../../assets/img/flashmining/miningtime.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                margin-right: 3px;
              }
              > span {
                padding: 1px 3px;
                background: #f7f7fa;
                border-radius: 3px;
                color: #121212;
                > i {
                  margin: 0 3px;
                  color: #cfcfd2;
                }
              }
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
        height: 363px;
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
            flex-direction: column;
            justify-content: space-between;
            a {
              font-size: 14px;
              font-weight: 500;
              color: #ff9600;
              line-height: 20px;
              display: flex;
              align-items: center;
              margin-top: 8px;
              i {
                display: block;
                width: 20px;
                height: 20px;
                background-image: url("../../assets/img/icon/dodo@2x.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                margin: 0 2px;
              }
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