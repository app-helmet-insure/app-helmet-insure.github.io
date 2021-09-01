<template>
  <div class="header-container">
    <div class="logo">
      <img
        :src="require(`~/assets/img/helmet/header_logo_${storeThemes}.png`)"
        alt=""
      />
      <div class="more" @click="handleShowMask">
        <svg width="24px" height="24px" class="menu">
          <path
            d="M3,4 L21,4 L21,6 L3,6 L3,4 Z M3,19 L21,19 L21,21 L3,21 L3,19 Z M11,14 L21,14 L21,16 L11,16 L11,14 Z M11,9 L21,9 L21,11 L11,11 L11,9 Z M7,12.5 L3,16 L3,9 L7,12.5 Z"
            id="形状"
            fill-opacity="0.87"
            fill-rule="nonzero"
          ></path>
        </svg>
      </div>
    </div>
    <div class="account">
      <div class="airdrop_web airdrop" @click="handleClickAirdrop">
        <img
          :src="require(`~/assets/img/icon/airdrop_${storeThemes}.png`)"
          alt=""
        />
      </div>
      <span class="migration" @click="jump">
        <img src="~/assets/img/guard/Polygon.png" alt="" />
        Migration</span
      >
      <a
        v-if="!userInfo.data.isLogin"
        class="connect-wallet-btn"
        @click="openWallectSelect"
        >{{ $t("Header.ConnectWallet") }}
      </a>
      <div v-else class="address-wrap">
        <div v-if="ChainID != 56 && ChainID != 137" class="wrong">
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
        :Type="WallectSelectType"
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
      <div class="airdrop_h5 airdrop" @click="handleClickAirdrop">
        <img
          :src="require(`~/assets/img/icon/airdrop_${storeThemes}.png`)"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script>
import WallectSelect from "./wallet-select";
import CurrentAccount from "~/components/account/current-account.vue";
import ChangeAccount from "~/components/account/change-account.vue";
import Langauage from "~/components/common/langauage.vue";
import { maticNetwork, bscNetwork } from "~/interface/common_contract.js";
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
      WallectSelectType: "ALL",
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
    storeThemes() {
      return this.$store.state.themes;
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

  methods: {
    jump() {
      this.$router.push("/migration");
    },
    handleClickAirdrop() {
      this.$bus.$emit("AIRDROP_DIALOG", true);
    },
    async handleClickNetwork() {
      this.showWallectSelect = true;
      this.WallectSelectType = "NETWORK";
    },
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
      this.WallectSelectType = "ALL";
    },
    closeWallectSelect() {
      this.showWallectSelect = false;
      this.WallectSelectType = "ALL";
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
    .migration {
      min-width: 100px;
      height: 40px;
      padding: 0 15px;
      // background: #9f66ff;
      background: rgba(#9f66ff, $alpha: 0.2);
      border-radius: 5px;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      line-height: 22px;
      text-align: center;
      line-height: 40px;
      margin-right: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
        color: #9f66ff;
      img {
        width: 24px;
        height: 24px;
        margin-right: 4px;
      }
    }
    .wrong {
      min-width: 171px;
      height: 36px;
      @include themeify {
        background: themed("color-dc3545");
      }
      // background: #dc3545;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 11px;
      .wrongnetwork {
        width: 24px;
        height: 24px;
        @include themeify {
          fill: themed("color-ffffff");
        }
      }
      span {
        font-size: 16px;
        font-weight: 600;
        @include themeify {
          color: themed("color-ffffff");
        }
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
      @include themeify {
        background: themed("color-fd7e14");
      }
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
        @include themeify {
          color: themed("color-ffffff");
        }
        line-height: 20px;
        font-family: Helvetica;
      }
    }
    .wallet-address {
      min-width: 116px;
      @include themeify {
        background: themed("color-17173a");
      }
      padding: 0px 10px;
      height: 100%;
      display: flex;
      align-items: center;
      @include themeify {
        color: themed("color-ffffff");
      }
      cursor: pointer;
      font-weight: 600;
      font-family: Helvetica;
      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        @include themeify {
          background: themed("color-14b465");
          border: 2px solid themed("color-ffffff");
        }
        margin-left: 4px;
      }
    }
    .connect-wallet-btn {
      min-width: 140px;
      height: 40px;
      border-radius: 5px;
      display: block;
      padding: 0px 10px;
      line-height: 40px;
      @include themeify {
        background: themed("color-17173a");
        color: themed("color-ffffff");
        &:hover {
          background: themed("color-2c2c2c");
        }
      }
    }
  }
}
@media screen and (min-width: 750px) {
  .header-container {
    width: 80%;
    margin: 20px auto;
    min-width: 1026px;
    // height: 80px;
    @include themeify {
      background: themed("color-f8f9fa");
    }
    .logo {
      display: none;
    }
    .airdrop_h5 {
      display: none;
    }
    .account {
      .airdrop {
        margin-right: 20px;
        cursor: pointer;
        > img {
          width: 24px;
          height: 24px;
        }
      }
      justify-content: flex-end;
    }
  }
}
@media screen and (max-width: 750px) {
  .header-container {
    justify-content: space-between;
    padding: 12px 10px 50px;
    @include themeify {
      background: themed("color-ffffff");
    }
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
        svg {
          @include themeify {
            fill: themed("color-17173a");
          }
        }
      }
    }
    .account {
      .airdrop_web {
        display: none;
      }
      .migration {
        display: none;
      }
      .airdrop {
        margin-left: 20px;
        cursor: pointer;
        > img {
          width: 24px;
          height: 24px;
        }
      }
      margin-top: 15px;
      justify-content: flex-start;
    }
  }
}
</style>
