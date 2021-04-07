<template>
  <div class="stepOne">
    <div class="step_title">购买 Matter 门票后抵押 LPT 才能获得奖励</div>
    <div class="step_action">
      <p class="step_buy">
        <span>
          <i>{{ $t("Content.UsableBalance") }}</i
          >: {{ Balance }} HELMET</span
        >
        <a href="https://exchange.pancakeswap.finance/#/swap" target="_blank"
          >获得 HELMET</a
        >
      </p>
      <label>
        <div class="input">
          <input type="text" readonly :value="PassportPrice" />
          <span>HELMET</span>
        </div>
      </label>
      <p class="text">
        <span>每张资格通证: {{ PassportPrice }} HELMET</span>
      </p>
      <button @click="BuyPassport">购买 Matter 门票</button>
      <p class="tips">此次用于购买门票的所有 Helmet 将在兑换结束后全部销毁</p>
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
    };
  },
  mounted() {
    setTimeout(() => {
      this.getPassPortPrice();
    }, 1000);
    this.$bus.$on("REFRESH_IIO_HELMETBNB_POOL", () => {
      this.getPassPortPrice();
      this.$bus.$emit("JUMP_STEP", { step: 2 });
    });
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
            color: #9b9b9b;
          }
        }
        a {
          font-size: 14px;
          font-weight: 600;
          color: #ff9600;
        }
      }
      > label {
        display: block;
        margin-top: 10px;
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
          }
          span {
            position: absolute;
            font-size: 14px;
            color: #9b9b9b;
            right: 15px;
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
      .text {
        margin-top: 4px;
        font-size: 14px;
        color: #9b9b9b;
      }
      .tips {
        margin-top: 8px;
        font-size: 14px;
        color: #9b9b9b;
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
            color: #9b9b9b;
          }
        }
        a {
          font-size: 12px;
          color: #ff9600;
        }
      }
      > label {
        display: block;
        margin-top: 10px;
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
          }
          span {
            position: absolute;
            font-size: 14px;
            color: #9b9b9b;
            right: 15px;
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
      .text {
        margin-top: 4px;
        font-size: 12px;
        color: #9b9b9b;
      }
      .tips {
        margin-top: 8px;
        font-size: 12px;
        color: #9b9b9b;
      }
    }
  }
}
</style>