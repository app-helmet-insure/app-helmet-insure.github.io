<template>
  <div class="main_container">
    <FlashMiningTitle></FlashMiningTitle>
    <div class="flashmining_container">
      <FlashMiningList></FlashMiningList>
      <Onepager></Onepager>
    </div>
  </div>
</template>

<script>
import FlashMiningList from '~/components/flashmining/flashmining_list.vue'
import FlashMiningTitle from '~/components/flashmining/flashmining_title.vue'
import Onepager from '~/components/common/onepager.vue'
export default {
  layout: 'default',
  components: { FlashMiningTitle, FlashMiningList, Onepager },
  data() {
    return {
      showDeposite: false,
      showWithdraw: false,
      current: '',
      TradeType: '',
    }
  },
  mounted() {
    this.$bus.$on('OPEN_DEPOSITE', (data) => {
      this.current = data.current
      this.TradeType = data.TradeType
      this.showDeposite = true
    })
    this.$bus.$on('CLOSE_DEPOSITE', (data) => {
      this.showDeposite = false
    })
  },
  methods: {
    closeDeposite() {
      this.showDeposite = false
    },
    openDeposite() {
      this.showDeposite = true
    },
    closeWithdraw() {
      this.showWithdraw = false
    },
    openWithdraw() {
      this.showWithdraw = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/base.scss';

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
      color: #17173a;
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
