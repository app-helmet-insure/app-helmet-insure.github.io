<template>
  <div class="migration_data">
    <p>
      <img src="~/assets/img/migration/burn.svg" alt="" />{{
        $t("Migration.MyBurning")
      }}: {{ addCommom(fixD(MyBurning, 4)) }}
      Helmet
    </p>
    <p>
      <img src="~/assets/img/migration/coin.svg" alt="" />{{
        $t("Migration.MyPendding")
      }}: {{ addCommom(fixD(MyPendding, 4)) }} Guard
      <button @click="jump">{{ $t("Migration.Claim") }}</button>
    </p>
  </div>
</template>

<script>
import { fixD, addCommom } from "~/assets/js/util.js";
import { Contract } from "ethers-multicall-x";
import {
  getOnlyMultiCallProvider,
  getPolygonMultiCallProvider,
  processResult,
  fromWei,
  toWei,
} from "~/web3/index.js";
import GuardClaimABI from "~/web3/abis/GuardClaim.json";
import Migration from "~/web3/abis/Migration.json";
const ClaimAddress = "0xf8f87399A2fF0064194F61e567A54cb1308d7bE8";
const ContractAddress = "0xeB7731e81b1C2Af4837fAfB1a9b7770b6942411B";
const BurnContractAddress = "0x4F17B8f8BBebf9F73CF76992aa3F464821a27595";
export default {
  data() {
    return {
      MyClaiming: 0,
      MyClaimed: 0,
      MyBurns1: 0,
      MyBurns2: 0,
      MyPendding: 0,
      MyBurning: 0,
      fixD,
      addCommom,
    };
  },
  computed: {
    CurrentAccount() {
      return this.$store.state.userInfo;
    },
    RefreshData() {
      return this.$store.state.refreshNumber;
    },
  },
  watch: {
    CurrentAccount: {
      handler: "reloadData",
      immediate: true,
    },
    RefreshData: {
      handler: "refreshData",
      immediate: true,
    },
  },
  mounted() {
    this.getBurnsInfo();
  },
  methods: {
    reloadData(Value) {
      if (Value) {
        this.$nextTick(() => {
          this.getBurnsInfo();
        });
      }
    },
    refreshData(Value, NewValue) {
      if (Value != NewValue) {
        this.getBurnsInfo();
      }
    },
    jump() {
      this.$bus.$emit("GUARD_DIALOG", true);
    },
    getBurnsInfo() {
      const Burn1Contacts = new Contract(ContractAddress, Migration); //to Guard
      const Burn2Contacts = new Contract(BurnContractAddress, Migration); //to IBO
      const BSCMulticallProvider = getOnlyMultiCallProvider();
      const Account = this.CurrentAccount.account;
      const PromiseList = [
        Burn1Contacts.totalBurns(Account),
        Burn2Contacts.totalBurns(Account),
      ];
      BSCMulticallProvider.all(PromiseList).then((res) => {
        const FixData = processResult(res);
        const [MyBurns1, MyBurns2] = FixData;
        this.MyBurns1 = fromWei(MyBurns1);
        this.MyBurns2 = fromWei(MyBurns2);
      });
      const ClaimContracts = new Contract(ClaimAddress, GuardClaimABI);
      const MATICMulticallProvider = getPolygonMultiCallProvider();
      const PromiseList1 = [
        ClaimContracts.claimingList(Account),
        ClaimContracts.claimedList(Account),
      ];
      MATICMulticallProvider.all(PromiseList1).then((res) => {
        const FixData = processResult(res);
        const [MyClaiming, MyClaimed] = FixData;
        this.MyClaiming = fromWei(MyClaiming);
        this.MyClaimed = fromWei(MyClaimed);
        this.getBalance();
      });
    },
    getBalance() {
      this.MyBurning =
        this.MyBurns1 * 1 + this.MyBurns2 * 1 - this.MyClaiming * 1 < 0
          ? 0
          : this.MyBurns1 * 1 + this.MyBurns2 * 1 - this.MyClaiming * 1;
      this.MyPendding =
        this.MyClaiming * 1 - this.MyClaimed * 1 < 0
          ? 0
          : this.MyClaiming * 1 - this.MyClaimed * 1;
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