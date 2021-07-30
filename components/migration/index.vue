<template>
  <div class="migration_title">
    <h3>Migrate to Polygon</h3>
    <div class="showdata">
      <p>
        <img src="~/assets/img/migration/burn.svg" alt="" />{{
          $t("Migration.MyBurning")
        }}： 1,0,000.232232 Helmet
      </p>
      <p>
        <img src="~/assets/img/migration/coin.svg" alt="" />{{
          $t("Migration.MyPendding")
        }}: {{ myPendding }} Guard
        <button @click="jump">{{ $t("Table.Claim") }}</button>
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
import { getAccounts, fromWei } from "~/interface/common_contract.js";
import GuardClaimABI from "~/abi/GuardClaim.json";
const GuardAddress = "0xb962B860f880Bb461EEB323Fc33dC9eFce157dAC";
export default {
  components: { Stake, Swap },
  data() {
    return {
      myPendding: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getMyPendding();
    });
  },
  methods: {
    jump(){
    window.location.href='https://www.guard.insure/insurance?action=claim'
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
      let Contracts = new web3.eth.Contract(GuardClaimABI, GuardAddress);
      let myPendding = await Contracts.methods.claimingList(Account).call();
      this.myPendding = fromWei(myPendding);
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