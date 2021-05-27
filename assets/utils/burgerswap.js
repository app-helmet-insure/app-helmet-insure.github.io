import query_abi from '~/abi/query_abi.json';
import IPancakePair from '~/abi/IPancakePair.json';
import { getAddress, getWei_2 } from './address-pool';
import Message from '~/components/common/Message';
import { web3 } from '~/assets/utils/web3-obj.js';
export const BurgerSwapContract = async (address) => {
    const WEB3 = await web3();
    return await new WEB3.eth.Contract(
        query_abi.abi,
        '0x1eCaeE6e4e01C45712ccd9262c3e9F623A6ac7ed'
    );
};
export const burgerswaplpt = async (token1, token2, unit) => {
    const charID = window.chainID || 56;
    let TOKEN1 = getAddress(token1, charID);
    let TOKEN2 = getAddress(token2, charID);
    let Contract = await BurgerSwapContract();
    return Contract.methods
        .getLpValueByFactory(
            '0x1eCaeE6e4e01C45712ccd9262c3e9F623A6ac7ed',
            TOKEN1,
            TOKEN2,
            '1000000000000000000'
        )
        .call()
        .then((res) => {
            let result = Number(res[0]) / Math.pow(10, res[1]);
            return result;
        });
};

export const burgerswaptoken = async (address) => {
    const WEB3 = await web3();
    const Contracts = await new WEB3.eth.Contract(IPancakePair.abi, address);
    // 获取getReserves
    return Contracts.methods
        .getReserves()
        .call()
        .then((res) => {
            let num1 = res.reserve0;
            let num2 = res.reserve1;
            return num2 / num1;
        });
};
