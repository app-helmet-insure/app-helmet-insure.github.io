<template>
  <div class="governance_container">
    <Title />
    <div class="governance_wrap">
      <Proposal />
      <Details />
    </div>
  </div>
</template>

<script>
import Title from "~/components/governance/title.vue";
import Proposal from "~/components/governance/proposal.vue";
import Details from "~/components/governance/details.vue";
export default {
  layout: "home",
  name: "governance-id",
  components: { Title, Proposal, Details },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";

@media screen and (min-width: 750px) {
  .governance_container {
    width: 80%;
    margin: 0 auto;
  }
  .governance_wrap {
    display: flex;
    min-width: 1026px;
    @include themeify {
      background: themed("color-ffffff");
    }
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
    border-radius: 5px;
    padding: 35px 20px;
  }
}
@media screen and (max-width: 750px) {
  .governance_wrap {
    display: flex;
    flex-direction: column;
    @include themeify {
      background: themed("color-ffffff");
    }
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
    border-radius: 5px;
    padding: 35px 20px;
  }
}
</style>