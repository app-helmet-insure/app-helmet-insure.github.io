<template>
  <!-- <div class="mining_container">
    <div class="pool_wrap">
      <HmathPool></HmathPool>
      <HautoPool></HautoPool>
    </div>
    <div class="pool_wrap">
      <Bnb500Pool></Bnb500Pool>
      <HctkPool></HctkPool>
    </div>
    <div class="pool_wrap">
      <HcctPool></HcctPool>
    </div>
    <Onepager></Onepager>
  </div> -->
  <div class="mining_container">
    <div class="pool_wrap">
      <!-- <HmathPool></HmathPool> -->
      <HautoPool></HautoPool>
      <Bnb500Pool></Bnb500Pool>
    </div>
    <div class="pool_wrap">
      <HctkPool></HctkPool>
      <HcctPool></HcctPool>
    </div>
    <Onepager></Onepager>
  </div>
</template>

<script>
import HcctPool from "~/components/flashmining/hcct_pool.vue";
import HctkPool from "~/components/flashmining/hctk_pool.vue";
import Bnb500Pool from "~/components/flashmining/bnb500_pool.vue";
import HautoPool from "~/components/flashmining/hauto_pool.vue";
import HmathPool from "~/components/flashmining/hmath_pool.vue";
import Onepager from "~/components/mining/onepager.vue";
export default {
  layout: "default",
  components: {
    HcctPool,
    HctkPool,
    Onepager,
    Bnb500Pool,
    HautoPool,
    HmathPool
  },
  data() {
    return {
      showDeposite: false,
      showWithdraw: false,
      current: "",
      TradeType: "",
    };
  },
  mounted() {
    this.$bus.$on("OPEN_DEPOSITE", (data) => {
      this.current = data.current;
      this.TradeType = data.TradeType;
      this.showDeposite = true;
    });
    this.$bus.$on("CLOSE_DEPOSITE", (data) => {
      this.showDeposite = false;
    });
  },
  methods: {
    closeDeposite() {
      this.showDeposite = false;
    },
    openDeposite() {
      this.showDeposite = true;
    },
    closeWithdraw() {
      this.showWithdraw = false;
    },
    openWithdraw() {
      this.showWithdraw = true;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
.mining_container {
  background: #f7f7fa;
}

@media screen and (min-width: 750px) {
  .mining-list-title {
    height: 60px;
    line-height: 60px;
  }
  .pool_wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
  }
}
@media screen and (max-width: 750px) {
  .mining-list-title {
    font-size: 16px;
    color: $text-t;
    height: 60px;
    line-height: 60px;
    padding-left: 16px;
  }
}
</style>