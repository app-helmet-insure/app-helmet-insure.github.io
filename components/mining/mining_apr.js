import { pancakeswapv1 } from '~/assets/utils/pancakeswapv1.js';
import { pancakeswapv2 } from '~/assets/utils/pancakeswapv2.js';
import { pancakeswap } from '~/assets/utils/pancakeswap.js';
import { burgerswaplpt } from '~/assets/utils/burgerswap.js';
import { fixD } from '~/assets/js/util.js';
import {
    Contract,
    getAccounts,
    getDecimals,
    toWei,
    fromWei,
} from '~/interface/common_contract.js';
import {
    TotalSupply,
    BalanceOf,
    TotalAllocPoint,
    CakePerBlock,
    MdexPerBlock,
    PoolInfo,
    PoolAllowance,
    Rewards,
    RewardsDuration,
} from '~/interface/read_contract.js';
import BigNumber from 'bignumber.js';
export const GetPoolAPR = async (poolData) => {
    let { MING_TIME, OPEN_TIME } = poolData;
    let APR = await getAPRMethods(poolData);
    if (MING_TIME == 'Finished') {
        return '--';
    }
    if (OPEN_TIME == 'Mining') {
        return fixD(APR, 2) + '%';
    }
    if (OPEN_TIME != 'Mining') {
        return 'Infinity';
    }
};
const getAPRMethods = async (poolData) => {
    let { APRTYPE } = poolData;
    switch (APRTYPE) {
        case 'CakeDoublePoolAPR':
            return await CakeDoublePoolAPR(poolData);
        case 'MdexDoublePoolAPR':
            return await MdexDoublePoolAPR(poolData);
        case 'CompoundPoolAPY':
            return await CompoundPoolAPY(poolData);
        case 'hTokenDoublePoolAPR':
            return await hTokenDoublePoolAPR(poolData);
        default:
            return '--';
    }
};
const CakeDoublePoolAPR = async ({
    POOL_PID,
    PROXY_ADDRESS,
    POOL_ADDRESS,
    STAKE_ADDRESS,
    STAKE_DECIMALS,
    REWARD1_DECIMALS,
    REWARD1_ADDRESS,
    REWARD1_SYMBOL,
    REWARD2_DECIMALS,
    REWARD2_ADDRESS,
    REWARD2_SYMBOL,
    TOKEN1_SYMBOL,
    TOKEN1_ADDRESS,
    TOKEN1_DECIMALS,
}) => {
    // stake balance of pool
    let HELMET_FARM = '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699';
    let STAKE_VOLUME = await TotalSupply(POOL_ADDRESS, 18);
    let TOTAL_VOLUME = await TotalSupply(STAKE_ADDRESS, 18);
    // total alloc of pool
    let POOL_TOTAL_ALLOC_POINT = await TotalAllocPoint(PROXY_ADDRESS);
    // cake per block
    let CAKE_PER_BLOCK = await CakePerBlock(PROXY_ADDRESS);
    // alloc of pool
    let POOL_ALLOC_POINT = await PoolInfo(PROXY_ADDRESS, POOL_PID);
    POOL_ALLOC_POINT = fromWei(POOL_ALLOC_POINT.allocPoint);
    // reward 1 decimals
    let DecimalsUnit1 = getDecimals(REWARD1_DECIMALS);
    // reward 2 decimals
    let DecimalsUnit2 = getDecimals(REWARD2_DECIMALS);
    // dayily reward
    let DAYILY_REWARD2 =
        (POOL_ALLOC_POINT / POOL_TOTAL_ALLOC_POINT) * (CAKE_PER_BLOCK * 28800) +
        '';
    let TOTAL_REWARD1 = await PoolAllowance(
        REWARD1_ADDRESS,
        HELMET_FARM,
        POOL_ADDRESS,
        REWARD1_DECIMALS
    );
    let SPEED_REWARD1 = await Rewards(POOL_ADDRESS, '0');
    let TIME_REWARD1 = await RewardsDuration(POOL_ADDRESS);
    let DAYILY_REWARD1 =
        (TOTAL_REWARD1 - SPEED_REWARD1) / (TIME_REWARD1 / 86400);
    // reward1 value to bnb
    let REWARD1_BNB_VALUE = await GetTokenForBNBValue(
        REWARD1_ADDRESS,
        REWARD1_SYMBOL,
        REWARD1_DECIMALS
    );
    // reward2 value to bnb
    let REWARD2_BNB_VALUE = await GetTokenForBNBValue(
        REWARD2_ADDRESS,
        REWARD2_SYMBOL,
        REWARD2_DECIMALS
    );
    // stake valume
    let VOLUME_OF_STAKE =
        (await BalanceOf(TOKEN1_ADDRESS, STAKE_DECIMALS, STAKE_ADDRESS)) * 2;
    // stake value
    let STAKE_BNB_VALUE = await GetTokenForBNBValue(
        TOKEN1_ADDRESS,
        TOKEN1_SYMBOL,
        TOKEN1_DECIMALS
    );
    let NUMBERATOR_REWARD1 = 365 * REWARD1_BNB_VALUE * DAYILY_REWARD1;
    let NUMBERATOR_REWARD2 = 365 * REWARD2_BNB_VALUE * DAYILY_REWARD2;
    let DENOMINATOR = VOLUME_OF_STAKE * STAKE_BNB_VALUE;
    let APR_REWARD1 = NUMBERATOR_REWARD1 / DENOMINATOR;
    let APR_REWARD2 = NUMBERATOR_REWARD2 / DENOMINATOR;
    let APR = (APR_REWARD1 + APR_REWARD2) * 100;
    return APR;
};
const MdexDoublePoolAPR = async ({
    POOL_PID,
    PROXY_ADDRESS,
    POOL_ADDRESS,
    STAKE_ADDRESS,
    STAKE_DECIMALS,
    REWARD1_DECIMALS,
    REWARD1_ADDRESS,
    REWARD1_SYMBOL,
    REWARD2_DECIMALS,
    REWARD2_ADDRESS,
    REWARD2_SYMBOL,
    TOKEN1_SYMBOL,
    TOKEN1_ADDRESS,
    TOKEN1_DECIMALS,
}) => {
    // stake balance of pool
    let HELMET_FARM = '0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699';
    let STAKE_VOLUME = await TotalSupply(POOL_ADDRESS, 18);
    let TOTAL_VOLUME = await TotalSupply(STAKE_ADDRESS, 18);
    // total alloc of pool
    let POOL_TOTAL_ALLOC_POINT = await TotalAllocPoint(PROXY_ADDRESS);
    // cake per block
    let MDEX_PER_BLOCK = await MdexPerBlock(PROXY_ADDRESS);
    // alloc of pool
    let POOL_ALLOC_POINT = await PoolInfo(PROXY_ADDRESS, POOL_PID);
    POOL_ALLOC_POINT = fromWei(POOL_ALLOC_POINT.allocPoint);
    // reward 2 decimals
    let DecimalsUnit2 = getDecimals(REWARD2_DECIMALS);
    // dayily reward
    let DAYILY_REWARD2 =
        (POOL_ALLOC_POINT / POOL_TOTAL_ALLOC_POINT) * (MDEX_PER_BLOCK * 14400) +
        '';
    // reward2 value to bnb
    let REWARD2_BNB_VALUE = await GetTokenForBNBValue(
        REWARD2_ADDRESS,
        REWARD2_SYMBOL,
        REWARD2_DECIMALS
    );
    // stake valume
    let VOLUME_OF_STAKE =
        (await BalanceOf(TOKEN1_ADDRESS, STAKE_DECIMALS, STAKE_ADDRESS)) * 2;
    // stake value
    let STAKE_BNB_VALUE = await GetTokenForBNBValue(
        TOKEN1_ADDRESS,
        TOKEN1_SYMBOL,
        TOKEN1_DECIMALS
    );
    let NUMBERATOR_REWARD2 = 365 * REWARD2_BNB_VALUE * DAYILY_REWARD2;
    let DENOMINATOR = VOLUME_OF_STAKE * STAKE_BNB_VALUE;
    let APR_REWARD2 = NUMBERATOR_REWARD2 / DENOMINATOR;
    let APR = APR_REWARD2 * 100;
    return APR;
};
const TokenDoublePoolAPR = async ({}) => {};
const hTokenDoublePoolAPR = async ({
    POOL_ADDRESS,
    STAKE_ADDRESS,
    REWARD1_ADDRESS,
    REWARD1_SYMBOL,
    REWARD1_DECIMALS,
    REWARD2_ADDRESS,
    REWARD2_SYMBOL,
    REWARD2_DECIMALS,
    REWARD1_VOLUME,
    REWARD2_VOLUME,
}) => {
    let HELMET_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'; //helmet adress
    let HELMET_NAME = 'HELMET';
    let HELLMET_DECIMALS = 18;
    let REWARD2_HELMET_VALUE = await GetTokenForHELMETValue(
        REWARD2_ADDRESS,
        REWARD2_SYMBOL,
        REWARD2_DECIMALS
    );
    let STAKE_VOLUME = await TotalSupply(POOL_ADDRESS, 18);
    let TOTAL_VOLUME = await TotalSupply(STAKE_ADDRESS, 18);
    let STAKE_VALUE = await BalanceOf(
        HELMET_ADDRESS,
        HELLMET_DECIMALS,
        STAKE_ADDRESS
    );
    let REWARD1_NUMBERATOR = (REWARD1_VOLUME / 14) * 365;
    let REWARD2_NUMBERATOR =
        ((REWARD2_VOLUME * REWARD2_HELMET_VALUE) / 14) * 365;
    let DENOMINATOR = ((STAKE_VALUE * 2) / STAKE_VOLUME) * TOTAL_VOLUME;
    let REWARD1_APR = REWARD1_NUMBERATOR / DENOMINATOR;
    let REWARD2_APR = REWARD2_NUMBERATOR / DENOMINATOR;
    let APR = (REWARD1_APR + REWARD2_APR) * 100;
    return APR;
};
const CompoundPoolAPY = async ({ POOL_ADDRESS }) => {
    // all staking of pool
    let STAKE_VOLUME = await TotalSupply(POOL_ADDRESS, 18);
    let REWARD_VALUE = 1 + 33057.57 / STAKE_VOLUME;
    let APR = Math.pow(REWARD_VALUE, 365) * 100;
    return APR;
};
const GetTokenForBNBValue = async (
    REWARD1_ADDRESS,
    REWARD1_SYMBOL,
    REWARD1_DECIMALS
) => {
    let REWARD2_ADDRESS = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';
    let REWARD2_SYMBOL = 'WBNB';
    let REWARD2_DECIMALS = 18;
    let TokenForBNB = await pancakeswapv2(
        REWARD1_ADDRESS,
        REWARD1_SYMBOL,
        REWARD1_DECIMALS,
        REWARD2_ADDRESS,
        REWARD2_SYMBOL,
        REWARD2_DECIMALS
    );
    return TokenForBNB;
};
const GetTokenForHELMETValue = async (
    REWARD1_ADDRESS,
    REWARD1_SYMBOL,
    REWARD1_DECIMALS
) => {
    let REWARD2_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8';
    let REWARD2_SYMBOL = 'HELMET';
    let REWARD2_DECIMALS = 18;
    let TokenForBNB = await pancakeswapv2(
        REWARD1_ADDRESS,
        REWARD1_SYMBOL,
        REWARD1_DECIMALS,
        REWARD2_ADDRESS,
        REWARD2_SYMBOL,
        REWARD2_DECIMALS
    );
    return TokenForBNB;
};
