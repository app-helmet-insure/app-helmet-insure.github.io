<template>
  <div class="main_container">
    <div class="Mining_text">
      <h3>{{ $t("Tip.MiningTip1") }}</h3>
      <p>{{ $t("Tip.MiningTip2") }}</p>
    </div>
    <div class="mining_container">
      <MiningList></MiningList>
      <Onepager></Onepager>
      <Compound></Compound>
      <Deposite
        :current="current"
        :TradeType="TradeType"
        @close="closeDeposite"
        v-if="showDeposite"
      ></Deposite>
    </div>
  </div>
</template>

<script>
import HelmetBnbPool from "~/components/mining/helmet_bnb_pool.vue";
import HelmetForPool from "~/components/mining/helmet_for_pool.vue";
import HelmetHelmetPool from "~/components/mining/helmet_helmet_pool.vue";
import HelmetBurgerPool from "~/components/mining/helmet_burger_pool.vue";
import HelmetDodoPool from "~/components/mining/helmet_dodo_pool.vue";
import MiningList from "~/components/mining/mining_list.vue";
import Deposite from "~/components/mining/deposite-dialog.vue";
import Withdraw from "~/components/mining/withdraw-dialog.vue";
import Onepager from "~/components/mining/onepager.vue";
import Compound from "~/components/mining/compound.vue";
export default {
  layout: "default",
  components: {
    HelmetHelmetPool,
    HelmetBurgerPool,
    HelmetForPool,
    HelmetBnbPool,
    HelmetDodoPool,
    MiningList,
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
.main_container {
  background: #f7f7fa;
}
@media screen and (min-width: 750px) {
  .main_container {
    > .mining_container {
      width: 1200px;
      margin: 20px auto 0;
    }
    .Mining_text {
      text-align: center;
      margin-top: 60px;
      h3 {
        font-size: 34px;
        font-weight: bold;
        color: #121212;
      }
      p {
        margin-top: 20px;
        font-size: 16px;
        color: #787878;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .Mining_text {
    padding-left: 24px;
    padding-top: 30px;
    padding-bottom: 20px;
    background: #fff;
    h3 {
      font-size: 24px;
      width: 267px;
      font-weight: bold;
      color: #121212;
      margin-bottom: 10px;
    }
    p {
      width: 309px;
      font-size: 14px;
      color: #787878;
      line-height: 22px;
    }
  }
}
</style>