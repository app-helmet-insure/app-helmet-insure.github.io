<template>
  <div class="migration_swap">
    <div class="title">{{ $t("Migration.SwapTitle") }}</div>
    <div class="content">
      <div class="swap_wrap">
        <div class="today_quota">
          <span class="name">{{ $t("Migration.AvailableGuard") }}:</span>
          <span class="num">{{ addCommom(fixD(AllQuota, 2)) }}</span>
        </div>
        <div class="show_text">
          <p>
            <span>{{ $t("Migration.MyCredits") }}:</span>
            <span>{{ addCommom(fixD(MyQuota, 4)) }}</span>
          </p>
          <p>
            <span>Helmet:</span>
            <span>{{ addCommom(fixD(MyBalance, 4)) }} </span>
          </p>
        </div>
        <div :class="`swap_action ${storeThemes}`">
          <div class="action_top action">
            <label for="helmet">{{ $t("Migration.MyCredits") }}</label>
            <input type="text" id="helmet" v-model="BurnVolume" />
          </div>
          <div class="action_cen">
            <div>
              <div class="circle">1:1</div>
              <button
                class="max"
                @click="
                  BurnVolume = fixD(Math.min(AllQuota, MyQuota, MyBalance), 4)
                "
              >
                {{ $t("Insurance.Insurance_text18") }}
              </button>
            </div>
          </div>
          <div class="action_bot action">
            <label for="guard">Helmet</label>
            <input type="text" id="guard" v-model="BurnVolume" readonly />
          </div>
        </div>
        <!-- <button
          :class="burnLoading ? 'disable b_button' : 'b_button'"
          @click="ActionStep()"
        >
          <i :class="burnLoading ? 'loading_pic' : ''"></i>
          {{
            HelmetNeedApprove || GuardNeedApprove
              ? $t("Migration.Approve")
              : $t("Migration.Burn")
          }}
        </button> -->
        <button class="disable_button b_button">
          {{ $t("Migration.Pause") }}
        </button>
      </div>
      <div class="tips_wrap">
        <div class="logo">Tips</div>
        <div>
          <span>01</span>
          <p v-html="$t('Migration.Tips4')"></p>
        </div>
        <div>
          <span>02</span>
          <p v-html="$t('Migration.Tips5')"></p>
        </div>
        <div>
          <span>03</span>
          <p v-html="$t('Migration.Tips6')"></p>
        </div>
      </div>
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
      burnLoading: false,
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
  computed: {
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  methods: {
    async getMyBalance() {
      let MyBalance = await BalanceOf(HelmetAddress);
      this.MyBalance = MyBalance;
    },
    async getMyQuota() {
      let MyQuota = await BalanceOf(QuotaAddress);
      this.MyQuota = MyQuota;
    },
    async getAllQuota() {
      let AllQuota = await RestQuota(ContractAddress);
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
        } else {
          this.burnLoading = false;
        }
      });
    },
    async ApproveGuard() {
      Approve(QuotaAddress, ContractAddress, "GUARD", (res) => {
        if (res === "success") {
          this.GuardNeedApprove = false;
          this.burnLoading = false;
          this.toBurnHelmet();
        } else {
          this.burnLoading = false;
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
      BurnHelmet(ContractAddress, Volume, 18, (res) => {
        if (res === "success" || res === "error") {
          this.getMyQuota();
          this.getAllQuota();
          this.getMyBalance();
          this.burnLoading = false;
          this.$bus.$emit("REFRESH_MIGRATION_TITLE");
        }
      });
    },
    async ActionStep() {
      this.burnLoading = true;
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

<style lang='scss'>
.tips_wrap {
  > div {
    span {
      color: #17173a;
      font-weight: 600;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~/assets/css/themes.scss";
.title {
  height: 18px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  @include themeify {
    color: themed("migration_color2");
  }
  line-height: 18px;
  margin-top: 30px;
}
.content {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.swap_wrap {
  width: 400px;
  height: 345px;
  border-radius: 10px;
  @include themeify {
    border: 1px solid themed("swap_border");
  }
  padding: 20px 40px;
  .today_quota {
    width: 100%;
    height: 46px;
    @include themeify {
      background: themed("migration_color1");
    }
    border-radius: 5px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: 14px;
      font-weight: 500;
      @include themeify {
        color: themed("migration_color4");
      }
    }
    .num {
      font-size: 14px;
      font-weight: 600;
      @include themeify {
        color: themed("migration_color3");
      }
    }
  }
  > button {
    border-radius: 5px;
  }
}
.show_text {
  margin-top: 20px;
  p {
    display: flex;
    justify-content: space-between;
    &:nth-of-type(2) {
      margin-top: 15px;
    }
    span {
      &:nth-of-type(1) {
        font-size: 14px;
        font-weight: 500;
        @include themeify {
          color: themed("migration_color4");
        }
      }
      &:nth-of-type(2) {
        font-size: 14px;
        font-weight: 600;
        @include themeify {
          color: themed("migration_color3");
        }
      }
    }
  }
}
.dark {
  background-image: url("../../assets/img/migration/swap_bg_dark.png");
}
.light {
  background-image: url("../../assets/img/migration/swap_bg_light.png");
}
.swap_action {
  width: 320px;
  height: 121px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .action {
    flex: 1;
    max-height: 59px;
    display: flex;
    flex-direction: column;
  }
  .action {
    padding-left: 50px;
    label {
      display: inline-block;
      margin-top: 8px;
      font-size: 12px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("migration_color7");
      }
    }
    input {
      margin-top: 5px;
      font-size: 18px;
      font-family: IBMPlexSans-SemiBold, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("migration_color2");
      }
      line-height: 18px;
      background: transparent;
      caret-color: #fd7e14;
    }
  }
  .action_cen {
    width: 300px;
    height: 1px;
    margin-left: 20px;
    @include themeify {
      background: themed("color-ededf0");
    }
    position: relative;
    display: flex;
    align-items: center;
    > div {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
    }
    .circle {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      background: linear-gradient(138deg, #fd7e14 0%, #4364e8 100%);
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      text-align: center;
      line-height: 30px;
      margin-right: 12px;
    }
    .max {
      width: 52px;
      height: 24px;
      @include themeify {
        background: themed("migration_color1");
        border: 1px solid themed("swap_border");
        color: themed("migration_color2");
      }

      border-radius: 5px;
      margin-right: 10px;
      &:hover {
        border: 1px solid #ff9600 !important;
        color: #ff9600 !important;
      }
    }
  }
}
.tips_wrap {
  margin-left: 48px;
  width: 370px;
  height: 345px;
  @include themeify {
    background: themed("migration_color1");
  }
  border-radius: 10px;
  padding: 10px 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .logo {
    width: 33px;
    height: 17px;
    @include themeify {
      background: themed("migration_color5");
    }
    border-radius: 2px;
    font-size: 12px;
    font-family: IBMPlexSans;
    color: #ffffff;
    justify-content: center;
    transform: skew(-10deg);
  }
  > div {
    display: flex;
    margin-top: 10px;
    span {
      font-size: 12px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("migration_color6");
      }
      line-height: 20px;
      letter-spacing: 1px;
    }
    p {
      margin-left: 3px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      @include themeify {
        color: themed("migration_color4");
      }
      line-height: 20px;
      span {
        font-weight: 600;
        @include themeify {
          color: themed("migration_color2");
        }
      }
    }
  }
}

@media screen and(min-width: 750px) {
  .swap_wrap {
    width: 400px;
  }
}
@media screen and(max-width: 750px) {
  .content {
    flex-direction: column;
  }
  .swap_wrap {
    min-width: 320px;
    width: 95%;
    padding: 10px 10px;
    > button {
      margin-top: 20px;
      width: 100%;
    }
    .swap_action {
      width: 100%;
    }
    .action_cen {
      width: calc(100% - 21px);
    }
    .action_bot {
      input {
        width: 95%;
      }
    }
  }
  .tips_wrap {
    min-width: 320px;
    width: 95%;
    margin-left: 0;
    margin-top: 20px;
    height: auto;
  }
}
</style>
