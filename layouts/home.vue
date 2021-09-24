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
    <!-- 下载钱包指引界面 -->
    <WallectDownLoad />
    <!-- 钱包交互状态提示弹框 -->
    <StatusDialog
      v-if="showStatusDialog"
      :data="statusData"
      @close="closeStatusDialog"
    />
    <Airdrop />
    <BuyDialog />
    <RiskConfirmationDialog
      :DialogVisible="RiskVisible"
      :DialogClose="RiskClose"
    />
    <NetWorkConfirmationDialog
      :DialogVisible="NetWorkVisible"
      :DialogClose="NetWorkClose"
    />
  </div>
</template>
<script>
import PHeader from "~/components/common/header.vue";
import PFooter from "~/components/common/footer.vue";
import PSlider from "~/components/common/slider.vue";
import Airdrop from "~/components/common/airdrop.vue";
import BuyDialog from "~/components/common/buy-dialog.vue";
import StatusDialog from "~/components/common/status-dialog.vue";
import WallectDownLoad from "~/components/common/wallet-download.vue";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import {
  openMetaMaskWallet,
  watchAccountChange,
  watchNetWorkChange,
  getNetworkChainID,
} from "../web3/wallet.js";
import { WEB3 } from "../web3/index.js";
import NetWorkConfirmationDialog from "../components/dialogs/network-confirmation-dialog.vue";
import RiskConfirmationDialog from "../components/dialogs/risk-confirmation-dialog.vue";
export default {
  name: "home",
  components: {
    PHeader,
    PSlider,
    PFooter,
    StatusDialog,
    Airdrop,
    BuyDialog,
    WallectDownLoad,
    NetWorkConfirmationDialog,
    RiskConfirmationDialog,
  },
  data() {
    return {
      times: 0,
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
      NetWorkVisible: false,
      RiskVisible: false,
    };
  },
  computed: {
    routeObj() {
      return this.$route;
    },
    ChainID() {
      return this.$store.state.chainID;
    },
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  watch: {
    ChainID: {
      handler: "watchChainID",
      immediate: true,
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
      this.RiskVisible = true;
    }
    this.copy();
    window.WEB3 = WEB3();
    let NetWork = await getNetworkChainID();
    this.$store.dispatch("setChainID", NetWork);
    // 获取映射
    openMetaMaskWallet();
    watchAccountChange();
    watchNetWorkChange();
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
    let themes = localStorage.themes || this.storeThemes || "light";
    document.body.setAttribute("class", themes);
    localStorage.setItem("themes", themes);
    this.$store.dispatch("setThemes", themes);
    this.canShow = true;
  },
  methods: {
    NetWorkClose() {
      this.NetWorkVisible = false;
    },
    RiskClose() {
      this.RiskVisible = false;
    },
    openBUY() {
      this.$bus.$emit("OPEN_BUY_DIALOG", true);
    },
    openStatusDialog() {
      this.showStatusDialog = true;
    },
    closeStatusDialog() {
      window.statusDialog = false;
      this.showStatusDialog = false;
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
    watchChainID(value) {
      console.log(value);
      if (value == 56) {
        this.NetWorkVisible = false;
      } else {
        this.NetWorkVisible = true;
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "~/assets/css/themes.scss";
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
