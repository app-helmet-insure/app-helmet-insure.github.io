<template>
  <div class="main_container">
    <Banner />
    <div class="home_container">
      <InsuranceData />
      <HelmetBurning />
      <InsureanceList />
    </div>
  </div>
</template>
<script>
import InsuranceData from "~/components/insurance/insuranceData.vue";
import HelmetBurning from "~/components/insurance/helmetBurning.vue";
import InsureanceList from "~/components/insurance/insuranceList.vue";
import Banner from "~/components/insurance/banner.vue";
export default {
  layout: "home",
  components: { InsuranceData, InsureanceList, HelmetBurning, Banner },
};
</script>
<style lang="scss">
@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    > .home_container {
      width: 100%;
      min-width: 1026px;
      margin: 20px auto 0;
    }
  }
}
@media screen and (max-width: 750px) {
  .main_container {
    width: 100%;
    > .home_container {
      width: 100%;
    }
  }
}
</style>
