<template>
  <div class="my_guarantee">
    <table>
      <thead>
        <tr>
          <td>{{ $t("Table.ID") }}</td>
          <td>{{ $t("Table.Type") }}</td>
          <td>{{ $t("Table.AllRent") }}</td>
          <td>{{ $t("Table.InsurancePrice") }}</td>
          <td>{{ $t("Table.Position") }}</td>
          <td>{{ $t("Table.CountDonm") }}</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in showList"
          :key="index"
          :class="
            getTokenName(item._underlying) == 'WBNB' || item.type == 'call'
              ? 'call_style'
              : 'put_style'
          "
        >
          <td>{{ item.id }}</td>
          <td>
            {{
              getTokenName(item._underlying) == "WBNB" || item.type == "call"
                ? getTokenName(item._collateral)
                : getTokenName(item._underlying)
            }}
            {{ item.symbol ? "(" + item.symbol + ")" : "" }}
          </td>

          <td>
            {{ fixD(item.price, 4) == "--" ? item.price : fixD(item.price, 4) }}
          </td>
          <td>
            {{ fixD(item.Rent, 4) == "--" ? item.price : fixD(item.Rent, 4) }}
          </td>
          <td>{{ fixD(item.volume, 8) }}</td>
          <td>{{ item.dueDate }}</td>
          <td>
            <button class="b_b_button" @click="toActive(item)" v-if="item.dueDate!='Expired'">
              {{ $t("Table.outSure") }}
            </button>
          </td>
        </tr>
      </tbody>
      <div class="loading" v-if="isLoading">
        <img src="~/assets/img/loading.gif" />
      </div>
    </table>

    <div>
      <div
        class="item_box"
        v-for="(item, index) in showList"
        :key="index"
        :class="
          getTokenName(item._underlying) == 'WBNB' || item.type == 'call'
            ? 'call_style'
            : 'put_style'
        "
      >
        <p>
          <span>{{ $t("Table.ID") }}</span
          ><span>{{ item.id }}</span>
        </p>
        <div>
          <p>
            <span>{{ $t("Table.Type") }}</span
            ><span>
              {{
                getTokenName(item._underlying) == "WBNB" || item.type == "call"
                  ? getTokenName(item._collateral)
                  : getTokenName(item._underlying)
              }}
              {{ item.symbol ? "(" + item.symbol + ")" : "" }}
            </span>
          </p>
          <p>
            <span>{{ $t("Table.InsurancePrice") }}</span
            ><span>{{
              fixD(item.price, 4) == "--" ? "Airdrop" : fixD(item.price, 4)
            }}</span>
          </p>
        </div>
        <div>
          <p>
            <span>{{ $t("Table.Rent") }}</span
            ><span>
              {{
                fixD(item.Rent, 4) == "--" ? "Airdrop" : fixD(item.Rent, 4)
              }}</span
            >
          </p>
          <p>
            <span>{{ $t("Table.Position") }}</span
            ><span>{{ fixD(item.volume, 8) }}</span>
          </p>
        </div>
        <section>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-time"></use>
            </svg>
            {{ item.dueDate }}
          </span>
          <button class="b_b_button" @click="toActive(item)">
            {{ $t("Table.outSure") }}
          </button>
        </section>
      </div>
      <div class="loading" v-if="isLoading">
        <img src="~/assets/img/loading.gif" />
      </div>
    </div>
    <section class="noData" v-if="showList.length < 1 && !isLoading">
      <div>
        <img src="~/assets/img/helmet/nodata.png" alt="" />
        <p>{{ $t("Table.NoData") }}</p>
      </div>
    </section>
    <section class="pages" v-if="guaranteeList.length > 5">
      <div>
        <p @click="upPage">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chevronleft"></use>
          </svg>
        </p>
        <i></i>
        <p @click="downPage">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chevronright"></use>
          </svg>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
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
import { getTokenName } from "~/assets/utils/address-pool.js";
import { onExercise, getExercise, getTransfer } from "~/interface/order.js";
import { balanceOf, getBalance } from "~/interface/deposite";
export default {
  data() {
    return {
      precision,
      addCommom: addCommom,
      autoRounding: autoRounding,
      toRounding: toRounding,
      showList: [],
      guaranteeList: [],
      getTokenName,
      fixD,
      page: 0,
      limit: 5,
      isLoading: true,
    };
  },
  computed: {
    myAboutInfoBuy() {
      return this.$store.state.myAboutInfoBuy;
    },
    transferMap() {
      return this.$store.state.transferMap;
    },
    strikePriceArray() {
      return this.$store.state.strikePriceArray;
    },
  },
  watch: {
    myAboutInfoBuy: {
      handler: "myAboutInfoBuyWatch",
      immediate: true,
    },
    guaranteeList(newList) {
      if (newList) {
        this.showList = newList.slice(this.page * this.limit, this.limit);
      }
    },
  },
  methods: {
    myAboutInfoBuyWatch(newValue) {
      if (newValue) {
        this.page = 0;
        this.limit = 5;
        this.setSettlementList(newValue);
      }
    },
    // 格式化数据
    async setSettlementList(list) {
      this.isLoading = true;
      this.showList = [];
      const result = [];
      let item, resultItem, amount, InsurancePrice, Rent, downTime;
      let currentTime = new Date().getTime();
      let exerciseRes;
      let bidIDArr;

      for (let i = 0; i < list.length; i++) {
        item = list[i];
        let TokenFlag = getTokenName(item.sellInfo.longInfo._underlying);
        let Token = getTokenName(item.sellInfo.longInfo._collateral);
        amount = fromWei(item.vol, Token);
        if (item.new) {
          // 保单价格
          InsurancePrice = fromWei(item.newPrice, Token == "CTK" ? 30 : Token);
        } else {
          // 保单价格
          InsurancePrice = fromWei(
            item.sellInfo.price,
            Token == "CTK" ? 30 : Token
          );
        }
        // 保费
        Rent = precision.times(amount, InsurancePrice);
        //倒计时
        downTime = this.getDownTime(item.sellInfo.longInfo._expiry);
        if (TokenFlag == "WBNB") {
          resultItem = {
            id: item.bidID,
            bidID: item.bidID,
            buyer: item.buyer,
            amt: fromWei(item.amt),
            price: InsurancePrice,
            volume: amount,
            Rent: Rent,
            settleToken: item.sellInfo.settleToken,
            dueDate: downTime,
            _collateral: item.sellInfo.longInfo._collateral,
            _strikePrice: fromWei(
              item.sellInfo.longInfo._strikePrice,
              item.sellInfo.longInfo._collateral
            ),
            _underlying: item.sellInfo.longInfo._underlying,
            _expiry: parseInt(item.sellInfo.longInfo._expiry) * 1000,
            long: item.sellInfo.long,
            short: item.sellInfo.longInfo.short,
            count: item.sellInfo.longInfo.count,
          };
        } else {
          resultItem = {
            id: item.bidID,
            bidID: item.bidID,
            buyer: item.buyer,
            amt: fromWei(item.amt),
            price: InsurancePrice,
            bnbAmount: amount,
            volume: fixD(
              precision.divide(amount, this.strikePriceArray[1][TokenFlag]),
              8
            ),
            Rent: Rent,
            settleToken: item.sellInfo.settleToken,
            dueDate: downTime,
            _collateral: item.sellInfo.longInfo._collateral,
            _strikePrice: fromWei(
              item.sellInfo.longInfo._strikePrice,
              item.sellInfo.longInfo._collateral
            ),
            _underlying: item.sellInfo.longInfo._underlying,
            _expiry: parseInt(item.sellInfo.longInfo._expiry) * 1000,
            long: item.sellInfo.long,
            short: item.sellInfo.longInfo.short,
            count: item.sellInfo.longInfo.count,
          };
        }

        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 0;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 2;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 4;
        }
        exerciseRes = await getExercise(resultItem.buyer);
        bidIDArr = exerciseRes.map((eItem) => {
          return eItem.returnValues.bidID;
        });
        if (bidIDArr.includes(resultItem.bidID)) {
          resultItem["status"] = "Activated";
          resultItem["sort"] = 1;
        }
        if (resultItem["sort"] != 1 || resultItem["sort"] != 4) {
          result.push(resultItem);
        }
      }
      let cakePolicy = await this.CAKEPolicy();
      let hcctPolicy = await this.HCCTPolicy();
      if (cakePolicy) {
        result.push(cakePolicy);
      }
      if (hcctPolicy) {
        result.push(hcctPolicy);
      }
      this.isLoading = false;
      this.guaranteeList = result;
      this.showList = result.slice(this.page * this.limit, this.limit);
    },
    // 倒计时
    getDownTime(time) {
      let now = new Date() * 1;
      let dueDate = time * 1000;
      dueDate = new Date(dueDate);
      let DonwTime = dueDate - now;
      let day = Math.floor(DonwTime / (24 * 3600000));
      let hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000);
      let minute = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
      );
      let second = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      );
      let template = `${day}${this.$t("Content.DayM")}${hour}${this.$t(
        "Content.HourM"
      )}${minute}${this.$t("Content.MinM")}${second}${this.$t(
        "Content.SecondM"
      )}`;
      return template;
    },
    // 行权
    toActive(item) {
      let data;
      if (getTokenName(item._underlying) == "WBNB" || item.type == "call") {
        data = {
          token: getTokenName(item._underlying),
          _underlying_vol: item._strikePrice * item.volume,
          vol: fixD(item.volume, 8),
          bidID: item.bidID,
          long: item.long || item.longAdress,
          exPrice: fixD(precision.divide(1, item._strikePrice), 4),
          _underlying: getTokenName(item._underlying),
          _collateral: getTokenName(item._collateral),
          settleToken: getTokenName(item.settleToken),
          flag: item.transfer ? true : false,
          approveAddress1: item.approveAddress1,
          approveAddress2: item.approveAddress2,
        };
      } else {
        data = {
          token: getTokenName(item._underlying),
          _underlying_vol: fixD(item.volume, 8),
          vol: item.bnbAmount,
          bidID: item.bidID,
          long: item.long,
          exPrice: fixD(precision.divide(1, item._strikePrice), 4),
          _underlying: getTokenName(item._underlying),
          _collateral: getTokenName(item._collateral),
          settleToken: getTokenName(item.settleToken),
          flag: item.transfer ? true : false,
        };
      }
      onExercise(data, data.flag);
    },
    async CAKEPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x17934fef9fc93128858e9945261524ab0581612e"
      );
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82");
        let resultItem;
        resultItem = {
          id: 1,
          bidID: 1,
          buyer: myAddress,
          price: "Airdrop",
          Rent: "Airdrop",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: this.getDownTime(1613404800),
          _collateral: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
          _strikePrice: fromWei(30000000000000000, Token),
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1613404800000,
          transfer: true,
          longAdress: "0x17934fef9fc93128858e9945261524ab0581612e",
          symbol: "LONG",
          approveAddress1: "FACTORY",
          approveAddress2: "CAKELONG",
        };
        return resultItem;
      }
    },
    async HCCTPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5"
      );
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82");
        let resultItem;
        resultItem = {
          id: 2,
          bidID: 2,
          buyer: myAddress,
          price: volume * 10,
          Rent: 1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: this.getDownTime(1613404800),
          _collateral: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
          _strikePrice: fromWei(10000000000000000000, Token),
          _underlying: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _expiry: 1613404800000,
          transfer: true,
          longAdress: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
          type: "call",
          symbol: "HCCT",
          approveAddress1: "FACTORY",
          approveAddress2: "ORDER",
        };
        return resultItem;
      }
    },
    // 分页
    upPage() {
      if (this.page <= 0) {
        return;
      }
      let page = this.page;
      this.page = page - 1;
      let list = this.guaranteeList.slice(
        this.page * this.limit,
        page * this.limit
      );
      this.showList = list;
    },
    downPage() {
      if (Math.ceil(this.guaranteeList.length / this.limit) <= this.page + 1) {
        return;
      }
      let page = this.page + 1;
      this.page = page;
      let list = this.guaranteeList.slice(
        this.page * this.limit,
        (page + 1) * this.limit
      );
      this.showList = list;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
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
@media screen and (min-width: 750px) {
  .my_guarantee {
    position: relative;
    > div {
      display: none;
      .loading {
        display: none;
      }
    }
    table {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 20px;

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
          position: relative;
          width: 100%;
          box-sizing: border-box;
          border-bottom: 1px solid #ededf0;
          td {
            white-space: nowrap;
            width: 100px;
            height: 60px;
            line-height: 60px;
            font-size: 14px;
            font-weight: bold;
            color: #121212;
          }

          td:last-child {
            transform: translateX(20px);
            display: flex;
            align-items: center;
            justify-content: flex-end;
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
  .my_guarantee {
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
        height: 208px;
        padding: 20px 10px;
        box-sizing: border-box;
        p {
          display: flex;
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
          span {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878;
  overflow: hidden;
}
</style>