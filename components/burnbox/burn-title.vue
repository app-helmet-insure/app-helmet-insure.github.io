<template>
  <div class="burn_title">
    <div class="burn_title_wrap">
      <div class="burn_title_text">
        <h3>{{ $t("Tip.BurnTip1") }}</h3>
        <p>{{ $t("Tip.BurnTip2") }}</p>
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
  .burn_title {
    width: 100%;
    min-width: 1026px;
    height: 140px;
    background: #0c0100;
    border-radius: 5px;
    margin-bottom: 20px;
    &_wrap {
      margin: 0 auto;
      width: 100%;
      height: 100%;
      background-image: url("../../assets/img/burnmining/burn_banner_web.png");
      background-repeat: no-repeat;
      background-size: 1026px 100%;
      background-position: center center;
    }
    &_text {
      h3 {
        font-size: 24px;
        font-family: IBMPlexSans-SemiBold, IBMPlexSans;
        font-weight: 600;
        color: #fff;
        line-height: 32px;
        padding: 40px 0 0 40px;
      }
      p {
        font-size: 16px;
        font-family: IBMPlexSans;
        color: #fff;
        line-height: 20px;
        margin: 11px 0 0 40px;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .burn_title {
    width: 95%;
    height: 120px;
    background: #0c0100;
    border-radius: 5px;
    margin: 0 auto;
    &_wrap {
      width: 100%;
      height: 100%;
      background-image: url("../../assets/img/burnmining/burn_banner_h5.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
    }
    &_text {
      width: 100%;
      height: 100%;
      h3 {
        font-size: 18px;
        font-family: IBMPlexSans-SemiBold, IBMPlexSans;
        font-weight: 600;
        color: #fff;
        padding: 12px 0 0 16px;
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
  }
}
</style>
</style>
