<template>
  <div class="wraper" v-if="wraperFlag">
    <PHeader></PHeader>
    <div class="wraper_slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PHeader from "~/components/common/header.vue";
export default {
  components: {
    PHeader,
  },
  data() {
    return {
      wraperFlag: false,
    };
  },
  mounted() {
    this.$bus.$on("OPEN_WRAPER_PAFE", (res) => {
      this.wraperFlag = res;
    });
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
@media screen and(min-width:750px) {
  .wraper {
    display: none;
  }
}
@media screen and(max-width:750px) {
  .wraper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    @include themeify {
      background: themed("color-f8f9fa");
    }
    overflow: hidden;
    z-index: 12;
    display: flex;
    flex-direction: column;
  }
  .wraper_slot {
    flex: 1;
    overflow-y: scroll;
  }
}
</style>