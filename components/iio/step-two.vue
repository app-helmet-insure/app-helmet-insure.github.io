<template>
  <div class="stepTwo">
    <div class="step_title">使用 HELMET 购买申购 XXX 资格通证</div>
    <div class="step_action">
      <p class="step_buy">
        <span>购买</span>
        <a>获得 HELMET</a>
      </p>
      <label>
        <p><span>通用份额</span><span>可用余额: 1212.12323122 HELMET</span></p>
        <div class="input">
          <input type="text" readonly />
          <span>HELMET</span>
        </div>
      </label>
      <p class="text">
        <span>每张资格通证: 5 HELMET</span>
      </p>
      <button>购买 XXX 资格通证</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scped>
@media screen and (min-width: 750px) {
  .stepTwo {
    width: 420px;
    margin: 0 auto;
    .step_title {
      font-size: 18px;
      font-weight: 600;
      color: #121212;
    }
    .step_action {
      > .step_buy {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        span {
          font-size: 16px;
          font-weight: 600;
          color: #121212;
        }
        a {
          font-size: 14px;
          font-weight: 600;
          color: #ff9600;
        }
      }
      > label {
        > p {
          margin: 20px 0 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 14px;
            color: #9b9b9b;
          }
        }
        .input {
          width: 100%;
          height: 40px;
          position: relative;
          display: flex;
          align-items: center;
          input {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            border: 1px solid #cfcfd2;
            padding-left: 12px;
          }
          span {
            position: absolute;
            font-size: 14px;
            color: #9b9b9b;
            right: 15px;
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
      .text {
        margin-top: 4px;
        font-size: 14px;
        color: #9b9b9b;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .stepTwo {
    width: 100%;
    .step_title {
      font-size: 14px;
      font-weight: 600;
      color: #121212;
    }
    .step_action {
      > .step_buy {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        span {
          font-size: 14px;
          font-weight: 600;
          color: #121212;
        }
        a {
          font-size: 14px;
          font-weight: 600;
          color: #ff9600;
        }
      }
      > label {
        > p {
          margin: 12px 0 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 12px;
            color: #9b9b9b;
          }
        }
        .input {
          width: 100%;
          height: 40px;
          position: relative;
          display: flex;
          align-items: center;
          input {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            border: 1px solid #cfcfd2;
            padding-left: 12px;
          }
          span {
            position: absolute;
            font-size: 14px;
            color: #9b9b9b;
            right: 15px;
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
      .text {
        margin-top: 4px;
        font-size: 14px;
        color: #9b9b9b;
      }
    }
  }
}
</style>