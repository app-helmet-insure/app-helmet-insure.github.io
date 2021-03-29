<template>
  <div class="my_claim">
    <div class="claim_title">
      <h3>{{ $t('Table.Claim') }}</h3>
    </div>
    <div class="claim_text">
      <span>{{ $t('Table.Type') }}</span>
      <span>{{ $t('Table.DenAssets') }}</span>
      <span>{{ $t('Table.BaseAssets') }}</span>
      <span></span>
    </div>
    <div class="claim_item" v-for="(item, index) in showList" :key="index">
      <section>
        <span :class="item.type == 'Call' ? 'call_text' : 'put_text'">
          {{ item.TypeCoin }}
          <i :class="item.type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
        </span>
      </section>
      <section>
        <span v-if="item.type == 'call'">
          {{ fixD(precision.plus(item.col, item.longBalance), 8) }}
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
          {{ fixD(precision.plus(item.col, item.longBalance), 8) }}
          {{ item._collateral }}
        </span>
      </section>
      <section>
        <button @click="toClaim(item)">{{ $t('Table.GetBack') }}</button>
      </section>
    </div>
    <div class="loading" v-if="isLoading">
      <img src="~/assets/img/loading.png" />
      <div class="shadow"></div>
      <p>{{$t('Table.LoadingWallet')}}</p>
    </div>
    <section
      class="noData"
      v-if="(showList.length < 1 && !isLoading) || !isLogin"
    >
      <div>
        <img src="~/assets/img/helmet/nodata.png" alt="" />
        <p>{{ $t('Table.NoData') }}</p>
      </div>
    </section>
    <!-- <section class="pages" v-if="claimList.length > 10 && !isLogin">
      <Page
        :total="claimList.length"
        :limit="limit"
        :page="page + 1"
        @page-change="handleClickChagePage"
      />
    </section> -->
  </div>
</template>

<script>
import '~/assets/svg/iconfont.js'
import precision from '~/assets/js/precision.js'
import { fixD, addCommom, autoRounding, toRounding } from '~/assets/js/util.js'
import { getBalance } from '~/interface/order.js'
import {
  newGetSymbol,
  getWei,
  getTokenName,
} from '~/assets/utils/address-pool.js'
import { toWei, fromWei } from '~/assets/utils/web3-fun.js'
import { settleable, burn, settle } from '~/interface/factory.js'
import Page from '~/components/common/page.vue'
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
      getTokenName,
      fixD,
      page: 0,
      limit: 10,
      isLoading: true,
      isLogin: false,
    }
  },
  computed: {
    myAboutInfoSell() {
      return this.$store.state.myAboutInfoSell
    },
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  watch: {
    myAboutInfoSell: {
      handler: 'myAboutInfoSellWatch',
      immediate: true,
    },
    userInfo: {
      handler: 'userInfoWatch',
      immediate: true,
    },
  },

  methods: {
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin
      }
    },
    myAboutInfoSellWatch(newValue) {
      if (newValue) {
        this.page = 0
        this.limit = 10
        this.setSettlementList(newValue)
      }
    },
    // 倒计时
    async setSettlementList(list) {
      this.isLoading = true
      this.showList = []
      const result = []
      let mapArray = []
      let obj = {}
      let item,
        longBalance,
        shortBalance,
        _collateral,
        _underlying,
        number,
        volume,
        id,
        und
      for (let i = 0; i < list.length; i++) {
        item = list[i]
        _collateral = getTokenName(item.longInfo._collateral, window.chainID)
        longBalance = await getBalance(item.longInfo.long, _collateral)
        _underlying = getTokenName(item.longInfo._underlying, window.chainID)
        shortBalance = await getBalance(item.longInfo.short, _collateral)
        let Token = _underlying == 'WBNB' ? _underlying : _collateral
        if (_underlying == 'WBNB') {
          item.TypeCoin = _collateral
          item.type = 'Call'
        } else {
          item.TypeCoin = _underlying
          item.type = 'Put'
        }
        if (_underlying == 'BUSD' && _collateral == 'WBNB') {
          item.TypeCoin = _collateral
          item.type = 'Call'
        }
        if (_collateral == 'BUSD' && _underlying == 'WBNB') {
          item.TypeCoin = _underlying
          item.type = 'Put'
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
          })
        }
        number = precision.minus(shortBalance, longBalance)
        if (Number(number) > 0) {
          try {
            volume = toWei(number, _collateral)
            const settle = await settleable(item.longInfo.short, volume)

            if (settle.col !== '0' || settle.und !== '0') {
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
              })
            }
          } catch (err) {
            console.log('setSettlementList##err###', err)
          }
        }
      }
      var newobj = {}
      var newArr = []
      result.forEach((item) => {
        if (!newobj[item._collateral + item._underlying + item.short]) {
          newobj[item._collateral + item._underlying + item.short] = 1
          newArr.push(item)
        }
      })
      this.isLoading = false
      this.claimList = newArr
      this.showList = newArr
      // this.showList = newArr.slice(this.page * this.limit, this.limit);
    },
    getDownTime(time) {
      let now = new Date() * 1
      let dueDate = time * 1000
      dueDate = new Date(dueDate)
      let DonwTime = dueDate - now
      let day = Math.floor(DonwTime / (24 * 3600000))
      let hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000)
      let minute = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
      )
      let second = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      )
      let template = `${day}天${hour}时${minute}分${second}秒`
      return template
    },
    // 行权
    toClaim(item) {
      if (item.longBalance != 0) {
        burn(
          item.short,
          item.longBalance,
          { _collateral: item._collateral },
          item
        )
      } else {
        settle(item.short, item)
      }
    },
    handleClickChagePage(index) {
      index = index - 1
      this.page = index
      let page = index
      let list = this.claimList.slice(
        this.page * this.limit,
        (page + 1) * this.limit
      )
      this.showList = list
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/base.scss';
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
        content: '';
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
        content: '';
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
    min-height: 800px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .loading {
      width: 100%;
    }
    .pages {
      width: 100%;
    }
    .claim_title {
      width: 100%;
    }
    .claim_text {
      width: 100%;
      display: flex;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(23, 23, 58, 0.5);
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
      background: #ffffff;
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
              background-image: url('../../assets/img/helmet/tablecall.png');
            }
            .put_icon {
              background-image: url('../../assets/img/helmet/tableput.png');
            }
          }
          > .call_text {
            color: #00b900;
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
            color: #17173a;
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
            background: #17173a;
            border-radius: 3px;
            color: #fff;
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
            background-image: url('../../assets/img/helmet/tablecall.png');
          }
          .put_icon {
            background-image: url('../../assets/img/helmet/tableput.png');
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
