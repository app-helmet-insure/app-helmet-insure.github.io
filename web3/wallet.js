import WalletConnectProvider from "@walletconnect/web3-provider";
import bus from "~/assets/js/bus";
import Web3 from "web3";
import { mateMaskInfo } from "../assets/utils/matemask";
export const openMetaMaskWallet = () => {
  return new Promise((resolve, reject) => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (account) => {
          const mockAccount = sessionStorage.getItem("helmet_mock_account");
          if (Web3.utils.isAddress(mockAccount)) {
            window.CURRENTADDRESS = mockAccount;
          } else {
            window.CURRENTADDRESS = account[0];
          }
          window.localStorage.setItem("currentType", "MetaMask");
          // const walletConnectProvider = new WalletConnectProvider({
          //   chainId: 56,
          //   rpc: {
          //     56: "https://bsc-dataseed1.binance.org/",
          //   },
          //   qrcode: true,
          //   pollingInterval: 10000,
          // });
          let userInfo = await mateMaskInfo(account[0], "MetaMask");
          window.$nuxt.$store.dispatch("setUserInfo", {
            isLogin: true,
            account: account[0],
          });
          window.$nuxt.$store.dispatch("setWalletType", "MetaMask");
          resolve();
        });
    } else {
      console.log("Don't have Wallet");
    }
  });
};
export const watchAccountChange = () => {
  ethereum.on("accountsChanged", async (account) => {
    if (account && account.length) {
      window.$nuxt.$store.dispatch("setUserInfo", {
        isLogin: true,
        account: account[0],
      });
    } else {
      window.$nuxt.$store.dispatch("setUserInfo", {
        isLogin: false,
        account: "",
      });
    }
  });
};
export const getNetworkChainID = () => {
  const web3 = new Web3(
    window.ethereum ||
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
  );
  return new web3.eth.net.getId();
};
export const watchNetWorkChange = () => {
  ethereum.on("chainChanged", (chainID) => {
    window.chainID = chainID;
    if (chainID * 1 === 137) {
      window.location.href = "https://www.guard.insure/insurance/";
    }
    window.$nuxt.$store.dispatch("setChainID", chainID * 1);
  });
};
export const addToken = ({
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
}) => {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    ethereum
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      })
      .then((success) => {
        if (success) {
          window.$Message({
            message: `${tokenSymbol} added successfully`,
            type: "success",
          });
        } else {
        }
      });
  } catch (error) {
    console.log(error);
  }
};
