<template>
  <div class="main_container">
    <MyClaim></MyClaim>
  </div>
</template>

<script>
import MyClaim from "~/components/insurance/my-claim.vue";
export default {
  components: {
    MyClaim,
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .main_container {
    width: 1200px;
    margin: 20px auto 0;
  }
}
</style>