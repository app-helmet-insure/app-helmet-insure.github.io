<template>
  <div class="stepOne">
    <div class="step_title">{{ $t("IIO.ActionOne", { name: "Token" }) }}</div>
    <div class="step_action">
      <p class="step_buy">
        <span>
          <i>{{ $t("Content.UsableBalance") }}:</i> {{ Balance }} HELMET</span
        >
        <a href="https://exchange.pancakeswap.finance/#/swap" target="_blank"
          >{{ $t("IIO.Get") }} HELMET</a
        >
      </p>
      <div class="input">
        <h3>{{ PassportPrice }}HELMET</h3>
        <span>{{ $t("IIO.OneTicket") }}</span>
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
        {{ $t("IIO.BuyTokenTicket") }}
      </button>
      <button v-if="getRewardFlag == true" @click="BuyPassport">
        {{ $t("IIO.BuyTokenTicket") }}
      </button>
      <p class="tips">{{ $t("IIO.Tip2") }}</p>
    </div>
  </div>
</template>

<script>
import { ticketVol3, applyReward3 } from "~/interface/iio";
import { getBalance } from "~/interface/deposite";
import { fixD } from "~/assets/js/util.js";
export default {
  data() {
    return {
      PassportPrice: 0,
      Balance: 0,
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
    setTimeout(() => {
      this.getPassPortPrice();
    }, 1000);
    this.$bus.$on("REFRESH_IIO_HELMETBNB_POOL", () => {
      this.getPassPortPrice();
      this.$bus.$emit("JUMP_STEP", { step: 2 });
      this.$bus.$emit("GET_FLAG");
    });
    this.getRewardTime();
    setInterval(() => {
      setTimeout(() => {
        this.getRewardTime();
      });
    }, 1000);
  },
  methods: {
    async getPassPortPrice() {
      let ContractAdress = "IIO_HELMETBNB_POOL";
      let TicketAddress = "IIO_HELMETBNB_TICKET";
      let RewardAddress = "IIO_HELMETBNB_REWARD";
      let price = await ticketVol3(ContractAdress, RewardAddress);
      let balance = await getBalance(TicketAddress);
      this.PassportPrice = price;
      this.Balance = fixD(balance, 4);
    },
    async BuyPassport() {
      let ContractAdress = "IIO_HELMETBNB_POOL";
      let TicketAddress = "IIO_HELMETBNB_TICKET";
      let data = {
        ContractAdress,
        TicketAddress,
        PassportPrice: this.PassportPrice,
      };
      let object = {
        title: "WARNING",
        layout: "layout1",
        activeTip: true,
        loading: false,
        button: true,
        conText: `<span>It will cost ${this.PassportPrice} HELMET for the Ticket</span>`,
        buttonText: "Confirm",
        showDialog: true,
      };
      this.$bus.$emit("OPEN_STATUS_DIALOG", object);
      this.$bus.$on("PROCESS_ACTION", (res) => {
        if (res) {
          applyReward3(data, () => {});
        }
        data = {};
        return;
      });
    },
    getRewardTime() {
      let nowTime = Date.now();
      let startTime = Date.parse("2021/04/19 21:00");
      let endTime = Date.parse("2021/04/23 21:00");
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
      > .step_buy {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        span {
          font-size: 14px;
          line-height: 14px;
          color: #121212;
          i {
            color: rgba(23, 23, 58, 0.4);
          }
        }
        a {
          font-size: 14px;
          font-weight: 600;
          color: #ff9600;
        }
      }

      .input {
        margin-top: 10px;
        width: 100%;
        height: 96px;
        position: relative;
        align-items: center;
        background-image: url("../../assets/img/iio/ticket_bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          font-size: 20px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 500;
          color: #17173a;
          line-height: 25px;
        }
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(23, 23, 58, 0.4);
          line-height: 20px;
          margin-top: 4px;
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
      .text {
        margin-top: 4px;
        font-size: 14px;
        color: #17173a;
      }
      .tips {
        margin-top: 8px;
        font-size: 14px;
        color: rgba(23, 23, 58, 0.4);
        text-align: center;
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
      > .step_buy {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        span {
          font-size: 12px;
          color: #121212;
          i {
            color: rgba(23, 23, 58, 0.4);
          }
        }
        a {
          font-size: 12px;
          color: #ff9600;
        }
      }
      .input {
        margin-top: 10px;
        width: 100%;
        height: 96px;
        position: relative;
        align-items: center;
        background-image: url("../../assets/img/iio/ticket_bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          font-size: 20px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 500;
          color: #17173a;
          line-height: 25px;
        }
        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(23, 23, 58, 0.4);
          line-height: 20px;
          margin-top: 4px;
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
      .text {
        margin-top: 4px;
        font-size: 12px;
        color: #17173a;
      }
      .tips {
        margin-top: 8px;
        font-size: 12px;
        text-align: center;
        color: rgba(23, 23, 58, 0.4);
      }
    }
  }
}
</style>