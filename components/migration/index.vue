<template>
  <div class="migration_title">
    <h3>Migrate Helmet(BSC) to Guard(Polygon)</h3>
    <div class="showdata">
      <p>
        <img src="~/assets/img/migration/burn.svg" alt="" />{{
          $t("Migration.MyBurning")
        }}：
        {{ addCommom(myBurning, 4) }}
        Helmet
      </p>
      <p>
        <img src="~/assets/img/migration/coin.svg" alt="" />{{
          $t("Migration.MyPendding")
        }}: {{ addCommom(myPendding, 4) }} Guard
        <button @click="jump">{{ $t("Migration.Claim") }}</button>
      </p>
    </div>
    <div class="showaction">
      <Stake />
      <Swap />
    </div>
  </div>
</template>

<script>
import Stake from "./stake.vue";
import Swap from "./swap.vue";
import Web3 from "web3";
import { fixD, addCommom } from "~/assets/js/util.js";
import { getAccounts, fromWei } from "~/interface/common_contract.js";
import { TotalBurns } from "~/interface/read_contract.js";
import GuardClaimABI from "~/abi/GuardClaim.json";
const ClaimAddress = "0xf8f87399A2fF0064194F61e567A54cb1308d7bE8";
const ContractAddress = "0xeB7731e81b1C2Af4837fAfB1a9b7770b6942411B";
export default {
  components: { Stake, Swap },
  data() {
    return {
      myPendding: 0,
      mySuccess: 0,
      myBurns: 0,
      myBurning: 0,
      fixD,
      addCommom,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getBalance();
    });
    this.$bus.$on("REFRESH_MIGRATION_SWAP", () => {
      this.getBalance();
    });
  },
  methods: {
    jump() {
      this.$bus.$emit("GUARD_DIALOG", true);
    },

    async MyAccount() {
      let Account = await getAccounts();
      this.Account = Account;
    },
    async getMyPendding() {
      let Account = await getAccounts();
      let web3 = new Web3(
        new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com")
      );
      let Contracts = new web3.eth.Contract(GuardClaimABI, ClaimAddress);
      let myPendding = await Contracts.methods.claimingList(Account).call();
      this.myPendding = fromWei(myPendding);
    },
    async getMySuccess() {
      let Account = await getAccounts();
      let web3 = new Web3(
        new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com")
      );
      let Contracts = new web3.eth.Contract(GuardClaimABI, ClaimAddress);
      let mySuccess = await Contracts.methods.claimedList(Account).call();
      this.mySuccess = fromWei(mySuccess);
    },
    async getMyBurns() {
      let Account = await getAccounts();
      let myBurns = await TotalBurns(ContractAddress, Account);
      this.myBurns = myBurns;
    },
    async getBalance() {
      await this.getMyPendding();
      await this.getMySuccess();
      await this.getMyBurns();
      this.myBurning = this.myBurns - this.mySuccess - this.myPendding;
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and(min-width:750px) {
  h3 {
    margin: 30px auto;
    text-align: center;
    font-size: 24px;
    font-family: IBMPlexSans-SemiBold, IBMPlexSans;
    font-weight: 600;
    color: #17173a;
    line-height: 32px;
  }
  .showdata {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    height: 70px;
    background: #f7f7fa;
    border-radius: 5px;
    img {
      margin-right: 4px;
    }
    p {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      color: #17173a;
      line-height: 18px;
      padding: 0 40px;
      margin-right: 40px;
      button {
        min-width: 52px;
        min-height: 24px;
        background: #fd7e14;
        border-radius: 5px;
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
        margin-left: 20px;
      }
    }
  }
  .showaction {
    width: 80%;
    margin: 40px auto 0;
    display: flex;
    justify-content: space-between;
  }
}
@media screen and(max-width:750px) {
  h3 {
    margin: 0 auto;
    text-align: center;
    font-size: 24px;
    font-family: IBMPlexSans-SemiBold, IBMPlexSans;
    font-weight: 600;
    color: #17173a;
    line-height: 32px;
    padding: 30px 0;
  }
  .showdata {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 95%;
    margin: 0 auto;
    height: 70px;
    background: #f7f7fa;
    border-radius: 5px;
    img {
      margin-right: 4px;
    }
    p {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      color: #17173a;
      line-height: 18px;
      padding: 0 10px;
      button {
        min-width: 52px;
        min-height: 24px;
        background: #fd7e14;
        border-radius: 5px;
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
        margin-left: 20px;
      }
    }
  }
  .showaction {
    width: 95%;
    margin: 40px auto 0;
  }
}
</style>