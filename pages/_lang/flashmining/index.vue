<template>
  <div class="main_container">
    <FlashTitle />
    <div class="flashmining_container">
      <FlashList />
      <Onepager></Onepager>
    </div>
  </div>
</template>

<script>
import FlashList from "~/components/flashmining/flash-list.vue";
import FlashTitle from "~/components/flashmining/flash-title.vue";
import Onepager from "~/components/common/onepager.vue";
export default {
  layout: "home",
  name:'flashmining',
  components: { FlashList, FlashTitle, Onepager },
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

<style lang="scss" scoped>
@import "~/assets/css/themes.scss";

@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    .flashmining_container {
      width: 100%;
      min-width: 1026px;
      margin: 0 auto 30px;
    }
  }
}
</style>
