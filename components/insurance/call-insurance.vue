<template>
  <div class="call-insurance">
    <InsuranceTitle
      :activeInsurance="activeInsurance"
      :activeType="'CALL'"
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
                :maxlength="8"
                :placeholder="$t('Table.NumberSubscriptions')"
              />
            </td>
            <td
              class="option"
              :style="
                item.status == 'dated' || item.show_volume == 0
                  ? 'visibility: hidden;'
                  : ''
              "
            >
              <button @click="handleClickBuy(item)">
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
            :maxlength="8"
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
    <section class="pages" v-if="insuranceList.length > 10 && isLogin">
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
import PInput from "~/components/common/p-input.vue";
import "~/assets/svg/iconfont.js";
import precision from "~/assets/js/precision.js";
import { fixD } from "~/assets/js/util.js";
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
      page_h5: 0,
      limit_h5: 3,
      showList: [],
      insuranceList: [],
      isLoading: true,
      fixD,
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
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
    async getList() {
      this.isLoading = true;
      // Current Insurance
      let coinAddress = getAddress(this.activeInsurance);
      // Now Time
      let nowDate = parseInt(moment.now() / 1000);
      try {
        // Map List
        getInsuranceList().then((res) => {
          if (res && res.data.data.options) {
            let CallList;
            let ShowList = [];
            let InsuranceList = res.data.data.options;
            if (this.activeInsurance != "WBNB") {
              CallList = InsuranceList.filter(
                (item) =>
                  item.collateral.toLowerCase() == coinAddress &&
                  Number(item.expiry) + 518400 > nowDate &&
                  item.asks.length
              );
            } else {
              CallList = InsuranceList.filter(
                (item) =>
                  item.collateral.toLowerCase() == coinAddress &&
                  item.underlying.toLowerCase() ==
                    "0xe9e7cea3dedca5984780bafc599bd69add087d56" &&
                  Number(item.expiry) + 518400 > nowDate &&
                  item.asks.length
              );
            }
            if (CallList.length) {
              CallList.forEach((item) => {
                // 标的
                let UnderlyingDecimals = TokenDecimals(item.underlying);
                // 抵押
                let CollateralDecimals = TokenDecimals(item.collateral);
                // 执行
                let StrikePriceDecimals =
                  18 + UnderlyingDecimals - CollateralDecimals;
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
                  currentInsurance: getTokenName(item.collateral),
                };
                item.asks.forEach(async (item) => {
                  Object.assign(item, ResultItem);
                  item.settleToken_symbol = getTokenName(item.settleToken);
                  item.show_price = fixD(
                    DecimalsFormWei(item.price, StrikePriceDecimals),
                    8
                  );
                  let AsksInfo = await Asks(item.askID);
                  item.show_volume = fixD(
                    AddressFormWei(AsksInfo.remain, ResultItem.collateral),
                    8
                  );
                  item.show_ID =
                    item.seller.substr(0, 2) +
                    item.seller.substr(2, 3) +
                    "..." +
                    item.seller.substr(-4).toUpperCase();
                  if (item.expiry < nowDate) {
                    item.status = "dated";
                    item.sort = 0;
                  }
                  ShowList.push(item);
                });
                this.insuranceList = ShowList;
              });
            }
          }
          console.log(1111111);
          this.showList = this.insuranceList.sort(function (a, b) {
            console.log(a, b);
            return b.show_price - a.show_price;
          });
          this.isLoading = false;
        });
      } catch (error) {
        console.log(error, "callInsurance");
        this.isLoading = false;
      }
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
    // 承保按钮
    handleClickBuy(data) {
      if (!data.buyNum || data.buyNum > data.show_volume) {
        return;
      }
      let datas = data;
      this.$bus.$emit("OPEN_STATUS_DIALOG", {
        title: "WARNING",
        layout: "layout1",
        conText: `<p>Buy <span>${datas.show_volume} ${datas.currentInsurance}
                  </span> Policys, with the premium of <span>
                  ${fixD(datas.show_price * datas.show_volume, 8)} ${
          datas.settleToken_symbol
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
          Buy(datas, (status) => {});
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
