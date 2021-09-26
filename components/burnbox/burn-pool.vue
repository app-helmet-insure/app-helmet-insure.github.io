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
            <span>{{ isLogin ? activeData.total_bonus : "--" }}</span>
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
            :endVal="Number(CanDeposite)"
            :duration="2000"
            :decimals="8"
          />
          <span v-else>--</span>
          {{ activeData.stake_symbol }}
        </span>
      </p>
      <div class="input">
        <input
          type="text"
          v-model="DepositeNum"
          :class="activeType == 'STAKE' ? 'activeInput' : ''"
        />
        <p>
          <span>{{ activeData.stake_symbol }}</span
          >|<i @click="DepositeNum = CanDeposite">{{ $t("Table.Max") }}</i>
        </p>
      </div>
      <button
        :class="
          activeData.status === 3 ? 'disable_button submit_burn' : 'submit_burn'
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
              :endVal="Number(CanWithdraw)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ activeData.stake_symbol }}</span
          >
        </p>
        <p>
          <span>{{ $t("Table.TotalBurn") }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(TotalDeposite)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ activeData.stake_symbol }}</span
          >
        </p>
        <p class="bigsize">
          <span>{{ $t("Table.MyPoolShare") }} </span>
          <span> {{ isLogin ? MyPoolShare : "--" }} % </span>
        </p>
      </div>

      <div class="ContractAddress">
        <span
          >{{ activeData.stake_symbol }} {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ activeData.stake_address.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="copyAdress($event, activeData.stake_address)"
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
            <span>{{ isLogin ? activeData.total_bonus : "--" }}</span>
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
            :endVal="Number(CanClaim)"
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
          v-model="CanClaim"
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
          <span>{{ activeData.reward_symbol }}</span>
          <!-- |<i
            @click="WithdrawNum = CanClaim"
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
          >{{ activeData.reward_symbol }}
          {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ activeData.reward_address.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="copyAdress($event, activeData.reward_address)"
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
import MiningABI from "~/web3/abis/MiningABI.json";
import { Contract } from "ethers-multicall-x";
import {
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
} from "~/web3/index.js";
export default {
  props: ["activeData", "activeFlag", "activeType"],
  components: {
    countTo,
  },
  data() {
    return {
      CanDeposite: 0,
      CanWithdraw: 0,
      TotalDeposite: 0,
      CanClaim: 0,
      MyPoolShare: 0,
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
    this.$nextTick(() => {
      this.getPoolInfo();
    });
    if (!this.activeData.status === 3) {
      let timer1 = setInterval(() => {
        this.getProcess();
      }, 20000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer1);
      });
    } else {
      this.process = 100;
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
        this.isLogin = newValue.isLogin;
      }
    },
    getPoolInfo() {
      let {
        stake_address,
        pool_address,
        stake_decimals_number,
        reward_decimals_number,
      } = this.activeData;
      const PoolContracts = new Contract(pool_address, MiningABI);
      const StakeContracts = new Contract(stake_address, MiningABI);
      const Account = window.CURRENTADDRESS;
      const PromiseList = [
        StakeContracts.balanceOf(Account),
        PoolContracts.balanceOf(Account),
        PoolContracts.totalSupply(),
        PoolContracts.earned(Account),
      ];
      const MulticallProvider = getOnlyMultiCallProvider();
      MulticallProvider.all(PromiseList).then((res) => {
        const FixData = processResult(res);
        const [CanDeposite, CanWithdraw, TotalDeposite, CanClaim] = FixData;
        this.CanDeposite = fromWei(CanDeposite, stake_decimals_number);
        this.CanWithdraw = fromWei(CanWithdraw, stake_decimals_number);
        this.TotalDeposite = fromWei(TotalDeposite, stake_decimals_number);
        this.CanClaim = fromWei(CanClaim, reward_decimals_number);
        this.MyPoolShare = fixD(
          (this.CanWithdraw / this.TotalDeposite) * 100,
          2
        );
      });
    },
    getProcess() {
      let now = moment.now();
      let startTime = new Date(moment(this.activeData.start_time)) * 1;
      let endTime = new Date(moment(this.activeData.finish_time)) * 1;
      let process = precision.divide(now - startTime, endTime - startTime);
      if (this.activeData.status === 3) {
        this.process = 100;
        this.rewards = this.activeData.total_bonus;
      } else {
        this.process = process > 0 ? fixD(process * 100, 2) : 0;
        this.rewards =
          process > 0 ? fixD(process * this.activeData.total_bonus, 4) : 0;
      }
    },
    
    async toDeposite() {
      if (!this.DepositeNum) {
        return;
      }
      if (this.stakeLoading) {
        return;
      }
      let ContractAddress = this.activeData.pool_address;
      let StakeAddress = this.activeData.stake_address;
      let TokenSymbol = this.activeData.stake_symbol;
      let DepositeVolume = this.DepositeNum;
      let Decimals = this.activeData.stake_decimals_number;
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
      let SpenderAddress = this.activeData.pool_address;
      let TokenAddress = this.activeData.stake_address;
      let flag = await Allowance(TokenAddress, SpenderAddress);
      this.ApproveFlag = flag;
    },
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let ContractAddress = this.activeData.pool_address;
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