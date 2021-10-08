<template>
  <div class="main_container">
    <IBOMingTitle></IBOMingTitle>
    <div class="ibo_container">
      <div class="ibo_card" >
        <div class="ibo_project">
          <IBOCard v-for="(pool, index) in iboPools" :key="index" :pool="pool"></IBOCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IBOMingTitle from "~/components/ibo/ibo_title.vue";
import IBOCard from "~/components/ibo/ibo_card.vue";
import { iboPools } from '../../../config/ibo'
export default {
  layout: "home",
  name: "ibo",
  components: {
    IBOMingTitle,
    IBOCard,
  },
  data() {
    return {
      iboPools
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";

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
.ibo_project {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
@media screen and (max-width: 750px) {
  .ibo_project {
    padding-bottom: 30px;
    justify-content: center;
  }
}
</style>