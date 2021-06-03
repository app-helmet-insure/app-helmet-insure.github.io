<template>
  <div class="stepThree" v-if="iioPage === 'iio-id'">
    <div class="step_title">{{ $t("IIO.ActionThree") }}</div>
    <p
      v-html="
        $t('IIO.CanGetReward', {
          time1: About.Time2,
          time2: About.Time3,
          name: About.Token,
        })
      "
      @click="toHome($event)"
    ></p>
    <div class="step_action">
      <div class="step_myaccount">
        <p>
          <span>{{ $t("IIO.CanSwapToken", { name: "i" + About.Token }) }}</span>
          <span>{{ fixD(AvailableVolume, 8) }} i{{ About.Token }}</span>
        </p>
        <p>
          <span>{{ $t("IIO.Balance") }}</span>
          <span>{{ fixD(SwapBalance, 8) }} BUSD</span>
        </p>
      </div>
      <div class="rewardDetail">
        <div>
          <p>
            <span>{{
              $t("IIO.CanSwapToken", { name: "i" + About.Token })
            }}</span
            ><span>{{ fixD(AvailableVolume, 8) }} i{{ About.Token }}</span>
          </p>
          <p>
            <span>{{ $t("IIO.SwapTokened") }}</span
            ><span>{{ fixD(AvailableVolume, 8) }} {{ About.Token }}</span>
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
import { getBalance, applied3 } from "~/interface/iio.js";
import { fixD } from "~/assets/js/util.js";
import { getTokenName } from "~/assets/utils/address-pool.js";
import { onExercise } from "~/interface/order.js";
import precision from "~/assets/js/precision.js";
import Information from "./iio_information.js";
import moment from "moment";

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
      About: [],
    };
  },
  mounted() {
    let name = this.$route.params.id;
    this.About = Information[name];
    let timer1 = setTimeout(() => {
      this.getBalance();
      clearTimeout();
    }, 1000);
    this.getRewardTime();
    let timer2 = setInterval(() => {
      this.getRewardTime();
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    });
  },
  watch: {
    iioType: {
      handler: "WatchIIOType",
      immediate: true,
    },
  },
  computed: {
    iioType() {
      return this.$route.params.id;
    },
    iioPage() {
      return this.$route.name;
    },
  },
  methods: {
    WatchIIOType(newValue, oldValue) {
      this.About = Information[newValue];
    },
    toHome(e) {
      if (e.target.tagName === "I") {
        this.$router.push("/MyPolicy");
      }
    },
    async getBalance() {
      let Name = this.iioType.toUpperCase();
      let RewardAddress = `IIO_HELMETBNB_${Name}`;
      let AvailableVolume = await getBalance(
        RewardAddress,
        this.About.Decimals
      );
      console.log(AvailableVolume);
      let SwapBalance = await getBalance(
        "0xe9e7cea3dedca5984780bafc599bd69add087d56"
      );
      this.AvailableVolume = AvailableVolume;
      this.SwapBalance = SwapBalance;
      this.swapAssets = AvailableVolume * this.About.ActivePrice;
    },
    getRewardTime() {
      let nowTime = new Date();
      let startTime = new Date(moment(this.About.Time2UTC)) * 1;
      let endTime = new Date(moment(this.About.Time3UTC)) * 1;
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
        token: getTokenName(this.About.Underlying),
        _underlying_vol: precision.times(
          this.About.ActivePrice,
          this.AvailableVolume
        ),
        vol: this.AvailableVolume,
        long: this.About.LongAdress, //奖励地址
        _underlying: getTokenName(this.About.Underlying),
        _collateral: getTokenName(this.About.Collateral),
        settleToken: getTokenName("0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"),
        flag: true,
        approveAddress1: "FACTORY",
        approveAddress2: "",
        unit: this.About.Decimals == 18 ? "" : this.About.Decimals,
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
        activeTipText1: "Please double check the price above，",
        activeTipText2: "Helmet team will not cover your loss on this.",
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
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .stepThree {
    width: 420px;
    margin: 0 auto;
    .step_title {
      font-size: 18px;
      font-weight: 600;
      @include themeify {
        color: themed("color-121212");
      }
    }
    > p {
      width: 466px;
      font-size: 14px;
      @include themeify {
        color: lighten($color: themed("color-17173a"), $amount: 0.4);
      }
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
              @include themeify {
                color: lighten($color: themed("color-17173a"), $amount: 0.4);
              }
            }
            &:nth-of-type(2) {
              margin-top: 8px;
              font-size: 16px;
              font-weight: bold;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 18px;
            }
          }
        }
      }
      .rewardDetail {
        width: 100%;
        @include themeify {
          color: themed("color-f8f9fa");
        }
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
                @include themeify {
                  color: lighten($color: themed("color-17173a"), $amount: 0.4);
                }
                line-height: 14px;
              }
              &:nth-of-type(2) {
                font-size: 14px;
                font-family: IBMPlexSans-Bold, IBMPlexSans;
                font-weight: bold;
                @include themeify {
                  color: themed("color-17173a");
                }
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
        @include themeify {
          background: themed("color-121212");
        }
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        @include themeify {
          color: themed("color-ffffff");
        }
        &:hover {
          @include themeify {
            background: themed("color-2c2c2c");
          }
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
      @include themeify {
        color: themed("color-121212");
      }
    }
    > p {
      width: 100%;
      font-size: 12px;
      @include themeify {
        color: lighten($color: themed("color-17173a"), $amount: 0.4);
      }
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
              @include themeify {
                color: lighten($color: themed("color-17173a"), $amount: 0.4);
              }
              line-height: 16px;
            }
            &:nth-of-type(2) {
              margin-top: 8px;
              font-size: 14px;
              font-weight: bold;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 14px;
            }
          }
        }
      }
      .rewardDetail {
        width: 100%;
        @include themeify {
          background: themed("color-f8f9fa");
        }
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
                @include themeify {
                  color: lighten($color: themed("color-17173a"), $amount: 0.4);
                }
                line-height: 14px;
              }
              &:nth-of-type(2) {
                font-size: 14px;
                font-family: IBMPlexSans-Bold, IBMPlexSans;
                font-weight: bold;
                @include themeify {
                  background: themed("color-17173a");
                }
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
        @include themeify {
          color: themed("color-ffffff");
        }
        &:hover {
          @include themeify {
            background: themed("color-2c2c2c");
          }
        }
      }
    }
  }
}
</style>