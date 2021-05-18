<template>
  <div class="layout-container">
    <div class="contractAdress" v-if="TitleTextShow">
      <i></i>
      <p>
        <span>HELMET is now on pancakeswap.</span>
        <span>Token Contract Address:</span>
        <span>0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8</span>
        <a
          href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
          target="_blank"
          >Exchange now</a
        >
      </p>
      <svg class="close" aria-hidden="true" @click="TitleTextShow = false">
        <use xlink:href="#icon-close"></use>
      </svg>
    </div>
    <!-- <p>
      <span>{{ $t("Tip.SendCoin") }}</span>
    </p> -->
    <!-- <PHeader></PHeader> -->
    <div class="content">
      <PSlider />
      <div class="content_wrap">
        <PHeader :account="true" />
        <template>
          <transition name="fade">
            <nuxt-child />
          </transition>
        </template>
      </div>
    </div>
    <!-- <PFooter :padding="200"></PFooter> -->
    <RiskWarning
      v-if="showRiskWarning"
      @close="closeRiskWarning"
      @confirm="closeRiskWarning"
    />
    <!-- 下载钱包指引界面 -->
    <WallectDownLoad />
    <!-- 钱包交互状态提示弹框 -->
    <StatusDialog
      v-if="showStatusDialog"
      :data="statusData"
      @close="closeStatusDialog"
    />
    <Airdrop />
  </div>
</template>
<script>
import PHeader from "~/components/common/header.vue";
import PFooter from "~/components/common/footer.vue";
import PSlider from "~/components/common/slider.vue";
import Airdrop from "~/components/common/airdrop.vue";
import { web3 } from "~/assets/utils/web3-obj.js";
import {
  getOptionCreatedLog,
  getSellLog,
  getBuyLog,
} from "~/interface/order.js";
import { getID } from "~/assets/utils/address-pool.js";
import { mateMaskInfo } from "~/assets/utils/matemask.js";
import RiskWarning from "~/components/common/risk-warning.vue";
import StatusDialog from "~/components/common/status-dialog.vue";
import WallectDownLoad from "~/components/common/wallet-download.vue";
import { pancakeswap } from "~/assets/utils/pancakeswap.js";
import { getBalance } from "~/interface/order.js";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import { toWei, fromWei } from "~/assets/utils/web3-fun.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
export default {
  name: "default",
  components: {
    PHeader,
    PSlider,
    PFooter,
    RiskWarning,
    StatusDialog,
    Airdrop,
    // MyPayaso,
    WallectDownLoad,
  },
  data() {
    return {
      times: 0,
      showRiskWarning: false,
      statusData: {
        type: "",
        title: "",
        conTit: "",
        conText: "",
        btnText: "",
      },
      showStatusDialog: false,
      TitleTextShow: true,
    };
  },
  computed: {
    routeObj() {
      return this.$route;
    },
    longMap() {
      return this.$store.state.longMap;
    },
    sellMap() {
      return this.$store.state.sellMap;
    },
    buyMap() {
      return this.$store.state.buyMap;
    },
    longMapAndSellMap() {
      if (this.longMap && this.sellMap) {
        return {
          longMap: this.longMap,
          sellMap: this.sellMap,
        };
      }
      return null;
    },
    aboutInfoSell() {
      return this.$store.state.aboutInfoSell;
    },
    // 抵押物
    policyColArray() {
      return this.$store.state.policyColArray;
    },
    // 标的物
    policyUndArray() {
      return this.$store.state.policyUndArray;
    },
    ChainID() {
      let chainID = this.$store.state.chainID;
      return chainID;
    },
    localeList() {
      return this.$store.state.localeList;
    },
  },
  watch: {
    longMapAndSellMap: {
      handler: "longMapAndSellMapWatch",
      immediate: true,
    },
    aboutInfoSell: {
      handler: "aboutInfoSellWatch",
      immediate: true,
    },
    ChainID(newValue) {
      if (newValue == 56) {
        this.getBannerData();
        this.closeNetWorkTip();
      } else {
        this.showNetWorkTip();
      }
    },
  },
  async mounted() {
    // 是否阅读过【风险提示】
    if (!window.localStorage.getItem("readRisk")) {
      this.showRiskWarning = true;
    }
    this.copy();
    window.WEB3 = await web3();
    window.chainID = await getID();
    this.showWallet();
    this.$store.commit("SET_CHAINID", window.chainID);
    this.getUserInfo();
    // 获取映射
    this.$store.dispatch("setAllMap");
    this.monitorNetWorkChange();
    this.mointorAccountChange();
    // 显示状态弹框
    this.$bus.$on("OPEN_STATUS_DIALOG", (data) => {
      this.statusData = data;
      this.openStatusDialog();
      window.statusDialog = true;
    });

    // 关闭状态弹框
    this.$bus.$on("CLOSE_STATUS_DIALOG", (data) => {
      this.closeStatusDialog();
      window.statusDialog = false;
    });
    if (window.chainID == 56) {
      this.getBannerData();
      setTimeout(() => {
        this.getBalance();
      }, 500);
    }
    if (window.chainID == 56) {
      this.getIndexPirce();
    }
    // 刷新所有数据
    this.$bus.$on("REFRESH_ALL_DATA", (data) => {
      this.refreshAllData();
    });
    this.$bus.$on("REFRESH_BALANCE", () => {
      this.getBalance();
    });
  },
  methods: {
    closeNetWorkTip() {
      this.$bus.$emit("CLOSE_STATUS_DIALOG", (data) => {
        this.closeStatusDialog();
        window.statusDialog = false;
      });
    },
    showNetWorkTip() {
      this.$bus.$emit("OPEN_STATUS_DIALOG", {
        title: "WARNING",
        layout: "layout1",
        activeTip: true,
        activeTipText1: "",
        activeTipText2: "",
        loading: false,
        button: true,
        buttonText: "Change",
        showDialog: true,
        conText: "You need to change Binance Smart Chain NetWork",
        action: "netWork",
      });
    },
    copy() {
      let copy = new ClipboardJS("#copy_default");
      copy.on("success", function (e) {
        Message({
          message: "Successfully copied",
          type: "success",
          // duration: 0,
        });
        copy.destroy();
      });
      copy.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
        copy.destroy();
      });
    },
    closeDialog() {
      this.$emit("close");
    },
    async getBannerData() {
      setTimeout(() => {
        this.$store.dispatch("getTotalHelmet"); //获取 Helmet 总量
        this.$store.dispatch("getBalanceMine"); //获取 Helmet 矿山余额
        this.$store.dispatch("getClaimAbleHelmet"); //获取 所有待结算 Helmet
        this.$store.dispatch("getValidBorrowing"); //获取 有效成交
      }, 2000);
    },
    openStatusDialog() {
      this.showStatusDialog = true;
    },
    closeStatusDialog() {
      window.statusDialog = false;
      this.showStatusDialog = false;
    },
    openRiskWarning() {
      this.showRiskWarning = true;
    },
    closeRiskWarning() {
      this.showRiskWarning = false;
    },
    longMapAndSellMapWatch(newValue) {
      if (newValue) {
        this.$store.dispatch("mapAbountInfoSell");
      }
    },
    aboutInfoSellWatch(newValue) {
      if (newValue) {
        this.$store.dispatch("mapAboutInfoBuy");
        this.$store.dispatch("getCountByType");
      }
    },
    monitorNetWorkChange() {
      if (window.ethereum) {
        ethereum.on("chainChanged", (chainID) => {
          window.chainID = chainID;
          this.$store.commit("SET_CHAINID", chainID);
          window.location.reload();
        });
      } else {
        if (this.times < 10) {
          this.times = this.times + 1;
          setTimeout(() => {
            this.monitorNetWorkChange();
          }, 1000);
        }
      }
    },
    mointorAccountChange() {
      if (window.ethereum) {
        ethereum.on("accountsChanged", async (account) => {
          let userInfo = await mateMaskInfo(account[0], "MetaMask");
          this.$store.dispatch("setUserInfo", userInfo);
          setTimeout(() => {
            this.getBannerData();
            this.getBalance();
            this.getIndexPirce();
            this.$bus.$emit("REFRESH_ALL_DATA");
            this.$bus.$emit("REFRESH_MINING");
            this.$bus.$emit("GET_CARD_BALANCE");
            this.$bus.$emit("NFT_WINDOW_STATUS");
          }, 200);
        });
      }
    },
    showWallet() {
      try {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (account) => {
            window.localStorage.setItem("currentType", "MetaMask");
            // setTimeout(() => {
            //     window.location.reload()
            // }, 500)
            let userInfo = await mateMaskInfo(account[0], "MetaMask");
            this.$store.dispatch("setUserInfo", userInfo);
            this.$bus.$emit("REFRESH_ALL_DATA");
            this.$bus.$emit("REFRESH_MINING");
            this.closeDialog();
          });
      } catch (error) {}
    },
    async getUserInfo() {
      let res = await mateMaskInfo();
      try {
        if (res.status === -1) {
          return;
        }
        this.$store.dispatch("setUserInfo", res);
      } catch (error) {
        alert(error);
      }
    },
    refreshAllData() {
      this.$store.dispatch("setAllMap");
    },
    // 获取余额
    async getBalance() {
      let BalanceArray = {};
      let coinList = this.$store.state.balanceCoin;
      for (let i = 0; i < coinList.length; i++) {
        let balance = await getBalance(coinList[i]);
        let key = coinList[i];
        BalanceArray[key] = fixD(balance, 4);
      }
      if (window.CURRENTADDRESS) {
        window.WEB3.eth.getBalance(window.CURRENTADDRESS).then((res) => {
          BalanceArray["BNB"] = fixD(fromWei(res), 4);
        });
      }
      this.$store.commit("SET_BALANCE", BalanceArray);
    },
    // 保存指数价格
    async getIndexPirce() {
      let list = this.$store.state.coinList;
      // bnb
      let callIndexPirce = {};
      let putIndexPirce = {};
      let echartIndexArray = {};
      // helmet
      let bnbbusd = await pancakeswap("WBNB", "BUSD");
      let cakebusd = await pancakeswap("CAKE", "BUSD");
      let helmetbusd = await pancakeswap("BUSD", "HELMET");
      for (let i = 0; i < list.length; i++) {
        let px;
        let indexPx;
        if ("WBNB" != list[i]) {
          px = await pancakeswap("WBNB", list[i]);
        } else {
          px = 1;
        }
        indexPx = await pancakeswap(
          this.policyUndArray[1][list[i]],
          this.policyUndArray[0][list[i]]
        );

        let key = list[i];
        callIndexPirce[key] = px;
        let key1 = list[i];
        echartIndexArray[key1] = indexPx;
      }
      for (let i = 0; i < list.length; i++) {
        let px;
        if ("WBNB" != list[i]) {
          px = await pancakeswap(list[i], "WBNB");
        } else {
          px = 1;
        }
        const key = list[i];
        putIndexPirce[key] = px;
      }
      let arr = [];
      let arr1 = [];
      let bnbHelmet = callIndexPirce["HELMET"] || 0;
      let cakeHelmet = callIndexPirce["CAKE"] / callIndexPirce["HELMET"] || 0;
      let ctkHelmet = callIndexPirce["CTK"] / callIndexPirce["HELMET"] || 0;
      // let forHelmet = callIndexPirce["FORTUBE"] / callIndexPirce["HELMET"] || 0;
      let btcHelmet = callIndexPirce["BTCB"] / callIndexPirce["HELMET"] || 0;
      let ethHelmet = callIndexPirce["ETH"] / callIndexPirce["HELMET"] || 0;
      let burgerHelmet =
        callIndexPirce["BURGER"] / callIndexPirce["HELMET"] || 0;
      let wbnbHelmet = callIndexPirce["WBNB"] / callIndexPirce["HELMET"] || 0;
      let mathHelmet = callIndexPirce["MATH"] / callIndexPirce["HELMET"] || 0;
      let shibHelmet = callIndexPirce["SHIB"] / callIndexPirce["HELMET"] || 0;
      let HelmetPirce = {
        HELMET: bnbHelmet,
        CAKE: cakeHelmet,
        CTK: ctkHelmet,
        // FORTUBE: forHelmet,
        BTCB: btcHelmet,
        ETH: ethHelmet,
        BURGER: burgerHelmet,
        WBNB: wbnbHelmet,
        MATH: mathHelmet,
        SHIB: shibHelmet,
      };
      let Helmetbnb = putIndexPirce["HELMET"] || 0;
      let Helmetcake = putIndexPirce["CAKE"] / putIndexPirce["HELMET"] || 0;
      let Helmetctk = putIndexPirce["CTK"] / putIndexPirce["HELMET"] || 0;
      // let Helmetfor = putIndexPirce["FORTUBE"] / putIndexPirce["HELMET"] || 0;
      let Helmetbtc = putIndexPirce["BTCB"] / putIndexPirce["HELMET"] || 0;
      let Helmeteth = putIndexPirce["ETH"] / putIndexPirce["HELMET"] || 0;
      let Helmetburger = putIndexPirce["BURGER"] / putIndexPirce["HELMET"] || 0;
      let Helmetwbnb = putIndexPirce["WBNB"] / putIndexPirce["HELMET"] || 0;
      let Helmetmath = putIndexPirce["MATH"] / putIndexPirce["HELMET"] || 0;
      let Helmetshib = putIndexPirce["SHIB"] / putIndexPirce["HELMET"] || 0;
      let CoinPirce = {
        HELMET: Helmetbnb,
        CAKE: Helmetcake,
        CTK: Helmetctk,
        // FORTUBE: Helmetfor,
        BTCB: Helmetbtc,
        ETH: Helmeteth,
        BURGER: Helmetburger,
        WBNB: Helmetwbnb,
        MATH: Helmetmath,
        SHIB: Helmetshib,
      };
      arr1.push(HelmetPirce);
      arr1.push(CoinPirce);
      this.$store.commit("SET_ALL_HELMET_PRICE", arr1);
      arr.push(callIndexPirce);
      arr.push(putIndexPirce);
      this.$store.commit("SET_ALL_INDEX_PRICE", arr);
      this.$store.commit("SET_ECHART_INDEX_PRICE", echartIndexArray);
      this.$store.commit("SET_BNB_BUSD", bnbbusd);
      this.$store.commit("SET_CAKE_BUSD", cakebusd);
      this.$store.commit("SET_HELMET_BUSD", helmetbusd);
      console.log(arr1, arr);
      this.$bus.$emit("DRAW_ECHART", { drawFlag: true });
    },
  },
};
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.layout-container {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
@media screen and (min-width: 750px) {
  .layout-container {
    > .contractAdress {
      width: 100%;
      min-width: 1026px;
      height: 50px;
      background: #ffffff;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-family: Helvetica;
      color: #17173a;
      font-weight: 600;
      i {
        display: block;
        width: 24px;
        height: 24px;
        background-image: url("../assets/img/helmet/icon_title.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 4px;
      }
      p {
        display: flex;
        align-items: center;
        font-family: Helvetica;
        i {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-image: url("../assets/img/helmet/copy.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          cursor: pointer;
          margin-left: 4px;
        }
      }
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        background: #17173a;
        border-radius: 5px;
        padding: 0 10px;
        font-size: 14px;
        font-family: IBMPlexSans;
        color: #ffffff;
        line-height: 24px;
        text-decoration: underline;
        margin-left: 17px;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
    .content {
      display: flex;
      .content_wrap {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        flex: 1;
        height: calc(100vh - 50px);
        background: #f8f9fa;
        min-width: 1026px;
        // padding: 0 12%;
        margin: 0 auto;
      }
    }
    .close {
      display: none;
    }
  }
}
@media screen and (max-width: 750px) {
  .layout-container {
    > .contractAdress {
      padding: 10px;
      width: 100%;
      height: 112px;
      background: #fff;
      font-size: 12px;
      color: #fd7e14;
      line-height: 20px;
      display: flex;
      box-shadow: 0px 1px 0px 0px #e8e8eb;
      position: relative;
      i {
        display: block;
        width: 24px;
        height: 24px;
        background-image: url("../assets/img/helmet/icon_title.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 2px;
        flex-shrink: 0;
      }
      p {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        overflow: hidden;
        span {
          font-size: 12px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 550;
          color: #17173a;
          line-height: 16px;
        }
        a {
          min-width: 111px;
          height: 32px;
          background: #17173a;
          border-radius: 5px;
          padding: 0 10px;
          font-size: 14px;
          font-family: IBMPlexSans;
          color: #ffffff;
          text-align: center;
          line-height: 32px;
          text-decoration: underline;
        }
      }
      .close {
        width: 24px;
        height: 24px;
        fill: rgba(23, 23, 58, 0.45);
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
