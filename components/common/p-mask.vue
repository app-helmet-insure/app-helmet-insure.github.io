<template>
  <div class="p-mask" v-if="showMask">
    <div class="p-mask-title">
      <a href="/">
        <img src="~/assets/img/helmet/home_logo.png" alt="" />
      </a>
      <span @click="closeMask"></span>
    </div>
    <ul class="navList">
      <li v-for="item in this.renderList" :key="item.url" @click="closeMask">
        <a v-if="item.link" :href="item.url">{{ item.text }}</a>
        <span v-else @click="toPath(item)">
          {{ item.text }}
          <i :class="item.logo" v-if="item.logo"></i>
        </span>
      </li>
    </ul>
    <ul class="navList">
      <li v-for="item in this.localeList" :key="item.key">
        <span @click="switchLang(item.key)">{{ item.name }}</span>
      </li>
    </ul>
    <a
      v-if="!userInfo.data.isLogin"
      class="connect-wallet-btn"
      @click="openWallectSelect"
      >Connect to a wallet</a
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
</template>

<script>
import WallectSelect from "./wallet-select";
import CurrentAccount from "~/components/account/current-account.vue";
import ChangeAccount from "~/components/account/change-account.vue";
export default {
  name: "p-mask",
  components: {
    WallectSelect,
    CurrentAccount,
    ChangeAccount,
  },
  data() {
    return {
      MaskFlag: false,
      accountText: "",
      showWallectSelect: false,
      lang: "",
      langName: "",
      showChangeWallet: false,
      showCurrentAccount: false, // 显示当前账户信息
    };
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
    lang(newVol) {
      this.switchLang(newVol);
      this.langName = this.localeList.filter(
        (item) => item.key == newVol
      )[0].name;
    },
    locale: {
      handler: "watchLocale",
      immediate: true,
    },
    ChainID(newValue) {
      this.chainID = newValue;
    },
  },
  mounted() {
    this.lang = window.localStorage.getItem("lang") || this.locale;
  },
  computed: {
    ChainID() {
      let chainID = this.$store.state.chainID;
      return chainID;
    },
    showMask() {
      return this.$store.state.showDialog.showMask;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    routeObj() {
      return this.$route;
    },
    locales() {
      return this.$store.state.locales;
    },
    locale() {
      return this.$store.state.locale;
    },
    localeList() {
      return this.$store.state.localeList;
    },
    BalanceArray() {
      let obj = this.$store.state.BalanceArray;
      return obj;
    },
    renderList() {
      return [
        {
          url: "/",
          link: false,
          text: this.$t("Header.Trade"),
        },
        {
          url: "/mining",
          link: false,
          text: this.$t("Header.Mining"),
          logo: "new",
        },
        {
          url: "/flashmining",
          link: false,
          text: this.$t("Header.FlashMining"),
        },
        {
          url: "/burnbox",
          link: false,
          text: this.$t("Header.BruningBox"),
          logo: "fire",
        },
        // {
        //   url: '/plan',
        //   link: false,
        //   text: this.$t('Header.MySupply'),
        // },
        // {
        //   url: '/mining',
        //   link: false,
        //   text: this.$t('Header.LPMining'),
        // },
        {
          url: "https://helmet-insure.gitbook.io/helmet/",
          link: true,
          text: this.$t("Header.GuideBook"),
        },
        {
          url: "https://helmetinsure.medium.com/",
          link: true,
          text: this.$t("Header.Medium"),
        },
        // {
        //   type: 'PAYASO',
        //   link: false,
        //   text: this.$t('Assets.My') + ' ' + 'PAYA',
        // },
      ];
    },
  },
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
    watchLocale(newVol) {
      this.lang = newVol;
    },
    switchLang(lang) {
      this.lang = lang;
      window.localStorage.setItem("lang", this.lang);
      this.$store.dispatch("setLanguage", this.lang);
      this.$i18n.locale = this.lang;
      this.$store.dispatch("setMaskDialog", false);
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
    closeMask() {
      this.$store.dispatch("setMaskDialog", false);
    },
    toPath(options) {
      if (options.url) {
        this.$store.dispatch("setPayasoDialog", false);
        this.$store.dispatch("setMaskDialog", false);
        this.$router.push(options.url);
      } else {
        if (options.type) {
          this.$store.dispatch("setPayasoDialog", true);
        } else {
          this.$store.dispatch("setMaskDialog", false);
        }
      }
    },
    closeWallectSelect() {
      this.showWallectSelect = false;
      this.closeMask();
    },
  },
};
</script>

<style lang='scss' scoped>
.p-mask {
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 101;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 3px 16px;
  .p-mask-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    > a {
      img {
        width: 107px;
        height: 21px;
      }
    }
    > span {
      display: block;
      width: 24px;
      height: 24px;
      background-image: url("../../assets/img/icon/guanbi.png");
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
    }
  }
  .navList {
    display: flex;
    flex-direction: column;
    li {
      cursor: pointer;
      margin-top: 30px;
      text-align: left;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      line-height: 14px;
      letter-spacing: 1px;
      a {
        color: #ffffff;
      }
      span {
        position: relative;
      }
      .fire {
        display: block;
        width: 21px;
        height: 26px;
        background-image: url("../../assets/img/helmet/fire.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        right: 0;
        top: -100%;
        transform: translateX(90%);
      }
      .new {
        display: block;
        width: 18px;
        height: 18px;
        background-image: url("../../assets/img/helmet/new.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        right: 0;
        top: -90%;
        transform: translateX(90%);
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
    position: absolute;
    margin-top: 30px;
    border-radius: 20px;
    display: flex;
    height: 36px;
    align-items: center;
    overflow: hidden;
  }
  .balance-wrap {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 12px 0 4px;
    background: rgba(255, 150, 0, 0.1);
    img {
      width: 30px;
      height: 30px;
      margin-right: 4px;
    }
    span {
      min-width: 80px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #ff9600;
      line-height: 20px;
      text-align: center;
    }
  }
  .connect-wallet-btn {
    display: block;
    margin-top: 30px;
    width: 180px;
    height: 36px;
    line-height: 36px;
    background: transparent;
    padding: 0px 18px;
    border-radius: 20px;
    background: #ff9600;
    font-weight: 500;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
  }
  .wallet-address {
    display: flex;
    background: #ff9600;
    height: 36px;
    line-height: 36px;
    padding: 0px 12px;
    align-items: center;
    span {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      margin-right: 10px;
    }
    i {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #14b465;
      border: 2px solid #fff;
    }
  }
}
</style>