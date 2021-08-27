import { getTokenPrice } from "~/interface/event.js";
import { fixD } from "~/assets/js/util.js";
import CakePoolABI from "~/abi/CakePoolABI.json";
import MdexPoolABI from "~/abi/MdexPoolABI.json";
import MiningABI from "~/abi/MiningABI.json";
import ApproveABI from "~/abi/IPancakePair.json";
import { Contract } from "ethers-multicall-x";
import { getBlockNumber } from "~/interface/common_contract.js";
import { CakePerBlock, Reward } from "~/interface/read_contract.js";
import {
  toWei,
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
} from "~/interface/index.js";
export const lptPoolList = [
  {
    PoolName: "HELMET-BNB MLP",
    PoolType: "lpt",
    PoolAddress: "0xD86577ea62FE1FD2cA0Be583c1A0ecf25F4FbF2B",
    ProxyPid: "0x38",
    ProxyABI: MdexPoolABI,
    ProxySwap: "MDEX",
    ProxyAddress: "0xc48fe252aa631017df253578b1405ea399728a50",
    StakeUnit: "MLP",
    StakeDecimals: 18,
    StakeSymbol: "HELMET-BNB MLP",
    StakeAddress: "0x83d8E2E030cD820dfdD94723c3bcf2BC52e1701A",
    StartTime: "Ongoing",
    FinishTime: "Mining",
    LptToken1Decimals: 18,
    LptToken1Symbol: "HELMET",
    LptToken1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    LptToken2Decimals: 18,
    LptToken2Symbol: "WBNB",
    LptToken2Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    RewardSymbol: "mdx",
    RewardVolume: "two",
    HaveReward1: false,
    Reward1Decimals: 18,
    Reward1Symbol: "HELMET",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    HaveReward2: true,
    Reward2Symbol: "MDX",
    Reward2Address: "0x9c65ab58d8d978db963e63f2bfb7121627e3a739",
    Reward2Decimals: 18,
    RightShowToken: {
      AddTokenSymbol: "MDX",
      AddTokenAddress: "0x9c65ab58d8d978db963e63f2bfb7121627e3a739",
      AddTokenDecimals: 18,
    },
    ImgReward: true,
    IsIIO: false,
    IsCombo: false,
    HaveOnePager: false,
    YearEarnType: "APR",
    APR: "--",
    JumpLink1:
      "<a href='https://bsc.mdex.com/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='mdx'></i>Get HELMET-BNB MLP</a>",
  },
  {
    PoolName: `HELMET-BNB LPT`,
    PoolType: "lpt",
    PoolAddress: "0xA21B692B92Bbf0E34334f1548a0b51837CDDD0Bb",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    ProxyPid: "0x11e",
    ProxyABI: CakePoolABI,
    ProxySwap: "PANCAKE",
    ProxyAddress: "0x73feaa1eE314F8c655E354234017bE2193C9E24E",
    StakeUnit: "LPT",
    StakeDecimals: 18,
    StakeSymbol: "HELMET-BNB LPT",
    StakeAddress: "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571",
    StartTime: "Ongoing",
    FinishTime: "Mining",
    LptToken1Decimals: 18,
    LptToken1Symbol: "HELMET",
    LptToken1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    LptToken2Decimals: 18,
    LptToken2Symbol: "WBNB",
    LptToken2Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    RewardVolume: "one",
    RewardSymbol: "helmet1",
    HaveReward1: true,
    Reward1Decimals: 18,
    Reward1Symbol: "HELMET",
    HaveReward2: false,
    Reward2Decimals: 18,
    Reward2Symbol: "CAKE",
    Reward2Address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    ImgReward: true,
    IsCombo: false,
    IsIIO: false,
    HaveOnePager: false,
    YearEarnType: "APR",
    APR: "--",
    JumpLink1:
      "<a href='https://exchange.pancakeswap.finance/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-BNB LPT(V2)</a>",
  },
  {
    PoolName: `HELMET-USDT LPT`,
    PoolType: "lpt",
    PoolAddress: "0x50a9C123536e69290a5dAb32ce514D0b9afcaDCc",
    ProxyPid: "33",
    ProxyABI: CakePoolABI,
    ProxySwap: "PANCAKE",
    ProxyAddress: "0xdfaa0e08e357db0153927c7eabb492d1f60ac730",
    StakeUnit: "LPT",
    StakeDecimals: 18,
    StakeSymbol: "HELMET-USDT LPT",
    StakeAddress: "0xdB4d03b1659fe7FAD33F840de481773A629d256b",
    StartTime: "Ongoing",
    FinishTime: "Mining",

    LptToken1Decimals: 18,
    LptToken1Symbol: "HELMET",
    LptToken1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    LptToken2Decimals: 18,
    LptToken2Symbol: "BABY",
    LptToken2Address: "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657",
    RewardVolume: "one",
    RewardSymbol: "baby",
    HaveReward1: false,
    Reward1Decimals: 18,
    Reward1Symbol: "HELMET",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    HaveReward2: true,
    Reward2Decimals: 18,
    Reward2Symbol: "BABY",
    Reward2Address: "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657",
    ImgReward: true,
    IsCombo: false,
    IsIIO: false,
    HaveOnePager: false,
    YearEarnType: "APR",
    APR: "--",
    JumpLink1:
      "<a href='https://exchange.babyswap.finance/#/add/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8/0x55d398326f99059fF775485246999027B3197955' target='_blank'>From <i class='babyswap'></i>Get HELMET-USDT LPT</a>",
  },
  {
    PoolName: `GUARD-USDC LPT`,
    StakeSymbol: "GUARD-USDC LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "guard_quick",
    ImgReward: true,
    StartTime: "Ongoing",
    FinishTime: "Mining",
    YearEarnType: "APR",
    APR: "686.19%",
    PoolType: "link",
  },
];
export const comboPoolList = [
  {
    Key: "HELMET",
    PoolName: "HELMET POOL",
    StakeSymbol: "HELMET",
    StakeUnit: "HELMET",
    RewardVolume: "one",
    RewardSymbol: "helmet",
    ImgReward: true,
    StartTime: "Ongoing",
    FinishTime: "Mining",
    IsCombo: false,
    flash: false,
    YearEarnType: "APR",
    compound: true,
    HaveOnePager: false,
    Reward1Symbol: "HELMET",
    PoolAddress: "0x279a073c491c873df040b05cc846a3c47252b52c",
    StakeAddress: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    PoolType: "compound",
    APR: "--",
    apy: "--",
  },
  {
    Key: "HELMETMCRN",
    PoolName: "HELMET-<i>hMCRN</i> LPT",
    StakeSymbol: "HELMET-hMCRN LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_mcrn",
    ImgReward: true,
    StartTime: "2021/08/02 00:00 UTC+8",
    FinishTime: "2021/08/16 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hMCRN",
    Reward1Symbol: "HELMET",
    Reward2Symbol: "MCRN",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0xacb2d47827c9813ae26de80965845d80935afd0b",
    Reward1Volume: 28270,
    Reward2Volume: 2740,
    pool_process: 14,
    LeftShowToken: {
      AddTokenSymbol: "hMCRN",
      AddTokenAddress: "0x4c60bd0a7aa839e35882c7a9b9b240ea7e0657bf",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "MCRN",
      AddTokenAddress: "0xacb2d47827c9813ae26de80965845d80935afd0b",
      AddTokenDecimals: 18,
    },
    PoolAddress: "0x6f70369E6705f8d32DF74Ca0115DC2F9bdd6cC20",
    StakeAddress: "0xb6d6079dacb091362bbbd7ed43f44d2727c257d0",
    StakeDecimals: 18,
    JumpLink1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x4c60bd0a7aa839e35882c7a9b9b240ea7e0657bf/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hMCRN LPT</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "HELMETWIZARD",
    PoolName: "HELMET-<i>hWIZARD</i> LPT",
    StakeSymbol: "HELMET-hWIZARD LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_wizard",
    ImgReward: true,
    StartTime: "2021/08/02 00:00 UTC+8",
    FinishTime: "2021/08/16 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hWIZARD",
    Reward1Symbol: "HELMET",
    Reward2Symbol: "WIZARD",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18",
    Reward1Volume: 60280,
    Reward2Volume: 6670,
    pool_process: 14,
    LeftShowToken: {
      AddTokenSymbol: "hWIZARD",
      AddTokenAddress: "0x792b733af7b9b83331f90dbbd297e519258b09bc",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "WIZARD",
      AddTokenAddress: "0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18",
      AddTokenDecimals: 18,
    },
    PoolAddress: "0xD5a042DEC6AF7D126fAE12B689f972061015A848",
    StakeAddress: "0x7cb1481fcd7d107211d57cb797dc7554086e31d7",
    StakeDecimals: 18,
    JumpLink1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x792b733af7b9b83331f90dbbd297e519258b09bc/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hWIZARD LPT</a>",
    PoolType: "combo",
    APR: "--",
  },

  {
    Key: "HELMETARGON",
    PoolName: "HELMET-<i>hARGON</i> LPT",
    StakeSymbol: "HELMET-hARGON LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_argon",
    ImgReward: true,
    StartTime: "2021/07/10 00:00 UTC+8",
    FinishTime: "2021/07/25 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hARGON",
    Reward1Symbol: "HELMET",
    Reward2Symbol: "ARGON",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x851f7a700c5d67db59612b871338a85526752c25",
    Reward1Volume: 35000,
    Reward2Volume: 350000,
    pool_process: 15,
    LeftShowToken: {
      AddTokenSymbol: "hARGON",
      AddTokenAddress: "0x4ce2d9804da7583c02f80fec087aea1d137214eb",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "ARGON",
      AddTokenAddress: "0x851f7a700c5d67db59612b871338a85526752c25",
      AddTokenDecimals: 18,
    },
    PoolAddress: "0xC12D0dE9f64467f4Dd51e0313b3b801b5F945648",
    StakeAddress: "0x78c6c572a60cc7a2006513597a981fcd99d3ec77",
    StakeDecimals: 18,
    JumpLink1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x4ce2d9804da7583c02f80fec087aea1d137214eb/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hARGON LPT</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "HELMETBMXX",
    PoolName: "HELMET-<i>hBMXX</i> LPT",
    StakeSymbol: "HELMET-hBMXX LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_bmxx",
    ImgReward: true,
    StartTime: "2021/07/01 00:00 UTC+8",
    FinishTime: "2021/07/14 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hBMXX",
    Reward1Symbol: "HELMET",
    Reward2Symbol: "BMXX",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x4131b87f74415190425ccd873048c708f8005823",
    Reward1Volume: 37500,
    Reward2Volume: 3272.46,
    pool_process: 13,
    LeftShowToken: {
      AddTokenSymbol: "hBMXX",
      AddTokenAddress: "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "BMXX",
      AddTokenAddress: "0x4131b87f74415190425ccd873048c708f8005823",
      AddTokenDecimals: 18,
    },
    PoolAddress: "0x088521b6207Cc083C252Eb44f232Ed418193eF25",
    StakeAddress: "0xdec93cf8345695094ea47b22dfe31d349190c5d0",
    StakeDecimals: 18,
    JumpLink1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hBMXX LPT</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "HELMETBABY",
    PoolName: "HELMET-<i>hBABY</i> LPT",
    StakeSymbol: "HELMET-hBABY LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_baby",
    ImgReward: true,
    StartTime: "2021/06/26 00:00 UTC+8",
    FinishTime: "2021/07/09 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hBABY",
    Reward1Symbol: "HELMET",
    Reward2Symbol: "BABY",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657",
    Reward1Volume: 37500,
    Reward2Volume: 158931,
    pool_process: 13,
    LeftShowToken: {
      AddTokenSymbol: "hBABY",
      AddTokenAddress: "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "BABY",
      AddTokenAddress: "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657",
      AddTokenDecimals: 18,
    },
    PoolAddress: "0xe9499FBB0832a4C374165106e1EDe589B42Ba57E",
    StakeAddress: "0x5e9a2d9a54958bf3c35dad24f32bb54dac97f6c6",
    StakeDecimals: 18,
    JumpLink1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hBABY LPT</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "HELMETMTRG",
    PoolName: "HELMET-<i>hMTRG</i> LPT",
    StakeSymbol: "HELMET-hMTRG LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_mtrg",
    ImgReward: true,
    StartTime: "2021/06/25 00:00 UTC+8",
    FinishTime: "2021/07/04 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hMTRG",
    Reward1Symbol: "HELMET",
    Reward2Symbol: "MTRG",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0xBd2949F67DcdC549c6Ebe98696449Fa79D988A9F",
    Reward1Volume: 25000,
    Reward2Volume: 2767,
    pool_process: 9,
    LeftShowToken: {
      AddTokenSymbol: "hMTRG",
      AddTokenAddress: "0xa561926e81DEcb74B3d11e14680B3F6D1c5012bD",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "MTRG",
      AddTokenAddress: "0xBd2949F67DcdC549c6Ebe98696449Fa79D988A9F",
      AddTokenDecimals: 18,
    },
    ProxyAddress: "",
    PoolAddress: "0xE3B9588d36854f6d97AeC34E65396197675a432a",
    StakeAddress: "0x179a6794fe86b28ee170e8e91672abe652e3e82c",
    StakeDecimals: 18,
    JumpLink1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0xa561926e81DEcb74B3d11e14680B3F6D1c5012bD/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hMTRG LPT</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "HELMETWINGS",
    PoolName: "HELMET-<i>hWINGS</i> LPT",
    StakeSymbol: "HELMET-hWINGS LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_wings",
    ImgReward: true,
    StartTime: "2021/06/12 00:00 UTC+8",
    FinishTime: "2021/06/26 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hWINGS",
    Reward1Symbol: "HELMET",
    Reward2Symbol: "WINGS",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x0487b824c8261462f88940f97053e65bdb498446",
    Reward1Volume: 30000,
    Reward2Volume: 4500,
    pool_process: 14,
    LeftShowToken: {
      AddTokenSymbol: "hWINGS",
      AddTokenAddress: "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "WINGS",
      AddTokenAddress: "0x0487b824c8261462f88940f97053e65bdb498446",
      AddTokenDecimals: 18,
    },
    ProxyAddress: "",
    PoolAddress: "0xBAd52954a2397A9A04c44440039904B0E1Cb8d0f",
    StakeAddress: "0x0ea990871e99c83c9800f7266e3b9c612dd68623",
    StakeDecimals: 18,
    JumpLink1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x34508EA9ec327ff3b98A2F10eEDc2950875bf026/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hWINGS LPT</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "BHELMETDODO",
    PoolName: "HELMET-BNB DLP",
    StakeSymbol: "HELMET-BNB DLP",
    StakeUnit: "DLP",
    RewardVolume: "two",
    RewardSymbol: "bhelmet_dodo",
    ImgReward: true,
    StartTime: "2021/05/10 12:00 UTC+8",
    FinishTime: "2021/05/24 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: false,
    Reward1Symbol: "BHELMET",
    Reward2Symbol: "DODO",
    LeftShowToken: {
      AddTokenSymbol: "BHELMET",
      AddTokenAddress: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "DODO",
      AddTokenAddress: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
      AddTokenDecimals: 18,
    },
    ProxyAddress: "0x14b5E6158864a2F5E04C52F1858185b64aEddAf6",
    PoolAddress: "0x14b5E6158864a2F5E04C52F1858185b64aEddAf6",
    StakeAddress: "0x9CE69450FDCc3b6058F7c430ef0A8C051b2300c6",
    Reward1Address: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
    Reward2Address: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    JumpLink1:
      "<a href='https://app.dodoex.io/liquidity?poolAddress=0x80B5abD78878B709F58b46e94CF6A194A9A65234' target='_blank'>From <i class='dodo'></i>Get HELMET-BNB DLP</a>",
    PoolType: "combo",
    APR: "--",
  },

  {
    Key: "BHELMETxBURGER",
    PoolName: "HELMET-<i>hxBURGER</i> BLP",
    StakeSymbol: "HELMET-hxBURGER BLP",
    StakeUnit: "BLP",
    RewardVolume: "two",
    RewardSymbol: "bhelmet_xburger",
    ImgReward: true,
    StartTime: "2021/05/02 12:00 UTC+8",
    FinishTime: "2021/05/22 00:00 UTC+8",
    IsCombo: true,
    flash: false,
    YearEarnType: "APR",
    HaveOnePager: "hxBURGER",
    Reward1Symbol: "BHELMET",
    Reward2Symbol: "xBURGER",
    LeftShowToken: {
      AddTokenSymbol: "hxBURGER",
      AddTokenAddress: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "xBURGER",
      AddTokenAddress: "0xAFE24E29Da7E9b3e8a25c9478376B6AD6AD788dD",
      AddTokenDecimals: 18,
    },
    ProxyAddress: "",
    PoolAddress: "0xD23B7cD539f7FB4f27EbEDEB2c56a791639C38Fb",
    StakeAddress: "0xCf8F78E34135168230969124CF56A37Ae5e8bD4D",
    Reward1Address: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
    Reward2Address: "0xAFE24E29Da7E9b3e8a25c9478376B6AD6AD788dD",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    JumpLink1:
      "<a href='https://burgerswap.org/trade/pool?from=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8&to=0xCa7597633927A98B800738eD5CD2933a74a80e8c' target='_blank' >From <i class='burger'></i>Get HELMET-hxBURGER BLP</a>",
    PoolType: "combo",
    APR: "--",
  },

  {
    Key: "FEIQFEI",
    PoolName: "FEI(BSC) POOL",
    StakeSymbol: "FEI",
    StakeUnit: "FEI",
    RewardVolume: "one",
    RewardSymbol: "QFEI",
    ImgReward: false,
    StartTime: "2021/04/10 00:00 UTC+8",
    FinishTime: "2021/04/17 00:00 UTC+8",
    SERIAL_FLAG: true,
    YearEarnType: "APR",
    HaveOnePager: false,
    Reward1Symbol: "QFEI",
    LeftShowToken: {
      AddTokenSymbol: "FEI",
      AddTokenAddress: "0x219Cf9729BB21BBe8dD2101C8B6ec21c03dd0F31",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "QFEI",
      AddTokenAddress: "0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a",
      AddTokenDecimals: 18,
    },
    ProxyAddress: "",
    PoolAddress: "0xf1569d9b3aeCA99a2774Ac66731b707C1249642A",
    StakeAddress: "0x219Cf9729BB21BBe8dD2101C8B6ec21c03dd0F31",
    Reward1Address: "0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    JumpLink1:
      "<a href='https://www.chainswap.exchange/' target='_blank'>Swap FEI(ETH) to BSC By <i class='chainswap'></i> ChainSwap</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "KUN",
    PoolName: "<i>QFEI</i>-QSD DLP",
    StakeSymbol: "QFEI-QSD DLP",
    StakeUnit: "DPT",
    RewardVolume: "one",
    RewardSymbol: "kun",
    ImgReward: true,
    StartTime: "2021/04/12 00:00 UTC+8",
    FinishTime: "2021/05/02 00:00 UTC+8",
    SERIAL_NEXT_FLAG: true,
    YearEarnType: "APR",
    HaveOnePager: "QFEI",
    Reward1Symbol: "KUN",
    LeftShowToken: {
      AddTokenSymbol: "QSD",
      AddTokenAddress: "0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "KUN",
      AddTokenAddress: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
      AddTokenDecimals: 18,
    },
    PoolAddress: "0x10ebD347A44a40BEE9BDFb0E4c809F82f3d4C2f9",
    StakeAddress: "0x14616328f4Ce3082187B4f1Ee4863DA5516B178A",
    Reward1Address: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    JumpLink1:
      "<a href='https://app.dodoex.io/liquidity?poolAddress=0x14616328f4Ce3082187B4f1Ee4863DA5516B178A' target='_blank' >From <i class='dodo'></i>Get QFEI-QSD DLP</a>",
    JumpLink2:
      " <a href='https://bsc.qian.finance/chemix/' target='_blank'> Or From <i class='qian'></i> Mint QSD</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "QHELMET",
    PoolName: "HELMET-KUN DLP",
    StakeSymbol: "HELMET-KUN DLP",
    StakeUnit: "DPT",
    RewardVolume: "one",
    RewardSymbol: "QHELMET",
    ImgReward: false,
    StartTime: "2021/04/21 00:00 UTC+8",
    FinishTime: "2021/05/10 00:00 UTC+8",
    SERIAL_NEXT_FLAG: true,
    YearEarnType: "APR",
    HaveOnePager: false,
    Reward1Symbol: "QHELMET",
    LeftShowToken: {
      AddTokenSymbol: "KUN",
      AddTokenAddress: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "QHELMET",
      AddTokenAddress: "0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99",
      AddTokenDecimals: 18,
    },
    ProxyAddress: "",
    PoolAddress: "0x76c415ececd88f76d6e6b5401a82b5ba075819f4",
    StakeAddress: "0xd7eed218538b3fa3e20d24f43100790f0d03538a",
    Reward1Address: "0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    JumpLink1:
      "<a href='https://app.dodoex.io/liquidity?poolAddress=0xd7eed218538b3fa3e20d24f43100790f0d03538a' target='_blank' >From <i class='dodo'></i>Get HELMET-KUN DLP</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "HELMETCAKE",
    PoolName: `HELMET-BNB LPT`,
    StakeSymbol: "HELMET-BNB LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_cake_v1",
    ImgReward: true,
    FinishTime: "Mining",
    StartTime: "",
    FinishTime: "2021/04/25 17:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: false,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "CAKE",
    LeftShowToken: {
      AddTokenSymbol: "Cake-LPT",
      AddTokenAddress: "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "HELMET",
      AddTokenAddress: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
      AddTokenDecimals: 18,
    },
    ProxyAddress: "0x73feaa1eE314F8c655E354234017bE2193C9E24E",
    PoolAddress: "0xb22425206D40605E9bE5a5460786DBaB5aBA9485",
    StakeAddress: "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    JumpLink1:
      "<a href='https://v1exchange.pancakeswap.finance/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank' >From <i class='pancake'></i>Get HELMET-BNB LPT(V1 Old)</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "HELMETDODO",
    PoolName: "HELMET-<i>hDODO</i> DLP",
    StakeSymbol: "HELMET-hDODO DLP",
    StakeUnit: "DPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_dodo",
    ImgReward: true,
    FinishTime: "Mining",
    StartTime: "",
    FinishTime: "2021/04/10 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hDODO",
    Reward1Symbol: "HELMET",
    Reward2Symbol: "DODO",
    LeftShowToken: {
      AddTokenSymbol: "hDODO",
      AddTokenAddress: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "DODO",
      AddTokenAddress: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
      AddTokenDecimals: 18,
    },
    ProxyAddress: "",
    PoolAddress: "0x041C1BF8E085e4987404b88441599EE6d1bCD684",
    StakeAddress: "0x7F6ea24c10E32C8a5fd1c9b2C1239340671460cC",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    JumpLink1:
      "<a href='https://app.dodoex.io/liquidity?poolAddress=0x7f6ea24c10e32c8a5fd1c9b2c1239340671460cc' target='_blank' >From <i class='dodo'></i>Get HELMET-hDODO DLP</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "HELMETFOR",
    PoolName: "HELMET-<i>hFOR</i> LPT",
    StakeSymbol: "HELMET-hFOR LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_for",
    ImgReward: true,
    FinishTime: "Mining",
    StartTime: "",
    FinishTime: "2021/03/20 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hFOR",
    Reward1Symbol: "HELMET",
    Reward2Symbol: "FOR",
    LeftShowToken: {
      AddTokenSymbol: "HFOR",
      AddTokenAddress: "0xb779F208f8d662558dF8E2b6bFE3b6305CC13389",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "FOR",
      AddTokenAddress: "0x658a109c5900bc6d2357c87549b651670e5b0539",
      AddTokenDecimals: 18,
    },
    ProxyAddress: "",
    PoolAddress: "0x2295876146ED2A4C8c391ca09dFD9b42329D22a9",
    StakeAddress: "0xc3f103b7f36690c70b4a682c760fe3b8951cefd1",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x658a109c5900bc6d2357c87549b651670e5b0539",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    JumpLink1:
      "<a href='https://exchange.pancakeswap.finance/#/add/0xb779F208f8d662558dF8E2b6bFE3b6305CC13389/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank' >From <i class='pancake'></i>Get HELMET-hFOR LPT</a>",
    PoolType: "combo",
    APR: "--",
  },
  {
    Key: "HELMETBURGER",
    PoolName: "HELMET-<i>hBURGER</i> LPT",
    StakeSymbol: "HELMET-hBURGER LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_burger",
    ImgReward: true,
    FinishTime: "Mining",
    StartTime: "",
    FinishTime: "2021/03/07 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hBURGER",
    Reward1Symbol: "HELMET",
    Reward2Symbol: "BURGER",
    LeftShowToken: {
      AddTokenSymbol: "hBURGER",
      AddTokenAddress: "0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "BURGER",
      AddTokenAddress: "0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f",
      AddTokenDecimals: 18,
    },
    ProxyAddress: "",
    PoolAddress: "0x9216508886fEA6bF9334a59F9C90411fc6c400e5",
    StakeAddress: "0x7a0068a1896F82D8F47086E3f2CE3CcEA75d5493",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    JumpLink1:
      "<a href='https://burgerswap.org/trade/pool?from=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8&to=0xCa7597633927A98B800738eD5CD2933a74a80e8c' target='_blank' >From <i class='burger'></i>Get HELMET-hxBURGER BLP</a>",
    PoolType: "combo",
    APR: "--",
  },
];
export const formatMiningPool = (PoolData) => {
  for (let Key = 0; Key < PoolData.length; Key++) {
    const ItemPool = PoolData[Key];
    const { StartTime, FinishTime } = ItemPool;
    const PresentTime = Date.now();
    const FixStartTime = new Date(StartTime) * 1;
    const FixFinishTime = new Date(FinishTime) * 1;
    const PoolStarted = PresentTime > FixStartTime ? true : false;
    const PoolFinished = PresentTime > FixFinishTime ? true : false;
    if (!PoolStarted) {
      ItemPool.status = 1;
      if (StartTime !== "Ongoing" && FinishTime !== "Mining") {
        ItemPool.ShowTime = getShowTime(FixStartTime);
      } else {
        ItemPool.ShowTime = "Ongoing";
        if (ItemPool.PoolType === "lpt") {
          ItemPool.APR = getLptAPR(ItemPool);
        }
      }
    }
    if (PoolStarted && !PoolFinished) {
      ItemPool.status = 2;
      if (StartTime !== "Ongoing" && FinishTime !== "Mining") {
        ItemPool.ShowTime = getShowTime(FixFinishTime);
      }
      if (ItemPool.PoolType === "combo") {
        ItemPool.APR = getComboAPR(ItemPool);
      }
    }
    if (PoolFinished) {
      ItemPool.status = 3;
      ItemPool.ShowTime = "Finished";
    }
  }
  return PoolData;
};
const getShowTime = (time) => {
  const now = new Date() * 1;
  const dueDate = time;
  const DonwTime = dueDate - now;
  const day = Math.floor(DonwTime / (24 * 3600000));
  const hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000);
  const minute = Math.floor(
    (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
  );
  const FixDay = day > 9 ? day : "0" + day;
  const FixHour = hour > 9 ? hour : "0" + hour;
  const FixMinute = minute > 9 ? minute : "0" + minute;
  let template;
  if (Number(FixDay) > 0) {
    template = `${FixDay}<b>${window.$nuxt.$t(
      "Content.DayM"
    )}</b><i>/</i>${FixHour}<b>${window.$nuxt.$t("Content.HourM")}</b>`;
  } else {
    template = `${FixHour}<b>${window.$nuxt.$t(
      "Content.HourM"
    )}</b><i>/</i>${FixMinute}<b>${window.$nuxt.$t("Content.MinM")}</b>`;
  }
  return template;
};
const getComboAPR = async (PoolData) => {
  const Reward1Address = PoolData.Reward1Address;
  const Reward2Address = PoolData.Reward2Address;
  const StakeAddress = PoolData.StakeAddress;
  const PoolAddress = PoolData.PoolAddress;
  const Reward2Decimals = PoolData.Reward2Decimals;
  const PoolProcess = PoolData.pool_process;
  const StakeDecimals = PoolData.StakeDecimals;
  const Reward1Volume = PoolData.Reward1Volume;
  const Reward2Volume = PoolData.Reward2Volume;
  const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const HelmetDecimals = 18;
  const Amount = toWei("1", Reward2Decimals);
  let Reward1HelmetVolume;
  if (Reward1Address.toUpperCase() !== HelmetAddress.toUpperCase()) {
    const Data1 = await getTokenPrice({
      fromTokenAddress: Reward1Address,
      toTokenAddress: HelmetAddress,
      amount: Amount,
    });
    Reward1HelmetVolume = fromWei(Data1.data.toTokenAmount);
  } else {
    Reward1HelmetVolume = 1;
  }
  const Data2 = await getTokenPrice({
    fromTokenAddress: Reward2Address,
    toTokenAddress: HelmetAddress,
    amount: Amount,
  });
  const Reward2HelmetVolume = fromWei(Data2.data.toTokenAmount);
  if (Reward1HelmetVolume && Reward2HelmetVolume) {
    const Reward1HelmetPrice = Reward1HelmetVolume;
    const Reward2HelmetPrice = Reward2HelmetVolume;
    const PoolContracts = new Contract(PoolAddress, MiningABI);
    const StakeContracts = new Contract(StakeAddress, MiningABI);
    const HelmetContracts = new Contract(HelmetAddress, MiningABI);
    const PromiseList = [
      PoolContracts.totalSupply(),
      StakeContracts.totalSupply(),
      HelmetContracts.balanceOf(StakeAddress),
    ];
    const MulticallProvider = getOnlyMultiCallProvider();
    return MulticallProvider.all(PromiseList).then((res) => {
      const FixData = processResult(res);
      let [TotalStakeVolume, TotalLptVolume, LptHelmetValue] = FixData;
      const FixTotalStakeVolume = fromWei(TotalStakeVolume, 18);
      const FixTotalLptVolume = fromWei(TotalLptVolume, StakeDecimals);
      const FixLptHelmetValue = fromWei(LptHelmetValue, HelmetDecimals);
      const Numerator1 =
        ((Reward1HelmetPrice * Reward1Volume) / PoolProcess) * 365;
      const Numerator2 =
        ((Reward2HelmetPrice * Reward2Volume) / PoolProcess) * 365;

      const Denominator =
        ((FixLptHelmetValue * 2) / FixTotalLptVolume) * FixTotalStakeVolume;
      const APR1 = Numerator1 / Denominator;
      const APR2 = Numerator2 / Denominator;
      const APR = fixD((APR1 + APR2) * 100, 2) + "%";
      return (PoolData.APR = APR || "--");
    });
  } else {
    return "--";
  }
};
const getLptAPR = async (PoolData) => {
  const HelmetFarm = "0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699";
  const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const BNBAddress = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
  const HelmetDecimals = 18;
  const {
    PoolAddress,
    StakeDecimals,
    StakeAddress,
    ProxyAddress,
    ProxySwap,
    ProxyABI,
    ProxyPid,
    Reward1Decimals,
    Reward1Address,
    Reward2Decimals,
    Reward2Address,
    HaveReward1,
    HaveReward2,
  } = PoolData;
  try {
    const PoolContracts = new Contract(PoolAddress, MiningABI);
    const StakeContracts = new Contract(StakeAddress, MiningABI);
    const HelmetContracts = new Contract(HelmetAddress, MiningABI);
    const ProxyContracts = new Contract(ProxyAddress, ProxyABI);
    const ApproveContracts = new Contract(HelmetAddress, ApproveABI.abi);
    const Amount = toWei("1", Reward2Decimals);
    // const Data1 = await getTokenPrice({
    //   fromTokenAddress: Reward1Address,
    //   toTokenAddress: HelmetAddress,
    //   amount: Amount,
    // });
    const Data2 = await getTokenPrice({
      fromTokenAddress: Reward2Address,
      toTokenAddress: HelmetAddress,
      amount: Amount,
    });
    const Reward1HelmetPrice = 1;
    const Reward2HelmetPrice = fromWei(Data2.data.toTokenAmount);
    let PerBlock;
    if (ProxySwap === "PANCAKE") {
      PerBlock = await CakePerBlock(ProxyAddress);
    }
    if (ProxySwap === "MDEX") {
      PerBlock = await Reward(ProxyAddress);
    }
    const PromiseList = [
      StakeContracts.balanceOf(ProxyAddress),
      StakeContracts.totalSupply(),
      HelmetContracts.balanceOf(StakeAddress),
      ProxyContracts.totalAllocPoint(),
      ProxyContracts.poolInfo(ProxyPid),
      ApproveContracts.allowance(HelmetFarm, PoolAddress),
      PoolContracts.rewards("0x0000000000000000000000000000000000000000"),
      PoolContracts.rewardsDuration(),
    ];
    const MulticallProvider = getOnlyMultiCallProvider();
    MulticallProvider.all(PromiseList).then((res) => {
      const FixData = processResult(res);
      const [
        StakeVolume,
        LptVolume,
        StakeValue,
        TotalAllocPoint,
        PoolInfo,
        TotalReward1,
        OutPutReward1,
        Reward1Time,
      ] = FixData;
      const FixStakeVolume = fromWei(StakeVolume, StakeDecimals);
      const FixLptVolume = fromWei(LptVolume, StakeDecimals);
      const FixStakeValue = fromWei(StakeValue, HelmetDecimals) * 2;
      const FixTotalAllocPoint = fromWei(TotalAllocPoint, 18);
      const FixAllocPoint = fromWei(PoolInfo[1], 18);
      const FixTotalReward1 = Number(TotalReward1)
        ? fromWei(TotalReward1, Reward1Decimals)
        : 0;
      const FixOutPutReward1 = fromWei(OutPutReward1, Reward1Decimals);
      const FixReward1Time = Reward1Time / 86400;
      // ------------------------------------------ //
      const Reward1Daily =
        (FixTotalReward1 - FixOutPutReward1) / FixReward1Time;
      const Reward2Daily =
        (FixAllocPoint / FixTotalAllocPoint) * (PerBlock * 28800);
      const FixReward1Daily = Reward1Daily > 0 ? Reward1Daily : 0;
      const FixReward2Daily = Reward2Daily > 0 ? Reward2Daily : 0;
      const NumberatorReward1 = 365 * Reward1HelmetPrice * FixReward1Daily;
      const NumberatorReward2 = 365 * Reward2HelmetPrice * FixReward2Daily;
      const DenominatorReward1 = FixStakeValue * Reward1HelmetPrice;
      const DenominatorReward2 =
        (FixStakeValue / FixLptVolume) * FixStakeVolume;
      const YearReward1 = NumberatorReward1 / DenominatorReward1;
      const YearReward2 = NumberatorReward2 / DenominatorReward2;
      console.log(YearReward1, YearReward2);
      const APR = fixD((Number(YearReward1) + Number(YearReward2)) * 100, 2);
      return (PoolData.APR = APR + "%" || "--");
    });
  } catch (error) {
    console.log(error);
  }
};
