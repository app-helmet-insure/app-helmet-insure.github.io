<template>
  <div class="banner_title">
    <div class="imgbanner img5 swiper-slide"></div>
    <div class="imgbanner img8 swiper-slide"></div>
    <div class="imgbanner img4 swiper-slide"></div>
    <!-- <div class="imgbanner img4 swiper-slide"></div> -->
    <!-- <div class="imgbanner img4 swiper-slide"></div> -->
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
<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .banner_title {
    width: 100%;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      width: 328px;
      height: 160px;
      border-radius: 5px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      &:nth-of-type(2) {
        margin: 0 20px;
      }
    }
    .img4 {
      background-image: url("../../assets/img/helmet/BNB500.png");
    }
    .img5 {
      background-image: url("../../assets/img/helmet/combo_dodo_web.png");
    }
    .img8 {
      background-image: url("../../assets/img/helmet/DODO.png");
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