<template>
  <div class="onepager_mask">
    <div class="onepager_wraper">
      <div class="title">
        <span></span>
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$bus.$on("OPEN_ONEPAGER", (data) => {});
  },
};
</script>

<style lang='scss' scoped>
.onepager_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}
@media screen and (min-width: 750px) {
  .onepager_wrapper {
    width: 500px;
  }
}
</style>