<template>
  <div class="main_container">
    <MyClaim></MyClaim>
  </div>
</template>

<script>
import MyClaim from "~/components/insurance/my-claim.vue";
export default {
  layout: "home",
  name: "myClaim",
  components: {
    MyClaim,
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    min-width: 1026px;
    margin: 20px auto 0;
  }
}
</style>