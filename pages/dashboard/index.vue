<template>
  <div class="dashboard-page">
<!--    <DashboardBanner/>-->
<!--    <DashboardNFTs/>-->
<!--    <DashboardDAO/>-->
  </div>
</template>

<script>

import DashboardBanner from '~/components/dashboard/banner/index.vue'
import DashboardNFTs from '~/components/dashboard/nfts/index.vue'
import DashboardDAO from '~/components/dashboard/dao/index.vue'
export default {
  layout: "home",
  name: "dashboard",
  components: {
    DashboardBanner,
    DashboardNFTs,
    DashboardDAO
  },
  data() {
    return {

    }
  }
};
</script>

<style lang='scss' scoped>
.dashboard-page{

}
</style>
