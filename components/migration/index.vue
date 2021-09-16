<template>
  <div class="migration_title">
    <h3>Migrate Helmet(BSC) to Guard(Polygon)</h3>
    <p>{{ $t("Migration.Tips7") }}</p>
    <div class="showdata">
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
    <div class="showaction">
      <div class="step">
        <div class="step_one step_num">1</div>
        <div class="step_two step_num">2</div>
      </div>
      <div class="wrap">
        <Stake />
        <Swap />
      </div>
    </div>
  </div>
</template>

<script>
import Stake from "./stake.vue";
import Swap from "./swap.vue";
import Web3 from "web3";
import { fixD, addCommom } from "~/assets/js/util.js";
import { getAccounts } from "~/interface/common_contract.js";
import { fromWei } from "~/web3/index.js";

import { TotalBurns } from "~/interface/read_contract.js";
import GuardClaimABI from "~/web3/abis/GuardClaim.json";
const ClaimAddress = "0xf8f87399A2fF0064194F61e567A54cb1308d7bE8";
const ContractAddress = "0xeB7731e81b1C2Af4837fAfB1a9b7770b6942411B";
export default {
  components: { Stake, Swap },
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

.migration_title {
  > p {
    background: rgba(255, 184, 1, 0.1);
    display: flex;
    margin: 0 auto;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #ffb801;
    line-height: 20px;
  }
  > h3 {
    text-align: center;
    font-size: 24px;
    font-family: IBMPlexSans-SemiBold, IBMPlexSans;
    font-weight: 600;
    @include themeify {
      color: themed("migration_color2");
    }
    line-height: 32px;
  }
}

.showdata {
  margin: 0 auto;
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
.showaction {
  display: flex;
  justify-content: space-between;
  margin: 30px auto 0;
  .step {
    width: 4px;
    position: relative;
    background: linear-gradient(360deg, #4364e8, #fd7e14);
    transform: translate(12px);
    border-radius: 2px;
    margin-left: 10px;
    &_num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      position: absolute;
      transform: translate(-50%);
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      margin-left: 50%;
    }
  }
}
@media screen and(min-width:750px) {
  h3 {
    margin: 30px auto;
  }
  .migration_title {
    > p {
      width: 878px;
      height: 30px;
      justify-content: center;
    }
  }
  .showdata {
    align-items: center;
    width: 868px;
    p {
      padding: 0 40px;
      margin-right: 40px;
    }
  }
  .showaction {
    width: 868px;
    .step {
      height: 715px;
      &_one {
        top: 30px;
        background: #fd7e14;
      }
      &_two {
        background: #4364e8;
        top: 330px;
      }
    }
  }
}
@media screen and(max-width:750px) {
  h3 {
    margin: 0 auto;
    padding: 30px 0;
  }
  .migration_title {
    > p {
      width: 90%;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .showdata {
    flex-direction: column;
    justify-content: center;
    width: 95%;
    margin: 0 auto;
    padding: 0 16px;
  }
  .showaction {
    width: 100%;
    .step {
      display: flex;
      &_one {
        top: 30px;
        background: #fd7e14;
      }
      &_two {
        background: #4364e8;
        top: 545px;
      }
    }
    .wrap {
      flex: 1;
      width: 85%;
      margin-left: 30px;
    }
  }
}
</style>