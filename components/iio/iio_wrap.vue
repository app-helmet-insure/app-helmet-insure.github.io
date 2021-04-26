<template>
  <div class="iio_wrap">
    <div class="iio_project">
      <div
        v-for="(item, index) in iioData"
        :key="item.iio_name"
        class="iio_item"
        :style="`--background:${item.background}; --animation_bg:${
          item.status != 'finished' && item.open
            ? 'linear-gradient(45deg,red,#ffaa2b 10%,#f3ff45 20%,#84ff7f 30%,#7bfdfb 40%,#5ee7fc 50%,#7fbbff 60%,#af88ff 70%,#d973fd 80%,#ff6fec 90%,red);'
            : ''
        }`"
      >
        <img
          v-if="item.open"
          :src="require(`~/assets/img/iio/${item.status || 'finished'}.png`)"
          alt=""
          class="status"
        />
        <template v-if="item.coming">
          <img
            class="coming_img"
            :src="require(`~/assets/img/iio/${item.iio_img}.png`)"
            alt=""
          />
          <h3>
            {{ item.iio_name }}<span>({{ item.swapUtil }})</span>
          </h3>
          <a :href="`https://${item.iio_webSite}`" target="_blank"
            ><span>{{ item.iio_webSite }}</span
            ><i></i
          ></a>
          <div class="text">
            <p>
              <span>{{
                $t("IIO.HomeText1", { name: `i${item.swapUtil}` })
              }}</span
              ><span>{{ item.showStart }}</span>
            </p>
            <p>
              <span>{{
                $t("IIO.HomeText2", { name: `i${item.swapUtil}` })
              }}</span
              ><span>{{ item.showEnd }}</span>
            </p>
            <p>
              <span>{{ $t("IIO.HomeText3") }}</span
              ><span>{{ item.swapVolume }} {{ item.swapUtil }}</span>
            </p>
            <p>
              <span>{{ $t("IIO.HomeText4") }}</span
              ><span
                >1 {{ item.swapUtil }} = {{ item.stakeShare }}
                {{ item.stakeUtil }}</span
              >
            </p>
          </div>
          <button
            @click="toDetails(index)"
            :style="
              item.status == 'finished'
                ? 'background: #D5D5DB;pointer-events: none'
                : ''
            "
          >
            {{ !item.status ? "Finished" : "Enter Pool" }}
          </button>
        </template>
        <img
          class="soon_img"
          v-if="!item.coming"
          :src="require(`~/assets/img/iio/${item.iio_img}.png`)"
          alt=""
        />
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
import moment from "moment";
export default {
  data() {
    return {
      iioData: [
        {
          iio_name: "ChainSwap",
          iio_img: "iio_chainswap",
          iio_webSite: "www.chainswap.com",
          coming: true,
          background: "#7A4AE3",
          swapVolume: "100,000",
          swapUtil: "TOKEN",
          stakeUtil: "BUSD",
          stakeShare: 0.3,
          showStart: "Apr. 19th 21:00 SGT",
          showEnd: "Apr. 23rd 21:00 SGT",
          warnupTimeUTC: "2021/04/16 21:00 UTC+8",
          distributingTimeUTC: "2021/04/19 21:00 UTC+8",
          activatingTimeUTC: "2021/04/23 20:00 UTC+8",
          finishedTimeUTC: "2021/04/24 21:00 UTC+8",
          link: "https://www.chainswap.exchange/",
          open: true,
          sort: 0,
        },
        {
          iio_name: "BlackHole",
          iio_img: "iio_blackhole",
          iio_webSite: "blackhole.black",
          coming: true,
          background: "#33B9C2",
          swapVolume: "200,000",
          swapUtil: "BLACK",
          stakeUtil: "BUSD",
          stakeShare: 0.05,
          showStart: "Apr. 26th 20:00 SGT",
          showEnd: "Apr.  29th 21:00 SGT",
          warnupTimeUTC: "2021/04/24 20:00 UTC+8",
          distributingTimeUTC: "2021/04/26 20:00 UTC+8",
          activatingTimeUTC: "2021/04/29 21:00 UTC+8",
          finishedTimeUTC: "2021/04/30 21:00 UTC+8",
          link: "https://www.chainswap.exchange/",
          open: true,
          sort: 0,
        },
        {
          iio_name: "2",
          iio_img: "iio2",
          coming: false,
          open: false,
          sort: 0,
        },
        {
          iio_name: "4",
          iio_img: "iio4",
          coming: false,
          open: false,
          sort: 0,
        },
        {
          iio_name: "5",
          iio_img: "iio5",
          coming: false,
          open: false,
          sort: 0,
        },
      ],
    };
  },
  mounted() {
    this.getStatus(this.iioData);
  },
  methods: {
    toDetails(index) {
      let name = this.iioData[index].iio_name.toLowerCase();
      this.$router.push({
        path: `iio/${name}`,
      });
    },
    getStatus(newValue) {
      let data = newValue || this.iioData;
      let nowTime = moment.now();
      data.forEach((item) => {
        if (item.open) {
          let warnup = new Date(moment(item.warnupTimeUTC)) * 1;
          let distributing = new Date(moment(item.distributingTimeUTC)) * 1;
          let activating = new Date(moment(item.activatingTimeUTC)) * 1;
          let finished = new Date(moment(item.finishedTimeUTC)) * 1;
          if (nowTime > warnup && nowTime < distributing) {
            item.status = "warmup";
          }
          if (nowTime > distributing && nowTime < activating) {
            item.status = "distributing";
          }
          if (nowTime > activating && nowTime < finished) {
            item.status = "activating";
          }
          if (nowTime > finished) {
            item.status = "finished";
            item.sort = 1;
          }
        }
      });
      data = data.sort(function (a, b) {
        return a.sort - b.sort;
      });
      console.log(this.iioData);
      this.iioData = data;
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
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 1;
      .status {
        position: absolute;
        left: 0;
        top: 0;
        width: 68px;
        height: 68px;
      }
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        content: "";
        border-radius: 10px;
        background: var(--background);
      }
      &::after {
        filter: blur(8px);
        position: absolute;
        width: calc(100% + 10px);
        height: calc(100% + 10px);
        content: "";
        top: -5px;
        right: -5px;
        bottom: -5px;
        left: -5px;
        z-index: -2;
        background: var(--animation_bg);
        background-position-x: left;
        background-position-y: top;
        background-size: 300% 300%;
        background-attachment: scroll;
        background-origin: initial;
        background-clip: initial;
        background-color: initial;
        animation: bgPosition-data-v-6a46f06d 2s linear 0s infinite normal none
          running;
        border-radius: 10px;
        animation: animation_bg 2s linear 0s infinite normal none running;
      }
      @keyframes animation_bg {
        0% {
          background-position: 0 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        to {
          background-position: 0 50%;
        }
      }
      .coming_img {
        width: 100px;
        height: 100px;
      }
      > h3 {
        font-size: 28px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        color: #ffffff;
        line-height: 28px;
        span {
          font-size: 22px;
        }
      }
      > a {
        display: flex;
        align-items: center;
        margin-top: 4px;
        cursor: pointer;

        span {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: rgba(255, 255, 255, 0.6);
          line-height: 14px;
          text-decoration: underline;
          &:hover {
            color: #fff;
          }
        }
        i {
          margin-top: 4px;
          display: block;
          width: 12px;
          height: 12px;
          background-image: url("../../assets/img/insurancelist/share_icon.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin-left: 2px;
        }
      }
      .text {
        width: 100%;
        p {
          width: 100%;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
          &:nth-of-type(1) {
            margin-top: 28px;
          }
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 0.8);
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-family: IBMPlexSans-Medium, IBMPlexSans;
              font-weight: 500;
              color: #ffffff;
              line-height: 14px;
            }
          }
        }
      }
      > button {
        margin-top: 20px;
        width: 280px;
        height: 44px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #ffffff;
        line-height: 20px;
        &:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      }
      .soon_img {
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
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .coming_img {
        width: 100px;
        height: 100px;
      }
      > h3 {
        font-size: 28px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        color: #ffffff;
        line-height: 28px;
        span {
          font-size: 22px;
        }
      }
      > a {
        display: flex;
        align-items: center;
        margin-top: 4px;
        cursor: pointer;

        span {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: rgba(255, 255, 255, 0.6);
          line-height: 14px;
          text-decoration: underline;
          &:hover {
            color: #fff;
          }
        }
        i {
          margin-top: 4px;
          display: block;
          width: 12px;
          height: 12px;
          background-image: url("../../assets/img/insurancelist/share_icon.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin-left: 2px;
        }
      }
      .text {
        width: 100%;
        p {
          width: 100%;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
          &:nth-of-type(1) {
            margin-top: 28px;
          }
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 0.8);
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-family: IBMPlexSans-Medium, IBMPlexSans;
              font-weight: 500;
              color: #ffffff;
              line-height: 14px;
            }
          }
        }
      }
      > button {
        margin-top: 20px;
        width: 280px;
        height: 44px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #ffffff;
        line-height: 20px;
        &:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      }
      .soon_img {
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