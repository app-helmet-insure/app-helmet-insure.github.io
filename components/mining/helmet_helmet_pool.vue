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
          HELMET
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
            &nbsp;HELMET</span
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
            &nbsp;HELMET</span
          >
        </p>
        <p>
          <span>{{ $t("Table.MyPoolShare") }}：</span>
          <span> {{ balance.Share }} %</span>
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
          HELMET
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
        <p>
          <span>MDEX {{ $t("Table.HELMETRewards") }}：</span>
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
              MDEX</span
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
</template>

<script>
import {
  totalSupply,
  getLPTOKEN,
  CangetPAYA,
  CangetUNI,
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
  props: ["activeType", "TradeType"],
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
          color: "#28a745",
          unit: "",
        },
        {
          text: this.$t("Table.PoolAPY"),
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
      // 可领取Mdex
      let Cake = await CangetUNI(type);
      // 总Helmet
      let totalHelmet = await totalSupply(helmetType);

      this.balance.Deposite = fixD(Deposite, 4);
      this.balance.Withdraw = fixD(Withdraw, 4);
      this.balance.Helmet = fixD(Helmet, 8);
      this.balance.Cake = fixD(Cake, 8);
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
      let res = await getDoubleReward(type);
      // let res = await getPAYA(type);
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

<style lang='scss'scoped>
@import "../../assets/css/mining_pool.scss";
</style>