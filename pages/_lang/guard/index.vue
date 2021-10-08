<template>
  <div class="main_container">
    <Migrate />
    <History />
    <Dialog />
  </div>
</template>

<script>
import Migrate from "~/components/guard/migrate.vue";
import History from "~/components/guard/history.vue";
import Dialog from "~/components/guard/dialog.vue";
export default {
  layout: "home",
  name: "guard",
  components: { Migrate, History, Dialog },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/themes.scss";

@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
  }
}
</style>