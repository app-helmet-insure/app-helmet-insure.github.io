<template>
  <div class="main_container">
    <div class="nft_wraper">
      <div class="nft_logo"></div>
      <div class="nft_title"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .main_container {
    width: 80%;
    width: 1026px;
    margin: 20px auto 40px;
  }
  .nft_wraper {
    width: 1026px;
    height: 910px;
    background: #241e26;
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
    border-radius: 10px;
    padding: 40px 0px;
    .nft_logo {
      width: 239px;
      height: 58px;
      background-image: url("../../../assets/img/nftcome/logo_web.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-left: 40px;
    }
    .nft_title {
      font-size: 60px;
      font-family: FredokaOne-Regular, FredokaOne;
      font-weight: 400;
      color: #fd7e14;
      line-height: 72px;
    }
  }
}
</style>