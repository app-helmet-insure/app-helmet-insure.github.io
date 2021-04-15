<template>
  <div class="iio_details">
    <h3>{{ $t("IIO.Details") }}</h3>
    <div class="details_wrap">
      <div class="qus" @click="showQus1">
        <i :class="aws1 ? 'open' : 'close'"></i>
        <p>{{ $t("IIO.Details_title1") }}</p>
      </div>
      <div class="aws" v-if="aws1">
        <div class="text">
          <p>
            {{ $t("IIO.Details_text1") }}
          </p>
          <p>
            {{ $t("IIO.Details_text2") }}
          </p>
        </div>
      </div>
    </div>
    <div class="details_wrap">
      <div class="qus" @click="showQus2">
        <i :class="aws2 ? 'open' : 'close'"></i>
        <p>{{ $t("IIO.Details_title2") }}</p>
      </div>
      <div class="aws" v-if="aws2">
        <div class="text">
          <p>{{ $t("IIO.Details_text3") }}</p>
          <p>{{ $t("IIO.Details_text4") }}</p>
          <p>{{ $t("IIO.Details_text5") }}</p>
        </div>
      </div>
    </div>
    <div class="details_wrap">
      <div class="qus" @click="showQus3">
        <i :class="aws2 ? 'open' : 'close'"></i>
        <p>{{ $t("IIO.Details_title3") }}</p>
      </div>
      <div class="aws" v-if="aws3">
        <div class="text">
          <p>{{ $t("IIO.Details_text6") }}</p>
        </div>
      </div>
    </div>
    <div class="details_wrap">
      <div class="qus" @click="showQus4">
        <i :class="aws4 ? 'open' : 'close'"></i>
        <p>{{ $t("IIO.Details_title4") }}</p>
      </div>
      <div class="aws" v-if="aws4">
        <div class="text">
          <p>{{ $t("IIO.Details_text7") }}</p>
          <p>{{ $t("IIO.Details_text8") }}</p>
          <p>{{ $t("IIO.Details_text9") }}</p>
          <p>{{ $t("IIO.Details_text10") }}</p>
          <p>{{ $t("IIO.Details_text11") }}</p>
          <p>{{ $t("IIO.Details_text12") }}</p>
          <p>{{ $t("IIO.Details_text13") }}</p>
          <p>{{ $t("IIO.Details_text14") }}</p>
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