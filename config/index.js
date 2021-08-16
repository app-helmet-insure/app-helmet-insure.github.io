import Vue from "vue";
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
  if (dueDate > now) {
    let template = {
      day: day > 9 ? day : "0" + day,
      hour: hour > 9 ? hour : "0" + hour,
      minute: minute > 9 ? minute : "0" + minute,
    };
    return template;
  }
};
