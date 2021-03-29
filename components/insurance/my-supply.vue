<template>
  <div class="my_supply">
    <div class="supply_title">
      <h3>{{ $t("Type.IssueInsurance") }}</h3>
    </div>
    <!-- pc -->
    <div class="supply_item" v-for="item in showList" :key="item.id">
      <section>
        <p>
          <span>{{ $t("Table.ID") }}:{{ item.id }}</span>
          <span>{{ item.dueDate }}</span>
        </p>
        <span :class="item.type == 'Call' ? 'call_text' : 'put_text'">
          {{ item.TypeCoin }} {{ item.type }} {{ item.outPrice }}
          {{ item.outPriceUnit }}
          {{ item.symbol ? "(" + item.symbol + ")" : "" }}
          <i :class="item.type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
        </span>
      </section>
      <section>
        <p>
          <span>{{ $t("Insurance.Insurance_text11") }}: </span>
          <span>{{ item.outPrice }} {{ item.outPriceUnit }}</span>
        </p>
        <p>
          <span>{{ $t("Insurance.Insurance_text12") }}: </span>
          <span>{{ fixD(item.price, 8) }} HELMET</span>
        </p>
      </section>
      <section>
        <p>
          <span>{{ $t("Table.Besold") }}/{{ $t("Table.Unsold") }}:</span>
          <span
            >{{ item.beSold == 0 ? 0 : fixD(item.beSold, 8) }}/{{
                item.remain == "0"
                  ? 0
                  : fixD(item.unSold, 8),
            }}
          </span>
        </p>
        <p>
          <span>{{ $t("Table.DAvailable") }}: </span>
          <span>{{ fixD(item.shortBalance, 8) }} Short Token</span>
        </p>
      </section>
      <section>
        <button
          :style="item.remain == '0' ? 'pointer-events: none;' : ''"
          @click="handleClickCancel(item)"
        >
          {{
            item.remain == 0
              ? $t("Insurance.Insurance_text14")
              : $t("Insurance.Insurance_text15")
          }}
        </button>
        <button>{{ $t("Table.StakeMining") }}</button>
      </section>
    </div>

    <div class="loading" v-if="isLoading">
      <img src="~/assets/img/loading.png" />
      <div class="shadow"></div>
      <p>{{ $t("Table.LoadingWallet") }}</p>
    </div>
    <section
      class="noData"
      v-if="(showList.length < 1 && !isLoading) || !isLogin"
    >
      <div>
        <img src="~/assets/img/helmet/nodata.png" alt="" />
        <p>{{ $t("Table.NoData") }}</p>
      </div>
    </section>
    <section class="pages" v-if="insuranceList.length > 5 && isLogin">
      <Page
        :total="insuranceList.length"
        :limit="limit"
        :page="page + 1"
        @page-change="handleClickChagePage"
      />
    </section>
  </div>
</template>

<script>
import precision from "~/assets/js/precision.js";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import { toWei, fromWei } from "~/assets/utils/web3-fun.js";
import { getTokenName } from "~/assets/utils/address-pool.js";
import { onCancel, getBalance, asks, RePrice } from "~/interface/order.js";
import Page from "~/components/common/page.vue";
import moment from "moment";
export default {
  components: {
    Page,
  },
  data() {
    return {
      precision,
      addCommom: addCommom,
      autoRounding: autoRounding,
      toRounding: toRounding,
      showList: [],
      insuranceList: [],
      getTokenName,
      fixD,
      page: 0,
      limit: 10,
      isLoading: true,
      isLogin: false,
    };
  },
  computed: {
    myAboutInfoSell() {
      return this.$store.state.myAboutInfoSell;
    },
    myAboutInfoBuy() {
      return this.$store.state.aboutInfoBuy;
    },
    rePriceMap() {
      return this.$store.state.repriceMap;
    },
    strikePriceArray() {
      return this.$store.state.strikePriceArray;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    myAboutInfoSell: {
      handler: "myAboutInfoSellWatch",
      immediate: true,
    },
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
  },

  methods: {
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin;
      }
    },
    myAboutInfoSellWatch(newValue) {
      if (newValue) {
        this.page = 0;
        this.limit = 10;
        this.setSettlementList(newValue);
      }
    },
    // 格式化数据
    async setSettlementList(list) {
      this.isLoading = true;
      this.showList = [];
      let result = [];
      let item,
        resultItem,
        amount,
        InsurancePrice,
        _underlying,
        downTime,
        beSold,
        unSold,
        newArray,
        shortBalance,
        askRes;
      const currentTime = new Date().getTime();
      for (let i = 0; i < list.length; i++) {
        item = list[i];
        // 数量
        let Token = getTokenName(item.longInfo._collateral);
        let TokenFlag = getTokenName(item.longInfo._underlying);
        if (
          (TokenFlag == "WBNB" && Token != "BUSD") ||
          (TokenFlag == "BUSD" && Token == "WBNB")
        ) {
          amount = fromWei(item.volume, Token);
          item.flagType = true;
        } else {
          amount = fixD(
            precision.divide(
              fromWei(item.volume, Token),
              this.strikePriceArray[1][TokenFlag]
            ),
            8
          );
          item.flagType = false;
        }
        if (TokenFlag == "WBNB") {
          item.TypeCoin = getTokenName(item.longInfo._collateral);
          item.type = "Call";
          item.outPriceUnit = "BNB";
        } else {
          item.TypeCoin = getTokenName(item.longInfo._underlying);
          item.type = "Put";
          item.outPriceUnit = "BNB";
        }
        if (TokenFlag == "BUSD" && Token == "WBNB") {
          item.TypeCoin = getTokenName(item.longInfo._collateral);
          item.type = "Call";
          item.outPriceUnit = "BUSD";
        }
        if (Token == "BUSD" && TokenFlag == "WBNB") {
          item.TypeCoin = getTokenName(item.longInfo._underlying);
          item.type = "Put";
          item.outPriceUnit = "BUSD";
        }
        // 保单价格
        InsurancePrice = fromWei(item.price, Token == "CTK" ? 30 : Token);
        //倒计时
        downTime = new Date(item.longInfo._expiry * 1000);
        downTime = moment(downTime).format("YYYY/MM/DD HH:mm:ss");
        //已出售
        // beSold = fromWei(this.getBeSold(item.askID), Token);
        // unSold = precision.minus(amount, beSold);

        shortBalance = await getBalance(item.longInfo.short, item._collateral);

        resultItem = {
          id: item.askID,
          volume: amount,
          beSold: 0,
          unSold: 0,
          price: InsurancePrice,
          shortBalance: shortBalance,
          dueDate: downTime,
          _expiry: item.longInfo._expiry * 1000,
          _collateral: item.longInfo._collateral,
          _underlying: item.longInfo._underlying,
          TypeCoin: item.TypeCoin,
          type: item.type,
          outPriceUnit: item.outPriceUnit,
        };

        newArray = this.getNewPrice(item.askID);
        if (newArray) {
          resultItem["volume"] = fromWei(newArray.volume, Token);
          resultItem["price"] = fromWei(
            newArray.newPrice,
            Token == "CTK" ? 30 : Token
          );
          resultItem["id"] = newArray.newAskID;
        }
        askRes = await asks(resultItem.id, "sync", resultItem._collateral);
        if (item.flagType) {
          resultItem["unSold"] = askRes;
          resultItem["beSold"] = precision.minus(amount, resultItem["unSold"]);
          resultItem["outPrice"] = fixD(
            fromWei(item.longInfo._strikePrice, Token == "CTK" ? 30 : Token),
            4
          );
        } else {
          resultItem["unSold"] = fixD(
            precision.divide(askRes, this.strikePriceArray[1][TokenFlag]),
            8
          );
          resultItem["beSold"] = precision.minus(amount, resultItem["unSold"]);
          resultItem["outPrice"] = fixD(
            precision.divide(1, fromWei(item.longInfo._strikePrice, TokenFlag)),
            4
          );
        }

        if (askRes == "0") {
          resultItem["status"] = "Beborrowed";
          resultItem["sort"] = 1;
          resultItem;
        } else {
          resultItem["status"] = "Unborrowed";
          resultItem["sort"] = 0;
        }
        if (parseInt(resultItem._expiry) < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        }
        if (parseInt(resultItem._expiry + 5184000000) < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        resultItem["remain"] = askRes;
        if (resultItem.remain != 0 || resultItem.sort != 3) {
          result.push(resultItem);
        }
      }
      result = result.sort(function (a, b) {
        return b.id - a.id;
      });
      result = result.sort(function (a, b) {
        return a.sort - b.sort;
      });
      this.isLoading = false;

      this.insuranceList = result;
      this.showList = result.slice(this.page * this.limit, this.limit);
    },
    //获取已出售
    getBeSold(id) {
      let list = this.myAboutInfoBuy;
      if (!list) {
        return;
      }
      let array = list.filter((item) => item.askID === id);
      let num = 0;
      let number = 0;
      let arrayList = JSON.parse(JSON.stringify(array));
      if (arrayList.length) {
        arrayList.forEach((item) => {
          if (!isNaN(item.vol)) {
            number = Number(item.vol);
            num = num + number;
          }
        });
        return num;
      } else {
        return 0;
      }
    },
    getNewPrice(id, rtArray) {
      let list = this.rePriceMap;
      if (!list) {
        return;
      }
      let array = list.filter((item) => item.askID === id)[0];
      if (array && array.askID) {
        let arr = this.getNewPrice(array.newAskID, array);
        return arr;
      }
      return rtArray;
    },
    // 撤销
    handleClickCancel(data) {
      // this.$bus.$emit("OPEN_REPRICE", data);
      onCancel(data.id, (status) => {});
      // RePrice(data)
    },
    handleClickChagePage(index) {
      index = index - 1;
      this.page = index;
      let page = index;
      let list = this.insuranceList.slice(
        this.page * this.limit,
        (page + 1) * this.limit
      );
      this.showList = list;
    },

    toMining() {
      // this.$router.push("/mining");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.cancel {
  display: inline-block;
  padding: 3px 10px;
  background: #ff9600;
  line-height: 20px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  margin-left: 8px;
  &:hover {
    background: #ffa000;
  }
}
.call_style {
  background: rgba(0, 185, 0, 0.04);
  &:hover {
    td {
      &:first-child:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0px;
        border-left: 2px solid#00b900;
      }
    }
  }
}

.put_style {
  background: rgba(255, 100, 0, 0.04);
  &:hover {
    td {
      &:first-child:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0px;
        border-left: 2px solid#ff9600;
      }
    }
  }
}
.call_text {
  color: #00b900 !important;
}
.put_text {
  color: #dc3545 !important;
}
@media screen and (min-width: 750px) {
  .o_button {
    margin-right: 12px;
  }
  .my_supply {
    position: relative;
    min-height: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .loading {
      width: 100%;
      margin: auto 0;
    }
    .pages {
      width: 100%;
    }
    .supply_title {
      width: 100%;
    }
    .supply_item {
      width: 100%;
      height: 90px;
      margin-top: 10px;
      display: flex;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
      border-radius: 5px;
      align-items: center;
      padding: 0 20px;
      section {
        &:nth-of-type(1) {
          flex: 5;
          > p {
            display: flex;
            align-items: center;
            span {
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #787878;
              line-height: 14px;
              &:nth-of-type(1) {
                width: 90px;
                display: block;
              }
              &:nth-of-type(2) {
                margin-left: 52px;
              }
            }
          }
          > span {
            margin-top: 10px;
            font-size: 16px;
            font-family: IBMPlexSans-Bold, IBMPlexSans;
            font-weight: bold;
            line-height: 24px;
            display: flex;
            align-items: center;
            i {
              display: inline-block;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              background-size: cover;
              margin-left: 4px;
            }
            .call_icon {
              background-image: url("../../assets/img/helmet/tablecall.png");
            }
            .put_icon {
              background-image: url("../../assets/img/helmet/tableput.png");
            }
          }
          > .call_text {
            color: #00b900;
          }
          > .put_text {
            color: #dc3545;
          }
        }
        &:nth-of-type(2) {
          flex: 4;
          display: flex;
          flex-direction: column;
          p {
            &:nth-of-type(2) {
              margin-top: 12px;
            }
            span {
              &:nth-of-type(1) {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                color: #787878;
                line-height: 14px;
              }
              &:nth-of-type(2) {
                font-size: 14px;
                font-family: IBMPlexSans;
                color: #17173a;
                line-height: 14px;
              }
            }
          }
        }
        &:nth-of-type(3) {
          flex: 4;
          display: flex;
          flex-direction: column;
          p {
            &:nth-of-type(2) {
              margin-top: 12px;
            }
            span {
              &:nth-of-type(1) {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                color: #787878;
                line-height: 14px;
              }
              &:nth-of-type(2) {
                font-size: 14px;
                font-family: IBMPlexSans;
                color: #17173a;
                line-height: 14px;
              }
            }
          }
        }
        &:nth-of-type(4) {
          flex: 3;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          button {
            width: 100px;
            padding: 0px 10px;
            height: 36px;
            background: #f8f9fa;
            border-radius: 5px;
            border: 1px solid #e8e8eb;
            margin-left: 20px;
            font-size: 14px;
            font-family: HelveticaNeue;
            color: #17173a;
            line-height: 24px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 92px;
            &:nth-of-type(2) {
              margin-top: 6px;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .my_insurance {
    table {
      display: none;
      .loading {
        display: none;
      }
    }
    > div {
      .item_box {
        margin-top: 20px;
        width: 100%;
        padding: 20px 10px;

        p {
          display: flex;
          span {
            line-height: 20px;
            display: flex;
            align-items: center;
            i {
              display: inline-block;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              background-size: cover;
              margin-left: 4px;
            }
            .call_icon {
              background-image: url("../../assets/img/helmet/tablecall.png");
            }
            .put_icon {
              background-image: url("../../assets/img/helmet/tableput.png");
            }
          }
          span:nth-of-type(1) {
            font-size: 12px;
            color: #919aa6;
          }
          span:nth-of-type(2) {
            font-weight: bold;
            color: #121212;
          }
        }
        > p {
          align-items: center;
          span:nth-of-type(1) {
            margin-right: 4px;
          }
        }
        > div {
          margin: 12px 0 16px 0;
          display: flex;
          p {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
        }
        > section {
          display: flex;
          justify-content: space-between;
          button {
            width: 46%;
          }
        }
      }
    }
  }
}
</style>
