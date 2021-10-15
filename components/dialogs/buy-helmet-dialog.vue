<template>
  <el-dialog
    top="35vh"
    :title="$t('SwapHelmet.BuyHelmet')"
    footer
    append-to-body
    custom-class="buy_dialog"
    :close-on-click-modal="false"
    :visible="DialogVisible"
    @close="DialogClose"
  >
    <div class="buy_dialog_wrap">
      <div class="buy_dialog_select">
        <div class="swapInput">
          <input
            type="number"
            v-model="swapNumber"
            @input="changeInputSwapNumber"
          />
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
              <i
                ><svg width="16px" height="16px" class="icon">
                  <polygon
                    id="路径"
                    fill-opacity="0.87"
                    fill-rule="nonzero"
                    transform="translate(8.182000, 7.944500) scale(1, -1) translate(-8.182000, -7.944500) "
                    points="8.182 7.414 5.707 9.889 5 9.182 8.182 6 11.364 9.182 10.657 9.889"
                  ></polygon></svg
              ></i>
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
                :key="item.name"
                @click="handleCheckToken(item)"
              >
                <p>
                  <img :v-lazy="item.logoURI" :src="item.logoURI" alt="" />
                  <span>{{ item.symbol }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swap_balance">{{ $t("IIO.Balance") }} : {{ Balance }}</div>
      <div class="swap_earn">
        <img src="~/assets/img/mining/serialnext_web.png" alt="" />
        <span>{{ $t("SwapHelmet.ExEarn") }}</span>
        <p>{{ HelmetReward }}HELMET</p>
      </div>
      <p>
        <span>{{ $t("SwapHelmet.Price") }}</span>
        <span> 1HELMET={{ HelmetPrice }}{{ activeData.symbol }} </span>
      </p>
      <button @click="handleClickSwapTokens" class="o_button">
        {{ ApproveStatus ? "Confirm Swap" : "Approved" }}
      </button>
      <p>
        <span>{{ $t("SwapHelmet.MinEarn") }}</span
        ><span>{{ HelmetMinReward }} HELMET</span>
      </p>
      <!-- <p>
        <span>{{ $t("SwapHelmet.Fee") }}</span
        ><span>
          {{ BigNumber(toRounding(HelmetFee, 8).toString()).toFixed() }}
          {{ activeData.symbol }}</span
        >
      </p> -->
      <span>
        <a
          href="https://matcha.xyz/markets/56/0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          target="_blank"
          >{{ $t("SwapHelmet.Server") }}</a
        >
      </span>
    </div>
  </el-dialog>
</template>
<script>
import tokenList from "~/config/tokenlist.json";
import VueLazyload from "vue-lazyload";
import { buyHelmetOptions } from "~/interface/event.js";
import { fixD, autoRounding, toRounding } from "~/assets/js/util.js";
import MiningABI from "~/web3/abis/MiningABI.json";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import BigNumber from "bignumber.js";
import Web3 from "web3";
import { Contract } from "ethers-multicall-x";
import {
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
  toWei,
  getContract,
} from "~/web3/index.js";
export default {
  props: ["DialogVisible", "DialogClose"],
  components: {
    VueLazyload,
  },
  data() {
    return {
      TokenList: tokenList.tokens,
      ShowList: tokenList.tokens,
      showTokenList: false,
      searchToken: "",
      swapNumber: "",
      activeData: {
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        chainId: 56,
        decimals: 18,
        logoURI:
          "https://tokens.pancakeswap.finance/images/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png",
        name: "BNB Token",
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
      ApproveStatus: false,
      RequestData: {},
      Timer: null,
    };
  },
  computed: {
    CurrentAccount() {
      return this.$store.state.userInfo;
    },
    SwapParams() {
      return { SwapNumber: this.swapNumber, SwapData: this.activeData };
    },
  },
  watch: {
    CurrentAccount: {
      handler: "reloadData",
      immediate: true,
    },
    searchToken: {
      handler: "searchTokenWatch",
      immediate: true,
    },
    activeData: {
      handler: "activeDataWatch",
      immediate: true,
    },
  },
  methods: {
    reloadData(Value) {
      if (Value && Value.account) {
        this.getBalance(this.activeData);
      }
    },
    activeDataWatch(newValue) {
      if (newValue && window.chainID === 56) {
        this.getBalance(newValue);
      }
    },
    getBalance(newValue) {
      this.changeInputSwapNumber();
      const Account = this.CurrentAccount.account;
      if (this.activeData.symbol == "BNB") {
        window.WEB3.eth.getBalance(Account).then((res) => {
          this.Balance = fixD(fromWei(res), 4);
        });
        this.ApproveStatus = true;
      } else {
        const BalanceContracts = new Contract(newValue.address, MiningABI);
        const ApproveContracts = new Contract(newValue.address, ERC20ABI.abi);
        const PromiseList = [
          BalanceContracts.balanceOf(Account),
          ApproveContracts.allowance(Account, this.RequestData.allowanceTarget),
        ];
        const MulticallProvider = getOnlyMultiCallProvider();
        MulticallProvider.all(PromiseList).then((res) => {
          const FixData = processResult(res);
          const [Balance, ApproveStatus] = FixData;
          console.log(Balance, ApproveStatus);
          this.Balance = fixD(fromWei(Balance), 4);
          this.ApproveStatus = ApproveStatus * 1 > 0;
        });
      }
    },
    changeInputSwapNumber() {
      this.HelmetReward = "--";
      this.HelmetMinReward = "--";
      this.HelmetPrice = "--";
      clearTimeout(this.Timer);
      this.Timer = setTimeout(() => {
        let sellAmount;
        if (this.swapNumber) {
          sellAmount = this.swapNumber;
        } else {
          if (
            this.activeData.symbol == "BNB" ||
            this.activeData.symbol == "WBNB"
          ) {
            sellAmount = "0.01";
          } else if (this.activeData.symbol == "BTCB") {
            sellAmount = "0.0001";
          } else if (this.activeData.symbol == "ETH") {
            sellAmount = "0.001";
          } else {
            sellAmount = "1";
          }
        }
        buyHelmetOptions({
          sellToken: this.activeData.address,
          sellAmount: toWei(sellAmount, this.activeData.decimals),
        }).then((res) => {
          let RequestData = res.data;
          this.RequestData = RequestData;
          if (this.swapNumber) {
            this.HelmetReward = toRounding(fromWei(RequestData.buyAmount), 4);
            this.HelmetMinReward = toRounding(
              (1 - 0.0003) * fromWei(RequestData.buyAmount),
              4
            );
          }
          this.HelmetPrice = toRounding(1 / RequestData.price, 8);
        });
      }, 500);
      if (!this.swapNumber) {
        this.HelmetReward = 0;
        this.HelmetMinReward = 0;
      }
    },

    handleClickSwapTokens() {
      const Account = this.CurrentAccount.account;
      const web3 = new Web3(window.ethereum);
      const Infinity =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      if (this.ApproveStatus) {
        web3.eth
          .sendTransaction({
            from: Account,
            gasPrice: this.RequestData.gasPrice,
            gas: 1000000,
            to: this.RequestData.to,
            value: this.RequestData.value,
            data: this.RequestData.data,
          })
          .then((res) => {
            console.log(res);
          });
      } else {
        const ApproveContracts = getContract(
          ERC20ABI.abi,
          this.activeData.address
        );
        ApproveContracts.methods
          .approve(this.RequestData.allowanceTarget, Infinity)
          .send({ from: Account })
          .on("transactionHash", (hash) => {})
          .on("receipt", (receipt) => {
            this.ApproveStatus = true;
            this.$store.dispatch("refreshData");
          })
          .on("error", (error) => {
            this.ApproveStatus = false;
          });
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

<style lang='scss' >
@import "~/assets/css/themes.scss";
@media screen and(min-width:750px) {
  .buy_dialog {
    border-radius: 10px !important;
    width: 450px !important;
  }
}
@media screen and(max-width:750px) {
  .buy_dialog {
    width: 95% !important;
  }
}
.buy_dialog_wrap {
  @include themeify {
    background: themed("color-ffffff");
  }
  border-radius: 8px;
  > .buy_dialog_title {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 16px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      @include themeify {
        color: themed("color-17173a");
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
          color: darken($color: themed("color-17173a"), $amount: 30%);
        }
        @include themeify {
          border: 2px solid themed("swap_border");
        }
        line-height: 20px;
        &:focus {
          border-color: #ff9600;
        }
      }
    }
    .all {
      padding: 0 12px;
      height: 30px;
      @include themeify {
        background: themed("insure_button");
        border: 1px solid themed("insure_button_border");
        color: themed("color-17173a");
      }
      &:hover {
        border: 1px solid themed("color-fd7e14") !important;
        color: themed("color-fd7e14") !important;
      }
      border-radius: 5px;

      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;

      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .selected {
      margin: 0 10px 0 5px;
      display: flex;
      align-items: center;
      padding: 0 4px;
      height: 30px;
      @include themeify {
        background: themed("insure_button");
        border: 1px solid themed("insure_button_border");
        color: themed("color-17173a");
      }
      &:hover {
        border: 1px solid themed("color-fd7e14") !important;
        color: themed("color-fd7e14") !important;
      }
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid transparent;
      right: 10px;
      img {
        width: 18px;
        height: 18px;
        margin-right: 4px;
      }
      span {
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          color: themed("color-121212");
        }

        line-height: 18px;
      }
      > i {
        display: block;
        width: 16px;
        height: 16px;
        background-size: 100% 100%;
        right: 24px;
        top: 24px;
        .icon {
          @include themeify {
            fill: themed("color-000000");
          }
        }
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
      background-color: transparent;
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
        color: darken($color: themed("color-17173a"), $amount: 60%);
      }
      line-height: 20px;
      padding: 0 10px;
      &::placeholder {
        @include themeify {
          color: darken($color: themed("color-17173a"), $amount: 60%);
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
          color: darken($color: themed("color-17173a"), $amount: 30%);
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
          background: themed("swap_border");
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
          @include themeify {
            color: themed("color-121212");
          }
          line-height: 32px;
          font-weight: 550;
          margin-left: 8px;
        }
      }
      span {
        padding-right: 20px;
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          color: themed("color-121212");
        }
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
      color: darken($color: themed("color-17173a"), $amount: 30%);
    }
    line-height: 12px;
    margin-top: 4px;
  }
  > .swap_earn {
    margin-top: 20px;
    width: 100%;
    height: 80px;
    @include themeify {
      background: themed("swap_background");
      border: 2px solid themed("swap_border");
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
        color: themed("color-17173a");
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
          color: darken($color: themed("color-17173a"), $amount: 30%);
        }
        line-height: 12px;
      }
      &:nth-child(2) {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        @include themeify {
          color: themed("color-17173a");
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
    font-weight: 600;
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