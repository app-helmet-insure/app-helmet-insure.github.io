<template>
  <div class="my_claim">
    <div class="claim_title">
      <h3>{{ $t("Type.Claim") }}</h3>
    </div>
    <Loading v-if="isLoading" />
    <div class="claim_text" v-if="PolicyList && PolicyList.length">
      <span>{{ $t("Table.Type") }}</span>
      <span>{{ $t("Table.DenAssets") }}</span>
      <span>{{ $t("Table.BaseAssets") }}</span>
      <span></span>
    </div>
    <div
      class="my_claim_wrap"
      v-if="!isLoading && PolicyList && PolicyList.length"
    >
      <div
        class="claim_item"
        v-for="(item, index) in PolicyList.slice(MinNumber, MaxNumber)"
        :key="index"
      >
        <section class="claim_item_insure_web WEB">
          <span :class="item.type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.TypeCoin }}
            <i :class="item.type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section class="claim_item_call_web WEB">
          <span v-if="item.type == 'Call'">
            {{ fixD(precision.plus(item.col, item.claimBalance), 8) }}
            {{ item.collateral_symbol }}
          </span>
          <span v-else>
            {{ fixD(item.und, 8) }}
            {{ item.underlying_symbol }}
          </span>
        </section>
        <section class="claim_item_put_web WEB">
          <span v-if="item.type == 'Call'">
            {{ fixD(item.und, 8) }}
            {{ item.underlying_symbol }}
          </span>
          <span v-else>
            {{ fixD(precision.plus(item.col, item.claimBalance), 8) }}
            {{ item.collateral_symbol }}
          </span>
        </section>
        <section class="claim_item_action_web WEB">
          <button @click="toClaim(item)">{{ $t("Table.GetBack") }}</button>
        </section>
        <!-- ================= -->
        <section class="claim_item_insure_h5 H5">
          <span :class="item.type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.TypeCoin }}
            <i :class="item.type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section class="claim_item_type_h5 H5">
          <p>
            <span>{{ $t("Table.DenAssets") }}</span>
            <span v-if="item.type == 'call'">
              {{ fixD(precision.plus(item.col, item.claimBalance), 8) }}
              {{ item.collateral_symbol }}
            </span>
            <span v-else>
              {{ fixD(item.und, 8) }}
              {{ item.underlying_symbol }}
            </span>
          </p>
          <p>
            <span>{{ $t("Table.BaseAssets") }}</span>
            <span v-if="item.type == 'call'">
              {{ fixD(item.und, 8) }}
              {{ item.underlying_symbol }}
            </span>
            <span v-else>
              {{ fixD(precision.plus(item.col, item.claimBalance), 8) }}
              {{ item.collateral_symbol }}
            </span>
          </p>
        </section>
        <section class="claim_item_action_h5 H5">
          <button @click="toClaim(item)">{{ $t("Table.GetBack") }}</button>
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
import precision from "~/assets/js/precision.js";
import { fixD } from "~/assets/js/util.js";
import { getInsuranceList } from "~/interface/event.js";
import { BalanceOf, Settleable } from "~/interface/read_contract.js";
import FactoryABI from "../../abi/FactoryABI.json";
import { getContract } from "../../web3/index.js";
import WaitingConfirmationDialog from "~/components/dialogs/waiting-confirmation-dialog.vue";
import SuccessConfirmationDialog from "~/components/dialogs/success-confirmation-dialog.vue";
import NoData from "./no-data.vue";
import Loading from "./loading.vue";
const FactoryAddress = "0x021297e233550eDBa8e6487EB7c6696cFBB63b88";
import { getCurrentInsurance } from "~/config/insurance.js";
import { fromWei, toWei } from "../../web3/index.js";
export default {
  components: {
    WaitingConfirmationDialog,
    SuccessConfirmationDialog,
    NoData,
    Loading,
  },
  data() {
    return {
      precision,
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
    myAboutInfoSell() {
      return this.$store.state.myAboutInfoSell;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
  },
  mounted() {
    this.getList();
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
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.isLogin;
      }
    },
    getList() {
      getInsuranceList().then((res) => {
        let ReturnList = res.data.data.options;
        let FixList = [];
        this.isLoading = true;
        ReturnList.forEach(async (item) => {
          const CurrentInsurance = getCurrentInsurance({
            CollateralAddress: item.collateral,
            UnderlyingAddress: item.underlying,
          });
          if (CurrentInsurance) {
            let {
              Type,
              InsuranceName,
              CollateralDecimals,
              CollateralSymbol,
              UnderlyingSymbol,
              UnderlyingDecimals,
              SettleTokenDecimals,
            } = CurrentInsurance;
            // 结算
            let LongBalance = await BalanceOf(item.long, CollateralDecimals);
            let ShortBalance = await BalanceOf(item.short, CollateralDecimals);

            if (
              Number(fixD(ShortBalance, 8)) > 0 &&
              Number(fixD(LongBalance, 8)) > 0
            ) {
              FixList.push({
                collateral: item.collateral,
                collateral_symbol: CollateralSymbol,
                collateral_decimals: CollateralDecimals,
                underlying: item.collateral,
                underlying_symbol: UnderlyingSymbol,
                underlying_decimals: UnderlyingDecimals,
                expiry: item.expiry,
                long: item.long,
                short: item.short,
                type: Type,
                TypeCoin: InsuranceName,
                claimBalance:
                  Number(ShortBalance) > Number(LongBalance)
                    ? LongBalance
                    : ShortBalance,
                col: 0,
                fee: 0,
                und: 0,
              });
            }
            let ShortMinusLong =
              Number(ShortBalance) - Number(LongBalance) + "";
            if (Number(ShortMinusLong) > 0) {
              const SettleInfo = await Settleable(
                item.short,
                toWei(ShortMinusLong, CollateralDecimals)
              );
              FixList.push({
                collateral: item.collateral,
                collateral_symbol: CollateralSymbol,
                collateral_decimals: CollateralDecimals,
                underlying: item.collateral,
                underlying_symbol: UnderlyingSymbol,
                underlying_decimals: UnderlyingDecimals,
                expiry: item.expiry,
                long: item.long,
                short: item.short,
                type: Type,
                TypeCoin: InsuranceName,
                claimBalance: 0,
                col: fromWei(SettleInfo.col, CollateralDecimals),
                fee: fromWei(SettleInfo.fee, SettleTokenDecimals),
                und: fromWei(SettleInfo.und, UnderlyingDecimals),
              });
            }
            var newobj = {};
            var newArr = [];
            FixList.forEach((item) => {
              if (!newobj[item.collateral + item.underlying + item.short]) {
                newobj[item.collateral + item.underlying + item.short] = 1;
                newArr.push(item);
              }
            });
            this.PolicyList = newArr.filter(
              (newItem) =>
                fixD(newItem.und, 8) > 0 ||
                precision.plus(newItem.col, newItem.claimBalance) > 0
            );
            this.isLoading = false;
            return this.PolicyList;
          }
        });
      });
    },
    // 行权
    toClaim(item) {
      let data = item;
      console.log(data);
      let Contracts = getContract(FactoryABI, FactoryAddress);
      const Account = window.CURRENTADDRESS;
      if (data.claimBalance != 0) {
        Contracts.methods
          .burn(data.short, toWei(data.claimBalance, data.collateral_decimals))
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.getList();
            }
          })
          .on("error", function (error) {
            this.WaitingVisible = false;
            this.SuccessVisible = false;
          });
      } else {
        Contracts.methods
          .settle(data.short)
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.getList();
            }
          })
          .on("error", function (error) {
            this.WaitingVisible = false;
            this.SuccessVisible = false;
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
  padding: 20px 0;
}
@media screen and (min-width: 750px) {
  .my_claim_wrap {
    width: 100%;
  }
  .H5 {
    display: none;
  }
  .my_claim {
    position: relative;
    min-height: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .claim_title {
      width: 100%;
    }
    .claim_text {
      width: 100%;
      display: flex;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        @include themeify {
          color: darken($color: themed("color-17173a"), $amount: 50%);
        }
        line-height: 14px;
        margin-top: 16px;
        &:nth-of-type(1) {
          flex: 2;
        }
        &:nth-of-type(2) {
          flex: 2;
        }
        &:nth-of-type(3) {
          flex: 2;
        }
        &:nth-of-type(4) {
          flex: 1;
        }
      }
    }
    .claim_item {
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
      .claim_item_insure_web {
        flex: 2;
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
      .claim_item_call_web,
      .claim_item_put_web {
        flex: 2;
        span {
          font-size: 14px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 14px;
        }
      }
      .claim_item_action_web {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        button {
          padding: 0 20px;
          height: 32px;
          @include themeify {
            color: themed("black_button_text");
            background: themed("black_button");
          }
          border-radius: 3px;
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
@media screen and (max-width: 750px) {
  .WEB {
    display: none;
  }
  .my_claim_wrap {
    width: 100%;
  }
  .my_claim {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 10px;
    .claim_title {
      width: 100%;
      h3 {
        height: 44px;
        line-height: 55px;
        padding-left: 10px;
      }
    }
    .claim_text {
      display: none;
    }
    .claim_item {
      width: 100%;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      @include themeify {
        background: themed("color-ffffff");
      }
      box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
      border-radius: 5px;
      padding: 20px 16px;
      .claim_item_insure_h5 {
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
      .claim_item_type_h5 {
        display: flex;
        margin-top: 16px;
        p {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            @include themeify {
              color: darken($color: themed("color-17173a"), $amount: 50%);
            }
            line-height: 14px;
          }
          &:nth-of-type(2) {
            margin-top: 4px;
            font-size: 14px;
            font-family: IBMPlexSans-Bold, IBMPlexSans;
            font-weight: 500;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 14px;
          }
        }
      }
      .claim_item_action_h5 {
        width: 100%;
        margin-top: 16px;
        button {
          width: 100%;
          height: 40px;
          @include themeify {
            color: themed("black_button_text");
            background: themed("black_button");
          }
          border-radius: 3px;
          color: #fff;
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
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878;
  overflow: hidden;
}
</style>