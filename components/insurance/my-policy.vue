<template>
  <div class="my_policy">
    <div class="policy_title">
      <h3>{{ $t("Type.MyGuarantee") }}</h3>
    </div>
    <template v-if="isLogin">
      <div
        class="policy_item"
        v-for="item in showList"
        :key="item.bidID + item.askID"
      >
        <section>
          <p>
            <span>{{ $t("Table.ID") }}:{{ item.bidID }}</span>
            <span>{{ item.dueDate }}</span>
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
            <span>{{ $t("Table.Position") }}: </span>
            <span>{{ fixD(item.buyVolume, 8) }}</span>
          </p>
        </section>
        <section>
          <p>
            <span>{{ $t("Table.PolicyPrice") }}: </span>
            <span>{{ fixD(item.show_price, 8) }} HELMET</span>
          </p>
          <p>
            <span>{{ $t("Table.Premium") }}: </span>
            <span>{{ fixD(item.premium, 8) }} HELMET</span>
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
      <div
        class="policy_item_H5"
        v-for="item in showList"
        :key="item.bidID + item.askID + '1'"
      >
        <section>
          <p>
            <span>{{ $t("Table.ID") }}:{{ item.askID }}</span>
            <span>{{ item.dueDate }}</span>
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
            <span>{{ $t("Table.Position") }}: </span>
            <span>{{ fixD(item.buyVolume, 8) }}</span>
          </p>
          <p>
            <span>{{ $t("Table.Premium") }}: </span>
            <span>{{ item.premium }} HELMET</span>
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
import { getTokenName } from "~/assets/utils/address-pool.js";
import { onExercise, getExercise, getTransfer } from "~/interface/order.js";
import { balanceOf, getBalance } from "~/interface/deposite";
import { getInsuranceList } from "~/interface/event.js";
import {
  TokenDecimals,
  getDecimals,
  DecimalsFormWei,
  fromWei,
  AddressFormWei,
  getAccounts,
} from "~/interface/common_contract.js";
import moment from "moment";
import BigNumber from "bignumber.js";
import { Bids } from "~/interface/read_contract.js";
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
      FilterList: [],
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
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  mounted() {
    this.getList();
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
            dueDate: item.show_expiry,
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
          item.asks.forEach((itemAsk) => {
            itemAsk.settleToken_symbol = getTokenName(itemAsk.settleToken);
            itemAsk.show_price = fixD(
              DecimalsFormWei(itemAsk.price, StrikePriceDecimals),
              8
            );
            let AskArray = Object.assign(ResultItem, itemAsk);
            itemAsk.binds.forEach((itemBid) => {
              AskArray.bidID = itemBid.bidID;
              itemBid.buyVolume =
                item.type == "Call"
                  ? DecimalsFormWei(itemBid.volume, CollateralDecimals)
                  : fixD(
                      DecimalsFormWei(itemBid.volume, UnderlyingDecimals) /
                        ResultItem.show_strikePrice,
                      8
                    );
              itemBid.premium =
                item.type == "Call"
                  ? itemBid.buyVolume * ResultItem.show_price
                  : itemBid.buyVolume *
                    ResultItem.show_price *
                    ResultItem.show_strikePrice;
              let AllItem = Object.assign(itemBid, AskArray);
              if (AllItem.buyer.toLowerCase() == CurrentAccount.toLowerCase()) {
                FixList.push(AllItem);
              }
            });
          });
        });
        let List = [...new Set(FixList)].sort((a, b) => {
          return b.bidID - a.bidID;
        });
        let arr = [];
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
        let SHIBHRolicy = await this.SHIBHRolicy();
        let HWINGSRolicy = await this.HWINGSRolicy();
        let HMTRGolicy = await this.HMTRGolicy();
        let HBABYolicy = await this.HBABYolicy();
        let HBMXXolicy = await this.HBMXXolicy();
        if (HBMXXolicy) {
          if (HBMXXolicy["sort"] != 1 && HBMXXolicy["sort"] != 3) {
            arr.push(HBMXXolicy);
          }
        }
        if (HBABYolicy) {
          if (HBABYolicy["sort"] != 1 && HBABYolicy["sort"] != 3) {
            arr.push(HBABYolicy);
          }
        }
        if (HWINGSRolicy) {
          if (HWINGSRolicy["sort"] != 1 && HWINGSRolicy["sort"] != 3) {
            arr.push(HWINGSRolicy);
          }
        }
        if (cakePolicy) {
          if (cakePolicy["sort"] != 1 && cakePolicy["sort"] != 3) {
            arr.push(cakePolicy);
          }
        }
        if (hcctPolicy) {
          if (hcctPolicy["sort"] != 1 && hcctPolicy["sort"] != 3) {
            arr.push(hcctPolicy);
          }
        }
        if (hctkPolicy) {
          if (hctkPolicy["sort"] != 1 && hctkPolicy["sort"] != 3) {
            arr.push(hctkPolicy);
          }
        }
        if (hburgerPolicy) {
          if (hburgerPolicy["sort"] != 1 && hburgerPolicy["sort"] != 3) {
            arr.push(hburgerPolicy);
          }
        }
        if (lishiPolicy) {
          if (lishiPolicy["sort"] != 1 && lishiPolicy["sort"] != 3) {
            arr.push(lishiPolicy);
          }
        }
        if (BNB500Policy) {
          if (BNB500Policy["sort"] != 1 && BNB500Policy["sort"] != 3) {
            arr.push(BNB500Policy);
          }
        }
        if (hAUTOPolicy) {
          if (hAUTOPolicy["sort"] != 1 && hAUTOPolicy["sort"] != 3) {
            arr.push(hAUTOPolicy);
          }
        }
        if (hMATHPolicy) {
          if (hMATHPolicy["sort"] != 1 && hMATHPolicy["sort"] != 3) {
            arr.push(hMATHPolicy);
          }
        }
        if (hFORPolicy) {
          if (hFORPolicy["sort"] != 1 && hFORPolicy["sort"] != 3) {
            arr.push(hFORPolicy);
          }
        }
        if (HCCTIIPolicy) {
          if (HCCTIIPolicy["sort"] != 1 && HCCTIIPolicy["sort"] != 3) {
            arr.push(HCCTIIPolicy);
          }
        }
        if (hDODOPolicy) {
          if (hDODOPolicy["sort"] != 1 && hDODOPolicy["sort"] != 3) {
            arr.push(hDODOPolicy);
          }
        }
        if (hTPTPolicy) {
          if (hTPTPolicy["sort"] != 1 && hTPTPolicy["sort"] != 3) {
            arr.push(hTPTPolicy);
          }
        }
        if (QFEIPolicy) {
          if (QFEIPolicy["sort"] != 1 && QFEIPolicy["sort"] != 3) {
            arr.push(QFEIPolicy);
          }
        }
        if (bHELMETPolicy) {
          if (bHELMETPolicy["sort"] != 1 && bHELMETPolicy["sort"] != 3) {
            arr.push(bHELMETPolicy);
          }
        }
        if (qHELMETPolicy) {
          if (qHELMETPolicy["sort"] != 1 && qHELMETPolicy["sort"] != 3) {
            arr.push(qHELMETPolicy);
          }
        }
        if (xhBURGERolicy) {
          if (xhBURGERolicy["sort"] != 1 && xhBURGERolicy["sort"] != 3) {
            arr.push(xhBURGERolicy);
          }
        }
        if (SHIBHRolicy) {
          if (SHIBHRolicy["sort"] != 1 && SHIBHRolicy["sort"] != 3) {
            arr.push(SHIBHRolicy);
          }
        }
        if (HMTRGolicy) {
          if (HMTRGolicy["sort"] != 1 && HMTRGolicy["sort"] != 3) {
            arr.push(HMTRGolicy);
          }
        }
        List.map(async (item, index) => {
          let BidsInfo = await Bids(item.bidID);
          if (BidsInfo.remain == 0) {
            item.status == "Activated";
            item.sort = 1;
          } else {
            item.status == "Unactivated";
            item.sort = 0;
          }
          if (Number(item.expiry) < nowDate) {
            item.status = "Expired";
            item.sort = 2;
            item.dueDate = "Expired";
          }
          if (BidsInfo.remain != 0) {
            arr.push(item);
          }
          this.FilterList = [...new Set(arr)].sort((a, b) => {
            return a.sort - b.sort;
          });
          this.isLoading = false;
          return this.FilterList;
        });
      });
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
          token: item.underlying_symbol || getTokenName(item._underlying),
          totoken: item.collateral_symbol || getTokenName(item._collateral),
          _underlying_vol: precision.times(item.show_strikePrice, item.volume),
          vol: item.volume,
          bidID: item.bidID,
          long: item.long || item.longAdress,
          exPrice: fixD(precision.divide(1, item.show_strikePrice), 12),
          _underlying: item.collateral_symbol || getTokenName(item._collateral),
          _collateral: item.underlying_symbol || getTokenName(item._underlying),
          settleToken:
            item.settleToken_symbol || getTokenName(item.settleToken),
          flag: item.transfer ? true : false,
          approveAddress1: item.approveAddress1,
          approveAddress2: item.approveAddress2,
          unit: item.unit ? item.unit : "",
          showVolume: item.showVolume,
          show_strikePrice: item.show_strikePrice,
          buyVolume: item.buyVolume,
        };
      } else {
        data = {
          token: item.collateral_symbol || getTokenName(item._collateral),
          totoken: item.underlying_symbol || getTokenName(item._underlying),
          _underlying_vol: item.volume,
          vol: item.volume,
          bidID: item.bidID,
          long: item.long || item.longAdress,
          exPrice: fixD(precision.divide(1, item.show_strikePrice), 12),
          _underlying: item.collateral_symbol || getTokenName(item._collateral),
          _collateral: item.underlying_symbol || getTokenName(item._underlying),
          settleToken:
            item.settleToken_symbol || getTokenName(item.settleToken),
          flag: item.transfer ? true : false,
          approveAddress1: item.approveAddress1,
          approveAddress2: item.approveAddress2,
          unit: item.unit ? item.unit : "",
          showVolume: item.volume * item.outPrice,
          show_strikePrice: item.show_strikePrice,
          buyVolume: item.buyVolume,
        };
      }

      this.$bus.$emit("OPEN_STATUS_DIALOG", {
        title: "WARNING",
        layout: "layout1",
        conText: `<p>you will swap<span> ${fixD(data.buyVolume, 8)} ${
          data.totoken
        }</span> to <span> ${fixD(data.show_strikePrice, 8)} ${
          data.token
        }</span></p>`,
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
          onExercise(data, data.flag, (status) => {
            if (status == "success") {
              this.getList();
            }
          });
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
          askID: "air",
          id: 1,
          bidID: 1,
          buyer: myAddress,
          show_price: "Airdrop",
          premium: "Airdrop",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1613404800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
          show_strikePrice: 0.03,
          _strikePrice: 0.03,
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1613404800000,
          transfer: true,
          longAdress: "0x17934fef9fc93128858e9945261524ab0581612e",
          symbol: "LONG",
          approveAddress1: "FACTORY",
          approveAddress2: "CAKELONG",
          outPrice: 0.03,
          outPriceUnit: "BNB",
          type: "Call",
          showVolume: volume,
          buyVolume: volume,
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
          askID: "air",
          id: 2,
          bidID: 2,
          buyer: myAddress,
          show_price: 1,
          premium: volume * 10,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1613404800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
          show_strikePrice: 10,
          _strikePrice: 10,
          _underlying: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _expiry: 1613404800000,
          transfer: true,
          longAdress: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
          type: "Call",
          symbol: "HCCT",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 10,
          outPriceUnit: "HELMET",
          showVolume: volume,
          buyVolume: volume,
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
          askID: "air",
          id: 3,
          bidID: 3,
          buyer: myAddress,
          show_price: 1.8343,
          premium: volume * 1.8343,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1613750400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xa8c2b8eec3d368c0253ad3dae65a5f2bbb89c929",
          show_strikePrice: 2.5,
          _strikePrice: 2.5,
          _underlying: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _expiry: 1613750400000,
          transfer: true,
          longAdress: "0x936909e72951a19a5e1d75a109b0d34f06f39838",
          type: "call",
          symbol: "hCTK",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 2.5,
          outPriceUnit: "HELMET",
          unit: 6,
          showVolume: volume,
          buyVolume: volume,
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
          askID: "air",
          id: 4,
          bidID: 4,
          buyer: myAddress,
          show_price: 1,
          premium: volume * 1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1615226400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xae9269f27437f0fcbc232d39ec814844a51d6b8f",
          show_strikePrice: 0.07,
          _strikePrice: 0.07,
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1615226400000,
          transfer: true,
          longAdress: "0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa",
          type: "Call",
          symbol: "hBURGER",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.07,
          outPriceUnit: "BNB",
          showVolume: volume,
          buyVolume: volume,
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
          askID: "air",
          id: 5,
          bidID: 5,
          buyer: myAddress,
          show_price: "redbag.png",
          premium: "redbag.png",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1613577600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          show_strikePrice: 0.1,
          _strikePrice: 0.1,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1613577600000,
          transfer: true,
          longAdress: "0x9eC5F3216c381715d7Bd06E00879a95d9Dd8e417",
          type: "Call",
          symbol: "LiShi",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.1,
          outPriceUnit: "BUSD",
          showType: "img",
          showVolume: volume,
          buyVolume: volume,
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
          askID: "air",
          id: 5,
          bidID: 5,
          buyer: myAddress,
          show_price: "--",
          premium: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1616256000000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          show_strikePrice: 500,
          _strikePrice: 500,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1616256000000,
          transfer: true,
          longAdress: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
          type: "Call",
          symbol: "BNB500",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 500,
          outPriceUnit: "BUSD",
          // showType: "img",
          showVolume: volume,
          buyVolume: volume,
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
          askID: "air",
          id: 6,
          bidID: 6,
          buyer: myAddress,
          show_price: 1000,
          premium: volume * 1000,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1616428800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xa184088a740c695e156f91f5cc086a06bb78b827",
          show_strikePrice: 42,
          _strikePrice: 42,
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1616601600000,
          transfer: true,
          longAdress: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
          type: "Call",
          symbol: "hAUTO",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 42,
          outPriceUnit: "BNB",
          // showType: "img",
          showVolume: volume,
          buyVolume: volume,
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
          askID: "air",
          id: 7,
          bidID: 7,
          buyer: myAddress,
          show_price: 1,
          premium: volume * 1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1616428800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xf218184af829cf2b0019f8e6f0b2423498a36983",
          show_strikePrice: 0.014,
          _strikePrice: 0.014,
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1616428800000,
          transfer: true,
          longAdress: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
          type: "Call",
          symbol: "hMATH",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.014,
          outPriceUnit: "BNB",
          // showType: "img",
          showVolume: volume,
          buyVolume: volume,
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
          askID: "air",
          id: 8,
          bidID: 8,
          buyer: myAddress,
          show_price: 0.1,
          premium: volume * 0.1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1617465600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x658a109c5900bc6d2357c87549b651670e5b0539",
          show_strikePrice: 0.25,
          _strikePrice: 0.25,
          _underlying: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _expiry: 1617465600000,
          transfer: true,
          longAdress: "0xb779F208f8d662558dF8E2b6bFE3b6305CC13389",
          type: "Call",
          symbol: "hFOR",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.25,
          outPriceUnit: "HELMET",
          // showType: "img",
          showVolume: volume,
          buyVolume: volume,
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
          askID: "air",
          id: 9,
          bidID: 9,
          buyer: myAddress,
          show_price: "--",
          premium: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1617897600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          show_strikePrice: 0.1,
          _strikePrice: 0.1,
          _underlying: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
          _expiry: 1617897600000,
          transfer: true,
          longAdress: "0x9065fcbb5f73B908aC4B05BdB81601Eec2065522",
          type: "Call",
          symbol: "HCCTII",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.1,
          outPriceUnit: "CAKE",
          // showType: "img",
          showVolume: volume,
          buyVolume: volume,
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
          askID: "air",
          id: 10,
          bidID: 10,
          buyer: myAddress,
          show_price: 1,
          premium: volume * 1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1618416000000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2",
          show_strikePrice: 10,
          _strikePrice: 10,
          _underlying: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _expiry: 1618416000000,
          transfer: true,
          longAdress: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
          type: "Call",
          symbol: "hDODO",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 10,
          outPriceUnit: "HELMET",
          // showType: "img",
          showVolume: volume,
          buyVolume: volume,
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
          askID: "air",
          id: 11,
          bidID: 11,
          buyer: myAddress,
          show_price: 0.01,
          premium: volume * 0.01,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1620057600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xeca41281c24451168a37211f0bc2b8645af45092",
          show_strikePrice: 0.06,
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
          buyVolume: volume,
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
          askID: "air",
          id: 12,
          bidID: 12,
          buyer: myAddress,
          show_price: 0.1,
          premium: volume * 0.1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1620576000000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x07aaa29e63ffeb2ebf59b33ee61437e1a91a3bb2",
          show_strikePrice: 1,
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
          buyVolume: volume,
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
          askID: "air",
          id: 13,
          bidID: 13,
          buyer: myAddress,
          show_price: "--",
          premium: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1623772800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          show_strikePrice: 1.5,
          _strikePrice: 1.5,
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
          buyVolume: volume,
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
          askID: "air",
          id: 14,
          bidID: 14,
          buyer: myAddress,
          show_price: "--",
          premium: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1624118400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          show_strikePrice: 1.5,
          _strikePrice: 1.5,
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
          buyVolume: volume,
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
          askID: "air",
          id: 15,
          bidID: 15,
          buyer: myAddress,
          show_price: "--",
          premium: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1621612800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xafe24e29da7e9b3e8a25c9478376b6ad6ad788dd",
          show_strikePrice: 0.1,
          _strikePrice: 0.1,
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
          buyVolume: volume,
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
    async SHIBHRolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
        "SHIBh"
      );

      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x224b33139a377a62d4BaD3D58cEDb7807AE228eB");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 16,
          bidID: 16,
          buyer: myAddress,
          show_price: "Airdrop",
          premium: "Airdrop",
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1626105600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          show_strikePrice: 0.000001,
          _strikePrice: 0.000001,
          _underlying: "0xaf90e457f4359adcc8b37e8df8a27a1ff4c3f561",
          _expiry: 1626105600000,
          transfer: true,
          longAdress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
          type: "Put",
          symbol: "SHIBh",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.000001,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          unit: 12,
          TypeCoin: getTokenName("0xaf90e457f4359adcc8b37e8df8a27a1ff4c3f561"),
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
    async HWINGSRolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026"
      );

      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x34508EA9ec327ff3b98A2F10eEDc2950875bf026");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 17,
          bidID: 17,
          buyer: myAddress,
          show_price: 1,
          premium: 1 * volume,
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1625932800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x0487b824c8261462f88940f97053e65bdb498446",
          show_strikePrice: 9,
          _strikePrice: 9,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1625932800000,
          transfer: true,
          longAdress: "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026",
          type: "Call",
          symbol: "hWINGS",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 9,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x0487b824c8261462f88940f97053e65bdb498446"),
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
    async HMTRGolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0xa561926e81decb74b3d11e14680b3f6d1c5012bd"
      );

      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xa561926e81decb74b3d11e14680b3f6d1c5012bd");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 18,
          bidID: 18,
          buyer: myAddress,
          show_price: "--",
          premium: "--",
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1626969600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xbd2949f67dcdc549c6ebe98696449fa79d988a9f",
          show_strikePrice: 4.7,
          _strikePrice: 4.7,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1626969600000,
          transfer: true,
          longAdress: "0xa561926e81decb74b3d11e14680b3f6d1c5012bd",
          type: "Call",
          symbol: "hMTRG",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 4.7,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0xbd2949f67dcdc549c6ebe98696449fa79d988a9f"),
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
    async HBABYolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624"
      );

      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 19,
          bidID: 19,
          buyer: myAddress,
          show_price: "--",
          premium: "--" * volume,
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1627228800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x53e562b9b7e5e94b81f10e96ee70ad06df3d2657",
          show_strikePrice: 0.4,
          _strikePrice: 0.4,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1627228800000,
          transfer: true,
          longAdress: "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624",
          type: "Call",
          symbol: "hBABY",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.4,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x53e562b9b7e5e94b81f10e96ee70ad06df3d2657"),
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
    async HBMXXolicy() {
      let myAddress =
        this.$store.state.userInfo.data &&
        this.$store.state.userInfo.data.account &&
        this.$store.state.userInfo.data.account.toLowerCase();
      let volume = await getBalance(
        "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44"
      );

      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 20,
          bidID: 20,
          buyer: myAddress,
          show_price: "--",
          premium: "--" * volume,
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1627574400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x4131b87f74415190425ccd873048c708f8005823",
          show_strikePrice: 20,
          _strikePrice: 20,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1627574400000,
          transfer: true,
          longAdress: "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44",
          type: "Call",
          symbol: "hBMXX",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 20,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x4131b87f74415190425ccd873048c708f8005823"),
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
      let list = this.FilterList.slice(
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
      h3 {
        @include themeify {
          color: themed("color-17173a");
        }
      }
    }
    .policy_item {
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
          min-width: 300px;
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
          min-width: 200px;
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
          justify-content: flex-end;
          min-width: 120px;
          button {
            padding: 0px 10px;
            height: 36px;
            @include themeify {
              background: themed("insure_button");
              border: 1px solid themed("insure_button_border");
              color: themed("insure_button_text");
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
            &:hover {
              border: 1px solid themed("color-fd7e14") !important;
            }
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
      h3 {
        @include themeify {
          color: themed("color-17173a");
        }
      }
    }
    .policy_item_H5 {
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
            font-size: 14px;
            font-family: HelveticaNeue;
            line-height: 24px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
              border: 1px solid themed("color-fd7e14") !important;
            }
          }
        }
      }
    }
  }
}
</style>
