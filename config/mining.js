import { getTokenPrice } from "~/interface/event.js";
import { fixD } from "~/assets/js/util.js";
import CakePoolABI from "~/web3/abis/CakePoolABI.json";
import XmsPoolABI from "~/web3/abis/XmsPoolABI.json";
import MdexPoolABI from "~/web3/abis/MdexPoolABI.json";
import SushiPoolABI from "~/web3/abis/SushiPoolABI.json";
import SushiSwapABI from "~/web3/abis/SushiSwap.json";
import MiningABI from "~/web3/abis/MiningABI.json";
import CandyABI from "~/web3/abis/CandyABI.json";
import GovernanceABI from "~/web3/abis/Governance.json";
import DepositeABI from "~/web3/abis/deposite_abi.json";
import ApproveABI from "~/web3/abis/IPancakePair.json";
import { Contract } from "ethers-multicall-x";
import Web3 from "web3";
import {
  CakePerBlock,
  Reward,
  SushiPerBlock,
  BalanceOf,
  getPoolTokens,
} from "~/interface/read_contract.js";
import {
  toWei,
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
} from "~/web3/index.js";
export const DaoPoolList = [
  {
    StakeABI: GovernanceABI,
    PoolABI: GovernanceABI,
    StakeMethods: "stakeAndVote",
    WithDrawMethods: "getReward",
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    // CanClaim2Methods: "earned2",
    RewardPerMethods: "rewardPerToken",
    ExitMethods: "exit",

    Key: "HELEMT",
    Router: "link1",
    StartTime: "2021/11/02 00:00 UTC+8",
    FinishTime: "2021/11/22 00:00 UTC+8",
    PropoaslID: 1,
    PoolName: "Helmet Mining & Vote",
    PoolAddress: "0x4E18F9Ed49ad3d3fDdadE4d1464ED71133AA1EAC",
    PoolType: "compound",
    StakeUnit: "HELMET",
    StakeDecimals: 18,
    StakeSymbol: "HELMET",
    StakeAddress: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    RewardSymbol: "helmet",
    RewardVolume: "one",
    HaveReward1: true,
    Reward1Decimals: 18,
    Reward1Symbol: "HELMET",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Compound: true,
    ImgReward: true,
    NoProxy: false,
    YearEarnType: "APY",
    APR: "--",
    APY: "--",
  },
];
export const LptPoolList = [
  {
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    ProxyABI: MdexPoolABI,
    StakeMethods: "stake",
    CanWithDrawMethods: "balanceOf",
    WithDrawMethods: "getDoubleReward",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",
    PerBlockMethods: "reward",

    PoolName: "HELMET-BNB MLP",
    PoolSwap: "mdx",
    PoolType: "lpt",
    PoolAddress: "0xD86577ea62FE1FD2cA0Be583c1A0ecf25F4FbF2B",
    ProxyPid: "0x38",
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
    ImgReward: true,
    IsIIO: false,
    IsCombo: false,
    NoProxy: false,
    HaveOnePager: false,
    YearEarnType: "APR",
    APR: "--",
    JumpLink1:
      "<a href='https://bsc.mdex.com/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='mdx'></i>Get HELMET-BNB MLP</a>",
  },
  {
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    ProxyABI: CakePoolABI,
    StakeMethods: "stake",
    CanWithDrawMethods: "balanceOf",
    WithDrawMethods: "getReward",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",
    PerBlockMethods: "cakePerBlock",

    PoolName: `HELMET-BNB LPT`,
    PoolSwap: "pancake",
    PoolType: "lpt",
    PoolAddress: "0xA21B692B92Bbf0E34334f1548a0b51837CDDD0Bb",
    ProxyPid: "0x11e",
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
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    HaveReward2: false,
    Reward2Decimals: 18,
    Reward2Symbol: "CAKE",
    Reward2Address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    ImgReward: true,
    IsCombo: false,
    IsIIO: false,
    NoProxy: false,
    HaveOnePager: false,
    YearEarnType: "APR",
    APR: "--",
    JumpLink1:
      "<a href='https://exchange.pancakeswap.finance/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-BNB LPT(V2)</a>",
  },

  {
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    ProxyABI: SushiPoolABI,
    StakeMethods: "stake",
    CanWithDrawMethods: "balanceOf",
    WithDrawMethods: "getDoubleReward",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",
    PerBlockMethods: "sushiPerBlock",

    PoolName: `HELMET-BNB LPT`,
    PoolSwap: "acsi",
    PoolType: "lpt",
    PoolTokens:
      "0x86ddc49f66fa166e72e650a72752b43ce23ecbe500020000000000000000000b",
    PoolAddress: "0x1ECc83c300bCe18Ab7452aE2C4c78fc4BBf04c66",
    ProxyPid: "0x86ddc49f66fa166e72e650a72752b43ce23ecbe5",
    ProxySwap: "SUSHI",
    ProxyAddress: "0x0C3B6058c25205345b8f22578B27065a7506671C",
    StakeSymbol: "HELMET-BNB LPT",
    StakeUnit: "LPT",
    StakeDecimals: 18,
    StakeAddress: "0x86ddc49f66fa166e72e650a72752b43ce23ecbe5",
    StartTime: "Ongoing",
    FinishTime: "Mining",
    LptToken1Decimals: 18,
    LptToken1Symbol: "HELMET",
    LptToken1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    LptToken2Decimals: 18,
    LptToken2Symbol: "WBNB",
    LptToken2Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    RewardVolume: "two",
    RewardSymbol: "helmet_acsi",
    HaveReward1: true,
    Reward1Decimals: 18,
    Reward1Symbol: "HELMET",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    HaveReward2: true,
    Reward2Decimals: 18,
    Reward2Symbol: "ACSI",
    Reward2Address: "0x5b17b4d5e4009b5c43e3e3d63a5229f794cba389",
    ImgReward: true,
    IsCombo: false,
    IsIIO: false,
    NoProxy: false,
    HaveOnePager: false,
    YearEarnType: "APR",
    JumpLink1:
      "<a href='https://app.acsi.finance/#/pool/0x86ddc49f66fa166e72e650a72752b43ce23ecbe500020000000000000000000b' target='_blank'>From <i class='acsi'></i>Get HELMET-BNB LPT</a>",
  },
  {
    StakeABI: MiningABI,
    PoolABI: CakePoolABI,
    ProxyABI: CakePoolABI,
    CanWithDrawMethods: "userInfo",
    StakeMethods: "deposit",
    WithDrawMethods: "withdraw",
    CanClaim1Methods: "pendingCake",
    CanClaim2Methods: "pendingCake",
    ExitMethods: "withdraw",
    PerBlockMethods: "cakePerBlock",

    PoolName: `HELMET-BNB CAFE LP`,
    PoolSwap: "cafeswap",
    PoolType: "lpt",
    PoolAddress: "0xc772955c33088a97d56d0bbf473d05267bc4febb",
    ProxyPid: "53",
    ProxySwap: "PANCAKE",
    ProxyAddress: "0xc772955c33088a97d56d0bbf473d05267bc4febb",
    StakeUnit: "LP",
    StakeDecimals: 18,
    StakeSymbol: "HELMET-BNB LPT",
    StakeAddress: "0x02258ea659a30cc61a2a33bb85c1bba5d1ce216a",
    StartTime: "Ongoing",
    FinishTime: "Mining",
    LptToken1Decimals: 18,
    LptToken1Symbol: "HELMET",
    LptToken1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    LptToken2Decimals: 18,
    LptToken2Symbol: "BREW",
    LptToken2Address: "0x790be81c3ca0e53974be2688cdb954732c9862e1",
    RewardVolume: "one",
    RewardSymbol: "brew",
    HaveReward1: false,
    Reward1Decimals: 18,
    Reward1Symbol: "HELMET",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    HaveReward2: true,
    Reward2Decimals: 18,
    Reward2Symbol: "BREW",
    Reward2Address: "0x790be81c3ca0e53974be2688cdb954732c9862e1",

    ImgReward: true,
    IsCombo: false,
    IsIIO: false,
    NoProxy: true,
    HaveOnePager: false,
    YearEarnType: "APR",
    Only: true,
    JumpLink1:
      "<a href='https://dex.cafeswap.finance/#/add/ETH/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='cafeswap'></i>Get HELMET-BNB CAFE LP</a>",
  },
  {
    StakeABI: MiningABI,
    PoolABI: XmsPoolABI,
    ProxyABI: XmsPoolABI,
    StakeMethods: "deposit",
    WithDrawMethods: "withdraw",
    CanWithDrawMethods: "userInfo",
    CanClaim1Methods: "pendingXMS",
    CanClaim2Methods: "pendingXMS",
    PerBlockMethods: "xmsPerBlock",

    ExitMethods: "withdraw",
    PoolName: `HELMET-BNB MLP`,
    PoolSwap: "xms",
    PoolType: "lpt",
    PoolAddress: "0xc7B8285a9E099e8c21CA5516D23348D8dBADdE4a",
    ProxyPid: "2",
    ProxySwap: "XMS",
    ProxyAddress: "0xc7B8285a9E099e8c21CA5516D23348D8dBADdE4a",
    StakeUnit: "MLP",
    StakeDecimals: 18,
    StakeSymbol: "HELMET-BNB MLP",
    StakeAddress: "0x2dd0c55bd1ad840cd73da3abd420b3199312e7d4",
    StartTime: "Ongoing",
    FinishTime: "Mining",
    LptToken1Decimals: 18,
    LptToken1Symbol: "HELMET",
    LptToken1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    LptToken2Decimals: 18,
    LptToken2Symbol: "XMS",
    LptToken2Address: "0x7859b01bbf675d67da8cd128a50d155cd881b576",
    RewardVolume: "one",
    RewardSymbol: "xms",
    HaveReward1: false,
    Reward1Decimals: 18,
    Reward1Symbol: "HELMET",
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    HaveReward2: true,
    Reward2Decimals: 18,
    Reward2Symbol: "XMS",
    Reward2Address: "0x7859b01bbf675d67da8cd128a50d155cd881b576",
    ImgReward: true,
    IsCombo: false,
    IsIIO: false,
    NoProxy: true,
    HaveOnePager: false,
    YearEarnType: "APR",
    Only: true,
    Tips: true,
    JumpLink1:
      "<a href='https://app.marsecosystem.com/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='xms'></i>Get HELMET-BNB MLP</a>",
  },
  {
    PoolName: `GUARD-USDC LPT`,
    PoolSwap: "quick",
    StakeSymbol: "GUARD-USDC LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "guard_quick",
    ImgReward: true,
    StartTime: "Ongoing",
    FinishTime: "Mining",
    YearEarnType: "APR",
    APR: "305.78%",
    PoolType: "link",
    PoolImg: "polygon_link",
    BtnText: "Mining on Polygon",
    BtnColor: "rgba(221, 200, 255, 0.6)",
    BtnTextColor: "#9F66FF",
    Right: "right_double",
    Link: "https://www.guard.insure/mining",
  },

  // {
  //   PoolName: `HELMET-BNB LP`,
  //   PoolSwap: "xms",
  //   StakeSymbol: "HELMET-BNB LP",
  //   StakeUnit: "LPT",
  //   RewardVolume: "one",
  //   RewardSymbol: "xms",
  //   ImgReward: true,
  //   StartTime: "Ongoing",
  //   FinishTime: "Mining",
  //   YearEarnType: "APR",
  //   APR: "--",
  //   PoolType: "link",
  //   PoolImg: "xms_link",
  //   BtnText: "To Mars",
  //   BtnColor: "rgba(255, 209, 179, 0.6)",
  //   BtnTextColor: "#FF6400",
  //   Right: "right_double1",
  //   Link: "https://app.marsecosystem.com/farms",
  // },
];
export const TokenPoolList = [
  {
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    StakeMethods: "stakeAndCompound",
    WithDrawMethods: "getReward",
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",

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
    Flash: false,
    YearEarnType: "APR",
    Compound: true,
    HaveOnePager: false,
    Reward1Symbol: "HELMET",
    PoolAddress: "0x279a073c491c873df040b05cc846a3c47252b52c",
    StakeAddress: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    HaveReward1: true,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    PoolType: "compound",
    DailyReward: 22471,
    APR: "--",
    APY: "--",
  },
  {
    Key: "LPTBABY",
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    ProxyABI: CakePoolABI,
    StakeMethods: "stake",
    CanWithDrawMethods: "balanceOf",
    WithDrawMethods: "getReward",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",
    PerBlockMethods: "cakePerBlock",
    PoolName: `HELMET-USDT LPT`,
    PoolSwap: "babyswap",
    PoolType: "lpt",
    PoolAddress: "0x50a9C123536e69290a5dAb32ce514D0b9afcaDCc",
    ProxyPid: "33",
    ProxySwap: "PANCAKE",
    ProxyAddress: "0xdfaa0e08e357db0153927c7eabb492d1f60ac730",
    StakeUnit: "LPT",
    StakeDecimals: 18,
    StakeSymbol: "HELMET-USDT LPT",
    StakeAddress: "0xdB4d03b1659fe7FAD33F840de481773A629d256b",
    StartTime: "Ongoing",
    FinishTime: "2021/10/21 01:00 UTC+8",
    LptToken1Decimals: 18,
    LptToken1Symbol: "HELMET",
    LptToken1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    LptToken2Decimals: 18,
    LptToken2Symbol: "USDT",
    LptToken2Address: "0x55d398326f99059ff775485246999027b3197955",
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
    NoProxy: false,
    HaveOnePager: false,
    YearEarnType: "APR",
    APR: "--",
    JumpLink1:
      "<a href='https://exchange.babyswap.finance/#/add/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8/0x55d398326f99059fF775485246999027B3197955' target='_blank'>From <i class='babyswap'></i>Get HELMET-USDT LPT</a>",
  },
  {
    StakeABI: CandyABI,
    PoolABI: CandyABI,
    StakeMethods: "stake",
    WithDrawMethods: "getReward",
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",

    Key: "KALA",
    PoolName: "KALA POOL",
    StakeSymbol: "HELMET",
    StakeUnit: "HELMET",
    RewardVolume: "one",
    RewardSymbol: "kala",
    ImgReward: true,
    StartTime: "2021/09/21 01:00 UTC+8",
    FinishTime: "2021/10/21 01:00 UTC+8",
    IsCombo: false,
    IsPartner: true,
    Flash: false,
    YearEarnType: "APR",
    Compound: false,
    HaveOnePager: false,
    Reward1Symbol: "KALA",
    PoolAddress: "0x4dFeCeE12bd7cA3899D26643F20C79F4a2147EBf",
    StakeAddress: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    HaveReward1: true,
    Reward1Address: "0x32299c93960bb583a43c2220dc89152391a610c5",
    StakeDecimals: 18,
    Reward1Decimals: 18,
    PoolType: "candy",
    DailyReward: 1000,
    Max: 1000,
    APR: "--",
  },
  {
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    StakeMethods: "stake",
    WithDrawMethods: "getDoubleReward",
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",

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
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "MCRN",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0xacb2d47827c9813ae26de80965845d80935afd0b",
    Reward1Volume: 28270,
    Reward2Volume: 2740,
    PoolProcess: 14,
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
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    StakeMethods: "stake",
    WithDrawMethods: "getDoubleReward",
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",

    Key: "HELMETWIZARD",
    PoolName: "HELMET-<i>hWIZARD</i> LPT",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
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
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "WIZARD",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18",
    Reward1Volume: 60280,
    Reward2Volume: 6670,
    PoolProcess: 14,
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
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    StakeMethods: "stake",
    WithDrawMethods: "getDoubleReward",
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",

    Key: "HELMETARGON",
    PoolName: "HELMET-<i>hARGON</i> LPT",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
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
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "ARGON",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x851f7a700c5d67db59612b871338a85526752c25",
    Reward1Volume: 35000,
    Reward2Volume: 350000,
    PoolProcess: 15,
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
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    StakeMethods: "stake",
    WithDrawMethods: "getDoubleReward",
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",

    Key: "HELMETBMXX",
    PoolName: "HELMET-<i>hBMXX</i> LPT",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
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
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "BMXX",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x4131b87f74415190425ccd873048c708f8005823",
    Reward1Volume: 37500,
    Reward2Volume: 3272.46,
    PoolProcess: 13,
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
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    StakeMethods: "stake",
    WithDrawMethods: "getDoubleReward",
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",

    Key: "HELMETBABY",
    PoolName: "HELMET-<i>hBABY</i> LPT",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
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
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "BABY",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657",
    Reward1Volume: 37500,
    Reward2Volume: 158931,
    PoolProcess: 13,
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
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    StakeMethods: "stake",
    WithDrawMethods: "getDoubleReward",
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",

    Key: "HELMETMTRG",
    PoolName: "HELMET-<i>hMTRG</i> LPT",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
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
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "MTRG",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0xBd2949F67DcdC549c6Ebe98696449Fa79D988A9F",
    Reward1Volume: 25000,
    Reward2Volume: 2767,
    PoolProcess: 9,
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
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    StakeMethods: "stake",
    WithDrawMethods: "getDoubleReward",
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",

    Key: "HELMETWINGS",
    PoolName: "HELMET-<i>hWINGS</i> LPT",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
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
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "WINGS",
    Reward1Decimals: 18,
    Reward2Decimals: 18,
    Reward1Address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    Reward2Address: "0x0487b824c8261462f88940f97053e65bdb498446",
    Reward1Volume: 30000,
    Reward2Volume: 4500,
    PoolProcess: 14,
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
    StakeABI: MiningABI,
    PoolABI: MiningABI,
    StakeMethods: "stake",
    WithDrawMethods: "getDoubleReward",
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    ExitMethods: "exit",

    Key: "BHELMETDODO",
    PoolName: "HELMET-BNB DLP",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
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
    HaveReward1: true,
    HaveReward2: true,
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
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    Key: "BHELMETxBURGER",
    PoolName: "HELMET-<i>hxBURGER</i> BLP",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
    StakeMethods: "stake",
    StakeSymbol: "HELMET-hxBURGER BLP",
    StakeUnit: "BLP",
    RewardVolume: "two",
    RewardSymbol: "bhelmet_xburger",
    WithDrawMethods: "getDoubleReward",
    ImgReward: true,
    StartTime: "2021/05/02 12:00 UTC+8",
    FinishTime: "2021/05/22 00:00 UTC+8",
    IsCombo: true,
    Flash: false,
    YearEarnType: "APR",
    HaveOnePager: "hxBURGER",
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "BHELMET",
    Reward2Symbol: "xBURGER",
    ExitMethods: "exit",
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
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    Key: "FEIQFEI",
    PoolName: "FEI(BSC) POOL",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
    StakeMethods: "stake",
    StakeSymbol: "FEI",
    StakeUnit: "FEI",
    RewardVolume: "one",
    RewardSymbol: "QFEI",
    WithDrawMethods: "getReward",
    ImgReward: false,
    StartTime: "2021/04/10 00:00 UTC+8",
    FinishTime: "2021/04/17 00:00 UTC+8",
    SERIAL_FLAG: true,
    YearEarnType: "APR",
    HaveOnePager: false,
    HaveReward1: true,
    Reward1Symbol: "QFEI",
    ExitMethods: "exit",
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
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    Key: "KUN",
    PoolName: "<i>QFEI</i>-QSD DLP",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
    StakeMethods: "stake",
    StakeSymbol: "QFEI-QSD DLP",
    StakeUnit: "DPT",
    RewardVolume: "one",
    RewardSymbol: "kun",
    WithDrawMethods: "getReward",
    ImgReward: true,
    StartTime: "2021/04/12 00:00 UTC+8",
    FinishTime: "2021/05/02 00:00 UTC+8",
    SERIAL_NEXT_FLAG: true,
    YearEarnType: "APR",
    HaveOnePager: "QFEI",
    Reward1Symbol: "KUN",
    HaveReward1: true,
    ExitMethods: "exit",
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
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    Key: "QHELMET",
    PoolName: "HELMET-KUN DLP",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
    StakeMethods: "stake",
    StakeSymbol: "HELMET-KUN DLP",
    StakeUnit: "DPT",
    RewardVolume: "one",
    RewardSymbol: "QHELMET",
    WithDrawMethods: "getReward",
    ImgReward: false,
    StartTime: "2021/04/21 00:00 UTC+8",
    FinishTime: "2021/05/10 00:00 UTC+8",
    SERIAL_NEXT_FLAG: true,
    YearEarnType: "APR",
    HaveReward1: true,
    HaveOnePager: false,
    Reward1Symbol: "QHELMET",
    ExitMethods: "exit",
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
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    Key: "HELMETCAKE",
    PoolName: `HELMET-BNB LPT`,
    PoolABI: MiningABI,
    StakeABI: MiningABI,
    StakeMethods: "stake",
    StakeSymbol: "HELMET-BNB LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_cake_v1",
    WithDrawMethods: "getDoubleReward",
    ImgReward: true,
    FinishTime: "Mining",
    StartTime: "",
    FinishTime: "2021/04/25 17:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: false,
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "CAKE",
    ExitMethods: "exit",
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
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    Key: "HELMETDODO",
    PoolName: "HELMET-<i>hDODO</i> DLP",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
    StakeMethods: "stake",
    StakeSymbol: "HELMET-hDODO DLP",
    StakeUnit: "DPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_dodo",
    WithDrawMethods: "getDoubleReward",
    ImgReward: true,
    FinishTime: "Mining",
    StartTime: "",
    FinishTime: "2021/04/10 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hDODO",
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "DODO",
    ExitMethods: "exit",
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
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    Key: "HELMETFOR",
    PoolName: "HELMET-<i>hFOR</i> LPT",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
    StakeMethods: "stake",
    StakeSymbol: "HELMET-hFOR LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_for",
    WithDrawMethods: "getDoubleReward",
    ImgReward: true,
    FinishTime: "Mining",
    StartTime: "",
    FinishTime: "2021/03/20 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hFOR",
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "FOR",
    ExitMethods: "exit",
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
    CanWithDrawMethods: "balanceOf",
    CanClaim1Methods: "earned",
    CanClaim2Methods: "earned2",
    Key: "HELMETBURGER",
    PoolName: "HELMET-<i>hBURGER</i> LPT",
    PoolABI: MiningABI,
    StakeABI: MiningABI,
    StakeMethods: "stake",
    StakeSymbol: "HELMET-hBURGER LPT",
    StakeUnit: "LPT",
    RewardVolume: "two",
    RewardSymbol: "helmet_burger",
    WithDrawMethods: "getDoubleReward",
    ImgReward: true,
    FinishTime: "Mining",
    StartTime: "",
    FinishTime: "2021/03/07 00:00 UTC+8",
    IsCombo: true,
    YearEarnType: "APR",
    HaveOnePager: "hBURGER",
    HaveReward1: true,
    HaveReward2: true,
    Reward1Symbol: "HELMET",
    Reward2Symbol: "BURGER",
    ExitMethods: "exit",
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
      ItemPool.Status = 1;
      if (StartTime !== "Ongoing" && FinishTime !== "Mining") {
        ItemPool.ShowTime = getShowTime(FixStartTime);
      } else {
        ItemPool.ShowTime = "Ongoing";
      }
    }
    if (PoolStarted && !PoolFinished) {
      ItemPool.Status = 2;
      if (StartTime !== "Ongoing" && FinishTime !== "Mining") {
        ItemPool.ShowTime = getShowTime(FixFinishTime);
      }
    }
    if (PoolFinished) {
      ItemPool.Status = 3;
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
export const getComboAPR = async (PoolData) => {
  if (PoolData.Status !== 2) {
    return;
  }
  const Reward1Address = PoolData.Reward1Address;
  const Reward2Address = PoolData.Reward2Address;
  const StakeAddress = PoolData.StakeAddress;
  const PoolAddress = PoolData.PoolAddress;
  const Reward2Decimals = PoolData.Reward2Decimals;
  const PoolProcess = PoolData.PoolProcess;
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
export const getLptAPR = async (PoolData) => {
  const SushiFarm = "0xa82f327BBbF0667356D2935C6532d164b06cEced";
  const HelmetFarm = "0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699";
  const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const BNBAddress = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
  const USDTAddress = "0x55d398326f99059ff775485246999027b3197955";
  const HelmetDecimals = 18;
  const {
    PoolSwap,
    PoolAddress,
    PoolTokens,
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
    PerBlockMethods,
  } = PoolData;
  const PoolContracts = new Contract(PoolAddress, MiningABI);
  const StakeContracts = new Contract(StakeAddress, MiningABI);
  const HelmetContracts = new Contract(HelmetAddress, MiningABI);
  const SuShiContracts = new Contract(SushiFarm, SushiSwapABI);
  const ProxyContracts = new Contract(ProxyAddress, ProxyABI);
  const ApproveContracts = new Contract(HelmetAddress, ApproveABI.abi);
  const Amount1 = toWei("1", Reward1Decimals);
  const Amount2 = toWei("1", Reward2Decimals);
  const web3 = new Web3(
    window.ethereum ||
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
  );
  const BlockNumber = await new web3.eth.getBlockNumber();
  const Data1 = await getTokenPrice({
    fromTokenAddress: Reward1Address,
    toTokenAddress: USDTAddress,
    amount: Amount1,
  });
  const Data2 = await getTokenPrice({
    fromTokenAddress: Reward2Address,
    toTokenAddress: USDTAddress,
    amount: Amount2,
  });
  const Reward1USDTPrice = fromWei(Data1.data.toTokenAmount);
  const Reward2USDTPrice = fromWei(Data2.data.toTokenAmount);
  if (Reward1USDTPrice && Reward2USDTPrice) {
    let PreBlockParams = ProxySwap === "MDEX" ? [BlockNumber] : [];
    let PromiseList = [
      PoolSwap === "acsi"
        ? SuShiContracts.getPoolTokens(PoolTokens)
        : HelmetContracts.balanceOf(StakeAddress),
      ProxyContracts[PerBlockMethods](...PreBlockParams),
      StakeContracts.balanceOf(ProxyAddress),
      StakeContracts.totalSupply(),
      ProxyContracts.totalAllocPoint(),
      ProxyContracts.poolInfo(ProxyPid),
    ];
    if (HaveReward1) {
      PromiseList.push(
        ApproveContracts.allowance(HelmetFarm, PoolAddress),
        PoolContracts.rewards("0x0000000000000000000000000000000000000000"),
        PoolContracts.rewardsDuration()
      );
    }
    const MulticallProvider = getOnlyMultiCallProvider();
    return MulticallProvider.all(PromiseList).then((res) => {
      const FixData = processResult(res);
      const [
        StakeValue,
        PerBlock,
        StakeVolume,
        LptVolume,
        TotalAllocPoint,
        PoolInfo,
        TotalReward1,
        OutPutReward1,
        Reward1Time,
      ] = FixData;
      const FixStakeValue =
        PoolSwap === "acsi"
          ? fromWei(StakeValue[1][0]) * 2
          : fromWei(StakeValue) * 2;
      const FixPerBlock = fromWei(PerBlock);
      const FixStakeVolume = fromWei(StakeVolume, StakeDecimals);
      const FixLptVolume = fromWei(LptVolume, StakeDecimals);
      const FixTotalAllocPoint = fromWei(TotalAllocPoint, 18);
      const FixAllocPoint = fromWei(PoolInfo[1], 18);
      const FixTotalReward1 = HaveReward1
        ? fromWei(TotalReward1, Reward1Decimals)
        : 0;
      const FixOutPutReward1 = HaveReward1
        ? fromWei(OutPutReward1, Reward1Decimals)
        : 0;
      const FixReward1Time = HaveReward1 ? Reward1Time / 86400 : 0;
      // ------------------------------------------ //
      console.log(FixTotalReward1, FixOutPutReward1, FixReward1Time, PoolData);
      const Reward1Daily = HaveReward1
        ? (FixTotalReward1 - FixOutPutReward1) / FixReward1Time
        : 0;
      const Reward2Daily =
        (FixAllocPoint / FixTotalAllocPoint) * (FixPerBlock * 28800);
      const FixReward1Daily = Reward1Daily > 0 ? Reward1Daily : 0;
      const FixReward2Daily = Reward2Daily > 0 ? Reward2Daily : 0;

      const NumberatorReward1 = 365 * Reward1USDTPrice * FixReward1Daily;
      const NumberatorReward2 = 365 * Reward2USDTPrice * FixReward2Daily;
      const DenominatorReward1 = FixStakeValue * Reward1USDTPrice;
      const DenominatorReward2 =
        ((FixStakeValue * Reward1USDTPrice) / FixLptVolume) * FixStakeVolume;
      const YearReward1 = NumberatorReward1 / DenominatorReward1;
      const YearReward2 = NumberatorReward2 / DenominatorReward2;
      const APR =
        fixD((Number(YearReward1) + Number(YearReward2)) * 100, 2) + "%";
      return (PoolData.APR = APR);
    });
  } else {
    PoolData.APR = "--";
    return;
  }
};
export const getAPRAndAPY = async (PoolData) => {
  let { PoolAddress, StakeDecimals, Reward1Decimals } = PoolData;
  const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const HelmetFarm = "0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699";
  const PoolContracts = new Contract(PoolAddress, MiningABI);
  const ApproveContracts = new Contract(HelmetAddress, ApproveABI.abi);
  const PromiseList = [
    PoolContracts.totalSupply(),
    ApproveContracts.allowance(HelmetFarm, PoolAddress),
    PoolContracts.rewards("0x0000000000000000000000000000000000000000"),
    PoolContracts.periodFinish(),
  ];
  const MulticallProvider = getOnlyMultiCallProvider();
  return MulticallProvider.all(PromiseList).then((res) => {
    const FixData = processResult(res);
    let [TotalStakeVolume, TotalReward, OutPutReward, RewardTime] = FixData;
    const FixTotalStakeVolume = fromWei(TotalStakeVolume, StakeDecimals);
    const FixTotalReward = fromWei(TotalReward, Reward1Decimals);
    const FixOutPutReward = fromWei(OutPutReward, Reward1Decimals);
    const FixRewardTime = (RewardTime - Date.now() / 1000) / 86400;
    console.log(FixTotalReward, FixOutPutReward, FixRewardTime);
    const RewardDaily = (FixTotalReward - FixOutPutReward) / FixRewardTime;
    const RewardValues = 1 + RewardDaily / FixTotalStakeVolume;
    console.log(RewardDaily);
    const APR = fixD((RewardDaily / FixTotalStakeVolume) * 365 * 100, 2) + "%";
    const APY = fixD(Math.pow(RewardValues, 365) * 100, 2) + "%";
    return (PoolData.APR = APR), (PoolData.APY = APY);
  });
};
export const getCandyAPR = async (PoolData) => {
  if (!PoolData.Status != 2) {
    return (PoolData.APR = "--");
  }
  const HELMETAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const USDTAddress = "0x55d398326f99059ff775485246999027b3197955";
  const {
    PoolAddress,
    StakeDecimals,
    DailyReward,
    Reward1Address,
    Reward1Decimals,
  } = PoolData;
  const PoolContracts = new Contract(PoolAddress, MiningABI);
  const Amount = toWei("1");
  const Amount1 = toWei("1", Reward1Decimals);
  const Data = await getTokenPrice({
    fromTokenAddress: HELMETAddress,
    toTokenAddress: USDTAddress,
    amount: Amount,
  });
  const Data1 = await getTokenPrice({
    fromTokenAddress: Reward1Address,
    toTokenAddress: USDTAddress,
    amount: Amount1,
  });
  const HelmetUsdtPrice = fromWei(Data.data.toTokenAmount);
  const Reward1UsdtPrice = fromWei(Data1.data.toTokenAmount);
  const PromiseList = [PoolContracts.totalSupply()];
  const MulticallProvider = getOnlyMultiCallProvider();
  return MulticallProvider.all(PromiseList).then((res) => {
    const FixData = processResult(res);
    let [TotalStakeVolume] = FixData;
    const FixTotalStakeVolume = fromWei(TotalStakeVolume, StakeDecimals);
    const APR =
      fixD(
        ((DailyReward * 365 * Reward1UsdtPrice) /
          (FixTotalStakeVolume * HelmetUsdtPrice)) *
          100,
        2
      ) + "%";
    return (PoolData.APR = APR);
  });
};
