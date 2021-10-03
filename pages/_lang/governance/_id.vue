<template>
  <div class="governance_container">
    <Title />
  </div>
</template>

<script>
import Title from "~/components/governance/title.vue";
export default {
  layout: "home",
  name: "governance-id",
  components: { Title },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";

@media screen and (min-width: 750px) {
  .governance_container {
    width: 80%;
    margin: 0 auto;
  }
}
</style>