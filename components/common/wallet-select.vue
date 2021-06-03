<!-- 选择钱包 -->
<template>
  <div class="wallet-select-mask mask">
    <div class="wallet-select-block">
      <i class="close" @click="closeDialog"></i>
      <ul>
        <li
          :class="
            item === 'MetaMask' || item === 'WalletConnect' ? 'on' : 'off'
          "
          v-for="item in walletList"
          :key="item"
          @click="selectWallet(item)"
        >
          <img :src="require(`~/assets/img/wallet-icon/${item}@2x.png`)" />
          <span>{{ $t("Wallet.ConnectWallet", { item: item }) }}</span>
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
  name: "wallet-select",
  data() {
    return {
      walletList: ["MetaMask", "WalletConnect"],
      web3: {},
      coinbase: "",
    };
  },
  methods: {
    // 链接钱包
    selectWallet(item) {
      this.$store.dispatch("setWalletType", item);
      if (item === "MetaMask") {
        console.log(111);
        try {
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(async (account) => {
              window.localStorage.setItem("currentType", "MetaMask");
              let userInfo = await mateMaskInfo(account[0], "MetaMask");
              this.$store.dispatch("setUserInfo", userInfo);
              this.$bus.$emit("REFRESH_ALL_DATA");
              this.$bus.$emit("REFRESH_MINING");
              this.closeDialog();
            });
        } catch (error) {}
      } else if (item === "WalletConnect") {
        this.connectWallet();
      }
    },
    closeDialog() {
      this.$emit("close");
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
      await walletConnectProvider.enable();
      const web3 = new Web3(walletConnectProvider);
      const coinbase = walletConnectProvider.wc.accounts[0];
      window.WEB3 = web3;
      let userInfo = await mateMaskInfo(coinbase, "WalletConnect");
      this.$store.dispatch("setUserInfo", userInfo);
      window.localStorage.setItem("currentType", "WalletConnect");
      this.$bus.$emit("REFRESH_ALL_DATA");
      this.$bus.$emit("REFRESH_MINING");
      this.closeDialog();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .wallet-select-mask {
    .wallet-select-block {
      width: 640px;
      height: 280px;
      left: 50%;
      top: 50%;
      margin-left: -320px;
      margin-top: -140px;
    }
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 320px;
        height: 280px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0px 16px;
        border-right: 1px solid #ededf0;
        @include themeify {
          background: themed("color-f8f9fa");
        }
        &:hover {
          cursor: pointer;
          @include themeify {
            background: themed("color-ffffff");
          }
          span {
            color: #fd7e14;
          }
        }

        img {
          width: 80px;
          height: 80px;
          margin-right: 16px;
        }
        span {
          margin-top: 20px;
          font-size: 14px;
          color: $text-b2;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .wallet-select-mask {
    display: flex;
    align-items: center;
    justify-content: center;
    .wallet-select-block {
      min-width: 320px;
      width: 80%;
      height: 460px;
    }
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      li {
        height: 280px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #ededf0;
        &.on {
          cursor: pointer;
        }
        &.off {
          cursor: wait;
          opacity: 0.5;
        }
        img {
          width: 80px;
          height: 80px;
        }
        span {
          font-size: 14px;
          @include themeify {
            background: themed("color-17173a");
          }
          margin-top: 20px;
        }
      }
    }
  }
}
.wallet-select-mask {
  .wallet-select-block {
    position: fixed;
    background-color: $bg-w;
    text-align: left;
    .close {
      display: block;
      width: 20px;
      height: 20px;
      background: url("../../assets/img/icon/guanbi.png") center center
        no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
    .title {
      font-size: 24px;
      color: $bg-f;
    }
    .sub-title {
      font-size: 14px;
      color: $bg-f;
      padding-top: 4px;
      padding-bottom: 4px;
    }
  }
}
</style>
