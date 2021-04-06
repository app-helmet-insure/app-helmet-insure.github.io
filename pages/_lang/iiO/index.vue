<template>
  <div class="iio_container">
    <Banner :ticketFlag="ticketFlag"></Banner>
    <Action :ticketFlag="ticketFlag"></Action>
  </div>
</template>

<script>
import Banner from "~/components/iio/banner.vue";
import Action from "~/components/iio/action.vue";
import { applied3 } from "~/interface/iio.js";
export default {
  components: {
    Banner,
    Action,
  },
  data() {
    return {
      ticketFlag: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.buyAppliedFlag();
    }, 1000);
  },
  methods: {
    async buyAppliedFlag() {
      let reward_name = "IIO_HELMETBNB_REWARD";
      let pool_name = "IIO_HELMETBNB_POOL";
      let res = await applied3(pool_name, reward_name);
      this.ticketFlag = res;
    },
  },
};
</script>

<style lang='scss' scoped>
.iio_container {
  background: #fff;
}
</style>
