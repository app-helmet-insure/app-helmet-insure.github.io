<template>
  <div class="long_burn">
    <img class="coin" src="~/assets/img/burnmining/longCoin.png" alt="" />
    <div class="title">
      <h3 class="pool_name">{{ list.name }}</h3>
      <span class="earn">
        Earn <img src="~/assets/img/burnmining/miniHelmet.png" alt="" />
      </span>
    </div>
    <div class="text">
      <p>
        <span>{{ $t("Table.SurplusTime") }}：</span>
        <span>{{ list.DownTime }}</span>
      </p>
      <p>
        <span>{{ $t("Table.Bonus") }}</span>
        <span>{{ list.bonusValue }}</span>
      </p>
    </div>
    <div class="process">
      <div class="name">
        <span>{{ $t("Table.FireProcess") }}</span>
        <span>2000/3000</span>
      </div>
      <div class="control">
        <div class="control_wrap">
          <div class="control_real">
            <i class="fire"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="button_wrap">
      <button
        :class="actionType == 'burn' ? 'active burn' : 'burn'"
        @click="actionType = 'burn'"
      >
        Burn
      </button>
      <button
        class="claim"
        :class="actionType == 'claim' ? 'active burn' : 'burn'"
        @click="actionType = 'claim'"
      >
        Claim
      </button>
    </div>
    <div class="burn_wrap" v-if="actionType == 'burn'">
      <p>
        <span>{{ $t("Table.AmountDeposit") }}</span>
        <span>{{ $t("Table.DAvailable") }}: 0 LONG </span>
      </p>
      <div class="input">
        <input type="text" />
        <p><span>LONG</span>|<i>Max</i></p>
      </div>
      <div class="text">
        <p><span>My Burn/Total Burn</span> <span>0 LONG/3.663 LONG </span></p>
        <p class="bigsize"><span>My Pool Share </span> <span> 0 % </span></p>
      </div>
      <button class="submit_burn">Burn</button>
    </div>
    <div class="claim_wrap" v-if="actionType == 'claim'">
      <!-- <p><span>Amount to deposit</span> <span>Available: 0 LONG </span></p> -->
      <div class="input">
        <input type="text" />
        <p><span>hHELMET</span>|<i>Max</i></p>
      </div>
      <div class="text">
        <p><span>hHELMET Rewards</span> <span>0 hHELMET</span></p>
      </div>
      <button class="submit_burn">Burn</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        name: 'LONG BURN Pool',
        dueDate: "2021-03-11 00:00",
        bonusValue: 100,
        DownTime: "--",
      },
      actionType: 'burn'
    }
  },
  mounted() {
    setInterval(() => {
      setTimeout(() => {
        this.getDownTime();
      });
      clearTimeout();
    }, 1000);
  },
  methods: {
    //   获取矿池结束倒计时
    getDownTime() {
      let now = new Date() * 1;
      let dueDate = this.list.dueDate;
      dueDate = new Date(dueDate);
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
        template = `${day}${this.$t("Content.DayD")} ${hour}${this.$t(
          "Content.HourD"
        )}`;
      } else {
        template = `${0}${this.$t("Content.DayD")} ${0}${this.$t(
          "Content.HourD"
        )}`;
        this.expired = true
      }
      this.list.DownTime = template;
    },
  }
}
</script>

<style lang='scss' scoped>
.long_burn {
  width: 560px;
  height: 593px;
  background-image: url("../../assets/img/burnmining/burnbg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 100px;
  margin-top: 60px;
  position: relative;
  padding: 90px 110px 40px 30px;
  > .coin {
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    top: -30px;
    transform: translateX(-50%);
  }
  > .title {
    h3 {
      font-size: 20px;
      color: #121212;
      line-height: 25px;
    }
    > span {
      font-size: 14px;
      color: #9b9b9b;
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        margin-left: 4px;
      }
    }
  }
  > .text {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    > p {
      display: flex;
      flex-direction: column;
      &:last-child {
        text-align: right;
      }
      span {
        &:nth-of-type(1) {
          font-size: 12px;
          color: #9b9b9b;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          font-weight: bold;
          color: #121212;
          margin-top: 4px;
        }
      }
    }
  }
  > .process {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    > .name {
      padding: 0 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > span {
        &:nth-of-type(1) {
          font-size: 12px;
          color: #9b9b9b;
        }
        &:nth-of-type(2) {
          font-size: 12px;
          color: #000000;
        }
      }
    }
    > .control {
      width: 100%;
      .control_wrap {
        margin-top: 10px;
        width: 100%;
        height: 12px;
        border-radius: 6px;
        background: #fff;
        .control_real {
          width: 10%;
          height: 100%;
          border-radius: 6px;
          background: #ff6400;
          position: relative;
          .fire {
            display: block;
            width: 20px;
            height: 20px;
            background-image: url("../../assets/img/burnmining/fire.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 100%;
            right: 0;
          }
        }
      }
    }
  }
  .button_wrap {
    width: 100%;
    height: 40px;
    display: flex;
    background: #fff7ec;
    border-radius: 10px;
    align-items: center;
    padding: 0 3px;
    margin-top: 42px;
    button {
      flex: 1;
      height: 34px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      background: #fff7ec;
      color: #121212;
    }
    .active {
      background: #ff9600;
      color: #fff;
    }
  }
  .burn_wrap {
    margin-top: 20px;
    > p {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #9b9b9b;
    }
    > .input {
      margin-top: 8px;
      width: 100%;
      height: 40px;
      position: relative;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        height: 100%;
        background: transparent;
        padding: 0 150px 0 12px;
        font-size: 14px;
        color: #9b9b9b;
        border: 1px solid #121212;
        border-radius: 6px;
        &:focus {
          border: 1px solid #ff9600;
        }
      }
      p {
        position: absolute;
        right: 12px;
        display: flex;
        align-items: center;
        span {
          font-size: 14px;
          font-weight: 600;
          color: #121212;
          margin-right: 12px;
        }
        i {
          display: inline-block;
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid #ff9600;
          font-size: 12px;
          color: #ff9600;
          margin-left: 12px;
          cursor: pointer;
        }
      }
    }
    .text {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      > p {
        display: flex;
        flex-direction: column;
        &:last-child {
          text-align: right;
        }
        span {
          &:nth-of-type(1) {
            font-size: 12px;
            color: #9b9b9b;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            font-weight: bold;
            color: #121212;
            margin-top: 10px;
          }
        }
      }
    }
    .submit_burn {
      width: 100%;
      height: 40px;
      background: #121212;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      margin-top: 30px;
      &:hover {
        background: #2c2c2c;
      }
    }
  }
  .claim_wrap {
    margin-top: 42px;
    > p {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #9b9b9b;
    }
    > .input {
      width: 100%;
      height: 40px;
      position: relative;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        height: 100%;
        background: transparent;
        padding: 0 150px 0 12px;
        font-size: 14px;
        color: #9b9b9b;
        border: 1px solid #121212;
        border-radius: 6px;
        &:focus {
          border: 1px solid #ff9600;
        }
      }
      p {
        position: absolute;
        right: 12px;
        display: flex;
        align-items: center;
        span {
          font-size: 14px;
          font-weight: 600;
          color: #121212;
          margin-right: 12px;
        }
        i {
          display: inline-block;
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid #ff9600;
          font-size: 12px;
          color: #ff9600;
          margin-left: 12px;
          cursor: pointer;
        }
      }
    }
    .text {
      display: flex;
      justify-content: flex-start;
      margin-top: 14px;
      > p {
        display: flex;
        flex-direction: column;
        span {
          &:nth-of-type(1) {
            font-size: 12px;
            color: #9b9b9b;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            font-weight: bold;
            color: #121212;
            margin-top: 10px;
          }
        }
      }
    }
    .submit_burn {
      width: 100%;
      height: 40px;
      background: #121212;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      margin-top: 30px;
      &:hover {
        background: #2c2c2c;
      }
    }
  }
}
</style>