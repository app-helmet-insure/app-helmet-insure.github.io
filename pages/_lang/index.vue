<template>
  <div class="helmet_home">
    <div class="helmet_logo">
      <a></a>
    </div>
    <div class="helmet_view">
      <div class="helmet_view_l">
        <div class="ctk_link">
          <a href="https://www.certik.org/projects/helmet" target="_blank"></a>
        </div>
        <h3>
          <span class="orange">HELMET</span><span class="white">.INSURE</span>
        </h3>
        <p>Crypto-assets insurance trading platform</p>
        <div class="btn_link">
          <div class="bsc_dapp">
            <nuxt-link to="/insurance">
              <img src="../../assets/img/home/bsc.png" alt="" /> Launch Helmet
              On BSC
            </nuxt-link>
          </div>
          <div class="matic_dapp">
            <a href="https://www.guard.insure">
              <img src="../../assets/img/home/matic.png" alt="" />Launch Guard
              On Polygon
            </a>
          </div>
        </div>
      </div>
      <div class="helmet_view_r">
        <img
          class="video_index"
          src="~/assets/img/home/video_index.png"
          alt=""
          v-if="!this.showVideo"
        />
        <img
          class="video_start"
          src="~/assets/img/home/video_start.png"
          alt=""
          v-if="!this.showVideo"
          @click="showVideo = true"
        />
        <div
          class="wideo_wrap"
          v-if="this.showVideo"
          style="width: 100%; height: 100%"
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube-nocookie.com/embed/tT_zfUarAys?controls=0&autoplay=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
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
        <div
          class="city_info"
          v-for="info in HelmetCitysInfo"
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
    </div>
    <div class="helmet_course">
      <h3>Roadmap</h3>
      <div class="helmet_course_q">
        <div class="helmet_course_q_l"></div>
        <div class="quarter_line"></div>
        <div class="helmet_course_q_r"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Footer from "~/components/common/footer.vue";
import "~/assets/svg/iconfont.js";
import { HelmetCitysInfo } from "../../config/home.js";
export default {
  layout: "page",
  data() {
    return {
      showVideo: false,
      HelmetCitysInfo,
    };
  },
  components: {
    Footer,
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.helmet_home {
  min-width: 1280px;
  max-width: 1920px;
  margin: 0 auto;
}
.helmet_logo {
  max-width: 1600px;
  margin: 0 auto;
  a {
    display: block;
    width: 243px;
    height: 70px;
    background-image: url("../../assets/img/home/index_logo.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-top: 50px;
  }
}
.helmet_view {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 134px;
  &_l {
    .ctk_link {
      display: block;
      width: 120px;
      height: 34px;
      border-radius: 20px;
      border: 1px solid;
      background: radial-gradient(
        circle,
        rgba(255, 0, 153, 1),
        rgba(255, 150, 0, 1)
      );
      padding: 1px;
      a {
        width: 100%;
        height: 100%;
        display: block;
        background: #1e1d1d;
        border-radius: 19px;
        background-image: url("../../assets/img/home/certik_link.png");
        background-size: 96px 24px;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    > h3 {
      margin-top: 10px;
      font-size: 90px;
      font-family: Erbaum-Book, Erbaum;
      font-weight: normal;
      .orange {
        color: #fd7e14;
      }
      .white {
        color: #ffffff;
      }
    }
    > p {
      margin-top: 10px;
      font-size: 30px;
      font-family: Erbaum-Book;
      font-weight: normal;
      color: #9098a2;
      line-height: 40px;
    }
    .btn_link {
      display: flex;
      margin-top: 40px;
      > div {
        height: 56px;
        border-radius: 5px;
        padding: 2px;
      }
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 16px;
        img {
          width: 32px;
          height: 32px;
          margin-right: 4px;
        }
        width: 100%;
        height: 100%;
        font-size: 14px;
        font-family: Erbaum-Regular, Erbaum;
      }
      .bsc_dapp {
        height: 56px;
        background: linear-gradient(
          133deg,
          rgba(255, 254, 253, 1),
          rgba(255, 179, 95, 1)
        );
        a {
          background: linear-gradient(134deg, #ffdc8b 0%, #e98600 100%);
          color: #ffffff;
        }
      }
      .matic_dapp {
        margin-left: 20px;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 1),
          rgba(195, 195, 195, 0),
          rgba(238, 238, 238, 1)
        );
        a {
          background: linear-gradient(
            130deg,
            #9a9a9b 0%,
            #7c7c7c 45%,
            #c9a970 100%
          );
          color: #121212;
        }
      }
    }
  }
  &_r {
    width: 760px;
    height: 540px;
    position: relative;
    margin-left: 40px;
    .video_index {
      width: 100%;
      height: 100%;
    }
    .video_start {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 120px;
      cursor: pointer;
    }
  }
}
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
.helmet_course {
  padding-top: 330px;
  height: 1023px;
  background-image: url("../../assets/img/home/roadmap_bg_web.png");
  background-position-x: center;
  background-size: 1920px 1023px;
  background-repeat: no-repeat;
  > h3 {
    font-size: 36px;
    font-family: Erbaum-Medium, Erbaum;
    font-weight: 500;
    color: #ffffff;
    line-height: 51px;
    text-align: center;
  }
  &_q {
    .quarter_line {
      width: 1px;
      height: 1576px;
      background: #27282a;
    }
  }
}
</style>
