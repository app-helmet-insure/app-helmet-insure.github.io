import WalletConnectProvider from "@walletconnect/web3-provider";
export const openMetaMaskWallet = () => {
  try {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(async (account) => {
        window.CURRENTADDRESS = account[0];
        window.localStorage.setItem("currentType", "MetaMask");
        // const walletConnectProvider = new WalletConnectProvider({
        //   chainId: 56,
        //   rpc: {
        //     56: "https://bsc-dataseed1.binance.org/",
        //   },
        //   qrcode: true,
        //   pollingInterval: 10000,
        // });
        // let userInfo = await mateMaskInfo(account[0], "MetaMask");
        window.$nuxt.$store.dispatch("setUserInfo", {
          isLogin: true,
          account: account[0],
        });
        window.$nuxt.$store.dispatch("setWalletType", "MetaMask");
      });
  } catch (error) {}
};
export const watchAccountChange = () => {
  ethereum.on("accountsChanged", async (account) => {
    console.log(account, "################Account");
    if (account && account.length) {
      console.log(1);
      window.$nuxt.$store.dispatch("setUserInfo", {
        isLogin: true,
        account: account[0],
      });
    } else {
      console.log(2);
      window.$nuxt.$store.dispatch("setUserInfo", {
        isLogin: false,
        account: "",
      });
    }
  });
};
export const watchNetWorkChange = () => {
  ethereum.on("chainChanged", (chainID) => {
    window.chainID = chainID;
    if (chainID * 1 === 137) {
      window.location.href = "https://www.guard.insure/insurance/";
    }
    window.$nuxt.$store.dispatch("setChainID", chainID);
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
