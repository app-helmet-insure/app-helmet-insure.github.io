<template>
  <div class="governance_title">
    <div class="governance_title_wrap">
      <div class="governance_title_text">
        <h3>{{ $t("Governance.Tips3") }}</h3>
        <p>{{ $t("Governance.Tips4") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
.governance_title {
  background: #4b2910;
  border-radius: 5px;
  &_wrap {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/img/governance/governance_titlebg.png");
    background-repeat: no-repeat;
    background-position: center center;
  }
  &_text {
    h3 {
      font-family: IBMPlexSans-SemiBold, IBMPlexSans;
      font-weight: 600;
      color: #fff;
    }
    p {
      font-family: IBMPlexSans;
      color: #fff;
      line-height: 20px;
    }
  }
}
@media screen and (min-width: 750px) {
  .governance_title {
    width: 100%;
    min-width: 1026px;
    height: 140px;
    margin: 30px auto 10px;
    &_wrap {
      margin: 0 auto;
      background-image: url("../../assets/img/governance/governance_titlebg.png");
      background-size: 1026px 100%;
    }
    &_text {
      h3 {
        font-size: 24px;
        line-height: 32px;
        padding: 40px 0 0 40px;
      }
      p {
        font-size: 16px;
        margin: 11px 0 0 40px;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .governance_title {
    width: 95%;
    height: 120px;
    margin: 0 auto;
    &_wrap {
      background-image: url("../../assets/img/governance/governance_titlebg.png");
      background-size: 100% 100%;
    }
    &_text {
      width: 100%;
      height: 100%;
      h3 {
        width: 335px;
        font-size: 18px;
        padding: 15px 0 0 16px;
      }
      p {
        width: 329px;
        font-size: 12px;
        margin: 8px 0 0 16px;
      }
    }
  }
}
</style>