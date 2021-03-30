<template>
  <div class="header-container">
    <div>
      <a
        v-if="!userInfo.data.isLogin"
        class="connect-wallet-btn"
        @click="openWallectSelect"
        >{{ $t("Header.ConnectWallet") }}</a
      >
      <div v-else class="address-wrap">
        <div v-if="ChainID != 56" class="wrong">
          <svg class="wrongnetwork" aria-hidden="true">
            <use xlink:href="#icon-wrongnetwork"></use>
          </svg>
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
      <div class="more" @click="handleShowMask"></div>

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
          account.substr(1, 1).toLowerCase() +
          account.substr(2, 3) +
          "..." +
          account.substr(-4);
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
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.header-container {
  height: 80px;
  background: #f8f9fa;
  min-width: 1026px;
  > div {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: center;
    .wrong {
      min-width: 171px;
      height: 36px;
      background: #dc3545;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 11px;
      .wrongnetwork {
        width: 24px;
        height: 24px;
        fill: #fff;
      }
      span {
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        line-height: 22px;
      }
    }
    .address-wrap {
      border-radius: 5px;
      display: flex;
      height: 40px;
      align-items: center;
      overflow: hidden;
    }
    .balance-wrap {
      height: 100%;
      display: flex;
      align-items: center;
      background: #fd7e14;
      padding: 0 10px;
      img {
        width: 30px;
        height: 30px;
        margin-right: 1px;
      }
      span {
        font-family: Helvetica;
        height: 20px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        line-height: 20px;
        font-family: Helvetica;
      }
    }
    .wallet-address {
      min-width: 116px;
      background: #17173a;
      padding: 0px 10px;
      height: 100%;
      display: flex;
      align-items: center;
      color: #ffffff;
      cursor: pointer;
      font-weight: 600;
      font-family: Helvetica;
      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #14b465;
        margin-left: 4px;
        border: 2px solid #fff;
      }
    }
    .connect-wallet-btn {
      min-width: 140px;
      height: 40px;
      background: #17173a;
      border-radius: 5px;
      display: block;
      padding: 0px 10px;
      color: #ffffff;
      &:hover {
        background: #2c2c2c;
      }
    }
  }
}

@media screen and (min-width: 750px) {
  .header-container {
    width: 80%;
    margin: 0 auto;
    > div {
      // width: 1200px;
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
//           color: #17173a;
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
      padding: 0 16px;
      justify-content: space-between;
      width: 100%;
      .logo {
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
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }
}
</style>
