<template>
  <div class="header-container">
    <div>
      <a class="logo" href="https://www.helmet.insure" target="_self">
        <img src="~/assets/img/helmet/trade_logo.png" />
      </a>
      <div class="nav-list">
        <nuxt-link
          to="/"
          :class="routeObj.name === 'product-id' ? 'active' : ''"
          >{{ $t("Header.Trade") }}</nuxt-link
        >
        <nuxt-link to="/mining"
          >{{ $t("Header.Mining") }}
          <p class="new"></p>
        </nuxt-link>
        <nuxt-link to="/flashmining">{{ $t("Header.FlashMining") }} </nuxt-link>
        <nuxt-link to="/burnbox"
          >{{ $t("Header.BruningBox") }}
          <p class="fire"></p>
        </nuxt-link>
        <a href="https://helmet-insure.gitbook.io/helmet/" target="_blank">{{
          $t("Header.GuideBook")
        }}</a>
        <a href="https://helmetinsure.medium.com/" target="_blank">{{
          $t("Header.Medium")
        }}</a>
      </div>
      <!-- 分割线 -->
      <a
        v-if="!userInfo.data.isLogin"
        class="connect-wallet-btn"
        @click="openWallectSelect"
        >{{ $t("Header.ConnectWallet") }}</a
      >
      <div v-else class="address-wrap">
        <div v-if="ChainID != 56" class="wrong">
          <img src="~/assets/img/helmet/wrongnetwork.png" alt="" />
          <span>{{ $t("Header.ConnectWrong") }}</span>
        </div>
        <template v-else>
          <div class="balance-wrap">
            <img src="~/assets/img/helmet/helmetCoin.png" alt="" />
            <span>{{ BalanceArray["HELMET"] }}</span>
          </div>
          <div class="wallet-address" @click="openCurrentAccount">
            <span>{{ accountText }}</span>
            <i></i>
          </div>
        </template>
      </div>

      <WallectSelect
        v-if="showWallectSelect"
        @close="closeWallectSelect"
      ></WallectSelect>
      <!-- <Langauage></Langauage> -->
      <div class="more" @click="handleShowMask">
        <div></div>
      </div>

      <CurrentAccount
        v-if="showCurrentAccount"
        @close="closeCurrentAccount"
        @change="openChangeWallet"
      ></CurrentAccount>
      <ChangeAccount
        v-if="showChangeWallet"
        @close="closeChangeWallet"
        @back="openCurrentAccount"
      ></ChangeAccount>
    </div>
  </div>
</template>
<script>
import WallectSelect from "./wallet-select";
import CurrentAccount from "~/components/account/current-account.vue";
import ChangeAccount from "~/components/account/change-account.vue";
import Langauage from "~/components/common/langauage.vue";
import { getID } from "~/assets/utils/address-pool.js";
export default {
  name: "p-header",
  components: {
    WallectSelect,
    CurrentAccount,
    ChangeAccount,
    Langauage,
  },
  data() {
    return {
      showWallectSelect: false,
      accountText: "",
      showMask: false,
      showCurrentAccount: false, // 显示当前账户信息
      showChangeWallet: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    routeObj() {
      return this.$route;
    },
    BalanceArray() {
      let obj = this.$store.state.BalanceArray;
      return obj;
    },
    ChainID() {
      let chainID = this.$store.state.chainID;
      return chainID;
    },
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
    ChainID(newValue) {
      this.chainID = newValue;
    },
  },
  mounted() {},
  methods: {
    openChangeWallet() {
      this.showChangeWallet = true;
    },
    closeChangeWallet() {
      this.showChangeWallet = false;
    },
    openCurrentAccount() {
      this.showCurrentAccount = true;
    },
    closeCurrentAccount() {
      this.showCurrentAccount = false;
    },
    userInfoWatch(newValue) {
      if (newValue.data && newValue.data.account) {
        let account = newValue.data.account;
        account = account.toUpperCase();
        this.accountText =
          account.substr(0, 1) +
          " " +
          account.substr(1, 1) +
          " " +
          account.substr(2, 4) +
          "..." +
          account.substr(-5);
      }
    },
    openWallectSelect() {
      this.showWallectSelect = true;
    },
    closeWallectSelect() {
      this.showWallectSelect = false;
    },
    handleShowMask() {
      this.$store.dispatch("setMaskDialog", true);
    },
    handleCloseMask() {
      this.$store.dispatch("setMaskDialog", false);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.header-container {
  width: 100%;
  height: 80px;
  background: #fff;
  border-bottom: 1px solid #f7f7fa;
  > div {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    text-align: center;
    .nav-list {
      flex: 1;
      display: flex;
      a {
        display: inline-block;
        margin-left: 40px;
        position: relative;
        color: #121212;
        font-weight: bold;
        p {
          position: absolute;
        }
        .new {
          background: url("../../assets/img/helmet/new.png") no-repeat;
          width: 18px;
          height: 18px;
          top: 15px;
          right: 0;
          background-size: cover;
          transform: translateX(80%);
        }
        .fire {
          background: url("../../assets/img/helmet/fire.png") no-repeat;
          width: 21px;
          height: 26px;
          top: 10px;
          right: 0;
          background-size: cover;
          transform: translateX(75%);
        }
        &::after {
          display: none;
          content: "";
          position: absolute;
          left: 0px;
          bottom: 0px;
          width: 100%;
          height: 2px;
          background: #ff9600;
        }
        &.active,
        &.nuxt-link-exact-active {
          &::after {
            display: block;
          }
        }
      }
    }
    .wrong {
      min-width: 171px;
      height: 36px;
      background: #ec4711;
      border-radius: 18px;
      display: flex;
      align-items: center;
      padding: 0 11px;
      img {
        width: 24px;
        height: 24px;
        margin-right: 4px;
      }
      span {
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        line-height: 22px;
      }
    }
    .address-wrap {
      border-radius: 20px;
      display: flex;
      height: 36px;
      align-items: center;
      overflow: hidden;
    }
    .balance-wrap {
      height: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: rgba(255, 150, 0, 0.1);
      padding: 0 12px 0 4px;
      img {
        width: 30px;
        height: 30px;
        margin-right: 4px;
        text-align: center;
      }
      span {
        min-width: 80px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #ff9600;
        line-height: 20px;
      }
    }
    .wallet-address {
      padding: 0px 12px;
      height: 100%;
      display: flex;
      align-items: center;
      background: #121212;
      color: #ffffff;
      cursor: pointer;
      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #14b465;
        margin-left: 8px;
        border: 1px solid #fff;
      }
    }
    .connect-wallet-btn {
      display: block;
      background: #121212;
      padding: 0px 18px;
      color: #ffffff;
      border-radius: 20px;
      &:hover {
        background: #2c2c2c;
      }
    }
  }
}
@media screen and (min-width: 1360px) {
  .header-container {
    > div {
      padding: 0 80px;
    }
  }
}
@media screen and (min-width: 750px) {
  .header-container {
    > div {
      // width: 1200px;
      min-width: 1200px;
      .logo {
        img {
          height: 40px;
        }
      }
      .nav-list {
        flex: 1;
        display: flex;
        a {
          height: 80px;
          line-height: 80px;
          font-size: 16px;
        }
      }
      .wallet-address {
        height: 40px;
      }
      .connect-wallet-btn {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
      }
    }
  }
  .cut-line {
    width: 1px;
    height: 19px;
    background: #cb7e7e;
    margin: 0 20px 0 16px;
  }
}
// @media screen and (min-width: 750px) and (max-width: 1280px) {
//   .header-container {
//     height: 60px;
//     > div {
//       width: 1200px;
//       .logo {
//         img {
//           height: 40px;
//         }
//       }
//       .nav-list {
//         flex: 1;
//         display: flex;
//         a {
//           display: inline-block;
//           margin-left: 40px;
//           height: 60px;
//           line-height: 60px;
//           position: relative;
//           color: #121212;
//           font-size: 16px;
//           font-weight: 500;
//         }
//       }
//       .wallet-address {
//         height: 40px;
//       }
//       .connect-wallet-btn {
//         height: 40px;
//         line-height: 40px;
//         font-size: 14px;
//       }
//     }
//   }
// }

@media screen and (max-width: 750px) {
  .header-container {
    justify-content: space-between;
    > div {
      justify-content: space-between;
      width: 100%;
      .logo {
        margin-left: 16px;
        img {
          height: 40px;
        }
      }
      .nav-list {
        display: none;
      }
      .address-wrap {
        display: none;
      }
      .wallet-address {
        display: none;
      }
      .connect-wallet-btn {
        display: none;
      }
      .more {
        width: 100px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        > div {
          width: 24px;
          height: 24px;
          background-image: url("../../assets/img/helmet/caidan@2x.png");
          background-repeat: no-repeat;
          background-size: cover;
          margin-right: 16px;
        }
      }
    }
  }
}
</style>