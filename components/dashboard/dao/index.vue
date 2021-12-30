<template>
  <div class="dao-view">
    <div class="list-view">
      <template v-if="proposal" >
        <table class="table-pc">
          <tr>
            <th>Proposal</th>
            <th>Vote</th>
            <th>Result</th>
          </tr>
          <tr>
            <td>{{proposal.name}}</td>
            <td>
              <div v-if="proposal.SelfType1 > 0">{{ $t("Governance.Governance_text3") }}: {{ fixD(proposal.SelfType1, 4) }}</div>
              <div v-if="proposal.SelfType2 > 0">{{ $t("Governance.Governance_text4") }}: {{ fixD(proposal.SelfType2, 4) }}</div>
              <div v-if="proposal.SelfType3 > 0">{{ $t("Governance.Governance_text5") }}{{ fixD(proposal.SelfType3, 4) }}</div>
            </td>
            <td>{{proposal.result}}</td>
          </tr>
        </table>
        <table class="table-h5">
          <tr>
            <th>Proposal</th>
          </tr>
          <tr>
            <td>{{proposal.name}}</td>
          </tr>
        </table>
        <table class="table-h5">
          <tr>
            <th>Vote</th>
          </tr>
          <tr>
            <td>
              <div v-if="proposal.SelfType1 > 0">{{ $t("Governance.Governance_text3") }}: {{ fixD(proposal.SelfType1, 4) }}</div>
              <div v-if="proposal.SelfType2 > 0">{{ $t("Governance.Governance_text4") }}: {{ fixD(proposal.SelfType2, 4) }}</div>
              <div v-if="proposal.SelfType3 > 0">{{ $t("Governance.Governance_text5") }}{{ fixD(proposal.SelfType3, 4) }}</div>
            </td>
          </tr>
        </table>
        <table class="table-h5">
          <tr>
            <th>Result</th>
          </tr>
          <tr>
            <td>{{proposal.result}}</td>
          </tr>
        </table>
      </template>
      <div class="loading" v-else-if="proposalLoading">loading...</div>
      <div class="no-data" v-else>No Data</div>
    </div>
  </div>
</template>

<script>

import { getGovernance } from "~/interface/request.js";
import {fromWei} from "../../../web3";

import { fixD } from "~/assets/js/util.js";
import {formatGovernance, GovernanceList} from "../../../config/governance";
export default {
  name: "Dao",
  data(){
    return {
      fixD,
      proposal: null,
      proposalLoading: false
    }
  },
  computed: {
    account(){
      return this.$store.state.userInfo.account
    }
  },
  watch: {
    account: function (){
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (!this.account){
      return
    }
      this.getProposalData()
    },
    getProposalData(){
      this.proposalLoading = true
      const proposal = {
        name: 'About the plan of the 50% lock-up HELMET',
        result: 'Proposal2'
      }
      let Router ="link1";
      let FixGovernanceList = formatGovernance(GovernanceList);
      const Proposal = FixGovernanceList.filter(
          (item) => item.Router === Router
      )[0];
      const Account = this.account
      getGovernance().then((res) => {
        const List = res.data.data.votes;
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
        const SelfType1 = SelfType1List.reduce(function (prev, next) {
          return fromWei(next.amount) * 1 + prev;
        }, 0);
        const SelfType2 = SelfType2List.reduce(function (prev, next) {
          return fromWei(next.amount) * 1 + prev;
        }, 0);
        const SelfType3 = SelfType3List.reduce(function (prev, next) {
          return fromWei(next.amount) * 1 + prev;
        }, 0);
        this.proposalLoading = false
        if (SelfType1 <= 0 && SelfType2 <= 0 && SelfType1<= 0) {
          return
        }
        proposal.SelfType1 = SelfType1
        proposal.SelfType2 = SelfType2
        proposal.SelfType3 = SelfType3
        this.proposal = proposal
      });

    }
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/css/themes.scss";
.list-view {
  width: 100%;

  @include themeify {
    background: themed("dashboard_color1");
    border: 2px solid themed("dashboard_color2");
  }
  box-shadow: 0px 4px 9px 0px rgba(255, 255, 255, 0.02);
  border-radius: 22px;
  padding: 16px 37px;
  margin-bottom: 11px;
.table-h5{
  display: none;
}
  table{
    width: 100%;
    text-align: left;
    th{
      font-size: 15px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 500;
      @include themeify {
        color: themed("dashboard_color3");
      }
      line-height: 18px;
      padding: 5px 0;
      &:nth-child(1){
        width: 50%;
      }
      &:nth-child(2){
        width: calc(50% - 100px);
      }
      &:nth-child(3){
        width: 100px;
      }
    }
    td{
      padding: 5px 0;
      font-size: 18px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 500;
      @include themeify {
        color: themed("dashboard_color4");
      }
      line-height: 18px;
      &:nth-child(1){
        width: 50%;
      }
      &:nth-child(2){
        width: calc(50% - 100px);
      }
      &:nth-child(3){
        width: 100px;
      }
      div{
        font-size: 18px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        @include themeify {
          color: themed("dashboard_color4");
        }
        line-height: 18px;
        margin-bottom: 5px;
      }
    }
  }
  .no-data,.loading{
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cccccc;
  }
}
@media (max-width: 750px) {
  .list-view {
    padding: 10px;
    .table-h5 {
      display: block;
    }
    .table-pc {
      display: none;
    }
  }
}
</style>
