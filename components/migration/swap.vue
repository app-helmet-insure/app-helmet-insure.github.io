<template>
  <div class="migration_swap">
    <div class="title"><span>2</span>兑换 Guard</div>

    <div class="stake_wrap">
      <div class="show_text">
        <p><span>当日剩余兑换额度：</span> <span>1000000</span></p>
        <p><span>我的额度：</span> <span>1000000</span></p>
      </div>
      <div class="balance text">
        <span>可结算:</span><span>0.00010000 LPT</span>
      </div>
      <div class="input">
        <input type="text" />
        <span class="max">最大量</span>
      </div>
      <button class="b_button">质押挖矿</button>
      <div class="guard_balance">
        <span>燃烧兑换 Guard，立享 Black 奖励</span>
        <div>
          <p><span>Guard额度：</span> <span>1000000</span></p>
          <button>Claim</button>
        </div>
      </div>
      <p>Powered by BlackHole</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .migration_swap {
    width: 400px;
    height: 410px;
    border-radius: 10px;
    border: 1px solid #e8e8eb;
    overflow: hidden;
    .title {
      height: 50px;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      color: #17173a;
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
    }
    .show_text {
      width: 100%;
      height: 68px;
      background: #f8f9fa;
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
            color: rgba(23, 23, 58, 0.7);
            font-weight: 500;
          }
          &:nth-of-type(2) {
            color: #17173a;
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
          color: rgba(23, 23, 58, 0.7);
          font-weight: 500;
        }
        &:nth-of-type(2) {
          color: #17173a;
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
        border: 1px solid #e8e8eb;
        padding-left: 12px;
      }
      span {
        position: absolute;
        right: 10px;
        min-width: 52px;
        min-height: 24px;
        background: #f8f9fa;
        border-radius: 5px;
        border: 1px solid #e8e8eb;
        padding: 4px 6px;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          border: 1px solid #ff9600;
          color: #ff9600;
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
      background: #f8f9fa;
      border-radius: 5px;
      padding: 0 10px;
      margin-top: 10px;
      > span {
        font-size: 14px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        color: rgba(23, 23, 58, 0.7);
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
            color: rgba(23, 23, 58, 0.7);
            font-weight: 500;
          }
          &:nth-of-type(2) {
            color: #17173a;
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
    border: 1px solid #e8e8eb;
    margin-top: 10px;
    overflow: hidden;
    .title {
      height: 50px;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      color: #17173a;
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
      background: #f8f9fa;
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
            color: rgba(23, 23, 58, 0.7);
            font-weight: 500;
          }
          &:nth-of-type(2) {
            color: #17173a;
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
          color: rgba(23, 23, 58, 0.7);
          font-weight: 500;
        }
        &:nth-of-type(2) {
          color: #17173a;
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
        border: 1px solid #e8e8eb;
        padding-left: 12px;
      }
      span {
        position: absolute;
        right: 10px;
        min-width: 52px;
        min-height: 24px;
        background: #f8f9fa;
        border-radius: 5px;
        border: 1px solid #e8e8eb;
        padding: 4px 6px;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          border: 1px solid #ff9600;
          color: #ff9600;
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
      background: #f8f9fa;
      border-radius: 5px;
      padding: 0 10px;
      margin-top: 10px;
      > span {
        font-size: 14px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        color: rgba(23, 23, 58, 0.7);
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
            color: rgba(23, 23, 58, 0.7);
            font-weight: 500;
          }
          &:nth-of-type(2) {
            color: #17173a;
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