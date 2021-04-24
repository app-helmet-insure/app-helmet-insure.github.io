<template>
  <div class="stepThree">
    <div class="step_title">{{ $t("IIO.ActionThree") }}</div>
    <p
      v-html="
        $t('IIO.CanGetReward', {
          time1: 'Apr.23rd 21:00',
          time2: 'Apr.24th 21:00',
          name: 'TOKEN',
        })
      "
      @click="toHome($event)"
    ></p>
    <div class="step_action">
      <div class="step_myaccount">
        <p>
          <span>{{ $t("IIO.CanSwapToken", { name: "iTOKEN" }) }}</span>
          <span>{{ fixD(AvailableVolume, 8) }} iTOKEN</span>
        </p>
        <p>
          <span>{{ $t("IIO.Balance") }}</span>
          <span>{{ fixD(SwapBalance, 8) }} BUSD</span>
        </p>
      </div>
      <div class="rewardDetail">
        <div>
          <p>
            <span>{{ $t("IIO.CanSwapToken", { name: "iTOKEN" }) }}</span
            ><span>{{ fixD(AvailableVolume, 8) }} iTOKEN</span>
          </p>
          <p>
            <span>{{ $t("IIO.SwapTokened") }}</span
            ><span>{{ fixD(AvailableVolume, 8) }} TOKEN</span>
          </p>
          <p>
            <span>{{ $t("IIO.Speed") }}</span
            ><span>{{ fixD(swapAssets, 8) }} BUSD</span>
          </p>
        </div>
      </div>

      <button
        v-if="getRewardFlag == 'soon'"
        style="pointer-events: none; background: #cfcfd2"
      >
        {{ getRewardObj.day == "00" ? "" : getRewardObj.day + "d" }}
        {{ getRewardObj.hour == "00" ? "" : getRewardObj.hour + "h" }}
        {{ getRewardObj.minute == "00" ? "" : getRewardObj.minute + "m " }}
        {{ getRewardObj.second == "00" ? "" : getRewardObj.second + "s" }}
      </button>
      <button
        v-if="getRewardFlag == 'expired'"
        class="getReward"
        style="pointer-events: none; background: #cfcfd2"
      >
        {{ $t("IIO.Swap") }}
      </button>
      <button
        v-if="getRewardFlag == true"
        class="getReward"
        @click="swapActive"
      >
        {{ $t("IIO.Swap") }}
      </button>
    </div>
  </div>
</template>

<script>
import { getBalance } from "~/interface/deposite.js";
import { fixD } from "~/assets/js/util.js";
import { getTokenName } from "~/assets/utils/address-pool.js";
import { onExercise } from "~/interface/order.js";
import precision from "~/assets/js/precision.js";
import { applied3 } from "~/interface/iio.js";

export default {
  data() {
    return {
      AvailableVolume: 0,
      SwapBalance: 0,
      swapAssets: 0,
      fixD,
      getRewardFlag: false,
      getRewardObj: {
        day: "00",
        hour: "00",
        minute: "00",
        second: "00",
      },
    };
  },
  mounted() {
    this.$bus.$on("REFRESH_ALL_DATA", () => {
      this.getBalance();
    });
    setTimeout(() => {
      this.getBalance();
    }, 1000);
    this.getRewardTime();
    setInterval(() => {
      setTimeout(() => {
        this.getRewardTime();
      });
    }, 1000);
  },
  methods: {
    toHome(e) {
      if (e.target.tagName === "I") {
        this.$router.push("/MyPolicy");
      }
    },
    async getBalance() {
      let TicketAddress = "IIO_HELMETBNB_TICKET";
      let RewardAddress = "IIO_HELMETBNB_REWARD";
      let AvailableVolume = await getBalance(RewardAddress);
      let SwapBalance = await getBalance(
        "0xe9e7cea3dedca5984780bafc599bd69add087d56"
      );
      this.AvailableVolume = AvailableVolume;
      this.SwapBalance = SwapBalance;
      this.swapAssets = AvailableVolume * 0.3;
    },
    getRewardTime() {
      let nowTime = Date.now();
      let startTime = Date.parse("2021/04/23 13:00 UTC");
      let endTime = Date.parse("2021/04/24 13:00 UTC");
      let downTime = startTime - nowTime;
      let day = Math.floor(downTime / (24 * 3600000));
      let hour = Math.floor((downTime - day * 24 * 3600000) / 3600000);
      let minute = Math.floor(
        (downTime - day * 24 * 3600000 - hour * 3600000) / 60000
      );
      let second = Math.floor(
        (downTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      );
      let getRewardObj = {
        day: day > 9 ? day : "0" + day,
        hour: hour > 9 ? hour : "0" + hour,
        minute: minute > 9 ? minute : "0" + minute,
        second: second > 9 ? second : "0" + second,
      };
      this.getRewardObj = getRewardObj;

      if (nowTime > startTime && nowTime < endTime) {
        this.getRewardFlag = true;
      } else if (nowTime < startTime) {
        this.getRewardFlag = "soon";
      } else {
        this.getRewardFlag = "expired";
      }
    },
    async swapActive() {
      let data = {
        token: getTokenName("0xe9e7cea3dedca5984780bafc599bd69add087d56"),
        _underlying_vol: precision.times(0.3, this.AvailableVolume),
        vol: this.AvailableVolume,
        long: "0x029A09ABE791a3Be60Aa64d569F4C34890f24097", //奖励地址
        _underlying: getTokenName("0xe9e7cea3dedca5984780bafc599bd69add087d56"),
        _collateral: getTokenName("0x3b73c1b2ea59835cbfcadade5462b6ab630d9890"),
        settleToken: getTokenName("0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"),
        flag: true,
        approveAddress1: "FACTORY",
        approveAddress2: "",
        unit: "",
        showVolume: this.AvailableVolume,
      };
      this.$bus.$emit("OPEN_STATUS_DIALOG", {
        title: "WARNING",
        layout: "layout1",
        conText: `<p>you will swap<span> ${fixD(data._underlying_vol, 8)} ${
          data._underlying
        }</span> to <span> ${fixD(data.showVolume, 8)} ${
          data._collateral
        }</span></p>`,
        activeTip: true,
        loading: false,
        button: true,
        buttonText: "Confirm",
        showDialog: true,
      });
      this.$bus.$on("PROCESS_ACTION", (res) => {
        if (res) {
          onExercise(data, data.flag);
        }
        data = {};
      });
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
      color: rgba(23, 23, 58, 0.4);
      margin-top: 20px;
      span {
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
              line-height: 14px;
              color: rgba(23, 23, 58, 0.4);
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
        background: #f8f9fa;
        margin-top: 16px;
        padding: 12px 10px;
        display: flex;
        align-items: flex-start;
        > i {
          display: block;
          width: 20px;
          height: 20px;
          background-image: url("../../assets/img/iio/information.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          flex-shrink: 0;
        }
        div {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin-left: 4px;
          p {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 10px;
            &:nth-of-type(1) {
              margin-top: 4px;
            }
            span {
              display: block;
              font-size: 14px;
              &:nth-of-type(1) {
                font-size: 14px;
                font-family: IBMPlexSans;
                color: rgba(23, 23, 58, 0.4);
                line-height: 14px;
              }
              &:nth-of-type(2) {
                font-size: 14px;
                font-family: IBMPlexSans-Bold, IBMPlexSans;
                font-weight: bold;
                color: #17173a;
                line-height: 14px;
              }
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
      color: rgba(23, 23, 58, 0.4);
      margin-top: 20px;
      line-height: 20px;
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
              color: rgba(23, 23, 58, 0.4);
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
        background: #f8f9fa;
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
          flex-shrink: 0;
        }
        div {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin-left: 4px;
          p {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 10px;
            &:nth-of-type(1) {
              margin: 0;
            }
            span {
              display: block;
              font-size: 14px;
              &:nth-of-type(1) {
                font-size: 14px;
                font-family: IBMPlexSans;
                color: rgba(23, 23, 58, 0.4);
                line-height: 14px;
              }
              &:nth-of-type(2) {
                font-size: 14px;
                font-family: IBMPlexSans-Bold, IBMPlexSans;
                font-weight: bold;
                color: #17173a;
                line-height: 14px;
              }
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