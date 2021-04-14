<template>
  <div class="iio_details">
    <h3>Details</h3>
    <div class="details_wrap">
      <div class="qus" @click="showQus1">
        <i :class="aws1 ? 'open' : 'close'"></i>
        <p>How to get IIO Token?</p>
      </div>
      <div class="aws" v-if="aws1">
        <div class="text">
          <p>
            Get the tradable iTokens which could be activated/swapped to IIO
            Tokens on Insurance tab or IIO tab after the sale.
          </p>
          <p>
            This swap required corresponding basic token like BUSD/BNB/HELMET
          </p>
        </div>
      </div>
    </div>
    <div class="details_wrap">
      <div class="qus" @click="showQus2">
        <i :class="aws2 ? 'open' : 'close'"></i>
        <p>How to get iTOKEN?</p>
      </div>
      <div class="aws" v-if="aws2">
        <div class="text">
          <p>1.Get HELMET-BNB LPTs</p>
          <p>2.Stake them into HELMET-BNB Pool to check your expected share</p>
          <p>3.Claim your iTOKEN</p>
        </div>
      </div>
    </div>
    <div class="details_wrap">
      <div class="qus" @click="showQus3">
        <i :class="aws2 ? 'open' : 'close'"></i>
        <p>What is the Token Burning Mechanism?</p>
      </div>
      <div class="aws" v-if="aws3">
        <div class="text">
          <p>
            Tickets ($HELMET) from IIO participants raised will be burned
            forever.
          </p>
        </div>
      </div>
    </div>
    <div class="details_wrap">
      <div class="qus" @click="showQus4">
        <i :class="aws4 ? 'open' : 'close'"></i>
        <p>Will I lose my HELMET-BNB LP for getting new IIO Token?</p>
      </div>
      <div class="aws" v-if="aws4">
        <div class="text">
          <p>
            There will be no effect on your LPT in the pool, since Helmet team
            will only scan your LPT Share to calculate your iToken share.
          </p>
          <p>
            PLUS, in the period of IIO, you’ll enjoy the Dual-rewards of
            HELMET-BNB LP Pool.
          </p>
          <p>
            iToken distribution mechanism： Basically, the more LPT you have in
            HELMET-BNB Pool, the more iToken you will get.
          </p>
          <p>
            Users can subscribe as much or as little as they want to the IIO,
            and their final allocation of iToken will be based on the amount of
            LPT they hold as a percentage of all LPT put in by other users at
            the time the IIO ends.
          </p>
          <p>
            If you have a very small amount of LP tokens compared to the total
            amount committed by others, your contribution may be such a small
            part of the total.​
          </p>
          <p>
            Before Sale: 1.Buy HELMET and BNB tokens; 2.Get HELMET-BNB LP tokens
            by adding HELMET and BNB liquidity;
          </p>
          <p>
            During Sale: 1.While the sale is live, go to PAY for the IIO ticket;
            2.Commit or add your HELMET-BNB LP tokens to start mining your
            iToken (IIO share);
          </p>
          <p>
            After Sale: When the sale is complete, you could 1.Trade the iToken;
            2.Swap the IIO tokens by activating your iToken ( you need to
            prepare enough required basic token like BNB, HELMET or BUSD in your
            wallet to complete this swap)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aws1: false,
      aws2: false,
      aws3: false,
      aws4: false,
    };
  },
  methods: {
    showQus1() {
      this.aws1 = !this.aws1;
    },
    showQus2() {
      this.aws2 = !this.aws2;
    },
    showQus3() {
      this.aws3 = !this.aws3;
    },
    showQus4() {
      this.aws4 = !this.aws4;
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and(min-width:750px) {
  .iio_details {
    width: 100%;
    min-width: 1206px;
    h3 {
      margin-top: 30px;
      font-size: 30px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 500;
      color: #17173a;
      line-height: 40px;
    }
  }
  .details_wrap {
    > .qus {
      width: 100%;
      height: 60px;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
      border-radius: 5px;
      display: flex;
      align-items: center;
      margin-top: 10px;
      padding-left: 20px;
      cursor: pointer;

      i {
        display: block;
        width: 24px;
        height: 24px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .close {
        background-image: url("../../assets/img/iio/close.png");
      }
      .open {
        background-image: url("../../assets/img/iio/open.png");
      }
      p {
        font-size: 16px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 600;
        color: #17173a;
        line-height: 14px;
        margin-left: 20px;
      }
      &:hover {
        p {
          font-size: 18px;
        }
      }
    }
    > .aws {
      min-height: 100px;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
      border-radius: 5px;
      padding: 0 20px;
      .text {
        border-top: 1px solid #e8e8e8;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(23, 23, 58, 0.8);
        line-height: 20px;
        padding: 15px 0 15px 44px;
        display: flex;
        flex-direction: column;
        p {
          margin-top: 15px;
        }
      }
    }
  }
}
@media screen and(max-width:750px) {
  .iio_details {
    width: 96%;
    margin: 0 auto 50px;
    h3 {
      margin-top: 30px;
      font-size: 30px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 500;
      color: #17173a;
      line-height: 40px;
    }
  }
  .details_wrap {
    > .qus {
      width: 100%;
      height: 60px;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
      border-radius: 5px;
      display: flex;
      align-items: center;
      margin-top: 10px;
      padding-left: 20px;
      cursor: pointer;
      i {
        flex-shrink: 0;
        display: block;
        width: 24px;
        height: 24px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .close {
        background-image: url("../../assets/img/iio/close.png");
      }
      .open {
        background-image: url("../../assets/img/iio/open.png");
      }
      p {
        font-size: 16px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 600;
        color: #17173a;
        line-height: 20px;
        margin-left: 20px;
      }
      &:hover {
        p {
          font-size: 18px;
        }
      }
    }
    > .aws {
      min-height: 100px;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
      border-radius: 5px;
      padding: 0 20px;
      .text {
        border-top: 1px solid #e8e8e8;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(23, 23, 58, 0.8);
        line-height: 20px;
        padding: 15px 0 15px 0;
        display: flex;
        flex-direction: column;
        p {
          margin-top: 15px;
        }
      }
    }
  }
}
</style>