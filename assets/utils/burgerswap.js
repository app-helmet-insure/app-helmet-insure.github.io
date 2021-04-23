import query_abi from '~/abi/query_abi.json';
import { getAddress, getWei_2 } from './address-pool';
import Message from '~/components/common/Message';
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
            TOKEN1,
            TOKEN2,
            VOLUME
        )
        .call()
        .then((res) => {
            let result = Number(res[0]) / Math.pow(10, res[1]);
            return result;
        });
};
