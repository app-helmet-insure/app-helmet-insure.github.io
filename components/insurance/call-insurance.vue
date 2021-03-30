<template>
  <div class="put-insurance">
    <InsuranceTitle
      :activeInsurance="activeInsurance"
      :activeType="'CALL'"
    ></InsuranceTitle>
    <div class="insurance_list" v-if="isLogin">
      <table>
        <thead>
          <tr>
            <td>{{ $t('Table.ID') }}</td>
            <td>{{ $t('Table.Rent') }}</td>
            <td>{{ $t('Table.Amount') }}({{ $t('Table.Cont') }})</td>
            <td>
              {{ $t('Table.Tips', { type: activeInsurance }) }}
            </td>
            <td class="option">{{ $t('Table.Options') }}</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in showList"
            :key="index"
            v-if="item.price.length < 10"
          >
            <td>
              {{ item.showID }}
              <i
                class="copy"
                id="copy"
                @click="copyAdress($event, item.seller)"
              ></i>
            </td>
            <td>{{ item.price }}</td>
            <td>{{ item.remain }}</td>
            <td>
              <input
                type="text"
                name=""
                v-model="item.buyNum"
                :max="item.remain"
                :maxlength="8"
                :placeholder="$t('Table.NumberSubscriptions')"
              />
            </td>
            <td
              class="option"
              :style="
                item.status == 'dated' || item.remain == 0
                  ? 'visibility: hidden;'
                  : ''
              "
            >
              <button @click="handleClickBuy(item)">
                {{ $t('Table.Subscribe') }}
              </button>
            </td>
          </tr>
        </tbody>
        <div class="loading" v-if="isLoading && isLogin">
          <img src="~/assets/img/loading.png" />
          <div class="shadow"></div>
          <p>{{ $t('Table.LoadingWallet') }}</p>
        </div>
      </table>
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
    <section class="pages" v-if="insuranceList.length > 10 && isLogin">
      <Page
        :total="insuranceList.length"
        :limit="limit"
        :page="page + 1"
        @page-change="handleClickChagePage"
      />
    </section>
  </div>
</template>

<script>
import PInput from '~/components/common/p-input.vue'
import '~/assets/svg/iconfont.js'
import precision from '~/assets/js/precision.js'
import {
  fixD,
  addCommom,
  autoRounding,
  toRounding,
  fixDEAdd,
} from '~/assets/js/util.js'
import { toWei, fromWei } from '~/assets/utils/web3-fun.js'
import { buyInsuranceBuy, asks } from '~/interface/order.js'
import { getTokenName } from '~/assets/utils/address-pool.js'
import Message from '~/components/common/Message'
import ClipboardJS from 'clipboard'
import Page from '~/components/common/page.vue'
import InsuranceTitle from './insurance-title'
import { getAddress } from '~/assets/utils/address-pool.js'
export default {
  components: {
    InsuranceTitle,
    PInput,
    Page,
  },
  props: ['activeInsurance'],
  data() {
    return {
      page: 0,
      limit: 10,
      showList: [],
      insuranceList: [],
      isLoading: true,
    }
  },
  computed: {
    aboutInfoSell() {
      let list = this.$store.state.aboutInfoSell
      return list
    },
    strikePriceArray() {
      return this.$store.state.strikePriceArray
    },
    indexArray() {
      let list = this.$store.state.allIndexPrice
      return list
    },
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  watch: {
    aboutInfoSell: {
      handler: 'aboutInfoSellWatch',
      immediate: true,
    },
    userInfo: {
      handler: 'userInfoWatch',
      immediate: true,
    },
  },

  methods: {
    userInfoWatch(newValue) {
      let isLogin = newValue.data.isLogin;
      this.isLogin = isLogin;
      if (isLogin) {
        this.isLoading = true;
        this.setList(this.aboutInfoSell);
      } else {
        this.isLoading = false;
      }
    },
    aboutInfoSellWatch(newValue) {
      if (newValue) {
        this.page = 0;
        this.limit = 10;
        this.setList(newValue);
      }
    },
    async setList(sell) {
      this.isLoading = true;
      let item, resultItem;
      let resultList = [];
      // 当前时间
      let now = new Date() * 1
      // 当前保险地址
      let coinAddress = getAddress(this.activeInsurance)
      // 当前保险的全部保单
      let callInsuranceList = sell.filter(
        (item) => item.longInfo._collateral.toLowerCase() == coinAddress
      )
      // 数据处理
      for (let i = 0; i < callInsuranceList.length; i++) {
        item = callInsuranceList[i]
        // 展示账户ID
        let showID =
          item.seller.substr(0, 2) +
          item.seller.substr(2, 3) +
          '...' +
          item.seller.substr(-4).toUpperCase()
        // 到期时间
        let time = item.longInfo._expiry * 1000
        // 抵押物
        let coToken = getTokenName(item.longInfo._collateral)
        // 标的物
        let unToken = getTokenName(item.longInfo._underlying)
        // 价格
        let price =
          coToken == 'CTK'
            ? fromWei(item.price, 30)
            : fromWei(item.price, unToken)

        // 出险价格
        let exPirce = precision.divide(
          1,
          fromWei(item.longInfo._strikePrice, coToken)
        )
        resultItem = {
          seller: item.seller,
          id: item.askID,
          volume: fixD(fromWei(item.volume, coToken), 8),
          price: fixD(price, 4),
          settleToken: item.settleToken,
          _strikePrice: fromWei(item.longInfo._strikePrice, coToken),
          _underlying: item.longInfo._underlying,
          _expiry: item.longInfo._expiry,
          _collateral: item.longInfo._collateral,
          remain: 0,
          showID,
          buyNum: '',
          sort: 1,
        }
        let res = await asks(resultItem['id'], 'sync', coToken)
        resultItem['remain'] = fixD(res, 8)
        if (resultItem['remain'] == 0 || time < now) {
          resultItem['status'] = 'dated'
          resultItem['sort'] = 0
        }
        if (
          time + 2592000000 > now &&
          resultItem.seller != '0x0603CD787f45D1b830cEd5AcaEECDaB661B267ca'
        ) {
          resultList.push(resultItem)
        }
      }
      resultList.sort(function(a, b) {
        return Number(a.price) - Number(b.price)
      })
      this.insuranceList = resultList.sort(function(a, b) {
        return b.sort - a.sort
      })
      this.isLoading = false
      this.showList = resultList.slice(this.page * this.limit, this.limit)
    },
    handleClickChagePage(index) {
      index = index - 1
      this.page = index
      let page = index
      let list = this.insuranceList.slice(
        this.page * this.limit,
        (page + 1) * this.limit
      )
      this.showList = list
    },
    // 承保按钮
    handleClickBuy(data) {
      if (!data.buyNum) {
        return
      }
      let datas
      datas = {
        askID: data.id,
        volume: data.buyNum,
        showVolueme: data.buyNum,
        price: data.price,
        settleToken: 'HELMET',
        _strikePrice: data._strikePrice,
        _underlying: getTokenName(data._underlying),
        _expiry: data._expiry,
        _collateral: getTokenName(data._collateral),
        showType: getTokenName(data._collateral),
      }
      this.listType = 2
      this.listCoin = data._collateral
      buyInsuranceBuy(datas, (status) => {})
    },
  },
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 750px) {
  .insurance_list {
    position: relative;
    > div {
      display: none;
    }
    table {
      width: 100%;
      display: flex;
      flex-direction: column;
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
      thead {
        width: 100%;
        background: #f7f7fa;
        tr {
          height: 40px;
          color: rgba(23, 23, 58, 0.4);
          td {
            line-height: 40px;
            font-size: 14px;
          }
          .option {
            text-align: right;
          }
        }
      }
      tbody {
        width: 100%;
        tr {
          width: 100%;
          box-shadow: 0px 1px 0px 0px #ededf0;
          td {
            white-space: nowrap;
            width: 100px;
            height: 60px;
            line-height: 60px;
            font-size: 14px;
            font-weight: bold;
            color: #17173a;
            display: flex;
            align-items: center;
            &:nth-of-type(4) {
              input {
                border-radius: 5px;
                width: 160px;
                height: 32px;
                border: 1px solid #eee;
                padding: 0 10px;
                &:focus {
                  border: 1px solid #fd7e14;
                  width: 160px;
                }
              }
            }
          }
          .option {
            text-align: right;
            display: inline;
            button {
              padding: 0 20px;
              height: 32px;
              background: #17173a;
              color: #fff;
              border-radius: 3px;
            }
          }
        }
      }
    }
  }
}
</style>
