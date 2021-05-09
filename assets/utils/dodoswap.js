import Axios from 'axios';

export const dodoswap = (data) => {
    // fromTokenAddress  SellAdress
    // fromTokenDecimals  SellUnit
    // toTokenAddress  BuyAdress
    // toTokenDecimals  BuyUnit
    // fromAmount  1000000000000000000
    data.slippage = 0; //hua dian
    data.userAddr = '0x8Fa3f933DCf5E7ca57fdf22048286ea2d5Bd3d15'; //UserAdress
    data.chainId = 56; //id
    data.rpc = 'https://bsc-dataseed1.binance.org/'; //RPC
    data.source = 'dodo';
    return Axios({
        method: 'get',
        url: 'https://dodo-route.dodoex.io/dodoapi/getdodoroute/',
        params: data,
    }).then((res) => {
        let data = res.data;
        return data.resPricePerFromToken;
    });
};
