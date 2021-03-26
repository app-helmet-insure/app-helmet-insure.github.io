<template>
  <div class="iiO">
    <div class="banner"></div>
    <div class="content_h5">
      <h3>
        <img src="~/assets/img/iio/helmet_logo.png" alt="" /> Coming soon…
      </h3>
      <p>Your OPTION to redefine Initial Offering</p>
    </div>
    <div class="action">
      <div class="action_step_wrap">
        <div class="action_step_item">
          <svg class="icon" aria-hidden="true">
            <use href="#icon-buy"></use>
          </svg>
          <span>{{ $t("IIO.BuyTokenTicket") }}</span>
        </div>
        <svg class="icon" aria-hidden="true">
          <use href="#icon-WhiteRight"></use>
        </svg>
        <div class="action_step_item">
          <svg class="icon" aria-hidden="true">
            <use href="#icon-share"></use>
          </svg>
          <span>{{ $t("IIO.DepositLptReward") }}</span>
        </div>
        <svg class="icon" aria-hidden="true">
          <use href="#icon-WhiteRight"></use>
        </svg>
        <div class="action_step_item">
          <svg class="icon" aria-hidden="true">
            <use href="#icon-earn"></use>
          </svg>
          <span>{{ $t("IIO.SwapToken") }}</span>
        </div>
      </div>
    </div>
    <div class="content_pc">
      <h3>
        <img src="~/assets/img/iio/helmet_logo.png" alt="" /> Coming soon…
      </h3>
      <p>Your OPTION to redefine Initial Offering</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .iiO {
    > .banner {
      width: 100%;
      height: 380px;
      background-image: url("../../../assets/img/iio/fireBanner.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .action_step_wrap {
      display: flex;
      width: 1050px;
      margin: 0 auto;
      justify-content: space-between;
      margin-top: 80px;
      align-items: center;
      .action_step_item {
        width: 261px;
        height: 165px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .icon {
          width: 56px;
          height: 56px;
        }
        span {
          font-size: 16px;
          font-weight: 600;
          color: #22292f;
          line-height: 22px;
        }
      }
      > .icon {
        width: 24px;
        height: 24px;
        margin: 10px 0;
      }
    }
    .content_pc {
      width: 1176px;
      height: 338px;
      background: #f7f7fa;
      margin: 40px auto 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h3 {
        display: flex;
        align-items: center;
        font-size: 60px;
        font-weight: bold;
        color: #ff9600;
        line-height: 74px;
        justify-content: center;
        display: flex;
        align-items: center;
      }
      p {
        font-size: 20px;
        color: #121212;
        line-height: 28px;
        margin-top: 16px;
      }
    }
    .content_h5 {
      display: none;
    }
  }
}
@media screen and (max-width: 750px) {
  .iiO {
    > .banner {
      width: 100%;
      height: 164px;
      background-image: url("../../../assets/img/iio/fireBanner_H5.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .action_step_wrap {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 auto;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      .action_step_item {
        width: 90%;
        height: 76px;
        display: flex;
        padding: 0 20px;
        border: 1px solid #f7f7fa;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;
        .icon {
          width: 56px;
          height: 56px;
        }
        span {
          font-size: 16px;
          font-weight: 600;
          color: #22292f;
          line-height: 22px;
        }
      }
      > .icon {
        width: 24px;
        height: 24px;
        margin: 10px 0;
        transform: rotate(90deg);
      }
    }
    .content_h5 {
      background: #f7f7fa;
      border-radius: 3px;
      margin: 20px auto;
      width: 90%;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h3 {
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
        color: #ff9600;
        line-height: 36px;
        justify-content: center;
        display: flex;
        align-items: center;
        img {
          width: 40px;
        }
      }
      p {
        color: #121212;
        font-size: 14px;
        line-height: 28px;
      }
    }
    .content_pc {
      display: none;
    }
  }
}
</style>