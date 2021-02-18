<template>
  <div class="mining_container">
    <div class="pool_wrap">
      <HelmetHctkPool></HelmetHctkPool>
      <HelmetHcctPool></HelmetHcctPool>
    </div>
    <div class="pool_wrap">
      <HelmetBnb500Pool></HelmetBnb500Pool>
    </div>
    <Compound></Compound>
    <Deposite
      :current="current"
      :TradeType="TradeType"
      @close="closeDeposite"
      v-if="showDeposite"
    ></Deposite>
    <Onepager></Onepager>
  </div>
</template>

<script>
import HelmetHcctPool from "~/components/mining/helmet_hcct_pool.vue";
import HelmetHctkPool from "~/components/mining/helmet_hctk_pool.vue";
import HelmetBnb500Pool from "~/components/mining/helmet_bnb500_pool.vue";
import Deposite from "~/components/mining/deposite-dialog.vue";
import Onepager from "~/components/mining/onepager.vue";
import Compound from "~/components/mining/compound.vue";
export default {
  layout: "default",
  components: {
    HelmetHcctPool,
    HelmetHctkPool,
    Deposite,
    Onepager,
    Compound,
    HelmetBnb500Pool,
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
    padding: 0 80px;
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