<template>
  <div class="main_container">
    <MiningTitle></MiningTitle>
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
import MiningTitle from "~/components/mining/mining_title.vue";
import MiningList from "~/components/mining/mining_list.vue";
import Deposite from "~/components/mining/deposite-dialog.vue";
import Withdraw from "~/components/mining/withdraw-dialog.vue";
import Onepager from "~/components/mining/onepager.vue";
import Compound from "~/components/mining/compound.vue";
export default {
  layout: "default",
  components: {
    MiningTitle,
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
}
</style>