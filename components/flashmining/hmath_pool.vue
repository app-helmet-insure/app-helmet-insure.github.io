<template>
  <div class="flash_pool">
    <div class="deposit" v-if="TradeType == 'STAKE' || TradeType == 'ALL'">
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
          LPT
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="deposit"
            type="text"
            v-model="DepositeNum"
            :style="
              DepositeNum == balance.Deposite
                ? 'border: 1px solid #fd7e14 !important'
                : ''
            "
          />
          <span
            @click="DepositeNum = balance.Deposite"
            :style="
              DepositeNum == balance.Deposite
                ? 'background: rgba(255, 150, 0, 0.1);'
                : ''
            "
            >{{ $t("Table.Max") }}</span
          >
        </div>
      </div>
      <div class="button">
        <button
          @click="toDeposite"
          :class="stakeLoading ? 'disable b_button' : 'b_button'"
          :style="
            expired ? 'background: #ccc !important; pointer-events: none' : ''
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
            &nbsp;LPT</span
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
            &nbsp;LPT</span
          >
        </p>
        <p>
          <span>{{ $t("Table.MyPoolShare") }}：</span>
          <span> {{ isLogin ? balance.Share : "--" }} %</span>
        </p>
      </div>
      <a
        href="https://exchange.pancakeswap.finance/?_gl=1*avpb7w*_ga*MTc1MzEyNTQzNS4xNjA3MzQwODk4*_ga_334KNG3DMQ*MTYxNDY1Njg1My4xNS4wLjE2MTQ2NTY4NTMuMA..#/add/0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
        target="_blank"
        >From <i class="pancake"></i>Get hAUTO-HELMET LPT</a
      >
      <div class="ContractAddress">
        <span>hAUTO {{ $t("Table.ContractAddress") }}</span>
        <p>
          0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112')
            "
          ></i>
        </p>
      </div>
    </div>
    <i></i>
    <div class="withdraw" v-if="TradeType == 'CLAIM' || TradeType == 'ALL'">
      <div class="title">
        <span>{{ $t("Table.CallableMortgage") }}</span>
        <p>
          <countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(balance.Withdraw)"
            :duration="2000"
            :decimals="8"
          />
          <span v-else>--</span>
          LPT
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="withdraw"
            type="text"
            v-model="balance.Withdraw"
            disabled
            style="border: 1px solid #fd7e14 !important"
          />
          <span
            @click="WithdrawNum = balance.Withdraw"
            style="background: rgba(255, 150, 0, 0.1)"
            >{{ $t("Table.Max") }}</span
          >
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
          <span>hMATH {{ $t("Table.HELMETRewards") }}：</span>
          <span>
            <span>
              <countTo
                v-if="isLogin"
                :startVal="Number(0)"
                :endVal="Number(balance.hCTK)"
                :duration="2000"
                :decimals="8"
              />
              <span v-else>--</span>
              hMATH</span
            >
          </span>
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
      <div class="ContractAddress">
        <span>hMATH {{ $t("Table.ContractAddress") }}</span>
        <p>
          0xdD9b5801e8A38ef7A728A42492699521C6A7379b
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0xdD9b5801e8A38ef7A728A42492699521C6A7379b')
            "
          ></i>
        </p>
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
import countTo from "vue-count-to";
export default {
  props: ["TradeType"],
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: "hMATH Pool (By hAUTO-Helmet LPT)",
        dueDate: "2021/03/18 00:00",
        DownTime: {
          day: 0,
          hour: 0,
        },
      },
      textList: [
        {
          text: this.$t("Table.RewardsDistribution") + "（weekly）",
          num: 0,
          color: "#28a745",
          unit: "",
        },
        {
          text: this.$t("Table.PoolAPR"),
          num: 0,
          color: "#28a745",
          unit: "",
        },
        //  {
        //   text: this.$t('Table.TotalDeposited'),
        //   num: 0,
        //   color: '#17173a',
        //   unit: ''
        // },
        //  {
        //   text: this.$t('Table.MyDeposits'),
        //   num: 0,
        //   color: '#17173a',
        //   unit: ''
        // },
        // {
        //   text: this.$t('Table.MyRewards'),
        //   num: 0,
        //   color: '#28a745',
        //   unit: ''
        // }
      ],
      balance: {
        Deposite: 0,
        Withdraw: 0,
        Helmet: 0,
        hCTK: 0,
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
      MingTime: 0,
      actionType: "deposit",
      fixD,
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
    this.$bus.$on("DEPOSITE_LOADING_HMATHPOOL", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_HMATHPOOL", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("EXIT_LOADING_HMATHPOOL", (data) => {
      this.exitLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_HMATHPOOL", () => {
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
    showOnepager() {
      this.$bus.$emit("OPEN_ONEPAGER", {
        showFlag: true,
        title: "What is $hMATH?",
        text: [
          "MATH cover miss out policy. (It performs more like a call option of MATH)",
          "In this policy, the ratio of MATH & BNB is",
          "1MATH =0.014BNB",
          "It is the reasonable activate price, meaning that you could swap 0.014BNB+1$hMATH to 1MATH before the expire date.",
          "For example, if $MATH hit 0.015BNB, you could activate the policy and swap 0.014BNB + 1$hMATH to 1 $MATH on Tradingview tab, and get 0.001BNB as profit.",
          "$hMATH Flash Mining Start: Mar. 2nd 24:00 SGT",
          "End: Mar.17th 24:00 SGT",
          "Policy Expire date: Mar. 22nd 24:00 SGT",
          "Total supply: 30,000",
        ],
      });
    },
    copyAdress(e, text) {
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
        this.actionType = "withdraw";
      }
      this.list.DownTime = template;
    },
    getMiningTime() {
      let now = new Date() * 1;
      let dueDate = "2021/02/23 20:00";
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
        template = `${0}${this.$t("Content.HourD")} ${0}${this.$t(
          "Content.MinD"
        )} ${0}${this.$t("Content.SecondD")}`;
      } else {
        template = `${hour}${this.$t("Content.HourD")} ${minute}${this.$t(
          "Content.MinD"
        )} ${second}${this.$t("Content.SecondD")}`;
      }
      this.MingTime = template;
    },
    async getAPY() {
      let HMATHHELMET = await uniswap("HMATH", "HELMET"); //Hlemt价格
      let HctkVolume = await totalSupply("HMATHPOOL"); //数量
      let LptVolume = await totalSupply("HMATHPOOL_LPT"); //发行
      let HelmetValue = await balanceOf("HELMET", "HMATHPOOL_LPT", true);
      // APY = 年产量*helmet价格/抵押价值
      let apy = fixD(
        precision.times(
          precision.divide(
            precision.times(HMATHHELMET, precision.divide(30000, 15), 365),
            precision.times(
              precision.divide(precision.times(HelmetValue, 2), LptVolume),
              HctkVolume
            )
          ),
          100
        ),
        2
      );
      this.apy = apy ? apy : 0;
      // this.textList[1].num = "Infinity" + "%";
      if (this.expired) {
        this.textList[1].num = "--";
      } else {
        this.textList[1].num = this.apy + "%";
      }
    },
    async getBalance() {
      let helmetType = "HMATHPOOL_LPT";
      let type = "HMATHPOOL";
      // 可抵押数量
      let Deposite = await getBalance(helmetType);
      // 可赎回数量
      let Withdraw = await getLPTOKEN(type);
      // 总抵押
      let TotalLPT = await totalSupply(type);
      // 可领取Helmet
      let Helmet = await CangetPAYA(type);
      // 总Helmet
      // let LptVolume = await totalSupply(helmetType); //发行

      this.balance.Deposite = fixD(Deposite, 8);
      this.balance.Withdraw = fixD(Withdraw, 8);
      this.balance.hCTK = fixD(Helmet, 8);
      this.balance.TotalLPT = fixD(TotalLPT, 8);
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2);
      if (this.expired) {
        this.textList[0].num = "--";
      } else {
        this.textList[0].num = fixD((30000 / 15) * 7, 2) + " hMATH";
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
      let type = "HMATHPOOL";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {});
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "HMATHPOOL";
      let res = await getPAYA(type);
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return;
      }
      this.exitLoading = true;
      let type = "HMATHPOOL";
      let res = await exitStake(type);
    },
  },
};
</script>
<style lang="scss" soped>
@import "../../assets/css/flash_pool.scss";
</style>