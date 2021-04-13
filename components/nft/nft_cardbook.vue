<template>
  <div class="nft_cardbook">
    <div class="nft_cardbook_title">
      <span>我的卡片<i></i></span>
    </div>
    <div class="nft_cardbook_balance">
      <p>我的 XXX NFT：2</p>
      <p>我的待兑换NFT：2</p>
    </div>
    <div class="nft_cardbook_cards">
      <div class="dora_card"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.nft_cardbook {
  padding: 0 30px;
  &_title {
    height: 64px;
    border-bottom: 4px solid #342d37;
    span {
      width: 90px;
      display: flex;
      align-items: center;
      height: 64px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #999bfb;
      line-height: 64px;
      border-bottom: 4px solid #999bfb;
      justify-content: space-between;
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("../../assets/img/nft/crystal.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &_balance {
    display: flex;
    align-items: center;
    height: 60px;
    p {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #ffffff;
      line-height: 20px;
      margin-right: 20px;
      &:last-of-type {
        margin: 0;
      }
    }
  }
  &_cards {
    .dora_card {
      width: 309px;
      height: 400px;
      background: #fcc;
    }
  }
}
</style>