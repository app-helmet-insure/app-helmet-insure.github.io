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
  SET_USER_INFO(state, data) {
    state.userInfo = data;
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
  // 设置钱包类型
  setWalletType({ commit }, data) {
    commit("SET_WALLET_RYPE", data);
  },
  setUserInfo({ commit, state }, data) {
    commit("SET_USER_INFO", data);
  },
};
