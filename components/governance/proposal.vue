<template>
  <div class="governance_proposal">
    <div class="governance_proposal_title">
      <div :class="['status_img', Proposal.StatusImg]">
        {{ Proposal.StatusText }}
      </div>
      <h3>{{ Proposal.Title }}</h3>
    </div>
    <div class="governance_proposal_perhaps perhaps">
      <p>{{ Proposal.Perhaps }}</p>
    </div>
    <div class="governance_proposal_action">
      <div class="governance_proposal_action_title">投票</div>
      <div class="governance_proposal_action_wrap">
        <div class="governance_proposal_action_item_wrap">
          <div
            :class="[
              'governance_proposal_action_item',
              PropoaslID === Item.PropoaslID
                ? 'governance_proposal_action_item_active'
                : '',
            ]"
            v-for="Item in GovernanceList"
            :key="Item.PropoaslID"
            @click="PropoaslID = Item.PropoaslID"
          >
            {{ Item.PropoaslType }}
          </div>
        </div>
        <button
          class="governance_proposal_action_button b_button"
          @click="handleClickVotes"
        >
          投票
        </button>
      </div>
    </div>
    <div class="governance_proposal_history">
      <div class="governance_proposal_history_title">投票</div>
      <div class="governance_proposal_history_wrap">
        <div class="governance_proposal_history_item_wrap">
          <div
            class="governance_proposal_history_item"
            v-for="Item in GovernanceList"
            :key="Item.PropoaslID"
          >
            <span>{{ Item.PropoaslType }}</span>
            <span>{{ Item.PropoaslType }}</span>
            <span>{{ Item.PropoaslType }}</span>
          </div>
        </div>
        <div class="governance_proposal_history_button">查看更多</div>
      </div>
    </div>
    <GovernanceVotesDialog
      :DialogVisible="VotesVisible"
      :DialogClose="votesClose"
      :ProposalData="Proposal"
      :MiningData="Mining"
      :PropoaslID="PropoaslID"
      :toDeposite="toDeposite"
    /><WaitingConfirmationDialog
      :DialogVisible="WaitingVisible"
      :DialogClose="waitingClose"
    >
      <div class="waiting_content">
        <p>{{ WaitingText }}</p>
      </div>
    </WaitingConfirmationDialog>
    <SuccessConfirmationDialog
      :DialogVisible="SuccessVisible"
      :DialogClose="successClose"
      :SuccessHash="SuccessHash"
    />
  </div>
</template>

<script>
import GovernanceVotesDialog from "~/components/dialogs/governance-votes-dialog.vue";
import SuccessConfirmationDialog from "~/components/dialogs/success-confirmation-dialog.vue";
import WaitingConfirmationDialog from "~/components/dialogs/waiting-confirmation-dialog.vue";
import { GovernanceList, formatGovernance } from "~/config/governance.js";
import { DaoPoolList, formatMiningPool } from "~/config/mining.js";
import { toWei, getContract } from "~/web3/index.js";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
export default {
  components: {
    GovernanceVotesDialog,
    SuccessConfirmationDialog,
    WaitingConfirmationDialog,
  },
  data() {
    return {
      Proposal: {},
      Mining: {},
      PropoaslID: 1,
      VotesVisible: false,
      ApproveStatus: false,
      WaitingVisible: false,
      SuccessVisible: false,
      SuccessHash: "",
      WaitingText: "",
      GovernanceList: [
        {
          PropoaslType: "同意",
          PropoaslID: 1,
        },
        {
          PropoaslType: "不同意",
          PropoaslID: 2,
        },
        {
          PropoaslType: "弃权",
          PropoaslID: 3,
        },
      ],
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
  mounted() {
    let Router = this.$route.params.id;
    let FixGovernanceList = formatGovernance(GovernanceList);
    let FixDaoPoolList = formatMiningPool(DaoPoolList);
    this.Proposal = FixGovernanceList.filter(
      (item) => item.Router === Router
    )[0];
    this.Mining = FixDaoPoolList.filter((item) => item.Router === Router)[0];
    console.log(Router, this.Proposal, this.Mining);
  },
  methods: {
    reloadData(Value) {
      if (Value) {
        this.isLogin = Value.isLogin;
        this.$nextTick(() => {});
      }
    },
    votesClose() {
      this.VotesVisible = false;
    },
    waitingClose() {
      this.WaitingVisible = false;
    },
    successClose() {
      this.SuccessVisible = false;
    },
    handleClickVotes() {
      this.VotesVisible = true;
    },
    toDeposite(StakeVolume, ApproveStatus) {
      console.log(StakeVolume, ApproveStatus);
      this.ApproveStatus = ApproveStatus;
      if (!StakeVolume) {
        return;
      }
      const PoolAddress = this.Mining.PoolAddress;
      const StakeAddress = this.Mining.StakeAddress;
      const TokenSymbol = this.Mining.StakeSymbol;
      const Decimals = this.Mining.StakeDecimals;
      const PoolABI = this.Mining.PoolABI;
      const PropoaslID = this.PropoaslID;
      const StakeMethods = this.Mining.StakeMethods;
      const Volume = toWei(StakeVolume + "", Decimals);
      const Account = this.CurrentAccount.account;
      const Infinity =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      this.StakeLoading = true;

      if (!this.ApproveStatus) {
        const Contracts = getContract(ERC20ABI.abi, StakeAddress);
        Contracts.methods
          .approve(PoolAddress, Infinity)
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
            this.WaitingText = `You will approve ${TokenSymbol} to Helmet`;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.ApproveStatus = true;
              this.WaitingText = "";
              this.$store.dispatch("refreshData");
            }
          })
          .on("error", (error) => {
            this.WaitingVisible = false;
            this.SuccessVisible = false;
            this.ApproveStatus = false;
          });
      } else {
        const Contracts = getContract(PoolABI, PoolAddress);
        let Params = [Volume, PropoaslID];
        Contracts.methods[StakeMethods](...Params)
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.$store.dispatch("refreshData");
            }
          })
          .on("error", (error) => {
            this.WaitingVisible = false;
            this.SuccessVisible = false;
          });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~assets/css/themes.scss";
.governance_proposal {
  flex: 2;
}
.status_img {
  width: 75px;
  height: 32px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
}
.unopen {
  background-image: url("~/assets/img/governance/unopen.png");
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  @include themeify {
    color: themed("color-ffffff");
  }
  line-height: 20px;
}
.ongoing {
  background-image: url("~/assets/img/governance/ongoing.png");
  font-size: 14px;
  font-family: IBMPlexSans-Bold, IBMPlexSans;
  font-weight: bold;
  @include themeify {
    color: themed("color-ffffff");
  }
  line-height: 20px;
}
.finish {
  background-image: url("~/assets/img/governance/finish.png");
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(23, 23, 58, 0.4);
  line-height: 20px;
}
.perhaps {
  > p {
    font-size: 14px;
    font-family: IBMPlexSans;
    @include themeify {
      color: themed("color-17173a");
    }
    opacity: 0.7;
    line-height: 22px;
  }
}
.governance_proposal_title {
  display: flex;
  align-items: center;
  > h3 {
    font-size: 16px;
    font-family: IBMPlexSans-Bold, IBMPlexSans;
    font-weight: bold;
    @include themeify {
      color: themed("color-17173a");
    }
    margin-left: 15px;
  }
}
.governance_proposal_perhaps {
  margin-top: 15px;
}
.governance_proposal_action {
  margin-top: 20px;
  border-radius: 10px;
  @include themeify {
    border: 1px solid themed("insure_button_border");
  }
  &_title {
    @include themeify {
      color: themed("color-17173a");
      border-bottom: 1px solid themed("insure_button_border");
    }
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    line-height: 40px;
    padding-left: 20px;
  }
  &_wrap {
    padding: 24px 20px;
  }
  &_item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    height: 40px;
    @include themeify {
      color: themed("color-17173a");
      background: themed("color-f8f9fa");
      border: 1px solid themed("insure_button_border");
    }
    border-radius: 5px;
    font-size: 14px;
    font-family: IBMPlexSans-Bold, IBMPlexSans;
    font-weight: bold;
    line-height: 18px;
    cursor: pointer;
    &:hover {
      @include themeify {
        background: themed("color-f8f9fa");
      }
      border: 2px solid #fd7e14 !important;
    }
  }
  &_item_active {
    @include themeify {
      background: themed("color-f8f9fa");
    }
    border: 2px solid #fd7e14 !important;
  }
  &_button {
    border-radius: 5px;
  }
}
.governance_proposal_history {
  border-radius: 10px;
  @include themeify {
    border: 1px solid themed("insure_button_border");
  }
  margin-top: 20px;
  &_title {
    @include themeify {
      color: themed("color-17173a");
      border-bottom: 1px solid themed("insure_button_border");
    }
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    line-height: 40px;
    padding-left: 20px;
  }
  &_wrap {
  }
  &_item {
    height: 48px;
    @include themeify {
      border-bottom: 1px solid themed("insure_button_border");
    }
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 20px;
    }
  }
  &_button {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    @include themeify {
      color: themed("color-17173a");
    }
    line-height: 20px;
    cursor: pointer;
  }
}
@media screen and(min-width:750px) {
}
@media screen and(max-width:750px) {
}
</style>