<template>
  <div class="layout-container" v-if="canShow">
    <div class="contractAdress" v-if="TitleTextShow">
      <i></i>
      <div>
        <span>HELMET Token Contract Address:</span>
        <span>0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8</span>
        <p>
          <a @click="openBUY" class="bsc_helmet">Buy HELMET(BSC)</a>
          <a href="https://www.guard.insure/insurance/" class="matic_helmet"
            >Guard(Polygon)</a
          >
        </p>
      </div>
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
    <buyDialog />
  </div>
</template>
<script>
import PHeader from "~/components/common/header.vue";
import PFooter from "~/components/common/footer.vue";
import PSlider from "~/components/common/slider.vue";
import Airdrop from "~/components/common/airdrop.vue";
import buyDialog from "~/components/common/buy-dialog.vue";
import { web3 } from "~/assets/utils/web3-obj.js";
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
  name: "home",
  components: {
    PHeader,
    PSlider,
    PFooter,
    RiskWarning,
    StatusDialog,
    Airdrop,
    buyDialog,
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
      canShow: false,
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
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  watch: {
    ChainID(newValue) {
      if (newValue == 56) {
        this.closeNetWorkTip();
      } else {
        this.showNetWorkTip();
      }
    },
    storeThemes(newValue) {
      if (newValue) {
        document.body.setAttribute("class", newValue);
        localStorage.setItem("themes", newValue);
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
    this.getBalance();
    this.getIndexPirce();
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
    this.$bus.$on("REFRESH_BALANCE", () => {
      this.getBalance();
    });
    this.$bus.$emit("GET_SLIDER_NUMBER");
    let themes = localStorage.themes || this.storeThemes || "light";
    document.body.setAttribute("class", themes);
    localStorage.setItem("themes", themes);
    this.$store.dispatch("setThemes", themes);
    this.canShow = true;
  },
  methods: {
    openBUY() {
      this.$bus.$emit("OPEN_BUY_DIALOG", true);
    },
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
    monitorNetWorkChange() {
      if (window.ethereum) {
        ethereum.on("chainChanged", (chainID) => {
          window.chainID = chainID;
          this.$store.commit("SET_CHAINID", chainID);
        });
      } else {
        if (this.times < 10) {
          this.times = this.times + 1;
          this.monitorNetWorkChange();
        }
      }
    },
    mointorAccountChange() {
      if (window.ethereum) {
        ethereum.on("accountsChanged", async (account) => {
          let userInfo = await mateMaskInfo(account[0], "MetaMask");
          this.$store.dispatch("setUserInfo", userInfo);
          this.getBalance();
          this.getIndexPirce();
          this.$bus.$emit("REFRESH_MINING");
          this.$bus.$emit("GET_CARD_BALANCE");
          this.$bus.$emit("NFT_WINDOW_STATUS");
        });
      }
    },
    showWallet() {
      try {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (account) => {
            window.localStorage.setItem("currentType", "MetaMask");

            let userInfo = await mateMaskInfo(account[0], "MetaMask");
            this.$store.dispatch("setUserInfo", userInfo);
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
      let forHelmet = callIndexPirce["FOR"] / callIndexPirce["HELMET"] || 0;
      let babyHelmet = callIndexPirce["BABY"] / callIndexPirce["HELMET"] || 0;
      let mcrnbHelmet = callIndexPirce["MCRN"] / callIndexPirce["HELMET"] || 0;
      let faraHelmet = callIndexPirce["FARA"] / callIndexPirce["HELMET"] || 0;
      let alpacaHelmet =
        callIndexPirce["ALPACA"] / callIndexPirce["HELMET"] || 0;
      let bananaHelmet =
        callIndexPirce["BANANA"] / callIndexPirce["HELMET"] || 0;
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
        FOR: forHelmet,
        BABY: babyHelmet,
        MCRN: mcrnbHelmet,
        FARA: faraHelmet,
        ALPACA: alpacaHelmet,
        BANANA: bananaHelmet,
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
      let Helmetfor = putIndexPirce["FOR"] / putIndexPirce["HELMET"] || 0;
      let Helmetbaby = putIndexPirce["BABY"] / putIndexPirce["HELMET"] || 0;
      let Helmetmcrn = putIndexPirce["MCRN"] / putIndexPirce["HELMET"] || 0;
      let Helmetfara = putIndexPirce["FARA"] / putIndexPirce["HELMET"] || 0;
      let Helmetalpaca = putIndexPirce["ALPACA"] / putIndexPirce["HELMET"] || 0;
      let Helmetbanana = putIndexPirce["BANANA"] / putIndexPirce["HELMET"] || 0;
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
        FOR: Helmetfor,
        BABY: Helmetbaby,
        MCRN: Helmetmcrn,
        FARA: Helmetfara,
        ALPACA: Helmetalpaca,
        BANANA: Helmetbanana,
      };
      arr1.push(HelmetPirce);
      arr1.push(CoinPirce);
      this.$store.commit("SET_ALL_HELMET_PRICE", arr1);
      arr.push(callIndexPirce);
      arr.push(putIndexPirce);
      this.$store.commit("SET_ALL_INDEX_PRICE", arr);
      this.$store.commit("SET_BNB_BUSD", bnbbusd);
      this.$store.commit("SET_CAKE_BUSD", cakebusd);
      this.$store.commit("SET_HELMET_BUSD", helmetbusd);
      this.$bus.$emit("DRAW_ECHART", { drawFlag: true });
    },
  },
};
</script>
<style scoped lang="scss">
@import "~/assets/css/base.scss";
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
  @include themeify {
    background: themed("color-f8f9fa");
  }
}
@media screen and (min-width: 750px) {
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 0px;
    background-color: #f5f5f5;
    height: 10px;
    position: fixed;
    bottom: 0;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(0.44, #fd7e14),
      color-stop(0.72, #fd7e14),
      color-stop(0.86, #fd7e14)
    );
  }
  .layout-container {
    > .contractAdress {
      width: 100%;
      min-width: 1026px;
      height: 50px;
      @include themeify {
        background: themed("color-ffffff");
        color: themed("color-17173a");
      }
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-family: Helvetica;
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
      > div {
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
        > p {
          display: flex;
          .bsc_helmet {
            background: #fd7e14;
          }
          .matic_helmet {
            background: #4364e8;
          }
          a {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            border-radius: 5px;
            padding: 0 10px;
            font-size: 14px;
            font-family: IBMPlexSans;
            line-height: 24px;
            text-decoration: underline;
            margin-left: 17px;
            color: #ffffff;
          }
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
        @include themeify {
          background: themed("color-f8f9fa");
        }
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
      @include themeify {
        background: themed("color-ffffff");
        box-shadow: 0px 1px 0px 0px themed("color-e8e8eb");
      }
      font-size: 12px;
      color: #fd7e14;
      line-height: 20px;
      display: flex;
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
      > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        overflow: hidden;
        span {
          font-size: 12px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 550;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 16px;
        }
        > P {
          display: flex;
          .bsc_helmet {
            background: #fd7e14;
          }
          .matic_helmet {
            background: #4364e8;
            margin-left: 17px;
          }
          a {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            border-radius: 5px;
            padding: 0 10px;
            font-size: 14px;
            font-family: IBMPlexSans;
            line-height: 24px;
            text-decoration: underline;
            color: #ffffff;
          }
        }
      }
      .close {
        width: 24px;
        height: 24px;
        fill: #eee;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
