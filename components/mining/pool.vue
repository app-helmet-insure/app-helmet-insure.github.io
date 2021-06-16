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
          {{ activeData.STAKE_UNIT }}
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
            &nbsp;{{ activeData.STAKE_UNIT }}</span
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
            &nbsp;{{ activeData.STAKE_UNIT }}</span
          >
        </p>
        <section>
          <p>
            <span>{{ $t("Table.MyPoolShare") }}：</span>
            <span> {{ isLogin ? balance.Share : "--" }} %</span>
          </p>
          <div style="display: flex">
            <p
              class="jump_text"
              v-html="activeData.JUMP1_TEXT"
              v-if="activeData.JUMP1_TEXT"
            ></p>
            <p
              class="jump_text"
              v-html="activeData.JUMP2_TEXT"
              v-if="activeData.JUMP2_TEXT"
            ></p>
          </div>
        </section>
      </div>
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
          {{ activeData.STAKE_UNIT }}
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
          <!-- <span @click="WithdrawNum = balance.Withdraw">{{
            $t("Insurance.Insurance_text18")
          }}</span> -->
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
        <p v-if="activeData.REWARD1_SYMBOL">
          <span
            ><i @click="hadnleShowOnePager($event, 'QHELMET')">{{
              activeData.REWARD1_SYMBOL
            }}</i>
            {{ $t("Table.HELMETRewards") }}：</span
          >
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Reward1)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            {{ activeData.REWARD1_SYMBOL }}</span
          >
        </p>
        <p v-if="activeData.REWARD2_SYMBOL">
          <span
            ><i @click="hadnleShowOnePager($event, 'QHELMET')">{{
              activeData.REWARD2_SYMBOL
            }}</i>
            {{ $t("Table.HELMETRewards") }}：</span
          >
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Reward2)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            {{ activeData.REWARD2_SYMBOL }}</span
          >
        </p>
        <!-- compound -->
        <button
          v-if="activeData.COMPOUND"
          @click="toCompound"
          :class="claimLoading ? 'disable o_button' : 'o_button'"
        >
          <i :class="claimLoading ? 'loading_pic' : ''"></i
          >{{ $t("Table.Compound") }}
        </button>
        <!-- claim -->
        <button
          v-else
          @click="toClaim"
          :class="
            (claimLoading ? 'disable o_button' : 'o_button',
            activeData.MING_TIME == 'Finished'
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
  Earned2,
  Allowance,
} from "~/interface/read_contract.js";
import {
  Stake,
  GetReward,
  GetDoubleReward,
  Approve,
  Exit,
} from "~/interface/write_contract.js";
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
        Reward1: 0,
        Reward2: 0,
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
    this.$bus.$on("GET_BALANCE", () => {
      this.getBalance();
    });
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
    getLptType() {
      let SWAP_TYPE = this.activeData.SWAP_TYPE;
      switch (SWAP_TYPE) {
        case "PANCAKEV1":
          return "LP";
        case "PANCAKEV2":
          return "LP";
        case "BURGER":
          return "BLP";
        case "DODO":
          return "DLP";
        case "MDEX":
          return "MLP";
      }
    },

    async addTokenFn(options) {
      let data = {
        tokenAddress: options.ADDTOKEN_ADDRESS,
        tokenSymbol: options.ADDTOKEN_SYMBOL,
        tokenDecimals: options.ADDTOKEN_DECIMALS,
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
      let Reward1 = await Earned(
        this.activeData.POOL_ADDRESS,
        this.activeData.REWARD1_DECIMALS
      );
      if (this.activeData.REWARD2_SYMBOL) {
        let Reward2 = await Earned2(
          this.activeData.POOL_ADDRESS,
          this.activeData.REWARD2_DECIMALS
        );
        this.balance.Reward2 = Reward2;
      }
      // 赋值
      this.balance.Deposite = Deposite;
      this.balance.Withdraw = Withdraw;
      this.balance.Reward1 = Reward1;
      this.balance.TotalLPT = TotalLPT;
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2);
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
          if (res == "success") {
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
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let ContractAddress = this.activeData.POOL_ADDRESS;
      let RewardVolume = this.activeData.REWARD_VOLUME;
      if (RewardVolume == "one") {
        await GetReward(ContractAddress, (res) => {
          if (res == "success" || res == "error") {
            this.getBalance();
            this.claimLoading = false;
          }
        });
      } else {
        await GetDoubleReward(ContractAddress, (res) => {
          if (res == "success" || res == "error") {
            this.getBalance();
            this.claimLoading = false;
          }
        });
      }
    },
    toCompound() {
      this.$bus.$emit("OPEN_COMPOUND", {
        title: "Compound HELMET Earned",
        number: this.balance.Reward1,
        poolAddress: this.activeData.POOL_ADDRESS,
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
<style lang='scss'>
.jump_text {
  a {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #fd7e14;
    line-height: 20px;
    display: flex;
    align-items: center;
    i {
      display: block;
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 0 4px;
    }
    .pancake {
      background-image: url("../../assets/img/icon/pancake@2x.png");
    }
    .dodo {
      background-image: url("../../assets/img/icon/dodo@2x.png");
    }
    .chainswap {
      background-image: url("../../assets/img/icon/chainswap@2x.png");
    }
    .qian {
      background-image: url("../../assets/img/icon/qian@2x.png");
    }
    .mdx {
      background-image: url("../../assets/img/icon/mdx@2x.png");
    }
    .burger {
      background-image: url("../../assets/img/icon/burgerswap@2x.png");
    }
  }
  .H5_link {
    display: none;
  }
}
</style>
<style lang='scss'scoped>
@import "../../assets/css/mining_pool.scss";
</style>