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
        <img :src="require(`~/assets/img/icon/airdrop_${storeThemes}.png`)" alt="" />
      </div>
      <span class="migration" @click="jump">
        <img src="~/assets/img/guard/Polygon.png" alt="" />
        Migration</span
      >
      <a
        v-if="!CurrentAccount.isLogin"
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
            <span>{{ HelmetBalance }}</span>
          </div>
          <div class="wallet-address" @click="openCurrentAccount">
            <span>{{ accountText }}</span>
            <i></i>
          </div>
        </template>
      </div>
      <img class="avatar" src="../../assets/img/dashboard/justine-dusk-avatar.png" alt="" v-if="duskNftAvatar === 'justineDusk'">
      <img class="avatar" src="../../assets/img/dashboard/dusk-avatar.png" alt="" v-else-if="duskNftAvatar === 'dusk'">
      <img class="avatar" :src="'https://avatars.dicebear.com/api/identicon/' + storeAccount + '.svg'" alt="" v-else>
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
        <img :src="require(`~/assets/img/icon/airdrop_${storeThemes}.png`)" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import WallectSelect from "./wallet-select";
import CurrentAccount from "~/components/account/current-account.vue";
import ChangeAccount from "~/components/account/change-account.vue";
import Langauage from "~/components/common/langauage.vue";
import {getOnlyMultiCallProviderPlus, HelmetBalance, processResult} from "../../web3/index.js";
import {ChainId, NFTHelper} from "../../web3/address";
import {Contract} from "ethers-multicall-x";
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
      HelmetBalance: 0,
      duskNftAvatar: null
    };
  },
  computed: {
    CurrentAccount() {
      return this.$store.state.userInfo;
    },
    storeAccount() {
      return this.$store.state.userInfo.account;
    },
    RefreshData() {
      return this.$store.state.refreshNumber;
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
    storeAccount:function () {
      this.getNFT721()
    },
    CurrentAccount: {
      handler: "reloadData",
      immediate: true,
    },
    ChainID(newValue) {
      this.chainID = newValue;
    },
    RefreshData: {
      handler: "refreshData",
      immediate: true,
    },
  },
  created() {
    this.getNFT721()
  },
  mounted() {},
  methods: {
    getNFT721() {
      if (!this.storeAccount){
        return
      }
      const DuskNFT = "0xeDfbf15775a2E42E03d059Fb98DA6e92284de7be"
      const JustineDusk = "0x17DFb8867184aFa9116Db927B87C27CC27A92F89"
      const nfts = [DuskNFT, JustineDusk]
      const multicall = getOnlyMultiCallProviderPlus(ChainId.BSC)
      const contract = new Contract(NFTHelper.address, NFTHelper.abi)
      const calls = nfts.reduce((calls_, nftAddress) => {
        calls_.push(contract.getAll(nftAddress, this.storeAccount))
        return calls_
      }, [])
      multicall.all(calls).then(async res => {
        const [[duskIds], [justineIds]] = processResult(res)
        if (justineIds.length > 0){
          this.duskNftAvatar = 'justineDusk'
        } else if (duskIds.length > 0) {
          this.duskNftAvatar = 'dusk'
        }
      })
    },
    reloadData(Value) {
      if (Value && Value.account) {
        let account = Value.account;
        account = account.toUpperCase();
        this.accountText =
          account.substr(0, 1) +
          account.substr(1, 1).toLowerCase() +
          account.substr(2, 3) +
          "..." +
          account.substr(-4);
        this.getHelmetBalance();
      }
    },
    refreshData(NewValue, Value) {
      if (Value != NewValue && NewValue > Value) {
        this.getHelmetBalance();
      }
    },
    jump() {
      this.$router.push("/migration");
    },
    async getHelmetBalance() {
      this.HelmetBalance = await HelmetBalance();
    },
    handleClickAirdrop() {
      this.$bus.$emit("OpenAirdropDialogs");
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
@import "~/assets/css/themes.scss";
.avatar{
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-left: 10px;
}
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
    @include themeify {
      background: transparent;
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
          width: 30px;
          height: 30px;
          //animation: airdrop 1s linear infinite;
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
      background: transparent;
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
          width: 30px;
          height: 30px;
          //animation: airdrop 1s linear infinite;
        }
      }
      margin-top: 15px;
      justify-content: flex-start;
    }
  }
}
@keyframes airdrop {
  0% {
    transform: translate(0);
  }
  25% {
    transform: translate(5px, -10px) rotate(45deg);
  }
  50% {
    transform: translate(0);
  }
  75% {
    transform: translate(-5px, -10px) rotate(-45deg);
  }
  100% {
    transform: translate(0);
  }
}
</style>
