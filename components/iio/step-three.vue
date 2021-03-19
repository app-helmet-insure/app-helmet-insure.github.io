<template>
  <div class="stepThree">
    <div class="text h5_text">
      <p>
        <span><i></i>可兑换总量</span>
        <span>100000.00 HELMET</span>
      </p>
      <p>
        <span><i></i>预计可获得</span>
        <span>2323.232 HELMET</span>
      </p>
    </div>
    <PieEchart></PieEchart>
    <div class="right">
      <div class="text pc_text">
        <p>
          <span><i></i>可兑换总量</span>
          <span>100000.00 HELMET</span>
        </p>
        <p>
          <span><i></i>预计可获得</span>
          <span>2323.232 HELMET</span>
        </p>
      </div>
      <div class="share">
        <p><i></i><span>我的抵押</span><span>1233.12 LPT</span></p>
        <p><i></i><span>总抵押量</span><span>11233.12 LPT</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import PieEchart from "./pie-echart";
export default {
  components: {
    PieEchart,
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .stepThree {
    padding: 0 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .stepThree {
    display: flex;
    flex-direction: column;
    align-items: center;
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
</style>