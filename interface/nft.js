import { nft } from './index';
import {
    getAddress,
    getContract,
    getWei,
    getID,
} from '~/assets/utils/address-pool.js';
import bus from '~/assets/js/bus';
import Message from '~/components/common/Message';
export const bet = async (ContractAdress, RewardAdress) => {
    const charID = window.chainID;
    const account = window.CURRENTADDRESS;
    if (ContractAdress.indexOf('0x') === -1) {
        ContractAdress = getContract(ContractAdress, charID);
    }
    if (RewardAdress.indexOf('0x') === -1) {
        RewardAdress = getContract(RewardAdress, charID);
    }
    const IIOContract = await IIO(ContractAdress);
    return IIOContract.methods
        .applied3(RewardAdress, account)
        .call()
        .then((res) => {
            return res;
        });
};
