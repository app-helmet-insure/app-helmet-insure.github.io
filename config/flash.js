import { getTokenPrice } from "~/interface/request.js";
import { fixD } from "~/assets/js/util.js";
import MiningABI from "~/web3/abis/MiningABI.json";
import { Contract } from "ethers-multicall-x";
import {
  toWei,
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
} from "~/web3/index.js";
import { pancakeswapv2 } from "~/assets/utils/pancakeswapv2.js";
export const PoolList = [
  {
    Key: "BNB1000WAR",
    PoolName: "<i>hWAR</i> Pool",
    PoolDesc: "By BNB1000-Helmet LPT",
    StakeSymbol: "BNB1000-Helmet LPT",
    RewardSymbol: "hWAR",
    OneLpSymbol: "BNB1000",
    StartTime: "2021/11/18 00:00 UTC+8",
    FinishTime: "2021/11/28 00:00 UTC+8",
    PoolAddress: "0xc72F05e42f930Ea4Fb04153037d259cf5fA8d4C8",
    StakeAddress: "0x6ab0dc257191fb57ced1ffc2aca5e112b0112274",
    RewardAddress: "0x4c5a3711d2032067f4b3d3c7d7316a738a47bf1f",
    OneLpAddress: "0x7aae192b83589784851a7df13c225fda2e3d87c5",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "PANCAKEV2",
    TotalRewards: 60000,
    PoolProcess: 10,
    LeftShowToken: {
      AddTokenSymbol: "BNB1000",
      AddTokenAddress: "0x7aae192b83589784851a7df13c225fda2e3d87c5",
      AddTokenDecimals: 13,
    },
    RightShowToken: {
      AddTokenSymbol: "hWAR",
      AddTokenAddress: "0x4c5a3711d2032067f4b3d3c7d7316a738a47bf1f",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
  {
    Key: "SHIBARGON",
    PoolName: "<i>hARGON</i> Pool",
    PoolDesc: "By SHIBh-Helmet LPT",
    StakeSymbol: "SHIBh-Helmet LPT",
    RewardSymbol: "hARGON",
    OneLpSymbol: "SHIBh",
    StartTime: "2021/07/08 00:00 UTC+8",
    FinishTime: "2021/07/15 00:00 UTC+8",
    PoolAddress: "0x5A7c52e44D7406ae16C4F3ac1b5cd75BB775954d",
    StakeAddress: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
    RewardAddress: "0x4ce2d9804da7583c02f80fec087aea1d137214eb",
    OneLpAddress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "PANCAKEV2",
    TotalRewards: 125000,
    PoolProcess: 7,
    LeftShowToken: {
      AddTokenSymbol: "SHIBh",
      AddTokenAddress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
      AddTokenDecimals: 12,
    },
    RightShowToken: {
      AddTokenSymbol: "hARGON",
      AddTokenAddress: "0x4ce2d9804da7583c02f80fec087aea1d137214eb",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
  {
    Key: "SHIBBMXX",
    PoolName: "<i>hBMXX</i> Pool",
    PoolDesc: "By SHIBh-Helmet LPT",
    StakeSymbol: "SHIBh-Helmet LPT",
    RewardSymbol: "hBMXX",
    OneLpSymbol: "SHIBh",
    StartTime: "2021/06/30 00:00 UTC+8",
    FinishTime: "2021/07/13 00:00 UTC+8",
    PoolAddress: "0xA93f7bAbaf1A0e95dC472eb7cD37C59ed009c728",
    StakeAddress: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
    RewardAddress: "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44",
    OneLpAddress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "PANCAKEV2",
    TotalRewards: 3600,
    PoolProcess: 13,
    LeftShowToken: {
      AddTokenSymbol: "SHIBh",
      AddTokenAddress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
      AddTokenDecimals: 12,
    },
    RightShowToken: {
      AddTokenSymbol: "hBMXX",
      AddTokenAddress: "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
  {
    Key: "SHIBBABY",
    PoolName: "<i>hBABY</i> Pool",
    PoolDesc: "By SHIBh-Helmet LPT",
    StakeSymbol: "SHIBh-Helmet LPT",
    RewardSymbol: "hBABY",
    OneLpSymbol: "SHIBh",
    StartTime: "2021/06/25 00:00 UTC+8",
    FinishTime: "2021/07/08 00:00 UTC+8",
    PoolAddress: "0x475e5A97cA24278E820F93A5423cc1F613658466",
    StakeAddress: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
    RewardAddress: "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624",
    OneLpAddress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "PANCAKEV2",
    TotalRewards: 140000,
    PoolProcess: 13,
    LeftShowToken: {
      AddTokenSymbol: "SHIBh",
      AddTokenAddress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
      AddTokenDecimals: 12,
    },
    RightShowToken: {
      AddTokenSymbol: "hBABY",
      AddTokenAddress: "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
  {
    Key: "SHIBMTRG",
    PoolName: "<i>hMTRG</i> Pool",
    PoolDesc: "By SHIBh-Helmet LPT",
    StakeSymbol: "SHIBh-Helmet LPT",
    RewardSymbol: "hMTRG",
    OneLpSymbol: "SHIBh",
    StartTime: "2021/06/24 00:00 UTC+8",
    FinishTime: "2021/07/01 00:00 UTC+8",
    PoolAddress: "0x784a1507c2D2e90C3842929E06625b0D4e881071",
    StakeAddress: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
    RewardAddress: "0xa561926e81decb74b3d11e14680b3f6d1c5012bd",
    OneLpAddress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "PANCAKEV2",
    TotalRewards: 8000,
    PoolProcess: 7,
    LeftShowToken: {
      AddTokenSymbol: "SHIBh",
      AddTokenAddress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
      AddTokenDecimals: 12,
    },
    RightShowToken: {
      AddTokenSymbol: "hMTRG",
      AddTokenAddress: "0xa561926e81decb74b3d11e14680b3f6d1c5012bd",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
  {
    Key: "SHIBWINGS",
    PoolName: "<i>hWINGS</i> Pool",
    PoolDesc: "By SHIBh-Helmet LPT",
    StakeSymbol: "SHIBh-Helmet LPT",
    RewardSymbol: "hWINGS",
    OneLpSymbol: "SHIBh",
    StartTime: "2021/06/11 00:00 UTC+8",
    FinishTime: "2021/06/25 00:00 UTC+8",
    PoolAddress: "0x1CaB756c4B46B44a3012E74F1023ae972c1b1b60",
    StakeAddress: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
    RewardAddress: "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026",
    OneLpAddress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "PANCAKEV2",
    TotalRewards: 7500,
    PoolProcess: 14,
    LeftShowToken: {
      AddTokenSymbol: "SHIBh",
      AddTokenAddress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
      AddTokenDecimals: 12,
    },
    RightShowToken: {
      AddTokenSymbol: "hWINGS",
      AddTokenAddress: "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
  {
    Key: "TPTBURGER",
    PoolName: "<i>hxBURGER</i> Pool",
    PoolDesc: "By hTPT-Helmet LPT",
    StakeSymbol: "hTPT-Helmet LPT",
    RewardSymbol: "hxBURGER",
    OneLpSymbol: "hTPT",
    StartTime: "2021/04/22 14:00 UTC+8",
    FinishTime: "2021/05/12 00:00 UTC+8",
    PoolAddress: "0x40052013B8c019E999276885467AC156e86Fd1bD",
    StakeAddress: "0x413da4890ab12b1a7e01d0bb7fc5cf6cadf5d565",
    RewardAddress: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
    OneLpAddress: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "BURGER",
    TotalRewards: 20000,
    PoolProcess: 20,
    LeftShowToken: {
      AddTokenSymbol: "hTPT",
      AddTokenAddress: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
      AddTokenDecimals: 4,
    },
    RightShowToken: {
      AddTokenSymbol: "hxBURGER",
      AddTokenAddress: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
  {
    Key: "DODOTPT",
    PoolName: "<i>hTPT</i> Pool",
    PoolDesc: "By hDODO-Helmet LPT",
    StakeSymbol: "hDODO-Helmet LPT",
    RewardSymbol: "hTPT",
    OneLpSymbol: "hDODO",
    StartTime: "2021/04/06 00:00 UTC+8",
    FinishTime: "2021/04/26 00:00 UTC+8",
    PoolAddress: "0xe71B586Be2c053E22a44556A7526B02428a943B0",
    StakeAddress: "0x762D63a230C4e1EB2673cB5C4FadC5B68b3074c7",
    RewardAddress: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
    OneLpAddress: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
    StakeDecimals: 18,
    RewardDecimals: 4,
    SwapType: "PANCAKEV1",
    TotalRewards: 2000000,
    PoolProcess: 20,
    LeftShowToken: {
      AddTokenSymbol: "hDODO",
      AddTokenAddress: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "hTPT",
      AddTokenAddress: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
      AddTokenDecimals: 4,
    },
    APR: "--",
  },
  {
    Key: "MATHTPT",
    PoolName: "<i>hDODO</i> Pool",
    PoolDesc: "By hMATH-Helmet LPT",
    StakeSymbol: "hMATH-Helmet LPT",
    RewardSymbol: "hDODO",
    OneLpSymbol: "hMATH",
    StartTime: "2021/03/24 00:00 UTC+8",
    FinishTime: "2021/03/31 12:00 UTC+8",
    PoolAddress: "0xc68CB0a3c5Cab3C9521E124Eff97A503c45bE9E4",
    StakeAddress: "0xc840de3a061A73467bc98acD9A32aA3a281A380C",
    RewardAddress: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
    OneLpAddress: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "PANCAKEV1",
    TotalRewards: 40000,
    PoolProcess: 7,
    LeftShowToken: {
      AddTokenSymbol: "hMATH",
      AddTokenAddress: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "hTPT",
      AddTokenAddress: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
  {
    Key: "AUTOMATH",
    PoolName: "<i>hMATH</i> Pool",
    PoolDesc: "By hAUTO-Helmet LPT",
    StakeSymbol: "hAUTO-Helmet LPT",
    RewardSymbol: "hMATH",
    OneLpSymbol: "hAUTO",
    StartTime: "2021/03/11 00:00 UTC+8",
    FinishTime: "2021/03/18 00:00 UTC+8",
    PoolAddress: "0x630179cd153a009b4b864A5A5a3Ac5A0E70804Da",
    StakeAddress: "0xB6F84EaD91Fb6d70B8f1E87759E7c95c440DD80C",
    RewardAddress: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
    OneLpAddress: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "PANCAKEV1",
    TotalRewards: 30000,
    PoolProcess: 7,
    LeftShowToken: {
      AddTokenSymbol: "hAUTO",
      AddTokenAddress: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "hMATH",
      AddTokenAddress: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
  {
    Key: "BNB500AUTO",
    PoolName: "<i>hAUTO</i> Pool",
    PoolDesc: "By BNB500-Helmet LPT",
    StakeSymbol: "BNB500-Helmet LPT",
    RewardSymbol: "hAUTO",
    OneLpSymbol: "BNB500",
    StartTime: "2021/03/02 00:00 UTC+8",
    FinishTime: "2021/03/09 00:00 UTC+8",
    PoolAddress: "0xe4a5d7cb5A9EbDC4370D0b4EBBd0C1656099b293",
    StakeAddress: "0x6A829c3870Ab4ce228Cdf359E6F72295ef472F9d",
    RewardAddress: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
    OneLpAddress: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "PANCAKEV1",
    TotalRewards: 10,
    PoolProcess: 7,
    LeftShowToken: {
      AddTokenSymbol: "BNB500",
      AddTokenAddress: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "hAUTO",
      AddTokenAddress: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
  {
    Key: "CTKBNB500",
    PoolName: "<i>BNB500</i> Pool",
    PoolDesc: "By hCTK-Helmet LPT",
    StakeSymbol: "hCTK-Helmet LPT",
    RewardSymbol: "BNB500",
    OneLpSymbol: "hCTK",
    StartTime: "2021/02/22 00:00 UTC+8",
    FinishTime: "2021/02/29 00:00 UTC+8",
    PoolAddress: "0x6F131e8e5a93ac3Ae71FDdbbE1122cB69AF9Fc71",
    StakeAddress: "0x9a6fCD063cA5a9bB31b9f8eE86eCB6476b981280",
    RewardAddress: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
    OneLpAddress: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "PANCAKEV1",
    TotalRewards: 1000,
    PoolProcess: 7,
    LeftShowToken: {
      AddTokenSymbol: "hCTK",
      AddTokenAddress: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
      AddTokenDecimals: 6,
    },
    RightShowToken: {
      AddTokenSymbol: "BNB500",
      AddTokenAddress: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
  {
    Key: "HCCTCTK",
    PoolName: "<i>hCTK</i> Pool",
    PoolDesc: "By HCCT-Helmet LPT",
    StakeSymbol: "HCCT-Helmet LPT",
    RewardSymbol: "hCTK",
    OneLpSymbol: "HCCT",
    StartTime: "2021/02/21 00:00 UTC+8",
    FinishTime: "2021/02/28 00:00 UTC+8",
    PoolAddress: "0xaF0e8747FA54b3E000FF1a0F87AF2DB4F1B7Fd87",
    StakeAddress: "0xcBbD24DBbF6a487370211bb8B58C3b43C4C32b9E",
    RewardAddress: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
    OneLpAddress: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
    StakeDecimals: 18,
    RewardDecimals: 6,
    SwapType: "PANCAKEV1",
    TotalRewards: 70000,
    PoolProcess: 7,
    LeftShowToken: {
      AddTokenSymbol: "HCCT",
      AddTokenAddress: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "hCTK",
      AddTokenAddress: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
      AddTokenDecimals: 6,
    },
    APR: "--",
  },
  {
    Key: "LONGHCCT",
    PoolName: "<i>HCCT</i> Pool",
    PoolDesc: "By LONG-Helmet LPT",
    StakeSymbol: "LONG-Helmet LPT",
    RewardSymbol: "HCCT",
    OneLpSymbol: "LONG",
    StartTime: "2021/02/06 00:00 UTC+8",
    FinishTime: "2021/02/13 00:00 UTC+8",
    PoolAddress: "0xB6ED9f3dCA5CeaaB25F24a377Ed2e47Ecb7dCA5D",
    StakeAddress: "0x2ec7FC5A00d4E785821fc8D195291c970d79F0bF",
    RewardAddress: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
    OneLpAddress: "0x17934fef9fc93128858e9945261524ab0581612e",
    StakeDecimals: 18,
    RewardDecimals: 18,
    SwapType: "PANCAKEV1",
    TotalRewards: 16000,
    PoolProcess: 7,
    LeftShowToken: {
      AddTokenSymbol: "LONG",
      AddTokenAddress: "0x17934fef9fc93128858e9945261524ab0581612e",
      AddTokenDecimals: 18,
    },
    RightShowToken: {
      AddTokenSymbol: "HCCT",
      AddTokenAddress: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
      AddTokenDecimals: 18,
    },
    APR: "--",
  },
];
// Pool Status
// 1 unopen
// 2 ongoing
// 3 expired
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
      ItemPool.ShowTime = getShowTime(FixStartTime);
    }
    if (PoolStarted & !PoolFinished) {
      ItemPool.Status = 2;
      ItemPool.ShowTime = getShowTime(FixFinishTime);
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
export const getPoolAPR = async (PoolData) => {
  if (PoolData.Status !== 2) {
    return;
  }
  const RewardAddress = PoolData.RewardAddress;
  const StakeAddress = PoolData.StakeAddress;
  const PoolAddress = PoolData.PoolAddress;
  const RewardDecimals = PoolData.RewardDecimals;
  const RewardSymbol = PoolData.RewardSymbol;
  const PoolProcess = PoolData.PoolProcess;
  const StakeDecimals = PoolData.StakeDecimals;
  const TotalRewards = PoolData.TotalRewards;
  const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const HelmetDecimals = 18;
  const Amount = toWei("1", RewardDecimals);
  let RewardPrice;
  try {
    const Data = await getTokenPrice({
      fromTokenAddress: RewardAddress,
      toTokenAddress: HelmetAddress,
      amount: Amount,
    });
    RewardPrice = fromWei(Data.data.toTokenAmount);
  } catch (error) {
    let Price = await pancakeswapv2(
      RewardAddress,
      RewardSymbol,
      RewardDecimals,
      HelmetAddress,
      "HELMET",
      HelmetDecimals
    );
    RewardPrice = Price;
  }
  const RewardHelmetPrice = RewardPrice;

  if (RewardHelmetPrice) {
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
      const Numerator = RewardHelmetPrice * (TotalRewards / PoolProcess) * 365;
      const Denominator =
        ((FixLptHelmetValue * 2) / FixTotalLptVolume) * FixTotalStakeVolume;
      const APR = fixD((Numerator / Denominator) * 100, 2);
      console.log(APR);
      return (PoolData.APR = APR + "%");
    });
  } else {
    return "--";
  }
};
