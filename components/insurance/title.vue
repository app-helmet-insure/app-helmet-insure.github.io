<template>
  <div class="trade_title">
    <div class="text">
      <h3>{{ $t("Banner.Title") }}</h3>
      <span>{{ $t("Banner.Text") }}</span>
      <a href="https://pancakeswap.finance/ifo" target="_blank">{{
        $t("Banner.ReadMore")
      }}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .trade_title {
    height: 220px;
    background: #ffffff;
    margin-bottom: 15px;
    padding: 0 60px;
    display: flex;
    justify-content: space-between;
    background-image: url("../../assets/img/helmet/banner_ill.png");
    background-size: 344px 200px;
    background-position: 90% center;
    background-repeat: no-repeat;
    .text {
      h3 {
        width: 556px;
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
      }
      a {
        max-width: 110px;
        margin-top: 12px;
        display: flex;
        padding: 0 16px;
        align-items: center;
        justify-content: center;
        height: 40px;
        background: #121212;
        color: #fff;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .trade_title {
    height: 360px;
    background: #ffffff;
    margin-bottom: 15px;
    padding: 0 28px;
    display: flex;
    justify-content: space-between;
    background-image: url("../../assets/img/helmet/banner_ill.png");
    background-size: 275px 160px;
    background-position: center 90%;
    background-repeat: no-repeat;
    .text {
      h3 {
        font-size: 24px;
        font-weight: 600;
        color: #121212;
        line-height: 33px;
        margin-bottom: 20px;
      }
      span {
        color: #919aa6;
        line-height: 20px;
      }
    }
  }
}
</style>