import { getTokenPrice } from "~/interface/event.js";
import { fixD } from "~/assets/js/util.js";
import { TotalSupply, BalanceOf } from "~/interface/read_contract.js";
import MiningABI from "~/abi/MiningABI.json";
import { Contract } from "ethers-multicall-x";
import {
  toWei,
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
} from "~/interface/index.js";
export const PoolList = [
  {
    key: "SHIBARGON",
    pool_name: "<i>hARGON</i> Pool",
    pool_desc: "By SHIBh-Helmet LPT",
    stake_symbol: "SHIBh-Helmet LPT",
    reward_symbol: "hARGON",
    onelpt_symbol: "SHIBh",
    start_time: "2021/07/08 00:00 UTC+8",
    finish_time: "2021/07/15 00:00 UTC+8",
    pool_address: "0x5A7c52e44D7406ae16C4F3ac1b5cd75BB775954d",
    stake_address: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
    reward_address: "0x4ce2d9804da7583c02f80fec087aea1d137214eb",
    onelpt_address: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
    stake_decimals_number: 18,
    reward_decimals_number: 18,
    SWAP_TYPE: "PANCAKEV2",
    total_rewards: 125000,
    pool_process: 7,
    left_show_token: {
      add_token_symbol: "SHIBh",
      add_token_address: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
      add_token_decimals: 12,
    },
    right_show_token: {
      add_token_symbol: "hARGON",
      add_token_address: "0x4ce2d9804da7583c02f80fec087aea1d137214eb",
      add_token_decimals: 18,
    },
    apr: "--",
  },
  {
    key: "SHIBBMXX",
    pool_name: "<i>hBMXX</i> Pool",
    pool_desc: "By SHIBh-Helmet LPT",
    stake_symbol: "SHIBh-Helmet LPT",
    reward_symbol: "hBMXX",
    onelpt_symbol: "SHIBh",
    start_time: "2021/06/30 00:00 UTC+8",
    finish_time: "2021/07/13 00:00 UTC+8",
    pool_address: "0xA93f7bAbaf1A0e95dC472eb7cD37C59ed009c728",
    stake_address: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
    reward_address: "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44",
    onelpt_address: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
    stake_decimals_number: 18,
    reward_decimals_number: 18,
    SWAP_TYPE: "PANCAKEV2",
    total_rewards: 3600,
    pool_process: 13,
    left_show_token: {
      add_token_symbol: "SHIBh",
      add_token_address: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
      add_token_decimals: 12,
    },
    right_show_token: {
      add_token_symbol: "hBMXX",
      add_token_address: "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44",
      add_token_decimals: 18,
    },
    apr: "--",
  },
  {
    key: "SHIBBABY",
    pool_name: "<i>hBABY</i> Pool",
    pool_desc: "By SHIBh-Helmet LPT",
    stake_symbol: "SHIBh-Helmet LPT",
    reward_symbol: "hBABY",
    onelpt_symbol: "SHIBh",
    start_time: "2021/06/25 00:00 UTC+8",
    finish_time: "2021/07/08 00:00 UTC+8",
    pool_address: "0x475e5A97cA24278E820F93A5423cc1F613658466",
    stake_address: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
    reward_address: "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624",
    onelpt_address: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
    stake_decimals_number: 18,
    reward_decimals_number: 18,
    SWAP_TYPE: "PANCAKEV2",
    total_rewards: 140000,
    pool_process: 13,
    left_show_token: {
      add_token_symbol: "SHIBh",
      add_token_address: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
      add_token_decimals: 12,
    },
    right_show_token: {
      add_token_symbol: "hBABY",
      add_token_address: "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624",
      add_token_decimals: 18,
    },
    apr: "--",
  },
  {
    key: "SHIBMTRG",
    pool_name: "<i>hMTRG</i> Pool",
    pool_desc: "By SHIBh-Helmet LPT",
    stake_symbol: "SHIBh-Helmet LPT",
    reward_symbol: "hMTRG",
    onelpt_symbol: "SHIBh",
    start_time: "2021/06/24 00:00 UTC+8",
    finish_time: "2021/07/01 00:00 UTC+8",
    pool_address: "0x784a1507c2D2e90C3842929E06625b0D4e881071",
    stake_address: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
    reward_address: "0xa561926e81decb74b3d11e14680b3f6d1c5012bd",
    onelpt_address: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
    stake_decimals_number: 18,
    reward_decimals_number: 18,
    SWAP_TYPE: "PANCAKEV2",
    total_rewards: 8000,
    pool_process: 7,
    left_show_token: {
      add_token_symbol: "SHIBh",
      add_token_address: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
      add_token_decimals: 12,
    },
    right_show_token: {
      add_token_symbol: "hMTRG",
      add_token_address: "0xa561926e81decb74b3d11e14680b3f6d1c5012bd",
      add_token_decimals: 18,
    },
    apr: "--",
  },
  {
    key: "SHIBWINGS",
    pool_name: "<i>hWINGS</i> Pool",
    pool_desc: "By SHIBh-Helmet LPT",
    stake_symbol: "SHIBh-Helmet LPT",
    reward_symbol: "hWINGS",
    onelpt_symbol: "SHIBh",
    start_time: "2021/06/11 00:00 UTC+8",
    finish_time: "2021/06/25 00:00 UTC+8",
    pool_address: "0x1CaB756c4B46B44a3012E74F1023ae972c1b1b60",
    stake_address: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
    reward_address: "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026",
    onelpt_address: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
    stake_decimals_number: 18,
    reward_decimals_number: 18,
    SWAP_TYPE: "PANCAKEV2",
    total_rewards: 7500,
    pool_process: 14,
    left_show_token: {
      add_token_symbol: "SHIBh",
      add_token_address: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
      add_token_decimals: 12,
    },
    right_show_token: {
      add_token_symbol: "hWINGS",
      add_token_address: "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026",
      add_token_decimals: 18,
    },
    apr: "--",
  },
  {
    key: "TPTBURGER",
    pool_name: "<i>hxBURGER</i> Pool",
    pool_desc: "By hTPT-Helmet LPT",
    stake_symbol: "hTPT-Helmet LPT",
    reward_symbol: "hxBURGER",
    onelpt_symbol: "hTPT",
    start_time: "2021/04/22 14:00 UTC+8",
    finish_time: "2021/05/12 00:00 UTC+8",
    pool_address: "0x40052013B8c019E999276885467AC156e86Fd1bD",
    stake_address: "0x413da4890ab12b1a7e01d0bb7fc5cf6cadf5d565",
    reward_address: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
    onelpt_address: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
    stake_decimals_number: 18,
    reward_decimals_number: 18,
    SWAP_TYPE: "BURGER",
    total_rewards: 20000,
    pool_process: 20,
    left_show_token: {
      add_token_symbol: "hTPT",
      add_token_address: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
      add_token_decimals: 4,
    },
    right_show_token: {
      add_token_symbol: "hxBURGER",
      add_token_address: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
      add_token_decimals: 18,
    },
    apr: "--",
  },
  {
    key: "DODOTPT",
    pool_name: "<i>hTPT</i> Pool",
    pool_desc: "By hDODO-Helmet LPT",
    stake_symbol: "hDODO-Helmet LPT",
    reward_symbol: "hTPT",
    onelpt_symbol: "hDODO",
    start_time: "2021/04/06 00:00 UTC+8",
    finish_time: "2021/04/26 00:00 UTC+8",
    pool_address: "0xe71B586Be2c053E22a44556A7526B02428a943B0",
    stake_address: "0x762D63a230C4e1EB2673cB5C4FadC5B68b3074c7",
    reward_address: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
    onelpt_address: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
    stake_decimals_number: 18,
    reward_decimals_number: 4,
    SWAP_TYPE: "PANCAKEV1",
    total_rewards: 2000000,
    pool_process: 20,
    left_show_token: {
      add_token_symbol: "hDODO",
      add_token_address: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "hTPT",
      add_token_address: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
      add_token_decimals: 4,
    },
    apr: "--",
  },
  {
    key: "MATHTPT",
    pool_name: "<i>hDODO</i> Pool",
    pool_desc: "By hMATH-Helmet LPT",
    stake_symbol: "hMATH-Helmet LPT",
    reward_symbol: "hDODO",
    onelpt_symbol: "hMATH",
    start_time: "2021/03/24 00:00 UTC+8",
    finish_time: "2021/03/31 12:00 UTC+8",
    pool_address: "0xc68CB0a3c5Cab3C9521E124Eff97A503c45bE9E4",
    stake_address: "0xc840de3a061A73467bc98acD9A32aA3a281A380C",
    reward_address: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
    onelpt_address: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
    stake_decimals_number: 18,
    reward_decimals_number: 18,
    SWAP_TYPE: "PANCAKEV1",
    total_rewards: 40000,
    pool_process: 7,
    left_show_token: {
      add_token_symbol: "hMATH",
      add_token_address: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "hTPT",
      add_token_address: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
      add_token_decimals: 18,
    },
    apr: "--",
  },
  {
    key: "AUTOMATH",
    pool_name: "<i>hMATH</i> Pool",
    pool_desc: "By hAUTO-Helmet LPT",
    stake_symbol: "hAUTO-Helmet LPT",
    reward_symbol: "hMATH",
    onelpt_symbol: "hAUTO",
    start_time: "2021/03/11 00:00 UTC+8",
    finish_time: "2021/03/18 00:00 UTC+8",
    pool_address: "0x630179cd153a009b4b864A5A5a3Ac5A0E70804Da",
    stake_address: "0xB6F84EaD91Fb6d70B8f1E87759E7c95c440DD80C",
    reward_address: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
    onelpt_address: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
    stake_decimals_number: 18,
    reward_decimals_number: 18,
    SWAP_TYPE: "PANCAKEV1",
    total_rewards: 30000,
    pool_process: 7,
    left_show_token: {
      add_token_symbol: "hAUTO",
      add_token_address: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "hMATH",
      add_token_address: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
      add_token_decimals: 18,
    },
    apr: "--",
  },
  {
    key: "BNB500AUTO",
    pool_name: "<i>hAUTO</i> Pool",
    pool_desc: "By BNB500-Helmet LPT",
    stake_symbol: "BNB500-Helmet LPT",
    reward_symbol: "hAUTO",
    onelpt_symbol: "BNB500",
    start_time: "2021/03/02 00:00 UTC+8",
    finish_time: "2021/03/09 00:00 UTC+8",
    pool_address: "0xe4a5d7cb5A9EbDC4370D0b4EBBd0C1656099b293",
    stake_address: "0x6A829c3870Ab4ce228Cdf359E6F72295ef472F9d",
    reward_address: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
    onelpt_address: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
    stake_decimals_number: 18,
    reward_decimals_number: 18,
    SWAP_TYPE: "PANCAKEV1",
    total_rewards: 10,
    pool_process: 7,
    left_show_token: {
      add_token_symbol: "BNB500",
      add_token_address: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "hAUTO",
      add_token_address: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
      add_token_decimals: 18,
    },
    apr: "--",
  },
  {
    key: "CTKBNB500",
    pool_name: "<i>BNB500</i> Pool",
    pool_desc: "By hCTK-Helmet LPT",
    stake_symbol: "hCTK-Helmet LPT",
    reward_symbol: "BNB500",
    onelpt_symbol: "hCTK",
    start_time: "2021/02/22 00:00 UTC+8",
    finish_time: "2021/02/29 00:00 UTC+8",
    pool_address: "0x6F131e8e5a93ac3Ae71FDdbbE1122cB69AF9Fc71",
    stake_address: "0x9a6fCD063cA5a9bB31b9f8eE86eCB6476b981280",
    reward_address: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
    onelpt_address: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
    stake_decimals_number: 18,
    reward_decimals_number: 18,
    SWAP_TYPE: "PANCAKEV1",
    total_rewards: 1000,
    pool_process: 7,
    left_show_token: {
      add_token_symbol: "hCTK",
      add_token_address: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
      add_token_decimals: 6,
    },
    right_show_token: {
      add_token_symbol: "BNB500",
      add_token_address: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
      add_token_decimals: 18,
    },
    apr: "--",
  },
  {
    key: "HCCTCTK",
    pool_name: "<i>hCTK</i> Pool",
    pool_desc: "By HCCT-Helmet LPT",
    stake_symbol: "HCCT-Helmet LPT",
    reward_symbol: "hCTK",
    onelpt_symbol: "HCCT",
    start_time: "2021/02/21 00:00 UTC+8",
    finish_time: "2021/02/28 00:00 UTC+8",
    pool_address: "0xaF0e8747FA54b3E000FF1a0F87AF2DB4F1B7Fd87",
    stake_address: "0xcBbD24DBbF6a487370211bb8B58C3b43C4C32b9E",
    reward_address: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
    onelpt_address: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
    stake_decimals_number: 18,
    reward_decimals_number: 6,
    SWAP_TYPE: "PANCAKEV1",
    total_rewards: 70000,
    pool_process: 7,
    left_show_token: {
      add_token_symbol: "HCCT",
      add_token_address: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "hCTK",
      add_token_address: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
      add_token_decimals: 6,
    },
    apr: "--",
  },
  {
    key: "LONGHCCT",
    pool_name: "<i>HCCT</i> Pool",
    pool_desc: "By LONG-Helmet LPT",
    stake_symbol: "LONG-Helmet LPT",
    reward_symbol: "HCCT",
    onelpt_symbol: "LONG",
    start_time: "2021/02/06 00:00 UTC+8",
    finish_time: "2021/02/13 00:00 UTC+8",
    pool_address: "0xB6ED9f3dCA5CeaaB25F24a377Ed2e47Ecb7dCA5D",
    stake_address: "0x2ec7FC5A00d4E785821fc8D195291c970d79F0bF",
    reward_address: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
    onelpt_address: "0x17934fef9fc93128858e9945261524ab0581612e",
    stake_decimals_number: 18,
    reward_decimals_number: 18,
    SWAP_TYPE: "PANCAKEV1",
    total_rewards: 16000,
    pool_process: 7,
    left_show_token: {
      add_token_symbol: "LONG",
      add_token_address: "0x17934fef9fc93128858e9945261524ab0581612e",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "HCCT",
      add_token_address: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
      add_token_decimals: 18,
    },
    apr: "--",
  },
];
// Pool Status
// 1 unopen
// 2 ongoing
// 3 expired
export const formatMiningPool = (PoolData) => {
  for (let Key = 0; Key < PoolData.length; Key++) {
    const ItemPool = PoolData[Key];
    const { start_time, finish_time } = ItemPool;
    const PresentTime = Date.now();
    const StartTime = new Date(start_time) * 1;
    const FinishTime = new Date(finish_time) * 1;
    const PoolStarted = PresentTime > StartTime ? true : false;
    const PoolFinished = PresentTime > FinishTime ? true : false;
    if (!PoolStarted) {
      ItemPool.status = 1;
      ItemPool.show_time = getShowTime(StartTime);
    }
    if (PoolStarted & !PoolFinished) {
      ItemPool.status = 2;
      ItemPool.show_time = getShowTime(FinishTime);
      ItemPool.apr = getPoolAPR(ItemPool);
    }
    if (PoolFinished) {
      ItemPool.status = 3;
      ItemPool.show_time = "Finished";
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
const getPoolAPR = async (PoolData) => {
  const RewardAddress = PoolData.reward_address;
  const StakeAddress = PoolData.stake_address;
  const PoolAddress = PoolData.pool_address;
  const RewardDecimals = PoolData.reward_decimals_number;
  const PoolProcess = PoolData.pool_process;
  const StakeDecimals = PoolData.stake_decimals_number;
  const TotalRewards = PoolData.total_rewards;
  const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const HelmetDecimals = 18;
  const Amount = toWei("1", PoolData.reward_decimals_number);
  const Data = await getTokenPrice({
    fromTokenAddress: RewardAddress,
    toTokenAddress: HelmetAddress,
    amount: Amount,
  });
  if (Data) {
    const RewardHelmetPrice = fromWei(Data.data.toTokenAmount);
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
      return (PoolData.apr = APR + "%" || "--");
    });
  } else {
    return "--";
  }
};
