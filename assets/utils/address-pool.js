// import {web3} from './web3-obj.js';
import addressList from '~/abi/config.js';
import WalletConnectProvider from '@walletconnect/web3-provider';
import precision from '~/assets/js/precision.js';
import { Contract } from '@ethersproject/contracts';
import { getNetwork } from '@ethersproject/networks';
import { getDefaultProvider } from '@ethersproject/providers';
import IPancakePair from '~/abi/IPancakePair.json';
import ERC20 from '~/abi/ERC20_abi.json';

const selectNetwork = (charID) => {
    switch (charID) {
        case 1:
            return 'Main';
        case 3:
            return 'Ropsten';
        case 56:
            return 'BSC';
        case 137:
            return 'MAGIC';
        default:
            // return 'Ropsten';
            return 'BSC';
    }
};

// 获取地址
export const getAddress = (symbol, char_id) => {
    const charID = char_id || window.chainID;
    const network = selectNetwork(charID);
    let address = addressList[`${network}_${symbol}`];

    if (address) {
        return address.toLowerCase();
    } else {
        return null;
    }
};
// 获取合约
export const getContract = (name, charID = 56) => {
    const network = selectNetwork(charID);
    let contract = addressList[`${network}_CONTRACT_${name}`];
    if (contract) {
        return contract.toLowerCase();
    } else {
        return null;
    }
};
export const getSymbol = (address, char_id) => {
    const charID = char_id || window.chainID;
    let symbol_list = [
        'WBNB',
        'HELMET',
        'CAKE',
        'FORTUBE',
        'BTCB',
        'HCCT',
        'ETH',
        'CTK',
        'BURNHCTK_LPT',
    ];
    const symbol = symbol_list.filter((item) => {
        return (
            getAddress(item, charID) === address.toLowerCase() ||
            getContract(item, charID) === address.toLowerCase()
        );
    });
    if (symbol) {
        return symbol;
    } else {
        return ['NULL'];
    }
};

// 为什么多写了个返回值不一样的函数，后面确定逻辑后优化下
export const newGetSymbol = (adress) => {
    const charID = window.chainID;
    let symbol_list = [
        'WBNB',
        'HELMET',
        'CAKE',
        'FORTUBE',
        'BTCB',
        'HCCT',
        'ETH',
        'CTK',
        'BURGER',
    ];
    const symbol = symbol_list.filter((item) => {
        return getAddress(item, charID) === adress.toLowerCase();
    });
    if (symbol) {
        return symbol[0];
    } else {
        return null;
        // return console.log(adress + '没有找到对应的Symbol')
    }
};

export const getWei = (token) => {
    let reg = /^0x[\S]+/;
    if (reg.test(token)) {
        // 0x adress
        token = getSymbol(token)[0];
    }
    switch (token) {
        case 'BURNHCTK_LPT':
            return 'lovelace'; // 6
        case 'BURNHCTK':
            return 'lovelace'; // 6
        case 'HCTK':
            return 'lovelace'; // 6
        case 'BNB_CTK_LPT':
            return 'lovelace'; // 6
        case 'BNB_CTK':
            return 'lovelace'; // 6
        case 'CTK':
            return 'lovelace'; // 6
        case 'TPT':
            return 4; //4
        case 'HTPT':
            return 4; //4
        case 'SHIBH':
            return 'microether';
        case 'SHIBh':
            return 'microether';
        case 'SHIB':
            return 'ether';
        case 30:
            return 'tether';
        default:
            return 'ether'; // 18
    }
};
export const getWeiWithFix = (fix) => {
    switch (fix) {
        case 30:
            return 'tether'; // 30
        default:
            return 'ether'; // 18
    }
};

export const getStrikePriceFix = (und, col) => {
    // 币种，抵押物, 结算物
    let colFix = getWei_2(col);
    let undFix = getWei_2(und);
    if (colFix === undFix) {
        return 18;
    } else {
        return 18 + colFix - undFix;
    }
};

// 处理行权价格
export const dealWithStrikePrice = (px, coin) => {
    let coinFix = getWei_2(coin);
    if (coinFix !== 18) {
        return precision.divide(px, Math.pow(10, 30 - coinFix));
    } else {
        return px;
    }
};

// getWei和getWei_2不知何为， 后面更换注释
export const getWei_2 = (token) => {
    let reg = /^0x[\S]+/;
    if (reg.test(token)) {
        // 0x adress
        token = getSymbol(token)[0];
    }
    switch (token) {
        case 'HCTK':
            return 6; // 6
        case 'CTK':
            return 6; // 6
        case 'USDC':
            return 6; // 6
        case 'TPT':
            return 4; //4
        case 'HTPT':
            return 4; //4
        default:
            return 18; // 18
    }
};

// 获取id
export const getID = async () => {
    // const WEB3 = await web3();
    if (typeof window.ethereum !== 'undefined') {
        const chainId = await window.WEB3.eth.net.getId();
        return chainId;
    } else {
        const walletConnectProvider = new WalletConnectProvider({
            chainId: 56,
            bridge: 'wss://bridge.walletconnect.org/',
            rpc: {
                56: 'https://bsc-dataseed1.binance.org/',
            },
            qrcode: true,
            pollingInterval: 10000,
        });
        if (walletConnectProvider.networkId) {
            return walletConnectProvider.networkId;
        } else {
            return 1;
        }
    }
};

// UniSwap SDK

export const getTokenName = (address) => {
    let tokenAddress = address.toLowerCase();
    if (!tokenAddress) {
        return;
    }
    switch (tokenAddress) {
        case '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c':
            return 'WBNB';
        case '0xb8c540d00dd0bf76ea12e4b4b95efc90804f924e':
            return 'QUSD';
        case '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82':
            return 'CAKE';
        case '0x658a109c5900bc6d2357c87549b651670e5b0539':
            return 'FORTUBE';
        case '0xe9e7cea3dedca5984780bafc599bd69add087d56':
            return 'BUSD';
        case '0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8':
            return 'HELMET';
        case '0xa8c2b8eec3d368c0253ad3dae65a5f2bbb89c929':
            return 'CTK';
        case '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c':
            return 'BTCB';
        case '0x2170ed0880ac9a755fd29b2688956bd959f933f8':
            return 'ETH';
        case '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82':
            return 'HTTC';
        case '0x936909e72951a19a5e1d75a109b0d34f06f39838':
            return 'hCTK';
        case '0xae9269f27437f0fcbc232d39ec814844a51d6b8f':
            return 'BURGER';
        case '0x9ebbb98f2bc5d5d8e49579995c5efac487303bea':
            return 'HBURGER';
        case '0xa184088a740c695e156f91f5cc086a06bb78b827':
            return 'AUTO';
        case '0xf218184af829cf2b0019f8e6f0b2423498a36983':
            return 'MATH';
        case '0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2':
            return 'DODO';
        case '0xeca41281c24451168a37211f0bc2b8645af45092':
            return 'TPT';
        case '0x9c65ab58d8d978db963e63f2bfb7121627e3a739':
            return 'MDX';
        case '0x219cf9729bb21bbe8dd2101c8b6ec21c03dd0f31':
            return 'FEI';
        case '0x07aaa29e63ffeb2ebf59b33ee61437e1a91a3bb2':
            return 'QSD';
        case '0x3b73c1b2ea59835cbfcadade5462b6ab630d9890':
            return 'TOKEN';
        case '0xafe24e29da7e9b3e8a25c9478376b6ad6ad788dd':
            return 'xBURGER';
        case '0xd714d91a169127e11d8fab3665d72e8b7ef9dbe2':
            return 'BLACK';
        case '0x910651f81a605a6ef35d05527d24a72fecef8bf0':
            return 'WAR';
        case '0xaf90e457f4359adcc8b37e8df8a27a1ff4c3f561':
            return 'SHIB';
        case '0xbc194e6f748a222754c3e8b9946922c09e7d4e91':
            return 'LEV';
        case '0x7e396bfc8a2f84748701167c2d622f041a1d7a17':
            return 'WMASS';
        case '0x464863745ed3af8b9f8871f1082211c55f8f884d':
            return 'CTT';
        case '0x422e3af98bc1de5a1838be31a56f75db4ad43730':
            return 'COW';
        case '0x5f730952d4368324a45627d6f823a1ec96415442':
            return 'PAUL';
        case '0x0487b824c8261462f88940f97053e65bdb498446':
            return 'WINGS';
        case '0x7859b01bbf675d67da8cd128a50d155cd881b576':
            return 'XMS';
        case '0xbd2949f67dcdc549c6ebe98696449fa79d988a9f':
            return 'MTRG';
        case '0x53e562b9b7e5e94b81f10e96ee70ad06df3d2657':
            return 'BABY';
        case '0x4131b87f74415190425ccd873048c708f8005823':
            return 'BMXX';
        default:
            return '--';
    }
};
