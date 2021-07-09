<template>
  <div class="guard_dialog_mask" v-if="dialogFlag">
    <div class="guard_dialog">
      <i class="close" @click="CloseDialog"></i>
      <div class="staking" v-if="Type === 'pendding'">
        <div class="top_text">This process may take some time</div>
        <button class="switch_button" @click="SwitchNetwork" v-if="Step === 1">
          Switch to Matic & Withdraw
        </button>
        <button
          class="switch_button"
          @click="ClickWithDraw(2)"
          v-if="Step === 2"
        >
          <i v-if="WithdrawLoading" class="loading_pic"></i>
          {{
            WithdrawLoading ? "This process may take some time..." : "Withdraw"
          }}
        </button>
        <div class="addToken">
          Add hAUTO to MetaMask<i class="metamask"></i>
        </div>
        <div class="powered">Powered by BlackHole & ChainSwap</div>
      </div>
      <div class="success" v-if="Type === 'success'">
        <img src="~/assets/img/guard/success.png" alt="" />
        <div class="top_text">This process may take some time</div>
        <div class="link">
          ➡️ <a href="">Guard.insure</a> to get amazing DeFi experience
        </div>
        <div class="info">
          GUARD.INSURE Crypto-assets insurance trading platform on BSC
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { maticNetwork } from "~/interface/common_contract.js";
export default {
  data() {
    return {
      dialogFlag: false,
      Step: 1,
      Type: "pendding",
      WithdrawLoading: false,
    };
  },
  mounted() {
    this.$bus.$on("OPEN_GUARD_DIALOG", ({ Step, Type }) => {
      this.Step = Step;
      this.Type = Type;
      this.dialogFlag = true;
    });
    this.$bus.$on("CLOSE_GUARD_DIALOG", () => {
      this.dialogFlag = false;
    });
  },
  methods: {
    CloseDialog() {
      this.dialogFlag = false;
      this.Step = 1;
      this.WithdrawLoading = false;
    },
    async SwitchNetwork() {
      let ethereum = window.ethereum;
      await ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [{ ...maticNetwork }],
        })
        .then(() => {
          this.ClickWithDraw(1);
        });
    },
    ClickWithDraw(Step) {
      this.$bus.$emit("HISTORY_GUARD_SWAP", Step);
      this.WithdrawLoading = true;
    },
  },
};
</script>

<style lang='scss' scoped>
.guard_dialog_mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.5);
}
.guard_dialog {
  width: 450px;
  height: 280px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  .close {
    width: 24px;
    height: 24px;
    display: block;
    background-image: url("../../assets/img/guard/close.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 16px;
    cursor: pointer;
  }
}
.staking {
  padding-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .top_text {
    font-size: 20px;
    font-family: IBMPlexSans-Bold, IBMPlexSans;
    font-weight: bold;
    color: #17173a;
  }
  .switch_button {
    width: 100%;
    height: 50px;
    background: #17173a;
    border-radius: 5px;
    font-size: 18px;
    font-family: IBMPlexSans-Bold, IBMPlexSans;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }
  .addToken {
    margin-top: 15px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #fd7e14;
    i {
      width: 20px;
      height: 20px;
    }
  }
  .powered {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(23, 23, 58, 0.4);
    line-height: 17px;
    margin-top: 35px;
  }
}
.success {
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    width: 80px;
    height: 80px;
  }
  .top_text {
    font-size: 20px;
    font-family: IBMPlexSans-Bold, IBMPlexSans;
    font-weight: bold;
    color: #17173a;
  }
  .link {
    width: 330px;
    margin-top: 20px;
    font-size: 14px;
    font-family: AppleColorEmoji;
    color: rgba(23, 23, 58, 0.6);
    line-height: 20px;
    a {
      color: #7196ff;
    }
  }
  .info {
    width: 330px;
    margin-top: 20px;
    font-size: 14px;
    font-family: AppleColorEmoji;
    color: rgba(23, 23, 58, 0.6);
    line-height: 20px;
  }
}
</style>