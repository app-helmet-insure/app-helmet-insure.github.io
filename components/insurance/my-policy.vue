<template>
  <div class="my_policy">
    <div class="policy_title">
      <h3>{{ $t("Type.MyGuarantee") }}</h3>
    </div>
    <template v-if="isLogin">
      <div class="policy_item" v-for="item in showList" :key="item.id">
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
            <span>{{ $t("Table.Position") }}: </span>
            <span>{{ fixD(item.volume, 8) }}</span>
          </p>
        </section>
        <section>
          <p>
            <span>{{ $t("Table.PolicyPrice") }}: </span>
            <span>{{ fixD(item.price, 8) }} HELMET</span>
          </p>
          <p>
            <span>{{ $t("Table.Premium") }}: </span>
            <span>{{ fixD(item.Rent, 8) }} HELMET</span>
          </p>
        </section>
        <section>
          <button
            :style="item.status == 'Expired' ? 'pointer-events: none;' : ''"
            @click="toActive(item)"
          >
            {{
              item.status == "Expired"
                ? $t("Insurance.Insurance_text13")
                : $t("Table.outSure")
            }}
            <i class="selectDown"></i>
          </button>
        </section>
      </div>
    </template>
    <template>
      <div class="policy_item_H5" v-for="item in showList" :key="item.id + '1'">
        <section>
          <p>
            <span>{{ $t("Table.ID") }}:{{ item.id }}</span>
            <span>{{ item.dueDate }}</span>
          </p>
        </section>
        <section>
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
            <span>{{ $t("Table.PolicyPrice") }}: </span>
            <span>{{ fixD(item.price, 8) }} HELMET</span>
          </p>
        </section>
        <section>
          <p>
            <span>{{ $t("Table.Position") }}: </span>
            <span>{{ fixD(item.volume, 8) }}</span>
          </p>
          <p>
            <span>{{ $t("Table.Premium") }}: </span>
            <span>{{ fixD(item.Rent, 8) }} HELMET</span>
          </p>
        </section>
        <section>
          <button
            :style="item.status == 'Expired' ? 'pointer-events: none;' : ''"
            @click="toActive(item)"
          >
            {{
              item.status == "Expired"
                ? $t("Insurance.Insurance_text13")
                : $t("Table.outSure")
            }}
            <i class="selectDown"></i>
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
        <img src="~/assets/img/helmet/nodata.png" alt="" />
        <p>{{ $t("Table.NoData") }}</p>
      </div>
    </section>
    <section class="pages" v-if="guaranteeList.length > 10 && isLogin">
      <Page
        :total="guaranteeList.length"
        :limit="limit"
        :page="page + 1"
        @page-change="handleClickChagePage"
      />
    </section>
  </div>
</template>

<script>
import "~/assets/svg/iconfont.js";
import precision from "~/assets/js/precision.js";
import Page from "~/components/common/page.vue";
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
      guaranteeList: [],
      getTokenName,
      fixD,
      page: 0,
      limit: 10,
      isLoading: true,
      isLogin: false,
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
    userInfo() {
      return this.$store.state.userInfo;
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
    myAboutInfoBuyWatch(newValue, old) {
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
          item.type = "Call";
          item.outPriceUnit = "BNB";
        } else {
          item.TypeCoin = TokenFlag;
          item.type = "Put";
          item.outPriceUnit = "BNB";
        }
        if (TokenFlag == "BUSD" && Token == "WBNB") {
          item.TypeCoin = Token;
          item.type = "Call";
          item.outPriceUnit = "BUSD";
        }
        if (Token == "BUSD" && TokenFlag == "WBNB") {
          item.TypeCoin = TokenFlag;
          item.type = "Put";
          item.outPriceUnit = "BUSD";
        }
        Rent = precision.times(fromWei(item.vol, Token), InsurancePrice);
        //倒计时
        downTime = new Date(item.sellInfo.longInfo._expiry * 1000);
        downTime = moment(downTime).format("YYYY/MM/DD HH:mm:ss");

        if (item.type == "Call") {
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
            showVolume: fromWei(item.vol, Token),
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
            showVolume: fromWei(item.vol, TokenFlag),
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

      result = result.sort(function (a, b) {
        return b.id - a.id;
      });
      let cakePolicy = await this.CAKEPolicy();
      let hcctPolicy = await this.HCCTPolicy();
      let hctkPolicy = await this.HCTKPolicy();
      let hburgerPolicy = await this.HBURGERPolicy();
      let lishiPolicy = await this.LISHIPolicy();
      let BNB500Policy = await this.BNB500Policy();
      let hAUTOPolicy = await this.hAUTOPolicy();
      let hMATHPolicy = await this.hMATHPolicy();
      let hFORPolicy = await this.hFORPolicy();
      let HCCTIIPolicy = await this.HCCTIIPolicy();
      let hDODOPolicy = await this.hDODOPolicy();
      let hTPTPolicy = await this.hTPTPolicy();
      let QFEIPolicy = await this.QFEIPolicy();
      let bHELMETPolicy = await this.bHELMETPolicy();
      let qHELMETPolicy = await this.qHELMETPolicy();
      let xhBURGERolicy = await this.xhBURGERolicy();
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
      if (hAUTOPolicy) {
        result.push(hAUTOPolicy);
      }
      if (hMATHPolicy) {
        result.push(hMATHPolicy);
      }
      if (hFORPolicy) {
        result.push(hFORPolicy);
      }
      if (HCCTIIPolicy) {
        result.push(HCCTIIPolicy);
      }
      if (hDODOPolicy) {
        result.push(hDODOPolicy);
      }
      if (hTPTPolicy) {
        result.push(hTPTPolicy);
      }
      if (QFEIPolicy) {
        result.push(QFEIPolicy);
      }
      if (bHELMETPolicy) {
        result.push(bHELMETPolicy);
      }
      if (qHELMETPolicy) {
        result.push(qHELMETPolicy);
      }
      if (xhBURGERolicy) {
        result.push(xhBURGERolicy);
      }
      result = result.sort(function (a, b) {
        return a.sort - b.sort;
      });
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
      let template = `${day}${this.$t("Content.DayD")} ${hour}${this.$t(
        "Content.HourD"
      )}`;
      return template;
    },
    // 行权
    toActive(item) {
      let data;
      if (item.type == "Call") {
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
          showVolume: item.showVolume,
        };
      } else {
        data = {
          token: getTokenName(item._underlying),
          _underlying_vol: item.volume,
          vol: fixD(item.bnbAmount * item.outPrice, 8),
          bidID: item.bidID,
          long: item.long,
          exPrice: fixD(precision.divide(1, item._strikePrice), 4),
          _underlying: getTokenName(item._underlying),
          _collateral: getTokenName(item._collateral),
          settleToken: getTokenName(item.settleToken),
          flag: item.transfer ? true : false,
          showVolume: item.showVolume,
        };
      }
      this.$bus.$emit("OPEN_STATUS_DIALOG", {
        title: "WARNING",
        layout: "layout1",
        conText: `<p>you will swap<span> ${fixD(data._underlying_vol, 8)} ${
          data._underlying
        }</span> to <span> ${fixD(data.showVolume, 8)} ${
          data._collateral
        }</span></p>`,
        activeTip: true,
        loading: false,
        button: true,
        buttonText: "Confirm",
        showDialog: true,
      });
      this.$bus.$on("PROCESS_ACTION", (res) => {
        if (res) {
          onExercise(data, data.flag);
        }
        data = {};
      });
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
          dueDate: moment(new Date(1613404800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
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
          type: "call",
          showVolume: volume,
          TypeCoin: getTokenName("0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"),
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
          dueDate: moment(new Date(1613404800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
          _strikePrice: fromWei(10000000000000000000, Token),
          _underlying: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _expiry: 1613404800000,
          transfer: true,
          longAdress: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
          type: "Call",
          symbol: "HCCT",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(10000000000000000000, Token),
          outPriceUnit: "HELMET",
          showVolume: volume,
          TypeCoin: getTokenName("0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"),
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
          dueDate: moment(new Date(1613750400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
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
          showVolume: volume,
          TypeCoin: getTokenName("0xa8c2b8eec3d368c0253ad3dae65a5f2bbb89c929"),
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
          dueDate: moment(new Date(1615226400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xae9269f27437f0fcbc232d39ec814844a51d6b8f",
          _strikePrice: fromWei(70000000000000000, Token),
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1615226400000,
          transfer: true,
          longAdress: "0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa",
          type: "Call",
          symbol: "hBURGER",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(70000000000000000, Token),
          outPriceUnit: "BNB",
          showVolume: volume,
          TypeCoin: getTokenName("0xae9269f27437f0fcbc232d39ec814844a51d6b8f"),
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
          dueDate: moment(new Date(1613577600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          _strikePrice: fromWei(100000000000000000, Token),
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1613577600000,
          transfer: true,
          longAdress: "0x9eC5F3216c381715d7Bd06E00879a95d9Dd8e417",
          type: "Call",
          symbol: "LiShi",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(100000000000000000, Token),
          outPriceUnit: "BUSD",
          showType: "img",
          showVolume: volume,
          TypeCoin: getTokenName("0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8"),
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
          dueDate: moment(new Date(1616256000000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _strikePrice: fromWei(500000000000000000000, Token),
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1616256000000,
          transfer: true,
          longAdress: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
          type: "Call",
          symbol: "BNB500",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(500000000000000000000, Token),
          outPriceUnit: "BUSD",
          // showType: "img",
          showVolume: volume,
          TypeCoin: getTokenName("0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"),
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
    async hAUTOPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112");
        let resultItem;
        resultItem = {
          id: 6,
          bidID: 6,
          buyer: myAddress,
          price: 1000,
          Rent: volume * 1000,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1616428800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xa184088a740c695e156f91f5cc086a06bb78b827",
          _strikePrice: fromWei(42000000000000000000, Token),
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1616601600000,
          transfer: true,
          longAdress: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
          type: "Call",
          symbol: "hAUTO",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(42000000000000000000, Token),
          outPriceUnit: "BNB",
          // showType: "img",
          showVolume: volume,
          TypeCoin: getTokenName("0xa184088a740c695e156f91f5cc086a06bb78b827"),
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
    async hMATHPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0xdD9b5801e8A38ef7A728A42492699521C6A7379b"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xdD9b5801e8A38ef7A728A42492699521C6A7379b");
        let resultItem;
        resultItem = {
          id: 7,
          bidID: 7,
          buyer: myAddress,
          price: 1,
          Rent: volume * 1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1616428800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xf218184af829cf2b0019f8e6f0b2423498a36983",
          _strikePrice: fromWei(14000000000000000, Token),
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1616428800000,
          transfer: true,
          longAdress: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
          type: "Call",
          symbol: "hMATH",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(14000000000000000, Token),
          outPriceUnit: "BNB",
          // showType: "img",
          showVolume: volume,
          TypeCoin: getTokenName("0xf218184af829cf2b0019f8e6f0b2423498a36983"),
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
    async hFORPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0xb779F208f8d662558dF8E2b6bFE3b6305CC13389"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xb779F208f8d662558dF8E2b6bFE3b6305CC13389");
        let resultItem;
        resultItem = {
          id: 8,
          bidID: 8,
          buyer: myAddress,
          price: 0.1,
          Rent: volume * 0.1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1617465600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x658a109c5900bc6d2357c87549b651670e5b0539",
          _strikePrice: fromWei(250000000000000000, Token),
          _underlying: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _expiry: 1617465600000,
          transfer: true,
          longAdress: "0xb779F208f8d662558dF8E2b6bFE3b6305CC13389",
          type: "Call",
          symbol: "hFOR",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(250000000000000000, Token),
          outPriceUnit: "HELMET",
          // showType: "img",
          showVolume: volume,
          TypeCoin: getTokenName("0x658a109c5900bc6d2357c87549b651670e5b0539"),
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
    async HCCTIIPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x9065fcbb5f73B908aC4B05BdB81601Eec2065522"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x9065fcbb5f73B908aC4B05BdB81601Eec2065522");
        let resultItem;
        resultItem = {
          id: 9,
          bidID: 9,
          buyer: myAddress,
          price: "--",
          Rent: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1617897600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _strikePrice: fromWei(100000000000000000, Token),
          _underlying: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
          _expiry: 1617897600000,
          transfer: true,
          longAdress: "0x9065fcbb5f73B908aC4B05BdB81601Eec2065522",
          type: "Call",
          symbol: "HCCTII",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(100000000000000000, Token),
          outPriceUnit: "CAKE",
          // showType: "img",
          showVolume: volume,
          TypeCoin: getTokenName("0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8"),
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
    async hDODOPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3");
        let resultItem;
        resultItem = {
          id: 10,
          bidID: 10,
          buyer: myAddress,
          price: 1,
          Rent: volume * 1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1618416000000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2",
          _strikePrice: fromWei(10000000000000000000, Token),
          _underlying: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _expiry: 1618416000000,
          transfer: true,
          longAdress: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
          type: "Call",
          symbol: "hDODO",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: fromWei(10000000000000000000, Token),
          outPriceUnit: "HELMET",
          // showType: "img",
          showVolume: volume,
          TypeCoin: getTokenName("0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2"),
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
    async hTPTPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
        "hTPT"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c");
        let resultItem;
        resultItem = {
          id: 11,
          bidID: 11,
          buyer: myAddress,
          price: 0.01,
          Rent: volume * 0.01,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1620057600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xeca41281c24451168a37211f0bc2b8645af45092",
          _strikePrice: 0.06,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1620057600000,
          transfer: true,
          longAdress: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
          type: "Call",
          symbol: "hTPT",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.06,
          outPriceUnit: "BUSD",
          // showType: "img",
          unit: 4,
          showVolume: volume,
          TypeCoin: getTokenName("0xeca41281c24451168a37211f0bc2b8645af45092"),
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
    async QFEIPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a");
        let resultItem;
        resultItem = {
          id: 12,
          bidID: 12,
          buyer: myAddress,
          price: 0.1,
          Rent: volume * 0.1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1620576000000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x07aaa29e63ffeb2ebf59b33ee61437e1a91a3bb2",
          _strikePrice: 1,
          _underlying: "0x219cf9729bb21bbe8dd2101c8b6ec21c03dd0f31",
          _expiry: 1620576000000,
          transfer: true,
          longAdress: "0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a",
          type: "Call",
          symbol: "QFEI",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 1,
          outPriceUnit: "QSD",
          showVolume: volume,
          TypeCoin: getTokenName("0x219cf9729bb21bbe8dd2101c8b6ec21c03dd0f31"),
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
    async bHELMETPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672");
        let resultItem;
        resultItem = {
          id: 13,
          bidID: 13,
          buyer: myAddress,
          price: "--",
          Rent: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1623772800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _strikePrice: fromWei(1500000000000000000, Token),
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1623772800000,
          transfer: true,
          longAdress: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
          type: "Call",
          symbol: "BHELMET",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 1.5,
          outPriceUnit: "BUSD",
          showVolume: volume,
          TypeCoin: getTokenName("0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8"),
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
    async qHELMETPolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99");
        let resultItem;
        resultItem = {
          id: 14,
          bidID: 14,
          buyer: myAddress,
          price: "--",
          Rent: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1624118400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _strikePrice: fromWei(1500000000000000000, Token),
          _underlying: "0x07aaa29e63ffeb2ebf59b33ee61437e1a91a3bb2",
          _expiry: 1624118400000,
          transfer: true,
          longAdress: "0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99",
          type: "Call",
          symbol: "QHELMET",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 1.5,
          outPriceUnit: "QSD",
          showVolume: volume,
          TypeCoin: getTokenName("0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8"),
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
    async xhBURGERolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0xCa7597633927A98B800738eD5CD2933a74a80e8c"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xCa7597633927A98B800738eD5CD2933a74a80e8c");
        let resultItem;
        resultItem = {
          id: 15,
          bidID: 15,
          buyer: myAddress,
          price: "--",
          Rent: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1621612800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xafe24e29da7e9b3e8a25c9478376b6ad6ad788dd",
          _strikePrice: fromWei(100000000000000000, Token),
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1621612800000,
          transfer: true,
          longAdress: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
          type: "Call",
          symbol: "hxBURGER",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.1,
          outPriceUnit: "BNB",
          showVolume: volume,
          TypeCoin: getTokenName("0xafe24e29da7e9b3e8a25c9478376b6ad6ad788dd"),
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
      index = index - 1;
      this.page = index;
      let page = index;
      let list = this.guaranteeList.slice(
        this.page * this.limit,
        (page + 1) * this.limit
      );
      this.showList = list;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878;
  overflow: hidden;
}
@media screen and (min-width: 750px) {
  .my_policy {
    position: relative;
    min-height: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .policy_item_H5 {
      display: none;
    }
    .loading {
      width: 100%;
      margin: auto 0;
    }
    .pages {
      width: 100%;
    }
    .policy_title {
      width: 100%;
    }
    .policy_item {
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
          min-width: 300px;
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
          min-width: 150px;
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
          min-width: 200px;
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
          justify-content: flex-end;
          min-width: 120px;
          button {
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
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .my_policy {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 10px;
    .policy_item {
      display: none;
    }
    .loading {
      width: 100%;
      margin: auto 0;
    }
    .pages {
      width: 100%;
    }
    .policy_title {
      width: 100%;
      height: 44px;
      margin-left: 10px;
      line-height: 55px;
    }
    .policy_item_H5 {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      display: flex;
      background: #ffffff;
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
              color: #787878;
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
                color: #787878;
                line-height: 14px;
              }
              &:nth-of-type(2) {
                margin-top: 4px;
                font-size: 14px;
                font-family: IBMPlexSans;
                color: #17173a;
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
                color: #787878;
                line-height: 14px;
              }
              &:nth-of-type(2) {
                margin-top: 4px;
                font-size: 14px;
                font-family: IBMPlexSans;
                color: #17173a;
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
            background: #17173a;
            font-size: 14px;
            border: 1px solid #e8e8eb;
            font-family: HelveticaNeue;
            line-height: 24px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
