<template>
  <div class="helmet_view">
    <div class="helmet_view_l">
      <div class="ctk_link">
        <a href="https://www.certik.org/projects/helmet" target="_blank"></a>
      </div>
      <vue-typed-js
        :strings="[
          `<span class='orange' style='color:orange'>HELMET</span><span class='white'  style='color:white'>.INSURE</span>`,
        ]"
        :typeSpeed="100"
      >
        <h3 class="typing"></h3>
      </vue-typed-js>
      <p>Crypto-assets insurance trading platform</p>
      <div class="btn_link">
        <div class="bsc_dapp">
          <nuxt-link to="/insurance">
            <img src="../../assets/img/home/bsc.png" alt="" /> Launch Helmet On
            BSC
          </nuxt-link>
        </div>
        <div class="matic_dapp">
          <a href="https://www.guard.insure/insurance/">
            <img src="../../assets/img/home/matic.png" alt="" />Launch Guard On
            Polygon
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
</template>

<script>
import { VueTypedJs } from "vue-typed-js";
export default {
  components: {
    VueTypedJs,
  },
  data() {
    return {
      showVideo: false,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang='scss' scoped>
.helmet_view {
  display: flex;
  align-items: center;
  justify-content: center;
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
    .typed-element {
      display: flex;
      .typing {
        font-family: Erbaum-Book, Erbaum;
        font-weight: normal;
        text-align: center;
        .orange {
          color: #fd7e14 !important;
        }
        .white {
          color: #ffffff !important;
        }
      }
    }
    > p {
      font-family: Erbaum-Book;
      font-weight: normal;
      color: #9098a2;
    }
    .btn_link {
      display: flex;
      justify-content: center;
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
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0px 8px 16px 0px rgba(255, 150, 0, 0.4);
        }
      }
      .matic_dapp {
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
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0px 10px 16px 0px rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
  &_r {
    position: relative;
    margin-top: 40px;
    .video_index {
      width: 100%;
      height: 100%;
    }
    .video_start {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  }
}
@media screen and(min-width: 750px) {
  .helmet_view {
    flex-direction: column;
    margin-top: 134px;
    &_l {
      .ctk_link {
        margin-left: 72px;
      }
      .typed-element {
        height: 120px;
        justify-content: center;
        .typing {
          font-size: 90px;
        }
      }
      > p {
        margin-top: 10px;
        font-size: 36px;
        line-height: 40px;
      }
      .btn_link {
        margin-top: 40px;
      }
      .bsc_dapp {
        margin: 0 10px;
      }
      .matic_dapp {
        margin: 0 10px;
      }
    }
    &_r {
      width: 760px;
      height: 540px;
      .video_start {
        width: 120px;
        height: 120px;
      }
    }
  }
}
@media screen and(max-width: 750px) {
  .helmet_view {
    width: 100%;
    flex-direction: column-reverse;
    &_l {
      .ctk_link {
        margin-top: 34px;
      }
      .typed-element {
        height: 60px;
        .typing {
          font-size: 36px;
        }
      }
      > p {
        font-size: 14px;
        line-height: 24px;
      }
      .btn_link {
        flex-direction: column;
        margin: 0;
      }
      .bsc_dapp {
        margin-top: 20px;
      }
      .matic_dapp {
        margin-top: 20px;
      }
    }
    &_r {
      min-width: 335px;
      min-height: 238px;
      .video_start {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>