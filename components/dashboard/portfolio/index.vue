<template>
<div class="portfolio-view">
  <div class="list-view">
    <h1>LPT</h1>
    <template v-if="LPTList.length > 0">
      <table :class="'table-pc' + ` table-${LPTList.length}`">
        <tr>
          <th>LP Token</th>
          <th>Balance(pool)</th>
          <th>Price</th>
          <th>Value</th>
        </tr>
        <tr v-for="(item, index) in LPTList" :key="index">
          <td>
            <span v-if="item.swapName" :class="item.swapName"></span>
            {{item.LptToken1Symbol}}/{{item.LptToken2Symbol}}
          </td>
          <td>{{item.userBalanceOf}} <span>({{item.userStakeNum}})</span></td>
          <td>${{item.lptPrice <= 0 ? '-' : item.lptPrice}}</td>
          <td>${{item.lptPrice <= 0 ? '-' : item.userLPTValue}}</td>
        </tr>
      </table>
      <div class="table-h5" v-for="(item, index) in LPTList" :key="index">
        <div>
          <p class="table-h5-title">LP Token</p>
          <p class="table-h5-value">
<!--            <img-->
<!--                :src="require(`~/assets/img/icon/${item.PoolSwap}@2x.png`)"-->
<!--                alt=""-->
<!--            />-->
            <span v-if="item.swapIcon" v-html="item.swapIcon"></span>
            <span>{{item.LptToken1Symbol}}/{{item.LptToken2Symbol}}</span>
          </p>
        </div>
        <div>
          <p class="table-h5-title">Balance(pool)</p>
          <div class="table-h5-value">
            {{item.userBalanceOf}}
            <p>({{item.userStakeNum}})</p>
          </div>
        </div>
        <div>
          <p class="table-h5-title">Price</p>
          <p class="table-h5-value">${{item.lptPrice <= 0 ? '-' : item.lptPrice}}</p>
        </div>
        <div>
          <p class="table-h5-title">Value</p>
          <p class="table-h5-value">${{item.lptPrice <= 0 ? '-' : item.userLPTValue}}</p>
        </div>
      </div>
    </template>
    <div class="loading" v-else-if="lptLoading">loading...</div>
    <div class="no-data" v-else>No Data</div>
  </div>

  <div class="list-view">
    <h1>Short Token</h1>
    <template v-if="shortList.length > 0">
      <table :class="'table-pc' + ` table-${shortList.length}`">
        <tr>
          <th>Short Token</th>
          <th>Balance</th>
          <th>strikePrice</th>
          <th>Expiry</th>
        </tr>
        <tr v-for="(item, index) in shortList" :key="index">
          <td :style="{color: item.coverColor}">{{item.name}} {{item.cover}}</td>
          <td>{{item.sortBalanceOf}}</td>
          <td>${{item.strikePrice}}</td>
          <td>{{item.expiry}}</td>
        </tr>
      </table>
      <div class="table-h5" v-for="(item, index) in shortList" :key="index">
        <div>
          <p class="table-h5-title">Short Token</p>
          <p class="table-h5-value" :style="{color: item.coverColor}">{{item.name}} {{item.cover}}</p>
        </div>
        <div>
          <p class="table-h5-title">Balance</p>
          <p class="table-h5-value">{{item.sortBalanceOf}}</p>
        </div>
        <div>
          <p class="table-h5-title">strikePrice</p>
          <p class="table-h5-value">${{item.strikePrice}}</p>
        </div>
        <div>
          <p class="table-h5-title">Expiry</p>
          <p class="table-h5-value">{{item.expiry}}</p>
        </div>
      </div>
    </template>
    <div class="loading" v-else-if="longSortLoading">loading...</div>
    <div class="no-data" v-else>No Data</div>
  </div>

  <div class="list-view">
    <h1>Long Token</h1>
    <template v-if="longList.length > 0">
      <table :class="'table-pc' + ` table-${longList.length}`">
        <tr>
          <th>Long Token</th>
          <th>Balance</th>
          <th>strikePrice</th>
          <th>Expiry</th>
        </tr>
        <tr v-for="(item, index) in longList" :key="index">
          <td :style="{color: item.coverColor}">{{item.name}} {{item.cover}}</td>
          <td>{{item.longBalanceOf}}</td>
          <td>${{item.strikePrice}}</td>
          <td>{{item.expiry}}</td>
        </tr>
      </table>
      <div class="table-h5" v-for="(item, index) in longList" :key="index">
        <div>
          <p class="table-h5-title">Long Token</p>
          <p class="table-h5-value" :style="{color: item.coverColor}">{{item.name}} {{item.cover}}</p>
        </div>
        <div>
          <p class="table-h5-title">Balance</p>
          <p class="table-h5-value">{{item.longBalanceOf}}</p>
        </div>
        <div>
          <p class="table-h5-title">strikePrice</p>
          <p class="table-h5-value">${{item.strikePrice}}</p>
        </div>
        <div>
          <p class="table-h5-title">Expiry</p>
          <p class="table-h5-value">{{item.expiry}}</p>
        </div>
      </div>
    </template>
    <div class="loading" v-else-if="longSortLoading">loading...</div>
    <div class="no-data" v-else>No Data</div>
  </div>
</div>
</template>

<script>
import {LptPoolList as LptPoolList1, TokenPoolList as LptPoolList2} from "../../../config/mining";
import {fromWei, getOnlyMultiCallProviderPlus, processResult} from "../../../web3";
import {CALC_ADDRESS, CalcAbi, ChainId} from "../../../web3/address";
import {Contract} from "ethers-multicall-x";
import IPancakePair from "~/web3/abis/IPancakePair.json";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import MiningABI from "~/web3/abis/MiningABI.json";
import BigNumber from "bignumber.js";
import {formatAmount} from "../../../interface/ibo";
import axios from "axios";
import {ClientContract, multicallClient} from "../../../web3/multicall";
import moment from "moment";
import SwiperHelperAbi from '../../../web3/abis/SwiperHelperAbi.json'
function duplicateRemoval(arr,key) {
  const obj = {}
  const newArr = []
  for (let i = 0; i < arr.length; i++) {
    const itemKey = key ? arr[i][key] : arr[i]
    if (!obj['s' + itemKey]){
      newArr.push(arr[i])
      obj['s' + itemKey] = true
    }
  }
  return newArr
}

const filterLptPoolList2 = LptPoolList2.reduce((list, item) => {
  if (item.StakeSymbol && item.StakeSymbol.indexOf('LP') !== -1) {
    const LptTokenSymbol = item.StakeSymbol.split(' ')[0].split('-')
    list.push({
      ...item,
      LptToken1Symbol: LptTokenSymbol[0],
      LptToken2Symbol: LptTokenSymbol[1]
    })
  }
  return list
}, [])

const LptPoolList = duplicateRemoval(LptPoolList1.concat(filterLptPoolList2), 'StakeAddress')


export default {
  name: "Portfolio",
  data(){
    return {
      shortList: [],
      longList: [],
      LPTList: [],
      longSortLoading: false,
      lptLoading: false
    }
  },
  computed: {
    account(){
      return this.$store.state.userInfo.account
    }
  },
  watch: {
    account: function (){
      this.getData()
    }
  },
  methods: {
    getData(){
      if (!this.account){
        return
      }
      this.getLPTData()
      this.getSortData()
    },
    getLPTData(){
      this.lptLoading = true
      const LPTList = []
      // const multicall = getOnlyMultiCallProviderPlus(ChainId.BSC)
      // const calcContract = new ClientContract(CalcAbi, CALC_ADDRESS(ChainId.BSC), ChainId.BSC)
      const swiperHelper = "0xc69324bd7E1a6A38eE91905Bf75Df3637e51044A"
      const swiperHelperContract = new ClientContract(SwiperHelperAbi, swiperHelper, ChainId.BSC)

      // const poolContract = new Contract('0xD86577ea62FE1FD2cA0Be583c1A0ecf25F4FbF2B', MiningABI)
      // getPrice
      const calls = [
        // calcContract.getLPTStakeValue('0xD86577ea62FE1FD2cA0Be583c1A0ecf25F4FbF2B', ['0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8']),
        // poolContract.totalSupply()
      ]
      const needPrice = ["pancake", "cafeswap", "mdx"]

      const priceCalls = []
      for (let i = 0; i < LptPoolList.length; i++) {
        if (!LptPoolList[i].StakeAddress){
          continue
        }
        let Params = LptPoolList[i].NoProxy ? [LptPoolList[i].ProxyPid, this.account] : [this.account]
        const stakeContract = new ClientContract(IPancakePair.abi, LptPoolList[i].StakeAddress, ChainId.BSC)
        const poolContract = new ClientContract(LptPoolList[i].PoolABI, LptPoolList[i].PoolAddress, ChainId.BSC)
        calls.push(
            stakeContract.balanceOf(this.account),
            poolContract[LptPoolList[i].CanWithDrawMethods](...Params),

                // swiperHelperContract.getLPTValue(
                //     "0x10ED43C718714eb63d5aA57B78B54704E256024E",
                //    '0x86ddc49f66fa166e72e650a72752b43ce23ecbe5',
                //     '1000000000000000000',
                //     ['0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8', '0xe9e7cea3dedca5984780bafc599bd69add087d56']
                // )
        )
        LPTList.push({
          ...LptPoolList[i]
        })
        if (needPrice.indexOf(LptPoolList[i].swapName) !== -1) {
          priceCalls.push(
              swiperHelperContract.getLPTValue(
                  LptPoolList[i].swiperRouterAddress,
                  LptPoolList[i].StakeAddress,
                  '1000000000000000000',
                  [LptPoolList[i].LptTokenOwner, '0xe9e7cea3dedca5984780bafc599bd69add087d56']
              )
          )
        }
      }
      const filterList =[]
      multicallClient([...priceCalls, ...calls]).then(data => {
        // const data = processResult(res)
        // return
        let priceI = 0
        for (let i = 0; i < LPTList.length; i++) {
          const ii = i*2 + priceCalls.length
          let price = '0' //fromWei(data[ii+2], 18).toString()
          if (needPrice.indexOf(LPTList[i].swapName) !== -1) {
            price = Number(fromWei(data[priceI], 18).toString()).toFixed(4)
            priceI += 1
          }
          const userBalanceOf = Number(fromWei(LPTList[i].NoProxy ? data[ii][0] : data[ii], 18)).toFixed(4) * 1
          const userStakeNum = Number(fromWei(Array.isArray(data[ii + 1]) ? data[ii + 1][0] : data[ii + 1], 18)).toFixed(4) * 1
          if (userBalanceOf > 0 || userStakeNum > 0) {
            LPTList[i].userBalanceOf = userBalanceOf
            LPTList[i].userStakeNum = userStakeNum
            LPTList[i].userLPTValue = formatAmount(((LPTList[i].userStakeNum + userBalanceOf) * price).toString(), 0, 2)
            LPTList[i].lptPrice = price
            filterList.push(LPTList[i])
          }
        }
      })

      // get guard-usdc LP
      const guardLPPoolAddress = "0x1dbdfea5f5cfb066ec5a74d3e8b9324cd2717c43"
      const guardStakeAddress = "0xD2EeeEdfcAF1457F7BC9cbA28d5316F73BB83b49"
      const guardPoolContract = new Contract(guardLPPoolAddress, MiningABI)
      const calcMaticContract = new Contract(CALC_ADDRESS(ChainId.MATIC), CalcAbi)
      const stakeContract = new Contract(guardStakeAddress, IPancakePair.abi)
      const multicallMatic = getOnlyMultiCallProviderPlus(ChainId.MATIC)
      multicallMatic.all([
        calcMaticContract.getLPTStakeValue(guardLPPoolAddress, ['0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174']),// usdc Decimals=6
        guardPoolContract.totalSupply(),
        stakeContract.balanceOf(this.account),
        guardPoolContract.balanceOf(this.account),
      ]).then(res => {
        const data = processResult(res)
        const price = new BigNumber(fromWei(data[0], 6)).div(new BigNumber(fromWei(data[1], 18))).toFixed(6)
        let guardPool = LptPoolList.find(item => item.PoolName === 'GUARD-USDC LPT')
        if (guardPool){
          guardPool = {...guardPool}
          const userBalanceOf = Number(fromWei(data[2], 18)).toFixed(4) * 1
          if (userBalanceOf > 0) {
            guardPool.userBalanceOf = userBalanceOf
            guardPool.userStakeNum = Number(fromWei(data[3], 18)).toFixed(4) * 1
            guardPool.userLPTValue = formatAmount(((guardPool.userStakeNum + userBalanceOf) * price).toString(), 0, 2)
            guardPool.lptPrice = price
            filterList.push(guardPool)
          }
          this.LPTList = filterList
          this.lptLoading = false
          console.log('LPTList', filterList, price)
        }
      })
    },
    getSortData(){
      this.longSortLoading = true
      axios({
        method: 'post',
        url:
            'https://api.thegraph.com/subgraphs/name/app-helmet-insure/helmet-insure',
        data: {
          query: `{
          options(first: 1000) {
            short
            long
            expiry
            collateral
            underlying
            strikePrice
          }
        }`,
        },
      }).then(res => {
        const options = res.data.data.options || []
        //wbnb busd
        const putTokens = ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', '0xe9e7cea3dedca5984780bafc599bd69add087d56']
        const calls = []
        for (let i = 0; i < options.length; i++) {
          const index1 = putTokens.findIndex(o => o === options[i].collateral)
          const index2 = putTokens.findIndex(o => o === options[i].underlying)

          const sortContract = new ClientContract(ERC20ABI.abi, options[i].short, ChainId.BSC)
          const longContract = new ClientContract(ERC20ABI.abi, options[i].long, ChainId.BSC)
          const collateralContract = new ClientContract(ERC20ABI.abi, options[i].collateral, ChainId.BSC)
          calls.push(
              sortContract.balanceOf(this.account),
              longContract.balanceOf(this.account),
              collateralContract.symbol(),
          )
          if (index1 > index2) {
            options[i].cover = 'put'
            options[i].coverColor = '#DC3545'
            const underlyingContract = new ClientContract(ERC20ABI.abi, options[i].underlying, ChainId.BSC)
            calls.push(underlyingContract.decimals())
          } else {
            options[i].cover = 'call'
            options[i].coverColor = '#28A745'
            calls.push(collateralContract.decimals())
          }
        }
        multicallClient(calls).then(data => {
          const shortList = []
          const longList = []
          for (let i = 0; i < options.length; i++) {
            const ii = i * 4
            if (data[ii] > 0 || data[ii + 1] > 0) {
              options[i].strikePrice = formatAmount(options[i].strikePrice, 18)
              options[i].name = data[ii + 2]
              if (options[i].expiry > 4070880000) {
                options[i].expiry = 'Infinity'
              } else {
                options[i].expiry = moment(options[i].expiry*1000).format("YYYY-MM-DD")
              }
              if (data[ii] > 0){
                options[i].sortBalanceOf = formatAmount(data[ii], data[ii+3] || 18)
                shortList.push(options[i])
              }
              if (data[ii + 1] > 0) {
                options[i].longBalanceOf = formatAmount(data[ii+1], data[ii+3] || 18)
                longList.push(options[i])
              }
            }
          }
          // console.log('shortList', shortList, longList)
          this.shortList = shortList
          this.longList = longList
          this.longSortLoading = false
        })
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/css/themes.scss";
.portfolio-view{
  .list-view{
    width: 100%;
    min-height: 193px;
    @include themeify {
      background: themed("dashboard_color1");
      border: 2px solid themed("dashboard_color2");
    }
    box-shadow: 0px 4px 9px 0px rgba(255,255,255,0.02);
    border-radius: 22px;
    padding: 20px 15px;
    margin-bottom: 11px;
    &>h1{
      font-size: 22px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 500;
      @include themeify {
        color: themed("dashboard_color3");
      }

      line-height: 22px;
    }
    //.table-1{
    //  td{
    //    border-bottom: 0!important;
    //  }
    //}
    table{
      width: 100%;
      text-align: left;
      margin-top: 18px;
      border-spacing: 0;
      th{
        font-size: 15px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        @include themeify {
          color: themed("dashboard_color3");
        }
        line-height: 18px;
        padding: 10px 0;
        width: 25%;
      }
      td{
        padding: 20px 0;
        font-size: 18px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        @include themeify {
          color: themed("dashboard_color4");
          border-bottom: 1px solid themed("dashboard_color5");
        }
        line-height: 18px;
        width: 25%;
        .td-img{
          height: 22px;
          margin-right: 9px;
          vertical-align: middle;
        }
        &>span{
            display: inline-block;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin: 0 2px;
          vertical-align: middle;
          &.pancake {
            background-image: url("../../../assets/img/icon/pancake@2x.png");
          }
          &.dodo {
            background-image: url("../../../assets/img/icon/dodo@2x.png");
          }
          &.chainswap {
            background-image: url("../../../assets/img/icon/chainswap@2x.png");
          }
          &.qian {
            background-image: url("../../../assets/img/icon/qian@2x.png");
          }
          &.mdx {
            background-image: url("../../../assets/img/icon/mdx@2x.png");
          }
          &.xms {
            background-image: url("../../../assets/img/icon/xms@2x.png");
          }
          &.acsi {
            background-image: url("../../../assets/img/icon/acsi@2x.png");
          }
          &.burger {
            background-image: url("../../../assets/img/icon/burgerswap@2x.png");
          }
          &.babyswap {
            background-image: url("../../../assets/img/icon/babyswap@2x.png");
          }
          .cafeswap {
            background-image: url("../../../assets/img/icon/cafeswap@2x.png");
          }
        }
      }
    }
  }
  .no-data,.loading{
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cccccc;
  }
  .table-h5{
    display: none;
  }
}
@media (max-width: 750px) {
  .list-view {
    padding: 10px;
    &>h1{
      margin-bottom: 10px;
    }
    .table-h5 {
      display: grid;
      padding: 0 0 20px 0;
      grid-template-columns: 1fr 100px;
      border-bottom: 1px solid #F2F0EB;
      &>div{
        &:nth-child(odd){
          padding-right: 10px;
        }
        .td-img{
          height: 20px;
          margin-right: 5px;
        }
        .table-h5-title{
          font-size: 14px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 500;
          @include themeify {
            color: themed("dashboard_color3");
          }
          line-height: 16px;
          margin-top: 15px;
        }
        .table-h5-value{
          font-size: 16px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 500;
          @include themeify {
            color: themed("dashboard_color4");
          }
          line-height: 18px;
          margin-top: 10px;
          display: flex;
          align-items: center;
        }
      }
    }
    .table-pc {
      display: none;
    }
  }
}
</style>
