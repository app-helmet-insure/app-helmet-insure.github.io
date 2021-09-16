import MiningABI from "./abis/MiningABI.json";
import Web3 from "web3";
import { cloneDeep } from "lodash";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Provider } from "ethers-multicall-x";
import BigNumber from "bignumber.js";
const BSCChainId = 56;
const BSCRpcUrl = "https://bsc-dataseed.binance.org/";
export const getDecimals = (Decimals) => {
  switch (Decimals) {
    case 0:
      return "noether";
    case 1:
      return "wei";
    case 3:
      return "kwei";
    case 6:
      return "mwei";
    case 9:
      return "gwei";
    case 12:
      return "microether";
    case 15:
      return "milliether";
    case 18:
      return "ether";
    case 21:
      return "kether";
    case 24:
      return "mether";
    case 27:
      return "gether";
    case 30:
      return "tether";
    default:
      return Decimals;
  }
};
export const fromWei = (FixNumber, Decimals) => {
  let FixDecimals = getDecimals(Decimals);
  if (typeof FixDecimals === "number") {
    return new BigNumber(FixNumber)
      .dividedBy(new BigNumber(10).pow(FixDecimals))
      .toNumber()
      .toString();
  } else {
    return Web3.utils.fromWei(FixNumber, FixDecimals);
  }
};
export const toWei = (FixNumber, Decimals) => {
  let FixDecimals = getDecimals(Decimals);
  if (typeof FixDecimals === "number") {
    return new BigNumber(FixNumber)
      .multipliedBy(new BigNumber(10).pow(FixDecimals))
      .toNumber()
      .toString();
  } else {
    return Web3.utils.toWei(FixNumber, FixDecimals);
  }
};

export const getOnlyMultiCallProvider = () =>
  new Provider(new JsonRpcProvider(BSCRpcUrl, BSCChainId), BSCChainId);

export const processResult = (data) => {
  data = cloneDeep(data);
  if (Array.isArray(data)) {
    data.map((o, i) => {
      data[i] = processResult(o);
    });
    return data;
  } else if (data.toString) {
    return data.toString();
  } else if (typeof data === "object") {
    for (let key in data) {
      Object.assign(data, {
        [key]: processResult(0),
      });
    }
    return data;
  } else {
    return data;
  }
};
export const WEB3 = () => new Web3(window.ethereum);
export const getContract = (abi, address) => {
  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(abi, address);
};
export const HelmetBalance = () => {
  const Helmet = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const Contracts = getContract(MiningABI, Helmet);
  const Account = window.CURRENTADDRESS;
  return Contracts.methods
    .balanceOf(Account)
    .call()
    .then((res) => {
      let Balance = Number(fromWei(res)).toFixed(4);
      return Balance;
    });
};
export const TokenBalance = (TokenAddress, Decimals, Owner) => {
  const Contracts = getContract(MiningABI, TokenAddress);
  const Account = window.CURRENTADDRESS;
  console.log(TokenAddress, Decimals, Owner, Account);
  return Contracts.methods
    .balanceOf(Owner || Account)
    .call()
    .then((res) => {
      console.log(res);
      let Balance = fromWei(res, Decimals || 18);
      return Balance;
    });
};
export const ETHBalance = () => {
  const Account = window.CURRENTADDRESS;
  return window.WEB3.eth.getBalance(Account).then((res) => {
    let Balance = Number(fromWei(res)).toFixed(4);
    return Balance;
  });
};
