<template>
  <div class="hcct_pool">
    <img src="~/assets/img/helmet/star.png" alt="" />
    <img class="finished" src="~/assets/img/helmet/finished.png" alt="" />
    <div class="text">
      <div class="coin">
        <h3>
          <span>{{ list.name }}</span>
          <p @click="showOnepager"><i></i>What is LONG(Cake) token？</p>
        </h3>
        <div>
          <div>
            <p>
              <img src="~/assets/img/helmet/longCoin.png" alt="" />
              50%
              <span> LONG </span>
            </p>
            <p>
              <img src="~/assets/img/helmet/helmetCoin.png" alt="" />
              50%
              <span> HELMET </span>
            </p>
          </div>
          <p v-if="list.DownTime">
            <span>
              {{ $t("Table.SurplusTime") }}：
              <span>
                {{ list.DownTime }}
              </span>
            </span>
          </p>
        </div>
      </div>
      <div class="index">
        <p v-for="(item, index) in textList" :key="index">
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
            {{ balance.Deposite.length > 60 ? 0 : balance.Deposite }} LPT
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
            <span> {{ balance.Withdraw }} /{{ balance.TotalLPT }} LPT</span>
          </p>
          <section>
            <p>
              <span>My Pool Share：</span>
              <span> {{ balance.Share }} %</span>
            </p>
            <a
              href="https://exchange.pancakeswap.finance/?_gl=1*1dr4rcd*_ga*MTYwNTE3ODIwNC4xNjEwNjQzNjU4*_ga_334KNG3DMQ*MTYxMTgxMTMzMi42Ny4wLjE2MTE4MTEzMzIuMA..#/add/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8/0x17934fef9fC93128858e9945261524ab0581612e"
              target="_blank"
              >Get LONG-HELMET LPT</a
            >
          </section>
        </div>
        <div class="ContractAddress">
          <span>Long Contract Address：</span>
          <p>
            0x17934fef9fc93128858e9945261524ab0581612e<i
              class="copy"
              id="copy_default"
              @click="
                copyAdress($event, '0x17934fef9fc93128858e9945261524ab0581612e')
              "
            ></i>
          </p>
        </div>
      </div>
      <div class="withdraw">
        <div class="title">
          <span>{{ $t("Table.Withdraw") }}</span>
          <p>{{ balance.Withdraw }} LPT {{ $t("Table.WAvailable") }}</p>
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
            <span>HCCT {{ $t("Table.HELMETRewards") }}：</span>
            <span>
              <span>
                {{ balance.Helmet.length > 60 ? 0 : balance.Helmet }}
                HCCT</span
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
        <div class="ContractAddress">
          <span>HCCT Contract Address：</span>
          <p>
            0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5<i
              class="copy"
              id="copy_default"
              @click="
                copyAdress($event, '0xf1BE411556e638790DcdEcd5b0f8F6d778f2Dfd5')
              "
            ></i>
          </p>
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
  getPAYA,
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
import { uniswap } from "~/assets/utils/address-pool.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
export default {
  data() {
    return {
      list: {
        name: "LONG-HELMET",
        dueDate: "2021-02-13 00:00",
        DownTime: "--",
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
    };
  },
  mounted() {
    setInterval(() => {
      setTimeout(() => {
        this.getDownTime();
      });
      clearTimeout();
    }, 1000);
    this.$bus.$on("DEPOSITE_LOADING_HCCTPOOL", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_HCCTPOOL", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("EXIT_LOADING_HCCTPOOL", (data) => {
      this.exitLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_HCCTPOOL", () => {
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
  },
  computed: {
    indexArray() {
      return this.$store.state.allIndexPrice;
      this.textList[1].num = this.apy + "%";
    },
  },
  methods: {
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
    showOnepager() {
      this.$bus.$emit("OPEN_ONEPAGER", {
        showFlag: true,
        title: "What is LONG token？",
        text: [
          "LONG is the CAKE  Cover Miss Out policy certification. Policy holders can use Long token as proof to activate the policy. It is the certification showing that you have bought policy and it is necessary when you activate policy. ",
          "To be brief, if $CAKE hit over $1.5 before Feb.15th 24:00 SGT, you could activate your airdrop policy to claim benefits.",
          "For example, if $CAKE hit $1.6 on Feb.10th, you could use $1.5 to swap a $CAKE token with 1 policy (1 LONG Token). Eventually, you could sell this $CAKE in the market and get extra $0.1 benefit. That is why we call it ‘COVER Miss out’. (the final settlement currency will be BNB)",
          "However, if $CAKE does not hit $1.5, there will be no need for you to activate the Cover Miss Out policy. and the LONG Token will be a souvenir for you.",
          "Policy Expire Date: Feb.15th 24:00 SGT",
          "More details in our Medium.",
        ],
      });
    },
    WatchIndexArray(newValue, value) {
      if (newValue) {
        this.getAPY();
      }
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
        template = `${day}${this.$t("Content.DayD")} ${hour}${this.$t(
          "Content.HourD"
        )}`;
      } else {
        template = false;
      }
      this.list.DownTime = template;
    },
    async getAPY() {
      let HCCTHELMET = await uniswap("HCCT", "HELMET");
      let HcctVolume = await totalSupply("HCCTPOOL");
      let LptVolume = await totalSupply("HCCTPOOL_LPT");
      let HelmetValue = await balanceOf("HELMET", "HCCTPOOL_LPT", true);
      let apy = fixD(
        precision.times(
          precision.divide(
            precision.times(HCCTHELMET, 16000, 365),
            precision.times(
              precision.divide(precision.times(HelmetValue, 2), LptVolume),
              HcctVolume
            )
          ),
          100
        ),
        2
      );
      this.apy = apy;
      this.textList[1].num = this.apy + "%";
    },
    async getBalance() {
      let helmetType = "HCCTPOOL_LPT";
      let type = "HCCTPOOL";
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
      this.textList[0].num = fixD(16000 * 7, 2) + " HCCT";
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
      let type = "HCCTPOOL";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {});
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "HCCTPOOL";
      let res = await getPAYA(type);
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return;
      }
      this.exitLoading = true;
      let type = "HCCTPOOL";
      let res = await exitStake(type);
    },
  },
};
</script>

<style lang='scss' soped>
.ContractAddress {
  font-size: 13px;
  color: #ff9600;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  span {
    color: #121212;
  }
  p {
    display: flex;
    align-items: center;
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
  .hcct_pool {
    margin-bottom: 20px;
    height: 506px;
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
    .finished {
      position: absolute;
      right: 0;
      top: 0;
      width: 78px;
      height: 78px;
      transform: translateY(0px);
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
          p {
            height: 16px;
            background: rgba(255, 150, 0, 0.1);
            border-radius: 8px;
            font-size: 12px;
            color: #ff9600;
            line-height: 16px;
            display: flex;
            align-items: center;
            margin-left: 8px;
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
          align-items: center;
          > div {
            display: flex;
            p {
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
          p {
            color: #919aa6;
            font-size: 14px;
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
        height: 323px;
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
              font-weight: 500;
              color: #ff9600;
              line-height: 20px;
              text-decoration: underline;
            }
          }
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
  .ContractAddress {
    line-height: 20px;
  }
  .hcct_pool {
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
    .finished {
      position: absolute;
      right: 0;
      top: 0;
      width: 78px;
      height: 78px;
      transform: translateY(0px);
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
            span {
              color: #919aa6;
              font-size: 14px;
              margin-left: 0 !important;
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
        height: 343px;
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
              font-weight: 500;
              color: #ff9600;
              font-size: 14px;
              line-height: 20px;
              text-decoration: underline;
            }
          }
          p {
            margin-top: 11px;
            display: flex;
            flex-direction: column;
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
    }
  }
}
</style>