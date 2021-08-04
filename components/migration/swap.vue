<template>
  <div class="migration_swap">
    <div class="title"><span>2</span>{{ $t("Migration.SwapTitle") }}</div>

    <div class="stake_wrap">
      <div class="show_text">
        <p>
          <span>{{ $t("Migration.AvailableGuard") }}:</span>
          <span>{{ addCommom(fixD(AllQuota, 8)) }}</span>
        </p>
        <p>
          <span>{{ $t("Migration.MyCredits") }}:</span>
          <span>{{ addCommom(fixD(MyQuota, 8)) }}</span>
        </p>
      </div>
      <div class="balance text">
        <span>{{ $t("Migration.Available1") }}:</span
        ><span>{{ addCommom(fixD(MyBalance, 8)) }} Helmet</span>
      </div>
      <div class="input">
        <input
          type="text"
          v-model="BurnVolume"
          :disabled="Math.min(AllQuota, MyQuota, MyBalance) ? false : true"
        />
        <span
          v-if="Math.min(AllQuota, MyQuota, MyBalance)"
          class="max"
          @click="BurnVolume = fixD(Math.min(AllQuota, MyQuota, MyBalance), 8)"
          >{{ $t("Insurance.Insurance_text18") }}</span
        >
      </div>
      <button class="b_button" @click="ActionStep()">
        {{
          HelmetNeedApprove || GuardNeedApprove
            ? $t("Migration.Approve")
            : $t("Migration.Burn")
        }}
      </button>
      <!-- <div class="guard_balance">
        <span>燃烧兑换 Guard，立享 Black 奖励</span>
        <div>
          <p><span>Guard额度：</span> <span>1000000</span></p>
          <button>Claim</button>
        </div>
      </div> -->
      <!-- <p>Powered by BlackHole</p> -->
    </div>
  </div>
</template>

<script>
import { fixD, addCommom } from "~/assets/js/util.js";
import { RestQuota, BalanceOf, Allowance } from "~/interface/read_contract.js";
import { BurnHelmet, Approve } from "~/interface/write_contract.js";
const ContractAddress = "0xeB7731e81b1C2Af4837fAfB1a9b7770b6942411B";
const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
const QuotaAddress = "0x73f15cDBeaf9818a80b748F1389d791ce488d172";
export default {
  data() {
    return {
      MyBalance: 0,
      MyQuota: 0,
      AllQuota: 0,
      BurnVolume: "",
      HelmetNeedApprove: true,
      GuardNeedApprove: true,
      addCommom,
      fixD,
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
    this.$bus.$on("REFRESH_MIGRATION_SWAP", () => {
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
      let MyQuota = await BalanceOf(QuotaAddress);
      console.log(MyQuota, "w kMyQuota");
      this.MyQuota = MyQuota;
    },
    async getAllQuota() {
      let AllQuota = await RestQuota(ContractAddress);
      console.log(AllQuota, "AllQuota");
      this.AllQuota = AllQuota;
    },
    async getHelmetApproveStatus() {
      let HelmetNeedApprove = await Allowance(HelmetAddress, ContractAddress);
      this.HelmetNeedApprove = HelmetNeedApprove;
    },
    async getGuardApproveStatus() {
      let GuardNeedApprove = await Allowance(QuotaAddress, ContractAddress);
      this.GuardNeedApprove = GuardNeedApprove;
    },
    async ApproveHelemt(flag) {
      Approve(HelmetAddress, ContractAddress, "HELMET", (res) => {
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
      Approve(QuotaAddress, ContractAddress, "GUARD", (res) => {
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
      let Volume = this.BurnVolume;
      if (fixD(this.AllQuota, 8) == this.BurnVolume) {
        Volume = this.AllQuota;
      }
      if (fixD(this.MyBalance, 8) == this.BurnVolume) {
        Volume = this.MyBalance;
      }
      if (fixD(this.MyQuota, 8) == this.BurnVolume) {
        Volume = this.MyQuota;
      }
      console.log(Volume);
      BurnHelmet(ContractAddress, Volume, 18, (res) => {
        if (res === "success" || res === "error") {
          this.getMyQuota();
          this.getAllQuota();
          this.getMyBalance();
          this.$bus.$emit("REFRESH_MIGRATION_TITLE");
        }
      });
    },
    async ActionStep() {
      console.log(this.HelmetNeedApprove, this.GuardNeedApprove);
      console.log(
        this.HelmetNeedApprove && this.GuardNeedApprove,
        this.HelmetNeedApprove && !this.GuardNeedApprove,
        !this.HelmetNeedApprove && this.GuardNeedApprove,
        !this.HelmetNeedApprove && !this.GuardNeedApprove
      );
      if (this.HelmetNeedApprove && this.GuardNeedApprove) {
        return this.ApproveHelemt();
      }
      if (this.HelmetNeedApprove && !this.GuardNeedApprove) {
        return this.ApproveHelemt(true);
      }
      if (!this.HelmetNeedApprove && this.GuardNeedApprove) {
        return this.ApproveGuard();
      }
      if (!this.HelmetNeedApprove && !this.GuardNeedApprove) {
        return this.toBurnHelmet();
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
    @include themeify {
      background: themed("color-f8f9fa");
      color: themed("color-17173a");
      border: 1px solid themed("color-e8e8eb");
    }
    overflow: hidden;
    .title {
      height: 50px;
      @include themeify {
        background: themed("color-f8f9fa");
        color: themed("color-17173a");
      }

      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
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
      @include themeify {
        background: themed("color-f8f9fa");
      }
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
            font-weight: 500;
            @include themeify {
              color: darken($color: themed("color-17173a"), $amount: 30%);
            }
          }
          &:nth-of-type(2) {
            @include themeify {
              color: themed("color-17173a");
            }
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
          @include themeify {
            color: darken($color: themed("color-17173a"), $amount: 30%);
          }
          font-weight: 500;
        }
        &:nth-of-type(2) {
          @include themeify {
            color: themed("color-17173a");
          }
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
        @include themeify {
          @include themeify {
            border: 1px solid themed("color-e8e8eb");
          }
        }
        padding-left: 12px;
      }
      span {
        position: absolute;
        right: 10px;
        min-width: 52px;
        min-height: 24px;
        @include themeify {
          background: themed("color-f8f9fa");
          border: 1px solid themed("color-e8e8eb");
          color: themed("color-17173a");
        }
        border-radius: 5px;
        padding: 4px 6px;
        font-size: 12px;
        cursor: pointer;
        text-align: center;
        &:hover {
          border: 1px solid #ff9600;
          color: #ff9600 !important;
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
      @include themeify {
        background: themed("color-f8f9fa");
      }
      border-radius: 5px;
      padding: 0 10px;
      margin-top: 10px;
      > span {
        font-size: 14px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        @include themeify {
          color: darken($color: themed("color-17173a"), $amount: 30%);
        }
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
            @include themeify {
              color: darken($color: themed("color-17173a"), $amount: 30%);
            }
            font-weight: 500;
          }
          &:nth-of-type(2) {
            @include themeify {
              color: themed("color-17173a");
            }
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
    @include themeify {
      border: 1px solid themed("color-e8e8eb");
    }
    margin-top: 10px;
    overflow: hidden;
    .title {
      height: 50px;
      @include themeify {
        background: themed("color-f8f9fa");
      }
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("color-17173a");
      }
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
      @include themeify {
        background: themed("color-f8f9fa");
      }
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
            @include themeify {
              color: darken($color: themed("color-17173a"), $amount: 30%);
            }
            font-weight: 500;
          }
          &:nth-of-type(2) {
            @include themeify {
              color: themed("color-17173a");
            }
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
          @include themeify {
            color: darken($color: themed("color-17173a"), $amount: 30%);
          }
          font-weight: 500;
        }
        &:nth-of-type(2) {
          @include themeify {
            color: themed("color-17173a");
          }
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
        @include themeify {
          border: 1px solid themed("color-e8e8eb");
        }
        padding-left: 12px;
      }
      span {
        position: absolute;
        right: 10px;
        min-width: 52px;
        min-height: 24px;
        border-radius: 5px;
        @include themeify {
          border: 1px solid themed("color-e8e8eb");
          color: themed("color-17173a");
          background: themed("color-f8f9fa");
        }
        padding: 4px 6px;
        font-size: 12px;
        cursor: pointer;
        text-align: center;
        &:hover {
          border: 1px solid #ff9600;
          color: #ff9600 !important;
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
      @include themeify {
        background: themed("color-f8f9fa");
      }
      border-radius: 5px;
      padding: 0 10px;
      margin-top: 10px;
      > span {
        font-size: 14px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        @include themeify {
          color: darken($color: themed("color-17173a"), $amount: 30%);
        }
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
            @include themeify {
              color: darken($color: themed("color-17173a"), $amount: 30%);
            }
            font-weight: 500;
          }
          &:nth-of-type(2) {
            @include themeify {
              color: themed("color-17173a");
            }
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
