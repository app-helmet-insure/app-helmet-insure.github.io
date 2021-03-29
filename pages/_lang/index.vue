<template>
  <div class="main_container">
    <Title></Title>
    <div class="home_container">
      <InsureanceList></InsureanceList>
    </div>
  </div>
</template>
<script>
import InsureanceList from "~/components/insurance/insurance-list.vue";
import Title from "~/components/insurance/title.vue";
export default {
  layout: "default",
  name: "home",
  components: {
    InsureanceList,
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
      // width: 1200px;
      margin: 20px auto 0;
    }
  }
}
</style>
