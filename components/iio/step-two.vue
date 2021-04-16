<template>
  <div class="stepTwo">
    <div class="left">
      <div class="step_title">{{ $t("IIO.ActionTwo", { name: "Token" }) }}</div>
      <div class="step_action">
        <label>
          <p>
            <span>{{ $t("Table.AmountDeposit") }}</span>
            <span>
              {{ showMsg.DepositeVolume }} LPT {{ $t("Table.DAvailable") }}
            </span>
          </p>
          <div class="input">
            <input type="text" v-model="DepositeNum" />
            <span @click="DepositeNum = showMsg.DepositeVolume">
              {{ $t("Table.Max") }}
            </span>
          </div>
        </label>
        <button @click="toDeposite" :class="stakeLoading ? 'disable ' : ''">
          <i :class="stakeLoading ? 'loading_pic' : ''"></i>
          {{ $t("Table.ConfirmDeposit") }}
        </button>
      </div>
      <div class="step_details">
        <p class="text">
          <span> {{ $t("Table.MyDeposits") }}： </span>
          <span> {{ showMsg.DepositedVolume }} LPT </span>
        </p>
        <p class="text">
          <span> {{ $t("Table.TotalDeposited") }}： </span>
          <span> {{ showMsg.DepositeTotal }} LPT </span>
        </p>
        <p class="text">
          <span>{{ $t("Table.MyPoolShare") }}： </span>
          <span> {{ showMsg.MyPoolShare }}%</span>
        </p>
        <a
          href="https://exchange.pancakeswap.finance/?_gl=1*zq5iue*_ga*MTYwNTE3ODIwNC4xNjEwNjQzNjU4*_ga_334KNG3DMQ*MTYxMDk0NjUzNC4yMy4wLjE2MTA5NDY1MzUuMA..#/add/ETH/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
          target="_blank"
          >Get HELMET-BNB LPT</a
        >
      </div>
    </div>
    <i></i>
    <div class="right">
      <p class="text">
        <span>{{ $t("IIO.Earn") }}： </span>
        <span>
          {{ showMsg.AvailableVolume }}
          <i class="under" @click="hadnleShowOnePager($event, 'iTOKEN')">
            iTOKEN</i
          >
        </span>
      </p>
      <button v-if="getRewardFlag" class="getReward" @click="getReward">
        <i :class="claimLoading ? 'loading_pic' : ''"></i
        >{{ $t("IIO.GetReward") }}
      </button>
      <button
        v-else
        class="getReward"
        style="pointer-events: none; background: #cfcfd2"
      >
        {{ getRewardObj.hour == "00" ? "" : getRewardObj.hour + "d" }}
        {{ getRewardObj.hour == "00" ? "" : getRewardObj.hour + "h" }}
        {{ getRewardObj.minute == "00" ? "" : getRewardObj.minute + "m " }}
        {{ getRewardObj.second == "00" ? "" : getRewardObj.second + "s" }}
      </button>
      <div class="ContractAddress">
        <span>iTOKEN {{ $t("Table.ContractAddress") }}</span>
        <p>
          0xDe5C32b056Da3FB485D559dAdA847D7c747Db7f5
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0xDe5C32b056Da3FB485D559dAdA847D7c747Db7f5')
            "
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
import { fixD } from "~/assets/js/util.js";
import { getReward3, earned3, applied3 } from "~/interface/iio.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
export default {
  data() {
    return {
      showMsg: {
        DepositeVolume: 0, //可抵押
        DepositedVolume: 0, //已抵押
        DepositeTotal: 0, //总抵押
        MyPoolShare: 0, //我的池子份额
      },
      DepositeNum: "",
      stakeLoading: false,
      claimLoading: false,
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
    this.$bus.$on("DEPOSITE_LOADING_IIO_HELMETBNB_POOL", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_IIO_HELMETBNB_POOL", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_IIO_HELMETBNB_POOL", () => {
      this.getBalance();
    });
    this.$bus.$on("REFRESH_MINING", (data) => {
      this.getBalance();
    });
    this.getRewardTime();
    setTimeout(() => {
      this.getBalance();
    }, 1000);
    setInterval(() => {
      setTimeout(() => {
        this.getRewardTime();
      });
    }, 1000);
  },
  methods: {
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
        console.log(1);
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
      let lpt_name = "IIO_HELMETBNB_POOL_LPT";
      let pool_name = "IIO_HELMETBNB_POOL";
      // 可抵押数量
      let DepositeVolume = await getBalance(lpt_name);
      // 已抵押数量
      let DepositedVolume = await getLPTOKEN(pool_name);
      // 总抵押
      let DepositeTotal = await totalSupply(pool_name);
      // 可领取
      let AvailableVolume = await earned3(pool_name);

      this.showMsg.DepositeVolume = fixD(DepositeVolume, 4);
      this.showMsg.DepositedVolume = fixD(DepositedVolume, 4);
      this.showMsg.DepositeTotal = fixD(DepositeTotal, 4);
      this.showMsg.AvailableVolume = fixD(AvailableVolume, 8);
      this.showMsg.MyPoolShare = fixD(
        (DepositedVolume / DepositeTotal) * 100,
        2
      );
      if (DepositeVolume) {
        this.DepositeNum = fixD(DepositeVolume, 4);
      }
    },
    // 领取奖励
    async getReward() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let pool_name = "IIO_HELMETBNB_POOL";
      let res = await getReward3(pool_name);
    },
    getRewardTime() {
      let nowTime = new Date() * 1;
      let getTime = new Date("2021/04/16 16:00");
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
    // 抵押
    toDeposite() {
      if (!this.DepositeNum) {
        return;
      }
      if (this.stakeLoading) {
        return;
      }
      this.stakeLoading = true;
      let type = "IIO_HELMETBNB_POOL";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {});
    },
  },
};
</script>

<style lang='scss' scped>
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
        color: #121212;
      }
      .step_action {
        > label {
          > p {
            margin: 20px 0 10px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              font-size: 14px;
              color: #17173a;
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
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            background: #2c2c2c;
          }
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
              color: #17173a;
              line-height: 20px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              color: #121212;
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
        color: #ffffff;
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
            color: #17173a;
            line-height: 20px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            color: #121212;
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
      background: #e8e8eb;
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
            color: #17173a;
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
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #2c2c2c;
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
            color: #17173a;
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
        display: block;
        margin-top: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #ff9600;
        line-height: 20px;
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
      color: #ffffff;
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
            color: #17173a;
            line-height: 20px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            color: #121212;
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