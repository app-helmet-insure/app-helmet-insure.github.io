<template>
  <div class="my_supply">
    <div class="supply_title">
      <h3>{{ $t("Type.IssueInsurance") }}</h3>
    </div>
    <!-- pc -->
    <Loading v-if="isLoading" />
    <div
      class="my_supply_wrap"
      v-if="!isLoading && PolicyList && PolicyList.length"
    >
      <div
        class="supply_item"
        v-for="item in PolicyList.slice(MinNumber, MaxNumber)"
        :key="item.AskID"
      >
        <section class="supply_item_id_web WEB">
          <p>
            <span>{{ $t("Table.ID") }}:{{ item.AskID }}</span>
            <span>{{ item.ShowExpiry }}</span>
          </p>
          <span :class="item.Type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.CallToken }} {{ item.Type }} {{ item.ShowStrikePrice }}
            {{ item.PutToken }}
            {{ item.symbol ? "(" + item.symbol + ")" : "" }}
            <i :class="item.Type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section class="supply_item_strikeprice_web WEB">
          <p>
            <span>{{ $t("Insurance.Insurance_text11") }}: </span>
            <span>{{ item.ShowStrikePrice }} {{ item.PutToken }}</span>
          </p>
          <p>
            <span>{{ $t("Table.PolicyPrice") }}: </span>
            <span>{{ fixD(item.ShowPrice, 8) }} HELMET</span>
          </p>
        </section>
        <section class="supply_item_price_web WEB">
          <p>
            <span>{{ $t("Table.Besold") }}:</span>
            <span>{{ fixD(item.ShowBeSold, 8) }} </span>
          </p>
          <p>
            <span>{{ $t("Table.Unsold") }}: </span>
            <span>{{ fixD(item.ShowUnSold, 8) }}</span>
          </p>
        </section>
        <section class="supply_item_action_web WEB">
          <button
            v-if="item.Status === 'Nomal'"
            class="nomal"
            @click="handleClickCancel(item)"
          >
            {{ $t("Insurance.Insurance_text15") }}
          </button>
          <button v-if="item.Status === 'Cancel'" class="sold">
            {{ $t("Insurance.Insurance_text25") }}
          </button>
          <button v-if="item.Status === 'Sold'" class="sold">
            {{ $t("Insurance.Insurance_text14") }}
          </button>
          <!-- <button>{{ $t("Table.StakeMining") }}</button> -->
        </section>
        <!-- =========================================== -->
        <section class="supply_item_id_h5 H5">
          <p>
            <span>{{ $t("Table.ID") }}:{{ item.AskID }}</span>
            <span>{{ item.ShowExpiry }}</span>
          </p>
        </section>
        <section class="supply_item_type_h5 H5">
          <span :class="item.Type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.CallToken }} {{ item.Type }} {{ item.ShowStrikePrice }}
            {{ item.PutToken }}
            {{ item.symbol ? "(" + item.symbol + ")" : "" }}
            <i :class="item.Type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section class="supply_item_price_h5 H5">
          <p>
            <span>{{ $t("Insurance.Insurance_text11") }}: </span>
            <span>{{ item.ShowStrikePrice }} {{ item.PutToken }}</span>
          </p>
          <p>
            <span>{{ $t("Table.PolicyPrice") }}: </span>
            <span>{{ fixD(item.ShowPrice, 8) }} HELMET</span>
          </p>
        </section>
        <section class="supply_item_sold_h5 H5">
          <p>
            <span>{{ $t("Table.Besold") }}:</span>
            <span>{{ fixD(item.ShowBeSold, 8) }} </span>
          </p>
          <p>
            <span>{{ $t("Table.Unsold") }}: </span>
            <span>{{ fixD(item.ShowUnSold, 8) }}</span>
          </p>
        </section>
        <section class="supply_item_action_h5 H5">
          <button
            v-if="item.Status === 'Nomal'"
            class="nomal"
            @click="handleClickCancel(item)"
          >
            {{ $t("Insurance.Insurance_text15") }}
          </button>
          <button v-if="item.Status === 'Sold'" class="sold">
            {{ $t("Insurance.Insurance_text14") }}
          </button>
        </section>
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
    <WaitingConfirmationDialog
      :DialogVisible="WaitingVisible"
      :DialogClose="waitingClose"
    >
      <div class="waiting_content">
        <p>
          {{ WaitingText }}
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
import { getInsuranceList } from "~/interface/event.js";
import { getContract } from "../../web3/index.js";
import moment from "moment";
import NoData from "./no-data.vue";
import Loading from "./loading.vue";
import { fromWei } from "~/web3/index.js";
import { getCurrentInsurance } from "~/config/insurance.js";
import OrderABI from "~/web3/abis/OrderABI.json";
import WaitingConfirmationDialog from "~/components/dialogs/waiting-confirmation-dialog.vue";
import SuccessConfirmationDialog from "~/components/dialogs/success-confirmation-dialog.vue";
const OrderAddress = "0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D";
export default {
  components: {
    WaitingConfirmationDialog,
    SuccessConfirmationDialog,
    NoData,
    Loading,
  },
  data() {
    return {
      fixD,
      CurrentPage: 1,
      PageSize: 10,
      MinNumber: 0,
      MaxNumber: 10,
      isLoading: true,
      isLogin: false,
      SuccessHash: "",
      WaitingText: "",
      WaitingVisible: false,
      SuccessVisible: false,
      PolicyList: [],
    };
  },
  computed: {
    CurrentAccount() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    CurrentAccount: {
      handler: "reloadData",
      immediate: true,
    },
  },
  methods: {
    reloadData(Value) {
      if (Value) {
        console.log(Value);
        this.isLogin = Value.isLogin;
        this.isLoading = true;
        this.getPolicysList();
      }
    },
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
    getPolicysList() {
      getInsuranceList().then((res) => {
        let nowDate = parseInt(moment.now() / 1000);
        if (res && res.data.data.options) {
          let Account = this.CurrentAccount.account;
          const ReturnList = res.data.data.options;
          const FixListPush = [];
          const FilterList = ReturnList.filter(
            (item) => item.expiry * 1 + 5814000 > nowDate
          );
          FilterList.forEach((item) => {
            const CurrentInsurance = getCurrentInsurance({
              CollateralAddress: item.collateral,
              UnderlyingAddress: item.underlying,
            });
            if (CurrentInsurance) {
              let {
                Type,
                ShowExpiry,
                StrikePriceDecimals,
                CollateralSymbol,
                CollateralAddress,
                CollateralDecimals,
                UnderlyingSymbol,
                UnderlyingAddress,
                UnderlyingDecimals,
                SettleTokenSymbol,
                SettleTokenDecimals,
                PolicyPriceDecimals,
                StrikePrice,
                CallToken,
                PutToken,
                LastPriceDecimals,
              } = CurrentInsurance;
              const ResultItem = {
                Type,
                Expiry: item.expiry,
                ShowExpiry: moment(new Date(item.expiry * 1000)).format(
                  "YYYY/MM/DD HH:mm:ss"
                ),
                Long: item.long,
                Short: item.short,
                StrikePrice: item.strikePrice,
                CollateralAddress: item.collateral,
                CollateralSymbol,
                CollateralDecimals,
                UnderlyingAddress: item.underlying,
                UnderlyingSymbol,
                UnderlyingDecimals,
                CallToken,
                PutToken,
              };
              item.asks.filter((itemAsk) => {
                const ResultItemAsk = {
                  AskID: itemAsk.askID,
                  IsCancel: itemAsk.isCancel,
                  ShowID:
                    itemAsk.seller.substr(0, 2) +
                    itemAsk.seller.substr(2, 3) +
                    "..." +
                    itemAsk.seller.substr(-4).toUpperCase(),
                  SettleTokenSymbol,
                  ShowPrice: fromWei(itemAsk.price, PolicyPriceDecimals),
                  Price: itemAsk.price,
                  Volume: itemAsk.volume,
                  ShowVolume: fromWei(itemAsk.volume, CollateralDecimals),
                };
                if (itemAsk.binds.length) {
                  let number = 0;
                  if (itemAsk.binds.length > 1) {
                    itemAsk.binds.forEach(
                      (itembid) =>
                        (number += Number(
                          fromWei(itembid.volume, CollateralDecimals)
                        ))
                    );
                  } else {
                    number = Number(
                      fromWei(itemAsk.binds[0].volume, CollateralDecimals)
                    );
                  }
                  ResultItem.ShowBeSold = number;
                  ResultItem.ShowUnSold =
                    Number(fromWei(itemAsk.volume, CollateralDecimals)) -
                    number;
                } else {
                  ResultItem.ShowBeSold = 0;
                  ResultItem.ShowUnSold = Number(
                    fromWei(itemAsk.volume, CollateralDecimals)
                  );
                }
                const AllItem = Object.assign(ResultItemAsk, ResultItem);
                if (AllItem.Type === "Put") {
                  AllItem.ShowStrikePrice = Number(
                    1 / fromWei(ResultItem.StrikePrice, StrikePriceDecimals)
                  ).toFixed(LastPriceDecimals);
                  AllItem.ShowBeSold = Number(
                    AllItem.ShowBeSold /
                      (1 / fromWei(ResultItem.StrikePrice, StrikePriceDecimals))
                  ).toFixed(8);
                  AllItem.ShowUnSold = Number(
                    AllItem.ShowUnSold /
                      (1 / fromWei(ResultItem.StrikePrice, StrikePriceDecimals))
                  ).toFixed(8);
                } else {
                  AllItem.ShowStrikePrice = fromWei(
                    ResultItem.StrikePrice,
                    StrikePriceDecimals
                  );
                  AllItem.ShowBeSold = Number(AllItem.ShowBeSold).toFixed(8);
                  AllItem.ShowUnSold = Number(AllItem.ShowUnSold).toFixed(8);
                }
                AllItem.Status = "Nomal";
                AllItem.Sort = 1;
                if (AllItem.IsCancel && Number(AllItem.ShowBeSold) === 0) {
                  AllItem.Status = "Hidden";
                  AllItem.Sort = 4;
                }
                if (AllItem.IsCancel && Number(AllItem.ShowBeSold) > 0) {
                  AllItem.Status = "Cancel";
                  AllItem.Sort = 2;
                }
                if (!AllItem.IsCancel && Number(AllItem.ShowUnSold) === 0) {
                  AllItem.Status = "Sold";
                  AllItem.Sort = 3;
                }
                if (
                  AllItem.Status !== "Hidden" &&
                  itemAsk.seller.toUpperCase() === Account.toUpperCase()
                ) {
                  FixListPush.push(AllItem);
                }
              });
            }
          });
          let FixList = FixListPush.sort(
            (a, b) => Number(b.AskID) - Number(a.AskID)
          );
          console.log(FixList);
          FixList = FixList.sort((a, b) => a.Sort - b.Sort);
          this.PolicyList = FixList;
          this.isLoading = false;
        }
      });
    },
    handleClickCancel(data) {
      const Contracts = getContract(OrderABI, OrderAddress);
      const Account = this.CurrentAccount.account;
      Contracts.methods
        .cancel(data.AskID)
        .send({ from: Account })
        .on("transactionHash", (hash) => {
          this.WaitingText = `Cancel your Policy supplying order.`;
          this.WaitingVisible = true;
        })
        .on("receipt", (receipt) => {
          if (!this.SuccessVisible) {
            this.SuccessHash = receipt.transactionHash;
            this.WaitingVisible = false;
            this.SuccessVisible = true;
            this.getPolicysList();
          }
        })
        .on("error", (ereor) => {
          this.WaitingVisible = false;
        });
    },
    toMining() {
      // this.$router.push("/mining");
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
  padding: 20px 0;
}
.cancel {
  display: inline-block;
  padding: 3px 10px;
  background: #fd7e14;
  line-height: 20px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  margin-left: 8px;
  &:hover {
    background: #ffa000;
  }
}
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
        border-left: 2px solid#28a745;
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
        border-left: 2px solid#fd7e14;
      }
    }
  }
}
.call_text {
  color: #28a745 !important;
}
.put_text {
  color: #dc3545 !important;
}
@media screen and (min-width: 750px) {
  .my_supply_wrap {
    width: 100%;
  }
  .H5 {
    display: none;
  }
  .o_button {
    margin-right: 12px;
  }
  .my_supply {
    position: relative;
    min-height: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .supply_item_H5 {
      display: none;
    }
    .loading {
      width: 100%;
      margin: auto 0;
    }
    .pages {
      width: 100%;
    }
    .supply_title {
      width: 100%;
      @include themeify {
        color: themed("color-17173a");
      }
    }
    .supply_item {
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
      .supply_item_id_web {
        flex: 5;
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
          color: #28a745;
        }
        > .put_text {
          color: #dc3545;
        }
      }
      .supply_item_strikeprice_web {
        flex: 4;
        display: flex;
        flex-direction: column;
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
      .supply_item_price_web {
        flex: 4;
        display: flex;
        flex-direction: column;
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
      .supply_item_action_web {
        flex: 3;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        button {
          width: 100px;
          padding: 0px 10px;
          height: 36px;
          @include themeify {
            background: themed("insure_button");
            border: 1px solid themed("insure_button_border");
            color: themed("insure_button_text");
          }
          &:hover {
            border: 1px solid themed("color-fd7e14") !important;
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
          &:nth-of-type(2) {
            margin-top: 6px;
          }
        }
        .sold {
          pointer-events: none;
        }
        .active {
          color: #fff;
          background: #fd7e14;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .my_supply_wrap {
    width: 100%;
  }
  .WEB {
    display: none;
  }
  .my_supply {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 10px;
    .supply_item {
      display: none;
    }
    .loading {
      width: 100%;
      margin: auto 0;
    }
    .pages {
      width: 100%;
    }
    .supply_title {
      width: 100%;
      height: 44px;
      margin-left: 10px;
      line-height: 55px;
      @include themeify {
        color: themed("color-17173a");
      }
    }
    .supply_item {
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
      .supply_item_id_h5 {
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
      .supply_item_type_h5 {
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
      .supply_item_price_h5 {
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
      .supply_item_sold_h5 {
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
      .supply_item_action_h5 {
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
          &:hover {
            border: 1px solid themed("color-fd7e14") !important;
          }
          font-size: 14px;
          font-family: HelveticaNeue;
          line-height: 24px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sold {
          pointer-events: none;
        }
      }
    }
  }
}
</style>
