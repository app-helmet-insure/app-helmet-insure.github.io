export const GovernanceList = [
  {
    Title: "Aave Risk DAO",
    Router: "link1",
    Perhaps:
      "A proposal to fund the Aave Risk DAO, an organization of contributors dedicated to risk analysis for the Aave protocol.",
    Details:
      "The Aave protocol is evolving rapidly with new features, integrations, assets, and markets. Aave users and token holders rely on the protocol to operate securely and safeguard the funds deposited in Aave markets and the safety module. Committed professional analysis will help governance and the community mitigate risk and take advantage of new opportunities with greater confidence.The Risk DAO will initially focus on the following areas:Reviewing proposed new assets for technical and market risks Facilitating community discussions through biweekly risk calls Building dashboards and tooling to help increase understanding of Aave protocol risk factors Evaluating markets for cross chain deployments or new asset types Commenting on community led initiatives that affect protocol risk Refer to the Aave governance forum post for additional details on Risk DAO scope and priorities. The Risk DAO will seek to work collaboratively with Gauntlet Network, which recently received approval for dynamic risk parameter management of the primary Aave v2 money market on Ethereum mainnet. Gauntlet’s engagement will allow the Risk DAO to focus on other important priorities for Aave risk management. We will remain open to opportunities for collaboration with Gauntlet and other Aave contributors including the Aave Grants DAO.",
    StartTime: "2021/10/03 16:30 UTC+8",
    FinishTime: "2021/10/04 16:30 UTC+8",
    Proposal: [
      { Text: 1, ID: 1 },
      { Text: 2, ID: 2 },
      { Text: 3, ID: 3 },
    ],
  },
  {
    Title: "Aave Risk DAO1",
    Router: "link3",
    Perhaps:
      "A proposal to fund the Aave Risk DAO, an organization of contributors dedicated to risk analysis for the Aave protocol.",
    Details:
      "The Aave protocol is evolving rapidly with new features, integrations, assets, and markets. Aave users and token holders rely on the protocol to operate securely and safeguard the funds deposited in Aave markets and the safety module. Committed professional analysis will help governance and the community mitigate risk and take advantage of new opportunities with greater confidence.The Risk DAO will initially focus on the following areas:Reviewing proposed new assets for technical and market risks Facilitating community discussions through biweekly risk calls Building dashboards and tooling to help increase understanding of Aave protocol risk factors Evaluating markets for cross chain deployments or new asset types Commenting on community led initiatives that affect protocol risk Refer to the Aave governance forum post for additional details on Risk DAO scope and priorities. The Risk DAO will seek to work collaboratively with Gauntlet Network, which recently received approval for dynamic risk parameter management of the primary Aave v2 money market on Ethereum mainnet. Gauntlet’s engagement will allow the Risk DAO to focus on other important priorities for Aave risk management. We will remain open to opportunities for collaboration with Gauntlet and other Aave contributors including the Aave Grants DAO.",
    StartTime: "2021/10/04 20:00 UTC+8",
    FinishTime: "2021/10/05 20:30 UTC+8",
    ProposalID: [1, 2, 3],
  },
  {
    Title: "Aave Risk DAO2",
    Router: "link2",
    Perhaps:
      "A proposal to fund the Aave Risk DAO, an organization of contributors dedicated to risk analysis for the Aave protocol.",
    Details:
      "The Aave protocol is evolving rapidly with new features, integrations, assets, and markets. Aave users and token holders rely on the protocol to operate securely and safeguard the funds deposited in Aave markets and the safety module. Committed professional analysis will help governance and the community mitigate risk and take advantage of new opportunities with greater confidence.The Risk DAO will initially focus on the following areas:Reviewing proposed new assets for technical and market risks Facilitating community discussions through biweekly risk calls Building dashboards and tooling to help increase understanding of Aave protocol risk factors Evaluating markets for cross chain deployments or new asset types Commenting on community led initiatives that affect protocol risk Refer to the Aave governance forum post for additional details on Risk DAO scope and priorities. The Risk DAO will seek to work collaboratively with Gauntlet Network, which recently received approval for dynamic risk parameter management of the primary Aave v2 money market on Ethereum mainnet. Gauntlet’s engagement will allow the Risk DAO to focus on other important priorities for Aave risk management. We will remain open to opportunities for collaboration with Gauntlet and other Aave contributors including the Aave Grants DAO.",
    StartTime: "2021/10/03 16:30 UTC+8",
    FinishTime: "2021/10/04 1:30 UTC+8",
    ProposalID: [1, 2, 3],
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
