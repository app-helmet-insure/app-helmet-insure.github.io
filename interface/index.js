import { web3 } from '~/assets/utils/web3-obj.js';
import ERC20_abi from '~/abi/ERC20_abi.json';
import payaso_abi from '~/abi/payaso_abi.json';
import factory_abi from '~/abi/factory_abi.json';
import order_abi from '~/abi/order_abi.json';
import deposite_abi from '~/abi/deposite_abi.json';
import token_abi from '~/abi/token_abi.json';
import helmet_abi from '~/abi/helmet_abi.json';
import iio_abi from '~/abi/iio_abi.json';
import nft_abi from '~/abi/nft_abi.json';
import default_nft_abi from '~/abi/default_nft_abi.json';
import nft_user_abi from '~/abi/nft_user_abi.json';
import IPancakePair from '~/abi/IPancakePair.json';
import IPancakeSwap from '~/abi/IPancakeSwap.json';
import { getAddress, getContract, getID } from '~/assets/utils/address-pool.js';

export const getCurrentAccount = async () => {
    return web3().then((res) => res.currentProvider.selectedAddress);
};

// 买家凭证，用于行权
export const Long = async () => {
    const WEB3 = await web3();
    const charID = await getID();
    return await new WEB3.eth.Contract(
        ERC20_abi.abi,
        getAddress('LONG', charID)
    );
};

export const Payaso = async () => {
    const WEB3 = await web3();
    const charID = await getID();
    return await new WEB3.eth.Contract(
        payaso_abi.abi,
        getContract('PLAN', charID)
    );
};

// 期权工厂合约, 用于创建期权实例合约，铸造期权通证，销毁期权通证，并实现了行权和结算入口。
export const Factory = async (adress) => {
    const WEB3 = await web3();
    return await new WEB3.eth.Contract(
        factory_abi.abi,
        getContract('FACTORY', window.chainID)
    );
};

// 期权市场，卖家挂单，买家吃单，并实现了买家行权和弃权入口。
export const Order = async () => {
    const WEB3 = await web3();
    return await new WEB3.eth.Contract(
        order_abi.abi,
        getContract('ORDER', window.chainID)
    );
};
// 质押挖矿 UNI+PAYA双挖入口
export const Deposite = async (adress) => {
    const WEB3 = await web3();
    // const charID = await getID();
    return await new WEB3.eth.Contract(deposite_abi.abi, adress);
};
export const expERC20 = async (address) => {
    const WEB3 = await web3();
    // console.log('window.WEB3###', window.WEB3);
    return await new WEB3.eth.Contract(ERC20_abi.abi, address);
};
// 获取四要素
export const TokenExpERC20 = async (address) => {
    const WEB3 = await web3();
    // console.log('window.WEB3###', window.WEB3);
    return await new WEB3.eth.Contract(token_abi, address);
};
export const TokenOrder = async (address) => {
    const WEB3 = await web3();
    return await new WEB3.eth.Contract(order_abi.abi, address);
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
