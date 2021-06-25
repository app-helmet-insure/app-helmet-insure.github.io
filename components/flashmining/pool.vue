<template>
  <div class="flash_pool">
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
            $t("Table.Max")
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
          >{{ ApproveFlag ? $t("Table.Approve") : $t("Table.ConfirmDeposit") }}
        </button>
        <p>
          <span>{{ $t("Table.MyDeposits") }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Withdraw)"
              :duration="2000"
              :decimals="8"
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
              :endVal="Number(balance.Staking)"
              :duration="2000"
              :decimals="8"
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
        :href="`https://exchange.pancakeswap.finance/#/add/${activeData.ONELPT_ADDRESS}/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8`"
        target="_blank"
        >From <i class="pancake"></i>Get {{ activeData.TOKEN_NAME }}-HELMET
        LPT</a
      >
      <div class="ContractAddress" v-if="activeData.LEFTTOKEN">
        <span
          >{{ activeData.LEFTTOKEN.ADDTOKEN_SYMBOL }}
          {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ activeData.LEFTTOKEN.ADDTOKEN_ADDRESS.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="copyAdress($event, activeData.LEFTTOKEN.ADDTOKEN_ADDRESS)"
          ></i>
        </p>
      </div>
      <div class="addToken" v-if="activeData.LEFTTOKEN">
        <p @click="addTokenFn(activeData.LEFTTOKEN)">
          Add {{ activeData.LEFTTOKEN.ADDTOKEN_SYMBOL }} to MetaMask
        </p>
        <i></i>
      </div>
    </div>
    <i></i>
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
            :class="activeType == 'CLAIM' ? 'activeInput' : ''"
          />
          <!-- <span
            @click="WithdrawNum = balance.Withdraw"
            style="border: 1px solid #fd7e14"
            >{{ $t("Table.Max") }}</span
          > -->
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
          <span>
            {{ activeData.REWARD_NAME }}
            {{ $t("Table.HELMETRewards") }}：</span
          >
          <span>
            <span>
              <countTo
                v-if="isLogin"
                :startVal="Number(0)"
                :endVal="Number(balance.Rewards)"
                :duration="2000"
                :decimals="8"
              />
              <span v-else>--</span>
              {{ activeData.REWARD_NAME }}</span
            >
          </span>
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
      <div class="ContractAddress" v-if="activeData.RIGHTTOKEN">
        <span
          >{{ activeData.RIGHTTOKEN.ADDTOKEN_SYMBOL }}
          {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ activeData.RIGHTTOKEN.ADDTOKEN_ADDRESS.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="copyAdress($event, activeData.RIGHTTOKEN.ADDTOKEN_ADDRESS)"
          ></i>
        </p>
      </div>
      <div class="addToken" v-if="activeData.RIGHTTOKEN">
        <p @click="addTokenFn(activeData.RIGHTTOKEN)">
          Add {{ activeData.RIGHTTOKEN.ADDTOKEN_SYMBOL }} to MetaMask
        </p>
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
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
        Rewards: 0,
        Staking: 0,
        Share: 0,
      },
      DepositeNum: "",
      WithdrawNum: "",
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
      fixD,
      isLogin: false,
      ApproveFlag: false,
    };
  },
  async mounted() {
    this.getBalance();
    this.NeedApprove();
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
    activeData(newValue) {
      if (newValue) {
        this.getBalance();
        this.NeedApprove();
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
    async addTokenFn(options) {
      let data = {
        tokenAddress: options.ADDTOKEN_ADDRESS,
        tokenSymbol: options.ADDTOKEN_SYMBOL,
        tokenDecimals: options.ADDTOKEN_DECIMALS,
        tokenImage: "",
      };
      await addToken(data);
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
      let Staking = await TotalSupply(
        this.activeData.POOL_ADDRESS,
        this.activeData.STAKE_DECIMALS
      );
      // 可领取
      let Helmet = await Earned(
        this.activeData.POOL_ADDRESS,
        this.activeData.REWARD_DECIMALS
      );
      this.balance.Deposite = Deposite;
      this.balance.Withdraw = Withdraw;
      this.balance.Rewards = Helmet;
      this.balance.Staking = Staking;
      this.balance.Share = fixD((Withdraw / Staking) * 100, 2);
    },
    // 抵押
    async toDeposite() {
      if (!this.DepositeNum) {
        return;
      }
      if (this.stakeLoading) {
        return;
      }
      let ContractAddress = this.activeData.POOL_ADDRESS;
      let StakeAddress = this.activeData.STAKE_ADDRESS;
      let TokenSymbol = this.activeData.STAKE_SYMBOL;
      let DepositeVolume = this.DepositeNum;
      let Decimals = this.activeData.STAKE_DECIMALS;
      this.stakeLoading = true;
      if (this.ApproveFlag) {
        await Approve(StakeAddress, ContractAddress, TokenSymbol, (res) => {
          if (res == "success" || res == "error") {
            this.NeedApprove();
            this.stakeLoading = false;
          }
        });
      } else {
        await Stake({ ContractAddress, DepositeVolume, Decimals }, (res) => {
          if (res == "success" || res == "error") {
            this.getBalance();
            this.stakeLoading = false;
          }
        });
      }
    },
    async NeedApprove() {
      let SpenderAddress = this.activeData.POOL_ADDRESS;
      let TokenAddress = this.activeData.STAKE_ADDRESS;
      let flag = await Allowance(TokenAddress, SpenderAddress);
      this.ApproveFlag = flag;
    },
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
<style lang="scss" soped>
@import "../../assets/css/flash_pool.scss";
</style>