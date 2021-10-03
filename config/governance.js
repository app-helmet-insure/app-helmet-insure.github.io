export const GovernanceList = [
  {
    Title: "标题一",
    Router:"link1",
    Perhaps: "标题一标题一标题一标题一标题一标题一标题一",
    Details:
      "标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一",
    StartTime: "2021/10/03 16:30 UTC+8",
    FinishTime: "2021/10/04 16:30 UTC+8",
  },
  {
    Title: "标题二",
    Router:"link3",
    Perhaps: "标题一标题一标题一标题一标题一标题一标题一",
    Details:
      "标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一",
    StartTime: "2021/10/04 20:00 UTC+8",
    FinishTime: "2021/10/05 20:30 UTC+8",
  },
  {
    Title: "标题三",
    Router:"link2",
    Perhaps: "标题一标题一标题一标题一标题一标题一标题一",
    Details:
      "标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一标题一",
    StartTime: "2021/10/03 16:30 UTC+8",
    FinishTime: "2021/10/04 1:30 UTC+8",
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
      ItemPool.StatusText = '未开始'
      if (StartTime !== "Ongoing" && FinishTime !== "Mining") {
        ItemPool.ShowTime = getShowTime(FixStartTime);
      } else {
        ItemPool.ShowTime = "Ongoing";
      }
    }
    if (PoolStarted && !PoolFinished) {
      ItemPool.Status = 2;
      ItemPool.StatusImg = "ongoing";
      ItemPool.StatusText = '进行中'
      if (StartTime !== "Ongoing" && FinishTime !== "Mining") {
        ItemPool.ShowTime = getShowTime(FixFinishTime);
      }
    }
    if (PoolFinished) {
      ItemPool.Status = 3;
      ItemPool.StatusImg = "finish";
      ItemPool.StatusText = '已结束'
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
