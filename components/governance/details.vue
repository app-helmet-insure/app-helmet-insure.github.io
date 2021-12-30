<template>
  <div class="governance_details">
    <div class="governance_details_infomation">
      <div class="governance_details_infomation_title">
        {{ $t("Governance.Governance_text13") }}
      </div>
      <div class="governance_details_infomation_wrap">
        <div class="between">
          <span>{{ $t("Governance.Governance_text16") }}</span>
          <span>helmet.exchange</span>
        </div>
        <div class="between">
          <span>{{ $t("Governance.Governance_text17") }}</span>
          <span>Radio</span>
        </div>
        <div class="between">
          <span>{{ $t("Governance.Governance_text18") }}</span>
          <span>{{ Proposal.StartTime }}</span>
        </div>
        <div class="between">
          <span>{{ $t("Governance.Governance_text19") }}</span>
          <span>{{ Proposal.FinishTime }}</span>
        </div>
      </div>
    </div>
    <div class="governance_details_votes">
      <div class="governance_details_votes_title">
        {{ $t("Governance.Governance_text24") }}
      </div>
      <div class="governance_details_votes_wrap">
        <div
          class="governance_details_votes_slider"
          :class="
            Proposal.Status === 3 &&
            Type1Number > Type2Number &&
            Type1Number > Type3Number
              ? 'win_governance'
              : ''
          "
        >
          <p class="between">
            <span>{{ $t("Governance.Governance_text3") }}</span>
            <span>{{ fixD(Type1, 0) }}({{ Type1Number }})</span>
          </p>
          <div class="slider_wrap">
            <div class="slider_bar" :style="`width:${Type1Number}`"></div>
          </div>
        </div>
        <div
          class="governance_details_votes_slider"
          :class="
            Proposal.Status === 3 &&
            Type2Number > Type1Number &&
            Type2Number > Type3Number
              ? 'win_governance'
              : ''
          "
        >
          <p class="between">
            <span>{{ $t("Governance.Governance_text4") }}</span>
            <span>{{ fixD(Type2, 0) }}({{ Type2Number }})</span>
          </p>
          <div class="slider_wrap">
            <div class="slider_bar" :style="`width:${Type2Number}`"></div>
          </div>
        </div>
        <div
          class="governance_details_votes_slider"
          :class="
            Proposal.Status === 3 &&
            Type3Number > Type1Number &&
            Type3Number > Type2Number
              ? 'win_governance'
              : ''
          "
        >
          <p class="between">
            <span>{{ $t("Governance.Governance_text5") }} </span>
            <span>{{ fixD(Type3, 0) }}({{ Type3Number }})</span>
          </p>
          <div class="slider_wrap">
            <div class="slider_bar" :style="`width:${Type3Number}`"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="governance_details_self">
      <div class="governance_details_self_title">
        {{ $t("Governance.Governance_text21") }}
      </div>
      <div class="governance_details_self_wrap">
        <div class="governance_details_self_votes between">
          <span>{{ $t("Governance.Governance_text3") }}</span>
          <span>{{ fixD(SelfType1, 4) }}</span>
        </div>
        <div class="governance_details_self_votes between">
          <span>{{ $t("Governance.Governance_text4") }}</span>
          <span>{{ fixD(SelfType2, 4) }}</span>
        </div>
        <div class="governance_details_self_votes between">
          <span>{{ $t("Governance.Governance_text5") }}</span>
          <span>{{ fixD(SelfType3, 4) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GovernanceList, formatGovernance } from "~/config/governance.js";
import { Contract } from "ethers-multicall-x";
import { fixD } from "~/assets/js/util.js";
import { getGovernance } from "~/interface/request.js";
import {
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
  toWei,
  getContract,
} from "~/web3/index.js";
export default {
  data() {
    return {
      fixD,
      Proposal: {},
      Type1: 0,
      Type2: 0,
      Type3: 0,
      SelfType1: 0,
      SelfType2: 0,
      SelfType3: 0,
      Type1Number: 0,
      Type2Number: 0,
      Type3Number: 0,
    };
  },
  mounted() {
    let Router =
      this.$route.params.details || window.localStorage.Governance || "link1";
    let FixGovernanceList = formatGovernance(GovernanceList);
    this.Proposal = FixGovernanceList.filter(
      (item) => item.Router === Router
    )[0];
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
  methods: {
    reloadData(Value) {
      if (Value) {
        this.isLogin = Value.isLogin;
        this.$nextTick(() => {
          this.getSelfInfo();
          // this.getInfoData();
        });
      }
    },
    getInfoData() {
      let Router =
        this.$route.params.details || window.localStorage.Governance || "link1";
      let FixGovernanceList = formatGovernance(GovernanceList);
      const Proposal = FixGovernanceList.filter(
        (item) => item.Router === Router
      )[0];
      const Account = this.CurrentAccount.account || window.CURRENTADDRESS;
      getGovernance().then((res) => {
        const List = res.data.data.votes;
        const Type1List = List.filter(
          (item) => item.proposalID == Proposal.Proposal[0].ID
        );
        const Type2List = List.filter(
          (item) => item.proposalID == Proposal.Proposal[1].ID
        );
        const Type3List = List.filter(
          (item) => item.proposalID == Proposal.Proposal[2].ID
        );
        const SelfType1List = List.filter(
          (item) =>
            item.proposalID == Proposal.Proposal[0].ID &&
            item.address.toUpperCase() == Account.toUpperCase()
        );
        const SelfType2List = List.filter(
          (item) =>
            item.proposalID == Proposal.Proposal[1].ID &&
            item.address.toUpperCase() == Account.toUpperCase()
        );
        const SelfType3List = List.filter(
          (item) =>
            item.proposalID == Proposal.Proposal[2].ID &&
            item.address.toUpperCase() == Account.toUpperCase()
        );
        const Type1 = Type1List.reduce(function (prev, next) {
          return fromWei(next.amount) * 1 + prev;
        }, 0);
        const Type2 = Type2List.reduce(function (prev, next) {
          return fromWei(next.amount) * 1 + prev;
        }, 0);
        const Type3 = Type3List.reduce(function (prev, next) {
          return fromWei(next.amount) * 1 + prev;
        }, 0);
        const SelfType1 = SelfType1List.reduce(function (prev, next) {
          return fromWei(next.amount) * 1 + prev;
        }, 0);
        const SelfType2 = SelfType2List.reduce(function (prev, next) {
          return fromWei(next.amount) * 1 + prev;
        }, 0);
        const SelfType3 = SelfType3List.reduce(function (prev, next) {
          return fromWei(next.amount) * 1 + prev;
        }, 0);
        const AllType = Type1 + Type2 + Type3;
        this.Type1 = Type1;
        this.Type2 = Type2;
        this.Type3 = Type3;
        this.SelfType1 = SelfType1;
        this.SelfType2 = SelfType2;
        this.SelfType3 = SelfType3;
        this.AllType = AllType;
        this.Type1Number =
          Type1 > 0 ? fixD((Type1 / AllType) * 100, 2) + "%" : "0%";
        this.Type2Number =
          Type2 > 0 ? fixD((Type2 / AllType) * 100, 2) + "%" : "0%";
        this.Type3Number =
          Type3 > 0 ? fixD((Type3 / AllType) * 100, 2) + "%" : "0%";
      });
    },
    getSelfInfo() {
      let Router =
        this.$route.params.details || window.localStorage.Governance || "link1";
      let FixGovernanceList = formatGovernance(GovernanceList);
      const Proposal = FixGovernanceList.filter(
        (item) => item.Router === Router
      )[0];
      const { PoolAddress, PoolABI } = Proposal;
      const PoolContracts = new Contract(PoolAddress, PoolABI);
      const Zero = "0x0000000000000000000000000000000000000000";
      const Account = this.CurrentAccount.account;
      let PromiseList = [
        PoolContracts.getVotes(Zero, Proposal.Proposal[0].ID),
        PoolContracts.getVotes(Zero, Proposal.Proposal[1].ID),
        PoolContracts.getVotes(Zero, Proposal.Proposal[2].ID),
        PoolContracts.getVotes(Account, Proposal.Proposal[0].ID),
        PoolContracts.getVotes(Account, Proposal.Proposal[1].ID),
        PoolContracts.getVotes(Account, Proposal.Proposal[2].ID),
      ];
      const MulticallProvider = getOnlyMultiCallProvider();
      MulticallProvider.all(PromiseList).then((res) => {
        let FixData = processResult(res);
        let [Type1, Type2, Type3, SelfType1, SelfType2, SelfType3] = FixData;
        this.Type1 = fromWei(Type1);
        this.Type2 = fromWei(Type2);
        this.Type3 = fromWei(Type3);
        this.SelfType1 = fromWei(SelfType1);
        this.SelfType2 = fromWei(SelfType2);
        this.SelfType3 = fromWei(SelfType3);
        const AllType =
          fromWei(Type1) * 1 + fromWei(Type2) * 1 + fromWei(Type3) * 1;
        this.AllType = AllType;
        this.Type1Number =
          fromWei(Type1) > 0
            ? fixD((fromWei(Type1) / AllType) * 100, 2) + "%"
            : "0%";
        this.Type2Number =
          fromWei(Type2) > 0
            ? fixD((fromWei(Type2) / AllType) * 100, 2) + "%"
            : "0%";
        this.Type3Number =
          fromWei(Type3) > 0
            ? fixD((fromWei(Type3) / AllType) * 100, 2) + "%"
            : "0%";
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~assets/css/themes.scss";
.governance_details {
  flex: 1;
  padding: 50px 0 50px;
}
.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.governance_details_infomation {
  min-width: 326px;
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
    padding: 20px;
    .between {
      margin-top: 16px;
      &:nth-of-type(1) {
        margin-top: 0;
      }
      > span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          @include themeify {
            color: #17173a;
          }
          line-height: 20px;
          opacity: 0.7;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          @include themeify {
            color: #17173a;
          }
          line-height: 20px;
        }
      }
    }
  }
}
.governance_details_votes {
  margin-top: 20px;
  min-width: 326px;
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
    padding: 20px;
  }
  &_slider {
    margin-top: 16px;
    &:nth-of-type(1) {
      margin-top: 0;
    }
    .between {
      > span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          @include themeify {
            color: #17173a;
          }
          opacity: 0.5;
          font-weight: 600;
          line-height: 20px;
          > span {
            display: inline-block;
            margin-right: 4px;
          }
        }
        &:nth-of-type(2) {
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 700;
          @include themeify {
            color: #17173a;
          }
          line-height: 20px;
        }
      }
    }
    .slider_wrap {
      margin-top: 6px;
      width: 100%;
      height: 6px;
      @include themeify {
        background: #fde4ce;
      }
      border-radius: 100px;
      overflow: hidden;
      .slider_bar {
        height: 100%;
        background: linear-gradient(180deg, #fdb514 0%, #fd7e14 100%);
      }
    }
  }
}
.win_governance {
  position: relative;
}
.win_governance::before {
  display: block;
  content: " ";
  background: url("../../assets/img/governance/win.png") no-repeat;
  background-size: 100% 100%;
  width: 32px;
  height: 32px;
  position: absolute;
  transform: translateX(calc(-100% - 3px));
}
.governance_details_self {
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
    padding: 20px;
  }
  &_votes {
    margin-top: 20px;
    &:nth-of-type(1) {
      margin-top: 0;
    }
    span {
      &:nth-of-type(1) {
        padding: 0 10px;
        min-width: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        background: transparent;
        border-radius: 5px;
        @include themeify {
          // background: themed("color-f8f9fa");
          border: 1px solid #f7c396;
          color: #17173a;
        }
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 24px;
      }
      &:nth-of-type(2) {
        font-size: 14px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        @include themeify {
          color: #17173a;
        }
        line-height: 14px;
      }
    }
  }
}
@media screen and(min-width:750px) {
  .governance_details {
    margin-left: 20px;
  }
  .governance_details_infomation {
    min-width: 326px;
  }
  .governance_details_votes {
    min-width: 326px;
  }
  .governance_details_self {
    min-width: 326px;
  }
}
@media screen and(max-width:750px) {
  .governance_details {
    margin-top: 20px;
  }
}
</style>