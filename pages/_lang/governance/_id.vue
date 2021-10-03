<template>
  <div class="governance_container">
    <Title />
    <nuxt-link class="governance_comeback" tag="div" to="/governance">
      <svg class="icon svg-icon" aria-hidden="true">
        <use xlink:href="#icon-rightSelect"></use>
      </svg>
      <span>返回</span>
    </nuxt-link>
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

.governance_comeback {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .icon {
    transform: rotate(180deg);
    width: 40px;
    height: 40px;
    @include themeify {
      fill: themed("color-17173a");
    }
  }
  span {
    font-size: 20px;
    line-height: 24px;
    font-family: IBMPlexSans-SemiBold, IBMPlexSans;
    font-weight: 600;
    @include themeify {
      color: themed("color-17173a");
    }
  }
  &:hover {
    .icon {
      fill: #fd7e14 !important;
    }
    span {
      color: #fd7e14 !important;
    }
  }
}
@media screen and (min-width: 750px) {
  .governance_container {
    width: 80%;
    min-width: 1026px;
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