<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide iio">
        <div></div>
      </div>
      <div class="swiper-slide feimining">
        <div></div>
      </div>
      <div class="swiper-slide burntpt">
        <div></div>
      </div>
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
      setTimeout(() => {
        var mySwiper = new Swiper(".swiper-container", {
          loop: true,
          spaceBetween: 0,
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
    },
  },
};
</script>
<style lang="scss">
.swiper-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper-container-horizontal {
  > .swiper-pagination-bullets > .swiper-pagination-bullet {
    width: 24px;
    height: 2px;
    border-radius: 0;
    background: #ededf0;
    opacity: 1;
  }
  /* 分页器选中 */
  .swiper-pagination-bullet-active {
    background-color: #fd7e14 !important;
  }
  .swiper-button-black {
    &::after {
      font-size: 20px !important;
      color: #fff !important;
    }
  }
}
</style>
<style lang="scss" scoped>
@media screen and (min-width: 750px) {
  .swiper-container {
    width: 100%;
    height: 180px;
    background: #ffffff;
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
      > div {
        margin: 0 auto;
        width: 1026px;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 1026px 180px;
        background-position: center;
      }
    }
    .feimining {
      background: linear-gradient(31deg, #27bfc3 0%, #c86dd7 100%);
      > div {
        background-image: url("../../assets/img/banner/fei_mining_web.png");
      }
    }
    .verson {
      background: linear-gradient(
        360deg,
        #d94107 0%,
        #e6761c 41%,
        #ff9243 100%
      );
      > div {
        background-image: url("../../assets/img/banner/verson_web.png");
      }
    }
    .iio {
      background: #fd662c;
      > div {
        background-image: url("../../assets/img/banner/iio_web.png");
      }
    }
    .burntpt {
      background: linear-gradient(360deg, #f4b690 0%, #ff603a 100%);
      > div {
        background-image: url("../../assets/img/banner/burn_tpt_web.png");
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
    background: #ffffff;
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
    .verson {
      background: linear-gradient(
        360deg,
        #d94107 0%,
        #e6761c 41%,
        #ff9243 100%
      );
      > div {
        background-image: url("../../assets/img/banner/verson_h5.png");
      }
    }
    .feimining {
      background: linear-gradient(31deg, #27bfc3 0%, #c86dd7 100%);
      > div {
        background-image: url("../../assets/img/banner/fei_mining_h5.png");
      }
    }
    .burntpt {
      background: linear-gradient(360deg, #f4b690 0%, #ff603a 100%);
      > div {
        background-image: url("../../assets/img/banner/burn_tpt_h5.png");
      }
    }
    .iio {
      background: #fd662c;
      > div {
        background-image: url("../../assets/img/banner/iio_h5.png");
      }
    }
    .imgbanner {
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>
