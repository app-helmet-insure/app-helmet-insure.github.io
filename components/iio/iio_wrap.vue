<template>
  <div class="iio_wrap">
    <div class="iio_project">
      <div v-for="item in iioData" :key="item.iio_name" class="iio_item">
        <img :src="require(`~/assets/img/iio/${item.iio_img}.png`)" alt="" />
      </div>
      <div class="apply_iio">
        <div class="add_iio"></div>
        <p>Want to launch your own IIO with Helmet?</p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSduUhQJnmmyukVA1jMGmFwnn4s_B00uq1GmLyd0CKARvJ6w0Q/viewform"
          target="_blank"
          >Apply Now</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iioData: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      let iioData = [
        {
          iio_name: "1",
          iio_img: "iio1",
        },
        {
          iio_name: "2",
          iio_img: "iio2",
        },
        {
          iio_name: "3",
          iio_img: "iio3",
        },
        {
          iio_name: "4",
          iio_img: "iio4",
        },
      ];
      this.iioData = iioData;
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .iio_project {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .iio_item {
      width: 320px;
      height: 360px;
      flex-shrink: 0;
      margin-top: 30px;
      img {
        width: 100%;
      }
    }
    .apply_iio {
      margin-top: 30px;
      width: 320px;
      height: 360px;
      background-image: url("../../assets/img/iio/addiio_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 30px 0 36px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .add_iio {
        margin: 0 auto;
        width: 160px;
        height: 160px;
        background-image: url("../../assets/img/iio/addiio.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      > P {
        margin-top: 6px;
        text-align: center;
        width: 281px;
        height: 60px;
        font-size: 20px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        color: rgba(23, 23, 58, 0.8);
        line-height: 30px;
      }
      > a {
        display: block;
        margin-top: 20px;
        width: 180px;
        height: 48px;
        background: #17173a;
        border-radius: 5px;
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #ffffff;
        line-height: 48px;
        text-align: center;

        &:hover {
          background: #2d2d4d;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .iio_project {
    display: flex;
    flex-direction: column;
    .iio_item {
      margin: 30px auto 0;
      width: 320px;
      height: 360px;
      flex-shrink: 0;
      img {
        width: 100%;
      }
    }
    .apply_iio {
      margin: 30px auto 0;
      width: 320px;
      height: 360px;
      background-image: url("../../assets/img/iio/addiio_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 30px 0 36px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .add_iio {
        margin: 0 auto;
        width: 160px;
        height: 160px;
        background-image: url("../../assets/img/iio/addiio.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      > P {
        margin-top: 6px;
        text-align: center;
        width: 281px;
        height: 60px;
        font-size: 20px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        color: rgba(23, 23, 58, 0.8);
        line-height: 30px;
      }
      > a {
        display: block;
        margin-top: 20px;
        width: 180px;
        height: 48px;
        background: #17173a;
        border-radius: 5px;
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #ffffff;
        line-height: 48px;
        text-align: center;

        &:hover {
          background: #2d2d4d;
        }
      }
    }
  }
}
</style>