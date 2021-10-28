<template>
  <div class="my_policy">
    <div class="policy_title">
      <h3>{{ $t("Type.MyGuarantee") }}</h3>
    </div>
    <Loading v-if="isLoading" :isLoading="isLoading" />
    <div
      class="my_policy_wrap"
      v-if="!isLoading && PolicyList && PolicyList.length"
    >
      <div
        class="policy_item"
        v-for="item in PolicyList.slice(MinNumber, MaxNumber)"
        :key="item.BidID"
      >
        <section class="policy_item_id_web WEB">
          <p>
            <span>{{ $t("Table.ID") }}:{{ item.BidID }}</span>
            <span>{{ item.ShowExpiry }}</span>
          </p>
          <span :class="item.Type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.CallToken }} {{ item.Type }} {{ item.ShowStrikePrice }}
            {{ item.PutToken }}
            {{ item.symbol ? "(" + item.symbol + ")" : "" }}
            <i :class="item.Type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section class="policy_item_strikeprice_web WEB">
          <p>
            <span>{{ $t("Insurance.Insurance_text11") }}: </span>
            <span>{{ item.ShowStrikePrice }} {{ item.PutToken }}</span>
          </p>
          <p>
            <span>{{ $t("Table.Position") }}: </span>
            <span>{{ fixD(item.ShowVolume, 8) }}</span>
          </p>
        </section>
        <section class="policy_item_price_web WEB">
          <p>
            <span>{{ $t("Table.PolicyPrice") }}: </span>
            <span>{{ fixD(item.ShowPrice, 8) }} HELMET</span>
          </p>
          <p>
            <span>{{ $t("Table.Premium") }}: </span>
            <span>{{ fixD(item.Premium, 8) }} HELMET</span>
          </p>
        </section>
        <section class="policy_item_action_web WEB">
          <!-- <button @click="toActive(item)">
            {{
              item.Status == "Expired"
                ? $t("Insurance.Insurance_text13")
                : $t("Table.outSure")
            }}
            <i class="selectDown"></i>
          </button> -->
          <button v-if="item.Status == 'Normal'" @click="toActive(item)">
            {{ $t("Table.outSure") }}
          </button>
          <button v-if="item.Status == 'Expired'">
            {{ $t("Insurance.Insurance_text13") }}
          </button>
        </section>
        <!-- ================= -->
        <section class="policy_item_id_h5 H5">
          <p>
            <span>{{ $t("Table.ID") }}:{{ item.AskID }}</span>
            <span>{{ item.ShowExpiry }}</span>
          </p>
        </section>
        <section class="policy_item_type_h5 H5">
          <span :class="item.Type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.CallToken }} {{ item.Type }} {{ item.ShowStrikePrice }}
            {{ item.PutToken }}
            {{ item.symbol ? "(" + item.symbol + ")" : "" }}
            <i :class="item.Type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section class="policy_item_price_h5 H5">
          <p>
            <span>{{ $t("Insurance.Insurance_text11") }}: </span>
            <span>{{ item.ShowStrikePrice }} {{ item.PutToken }}</span>
          </p>
          <p>
            <span>{{ $t("Table.PolicyPrice") }}: </span>
            <span>{{ fixD(item.ShowPrice, 8) }} HELMET</span>
          </p>
        </section>
        <section class="policy_item_volume_h5 H5">
          <p>
            <span>{{ $t("Table.Position") }}: </span>
            <span>{{ fixD(item.ShowVolume, 8) }}</span>
          </p>
          <p>
            <span>{{ $t("Table.Premium") }}: </span>
            <span>{{ item.Premium }} HELMET</span>
          </p>
        </section>
        <section class="policy_item_action_h5 H5">
          <!-- <button @click="toActive(item)">
            {{
              item.Status == "Expired"
                ? $t("Insurance.Insurance_text13")
                : $t("Table.outSure")
            }}
          </button> -->
          <button v-if="item.Status == 'Normal'" @click="toActive(item)">
            {{ $t("Table.outSure") }}
          </button>
          <button v-if="item.Status == 'Expired'">
            {{ $t("Insurance.Insurance_text13") }}
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
        <p v-html="WaitingText"></p>
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
import { onExercise } from "~/interface/order.js";
import { getBalance } from "~/interface/deposite";
import { getInsuranceList } from "~/interface/event.js";
import moment from "moment";
import NoData from "./no-data.vue";
import Loading from "./loading.vue";
import { fromWei } from "~/web3/index.js";
import { getCurrentInsurance } from "~/config/insurance.js";
import BigNumber from "bignumber.js";
import OrderABI from "~/web3/abis/OrderABI.json";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import { getContract, TokenBalance, toWei } from "../../web3/index.js";
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
    getBindItem(bidID) {
      const BidContracts = getContract(OrderABI, OrderAddress);
      return BidContracts.methods.bids(bidID).call();
    },
    getPolicysList() {
      getInsuranceList().then((res) => {
        let nowDate = parseInt(moment.now() / 1000);
        if (res && res.data.data.options) {
          let Account = this.CurrentAccount.account;
          const ReturnList = res.data.data.options;
          const AskAssign = [];
          const BidAssign = [];
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
                CallToken,
                PutToken,
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
              ResultItem.Status =
                item.expiry * 1 > nowDate ? "Normal" : "Expired";
              ResultItem.Sort = ResultItem.Status == "Normal" ? 1 : 2;
              item.asks.filter((itemAsk) => {
                const ResultItemAsk = {
                  Binds: itemAsk.binds,
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
                };
                const AllItem = Object.assign(ResultItemAsk, ResultItem);
                AskAssign.push(AllItem);
              });
            }
          });
          AskAssign.forEach((itemAsks) => {
            const CurrentInsurance = getCurrentInsurance({
              CollateralAddress: itemAsks.CollateralAddress,
              UnderlyingAddress: itemAsks.UnderlyingAddress,
            });

            let { StrikePriceDecimals, CollateralDecimals, LastPriceDecimals } =
              CurrentInsurance;
            if (itemAsks.Binds.length) {
              itemAsks.Binds.forEach((itemBid) => {
                if (
                  Account &&
                  itemBid.buyer.toUpperCase() === Account.toUpperCase()
                ) {
                  const ResultItemBid = {
                    BidID: itemBid.bidID,
                    Volume: itemAsks.volume,
                    ShowVolume: fromWei(itemBid.volume, CollateralDecimals),
                    Premium: new BigNumber(
                      (
                        itemAsks.ShowPrice *
                        fromWei(itemBid.volume, CollateralDecimals)
                      ).toFixed(8)
                    ).toString(),
                  };
                  const ReturnItem = Object.assign(ResultItemBid, itemAsks);
                  if (ReturnItem.Type === "Put") {
                    ReturnItem.ShowVolume = Number(
                      ReturnItem.ShowVolume /
                        (1 / fromWei(itemAsks.StrikePrice, StrikePriceDecimals))
                    ).toFixed(8);
                    ReturnItem.ShowStrikePrice = Number(
                      1 / fromWei(itemAsks.StrikePrice, StrikePriceDecimals)
                    ).toFixed(LastPriceDecimals);
                  } else {
                    ReturnItem.ShowStrikePrice = fromWei(
                      itemAsks.StrikePrice,
                      StrikePriceDecimals
                    );
                    ReturnItem.ShowVolume = Number(
                      ReturnItem.ShowVolume
                    ).toFixed(8);
                  }

                  BidAssign.push(ReturnItem);
                }
              });
            }
          });
          if (
            FilterList.length === 0 ||
            AskAssign.length === 0 ||
            BidAssign.length === 0
          ) {
            this.isLoading = false;
          }
          Promise.all(
            BidAssign.map((itemBids) => this.getBindItem(itemBids.BidID))
          ).then((BidAssignList) => {
            let returnList = BidAssign.map((list, index) => {
              list.remain = BidAssignList[index].remain;
              return list;
            });
            returnList = returnList.filter((filter) => filter.remain !== "0");
            this.$nextTick(async () => {
              const BNB1000policy = await this.BNB1000policy();
              returnList.unshift(BNB1000policy);
            });
            returnList = returnList.sort(
              (a, b) => Number(b.BidID) - Number(a.BidID)
            );
            this.PolicyList = returnList;
            this.isLoading = false;
          });
        }
      });
    },
    getLongApporve(data) {
      let Account = this.CurrentAccount.account;
      const Erc20ContractsLong = getContract(ERC20ABI.abi, data.Long);
      return Erc20ContractsLong.methods
        .allowance(Account, OrderAddress)
        .call()
        .then((res) => {
          if (Number(res) > 0) {
            return true;
          }
          return false;
        });
    },
    getUnderlyingApprove(data) {
      let Account = this.CurrentAccount.account;
      const Erc20ContractsLong = getContract(
        ERC20ABI.abi,
        data.UnderlyingAddress
      );
      return Erc20ContractsLong.methods
        .allowance(Account, OrderAddress)
        .call()
        .then((res) => {
          if (Number(res) > 0) {
            return true;
          }
          return false;
        });
    },
    actionApproveUnderlying(data) {
      this.SuccessVisible = false;
      const Erc20Contracts = getContract(ERC20ABI.abi, data.UnderlyingAddress);
      const Infinitys =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      let Account = this.CurrentAccount.account;
      Erc20Contracts.methods
        .approve(OrderAddress, Infinitys)
        .send({ from: Account })
        .on("transactionHash", (hash) => {
          this.WaitingVisible = true;
          this.WaitingText = `You will approve <b>${data.UnderlyingSymbol}</b> to <b>Helmet</b>`;
        })
        .on("receipt", (receipt) => {
          if (!this.SuccessVisible) {
            this.WaitingVisible = false;
            this.SuccessVisible = true;
            this.SuccessHash = receipt.transactionHash;
            this.WaitingText = "";
            this.actionWithDraw(data);
          }
        })
        .on("error", (ereor) => {
          this.WaitingVisible = false;
        });
    },
    actionApproveLong(data, approveFlag) {
      const Erc20Contracts = getContract(ERC20ABI.abi, data.Long);
      const Infinitys =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      let Account = this.CurrentAccount.account;
      Erc20Contracts.methods
        .approve(OrderAddress, Infinitys)
        .send({ from: Account })
        .on("transactionHash", (hash) => {
          this.WaitingVisible = true;
          this.WaitingText = `You will approve <b>LONG</b> to <b>Helmet</b>`;
        })
        .on("receipt", (receipt) => {
          if (!this.SuccessVisible) {
            this.WaitingVisible = false;
            this.SuccessVisible = true;
            this.SuccessHash = receipt.transactionHash;
            this.WaitingText = "";
            if (approveFlag) {
              this.actionWithDraw(data);
            } else {
              this.actionApproveUnderlying(data);
            }
          }
        })
        .on("error", (ereor) => {
          this.WaitingVisible = false;
          this.WaitingText = "";
        });
    },
    async toActive(data) {
      let LongApproveStatus = await this.getLongApporve(data);
      let UnderlyingApproveStatus = await this.getUnderlyingApprove(data);
      if (!LongApproveStatus && !UnderlyingApproveStatus) {
        this.actionApproveLong(data);
        return;
      }
      if (!LongApproveStatus && UnderlyingApproveStatus) {
        this.actionApproveLong(data, true);
        return;
      }
      if (!UnderlyingApproveStatus && LongApproveStatus) {
        this.actionApproveUnderlying(data);
        return;
      }
      if (LongApproveStatus && UnderlyingApproveStatus) {
        this.actionWithDraw(data);
        return;
      }
    },
    actionWithDraw(data) {
      console.log(data);
      let Account = this.CurrentAccount.account;
      let Contracts = getContract(OrderABI, OrderAddress);
      const Params = data.Transfer ? data.Volume : data.BidID;
      Contracts.methods
        .exercise(Params)
        .send({ from: Account })
        .on("transactionHash", (hash) => {
          this.WaitingVisible = true;
          // this.WaitingText = `<p>You will approve <b>LONG</b> to <b>Helmet.insure</b></p>`;
        })
        .on("receipt", (receipt) => {
          if (!this.SuccessVisible) {
            this.SuccessHash = receipt.transactionHash;
            this.WaitingVisible = false;
            this.SuccessVisible = true;
            this.WaitingText = "";
            this.getPolicysList();
          }
        })
        .on("error", (error) => {
          this.WaitingVisible = false;
          this.SuccessVisible = false;
          this.WaitingText = "";
        });
    },
    async BNB1000policy() {
      let Account = this.CurrentAccount.account;
      let Volume = await TokenBalance(
        "0x7aae192b83589784851a7df13c225fda2e3d87c5",
        13
      );
      let nowDate = parseInt(moment.now() / 1000);
      if (Volume != 0) {
        let resultItem;
        resultItem = {
          BidID: 24,
          Type: "Call",
          Expiry: "1640966400",
          ShowExpiry: moment(new Date(1640966400 * 1000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          Long: "0x7aae192b83589784851a7df13c225fda2e3d87c5",
          Short: "",
          StrikePrice: "1000000000000000000000",
          ShowStrikePrice: "1000",
          CollateralAddress: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          CollateralSymbol: "BNB",
          CollateralDecimals: 18,
          UnderlyingAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          UnderlyingSymbol: "BUSD",
          UnderlyingDecimals: 18,
          CallToken: "BNB",
          PutToken: "BUSD",
          Status: 1640966400 > nowDate ? "Normal" : "Expired",
          Volume: toWei(Volume, 13),
          ShowVolume: Volume,
          ShowPrice: "Airdrop",
          Premium: "Airdrop",
          Transfer: true,
          Sort: 1640966400 > nowDate ? 1 : 2,
        };
        return resultItem;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/themes.scss";
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878;
  overflow: hidden;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
@media screen and (min-width: 750px) {
  .H5 {
    display: none;
  }
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
    .my_policy_wrap {
      width: 100%;
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
      .policy_item_id_web {
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
      .policy_item_strikeprice_web {
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
      .policy_item_price_web {
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
      .policy_item_action_web {
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
@media screen and (max-width: 750px) {
  .WEB {
    display: none;
  }
  .my_policy {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 10px;

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
    .my_policy_wrap {
      width: 100%;
    }
    .policy_item {
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
      .policy_item_id_h5 {
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
      .policy_item_type_h5 {
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
      .policy_item_price_h5 {
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
      .policy_item_volume_h5 {
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
      .policy_item_action_h5 {
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
</style>
