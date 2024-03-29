import { Token, Route, Pair, TokenAmount } from '@pancakeswap-libs/sdk';
import { PairContract } from '~/interface/index.js';
import { getAddress, getWei_2 } from './address-pool';
import { web3 } from '~/assets/utils/web3-obj.js';
export const pancakeswapv1 = async (
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
        const address = Pair.getAddress(TOKEN1, TOKEN2);
        const Contracts = await PairContract(address);
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
        console.log(error);
        return 0;
    }
};
