<template>
  <div class="helmetfor_pool">
    <!-- <span class="miningTime"> {{ MingTime }} until COMBO Mining Start</span> -->
    <img src="~/assets/img/helmet/Combo.png" alt="" class="combo" />
    <div class="text">
      <div class="coin">
        <h3>
          <span> {{ list.name }}</span>
          <p @click="showOnepager"><i></i>What is hFOR token？</p>
          <!-- <img src="~/assets/img/helmet/3x.png" alt="" /> -->
        </h3>
        <div>
          <h4>
            Earn：
            <img src="~/assets/img/icon/helmetfor.png" alt="" />
          </h4>
        </div>
        <div>
          <p>
            <span>
              {{ $t("Table.SurplusTime") }}：
              <span>
                {{ isLogin ? list.DownTime : "--" }}
              </span>
            </span>
          </p>
        </div>
      </div>
      <div class="index">
        <p v-for="(item, index) in textList" :key="index" v-if="index != 0">
          <span>{{ item.text }}</span>
          <span :style="`color:${item.color}`">{{ item.num }} </span>
          <span v-if="item.num1" :style="`color:${item.color}`">{{
            item.num1
          }}</span>
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
              href="https://exchange.pancakeswap.finance/#/add/0xb779F208f8d662558dF8E2b6bFE3b6305CC13389/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
              target="_blank"
              >Get HELMET-hFOR LPT</a
            >
          </section>
        </div>
        <div class="ContractAddress">
          <span>hFOR Contract Address：</span>
          <p>
            0xb779F208f8d662558dF8E2b6bFE3b6305CC13389
            <i
              class="copy"
              id="copy_default"
              @click="
                copyAdress($event, '0xb779F208f8d662558dF8E2b6bFE3b6305CC13389')
              "
            ></i>
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
                FOR</span
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
import { uniswap } from "~/assets/utils/address-pool.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import countTo from "vue-count-to";
export default {
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: "HELMET-hFOR LP",
        dueDate: "2021-03-20 00:00",
        DownTime: "--",
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
    this.$bus.$on("DEPOSITE_LOADING_FORHELMET", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_FORHELMET", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("EXIT_LOADING_FORHELMET", (data) => {
      this.exitLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_FORHELMET", () => {
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
        title: "What is $hFOR?",
        text: [
          "It is $FOR cover miss out insurance policy (like the call option of $FOR). The reasonable activate price: 1 $FOR=0.25 HELMET.",
          "For example, if $FOR hit 0.3 HELMET, you could swap only 0.25HELMET+1$hFOR to 1 $FOR, and get 0.05HELMET profit.",
          "COMBO Mining period: 15days, from Mar.4th 24:00 SGT to Mar.19th 24:00 SGT (snapshot and Airdrop will be finished before Mar.4th 24:00 SGT)",
          "Expire date: April 4th, 2021",
          "if $hFOR expired, it could be a souvenir token",
          "b/c $hFOR is totally from Airdrop, please do not trade heavily on $hFOR",
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
      let template = `${day}${this.$t("Content.DayD")} ${hour}${this.$t(
        "Content.HourD"
      )}`;
      this.list.DownTime = template;
    },
    getMiningTime() {
      let now = new Date() * 1;
      let dueDate = "2021-03-05 00:00";
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
      let lptBnbValue = await uniswap("FOR", "WBNB");
      let lptHelmetValue = await uniswap("WBNB", "HELMET");
      let FORHELMET = lptBnbValue * lptHelmetValue;
      let allVolume = FORHELMET * 182010;
      //总抵押
      let supplyVolume = await totalSupply("FORHELMET"); //数量
      // 总发行
      let stakeVolue = await totalSupply("FORHELMET_LPT"); //数量
      // 抵押总价值
      let stakeValue = await balanceOf("HELMET", "FORHELMET_LPT", true);
      let burgerApy = fixD(
        precision.times(
          precision.divide(
            precision.times(precision.divide(allVolume, 15), 365),
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
            precision.times(precision.divide(10000, 15), 365),
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
      this.textList[1].num = this.apy + "%";
      // this.textList[1].num = "Infinity" + "%";
    },
    async getBalance() {
      let helmetType = "FORHELMET_LPT";
      let type = "FORHELMET";
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
      this.textList[0].num = fixD((10000 / 25) * 7, 2) + " HELMET";
      this.textList[0].num1 = fixD((182010 / 25) * 7, 2) + " FOR";
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
      let type = "FORHELMET";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {});
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "FORHELMET";
      let res = await getDoubleReward(type);
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return;
      }
      this.exitLoading = true;
      let type = "FORHELMET";
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
  .miningTime {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
  }
  .helmetfor_pool {
    height: 536px;
    background: #ffffff;
    padding: 40px;
    margin-bottom: 20px;
    position: relative;
    > .combo {
      width: 148px;
      transform: translateY(-8px);
      height: 28px;
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
            cursor: pointer;
            margin-left: 4px;
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
          > h4 {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            img {
              width: 58px;
              height: 32px;
            }
          }
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
            &:nth-of-type(3) {
              margin-top: 4px;
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
  .miningTime {
    position: absolute;
    right: 16px;
    top: 0px;
    font-size: 14px;
  }
  .helmetfor_pool {
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
        height: 343px;
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