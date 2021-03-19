<template>
  <div class="long_burn" :class="expired ? 'expiredBg' : 'activeBg'">
    <img
      v-if="expired"
      class="coin"
      src="~/assets/img/burnmining/expired_hcctCoin.png"
      alt=""
    />
    <img
      v-else
      class="coin"
      src="~/assets/img/burnmining/hctkCoin.png"
      alt=""
    />
    <div class="title">
      <div class="pool_detail">
        <h3 class="pool_name">{{ list.name }}<i @click="showOnepager"></i></h3>
        <span class="earn">
          Earn: <span>hDODO</span>
          <!-- <img src="~/assets/img/burnmining/miniHelmet.png" alt="" /> -->
        </span>
      </div>
      <div class="pool_time" v-if="!openMining">
        <h3>{{ $t("Table.WillStartIn") }}</h3>
        <span>
          <i>{{ MingTime.hour }}</i>
          <b>:</b>
          <i>{{ MingTime.minute }}</i>
          <b>:</b>
          <i>{{ MingTime.second }}</i></span
        >
      </div>
    </div>
    <div class="text">
      <p>
        <span><i></i>{{ $t("Table.SurplusTime") }}：</span>
        <span>{{ list.DownTime.day }}d / {{ list.DownTime.hour }}h</span>
      </p>
      <p>
        <span>{{ $t("Table.Bonus") }}</span>
        <span>{{ list.bonusValue }} hDODO</span>
      </p>
    </div>
    <div class="process">
      <div class="name">
        <span>{{ $t("Table.FireProcess") }}</span>
        <span style="display: flex">
          <span>{{ isLogin ? list.rewards : "--" }}</span>
          /
          <span>{{ isLogin ? list.bonusValue : "--" }}</span>
        </span>
      </div>
      <div class="control">
        <div class="control_wrap">
          <div class="control_real" :style="`width:${list.process}%`">
            <i class="fire" v-if="list.process != 0"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="button_wrap">
      <button
        :class="actionType == 'burn' ? 'active burn' : 'burn'"
        @click="actionType = 'burn'"
      >
        <!-- :style="expired ? 'pointer-events: none' : ''" -->

        {{ $t("Table.Burn") }}
      </button>
      <button
        class="claim"
        :class="actionType == 'claim' ? 'active claim' : 'claim'"
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
          hCTK
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
          <span>hCTK</span>|<i @click="DepositeNum = balance.Deposite">Max</i>
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
              :decimals="4"
            />
            <span v-else>--</span>
            /
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.TotalLPT)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            hCTK
          </span>
        </p>
        <p class="bigsize">
          <span>{{ $t("Table.MyPoolShare") }} </span>
          <span> {{ isLogin ? balance.Share : "--" }} % </span>
        </p>
      </div>
      <button
        class="submit_burn"
        @click="toDeposite"
        :style="
          expired ? 'background: #ccc !important; pointer-events: none' : ''
        "
      >
        <i :class="stakeLoading ? 'loading_pic' : ''"></i>{{ $t("Table.Burn") }}
      </button>
      <div class="ContractAddress">
        <span>hCTK Contract Address：</span>
        <p>
          0x936909e72951A19a5e1d75A109B0D34f06f39838
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0x936909e72951A19a5e1d75A109B0D34f06f39838')
            "
          ></i>
        </p>
      </div>
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
          <span>hDODO</span>|<i
            @click="WithdrawNum = balance.Earn"
            style="background: rgba(255, 150, 0, 0.1)"
            >Max</i
          >
        </p>
      </div>
      <div class="text">
        <p>
          <span>hDODO {{ $t("Table.HELMETRewards") }}</span>
          <span
            ><countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Earn)"
              :duration="2000"
              :decimals="8"
            />
            hDODO</span
          >
        </p>
      </div>
      <button class="submit_burn" @click="toClaim">
        <i :class="claimLoading ? 'loading_pic' : ''"></i
        >{{ $t("Table.Claim") }}
      </button>
      <div class="ContractAddress">
        <span>hDODO Contract Address：</span>
        <p>
          0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3')
            "
          ></i>
        </p>
      </div>
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
import ClipboardJS from "clipboard";
import Message from "~/components/common/Message";
export default {
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: "hCTK Burning Box",
        endTime: "2021/03/23 00:00",
        startTime: "2021/03/16 00:00",
        bonusValue: 10000,
        DownTime: {
          day: "00",
          hour: "00",
        },
        rewards: 0,
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
      MingTime: {
        hour: "00",
        minute: "00",
        second: "00",
      },
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
      actionType: "burn",
      isLogin: false,
      expired: false,
      openMining: false,
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
    this.$bus.$on("DEPOSITE_LOADING_BURNHCTK", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_BURNHCTK", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_BURNHCTK", () => {
      this.getBalance();
    });
    setTimeout(() => {
      this.getDownTime();
      this.getMiningTime();
      this.getBalance();
      this.getProcess();
    }, 1000);
    if (!this.expired) {
      setInterval(() => {
        setTimeout(() => {
          this.getDownTime();
          this.getMiningTime();
        });
        clearTimeout();
      }, 1000);
      setInterval(() => {
        setTimeout(() => {
          this.getProcess();
        });
      }, 20000);
    }
    this.$bus.$on("REFRESH_MINING", (data) => {
      this.getBalance();
    });
  },
  methods: {
    copyAdress(e, text) {
      let _this = this;
      let copys = new ClipboardJS(".copy", { text: () => text });
      copys.on("success", function (e) {
        Message({
          message: "Successfully copied",
          type: "success",
          // duration: 0,
        });
        copys.destroy();
      });
      copys.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
        copys.destroy();
      });
    },
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin;
      }
    },
    showOnepager() {
      this.$bus.$emit("OPEN_ONEPAGER", {
        showFlag: true,
        title: "What is $hDODO?",
        text: [
          "hDODO is the call option of DODO.",
          "Total Supply: 75,000 (22,000 for vDODO holders, 40,000 for FLASH Mining, 10,000 for Burning BOX) Reasonable strike price: 1 DODO= 10 HELMET",
          "Expire date: Apr. 14th 24:00 SGT",
          "Example: If you get 1 hDODO, you could swap 10 HELMET to 1 DODO by click the 'activate' button on TradingView Tab. To be specific, if DODO hit $21 and HELMET hit $2, you could get $1 profit by this 'Activate' behavior.",
          "If hDODO get expired, it could be souvenir token",
          "Please do not trade heavily on hDODO.",
        ],
      });
    },
    async getBalance() {
      let helmetType = "BURNHCTK_LPT";
      let type = "BURNHCTK";
      // 可抵押数量
      let Deposite = await getBalance(helmetType, "BURNHCTK_LPT");
      // 可赎回数量
      let Withdraw = await getLPTOKEN(type);
      // 总抵押
      let TotalLPT = await totalSupply(type, "BURNHCTK_LPT");
      // 可领取Helmet
      let Helmet = await CangetPAYA(type);
      // 总Helmet
      // let LptVolume = await totalSupply(helmetType); //发行
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
      let template = {};
      if (dueDate > now) {
        template = {
          day: day > 9 ? day : "0" + day,
          hour: hour > 9 ? hour : "0" + hour,
        };
      } else {
        template = {
          day: "00",
          hour: "00",
        };
        this.expired = true;
        this.actionType = "claim";
      }
      this.list.DownTime = template;
    },
    getMiningTime() {
      let now = new Date() * 1;
      let dueDate = "2021/03/16 00:00";
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
      hour = hour + day * 24;
      let template = {};
      if (dueDate < now) {
        template = {
          hour: "00",
          minute: "00",
          second: "00",
        };
        this.openMining = true;
      } else {
        template = {
          hour: hour > 9 ? hour : "0" + hour,
          minute: minute > 9 ? minute : "0" + minute,
          second: second > 9 ? second : "0" + second,
        };
      }
      this.MingTime = template;
    },
    getProcess() {
      let now = new Date() * 1;
      let startTime = new Date(this.list.startTime) * 1;
      let endTime = new Date(this.list.endTime) * 1;
      let process = precision.divide(now - startTime, endTime - startTime);

      if (this.expired) {
        this.list.process = 100;
        this.list.rewards = this.list.bonusValue;
      } else {
        this.list.process = process > 0 ? fixD(process * 100, 2) : 0;
        this.list.rewards = process > 0 ? fixD(process * 10000, 4) : 0;
      }
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
      let type = "BURNHCTK";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {});
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "BURNHCTK";
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
.ContractAddress {
  font-size: 14px;
  color: #ff9600;
  margin-top: 8px;
  span {
    color: #121212;
  }
  p {
    display: flex;
    margin-top: 4px;
    align-items: center;
    font-weight: 550;
  }
  i {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-image: url("../../assets/img/helmet/copy.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    margin-left: 4px;
  }
}
@media screen and (min-width: 750px) {
  .expiredBg {
    background-image: url("../../assets/img/burnmining/expired_bg.png");
  }
  .activeBg {
    background-image: url("../../assets/img/burnmining/burnbg.png");
  }
  .long_burn {
    width: 560px;
    height: 610px;
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
      height: 50px;
      display: flex;
      justify-content: space-between;
      > .pool_detail {
        h3 {
          font-size: 20px;
          color: #121212;
          line-height: 25px;
          display: flex;
          align-items: center;
          i {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../../assets/img/helmet/icon_long.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin-left: 3px;
            cursor: pointer;
          }
        }
        > span {
          font-size: 14px;
          color: #9b9b9b;
          display: flex;
          align-items: center;
          margin-top: 4px;
          span {
            font-size: 14px;
            font-weight: bold;
            color: #121212;
          }
          img {
            width: 24px;
            height: 24px;
            margin-left: 4px;
          }
        }
      }
      > .pool_time {
        padding-top: 8px;
        text-align: right;
        > h3 {
          font-size: 12px;
          color: #ffffff;
          padding: 2px 5px;
          background: #ff9600;
          border-radius: 3px;
          font-weight: normal;
        }
        span {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 4px;
          i {
            min-width: 16px;
            min-height: 18px;
            display: inline-block;
            padding: 2px 1px;
            background: #ffe3bb;
            font-size: 12px;
            font-weight: 600;
            color: #22292f;
          }
          b {
            font-size: 12px;
            margin: 0 4px;
            font-weight: 600;
          }
        }
      }
    }
    > .text {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      > p {
        display: flex;
        flex-direction: column;
        &:first-child {
          span {
            &:nth-of-type(1) {
              display: flex;
              align-items: center;
              i {
                display: inline-block;
                width: 12px;
                height: 12px;
                background-image: url("../../assets/img/flashmining/miningtime.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                margin-right: 3px;
              }
            }
            &:nth-of-type(2) {
              padding: 1px 4px;
              background: #ffe3bb;
              border-radius: 3px;
              color: #121212;
              display: flex;
              align-self: baseline;
            }
          }
        }
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
        margin-top: 15px;
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
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .ContractAddress {
    font-size: 12px;
  }
  .expiredBg {
    background-image: url("../../assets/img/burnmining/expired_bg.png");
  }
  .activeBg {
    background-image: url("../../assets/img/burnmining/burnbg.png");
  }
  .long_burn {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-bottom: 50px;
    margin-top: 30px;
    position: relative;
    padding: 14% 14% 20px 20px;
    min-width: 320px;
    width: 100%;
    min-height: 470px;
    > .coin {
      width: 64px;
      height: 64px;
      position: absolute;
      left: 50%;
      top: -45px;
      transform: translateX(-50%);
    }
    > .title {
      height: 50px;
      display: flex;
      justify-content: space-between;
      > .pool_detail {
        h3 {
          font-size: 18px;
          color: #121212;
          line-height: 25px;
          display: flex;
          align-items: center;
          i {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../../assets/img/helmet/icon_long.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin-left: 3px;
            cursor: pointer;
          }
        }
        > span {
          font-size: 14px;
          color: #9b9b9b;
          display: flex;
          align-items: center;
          margin-top: 4px;
          span {
            font-size: 14px;
            font-weight: bold;
            color: #121212;
          }
          img {
            width: 24px;
            height: 24px;
            margin-left: 4px;
          }
        }
      }
      > .pool_time {
        padding-top: 8px;
        text-align: right;
        > h3 {
          font-size: 12px;
          color: #ffffff;
          padding: 2px 5px;
          background: #ff9600;
          border-radius: 3px;
          font-weight: normal;
        }
        span {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 4px;
          i {
            display: inline-block;
            padding: 2px 1px;
            background: #ffe3bb;
            font-size: 12px;
            font-weight: 600;
            color: #22292f;
          }
          b {
            margin: 0 2px;
            font-weight: 600;
          }
        }
      }
    }
    > .text {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      > p {
        display: flex;
        flex-direction: column;
        &:first-child {
          span {
            &:nth-of-type(1) {
              display: flex;
              align-items: center;
              i {
                display: inline-block;
                width: 12px;
                height: 12px;
                background-image: url("../../assets/img/flashmining/miningtime.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                margin-right: 3px;
              }
            }
            &:nth-of-type(2) {
              padding: 1px 4px;
              background: #ffe3bb;
              border-radius: 3px;
              color: #121212;
              display: flex;
              align-self: baseline;
            }
          }
        }
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
      margin-top: 15px;
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
      margin-top: 20px;
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
      margin-top: 10px;
      > p {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #9b9b9b;
      }
      > .input {
        margin-top: 4px;
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
        margin-top: 8px;
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
              margin-top: 5px;
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
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
    .claim_wrap {
      margin-top: 28px;
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
        margin-top: 8px;
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
              margin-top: 5px;
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
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
  }
}
</style>