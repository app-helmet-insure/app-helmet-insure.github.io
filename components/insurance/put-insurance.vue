<template>
  <div class="put-insurance">
    <InsuranceTitle :activeInsurance="activeInsurance"></InsuranceTitle>
    <div class="insurance_list">
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
          <tr
            v-for="(item, index) in showList"
            :key="index"
            v-if="item.price.length < 10"
          >
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
                placeholder="请输入认购张数"
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
                认购
              </button>
            </td>
          </tr>
        </tbody>
        <div class="loading" v-if="isLoading">
          <img src="~/assets/img/loading.png" />
          <div class="shadow"></div>
          <p>loading the wallet data</p>
        </div>
      </table>
    </div>
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
  mounted() {
    console.log(11111111111);
  },
  methods: {
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin;
      }
    },
    aboutInfoSellWatch(newValue) {
      if (newValue) {
        this.page = 0;
        this.limit = 10;
        this.setList(newValue, this.currentCoin, this.currentType);
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
      let putInsuranceList = sell.filter(
        (item) => item.longInfo._underlying.toLowerCase() == coinAddress
      );
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
          price: fixD(price, 4),
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
      this.listType = 2;
      this.listCoin = data._underlying;
      buyInsuranceBuy(datas, (status) => {});
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .insurance_list {
    position: relative;
    > div {
      display: none;
    }
    table {
      width: 100%;
      display: flex;
      flex-direction: column;
      tr {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        align-items: center;
        td {
          width: 100px;
          white-space: nowrap;
        }
      }

      thead {
        width: 100%;
        background: #f7f7fa;
        tr {
          height: 40px;
          color: #919aa6;
          td {
            line-height: 40px;
            font-size: 14px;
          }
          .option {
            text-align: right;
          }
        }
      }
      tbody {
        width: 100%;
        tr {
          width: 100%;
          box-shadow: 0px 1px 0px 0px #ededf0;
          td {
            white-space: nowrap;
            width: 100px;
            height: 60px;
            line-height: 60px;
            font-size: 14px;
            font-weight: bold;
            color: #121212;
            display: flex;
            align-items: center;
            &:nth-of-type(4) {
              input {
                border-radius: 5px;
                width: 160px;
                height: 32px;
                border: 1px solid #eee;
                padding: 0 10px;
                &:focus {
                  border: 1px solid #ff9600;
                  width: 160px;
                }
              }
            }
          }
          .option {
            text-align: right;
            display: inline;
            button {
              padding: 0 20px;
              height: 32px;
              background: #121212;
              color: #fff;
              border-radius: 3px;
            }
          }
        }
      }
    }
  }
}
</style>