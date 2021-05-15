<template>
  <div class="mask" v-if="airdrop">
    <div class="airdrop">
      <p><span>AirDrop</span><i @click="closeAirdrop"></i></p>
      <div class="text">
        <span>待领取：</span>
        <span>{{ addCommom(getReward, 8) }}</span>
      </div>
      <button class="button" @click="claim">
        <i :class="claimLoading ? 'loading_pic' : ''"></i>Claim
      </button>
      <div class="smltext">
        <span>余额:</span>
        <span>{{ addCommom(myBalance, 8) }}</span>
      </div>
      <div class="detail"></div>
    </div>
  </div>
</template>

<script>
import { CangetPAYA, getBalance, getPAYA } from "~/interface/deposite";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
export default {
  data() {
    return {
      airdrop: false,
      myBalance: 0,
      getReward: 0,
      claimLoading: false,
      addCommom,
    };
  },
  mounted() {
    this.$bus.$on("CLAIM_LOADING_AIRDROP", (data) => {
      this.claimLoading = false;
      this.closeAirdrop();
    });
    this.$bus.$on("RELOAD_DATA_AIRDROP", () => {
      this.getBalance();
    });
    setInterval(() => {
      setTimeout(() => {
        this.getBalance();
      }, 1000);
      clearTimeout();
    });
    setTimeout(() => {
      this.getBalance();
    }, 1000);
    this.$bus.$on("AIRDROP_DIALOG", (res) => {
      this.airdrop = res;
    });
  },
  methods: {
    closeAirdrop() {
      this.$bus.$emit("AIRDROP_DIALOG", false);
    },
    async getBalance() {
      let type = "AIRDROP";
      let helmetType = "AIRDROP_LPT";
      let reward = await CangetPAYA(type, "SHIB");
      let myBalance = await getBalance(helmetType, "SHIBh");
      this.getReward = reward;
      this.myBalance = myBalance;
    },
    async claim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "AIRDROP";
      let res = await getPAYA(type);
    },
  },
};
</script>

<style lang='scss' scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
@media screen and (min-width: 750px) {
  .airdrop {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    background: #ffffff;
    border-radius: 8px;
    padding: 30px 20px;
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #17173a;
        line-height: 20px;
      }
      i {
        display: block;
        width: 24px;
        height: 24px;
        background-image: url("../../assets/img/icon/guanbi.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .text {
      margin-top: 34px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(23, 23, 58, 0.7);
          line-height: 14px;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          color: #17173a;
          line-height: 14px;
        }
      }
    }
    .button {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      background: #17173a;
      border-radius: 5px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        margin-right: 4px;
      }
    }
    .smltext {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(23, 23, 58, 0.7);
        line-height: 14px;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .airdrop {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    background: #ffffff;
    border-radius: 8px;
    padding: 20px 16px;
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #17173a;
        line-height: 20px;
      }
      i {
        display: block;
        width: 24px;
        height: 24px;
        background-image: url("../../assets/img/icon/guanbi.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .text {
      margin-top: 34px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(23, 23, 58, 0.7);
          line-height: 14px;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          color: #17173a;
          line-height: 14px;
        }
      }
    }
    .button {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      background: #17173a;
      border-radius: 5px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        margin-right: 4px;
      }
    }
    .smltext {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(23, 23, 58, 0.7);
        line-height: 14px;
      }
    }
  }
}
</style>