<template>
  <div class="iiO">
    <div class="banner">
      <div class="banner_center"></div>
    </div>
    <!-- <div class="content_h5">
      <h3>
        <img src="~/assets/img/iio/helmet_logo.png" alt="" />
        {{ $t("IIO.ComingSoon") }}
      </h3>
      <p>{{ $t("IIO.InitialOffering") }}</p>
    </div> -->
    <div class="apply_iio">
      <div class="left">
        <p>Want to launch your own IIO with Helmet?</p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSduUhQJnmmyukVA1jMGmFwnn4s_B00uq1GmLyd0CKARvJ6w0Q/viewform"
          target="_blank"
          >Apply Now</a
        >
      </div>
      <div class="right"></div>
    </div>
    <div class="action_wrap">
      <div class="action">
        <div class="action_step_wrap">
          <div class="action_step_item">
            <svg class="icon" aria-hidden="true">
              <use href="#icon-buy"></use>
            </svg>
            <span>{{ $t("IIO.BuyTokenTicket") }}</span>
          </div>
          <svg class="icon" aria-hidden="true">
            <use href="#icon-WhiteRight"></use>
          </svg>
          <div class="action_step_item">
            <svg class="icon" aria-hidden="true">
              <use href="#icon-share"></use>
            </svg>
            <span>{{ $t("IIO.DepositLptReward") }}</span>
          </div>
          <svg class="icon" aria-hidden="true">
            <use href="#icon-WhiteRight"></use>
          </svg>
          <div class="action_step_item">
            <svg class="icon" aria-hidden="true">
              <use href="#icon-earn"></use>
            </svg>
            <span>{{ $t("IIO.SwapToken") }}</span>
          </div>
        </div>
      </div>
      <!-- <div class="content_pc">
        <h3>
          <img src="~/assets/img/iio/helmet_logo.png" alt="" />
          {{ $t("IIO.ComingSoon") }}
        </h3>
        <p>{{ $t("IIO.InitialOffering") }}</p>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 750px) {
  .iiO {
    margin-bottom: 50px;
    width: 80%;
    margin: 0 auto;
    min-width: 1200px;
    > .banner {
      width: 100%;
      min-width: 1026px;
      height: 380px;
      background-image: url("../../../assets/img/iio/banner_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .banner_center {
        width: 1026px;
        height: 380px;
        margin: 0 auto;
        background-image: url("../../../assets/img/iio/banner_center.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
      }
    }
    .apply_iio {
      width: 100%;
      height: 270px;
      padding: 50px 250px;
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      .left {
        width: 442px;
        p {
          font-size: 30px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 500;
          color: #17173a;
          line-height: 50px;
        }
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 30px;
          width: 180px;
          height: 40px;
          background: #17173a;
          border-radius: 5px;
          font-size: 16px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          color: #ffffff;
          line-height: 20px;
          &:hover {
            background: #2c2c2c;
          }
        }
      }
      .right {
        width: 180px;
        height: 180px;
        background-image: url("../../../assets/img/iio/apply_iio_web.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .action_wrap {
      background: #fff;
      padding: 30px 0;
    }
    .action_step_wrap {
      display: flex;
      width: 1050px;
      margin: 0 auto;
      justify-content: space-between;
      align-items: center;
      .action_step_item {
        width: 261px;
        height: 165px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .icon {
          width: 56px;
          height: 56px;
        }
        span {
          font-size: 16px;
          font-weight: 600;
          color: #22292f;
          line-height: 22px;
        }
      }
      > .icon {
        width: 24px;
        height: 24px;
        margin: 10px 0;
      }
    }
    .content_pc {
      width: 1176px;
      height: 338px;
      background: #f7f7fa;
      margin: 40px auto 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h3 {
        display: flex;
        align-items: center;
        font-size: 60px;
        font-weight: bold;
        color: #fd7e14;
        line-height: 74px;
        justify-content: center;
        display: flex;
        align-items: center;
      }
      p {
        font-size: 20px;
        color: #17173a;
        line-height: 28px;
        margin-top: 16px;
      }
    }
    .content_h5 {
      display: none;
    }
  }
}
@media screen and (max-width: 750px) {
  .iiO {
    background: #f8f9fa;
    > .banner {
      width: 100%;
      height: 164px;
      background-image: url("../../../assets/img/iio/fireBanner_H5.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .apply_iio {
      width: 100%;
      margin: 10px 0;
      padding: 20px 0;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      .left {
        p {
          font-size: 14px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 500;
          color: #17173a;
          margin-top: 20px;
        }
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 30px;
          width: 100%;
          height: 40px;
          background: #17173a;
          border-radius: 5px;
          font-size: 16px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          color: #ffffff;
          line-height: 20px;
          &:hover {
            background: #2c2c2c;
          }
        }
      }
      .right {
        width: 90px;
        height: 90px;
        background-image: url("../../../assets/img/iio/apply_iio_web.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .action_step_wrap {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 auto;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      .action_step_item {
        width: 90%;
        height: 76px;
        display: flex;
        padding: 0 20px;
        border: 1px solid #fff;
        background: #f7f7fa;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;
        .icon {
          width: 56px;
          height: 56px;
        }
        span {
          font-size: 16px;
          font-weight: 600;
          color: #22292f;
          line-height: 22px;
        }
      }
      > .icon {
        width: 24px;
        height: 24px;
        margin: 10px 0;
        transform: rotate(90deg);
      }
    }
    .content_h5 {
      background: #f7f7fa;
      border-radius: 3px;
      margin: 20px auto;
      width: 90%;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h3 {
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
        color: #fd7e14;
        line-height: 36px;
        justify-content: center;
        display: flex;
        align-items: center;
        img {
          width: 40px;
        }
      }
      p {
        color: #17173a;
        font-size: 14px;
        line-height: 28px;
      }
    }
    .content_pc {
      display: none;
    }
  }
}
</style>
