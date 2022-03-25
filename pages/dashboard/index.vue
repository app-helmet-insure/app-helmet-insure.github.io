<template>
  <div class="dashboard-page">
    <DashboardBanner :duskNftAvatar="duskNftAvatar"/>
    <div class="tabs">
      <div v-for="item in tabs" :key="item" @click="active = item" :class="{active: active === item}">
        <img src="../../assets/img/dashboard/H.png" v-if="item === 'DAO' && active !== item" alt="" style="width: 15px;height: 15px;">
        <img src="../../assets/img/dashboard/H-white.png" v-if="item === 'DAO' && active === item" alt="" style="width: 15px;height: 15px;">
        {{item}}</div>
    </div>
    <DashboardPortfolio v-show="active === 'Portfolio'"/>
    <DashboardNFTs v-show="active === 'NFTs'" :setDuskNftAvatar="setDuskNftAvatar"/>
    <DashboardDao v-show="active === 'DAO'"/>
    <div style="height: 50px;width: 100%"></div>
  </div>
</template>

<script>

import DashboardBanner from '~/components/dashboard/banner/index.vue'
import DashboardNFTs from '~/components/dashboard/nfts/index.vue'
import DashboardPortfolio from '~/components/dashboard/portfolio/index.vue'
import DashboardDao from '~/components/dashboard/dao/index.vue'
export default {
  layout: "home",
  name: "dashboard",
  components: {
    DashboardBanner,
    DashboardNFTs,
    DashboardPortfolio,
    DashboardDao
  },
  data() {
    return {
      tabs: ['Portfolio', 'NFTs', 'DAO'],
      active: 'Portfolio',
      duskNftAvatar: ""
    }
  },
  methods: {
    setDuskNftAvatar(duskNftAvatar){
      this.duskNftAvatar = duskNftAvatar
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
.dashboard-page{
  padding: 0 29px;
  .tabs{
    display: flex;
    margin: 40px 0 25px 0;
    &>div{
      width: 110px;
      height: 40px;
      @include themeify {
        color: themed("color-17173a");
      }

      border-radius: 20px;
      padding: 11px 20px;
      font-size: 18px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 500;
      line-height: 18px;
      text-align: center;
      cursor: pointer;
      &.active{
        background: #FD7E14;
        box-shadow: 0px 4px 9px 0px rgba(253,126,20,0.5);
        color: #FFFFFF!important;
      }
    }
  }
}
@media (max-width: 750px) {
  .dashboard-page {
    padding: 0 10px;
  }
}
@media (min-width: 750px) {
  .dashboard-page{
    width: 80%;
    margin: 0 auto;
    min-width: 1026px;
  }
}
</style>
