<template>
  <div>
    DashboardBanner
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
export default {
  name: "DashboardBanner",
  data(){
    return {
      balance: {
        helmet: {
          balance: '',
          price: '',
          USD: ''
        },
        guard: {
          balance: '',
          price: '',
          USD: ''
        }
      },
      useIBO: false,
      useIIOList: [],
      createdAt: ''
    }
  },
  computed: {
    account(){
      return this.$store.state.userInfo.account
    }
  },
  watch: {
    '$store.state.userInfo.account': function (){
      this.getData()
    }
  },
  methods: {
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
          balance: fromWei(data[0]),
          price: fromWei(data[1][0], priceDecimals),
        }
        obj.USD = new BigNumber(obj.balance).multipliedBy(obj.price).toFixed(6) * 1
        if (chainId === ChainId.BSC) {
          this.balance.helmet = obj
        } else if (chainId === ChainId.MATIC) {
          this.balance.guard = obj
        }
        console.log(obj)
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
        console.log(this.createdAt)
      })
    },
    getUseIBO(){
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
        this.useIBO = data.some(item => item > 0)
        console.log(this.useIBO)
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
        for (let i = 0; i < useIIOList.length; i++) {
          useIIOList[i].use = strToBool[data[i]]
        }
        this.useIIOList = useIIOList
        console.log(useIIOList)
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>

</style>
