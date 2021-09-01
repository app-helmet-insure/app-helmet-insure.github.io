<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide newinsure"><div></div></div>
      <div class="swiper-slide insure"><div></div></div>
      <div class="swiper-slide ibo"><div></div></div>
      <div class="swiper-slide guard"><div></div></div>
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
@import "~/assets/css/base.scss";
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
@import "~/assets/css/base.scss";
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
    .ibo {
      background: #96f6d1;
      > div {
        background-image: url("../../assets/img/banner/ibo_web.png");
      }
    }
    .guard {
      background: #22222a;
      > div {
        background-image: url("../../assets/img/banner/gaurd_web.png");
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
    .ibo {
      background: #96f6d1;
      > div {
        background-image: url("../../assets/img/banner/ibo_h5.png");
      }
    }
    .guard {
      background: #22222a;
      > div {
        background-image: url("../../assets/img/banner/gaurd_h5.png");
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
