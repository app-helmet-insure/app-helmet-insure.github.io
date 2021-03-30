<template>
  <div class="main_container">
    <MyPolicy></MyPolicy>
  </div>
</template>

<script>
import MyPolicy from "~/components/insurance/my-policy.vue";
export default {
  components: {
    MyPolicy,
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