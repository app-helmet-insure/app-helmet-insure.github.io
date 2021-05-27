<template>
  <div class="burnbox">
    <div class="burn_wrap" v-if="TradeType == 'STAKE' || TradeType == 'ALL'">
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
      <p>
        <span>{{ $t("Table.DAvailable") }}</span>
        <span>
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
              ? 'border: 1px solid #fd7e14 !important'
              : ''
          "
        />
        <p>
          <span>hCTK</span>|<i @click="DepositeNum = balance.Deposite">{{
            $t("Table.Max")
          }}</i>
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
      <div class="text">
        <p>
          <span>{{ $t("Table.MyBurn") }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Withdraw)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;hCTK</span
          >
        </p>
        <p>
          <span>{{ $t("Table.TotalBurn") }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.TotalLPT)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;hCTK</span
          >
        </p>
        <p class="bigsize">
          <span>{{ $t("Table.MyPoolShare") }} </span>
          <span> {{ isLogin ? balance.Share : "--" }} % </span>
        </p>
      </div>

      <div class="ContractAddress">
        <span>hCTK {{ $t("Table.ContractAddress") }}</span>
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
    <i></i>
    <div class="claim_wrap" v-if="TradeType == 'CLAIM' || TradeType == 'ALL'">
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
      <div class="input">
        <input
          v-if="isLogin"
          type="text"
          v-model="balance.Earn"
          disabled
          style="border: 1px solid #fd7e14 !important"
        />
        <input
          v-else
          type="text"
          disabled
          style="border: 1px solid #fd7e14 !important"
        />
        <p>
          <span>hDODO</span>|<i
            @click="WithdrawNum = balance.Earn"
            style="background: rgba(255, 150, 0, 0.1)"
            >{{ $t("Table.Max") }}</i
          >
        </p>
      </div>

      <button class="submit_burn" @click="toClaim">
        <i :class="claimLoading ? 'loading_pic' : ''"></i
        >{{ $t("Table.Claim") }}
      </button>
      <div class="ContractAddress">
        <span>hDODO {{ $t("Table.ContractAddress") }}</span>
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
  getLPTOKEN,
  CangetPAYA,
  getPAYA,
  getBalance,
  toDeposite,
} from "~/interface/deposite";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import precision from "~/assets/js/precision.js";
import countTo from "vue-count-to";
import ClipboardJS from "clipboard";
import Message from "~/components/common/Message";
export default {
  props: ["TradeType"],
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
    this.getDownTime();
    this.getMiningTime();
    this.getBalance();
    this.getProcess();
    if (!this.expired) {
      let timer1 = setInterval(() => {
        this.getDownTime();
        this.getMiningTime();
      }, 1000);
      let timer2 = setInterval(() => {
        this.getProcess();
      }, 20000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer1);
        clearInterval(timer2);
      });
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
@import "../../assets/css/burn_pool.scss";
</style>