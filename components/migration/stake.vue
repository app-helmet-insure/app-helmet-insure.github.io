<template>
  <div class="migration_stake">
    <div class="title"><span>1</span>抵押LPT获取Guard额度</div>
    <div class="stake_wrap">
      <div class="balance text">
        <span>可抵押:</span><span>{{myBalance}} LPT</span>
      </div>
      <div class="input">
        <input type="text" />
        <span class="max">最大量</span>
      </div>
      <button class="b_button">质押挖矿</button>
      <div class="my_stake text">
        <span>我的抵押:</span><span>0.00010000 LPT</span>
      </div>
      <div class="all_stake text">
        <span>总抵押量:</span><span>0.00010000 LPT</span>
      </div>
      <div class="guard_balance">
        <p><span>Guard额度：</span> <span>1000000</span></p>
        <button>Claim</button>
      </div>
      <a
        href="https://exchange.pancakeswap.finance/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
        target="_blank"
        >From <i class="pancake"></i>Get HELMET-BNB LPT(V2)</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myBalance: 0,
      allQuota: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // this.getMyBalance();
      // this.getAllQuota();
    });
  },
  methods: {
    async getMyBalance() {
      let ContractAddress = "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571";
      let myBalance = await BalanceOf(ContractAddress);
      this.myBalance = myBalance;
    },
    async getAllQuota() {
      let ContractAddress = "0xbE97f9298684e643765806ec91b16Ca672c467ce";
      let allQuota = await QuotaPerDay(ContractAddress);
      this.allQuota = allQuota;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .migration_stake {
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
    .text {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .balance {
      margin-top: 30px;
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
    .my_stake {
      margin-top: 20px;
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
    .all_stake {
      margin-top: 10px;
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
    .guard_balance {
      width: 100%;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8f9fa;
      border-radius: 5px;
      padding: 0 10px;
      margin-top: 10px;
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
    a {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #fd7e14;
      line-height: 20px;
      display: flex;
      align-items: center;
      i {
        display: block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: 0 2px;
      }
      .pancake {
        background-image: url("../../assets/img/icon/pancake@2x.png");
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .migration_stake {
    width: 100%;
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
      padding: 0 10px;
    }
    .text {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .balance {
      margin-top: 30px;
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
      width: 100%;
      margin-top: 20px;
    }
    .my_stake {
      margin-top: 20px;
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
    .all_stake {
      margin-top: 10px;
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
    .guard_balance {
      width: 100%;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8f9fa;
      border-radius: 5px;
      padding: 0 10px;
      margin-top: 10px;
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
    a {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #fd7e14;
      line-height: 20px;
      display: flex;
      align-items: center;
      i {
        display: block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: 0 2px;
      }
      .pancake {
        background-image: url("../../assets/img/icon/pancake@2x.png");
      }
    }
  }
}
</style>