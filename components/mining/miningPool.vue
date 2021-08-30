<template>
  <div class="mining_pool">
    <div
      class="deposit"
      v-if="!ActiveFlag || (ActiveFlag && ActiveType == 'STAKE')"
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
          {{ ActiveData.StakeUnit }}
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="deposit"
            type="text"
            v-model="DepositeNum"
            :class="ActiveType == 'STAKE' ? 'activeInput' : ''"
          />
          <span @click="DepositeNum = CanDeposite">{{ $t("Table.Max") }}</span>
        </div>
      </div>
      <div class="button">
        <button
          @click="toDeposite"
          :class="
            (stakeLoading ? 'disable b_button' : 'b_button',
            ActiveData.status == 3 ? 'disable_button b_button' : 'b_button')
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
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ ActiveData.StakeUnit }}</span
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
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ ActiveData.StakeUnit }}</span
          >
        </p>
        <section>
          <p>
            <span>{{ $t("Table.MyPoolShare") }}：</span>
            <span> {{ isLogin ? MyPoolShare : "--" }} %</span>
          </p>
          <div style="display: flex">
            <p
              class="jump_text"
              v-html="ActiveData.JumpLink1"
              v-if="ActiveData.JumpLink1"
            ></p>
            <p
              class="jump_text"
              v-html="ActiveData.JumpLink2"
              v-if="ActiveData.JumpLink2"
            ></p>
          </div>
        </section>
      </div>
      <div class="ContractAddress" v-if="ActiveData.LeftShowToken">
        <span
          >{{ ActiveData.LeftShowToken.AddTokenSymbol }}
          {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ ActiveData.LeftShowToken.AddTokenAddress.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, ActiveData.LeftShowToken.AddTokenAddress)
            "
          ></i>
        </p>
      </div>
      <div class="addToken" v-if="ActiveData.LeftShowToken">
        <p @click="addTokenFn(ActiveData.LeftShowToken)">
          Add {{ ActiveData.LeftShowToken.AddTokenSymbol }} to MetaMask
        </p>
        <i></i>
      </div>
    </div>
    <div
      class="withdraw"
      v-if="!ActiveFlag || (ActiveFlag && ActiveType == 'CLAIM')"
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
          {{ ActiveData.StakeUnit }}
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="withdraw"
            type="text"
            v-model="CanWithdraw"
            disabled
            :class="ActiveType == 'CLAIM' ? 'activeInput' : ''"
          />
          <!-- <span @click="WithdrawNum = CanWithdraw">{{
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
        <p v-if="ActiveData.reward1_symbol">
          <span
            ><i>{{ ActiveData.reward1_symbol }}</i>
            {{ $t("Table.HELMETRewards") }}：</span
          >
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(CanClaim1)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            {{ ActiveData.reward1_symbol }}</span
          >
        </p>
        <p v-if="ActiveData.Reward2Symbol">
          <span
            ><i>{{ ActiveData.Reward2Symbol }}</i>
            {{ $t("Table.HELMETRewards") }}：</span
          >
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(CanClaim2)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            {{ ActiveData.Reward2Symbol }}</span
          >
        </p>
        <!-- compound -->
        <button
          v-if="ActiveData.compound"
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
            ActiveData.status === 3 ? 'disable_button o_button' : 'o_button')
          "
        >
          <i :class="claimLoading ? 'loading_pic' : ''"></i
          >{{ $t("Table.ClaimAllRewards") }}
        </button>
      </div>
      <div class="ContractAddress" v-if="ActiveData.RightShowToken">
        <span
          >{{ ActiveData.RightShowToken.AddTokenSymbol }}
          {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ ActiveData.RightShowToken.AddTokenAddress.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, ActiveData.RightShowToken.AddTokenAddress)
            "
          ></i> 
        </p>
      </div>
      <div class="addToken" v-if="ActiveData.RightShowToken">
        <p @click="addTokenFn(ActiveData.RightShowToken)">
          Add {{ ActiveData.RightShowToken.AddTokenSymbol }} to MetaMask
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
import addToken from "~/assets/utils/addtoken.js";
import MiningABI from "../../abi/MiningABI.json";
import { Contract } from "ethers-multicall-x";
import {
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
} from "~/interface/index.js";
export default {
  props: ["ActiveData", "ActiveFlag", "ActiveType"],
  components: {
    countTo,
  },
  data() {
    return {
      CanDeposite: 0,
      CanWithdraw: 0,
      TotalDeposite: 0,
      CanClaim1: 0,
      CanClaim2: 0,
      MyPoolShare: 0,
      DepositeNum: "",
      WithdrawNum: "",
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
      helmetPrice: 0,
      MingTime: "",
      isLogin: false,
      ApproveFlag: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getPoolInfo();
    });
    this.NeedApprove();

    this.$bus.$on("GET_BALANCE", () => {
      this.getBalance();
    });
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
    ActiveData(newValue) {
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
    async addTokenFn(options) {
      let data = {
        tokenAddress: options.AddTokenAddress,
        tokenSymbol: options.AddTokenSymbol,
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
    getPoolInfo() {
      let {
        stake_address,
        pool_address,
        stake_decimals_number,
        reward_decimals_number,
      } = this.ActiveData;
      const PoolContracts = new Contract(pool_address, MiningABI);
      const StakeContracts = new Contract(stake_address, MiningABI);
      const Account = window.CURRENTADDRESS;
      const PromiseList = [
        StakeContracts.balanceOf(Account),
        PoolContracts.balanceOf(Account),
        PoolContracts.totalSupply(),
        PoolContracts.earned(Account),
        PoolContracts.earned2(Account),
      ];
      const MulticallProvider = getOnlyMultiCallProvider();
      MulticallProvider.all(PromiseList).then((res) => {
        const FixData = processResult(res);
        const [CanDeposite, CanWithdraw, TotalDeposite, CanClaim1, CanClaim2] =
          FixData;
        this.CanDeposite = fromWei(CanDeposite, stake_decimals_number);
        this.CanWithdraw = fromWei(CanWithdraw, stake_decimals_number);
        this.TotalDeposite = fromWei(TotalDeposite, stake_decimals_number);
        this.CanClaim1 = fromWei(CanClaim1, reward_decimals_number);
        this.CanClaim2 = fromWei(CanClaim2, reward_decimals_number);
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
      let ContractAddress = this.ActiveData.POOL_ADDRESS;
      let StakeAddress = this.ActiveData.STAKE_ADDRESS;
      let TokenSymbol = this.ActiveData.STAKE_SYMBOL;
      let DepositeVolume = this.DepositeNum;
      let Decimals = this.ActiveData.STAKE_DECIMALS;
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
      let SpenderAddress = this.ActiveData.POOL_ADDRESS;
      let TokenAddress = this.ActiveData.STAKE_ADDRESS;
      let flag = await Allowance(TokenAddress, SpenderAddress);
      this.ApproveFlag = flag;
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let ContractAddress = this.ActiveData.POOL_ADDRESS;
      let RewardVolume = this.ActiveData.REWARD_VOLUME;
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
        poolAddress: this.ActiveData.POOL_ADDRESS,
      });
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return;
      }
      this.exitLoading = true;
      let ContractAddress = this.ActiveData.POOL_ADDRESS;
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
    .babyswap {
      background-image: url("../../assets/img/icon/babyswap@2x.png");
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