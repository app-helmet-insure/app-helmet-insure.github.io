<template>
  <div class="main_container">
    <BurnTitle></BurnTitle>
    <div class="burn_container">
      <BurnList></BurnList>
      <Onepager></Onepager>
    </div>
  </div>
</template>

<script>
import BurnTitle from "~/components/burnbox/burn-title.vue";
import BurnList from "~/components/burnbox/burn-list.vue";
import Onepager from "~/components/common/onepager.vue";
export default {
  layout: "home",
  name:'burnbox',
  components: {
    BurnTitle,
    BurnList,
    Onepager,
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/themes.scss";
@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    .burn_container {
      width: 100%;
      min-width: 1026px;
      margin: 0 auto 30px;
    }
    .burn_text {
      text-align: center;
      margin-top: 60px;
      h3 {
        font-size: 34px;
        font-weight: bold;
        @include themeify {
          background: themed("color-17173a");
        }
      }
      p {
        margin-top: 20px;
        font-size: 16px;
        color: #787878;
      }
    }
    .burn_wrap {
      display: flex;
      align-items: center;
      .long_burn {
        margin: 60px auto 100px;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .burn_text {
    padding-left: 24px;
    margin-top: 30px;

    h3 {
      font-size: 24px;
      width: 267px;
      font-weight: bold;
      @include themeify {
        background: themed("color-17173a");
      }
      margin-bottom: 10px;
    }
    p {
      width: 309px;
      font-size: 14px;
      color: #787878;
      line-height: 22px;
    }
  }
  .burn_wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    .long_burn {
      margin-top: 56px;
    }
  }
}
</style>
