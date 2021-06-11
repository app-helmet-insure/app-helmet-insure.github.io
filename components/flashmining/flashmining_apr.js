import { pancakeswapv1 } from '~/assets/utils/pancakeswapv1.js';
import { pancakeswapv2 } from '~/assets/utils/pancakeswapv2.js';
import { burgerswaplpt } from '~/assets/utils/burgerswap.js';
import { fixD } from '~/assets/js/util.js';
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
    if (MING_TIME == 'Finished') {
        return '--';
    }
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
    if (SWAP_TYPE == 'PANCAKEV2') {
        TOEKNHELMET = await pancakeswapv2(
            REWARD_ADDRESS,
            REWARD_NAME,
            REWARD_DECIMALS,
            HELMET_ADDRESS,
            HELMET_NAME,
            HELLMET_DECIMALS
        );
    }
    let POOL_STAKE_VOLUME = await TotalSupply(POOL_ADDRESS, REWARD_DECIMALS); //pool totalsupply
    let TOTAL_LPT_VOLUME = await TotalSupply(STAKE_ADDRESS, STAKE_DECIMALS); // lpt totalsupply
    let HELMETVALUE = await BalanceOf(
        HELMET_ADDRESS,
        HELLMET_DECIMALS,
        STAKE_ADDRESS
    );
    let NUMBERATOR = TOEKNHELMET * (TOTAL_REWARDS / MINING_DAY) * 365; // Numerator
    let DENOMINATOR =
        ((HELMETVALUE * 2) / TOTAL_LPT_VOLUME) * POOL_STAKE_VOLUME; // Denominator
    let APR = fixD((NUMBERATOR / DENOMINATOR) * 100, 2);
    console.log(HELMETVALUE, TOTAL_LPT_VOLUME, POOL_STAKE_VOLUME);
    if (OPEN_TIME == 'Mining') {
        return APR + '%';
    }
    if (OPEN_TIME != 'Mining') {
        return 'Infinity';
    }
};
