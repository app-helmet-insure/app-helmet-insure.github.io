<template>
  <div class="dashboard-banner">
    <div class="banner-l">
      <div class="avatar">
        <img src="../../../assets/img/dashboard/justine-dusk-avatar.png" alt="" v-if="duskNftAvatar === 'justineDusk'">
        <img src="../../../assets/img/dashboard/dusk-avatar.png" alt="" v-else-if="duskNftAvatar === 'dusk'">
        <img :src="'https://avatars.dicebear.com/api/identicon/' + account + '.svg'" alt="" v-else>
      </div>
      <div class="info">
        <span class="account" @click="copyAdress($event, account)" v-if="account">
          {{accountText}} <img src="../../../assets/img/dashboard/copy.png" class="copy" alt=""></span>
        <p>{{$t("Dashboard.text1")}}: {{createdAt}}</p>
        <p class="iio">IIO <img :src="require(`~/assets/img/iio/${item.img}.png`)" :alt="item.name" v-for="(item, index) in useIIOList" :key="index"></p>
        <p class="iio">IBO <img :src="require(`~/assets/img/ibo/${item.icon}`)" :alt="item.name" v-for="(item, index) in useIBOList" :key="index"></p>
      </div>
    </div>
    <div class="banner-r">
      <div class="balance-item balance-helmet">
        <div class="chain">BSC <img src="../../../assets/img/dashboard/binance-icon.png" alt=""></div>
        <h1>Helmet</h1>
        <h2>{{balance.helmet.balance}}</h2>
        <p>${{balance.helmet.USD}}</p>
      </div>
      <div class="balance-item balance-guard">
        <div class="chain">Polygon <img src="../../../assets/img/dashboard/polygon-icon.png" alt=""></div>
        <h1>Guard</h1>
        <h2>{{balance.guard.balance}}</h2>
        <p>${{balance.guard.USD}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Contract } from "ethers-multicall-x";
import ERC20 from "~/web3/abis/ERC20ABI.json";
import {CALC_ADDRESS, CalcAbi, ChainId} from "../../../web3/address";
import {fromWei, getOnlyMultiCallProviderPlus, processResult} from "../../../web3";
import BigNumber from "bignumber.js";
import {iboPools} from "../../../config/ibo";
import IIOABI from "~/web3/abis/iio_abi.json";
import ADDRESS from '~/web3/abis/config.js'
import {ProjectData} from "../../../config/iio";
import axios from "axios";
import moment from "moment";
import ClipboardJS from "clipboard";
import Message from "../../common/Message";
export default {
  name: "DashboardBanner",
  props: ['duskNftAvatar'],
  data(){
    return {
      balance: {
        helmet: {
          balance: '-',
          price: '',
          USD: '-'
        },
        guard: {
          balance: '-',
          price: '',
          USD: '-'
        }
      },
      useIBOList: [],
      useIIOList: [],
      createdAt: ''
    }
  },
  computed: {
    account(){
      return this.$store.state.userInfo.account
    },
    accountText(){
      if (this.account){
        return this.account.substr(0, 6) +
        "..." +
            this.account.substr(-4)
      }
    }
  },
  watch: {
    '$store.state.userInfo.account': function (){
      this.getData()
    }
  },
  methods: {
    copyAdress(e, text) {
      let copys = new ClipboardJS(".account", { text: () => text });
      copys.on("success", function (e) {
        Message({
          message: "Successfully copied",
          type: "success",
          // duration: 0,
        });
        copys.destroy();
      });
      copys.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
        copys.destroy();
      });
    },
    getData(){
      if (!this.account){
        return
      }
      this.getBalance(ChainId.BSC)
      this.getBalance(ChainId.MATIC)
      this.getUseIBO()
      this.getUseIIO()
      this.getFirstTime()
    },
    getBalance(chainId){
      const helmetAddress = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'
      const pricePath = {
        [ChainId.BSC]: [helmetAddress,'0xe9e7cea3dedca5984780bafc599bd69add087d56'],
        [ChainId.MATIC]: [helmetAddress,'0x2791bca1f2de4661ed88a30c99a7a9449aa84174']
      }[chainId]
      const priceDecimals = {
        [ChainId.BSC]: 18,
        [ChainId.MATIC]: 6
      }[chainId]
      const helmetContract = new Contract(helmetAddress, ERC20.abi)
      const helmetCalc = new Contract(CALC_ADDRESS(chainId), CalcAbi)
      const multicall = getOnlyMultiCallProviderPlus(chainId)
      multicall.all([
        helmetContract.balanceOf(this.account),
        helmetCalc.getPrice(pricePath)
      ]).then(res => {
        const data = processResult(res)
        const obj = {
          balance: Number(fromWei(data[0])).toFixed(4)*1,
          price: fromWei(data[1][0], priceDecimals),
        }
        obj.USD = new BigNumber(obj.balance).multipliedBy(obj.price).toFixed(2) * 1
        if (chainId === ChainId.BSC) {
          this.balance.helmet = obj
        } else if (chainId === ChainId.MATIC) {
          this.balance.guard = obj
        }
      })

    },
    getFirstTime(){
      axios({
        method: 'post',
        url:
            'https://api.thegraph.com/subgraphs/name/app-helmet-insure/helmet-insure',
        data: {
          query: `{
                  accounts(first: 1, where:{address: "${this.account}"}){
                    address
                    createdAt
                  }
                }`,
        },
      }).then(res => {
        const data = res.data.data.accounts[0]
        if (data){
          this.createdAt = moment(data.createdAt*1000).format(
              "YYYY-MM-DD"
          )
        } else {
          this.createdAt = '-'
        }
      })
    },
    getUseIBO(){
      // require(`~/assets/img/ibo/${iboData.icon}`)
      const calls = []
      for (let i = 0; i < iboPools.length; i++) {
        if (iboPools[i].networkId === ChainId.BSC) {
          const contract = new Contract(iboPools[i].address, iboPools[i].abi)
          calls.push(contract.settledCurrencyOf(this.account))
        }
      }
      const multicall = getOnlyMultiCallProviderPlus(ChainId.BSC)
      multicall.all(calls).then(res => {
        const data = processResult(res)
        const filterList = []
        for (let i = 0; i < data.length; i++) {
          if (data[i] > 0){
            filterList.push({
              name: iboPools[i].name,
              icon: iboPools[i].icon
            })
          }
        }
        this.useIBOList = filterList
      })
    },
    getUseIIO(){
      // require(`~/assets/img/iio/${item.iio_img}.png`)
      let PoolAddress = ADDRESS.BSC_CONTRACT_IIO_HELMETBNB_POOL;
      const contract = new Contract(PoolAddress, IIOABI.abi)
      const multicall = getOnlyMultiCallProviderPlus(ChainId.BSC)
      const calls = []
      const useIIOList = []
      for (let i = 0; i < ProjectData.length; i++) {
        const key = 'BSC_CONTRACT_IIO_HELMETBNB_' + ProjectData[i].iio_name.toUpperCase()
        if (ADDRESS[key]){
          calls.push(contract.applied3(ADDRESS[key], this.account))
          useIIOList.push({
            img: ProjectData[i].iio_img,
            name: ProjectData[i].iio_name
          })
        }
      }
      multicall.all(calls).then(res => {
        const data = processResult(res)
        const strToBool = {'true': true, 'false': false}
        const filterList = []
        for (let i = 0; i < useIIOList.length; i++) {
          if (strToBool[data[i]]){
            filterList.push(useIIOList[i])
          }
        }
        this.useIIOList = filterList
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
.dashboard-banner{
  display: flex;
  .banner-l{
    flex: 1;
    display: flex;
    .avatar{
      &>img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .info{
      flex: 1;
      padding: 0 10px;
      .account{
        background: #FD7E14;
        border-radius: 12px;
        height: 24px;
        line-height: 17px;
        font-size: 15px;
        font-family: IBMPlexSans;
        color: #FFFFFF;
        padding: 2px 9px;
        margin-bottom: 5px;
        cursor: pointer;
        .copy{
          width: 12px;
          height: 12px;
        }
      }
      p{
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          color: themed("color-17173a");
        }
        line-height: 16px;
        margin: 10px 0;
      }
      .iio{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        &>img{
          width: 20px;
          height: 20px;
          margin-left: 3px;
        }
      }
    }
  }
  .banner-r{
    display: flex;
    .balance-item{
      width: 264px;
      height: 132px;
      min-width: 264px;
      border-radius: 22px;
      background-size: auto 100%;
      background-position: right bottom;
      background-repeat: no-repeat;
      position: relative;
      padding: 19px 22px;
      .chain{
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 15px;
        font-family: IBMPlexSans;
        line-height: 20px;
        display: flex;
        align-items: center;
        img{
          width: 30px;
          height: 30px;
        }
      }
      h1{
        font-size: 15px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #17173A;
        line-height: 20px;
      }
      h2{
        font-size: 22px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #17173A;
        line-height: 27px;
        margin-top: 20px;
      }
    }
    .balance-helmet{
      background-image: url("../../../assets/img/dashboard/binance-bg.png");
      background-color: #FBC386;
      margin-right: 22px;
      .chain{
        color: #A96427;
      }
    }
    .balance-guard{
      background-image: url("../../../assets/img/dashboard/polygon-bg.png");
      background-color: #B2B2FC;
      .chain{
        color: #52529D;
      }
    }
  }
}
@media (max-width: 750px) {
  .dashboard-banner{
    display: flex;
    flex-direction: column;
  }
}
@media (max-width: 500px) {
  .dashboard-banner{
    display: flex;
    flex-direction: column;
    .banner-r{
      display: flex;
      overflow-x: auto;
      align-items: center;
      .balance-item{
        //width: 90vw;
      }
      .balance-helmet{
        margin: 0 20px 0 0;
      }
    }
  }
}
</style>
