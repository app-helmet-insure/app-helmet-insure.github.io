<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="text swiper-slide">
        <div>
          <h3>{{ $t("Banner.Title") }}</h3>
          <span
            >{{ $t("Banner.Text") }}
            <a href="https://pancakeswap.finance/ifo" target="_blank"
              >{{ $t("Banner.ReadMore") }}
            </a>
          </span>
          <div>
            <p>
              <i>{{ day }}</i>
              <span>DAYS</span>
            </p>
            <span>:</span>
            <p>
              <i>{{ hour }}</i>
              <span>HOURS</span>
            </p>
            <span>:</span>
            <p>
              <i>{{ minute }} </i>
              <span>MINUTES</span>
            </p>
          </div>
        </div>
      </div>
      <div class="img swiper-slide">
        <h3>{{ $t("Banner.TradeStart") }}</h3>
        <p>{{ $t("Banner.TradeTime") }}</p>
      </div>
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
    setInterval(() => {
      setTimeout(() => {
        this.getDownTime();
      }, 0);
      clearTimeout();
    }, 1000);
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
    init() {
      var mySwiper = new Swiper(".swiper-container", {
        // loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        spaceBetween: 30,
        // autoplay: {
        //   // delay: 10000,
        //   disableOnInteraction: false,
        // },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    },
    getDownTime() {
      let now = new Date() * 1;
      let list = this.miningList;
      let dueDate = "2021-01-13 17:02:45";
      dueDate = new Date(dueDate);
      let DonwTime = dueDate - now;
      let day = Math.floor(DonwTime / (24 * 3600000));
      let hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000);
      let minute = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
      );
      let second = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      );
      this.day = day;
      this.hour = hour;
      this.minute = minute;
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
    .text {
      width: 1200px;
      height: 220px;
      padding: 0 60px;
      background-image: url("../../assets/img/helmet/banner_ill.png");
      background-size: 344px 200px;
      background-position: 90% center;
      background-repeat: no-repeat;
      display: flex;
      justify-content: space-between;
      div {
        h3 {
          width: 690px;
          font-size: 24px;
          font-weight: 600;
          color: #121212;
          line-height: 33px;
          margin: 50px 0 6px 0;
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
    .text {
      width: 100%;
      height: 475px;
      padding: 0 28px;
      background-image: url("../../assets/img/helmet/banner_ill.png");
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