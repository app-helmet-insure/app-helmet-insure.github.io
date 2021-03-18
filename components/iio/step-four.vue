<template>
  <div class="stepFour">
    <div class="step_title">确保您的账户中有足够的 BNB 用于兑换 XXX</div>
    <div class="step_action">
      <div class="step_myaccount">
        <p>
          <span>我的兑换额度</span>
          <span>100000 XXX</span>
        </p>
        <p>
          <span>我的兑换额度</span>
          <span>100000 XXX</span>
        </p>
      </div>

      <button>兑换</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scped>
@media screen and (min-width: 750px) {
  .stepFour {
    width: 420px;
    margin: 0 auto;
    .step_title {
      font-size: 18px;
      font-weight: 600;
      color: #121212;
    }
    .step_action {
      .step_myaccount {
        margin: 30px 0;
        display: flex;
        justify-content: space-between;
        p {
          display: flex;
          flex-direction: column;
          &:last-child {
            text-align: right;
          }
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              color: #9b9b9b;
              line-height: 14px;
            }
            &:nth-of-type(2) {
              margin-top: 8px;
              font-size: 16px;
              font-weight: bold;
              color: #121212;
              line-height: 18px;
            }
          }
        }
      }
      > button {
        margin-top: 20px;
        width: 100%;
        height: 40px;
        background: #121212;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
  }
}
</style>