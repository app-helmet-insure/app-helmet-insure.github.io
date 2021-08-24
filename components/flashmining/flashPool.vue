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
            :endVal="Number(CanDeposite)"
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
          <span @click="DepositeNum = CanDeposite">{{ $t("Table.Max") }}</span>
        </div>
      </div>
      <div class="button">
        <button
          @click="toDeposite"
          :class="
            (stakeLoading ? 'disable b_button' : 'b_button',
            this.activeData.status == 3
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
              :endVal="Number(CanWithdraw)"
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
              :endVal="Number(TotalDeposite)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            &nbsp;LPT</span
          >
        </p>
        <p>
          <span>{{ $t("Table.MyPoolShare") }}：</span>
          <span> {{ isLogin ? MyPoolShare : "--" }} %</span>
        </p>
      </div>
      <a
        :href="`https://exchange.pancakeswap.finance/#/add/${activeData.onelpt_address}/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8`"
        target="_blank"
        >From <i class="pancake"></i>Get {{ activeData.onelpt_symbol }}-HELMET
        LPT</a
      >
      <div class="ContractAddress" v-if="activeData.left_show_token">
        <span
          >{{ activeData.left_show_token.add_token_symbol }}
          {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ activeData.left_show_token.add_token_address.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, activeData.left_show_token.add_token_address)
            "
          ></i>
        </p>
      </div>
      <div class="addToken" v-if="activeData.left_show_token">
        <p @click="addTokenFn(activeData.left_show_token)">
          Add {{ activeData.left_show_token.add_token_symbol }} to MetaMask
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
            :endVal="Number(CanWithdraw)"
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
            v-model="CanWithdraw"
            disabled
            :class="activeType == 'CLAIM' ? 'activeInput' : ''"
          />
          <!-- <span
            @click="WithdrawNum = CanWithdraw"
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
            {{ activeData.reward_symbol }}
            {{ $t("Table.HELMETRewards") }}：</span
          >
          <span>
            <span>
              <countTo
                v-if="isLogin"
                :startVal="Number(0)"
                :endVal="Number(CanClaim)"
                :duration="2000"
                :decimals="8"
              />
              <span v-else>--</span>
              {{ activeData.reward_symbol }}</span
            >
          </span>
        </p>
        <button
          @click="toClaim"
          :class="
            (claimLoading ? 'disable o_button' : 'o_button',
            this.activeData.status == 3
              ? 'disable_button o_button'
              : 'o_button')
          "
        >
          <i :class="claimLoading ? 'loading_pic' : ''"></i
          >{{ $t("Table.ClaimAllRewards") }}
        </button>
      </div>
      <div class="ContractAddress" v-if="activeData.right_show_token">
        <span
          >{{ activeData.right_show_token.add_token_symbol }}
          {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ activeData.right_show_token.add_token_address.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, activeData.right_show_token.add_token_address)
            "
          ></i>
        </p>
      </div>
      <div class="addToken" v-if="activeData.right_show_token">
        <p @click="addTokenFn(activeData.right_show_token)">
          Add {{ activeData.right_show_token.add_token_symbol }} to MetaMask
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
import MiningABI from "../../abi/MiningABI.json";
import { Contract } from "ethers-multicall-x";
import {
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
} from "~/interface/index.js";
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
    this.$nextTick(() => {
      this.getPoolInfo();
    });
    this.NeedApprove();
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
    activeData(newValue) {
      if (newValue) {
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
        tokenAddress: options.add_token_address,
        tokenSymbol: options.add_token_symbol,
        tokenDecimals: options.add_token_decimals,
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
    // 抵押
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
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return;
      }
      this.exitLoading = true;
      let ContractAddress = this.activeData.pool_address;
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