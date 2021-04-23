import query_abi from '~/abi/query_abi.json';
import { getAddress, getWei_2 } from './address-pool';
export const BurgerSwapContract = async (address) => {
    return await new window.WEB3.eth.Contract(
        query_abi.abi,
        '0x1eCaeE6e4e01C45712ccd9262c3e9F623A6ac7ed'
    );
};
export const burgerswap = async (token1, token2, volume, unit) => {
    const charID = window.chainID;
    let TOKEN1 = getAddress(token1, charID);
    let TOKEN2 = getAddress(token2, charID);
    let VOLUME = volume * Math.pow(10, unit);
    let Contract = await BurgerSwapContract();
    return Contract.methods
        .getLpValueByFactory(
            '0x1eCaeE6e4e01C45712ccd9262c3e9F623A6ac7ed',
            '0xCa7597633927A98B800738eD5CD2933a74a80e8c',
            '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
            '1000000000000000000'
        )
        .call()
        .then((res) => {
            let result = Number(res[0]) / Math.pow(10, res[1]);
            return result;
        });
};
