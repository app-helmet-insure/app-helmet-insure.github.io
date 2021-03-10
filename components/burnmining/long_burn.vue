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
        <span>{{ list.bonusValue }}hHELMET</span>
      </p>
    </div>
    <div class="process">
      <div class="name">
        <span>{{ $t("Table.FireProcess") }}</span>
        <span style="display: flex">
          <span>{{ isLogin ? list.rewards : "--" }}</span>
          /
          <span>{{ isLogin ? list.allRewards : "--" }}</span>
        </span>
      </div>
      <div class="control">
        <div class="control_wrap">
          <div class="control_real" :style="`width:${list.process}%`">
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
        {{ $t("Table.Burn") }}
      </button>
      <button
        class="claim"
        :class="actionType == 'claim' ? 'active burn' : 'burn'"
        @click="actionType = 'claim'"
      >
        {{ $t("Table.Claim") }}
      </button>
    </div>
    <div class="burn_wrap" v-if="actionType == 'burn'">
      <p>
        <span>{{ $t("Table.AmountDeposit") }}</span>
        <span>
          {{ $t("Table.DAvailable") }}:
          <countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(balance.Deposite)"
            :duration="2000"
            :decimals="8"
          />
          <span v-else>--</span>
          LONG
        </span>
      </p>
      <div class="input">
        <input
          type="text"
          v-model="DepositeNum"
          :style="
            DepositeNum == balance.Deposite
              ? 'border: 1px solid #FF9600 !important'
              : ''
          "
        />
        <p>
          <span>LONG</span>|<i @click="DepositeNum = balance.Deposite">Max</i>
        </p>
      </div>
      <div class="text">
        <p>
          <span>{{ $t("Table.MyBurn") }}/{{ $t("Table.TotalBurn") }}</span>
          <span style="display: flex">
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Withdraw)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            /
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.TotalLPT)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            LONG
          </span>
        </p>
        <p class="bigsize">
          <span>{{ $t("Table.MyPoolShare") }} </span>
          <span> {{ isLogin ? balance.Share : "--" }} % </span>
        </p>
      </div>
      <button class="submit_burn" @click="toDeposite">
        <i :class="stakeLoading ? 'loading_pic' : ''"></i>Burn
      </button>
    </div>
    <div class="claim_wrap" v-if="actionType == 'claim'">
      <!-- <p><span>Amount to deposit</span> <span>Available: 0 LONG </span></p> -->
      <div class="input">
        <input
          v-if="isLogin"
          type="text"
          v-model="balance.Earn"
          disabled
          style="border: 1px solid #ff9600 !important"
        />
        <input
          v-else
          type="text"
          disabled
          style="border: 1px solid #ff9600 !important"
        />
        <p>
          <span>hHELMET</span>|<i
            @click="WithdrawNum = balance.Earn"
            style="background: rgba(255, 150, 0, 0.1)"
            >Max</i
          >
        </p>
      </div>
      <div class="text">
        <p>
          <span>hHELMET {{ $t("Table.HELMETRewards") }}</span>
          <span
            ><countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Earn)"
              :duration="2000"
              :decimals="8"
            />
            hHELMET</span
          >
        </p>
      </div>
      <button class="submit_burn" @click="toClaim">
        <i :class="claimLoading ? 'loading_pic' : ''"></i
        >{{ $t("Table.Claim") }}
      </button>
    </div>
  </div>
</template>

<script>
import {
  totalSupply,
  balanceOf,
  getLPTOKEN,
  CangetPAYA,
  CangetUNI,
  getPAYA,
  exitStake,
  getLastTime,
  approveStatus,
  getBalance,
  toDeposite,
  getMined,
  WithdrawAvailable,
  getAllHelmet,
  Rewards,
} from "~/interface/deposite";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import precision from "~/assets/js/precision.js";
import countTo from "vue-count-to";
export default {
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: "LONG BURN Pool",
        endTime: "2021-03-11 00:00",
        startTime: "2021-03-10 00:00",
        bonusValue: 1,
        DownTime: "--",
        rewards: 0,
        allRewards: 1,
        process: 0,
      },
      balance: {
        Deposite: 0,
        Withdraw: 0,
        Earn: 0,
        TotalLPT: 0,
        Share: 0,
      },
      DepositeNum: "",
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
      actionType: "burn",
      isLogin: false,
    };
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  mounted() {
    this.$bus.$on("DEPOSITE_LOADING_BURNLONG", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_BURNLONG", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_BURNLONG", () => {
      this.getBalance();
    });
    setInterval(() => {
      setTimeout(() => {
        this.getDownTime();
      });
      clearTimeout();
    }, 1000);
    setTimeout(() => {
      this.getBalance();
      this.getProcess();
    }, 1000);
    setInterval(() => {
      setTimeout(() => {
        this.getProcess();
      });
    }, 20000);
    this.$bus.$on("REFRESH_MINING", (data) => {
      this.getBalance();
    });
  },
  methods: {
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin;
      }
    },
    async getBalance() {
      let helmetType = "BURNLONG_LPT";
      let type = "BURNLONG";
      // 可抵押数量
      let Deposite = await getBalance(helmetType);
      // 可赎回数量
      let Withdraw = await getLPTOKEN(type);
      // 总抵押
      let TotalLPT = await totalSupply(type);
      // 可领取Helmet
      let Helmet = await CangetPAYA(type);
      // 总Helmet
      // let LptVolume = await totalSupply(helmetType); //发行
      console.log(Deposite, Withdraw, TotalLPT, Helmet);
      this.balance.Deposite = fixD(Deposite, 8);
      this.balance.Withdraw = fixD(Withdraw, 8);
      this.balance.Earn = fixD(Helmet, 8);
      this.balance.TotalLPT = fixD(TotalLPT, 8);
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2);
    },
    //   获取矿池结束倒计时
    getDownTime() {
      let now = new Date() * 1;
      let dueDate = this.list.endTime;
      dueDate = new Date(dueDate) * 1;
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
        this.expired = true;
      }
      this.list.DownTime = template;
    },
    getProcess() {
      let now = new Date() * 1;
      let startTime = new Date(this.list.startTime) * 1;
      let endTime = new Date(this.list.endTime) * 1;
      let process = precision.divide(now - startTime, endTime - startTime);
      this.list.process = fixD(process * 100, 2);
      this.list.rewards = fixD(process * 1, 4);
    },
    // 抵押
    toDeposite() {
      if (!this.DepositeNum) {
        return;
      }
      if (this.stakeLoading) {
        return;
      }
      this.stakeLoading = true;
      let type = "BURNLONG";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => { });
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "BURNLONG";
      let res = await getPAYA(type);
    },
  },
};
</script>

<style lang='scss' scoped>
.loading_pic {
  display: block;
  width: 24px;
  height: 24px;
  background-image: url("../../assets/img/helmet/loading.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
}
.long_burn {
  width: 560px;
  height: 600px;
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
      > span {
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
        height: 14px;
        border-radius: 6px;
        background: #fff;
        .control_real {
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
      font-size: 14px;
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
        > span {
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
      display: flex;
      align-items: center;
      justify-content: center;
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
        > span {
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
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #2c2c2c;
      }
    }
  }
}
</style>