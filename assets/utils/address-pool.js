// import {web3} from './web3-obj.js';
import addressList from '~/abi/config.js';
import {
    Token,
    Fetcher,
    Route,
    Pair,
    TokenAmount,
    sortsBefore,
} from '@pancakeswap-libs/sdk';
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
        default:
            // return 'Ropsten';
            return 'Rinkeby';
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
            return 'Kwei'; //4
        case 'HTPT':
            return 'Kwei'; //4
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
export const uniswap = async (token1, token2) => {
    const address1 = getAddress(token1, window.chainID);
    const address2 = getAddress(token2, window.chainID);
    const TOKEN1 = new Token(
        window.chainID,
        address1,
        getWei_2(token1),
        token1,
        token1
    );
    const TOKEN2 = new Token(
        window.chainID,
        address2,
        getWei_2(token2),
        token2,
        token2
    );
    try {
        // 获取交易对地址
        const address = Pair.getAddress(TOKEN1, TOKEN2);
        // 获取Provider
        let provider = getDefaultProvider(getNetwork('56'));
        // 获取合约方法
        const Contracts = await new window.WEB3.eth.Contract(
            IPancakePair.abi,
            address,
            provider
        );
        // 获取getReserves
        let result = await Contracts.methods
            .getReserves()
            .call()
            .then((res) => {
                return res;
            });
        const balances = TOKEN1.sortsBefore(TOKEN2)
            ? [result.reserve0, result.reserve1]
            : [result.reserve1, result.reserve0];
        let pair = new Pair(
            new TokenAmount(TOKEN1, balances[0]),
            new TokenAmount(TOKEN2, balances[1])
        );
        // let path = new Token(
        //   "56",
        //   "0x4E76DfeA6Fb3726e9A77628AAa23839E3298BC37",
        //   18,
        //   "HELMET",
        //   "HELMET"
        // );
        const route = new Route([pair], TOKEN1);
        let Price = route.midPrice.toSignificant(6);
        return Price;
    } catch (error) {
        console.log(error);
        return 0;
    }
};
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
        default:
            return '--';
    }
};
