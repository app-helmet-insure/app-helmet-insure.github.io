import Web3 from "web3";

export const state = () => ({
  locale: "en_US",
  chainID: null,
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
  userInfo: {
    name: "MetaMask",
    isLogin: false,
    account: null,
  },
  walletType: "",
  refreshNumber: 1,
  blockNumber: 0,
});

export const mutations = {
  SET_LANG(state, locale) {
    if (state.localeList.filter((item) => item.key === locale)) {
      state.locale = locale;
    }
  },
  SET_THEMES(state, data) {
    state.themes = data;
  },
  SET_CHAINID(state, data) {
    state.chainID = data;
  },
  SET_WALLET_RYPE(state, data) {
    state.walletType = data;
  },
  SET_USER_INFO(state, data) {
    const mockAccount = sessionStorage.getItem("helmet_mock_account");
    if (Web3.utils.isAddress(mockAccount)) {
      Object.assign(data, {
        account: mockAccount,
      });
    }
    state.userInfo = data;
  },
  SET_REFRESH_DATA(state) {
    let newNumber = state.refreshNumber + 1;
    state.refreshNumber = newNumber;
  },
  SET_BOLCK_NUMBER(state, data) {
    state.blockNumber = data;
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
  setWalletType({ commit }, data) {
    commit("SET_WALLET_RYPE", data);
  },
  setUserInfo({ commit }, data) {
    commit("SET_USER_INFO", data);
  },
  setChainID({ commit }, data) {
    commit("SET_CHAINID", data);
  },
  refreshData({ commit }) {
    commit("SET_REFRESH_DATA");
  },
  setBlockNumber({ commit }, data) {
    commit("SET_BOLCK_NUMBER", data);
  },
};
