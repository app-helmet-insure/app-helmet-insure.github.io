<template>
  <div class="main_container">
    <div class="flash_text">
      <h3>{{ $t("Tip.FlashTip1") }}</h3>
      <p>{{ $t("Tip.FlashTip2") }}</p>
    </div>
    <div class="flashmining_container">
      <div class="pool_wrap">
        <HdodoPool></HdodoPool>
        <HmathPool></HmathPool>
      </div>
      <div class="pool_wrap">
        <HautoPool></HautoPool>
        <Bnb500Pool></Bnb500Pool>
      </div>
      <div class="pool_wrap">
        <HctkPool></HctkPool>
        <HcctPool></HcctPool>
      </div>
      <Onepager></Onepager>
    </div>
  </div>
</template>

<script>
import HcctPool from "~/components/flashmining/hcct_pool.vue";
import HctkPool from "~/components/flashmining/hctk_pool.vue";
import Bnb500Pool from "~/components/flashmining/bnb500_pool.vue";
import HautoPool from "~/components/flashmining/hauto_pool.vue";
import HmathPool from "~/components/flashmining/hmath_pool.vue";
import HdodoPool from "~/components/flashmining/hdodo_pool.vue";
import Onepager from "~/components/mining/onepager.vue";
export default {
  layout: "default",
  components: {
    HcctPool,
    HctkPool,
    Onepager,
    Bnb500Pool,
    HautoPool,
    HmathPool,
    HdodoPool,
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
    > .flashmining_container {
      width: 1200px;
      margin: 20px auto 0;
    }
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