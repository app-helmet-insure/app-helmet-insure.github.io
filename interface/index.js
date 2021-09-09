import { web3 } from "~/assets/utils/web3-obj.js";
import Web3 from "web3";
import ERC20ABI from "~/abi/ERC20ABI.json";
import payaso_abi from "~/abi/payaso_abi.json";
import FactoryABI from "~/abi/FactoryABI.json";
import OrderABI from "~/abi/OrderABI.json";
import MiningABI from "~/abi/MiningABI.json";
import token_abi from "~/abi/token_abi.json";
import helmet_abi from "~/abi/helmet_abi.json";
import iio_abi from "~/abi/iio_abi.json";
import nft_abi from "~/abi/nft_abi.json";
import default_nft_abi from "~/abi/default_nft_abi.json";
import nft_user_abi from "~/abi/nft_user_abi.json";
import IPancakePair from "~/abi/IPancakePair.json";
import IPancakeSwap from "~/abi/IPancakeSwap.json";
import { getAddress, getContract, getID } from "~/assets/utils/address-pool.js";
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
export const getCurrentAccount = async () => {
  return web3().then((res) => res.currentProvider.selectedAddress);
};

// 买家凭证，用于行权
export const Long = async () => {
  const WEB3 = await web3();
  const charID = await getID();
  return await new WEB3.eth.Contract(ERC20ABI.abi, getAddress("LONG", charID));
};

export const Payaso = async () => {
  const WEB3 = await web3();
  const charID = await getID();
  return await new WEB3.eth.Contract(
    payaso_abi.abi,
    getContract("PLAN", charID)
  );
};

// 期权工厂合约, 用于创建期权实例合约，铸造期权通证，销毁期权通证，并实现了行权和结算入口。
export const Factory = async (adress) => {
  const WEB3 = await web3();
  return await new WEB3.eth.Contract(
    FactoryABI,
    getContract("FACTORY", window.chainID)
  );
};

// 期权市场，卖家挂单，买家吃单，并实现了买家行权和弃权入口。
export const Order = async () => {
  const WEB3 = await web3();
  return await new WEB3.eth.Contract(
    OrderABI,
    getContract("ORDER", window.chainID)
  );
};
// 质押挖矿 UNI+PAYA双挖入口
export const Deposite = async (adress) => {
  const WEB3 = await web3();
  // const charID = await getID();
  return await new WEB3.eth.Contract(MiningABI, adress);
};
export const expERC20 = async (address) => {
  const WEB3 = await web3();
  // console.log('window.WEB3###', window.WEB3);
  return await new WEB3.eth.Contract(ERC20ABI.abi, address);
};
// 获取四要素
export const TokenExpERC20 = async (address) => {
  const WEB3 = await web3();
  // console.log('window.WEB3###', window.WEB3);
  return await new WEB3.eth.Contract(token_abi, address);
};
export const TokenOrder = async (address) => {
  const WEB3 = await web3();
  return await new WEB3.eth.Contract(OrderABI, address);
};
export const HelmetMining = async (address) => {
  const WEB3 = await web3();
  return await new WEB3.eth.Contract(helmet_abi.abi, address);
};
export const IIO = async (address) => {
  const WEB3 = await web3();
  return await new WEB3.eth.Contract(iio_abi.abi, address);
};
export const NFT = async (address) => {
  const WEB3 = await web3();
  return await new WEB3.eth.Contract(nft_abi.abi, address);
};
export const NFTContract = async (address) => {
  const WEB3 = await web3();
  return await new WEB3.eth.Contract(default_nft_abi.abi, address);
};
export const NFTusers = async (address) => {
  const WEB3 = await web3();
  return await new WEB3.eth.Contract(nft_user_abi.abi, address);
};
export const PairContract = async (address) => {
  const WEB3 = await web3();
  return await new WEB3.eth.Contract(IPancakePair.abi, address);
};
export const SwapContract = async (address) => {
  const WEB3 = await web3();
  return await new WEB3.eth.Contract(IPancakeSwap, address);
};
