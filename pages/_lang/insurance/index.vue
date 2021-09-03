<template>
  <div class="main_container">
    <Banner />
    <div class="home_container">
      <Data />
      <Burn />
      <List />
    </div>
  </div>
</template>
<script>
import Data from "~/components/insurance/data.vue";
import Burn from "~/components/insurance/burn.vue";
import List from "~/components/insurance/list.vue";
import Banner from "~/components/insurance/banner.vue";
export default {
  layout: "home",
  components: { data, List, burn, Banner },
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
