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
import {
  totalSupply,
  balanceOf,
  getLPTOKEN,
  CangetPAYA,
  CangetUNI,
  getDoubleReward,
  exitStake,
  getLastTime,
  approveStatus,
  getBalance,
  toDeposite,
  getMined,
  WithdrawAvailable,
  getAllHelmet,
  Rewards,
  RewardsDuration,
} from "~/interface/deposite";
export default {
  data() {
    return {
      showMsg: {
        DepositeVolume: 0,
        DepositeTotal: 0,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.getBalance();
    }, 1000);
  },
  methods: {
    async getBalance() {
      let lpt_name = "IIO_HELMETBNB_LPT";
      let pool_name = "IIO_HELMETBNB";
      // 可抵押数量
      let Deposite = await getBalance(lpt_name);
      // 可赎回数量
      let Withdraw = await getLPTOKEN(type);
      // 总抵押
      let TotalLPT = await totalSupply(pool_name);
      // 可领取Helmet
      let Helmet = await CangetPAYA(type);
      //  可领取Cake
      let Cake = await CangetUNI(type);
      // 总Helmet
      let HelmetAllowance = await getAllHelmet("HELMET", "FARM", "HELMETBNB");
      let helmetReward = await Rewards("HELMETBNB", "0");
      this.balance.Deposite = fixD(Deposite, 4);
      this.balance.Withdraw = fixD(Withdraw, 4);
      this.balance.Helmet = fixD(Helmet, 8);
      this.balance.Cake = fixD(Cake, 8);
      this.balance.TotalLPT = fixD(TotalLPT, 4);
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2);
      this.textList[0].num =
        fixD((precision.minus(HelmetAllowance, helmetReward) / 365) * 7, 2) +
        " HELMET";
      // this.textList[3].num = addCommom(Deposite, 4)
      // this.textList[4].num = addCommom(Helmet, 4)
    },
  },
};
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