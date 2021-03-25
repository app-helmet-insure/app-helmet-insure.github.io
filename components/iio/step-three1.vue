<template>
  <div class="stepThree1">
    <div class="text h5_text">
      <p>
        <span><i></i>可兑换总量</span>
        <span>100000.00 HELMET</span>
      </p>
      <p>
        <span><i></i>预计可获得</span>
        <span>{{ showMsg.AvailableVolume }} HELMET</span>
      </p>
    </div>
    <div class="left">
      <PieEchart></PieEchart>
      <div class="shareChart">
        <div>
          <i></i>
          <span>
            我的份额 <i>{{ showMsg.MyPoolShare }}%</i>
          </span>
        </div>

        <p><i></i> 提升份额</p>
      </div>
    </div>
    <div class="right">
      <div class="text pc_text">
        <p>
          <span><i></i>可兑换总量</span>
          <span>100000.00 HELMET</span>
        </p>
        <p>
          <span><i></i>预计可获得</span>
          <span>{{ showMsg.AvailableVolume }} HELMET</span>
        </p>
      </div>
      <div class="share">
        <p>
          <i></i><span>我的抵押</span
          ><span>{{ showMsg.DepositedVolume }} LPT</span>
        </p>
        <p>
          <i></i><span>总抵押量</span
          ><span>{{ showMsg.DepositeTotal }} LPT</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import PieEchart from "./pie-echart";
import { totalSupply, getLPTOKEN } from "~/interface/deposite";
import { earned3 } from "~/interface/iio.js";
import { fixD } from "~/assets/js/util.js";
export default {
  components: {
    PieEchart,
  },
  data() {
    return {
      showMsg: {
        DepositedVolume: 0, //已抵押
        DepositeTotal: 0, //总抵押
        AvailableVolume: 0, // 可领取
        MyPoolShare: 0,
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
      let pool_name = "IIO_HELMETBNB_POOL";
      // 已抵押数量
      let DepositedVolume = await getLPTOKEN(pool_name);
      // 总抵押
      let DepositeTotal = await totalSupply(pool_name);
      // 可领取数量
      let AvailableVolume = await earned3(pool_name);
      console.log(AvailableVolume);
      this.showMsg.DepositedVolume = fixD(DepositedVolume, 4);
      this.showMsg.DepositeTotal = fixD(DepositeTotal, 4);
      this.showMsg.AvailableVolume = fixD(AvailableVolume, 4);
      this.showMsg.MyPoolShare = fixD(
        (DepositedVolume / DepositeTotal) * 100,
        2
      );
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .stepThree1 {
    padding: 0 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    width: 400px;
    position: relative;
    > .shareChart {
      position: absolute;
      display: flex;
      align-items: center;
      top: 0;
      left: 120px;
      > div {
        display: flex;
        align-items: center;
        > i {
          display: block;
          width: 12px;
          height: 12px;
          background: #ffdfb2;
          margin-right: 10px;
        }
        > span {
          font-size: 12px;
          color: #9b9b9b;
          i {
            font-size: 12px;
            color: #121212;
          }
        }
      }
      > p {
        padding: 3px 8px;
        background: rgba(255, 150, 0, 0.1);
        border-radius: 5px;
        font-size: 12px;
        color: #ff9600;
        display: flex;
        align-items: center;
        font-weight: 600;
        margin-left: 8px;
        i {
          display: block;
          width: 16px;
          height: 16px;
          background-image: url("../../assets/img/iio/funds-box-line@2x.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .right {
    width: 450px;
  }
  .text {
    display: flex;
    justify-content: space-between;
    p {
      &:nth-of-type(1) {
        span {
          &:nth-of-type(1) {
            display: flex;
            align-items: center;
            i {
              display: block;
              width: 24px;
              height: 24px;
              background-image: url("../../assets/img/iio/coin-line@2x.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin-right: 4px;
            }
            font-size: 14px;
            color: #9b9b9b;
          }
          &:nth-of-type(2) {
            font-size: 16px;
            font-weight: bold;
            color: #121212;
            margin-top: 6px;
            display: block;
          }
        }
      }
      &:nth-of-type(2) {
        span {
          &:nth-of-type(1) {
            display: flex;
            align-items: center;
            i {
              display: block;
              width: 24px;
              height: 24px;
              background-image: url("../../assets/img/iio/hand-coin-line@2x.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin-right: 4px;
            }
            font-size: 14px;
            color: #9b9b9b;
          }
          &:nth-of-type(2) {
            font-size: 16px;
            font-weight: bold;
            color: #121212;
            margin-top: 6px;
            display: block;
          }
        }
      }
    }
  }
  .h5_text {
    display: none;
  }
  .share {
    margin-top: 40px;
    p {
      display: flex;
      align-items: center;
      i {
        display: block;
        width: 8px;
        height: 8px;
        margin-right: 6px;
      }
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          color: #9b9b9b;
          margin-right: 20px;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          color: #121212;
        }
      }
      &:nth-of-type(1) {
        margin-bottom: 15px;
        i {
          background: #ffdfb2;
          box-shadow: 0px 4px 8px 0px rgba(255, 150, 0, 0.2);
          border-radius: 50%;
        }
      }
      &:nth-of-type(2) {
        i {
          background: #ff9600;
          box-shadow: 0px 4px 8px 0px rgba(255, 150, 0, 0.6);
          border-radius: 50%;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .stepThree1 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .left {
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    > .shareChart {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      top: 15%;
      left: 60%;
      > div {
        > i {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: #ffdfb2;
          margin-right: 4px;
        }
        > span {
          font-size: 12px;
          color: #9b9b9b;
          i {
            font-size: 12px;
            color: #121212;
          }
        }
      }

      > p {
        margin-top: 5px;
        padding: 3px 8px;
        background: rgba(255, 150, 0, 0.1);
        border-radius: 5px;
        font-size: 12px;
        color: #ff9600;
        display: flex;
        align-items: center;
        font-weight: 600;
        i {
          display: block;
          width: 16px;
          height: 16px;
          background-image: url("../../assets/img/iio/funds-box-line@2x.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .right {
    width: 100%;
  }
  .text {
    display: flex;
    justify-content: space-between;
    width: 100%;
    p {
      &:nth-of-type(1) {
        text-align: left;
        span {
          &:nth-of-type(1) {
            display: flex;
            align-items: center;
            i {
              display: block;
              width: 24px;
              height: 24px;
              background-image: url("../../assets/img/iio/coin-line@2x.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin-right: 4px;
            }
            font-size: 14px;
            color: #9b9b9b;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            font-weight: bold;
            color: #121212;
            margin-top: 6px;
            display: block;
          }
        }
      }
      &:nth-of-type(2) {
        span {
          &:nth-of-type(1) {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            i {
              display: block;
              width: 24px;
              height: 24px;
              background-image: url("../../assets/img/iio/hand-coin-line@2x.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin-right: 4px;
            }
            font-size: 14px;
            color: #9b9b9b;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            font-weight: bold;
            color: #121212;
            margin-top: 6px;
            display: block;
          }
        }
      }
    }
  }
  .pc_text {
    display: none;
  }
  .share {
    p {
      display: flex;
      align-items: center;
      i {
        display: block;
        width: 8px;
        height: 8px;
        margin-right: 6px;
      }
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          color: #9b9b9b;
          margin-right: 20px;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          color: #121212;
        }
      }
      &:nth-of-type(1) {
        margin-bottom: 15px;
        i {
          background: #ffdfb2;
          box-shadow: 0px 4px 8px 0px rgba(255, 150, 0, 0.2);
          border-radius: 50%;
        }
      }
      &:nth-of-type(2) {
        i {
          background: #ff9600;
          box-shadow: 0px 4px 8px 0px rgba(255, 150, 0, 0.6);
          border-radius: 50%;
        }
      }
    }
  }
}
</style>