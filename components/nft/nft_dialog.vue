<template>
  <div class="nft_dialog_mask" v-if="nft_flag">
    <div class="nft_dialog">
      <div class="nft_dialog_title">
        <p>{{ $t("NFT.Suprice") }}</p>
      </div>
      <div :class="`nft_dialog_bg ${nft_action}`">
        <div :class="`card_wrap ${nft_action}_wrap`">
          <div class="card_scroll">
            <div
              class="card_item"
              v-for="(item, index) in nft_data"
              :key="index"
              :style="
                rotate ? ' animation: cardItem 2s linear 0s infinite;' : ''
              "
            >
              <span>{{ CardFilter(item) }}</span>
              <img
                :src="
                  require(`~/assets/img/nft/have_${
                    CardFilter(item) || 'mysterious'
                  }.png`)
                "
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="nft_dialog_warning">
          <img src="~/assets/img/nft/warning.png" alt="" />
          <p>{{ $t("NFT.NFT_TIP2") }}</p>
        </div>
        <div class="button">
          <button @click="handleClaim(nft_action)" v-if="status == 'dataFail'">
            {{ $t("NFT.open") }}
          </button>
          <button @click="closeDialog()" v-else>
            {{ $t("NFT.getReward") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { CardFilter, claim, claim10 } from "~/interface/nft.js";
import animation from "~/assets/css/animation.scss";
Vue.use(animation);
export default {
  data() {
    return {
      nft_flag: false,
      nft_action: "bet",
      nft_data: [],
      CardFilter,
      status: "dataFail",
      rotate: false,
    };
  },
  watch: {
    nft_data(newValue) {
      this.nft_data = newValue;
    },
  },
  mounted() {
    if (this.nft_action == "bet") {
      this.nft_data = ["a"];
    } else {
      this.nft_data = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];
    }
    this.$bus.$on("NFT_DIALOG_STATUS", (data) => {
      this.nft_flag = data.flag;
      this.nft_action = data.action;
      if (data && data.action == "bet") {
        this.nft_data = ["a"];
      } else {
        this.nft_data = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];
      }
    });
  },
  methods: {
    handleClaim(action) {
      let Type = "NFT_POOL";
      if (action == "bet") {
        claim(Type, (data) => {
          if (data.status == "claim_pendding") {
            this.rotate = true;
          }
          if (data.status == "dataSuccess") {
            this.nft_data = data.data;
            this.status = data.status;
            this.$bus.$emit("GET_CARD_BALANCE");
            this.rotate = false;
          }
          if (data.status == "claim_error") {
            this.rotate = false;
          }
        });
      } else {
        claim10(Type, (data) => {
          if (data.status == "claim_pendding") {
            this.rotate = true;
          }
          if (data.status == "dataSuccess") {
            this.nft_data = data.data;
            this.status = data.status;
            this.$bus.$emit("GET_CARD_BALANCE");
            this.rotate = false;
          }
          if (data.status == "claim_error") {
            this.rotate = false;
          }
        });
      }
    },
    closeDialog() {
      this.$bus.$emit("NFT_DIALOG_STATUS", { flag: false });
      this.status = "dataFail";
      this.$bus.$emit("GET_CARD_BALANCE");
    },
  },
};
</script>

<style lang='scss' scoped>
@keyframes cardItem {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(0);
  }
}
@media screen and (min-width: 750px) {
  .nft_dialog_mask {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba($color: #000000, $alpha: 0.5);
    left: 0;
    top: 0;
    z-index: 888;
  }
  .nft_dialog {
    min-width: 498px;
    min-height: 290px;
    background: linear-gradient(180deg, #716a88 0%, #84787b 100%);
    box-shadow: 0px 1px 3px 0px rgba(165, 165, 165, 0.5),
      0px 0px 3px 0px rgba(239, 239, 239, 0.5);
    border-radius: 10px;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    position: absolute;
    &_title {
      position: absolute;
      width: 234px;
      height: 85px;
      background-image: url("../../assets/img/nft/dialog_title.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      transform: translateX(-50%);
      left: 50%;
      top: -48px;
      z-index: 1;
      p {
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #d47a52;
        line-height: 21px;
        text-align: center;
        margin-top: 50px;
      }
    }
    &_bg {
      margin: 28px 7px 17px 7px;
      position: relative;
      .card_item {
        width: 93px;
        height: 120px;
        background: #ffffff;
        box-shadow: 0px 0px 22px 0px #ffb04d inset;
        border-radius: 4px;
        img {
          width: 69px;
          height: 70px;
        }
      }
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          min-width: 77px;
          padding: 0 22px;
          height: 32px;
          background: #999bfb;
          box-shadow: 0px 3px 0px 0px #9383e0;
          border-radius: 16px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 16px;
          text-shadow: 0px 2px 0px #9383e0, 0px 2px 5px #e2dcff;
        }
      }
    }
    .bet {
      width: 97%;
      height: 284px;
      background-image: url("../../assets/img/nft/dialog_bg_one.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      .button {
        height: 64px;
      }
    }
    .bet10 {
      width: 543px;
      height: 403px;
      background-image: url("../../assets/img/nft/dialog_bg_ten.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      .button {
        height: 52px;
      }
    }
    .bet_wrap {
      width: 100%;
      height: 66%;
      display: flex;
      align-items: center;
      justify-content: center;
      .card_scroll {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .card_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        padding: 20px 15px 20px 15px;
        span {
          display: block;
          height: 8px;
          font-size: 8px;
          font-family: FredokaOne-Regular, FredokaOne;
          color: #fd7e14;
          line-height: 8px;
          text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.8);
        }
        img {
          margin-top: 5px;
        }
      }
    }
    .bet10_wrap {
      width: 100%;
      height: 77%;
      display: flex;
      flex-wrap: wrap;
      .card_scroll {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        justify-content: space-between;
        padding: 35px 23px 15px 23px;
      }
      .card_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        padding: 20px 15px 20px 15px;
        span {
          display: block;
          height: 8px;
          font-size: 8px;
          font-family: FredokaOne-Regular, FredokaOne;
          color: #fd7e14;
          line-height: 8px;
          text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.8);
        }
        img {
          margin-top: 5px;
        }
      }
    }
  }
  .nft_dialog_warning {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    img {
      width: 34px;
      height: 34px;
    }
    p {
      margin-left: 8px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #eb2719;
      line-height: 20px;
    }
  }
}
@media screen and (max-width: 750px) {
  .nft_dialog_mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba($color: #000000, $alpha: 0.5);
    left: 0;
    top: 0;
    z-index: 888;
  }
  .nft_dialog {
    min-width: 320px;
    min-height: 300px;
    width: 95%;
    max-height: 510px;
    background: linear-gradient(180deg, #716a88 0%, #84787b 100%);
    box-shadow: 0px 1px 3px 0px rgba(165, 165, 165, 0.5),
      0px 0px 3px 0px rgba(239, 239, 239, 0.5);
    border-radius: 10px;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    position: absolute;
    &_title {
      position: absolute;
      width: 234px;
      height: 85px;
      background-image: url("../../assets/img/nft/dialog_title.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      transform: translateX(-50%);
      left: 50%;
      top: -48px;
      z-index: 1;
      p {
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #d47a52;
        line-height: 21px;
        text-align: center;
        margin-top: 50px;
      }
    }
    &_bg {
      margin: 28px 7px 17px 7px;
      position: relative;
      .card_item {
        width: 93px;
        height: 120px;
        background: #ffffff;
        box-shadow: 0px 0px 22px 0px #ffb04d inset;
        border-radius: 4px;
        img {
          width: 69px;
          height: 70px;
        }
      }
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          min-width: 77px;
          padding: 0 22px;
          height: 32px;
          background: #999bfb;
          box-shadow: 0px 3px 0px 0px #9383e0;
          border-radius: 16px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 16px;
          text-shadow: 0px 2px 0px #9383e0, 0px 2px 5px #e2dcff;
        }
      }
    }
    .bet {
      width: 95%;
      height: 284px;
      background-image: url("../../assets/img/nft/dialog_bg_one.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      .button {
        height: 64px;
      }
    }
    .bet10 {
      width: 95%;
      background-image: url("../../assets/img/nft/dialog_bg_ten.png");
      background-repeat: no-repeat;
      background-size: 100% 480px;
      display: flex;
      flex-direction: column;
      height: 600px;
      .button {
        height: 52px;
      }
    }
    .bet_wrap {
      width: 100%;
      height: 66%;
      display: flex;
      align-items: center;
      justify-content: center;
      .card_scroll {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }
      .card_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        padding: 20px 15px 20px 15px;
        span {
          display: block;
          height: 8px;
          font-size: 8px;
          font-family: FredokaOne-Regular, FredokaOne;
          color: #fd7e14;
          line-height: 8px;
          text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.8);
        }
        img {
          margin-top: 5px;
        }
      }
    }
    .bet10_wrap {
      width: 100%;
      height: 385px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      .card_scroll {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 35px 23px 15px 23px;
        overflow-y: scroll;
        margin-top: 35px;
        padding-top: 0;
      }
      .card_item {
        margin: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        padding: 20px 15px 20px 15px;
        span {
          display: block;
          height: 8px;
          font-size: 8px;
          font-family: FredokaOne-Regular, FredokaOne;
          color: #fd7e14;
          line-height: 8px;
          text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.8);
        }
        img {
          margin-top: 5px;
        }
      }
    }
  }
  .nft_dialog_warning {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    img {
      width: 34px;
      height: 34px;
    }
    p {
      margin-left: 8px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #eb2719;
      line-height: 20px;
    }
  }
}
</style>