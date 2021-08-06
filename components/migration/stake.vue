<template>
  <div class="migration_stake">
    <div class="title">{{ $t("Migration.StakeTitle") }}</div>
    <div class="content">
      <div class="stake_wrap">
        <div class="guard_balance">
          <span class="name">{{ $t("Migration.GuardCredit") }}：</span>
          <span class="num">{{ addCommom(fixD(myReward3, 4)) }}</span>
        </div>
        <button
          @click="claimQuota"
          :class="claimLoading ? 'disable b_button' : 'b_button'"
        >
          <i :class="claimLoading ? 'loading_pic' : ''"></i>
          {{ $t("Migration.Claim") }}
        </button>
        <div class="stake_balance">
          <p>
            <span class="name">{{ $t("Migration.MyStake") }}：</span>
            <span class="num">{{ addCommom(fixD(myStkaing, 4)) }}</span>
          </p>
          <button @click="$router.push('/mining')">
            {{ $t("Migration.ToStake") }}
          </button>
        </div>
      </div>
      <div class="tips_wrap">
        <div class="logo">Tips</div>
        <div>
          <span>01</span>
          <p v-html="$t('Migration.Tips1')"></p>
        </div>
        <div>
          <span>02</span>
          <p v-html="$t('Migration.Tips2')"></p>
        </div>
        <div>
          <span>03</span>
          <p v-html="$t('Migration.Tips3')"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fixD, addCommom } from "~/assets/js/util.js";
import {
  BalanceOf,
  TotalSupply,
  Earned3,
  Allowance,
} from "~/interface/read_contract.js";
import { Stake, Approve, GetReward3 } from "~/interface/write_contract.js";
let StakeAddress = "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571";
let PoolAddress = "0xA21B692B92Bbf0E34334f1548a0b51837CDDD0Bb";
let Earn3Address = "0x73f15cDBeaf9818a80b748F1389d791ce488d172";
export default {
  data() {
    return {
      myBalance: 0,
      StakeVolume: "",
      poolStaking: 0,
      myStkaing: 0,
      myReward3: 0,
      ApproveFlag: false,
      claimLoading: false,
      fixD,
      addCommom,
    };
  },
  mounted() {
    this.$nextTick(() => {
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
    async claimQuota() {
      this.claimLoading = true;
      GetReward3(PoolAddress, Earn3Address, (res) => {
        if (res === "success" || res === "error") {
          this.getBalance();
          this.claimLoading = false;
          this.$bus.$emit("REFRESH_MIGRATION_SWAP");
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
.title {
  height: 18px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  @include themeify {
    color: themed("migration_color2");
  }
  line-height: 18px;
  margin-top: 32px;
}
.content {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.stake_wrap {
  border-radius: 10px;
  @include themeify {
    border: 1px solid themed("swap_border");
  }
  padding: 20px 40px;
  .guard_balance {
    width: 100%;
    height: 46px;
    @include themeify {
      background: themed("mining_earn");
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
    margin-top: 20px;
    border-radius: 5px;
  }
  .stake_balance {
    width: 100%;
    height: 64px;
    @include themeify {
      background: themed("migration_color1");
    }
    border-radius: 5px;
    padding: 0 10px;
    margin-top: 20px;
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
    button {
      background: #fd7e14;
      border-radius: 5px;
      min-height: 24px;
      padding: 4px 10px;
      font-size: 12px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      color: #ffffff;
      line-height: 12px;
    }
  }
}
.tips_wrap {
  margin-left: 48px;
  width: 370px;
  height: 230px;
  @include themeify {
    background: themed("migration_color1");
  }
  border-radius: 10px;
  padding: 10px 25px;
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
  .stake_wrap {
    width: 400px;
  }
}
@media screen and(max-width: 750px) {
  .content {
    flex-direction: column;
  }
  .stake_wrap {
    min-width: 320px;
    width: 95%;
    padding: 10px 10px;
    > button {
      width: 100%;
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
<style lang='scss'>
@import "~/assets/css/base.scss";
.tips_wrap {
  > div {
    p {
      > span {
        @include themeify {
          color: themed("migration_color2");
        }
        font-weight: 600;
      }
    }
  }
}
</style>