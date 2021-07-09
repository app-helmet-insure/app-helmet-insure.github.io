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
  components: { Migrate, History, Dialog },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";

@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    .flashmining_container {
      width: 100%;
      min-width: 1026px;
      margin: 0 auto 30px;
    }
  }
}
</style>