import { pancakeswapv1 } from "~/assets/utils/pancakeswapv1.js";
import { pancakeswapv2 } from "~/assets/utils/pancakeswapv2.js";
import { pancakeswap } from "~/assets/utils/pancakeswap.js";
import { burgerswaplpt } from "~/assets/utils/burgerswap.js";
import { fixD } from "~/assets/js/util.js";
import { getTokenPrice } from "~/interface/event.js";
import {
  Contract,
  getAccounts,
  getDecimals,
  toWei,
  fromWei,
  getBlockNumber,
} from "~/interface/common_contract.js";
import {
  TotalSupply,
  BalanceOf,
  TotalAllocPoint,
  SushiTotalAllocPoint,
  getPoolTokens,
  CakePerBlock,
  SushiPoolInfo,
  SushiPerBlock,
  MdexPerBlock,
  PoolInfo,
  PoolAllowance,
  Rewards,
  RewardsDuration,
  Reward,
} from "~/interface/read_contract.js";
import BigNumber from "bignumber.js";
export const GetPoolAPR = async (poolData) => {
  let { MING_TIME, OPEN_TIME } = poolData;
  if (MING_TIME == "Finished") {
    return "--";
  }
  let APR = await getAPRMethods(poolData);
  if (OPEN_TIME == "Mining") {
    return fixD(APR, 2) + "%";
  }
  if (OPEN_TIME != "Mining") {
    return "Infinity";
  }
};
const getAPRMethods = async (poolData) => {
  let { APRTYPE } = poolData;
  switch (APRTYPE) {
    case "CakeDoublePoolAPR":
      return await CakeDoublePoolAPR(poolData);
    case "MdexDoublePoolAPR":
      return await MdexDoublePoolAPR(poolData);
    case "CompoundPoolAPY":
      return await CompoundPoolAPY(poolData);
    case "hTokenDoublePoolAPR":
      return await hTokenDoublePoolAPR(poolData);
    case "TokenDoublePoolAPR":
      return await TokenDoublePoolAPR(poolData);
    case "SushiDoublePoolAPR":
      return await SushiDoublePoolAPR(poolData);
    default:
      return "--";
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
  let HELMET_FARM = "0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699";
  let STAKE_VOLUME = await BalanceOf(STAKE_ADDRESS, 18, PROXY_ADDRESS);
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
    (POOL_ALLOC_POINT / POOL_TOTAL_ALLOC_POINT) * (CAKE_PER_BLOCK * 28800) + "";
  let TOTAL_REWARD1 = await PoolAllowance(
    REWARD1_ADDRESS,
    HELMET_FARM,
    POOL_ADDRESS,
    REWARD1_DECIMALS
  );
  let SPEED_REWARD1 = await Rewards(POOL_ADDRESS, "0");
  let TIME_REWARD1 = await RewardsDuration(POOL_ADDRESS);
  let DAYILY_REWARD1 = (TOTAL_REWARD1 - SPEED_REWARD1) / (TIME_REWARD1 / 86400);
  console.log(DAYILY_REWARD1)
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
  let DENOMINATOR_REWARD1 = VOLUME_OF_STAKE * STAKE_BNB_VALUE;
  let DENOMINATOR_REWARD2 =
    ((VOLUME_OF_STAKE * STAKE_BNB_VALUE) / TOTAL_VOLUME) * STAKE_VOLUME;
  let APR_REWARD1 = NUMBERATOR_REWARD1 / DENOMINATOR_REWARD1;
  let APR_REWARD2 = NUMBERATOR_REWARD2 / DENOMINATOR_REWARD2;
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
  let HELMET_FARM = "0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699";
  let STAKE_VOLUME = await BalanceOf(STAKE_ADDRESS, 18, PROXY_ADDRESS);
  let TOTAL_VOLUME = await TotalSupply(STAKE_ADDRESS, 18);
  // total alloc of pool
  let POOL_TOTAL_ALLOC_POINT = await TotalAllocPoint(PROXY_ADDRESS);
  // cake per block
  // let MDEX_PER_BLOCK = await MdexPerBlock(PROXY_ADDRESS);
  let MDEX_PER_BLOCK = await Reward(PROXY_ADDRESS);
  // alloc of pool
  let POOL_ALLOC_POINT = await PoolInfo(PROXY_ADDRESS, POOL_PID);
  POOL_ALLOC_POINT = fromWei(POOL_ALLOC_POINT.allocPoint);
  // reward 2 decimals
  let DecimalsUnit2 = getDecimals(REWARD2_DECIMALS);
  // dayily reward
  let DAYILY_REWARD2 =
    (POOL_ALLOC_POINT / POOL_TOTAL_ALLOC_POINT) * (MDEX_PER_BLOCK * 28800) + "";
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
  let DENOMINATOR =
    ((VOLUME_OF_STAKE * STAKE_BNB_VALUE) / TOTAL_VOLUME) * STAKE_VOLUME;
  let APR_REWARD2 = NUMBERATOR_REWARD2 / DENOMINATOR;
  let APR = APR_REWARD2 * 100;
  return APR;
};
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
  MINING_DAY,
}) => {
  let HELMET_ADDRESS = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"; //helmet adress
  let HELMET_NAME = "HELMET";
  let HELMET_DECIMALS = 18;
  let BNB_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; // BNB adress
  let BNB_NAME = "BNB";
  let BNB_DECIMALS = 18;
  let REWARD2_HELMET_VALUE;
  REWARD2_HELMET_VALUE = await GetTokenForHELMETValue(
    REWARD2_ADDRESS,
    REWARD2_SYMBOL,
    REWARD2_DECIMALS
  );

  if (REWARD2_HELMET_VALUE == 0) {
    let REWARD2_BNB_VALUE = await GetTokenForBNBValue(
      REWARD2_ADDRESS,
      REWARD2_SYMBOL,
      REWARD2_DECIMALS
    );
    let BNB_HELMET_VALUE = await GetTokenForHELMETValue(
      BNB_ADDRESS,
      BNB_NAME,
      BNB_DECIMALS
    );
    REWARD2_HELMET_VALUE = REWARD2_BNB_VALUE * BNB_HELMET_VALUE;
  }

  let STAKE_VOLUME = await TotalSupply(POOL_ADDRESS, 18);
  let TOTAL_VOLUME = await TotalSupply(STAKE_ADDRESS, 18);
  let STAKE_VALUE =
    (await BalanceOf(HELMET_ADDRESS, HELMET_DECIMALS, STAKE_ADDRESS)) * 2;
  let REWARD1_NUMBERATOR = (REWARD1_VOLUME / MINING_DAY) * 365;
  let REWARD2_NUMBERATOR =
    ((REWARD2_VOLUME * REWARD2_HELMET_VALUE) / MINING_DAY) * 365;
  let DENOMINATOR = (STAKE_VALUE / TOTAL_VOLUME) * STAKE_VOLUME;
  let REWARD1_APR = REWARD1_NUMBERATOR / DENOMINATOR;
  let REWARD2_APR = REWARD2_NUMBERATOR / DENOMINATOR;
  let APR = (REWARD1_APR + REWARD2_APR) * 100;
  return APR;
};
const CompoundPoolAPY = async ({ POOL_ADDRESS }) => {
  // all staking of pool
  let STAKE_VOLUME = await TotalSupply(POOL_ADDRESS, 18);
  let REWARD_VALUE = 1 + 22471 / STAKE_VOLUME;
  let APR = Math.pow(REWARD_VALUE, 365) * 100;
  return APR;
};
export const GetHelmetPoolAPY = async ({ POOL_ADDRESS }) => {
  let STAKE_VOLUME = await TotalSupply(POOL_ADDRESS, 18);
  let APR = (22471 / STAKE_VOLUME) * 365 * 100;
  return APR;
};
const GetTokenForBNBValue = async (
  REWARD1_ADDRESS,
  REWARD1_SYMBOL,
  REWARD1_DECIMALS
) => {
  let REWARD2_ADDRESS = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
  let REWARD2_SYMBOL = "WBNB";
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
  let REWARD2_ADDRESS = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  let REWARD2_SYMBOL = "HELMET";
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
  let Data = await getTokenPrice({
    fromTokenAddress: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    toTokenAddress: REWARD2_ADDRESS,
    amount: 1000000000000000000,
  });
  let STAKE_BNB_VALUE = fromWei(Data.data.toTokenAmount);
  let TOTAL_VOLUME = await TotalSupply(STAKE_ADDRESS, 18);
  let STAKE_VOLUME = await BalanceOf(STAKE_ADDRESS, 18, PROXY_ADDRESS);
  let VOLUME_OF_STAKE =
    (await BalanceOf(TOKEN1_ADDRESS, STAKE_DECIMALS, STAKE_ADDRESS)) * 2;
  // total alloc of pool
  let POOL_TOTAL_ALLOC_POINT = await TotalAllocPoint(PROXY_ADDRESS);
  // cake per block
  let CAKE_PER_BLOCK = await CakePerBlock(PROXY_ADDRESS);
  // alloc of pool
  let POOL_ALLOC_POINT = await PoolInfo(PROXY_ADDRESS, POOL_PID);
  POOL_ALLOC_POINT = fromWei(POOL_ALLOC_POINT.allocPoint);
  // dayily reward
  let DAYILY_REWARD2 =
    (POOL_ALLOC_POINT / POOL_TOTAL_ALLOC_POINT) * (CAKE_PER_BLOCK * 28800) + "";
  let DENOMINATOR_REWARD2 =
    ((VOLUME_OF_STAKE * STAKE_BNB_VALUE) / TOTAL_VOLUME) * STAKE_VOLUME;
  let NUMBERATOR_REWARD2 = 365 * 1 * DAYILY_REWARD2;
  let APR_REWARD2 = NUMBERATOR_REWARD2 / DENOMINATOR_REWARD2;
  let APR = APR_REWARD2 * 100;
  return APR;
};
const SushiDoublePoolAPR = async ({
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
  let Data = await getTokenPrice({
    fromTokenAddress: REWARD2_ADDRESS,
    toTokenAddress: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    amount: 1000000000000000000,
  });
  let HELMET_FARM = "0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699";
  let ASCI_FARM = "0xa82f327BBbF0667356D2935C6532d164b06cEced";
  let POOL_TOKENS = await getPoolTokens(ASCI_FARM, POOL_PID);
  let LPT_TOKEN1 = fromWei(POOL_TOKENS.balances[0]);
  let LPT_TOKEN2 = fromWei(POOL_TOKENS.balances[1]);
  let BNB_HELMET = await GetTokenForHELMETValue(
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    "WBNB",
    18
  );
  let LPT_VALUE = Number(LPT_TOKEN1) + Number(LPT_TOKEN2 * BNB_HELMET);
  console.log(LPT_VALUE);
  let STAKE_BNB_VALUE = fromWei(Data.data.toTokenAmount);
  let TOTAL_VOLUME = await TotalSupply(STAKE_ADDRESS, 18);
  let STAKE_VOLUME = await BalanceOf(STAKE_ADDRESS, 18, PROXY_ADDRESS);
  console.log(STAKE_VOLUME);
  let VOLUME_OF_STAKE =
    (await BalanceOf(REWARD2_ADDRESS, STAKE_DECIMALS, STAKE_ADDRESS)) * 2;
  console.log(VOLUME_OF_STAKE);
  // total alloc of pool
  let POOL_TOTAL_ALLOC_POINT = await SushiTotalAllocPoint(PROXY_ADDRESS);
  // cake per block
  let CAKE_PER_BLOCK = await SushiPerBlock(PROXY_ADDRESS);
  // alloc of pool
  let POOL_ALLOC_POINT = await SushiPoolInfo(PROXY_ADDRESS, STAKE_ADDRESS);
  POOL_ALLOC_POINT = fromWei(POOL_ALLOC_POINT.allocPoint);
  // dayily reward
  let DAYILY_REWARD2 =
    (POOL_ALLOC_POINT / POOL_TOTAL_ALLOC_POINT) * (CAKE_PER_BLOCK * 28800) + "";
    console.log(DAYILY_REWARD2)
  let DENOMINATOR_REWARD = (LPT_VALUE / TOTAL_VOLUME) * STAKE_VOLUME;
  let NUMBERATOR_REWARD2 = 365 * STAKE_BNB_VALUE * DAYILY_REWARD2;
  let APR_REWARD2 = NUMBERATOR_REWARD2 / DENOMINATOR_REWARD;
  let TOTAL_REWARD1 = await PoolAllowance(
    REWARD1_ADDRESS,
    HELMET_FARM,
    POOL_ADDRESS,
    REWARD1_DECIMALS
  );
  let SPEED_REWARD1 = await Rewards(POOL_ADDRESS, "0");
  let TIME_REWARD1 = await RewardsDuration(POOL_ADDRESS);
  let DAYILY_REWARD1 = (TOTAL_REWARD1 - SPEED_REWARD1) / (TIME_REWARD1 / 86400);
  let NUMBERATOR_REWARD1 = 365 * 1 * DAYILY_REWARD1;
  let APR_REWARD1 = NUMBERATOR_REWARD1 / DENOMINATOR_REWARD;
  console.log(APR_REWARD1, APR_REWARD2);
  let APR = fixD((APR_REWARD1 + APR_REWARD2) * 100, 2) + "%";
  return APR;
};
