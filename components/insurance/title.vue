<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="imgbanner img2 swiper-slide">
        <div class="center">
          <h3>LONG-HELMET for HCCT</h3>
          <span>Flash mining for only <i>15</i> days </span>
        </div>
      </div>
      <div class="imgbanner img1 swiper-slide"></div>
      <div class="text bg3 swiper-slide">
        <div>
          <h3>Staking Helmet for Helmet with high APY</h3>
          <button class="o_button" style="min-width: 120px" @click="toMining">
            START
          </button>
        </div>
      </div>
      <div class="text bg2 swiper-slide">
        <div>
          <h3>Double Mining Rewards <i>HELMET & CAKE</i> 30 Days</h3>
          <span>Start: Jan. 15th 18:00 SGT </span>
        </div>
      </div>
      <!-- <div class="img swiper-slide">
        <h3>Policy trading start</h3>
      </div> -->
      <!-- <div class="text bg1 swiper-slide">
        <div>
          <h3>Total raised <i>937.87% </i>of the target <i>9x</i> oversold</h3>
          <span>919,199.5872 CAKE 12,859.9603 BNB </span>
        </div>
      </div> -->
    </div>
    <div class="swiper-pagination"></div>
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
}
</style>
<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .swiper-container {
    width: 100%;
    height: 220px;
    background: #ffffff;
    margin-bottom: 15px;

    .swiper-wrapper {
      height: 100%;
    }
    .swiper-slide {
      display: flex;
    }
    .bg1 {
      background-image: url("../../assets/img/helmet/banner_ill.png");
      background-size: 344px 200px;
      background-position: 90% center;
      background-repeat: no-repeat;
      h3 {
        width: 404px;
      }
    }
    .bg2 {
      background-image: url("../../assets/img/helmet/helmetPool.png");
      background-size: 448px 220px;
      background-position: 95% center;
      background-repeat: no-repeat;
      h3 {
        width: 500px;
      }
    }
    .bg3 {
      background-image: url("../../assets/img/helmet/banner_illl.png");
      background-size: 360px 220px;
      background-position: 95% center;
      background-repeat: no-repeat;
      h3 {
        width: 500px;
      }
    }
    .img1 {
      background-image: url("../../assets/img/helmet/bannercake.png");
    }
    .img2 {
      background-image: url("../../assets/img/helmet/hcctbanner.png");
    }
    .center {
      display: flex;
      flex-direction: column;
      align-self: center;
      justify-content: center;
      margin: 0 auto;
      text-align: center;
      h3 {
        font-size: 40px;
      }
      span {
        font-size: 30px;
        margin-top: 23px;
        i {
          color: #e83629;
        }
      }
    }
    .imgbanner {
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .text {
      width: 1200px;
      height: 220px;
      padding: 0 60px;

      display: flex;
      justify-content: space-between;
      div {
        h3 {
          font-size: 24px;
          font-weight: 600;
          color: #121212;
          line-height: 33px;
          margin: 50px 0 16px 0;
          i {
            color: #ff9600;
          }
        }
        span {
          color: #919aa6;
          line-height: 20px;
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;

          a {
            color: #ff9600;
          }
        }
        div {
          display: flex;
          font-size: 36px;
          align-items: center;
          margin-top: 14px;
          P {
            display: flex;
            flex-direction: column;
            align-items: center;
            i {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 62px;
              height: 62px;
              background-image: url("../../assets/img/helmet/time_BG@2x.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              font-size: 27px;
              font-weight: 600;
              color: #ffffff;
            }
            span {
              font-size: 12px;
              color: #919aa6;
              line-height: 17px;
            }
          }
          > span {
            margin: 0 4px;
          }
        }
      }
    }
    .img {
      width: 1200px;
      background-image: url("../../assets/img/helmet/banner2@2x.png");
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h3 {
        font-size: 48px;
        font-weight: 600;
        color: #ffffff;
        line-height: 60px;
        text-shadow: 0px 0px 20px rgba(255, 0, 0, 0.26);
      }
      p {
        font-size: 24px;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        text-shadow: 0px 0px 20px rgba(255, 0, 0, 0.26);
      }
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

    .bg1 {
      background-image: url("../../assets/img/helmet/banner_ill.png");
      background-size: 320px 196px;
      background-position: center 100%;
      background-repeat: no-repeat;
      h3 {
        width: 404px;
      }
    }
    .bg2 {
      background-image: url("../../assets/img/helmet/helmetPool.png");
      background-size: 320px 196px;
      background-position: center 100%;
      background-repeat: no-repeat;
      h3 {
        width: 500px;
      }
    }
    .bg3 {
      background-image: url("../../assets/img/helmet/banner_illl.png");
      background-size: 320px 196px;
      background-position: center 100%;
      background-repeat: no-repeat;

      h3 {
        width: 500px;
      }
    }
    .img1 {
      background-image: url("../../assets/img/helmet/bannercake_h5.png");
    }
    .img2 {
      background-image: url("../../assets/img/helmet/hcctbanner_h5.png");
    }
    .center {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      text-align: center;
      h3 {
        margin-top: 60px;
        padding: 0 20px;
        font-size: 40px;
      }
      span {
        font-size: 30px;
        margin-top: 23px;
        i {
          color: #e83629;
        }
      }
    }
    .imgbanner {
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .text {
      width: 100%;
      height: 475px;
      padding: 0 28px;
      background-size: 320px 196px;
      background-position: center 100%;
      background-repeat: no-repeat;
      display: flex;
      justify-content: space-between;
      div {
        h3 {
          width: 320px;
          font-size: 24px;
          font-weight: 600;
          color: #121212;
          line-height: 33px;
          margin: 50px 0 6px 0;
          i {
            color: #ff9600;
          }
        }
        span {
          color: #919aa6;
          line-height: 20px;
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          a {
            color: #ff9600;
          }
        }
        div {
          display: flex;
          font-size: 36px;
          align-items: center;
          justify-content: center;
          margin-top: 14px;
          P {
            display: flex;
            flex-direction: column;
            align-items: center;
            i {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 62px;
              height: 62px;
              background-image: url("../../assets/img/helmet/time_BG@2x.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              font-size: 27px;
              font-weight: 600;
              color: #ffffff;
            }
            span {
              font-size: 12px;
              color: #919aa6;
              line-height: 17px;
            }
          }
          > span {
            margin: 0 4px;
          }
        }
      }
    }
    .img {
      padding: 0 28px;
      width: 100%;
      height: 100%;
      background-image: url("../../assets/img/helmet/banner2h5@2x.png");
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h3 {
        margin-top: 20px;
        font-size: 38px;
        font-weight: 500;
        color: #ffffff;
        line-height: 50px;
        text-shadow: 0px 0px 20px rgba(255, 0, 0, 0.26);
      }
      p {
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
        text-shadow: 0px 0px 20px rgba(255, 0, 0, 0.26);
      }
    }
  }
}
</style>