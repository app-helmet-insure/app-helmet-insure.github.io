<template>
  <div class="header-container">
    <div class="logo">
      <img src="~/assets/img/helmet/header_logo.png" alt="" />
      <div class="more" @click="handleShowMask">
        <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
          <path
            d="M3,4 L21,4 L21,6 L3,6 L3,4 Z M3,19 L21,19 L21,21 L3,21 L3,19 Z M11,14 L21,14 L21,16 L11,16 L11,14 Z M11,9 L21,9 L21,11 L11,11 L11,9 Z M7,12.5 L3,16 L3,9 L7,12.5 Z"
            id="形状"
            fill="#17173A"
            fill-rule="nonzero"
          ></path>
        </svg>
      </div>
    </div>
    <div class="account">
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
  props: ["account"],
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
      this.$bus.$emit("OPEN_SILDER", true);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.header-container {
  > .account {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
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
      line-height: 40px;
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
    min-width: 1026px;
    height: 80px;
    background: #f8f9fa;
    .logo {
      display: none;
    }
    .account {
      justify-content: flex-end;
    }
  }
}
@media screen and (max-width: 750px) {
  .header-container {
    justify-content: space-between;
    padding: 12px 10px 20px;
    background: #fff;
    .logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 115px;
        height: 30px;
      }
      .more {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
    }
    .account {
      margin-top: 15px;
      justify-content: flex-start;
    }
  }
}
</style>
