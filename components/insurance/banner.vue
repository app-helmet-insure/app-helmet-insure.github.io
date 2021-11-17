<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide hwarpool"><div></div></div>
      <div class="swiper-slide vote"><div></div></div>
      <div class="swiper-slide bnb1000"><div></div></div>
      <div class="swiper-slide lpt"><div></div></div>
      <div class="swiper-slide newinsure"><div></div></div>
      <a
        class="swiper-slide dis"
        href="https://docs.google.com/forms/d/e/1FAIpQLScaSRY3gDKd74g9DLdmqZjNoqN9Gl3rhFOhm4Co23kTT7tNuw/viewform?usp=send_form"
        target="_blank"
        ><div></div
      ></a>
    </div>
    <div class="swiper-button-next swiper-button-black"></div>
    <div class="swiper-button-prev swiper-button-black"></div>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min.js";
import "swiper/swiper-bundle.min.css";
export default {
  data() {
    return {
      day: 0,
      hour: 0,
      minute: 0,
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    day(newVal, val) {
      if (newVal) {
        this.day = newVal;
      }
    },
    hour(newVal, val) {
      if (newVal) {
        this.hour = newVal;
      }
    },
    minute(newVal, val) {
      if (newVal) {
        this.minute = newVal;
      }
    },
  },
  methods: {
    toMining() {
      this.$router.push("/mining");
    },
    init() {
      let timer = setTimeout(() => {
        var mySwiper = new Swiper(".swiper-container", {
          loop: true,
          spaceBetween: 50,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          // pagination: {
          //   el: ".swiper-pagination",
          //   clickable: true,
          // },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      }, 100);
      this.$once("hook:beforeDestroy", () => {
        clearTimeout(timer);
      });
    },
  },
};
</script>
<style lang="scss">
@import "~/assets/css/themes.scss";
.swiper-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper-container-horizontal {
  > .swiper-pagination-bullets > .swiper-pagination-bullet {
    outline: none !important;
    width: 24px;
    height: 2px;
    border-radius: 0;
    background: #ededf0;
    opacity: 1;
  }
  /* 分页器选中 */
  .swiper-pagination-bullet-active {
    outline: none !important;
    background-color: #fd7e14 !important;
  }
  .swiper-button-black {
    outline: none !important;
    &::after {
      font-size: 20px !important;
      color: #fff !important;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~/assets/css/themes.scss";
@media screen and (min-width: 750px) {
  .swiper-container {
    width: 100%;
    height: 180px;
    @include themeify {
      background: themed("color-ffffff");
    }
    border-radius: 10px;
    overflow: hidden;
    min-width: 1026px;
    .swiper-wrapper {
      height: 100%;
    }
    .swiper-slide {
      display: flex;
      width: 100%;
      height: 180px;
      div {
        margin: 0 auto;
        width: 1026px;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 1026px 180px;
        background-position: center;
      }
    }
    .hwarpool {
      background: #ffb5c0;
      > div {
        background-image: url("../../assets/img/banner/war_pool_web.png");
      }
    }
    .vote {
      background: #f9cf00;
      > div {
        background-image: url("../../assets/img/banner/vote_web.png");
      }
    }
    .bnb1000 {
      background: #262724;
      > div {
        background-image: url("../../assets/img/banner/bnb1000_web.png");
      }
    }
    .lpt {
      background: #ac000a;
      > div {
        background-image: url("../../assets/img/banner/lpt_web.png");
      }
    }
    .newinsure {
      background: #295336;
      > div {
        background-image: url("../../assets/img/banner/newinsure_web.png");
      }
    }
    .insure {
      background: #ffffe4;
      > div {
        background-image: url("../../assets/img/banner/insure_web.png");
      }
    }

    .guard {
      background: #22222a;
      > div {
        background-image: url("../../assets/img/banner/guard_web.png");
      }
    }
    .dis {
      background: #7289da;
      > div {
        background-image: url("../../assets/img/banner/dis_web.png");
      }
    }
    .imgbanner {
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
@media screen and (max-width: 750px) {
  .swiper-container {
    width: 96%;
    height: 160px;
    @include themeify {
      background: themed("color-ffffff");
    }
    border-radius: 10px;
    min-width: 320px;
    .swiper-wrapper {
      height: 100%;
    }
    .swiper-slide {
      display: flex;
      width: 100%;
      width: 100%;
      > div {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
      }
    }
    .hwarpool {
      background: #ffb5c0;
      > div {
        background-image: url("../../assets/img/banner/war_pool_h5.png");
      }
    }
    .vote {
      background: #f9cf00;
      > div {
        background-image: url("../../assets/img/banner/vote_h5.png");
      }
    }
    .bnb1000 {
      background: #262724;
      > div {
        background-image: url("../../assets/img/banner/bnb1000_h5.png");
      }
    }
    .lpt {
      background: #ac000a;
      > div {
        background-image: url("../../assets/img/banner/lpt_h5.png");
      }
    }
    .newinsure {
      background: #295336;
      > div {
        background-image: url("../../assets/img/banner/newinsure_h5.png");
      }
    }
    .insure {
      background: #ffffe4;
      > div {
        background-image: url("../../assets/img/banner/insure_h5.png");
      }
    }
    .guard {
      background: #22222a;
      > div {
        background-image: url("../../assets/img/banner/guard_h5.png");
      }
    }
    .dis {
      background: #7289da;
      > div {
        background-image: url("../../assets/img/banner/dis.png");
      }
    }

    .imgbanner {
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>
