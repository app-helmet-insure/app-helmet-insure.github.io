<template>
  <div class="burn_container">
    <BURNTITLE></BURNTITLE>
    <BURNLIST></BURNLIST>
    <Onepager></Onepager>
  </div>
</template>

<script>
import BURNTITLE from "~/components/burnbox/burn_title.vue";
import BURNLIST from "~/components/burnbox/burn_list.vue";
import Onepager from "~/components/mining/onepager.vue";
export default {
  components: {
    BURNTITLE,
    BURNLIST,
    Onepager,
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .burn_container {
    width: 1200px;
    margin: 0 auto 30px;
  }
  .burn_text {
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
  .burn_wrap {
    display: flex;
    align-items: center;
    .long_burn {
      margin: 60px auto 100px;
    }
  }
}
@media screen and (max-width: 750px) {
  .burn_text {
    padding-left: 24px;
    margin-top: 30px;

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
  .burn_wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    .long_burn {
      margin-top: 56px;
    }
  }
}
</style>