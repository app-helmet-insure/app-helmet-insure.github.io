<template>
  <div class="nft_card">
    <div class="show_card">
      <!-- 正面 -->
      <div class="positive box">
        <div class="positive_card"></div>
      </div>
      <!-- 反面 -->
      <div class="reverse box">
        <div class="reverse_card"></div>
      </div>
    </div>
    <div class="card_bottom"></div>
    <div class="card_button">
      <button class="one" @mouseup="handleClickBet">
        单次抽卡<span> 1 HELMET</span>
      </button>
      <button class="ten" @mouseup="handleClickBet10">
        10次抽卡<span> 8 HELMET</span>
      </button>
    </div>
  </div>
</template>
<script>
import { bet, bet10 } from "~/interface/nft.js";
export default {
  data() {
    return {};
  },
  methods: {
    async handleClickBet() {
      let Type = "NFT_POOL";
      let Cost = "NFT_COST";
      await bet(Type, Cost, (data) => {
        console.log(data);
        if (data.status == "success") {
          this.$bus.$emit("NFT_DIALOG_STATUS", { flag: true, action: "bet" });
        }
      });
    },
    async handleClickBet10() {
      let Type = "NFT_POOL";
      let Cost = "NFT_COST";
      await bet10(Type, Cost, (data) => {
        console.log(data);
        if (data.status == "success") {
          this.$bus.$emit("NFT_DIALOG_STATUS", { flag: true, action: "bet10" });
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
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
    background-image: url("../../assets/img/nft/border_web.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    > div {
      width: 240px;
      height: 310px;
      transition: all 1s;
      backface-visibility: hidden;
      border-radius: 10px;
      cursor: pointer;
      background-image: url("../../assets/img/nft/card_dora.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  .reverse {
    transform: rotateY(-180deg);
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
    box-shadow: 0px 6px 0px 0px #9383e0;
    text-shadow: 0px 1px 0px #9383e0, 0px 1px 3px #e2dcff;
    margin-right: 20px;
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
    margin-left: 20px;
    &:active {
      transform: translateY(4px);
      transition: all 0.5s;
      box-shadow: 0px 2px 0px 0px #df8c37;
    }
  }
}
</style>