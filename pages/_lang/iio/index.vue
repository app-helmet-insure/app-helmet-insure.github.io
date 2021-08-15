<template>
  <div class="main_container">
    <IIOMiningTitle></IIOMiningTitle>
    <div class="iio_container">
      <IIOMiningWrap></IIOMiningWrap>
      <IIOMiningDetails></IIOMiningDetails>
    </div>
  </div>
</template>

<script>
import IIOMiningTitle from "~/components/iio/iio_title.vue";
import IIOMiningWrap from "~/components/iio/iio_wrap.vue";
import IIOMiningDetails from "~/components/iio/iio_detail.vue";
export default {
  layout: "home",
  name: "iio",
  components: {
    IIOMiningTitle,
    IIOMiningWrap,
    IIOMiningDetails,
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";

@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    .iio_container {
      width: 100%;
      min-width: 1026px;
      margin: 0 auto 30px;
    }
  }
}
</style>