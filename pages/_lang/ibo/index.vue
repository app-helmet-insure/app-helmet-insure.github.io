<template>
  <div class="main_container">
    <IBOMingTitle></IBOMingTitle>
    <div class="ibo_container">
        <IBOCard v-for="(pool, index) in iboPools" :key="index" :pool="pool"></IBOCard>
    </div>
  </div>
</template>

<script>
import IBOMingTitle from "~/components/ibo/ibo_title.vue";
import IBOCard from "~/components/ibo/ibo_card.vue";
import { iboPools } from './config'
export default {
  components: {
    IBOMingTitle,
    IBOCard
  },
  data() {
    return {
      iboPools
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";

@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    .ibo_container {
      width: 100%;
      min-width: 1026px;
      margin: 0 auto 30px;
    }
  }
}
</style>