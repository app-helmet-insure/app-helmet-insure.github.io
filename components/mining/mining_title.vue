<template>
  <div class="mining_title">
    <div class="mining_title_wrap">
      <div class="mining_title_text">
        <h3>{{ $t("Tip.MiningTip1") }}</h3>
        <p>{{ $t("Tip.MiningTip2") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .mining_title {
    width: 100%;
    min-width: 1200px;
    height: 140px;
    background: #fe9f00;
    border-radius: 5px;
    margin-bottom: 20px;
    &_wrap {
      width: 100%;
      height: 100%;
      background-image: url("../../assets/img/mining/mining_titlebg.png");
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