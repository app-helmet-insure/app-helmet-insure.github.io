<template>
  <div class="insurance_market">
    <!-- <Chart :ActiveData="ActiveData" :ActiveType="ActiveType"></Chart> -->
    <div class="insurance_sort_web WEB"></div>
    <div class="insurance_sort_h5 H5">
      <h3>选择保单</h3>
      <div>
        <p class="time">
          <span>保期</span>
          <span>
            {{ ActiveData.ShowExpiry }}{{ ActiveData.ShowExpiryDay }}
          </span>
        </p>
        <p class="sort" @click="handleClickSort()">
          <span>
            {{ $t("Content.InsurancePrice") }}
          </span>
          <span class="sort_btn">
            <i class="top" :class="SortBy === 1 ? 'active_sort_top' : ''"></i>
            <i class="bot" :class="SortBy === 2 ? 'active_sort_bot' : ''"></i>
          </span>
        </p>
      </div>
    </div>
    <Loading v-if="isLoading" />
    <div
      class="policy_wrap"
      v-if="!isLoading && PolicyList && PolicyList.length"
    >
      <div class="policy_title WEB">
        <div class="title_index">{{ $t("Table.ID") }}</div>
        <div class="titke_strikeprice" @click="handleClickSort()">
          {{ $t("Content.InsurancePrice") }}({{
            ActiveData.Call.UnderlyingSymbol
          }})
          <span class="sort_btn">
            <i class="top" :class="SortBy === 1 ? 'active_sort_top' : ''"></i>
            <i class="bot" :class="SortBy === 2 ? 'active_sort_bot' : ''"></i>
          </span>
        </div>
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
          <div class="policy_item_strikeprice_web WEB">
            {{ item.show_strikePrice }}
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
              <span
                >{{ $t("Content.InsurancePrice") }}({{
                  ActiveData.Call.UnderlyingSymbol
                }})</span
              >
              <span>{{ item.show_strikePrice }}</span>
            </p>
            <p>
              <span>{{ $t("Table.Rent") }}</span>
              <span>{{ item.premium.toFixed(8) }}</span>
            </p>
          </div>
          <div class="policy_item_volume_h5 H5">
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
    <NoData v-if="!isLoading && (!PolicyList || !PolicyList.length)" />
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
      <div class="waiting_content">
        <p>
          Buy <b>{{ WaitingBuyNumber }} {{ WaitingBuyPolicys }}</b> Policys,
        </p>
        <p>
          the Premium is <b>{{ WaitingPremium }}</b> HELMET
        </p>
      </div>
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
import Chart from "./chart";
import { getInsuranceList } from "~/interface/event.js";
import OrderABI from "~/web3/abis/OrderABI.json";
import { getContract, toWei, fromWei } from "../../web3/index.js";
import BigNumber from "bignumber.js";
import NoData from "./no-data.vue";
import Loading from "./loading.vue";
import WaitingConfirmationDialog from "~/components/dialogs/waiting-confirmation-dialog.vue";
import SuccessConfirmationDialog from "~/components/dialogs/success-confirmation-dialog.vue";
const OrderAddress = "0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D";
export default {
  components: {
    WaitingConfirmationDialog,
    SuccessConfirmationDialog,
    NoData,
    Chart,
    Loading,
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
      SortBy: 1,
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
        this.isLoading = true;
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
        this.MaxNumber = this.PageSize;
      } else {
        this.MinNumber = (value - 1) * this.PageSize;
        this.MaxNumber = (value - 1) * this.PageSize + this.PageSize;
      }
    },
    handleClickSort() {
      console.log(1);
      if (this.SortBy == 1) {
        this.SortBy = 2;
        return (this.PolicyList = this.PolicyList.sort(
          (a, b) => Number(a.show_strikePrice) - Number(b.show_strikePrice)
        ));
      }
      if (this.SortBy == 2) {
        this.SortBy = 1;
        return (this.PolicyList = this.PolicyList.sort(
          (a, b) => Number(b.show_strikePrice) - Number(a.show_strikePrice)
        ));
      }
    },
    getPolicyList() {
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
              item.expiry === Expiry + ""
          );
          if (FilterList) {
            FilterList.forEach((item) => {
              const ResultItem = {
                type: this.ActiveType,
                expiry: item.expiry,
                long: item.long,
                short: item.short,
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
                  AllItem.show_strikePrice =
                    1 / fromWei(AllItem.strikePrice, StrikePriceDecimals);
                  AllItem.show_volume = Number(
                    AllItem.remain / AllItem.show_strikePrice
                  ).toFixed(8);
                } else {
                  AllItem.show_strikePrice = fromWei(
                    AllItem.strikePrice,
                    StrikePriceDecimals
                  );
                  AllItem.show_volume = Number(AllItem.remain).toFixed(8);
                }
                AllItem.premium = AllItem.remain * AllItem.show_price;
                if (!AllItem.isCancel && AllItem.price.length <= 40) {
                  FixListPush.push(AllItem);
                }
              });
            });
            let FixList = FixListPush.sort(
              (a, b) => Number(b.show_volume) - Number(a.show_volume)
            );
            FixList = FixListPush.sort(
              (a, b) => Number(b.show_strikePrice) - Number(a.show_strikePrice)
            );

            this.PolicyList = FixList;
            this.isLoading = false;
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
          .on("error", (ereor) => {
            this.WaitingVisible = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/themes.scss";
.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
}
.sort_btn {
  i {
    display: block;
  }
  .top {
    @include themeify {
      border-bottom: 6px solid transparent;
      border-top: 6px solid transparent;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
    }
    @include themeify {
      border-bottom-color: themed("insure_input_border");
    }
    margin-bottom: 2px;
  }
  .bot {
    @include themeify {
      border-bottom: 6px solid transparent;
      border-top: 6px solid transparent;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
    }
    @include themeify {
      border-top-color: themed("insure_input_border");
    }
    margin-top: 2px;
  }
  .active_sort_top {
    border-bottom-color: #fd7e14 !important;
  }
  .active_sort_bot {
    border-top-color: #fd7e14 !important;
  }
}
@media screen and (min-width: 750px) {
  .H5 {
    display: none;
  }
  .insurance_sort_web {
    height: 64px;
    width: 100%;
  }
  .policy_wrap {
    min-height: 500px;
    .policy_title {
      width: 100%;
      height: 40px;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include themeify {
        background: themed("color-f8f9fa");
        color: darken($color: themed("color-17173a"), $amount: 60%);
      }
      > div {
        width: 100px;
        white-space: nowrap;
        line-height: 40px;
        font-size: 14px;
      }
      .title_options {
        text-align: right;
      }
      .titke_strikeprice {
        cursor: pointer;
        display: flex;
        align-items: center;
        >span{
          margin-left: 4px;
        }
      }
    }
    .policy_list {
      width: 100%;
      .policy_item {
        width: 100%;
        padding: 0 20px;
        white-space: nowrap;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include themeify {
          box-shadow: 0px 1px 0px 0px themed("color-ededf0");
          color: themed("color-17173a");
        }
        > div {
          width: 100px;
          white-space: nowrap;
          line-height: 40px;
          font-size: 14px;
        }
        .policy_item_input_web {
          input {
            border-radius: 5px;
            width: 160px;
            height: 32px;
            @include themeify {
              background: themed("color-ffffff");
              border: 1px solid themed("color-ededf0");
              color: themed("color-000000");
            }
            padding: 0 10px;
            &:focus {
              border: 1px solid #fd7e14 !important;
              width: 160px;
            }
          }
        }
      }
      .policy_item_option_web {
        text-align: right;
        display: inline;
        button {
          padding: 0 20px;
          height: 32px;
          @include themeify {
            background: themed("black_button");
            color: themed("black_button_text");
          }
          &:hover {
            @include themeify {
              background: themed("black_button_hover");
            }
          }
          border-radius: 3px;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .WEB {
    display: none;
  }
  .insurance_sort_h5 {
    height: 105px;
    @include themeify {
      border-bottom: 1px solid themed("color-e8e8eb");
    }
    > h3 {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      line-height: 24px;
      @include themeify {
        color: themed("color-17173a");
      }
    }
    > div {
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .time {
        display: flex;
        flex-direction: column;
        > span {
          &:nth-child(1) {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            @include themeify {
              color: themed("color-17173a");
              opacity: 0.4;
            }
          }
          &:nth-child(2) {
            margin-top: 4px;
            font-size: 14px;
            font-family: IBMPlexSans;
            @include themeify {
              color: themed("color-17173a");
            }
          }
        }
      }
      .sort {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 132px;
        height: 27px;
        border-radius: 6px;
        font-family: PingFangSC-Regular, PingFang SC;
        padding: 0 10px;
        @include themeify {
          border: 1px solid themed("color-e8e8eb");
        }
        span {
          &:nth-child(1) {
            font-size: 14px;
            line-height: 14px;
            @include themeify {
              color: themed("color-17173a");
              opacity: 0.4;
            }
          }
        }
      }
    }
  }
  .insurance_list {
    > h3 {
      margin: 20px 0;
    }

    .policy_item {
      width: 100%;
      padding: 14px 0;
      @include themeify {
        border-bottom: 1px solid themed("color-e8e8eb");
      }
      .policy_item_price_h5 {
        display: flex;
        align-items: center;
        p {
          display: flex;
          flex-direction: column;
          flex: 1;
          &:nth-of-type(2) {
            text-align: right;
          }
          span {
            &:nth-of-type(1) {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              @include themeify {
                color: themed("color-17173a");
                opacity: 0.5;
              }
            }
            &:nth-of-type(2) {
              margin-top: 4px;
              font-size: 14px;
              font-family: IBMPlexSans;
              font-weight: 600;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 14px;
            }
          }
        }
      }
      .policy_item_volume_h5 {
        display: flex;
        align-items: center;
        margin-top: 10px;
        p {
          display: flex;
          flex-direction: column;
          flex: 1;
          &:nth-of-type(2) {
            text-align: right;
          }
          span {
            &:nth-of-type(1) {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              @include themeify {
                color: themed("color-17173a");
                opacity: 0.5;
              }
            }
            &:nth-of-type(2) {
              margin-top: 4px;
              font-size: 14px;
              font-family: IBMPlexSans;
              font-weight: 600;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 14px;
            }
          }
        }
      }
      .policy_item_option_h5 {
        display: flex;
        align-items: center;
        margin-top: 16px;
        input {
          flex: 1;
          height: 40px;
          border-radius: 5px;
          @include themeify {
            border: 1px solid themed("insure_input_border");
            color: themed("color-000000");
          }
          background: transparent;

          padding-left: 10px;
          &::placeholder {
            font-family: IBMPlexSans;
            @include themeify {
              color: themed("color-17173a");
              opacity: 0.6;
            }
          }
          &:focus {
            border: 1px solid themed("color-fd7e14") !important;
          }
        }
        button {
          margin-left: 13px;
          height: 40px;
          padding: 0 16px;
          font-size: 14px;
          font-family: IBMPlexSans;
          @include themeify {
            background: themed("black_button");
          }
          color: #fff;
          line-height: 18px;
          border-radius: 5px;
          &:hover {
            @include themeify {
              background: themed("black_button_hover");
            }
          }
        }
      }
    }
  }
}
</style>
