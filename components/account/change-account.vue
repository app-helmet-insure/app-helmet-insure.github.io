<template>
  <div class="change-account">
    <div class="mask" @click="closeDialog"></div>
    <div class="change-account-block">
      <div class="action">
        <span class="back" @click="backDialog"></span>
        <span class="close" @click="closeDialog"></span>
      </div>

      <div class="current-account">
        <svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1">
          <g fill="#FD7E14">
            <circle fill-opacity="0.2" cx="6" cy="6" r="6"></circle>
            <circle cx="6" cy="6" r="3"></circle>
          </g>
        </svg>
        <span class="address-text">{{ accountText }}</span>
        <img
          :src="
            require(`~/assets/img/wallet-icon/${userInfo.data.name}@2x.png`)
          "
        />
      </div>
      <ul class="wallet-list">
        <li
          v-if="userInfo.data.name === 'WalletConnect'"
          @click="changeWallet('MetaMask')"
        >
          <span>MetaMask</span>
          <img src="~/assets/img/wallet-icon/MetaMask@2x.png" />
        </li>
        <li v-else @click="changeWallet('WalletConnect')">
          <span>Wallet Connect</span>
          <img src="~/assets/img/wallet-icon/WalletConnect@2x.png" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mateMaskInfo } from "~/assets/utils/matemask.js";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

export default {
  name: "change-account",
  data() {
    return {
      accountText: "",
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
  },
  methods: {
    userInfoWatch(newValue) {
      let account = newValue.data.account;
      this.accountText =
        account.substr(0, 1) +
        " " +
        account.substr(1, 1) +
        " " +
        account.substr(2, 4) +
        "..." +
        account.substr(-5);
      this.$bus.$emit("REFRESH_MINING");
      this.$bus.$emit("REFRESH_BALANCE");
    },
    closeDialog() {
      this.$emit("close");
    },
    backDialog() {
      this.$emit("back");
      this.closeDialog();
    },
    changeWallet(item) {
      this.$store.dispatch("setWalletType", item);
      if (item === "MetaMask") {
        this.connectMetaMask();
      } else {
        this.connectWallet();
      }
    },
    connectMetaMask() {
      try {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (account) => {
            window.localStorage.setItem("currentType", "MetaMask");
            let userInfo = await mateMaskInfo(account[0], "MetaMask");
            this.$store.dispatch("setUserInfo", userInfo);
            this.closeDialog();
            this.$bus.$emit("REFRESH_MINING");
            this.$bus.$emit("REFRESH_BALANCE");
            this.$bus.$emit("DRAW_ECHART", { drawFlag: true });
          });
      } catch (error) {}
    },
    async connectWallet() {
      const walletConnectProvider = new WalletConnectProvider({
        chainId: 56,
        bridge: "https://bridge.walletconnect.org",
        rpc: {
          56: "https://bsc-dataseed1.binance.org/",
        },
        qrcode: true,
        pollingInterval: 10000,
      });
      let res = await walletConnectProvider.enable();
      const web3 = new Web3(walletConnectProvider);
      const coinbase = walletConnectProvider.wc.accounts[0];
      window.WEB3 = web3;
      let userInfo = await mateMaskInfo(coinbase, "WalletConnect");
      this.$store.dispatch("setUserInfo", userInfo);
      this.closeDialog();
      this.$bus.$emit("REFRESH_MINING");
      this.$bus.$emit("REFRESH_BALANCE");
      this.$bus.$emit("DRAW_ECHART", { drawFlag: true });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .change-account-block {
    padding: 30px 56px 56px;
    @include themeify {
      background: themed("color-ffffff");
    }
    z-index: 102;
  }
}
@media screen and (max-width: 750px) {
  .change-account-block {
    width: 90%;
    padding: 8px 16px;
    @include themeify {
      background: themed("color-ffffff");
    }
    z-index: 102;
  }
}
.change-account {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  .mask {
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 101;
  }
  .change-account-block {
    border-radius: 8px;
    padding: 20px 20px 30px;
    .action {
      width: 100%;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .back {
      cursor: pointer;
      display: inline-block;
      width: 24px;
      height: 26px;
      background-image: url("../../assets/img/icon/left2.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }
    .close {
      cursor: pointer;
      display: inline-block;
      width: 24px;
      height: 26px;
      background-image: url("../../assets/img/icon/guanbi.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }
    @media screen and (min-width: 750px) {
      width: 320px;
    }
    @media screen and (max-width: 750px) {
      width: 90%;
    }
    .current-account {
      border: 2px solid rgba(253, 126, 20, 0.2);
      display: flex;
      align-items: center;
      @include themeify {
        background: themed("color-ffffff");
      }
      height: 48px;
      padding: 0px 16px;
      margin-top: 20px;
      border-radius: 5px;
      .address-text {
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          color: themed("color-17173a");
        }
        line-height: 18px;
        padding-left: 8px;
        font-weight: 550;
        flex: 1;
        text-align: left;
      }
      > img {
        width: 30px;
        height: 30px;
      }
    }
    .wallet-list {
      li {
        border: 2px solid #e8e8eb;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          background: themed("color-f8f9fa");
          border: 2px solid themed("insure_input_border");
          color: themed("color-17173a");
        }
        font-weight: 550;
        margin-top: 16px;
        padding: 0px 16px 0 36px;
        cursor: pointer;
        border-radius: 5px;

        img {
          width: 30px;
          height: 30px;
        }
        &:hover {
          border: 2px solid rgba(253, 126, 20, 0.3);
          @include themeify {
            background: themed("color-ffffff");
          }
        }
      }
    }
  }
}
</style>
