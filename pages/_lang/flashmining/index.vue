<template>
  <div class="main_container">
    <FlashMiningTitle></FlashMiningTitle>
    <FlashMiningList></FlashMiningList>
    <Onepager></Onepager>
  </div>
</template>

<script>
import FlashMiningList from "~/components/flashmining/flashmining_list.vue";
import FlashMiningTitle from "~/components/flashmining/flashmining_title.vue";
import Onepager from "~/components/mining/onepager.vue";
export default {
  layout: "default",
  components: { FlashMiningTitle, FlashMiningList, Onepager },
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
    width: 1200px;
    margin: 0 auto 30px;
  }
  .flash_text {
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
  .pool_wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
  }
}

@media screen and (max-width: 750px) {
  .flash_text {
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