<template>
  <div class="main_container">
    <Title></Title>
    <div class="home_container">
      <InsuranceData></InsuranceData>
      <InsureanceList></InsureanceList>
    </div>
  </div>
</template>
<script>
import InsuranceData from "~/components/insurance/insurance-data.vue";
import InsureanceList from "~/components/insurance/insurance-list.vue";
import Title from "~/components/insurance/title.vue";
export default {
  layout: "default",
  name: "home",
  components: { InsuranceData, InsureanceList, Title },
};
</script>
<style lang="scss">
@media screen and (min-width: 750px) {
  .main_container {
    width: 100%;
    > .home_container {
      width: 100%;
      min-width: 1026px;
      margin: 20px auto 0;
    }
  }
}
</style>
