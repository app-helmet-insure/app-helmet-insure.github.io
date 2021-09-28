<template>
  <div class="main_container">
    <div class="migrate_container">
      <Title />
      <Pending />
      <IBO />
      <Action />
      <JumpDialog />
      <TipDialog />
    </div>
  </div>
</template>

<script>
import Title from "~/components/migration/title";
import IBO from "~/components/migration/ibo";
import Pending from "~/components/migration/pending";
import Action from "~/components/migration/action";
import JumpDialog from "~/components/migration/jump_dialog";
import TipDialog from "~/components/migration/tip_dialog";
export default {
  layout: "home",
  components: { Title, IBO, Pending, Action, JumpDialog, TipDialog },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/themes.scss";

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