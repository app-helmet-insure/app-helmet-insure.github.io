import { pancakeswapv1 } from '~/assets/utils/pancakeswapv1.js';
import { pancakeswapv2 } from '~/assets/utils/pancakeswapv2.js';
import { pancakeswap } from '~/assets/utils/pancakeswap.js';
import { burgerswaplpt } from '~/assets/utils/burgerswap.js';
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
    PoolInfo,
    PoolAllowance,
    Rewards,
    RewardsDuration,
} from '~/interface/read_contract.js';
export const GetPoolAPR = async (poolData) => {
    TokenDoublePoolAPR(poolData);
};

const TokenDoublePoolAPR = async ({
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
    let POOL_STAKE_VOLUME = await TotalSupply(POOL_ADDRESS, STAKE_DECIMALS);

    let TOTAL_LPT_VOLUME = await TotalSupply(STAKE_ADDRESS, STAKE_DECIMALS);
    // total alloc of pool
    let POOL_TOTAL_ALLOC_POINT = await TotalAllocPoint(PROXY_ADDRESS);
    // cake per block
    let CAKE_PER_BLOCK = await CakePerBlock(PROXY_ADDRESS);
    // alloc of pool
    let POOL_ALLOC_POINT = await PoolInfo(PROXY_ADDRESS, POOL_PID);
    // reward 1 decimals
    let DecimalsUnit1 = getDecimals(REWARD1_DECIMALS);
    // reward 2 decimals
    let DecimalsUnit2 = getDecimals(REWARD2_DECIMALS);
    // dayily reward
    let DAYILY_REWARD2 =
        (POOL_ALLOC_POINT.allocPoint / POOL_TOTAL_ALLOC_POINT) *
            (CAKE_PER_BLOCK * 28800) +
        '';
    DAYILY_REWARD2 = fromWei(DAYILY_REWARD2, DecimalsUnit2);

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
    console.log(DAYILY_REWARD1);
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
    console.log(DAYILY_REWARD2);
    let APR = (APR_REWARD1 + APR_REWARD2) * 100;
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
