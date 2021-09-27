<template>
  <div class="migration_data">
    <p>
      <img src="~/assets/img/migration/burn.svg" alt="" />{{
        $t("Migration.MyBurning")
      }}: {{ addCommom(fixD(myBurning, 4)) }}
      Helmet
    </p>
    <p>
      <img src="~/assets/img/migration/coin.svg" alt="" />{{
        $t("Migration.MyPendding")
      }}: {{ addCommom(fixD(myPendding, 4)) }} Guard
      <button @click="jump">{{ $t("Migration.Claim") }}</button>
    </p>
  </div>
</template>

<script>
import Web3 from "web3";
import { fixD, addCommom } from "~/assets/js/util.js";
import { getAccounts } from "~/interface/common_contract.js";
import { fromWei } from "~/web3/index.js";
import { TotalBurns } from "~/interface/read_contract.js";
import GuardClaimABI from "~/web3/abis/GuardClaim.json";
const ClaimAddress = "0xf8f87399A2fF0064194F61e567A54cb1308d7bE8";
const ContractAddress = "0xeB7731e81b1C2Af4837fAfB1a9b7770b6942411B";
export default {
  data() {
    return {
      myClaiming: 0,
      myClaimed: 0,
      myBurns: 0,
      myPendding: 0,
      myBurning: 0,
      fixD,
      addCommom,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getBalance();
    });
    this.$bus.$on("REFRESH_MIGRATION_TITLE", () => {
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
      let myClaiming = await Contracts.methods.claimingList(Account).call();
      this.myClaiming = fromWei(myClaiming);
    },
    async getMySuccess() {
      let Account = await getAccounts();
      let web3 = new Web3(
        new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com")
      );
      let Contracts = new web3.eth.Contract(GuardClaimABI, ClaimAddress);
      let myClaimed = await Contracts.methods.claimedList(Account).call();
      this.myClaimed = fromWei(myClaimed);
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
      this.myBurning =
        this.myBurns - this.myClaiming < 0 ? 0 : this.myBurns - this.myClaiming;
      this.myPendding =
        this.myClaiming - this.myClaimed < 0
          ? 0
          : this.myClaiming - this.myClaimed;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
.migration_data {
  display: flex;
  height: 70px;
  @include themeify {
    background: themed("migration_color1");
  }
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
    @include themeify {
      color: themed("migration_color2");
    }
    line-height: 18px;
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
  .showdata {
    flex-direction: column;
    justify-content: center;
    width: 95%;
    p {
      padding: 0 10px;
    }
  }
}
@media screen and(min-width:750px) {
  .migration_data {
    align-items: center;
    width: 878px;
    margin: 20px auto 0;
    p {
      padding: 0 40px;
      margin-right: 40px;
    }
  }
}
@media screen and(max-width:750px) {
  .migration_data {
    flex-direction: column;
    justify-content: center;
    width: 95%;
    margin: 20px auto 0;
    padding-left: 10px;
  }
}
</style>