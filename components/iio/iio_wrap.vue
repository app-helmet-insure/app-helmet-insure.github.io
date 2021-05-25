<template>
  <div class="iio_wrap">
    <div class="iio_project">
      <div
        class="iio_item_wrap"
        v-for="(item, index) in iioData"
        :key="item.iio_name"
      >
        <div
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
            <div class="text" v-if="item.active_page === 1">
              <p>
                <span>{{ $t("IIO.ExpiredText1") }}</span>
                <span>{{ item.expired_burnt }}</span>
              </p>
              <p>
                <span>{{ $t("IIO.ExpiredText2") }}</span>
                <span>${{ item.expired_stake }}</span>
              </p>
              <p>
                <span>{{ $t("IIO.ExpiredText3") }}</span>
                <span>{{ item.expired_premium }} </span>
              </p>
              <p>
                <span>{{ $t("IIO.ExpiredText4") }}</span>
                <span>{{ item.expired_activating }}</span>
              </p>
            </div>
            <div class="text" v-if="item.active_page === 2">
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
              v-if="item.status !== 'finished'"
              @click="toDetails(index)"
              :style="
                item.status == 'finished' || !item.enterbutton
                  ? 'background: #D5D5DB;pointer-events: none'
                  : ''
              "
            >
              {{ item.status == "finished" ? "Finished" : "Enter Pool" }}
            </button>
            <div v-else class="button_tab">
              <span
                @click="item.active_page = 1"
                :class="item.active_page == 1 ? 'active_page' : ''"
              >
                <i></i>
              </span>
              <span
                @click="item.active_page = 2"
                :class="item.active_page == 2 ? 'active_page' : ''"
              >
                <i></i>
              </span>
            </div>
          </template>
          <img
            class="soon_img"
            v-if="!item.coming"
            :src="require(`~/assets/img/iio/${item.iio_img}.png`)"
            alt=""
          />
        </div>
      </div>
      <div class="iio_item_wrap">
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
          enterbutton: true,
          open: true,
          sort: 0,
          active_page: 2,
          expired_burnt: "2,200",
          expired_stake: "29,962,828.05",
          expired_premium: "5366.66%",
          expired_activating: "85.44%",
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
          showEnd: "Apr. 29th 21:00 SGT",
          warnupTimeUTC: "2021/04/24 20:00 UTC+8",
          distributingTimeUTC: "2021/04/26 20:00 UTC+8",
          activatingTimeUTC: "2021/04/29 21:00 UTC+8",
          finishedTimeUTC: "2021/05/04 21:00 UTC+8",
          link: "https://www.chainswap.exchange/",
          enterbutton: true,
          open: true,
          sort: 0,
          active_page: 2,
          expired_burnt: "1438",
          expired_stake: "37,619,415.09",
          expired_premium: "6500.00%",
          expired_activating: "64.05%",
        },
        {
          iio_name: "WeStarter",
          iio_img: "iio_westarter",
          iio_webSite: "www.westarter.org",
          coming: true,
          background: "#269E38",
          swapVolume: "120,000",
          swapUtil: "WAR",
          stakeUtil: "BUSD",
          stakeShare: 0.25,
          showStart: "Apr. 27th 21:00 SGT",
          showEnd: "Apr. 29th 21:00 SGT",
          warnupTimeUTC: "2021/04/26 24:00 UTC+8",
          distributingTimeUTC: "2021/04/27 21:00 UTC+8",
          activatingTimeUTC: "2021/04/29 21:00 UTC+8",
          finishedTimeUTC: "2021/05/01 21:00 UTC+8",
          link: "https://www.chainswap.exchange/",
          enterbutton: true,
          open: true,
          sort: 0,
          active_page: 2,
          expired_burnt: "1,366",
          expired_stake: "35,458,440.17",
          expired_premium: "2620.00%",
          expired_activating: "91.56%",
        },
        {
          iio_name: "Lever",
          iio_img: "iio_lever",
          iio_webSite: "lever.network",
          coming: true,
          background: "#4156D5",
          swapVolume: "60,000",
          swapUtil: "LEV",
          stakeUtil: "BUSD",
          stakeShare: 0.5,
          showStart: "May. 05th 20:00 SGT",
          showEnd: "May. 07th 20:00 SGT",
          warnupTimeUTC: "2021/05/03 20:00 UTC+8",
          distributingTimeUTC: "2021/05/05 20:00 UTC+8",
          activatingTimeUTC: "2021/05/07 20:00 UTC+8",
          finishedTimeUTC: "2021/05/08 20:00 UTC+8",
          link: "https://www.chainswap.exchange/",
          enterbutton: true,
          open: true,
          sort: 0,
          active_page: 2,
          expired_burnt: "1009",
          expired_stake: "31,073,418.10",
          expired_premium: "820.00%",
          expired_activating: "86.67%",
        },
        {
          iio_name: "Paul Protocol",
          iio_img: "iio_paul",
          iio_webSite: "paulprotocol.io",
          coming: true,
          background: "#0F2B39",
          swapVolume: "100,000,000",
          swapUtil: "PAUL",
          stakeUtil: "BUSD",
          stakeShare: 0.002,
          showStart: "May. 27th 21:00 SGT",
          showEnd: "May. 29th 21:00 SGT",
          warnupTimeUTC: "2021/05/25 21:00 UTC+8",
          distributingTimeUTC: "2021/05/27 21:00 UTC+8", //showStart
          activatingTimeUTC: "2021/05/29 21:00 UTC+8", //showEnd
          finishedTimeUTC: "2021/05/30 21:00 UTC+8",
          link: "https://www.paulprotocol.io",
          enterbutton: false,
          open: true,
          sort: 0,
          active_page: 2,
          expired_burnt: "0",
          expired_stake: "0",
          expired_premium: "0",
          expired_activating: "0",
        },
        {
          iio_name: "CryptoTycoon",
          iio_img: "iio_ctt",
          iio_webSite: "cryptotycoon.finance",
          coming: true,
          background: "#FA6400",
          swapVolume: "1,500",
          swapUtil: "CTT",
          stakeUtil: "BUSD",
          stakeShare: 30,
          showStart: "May. 23rd 21:00 SGT",
          showEnd: "May. 25th 21:00 SGT",
          warnupTimeUTC: "2021/05/21 21:00 UTC+8",
          distributingTimeUTC: "2021/05/23 21:00 UTC+8", //showStart
          activatingTimeUTC: "2021/05/25 21:00 UTC+8", //showEnd
          finishedTimeUTC: "2021/05/26 21:00 UTC+8",
          link: "https://cryptotycoon.finance/",
          enterbutton: true,
          open: true,
          sort: 0,
          active_page: 2,
          expired_burnt: "0",
          expired_stake: "0",
          expired_premium: "0",
          expired_activating: "0",
        },
        {
          iio_name: "CoinWind",
          iio_img: "iio_cow",
          iio_webSite: "www.coinwind.com",
          coming: true,
          background: "#08063D",
          swapVolume: "100,000",
          swapUtil: "COW",
          stakeUtil: "BUSD",
          stakeShare: 0.5,
          showStart: "May. 23rd 21:00 SGT",
          showEnd: "May. 25th 22:00 SGT",
          warnupTimeUTC: "2021/05/21 21:00 UTC+8",
          distributingTimeUTC: "2021/05/23 21:00 UTC+8", //showStart
          activatingTimeUTC: "2021/05/25 22:00 UTC+8", //showEnd
          finishedTimeUTC: "2021/05/26 22:00 UTC+8",
          link: "https://www.coinwind.com",
          enterbutton: true,
          open: true,
          sort: 0,
          active_page: 2,
          expired_burnt: "0",
          expired_stake: "0",
          expired_premium: "0",
          expired_activating: "0",
        },
        {
          iio_name: "WMASS",
          iio_img: "iio_wmass",
          iio_webSite: "wmass.org",
          coming: true,
          background: "#E55841",
          swapVolume: "142,857",
          swapUtil: "WMASS",
          stakeUtil: "BUSD",
          stakeShare: 0.35,
          showStart: "May. 20th 21:00 SGT",
          showEnd: "May. 22nd 21:00 SGT",
          warnupTimeUTC: "2021/05/19 21:00 UTC+8",
          distributingTimeUTC: "2021/05/20 21:00 UTC+8",
          activatingTimeUTC: "2021/05/22 21:00 UTC+8",
          finishedTimeUTC: "2021/05/23 21:00 UTC+8",
          link: "https://wmass.org/home",
          enterbutton: true,
          open: true,
          sort: 0,
          active_page: 2,
          expired_burnt: "484",
          expired_stake: "5,468,799.20",
          expired_premium: "86.17%",
          expired_activating: "25.15%",
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
        item.sort = 4;
        if (item.open) {
          let warnup = new Date(moment(item.warnupTimeUTC)) * 1;
          let distributing = new Date(moment(item.distributingTimeUTC)) * 1;
          let activating = new Date(moment(item.activatingTimeUTC)) * 1;
          let finished = new Date(moment(item.finishedTimeUTC)) * 1;
          if (nowTime > distributing && nowTime < activating) {
            item.status = "distributing";
            item.sort = 1;
          }
          if (nowTime > activating && nowTime < finished) {
            item.status = "activating";
            item.sort = 2;
          }
          if (nowTime < warnup) {
            item.status = "warmup";
            item.sort = 3;
          }
          if (nowTime > warnup && nowTime < distributing) {
            item.status = "warmup";
            item.sort = 3;
          }
          if (nowTime > finished) {
            item.status = "finished";
            item.sort = 5;
            item.active_page = 1;
          }
        }
      });
      data = data.sort(function (a, b) {
        return (
          new Date(moment(b.finishedTimeUTC)) * 1 -
          new Date(moment(a.finishedTimeUTC)) * 1
        );
      });
      data = data.sort(function (a, b) {
        return a.sort - b.sort;
      });
      this.iioData = data;
    },
  },
};
</script>

<style lang='scss' scoped>
.iio_item_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (min-width: 750px) and (max-width: 1860px) {
  .iio_item_wrap {
    width: 33.3%;
  }
}
@media screen and (min-width: 1860px) {
  .iio_item_wrap {
    width: 25%;
  }
}
@media screen and (min-width: 2260px) {
  .iio_item_wrap {
    width: 20%;
  }
}
@media screen and (min-width: 750px) {
  .iio_project {
    display: flex;
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
      > .button_tab {
        margin-top: 20px;
        width: 280px;
        height: 44px;
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #ffffff;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-items: center;
        justify-content: center;
        .active_page {
          i {
            background: rgba(255, 255, 255, 0.8) !important;
          }
        }
        span {
          width: 40px;
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          &:nth-of-type(1) {
            margin-right: 3px;
          }
          &:nth-of-type(2) {
            margin-left: 3px;
          }
          i {
            display: block;
            width: 40px;
            height: 3px;
            border-radius: 2px;
            background: rgba(255, 255, 255, 0.4);
          }
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
      > .button_tab {
        margin-top: 20px;
        width: 280px;
        height: 44px;
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #ffffff;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-items: center;
        justify-content: center;
        .active_page {
          i {
            background: rgba(255, 255, 255, 0.8) !important;
          }
        }
        span {
          width: 40px;
          height: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          &:nth-of-type(1) {
            margin-right: 3px;
          }
          &:nth-of-type(2) {
            margin-left: 3px;
          }
          i {
            display: block;
            width: 40px;
            height: 3px;
            border-radius: 2px;
            background: rgba(255, 255, 255, 0.4);
          }
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
</style>