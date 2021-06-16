import { web3 } from '~/assets/utils/web3-obj.js';
export const Contract = async (ABI, ContractAdress) => {
    let WEB3 = await web3();
    return await new WEB3.eth.Contract(ABI, ContractAdress);
};

export const getAccounts = async () => {
    const WEB3 = await new web3();
    let account = await WEB3.eth.getAccounts();
    return (account = account[0]);
};
export const getBlockNumber = async () => {
    const WEB3 = await new web3();
    let blockNumber = await WEB3.eth.getBlockNumber();
    console.log(blockNumber);
    return blockNumber;
};
export const getDecimals = (Decimals) => {
    switch (Decimals) {
        case 0:
            return 'noether';
        case 1:
            return 'wei';
        case 3:
            return 'kwei';
        case 6:
            return 'mwei';
        case 9:
            return 'gwei';
        case 12:
            return 'microether';
        case 15:
            return 'milliether';
        case 18:
            return 'ether';
        case 21:
            return 'kether';
        case 24:
            return 'mether';
        case 27:
            return 'gether';
        case 30:
            return 'tether';
        default:
            return '';
    }
};
export const toWei = (bigNumber, DecimalsUnit) => {
    try {
        return window.WEB3.utils.toWei(bigNumber, DecimalsUnit);
    } catch (e) {
        console.log('fromWei###Error###', e);
    }
};
export const fromWei = (bigNumber, DecimalsUnit) => {
    try {
        return window.WEB3.utils.fromWei(bigNumber, DecimalsUnit);
    } catch (e) {
        console.log('fromWei###Error###', e);
    }
};
