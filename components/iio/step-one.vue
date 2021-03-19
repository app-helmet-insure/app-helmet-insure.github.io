<template>
  <div class="stepOne">
    <div class="step_title">使用 LPT 在 HELMET-BNB LP 池中进行挖矿</div>
    <div class="step_action">
      <span>抵押</span>
      <label>
        <p><span>输入抵押量</span><span>0.00 LPT 可抵押</span></p>
        <div class="input">
          <input type="text" />
          <span>最大</span>
        </div>
      </label>
      <button>质押挖矿</button>
    </div>
    <div class="step_details">
      <p class="text">
        <span>我的抵押/总抵押量：</span><span> 0 LPT/3.663 LPT</span>
      </p>
      <p class="text">
        <span>我的抵押/总抵押量：</span><span> 0 LPT/3.663 LPT</span>
      </p>
      <a>Get HELMET-BNB LPT</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scped>
@media screen and (min-width: 750px) {
  .stepOne {
    width: 420px;
    margin: 0 auto;
    .step_title {
      font-size: 18px;
      font-weight: 600;
      color: #121212;
    }
    .step_action {
      > span {
        font-size: 16px;
        font-weight: 600;
        color: #121212;
        display: block;
        margin-top: 30px;
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
            &:focus {
              height: 39px;
              border: 2px solid #ff9600;
              padding-left: 11px;
            }
          }
          span {
            position: absolute;
            font-size: 14px;
            color: #121212;
            right: 15px;
            cursor: pointer;
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
    .step_details {
      margin-top: 12px;
      .text {
        margin-bottom: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            color: #9b9b9b;
            line-height: 20px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            color: #121212;
            line-height: 20px;
          }
        }
      }
      > a {
        font-size: 14px;
        font-weight: 600;
        color: #ff9600;
        line-height: 20px;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .stepOne {
    width: 100%;
    .step_title {
      font-size: 14px;
      font-weight: 600;
      color: #121212;
    }
    .step_action {
      > span {
        font-size: 14px;
        font-weight: 600;
        color: #121212;
        display: block;
        margin-top: 20px;
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
            background: #f7f7fa;
            padding-left: 12px;
            &:focus {
              height: 39px;
              border: 2px solid #ff9600;
              padding-left: 11px;
            }
          }
          span {
            position: absolute;
            font-size: 14px;
            color: #121212;
            right: 15px;
            cursor: pointer;
          }
        }
      }
      > button {
        margin-top: 20px;
        width: 100%;
        height: 40px;
        background: #121212;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
    .step_details {
      margin-top: 20px;
      .text {
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            color: #9b9b9b;
            line-height: 20px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            color: #121212;
            line-height: 20px;
          }
        }
      }
      > a {
        font-size: 14px;
        font-weight: 600;
        color: #ff9600;
        line-height: 20px;
      }
    }
  }
}
</style>