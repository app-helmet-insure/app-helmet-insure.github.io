import {
  getLongList,
  getSellList,
  getBuyList,
  getRePriceList,
  getMintList,
} from "~/interface/event.js";
import {
  getID,
  newGetSymbol,
  getTokenName,
} from "~/assets/utils/address-pool.js";
import Web3 from "web3";
import { toWei, fromWei } from "~/assets/utils/web3-fun.js";
import {
  asks,
  frequency,
  totalSupply,
  BalanceMine,
  MyPayaso,
  claimable,
} from "~/interface/order.js";
import { getUnderlying } from "~/interface/price.js";
// import precision from '~/assets/js/precision.js';
import { accDiv, add, mul } from "~/assets/utils/calculate.js";
import { toRounding } from "~/assets/js/util.js";
import factory_abi from "~/abi/factory_abi.json";
import { fixDEAdd } from "~/assets/js/util.js";
export const state = () => ({
  locale: "en_US",
  chainID: 56,
  themes: "light",
  localeList: [
    {
      key: "en_US",
      name: "English",
    },
    {
      key: "zh_CN",
      name: "中文",
    },
    {
      key: "ko_KR",
      name: "한국어",
    },
    {
      key: "es_MX",
      name: "Español",
    },
    {
      key: "ja_JP",
      name: "日本語",
    },
    {
      key: "fr_FR",
      name: "Français",
    },
    {
      key: "en_ID",
      name: "Indonesia",
    },
    {
      key: "fa_IR",
      name: "فارسی",
    },
  ],
  coinList: [
    "HELMET",
    "ETH",
    "BTCB",
    "CAKE",
    "CTK",
    "BURGER",
    "WBNB",
    "MATH",
    "SHIB",
  ],
  longMap: null,
  sellMap: null,
  buyMap: null,
  repriceMap: null,
  aboutInfoSell: null,
  myAboutInfoSell: null, // seller是我的 aboutInfoSell
  notExpriedAbountInfoSell: null, // 未过期的aboutInfoSell
  sellObj: null, // 已askID为key的sell列表对象
  aboutInfoBuy: null,
  myAboutInfoBuy: null, // buyer是我的 aboutInfoBuy
  aboutInfoBuySeller: null, // seller是我的 aboutInfoBuy （为了用在【出租订单】）
  userInfo: {
    // 用户信息
    data: {
      isLogin: false,
      account: null,
      balace: "--",
    },
    status: 0,
  },
  walletType: "", // 钱包类型
  showDialog: {
    showMask: false,
  },
  BNB_BUSD: 0,
  CAKE_BUSD: 0,
  HELMET_BUSD: 0,
  helmetVarieties: 0, // 已经成交的保险品种的种类
  totalHelmetsBorrowedVolume: 0, // 保险交易过的资金量  （保单数量累加， vol 用抵押物处理）
  longTokenCreatedVolume: 0, // 24小时Long token 铸造量
  allDueDate: [
    {
      BTCB: "2021/09/24 24:00",
      ETH: "2021/09/24 24:00",
      HELMET: "2021/09/24 24:00",
      CAKE: "2021/09/24 24:00",
      CTK: "2021/09/24 24:00",
      BURGER: "2021/09/24 24:00",
      WBNB: "2021/09/24 24:00",
      MATH: "2021/09/24 24:00",
      SHIB: "2021/09/24 24:00",
    },
  ],
  strikePriceArray: [
    // 翻倍价格
    {
      BTCB: 219.436,
      ETH: 15.0154,
      HELMET: 0.0018,
      CAKE: 0.1034,
      CTK: "0.0094",
      BURGER: 0.0254,
      WBNB: 856,
      MATH: 0.0058,
      SHIB: "0.0000002004",
    },
    // 腰斩价格
    {
      BTCB: 54.859,
      ETH: 3.7538,
      HELMET: 0.0004,
      CAKE: 0.0258,
      CTK: "0.0023",
      BURGER: 0.0063,
      WBNB: 214,
      MATH: 0.0014,
      SHIB: "0.0000000501",
    },
  ],
  // 抵押物
  policyColArray: [
    // 翻倍抵押物
    {
      BTCB: "BTCB",
      ETH: "ETH",
      HELMET: "HELMET",
      CAKE: "CAKE",
      CTK: "CTK",
      BURGER: "BURGER",
      WBNB: "WBNB",
      MATH: "MATH",
      SHIB: "SHIB",
    },
    // 腰斩抵押物
    {
      BTCB: "WBNB",
      ETH: "WBNB",
      HELMET: "WBNB",
      CAKE: "WBNB",
      CTK: "WBNB",
      BURGER: "WBNB",
      WBNB: "BUSD",
      MATH: "WBNB",
      SHIB: "WBNB",
    },
  ],
  // 标的物
  policyUndArray: [
    // 翻倍标的物
    {
      BTCB: "WBNB",
      ETH: "WBNB",
      HELMET: "WBNB",
      CAKE: "WBNB",
      CTK: "WBNB",
      BURGER: "WBNB",
      WBNB: "BUSD",
      MATH: "WBNB",
      SHIB: "WBNB",
    },
    // 腰斩标的物
    {
      BTCB: "BTCB",
      ETH: "ETH",
      HELMET: "HELMET",
      CAKE: "CAKE",
      CTK: "CTK",
      BURGER: "BURGER",
      WBNB: "WBNB",
      MATH: "MATH",
      SHIB: "SHIB",
    },
  ],
  allIndexPrice: [
    {
      HELMET: 0,
      WBNB: 0,
      CAKE: 0,
      FORTUBE: 0,
      BTCB: 0,
      ETH: 0,
      CKT: 0,
      BURGER: 0,
      MATH: 0,
      SHIB: 0,
    },
    {
      HELMET: 0,
      WBNB: 0,
      CAKE: 0,
      FORTUBE: 0,
      BTCB: 0,
      ETH: 0,
      CKT: 0,
      BURGER: 0,
      MATH: 0,
      SHIB: 0,
    },
  ],
  allHelmetPrice: [
    {
      HELMET: 0,
      WBNB: 0,
      CAKE: 0,
      FORTUBE: 0,
      BTCB: 0,
      ETH: 0,
      CKT: 0,
      BURGER: 0,
      MATH: 0,
      SHIB: 0,
    },
    {
      HELMET: 0,
      WBNB: 0,
      CAKE: 0,
      FORTUBE: 0,
      BTCB: 0,
      ETH: 0,
      CKT: 0,
      BURGER: 0,
      MATH: 0,
      SHIB: 0,
    },
  ],
  balanceCoin: [
    "HELMET",
    "ETH",
    "BTCB",
    "CAKE",
    "CTK",
    "BURGER",
    "WBNB",
    "MATH",
    "BUSD",
    "SHIB",
  ],
  BalanceArray: {
    HELMET: 0,
    BNB: 0,
    CAKE: 0,
    FORTUBE: 0,
    BTCB: 0,
    ETH: 0,
    CKT: 0,
    BURGER: 0,
    MATH: 0,
    BUSD: 0,
    SHIB: 0,
  },
  transferMap: [],
});

export const mutations = {
  SET_LANG(state, locale) {
    if (state.localeList.filter((item) => item.key === locale)) {
      state.locale = locale;
    }
  },
  SET_SLIDER_NUMBER(state, data) {
    if (data.Type == "MiningSliderNumber") {
      state.sliderNumber.MiningSliderNumber = data.Number;
    }
  },
  SET_LONG_MAP(state, data) {
    state.longMap = data;
  },
  SET_THEMES(state, data) {
    state.themes = data;
  },
  SET_CHAINID(state, data) {
    state.chainID = data;
  },
  SET_SELL_MAP(state, data) {
    state.sellMap = data;
  },
  SET_BUY_MAP(state, data) {
    state.buyMap = data;
  },
  SET_ABOUT_INFO_SELL(state, data) {
    state.aboutInfoSell = data.aboutInfoSell;
    state.myAboutInfoSell = data.myAboutInfoSell;
  },
  SET_NOT_EXPRIED_ABOUT_INFO_SELL(state, data) {
    state.notExpriedAbountInfoSell = data;
  },
  SET_SELL_OBJ(state, data) {
    state.sellObj = data;
  },
  SET_ABOUT_INFO_BUY(state, data) {
    state.aboutInfoBuy = data.aboutInfoBuy;
    state.myAboutInfoBuy = data.myAboutInfoBuy;
    state.aboutInfoBuySeller = data.aboutInfoBuySeller;
  },

  SET_USER_INFO(state, data) {
    state.userInfo = data;
  },
  SET_WALLET_RYPE(state, data) {
    state.walletType = data;
  },
  SET_CURRENT_ID(state, data) {
    state.currentAllId.currentClaimId = data.currentClaimId;
    state.currentAllId.currentCancelId = data.currentCancelId;
  },
  SET_MASK_DIALOG(state, data) {
    state.showDialog.showMask = data;
  },
  SET_HELMET_VARIETIES(state, data) {
    // 将对应的key存进去
    state.helmetVarieties = data;
  },
  SET_TOTAL_HELMETS_BORROWED_VOLUME(state, data) {
    // 保险交易过的资金量  （保单数量累加， vol 用抵押物处理）
    state.totalHelmetsBorrowedVolume = data;
  },
  SET_LONG_TOKEN_CREATED_VOLUME(state, data) {
    // 24小时Long token 铸造量
    state.longTokenCreatedVolume = data;
  },
  // 保存所有指数价格
  SET_ALL_INDEX_PRICE(state, data) {
    state.allIndexPrice = data;
  },
  SET_ALL_HELMET_PRICE(state, data) {
    state.allHelmetPrice = data;
  },
  // 存放余额
  SET_BALANCE(state, data) {
    state.BalanceArray = data;
  },
  SET_REPRICE_MAP(state, data) {
    state.repriceMap = data;
  },
  SET_TRANSFER_MAP(state, data) {
    state.transferMap = data;
  },
  SET_BNB_BUSD(state, data) {
    state.BNB_BUSD = data;
  },
  SET_CAKE_BUSD(state, data) {
    state.CAKE_BUSD = data;
  },
  SET_HELMET_BUSD(state, data) {
    state.HELMET_BUSD = data;
  },
};

export const actions = {
  // nuxtServerInit(store, { req }) {
  //     if (req.locale) {
  //         store.commit('SET_LANG', req.locale);
  //     }
  // },
  setThemes({ commit }, data) {
    commit("SET_THEMES", data);
  },
  setMaskDialog({ commit }, data) {
    commit("SET_MASK_DIALOG", data);
  },
  // 设置钱包类型
  setWalletType({ commit }, data) {
    commit("SET_WALLET_RYPE", data);
  },
  //设置当前结算ID
  setCurrentId({ commit }, data) {
    commit("SET_CURRENT_ID", data);
  },

  // 获取long, Sell, Buy映射
  setAllMap({ commit }) {
    // 创建long映射对象
    getLongList((res) => {
      let data = res;
      let long_map = {};
      let resultItem;
      let _col;
      // 设置已经成交的保险品种的种类
      commit("SET_HELMET_VARIETIES", data.length);
      data.forEach((item) => {
        if (!item.returnValues.long) return;
        resultItem = item.returnValues;
        _col = getTokenName(resultItem._collateral, window.chainID);
        if (_col === "USDT" || _col === "USDC") {
          // if (Number(resultItem._strikePrice) < Math.pow(10, 8)) return;
          resultItem._strikePrice = String(
            toRounding(
              window.WEB3.utils.fromWei(
                String(resultItem._strikePrice),
                "mether"
              ),
              0
            )
          );
          if (!Number(resultItem._strikePrice)) return;
        }
        if (Number(resultItem._strikePrice) > Math.pow(10, 50)) return;
        // long_map[item.returnValues.long] = item.returnValues;
        long_map[item.returnValues.long] = resultItem;
      });
      commit("SET_LONG_MAP", long_map);
    });

    // 创建Sell 映射对象
    getSellList((res) => {
      let data = res;
      let sell_map = {};
      data.forEach((item, index) => {
        sell_map[item.returnValues.long + index] = item.returnValues;
      });
      commit("SET_SELL_MAP", sell_map);
    });
    // 创建Buy 映射对象
    getBuyList((res) => {
      let data = res;
      let buy_map = {};
      data.forEach((item, index) => {
        buy_map[item.returnValues.askID + index] = item.returnValues;
      });
      commit("SET_BUY_MAP", buy_map);
    });

    // 创建修改价格 映射对象
    getRePriceList((res) => {
      let data = res;
      let reprice_map = [];
      data.forEach((item, index) => {
        reprice_map.push(item.returnValues);
      });
      commit("SET_REPRICE_MAP", reprice_map);
    });
    //获取 mint
    getMintList((res) => {
      let data = res;
      let longTokenCreatedVolume = 0;
      // let last = data[data.length - 1].blockNumber;
      // let h24 = 24 * 60 * 60;
      let _col;
      for (let i = 0; i < data.length; i++) {
        // if (last - data[i].blockNumber < h24) {
        _col = getTokenName(data[i].returnValues._collateral, window.chainID);
        longTokenCreatedVolume += Number(
          fromWei(data[i].returnValues.vol, _col)
        );
        // }
      }

      commit("SET_LONG_TOKEN_CREATED_VOLUME", longTokenCreatedVolume);
    });
  },

  async mapAbountInfoSell({ commit, state }, data) {
    const longMap = state.longMap;
    const sellMap = state.sellMap;
    const aboutInfoSell = [];
    const myAboutInfoSell = [];
    const notExpiredAboutInfoSell = [];
    const sellObj = {}; // 以askID为key的sell对象 (用在获取mapAboutInfoBuy)
    let item;
    let longInfo;
    const createTime = new Date("2020-12-16").getTime() / 1000;
    const charID = await getID();
    const now = new Date().getTime() / 1000;
    const myAddress =
      state.userInfo.data &&
      state.userInfo.data.account &&
      state.userInfo.data.account.toLowerCase();
    for (let key in sellMap) {
      item = sellMap[key];
      longInfo = longMap[item.long];

      // 过滤垃圾数据
      // 过滤未创建settleable 之前的数据
      // if (!longInfo) return;
      // if (charID === 1 || (longInfo && parseInt(longInfo.count) >= 63 && parseInt(longInfo._expiry) >= createTime)) {
      if (
        Number(item.price) < Math.pow(10, 30) &&
        ((longInfo && charID === 56) ||
          (longInfo && parseInt(longInfo._expiry) >= 1607997600))
      ) {
        aboutInfoSell.push({
          ...item,
          longInfo,
        });
        if (parseInt(longInfo._expiry) > now) {
          notExpiredAboutInfoSell.push({
            ...item,
            longInfo,
          });
        }
        if (item.seller.toLowerCase() == myAddress) {
          myAboutInfoSell.push({
            ...item,
            longInfo,
          });
        }
      }
      sellObj[item.askID] = {
        ...item,
        longInfo,
      };
    }

    commit("SET_ABOUT_INFO_SELL", { aboutInfoSell, myAboutInfoSell });
    commit("SET_SELL_OBJ", sellObj);
    commit("SET_NOT_EXPRIED_ABOUT_INFO_SELL", notExpiredAboutInfoSell); // 设置未过期的数据
  },

  async mapAboutInfoBuy({ commit, state }, data) {
    const charID = await getID();
    // const longMap = state.longMap;
    const sellObj = state.sellObj;
    const buyMap = state.buyMap;
    const repriceMap = state.repriceMap;
    const aboutInfoBuy = [];
    const myAboutInfoBuy = [];
    const aboutInfoBuySeller = [];
    const myAddress =
      state.userInfo.data &&
      state.userInfo.data.account &&
      state.userInfo.data.account.toLowerCase();
    let item, tItem;
    let sellInfo;
    let totalHelmetsBorrowedVolume = 0; // 保险交易过的资金量  （保单数量累加， vol 用抵押物处理）
    const createTime = new Date("2020-10-16").getTime() / 1000;
    let _col;
    let longArray = [];
    for (let key in buyMap) {
      item = buyMap[key];
      sellInfo = sellObj[item.askID];
      // 过滤垃圾数据
      // 过滤未创建settleable 之前的数据
      // 过滤数量为0的数据
      // 过滤时间戳过长的脏数据 (例如1603123200000000000000000000000)
      // if (charID === 1 || (sellInfo.longInfo && parseInt(sellInfo.longInfo.count) >= 63 && sellInfo.longInfo._expiry.length === 10 && parseInt(sellInfo.longInfo._expiry) >= createTime && parseInt(item.vol) !== 0)) {
      if (sellInfo) {
        if (sellInfo.longInfo && sellInfo.longInfo._expiry.length === 10) {
          // totalHelmetsBorrowedVolume
          _col = newGetSymbol(sellInfo.longInfo._collateral, window.chainID);
          let obj = {};
          obj[sellInfo.longInfo._collateral] = Number(item.vol);
          if (item.vol != 0) {
            longArray.push(obj);
          }
        }
        if (
          charID === 1 ||
          (sellInfo.longInfo &&
            sellInfo.longInfo._expiry.length === 10 &&
            parseInt(sellInfo.longInfo._expiry) >= createTime &&
            parseInt(item.vol) !== 0)
        ) {
          aboutInfoBuy.push({
            ...item,
            sellInfo,
          });

          if (item.buyer.toLowerCase() === myAddress) {
            myAboutInfoBuy.push({
              ...item,
              sellInfo,
            });
          }
          if (sellInfo.seller.toLowerCase() === myAddress) {
            aboutInfoBuySeller.push({
              ...item,
              sellInfo,
            });
          }
        }
      } else {
        function getOldOrder(id, rtArray) {
          let list = repriceMap;
          let array = list.filter((item) => item.newAskID == id)[0];
          if (array && array.newAskID) {
            let arr = getOldOrder(array.askID, array);
            return arr;
          }
          return rtArray;
        }
        if (item.buyer.toLowerCase() === myAddress) {
          let askID = item["askID"];
          let result = getOldOrder(askID);
          let newItem;
          for (let i = 0; i < repriceMap.length; i++) {
            newItem = repriceMap[i];
            if (newItem.newAskID == item.askID) {
              let sellInfo = sellObj[result.askID];
              if (sellInfo) {
                let list = JSON.parse(JSON.stringify(sellInfo));
                list["price"] = newItem.newPrice;
                list["askID"] = newItem.newAskID;
                myAboutInfoBuy.push({
                  ...item,
                  sellInfo: list,
                });
              }
            }
          }
        }
      }
    }
    commit("SET_ABOUT_INFO_BUY", {
      aboutInfoBuy,
      myAboutInfoBuy,
      aboutInfoBuySeller,
    });
  },
  setUserInfo({ commit, state }, data) {
    commit("SET_USER_INFO", data);
  },
};
