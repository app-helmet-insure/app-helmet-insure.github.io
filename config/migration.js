import ChainSwapABI from '~/web3/abis/ChainSwap.json';
import BurnSwapABI from '~/web3/abis/BurnSwap.json';
let ChainSwapConfig = function(FromChain, ToChain) {
    let ReturnName = FromChain.toUpperCase() + 'TO' + ToChain.toUpperCase();
    let Config = {
        BSCTOPOLYGON: {
            FromChainID: 56,
            FromToken: 'HELMET',
            FromChainName: 'BSC',
            ToChainID: 137,
            ToToken: 'GUARD',
            ToChainName: 'Polygon',
            BurnSwapContracts: {
                Address: '0x6Bab2711Ca22fE7395811022F92bB037cd4af7bc',
                ABI: BurnSwapABI,
                Method: 'swapAndSend',
                RPC: 'https://bsc-dataseed.binance.org',
            },
            ChainSwapContracts: {
                Address: '0x81d82a35253B982E755c4D7d6AADB6463305B188',
                ABI: ChainSwapABI,
                RPC: 'https://polygon-rpc.com',
            },
            FromAssets: {
                Name: 'HELMET',
                Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
                Decimals: 18,
            },
            ToAssets: {
                Name: 'GUARD',
                Address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
                Decimals: 18,
            },
        },
    };
    return Config[ReturnName];
};
export default ChainSwapConfig;
