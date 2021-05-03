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
  </div>
</template>
<script>
import Vue from "vue";
import animation from "~/assets/css/animation.scss";
Vue.use(animation);
export default {
  props: ["rotate"],
  data() {
    return {};
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