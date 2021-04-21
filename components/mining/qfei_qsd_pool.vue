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
          <div class="PC_link" style="display: flex">
            <a
              href="https://app.dodoex.io/liquidity?poolAddress=0x14616328f4Ce3082187B4f1Ee4863DA5516B178A"
              target="_blank"
              >From <i class="dodo"></i>Get QFEI-QSD DLP</a
            >
            <a href="https://bsc.qian.finance/chemix/" target="_blank">
              &nbsp;Or From <i class="qian"></i> Mint QSD</a
            >
          </div>
          <div class="H5_link">
            <a
              href="https://app.dodoex.io/liquidity?poolAddress=0x14616328f4Ce3082187B4f1Ee4863DA5516B178A"
              target="_blank"
              >From <i class="dodo"></i>Get QFEI-QSD DLP</a
            >
            <a href="https://bsc.qian.finance/chemix/" target="_blank">
              Or From <i class="qian"></i> Mint QSD</a
            >
          </div>
        </section>
      </div>
      <div class="ContractAddress">
        <span>QSD {{ $t("Table.ContractAddress") }}</span>
        <p>
          0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2')
            "
          ></i>
        </p>
      </div>
    </div>
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
          <span>KUN {{ $t("Table.HELMETRewards") }}：</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Helmet)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            KUN</span
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
      <div class="ContractAddress">
        <span>KUN {{ $t("Table.ContractAddress") }}</span>
        <p>
          0x1a2fb0af670d0234c2857fad35b789f8cb725584
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0x1a2fb0af670d0234c2857fad35b789f8cb725584')
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
  getLPTOKEN,
  CangetPAYA,
  getPAYA,
  exitStake,
  getBalance,
  toDeposite,
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
        name: "QFEI-QSD DLP",
        dueDate: "2021/05/02 00:00",
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
        this.getDownTime();
      });
      clearTimeout();
    }, 1000);
    this.$bus.$on("DEPOSITE_LOADING_KUNPOOL", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_KUNPOOL", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("EXIT_LOADING_KUNPOOL", (data) => {
      this.exitLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_KUNPOOL", () => {
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
      let helmetType = "KUNPOOL_LPT";
      let type = "KUNPOOL";
      // 可抵押数量
      let Deposite = await getBalance(helmetType);
      // 可赎回数量
      let Withdraw = await getLPTOKEN(type);
      // 总抵押
      let TotalLPT = await totalSupply(type);
      // 可领取Helmet
      let Helmet = await CangetPAYA(type);

      // 赋值
      this.balance.Deposite = Deposite;
      this.balance.Withdraw = Withdraw;
      this.balance.Helmet = Helmet;
      this.balance.TotalLPT = TotalLPT;
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2);
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
      let type = "KUNPOOL";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {});
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "KUNPOOL";
      let res = await getPAYA(type);
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return;
      }
      this.exitLoading = true;
      let type = "KUNPOOL";
      let res = await exitStake(type);
    },
  },
};
</script>
<style lang='scss'scoped>
@import "../../assets/css/mining_pool.scss";
</style>