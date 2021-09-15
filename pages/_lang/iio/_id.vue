<template>
  <div class="iio_container">
    <Banner></Banner>
    <Action></Action>
    <About></About>
    <OnePager></OnePager>
  </div>
</template>

<script>
import Banner from "~/components/iio/banner.vue";
import Action from "~/components/iio/action.vue";
import About from "~/components/iio/about.vue";
import OnePager from "~/components/common/onepager.vue";
export default {
  layout: "home",
  name: "iio-id",
  components: {
    Banner,
    Action,
    About,
    OnePager,
  },
  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
.iio_container {
  @include themeify {
    background: themed("color-f8f9fa");
  }
}
</style>