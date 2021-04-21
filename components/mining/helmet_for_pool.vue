<template>
  <div class="mining_pool">
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
            :class="activeType == 'STAKE' ? 'activeInput' : ''"
          />
          <span @click="DepositeNum = balance.Deposite">{{
            $t("Insurance.Insurance_text18")
          }}</span>
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

        <section>
          <p>
            <span>{{ $t("Table.MyPoolShare") }}：</span>
            <span> {{ isLogin ? balance.Share : "--" }} %</span>
          </p>
          <a
            href="https://exchange.pancakeswap.finance/#/add/0xb779F208f8d662558dF8E2b6bFE3b6305CC13389/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
            target="_blank"
            >From <i class="pancake"></i>Get HELMET-hFOR LPT</a
          >
        </section>
      </div>
      <div class="ContractAddress">
        <span>hFOR {{ $t("Table.ContractAddress") }}</span>
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
          />
          <span @click="WithdrawNum = balance.Withdraw">{{
            $t("Insurance.Insurance_text18")
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
          <span>FOR {{ $t("Table.HELMETRewards") }}：</span>
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
import { pancakeswap } from "~/assets/utils/pancakeswap.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import countTo from "vue-count-to";
export default {
  props: ["activeType", "TradeType"],
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: "HELMET-hFOR LP",
        dueDate: "2021/03/20 00:00",
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
          color: "#28a745",
          unit: "",
          num1: 0,
        },
        {
          text: this.$t("Table.PoolAPR"),
          num: 0,
          color: "#28a745",
          unit: "",
        },
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
    }, 1000);
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
  },
  computed: {
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
      let dueDate = "2021/03/05 00:00";
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
      this.balance.Deposite = Deposite;
      this.balance.Withdraw = Withdraw;
      this.balance.Helmet = Helmet;
      this.balance.Cake = Cake;
      this.balance.TotalLPT = TotalLPT;
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2);

      if (this.expired) {
        this.textList[0].num = "--";
        this.textList[0].num1 = "--";
      } else {
        this.textList[0].num = fixD((10000 / 25) * 7, 2) + " HELMET";
        this.textList[0].num1 = fixD((182010 / 25) * 7, 2) + " FOR";
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
<style lang='scss'scoped>
@import "../../assets/css/mining_pool.scss";
</style>