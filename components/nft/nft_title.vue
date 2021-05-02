<template>
  <div class="nft_title">
    <div class="nft_name">pixel puzzle</div>
    <div class="nft_title_wrap">
      <div class="nft_earn">
        <i></i>
        <p>
          <span>{{ $t("NFT.RewardVolume") }}(HELMET)</span>
          <span>
            {{ RewardPoll }}
          </span>
        </p>
      </div>
      <div class="nft_time">
        <i></i>
        <p>
          <span>{{ $t("NFT.RewardTime") }}</span>
          <span>
            <template v-if="Time.day != '00'">
              {{ Time.day }}<b>{{ $t("Content.DayM") }}</b>
              <i>/</i>
            </template>
            <template>
              {{ Time.hour }}<b>{{ $t("Content.HourM") }}</b>
              <i>/</i>
            </template>
            <template v-if="Time.day == '00'">
              {{ Time.minute }}<b>{{ $t("Content.MinM") }}</b>
              <i>/</i>
            </template>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/font/font.css";
import { getBalance } from "~/interface/nft.js";
import { addCommom } from "~/assets/js/util.js";
import moment from "moment";
export default {
  data() {
    return {
      RewardPoll: "0",
      Time: {
        day: "00",
        hour: "00",
        minute: "00",
      },
    };
  },
  mounted() {
    this.$bus.$on("GET_CARD_BALANCE", () => {
      this.getRewardNumber();
    });
    setTimeout(() => {
      this.getRewardNumber();
    }, 1000);
    this.getRemainTime();
  },
  methods: {
    async getRewardNumber() {
      let num = await getBalance("NFT_COST", "NFT_POOL");
      this.RewardPoll = addCommom(num, 0);
    },
    getRemainTime() {
      let now = new Date() * 1;
      let dueDate = new Date(moment("2021/05/10 00:00 UTC+8")) * 1;
      let DonwTime = dueDate - now;
      let day = Math.floor(DonwTime / (24 * 3600000));
      let hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000);
      let minute = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
      );
      let second = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      );
      let template;

      if (dueDate > now) {
        template = {
          day: day > 9 ? day : "0" + day,
          hour: hour > 9 ? hour : "0" + hour,
          minute: minute > 9 ? minute : "0" + minute,
          second: second > 9 ? second : "0" + second,
        };
        this.Time = template;
      } else {
        template = {
          day: "00",
          hour: "00",
          minute: "00",
          second: "00",
        };
        this.Time = template;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and(min-width:750px) {
  .nft_name {
    width: 329px;
    height: 84px;
    background-image: url("../../assets/img/nft/title_bg_web.png");
    background-size: 100% 100%;
    margin: 0 auto;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #fcf4bd;
    text-align: center;
    line-height: 24px;
    padding-top: 17px;
  }
  .nft_title_wrap {
    width: 1026px;
    margin: 20px auto 0px;
    display: flex;
    justify-content: center;
  }
  .nft_earn {
    display: flex;
    width: 360px;
    height: 80px;
    background: linear-gradient(180deg, #201a22 0%, #7a687e 100%);
    border-radius: 40px;
    margin-right: 20px;
    > i {
      display: block;
      width: 83px;
      height: 80px;
      background-image: url("../../assets/img/nft/down_earn.png");
      background-size: 100% 100%;
      left: 0;
      transform: translateX(-25%);
    }
    p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      span {
        &:nth-of-type(1) {
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 17px;
        }
        &:nth-of-type(2) {
          font-size: 38px;
          font-family: FredokaOne-Regular, FredokaOne;
          font-weight: 400;
          color: #ffffff;
          line-height: 46px;
        }
      }
    }
  }
  .nft_time {
    display: flex;
    width: 360px;
    height: 80px;
    background: linear-gradient(180deg, #201a22 0%, #7a687e 100%);
    border-radius: 40px;
    margin-left: 20px;
    > i {
      display: block;
      width: 80px;
      height: 80px;
      background-image: url("../../assets/img/nft/down_time.png");
      background-size: 100% 100%;
      left: 0;
      transform: translateX(-25%);
    }
    p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      span {
        &:nth-of-type(1) {
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 17px;
        }
        &:nth-of-type(2) {
          font-size: 38px;
          font-family: FredokaOne-Regular, FredokaOne;
          font-weight: 400;
          color: #ffffff;
          line-height: 46px;
        }
        i {
          font-family: Regular;
          margin: 0 -8px;
          &:last-of-type {
            display: none;
          }
        }
      }
    }
  }
}
@media screen and(max-width:750px) {
  .nft_name {
    width: 329px;
    height: 84px;
    background-image: url("../../assets/img/nft/title_bg_web.png");
    background-size: 100% 100%;
    margin: 0 auto;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #fcf4bd;
    text-align: center;
    line-height: 24px;
    padding-top: 17px;
  }
  .nft_title_wrap {
    width: 100%;
    margin: 20px auto 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .nft_earn {
    display: flex;
    width: 80%;
    height: 60px;
    background: linear-gradient(180deg, #201a22 0%, #7a687e 100%);
    border-radius: 30px;

    > i {
      display: block;
      width: 60px;
      height: 60px;
      background-image: url("../../assets/img/nft/down_earn.png");
      background-size: 100% 100%;
      left: 0;
      transform: translateX(-25%);
    }
    p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      span {
        &:nth-of-type(1) {
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
        }
        &:nth-of-type(2) {
          font-size: 24px;
          font-family: FredokaOne-Regular, FredokaOne;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
  .nft_time {
    display: flex;
    width: 80%;
    height: 60px;
    background: linear-gradient(180deg, #201a22 0%, #7a687e 100%);
    border-radius: 30px;
    margin-top: 20px;
    > i {
      display: block;
      width: 60px;
      height: 60px;
      background-image: url("../../assets/img/nft/down_time.png");
      background-size: 100% 100%;
      left: 0;
      transform: translateX(-25%);
    }
    p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      span {
        &:nth-of-type(1) {
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
        }
        &:nth-of-type(2) {
          font-size: 24px;
          font-family: FredokaOne-Regular, FredokaOne;
          font-weight: 400;
          color: #ffffff;
        }
        i {
          font-family: Regular;
          margin: 0 -6px;
          &:last-of-type {
            display: none;
          }
        }
      }
    }
  }
}
</style>