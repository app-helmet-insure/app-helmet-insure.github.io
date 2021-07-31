<template>
  <div class="main_container">
    <div class="migrate_container">
      <Title />
      <Dialog />
    </div>
  </div>
</template>

<script>
import Title from "~/components/migration/index";
import Dialog from "~/components/migration/dialog";
export default {
  components: { Title,Dialog },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";

@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    background: #fff;
    padding-bottom: 70px;
  }
}
@media screen and (max-width: 750px) {
  .main_container {
    width: 100%;
    background: #fff !important;
    padding-bottom: 70px;
  }
}
</style>  