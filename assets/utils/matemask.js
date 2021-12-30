// import WalletConnect from '@walletconnect/client';
// import QRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import bus from "~/assets/js/bus.js";
import { getID } from "~/assets/utils/address-pool.js";

export const mateMaskInfo = async (address, name) => {
  let obj = {
    status: 0,
    data: {
      isLogin: false,
    },
  };

  try {
    // let current = address || window.CURRENTADDRESS;
    let current;
    let currentType = window.localStorage.getItem("currentType");

    const walletConnectProvider = new WalletConnectProvider({
      chainId: 56,
      rpc: {
        56: "https://bsc-dataseed1.binance.org/",
      },
      qrcode: true,
      pollingInterval: 10000,
    });

    // await walletConnectProvider.enable();
    const coinbase = walletConnectProvider.wc.accounts[0];
    if (address) {
      current = address;
      obj.data.name = name;
      if (name === "WalletConnect") {
        await walletConnectProvider.enable();
        window.WEB3 = new Web3(walletConnectProvider);
      } else {
        window.WEB3 = new Web3(Web3.givenProvider);
      }
      window.chainID = await getID();
    } else {
      if (currentType === "WalletConnect") {
        if (coinbase) {
          current = coinbase;
          await walletConnectProvider.enable();
          // window.WEB3 = new Web3(walletConnectProvider);
          obj.data.name = "WalletConnect";
        }
      } else {
        // window.WEB3 = new Web3(Web3.givenProvider);
        // current = window.CURRENTADDRESS;
        current = window.WEB3.currentProvider.selectedAddress;
        obj.data.name = "MetaMask";
      }
    }


    if (!current) {
      // alert(111);
      return obj;
    } else {
      const mockAccount = sessionStorage.getItem('helmet_mock_account')
      if (Web3.utils.isAddress(mockAccount)) {
        window.CURRENTADDRESS = mockAccount
      } else {
        window.CURRENTADDRESS = current;
      }
    }
    obj.isLogin = true;
    obj.account = current;
    obj.status = 1;
    return obj;
  } catch (error) {
    console.log("util=>matemask=>mateMaskInfo", error);
    return {
      status: -1,
      error,
      msg: "MateMask 扩展插件未安装或未启用",
    };
  }
};
