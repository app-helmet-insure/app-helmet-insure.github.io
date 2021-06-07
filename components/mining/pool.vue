<template>
  <div class="mining_pool">
    <div
      class="deposit"
      v-if="!activeFlag || (activeFlag && activeType == 'STAKE')"
    >
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
            this.activeData.MING_TIME == 'Finished'
              ? 'disable_button b_button'
              : 'b_button')
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
            href="https://app.dodoex.io/liquidity?poolAddress=0xd7eed218538b3fa3e20d24f43100790f0d03538a"
            target="_blank"
            >From <i class="dodo"></i>Get HELMET-KUN DLP</a
          >
        </section>
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
      <div class="addToken">
        <p @click="addTokenFn('KUN')">Add KUN to MetaMask</p>
        <i></i>
      </div>
    </div>
    <div
      class="withdraw"
      v-if="!activeFlag || (activeFlag && activeType == 'CLAIM')"
    >
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
          <span
            ><i @click="hadnleShowOnePager($event, 'QHELMET')">QHELMET</i>
            {{ $t("Table.HELMETRewards") }}：</span
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
            QHELMET</span
          >
        </p>
        <button
          @click="toClaim"
          :class="
            (claimLoading ? 'disable o_button' : 'o_button',
            this.activeData.MING_TIME == 'Finished'
              ? 'disable_button o_button'
              : 'o_button')
          "
        >
          <i :class="claimLoading ? 'loading_pic' : ''"></i
          >{{ $t("Table.ClaimAllRewards") }}
        </button>
      </div>
      <div class="ContractAddress">
        <span>QHELMET {{ $t("Table.ContractAddress") }}</span>
        <p>
          0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99')
            "
          ></i>
        </p>
      </div>
      <div class="addToken">
        <p @click="addTokenFn('QHELMET', 'QHelmet')">Add QHELMET to MetaMask</p>
        <i></i>
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
import {
  BalanceOf,
  TotalSupply,
  Earned,
  Allowance,
} from "~/interface/read_contract.js";
import { Stake, GetReward, Approve, Exit } from "~/interface/write_contract.js";
import { fixD } from "~/assets/js/util.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import countTo from "vue-count-to";
import { getAddress } from "~/assets/utils/address-pool.js";
import addToken from "~/assets/utils/addtoken.js";
export default {
  props: ["activeData", "activeFlag", "activeType"],
  components: {
    countTo,
  },
  data() {
    return {
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
    this.NeedApprove();
    this.getBalance();
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
    activeData(newValue) {
      if (newValue) {
        this.NeedApprove();
        this.getBalance();
      }
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
      let data = {
        tokenAddress: tokenAddress,
        tokenSymbol: tokenName || token,
        tokenDecimals: unit || 18,
        tokenImage: "",
      };
      await addToken(data);
    },
    hadnleShowOnePager(e, onePager) {
      if (e.target.tagName === "I" && onePager) {
        let Earn = onePager;
        this.$bus.$emit("OPEN_ONEPAGER", {
          showFlag: true,
          title: `What is $${onePager}?`,
          text: onePager,
        });
      } else {
        return;
      }
    },
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin;
      }
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
      // 可抵押数量
      let Deposite = await BalanceOf(
        this.activeData.STAKE_ADDRESS,
        this.activeData.STAKE_DECIMALS
      );
      // 可赎回数量
      let Withdraw = await BalanceOf(
        this.activeData.POOL_ADDRESS,
        this.activeData.STAKE_DECIMALS
      );
      // 总抵押
      let TotalLPT = await TotalSupply(
        this.activeData.POOL_ADDRESS,
        this.activeData.STAKE_DECIMALS
      );
      // 可领取Helmet
      let Helmet = await Earned(
        this.activeData.POOL_ADDRESS,
        this.activeData.REWARD_DECIMALS
      );
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
      let type = "QHELMETPOOL";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {});
    },
    async NeedApprove() {
      let SpenderAddress = this.activeData.POOL_ADDRESS;
      let TokenAddress = this.activeData.STAKE_ADDRESS;
      let flag = await Allowance(TokenAddress, SpenderAddress);
      this.ApproveFlag = flag;
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let ContractAddress = this.activeData.POOL_ADDRESS;
      await GetReward(ContractAddress, (res) => {
        if (res == "success" || res == "error") {
          this.getBalance();
          this.claimLoading = false;
        }
      });
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return;
      }
      this.exitLoading = true;
      let ContractAddress = this.activeData.POOL_ADDRESS;
      await Exit(ContractAddress, (res) => {
        if (res == "success" || res == "error") {
          this.getBalance();
          this.exitLoading = false;
        }
      });
    },
  },
};
</script>
<style lang='scss'scoped>
@import "../../assets/css/mining_pool.scss";
</style>