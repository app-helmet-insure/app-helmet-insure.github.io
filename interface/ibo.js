import {JsonRpcProvider} from "@ethersproject/providers";
import {cloneDeep} from 'lodash'
import Web3 from 'web3'
import ERC20 from '../abi/ERC20_abi.json'
import {Contract, Provider} from 'ethers-multicall-x'
import BigNumber from "bignumber.js";
const BSCChainId = 56
const BSCRpcUrl = 'https://bsc-dataseed.binance.org/'
export const getOnlyMultiCallProvider = () => new Provider(new JsonRpcProvider(BSCRpcUrl, BSCChainId), BSCChainId)
export function processResult(data) {
  data = cloneDeep(data)
  if (Array.isArray(data)){
    data.map((o, i) => {
      data[i] = processResult(o)
    })
    return data
  }else if(data.toString){
    return data.toString()
  }else if(typeof data === 'object'){
    for(let key in data){
      Object.assign(data, {
        [key]: processResult(0)
      })
    }
    return data
  } else{
    return data
  }
}
export const formatAmount = (value, decimals = 18, fixed = 6) => {
  return new BigNumber(
    fromWei(value, decimals).toFixed(fixed === -1 ? null : fixed, 1)
  )
    .toNumber()
    .toString()
}
export const fromWei = (value, decimals = 18) => {
  return new BigNumber(value).dividedBy(new BigNumber(10).pow(decimals))
}

export const getPoolInfo = (pool) => {
  const poolContract = new Contract(pool.address, pool.abi)
  const account = window.CURRENTADDRESS
  if (!account) {
    return Promise.all([]).then(()=>pool)
  }
  const currencyContract = new Contract(pool.currency.address, ERC20.abi)
  const currencyToken = pool.currency.is_ht
    ? null
    : new Contract(pool.currency.address, ERC20.abi)
  const promiseList = [
    poolContract.price(), // 结算时间点
    poolContract.totalPurchasedCurrency(), //总申购的量
    poolContract.purchasedCurrencyOf(account),
    poolContract.totalSettleable(),
    poolContract.settleable(account),
    poolContract.totalSettledUnderlying(),
  ]
  // 追加可能存在的
  poolContract.time && promiseList.push(poolContract.time())
  poolContract.timeSettle && promiseList.push(poolContract.timeSettle())
  currencyToken && promiseList.push(currencyToken.allowance(account, pool.address))
  const multicallProvider = getOnlyMultiCallProvider()
  return multicallProvider
    .all(promiseList).then(res => {
    const now = parseInt(Date.now() / 1000)
    const resData = processResult(res)
    let [
      price,
      totalPurchasedCurrency,
      purchasedCurrencyOf,
      totalSettleable,
      settleable,
      totalSettledUnderlying,
      time = 0,
      timeSettle = 0,
      currency_allowance = 0,
    ] = resData
    const [
      total_completed_,
      total_amount,
      total_volume,
      total_rate,
    ] = totalSettleable
    const [completed_, amount, volume, rate] = settleable

    let status = pool.status || 0 // 即将上线
    const timeClose = time
    if (timeSettle) {
      // time 如果没有的话，使用timeSettle填充
      time = timeSettle
    }
    if (pool.start_at < now && status < 1) {
      // 募集中
      status = 1
    }
    if (time < now && status < 2) {
      // 结算中
      status = 2
    }

    if (
      totalSettleable.volume == totalSettledUnderlying &&
      totalSettleable.volume > 0
    ) {
      status = 3
    }

      console.log('totalPurchasedAmount', pool.amount, Web3.utils.toWei(pool.amount, 'ether'))
    const totalPurchasedAmount = new BigNumber(
      Web3.utils.toWei(pool.amount, 'ether')
    )
      .multipliedBy(new BigNumber(price))
      .div(new BigNumber(Web3.utils.toWei('1', 'ether')))

    const totalPurchasedUnderlying = Web3.utils.toWei(
      new BigNumber(totalPurchasedCurrency)
        .dividedBy(new BigNumber(price))
        .toFixed(0, 1),
      'ether'
    )

    let is_join = false
    if (purchasedCurrencyOf > 0) {
      is_join = true
    }

    Object.assign(pool.currency, {
      allowance: currency_allowance,
    })
    return Object.assign({}, pool, {
      ratio: `1${pool.underlying.symbol}=${formatAmount(price, 18, 5)}${
        pool.currency.symbol
      }`,
      progress:
        new BigNumber(totalPurchasedCurrency)
          .dividedBy(totalPurchasedAmount)
          .toFixed(2, 1)
          .toString() * 1,
      status: status,
      time: time,
      timeClose,
      price: Web3.utils.fromWei(price, 'ether'),
      is_join,
      totalPurchasedCurrency,
      totalPurchasedAmount: pool.amount,
      totalPurchasedUnderlying,
      purchasedCurrencyOf,
      totalSettleable: {
        completed_: total_completed_,
        amount: total_amount, // 预计获得
        volume: total_volume,
        rate: total_rate,
      },
      totalSettledUnderlying,
      settleable: {
        completed_,
        amount, // 未结算数量
        volume,// 预计中签量
        rate
      },
    })
  })
}

// 授权
export const onApprove_ =  (contractAddress, callback = (status) => {}) => {
  let web3_ = new Web3(window.ethereum)
  let myContract = new web3_.eth.Contract(ERC20.abi, contractAddress);
  myContract.methods
    .approve(
      window.CURRENTADDRESS,
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    )
    .send({ from: window.CURRENTADDRESS })
    .on('receipt', function() {
      callback(true)
    })
    .on('error', () => {
      callback(false)
    })
}
// 质押
export const onBurn_ = (_amount, contractAddress, abi, callback) => {
  let web3_ = new Web3(window.ethereum)
  let myContract = new web3_.eth.Contract(abi, contractAddress);
  myContract.methods
    .purchase(_amount)
    .send({ from: window.CURRENTADDRESS })
    .on('receipt', function() {
      callback(true)
    })
    .on('error', () => {
      callback(false)
    })
}
// 提取
export const onClaim_ = (contractAddress,abi, callback) => {
  console.log(contractAddress, abi)
  let web3_ = new Web3(window.ethereum)
  let myContract = new web3_.eth.Contract(abi, contractAddress);
  myContract.methods
    .settle()
    .send({ from: window.CURRENTADDRESS })
    .on('receipt', function() {
      callback(true)
    })
    .on('error', () => {
      callback(false)
    })
}
