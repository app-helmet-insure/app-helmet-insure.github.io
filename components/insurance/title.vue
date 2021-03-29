<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="imgbanner img5 swiper-slide"></div>
      <div class="imgbanner img8 swiper-slide"></div>
      <div class="imgbanner img4 swiper-slide"></div>
      <div class="imgbanner img3 swiper-slide"></div>
      <!-- <div class="imgbanner img7 swiper-slide">
        <nuxt-link to="/flashmining" tag="button">Start</nuxt-link>
      </div>
      <div class="imgbanner img6 swiper-slide">
        <nuxt-link to="/flashmining" tag="button">Start</nuxt-link>
      </div> -->
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
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
      var mySwiper = new Swiper(".swiper-container", {
        // loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        spaceBetween: 30,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
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
    background-color: #ff9600 !important;
  }
  .swiper-button-next {
    color: #ff9600;
  }
  .swiper-button-prev {
    color: #ff9600;
  }
}
</style>
<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .swiper-container {
    width: 100%;
    height: 220px;
    background: #ffffff;
    border-radius: 5px;
    .swiper-wrapper {
      height: 100%;
    }
    .swiper-slide {
      display: flex;
    }
    .img3 {
      background-image: url("../../assets/img/helmet/fortub.png");
    }
    .img4 {
      background-image: url("../../assets/img/helmet/HCCT.png");
    }
    .img5 {
      background-image: url("../../assets/img/helmet/combo_dodo_web.png");
    }
    .img6 {
      background-image: url("../../assets/img/helmet/hauto.png");
      > button {
        width: 120px;
        height: 48px;
        background: #121212;
        border-radius: 24px;
        font-size: 20px;
        font-weight: 600;
        color: #ffffff;
        margin: 148px 0 0 157px;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
    .img7 {
      background-image: url("../../assets/img/helmet/math.png");
      > button {
        width: 120px;
        height: 48px;
        background: #121212;
        border-radius: 24px;
        font-size: 20px;
        font-weight: 600;
        color: #ffffff;
        margin: 148px 0 0 157px;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
    .img8 {
      background-image: url("../../assets/img/helmet/DODO.png");
    }
    .imgbanner {
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
@media screen and (max-width: 750px) {
  .swiper-container {
    width: 100%;
    height: 475px;
    background: #ffffff;
    margin-bottom: 15px;
    .swiper-wrapper {
      height: 100%;
    }
    .swiper-slide {
      display: flex;
    }
    .img3 {
      background-image: url("../../assets/img/helmet/fortub_h5.png");
    }
    .img4 {
      background-image: url("../../assets/img/helmet/HCCT_H5.png");
    }
    .img5 {
      background-image: url("../../assets/img/helmet/combo_dodo_h5.png");
    }
    .img6 {
      background-image: url("../../assets/img/helmet/hauto_h5.png");
      > button {
        width: 120px;
        height: 48px;
        background: #121212;
        border-radius: 24px;
        font-size: 20px;
        font-weight: 600;
        color: #ffffff;
        margin: 180px 0 0 40px;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
    .img7 {
      background-image: url("../../assets/img/helmet/math_h5.png");
      > button {
        width: 120px;
        height: 48px;
        background: #121212;
        border-radius: 24px;
        font-size: 20px;
        font-weight: 600;
        color: #ffffff;
        margin: 210px 0 0 40px;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
    .img8 {
      background-image: url("../../assets/img/helmet/DODO_h5.png");
    }
    .imgbanner {
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>