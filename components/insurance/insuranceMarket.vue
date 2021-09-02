<template>
  <div class="insurance_market">
    <InsuranceTitle
      :ActiveData="ActiveData"
      :ActiveType="ActiveType"
    ></InsuranceTitle>
    <div class="policy_wrap" v-if="PolicyList && PolicyList.length">
      <div class="policy_title WEB">
        <div class="title_index">{{ $t("Table.ID") }}</div>
        <div class="title_price">{{ $t("Table.Rent") }}</div>
        <div class="title_amount">
          {{ $t("Table.Amount") }}({{ $t("Table.Cont") }})
        </div>
        <div class="title_info">
          {{ $t("Table.Tips", { type: ActiveData.InsuranceName }) }}
        </div>
        <div class="title_options">{{ $t("Table.Options") }}</div>
      </div>
      <div class="policy_list">
        <div
          class="policy_item"
          v-for="(item, index) in PolicyList.slice(MinNumber, MaxNumber)"
          :key="index"
        >
          <div class="policy_item_id_web WEB">
            {{ item.show_ID }}
          </div>
          <div class="policy_item_price_web WEB">
            {{ item.premium.toFixed(8) }}
          </div>
          <div class="policy_item_volume_web WEB">{{ item.show_volume }}</div>
          <div class="policy_item_input_web WEB">
            <input
              type="text"
              name=""
              v-model="item.buy_volume"
              :max="item.show_volume"
              :maxlength="8"
              :placeholder="$t('Table.NumberSubscriptions')"
            />
          </div>
          <div
            class="policy_item_option_web WEB"
            :style="
              item.status == 'dated' || item.show_volume == 0
                ? 'visibility: hidden;'
                : ''
            "
          >
            <button @click="buyInsurance(item)">
              {{ $t("Table.Subscribe") }}
            </button>
          </div>
          <div class="policy_item_price_h5 H5">
            <p>
              <span>{{ $t("Table.Rent") }}</span>
              <span>{{ item.premium.toFixed(8) }}</span>
            </p>
            <p>
              <span>{{ $t("Table.Amount") }}({{ $t("Table.Cont") }})</span>
              <span>{{ item.show_volume }}</span>
            </p>
          </div>
          <div class="policy_item_option_h5 H5">
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
          </div>
        </div>
      </div>
    </div>
    <NoData v-else />
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="5"
        :hide-on-single-page="PolicyList.length < PageSize"
        :total="PolicyList.length"
        @current-change="changePage"
      >
      </el-pagination>
    </div>

    <!-- dialog -->
    <WaitingConfirmationDialog
      :DialogVisible="WaitingVisible"
      :DialogClose="waitingClose"
    >
      <p>
        Buy <b>{{ WaitingBuyNumber }} {{ WaitingBuyPolicys }}</b> Policys,
      </p>
      <p>
        the Premium is <b>{{ WaitingPremium }}</b> HELMET
      </p>
    </WaitingConfirmationDialog>
    <SuccessConfirmationDialog
      :DialogVisible="SuccessVisible"
      :DialogClose="successClose"
      :SuccessHash="SuccessHash"
    />
  </div>
</template>

<script>
import { fixD } from "~/assets/js/util.js";
import Page from "~/components/common/page.vue";
import InsuranceTitle from "./insuranceTitle";
import { getInsuranceList } from "~/interface/event.js";
import OrderABI from "../../abi/OrderABI.json";
import { toWei, fromWei } from "~/interface/index.js";
import { getContract } from "../../web3/index.js";
import WaitingConfirmationDialog from "~/components/dialogs/waiting-confirmation-dialog.vue";
import NoData from "~/components/common/no-data.vue";
import SuccessConfirmationDialog from "~/components/dialogs/success-confirmation-dialog.vue";
import BigNumber from "bignumber.js";
const OrderAddress = "0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D";
export default {
  components: {
    WaitingConfirmationDialog,
    SuccessConfirmationDialog,
    NoData,
    InsuranceTitle,
    Page,
  },
  props: ["ActiveData", "ActiveType"],
  data() {
    return {
      PolicyList: [],
      isLoading: true,
      fixD,
      WaitingVisible: false,
      SuccessVisible: false,
      WaitingBuyNumber: "",
      WaitingBuyPolicys: "",
      WaitingPremium: "",
      SuccessHash: "",
      CurrentPage: 1,
      PageSize: 10,
      MinNumber: 0,
      MaxNumber: 10,
    };
  },
  computed: {
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  watch: {
    ActiveType(value) {
      if (value) {
        this.getPolicyList();
      }
    },
  },
  mounted() {
    this.getPolicyList();
  },
  methods: {
    waitingClose() {
      this.WaitingVisible = false;
    },
    successClose() {
      this.SuccessVisible = false;
    },
    changePage(value) {
      this.CurrentPage = value;
      if (this.CurrentPage <= 1) {
        this.MinNumber = 0;
        this.MinNumber = this.PageSize;
      } else {
        this.MaxNumber = (value - 1) * this.PageSize;
        this.MaxNumber = (value - 1) * this.PageSize + this.PageSize;
      }
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
          : toWei(
              fixD(Number(1 / StrikePrice), StrikePriceDecimals) + "",
              StrikePriceDecimals
            );
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
        BuyContracts.methods
          .buy(AskID, Volume)
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingBuyNumber = fixD(data.buy_volume, 4);
            this.WaitingBuyPolicys = data.currentInsurance;
            this.WaitingPremium = fixD(
              (data.premium / data.show_volume) * data.buy_volume,
              4
            );
            this.WaitingVisible = true;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              getPolicyList();
            }
          })
          .on("error", function (ereor) {
            this.WaitingVisible = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/insurance_list.scss";
</style>
