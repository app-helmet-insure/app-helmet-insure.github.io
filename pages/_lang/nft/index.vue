<template>
  <div class="main_container">
    <NFT></NFT>
  </div>
</template>

<script>
import NFT from "~/components/nft/nft_wrap.vue";
export default {
  components: {
    NFT,
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    min-width: 1026px;
    margin: 20px auto 0;
  }
}
</style>