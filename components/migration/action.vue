<template>
  <div class="migration_action">
    <div class="step">
      <div class="step_one step_num">1</div>
      <div class="step_two step_num">2</div>
    </div>
    <div class="wrap">
      <Stake />
      <Swap />
    </div>
  </div>
</template>

<script>
import Stake from "./stake.vue";
import Swap from "./swap.vue";
export default {
  components: { Stake, Swap },
};
</script>

<style lang='scss' scoped>
.migration_action {
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
  .migration_action {
    width: 878px;
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
  .migration_action {
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