<template>
  <div class="iio_container">
    <Banner></Banner>
    <Action></Action>
    <OnePager></OnePager>
  </div>
</template>

<script>
import Banner from "~/components/iio/banner.vue";
import Action from "~/components/iio/action.vue";
import OnePager from "~/components/common/onepager.vue";
export default {
  components: {
    Banner,
    Action,
    OnePager,
  },
  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>
.iio_container {
  background: #f7f7fa;
}
</style>