<template>
  <div class="main_container">
    <Migrate />
  </div>
</template>

<script>
import Migrate from "~/components/guard/migrate.vue";
export default {
  components: { Migrate },
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