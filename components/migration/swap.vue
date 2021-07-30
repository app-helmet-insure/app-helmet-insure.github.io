<template>
  <div class="migration_swap">
    <div class="title"><span>2</span>兑换 Guard</div>

    <div class="stake_wrap">
      <div class="show_text">
        <p>
          <span>当日剩余兑换额度：</span> <span>{{ AllQuota }}</span>
        </p>
        <p>
          <span>我的额度：</span> <span>{{ MyQuota }}</span>
        </p>
      </div>
      <div class="balance text">
        <span>可用:</span><span>{{ MyBalance }} Helmet</span>
      </div>
      <div class="input">
        <input type="text" v-model="BurnVolume" />
        <span class="max" @click="BurnVolume = MyQuota">最大量</span>
      </div>
      <button class="b_button" @click="ActionStep()">
        {{
          HelmetNeedApprove || GuardNeedApprove ? "授权" : "燃烧兑换 Guard"
        }}质押挖矿
      </button>
      <!-- <div class="guard_balance">
        <span>燃烧兑换 Guard，立享 Black 奖励</span>
        <div>
          <p><span>Guard额度：</span> <span>1000000</span></p>
          <button>Claim</button>
        </div>
      </div> -->
      <p>Powered by BlackHole</p>
    </div>
  </div>
</template>

<script>
import {
  QuotaPerDay,
  BalanceOf,
  Allowance,
} from "~/interface/read_contract.js";
import { BurnHelmet, Approve } from "~/interface/write_contract.js";
const ContractAddress = "0xbE97f9298684e643765806ec91b16Ca672c467ce";
const HelmetAddress = "0xa9579F94A285DD51EBA60aC48Fb61ca50E803217";
const GuardAddress = "0xC78eEfDC4D31A44A45182713d64Dbc8505636CcB";
export default {
  data() {
    return {
      MyBalance: 0,
      MyQuota: 0,
      AllQuota: 0,
      BurnVolume: "",
      HelmetNeedApprove: true,
      GuardNeedApprove: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getMyQuota();
      this.getAllQuota();
      this.getMyBalance();
      this.getHelmetApproveStatus();
      this.getGuardApproveStatus();
    });
  },
  methods: {
    async getMyBalance() {
      let MyBalance = await BalanceOf(HelmetAddress);
      this.MyBalance = MyBalance;
    },
    async getMyQuota() {
      let MyQuota = await BalanceOf(GuardAddress);
      console.log(MyQuota, "MyQuota");
      this.MyQuota = MyQuota;
    },
    async getAllQuota() {
      let AllQuota = await QuotaPerDay(ContractAddress);
      console.log(AllQuota, "AllQuota");
      this.AllQuota = AllQuota;
    },
    async getHelmetApproveStatus() {
      let HelmetNeedApprove = await Allowance(HelmetAddress, ContractAddress);
      this.HelmetNeedApprove = HelmetNeedApprove;
    },
    async getGuardApproveStatus() {
      let GuardNeedApprove = await Allowance(GuardAddress, ContractAddress);
      this.GuardNeedApprove = GuardNeedApprove;
    },
    async ApproveHelemt(flag) {
      Approve(HelmetAddress, ContractAddress, "Helmet", (res) => {
        if (res === "success") {
          this.HelmetNeedApprove = false;
          if (flag) {
            this.toBurnHelmet();
          } else {
            this.ApproveGuard();
          }
        }
      });
    },
    async ApproveGuard() {
      Approve(GuardAddress, ContractAddress, "Guard", (res) => {
        if (res === "success") {
          this.GuardNeedApprove = false;
          this.toBurnHelmet();
        }
      });
    },
    async toBurnHelmet() {
      if (!this.BurnVolume) {
        return;
      }
      BurnHelmet(ContractAddress, this.BurnVolume);
    },
    async ActionStep() {
      if (this.HelmetNeedApprove && this.HelmetNeedApprove) {
        this.ApproveHelemt();
        console.log(1);
      }
      if (this.HelmetNeedApprove && !this.HelmetNeedApprove) {
        this.ApproveHelemt(true);
        console.log(2);
      }
      if (!this.HelmetNeedApprove && this.HelmetNeedApprove) {
        this.ApproveGuard();
        console.log(3);
      }
      if (!this.HelmetNeedApprove && !this.HelmetNeedApprove) {
        this.toBurnHelmet();
        console.log(4);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .migration_swap {
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
      margin-top: 10px;
    }
    .show_text {
      width: 100%;
      height: 68px;
      background: #f8f9fa;
      border-radius: 5px;
      padding: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 500;
        &:nth-of-type(1) {
          margin-top: 0;
        }
        &:nth-of-type(2) {
          margin-top: 10px;
        }
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
    }
    .text {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .balance {
      margin-top: 15px;
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
    .guard_balance {
      width: 100%;
      height: 68px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #f8f9fa;
      border-radius: 5px;
      padding: 0 10px;
      margin-top: 10px;
      > span {
        font-size: 14px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        color: rgba(23, 23, 58, 0.7);
        line-height: 14px;
      }
      > div {
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
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
    p {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      font-size: 12px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 500;
      color: rgba(23, 23, 58, 0.4);
      line-height: 12px;
    }
  }
}
@media screen and (max-width: 750px) {
  .migration_swap {
    width: 100%;
    height: 410px;
    border-radius: 10px;
    border: 1px solid #e8e8eb;
    margin-top: 10px;
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
    .show_text {
      width: 100%;
      height: 68px;
      background: #f8f9fa;
      border-radius: 5px;
      padding: 0 10px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 500;
        &:nth-of-type(2) {
          margin-top: 4px;
        }
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
    }
    .text {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .balance {
      margin-top: 15px;
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
      width: 100%;
      margin-top: 20px;
      border-radius: 5px;
    }
    .guard_balance {
      width: 100%;
      height: 68px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #f8f9fa;
      border-radius: 5px;
      padding: 0 10px;
      margin-top: 10px;
      > span {
        font-size: 14px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        color: rgba(23, 23, 58, 0.7);
        line-height: 14px;
      }
      > div {
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
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
    p {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      font-size: 12px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 500;
      color: rgba(23, 23, 58, 0.4);
      line-height: 12px;
    }
  }
}
</style>
