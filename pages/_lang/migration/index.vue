<template>
  <div class="main_container">
    <div class="migrate_container">
      <Title />
      <JumpDialog />
      <TipDialog />
    </div>
  </div>
</template>

<script>
import Title from "~/components/migration/index";
import JumpDialog from "~/components/migration/jump_dialog";
import TipDialog from "~/components/migration/tip_dialog";
export default {
  components: { Title, JumpDialog, TipDialog },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";

@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    @include themeify {
      background: themed("color-ffffff");
    }
    padding-bottom: 70px;
  }
}
@media screen and (max-width: 750px) {
  .main_container {
    width: 100%;
    @include themeify {
      background: themed("color-ffffff") !important;
    }
    padding-bottom: 70px;
  }
}
</style>  