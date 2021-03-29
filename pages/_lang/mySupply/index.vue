<template>
  <div class="main_container">
    <MySupply></MySupply>
  </div>
</template>

<script>
import MySupply from "~/components/insurance/my-supply.vue";
export default {
  components: {
    MySupply,
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