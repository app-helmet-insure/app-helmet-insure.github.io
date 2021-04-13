<template>
  <div class="main_container">
    <div class="nft_wraper">
      <div class="nft_logo"></div>
      <div class="nft_title">Coming soon<span>......</span></div>
      <div class="nft_puzzle">
        <div class="pz1box"></div>
        <div class="pz1"></div>
        <div class="pz2box"></div>
        <div class="pz2"></div>
      </div>
      <p>
        Let's make all part of heated BSC protocols come out from puzzle to live
        by your $HELMET!
      </p>
    </div>
  </div>
</template>

<script>
import "~/assets/font/font.css";
export default {
  methods: {},
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .main_container {
    width: 100%;
    height: 100%;
    margin: 20px auto 40px;
    background: #241e26;
  }
  .nft_wraper {
    width: 1026px;
    height: 910px;
    margin: 0 auto;
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
      text-align: center;
      margin-top: 30px;
      font-size: 60px;
      font-family: FredokaOne-Regular;
      font-weight: 400;
      color: #fd7e14;
      line-height: 72px;
      span {
        font-family: Regular;
      }
    }
    .nft_puzzle {
      width: 100%;
      height: 535px;
      background-image: url("../../../assets/img/nftcome/bg_web.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-top: 30px;
      position: relative;
      .pz1 {
        position: absolute;
        width: 157px;
        height: 138px;
        left: 73px;
        bottom: 1px;
        background-image: url("../../../assets/img/nftcome/pz1_web.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .pz1box {
        width: 157px;
        height: 137px;
        background: transparent;
        position: absolute;
        left: 381px;
        top: 76px;
        z-index: 9;
        cursor: pointer;
        &:hover + .pz1 {
          left: 383px !important;
          bottom: 321px !important;
        }
      }
      .pz2 {
        position: absolute;
        width: 160px;
        height: 137px;
        right: 76px;
        top: 76px;
        background-image: url("../../../assets/img/nftcome/pz2_web.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .pz2box {
        width: 157px;
        height: 137px;
        background: transparent;
        position: absolute;
        right: 381px;
        top: 215px;
        z-index: 9;
        cursor: pointer;
        &:hover + .pz2 {
          right: 381px !important;
          top: 184px !important;
        }
      }
      .transform_pz1 {
        left: 383px;
        bottom: 322px;
      }
      .transform_pz2 {
        right: 381px;
        top: 184px;
      }
    }
    p {
      font-size: 18px;
      font-family: Arial-Black, Arial;
      font-weight: 900;
      color: #999bfb;
      line-height: 26px;
      text-align: center;
      margin-top: 38px;
    }
  }
}
@media screen and (max-width: 750px) {
  .main_container {
    width: 100%;
  }
  .nft_wraper {
    width: 100%;
    width: 355px;
    background: #241e26;
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
    border-radius: 10px;
    padding: 20px 0px 40px;
    margin: 0 auto;
    .nft_logo {
      width: 114px;
      height: 28px;
      background-image: url("../../../assets/img/nftcome/logo_web.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-left: 20px;
    }
    .nft_title {
      text-align: center;
      margin-top: 24px;
      font-size: 36px;
      font-family: FredokaOne-Regular;
      font-weight: 400;
      color: #fd7e14;
      line-height: 72px;
      span {
        font-family: Regular;
      }
    }
    .nft_puzzle {
      width: 100%;
      height: 321px;
      background-image: url("../../../assets/img/nftcome/bg_h5.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-top: 24px;
      position: relative;
      .pz1 {
        position: absolute;
        width: 94px;
        height: 82px;
        left: 33px;
        bottom: 0px;
        background-image: url("../../../assets/img/nftcome/pz1_h5.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .pz1box {
        width: 94px;
        height: 83px;
        background: transparent;
        position: absolute;
        left: 100px;
        top: 46px;
        z-index: 9;
        cursor: pointer;
        &:hover + .pz1 {
          left: 100px !important;
          bottom: 193px !important;
        }
      }
      .pz2 {
        position: absolute;
        width: 97px;
        height: 84px;
        right: 3px;
        bottom: 2px;
        background-image: url("../../../assets/img/nftcome/pz2_h5.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .pz2box {
        width: 97px;
        height: 65px;
        background: transparent;
        position: absolute;
        right: 98px;
        top: 128px;
        z-index: 9;
        cursor: pointer;
        &:hover + .pz2 {
          right: 98px !important;
          top: 110px !important;
        }
      }
      .transform_pz1 {
        left: 383px;
        bottom: 322px;
      }
      .transform_pz2 {
        right: 381px;
        top: 184px;
      }
    }
    p {
      font-size: 14px;
      font-family: Arial-Black, Arial;
      font-weight: 900;
      color: #999bfb;
      line-height: 24px;
      margin-top: 17px;
      padding: 0 11px 0 24px;
    }
  }
}
</style>