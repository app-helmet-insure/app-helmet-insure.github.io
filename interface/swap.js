import { Token, Pair } from '@pancakeswap-libs/sdk-v2';
import BigNumber from 'bignumber.js';
import { PairContract, SwapContract } from '~/interface/index.js';
export const SwapHelmet = async (amount, token1, token2, callback) => {
    let TOKEN1 = new Token(
        token1.chainId,
        token1.address,
        token1.decimals,
        token1.name,
        token1.symbol
    );
    let TOKEN2 = new Token(
        token2.chainId,
        token2.address,
        token2.decimals,
        token2.name,
        token2.symbol
    );
    let BNBTOKEN = new Token(
        56,
        '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        18,
        'WBNB Token',
        'WBNB'
    );
    let HELMETTOKEN = new Token(
        56,
        '0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8',
        18,
        'Helmet.insure',
        'Helmet'
    );
    let RouterAdress = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
    try {
        const PairAdress = Pair.getAddress(TOKEN1, TOKEN2);
        const PairContracts = await PairContract(PairAdress);
        const SwapContracts = await SwapContract(RouterAdress);
        await PairContracts.methods
            .getReserves()
            .call()
            .then((res) => {
                if (res) {
                    SwapContracts.methods
                        .getAmountOut(
                            BigNumber(
                                (
                                    amount * Math.pow(10, token1.decimals)
                                ).toString()
                            ).toFixed(),
                            res.reserve1,
                            res.reserve0
                        )
                        .call()
                        .then((result) => {
                            callback({
                                amount: BigNumber(
                                    (
                                        result / Math.pow(10, token2.decimals)
                                    ).toString()
                                ).toFixed(),
                                router: false,
                            });
                        });
                } else {
                    callback(0);
                }
            });
    } catch (error) {
        const PairAdress = Pair.getAddress(TOKEN1, BNBTOKEN);
        const PairContracts = await PairContract(PairAdress);
        const SwapContracts = await SwapContract(RouterAdress);
        await PairContracts.methods
            .getReserves()
            .call()
            .then((res) => {
                if (res) {
                    SwapContracts.methods
                        .getAmountOut(
                            BigNumber(
                                (
                                    amount * Math.pow(10, token1.decimals)
                                ).toString()
                            ).toFixed(),
                            res.reserve0,
                            res.reserve1
                        )
                        .call()
                        .then((res1) => {
                            let amount = BigNumber(
                                (
                                    res1 / Math.pow(10, token2.decimals)
                                ).toString()
                            ).toFixed();
                            SwapHelmet(
                                amount,
                                {
                                    address:
                                        '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
                                    chainId: 56,
                                    decimals: 18,
                                    name: 'Helmet.insure',
                                    symbol: 'Helmet',
                                },
                                {
                                    address:
                                        '0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8',
                                    chainId: 56,
                                    decimals: 18,
                                    name: 'WBNB Token',
                                    symbol: 'WBNB',
                                },
                                (result) => {
                                    callback({ amount: result, router: true });
                                }
                            );
                        });
                } else {
                    callback(0);
                }
            });
    }
};
export const SwapToken = async (amount) => {
    let RouterAdress = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
    const PairContracts = await PairContract(RouterAdress);
    Pari
};
