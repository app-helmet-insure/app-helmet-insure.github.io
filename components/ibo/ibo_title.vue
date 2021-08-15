<template>
  <div class="ibo_title">
    <div class="ibo_title_wrap">
      <div class="ibo_title_text">
        <h3>{{ $t("IBO.IBO_text25") }}</h3>
        <p>{{ $t("IBO.IBO_text26") }}</p>
      </div>
    </div>
    <p class="ibo_title_tip">
      {{ $t("IBO.IBO_text27") }}
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .ibo_title {
    width: 100%;
    min-width: 1026px;
    margin-bottom: 20px;
    &_wrap {
      width: 100%;
      height: 140px;
      background-image: url("../../assets/img/mining/mining_titlebg.png");
      background-color: #fe9f00;
      background-repeat: no-repeat;
      background-size: 1026px 100%;
      background-position: center center;
      border-radius: 5px;
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
    &_tip {
      margin-top: 14px;
      padding: 6px 20px;
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      color: #ffb801;
      background: rgba(255, 184, 1, 0.1);
    }
  }
}
@media screen and (max-width: 750px) {
  .ibo_title {
    width: 95%;
    margin: 0 auto 10px;
    &_wrap {
      width: 100%;
      height: 140px;
      background-image: url("../../assets/img/mining/mining_titlebg_h5.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      background-color: #fe9f00;
      border-radius: 5px;
    }
    &_text {
      width: 100%;
      height: 100%;
      h3 {
        font-size: 18px;
        font-family: IBMPlexSans-SemiBold, IBMPlexSans;
        font-weight: 600;
        color: #fff;
        padding: 20px 0 0 16px;
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
     &_tip {
      margin-top: 8px;
      padding: 6px 20px;
      width: 100%;
      font-size: 12px;
      font-weight: 500;
      color: #ffb801;
      background: rgba(255, 184, 1, 0.1);
    }
  }
}
</style>