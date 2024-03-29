<template>
  <div class="action_wrap" v-if="iioPage === 'iio-id'">
    <div class="action_step">
      <div class="action_step_wrap">
        <!-- step1 ---------------------------------------------------------------->
        <div
          class="action_step_item"
          :class="active_step == 1 ? 'active_step' : ''"
          @click="active_step = 1"
          :style="ticketFlag ? 'pointer-events: none' : ''"
        >
          <svg class="icon" aria-hidden="true">
            <use href="#icon-buy"></use>
          </svg>
          <span>1. {{ $t("IIO.BuyTokenTicket") }}</span>
        </div>
        <div class="step_own" v-show="active_step == 1">
          <StepOne></StepOne>
        </div>
        <svg class="icon" aria-hidden="true" v-if="active_step == 1">
          <use href="#icon-WhiteRight"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          v-if="active_step === 2 || active_step === 3"
        >
          <use href="#icon-OrangeRight"></use>
        </svg>
        <!-- step2 ----------------------------------------------------------------->
        <div
          class="action_step_item"
          :class="active_step == 2 ? 'active_step' : ''"
          @click="active_step = 2"
        >
          <svg class="icon" aria-hidden="true">
            <use href="#icon-share"></use>
          </svg>
          <span
            >2.
            {{ $t("IIO.DepositLptReward", { token: `i${About.Token}` }) }}</span
          >
        </div>
        <div class="step_own" v-show="active_step == 2">
          <StepTwo></StepTwo>
        </div>
        <svg class="icon" aria-hidden="true" v-if="active_step < 3">
          <use href="#icon-WhiteRight"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-if="active_step === 3">
          <use href="#icon-OrangeRight"></use>
        </svg>

        <!-- step3  ---------------------------------------------------------------->
        <div
          class="action_step_item"
          :class="active_step == 3 ? 'active_step' : ''"
          @click="active_step = 3"
        >
          <svg class="icon" aria-hidden="true">
            <use href="#icon-earn"></use>
          </svg>
          <span>3.{{ $t("IIO.SwapToken", { token: `i${About.Token}` }) }}</span>
        </div>
        <div class="step_own" v-show="active_step == 3">
          <StepThree></StepThree>
        </div>
      </div>
    </div>
    <div class="step_content">
      <StepOne v-show="active_step == 1"></StepOne>
      <StepTwo v-show="active_step == 2"></StepTwo>
      <StepThree v-show="active_step == 3"></StepThree>
    </div>
  </div>
</template>

<script>
import StepOne from "./step-one";
import StepTwo from "./step-two";
import StepThree from "./step-three";
import { applied3 } from "~/interface/iio.js";
import { Information } from "../../config/iio.js";
export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
  },
  data() {
    return {
      active_step: 1,
      newTicketFlag: false,
      ticketFlag: false,
      About: [],
    };
  },
  watch: {
    iioType: {
      handler: "WatchIIOType",
      immediate: true,
    },
  },
  computed: {
    iioType() {
      return this.$route.params.id;
    },
    iioPage() {
      return this.$route.name;
    },
  },
  mounted() {
    let name = this.$route.params.id;
    this.About = Information[name];
    this.$bus.$on("JUMP_STEP", (res) => {
      this.active_step = res.step;
    });
    this.$bus.$on("GET_FLAG", () => {
      this.buyAppliedFlag();
    });
    let timer = setTimeout(() => {
      this.buyAppliedFlag();
      clearTimeout();
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearTimeout(timer);
    });
  },
  methods: {
    WatchIIOType(newValue, oldValue) {
      this.About = Information[newValue];
    },
    async buyAppliedFlag() {
      let Name = this.iioType.toUpperCase();
      let reward_name = `IIO_HELMETBNB_${Name}`;
      let pool_name = "IIO_HELMETBNB_POOL";
      let res = await applied3(pool_name, reward_name);
      if (res) {
        this.active_step = 2;
      }
      this.ticketFlag = res;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
@media screen and (min-width: 750px) {
  .action_wrap {
    width: 1200px;
    margin: 0 auto;
    > span {
      font-size: 32px;
      font-weight: 600;
      color: #121212;
      line-height: 45px;
      margin-top: 40px;
      display: block;
    }
    > p {
      margin-top: 20px;
      font-size: 14px;
      color: #787878;
      line-height: 20px;
    }
  }
  .action_step {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    &_wrap {
      display: flex;
      align-items: center;
      > .icon {
        width: 24px;
        height: 24px;
        margin: 0 50px;
      }
    }
    &_item {
      display: flex;
      flex-direction: column;
      width: 260px;
      height: 154px;
      align-items: center;
      cursor: pointer;
      border-radius: 10px;
      .icon {
        width: 56px;
        height: 56px;
        margin: 28px 0 10px 0;
      }
      span {
        font-size: 16px;
        font-weight: 600;
        @include themeify {
          color: themed("color-1d1d1d");
        }
        text-align: center;
      }
    }
    .active_step {
      background: rgba(255, 150, 0, 0.1);
    }
    .active_step {
      background: rgba(255, 150, 0, 0.1);
      position: relative;
      &::after {
        display: block;
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 100%);
        border: 15px solid rgba(255, 150, 0, 0.1);
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
    }
  }
  .step_own {
    display: none;
  }
  .step_content {
    margin-top: 50px;
    margin-bottom: 10px;
    width: 100%;
    padding: 60px 0;
    @include themeify {
      background: themed("color-ffffff");
    }
    position: relative;
  }
}
@media screen and (max-width: 750px) {
  .action_wrap {
    width: 100%;
    padding: 30px 16px;
    > span {
      font-size: 20px;
      font-weight: 600;
      color: #121212;
      display: block;
    }
    > p {
      margin-top: 20px;
      font-size: 12px;
      color: #787878;
      line-height: 20px;
    }
  }
  .action_step {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    &_wrap {
      display: flex;
      align-items: center;
      flex-direction: column;
      > .icon {
        width: 24px;
        height: 24px;
        margin: 10px 0px;
        transform: rotate(90deg);
      }
    }
    &_item {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      width: 100%;
      height: 76px;
      cursor: pointer;
      border-radius: 10px;
      border: 1px solid #f7f7fa;
      .icon {
        width: 56px;
        height: 56px;
      }
      span {
        font-size: 16px;
        font-weight: 600;
        @include themeify {
          color: themed("color-1d1d1d");
        }
      }
    }
    .active_step {
      background: rgba(255, 150, 0, 0.1);
      border: 1px solid transparent;
    }
    .active_step {
      background: rgba(255, 150, 0, 0.1);
      position: relative;
      &::after {
        display: block;
        content: "";
        position: absolute;
        left: 15%;
        bottom: 0;
        transform: translate(-50%, 100%);
        border: 12px solid rgba(255, 150, 0, 0.1);
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
    }
  }
  .step_own {
    margin-top: 28px;
    width: 100%;
    padding: 20px 12px 30px;
    @include themeify {
      background: themed("color-ffffff");
    }
    border-radius: 3px;
  }
  .step_content {
    display: none;
  }
}
</style>