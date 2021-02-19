<template>
  <div class="my_claim">
    <table>
      <thead>
        <tr>
          <td>{{ $t("Table.Type") }}</td>
          <td>{{ $t("Table.DenAssets") }}</td>
          <td>{{ $t("Table.BaseAssets") }}</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in showList"
          :key="index"
          :class="
            getTokenName(item._underlying) == 'WBNB'
              ? 'call_style'
              : 'put_style'
          "
        >
          <template>
            <td :class="item.type == 'call' ? 'green' : 'orange'">
              {{ item.TypeCoin }}
              <i :class="item.type == 'call' ? 'call_icon' : 'put_icon'"></i>
            </td>
            <td v-if="item.type == 'call'">
              {{ fixD(precision.plus(item.col, item.longBalance), 8) }}
              {{ item._collateral }}
            </td>
            <td v-else>
              {{ fixD(item.und, 8) }}
              {{ item._underlying }}
            </td>
            <td v-if="item.type == 'call'">
              {{ fixD(item.und, 8) }}
              {{ item._underlying }}
            </td>
            <td v-else>
              {{ fixD(precision.plus(item.col, item.longBalance), 8) }}
              {{ item._collateral }}
            </td>
            <td class="option">
              <button class="b_b_button" @click="toClaim(item)">
                {{ $t("Table.GetBack") }}
              </button>
            </td>
          </template>
        </tr>
      </tbody>
      <div class="loading" v-if="isLoading">
        <img src="~/assets/img/loading.gif" />
      </div>
    </table>

    <div>
      <div
        v-for="(item, index) in showList"
        :key="index"
        :class="
          getTokenName(item._underlying) == 'WBNB'
            ? 'call_style item_box'
            : 'put_style item_box'
        "
      >
        <div>
          <p>
            <span>{{ $t("Table.Type") }}</span
            ><span :class="item.type == 'call' ? 'green' : 'orange'">
              {{
                item._underlying == "WBNB" ? item._collateral : item._underlying
              }}
              <i :class="item.type == 'call' ? 'call_icon' : 'put_icon'"></i
            ></span>
          </p>
        </div>
        <div>
          <p>
            <span>{{ $t("Table.DenAssets") }}</span>
            <span v-if="item.type == 'call'">
              {{ fixD(precision.plus(item.col, item.longBalance), 8) }}
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
              {{ fixD(item.und, 8) }} {{ item._underlying }}
            </span>
            <span v-else>
              {{ fixD(precision.plus(item.col, item.longBalance), 8) }}
              {{ item._collateral }}
            </span>
          </p>
        </div>
        <section>
          <button class="b_b_button" @click="toClaim(item)">
            {{ $t("Table.GetBack") }}
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
    <section class="pages" v-if="claimList.length > 5">
      <div>
        <p @click="upPage">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-left"></use>
          </svg>
        </p>
        <span
          class="page_item"
          v-for="(item, index) in Math.ceil(claimList.length / 5)"
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
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import { getBalance } from "~/interface/order.js";
import {
  newGetSymbol,
  getWei,
  getTokenName,
} from "~/assets/utils/address-pool.js";
import { toWei, fromWei } from "~/assets/utils/web3-fun.js";
import { settleable, burn, settle } from "~/interface/factory.js";
export default {
  data() {
    return {
      precision,
      addCommom: addCommom,
      autoRounding: autoRounding,
      toRounding: toRounding,
      showList: [],
      claimList: [],
      getTokenName,
      fixD,
      page: 0,
      limit: 8,
      isLoading: true,
    };
  },
  computed: {
    myAboutInfoSell() {
      return this.$store.state.myAboutInfoSell;
    },
  },
  watch: {
    myAboutInfoSell: {
      handler: "myAboutInfoSellWatch",
      immediate: true,
    },
  },

  methods: {
    myAboutInfoSellWatch(newValue) {
      if (newValue) {
        this.page = 0;
        this.limit = 5;
        this.setSettlementList(newValue);
      }
    },
    // 倒计时
    async setSettlementList(list) {
      this.isLoading = true;
      this.showList = [];
      const result = [];
      let mapArray = [];
      let obj = {};
      let item,
        longBalance,
        shortBalance,
        _collateral,
        _underlying,
        number,
        volume,
        id,
        und;
      for (let i = 0; i < list.length; i++) {
        item = list[i];
        _collateral = getTokenName(item.longInfo._collateral, window.chainID);
        longBalance = await getBalance(item.longInfo.long, _collateral);
        _underlying = getTokenName(item.longInfo._underlying, window.chainID);
        shortBalance = await getBalance(item.longInfo.short, _collateral);
        let Token = _underlying == "WBNB" ? _underlying : _collateral;
        if (_underlying == "WBNB") {
          item.TypeCoin = _collateral;
          item.type = "call";
        } else {
          item.TypeCoin = _underlying;
          item.type = "put";
        }
        if (_underlying == "BUSD" && _collateral == "WBNB") {
          item.TypeCoin = _collateral;
          item.type = "call";
        }
        if (_collateral == "BUSD" && _underlying == "WBNB") {
          item.TypeCoin = _underlying;
          item.type = "put";
        }
        if (Number(shortBalance) > 0 && Number(longBalance) > 0) {
          result.push({
            creator: item.seller,
            _collateral,
            _underlying,
            col: 0,
            fee: 0,
            und: 0,
            long: item.longInfo.long,
            short: item.longInfo.short,
            longBalance:
              Number(shortBalance) > Number(longBalance)
                ? longBalance
                : shortBalance,
            type: item.type,
            TypeCoin: item.TypeCoin,
          });
        }
        number = precision.minus(shortBalance, longBalance);
        if (Number(number) > 0) {
          try {
            volume = toWei(number, _collateral);
            const settle = await settleable(item.longInfo.short, volume);

            if (settle.col !== "0" || settle.und !== "0") {
              result.push({
                creator: item.seller,
                _collateral,
                _underlying,
                col: fromWei(settle.col, _collateral),
                fee: fromWei(settle.fee, _collateral),
                und: fromWei(settle.und, _collateral),
                long: item.longInfo.long,
                short: item.longInfo.short,
                // longBalance: Number(longBalance) > 0 ? String(number) : 0,
                longBalance: 0,
                type: item.type,
                TypeCoin: item.TypeCoin,
              });
            }
          } catch (err) {
            console.log("setSettlementList##err###", err);
          }
        }
      }
      var newobj = {};
      var newArr = [];
      result.forEach((item) => {
        if (!newobj[item._collateral + item._underlying + item.short]) {
          newobj[item._collateral + item._underlying + item.short] = 1;
          newArr.push(item);
        }
      });
      this.isLoading = false;
      this.claimList = newArr;
      this.showList = newArr.slice(this.page * this.limit, this.limit);
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
      if (item.longBalance != 0) {
        burn(
          item.short,
          item.longBalance,
          { _collateral: item._collateral },
          item
        );
      } else {
        settle(item.short, item);
      }
    },
    handleClickChagePage(index) {
      this.page = index;
      let page = index;
      let list = this.claimList.slice(
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
      let list = this.claimList.slice(
        this.page * this.limit,
        page * this.limit
      );
      this.showList = list;
    },
    downPage() {
      if (Math.ceil(this.claimList.length / this.limit) <= this.page + 1) {
        return;
      }
      let page = this.page + 1;
      this.page = page;
      let list = this.claimList.slice(
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
.green {
  color: #00b900 !important;
}
.orange {
  color: #ff6400 !important;
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
@media screen and (min-width: 750px) {
  .my_claim {
    position: relative;
    > div {
      display: none;
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
        width: 100px;
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

          td:last-child {
            transform: translateX(20px);
          }
          .option {
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .my_claim {
    table {
      display: none;
    }
    > div {
      .item_box {
        margin-top: 20px;
        width: 100%;
        height: 208px;
        padding: 20px 10px;
        // background: #f7f7fa;
        p {
          display: flex;
          span:nth-of-type(1) {
            font-size: 12px;
            color: #919aa6;
          }
          span:nth-of-type(2) {
            font-weight: bold;
            color: #121212;
          }
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
          display: flex;
          justify-content: space-between;
          span {
            display: flex;
            align-items: center;
          }
          button {
            width: 100% !important;
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