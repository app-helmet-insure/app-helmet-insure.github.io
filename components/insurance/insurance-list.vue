<template>
  <div class="insurance_list">
    <table v-if="isLogin">
      <thead>
        <tr>
          <td>{{ $t("Table.ID") }}</td>
          <td>{{ $t("Table.Rent") }}</td>
          <td>{{ $t("Table.Amount") }}({{ $t("Table.Cont") }})</td>
          <td style="position: absolute; right: 160px">
            {{ $t("Table.Tips", { type: currentCoin }) }}
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
          <td
            class="option"
            :style="
              item.status == 'dated' || item.remain == 0
                ? 'visibility: hidden;'
                : ''
            "
          >
            <PInput
              type="number"
              v-model="item.buyNum"
              :fix="14"
              :maxValue="item.remain"
              :right="$t('Table.Insure')"
              :placeholder="$t('Table.Cont')"
              @numChange="handleClickBuy(item)"
            ></PInput>
          </td>
        </tr>
      </tbody>
      <div class="loading" v-if="isLoading">
        <img src="~/assets/img/loading.gif" />
      </div>
    </table>
    <!-- H5 -->
    <div v-if="isLogin">
      <section
        v-for="(item, index) in showList"
        :key="index"
        v-if="item.price.length < 10"
      >
        <p>
          <span>{{ $t("Table.ID") }}</span
          ><span>{{ item.showID }}</span>
        </p>
        <div>
          <p>
            <span>{{ $t("Table.Rent") }}</span> <span>{{ item.price }}</span>
          </p>
          <p>
            <span>{{ $t("Table.Amount") }}</span
            ><span>{{ item.remain }}</span>
          </p>
        </div>
        <div
          :style="
            item.status == 'dated' || item.remain == 0
              ? 'visibility: hidden;'
              : ''
          "
        >
          <PInput
            type="number"
            v-model="item.buyNum"
            :fix="14"
            :maxValue="item.remain"
            :right="$t('Table.Insure')"
            :placeholder="$t('Table.Cont')"
            @numChange="handleClickBuy(item)"
          ></PInput>
        </div>
      </section>
      <div class="loading" v-if="isLoading">
        <img src="~/assets/img/loading.gif" />
      </div>
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
export default {
  props: ["currentCoin", "currentType"],
  components: {
    PInput,
    Page,
  },
  data() {
    return {
      price: "",
      precision,
      addCommom: addCommom,
      autoRounding: autoRounding,
      toRounding: toRounding,
      page: 0,
      limit: 10,
      insuranceList: [],
      showList: [],
      sellList: [],
      buyList: [],
      isLoading: true,
      listCoin: "",
      listType: "",
      isLogin: false,
    };
  },
  watch: {
    currentCoin(newValue) {
      if (newValue) {
        this.currentCoin = newValue;
        this.page = 0;
        this.limit = 10;
        this.checkList(newValue, this.currentType);
      }
    },
    currentType(newValue) {
      if (newValue) {
        this.currentType = newValue;
        this.page = 0;
        this.limit = 10;
        this.checkList(this.currentCoin, newValue);
      }
    },
    aboutInfoSell: {
      handler: "aboutInfoSellWatch",
      immediate: true,
    },
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
  },

  computed: {
    aboutInfoSell() {
      let list = this.$store.state.aboutInfoSell;
      return list;
    },
    indexArray() {
      let list = this.$store.state.allIndexPrice;
      return list;
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

  methods: {
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin;
      }
    },
    copyAdress(e, text) {
      let _this = this;

      let copys = new ClipboardJS(".copy", { text: () => text });
      copys.on("success", function (e) {
        Message({
          message: "Successfully copied",
          type: "success",
          // duration: 0,
        });
        copys.destroy();
      });
      copys.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
        copys.destroy();
      });
    },
    // 卖单数据
    aboutInfoSellWatch(newValue) {
      if (newValue) {
        this.page = 0;
        this.limit = 10;
        this.setList(newValue, this.currentCoin, this.currentType);
      }
    },
    // 格式化数据
    async setList(sell, coin, type) {
      this.isLoading = true;
      this.showList = [];
      let sellResult = [];
      let buyResult = [];
      let spliceResult = [];
      let item, volume, price, id, seller;
      let resultItem, newArray;
      let now = new Date() * 1;
      for (let i = 0; i < sell.length; i++) {
        item = sell[i];
        let time = item.longInfo._expiry * 1000;
        let token = getTokenName(item.longInfo._underlying);
        let coToken = getTokenName(item.longInfo._collateral);
        let price =
          coToken == "CTK"
            ? fromWei(item.price, 30)
            : fromWei(item.price, token);
        let showID =
          item.seller.substr(0, 2) +
          item.seller.substr(2, 4) +
          "..." +
          item.seller.substr(-5).toUpperCase();
        newArray = this.getNewPrice(item.askID);

        if (
          (token == "WBNB" && coToken != "BUSD") ||
          (token == "BUSD" && coToken == "WBNB")
        ) {
          resultItem = {
            seller: item.seller,
            id: item.askID,
            volume: fixD(fromWei(item.volume, coToken), 8),
            price: fixD(price, 4),
            settleToken: item.settleToken,
            _strikePrice: fromWei(item.longInfo._strikePrice, coToken),
            _underlying: item.longInfo._underlying,
            _expiry: item.longInfo._expiry,
            _collateral: item.longInfo._collateral,
            remain: 0,
            showID,
            buyNum: "",
            sort: 1,
          };
          if (newArray) {
            resultItem["volume"] = fromWei(newArray.volume, coToken);
            resultItem["price"] = fromWei(
              newArray.newPrice,
              coToken == "CTK" ? 30 : coToken
            );
            resultItem["id"] = newArray.newAskID;
          }
          let res = await asks(resultItem["id"], "sync", coToken);
          resultItem["remain"] = fixD(res, 8);
          if (resultItem["remain"] == 0 || time < now) {
            resultItem["status"] = "dated";
            resultItem["sort"] = 0;
          }
          if (time + 2592000000 > now && resultItem.seller != '0x0603CD787f45D1b830cEd5AcaEECDaB661B267ca') {
            buyResult.push(resultItem);
          }
        } else {
          let Token = getTokenName(item.longInfo._collateral);
          let unToken = getTokenName(item.longInfo._underlying);
          let exPirce = fromWei(item.longInfo._strikePrice, Token);
          exPirce = precision.divide(1, exPirce);
          let volume =
            Token == "BUSD"
              ? fromWei(item.volume, Token)
              : (fromWei(item.volume, Token) * this.indexArray[0][unToken]) / 2;
          let price = fromWei(item.price, Token);
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
          if (newArray) {
            resultItem["volume"] = fromWei(newArray.volume, unToken);
            resultItem["price"] = fromWei(newArray.newPrice, coToken);
            resultItem["id"] = newArray.newAskID;
          }
          let res = await asks(resultItem["id"], "sync", Token);
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
          if (time + 2592000000 > now && resultItem.seller != '0x0603CD787f45D1b830cEd5AcaEECDaB661B267ca') {
            sellResult.push(resultItem);
          }
        }
      }
      this.isLoading = false;
      this.buyList = buyResult;

      buyResult.sort(function (a, b) {
        return Number(a.price) - Number(b.price);
      });
      this.sellList = sellResult;
      sellResult.sort(function (a, b) {
        return Number(a.price) - Number(b.price);
      });
      let result;
      if (type == 1) {
        result = this.buyList.filter(
          (item) => getTokenName(item._collateral) == coin
        );
      } else {
        result = this.sellList.filter(
          (item) => getTokenName(item._underlying) == coin
        );
      }
      this.insuranceList = result.sort(function (a, b) {
        return b.sort - a.sort;
      });
      this.showList = result.slice(this.page * this.limit, this.limit);
    },
    checkList(coin, type) {
      if (type == 1) {
        let result = this.buyList.filter(
          (item) => getTokenName(item._collateral) == this.currentCoin
        );
        this.insuranceList = result.sort(function (a, b) {
          return b.sort - a.sort;
        });
        this.showList = result.slice(this.page * this.limit, this.limit);
      } else {
        let result = this.sellList.filter(
          (item) => getTokenName(item._underlying) == this.currentCoin
        );
        this.insuranceList = result.sort(function (a, b) {
          return b.sort - a.sort;
        });
        this.showList = result.slice(this.page * this.limit, this.limit);
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
      if (!data.buyNum) {
        return;
      }
      let datas;
      if (this.currentType == 1) {
        datas = {
          askID: data.id,
          volume: data.buyNum,
          showVolueme: data.buyNum,
          price: data.price,
          settleToken: "HELMET",
          _strikePrice: data._strikePrice,
          _underlying: getTokenName(data._underlying),
          _expiry: data._expiry,
          _collateral: getTokenName(data._collateral),
          showType: getTokenName(data._collateral),
        };
        this.listType = 2;
        this.listCoin = data._collateral;
      } else {
        let Token = getTokenName(data._underlying);
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
      }
      buyInsuranceBuy(datas, (status) => { });
    },
    // 计算数量
    setNum() { },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
#copy {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("../../assets/img/icon/copy.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 130px;
  cursor: pointer;
}
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
      .option {
        text-align: right;
        width: 265px;
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
          }
          .option {
            display: flex;
            align-items: center;
            transform: translateX(20px);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .insurance_list {
    table {
      display: none;
    }
    > div {
      width: 100%;
      section {
        box-sizing: border-box;
        padding: 20px 10px;
        background: #f7f7fa;
        margin-bottom: 10px;
        &:last-of-type {
          margin-bottom: 0;
        }
        p {
          display: flex;
          span {
            line-height: 20px;
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
          margin: 12px 0 0px 0;
          display: flex;
          p {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
}
</style>