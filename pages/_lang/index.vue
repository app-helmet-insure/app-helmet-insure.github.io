<template>
  <div class="main_container">
    <Title />
    <div class="home_container">
      <InsuranceData />
      <HelmetBurning />
      <InsureanceList />
    </div>
  </div>
</template>
<script>
import InsuranceData from "~/components/insurance/insurance-data.vue";
import HelmetBurning from "~/components/insurance/HelmetBurning.vue";
import InsureanceList from "~/components/insurance/insurance-list.vue";
import Title from "~/components/insurance/title.vue";
export default {
  layout: "default",
  name: "home",
  components: { InsuranceData, InsureanceList, HelmetBurning, Title },
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
