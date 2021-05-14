<template>
  <div class="nft_title">
    <div class="nft_name">Pixel Puzzle</div>
    <div class="nft_title_wrap">
      <div class="left">
        <div class="nft_earn">
          <i></i>
          <p>
            <span>{{ $t("NFT.RewardVolume") }}(HELMET)</span>
            <span>
              {{ addCommom(245343, 0) }}
            </span>
          </p>
        </div>
        <div class="nft_user">
          <i></i>
          <p>
            <span>{{ $t("NFT.UsersCount") }}</span>
            <span>
              {{ addCommom(usersCount) }}
            </span>
          </p>
        </div>
        <div class="nft_time">
          <i></i>
          <p>
            <span>{{ $t("NFT.RewardTime") }}</span>
            <span v-if="timeFlag">
              <template>
                {{ Time.day }}<b>{{ $t("Content.DayM") }}</b>
                <i>/</i>
              </template>
              <template>
                {{ Time.hour }}<b>{{ $t("Content.HourM") }}</b>
                <i>/</i>
              </template>
              <template>
                {{ Time.minute }}<b>{{ $t("Content.MinM") }}</b>
                <i>/</i> </template
              ><template>
                {{ Time.second }}<b>{{ $t("Content.SecondM") }}</b>
                <i>/</i>
              </template>
            </span>
            <span v-else>
              {{ Time }}
            </span>
          </p>
        </div>
      </div>
      <div class="right">
        <NFTCARD
          :rotate="rotate"
          :timeFlag="timeFlag"
          :RewardPoll="RewardPoll"
          :DoraQuantity="DoraQuantity"
          :DoraBalance="DoraBalance"
        ></NFTCARD>
      </div>
    </div>
    <div class="card_button" v-if="timeFlag">
      <button class="one" @mouseup="handleClickBet" v-if="!needClaimFlag">
        {{ $t("NFT.OneCheck") }}<span> 2 HELMET</span>
      </button>
      <button class="one" @click="openDialog('bet')" v-else>
        {{ $t("NFT.OpenOne") }}
      </button>
      <button class="ten" @mouseup="handleClickBet10" v-if="!needClaim10Flag">
        {{ $t("NFT.TenCheck") }}<span> 16 HELMET</span>
      </button>
      <button class="ten" @click="openDialog('bet10')" v-else>
        {{ $t("NFT.OpenTen") }}
      </button>
    </div>
    <div class="card_button" v-else>
      <button class="one" @click="handleClickReward">领取</button>
    </div>
    <div class="card_tips">
      <img src="~/assets/img/nft/home_tip.png" alt="" />
      <p>{{ $t("NFT.NFT_TIP1") }}</p>
    </div>
  </div>
</template>

<script>
import "~/assets/font/font.css";
import { getBalance, totalSupply, balanceOf, redeem } from "~/interface/nft.js";
import { addCommom } from "~/assets/js/util.js";
import moment from "moment";
import NFTCARD from "~/components/nft/nft_card";
import { fixD } from "~/assets/js/util.js";
import {
  bet,
  bet10,
  needClaim,
  needClaim10,
  usersCount,
} from "~/interface/nft.js";

export default {
  components: {
    NFTCARD,
  },
  data() {
    return {
      RewardPoll: "0",
      Time: {
        day: "00",
        hour: "00",
        minute: "00",
      },
      addCommom,
      timeFlag: true,
      rotate: false,
      needClaimFlag: false,
      needClaim10Flag: false,
      usersCount: 0,
      DoraQuantity: 0,
      DoraBalance: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.getNeedCliam();
      this.getNeedCliam10();
      this.getDoraBalance();
      this.getRewardNumber();
      this.getUserCount();
      this.getDoraBalance();
    }, 1000);
    this.$bus.$on("GET_CARD_BALANCE", () => {
      this.getRewardNumber();
      this.getNeedCliam();
      this.getNeedCliam10();
      this.getUserCount();
      this.getDoraBalance();
    });
    this.getRemainTime();
    setInterval(() => {
      setTimeout(() => {
        this.getRemainTime();
      }, 1000);
      clearTimeout();
    });
  },
  methods: {
    async getDoraBalance() {
      let type = "NFT_MAKE";
      this.DoraQuantity = await totalSupply(type);
      this.DoraBalance = await balanceOf("NFT_MAKE");
    },
    handleClickReward() {
      let Type = "NFT_POOL";
      redeem(Type, (data) => {});
    },
    openDialog(action) {
      this.$bus.$emit("NFT_DIALOG_STATUS", { flag: true, action: action });
    },
    async handleClickBet() {
      let Type = "NFT_POOL";
      let Cost = "NFT_COST";
      await bet(Type, Cost, (data) => {
        if (data.status == "bet_pendding") {
          this.rotate = true;
        }
        if (data.status == "bet_success") {
          this.rotate = false;
          this.$bus.$emit("NFT_DIALOG_STATUS", { flag: true, action: "bet" });
        }
        if (data.status == "bet_error") {
          this.rotate = false;
        }
      });
    },
    async handleClickBet10() {
      let Type = "NFT_POOL";
      let Cost = "NFT_COST";
      await bet10(Type, Cost, (data) => {
        if (data.status == "bet_pendding") {
          this.rotate = true;
        }
        if (data.status == "bet_success") {
          this.rotate = false;
          this.$bus.$emit("NFT_DIALOG_STATUS", { flag: true, action: "bet10" });
        }
        if (data.status == "bet_error") {
          this.rotate = false;
        }
      });
    },
    async getNeedCliam() {
      let Type = "NFT_POOL";
      this.needClaimFlag = await needClaim(Type);
    },
    async getNeedCliam10() {
      let Type = "NFT_POOL";
      this.needClaim10Flag = await needClaim10(Type);
    },
    async getRewardNumber() {
      let num = await getBalance("NFT_COST", "NFT_POOL");
      this.RewardPoll = fixD(Number(num), 0);
    },
    async getUserCount() {
      let res = await usersCount("NFT_POOL");
      this.usersCount = res;
    },
    getRemainTime() {
      let now = new Date() * 1;
      let dueDate = new Date(moment("2021/05/15 00:00 UTC+8")) * 1;
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
        this.timeFlag = true;
      } else {
        template = {
          day: "00",
          hour: "00",
          minute: "00",
          second: "00",
        };
        this.Time = "Finished";
        this.timeFlag = false;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and(min-width:750px) {
  .nft_title {
    background-image: url("../../assets/img/nft/nft_card_web.png");
    background-size: 100% 403px;
    background-repeat: no-repeat;
    background-position: bottom;
    padding-bottom: 60px;
  }
  .nft_name {
    margin-top: 23px;
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
    min-width: 1026px;
    margin: 20px auto 0px;
    display: flex;
    justify-content: center;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 60px;
  }
  .right {
    margin-left: 60px;
  }
  .nft_earn {
    display: flex;
    width: 287px;
    height: 60px;
    background: linear-gradient(180deg, #201a22 0%, #7a687e 100%);
    border-radius: 32px;
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
          font-size: 28px;
          font-family: FredokaOne-Regular, FredokaOne;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }
  .nft_user {
    display: flex;
    width: 287px;
    height: 60px;
    background: linear-gradient(180deg, #201a22 0%, #7a687e 100%);
    border-radius: 32px;
    margin-top: 30px;
    > i {
      display: block;
      width: 60px;
      height: 60px;
      background-image: url("../../assets/img/nft/down_user.png");
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
          font-size: 28px;
          font-family: FredokaOne-Regular, FredokaOne;
          font-weight: 400;
          color: #ffffff;
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
  .nft_time {
    display: flex;
    width: 287px;
    height: 60px;
    background: linear-gradient(180deg, #201a22 0%, #7a687e 100%);
    border-radius: 32px;
    margin-top: 30px;
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
          font-size: 20px;
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
  .card_button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 27px;
    padding-bottom: 40px;
    button {
      width: 240px;
      height: 46px;
      border-radius: 20px;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      span {
        font-family: FredokaOne-Regular, FredokaOne;
        font-weight: normal;
      }
    }
    .one {
      background: #999bfb;
      box-shadow: 0px 8px 0px 0px #9383e0;
      text-shadow: 0px 1px 0px #9383e0, 0px 1px 3px #e2dcff;
      margin-right: 20px;
      &:active {
        transition: all 0.5s;
        transform: translateY(6px);
        box-shadow: 0px 2px 0px 0px #9383e0;
      }
    }
    .ten {
      background: #ffbf46;
      box-shadow: 0px 8px 0px 0px #df8c37;
      text-shadow: 0px 1px 0px #ea9975, 0px 1px 3px #ffe0c8;
      margin-left: 20px;
      &:active {
        transform: translateY(6px);
        transition: all 0.5s;
        box-shadow: 0px 2px 0px 0px #df8c37;
      }
    }
  }
  .card_tips {
    justify-content: center;
    width: 503px;
    min-height: 64px;
    background: #241e26;
    box-shadow: 0px 0px 15px 0px #ce97bf;
    border-radius: 10px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 56px;
    }
    p {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 20px;
      margin-left: 12px;
    }
  }
}
@media screen and(max-width:750px) {
  .nft_title {
    background-image: url("../../assets/img/nft/nft_card_web.png");
    background-size: 100% 403px;
    background-repeat: no-repeat;
    background-position: bottom;
    padding-bottom: 30px;
  }
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
    min-width: 287px;
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
  .nft_user {
    display: flex;
    min-width: 287px;
    height: 60px;
    background: linear-gradient(180deg, #201a22 0%, #7a687e 100%);
    border-radius: 32px;
    margin-top: 30px;
    > i {
      display: block;
      width: 60px;
      height: 60px;
      background-image: url("../../assets/img/nft/down_user.png");
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
          font-size: 28px;
          font-family: FredokaOne-Regular, FredokaOne;
          font-weight: 400;
          color: #ffffff;
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
  .nft_time {
    display: flex;
    min-width: 287px;
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
          font-size: 20px;
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
  .card_button {
    padding: 0 20px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 27px;
    button {
      width: 240px;
      height: 40px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      span {
        font-family: FredokaOne-Regular, FredokaOne;
        font-weight: normal;
      }
    }
    .one {
      background: #999bfb;
      box-shadow: 0px 6px 0px 0px #9383e0;
      text-shadow: 0px 1px 0px #9383e0, 0px 1px 3px #e2dcff;
      margin-right: 5px;
      &:active {
        transition: all 0.5s;
        transform: translateY(4px);
        box-shadow: 0px 2px 0px 0px #9383e0;
      }
    }
    .ten {
      background: #ffbf46;
      box-shadow: 0px 6px 0px 0px #df8c37;
      text-shadow: 0px 1px 0px #ea9975, 0px 1px 3px #ffe0c8;
      margin-left: 5px;
      &:active {
        transform: translateY(4px);
        transition: all 0.5s;
        box-shadow: 0px 2px 0px 0px #df8c37;
      }
    }
  }
  .card_tips {
    justify-content: center;
    width: 90%;
    min-height: 64px;
    background: #241e26;
    box-shadow: 0px 0px 15px 0px #ce97bf;
    border-radius: 10px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 56px;
    }
    p {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 20px;
      margin-left: 12px;
    }
  }
}
</style>