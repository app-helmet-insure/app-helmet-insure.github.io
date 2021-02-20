<template>
  <div class="my_guarantee">
    <table>
      <thead>
        <tr>
          <td>{{ $t("Table.ID") }}</td>
          <td>{{ $t("Table.Type") }}</td>
          <td>
            {{ $t("Table.PolicyPrice")
            }}<span style="font-size: 12px">(HELMET)</span>
          </td>
          <td>
            {{ $t("Table.Premium")
            }}<span style="font-size: 12px">(HELMET)</span>
          </td>
          <td>{{ $t("Table.Position") }}</td>
          <td>{{ $t("Table.CountDonm") }}</td>
          <td>{{ $t("Table.Rate") }}</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in showList"
          :key="index"
          :class="item.type == 'call' ? 'call_style' : 'put_style'"
        >
          <!-- Id -->
          <td>{{ item.id }}</td>
          <!-- Type -->
          <td :class="item.type == 'call' ? 'call_text' : 'put_text'">
            {{ item.TypeCoin }}
            {{ item.symbol ? "(" + item.symbol + ")" : "" }}
            <i :class="item.type == 'call' ? 'call_icon' : 'put_icon'"> </i>
          </td>
          <!-- PolicyPrice -->
          <td>
            <template v-if="item.showType">
              <img :src="require(`~/assets/img/helmet/${item.price}`)" alt="" />
            </template>
            <template v-else>
              {{
                fixD(item.price, 4) == "--" ? item.price : fixD(item.price, 4)
              }}
            </template>
          </td>
          <!-- Premium -->
          <td>
            <template v-if="item.showType">
              <img :src="require(`~/assets/img/helmet/${item.Rent}`)" alt="" />
            </template>
            <template v-else>
              {{ fixD(item.Rent, 4) == "--" ? item.Rent : fixD(item.Rent, 4) }}
            </template>
          </td>
          <!-- Position -->
          <td>{{ fixD(item.volume, 8) }}</td>
          <!-- CountDonm -->
          <td>{{ item.dueDate }}</td>
          <!-- Rate -->
          <td>{{ item.outPrice }} {{ item.outPriceUnit }}</td>
          <!-- Active -->
          <td>
            <button
              class="b_b_button"
              @click="toActive(item)"
              v-if="item.dueDate != 'Expired'"
            >
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
        :class="item.type == 'call' ? 'call_style' : 'put_style'"
      >
        <p>
          <span>{{ $t("Table.ID") }}</span>
          <span>{{ item.id }}</span>
        </p>
        <div>
          <p>
            <span>{{ $t("Table.Type") }}</span>
            <span :class="item.type == 'call' ? 'call_text' : 'put_text'">
              {{
                item.type == "call"
                  ? getTokenName(item._collateral)
                  : getTokenName(item._underlying)
              }}
              {{ item.symbol ? "(" + item.symbol + ")" : "" }}
              <i :class="item.type == 'call' ? 'call_icon' : 'put_icon'"> </i>
            </span>
          </p>
          <p>
            <span
              >{{ $t("Table.PolicyPrice")
              }}<span style="font-size: 12px">(HELMET)</span></span
            >
            <span>
              <template v-if="item.showType">
                <img
                  :src="require(`~/assets/img/helmet/${item.price}`)"
                  alt=""
                />
              </template>
              <template v-else>
                {{
                  fixD(item.price, 4) == "--" ? item.price : fixD(item.price, 4)
                }}
              </template>
            </span>
          </p>
        </div>
        <div>
          <p>
            <span
              >{{ $t("Table.Premium")
              }}<span style="font-size: 12px">(HELMET)</span></span
            >
            <span>
              <template v-if="item.showType">
                <img
                  :src="require(`~/assets/img/helmet/${item.Rent}`)"
                  alt=""
                />
              </template>
              <template v-else>
                {{
                  fixD(item.Rent, 4) == "--" ? item.Rent : fixD(item.Rent, 4)
                }}
              </template>
            </span>
          </p>
          <p>
            <span>{{ $t("Table.Position") }}</span>
            <span>{{ fixD(item.volume, 8) }}</span>
          </p>
        </div>
        <div>
          <p>
            <span>{{ $t("Table.Rate") }}</span>
            <span> {{ item.outPrice }} {{ item.outPriceUnit }} </span>
          </p>
          <p>
            <span>{{ $t("Table.CountDonm") }}</span>
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-time"></use>
              </svg>
              {{ item.dueDate }}
            </span>
          </p>
        </div>
        <section>
          <button
            class="b_b_button"
            @click="toActive(item)"
            v-if="item.dueDate != 'Expired'"
          >
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
            <use xlink:href="#icon-left"></use>
          </svg>
        </p>
        <span
          class="page_item"
          v-for="(item, index) in Math.ceil(guaranteeList.length / 5)"
          :key="index"
          :class="page == index ? 'page_active' : ''"
          @click="handleClickChagePage(index)"
          >{{ index + 1 }}</span
        >
        <p @click="downPage">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-right"></use>
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
      let result = [];
      let item, resultItem, amount, InsurancePrice, Rent, downTime;
      let currentTime = new Date().getTime();
      let exerciseRes;
      let bidIDArr;

      for (let i = 0; i < list.length; i++) {
        item = list[i];
        let TokenFlag = getTokenName(item.sellInfo.longInfo._underlying);
        let Token = getTokenName(item.sellInfo.longInfo._collateral);
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
        if (
          (TokenFlag == "WBNB" && Token != "BUSD") ||
          (TokenFlag == "BUSD" && Token == "WBNB")
        ) {
          amount = fromWei(item.vol, Token);
        } else {
          amount = fixD(
            precision.divide(
              fromWei(item.vol, Token),
              this.strikePriceArray[1][TokenFlag]
            ),
            8
          );
        }
        // 保费
        if (TokenFlag == "WBNB") {
          item.TypeCoin = Token;
          item.type = "call";
          item.outPriceUnit = "BNB";
        } else {
          item.TypeCoin = TokenFlag;
          item.type = "put";
          item.outPriceUnit = "BNB";
        }
        if (TokenFlag == "BUSD" && Token == "WBNB") {
          item.TypeCoin = Token;
          item.type = "call";
          item.outPriceUnit = "BUSD";
        }
        if (Token == "BUSD" && TokenFlag == "WBNB") {
          item.TypeCoin = TokenFlag;
          item.type = "put";
          item.outPriceUnit = "BUSD";
        }
        Rent = precision.times(amount, InsurancePrice);
        //倒计时
        downTime = this.getDownTime(item.sellInfo.longInfo._expiry);
        if (item.type == "call") {
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
              Token == "CTK" ? 30 : Token
            ),
            _underlying: item.sellInfo.longInfo._underlying,
            _expiry: parseInt(item.sellInfo.longInfo._expiry) * 1000,
            long: item.sellInfo.long,
            short: item.sellInfo.longInfo.short,
            count: item.sellInfo.longInfo.count,
            outPrice: fromWei(
              item.sellInfo.longInfo._strikePrice,
              Token == "CTK" ? 30 : Token
            ),
            type: item.type,
            TypeCoin: item.TypeCoin,
            outPriceUnit: item.outPriceUnit,
          };
        } else {
          resultItem = {
            id: item.bidID,
            bidID: item.bidID,
            buyer: item.buyer,
            amt: fromWei(item.amt),
            price: InsurancePrice,
            bnbAmount: amount,
            volume: amount,
            Rent: Rent,
            settleToken: item.sellInfo.settleToken,
            dueDate: downTime,
            _collateral: item.sellInfo.longInfo._collateral,
            _strikePrice: fromWei(
              item.sellInfo.longInfo._strikePrice,
              TokenFlag
            ),
            _underlying: item.sellInfo.longInfo._underlying,
            _expiry: parseInt(item.sellInfo.longInfo._expiry) * 1000,
            long: item.sellInfo.long,
            short: item.sellInfo.longInfo.short,
            count: item.sellInfo.longInfo.count,
            outPrice: toRounding(
              precision.divide(
                1,
                fromWei(item.sellInfo.longInfo._strikePrice, TokenFlag)
              )
            ),
            type: item.type,
            TypeCoin: item.TypeCoin,
            outPriceUnit: item.outPriceUnit,
          };
        }
        exerciseRes = await getExercise(resultItem.buyer);
        bidIDArr = exerciseRes.map((eItem) => {
          return eItem.returnValues.bidID;
        });
        if (bidIDArr.includes(resultItem.bidID)) {
          resultItem["status"] = "Activated";
          resultItem["sort"] = 1;
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        if (resultItem["sort"] != 1 && resultItem["sort"] != 3) {
          result.push(resultItem);
        }
      }
      let cakePolicy = await this.CAKEPolicy();
      let hcctPolicy = await this.HCCTPolicy();
      let hctkPolicy = await this.HCTKPolicy();
      let hburgerPolicy = await this.HBURGERPolicy();
      let lishiPolicy = await this.LISHIPolicy();
      let BNB500Policy = await this.BNB500Policy();
      if (cakePolicy) {
        result.push(cakePolicy);
      }
      if (hcctPolicy) {
        result.push(hcctPolicy);
      }
      if (hctkPolicy) {
        result.push(hctkPolicy);
      }
      if (hburgerPolicy) {
        result.push(hburgerPolicy);
      }
      if (lishiPolicy) {
        result.push(lishiPolicy);
      }
      if (BNB500Policy) {
        result.push(BNB500Policy);
      }
      this.isLoading = false;
      result = result.sort(function (a, b) {
        return b.sort - a.sort;
      });
      this.guaranteeList = result.reverse();
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
      // let template = `${day}${this.$t("Content.DayM")}${hour}${this.$t(
      //   "Content.HourM"
      // )}${minute}${this.$t("Content.MinM")}${second}${this.$t(
      //   "Content.SecondM"
      // )}`;
      let template = `${day}${this.$t("Content.DayD")} ${hour}${this.$t(
        "Content.HourD"
      )}`;
      return template;
    },
    // 行权
    toActive(item) {
      let data;
      if (getTokenName(item._underlying) == "WBNB" || item.type == "call") {
        data = {
          token: getTokenName(item._underlying),
          _underlying_vol: precision.times(item._strikePrice, item.volume),
          vol: item.volume,
          bidID: item.bidID,
          long: item.long || item.longAdress,
          exPrice: fixD(precision.divide(1, item._strikePrice), 4),
          _underlying: getTokenName(item._underlying),
          _collateral: getTokenName(item._collateral),
          settleToken: getTokenName(item.settleToken),
          flag: item.transfer ? true : false,
          approveAddress1: item.approveAddress1,
          approveAddress2: item.approveAddress2,
          unit: item.unit ? item.unit : "",
        };
      } else {
        data = {
          token: getTokenName(item._underlying),
          _underlying_vol: fixD(item.volume, 8),
          vol: fixD(item.bnbAmount * item.outPrice, 8),
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
      let currentTime = new Date().getTime();
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
          outPrice: fromWei(30000000000000000, Token),
          outPriceUnit: "BNB",
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
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
      let currentTime = new Date().getTime();

      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82");
        let resultItem;
        resultItem = {
          id: 2,
          bidID: 2,
          buyer: myAddress,
          price: 1,
          Rent: volume * 10,
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
          approveAddress2: "",
          outPrice: fromWei(10000000000000000000, Token),
          outPriceUnit: "HELMET",
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async HCTKPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x936909e72951a19a5e1d75a109b0d34f06f39838",
        "CTK"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x936909e72951a19a5e1d75a109b0d34f06f39838");
        let resultItem;
        resultItem = {
          id: 3,
          bidID: 3,
          buyer: myAddress,
          price: 1.8343,
          Rent: volume * 1.8343,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: this.getDownTime(1613750400),
          _collateral: "0xa8c2b8eec3d368c0253ad3dae65a5f2bbb89c929",
          _strikePrice: fromWei(2500000000000000000, Token),
          _underlying: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _expiry: 1613750400000,
          transfer: true,
          longAdress: "0x936909e72951a19a5e1d75a109b0d34f06f39838",
          type: "call",
          symbol: "hCTK",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(2500000000000000000, Token),
          outPriceUnit: "HELMET",
          unit: 6,
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async HBURGERPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa");
        let resultItem;
        resultItem = {
          id: 4,
          bidID: 4,
          buyer: myAddress,
          price: 1,
          Rent: volume * 1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: this.getDownTime(1615226400),
          _collateral: "0xae9269f27437f0fcbc232d39ec814844a51d6b8f",
          _strikePrice: fromWei(70000000000000000, Token),
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1615226400000,
          transfer: true,
          longAdress: "0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa",
          type: "call",
          symbol: "hBURGER",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(70000000000000000, Token),
          outPriceUnit: "BNB",
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async LISHIPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x9eC5F3216c381715d7Bd06E00879a95d9Dd8e417"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x9eC5F3216c381715d7Bd06E00879a95d9Dd8e417");
        let resultItem;
        resultItem = {
          id: 5,
          bidID: 5,
          buyer: myAddress,
          price: "redbag.png",
          Rent: "redbag.png",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: this.getDownTime(1613577600),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          _strikePrice: fromWei(100000000000000000, Token),
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1613577600000,
          transfer: true,
          longAdress: "0x9eC5F3216c381715d7Bd06E00879a95d9Dd8e417",
          type: "call",
          symbol: "LiShi",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(100000000000000000, Token),
          outPriceUnit: "BUSD",
          showType: "img",
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async BNB500Policy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0xe204c4c21c6ed90e37cb06cb94436614f3208d58"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xe204c4c21c6ed90e37cb06cb94436614f3208d58");
        let resultItem;
        resultItem = {
          id: 5,
          bidID: 5,
          buyer: myAddress,
          price: "--",
          Rent: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: this.getDownTime(1616256000),
          _collateral: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _strikePrice: fromWei(500000000000000000000, Token),
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1616256000000,
          transfer: true,
          longAdress: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
          type: "call",
          symbol: "BNB500",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(500000000000000000000, Token),
          outPriceUnit: "BUSD",
          // showType: "img",
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    handleClickChagePage(index) {
      this.page = index;
      let page = index;
      let list = this.guaranteeList.slice(
        this.page * this.limit,
        (page + 1) * this.limit
      );
      this.showList = list;
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
.call_text {
  color: #00b900 !important;
}
.put_text {
  color: #ff6400 !important;
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
          td:first-child {
            width: 50px;
          }
          td:nth-of-type(2) {
            width: 110px;
          }
          td:nth-of-type(3) {
            width: 100px;
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
          td:first-child {
            width: 50px;
          }
          td:nth-of-type(2) {
            width: 110px;
          }
          td:nth-of-type(3) {
            width: 100px;
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
        padding: 20px 10px;
        box-sizing: border-box;
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
            display: flex;
            align-items: center;
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
          button {
            width: 100%;
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