<template>
  <div class="flashmining_title">
    <div class="flashmining_title_wrap">
      <div class="flashmining_title_text">
        <h3>{{ $t("Tip.FlashTip1") }}</h3>
        <p>{{ $t("Tip.FlashTip2") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .flashmining_title {
    width: 100%;    min-width: 1200px;
    height: 140px;
    background: #b948ea;
    border-radius: 5px;
    margin-bottom: 20px;
    &_wrap {
      margin: 0 auto;
      width: 1200px;
      height: 100%;
      background-image: url("../../assets/img/flashmining/flashmining_titlebg.png");
      background-repeat: no-repeat;
      background-size: 1026px 100%;
      background-position: center center;
    }
    &_text {
      h3 {
        font-size: 24px;
        font-family: IBMPlexSans-SemiBold, IBMPlexSans;
        font-weight: 600;
        color: #ffffff;
        line-height: 32px;
        padding: 40px 0 0 40px;
      }
      p {
        font-size: 16px;
        font-family: IBMPlexSans;
        color: #ffffff;
        line-height: 20px;
        margin: 11px 0 0 40px;
      }
    }
  }
}
</style>