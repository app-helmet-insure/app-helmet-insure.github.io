<template>
  <div class="nft_card">
    <div class="show_card">
      <!-- 正面 -->
      <div
        v-if="timeFlag"
        class="positive box"
        ref="positive"
        :style="rotate ? ' animation: positive 2s linear 0s infinite;' : ''"
      >
        <div class="positive_card"></div>
      </div>
      <div class="expired" v-else>
        <div>
          <span>您共可领取</span>
          <h3>
            {{ fixD(fixD(RewardPoll / DoraQuantity, 0) * DoraBalance, 0) }}
            Helmet
          </h3>
          <p>
            每个 Dora 可领取 {{ fixD(RewardPoll / DoraQuantity, 0) }} Helmet
          </p>
        </div>
      </div>
    </div>

    <div class="card_bottom"></div>
  </div>
</template>
<script>
import Vue from "vue";
import animation from "~/assets/css/animation.scss";
Vue.use(animation);
import { fixD } from "~/assets/js/util.js";
export default {
  props: ["rotate", "timeFlag", "RewardPoll", "DoraQuantity", "DoraBalance"],
  data() {
    return { fixD };
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
  .show_card {
    width: 286px;
    height: 354px;
    position: relative;
    margin: 0 auto;
    z-index: 1;
    > div {
      width: 286px;
      height: 354px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .box {
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
    .expired {
      background-image: url("../../assets/img/nft/nft_bg_expired.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      > div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: rgba(23, 23, 58, 0.8);
          line-height: 17px;
        }
        h3 {
          margin-top: 10px;
          font-size: 24px;
          font-family: FredokaOne-Regular, FredokaOne;
          color: rgba(23, 23, 58, 0.8);
          line-height: 24px;
        }
        p {
          margin-top: 50px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: rgba(23, 23, 58, 0.8);
          line-height: 17px;
        }
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
}
@media screen and(max-width:750px) {
  .show_card {
    width: 199px;
    height: 249px;
    position: relative;
    margin: 0 auto;
    z-index: 1;
    margin-top: 30px;
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
  .expired {
    width: 199px;
    height: 249px;
    background-image: url("../../assets/img/nft/nft_bg_expired.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    > div {
      width: 199px;
      height: 249px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(23, 23, 58, 0.8);
        line-height: 17px;
      }
      h3 {
        margin-top: 10px;
        font-size: 24px;
        font-family: FredokaOne-Regular, FredokaOne;
        color: rgba(23, 23, 58, 0.8);
        line-height: 24px;
      }
      p {
        margin-top: 50px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(23, 23, 58, 0.8);
        line-height: 17px;
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
}
</style>