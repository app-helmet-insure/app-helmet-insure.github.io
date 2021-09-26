<template>
  <div class="stepTwo" v-if="iioPage === 'iio-id'">
    <div class="left">
      <div class="step_title">
        {{ $t("IIO.ActionTwo", { token: "i" + About.Token }) }}
      </div>
      <div class="step_details">
        <p class="text">
          <span> {{ $t("Table.MyDeposits") }}： </span>
          <span> {{ addCommom(showMsg.DepositedVolume, 4) }} LPT </span>
        </p>
        <p class="text">
          <span> {{ $t("Table.TotalDeposited") }}： </span>
          <span> {{ addCommom(showMsg.DepositeTotal, 4) }} LPT </span>
        </p>
        <p class="text">
          <span>{{ $t("Table.MyPoolShare") }}： </span>
          <span> {{ fixD(showMsg.MyPoolShare, 2) }}%</span>
        </p>
      </div>
      <button @click="toDeposite">
        {{ $t("IIO.StepTwoAction") }}
      </button>
    </div>
    <i></i>
    <div class="right">
      <p class="text">
        <span>{{ $t("IIO.Earn") }}： </span>
        <span>
          {{ fixD(showMsg.AvailableVolume, 8) }}
          <i
            class="under"
            @click="hadnleShowOnePager($event, 'i' + About.Token)"
          >
            i{{ About.Token }}</i
          >
        </span>
      </p>
      <button v-if="getRewardFlag" class="getReward" @click="getReward">
        <i :class="claimLoading ? 'loading_pic' : ''"></i
        >{{ $t("IIO.GetReward", { token: "i" + About.Token }) }}
      </button>
      <button
        v-else
        class="getReward"
        style="pointer-events: none; background: #cfcfd2"
      >
        {{ getRewardObj.day == "00" ? "" : getRewardObj.day + "d" }}
        {{ getRewardObj.hour == "00" ? "" : getRewardObj.hour + "h" }}
        {{ getRewardObj.minute == "00" ? "" : getRewardObj.minute + "m " }}
        {{ getRewardObj.second == "00" ? "" : getRewardObj.second + "s" }}
      </button>
      <div class="ContractAddress">
        <span>i{{ About.Token }} {{ $t("Table.ContractAddress") }}</span>
        <p>
          {{ About.LongAdress }}
          <i
            class="copy"
            id="copy_default"
            @click="copyAdress($event, About.LongAdress)"
          ></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  totalSupply,
  getLPTOKEN,
  getBalance,
  toDeposite,
} from "~/interface/deposite";
import { fixD, addCommom } from "~/assets/js/util.js";
import { getReward3, earned3, applied3 } from "~/interface/iio.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import { Information } from "../../config/iio.js";
import moment from "moment";
export default {
  data() {
    return {
      showMsg: {
        DepositeVolume: 0, 
        DepositedVolume: 0,
        DepositeTotal: 0,
        MyPoolShare: 0,
      },
      DepositeNum: "",
      claimLoading: false,
      getRewardFlag: false,
      addCommom,
      fixD,
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
    this.$bus.$on("CLAIM_LOADING_IIO_HELMETBNB_POOL", (data) => {
      this.claimLoading = false;
      this.getBalance();
    });
    this.getRewardTime();
    let timer1 = setTimeout(() => {
      this.getBalance();
    }, 1000);
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
    copyAdress(e, text) {
      let _this = this;
      let copys = new ClipboardJS(".copy", { text: () => text });
      copys.on("success", function (e) {
        Message({
          message: "Successfully copied",
          type: "success",
          // duration: 0,
        });
        copys.destroy();
      });
      copys.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
        copys.destroy();
      });
    },
    hadnleShowOnePager(e, onePager) {
      if (e.target.tagName === "I" && onePager) {
        this.$bus.$emit("OPEN_ONEPAGER", {
          showFlag: true,
          title: `What is $${onePager}?`,
          text: onePager,
        });
      } else {
        return;
      }
    },
    async getBalance() {
      let Name = this.iioType.toUpperCase();
      let reward_name = `IIO_HELMETBNB_${Name}`;
      let lpt_name = "IIO_HELMETBNB_POOL_LPT";
      let pool_name = "IIO_HELMETBNB_POOL";
      let DepositeVolume = await getBalance(lpt_name);
      let DepositedVolume = await getLPTOKEN(pool_name);
      let DepositeTotal = await totalSupply(pool_name);
      let AvailableVolume = await earned3(
        pool_name,
        reward_name,
        this.About.Decimals
      );

      this.showMsg.DepositeVolume = DepositeVolume;
      this.showMsg.DepositedVolume = DepositedVolume;
      this.showMsg.DepositeTotal = DepositeTotal;
      this.showMsg.AvailableVolume = AvailableVolume;
      this.showMsg.MyPoolShare = fixD(
        (DepositedVolume / DepositeTotal) * 100,
        2
      );
      if (DepositeVolume) {
        this.DepositeNum = fixD(DepositeVolume, 4);
      }
    },
    async getReward() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let Name = this.iioType.toUpperCase();
      let reward_name = `IIO_HELMETBNB_${Name}`;
      let pool_name = "IIO_HELMETBNB_POOL";
      let res = await getReward3(pool_name, reward_name);
    },
    getRewardTime() {
      let nowTime = new Date();
      let getTime = new Date(moment(this.About.Time1UTC)) * 1;
      let downTime = getTime - nowTime;
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
      if (nowTime > getTime) {
        this.getRewardFlag = true;
      }
    },
    toDeposite() {
      this.$router.push({ name: "mining", params: { earn: "helmet_cake_v2" } });
    },
  },
};
</script>

<style lang='scss' scped>
@import "~/assets/css/themes.scss";
.disable {
  pointer-events: none;
}
.loading_pic {
  display: block;
  width: 24px;
  height: 24px;
  background-image: url("../../assets/img/helmet/loading.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
}
@media screen and (min-width: 750px) {
  .ContractAddress {
    font-size: 14px;
    color: #fd7e14;
    margin-top: 8px;
    span {
      color: #fd7e14 !important;
    }
    p {
      display: flex;
      margin-top: 4px;
      align-items: center;
      font-weight: 550;
      font-size: 12px !important;
    }
    i {
      display: inline-block;
      width: 12px;
      height: 12px;
      background-image: url("../../assets/img/helmet/copy.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      margin-left: 4px;
      flex-shrink: 0;
    }
  }
  .stepTwo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    .left {
      width: 320px;
      .step_title {
        font-size: 18px;
        font-weight: 600;
        @include themeify {
          color: themed("color-121212");
        }
      }
      .step_details {
        margin-top: 12px;
        width: 320px;
        .text {
          margin-top: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 20px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 20px;
              display: flex;
              align-items: center;
            }
          }
        }
        > a {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          color: #ff9600;
          line-height: 20px;
          margin-top: 4px;
        }
      }
      button {
        margin-top: 20px;
        width: 100%;
        height: 40px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        @include themeify {
          background: themed("black_button");
        }
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          @include themeify {
            background: themed("black_button_hover");
          }
        }
      }
    }
    .right {
      width: 320px;
      .getReward {
        margin-top: 20px;
        width: 100%;
        height: 40px;
        background: #ff9600;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #ffa000;
        }
      }
      > a {
        display: inline-block;
        font-size: 14px;
        font-weight: 600;
        color: #ff9600;
        line-height: 20px;
        margin-top: 4px;
      }
      .text {
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 20px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 20px;
            font-weight: 600;
          }
        }
        .under {
          border-bottom: 2px dotted rgba(23, 23, 58, 0.45);
          cursor: pointer;
          &:hover {
            color: #fd7e14;
            border-bottom: 2px dotted #fd7e14;
          }
        }
      }
    }
    > i {
      display: flex;
      width: 1px;
      height: 246px;
      @include themeify {
        background: themed("color-e8e8eb");
      }
      margin: 0 80px;
    }
  }
}
@media screen and (max-width: 750px) {
  .ContractAddress {
    font-size: 12px;
    color: #fd7e14;
    margin-top: 8px;
    span {
      color: #fd7e14 !important;
    }
    p {
      display: flex;
      margin-top: 4px;
      align-items: center;
      font-weight: 550;
      font-size: 12px !important;
    }
    i {
      display: inline-block;
      width: 12px;
      height: 12px;
      background-image: url("../../assets/img/helmet/copy.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      margin-left: 4px;
      flex-shrink: 0;
    }
  }
  .stepTwo {
    width: 100%;
    .step_title {
      font-size: 14px;
      font-weight: 600;
      @include themeify {
        color: themed("color-121212");
      }
    }
    .step_action {
      > span {
        font-size: 14px;
        font-weight: 600;
        @include themeify {
          color: themed("color-17173a");
        }
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
            @include themeify {
              color: themed("color-17173a");
            }
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
            @include themeify {
              background: themed("color-f8f9fa");
            }
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
            @include themeify {
              color: themed("color-17173a");
            }
            right: 15px;
            cursor: pointer;
          }
        }
      }
    }
    .step_details {
      margin-top: 20px;
      .text {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 20px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 20px;
          }
        }
      }
      > a {
        display: block;
        margin-top: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #ff9600;
        line-height: 20px;
      }
    }
    button {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      @include themeify {
        background: themed("black_button");
      }
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        @include themeify {
          background: themed("black_button_hover");
        }
      }
    }
    .getReward {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      background: #ff9600;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #ffa000;
      }
    }
    > i {
      display: block;
      width: 100%;
      height: 1px;
      border: 1px dashed #ebe9e3;
      margin-top: 10px;
    }
    .right {
      margin-top: 10px;
      .text {
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 20px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 20px;
            font-weight: 600;
          }
        }
        .under {
          border-bottom: 2px dotted rgba(23, 23, 58, 0.45);
          cursor: pointer;
          &:hover {
            color: #fd7e14;
            border-bottom: 2px dotted #fd7e14;
          }
        }
      }
    }
  }
}
</style>