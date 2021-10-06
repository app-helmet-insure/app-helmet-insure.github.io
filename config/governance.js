import GovernanceABI from "~/web3/abis/Governance.json";
export const GovernanceList = [
  {
    PoolAddress: "0x4E18F9Ed49ad3d3fDdadE4d1464ED71133AA1EAC",
    PoolABI: GovernanceABI,
    Title: "HELMET 50%代币如何使用.",
    Router: "link1",
    Perhaps:
      "A proposal to fund the Aave Risk DAO, an organization of contributors dedicated to risk analysis for the Aave protocol.",
    Details: [
      "在2021前三个季度,我们尽可能的通过积极使用Vault来支付包括挖矿合作,获取投资,社区奖励以及挖矿和保单合作费用,让Option交易成为一个可以获得收益的挖矿和娱乐系统.",
      "具体我们取得的成绩可以如下",
      "按照路线图,Helmet 在 Q4将会着重发布提案,以商讨2022年 Helmet的代币使用和奖励方式.随着链上现货交易的逐步完善,衍生品的交易门槛也被放低,这个时候Core Team 希望在 Q4之后 HELMET 的一些重大发展与社区的重要成员一同决策,用代币来决定 Helmet代币后续的可使用场景,包括但不限于激励,支付或是获得额外的发展资金.",
      "针对以上情况,Core Team 预备了两个提案,当然这不是最终结论,它可能需要修改或是完善,但这一切都需要持币者来决定",
      "1,Helmet 未发行5000万将会全部用于销毁,以永久降低Helmet发行上限.",
      "在保证既有流通的前提下,降低总供给可以带来很多好处,最重要的好处是保证了代币流通的通缩,在应用场景不断扩大的情况下,放大代币单位价值.",
      "HELMET目前市场流通达到了39,809,145(From Coin market cap) ,已经销毁的个数达到了1,122,336 个,在接下来的 Q4以及2022年规划上,HELMET 将会着重在业务上充分考虑销毁场景,包括已经正在进行的 IBO 和 GUARD 生态激励,和即将上线的 NFT Game 以及 Option 交易所(具体内容请参考 Medium).",
      "这意味着,在接下来的时间 HELMET将会进行更激进的TOKEN销毁措施,在不影响业务激励的同时,不断放大持币者的持币信心,并积极实践希望对社区做出贡献的持币者的诉求.",
      "如果这项提案得到大部分持币者的支持,Helmet 将会组建社区见证委员会,并上线其治理页面,由希望积极参与治理的持币者来确定销毁的具体细节.具体的治理页面和社区治理系统将在2021年12月31日前上线.",
      "2.Helmet 未发行的5000万将用户 Layer2 DEX 上期权交易所以及 NFT Game的代币激励.",
      "Helmet 目前在 BSC 和 Polygon 上进行了V1.5 版本的部署,在链上通过价格保险的方式允许用户对新兴资产进行期权交易,我们看到Layer-2的潜力,包括 ZK-rollup 带来的安全性和性能的绝对提升",
      "因此HELMET将通过Zks的架构作为Layer2部分的基础架构进行开发。在过去的2个月,Core Team 成功设计了最新版的Event Sourcing Engine（事件驱动引擎）架构，预计并发将至少超过300,000 TPS，全撮合流程耗时小于70ms。这意味着在极其高效的处理效率下，仍然保有业界标准最高的安全性和容灾能力。 在这里我们将所有的用户资产、仓位、属性全部放在内存数据库（Memory Database）中，同时以事件的形式对于用户的申报和撮合进行记录。(具体细节请参考 Medium)",
      "Helmet 最新的 Layer-2架构让将会随着 EVM 的适配逐渐开始测试,这个时间我们预计将会在2022年12月中旬前完成.",
      "随着 DYDX 在期货上的火爆,我们认为在Layer-2激励用户也是产品必不可少的手段,它可以不断扩大我们的用户规模,以吸引更多的交易者参与.",
      "所以 Core Team 希望将未发行的5000万全部用于 Layer-2产品以及 NFT Game的激励,以增加 Helmet 整体的用户量和流动性,并为新产品架构提供动力",
      "如果这项提案得到大部分持币者的支持,Helmet 将会组建社区见证委员会,并上线其治理页面,由希望积极参与治理的持币者来确定销毁的具体细节.具体的治理页面和社区治理系统将在2021年12月31日前上线.",
    ],
    StartTime: "2021/10/03 16:30 UTC+8",
    FinishTime: "2021/10/04 16:30 UTC+8",
    Proposal: [
      { Text: 1, ID: 1 },
      { Text: 2, ID: 2 },
      // { Text: 3, ID: 3 },
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
