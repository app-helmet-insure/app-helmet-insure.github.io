import { Token, Route, Pair, TokenAmount } from '@pancakeswap-libs/sdk-v2';
import { PairContract } from '~/interface/index.js';
import { getAddress, getWei_2 } from './address-pool';
import { web3 } from '~/assets/utils/web3-obj.js';
export const pancakeswapv2 = async (
    TokenAddress1,
    TokenName1,
    TokenDecimals1,
    TokenAddress2,
    TokenName2,
    TokenDecimals2
) => {
    const TOKEN1 = new Token(
        56,
        TokenAddress1,
        TokenDecimals1,
        TokenName1,
        TokenName1
    );
    const TOKEN2 = new Token(
        56,
        TokenAddress2,
        TokenDecimals2,
        TokenName2,
        TokenName2
    );
    try {
        // 获取交易对地址
        const address = Pair.getAddress(TOKEN1, TOKEN2);
        // 获取合约方法
        const Contracts = await PairContract(address);
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
        const route = new Route([pair], TOKEN1);
        let Price = route.midPrice.toSignificant(6);
        return Price;
    } catch (error) {
        return 0;
    }
};
