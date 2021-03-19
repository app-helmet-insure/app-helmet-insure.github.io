<template>
  <div class="action_wrap">
    <span>参与流程</span>
    <p>
      此次回馈兑换 XXX 仅面向 HELMET-BNB LP 池用户, 参与时请确保您抵押在池中的
      LPT
    </p>
    <div class="action_step">
      <div class="action_step_wrap">
        <!-- step1 -->
        <div
          class="action_step_item"
          :class="active_step == 1 ? 'active_step' : ''"
          @click="active_step = 1"
        >
          <svg class="icon" aria-hidden="true">
            <use href="#icon-mining"></use>
          </svg>
          <span>挖矿</span>
        </div>
        <div class="step_own" v-show="active_step == 1">
          <StepOne></StepOne>
        </div>
        <svg class="icon" aria-hidden="true">
          <use href="#icon-right1"></use>
        </svg>
        <!-- step2 -->
        <div
          class="action_step_item"
          :class="active_step == 2 ? 'active_step' : ''"
          @click="active_step = 2"
        >
          <svg class="icon" aria-hidden="true">
            <use href="#icon-buy"></use>
          </svg>
          <span>购买 XXX 资格通证</span>
        </div>
        <div class="step_own" v-show="active_step == 2">
          <StepTwo></StepTwo>
        </div>
        <svg class="icon" aria-hidden="true">
          <use href="#icon-right1"></use>
        </svg>
        <!-- step3 -->
        <div
          class="action_step_item"
          :class="active_step == 3 ? 'active_step' : ''"
          @click="active_step = 3"
        >
          <svg class="icon" aria-hidden="true">
            <use href="#icon-share"></use>
          </svg>
          <span>实时份额</span>
        </div>
        <div class="step_own" v-show="active_step == 3">
          <StepThree v-show="active_step == 3"></StepThree>
        </div>
        <svg class="icon" aria-hidden="true">
          <use href="#icon-right1"></use>
        </svg>
        <!-- step4 -->
        <div
          class="action_step_item"
          :class="active_step == 4 ? 'active_step' : ''"
          @click="active_step = 4"
        >
          <svg class="icon" aria-hidden="true">
            <use href="#icon-earn"></use>
          </svg>
          <span>领取奖励</span>
        </div>
        <div class="step_own" v-show="active_step == 4">
          <StepFour></StepFour>
        </div>
      </div>
    </div>
    <div class="step_content">
      <StepOne v-show="active_step == 1"></StepOne>
      <StepTwo v-show="active_step == 2"></StepTwo>
      <StepThree v-show="active_step == 3"></StepThree>
      <StepFour v-show="active_step == 4"></StepFour>
    </div>
  </div>
</template>

<script>
import StepOne from "./step-one";
import StepTwo from "./step-two";
import StepThree from "./step-three";
import StepFour from "./step-four";
export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
  },
  data() {
    return {
      active_step: 1,
    };
  },
  computed: {},
};
</script>

<style lang='scss' scoped>
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
    &_wrap {
      display: flex;
      align-items: center;
      > .icon {
        width: 24px;
        height: 24px;
        margin: 0 10px;
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
        color: #22292f;
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
    margin-bottom: 80px;
    width: 100%;
    padding: 60px 0;
    background: #f7f7fa;
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
        color: #22292f;
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
    padding: 20px 12px;
    background: #f7f7fa;
    border-radius: 3px;
  }
  .step_content {
    display: none;
  }
}
</style>