<template>
  <div class="migration_stake">
    <div class="title"><span>1</span>{{ $t("Migration.StakeTitle") }}</div>
    <div class="stake_wrap">
      <div class="balance text">
        <span>{{ $t("Migration.Available") }}:</span
        ><span>{{ fixD(myBalance, 4) }} LPT</span>
      </div>
      <div class="input">
        <input type="text" v-model="StakeVolume" />
        <span class="max" @click="StakeVolume = myBalance">{{
          $t("Insurance.Insurance_text18")
        }}</span>
      </div>
      <button
        @click="toDeposite"
        :class="stakeLoading ? 'disable b_button' : 'b_button'"
      >
        <i :class="stakeLoading ? 'loading_pic' : ''"></i
        >{{ ApproveFlag ? $t("Table.Approve") : $t("Table.ConfirmDeposit") }}
      </button>
      <div class="my_stake text">
        <span>{{ $t("Migration.MyStake") }}:</span
        ><span>{{ fixD(myStkaing, 4) }} LPT</span>
      </div>
      <div class="all_stake text">
        <span>{{ $t("Migration.Total") }}:</span
        ><span>{{ fixD(poolStaking, 4) }} LPT</span>
      </div>
      <div class="guard_balance">
        <p>
          <span>{{ $t("Migration.GuardCredit") }}</span>
          <span>{{ fixD(myReward3, 8) }}</span>
        </p>
        <button>{{ $t("Table.Claim") }}</button>
      </div>
      <a
        href="https://exchange.pancakeswap.finance/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
        target="_blank"
        >From <i class="pancake"></i>Get HELMET-BNB LPT(V2)</a
      >
    </div>
  </div>
</template>

<script>
import { fixD } from "~/assets/js/util.js";
import {
  BalanceOf,
  TotalSupply,
  Earned3,
  Allowance,
} from "~/interface/read_contract.js";
import { Stake, Approve, GetReward3 } from "~/interface/write_contract.js";
let StakeAddress = "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571";
let PoolAddress = "0xA21B692B92Bbf0E34334f1548a0b51837CDDD0Bb";
let Earn3Address = "0xA21B692B92Bbf0E34334f1548a0b51837CDDD0Bb";
export default {
  data() {
    return {
      myBalance: 0,
      StakeVolume: "",
      poolStaking: 0,
      myStkaing: 0,
      myReward3: 0,
      ApproveFlag: false,
      stakeLoading: false,
      fixD,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.NeedApprove();
      this.getBalance();
    });
  },
  methods: {
    async getBalance() {
      let myBalance = await BalanceOf(StakeAddress);
      let poolStaking = await TotalSupply(PoolAddress);
      let myStkaing = await BalanceOf(PoolAddress);
      let myReward3 = await Earned3(PoolAddress, Earn3Address);
      this.myBalance = myBalance;
      this.poolStaking = poolStaking;
      this.myStkaing = myStkaing;
      this.myReward3 = myReward3;
    },
    async NeedApprove() {
      let flag = await Allowance(StakeAddress, PoolAddress);
      this.ApproveFlag = flag;
    },
    // 抵押
    async toDeposite() {
      if (!this.StakeVolume) {
        return;
      }
      if (this.stakeLoading) {
        return;
      }
      this.stakeLoading = true;
      if (this.ApproveFlag) {
        await Approve(StakeAddress, PoolAddress, "Helmet", (res) => {
          if (res == "success" || res == "error") {
            this.NeedApprove();
            this.stakeLoading = false;
          }
        });
      } else {
        let StakeVolume = this.StakeVolume;
        await Stake(
          {
            ContractAddress: PoolAddress,
            DepositeVolume: StakeVolume,
            Decimals: 18,
          },
          (res) => {
            console.log(res);
            if (res == "success" || res == "error") {
              this.getBalance();
              this.stakeLoading = false;
            }
          }
        );
      }
    },
    async claimQuota() {
      GetReward3(PoolAddress, Earn3Address, (res) => {
        if (res === "success" || res === "error") {
          this.getBalance();
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
.loading_pic {
  display: block;
  width: 24px;
  height: 24px;
  background-image: url("../../assets/img/helmet/loading.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
}
@media screen and (min-width: 750px) {
  .migration_stake {
    width: 400px;
    height: 410px;
    border-radius: 10px;
    border: 1px solid #e8e8eb;
    overflow: hidden;
    .title {
      height: 50px;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      color: #17173a;
      line-height: 18px;
      padding: 0 40px;
      span {
        display: flex;
        margin-right: 8px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #fd7e14;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        line-height: 20px;
      }
    }
    .stake_wrap {
      padding: 0 40px;
    }
    .text {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .balance {
      margin-top: 30px;
      span {
        font-size: 14px;
        &:nth-of-type(1) {
          color: rgba(23, 23, 58, 0.7);
          font-weight: 500;
        }
        &:nth-of-type(2) {
          color: #17173a;
          font-weight: 600;
        }
      }
    }
    .input {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 10px;
      input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #e8e8eb;
        padding-left: 12px;
      }
      span {
        position: absolute;
        right: 10px;
        min-width: 52px;
        min-height: 24px;
        background: #f8f9fa;
        border-radius: 5px;
        border: 1px solid #e8e8eb;
        padding: 4px 6px;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          border: 1px solid #ff9600;
          color: #ff9600;
        }
      }
    }
    .b_button {
      border-radius: 5px;
    }
    .my_stake {
      margin-top: 20px;
      span {
        font-size: 14px;
        &:nth-of-type(1) {
          color: rgba(23, 23, 58, 0.7);
          font-weight: 500;
        }
        &:nth-of-type(2) {
          color: #17173a;
          font-weight: 600;
        }
      }
    }
    .all_stake {
      margin-top: 10px;
      span {
        font-size: 14px;
        &:nth-of-type(1) {
          color: rgba(23, 23, 58, 0.7);
          font-weight: 500;
        }
        &:nth-of-type(2) {
          color: #17173a;
          font-weight: 600;
        }
      }
    }
    .guard_balance {
      width: 100%;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8f9fa;
      border-radius: 5px;
      padding: 0 10px;
      margin-top: 10px;
      p {
        font-size: 14px;
        font-weight: 500;
        span {
          &:nth-of-type(1) {
            color: rgba(23, 23, 58, 0.7);
            font-weight: 500;
          }
          &:nth-of-type(2) {
            color: #17173a;
            font-weight: 600;
          }
        }
      }
      button {
        min-width: 52px;
        min-height: 24px;
        background: #fd7e14;
        border-radius: 5px;
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
      }
    }
    a {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #fd7e14;
      line-height: 20px;
      display: flex;
      align-items: center;
      i {
        display: block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: 0 2px;
      }
      .pancake {
        background-image: url("../../assets/img/icon/pancake@2x.png");
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .migration_stake {
    width: 100%;
    height: 410px;
    border-radius: 10px;
    border: 1px solid #e8e8eb;
    overflow: hidden;
    .title {
      height: 50px;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      color: #17173a;
      line-height: 18px;
      padding: 0 40px;
      span {
        display: flex;
        margin-right: 8px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #fd7e14;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        line-height: 20px;
      }
    }
    .stake_wrap {
      padding: 0 10px;
    }
    .text {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .balance {
      margin-top: 30px;
      span {
        font-size: 14px;
        &:nth-of-type(1) {
          color: rgba(23, 23, 58, 0.7);
          font-weight: 500;
        }
        &:nth-of-type(2) {
          color: #17173a;
          font-weight: 600;
        }
      }
    }
    .input {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 10px;
      input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #e8e8eb;
        padding-left: 12px;
      }
      span {
        position: absolute;
        right: 10px;
        min-width: 52px;
        min-height: 24px;
        background: #f8f9fa;
        border-radius: 5px;
        border: 1px solid #e8e8eb;
        padding: 4px 6px;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          border: 1px solid #ff9600;
          color: #ff9600;
        }
      }
    }
    .b_button {
      border-radius: 5px;
      width: 100%;
      margin-top: 20px;
    }
    .my_stake {
      margin-top: 20px;
      span {
        font-size: 14px;
        &:nth-of-type(1) {
          color: rgba(23, 23, 58, 0.7);
          font-weight: 500;
        }
        &:nth-of-type(2) {
          color: #17173a;
          font-weight: 600;
        }
      }
    }
    .all_stake {
      margin-top: 10px;
      span {
        font-size: 14px;
        &:nth-of-type(1) {
          color: rgba(23, 23, 58, 0.7);
          font-weight: 500;
        }
        &:nth-of-type(2) {
          color: #17173a;
          font-weight: 600;
        }
      }
    }
    .guard_balance {
      width: 100%;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8f9fa;
      border-radius: 5px;
      padding: 0 10px;
      margin-top: 10px;
      p {
        font-size: 14px;
        font-weight: 500;
        span {
          &:nth-of-type(1) {
            color: rgba(23, 23, 58, 0.7);
            font-weight: 500;
          }
          &:nth-of-type(2) {
            color: #17173a;
            font-weight: 600;
          }
        }
      }
      button {
        min-width: 52px;
        min-height: 24px;
        background: #fd7e14;
        border-radius: 5px;
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
      }
    }
    a {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #fd7e14;
      line-height: 20px;
      display: flex;
      align-items: center;
      i {
        display: block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: 0 2px;
      }
      .pancake {
        background-image: url("../../assets/img/icon/pancake@2x.png");
      }
    }
  }
}
</style>