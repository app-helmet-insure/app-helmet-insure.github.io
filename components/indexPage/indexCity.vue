<template>
  <div class="helmet_city">
    <div class="helmet_city_t">
      <div class="invested"></div>
      <p class="introduction">
        Helmet.insure is invested by Binance in March 2021 to provide a more
        competitive option and insurance protocol for on-chain and cross-chain
        trading.
      </p>
    </div>
    <div class="helmet_city_b">
      <div class="city_info" v-for="info in HelmetCitysInfo" :key="info.title">
        <img :src="info.logo" alt="" />
        <h3>{{ info.title }}</h3>
        <div
          class="city_info_text"
          v-for="infoText in info.infomation"
          :key="infoText"
        >
          <p>{{ infoText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HelmetCitysInfo } from "../../config/home.js";
export default {
  data() {
    return {
      HelmetCitysInfo,
    };
  },
};
</script>

<style lang='scss' scoped>
.helmet_city {
  height: 990px;
  background-image: url("../../assets/img/home/city_bg_web.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  &_t {
    padding-top: 157px;
    .invested {
      width: 473px;
      height: 90px;
      background-image: url("../../assets/img/home/invested.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .introduction {
      margin-top: 30px;
      width: 990px;
      font-size: 20px;
      font-family: Erbaum-Book, Erbaum;
      font-weight: normal;
      color: #9098a2;
      line-height: 40px;
      text-align: center;
      margin: 30px auto 0;
    }
  }
  &_b {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 106px;
    .city_info {
      width: 540px;
      height: 697px;
      background: rgba(28, 29, 32, 0.94);
      border-radius: 10px;
      padding: 30px 32px 0 28px;
      margin: 0 20px;
      > img {
        width: 130px;
        height: 130px;
      }
      > h3 {
        margin-top: 16px;
        font-size: 30px;
        font-family: Erbaum-Medium, Erbaum;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
      }
      p {
        margin-top: 25px;
        font-size: 16px;
        font-family: Erbaum-Book, Erbaum;
        font-weight: normal;
        color: #9098a2;
        line-height: 24px;
      }
    }
  }
}
</style>