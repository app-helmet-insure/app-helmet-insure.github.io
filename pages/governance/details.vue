<template>
  <div class="governance_container">
    <Title />
    <nuxt-link class="governance_comeback" tag="div" to="/governance">
      <svg class="icon svg-icon" aria-hidden="true">
        <use xlink:href="#icon-rightSelect"></use>
      </svg>
      <span>{{ $t("Governance.Governance_text22") }}</span>
    </nuxt-link>
    <div class="governance_infomation_wrap">
      <div class="governance_infomation">
        <Proposal />
        <Details />
      </div>
    </div>
  </div>
</template>

<script>
import Title from "~/components/governance/title.vue";
import Proposal from "~/components/governance/proposal.vue";
import Details from "~/components/governance/details.vue";
export default {
  layout: "home",
  name: "governance-details",
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
  width: 130px;
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
    background: transparent;
  }
  .governance_infomation_wrap {
    min-width: 1026px;
    margin: 0 auto;
    @include themeify {
      // background: themed("color-ffffff");
      background: #fff3de;
    }
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
    border-radius: 5px;
  }
  .governance_infomation {
    display: flex;
    width: 1026px;
    margin: 0 auto;
    padding: 0 20px;
  }
}
@media screen and (max-width: 750px) {
  .governance_infomation_wrap {
    width: 95%;
    margin: 0 auto;
    @include themeify {
      background: #fff3de;
    }
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
  }
  .governance_infomation {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 0 10px;
  }
}
</style>