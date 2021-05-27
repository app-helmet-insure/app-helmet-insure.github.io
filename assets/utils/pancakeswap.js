import {
    Token,
    Fetcher,
    Route,
    Pair,
    TokenAmount,
    sortsBefore,
} from '@pancakeswap-libs/sdk-v2';
import { getAddress, getWei_2 } from './address-pool';
import { getNetwork } from '@ethersproject/networks';
import { getDefaultProvider } from '@ethersproject/providers';
import IPancakePair from '~/abi/IPancakePair.json';
import { web3 } from '~/assets/utils/web3-obj.js';
export const pancakeswap = async (token1, token2) => {
    const charID = window.chainID || 56;

    const address1 = getAddress(token1, charID);
    const address2 = getAddress(token2, charID);
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
    const WEB3 = await web3();
    try {
        // 获取交易对地址
        const address = Pair.getAddress(TOKEN1, TOKEN2);
        // 获取Provider
        let provider = getDefaultProvider(getNetwork('56'));
        // 获取合约方法
        const Contracts = await new WEB3.eth.Contract(
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
