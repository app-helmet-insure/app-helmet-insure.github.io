<template>
  <div class="main_container">
    <div class="migrate_container">
      <Title />
    </div>
  </div>
</template>

<script>
import Title from "~/components/migration/index";
export default {
  components: { Title },
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