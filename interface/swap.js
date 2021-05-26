import { Token, Pair } from '@pancakeswap-libs/sdk-v2';
import BigNumber from 'bignumber.js';
import { PairContract, SwapContract } from '~/interface/index.js';
import { toWei, fromWei } from '~/assets/utils/web3-fun.js';
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
        let TokenArray = await PairContracts.methods
            .token0()
            .call()
            .then((res) => {
                return res;
            });
        let Reserves =
            TokenArray == '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
                ? true
                : false;
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
                            Reserves ? res.reserve1 : res.reserve0,
                            Reserves ? res.reserve0 : res.reserve1
                        )
                        .call()
                        .then((res1) => {
                            let amount = BigNumber(
                                (
                                    res1 / Math.pow(10, BNBTOKEN.decimals)
                                ).toString()
                            ).toFixed();
                            SwapHelmet(
                                amount,
                                {
                                    address:
                                        '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
                                    chainId: 56,
                                    decimals: 18,
                                    name: 'WBNB Token',
                                    symbol: 'WBNB',
                                },
                                {
                                    address:
                                        '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
                                    chainId: 56,
                                    decimals: 18,
                                    name: 'Helmet.insure',
                                    symbol: 'Helmet',
                                },
                                (result) => {
                                    callback({
                                        amount: result.amount,
                                        router: true,
                                    });
                                }
                            );
                        });
                } else {
                    callback(0);
                }
            });
    }
};
export const SwapBNBforTokens = async (
    { SwapNumber, MinReward, SwapRouter },
    callback
) => {
    let path = SwapRouter
        ? [
              activeData.address,
              '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
              '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
          ]
        : [
              '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
              '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
          ];
    let deadline = parseInt(Date.now() + 60 * 20);
    let swapExactETHForTokens = toWei(SwapNumber);
    let amountOutMin = toWei(MinReward);
    let to = window.CURRENTADDRESS;
    let RouterAdress = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
    const SwapContracts = await SwapContract(RouterAdress);
    SwapContracts.methods
        .swapExactETHForTokens(amountOutMin, path, to, deadline)
        .send({
            value: swapExactETHForTokens,
            from: to,
        })
        .on('transactionHash', function(hash) {
            bus.$emit('OPEN_STATUS_DIALOG', {
                title: 'Waiting For Confirmation',
                layout: 'layout2',
                loading: true,
                buttonText: 'Confirm',
                conTit: 'Please Confirm the transaction in your wallet',
                conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
            });
            callback({ status: 'swap_pendding' });
        })
        .on('receipt', function(receipt) {
            callback({ status: 'swap_success' });
        })
        .on('error', function(error) {
            callback({ status: 'swap_error' });
        });
};
export const SwapTokensforTokens = async (
    { SwapNumber, MinReward, SwapRouter },
    callback
) => {
    let path = SwapRouter
        ? [
              activeData.address,
              '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
              '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
          ]
        : [
              '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
              '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
          ];
    let deadline = parseInt(Date.now() + 60 * 20);
    let swapExactTokensForTokens = toWei(SwapNumber);
    let amountOutMin = toWei(MinReward);
    let to = window.CURRENTADDRESS;
    let RouterAdress = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
    const SwapContracts = await SwapContract(RouterAdress);
    SwapContracts.methods
        .swapExactTokensForTokens(
            swapExactTokensForTokens,
            amountOutMin,
            path,
            to,
            deadline
        )
        .send({
            from: to,
        })
        .on('transactionHash', function(hash) {
            callback({ status: 'swap_pendding' });
        })
        .on('receipt', function(receipt) {
            callback({ status: 'swap_success' });
        })
        .on('error', function(error) {
            callback({ status: 'swap_error' });
        });
};
