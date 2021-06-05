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
          :class="
            (stakeLoading ? 'disable b_button' : 'b_button',
            expired ? 'disable_button b_button' : 'b_button')
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
        <span>hDODO {{ $t("Table.ContractAddress") }}</span>
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
      <div class="addToken">
        <p @click="addTokenFn('HDODO', 'hDODO')">Add hDODO to MetaMask</p>
        <i></i>
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
          :class="
            (claimLoading ? 'disable o_button' : 'o_button',
            expired ? 'disable_button o_button' : 'o_button')
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
  getLPTOKEN,
  CangetPAYA,
  CangetUNI,
  getDoubleReward,
  exitStake,
  getBalance,
  toDeposite,
} from "~/interface/deposite";
import { fixD } from "~/assets/js/util.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import countTo from "vue-count-to";
import { getAddress, getContract } from "~/assets/utils/address-pool.js";
import addToken from "~/assets/utils/addtoken.js";
export default {
  props: ["activeType", "TradeType"],
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
    if (!this.expired) {
      let timer = setInterval(() => {
        this.getDownTime();
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    }
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
    this.getBalance();
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
    async addTokenFn(token, tokenName, unit) {
      let tokenAddress = getAddress(token);
      let tokenAddress1 = getContract(token);
      let data = {
        tokenAddress: tokenAddress || tokenAddress1,
        tokenSymbol: tokenName || token,
        tokenDecimals: unit || 18,
        tokenImage: "",
      };
      await addToken(data);
    },
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
<style lang='scss'scoped>
@import "../../assets/css/mining_pool.scss";
</style>