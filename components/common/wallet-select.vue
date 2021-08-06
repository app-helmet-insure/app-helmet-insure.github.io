<!-- 选择钱包 -->
<template>
  <div class="wallet-select-mask mask">
    <div class="wallet-select-block">
      <i class="close" @click="closeDialog"></i>
      <h3 v-if="Type == 'ALL'">链接钱包</h3>
      <h3 v-if="Type == 'NETWORK'">切换网络</h3>
      <div class="switch_network" v-if="Type == 'ALL' || Type == 'NETWORK'">
        <p v-if="Type == 'ALL'">选择网络</p>
        <div>
          <div
            @click="SwitchNetworkBSC"
            :class="ChainID == 56 ? 'activeNetwork' : ''"
          >
            <img src="~/assets/img/guard/BSC.png" alt="" /> BSC
          </div>
          <div
            @click="SwitchNetworkMATIC"
            :class="ChainID == 137 ? 'activeNetwork' : ''"
          >
            <img src="~/assets/img/guard/Polygon.png" alt="" />Polygon
          </div>
        </div>
      </div>
      <div class="switch_wallet" v-if="Type == 'ALL'">
        <p>选择钱包</p>
        <div>
          <div @click="selectWallet('MetaMask')">
            <img src="~/assets/img/wallet-icon/MetaMask@2x.png" alt="" />
            MetaMask
          </div>
          <div @click="selectWallet('WalletConnect')">
            <img src="~/assets/img/wallet-icon/WalletConnect@2x.png" alt="" />
            WalletConnect
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mateMaskInfo } from "~/assets/utils/matemask.js";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { bscNetwork, maticNetwork } from "~/interface/common_contract.js";
export default {
  name: "wallet-select",
  props: ["Type"],
  data() {
    return {
      walletList: ["MetaMask", "WalletConnect"],
      web3: {},
      coinbase: "",
    };
  },
  computed: {
    ChainID() {
      let chainID = this.$store.state.chainID;
      return chainID;
    },
  },
  methods: {
    async SwitchNetworkBSC() {
      let ethereum = window.ethereum;
      await ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [{ ...bscNetwork }],
        })
        .then(() => {});
    },
    async SwitchNetworkMATIC() {
      let ethereum = window.ethereum;
      await ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [{ ...maticNetwork }],
        })
        .then(() => {});
    },
    // 链接钱包
    selectWallet(item) {
      this.$store.dispatch("setWalletType", item);
      if (item === "MetaMask") {
        try {
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(async (account) => {
              window.localStorage.setItem("currentType", "MetaMask");
              let userInfo = await mateMaskInfo(account[0], "MetaMask");
              this.$store.dispatch("setUserInfo", userInfo);
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
      width: 480px;
      left: 50%;
      top: 50%;
      margin-left: -320px;
      margin-top: -140px;
      padding: 30px 45px 45px 45px;
      border-radius: 8px;
      @include themeify {
        background: themed("swap_background");
      }
    }
    h3 {
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      height: 40px;
      @include themeify {
        color: themed("color-#121212");
      }
    }
    .switch_network {
      p {
        font-size: 18px;
        font-weight: 600;
        @include themeify {
          color: themed("color-#121212");
        }
        line-height: 40px;
      }
      > div {
        display: flex;
        justify-content: space-between;
        > div {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 180px;
          height: 50px;
          font-size: 16px;
          font-weight: 600;
          @include themeify {
            color: themed("color-#121212");
            background: themed("color-#f8f9fa");
            border: 1px solid themed("insure_input_border");
          }
          line-height: 18px;
          border-radius: 5px;
          img {
            width: 24px;
            margin-right: 4px;
          }
          &:hover {
            @include themeify {
              background: themed("swap_background");
            }
            border: 2px solid #fd7e14 !important;
          }
        }
        .activeNetwork {
          @include themeify {
            background: themed("swap_background");
          }
          border: 2px solid #fd7e14 !important;
        }
      }
    }
    .switch_wallet {
      margin-top: 20px;
      p {
        font-size: 18px;
        font-weight: 600;
        color: #121212;
        line-height: 40px;
      }
      > div {
        display: flex;
        justify-content: space-between;
        > div {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 180px;
          height: 180px;
          font-size: 16px;
          font-weight: 600;
          line-height: 18px;
          border-radius: 5px;
          @include themeify {
            color: themed("color-#121212");
            background: themed("color-#f8f9fa");
            border: 1px solid themed("insure_input_border");
          }
          img {
            width: 48px;
            margin-bottom: 10px;
          }
          &:hover {
            @include themeify {
              background: themed("swap_background");
            }
            border: 2px solid #fd7e14 !important;
          }
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
      width: 24px;
      height: 24px;
      background: url("../../assets/img/icon/guanbi.png") center center
        no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 20px;
      top: 20px;
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
