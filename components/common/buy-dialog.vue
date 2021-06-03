<template>
  <div class="mask" v-if="buyDialog">
    <div class="buy_dialog">
      <div class="buy_dialog_title">
        <span>{{ $t("SwapHelmet.BuyHelmet") }}</span>
        <i @click="handleClickClose"></i>
      </div>
      <div class="buy_dialog_select">
        <div class="swapInput">
          <input type="number" v-model="swapNumber" />
          <div class="right">
            <span
              class="all"
              @click="
                swapNumber = Balance - HelmetFee > 0 ? Balance - HelmetFee : 0
              "
            >
              {{ $t("Table.ALL") }}
            </span>
            <p class="selected" @click="handleTokenList">
              <img :src="activeData.logoURI" alt="" />
              <span>{{ activeData.symbol }}</span>
              <i></i>
            </p>
          </div>
        </div>
        <div class="select_wrap" v-if="showTokenList">
          <input
            class="select_search"
            placeholder="Search name or paste address"
            v-model="searchToken"
          />
          <p><span>Token name</span> <i></i></p>
          <div class="select_token">
            <div class="select_token_list">
              <div
                class="select_token_item"
                v-for="item in ShowList"
                :key="item.symbol"
                @click="handleCheckToken(item)"
              >
                <p>
                  <img :v-lazy="item.logoURI" :src="item.logoURI" alt="" />
                  <span>{{ item.symbol }}</span>
                </p>
                <!-- <span>{{ item.symbol }}</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swap_balance">{{ $t("IIO.Balance") }} : {{ Balance }}</div>
      <div class="swap_earn">
        <img src="~/assets/img/mining/serialnext_web.png" alt="" />
        <span>{{ $t("SwapHelmet.ExEarn") }}</span>
        <p>{{ toRounding(HelmetReward, 8) }}HELMET</p>
      </div>
      <p>
        <span>{{ $t("SwapHelmet.Price") }}</span
        ><span
          >1HELMET={{ toRounding(HelmetPrice, 8) }}{{ activeData.symbol }}</span
        >
      </p>
      <button @click="SwapTokens">
        {{ ApprovedStatus ? "Confirm Swap" : "Approved" }}
      </button>
      <p>
        <span>{{ $t("SwapHelmet.MinEarn") }}</span
        ><span>{{ toRounding(HelmetMinReward, 8) }}HELMET</span>
      </p>
      <p>
        <span>{{ $t("SwapHelmet.Fee") }}</span
        ><span
          >{{ BigNumber(toRounding(HelmetFee, 8).toString()).toFixed()
          }}{{ activeData.symbol }}</span
        >
      </p>
      <span>
        <a
          href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
          target="_blank"
          >{{ $t("SwapHelmet.Server") }}</a
        >
      </span>
    </div>
  </div>
</template>
<script>
import tokenList from "~/assets/utils/tokenlist.json";
import VueLazyload from "vue-lazyload";
import {
  SwapHelmet,
  SwapBNBforTokens,
  SwapTokensforTokens,
  allowance,
  approve,
  BalanceOf,
} from "~/interface/swap.js";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import BigNumber from "bignumber.js";
import { fromWei } from "~/assets/utils/web3-fun.js";
import { web3 } from "~/assets/utils/web3-obj.js";
export default {
  components: {
    VueLazyload,
  },
  data() {
    return {
      buyDialog: false,
      TokenList: tokenList.tokens,
      ShowList: tokenList.tokens,
      showTokenList: false,
      searchToken: "",
      swapNumber: "",
      activeData: {
        address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://exchange.pancakeswap.finance/images/coins/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
        name: "WBNB Token",
        symbol: "BNB",
      },
      HelmetPrice: 0,
      HelmetReward: 0,
      HelmetMinReward: 0,
      HelmetFee: 0,
      Balance: 0,
      autoRounding,
      toRounding,
      BigNumber,
      SwapRouter: false,
      ApprovedStatus: false,
    };
  },
  mounted() {
    this.$bus.$on("OPEN_BUY_DIALOG", (res) => {
      this.buyDialog = res;
    });
    this.getBalance(this.activeData);
    this.HelmetPriceHigh(this.activeData);
    this.ApproveFlag(this.activeData);
  },
  computed: {
    SwapParams() {
      return { SwapNumber: this.swapNumber, SwapData: this.activeData };
    },
  },
  watch: {
    searchToken: {
      handler: "searchTokenWatch",
      immediate: true,
    },
    SwapParams: {
      handler: "SwapParamsWatch",
      immediate: true,
    },
    activeData: {
      handler: "activeDataWatch",
      immediate: true,
    },
    swapNumber(newValue) {
      if (!newValue) {
        this.HelmetPriceHigh(this.activeData);
      }
    },
  },
  methods: {
    async getBalance(newValue) {
      if (this.activeData.symbol == "BNB") {
        let timer = setTimeout(() => {
          if (process.client) {
            window.WEB3.eth.getBalance(window.CURRENTADDRESS).then((res) => {
              this.Balance = fixD(fromWei(res), 4);
            });
          }
        }, 1000);
        this.$once("hook:beforeDestroy", () => {
          clearTimeout(timer);
        });
      } else {
        this.Balance = fixD(await BalanceOf(newValue), 4);
      }
    },
    SwapParamsWatch(newValue) {
      this.SwapHelmetFunction();
    },
    activeDataWatch(newValue) {
      if (newValue) {
        this.HelmetPriceHigh(newValue);
        this.ApproveFlag(newValue);
        this.getBalance(newValue);
      }
    },
    async ApproveFlag(newValue) {
      let Approve = await allowance(newValue.address);
      if (newValue.symbol != "BNB" && newValue.symbol != "WBNB") {
        this.ApprovedStatus = Approve;
      } else {
        this.ApprovedStatus = true;
      }
    },
    async HelmetPriceHigh(newValue) {
      let swapNumber;
      if (newValue.symbol == "BNB" || newValue.symbol == "WBNB") {
        swapNumber = 0.01;
      } else if (newValue.symbol == "BTCB") {
        swapNumber = 0.0001;
      } else if (newValue.symbol == "ETH") {
        swapNumber = 0.001;
      } else {
        swapNumber = 1;
      }
      await SwapHelmet(
        swapNumber,
        newValue,
        {
          address: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          chainId: 56,
          decimals: 18,
          name: "Helmet.insure",
          symbol: "Helmet",
        },
        (res) => {
          this.HelmetPrice = swapNumber / res.amount;
        }
      );
    },
    async SwapTokens() {
      let data = {
        activeData: this.activeData,
        SwapNumber: this.swapNumber,
        MinReward: this.HelmetMinReward,
        SwapRouter: this.SwapRouter,
      };

      if (this.ApprovedStatus) {
        if (this.swapNumber <= 0) {
          return;
        }
        if (this.activeData.symbol != "BNB") {
          await SwapTokensforTokens(data, (res) => {
            if (res.status == "swap_success") {
              this.handleClickClose();
            }
          });
        } else {
          await SwapBNBforTokens(data, (res) => {
            if (res.status == "swap_success") {
              this.handleClickClose();
            }
          });
        }
      } else {
        await approve(this.activeData, (res) => {
          if (res == "approve_success") {
            this.ApprovedStatus = true;
          }
        });
      }
    },
    async SwapHelmetFunction() {
      if (this.swapNumber > 0) {
        await SwapHelmet(
          this.swapNumber,
          this.activeData,
          {
            address: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
            chainId: 56,
            decimals: 18,
            name: "Helmet.insure",
            symbol: "Helmet",
          },
          (res) => {
            console.log(res);
            this.HelmetReward = res.amount;
            this.HelmetPrice = this.swapNumber / res.amount;
            this.HelmetMinReward = BigNumber(
              (res.amount * 0.995).toString()
            ).toFixed(8);
            this.SwapRouter = res.router;
            this.HelmetFee = res.router
              ? BigNumber(
                  this.swapNumber * (0.0025 + (1 - 0.0025) * 0.0025).toString()
                ).toFixed()
              : BigNumber(this.swapNumber).times(0.0025).toFixed();
          }
        );
      } else {
        this.HelmetPrice = 0;
        this.HelmetReward = 0;
        this.HelmetMinReward = 0;
        this.HelmetFee = 0;
      }
    },
    searchTokenWatch(newValue) {
      if (newValue) {
        this.ShowList = this.TokenList;
        this.ShowList = this.filterList(newValue);
      } else {
        this.ShowList = this.TokenList;
      }
    },
    handleClickClose() {
      this.$bus.$emit("OPEN_BUY_DIALOG", false);
    },
    handleTokenList() {
      this.showTokenList = !this.showTokenList;
    },
    handleCheckToken(data) {
      this.activeImg = data.logoURI;
      this.activeToken = data.symbol;
      this.showTokenList = false;
      this.activeData = data;
    },
    filterList(newValue) {
      let keyWord = newValue;
      let List = this.TokenList;
      var Token = [];
      for (var i = 0; i < List.length; i++) {
        if (
          List[i].symbol.toLowerCase().indexOf(keyWord.toLowerCase()) >= 0 ||
          List[i].address.toLowerCase() == keyWord.toLowerCase() ||
          List[i].name.toLowerCase().indexOf(keyWord.toLowerCase()) >= 0
        ) {
          Token.push(List[i]);
        }
      }
      return Token;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
}
@media screen and(min-width:750px) {
  .buy_dialog {
    width: 360px;
  }
}
@media screen and(max-width:750px) {
  .buy_dialog {
    width: 90%;
  }
}
.buy_dialog {
  @include themeify {
    background: themed("color-ffffff");
  }
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 25px 20px;
  > .buy_dialog_title {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 16px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      @include themeify {
        background: themed("color-17173a");
      }
      line-height: 20px;
    }
    i {
      display: block;
      width: 20px;
      height: 20px;
      background: url("../../assets/img/icon/guanbi.png") center center
        no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      position: absolute;
      right: 24px;
      top: 24px;
    }
  }
  .right {
    position: absolute;
    right: 0;
    align-items: center;
    display: flex;
    height: 100%;
  }
  > .buy_dialog_select {
    margin-top: 20px;
    width: 100%;
    height: 40px;
    position: relative;
    .swapInput {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      position: relative;
      > input {
        border-radius: 5px;
        flex: 1;
        width: 100px;
        height: 100%;
        background: transparent;
        padding: 0 5px 0 10px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        @include themeify {
          color: lighten($color: themed("color-17173a"), $amount: 0.7);
        }
        @include themeify {
          border: 1px solid themed("color-e8e8eb");
        }
        line-height: 20px;
        &:focus {
          border-color: #ff9600;
        }
      }
    }
    .all {
      padding: 0 8px;
      height: 24px;
      @include themeify {
        background: themed("color-f8f9fa");
      }
      border-radius: 5px;
      @include themeify {
        border: 1px solid themed("color-e8e8eb");
      }
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      @include themeify {
        background: themed("color-17173a");
      }
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: #fffaf3;
        border: 1px solid #fd7e14;
      }
    }
    .selected {
      margin: 0 10px;
      display: flex;
      align-items: center;
      padding: 0 4px;
      height: 24px;
      @include themeify {
        background: themed("color-f8f9fa");
      }
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid transparent;
      right: 10px;
      &:hover {
        background: #fffaf3;
        border: 1px solid #fd7e14;
      }
      img {
        width: 18px;
        height: 18px;
        margin-right: 4px;
      }
      span {
        font-size: 14px;
        font-family: IBMPlexSans;
        color: #121212;
        line-height: 18px;
      }
      > i {
        display: block;
        width: 16px;
        height: 16px;
        background: url("../../assets/img/icon/select.png") center center
          no-repeat;
        background-size: 100% 100%;
        right: 24px;
        top: 24px;
      }
    }
  }
  .select_wrap {
    width: 100%;
    height: 240px;
    @include themeify {
      background: themed("color-ffffff");
    }
    box-shadow: 0px 2px 4px 0px rgba(23, 23, 58, 0.2);
    border-radius: 5px;
    position: absolute;
    left: 0;
    top: calc(100% + 8px);
    padding: 20px 0;
    z-index: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .select_search {
      width: calc(100% - 40px);
      height: 40px;
      border-radius: 5px;
      font-size: 14px;
      @include themeify {
        border: 1px solid themed("color-e8e8eb");
      }
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      @include themeify {
        color: lighten($color: themed("color-17173a"), $amount: 0.4);
      }
      line-height: 20px;
      padding: 0 10px;
      &::placeholder {
        @include themeify {
          color: lighten($color: themed("color-17173a"), $amount: 0.4);
        }
      }
      &:focus {
        border: 1px solid #ff9600;
      }
    }
    > p {
      width: calc(100% - 40px);
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      span {
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        @include themeify {
          color: lighten($color: themed("color-17173a"), $amount: 0.7);
        }
        line-height: 17px;
      }
      i {
        width: 16px;
        height: 16px;
        display: block;
        background: url("../../assets/img/icon/sort.png") center center
          no-repeat;
        background-size: 100% 100%;
        line-height: 17px;
      }
    }
    .select_token {
      width: 100%;
      flex: 1;
      overflow-y: scroll;
      &::-webkit-scrollbar-track {
        background-color: #fff !important;
      }
      &::-webkit-scrollbar {
        width: 6px !important;
        background-color: #f5f5f5;
        height: 40px !important;
        position: fixed;
        bottom: 0;
      }
      &::-webkit-scrollbar-thumb {
        height: 40px;
        background: rgba(23, 23, 58, 0.4) !important;
      }
    }
    .select_token_item {
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      &:hover {
        @include themeify {
          background: themed("color-f8f9fa");
        }
      }
      p {
        padding-left: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        img {
          width: 18px;
          height: 18px;
        }
        span {
          font-size: 14px;
          font-family: IBMPlexSans;
          color: #121212;
          line-height: 32px;
          font-weight: 550;
          margin-left: 8px;
        }
      }
      span {
        padding-right: 20px;
        font-size: 14px;
        font-family: IBMPlexSans;
        color: #121212;
        line-height: 32px;
        font-weight: 550;
        margin-left: 8px;
      }
    }
  }
  > .swap_balance {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    @include themeify {
      color: lighten($color: themed("color-17173a"), $amount: 0.7);
    }
    line-height: 12px;
    margin-top: 4px;
  }
  > .swap_earn {
    margin-top: 20px;
    width: 100%;
    height: 80px;
    @include themeify {
      background: themed("color-f8f9fa");
    }
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 34px;
      height: 34px;
      position: absolute;
      transform: translateY(-50%);
    }
    span {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #7a7f82;
      line-height: 17px;
      margin-top: 25px;
    }
    p {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      @include themeify {
        background: themed("color-17173a");
      }
      line-height: 22px;
    }
  }
  > p {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    span {
      &:nth-child(1) {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        @include themeify {
          color: lighten($color: themed("color-17173a"), $amount: 0.7);
        }
        line-height: 12px;
      }
      &:nth-child(2) {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        @include themeify {
          background: themed("color-17173a");
        }
        line-height: 12px;
      }
    }
  }
  > button {
    margin-top: 20px;
    width: 100%;
    height: 40px;
    background: #fd7e14;
    border-radius: 5px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    @include themeify {
      color: themed("color-ffffff");
    }
    line-height: 18px;
  }
  > span {
    display: flex;
    justify-content: center;
    margin-top: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #b6b9bc;
    line-height: 17px;
    a {
      color: #b6b9bc;
    }
  }
}
</style>