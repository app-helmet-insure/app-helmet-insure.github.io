<template>
  <div class="main_container">
    <InsuranceData></InsuranceData>
    <InsureanceList></InsureanceList>
  </div>
</template>

<script>
import InsuranceData from "~/components/insurance/insurance-data.vue";
import InsureanceList from "~/components/insurance/insurance-list.vue";
export default {
  components: {
    InsuranceData,
    InsureanceList,
  },
};
</script>

<style>
.main_container {
  padding-bottom: 100px;
}
</style>