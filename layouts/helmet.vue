<template>
  <div class="helmet">
    <nuxt />
  </div>
</template>

<script>
import { mateMaskInfo } from "~/assets/utils/matemask.js";

export default {
  name: "helmet",
  mounted() {},
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .helmet {
    min-width: 1280px;
    width: 100%;
    min-height: 100vh;
    background: #121212;
  }
}
@media screen and (max-width: 750px) {
  .helmet {
    width: 100%;
    min-height: 100vh;
    background: #121212;
  }
}
</style>
