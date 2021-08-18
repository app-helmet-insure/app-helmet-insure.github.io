<template>
  <div class="helmet">
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: "page",
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .helmet {
    min-width: 1280px;
    width: 100%;
    min-height: 100vh;
    background: #000;
   
  }
}
@media screen and (max-width: 750px) {
  .helmet {
    width: 100%;
    min-height: 100vh;
    background: #000;
  }
}
</style>