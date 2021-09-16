<template>
  <div class="iio_title">
    <div class="iio_title_wrap">
      <div class="iio_title_text">
        <h3>{{ $t("Tip.IIOTip1") }}</h3>
        <p>{{ $t("Tip.IIOTip2") }}</p>
      </div>
      <div class="iio_apply_now">
        <p>Want to launch your own IIO with Helmet?</p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSduUhQJnmmyukVA1jMGmFwnn4s_B00uq1GmLyd0CKARvJ6w0Q/viewform"
          target="_blank"
          ><i></i> Apply Now</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
@media screen and (min-width: 750px) {
  .iio_title {
    width: 100%;
    min-width: 1026px;
    height: 140px;
    background: #fe9f00;
    border-radius: 5px;
    margin-bottom: 20px;
    &_wrap {
      margin: 0 auto;
      width: 100%;
      height: 100%;
      background-image: url("../../assets/img/iio/iio_title_bg_web.png");
      background-repeat: no-repeat;
      background-size: 1026px 100%;
      background-position: center center;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &_text {
      h3 {
        font-size: 24px;
        font-family: IBMPlexSans-SemiBold, IBMPlexSans;
        font-weight: 600;
        color: #fff;
        line-height: 32px;
        padding: 0 0 0 40px;
      }
      p {
        font-size: 16px;
        font-family: IBMPlexSans;
        color: #fff;
        line-height: 20px;
        margin: 11px 0 0 40px;
      }
    }
    .iio_apply_now {
      width: 348px;
      height: 104px;
      margin-right: 40px;
      background-image: url("../../assets/img/iio/apply_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      > p {
        font-size: 14px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 600;
        color: #17171a;
        line-height: 22px;
        margin-top: 24px;
        margin-left: 18px;
      }
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-left: 18px;
        width: 100px;
        height: 28px;
        background: #17171a;
        border-radius: 3px;
        font-size: 12px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #fff;
        line-height: 15px;
        i {
          display: block;
          width: 16px;
          height: 16px;
          background-image: url("../../assets/img/iio/add_bg.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center center;
        }
        &:hover {
          background: #2d2d4d;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .iio_title {
    width: 95%;
    height: 200px;
    background: #fe9f00;
    border-radius: 5px;
    margin: 0 auto;
    &_wrap {
      width: 100%;
      height: 100%;
      background-image: url("../../assets/img/iio/iio_title_bg_h5.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &_text {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h3 {
        width: 335px;
        font-size: 18px;
        font-family: IBMPlexSans-SemiBold, IBMPlexSans;
        font-weight: 600;
        color: #fff;
        padding: 0px 0 0 16px;
      }
      p {
        width: 329px;
        font-size: 12px;
        font-family: IBMPlexSans;
        color: #fff;
        line-height: 20px;
        margin: 8px 0 0 16px;
      }
    }
    .iio_apply_now {
      width: 320px;
      height: 104px;
      background-image: url("../../assets/img/iio/apply_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      margin-left: 16px;
      margin-top: 5px;
      > p {
        font-size: 13px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 600;
        color: #17171a;
        line-height: 22px;
        margin-top: 25px;
        margin-left: 18px;
      }
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-left: 18px;
        width: 100px;
        height: 28px;
        background: #17171a;
        border-radius: 3px;
        font-size: 12px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #fff;
        line-height: 15px;
        i {
          width: 16px;
          height: 16px;
          background-image: url("../../assets/img/iio/add_bg.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center center;
        }
        &:hover {
          background: #2d2d4d;
        }
      }
    }
  }
}
</style>