<template>
  <div class="action_wrap">
    <span>参与流程</span>
    <p>
      此次回馈兑换 XXX 仅面向 HELMET-BNB LP 池用户, 参与时请确保您抵押在池中的
      LPT
    </p>
    <div class="action_step">
      <div
        class="action_step_wrap"
        v-for="(item, step) in stepList"
        :key="item.name"
      >
        <div
          class="action_step_item"
          :class="active_step == item.step ? 'active_step' : ''"
          @click="active_step = item.step"
        >
          <svg class="icon" aria-hidden="true">
            <use :href="item.icon"></use>
          </svg>
          <span>{{ item.name }}</span>
        </div>
        <svg class="icon" aria-hidden="true" v-if="step + 1 != stepList.length">
          <use href="#icon-right1"></use>
        </svg>
      </div>
    </div>
    <div class="step_content">
      <StepOne v-show="active_step == 1"></StepOne>
      <StepTwo v-show="active_step == 2"></StepTwo>
      <StepFour v-show="active_step == 4"></StepFour>
    </div>
  </div>
</template>

<script>
import StepOne from "./step-one";
import StepTwo from "./step-two";
import StepFour from "./step-four";
export default {
  components: {
    StepOne,
    StepTwo,
    StepFour,
  },
  data() {
    return {
      active_step: 1,
    };
  },
  computed: {
    stepList() {
      let list = [
        {
          step: 1,
          name: "挖矿",
          icon: "#icon-mining",
        },
        {
          step: 2,
          name: "购买 XXX 资格通证",
          icon: "#icon-buy",
        },
        {
          step: 3,
          name: "实时份额",
          icon: "#icon-share",
        },
        {
          step: 4,
          name: "领取奖励",
          icon: "#icon-earn",
        },
      ];
      return list;
    },
  },
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
  .step_content {
    margin-top: 50px;
    margin-bottom: 80px;
    width: 100%;
    padding: 60px 0;
    background: #f7f7fa;
  }
}
</style>