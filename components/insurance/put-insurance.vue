<template>
  <div class="put-insurance">
    <InsuranceTitle
      :activeInsurance="activeInsurance"
      :activeType="'PUT'"
    ></InsuranceTitle>
    <div class="insurance_list" v-if="isLogin">
      <table>
        <thead>
          <tr>
            <td>{{ $t("Table.ID") }}</td>
            <td>{{ $t("Table.Rent") }}</td>
            <td>{{ $t("Table.Amount") }}({{ $t("Table.Cont") }})</td>
            <td>
              {{ $t("Table.Tips", { type: activeInsurance }) }}
            </td>
            <td class="option">{{ $t("Table.Options") }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in showList" :key="index">
            <td>
              {{ item.show_ID }}
              <i
                class="copy"
                id="copy"
                @click="copyAdress($event, item.seller)"
              ></i>
            </td>
            <td>{{ item.show_price }}</td>
            <td>{{ item.show_volume }}</td>
            <td>
              <input
                type="text"
                name=""
                v-model="item.buyNum"
                :max="item.show_volume"
                :maxlength="10"
                :placeholder="$t('Table.NumberSubscriptions')"
              />
            </td>

            <td class="option">
              <button
                @click="handleClickBuy(item)"
                :style="
                  item.status == 'dated' || item.show_volume == 0
                    ? 'visibility:hidden;'
                    : ''
                "
              >
                {{ $t("Table.Subscribe") }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="insurance_list_H5">
      <div class="list_item_H5" v-for="(item, index) in showList" :key="index">
        <section>
          <p>
            <span>{{ $t("Table.Rent") }}</span>
            <span>{{ item.show_price }}</span>
          </p>
          <p>
            <span>{{ $t("Table.Amount") }}({{ $t("Table.Cont") }})</span>
            <span>{{ item.show_volume }}</span>
          </p>
        </section>
        <section>
          <input
            type="text"
            name=""
            v-model="item.buyNum"
            :max="item.show_volume"
            :maxlength="10"
            :placeholder="$t('Table.NumberSubscriptions')"
          />
          <button
            @click="handleClickBuy(item)"
            :style="
              item.status == 'dated' || item.show_volume == 0
                ? 'visibility:hidden;'
                : ''
            "
          >
            {{ $t("Table.Subscribe") }}
          </button>
        </section>
      </div>
    </div>
    <div class="loading" v-if="isLoading && isLogin">
      <img src="~/assets/img/loading.png" />
      <div class="shadow"></div>
      <p>{{ $t("Table.LoadingWallet") }}</p>
    </div>
    <section
      class="noData"
      v-if="(FilterList.length < 1 && !isLoading) || !isLogin"
    >
      <div>
        <img
          :src="require(`~/assets/img/helmet/nodata_${storeThemes}.png`)"
          alt=""
        />
        <p>{{ $t("Table.NoData") }}</p>
      </div>
    </section>
    <section class="pages" v-if="FilterList.length > 10 && isLogin">
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
import PInput from "~/components/common/p-input.vue";

import precision from "~/assets/js/precision.js";
import { fixD } from "~/assets/js/util.js";
import { buyInsuranceBuy, asks } from "~/interface/order.js";
import { getTokenName } from "~/assets/utils/address-pool.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import Page from "~/components/common/page.vue";
import InsuranceTitle from "./insurance-title";
import { getAddress } from "~/assets/utils/address-pool.js";
import { getInsuranceList } from "~/interface/event.js";
import {
  TokenDecimals,
  getDecimals,
  DecimalsFormWei,
  fromWei,
  AddressFormWei,
} from "~/interface/common_contract.js";
import { Asks } from "~/interface/read_contract.js";
import { Buy } from "~/interface/write_contract.js";
import moment from "moment";
import BigNumber from "bignumber.js";
export default {
  components: {
    InsuranceTitle,
    PInput,
    Page,
  },
  props: ["activeInsurance"],
  data() {
    return {
      page: 0,
      limit: 10,
      showList: [],
      FilterList: [],
      isLoading: true,
    };
  },

  computed: {
    aboutInfoSell() {
      let list = this.$store.state.aboutInfoSell;
      return list;
    },
    strikePriceArray() {
      return this.$store.state.strikePriceArray;
    },
    indexArray() {
      let list = this.$store.state.allIndexPrice;
      return list;
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
  methods: {
    userInfoWatch(newValue) {
      let isLogin = newValue.data.isLogin;
      this.isLogin = isLogin;
      if (isLogin) {
        this.isLoading = true;
        this.getList();
      } else {
        this.isLoading = false;
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
      // Current Insurance
      let coinAddress = getAddress(this.activeInsurance);
      // Now Time
      let nowDate = parseInt(moment.now() / 1000);
      try {
        // Map List
        getInsuranceList().then((res) => {
          if (res && res.data.data.options) {
            let FixList = [];
            let FixListPush = [];
            let ReturnList = res.data.data.options;
            if (this.activeInsurance != "WBNB") {
              ReturnList = ReturnList.filter(
                (item) =>
                  item.underlying.toLowerCase() == coinAddress &&
                  Number(item.expiry) + 2592000 > nowDate &&
                  item.asks.length
              );
            } else {
              ReturnList = ReturnList.filter(
                (item) =>
                  item.underlying.toLowerCase() == coinAddress &&
                  item.collateral.toLowerCase() ==
                    "0xe9e7cea3dedca5984780bafc599bd69add087d56" &&
                  Number(item.expiry) + 2592000 > nowDate &&
                  item.asks.length
              );
            }
            ReturnList = ReturnList.forEach((item) => {
              // 标的
              let UnderlyingDecimals = TokenDecimals(item.underlying);
              // 抵押
              let CollateralDecimals = TokenDecimals(item.collateral);
              // 执行
              let StrikePriceDecimals = 18;
              let ResultItem = {
                expiry: item.expiry,
                long: item.long,
                short: item.short,
                show_strikePrice: fixD(
                  DecimalsFormWei(item.strikePrice, StrikePriceDecimals),
                  8
                ),
                strikePrice: item.strikePrice,
                collateral: item.collateral,
                collateral_symbol: getTokenName(item.collateral),
                collateral_decimals: getDecimals(CollateralDecimals),
                underlying: item.underlying,
                underlying_symbol: getTokenName(item.underlying),
                underlying_decimals: getDecimals(UnderlyingDecimals),
                currentInsurance: getTokenName(item.underlying),
              };
              item.asks.forEach(async (item) => {
                item.settleToken_symbol = getTokenName(item.settleToken);
                item.show_price = fixD(
                  DecimalsFormWei(item.price, StrikePriceDecimals),
                  8
                );
                let AsksInfo = await Asks(item.askID);
                item.show_volume = fixD(
                  AddressFormWei(AsksInfo.remain, ResultItem.collateral) /
                    this.strikePriceArray[1][ResultItem.underlying_symbol],
                  8
                );
                item.show_ID =
                  item.seller.substr(0, 2) +
                  item.seller.substr(2, 3) +
                  "..." +
                  item.seller.substr(-4).toUpperCase();
                if (
                  item.show_volume == 0 ||
                  Number(ResultItem.expiry) < nowDate
                ) {
                  item.status = "dated";
                  item.sort = 0;
                } else {
                  item.sort = 1;
                }
                let AllItem = Object.assign(item, ResultItem);
                if (AllItem.show_price != 0) {
                  FixListPush.push(item);
                  FixListPush = FixListPush.sort(function (a, b) {
                    return Number(a.show_price) - Number(b.show_price);
                  });
                  FixListPush = FixListPush.sort(function (a, b) {
                    return Number(b.sort) - Number(a.sort);
                  });
                }
              });
            });
            FixList = FixListPush;
            this.FilterList = FixList;
            this.isLoading = false;
          }
        });
      } catch (error) {
        console.log(error, "putInsurance");
        this.isLoading = false;
      }
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
    handleClickBuy(data) {
      if (!data.buyNum || data.buyNum > data.show_volume) {
        return;
      }

      let RelBuyNumber =
        data.buyNum == data.show_volume
          ? AddressFormWei(data.volume, data.underlying)
          : data.buyNum * this.strikePriceArray[1][data.underlying_symbol];
      let datas = {
        askID: data.askID,
        buyNum: BigNumber(RelBuyNumber + "").toFixed(),
        showNum: data.buyNum,
        show_strikePrice: this.strikePriceArray[1][data.underlying_symbol],
        currentInsurance: data.currentInsurance,
        settleToken_symbol: data.settleToken_symbol,
      };

      this.$bus.$emit("OPEN_STATUS_DIALOG", {
        title: "WARNING",
        layout: "layout1",
        conText: `<p>Buy <span>${data.buyNum} ${data.currentInsurance}
                  </span> Policys, with the premium of <span>
                  ${fixD(data.show_price * datas.buyNum, 8)} ${
          data.settleToken_symbol
        }
                  </span></p>`,
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
          Buy(datas, (status) => {
            if (status == "success") {
              this.getList();
            }
          });
        }
        datas = {};
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/insurance_list.scss";
</style>
