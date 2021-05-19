<template>
  <div class="mask">
    <div class="buy_dialog">
      <div class="buy_dialog_title">
        <span>Buy HELMET</span>
        <i></i>
      </div>
      <div class="buy_dialog_select">
        <input type="text" />
        <span class="all">
          {{ $t("Table.ALL") }}
        </span>
        <p class="selected">
          <img src="" alt="" />
          <span>BNB</span>
          <i></i>
        </p>
      </div>
      <div class="swap_balance">{{ $t("IIO.Balance") }}:11</div>
      <div class="swap_earn">
        <img src="~/assets/img/mining/serialnext_web.png" alt="" />
        <span>预计收到</span>
        <p>--HELMET</p>
      </div>
      <p><span>Price</span><span>1HELMET=0.002BNB</span></p>
      <button>Confirm Swap</button>
      <p><span>Price</span><span>1HELMET=0.002BNB</span></p>
      <p><span>Price</span><span>1HELMET=0.002BNB</span></p>
      <span>该服务由 PANCAKE 提供支持</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
}
.buy_dialog {
  width: 360px;
  height: 399px;
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 25px 20px;
  > .buy_dialog_title {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 16px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      color: #17173a;
      line-height: 20px;
    }
    i {
      display: block;
      width: 20px;
      height: 20px;
      background: url("../../assets/img/icon/guanbi.png") center center
        no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      position: absolute;
      right: 24px;
      top: 24px;
    }
  }
  > .buy_dialog_select {
    margin-top: 20px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #e8e8eb;
    display: flex;
    align-items: center;
    &:hover {
      border-color: #ff9600;
    }
    input {
      flex: 1;
      height: 100%;
      background: transparent;
      padding-left: 15px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(23, 23, 58, 0.7);
      line-height: 20px;
    }
    .all {
      padding: 0 8px;
      height: 24px;
      background: #f8f9fa;
      border-radius: 5px;
      border: 1px solid #e8e8eb;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #17173a;
      display: flex;
      align-items: center;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        background: #fffaf3;
        border: 1px solid #fd7e14;
      }
    }
    > .selected {
      margin: 0 10px;
      display: flex;
      align-items: center;
      padding: 0 2px;
      height: 24px;
      background: #f8f9fa;
      border-radius: 5px;
      cursor: pointer;
      img {
        width: 18px;
        height: 18px;
        margin-right: 4px;
      }
      span {
        font-size: 14px;
        font-family: IBMPlexSans;
        color: #121212;
        line-height: 18px;
      }
      > i {
        display: block;
        width: 16px;
        height: 16px;
        background: url("../../assets/img/icon/select.png") center center
          no-repeat;
        background-size: 100% 100%;
        right: 24px;
        top: 24px;
      }
    }
  }
  > .swap_balance {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: rgba(23, 23, 58, 0.7);
    line-height: 12px;
    margin-top: 4px;
  }
  > .swap_earn {
    margin-top: 20px;
    width: 100%;
    height: 80px;
    background: #f7f7fa;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 34px;
      height: 34px;
      position: absolute;
      transform: translateY(-50%);
    }
    span {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #7a7f82;
      line-height: 17px;
      margin-top: 25px;
    }
    p {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #17173a;
      line-height: 22px;
    }
  }
  > p {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    span {
      &:nth-child(1) {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: rgba(23, 23, 58, 0.7);
        line-height: 12px;
      }
      &:nth-child(2) {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #17173a;
        line-height: 12px;
      }
    }
  }
  > button {
    margin-top: 20px;
    width: 100%;
    height: 40px;
    background: #fd7e14;
    border-radius: 5px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 18px;
  }
  > span {
    display: flex;
    justify-content: center;
    margin-top: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #b6b9bc;
    line-height: 17px;
  }
}
</style>