<template>
  <div class="helmet_city">
    <div
      v-for="(info, index) in HelmetCitysInfo"
      :class="`city_info ${ClassName[index]}`"
      :key="info.title"
    >
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
</template>

<script>
import { HelmetCitysInfo } from "../../config/home.js";
export default {
  props: ["ClassName"],
  data() {
    return {
      HelmetCitysInfo,
    };
  },
};
</script>

<style lang='scss' scoped>
.helmet_city {
  height: 800px;
  background-image: url("../../assets/img/home/city_bg_web.png");
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: auto 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 110px;
  .city_info {
    visibility: hidden;
    width: 540px;
    height: 697px;
    background: rgba(28, 29, 32, 0.8);
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
.show_info {
  visibility: visible !important;
}
</style>