<template>
  <div class="governance_container">
    <Title />
    <List />
  </div>
</template>

<script>
import Title from "~/components/governance/title.vue";
import List from "~/components/governance/list.vue";
export default {
  layout: "home",
  name: "governance",
  components: { Title, List },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";

@media screen and (min-width: 750px) {
  .governance_container {
    width: 80%;
    margin: 0 auto;
    min-width: 1026px;
  }
}
</style>