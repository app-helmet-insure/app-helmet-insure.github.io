<template>
  <el-dialog
    top="35vh"
    title="投票(抵押helmet即投票)"
    footer
    append-to-body
    custom-class="governance_dialog"
    :close-on-click-modal="false"
    :visible="DialogVisible"
    @close="DialogClose"
  >
    <div class="governance_dialog_title between">
      <span>可抵押&投票</span>
      <p>
        <countTo
          v-if="isLogin"
          :startVal="Number(0)"
          :endVal="Number(CanDeposite)"
          :duration="2000"
          :decimals="4"
        />
        <span v-else>--</span>
        &nbsp;{{ MiningData.StakeUnit }}
      </p>
    </div>
    <div class="governance_dialog_input">
      <el-input v-model="StakeVolume" type="number" />
    </div>
    <div class="governance_dialog_button">
      <button
        @click="handleClickVotes"
        :class="
          MiningData.Status === 3 ? 'disable_button o_button' : 'o_button'
        "
      >
        抵押&投票
      </button>
    </div>
    <div class="governance_dialog_tips">
      抵押的 HELMET 需投票结束后才可以领取, 抵押期间你会获得 HELMET 作为奖励,
      奖励的数量可以前往 Mining 页面的
      <a href="/mining">Helmet Governance</a> 查看
    </div>
  </el-dialog>
</template> 

<script>
import countTo from "vue-count-to";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import { Contract } from "ethers-multicall-x";
import {
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
  toWei,
  getContract,
} from "~/web3/index.js";
export default {
  props: [
    "DialogVisible",
    "DialogClose",
    "ProposalData",
    "MiningData",
    "PropoaslID",
    "toDeposite",
  ],
  components: { countTo },
  data() {
    return {
      isLogin: false,
      ApproveStatus: false,
      CanDeposite: 0,
      StakeVolume: "",
    };
  },
  computed: {
    CurrentAccount() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    CurrentAccount: {
      handler: "reloadData",
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    reloadData(Value) {
      if (Value) {
        this.isLogin = Value.isLogin;
        this.$nextTick(() => {
          this.getBalance();
        });
      }
    },
    getBalance() {
      let {
        StakeAddress,
        PoolAddress,
        StakeDecimals,
        RewardDecimals,
        NoProxy,
        PoolABI,
        StakeABI,
        ProxyPid,
        PoolType,
        CanWithDrawMethods,
        CanClaim1Methods,
        CanClaim2Methods,
        RewardPerMethods,
        HaveReward2,
      } = this.MiningData;
      const StakeContracts = new Contract(StakeAddress, StakeABI);
      const ApproveContracts = new Contract(StakeAddress, ERC20ABI.abi);
      const Account = this.CurrentAccount.account;
      let PromiseList = [
        StakeContracts.balanceOf(Account),
        ApproveContracts.allowance(Account, PoolAddress),
      ];
      const MulticallProvider = getOnlyMultiCallProvider();
      MulticallProvider.all(PromiseList).then((res) => {
        const FixData = processResult(res);
        const [CanDeposite, ApproveStatus] = FixData;
        this.CanDeposite = fromWei(CanDeposite, StakeDecimals);
        this.ApproveStatus = ApproveStatus > 0;
      });
    },
    handleClickVotes() {
      this.toDeposite(this.StakeVolume, this.ApproveStatus);
    },
  },
};
</script>

<style lang='scss'>
@import "~assets/css/themes.scss";
@media screen and(min-width:750px) {
  .governance_dialog {
    border-radius: 10px !important;
    width: 450px !important;
  }
}
@media screen and(max-width:750px) {
  .governance_dialog {
    width: 90%;
  }
}
.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  > span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 14px;
    opacity: 0.7;
    @include themeify {
      color: themed("color-17173a");
    }
  }
  > p {
    display: flex;
    font-size: 14px;
    font-family: IBMPlexSans;
    font-weight: bold;
    @include themeify {
      color: themed("color-17173a");
    }
    line-height: 14px;
  }
}
.governance_dialog_input {
  margin-top: 10px;
}
.governance_dialog_button {
  margin-top: 20px;
  button {
    border-radius: 5px;
  }
}
.governance_dialog_tips {
  margin-top: 8px;
  height: 72px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  @include themeify {
    color: themed("color-17173a");
  }
  opacity: 0.7;
  line-height: 24px;
  > a {
    color: #fd7e14;
    text-decoration: underline;
    &:hover {
      color: #ff9600;
    }
  }
}
</style>