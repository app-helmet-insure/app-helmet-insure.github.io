<template>
  <div class="iio_container">
    <Banner></Banner>
    <Action></Action>
  </div>
</template>

<script>
import Banner from "~/components/iio/banner.vue";
import Action from "~/components/iio/action.vue";
export default {
  components: {
    Banner,
    Action,
  },
  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>
.iio_container {
  background: #fff;
}
</style>
