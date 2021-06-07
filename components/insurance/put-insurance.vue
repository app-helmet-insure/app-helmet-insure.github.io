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
              {{ item.showID }}
              <i
                class="copy"
                id="copy"
                @click="copyAdress($event, item.seller)"
              ></i>
            </td>
            <td>{{ item.price }}</td>
            <td>{{ item.remain }}</td>
            <td>
              <input
                type="text"
                name=""
                v-model="item.buyNum"
                :max="item.remain"
                :maxlength="8"
                :placeholder="$t('Table.NumberSubscriptions')"
              />
            </td>

            <td class="option">
              <button
                @click="handleClickBuy(item)"
                :style="
                  item.status == 'dated' || item.remain == 0
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
            <span>{{ item.price }}</span>
          </p>
          <p>
            <span>{{ $t("Table.Amount") }}({{ $t("Table.Cont") }})</span>
            <span>{{ item.remain }}</span>
          </p>
        </section>
        <section>
          <input
            type="text"
            name=""
            v-model="item.buyNum"
            :max="item.remain"
            :maxlength="8"
            :placeholder="$t('Table.NumberSubscriptions')"
          />
          <button
            @click="handleClickBuy(item)"
            :style="
              item.status == 'dated' || item.remain == 0
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
import {
  fixD,
  addCommom,
  autoRounding,
  toRounding,
  fixDEAdd,
} from "~/assets/js/util.js";
import { toWei, fromWei } from "~/assets/utils/web3-fun.js";
import { buyInsuranceBuy, asks } from "~/interface/order.js";
import { getTokenName } from "~/assets/utils/address-pool.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import Page from "~/components/common/page.vue";
import InsuranceTitle from "./insurance-title";
import { getAddress } from "~/assets/utils/address-pool.js";
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
      insuranceList: [],
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
    aboutInfoSell: {
      handler: "aboutInfoSellWatch",
      immediate: true,
    },
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
        this.setList(this.aboutInfoSell);
      } else {
        this.isLoading = false;
      }
    },
    aboutInfoSellWatch(newValue) {
      if (newValue) {
        this.page = 0;
        this.limit = 10;
        this.page_h5 = 0;
        this.limit_h5 = 3;
        this.setList(newValue);
      }
    },
    async setList(sell, coin, type) {
      this.isLoading = true;
      let item, resultItem;
      let resultList = [];
      // 当前时间
      let now = new Date() * 1;
      // 当前保险地址
      let coinAddress = getAddress(this.activeInsurance);
      // 当前保险的全部保单
      let putInsuranceList = [];
      if (sell) {
        if (this.activeInsurance != "WBNB") {
          putInsuranceList = sell.filter(
            (item) => item.longInfo._underlying.toLowerCase() == coinAddress
          );
        } else {
          putInsuranceList = sell.filter(
            (item) =>
              item.longInfo._underlying.toLowerCase() == coinAddress &&
              item.longInfo._collateral.toLowerCase() ==
                "0xe9e7cea3dedca5984780bafc599bd69add087d56"
          );
        }
      }
      // 数据处理
      for (let i = 0; i < putInsuranceList.length; i++) {
        item = putInsuranceList[i];
        // 展示账户ID
        let showID =
          item.seller.substr(0, 2) +
          item.seller.substr(2, 3) +
          "..." +
          item.seller.substr(-4).toUpperCase();
        // 到期时间
        let time = item.longInfo._expiry * 1000;
        // 价格
        let price = fromWei(item.price, coToken);
        // 抵押物
        let coToken = getTokenName(item.longInfo._collateral);
        // 标的物
        let unToken = getTokenName(item.longInfo._underlying);
        // 出险价格
        let exPirce = precision.divide(
          1,
          fromWei(item.longInfo._strikePrice, coToken)
        );
        let volume =
          coToken == "BUSD"
            ? fromWei(item.volume, coToken)
            : (fromWei(item.volume, coToken) * this.indexArray[0][unToken]) / 2;
        resultItem = {
          seller: item.seller,
          id: item.askID,
          volume: volume,
          price: unToken == "SHIB" ? fixD(price, 10) : fixD(price, 4),
          settleToken: item.settleToken,
          _strikePrice: fromWei(item.longInfo._strikePrice, unToken),
          _underlying: item.longInfo._underlying,
          _expiry: item.longInfo._expiry,
          _collateral: item.longInfo._collateral,
          remain: 0,
          showID,
          buyNum: "",
          sort: 1,
        };
        let res = await asks(resultItem["id"], "sync", coToken);
        resultItem["relVol"] = res;
        if (this.strikePriceArray[1][unToken]) {
          resultItem["remain"] = fixD(
            precision.divide(res, this.strikePriceArray[1][unToken] || 1),
            8
          );
        } else {
          resultItem["remain"] = fixD(res, 8);
        }
        if (resultItem["remain"] == 0 || time < now) {
          resultItem["status"] = "dated";
          resultItem["sort"] = 0;
        }
        if (
          time + 2592000000 > now &&
          resultItem.seller != "0x0603CD787f45D1b830cEd5AcaEECDaB661B267ca"
        ) {
          resultList.push(resultItem);
        }
      }
      resultList.sort(function (a, b) {
        return Number(a.price) - Number(b.price);
      });
      this.insuranceList = resultList.sort(function (a, b) {
        return b.sort - a.sort;
      });
      this.isLoading = false;
      this.showList = resultList.slice(this.page * this.limit, this.limit);
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
    handleClickBuy(data) {
      if (!data.buyNum) {
        return;
      }
      let datas;
      let unToken = getTokenName(data._underlying);
      let num = precision.divide(data.buyNum, data.remain);
      datas = {
        askID: data.id,
        showVolueme: data.buyNum,
        volume:
          data.buyNum == data.remain
            ? precision.times(data.relVol, num)
            : fixD(
                precision.divide(
                  data.buyNum,
                  precision.divide(
                    1,
                    this.strikePriceArray[1][getTokenName(data._underlying)]
                  )
                ),
                8
              ),
        price: data.price,
        settleToken: "HELMET",
        _strikePrice: data._strikePrice,
        _underlying: getTokenName(data._underlying),
        _expiry: data._expiry,
        _collateral: getTokenName(data._collateral),
        showType: getTokenName(data._underlying),
      };
      console.log(data, datas);
      this.$bus.$emit("OPEN_STATUS_DIALOG", {
        title: "WARNING",
        layout: "layout1",
        conText: `<p>Buy <span>${datas.showVolueme} ${datas.showType}
                  </span> Policys, with the premium of <span>
                  ${fixD(datas.price * datas.volume, 8)} ${datas.settleToken}
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
          buyInsuranceBuy(datas, (status) => {});
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
