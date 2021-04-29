<template>
  <div class="nft_dialog_mask" v-if="nft_flag">
    <div class="nft_dialog">
      <div class="nft_dialog_title">
        <p>手气爆棚</p>
      </div>
      <div :class="`nft_dialog_bg ${nft_action}`">
        <div :class="`card_wrap ${nft_action}_wrap`">
          <div class="card_item" v-for="(item, index) in nft_data" :key="index">
            <span>{{ CardFilter(item) }}</span>
            <img
              :src="
                require(`~/assets/img/nft/${
                  CardFilter(item) || 'mysterious'
                }.png`)
              "
              alt=""
            />
          </div>
        </div>
        <div class="button">
          <button @click="handleClaim(nft_action)">开奖</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CardFilter, claim, claim10 } from "~/interface/nft.js";
export default {
  data() {
    return {
      nft_flag: false,
      nft_action: "bet",
      nft_data: [],
      CardFilter,
    };
  },
  watch: {},
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
          console.log(data);
        });
      } else {
        claim10(Type, (data) => {
          console.log(data);
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
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
        height: 64px;
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
      width: 484px;
      height: 244px;
      background-image: url("../../assets/img/nft/dialog_bg_one.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
    }
    .bet10 {
      width: 543px;
      height: 363px;
      background-image: url("../../assets/img/nft/dialog_bg_ten.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .bet_wrap {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
      padding: 12px;
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
</style>