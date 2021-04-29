<template>
  <div class="nft_container">
    <NFTTITLE></NFTTITLE>
    <NFTCARD></NFTCARD>
    <NFTCARDBOOK></NFTCARDBOOK>
    <NFTDIALGO></NFTDIALGO>
  </div>
</template>

<script>
import NFTTITLE from "./nft_title";
import NFTCARD from "./nft_card";
import NFTCARDBOOK from "./nft_cardbook";
import NFTDIALGO from "./nft_dialog";
export default {
  components: {
    NFTTITLE,
    NFTCARD,
    NFTCARDBOOK,
    NFTDIALGO,
  },
};
</script>

<style lang='scss' scoped>
.nft_container {
  width: 100%;
  height: 1474px;
  background: #241e26;
  box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
  border-radius: 10px 10px 5px 5px;
  padding: 40px 0;
  margin-bottom: 40px;
}
</style>