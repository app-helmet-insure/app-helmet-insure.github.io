<template>
  <div class="helmet_city">
    <div
      v-for="(info, index) in HelmetCitysInfo"
      :class="`city_info ${ClassName[index]}`"
      :key="info.title"
    >
      <div class="city_info_title" @click="handleClickShowInfo(info)">
        <img :src="info.logo" alt="" />
        <h3>{{ info.title }}</h3>
        <svg width="20px" height="20px" class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouqi"></use>
        </svg>
      </div>
      <div
        :class="`city_info_text ${info.flagshow ? 'hidden_info' : ''}`"
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
  methods: {
    handleClickShowInfo(info) {
      info.flagshow = !info.flagshow;
    },
  },
};
</script>

<style lang='scss' scoped>
.helmet_city {
  display: flex;
  align-items: center;
  justify-content: center;
  .city_info {
    visibility: hidden;
    background: rgba(28, 29, 32, 0.8);
    border-radius: 10px;
    margin: 0 20px;
    h3 {
      font-family: Erbaum-Medium, Erbaum;
      font-weight: 500;
      color: #ffffff;
      line-height: 24px;
    }
    p {
      font-family: Erbaum-Book, Erbaum;
      font-weight: normal;
      color: #9098a2;
    }
  }
}
.show_info {
  visibility: visible !important;
}
@media screen and(min-width:750px) {
  .helmet_city {
    height: 800px;
    background-image: url("../../assets/img/home/city_bg_web.png");
    background-repeat: no-repeat;
    background-position-x: center;
    background-size: auto 100%;
    padding-top: 110px;
    .city_info {
      width: 540px;
      height: 697px;
      padding: 30px 32px 0 28px;
    }
    img {
      width: 130px;
      height: 130px;
    }
    svg {
      display: none;
    }
    h3 {
      margin-top: 16px;
      font-size: 30px;
    }
    p {
      margin-top: 25px;
      font-size: 16px;
      line-height: 24px;
    }
  }
}
@media screen and(max-width:750px) {
  .helmet_city {
    background-image: url("../../assets/img/home/city_bg_web.png");
    background-repeat: no-repeat;
    background-position-x: center;
    background-size: 100vw auto;
    flex-direction: column;
    .city_info {
      width: 100%;
      padding: 10px 16px 10px 16px;
      margin-top: 20px;
      &_title {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
      }
      img {
        width: 64px;
        height: 64px;
      }
      svg {
        fill: #9098a2;
        position: absolute;
        right: 0;
      }
      h3 {
        font-size: 16px;
        margin-left: 4px;
      }
      p {
        margin-top: 15px;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
  .hidden_info {
    display: none;
  }
}
</style>