<template>
  <div class="mask" v-if="buyDialog">
    <div class="buy_dialog">
      <div class="buy_dialog_title">
        <span>Buy HELMET</span>
        <i @click="handleClickClose"></i>
      </div>
      <div class="buy_dialog_select">
        <input type="text" />
        <span class="all">
          {{ $t("Table.ALL") }}
        </span>
        <p class="selected" @click="handleTokenList">
          <img :src="activeImg" alt="" />
          <span>{{ activeToken }}</span>
          <i></i>
        </p>
        <div class="select_wrap" v-if="showTokenList">
          <input
            class="select_search"
            placeholder="Search name or paste address"
          />
          <p><span>Token name</span> <i>111</i></p>
          <div class="select_token">
            <div class="select_token_list">
              <div
                class="select_token_item"
                v-for="item in TokenList"
                :key="item.symbol"
                @click="handleCheckToken(item)"
              >
                <p>
                  <img :v-lazy="item.logoURI" :src="item.logoURI" alt="" />
                  <span>{{ item.symbol }}</span>
                </p>
                <span>{{ item.symbol }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swap_balance">{{ $t("IIO.Balance") }}:11</div>
      <div class="swap_earn">
        <img src="~/assets/img/mining/serialnext_web.png" alt="" />
        <span>预计收到</span>
        <p>--HELMET</p>
      </div>
      <p><span>Price</span><span>1HELMET=0.002BNB</span></p>
      <button>Confirm Swap</button>
      <p><span>Price</span><span>1HELMET=0.002BNB</span></p>
      <p><span>Price</span><span>1HELMET=0.002BNB</span></p>
      <span>该服务由 PANCAKE 提供支持</span>
    </div>
  </div>
</template>

<script>
import tokenList from "~/assets/utils/tokenlist.json";
import Swap from "~/assets/utils/swap.js";
import VueLazyload from "vue-lazyload";
export default {
  components: {
    VueLazyload,
  },
  data() {
    return {
      buyDialog: true,
      TokenList: tokenList.tokens,
      showTokenList: false,
      activeImg:
        "https://exchange.pancakeswap.finance/images/coins/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
      activeToken: "BNB",
    };
  },
  mounted() {
    this.$bus.$on("OPEN_BUY_DIALOG", (res) => {
      this.buyDialog = res;
    });
  },
  methods: {
    handleClickClose() {
      this.$bus.$emit("OPEN_BUY_DIALOG", false);
    },
    handleTokenList() {
      this.showTokenList = true;
    },
    handleCheckToken(data) {
      console.log(data);
      this.activeImg = data.logoURI;
      this.activeToken = data.symbol;
      this.showTokenList = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
}
.buy_dialog {
  width: 360px;
  height: 399px;
  background: #ffffff;
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
      color: #17173a;
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
  > .buy_dialog_select {
    margin-top: 20px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #e8e8eb;
    display: flex;
    align-items: center;
    position: relative;
    &:hover {
      border-color: #ff9600;
    }
    > input {
      flex: 1;
      width: 100px;
      height: 100%;
      background: transparent;
      padding: 0 5px 0 10px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(23, 23, 58, 0.7);
      line-height: 20px;
    }
    .all {
      padding: 0 8px;
      height: 24px;
      background: #f8f9fa;
      border-radius: 5px;
      border: 1px solid #e8e8eb;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #17173a;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: #fffaf3;
        border: 1px solid #fd7e14;
      }
    }
    > .selected {
      margin: 0 10px;
      display: flex;
      align-items: center;
      padding: 0 4px;
      height: 24px;
      background: #f8f9fa;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid transparent;
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
    background: #ffffff;
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
      border: 1px solid #e8e8eb;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(23, 23, 58, 0.4);
      line-height: 20px;
      padding: 0 10px;
      &::placeholder {
        color: rgba(23, 23, 58, 0.4);
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
        color: rgba(23, 23, 58, 0.7);
        line-height: 17px;
      }
      i {
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(23, 23, 58, 0.7);
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
        background: #f7f7fa;
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
    color: rgba(23, 23, 58, 0.7);
    line-height: 12px;
    margin-top: 4px;
  }
  > .swap_earn {
    margin-top: 20px;
    width: 100%;
    height: 80px;
    background: #f7f7fa;
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
      color: #17173a;
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
        color: rgba(23, 23, 58, 0.7);
        line-height: 12px;
      }
      &:nth-child(2) {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #17173a;
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
    color: #ffffff;
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
  }
}
</style>