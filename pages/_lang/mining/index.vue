<template>
  <div class="main_container">
    <MiningTitle></MiningTitle>
    <div class="mining_container">
      <Governance />
      <LptMining />
      <TokenMinig />
      <Onepager></Onepager>
      <Compound></Compound>
    </div>
  </div>
</template>

<script>
import MiningTitle from "~/components/mining/mining-title.vue";
import Governance from "~/components/mining/governance";
import LptMining from "~/components/mining/lpt-mining";
import TokenMinig from "~/components/mining/token-mining.vue";
import Onepager from "~/components/common/onepager.vue";
import Compound from "~/components/mining/compound.vue";
export default {
  layout: "home",
  components: {
    Governance,
    MiningTitle,
    LptMining,
    TokenMinig,
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
@import "~/assets/css/themes.scss";

@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    .mining_container {
      width: 100%;
      min-width: 1026px;
      margin: 0 auto 30px;
    }
  }
}
@media screen and (max-width: 750px) {
  .main_container {
    width: 100%;
    .mining_container {
      width: 100%;
      padding: 0 10px;
      @include themeify {
        background: themed("color-f8f9fa");
      }
    }
  }
}
</style>