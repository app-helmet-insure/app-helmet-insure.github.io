<template>
  <div class="my_supply">
    <div class="supply_title">
      <h3>{{ $t("Type.IssueInsurance") }}</h3>
    </div>
    <!-- pc -->
    <template v-if="isLogin">
      <div class="supply_item" v-for="item in showList" :key="item.askID">
        <section>
          <p>
            <span>{{ $t("Table.ID") }}:{{ item.askID }}</span>
            <span>{{ item.show_expiry }}</span>
          </p>
          <span :class="item.type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.TypeCoin }} {{ item.type }} {{ item.show_strikePrice }}
            {{ item.outPriceUnit }}
            {{ item.symbol ? "(" + item.symbol + ")" : "" }}
            <i :class="item.type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section>
          <p>
            <span>{{ $t("Insurance.Insurance_text11") }}: </span>
            <span>{{ item.show_strikePrice }} {{ item.outPriceUnit }}</span>
          </p>
          <p>
            <span>{{ $t("Table.PolicyPrice") }}: </span>
            <span>{{ fixD(item.show_price, 8) }} HELMET</span>
          </p>
        </section>
        <section>
          <p>
            <span>{{ $t("Table.Besold") }}:</span>
            <span>{{ fixD(item.beSold, 8) }} </span>
          </p>
          <p>
            <span>{{ $t("Table.Unsold") }}: </span>
            <span>{{
                item.remain == "0"
                  ? 0
                  : fixD(item.unSold, 8),
            }}</span>
          </p>
        </section>
        <section>
          <button
            :class="Number(item.remain) - 0 !== 0 && 'active'"
            :style="Number(item.remain) == '0' ? 'pointer-events: none;' : ''"
            @click="handleClickCancel(item)"
          >
            {{
              Number(item.remain) == 0
                ? $t("Insurance.Insurance_text14")
                : $t("Insurance.Insurance_text15")
            }}
          </button>
          <!-- <button>{{ $t("Table.StakeMining") }}</button> -->
        </section>
      </div>
    </template>
    <!-- pc -->
    <template>
      <div
        class="supply_item_H5"
        v-for="item in showList"
        :key="item.askID + '1'"
      >
        <section>
          <p>
            <span>{{ $t("Table.ID") }}:{{ item.askID }}</span>
            <span>{{ item.show_expiry }}</span>
          </p>
        </section>
        <section>
          <span :class="item.type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.TypeCoin }} {{ item.type }} {{ item.show_strikePrice }}
            {{ item.outPriceUnit }}
            {{ item.symbol ? "(" + item.symbol + ")" : "" }}
            <i :class="item.type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section>
          <p>
            <span>{{ $t("Insurance.Insurance_text11") }}: </span>
            <span>{{ item.show_strikePrice }} {{ item.outPriceUnit }}</span>
          </p>
          <p>
            <span>{{ $t("Table.PolicyPrice") }}: </span>
            <span>{{ fixD(item.show_price, 8) }} HELMET</span>
          </p>
        </section>
        <section>
          <p>
            <span>{{ $t("Table.Besold") }}:</span>
            <span
              >{{ item.beSold == 0 ? fixD(0, 8) : fixD(item.beSold, 8) }}
            </span>
          </p>
          <p>
            <span>{{ $t("Table.Unsold") }}: </span>
            <span>{{
                Number(item.remain) == "0"
                  ? fixD(0,8)
                  : fixD(item.unSold, 8),
            }}</span>
          </p>
        </section>
        <section>
          <button
            :class="Number(item.remain) - 0 !== 0 && 'active'"
            :style="Number(item.remain) == '0' ? 'pointer-events: none;' : ''"
            @click="handleClickCancel(item)"
          >
            {{
              item.remain == 0
                ? $t("Insurance.Insurance_text14")
                : $t("Insurance.Insurance_text15")
            }}
          </button>
        </section>
      </div>
    </template>
    <div class="loading" v-if="isLoading && isLogin">
      <img src="~/assets/img/loading.png" />
      <div class="shadow"></div>
      <p>{{ $t("Table.LoadingWallet") }}</p>
    </div>
    <section
      class="noData"
      v-if="(showList.length < 1 && !isLoading) || !isLogin"
    >
      <div>
        <img
          :src="require(`~/assets/img/helmet/nodata_${storeThemes}.png`)"
          alt=""
        />
        <p>{{ $t("Table.NoData") }}</p>
      </div>
    </section>
    <section class="pages" v-if="FilterList.length > 5 && isLogin">
      <Page
        :total="FilterList.length"
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
import { getTokenName } from "~/assets/utils/address-pool.js";
import { onCancel, getBalance, asks, RePrice } from "~/interface/order.js";
import Page from "~/components/common/page.vue";
import { getInsuranceList } from "~/interface/event.js";
import {
  TokenDecimals,
  getDecimals,
  DecimalsFormWei,
  fromWei,
  AddressFormWei,
  getAccounts,
} from "~/interface/common_contract.js";
import { Asks } from "~/interface/read_contract.js";
import { Cancel } from "~/interface/write_contract.js";
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
      getTokenName,
      fixD,
      page: 0,
      limit: 10,
      isLoading: true,
      isLogin: false,
      FilterList: [],
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
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
    FilterList: {
      handler: "fliterListWatch",
      immediate: true,
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin;
      }
    },
    fliterListWatch(newValue) {
      if (newValue) {
        let list = newValue;
        this.showList = list.slice(0, this.limit);
      }
    },
    getList() {
      this.isLoading = true;
      getInsuranceList().then(async (res) => {
        let CurrentAccount = await getAccounts();
        let ReturnList = res.data.data.options;
        let FixListPush = [];
        let FixList = [];
        let nowDate = parseInt(moment.now() / 1000);
        ReturnList = ReturnList.filter((item) => {
          if (
            item.asks.length > 0 &&
            item.strikePrice.length > 2 &&
            Number(item.expiry) + 5814000 > nowDate
          ) {
            return item;
          }
        });
        ReturnList.forEach((item) => {
          // 标的
          let UnderlyingDecimals = TokenDecimals(item.underlying);
          let UnderlyingSymbol = getTokenName(item.underlying);
          // 抵押
          let CollateralDecimals = TokenDecimals(item.collateral);
          let CollateralSymbol = getTokenName(item.collateral);
          // 执行
          let StrikePriceDecimals =
            18 + UnderlyingDecimals - CollateralDecimals;
          if (UnderlyingSymbol == "WBNB") {
            item.TypeCoin = CollateralSymbol;
            item.type = "Call";
            item.outPriceUnit = "BNB";
            item.show_strikePrice = DecimalsFormWei(
              item.strikePrice,
              StrikePriceDecimals
            );
          } else {
            item.TypeCoin = UnderlyingSymbol;
            item.type = "Put";
            item.outPriceUnit = "BNB";
            item.show_strikePrice =
              1 / DecimalsFormWei(item.strikePrice, StrikePriceDecimals);
          }
          if (UnderlyingSymbol == "BUSD" && CollateralSymbol == "WBNB") {
            item.TypeCoin = CollateralSymbol;
            item.type = "Call";
            item.outPriceUnit = "BUSD";
            item.show_strikePrice = DecimalsFormWei(
              item.strikePrice,
              StrikePriceDecimals
            );
          }
          if (CollateralSymbol == "BUSD" && UnderlyingSymbol == "WBNB") {
            item.TypeCoin = UnderlyingSymbol;
            item.type = "Put";
            item.outPriceUnit = "BUSD";
            item.show_strikePrice =
              1 / DecimalsFormWei(item.strikePrice, StrikePriceDecimals);
          }
          item.show_expiry = moment(new Date(item.expiry * 1000)).format(
            "YYYY/MM/DD HH:mm:ss"
          );
          let ResultItem = {
            TypeCoin: item.TypeCoin,
            expiry: item.expiry,
            show_expiry: item.show_expiry,
            id: item.id,
            long: item.long,
            outPriceUnit: item.outPriceUnit,
            show_strikePrice: fixD(
              item.show_strikePrice,
              item.TypeCoin == "SHIB" ? 10 : 4
            ),
            short: item.short,
            strikePrice: item.strikePrice,
            type: item.type,
            collateral: item.collateral,
            collateral_symbol: CollateralSymbol,
            collateral_decimals: CollateralDecimals,
            underlying: item.underlying,
            underlying_symbol: UnderlyingSymbol,
            underlying_decimals: UnderlyingDecimals,
          };
          item.asks.filter(async (item) => {
            item.settleToken_symbol = getTokenName(item.settleToken);
            item.show_price = fixD(
              DecimalsFormWei(item.price, StrikePriceDecimals),
              8
            );

            let AsksInfo = await Asks(item.askID);
            let Remain = fixD(
              AddressFormWei(AsksInfo.remain, ResultItem.collateral),
              8
            );
            item.remain = Remain;
            let Volume = fixD(
              AddressFormWei(item.volume, ResultItem.collateral),
              8
            );
            if (Number(Remain) == "0") {
              item.status = "Beborrowed";
              item.sort = 1;
            } else {
              item.status = "Unborrowed";
              item.sort = 0;
            }
            if (parseInt(ResultItem.expiry) < nowDate) {
              item.status = "Expired";
              item.sort = 2;
            }
            if (ResultItem.type == "Call") {
              item.show_volume = Volume;
              item.unSold = Remain;
              item.beSold = Volume - Remain;
            } else {
              item.show_volume = fixD(
                Volume / this.strikePriceArray[1][ResultItem.underlying_symbol],
                8
              );
              item.unSold =
                Remain / this.strikePriceArray[1][ResultItem.underlying_symbol];
              // item.beSold = item.show_volume - Remain;
              item.beSold = fixD(
                (Volume - Remain) /
                  this.strikePriceArray[1][ResultItem.underlying_symbol],
                8
              );
            }
            if (item.expiry < nowDate) {
              item.status = "dated";
            }
            Object.assign(item, ResultItem);
            if (item.seller.toLowerCase() == CurrentAccount.toLowerCase()) {
              FixListPush.push(item);
              FixListPush = FixListPush.sort(function (a, b) {
                return Number(b.expiry) - Number(a.expiry);
              });
              FixListPush = FixListPush.sort(function (a, b) {
                return b.askID - a.askID;
              });
              FixListPush = FixListPush.sort(function (a, b) {
                return a.sort - b.sort;
              });
            }
          });
        });
        FixList = FixListPush;
        this.FilterList = FixList;
        this.isLoading = false;
        return this.FilterList;
      });
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
      this.$bus.$emit("OPEN_STATUS_DIALOG", {
        title: "WARNING",
        layout: "layout1",
        conText: `Cancel your Policy supplying order.`,
        activeTip: true,
        activeTipText1: "Please double check the price above，",
        activeTipText2: "Helmet team will not cover your loss on this.",
        loading: false,
        button: true,
        buttonText: "Confirm",
        showDialog: true,
      });
      this.$bus.$on("PROCESS_ACTION", (res) => {
        if (res) {
          Cancel(data.askID, (status) => {
            if (status == "success") {
              this.getList();
            }
          });
        }
        data = {};
      });
    },
    handleClickChagePage(index) {
      index = index - 1;
      this.page = index;
      let page = index;
      let list = this.FilterList.slice(
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
  background: #fd7e14;
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
        border-left: 2px solid#28a745;
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
        border-left: 2px solid#fd7e14;
      }
    }
  }
}
.call_text {
  color: #28a745 !important;
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
    .supply_item_H5 {
      display: none;
    }
    .loading {
      width: 100%;
      margin: auto 0;
    }
    .pages {
      width: 100%;
    }
    .supply_title {
      width: 100%;
      @include themeify {
        color: themed("color-17173a");
      }
    }
    .supply_item {
      width: 100%;
      height: 90px;
      margin-top: 10px;
      display: flex;
      @include themeify {
        background: themed("color-ffffff");
      }
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
              @include themeify {
                color: themed("media_icon");
              }
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
            color: #28a745;
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
                @include themeify {
                  color: themed("media_icon");
                }
                line-height: 14px;
              }
              &:nth-of-type(2) {
                font-size: 14px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: themed("color-17173a");
                }
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
                @include themeify {
                  color: themed("media_icon");
                }
                line-height: 14px;
              }
              &:nth-of-type(2) {
                font-size: 14px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: themed("color-17173a");
                }
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
            @include themeify {
              background: themed("insure_button");
              border: 1px solid themed("insure_button_border");
              color: themed("insure_button_text");
            }
            &:hover {
              border: 1px solid themed("color-fd7e14") !important;
            }
            border-radius: 5px;
            margin-left: 20px;
            font-size: 14px;
            font-family: HelveticaNeue;
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
          .active {
            color: #fff;
            background: #fd7e14;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .my_supply {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 10px;
    .supply_item {
      display: none;
    }
    .loading {
      width: 100%;
      margin: auto 0;
    }
    .pages {
      width: 100%;
    }
    .supply_title {
      width: 100%;
      height: 44px;
      margin-left: 10px;
      line-height: 55px;
      @include themeify {
        color: themed("color-17173a");
      }
    }
    .supply_item_H5 {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      display: flex;
      @include themeify {
        background: themed("color-ffffff");
      }
      box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
      border-radius: 5px;
      padding: 20px 16px;
      section {
        &:nth-of-type(1) {
          > p {
            display: flex;
            align-items: center;
            span {
              font-size: 14px;
              font-family: IBMPlexSans;
              @include themeify {
                color: themed("media_icon");
              }
              line-height: 14px;
              &:nth-of-type(1) {
                width: 90px;
                display: block;
              }
            }
          }
        }
        &:nth-of-type(2) {
          display: flex;
          flex-direction: column;
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
        &:nth-of-type(3) {
          display: flex;
          align-items: center;
          margin-top: 16px;
          p {
            display: flex;
            flex-direction: column;
            flex: 1;
            span {
              &:nth-of-type(1) {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                @include themeify {
                  color: themed("media_icon");
                }
                line-height: 14px;
              }
              &:nth-of-type(2) {
                margin-top: 4px;
                font-size: 14px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: themed("color-17173a");
                }
                line-height: 14px;
                font-weight: 500;
              }
            }
          }
        }
        &:nth-of-type(4) {
          display: flex;
          align-items: center;
          margin-top: 16px;
          p {
            display: flex;
            flex-direction: column;
            flex: 1;
            span {
              &:nth-of-type(1) {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                @include themeify {
                  color: themed("media_icon");
                }
                line-height: 14px;
              }
              &:nth-of-type(2) {
                margin-top: 4px;
                font-size: 14px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: themed("color-17173a");
                }
                line-height: 14px;
                font-weight: 500;
              }
            }
          }
        }
        &:nth-of-type(5) {
          display: flex;
          margin-top: 16px;
          button {
            width: 100%;
            height: 36px;
            border-radius: 5px;
            @include themeify {
              background: themed("insure_button");
              border: 1px solid themed("insure_button_border");
              color: themed("insure_button_text");
            }
            &:hover {
              border: 1px solid themed("color-fd7e14") !important;
            }
            font-size: 14px;
            font-family: HelveticaNeue;
            line-height: 24px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>
