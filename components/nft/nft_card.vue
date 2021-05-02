<template>
  <div class="nft_card">
    <div class="show_card">
      <!-- 正面 -->
      <div
        class="positive box"
        ref="positive"
        :style="rotate ? ' animation: positive 2s linear 0s infinite;' : ''"
      >
        <div class="positive_card"></div>
      </div>
    </div>
    <div class="card_bottom"></div>
    <div class="card_button">
      <button class="one" @mouseup="handleClickBet" v-if="!needClaimFlag">
        {{ $t("NFT.OneCheck") }}<span> 2 HELMET</span>
      </button>
      <button class="one" @click="openDialog('bet')" v-else>
        {{ $t("NFT.OpenOne") }}
      </button>
      <button class="ten" @mouseup="handleClickBet10" v-if="!needClaim10Flag">
        {{ $t("NFT.TenCheck") }}<span> 16 HELMET</span>
      </button>
      <button class="ten" @click="openDialog('bet10')" v-else>
        {{ $t("NFT.OpenTen") }}
      </button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import animation from "~/assets/css/animation.scss";
import { bet, bet10, needClaim, needClaim10 } from "~/interface/nft.js";
Vue.use(animation);
export default {
  data() {
    return {
      rotate: false,
      needClaimFlag: false,
      needClaim10Flag: false,
    };
  },
  mounted() {
    this.$bus.$on("GET_CARD_BALANCE", () => {
      this.getNeedCliam();
      this.getNeedCliam10();
    });
    setTimeout(() => {
      this.getNeedCliam();
      this.getNeedCliam10();
    }, 1000);
  },
  methods: {
    openDialog(action) {
      this.$bus.$emit("NFT_DIALOG_STATUS", { flag: true, action: action });
    },
    async handleClickBet() {
      let Type = "NFT_POOL";
      let Cost = "NFT_COST";
      await bet(Type, Cost, (data) => {
        if (data.status == "bet_pendding") {
          this.rotate = true;
        }
        if (data.status == "bet_success") {
          this.rotate = false;
          this.$bus.$emit("NFT_DIALOG_STATUS", { flag: true, action: "bet" });
        }
        if (data.status == "bet_error") {
          this.rotate = false;
        }
      });
    },
    async handleClickBet10() {
      let Type = "NFT_POOL";
      let Cost = "NFT_COST";
      await bet10(Type, Cost, (data) => {
        if (data.status == "bet_pendding") {
          this.rotate = true;
        }
        if (data.status == "bet_success") {
          this.rotate = false;
          this.$bus.$emit("NFT_DIALOG_STATUS", { flag: true, action: "bet10" });
        }
        if (data.status == "bet_error") {
          this.rotate = false;
        }
      });
    },
    async getNeedCliam() {
      let Type = "NFT_POOL";
      this.needClaimFlag = await needClaim(Type);
    },
    async getNeedCliam10() {
      let Type = "NFT_POOL";
      this.needClaim10Flag = await needClaim10(Type);
    },
  },
};
</script>


<style lang='scss' scoped>
@keyframes positive {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(360deg);
  }
}
@media screen and(min-width:750px) {
  .nft_card {
    margin-top: 23px;
    background-image: url("../../assets/img/nft/nft_card_web.png");
    background-size: 100% 403px;
    background-repeat: no-repeat;
    background-position: bottom;
  }
  .show_card {
    width: 286px;
    height: 354px;
    position: relative;
    margin: 0 auto;
    z-index: 1;
    .box {
      width: 286px;
      height: 354px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url("../../assets/img/nft/border_web.png");
      > div {
        width: 240px;
        height: 310px;
        transition: all 1s;
        background-image: url("../../assets/img/nft/card_dora.png");
        backface-visibility: hidden;
        border-radius: 10px;
        cursor: pointer;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
  .card_bottom {
    width: 339px;
    height: 75px;
    background-image: url("../../assets/img/nft/card_bottom.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
    transform: translateY(-5px);
  }
  .card_button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 27px;
    padding-bottom: 30px;
    button {
      width: 240px;
      height: 46px;
      border-radius: 20px;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      span {
        font-family: FredokaOne-Regular, FredokaOne;
        font-weight: normal;
      }
    }
    .one {
      background: #999bfb;
      box-shadow: 0px 8px 0px 0px #9383e0;
      text-shadow: 0px 1px 0px #9383e0, 0px 1px 3px #e2dcff;
      margin-right: 20px;
      &:active {
        transition: all 0.5s;
        transform: translateY(6px);
        box-shadow: 0px 2px 0px 0px #9383e0;
      }
    }
    .ten {
      background: #ffbf46;
      box-shadow: 0px 8px 0px 0px #df8c37;
      text-shadow: 0px 1px 0px #ea9975, 0px 1px 3px #ffe0c8;
      margin-left: 20px;
      &:active {
        transform: translateY(6px);
        transition: all 0.5s;
        box-shadow: 0px 2px 0px 0px #df8c37;
      }
    }
  }
}
@media screen and(max-width:750px) {
  .nft_card {
    margin-top: 23px;
    background-image: url("../../assets/img/nft/nft_card_web.png");
    background-size: 100% 403px;
    background-repeat: no-repeat;
    background-position: bottom;
  }
  .show_card {
    width: 199px;
    height: 249px;
    position: relative;
    margin: 0 auto;
    z-index: 1;
    .box {
      width: 199px;
      height: 249px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url("../../assets/img/nft/border_web.png");
      > div {
        width: 168px;
        height: 218px;
        transition: all 1s;
        background-image: url("../../assets/img/nft/card_dora.png");
        backface-visibility: hidden;
        border-radius: 10px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
  .card_bottom {
    width: 237px;
    height: 50px;
    background-image: url("../../assets/img/nft/card_bottom.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
    transform: translateY(-5px);
  }
  .card_button {
    padding: 0 20px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 27px;
    button {
      width: 240px;
      height: 40px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      span {
        font-family: FredokaOne-Regular, FredokaOne;
        font-weight: normal;
      }
    }
    .one {
      background: #999bfb;
      box-shadow: 0px 6px 0px 0px #9383e0;
      text-shadow: 0px 1px 0px #9383e0, 0px 1px 3px #e2dcff;
      margin-right: 5px;
      &:active {
        transition: all 0.5s;
        transform: translateY(4px);
        box-shadow: 0px 2px 0px 0px #9383e0;
      }
    }
    .ten {
      background: #ffbf46;
      box-shadow: 0px 6px 0px 0px #df8c37;
      text-shadow: 0px 1px 0px #ea9975, 0px 1px 3px #ffe0c8;
      margin-left: 5px;
      &:active {
        transform: translateY(4px);
        transition: all 0.5s;
        box-shadow: 0px 2px 0px 0px #df8c37;
      }
    }
  }
}
</style>