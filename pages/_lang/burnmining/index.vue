<template>
  <div class="burn_container">
    <div class="burn_wrap">
      <LongBurn></LongBurn>
    </div>
  </div>
</template>

<script>
import LongBurn from '~/components/burnmining/long_burn.vue'
export default {
  components: {
    LongBurn
  }
}
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