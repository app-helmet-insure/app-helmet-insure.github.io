<template>
  <div class="mining_container">
    <!-- <Banner></Banner> -->
    <!-- <p class="mining-list-title">Select Your Mining Pool</p> -->
    <HelmetBurgerPool></HelmetBurgerPool>
    <HelmetBnbPool></HelmetBnbPool>
    <HelmetHelmetPool></HelmetHelmetPool>
    <Onepager></Onepager>
    <!-- <MiningList></MiningList> -->
    <!-- <Protect :styleClass="'mining-home'"></Protect> -->
    <Compound></Compound>
    <Deposite
      :current="current"
      :TradeType="TradeType"
      @close="closeDeposite"
      v-if="showDeposite"
    ></Deposite>
  </div>
</template>

<script>
import Banner from "~/components/mining/banner.vue";
import HelmetBnbPool from "~/components/mining/helmet_bnb_pool.vue";
import HelmetHelmetPool from "~/components/mining/helmet_helmet_pool.vue";
import HelmetBurgerPool from "~/components/mining/helmet_burger_pool.vue";
import MiningList from "~/components/mining/mining-list.vue";
import Protect from "~/components/mining/protect.vue";
import Deposite from "~/components/mining/deposite-dialog.vue";
import Withdraw from "~/components/mining/withdraw-dialog.vue";
import Onepager from "~/components/mining/onepager.vue";
import Compound from "~/components/mining/compound.vue";
export default {
  layout: "default",
  components: {
    Banner,
    HelmetHelmetPool,
    HelmetBurgerPool,
    HelmetBnbPool,
    MiningList,
    Protect,
    Deposite,
    Withdraw,
    Onepager,
    Compound,
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