<template>
  <div class="insurance_market">
    <InsuranceTitle
      :ActiveData="ActiveData"
      :ActiveType="ActiveType"
    ></InsuranceTitle>
    <div class="insurance_list">
      <table>
        <thead>
          <tr>
            <td>{{ $t("Table.ID") }}</td>
            <td>{{ $t("Table.Rent") }}</td>
            <td>{{ $t("Table.Amount") }}({{ $t("Table.Cont") }})</td>
            <td>
              {{ $t("Table.Tips", { type: ActiveData.InsuranceName }) }}
            </td>
            <td class="option">{{ $t("Table.Options") }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in PolicyList" :key="index">
            <td>
              {{ item.show_ID }}
              <i
                class="copy"
                id="copy"
                @click="copyAdress($event, item.seller)"
              ></i>
            </td>
            <td>{{ item.premium.toFixed(8) }}</td>
            <td>{{ item.show_volume }}</td>
            <td>
              <input
                type="text"
                name=""
                v-model="item.buy_volume"
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
              <button @click="buyInsurance(item)">
                {{ $t("Table.Subscribe") }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="insurance_list_H5">
      <div
        class="list_item_H5"
        v-for="(item, index) in PolicyList"
        :key="index"
      >
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
            @click="waitingConfirm(item)"
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
    <div class="loading" v-if="isLoading">
      <img src="~/assets/img/loading.png" />
      <div class="shadow"></div>
      <p>{{ $t("Table.LoadingWallet") }}</p>
    </div>
    <section class="noData" v-if="FilterList.length < 1 && !isLoading">
      <div>
        <img
          :src="require(`~/assets/img/helmet/nodata_${storeThemes}.png`)"
          alt=""
        />
        <p>{{ $t("Table.NoData") }}</p>
      </div>
    </section>
    <section class="pages" v-if="FilterList.length > 10">
      <Page
        :total="FilterList.length"
        :limit="limit"
        :page="page + 1"
        @page-change="handleClickChagePage"
      />
    </section>
    <WaitingConfirmationDialog :DialogVisible="WaitingVisible">
      <p>
        Buy <b>{{ WaitingBuyNumber }} {{ WaitingBuyPolicys }}</b> Policys,
      </p>
      <p>
        the Premium is <b>{{ WaitingPremium }}</b> HELMET
      </p>
    </WaitingConfirmationDialog>
  </div>
</template>

<script>
import PInput from "~/components/common/p-input.vue";
import { fixD } from "~/assets/js/util.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import Page from "~/components/common/page.vue";
import InsuranceTitle from "./insuranceTitle";
import { getInsuranceList } from "~/interface/event.js";
import OrderABI from "../../abi/OrderABI.json";
import { toWei, fromWei } from "~/interface/index.js";
import { getContract } from "../../web3/index.js";
import WaitingConfirmationDialog from "~/components/dialogs/waiting-confirmation-dialog.vue";
import BigNumber from "bignumber.js";
const OrderAddress = "0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D";
export default {
  components: {
    WaitingConfirmationDialog,
    InsuranceTitle,
    PInput,
    Page,
  },
  props: ["ActiveData", "ActiveType"],
  data() {
    return {
      page: 0,
      limit: 10,
      page_h5: 0,
      limit_h5: 3,
      PolicyList: [],
      FilterList: [],
      isLoading: true,
      fixD,
      WaitingVisible: false,
      WaitingBuyNumber: "",
      WaitingBuyPolicys: "",
      WaitingPremium: "",
    };
  },
  computed: {
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  watch: {},
  mounted() {
    this.getPolicyList();
  },
  methods: {
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
    getPolicyList() {
      this.isLoading = true;
      const {
        StrikePrice,
        StrikePriceDecimals,
        PolicyPriceDecimals,
        CollateralSymbol,
        CollateralAddress,
        CollateralDecimals,
        UnderlyingSymbol,
        UnderlyingAddress,
        UnderlyingDecimals,
      } = this.ActiveData[this.ActiveType];
      const { Expiry, InsuranceName, SettleTokenSymbol } = this.ActiveData;
      const FixStrikePrice =
        this.ActiveType === "Call"
          ? toWei(StrikePrice + "", StrikePriceDecimals)
          : toWei(Number(1 / StrikePrice) + "", StrikePriceDecimals);
      getInsuranceList().then((res) => {
        if (res && res.data.data.options) {
          const ReturnList = res.data.data.options;
          const FixListPush = [];
          const FilterList = ReturnList.filter(
            (item) =>
              this.ActiveData &&
              item.collateral.toLocaleLowerCase() ===
                CollateralAddress.toLocaleLowerCase() &&
              item.underlying.toLocaleLowerCase() ===
                UnderlyingAddress.toLocaleLowerCase() &&
              item.expiry === Expiry + "" &&
              item.strikePrice === FixStrikePrice
          );
          if (FilterList) {
            FilterList.forEach((item) => {
              const ResultItem = {
                type: this.ActiveType,
                expiry: item.expiry,
                long: item.long,
                short: item.short,
                show_strikePrice: fromWei(
                  item.strikePrice,
                  StrikePriceDecimals
                ),
                strikePrice: item.strikePrice,
                collateral: item.collateral,
                collateral_symbol: CollateralSymbol,
                collateral_decimals: CollateralDecimals,
                underlying: item.underlying,
                underlying_symbol: UnderlyingSymbol,
                underlying_decimals: UnderlyingDecimals,
                currentInsurance: InsuranceName,
              };
              item.asks.filter((itemAsk) => {
                const ResultItemAsk = {
                  askID: itemAsk.askID,
                  isCancel: itemAsk.isCancel,
                  show_ID:
                    itemAsk.seller.substr(0, 2) +
                    itemAsk.seller.substr(2, 3) +
                    "..." +
                    itemAsk.seller.substr(-4).toUpperCase(),
                  settleToken_symbol: SettleTokenSymbol,
                  show_price: fromWei(itemAsk.price, PolicyPriceDecimals),
                  price: itemAsk.price,
                  volume: itemAsk.volume,
                };
                if (itemAsk.binds.length) {
                  let number = 0;
                  if (itemAsk.binds.length) {
                    itemAsk.binds.forEach(
                      (itembid) =>
                        (number += Number(
                          fromWei(itembid.volume, CollateralDecimals)
                        ))
                    );
                  }
                  ResultItem.remain =
                    Number(fromWei(itemAsk.volume, CollateralDecimals)) -
                    number;
                } else {
                  ResultItem.remain = Number(
                    fromWei(itemAsk.volume, CollateralDecimals)
                  );
                }
                const AllItem = Object.assign(ResultItemAsk, ResultItem);
                if (AllItem.type === "Put") {
                  AllItem.show_volume = Number(
                    AllItem.remain / (1 / AllItem.show_strikePrice)
                  ).toFixed(8);
                } else {
                  AllItem.show_volume = Number(AllItem.remain).toFixed(8);
                }
                AllItem.premium = AllItem.remain * AllItem.show_price;
                if (!AllItem.isCancel && AllItem.price.length <= 40) {
                  FixListPush.push(AllItem);
                }
              });
            });
            const FixList = FixListPush.sort(
              (a, b) => Number(b.show_volume) - Number(a.show_volume)
            );
            this.PolicyList = FixList;
          }
        } else {
          this.isLoading = false;
        }
      });
    },
    buyInsurance(data) {
      console.log(data);
      this.WaitingBuyNumber = fixD(data.buy_volume, 4);
      this.WaitingBuyPolicys = data.currentInsurance;
      this.WaitingPremium = fixD(data.premium * data.buy_volume, 4);
      this.WaitingVisible = true;
      // const Text = this.$t("Dialogs.WaitText1", {
      //   type: this.ActiveType,
      //   symbol: this.ActiveData.InsuranceName,
      //   collateral: this.ActiveData.CollateralSymbol,
      //   volume: 1,
      //   strikeprice: this.ActiveData.StrikePrice,
      //   price: 1,
      //   expiry: this.ActiveData.ShowExpiry,
      // });
      // this.$confirm(Text, "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      // })
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "删除成功!",
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除",
      //     });
      //   });
      if (Number(data.buy_volume) <= Number(data.show_volume)) {
        const BuyContracts = getContract(OrderABI, OrderAddress);
        const AskID = data.askID;
        let Volume;
        if (data.type === "Put") {
          if (data.buy_volume >= data.show_volume) {
            Volume = data.volume;
          } else {
            Volume = toWei(
              new BigNumber(
                (data.buy_volume * (1 / data.show_strikePrice)).toFixed(6)
              ).toString(),
              data.collateral_decimals
            );
          }
        } else {
          if (data.buy_volume >= data.show_volume) {
            Volume = data.volume;
          } else {
            Volume = toWei(data.buy_volume, data.collateral_decimals);
          }
        }
        const Account = window.CURRENTADDRESS;
        console.log(Account);
        console.log(AskID, Volume);
        BuyContracts.methods
          .buy(AskID, Volume)
          .send({ from: Account })
          .on("transactionHash", (hash) => {})
          .on("receipt", (_, receipt) => {
            getPolicyList();
          })
          .on("error", (ereor) => {});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/insurance_list.scss";
</style>
