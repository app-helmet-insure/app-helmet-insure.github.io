import { pancakeswapv1 } from '~/assets/utils/pancakeswapv1.js';
import { pancakeswap } from '~/assets/utils/pancakeswap.js';
import { burgerswaplpt } from '~/assets/utils/burgerswap.js';
import { TotalSupply, BalanceOf } from '~/interface/read_contract.js';
export const GetPoolAPR = async ({
    OPEN_TIME,
    MING_TIME,
    SWAP_TYPE,
    MINING_DAY,
    TOTAL_REWARDS,
    POOL_ADDRESS,
    STAKE_ADDRESS,
    STAKE_DECIMALS,
    REWARD_ADDRESS,
    REWARD_NAME,
    REWARD_DECIMALS,
}) => {
    let TOEKNHELMET;
    let HELMET_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'; //helmet adress
    let HELMET_NAME = 'HELMET';
    let HELLMET_DECIMALS = 18;
    if (SWAP_TYPE == 'BURGER') {
        TOEKNHELMET = await burgerswaplpt(REWARD_ADDRESS, HELMET_ADDRESS);
    }
    if (SWAP_TYPE == 'PANCAKEV1') {
        TOEKNHELMET = await pancakeswapv1(
            REWARD_ADDRESS,
            REWARD_NAME,
            REWARD_DECIMALS,
            HELMET_ADDRESS,
            HELMET_NAME,
            HELLMET_DECIMALS
        );
    }
    let POOLVOLUME = await TotalSupply(POOL_ADDRESS, REWARD_DECIMALS); //pool totalsupply
    let STAKEVOLUME = await TotalSupply(STAKE_ADDRESS, STAKE_DECIMALS); // lpt totalsupply
    let HELMETVALUE = await BalanceOf(
        STAKE_ADDRESS,
        HELLMET_DECIMALS,
        HELMET_ADDRESS
    );
    let NUMBERATOR = TOEKNHELMET * (TOTAL_REWARDS / MINING_DAY) * 365; // Numerator
    let DENOMINATOR = ((HELMETVALUE * 2) / STAKEVOLUME) * POOLVOLUME; // Denominator
    let APR = (NUMBERATOR / DENOMINATOR) * 100;
    if (MING_TIME == 'Finished') {
        return '--';
    }
    if (OPEN_TIME == 'Mining') {
        return APR + '%';
    }
    if (OPEN_TIME != 'Mining') {
        return 'Infinity';
    }
};
