<template>
  <div class="main_container">
    <NFTTITLE></NFTTITLE>
    <NFTCARDBOOK></NFTCARDBOOK>
    <NFTDIALGO></NFTDIALGO>
    <NFTWINDOW></NFTWINDOW>
  </div>
</template>

<script>
import NFTTITLE from "~/components/nft/nft_title";
import NFTCARDBOOK from "~/components/nft/nft_cardbook";
import NFTDIALGO from "~/components/nft/nft_dialog";
import NFTWINDOW from "~/components/nft/nft_window";
export default {
  layout: "home",
  components: {
    NFTTITLE,
    NFTCARDBOOK,
    NFTDIALGO,
    NFTWINDOW,
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .main_container {
    min-width: 1026px;
    margin: 0 auto;
    width: 100%;
    background: #241e26;
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
    padding: 40px 0;
  }
}
@media screen and (max-width: 750px) {
  .main_container {
    width: 100%;
    background: #241e26;
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
    padding: 40px 0 60px;
    height: auto;
  }
}
</style>