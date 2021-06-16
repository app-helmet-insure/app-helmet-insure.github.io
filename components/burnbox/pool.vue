<template>
  <div class="burnbox">
    <div
      class="burn_wrap"
      v-if="!activeFlag || (activeFlag && activeType == 'STAKE')"
    >
      <div class="process">
        <div class="name">
          <span>{{ $t("Table.FireProcess") }}</span>
          <span style="display: flex">
            <span>{{ isLogin ? rewards : "--" }}</span>
            /
            <span>{{ isLogin ? activeData.TOTAL_BONUS : "--" }}</span>
          </span>
        </div>
        <div class="control">
          <div class="control_wrap">
            <div class="control_real" :style="`width:${process}%`">
              <i class="fire" v-if="process != 0"></i>
            </div>
          </div>
        </div>
      </div>
      <p>
        <span>{{ $t("Table.DAvailable") }}</span>
        <span>
          <countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(balance.Deposite)"
            :duration="2000"
            :decimals="8"
          />
          <span v-else>--</span>
          {{ activeData.TOKEN_NAME }}
        </span>
      </p>
      <div class="input">
        <input
          type="text"
          v-model="DepositeNum"
          :class="activeType == 'STAKE' ? 'activeInput' : ''"
        />
        <p>
          <span>{{ activeData.TOKEN_NAME }}</span
          >|<i @click="DepositeNum = balance.Deposite">{{ $t("Table.Max") }}</i>
        </p>
      </div>
      <button
        :class="
          this.activeData.MING_TIME == 'Expired'
            ? 'disable_button submit_burn'
            : 'submit_burn'
        "
        @click="toDeposite"
      >
        <i :class="stakeLoading ? 'loading_pic' : ''"></i
        >{{ ApproveFlag ? $t("Table.Approve") : $t("Table.Burn") }}
      </button>
      <div class="text">
        <p>
          <span>{{ $t("Table.MyBurn") }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Withdraw)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ activeData.TOKEN_NAME }}</span
          >
        </p>
        <p>
          <span>{{ $t("Table.TotalBurn") }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.TotalLPT)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ activeData.TOKEN_NAME }}</span
          >
        </p>
        <p class="bigsize">
          <span>{{ $t("Table.MyPoolShare") }} </span>
          <span> {{ isLogin ? balance.Share : "--" }} % </span>
        </p>
      </div>

      <div class="ContractAddress">
        <span
          >{{ activeData.TOKEN_NAME }} {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ activeData.ONELPT_ADDRESS.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="copyAdress($event, activeData.ONELPT_ADDRESS)"
          ></i>
        </p>
      </div>
    </div>
    <i></i>
    <div
      class="claim_wrap"
      v-if="!activeFlag || (activeFlag && activeType == 'CLAIM')"
    >
      <div class="process">
        <div class="name">
          <span>{{ $t("Table.FireProcess") }}</span>
          <span style="display: flex">
            <span>{{ isLogin ? rewards : "--" }}</span>
            /
            <span>{{ isLogin ? activeData.TOTAL_BONUS : "--" }}</span>
          </span>
        </div>
        <div class="control">
          <div class="control_wrap">
            <div class="control_real" :style="`width:${process}%`">
              <i class="fire" v-if="process != 0"></i>
            </div>
          </div>
        </div>
      </div>
      <p>
        <span>{{ activeData.earn }} {{ $t("Table.HELMETRewards") }}</span>
        <span
          ><countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(balance.Earn)"
            :duration="2000"
            :decimals="8"
          />
          {{ activeData.earn }}</span
        >
      </p>
      <div class="input">
        <input
          v-if="isLogin"
          type="text"
          v-model="balance.Earn"
          disabled
          :class="activeType == 'CLAIM' ? 'activeInput' : ''"
        />
        <input
          v-else
          type="text"
          disabled
          :class="activeType == 'CLAIM' ? 'activeInput' : ''"
        />
        <p>
          <span>{{ activeData.REWARD_NAME }}</span>
          <!-- |<i
            @click="WithdrawNum = balance.Earn"
            style="border: 1px solid #fd7e14"
            >{{ $t("Table.Max") }}</i
          > -->
        </p>
      </div>

      <button class="submit_burn" @click="toClaim">
        <i :class="claimLoading ? 'loading_pic' : ''"></i
        >{{ $t("Table.Claim") }}
      </button>
      <div class="ContractAddress">
        <span
          >{{ activeData.REWARD_NAME }} {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ activeData.REWARD_ADDRESS.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="copyAdress($event, activeData.REWARD_ADDRESS)"
          ></i>
        </p>
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
import { Stake, GetReward, Approve } from "~/interface/write_contract.js";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import precision from "~/assets/js/precision.js";
import countTo from "vue-count-to";
import ClipboardJS from "clipboard";
import Message from "~/components/common/Message";
import moment from "moment";
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
        Earn: 0,
        TotalLPT: 0,
        Share: 0,
      },
      process: 0,
      rewards: 0,
      DepositeNum: "",
      ApproveFlag: false,
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
      isLogin: false,
    };
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
        this.getProcess();
      }
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  mounted() {
    this.getBalance();
    this.getProcess();
    this.NeedApprove();
    if (!this.activeData.MING_TIME == "Expired") {
      let timer1 = setInterval(() => {
        this.getProcess();
      }, 20000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer1);
      });
    }
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
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin;
      }
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
      this.balance.Deposite = Deposite;
      this.balance.Withdraw = Withdraw;
      this.balance.Earn = Helmet;
      this.balance.TotalLPT = fixD(TotalLPT, 8);
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2);
    },
    getProcess() {
      let now = moment.now();
      let startTime = new Date(moment(this.activeData.START_TIME)) * 1;
      let endTime = new Date(moment(this.activeData.END_TIME)) * 1;
      let process = precision.divide(now - startTime, endTime - startTime);
      console.log(process);
      if (this.activeData.MING_TIME == "Expired") {
        this.process = 100;
        this.rewards = this.activeData.TOTAL_BONUS;
      } else {
        this.process = process > 0 ? fixD(process * 100, 2) : 0;
        this.rewards =
          process > 0 ? fixD(process * this.activeData.TOTAL_BONUS, 4) : 0;
      }
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
      let TokenSymbol = this.activeData.TOKEN_NAME;
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
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/css/burn_pool.scss";
</style>