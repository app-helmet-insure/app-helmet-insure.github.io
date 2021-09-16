import { web3 } from "~/assets/utils/web3-obj.js";
import Web3 from "web3";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import payaso_abi from "~/web3/abis/payaso_abi.json";
import FactoryABI from "~/web3/abis/FactoryABI.json";
import OrderABI from "~/web3/abis/OrderABI.json";
import MiningABI from "~/web3/abis/MiningABI.json";
import token_abi from "~/web3/abis/token_abi.json";
import helmet_abi from "~/web3/abis/helmet_abi.json";
import iio_abi from "~/web3/abis/iio_abi.json";
import nft_abi from "~/web3/abis/nft_abi.json";
import default_nft_abi from "~/web3/abis/default_nft_abi.json";
import nft_user_abi from "~/web3/abis/nft_user_abi.json";
import IPancakePair from "~/web3/abis/IPancakePair.json";
import IPancakeSwap from "~/web3/abis/IPancakeSwap.json";
import { getAddress, getContract, getID } from "~/assets/utils/address-pool.js";




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
