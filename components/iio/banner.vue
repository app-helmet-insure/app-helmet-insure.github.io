<template>
  <div class="iio_banner">
    <div class="iio_wrap">
      <h3 class="iio_title">{{ $t("IIO.Pool", { name: "XXX" }) }}</h3>
      <div class="iio_address">
        0x5d03b2f490cD40bc9859EB13193C2f711583560E
        <i
          class="copy"
          id="copy_default"
          @click="
            copyAdress($event, '0x5d03b2f490cD40bc9859EB13193C2f711583560E')
          "
        ></i>
      </div>
      <span class="ioo_tips">{{ $t("IIO.Tip") }}</span>
      <div class="ioo_details">
        <div class="wrap">
          <p>
            <span>{{ $t("IIO.ActiveNumber") }}</span>
            <span>1000 人</span>
          </p>
          <i></i>
          <p>
            <span>{{ $t("IIO.TotalSupply") }}</span>
            <span>100000 MATTER</span>
          </p>
          <i></i>
        </div>
        <div class="tip" v-if="!ticketFlag">
          <i></i>{{ $t("IIO.NoTicket") }}，<span @click="toStep1"
            >{{ $t("IIO.BuyTicket") }} ></span
          >
        </div>
        <div class="tip" v-if="ticketFlag">
          <i></i>{{ $t("IIO.HaveTicket") }}，<span @click="toStep2"
            >{{ $t("IIO.AddShare") }} ></span
          >
        </div>
        <div class="wrap">
          <p>
            <span>{{ $t("IIO.TotalValue") }}</span>
            <span>{{ showMsg.DepositeValue }} USD</span>
          </p>
          <i></i>
          <p>
            <span>{{ $t("IIO.MyStake") }}</span>
            <span>{{ showMsg.DepositedVolume }} LPT</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
import Message from "~/components/common/Message";
import { totalSupply, getLPTOKEN } from "~/interface/deposite";
import { fixD, addCommom } from "~/assets/js/util.js";
import { getLongValue } from "~/interface/event.js";
import { toWei, fromWei } from "~/assets/utils/web3-fun.js";
import { applied3 } from "~/interface/iio.js";
export default {
  data() {
    return {
      showMsg: {
        DepositedVolume: 0,
        DepositeValue: 0,
      },
      ticketFlag: false,
    };
  },
  mounted() {
    this.$bus.$on("REFRESH_IIO_HELMETBNB_POOL", () => {
      this.getBalance();
      this.buyAppliedFlag();
    });
    setTimeout(() => {
      this.getBalance();
      this.buyAppliedFlag();
    }, 1000);
  },
  methods: {
    toStep1() {
      this.$bus.$emit("JUMP_STEP", { step: 1 });
    },
    toStep2() {
      this.$bus.$emit("JUMP_STEP", { step: 2 });
    },
    async buyAppliedFlag() {
      let reward_name = "IIO_HELMETBNB_REWARD";
      let pool_name = "IIO_HELMETBNB_POOL";
      let res = await applied3(pool_name, reward_name);
      this.ticketFlag = res;
    },
    async getBalance() {
      let lpt_name = "IIO_HELMETBNB_POOL_LPT";
      let pool_name = "IIO_HELMETBNB_POOL";
      // 已抵押数量
      let DepositedVolume = await getLPTOKEN(pool_name);
      // 总抵押
      let DepositeTotal = await totalSupply(pool_name);
      let obj = [
        { "0x6411310c07d8c48730172146fd6f31fa84034a8b": toWei(DepositeTotal) },
      ];
      getLongValue(obj).then((res) => {
        let DepositeValue =
          res.data[0]["0x6411310c07d8c48730172146fd6f31fa84034a8b"];
        this.showMsg.DepositeValue = addCommom(DepositeValue, 2);
      });
      this.showMsg.DepositedVolume = addCommom(DepositedVolume, 2);
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
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .iio_banner {
    width: 100%;
    height: 420px;
    background: url("../../assets/img/iio/iio_header_bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .iio_wrap {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .iio_title {
    font-size: 40px;
    font-weight: 600;
    color: #121212;
    text-align: center;
    padding-top: 80px;
  }
  .ioo_tips {
    margin-top: 20px;
    font-size: 14px;
    color: #787878;
  }
  .iio_address {
    width: 505px;
    display: flex;
    align-items: center;
    height: 36px;
    font-size: 18px;
    font-weight: 500;
    color: #ff9600;
    padding: 3px 30px;
    margin-top: 20px;
    background: rgba(255, 150, 0, 0.1);
    border-radius: 26px;
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url("../../assets/img/helmet/copy.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      margin-left: 4px;
      flex-shrink: 0;
    }
  }
  .ioo_details {
    display: flex;
    margin-top: 100px;
    position: relative;
    right: 0;
    .tip {
      position: absolute;
      right: 0;
      top: -45px;
      padding: 0px 10px;
      height: 24px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #787878;
      border-radius: 16px;
      border: 1px solid #ff9600;
      display: flex;
      align-items: center;
      span {
        color: #ff9600;
        cursor: pointer;
      }
      > i {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-image: url("../../assets/img/iio/information.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 4px;
      }
    }
    .wrap {
      display: flex;
      align-items: center;
      > i {
        display: block;
        width: 1px;
        height: 54px;
        background: #cfcfd2;
      }
    }
    p {
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        &:nth-of-type(1) {
          font-size: 12px;
          font-weight: 400;
          color: #787878;
        }
        &:nth-of-type(2) {
          font-size: 18px;
          font-weight: bold;
          color: #121212;
          margin-top: 10px;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .iio_banner {
    width: 100%;
    background: url("../../assets/img/iio/iio_header_h5_bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .iio_wrap {
    width: 100%;
    padding: 40px 24px 30px;
    display: flex;
    flex-direction: column;
  }
  .iio_title {
    width: 211px;
    font-size: 24px;
    font-weight: 600;
    color: #121212;
    line-height: 33px;
  }
  .ioo_tips {
    font-size: 12px;
    color: #787878;
    text-align: center;
    margin-top: 12px;
  }
  .iio_address {
    width: 100%;
    display: flex;
    align-items: center;
    height: 36px;
    font-size: 12px;
    font-weight: 500;
    color: #ff9600;
    padding: 0px 14px;
    margin-top: 30px;
    background: rgba(255, 150, 0, 0.1);
    border-radius: 26px;
    justify-content: center;
    i {
      display: block;
      width: 12px;
      height: 12px;
      background-image: url("../../assets/img/helmet/copy.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      margin-left: 4px;
    }
  }
  .ioo_details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 30px;
    .tip {
      padding: 0px 10px;
      height: 24px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #787878;
      border-radius: 16px;
      border: 1px solid #ff9600;
      display: flex;
      align-items: center;
      align-self: flex-end;
      margin-bottom: 6px;
      span {
        color: #ff9600;
        cursor: pointer;
      }
      > i {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-image: url("../../assets/img/iio/information.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 4px;
      }
    }
    .wrap {
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        flex-direction: column;
        &:nth-of-type(1) {
          align-items: flex-start;
        }
        &:nth-of-type(2) {
          align-items: flex-end;
        }
        span {
          &:nth-of-type(1) {
            font-size: 12px;
            color: #787878;
            line-height: 20px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            font-weight: bold;
            color: #121212;
            line-height: 20px;
          }
        }
      }
      > i {
        display: none;
      }
    }
  }
}
</style>