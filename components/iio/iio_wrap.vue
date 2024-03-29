<template>
  <div class="iio_wrap">
    <div class="iio_project">
      <div
        class="iio_item_wrap"
        v-for="(item, index) in ProjectData"
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
import { ProjectData } from "../../config/iio.js";

export default {
  data() {
    return {
      ProjectData,
    };
  },
  mounted() {
    this.getStatus(ProjectData);
  },
  methods: {
    toDetails(index) {
      let name = ProjectData[index].iio_name.toLowerCase();
      this.$router.push({
        path: `iio/${name}`,
      });
    },
    getStatus(newValue) {
      let data = newValue || ProjectData;
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
          }
          if (
            item.expired_burnt &&
            item.expired_stake &&
            item.expired_premium &&
            item.expired_activating
          ) {
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
      this.ProjectData = data;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
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
        color: #fff;
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
          color: #fff;
          line-height: 14px;
          text-decoration: underline;
          &:hover {
            color: rgba(255, 255, 255, 0.8);
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
              color: #fff;
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-family: IBMPlexSans-Medium, IBMPlexSans;
              font-weight: 500;
              color: #fff;
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
        color: #fff;
        line-height: 20px;
        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
      > .button_tab {
        margin-top: 20px;
        width: 280px;
        height: 44px;
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #fff;
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
            background: rgba(255, 255, 255, 0.4) !important;
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
        color: #fff;
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
        color: #fff;
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
              color: #fff;
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-family: IBMPlexSans-Medium, IBMPlexSans;
              font-weight: 500;
              color: #fff;
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
        color: #fff;
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
        color: #fff;
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
        color: #17173a;
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
        color: #fff;
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