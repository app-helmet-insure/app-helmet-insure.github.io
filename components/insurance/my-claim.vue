<template>
  <div class="my_claim">
    <div class="claim_title">
      <h3>{{ $t("Type.Claim") }}</h3>
    </div>
    <div class="claim_text" v-if="showList.length">
      <span>{{ $t("Table.Type") }}</span>
      <span>{{ $t("Table.DenAssets") }}</span>
      <span>{{ $t("Table.BaseAssets") }}</span>
      <span></span>
    </div>
    <template v-if="isLogin">
      <div
        class="claim_item"
        v-for="(item, index) in showList"
        :key="index + 'key'"
      >
        <section>
          <span :class="item.type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.TypeCoin }}
            <i :class="item.type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section>
          <span v-if="item.type == 'call'">
            {{ fixD(precision.plus(item.col, item.claimBalance), 8) }}
            {{ item._collateral }}
          </span>
          <span v-else>
            {{ fixD(item.und, 8) }}
            {{ item._underlying }}
          </span>
        </section>
        <section>
          <span v-if="item.type == 'call'">
            {{ fixD(item.und, 8) }}
            {{ item._underlying }}
          </span>
          <span v-else>
            {{ fixD(precision.plus(item.col, item.claimBalance), 8) }}
            {{ item._collateral }}
          </span>
        </section>
        <section>
          <button @click="toClaim(item)">{{ $t("Table.GetBack") }}</button>
        </section>
      </div>
    </template>
    <template>
      <div
        class="claim_item_H5"
        v-for="(item, index) in showList"
        :key="index + '1'"
      >
        <section>
          <span :class="item.type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.TypeCoin }}
            <i :class="item.type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section>
          <p>
            <span>{{ $t("Table.DenAssets") }}</span>
            <span v-if="item.type == 'call'">
              {{ fixD(precision.plus(item.col, item.claimBalance), 8) }}
              {{ item._collateral }}
            </span>
            <span v-else>
              {{ fixD(item.und, 8) }}
              {{ item._underlying }}
            </span>
          </p>
          <p>
            <span>{{ $t("Table.BaseAssets") }}</span>
            <span v-if="item.type == 'call'">
              {{ fixD(item.und, 8) }}
              {{ item._underlying }}
            </span>
            <span v-else>
              {{ fixD(precision.plus(item.col, item.claimBalance), 8) }}
              {{ item._collateral }}
            </span>
          </p>
        </section>
        <section>
          <button @click="toClaim(item)">{{ $t("Table.GetBack") }}</button>
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
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import { getInsuranceList } from "~/interface/event.js";
import {
  TokenDecimals,
  DecimalsFormWei,
  DecimalsToWei,
} from "~/interface/common_contract.js";
import { BalanceOf, Settleable } from "~/interface/read_contract.js";
import { getTokenName } from "~/assets/utils/address-pool.js";
import { settleable, burn, settle } from "~/interface/factory.js";
import Page from "~/components/common/page.vue";
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
      claimList: [],
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
    FilterList: {
      handler: "fliterListWatch",
      immediate: true,
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    fliterListWatch(newValue) {
      if (newValue) {
        this.page = 0;
        this.limit = 10;
        let list = newValue;
        this.showList = list.slice(0, this.limit);
      }
    },
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin;
      }
    },
    getList() {
      getInsuranceList().then((res) => {
        let ReturnList = res.data.data.options;
        let FixList = [];
        this.isLoading = true;
        ReturnList.forEach(async (item) => {
          // 标的
          let UnderlyingDecimals = TokenDecimals(item.underlying);
          let UnderlyingSymbol = getTokenName(item.underlying);
          // 抵押
          let CollateralDecimals = TokenDecimals(item.collateral);
          let CollateralSymbol = getTokenName(item.collateral);
          // 结算
          let LongBalance = await BalanceOf(item.long, CollateralDecimals);
          let ShortBalance = await BalanceOf(item.short, CollateralDecimals);
          if (UnderlyingSymbol == "WBNB") {
            item.TypeCoin = CollateralSymbol;
            item.type = "Call";
          } else {
            item.TypeCoin = UnderlyingSymbol;
            item.type = "Put";
          }
          if (UnderlyingSymbol == "BUSD" && CollateralSymbol == "WBNB") {
            item.TypeCoin = CollateralSymbol;
            item.type = "Call";
          }
          if (CollateralSymbol == "BUSD" && UnderlyingSymbol == "WBNB") {
            item.TypeCoin = UnderlyingSymbol;
            item.type = "Put";
          }
          if (Number(ShortBalance) > 0 && Number(LongBalance) > 0) {
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
              type: item.type,
              TypeCoin: item.TypeCoin,
              claimBalance:
                Number(ShortBalance) > Number(LongBalance)
                  ? LongBalance
                  : ShortBalance,
              col: 0,
              fee: 0,
              und: 0,
            });
          }
          let ShortMinusLong = precision.minus(ShortBalance, LongBalance) + "";
          if (Number(ShortMinusLong) > 0) {
            try {
              let ShortMinusLongVolume = DecimalsToWei(
                ShortMinusLong,
                CollateralDecimals
              );
              const SettleInfo = await Settleable(
                item.short,
                ShortMinusLongVolume
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
                type: item.type,
                TypeCoin: item.TypeCoin,
                claimBalance: 0,
                col: DecimalsFormWei(SettleInfo.col, CollateralDecimals),
                fee: DecimalsFormWei(SettleInfo.fee, CollateralDecimals),
                und: DecimalsFormWei(SettleInfo.und, CollateralDecimals),
              });
            } catch (error) {
              console.log(error);
            }
            var newobj = {};
            var newArr = [];
            FixList.forEach((item) => {
              if (!newobj[item.collateral + item.underlying + item.short]) {
                newobj[item.collateral + item.underlying + item.short] = 1;
                newArr.push(item);
              }
            });
            FixList = newArr;
            this.FilterList = FixList;
            this.isLoading = false;
            console.log(FixList);
          }
        });
      });
    },
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
      let template = `${day}天${hour}时${minute}分${second}秒`;
      return template;
    },
    // 行权
    toClaim(item) {
      let object = {
        title: "WARNING",
        layout: "layout1",
        activeTip: true,
        activeTipText1: "Please double check the price above，",
        activeTipText2: "Helmet team will not cover your loss on this.",
        loading: false,
        button: true,
        buttonText: "Confirm",
        showDialog: true,
      };
      let data = item;
      if (data.claimBalance != 0) {
        object.conText = `<p>Settlement ${addCommom(data.claimBalance)} ${
          data.collateral_symbol
        }</p>`;
        this.$bus.$emit("OPEN_STATUS_DIALOG", object);
        this.$bus.$on("PROCESS_ACTION", (res) => {
          if (res) {
            burn(
              data.short,
              data.longBalance,
              { _collateral: data.collateral_symbol },
              data
            );
          }
          data = {};
        });
      } else {
        let colValue = addCommom(
          Number(data.col) + Number(data.claimBalance),
          8
        );
        let undValue = addCommom(data.und, 8);
        if (colValue && undValue) {
          object.conText = `<p>Settlement <span>${
            colValue + data.collateral_symbol
          } ${"And" + undValue + data.underlying_symbol}</span></p>`;
        } else if (!colValue && undValue) {
          object.conText = `<p>Settlement <span>${
            undValue + " " + data.underlying_symbol
          }</span></p>`;
        } else {
          object.conText = `<p>Settlement <span>${
            colValue + " " + data.collateral_symbol
          }</span></p>`;
        }

        this.$bus.$emit("OPEN_STATUS_DIALOG", object);
        this.$bus.$on("PROCESS_ACTION", (res) => {
          if (res) {
            settle(data.short, data);
          }
          data = {};
        });
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
@media screen and (min-width: 750px) {
  .my_claim {
    position: relative;
    min-height: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .claim_item_H5 {
      display: none;
    }
    .loading {
      width: 100%;
      margin: auto 0;
    }
    .pages {
      width: 100%;
    }
    .claim_title {
      width: 100%;
      @include themeify {
        color: themed("color-17173a");
      }
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
      section {
        &:nth-of-type(1) {
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
        &:nth-of-type(2),
        &:nth-of-type(3) {
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
        &:nth-of-type(4) {
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
}
@media screen and (max-width: 750px) {
  .my_claim {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 10px;
    .claim_item {
      display: none;
    }
    .loading {
      width: 100%;
      margin: auto 0;
    }
    .pages {
      width: 100%;
    }
    .claim_title {
      width: 100%;
      h3 {
        height: 44px;
        line-height: 55px;
        padding-left: 10px;
        @include themeify {
          color: themed("color-17173a");
        }
      }
    }
    .claim_text {
      display: none;
    }
    .claim_item_H5 {
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
      section {
        &:nth-of-type(1) {
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
        &:nth-of-type(3) {
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
}
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878;
  overflow: hidden;
}
</style>
