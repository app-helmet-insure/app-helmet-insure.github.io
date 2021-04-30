<template>
  <div class="nft_title">
    <div class="nft_name">{{ $t("NFT.Reward") }}</div>
    <div class="nft_earn">
      <span
        v-for="(item, index) in RewardPoll"
        :key="index"
        :class="isNaN(item) ? '' : 'radius'"
      >
        {{ item }}
      </span>
    </div>
    <div class="nft_time">
      <p>
        <i></i
        ><span>
          {{
            $t("NFT.CanSwap", {
              time:
                Time.day +
                $t("Content.DayM") +
                Time.hour +
                $t("Content.HourM") +
                Time.minute +
                $t("Content.MinM"),
            })
          }}
        </span>
      </p>
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
        };
        this.Time = template;
      } else {
        template = {
          day: "00",
          hour: "00",
          minute: "00",
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
  .nft_earn {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 38px;
      font-family: FredokaOne-Regular;
      color: #ffffff;
      margin: 0 2.5px;
    }
    .radius {
      width: 55px;
      height: 55px;
      background-image: url("../../assets/img/nft/earn_bg_web.png");
      background-size: 100% 100%;
    }
  }
  .nft_time {
    display: flex;
    justify-content: center;
    margin-top: 26px;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 205px;
      position: relative;
      padding: 0px 10px 0px 15px;
      background: linear-gradient(180deg, #4f3e5b 0%, #4d3e57 100%);
      border-radius: 100px;
      font-size: 14px;
      font-family: FredokaOne-Regular;
      color: #ffffff;
      line-height: 14px;
      letter-spacing: 1px;
      height: 20px;
      i {
        display: block;
        width: 28px;
        height: 29px;
        background-image: url("../../assets/img/nft/down_time.png");
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        transform: translateX(-50%);
      }
      span {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 14px;
        margin-right: 2px;
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
  .nft_earn {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 27px;
      font-family: FredokaOne-Regular;
      color: #ffffff;
      margin: 0 2.5px;
    }
    .radius {
      width: 38px;
      height: 38px;
      background-image: url("../../assets/img/nft/earn_bg_web.png");
      background-size: 100% 100%;
    }
  }
  .nft_time {
    display: flex;
    justify-content: center;
    margin-top: 26px;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 185px;
      position: relative;
      padding: 0px 10px 0px 15px;
      background: linear-gradient(180deg, #4f3e5b 0%, #4d3e57 100%);
      border-radius: 100px;
      font-size: 12px;
      font-family: FredokaOne-Regular;
      color: #ffffff;
      line-height: 13px;
      letter-spacing: 1px;
      height: 16px;
      i {
        display: block;
        width: 20px;
        height: 21px;
        background-image: url("../../assets/img/nft/down_time.png");
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        transform: translateX(-50%);
      }
      span {
        font-size: 12px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 12px;
        margin-right: 2px;
      }
    }
  }
}
</style>