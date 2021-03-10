<template>
  <div class="burn_container">
    <div class="burn_wrap">
      <HCCTBURN></HCCTBURN>
    </div>
  </div>
</template>

<script>
import HCCTBURN from "~/components/burnmining/hcct_burn.vue";
export default {
  components: {
    HCCTBURN,
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .burn_container {
    background: #fff;
    width: 1200px;
    margin: 20px auto 0;
  }
  .burn_wrap {
    display: flex;
    align-items: center;
    .long_burn {
      margin: 60px auto 100px;
    }
  }
}
</style>