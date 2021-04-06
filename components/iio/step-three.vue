<template>
  <div class="stepThree">
    <div class="step_title">兑换TOKEN</div>
    <p>
      你可在<span>2021-04-12 00:00</span>前在此兑换 Matter, 也可以在<i
        @click="toHome"
        >我的保单</i
      >页面兑换
    </p>
    <div class="step_action">
      <div class="step_myaccount">
        <p>
          <span>待兑换</span>
          <span>{{ AvailableVolume }} HELMET</span>
        </p>
        <p>
          <span>余额</span>
          <span>11</span>
        </p>
      </div>
      <div class="rewardDetail">
        <i></i>
        <p>
          <span
            >当前待兑换 <i>100 iMatter</i>, 共可兑换 <i>100 Matter</i>
          </span>
          <span>需要支付 <i>12.33333 BNB</i></span>
        </p>
      </div>
      <button @click="getReward">兑换</button>
    </div>
  </div>
</template>

<script>
import { getReward3, earned3 } from "~/interface/iio.js";
import { fixD } from "~/assets/js/util.js";
export default {
  data() {
    return {
      AvailableVolume: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.getBalance();
    }, 1000);
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
    async getBalance() {
      let pool_name = "IIO_HELMETBNB_POOL";
      let AvailableVolume = await earned3(pool_name);
      this.AvailableVolume = fixD(AvailableVolume, 4);
    },
    async getReward() {
      let pool_name = "IIO_HELMETBNB_POOL";
      let res = await getReward3(pool_name);
    },
  },
};
</script>

<style lang='scss' scped>
@media screen and (min-width: 750px) {
  .stepThree {
    width: 420px;
    margin: 0 auto;
    .step_title {
      font-size: 18px;
      font-weight: 600;
      color: #121212;
    }
    > p {
      width: 466px;
      font-size: 14px;
      color: #9b9b9b;
      margin-top: 20px;
      span {
        color: #121212;
        margin: 0 3px;
      }
      i {
        color: #ff9600;
        cursor: pointer;
      }
    }
    .step_action {
      .step_myaccount {
        margin-top: 20px;
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
      .rewardDetail {
        width: 100%;
        background: #ededf0;
        margin-top: 16px;
        padding: 12px 10px;
        display: flex;
        align-items: flex-start;
        > i {
          display: block;
          width: 16px;
          height: 16px;
          background-image: url("../../assets/img/iio/information.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
        }
        p {
          margin-left: 4px;
          span {
            display: block;
            font-size: 14px;
            color: #9b9b9b;
            line-height: 16px;
            i {
              color: #121212;
            }
            &:nth-of-type(2) {
              margin-top: 8px;
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
@media screen and (max-width: 750px) {
  .stepThree {
    width: 100%;
    .step_title {
      font-size: 14px;
      font-weight: 600;
      color: #121212;
    }
    > p {
      width: 100%;
      font-size: 12px;
      color: #9b9b9b;
      margin-top: 20px;
      line-height: 20px;
      span {
        color: #121212;
        margin: 0 3px;
      }
      i {
        color: #ff9600;
        cursor: pointer;
      }
    }
    .step_action {
      .step_myaccount {
        margin-top: 10px;
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
              font-size: 12px;
              color: #9b9b9b;
              line-height: 16px;
            }
            &:nth-of-type(2) {
              margin-top: 8px;
              font-size: 14px;
              font-weight: bold;
              color: #121212;
              line-height: 14px;
            }
          }
        }
      }
      .rewardDetail {
        width: 100%;
        background: #ededf0;
        margin-top: 16px;
        padding: 12px 10px;
        display: flex;
        align-items: flex-start;
        > i {
          display: block;
          width: 14px;
          height: 14px;
          background-image: url("../../assets/img/iio/information.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
        }
        p {
          margin-left: 4px;
          span {
            display: block;
            font-size: 12px;
            color: #9b9b9b;
            line-height: 14px;
            i {
              color: #121212;
            }
            &:nth-of-type(2) {
              margin-top: 8px;
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