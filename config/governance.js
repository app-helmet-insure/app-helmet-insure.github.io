import GovernanceABI from "~/web3/abis/Governance.json";
import MiningABI from "~/web3/abis/MiningABI.json";
import ApproveABI from "~/web3/abis/IPancakePair.json";
import { Contract } from "ethers-multicall-x";
import { fixD } from "~/assets/js/util.js";
import {
  toWei,
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
} from "~/web3/index.js";
export const GovernanceList = [
  {
    PoolAddress: "0x4E18F9Ed49ad3d3fDdadE4d1464ED71133AA1EAC",
    PoolABI: GovernanceABI,
    Title: "Proposal.Governance1.text1",
    Router: "link1",
    Perhaps: "Proposal.Governance1.text2",
    Details: [
      "Proposal.Governance1.text2",
      "Proposal.Governance1.text3",
      "Proposal.Governance1.text4",
      "Proposal.Governance1.text5",
      "Proposal.Governance1.text6",
      "Proposal.Governance1.text7",
      "Proposal.Governance1.text8",
      "Proposal.Governance1.text9",
      "Proposal.Governance1.text10",
      "Proposal.Governance1.text11",
      "Proposal.Governance1.text12",
      "Proposal.Governance1.text13",
      "Proposal.Governance1.text14",
      "Proposal.Governance1.text15",
      "Proposal.Governance1.text16",
      "Proposal.Governance1.text17",
      "Proposal.Governance1.text18",
    ],
    StartTime: "2021/10/16 24:00 UTC+8",
    FinishTime: "2021/12/31 24:00 UTC+8",
    Proposal: [
      { Text: 1, ID: 1 },
      { Text: 2, ID: 2 },
      { Text: 3, ID: 3 },
    ],
  },
];

export const formatGovernance = (PoolData) => {
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
      ItemPool.StatusImg = "unopen";
      ItemPool.StatusText = `${window.$nuxt.$t("Governance.Governance_text9")}`;
      if (StartTime !== "Ongoing" && FinishTime !== "Mining") {
        ItemPool.ShowTime = getShowTime(FixStartTime);
      } else {
        ItemPool.ShowTime = "Ongoing";
      }
    }
    if (PoolStarted && !PoolFinished) {
      ItemPool.Status = 2;
      ItemPool.StatusImg = "ongoing";
      ItemPool.StatusText = `${window.$nuxt.$t(
        "Governance.Governance_text10"
      )}`;
      if (StartTime !== "Ongoing" && FinishTime !== "Mining") {
        ItemPool.ShowTime = getShowTime(FixFinishTime);
      }
    }
    if (PoolFinished) {
      ItemPool.Status = 3;
      ItemPool.StatusImg = "finish";
      ItemPool.StatusText = `${window.$nuxt.$t("Governance.Governance_text8")}`;
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
export const getPoolAPY = (PoolData) => {
  const { PoolAddress } = PoolData;
  const HelmetFarm = "0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699";
  const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const HelmetContracts = new Contract(HelmetAddress, MiningABI);
  const ApproveContracts = new Contract(HelmetAddress, ApproveABI.abi);
  const PoolContracts = new Contract(PoolAddress, GovernanceABI);
  let PromiseList = [
    ApproveContracts.allowance(HelmetFarm, PoolAddress),
    PoolContracts.rewardsDuration(),
    PoolContracts.totalSupply(),
  ];
  const MulticallProvider = getOnlyMultiCallProvider();
  return MulticallProvider.all(PromiseList).then((res) => {
    const FixData = processResult(res);
    let [TotalRewards, PoolProcess, TotalStakeVolume] = FixData;
    TotalRewards = fromWei(TotalRewards);
    TotalStakeVolume = fromWei(TotalStakeVolume);
    PoolProcess = PoolProcess / 86400;
    const DailyReward = TotalRewards / PoolProcess;
    const RewardValues = 1 + DailyReward / TotalStakeVolume;
    const APR = fixD((DailyReward / TotalStakeVolume) * 365 * 100, 2) + "%";
    const APY = fixD(Math.pow(RewardValues, 365) * 100, 2) + "%";
    console.log(RewardValues, Math.pow(RewardValues, 365));
    return (PoolData.APR = APR), (PoolData.APY = APY);
  });
};
