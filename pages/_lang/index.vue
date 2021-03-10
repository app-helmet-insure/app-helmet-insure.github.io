<template>
  <div class="main_container">
    <div class="home_container">
      <Title></Title>
      <Banner></Banner>
      <InsuranceCenter></InsuranceCenter>
      <InsuranceBottom></InsuranceBottom>
    </div>
  </div>
</template>
<script>
import Banner from "~/components/insurance/banner.vue";
import InsuranceCenter from "~/components/insurance/insurance-center.vue";
import InsuranceBottom from "~/components/insurance/insurance-bottom.vue";
import Title from "~/components/insurance/title.vue";
export default {
  layout: "default",
  name: "home",
  components: {
    Banner,
    InsuranceCenter,
    InsuranceBottom,
    Title,
  },
};
</script>
<style lang="scss">
.main_container {
  background: #f7f7fa;
}
@media screen and (min-width: 750px) {
  .main_container {
    > .home_container {
      width: 1200px;
      margin: 20px auto 0;
    }
  }
}
</style>
