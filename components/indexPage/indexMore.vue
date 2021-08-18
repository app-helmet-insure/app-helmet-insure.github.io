<template>
  <div class="helmet_more">
    <h3>READ MORE ABOUT ME</h3>
    <div class="card_wrap">
      <div
        class="card_item"
        v-for="item in HelmetMoreCardInfo"
        :key="item.cardname"
      >
        <h3>{{ item.card_item }}</h3>
        <p class="cardinfo" v-for="info in item.cardinfo" :key="info">{{ info }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { HelmetMoreCardInfo } from "../../config/home.js";
export default {
  data() {
    return {
      HelmetMoreCardInfo,
    };
  },
};
</script>

<style lang='scss' scoped>
.helmet_more {
  margin-top: 160px;
  h3 {
    text-align: center;
    font-size: 36px;
    font-family: Erbaum-Medium, Erbaum;
    font-weight: 500;
    color: #ffffff;
    line-height: 51px;
  }
  .card_wrap {
    .card_item {
      width: 465px;
      height: 447px;
      background: linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
      border-radius: 10px;
      margin: 0 auto;
      &:hover {
        border: 1px solid #fcc;
      }
    }
  }
}
</style>