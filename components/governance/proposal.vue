<template>
  <div class="governance_proposal">
    <div :class="['status_img', Proposal.StatusImg]">
      {{ Proposal.StatusText }}
    </div>
    <div class="governance_proposal_title">
      <h3>{{ $t(Proposal.Title) }}</h3>
    </div>
    <div class="governance_proposal_perhaps perhaps">
      <p v-for="(item, index) in Proposal.Details" :key="index">
        {{ $t(item) }}
      </p>
    </div>
    <div class="governance_proposal_action">
      <div class="governance_proposal_action_title">
        {{ $t("Governance.Governance_text14") }}
      </div>
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
          class="governance_proposal_action_button"
          @click="handleClickVotes"
        >
          {{ $t("Governance.Governance_text14") }}
        </button>
      </div>
    </div>
    <div class="governance_proposal_history">
      <div class="governance_proposal_history_title">
        {{ $t("Governance.Governance_text14") }}
      </div>
      <div class="governance_proposal_history_wrap">
        <div class="governance_proposal_history_item_wrap">
          <div
            class="governance_proposal_history_item"
            v-for="(Item, Index) in GovernanceTxList.slice(
              MinNumber,
              MaxNumber
            )"
            :key="Index"
          >
            <span>{{ Item.ShowAddress }}</span>
            <span>{{ Item.ShowProposalID }}</span>
            <span>{{ Item.ShowAmount }}</span>
          </div>
        </div>
        <div class="governance_proposal_history_button" @click="changePage">
          {{ $t("Governance.Governance_text12") }}
        </div>
      </div>
    </div>
    <GovernanceVotesDialog
      :DialogVisible="VotesVisible"
      :DialogClose="votesClose"
      :CanDeposite="CanDeposite"
      :MiningData="Mining"
      :toDeposite="toDeposite"
      :ApproveStatus="ApproveStatus"
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
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import { getGovernance } from "~/interface/event.js";
import { fixD } from "~/assets/js/util.js";
import { Contract } from "ethers-multicall-x";
import {
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
  toWei,
  getContract,
} from "~/web3/index.js";
export default {
  components: {
    GovernanceVotesDialog,
    SuccessConfirmationDialog,
    WaitingConfirmationDialog,
  },
  data() {
    return {
      fixD,
      Proposal: {},
      Mining: {},
      PropoaslID: 2,
      CanDeposite: 0,
      VotesVisible: false,
      WaitingVisible: false,
      SuccessVisible: false,
      ApproveStatus: false,
      SuccessHash: "",
      WaitingText: "",
      CurrentPage: 1,
      PageSize: 5,
      MinNumber: 0,
      MaxNumber: 5,
      GovernanceTxList: [],
    };
  },
  computed: {
    CurrentAccount() {
      return this.$store.state.userInfo;
    },
    GovernanceList() {
      return [
        {
          PropoaslType: this.$t("Governance.Governance_text3"),
          PropoaslID: 1,
        },
        {
          PropoaslType: this.$t("Governance.Governance_text4"),
          PropoaslID: 2,
        },
        {
          PropoaslType: this.$t("Governance.Governance_text5"),
          PropoaslID: 3,
        },
      ];
    },
  },
  watch: {
    CurrentAccount: {
      handler: "reloadData",
      immediate: true,
    },
  },
  mounted() {
    console.log(this.$route);
    let Router = this.$route.params.details;
    let FixGovernanceList = formatGovernance(GovernanceList);
    let FixDaoPoolList = formatMiningPool(DaoPoolList);
    this.Proposal = FixGovernanceList.filter(
      (item) => item.Router === Router
    )[0];
    this.Mining = FixDaoPoolList.filter((item) => item.Router === Router)[0];
  },
  methods: {
    reloadData(Value) {
      if (Value) {
        this.isLogin = Value.isLogin;
        this.$nextTick(() => {
          this.getGovernanceList();
          this.getBalance();
        });
      }
    },
    changePage() {
      this.CurrentPage = this.CurrentPage + 1;
      if (this.CurrentPage <= 1) {
        this.MinNumber = 0;
        this.MaxNumber = this.PageSize;
      } else {
        this.MinNumber = 0;
        this.MaxNumber = (this.CurrentPage - 1) * this.PageSize + this.PageSize;
      }
      console.log(this.MinNumber, this.MaxNumber);
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
      } = this.Mining;
      const StakeContracts = new Contract(StakeAddress, StakeABI);
      const ApproveContracts = new Contract(StakeAddress, ERC20ABI.abi);
      const Account = this.CurrentAccount.account;
      if (!Account) {
        return;
      }
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
    getGovernanceList() {
      getGovernance().then((res) => {
        const FixList = [];
        const List = res.data.data.votes;
        List.forEach((item) => {
          let ShowID = this.getProposalStatus(item.proposalID);
          FixList.push({
            ShowAddress:
              item.address.substr(0, 1) +
              item.address.substr(1, 1).toLowerCase() +
              item.address.substr(2, 3) +
              "..." +
              item.address.substr(-4),
            Address: item.address,
            Amount: fromWei(item.amount),
            ShowAmount: fixD(fromWei(item.amount), 4),
            ProposalID: item.proposalID,
            ShowProposalID: ShowID,
          });
        });
        this.GovernanceTxList = FixList;
      });
    },
    getProposalStatus(ID) {
      let Current = this.Proposal.Proposal.filter(
        (itemKey) => itemKey.ID == ID
      )[0];
      switch (Current.Text) {
        case 1:
          return this.$t("Governance.Governance_text3");
        case 2:
          return this.$t("Governance.Governance_text4");
        case 3:
          return this.$t("Governance.Governance_text5");
        default:
          return "error";
      }
    },
    toDeposite(StakeVolume) {
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
              this.VotesVisible = false;
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
  position: relative;
}
.status_img {
  width: 90px;
  height: 36px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
}
.unopen {
  background-image: url("~/assets/img/governance/unopen.png");
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  @include themeify {
    color: #fff;
  }
  line-height: 20px;
}
.ongoing {
  background-image: url("~/assets/img/governance/ongoing.png");
  font-size: 14px;
  font-family: IBMPlexSans-Bold, IBMPlexSans;
  font-weight: bold;
  @include themeify {
    color: #fff;
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
      color: #17173a;
    }
    opacity: 0.7;
    margin-top: 10px;
    text-indent: 2em;
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
      color: #17173a;
    }
    margin-top: 45px;
  }
}
.governance_proposal_perhaps {
  margin-top: 15px;
}
.governance_proposal_action {
  margin-top: 20px;
  border-radius: 10px;
  @include themeify {
    border: 1px solid #f7c396;
  }
  &_title {
    @include themeify {
      color: #17173a;
      border-bottom: 1px solid #f7c396;
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
      color: #ffffff;
      border: 1px solid #f7c396;
    }
    background-image: url("../../assets/img/governance/type_button.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 5px;
    font-size: 14px;
    font-family: IBMPlexSans-Bold, IBMPlexSans;
    font-weight: bold;
    line-height: 18px;
    cursor: pointer;
    &:hover {
      @include themeify {
        // background: themed("color-f8f9fa");
      }
      border: 2px solid #fd7e14 !important;
    }
  }
  &_item_active {
    @include themeify {
      // background: themed("color-f8f9fa");
    }
    border: 2px solid #fd7e14 !important;
  }
  &_button {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    margin-top: 16px;
    background-image: url("../../assets/img/governance/submit_button.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 18px;
  }
}
.governance_proposal_history {
  border-radius: 10px;
  @include themeify {
    border: 1px solid #f7c396;
  }
  margin-top: 20px;
  &_title {
    @include themeify {
      color: #17173a;
      border-bottom: 1px solid #f7c396;
    }
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    line-height: 40px;
    padding-left: 20px;
  }
  &_wrap {
  }
  &_item_wrap {
    max-height: 480px;
    overflow-y: auto;
    &::-webkit-scrollbar-track {
      @include themeify {
        background: themed("color-ffffff");
      }
    }
    &::-webkit-scrollbar {
      width: 6px !important;
      height: 40px !important;
      position: fixed;
      bottom: 0;
    }
    &::-webkit-scrollbar-thumb {
      height: 40px;
      @include themeify {
        background: themed("migration_color7");
      }
      // background: rgba(23, 23, 58, 0.4) !important;
    }
  }
  &_item {
    height: 48px;
    @include themeify {
      border-bottom: 1px solid #f7c396;
    }
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      flex: 1;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      @include themeify {
        color: #17173a;
      }
      line-height: 20px;
      &:nth-of-type(3) {
        text-align: right;
      }
      &:nth-of-type(1) {
        flex: 2;
      }
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
      color: #17173a;
    }
    line-height: 20px;
    cursor: pointer;
  }
}
@media screen and(min-width:750px) {
  .governance_proposal {
    padding-bottom: 50px;
  }
}
@media screen and(max-width:750px) {
  .governance_proposal {
    &_title {
      h3 {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
