import {JsonRpcProvider} from "@ethersproject/providers";
import {cloneDeep} from 'lodash'
import Web3 from 'web3'
import ERC20 from '../abi/ERC20_abi.json'
import {Contract, Provider} from 'ethers-multicall-x'
import BigNumber from "bignumber.js";
const BSCChainId = 56
const BSCRpcUrl = 'https://bsc-dataseed.binance.org/'
BigNumber.config({ EXPONENTIAL_AT: 100 })
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

const toWei = (value, decimals) => {
  return new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimals))
}

export const numToWei = (value, decimals = 18) => {
  return new BigNumber(
    toWei(value, decimals)
      .toNumber()
      .toFixed(decimals)
  ).toString()
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
    poolContract.price(),
    poolContract.totalPurchasedCurrency(), //总申购的量
    poolContract.purchasedCurrencyOf(account),
    // poolContract.totalSettleable(),
    poolContract.settleable(account),
    poolContract.totalSettledUnderlying(),
    poolContract.maxUser(),//最多参与人数
    poolContract.curUserCount(),//当前参与人数
    poolContract.amtLow(),//最少金额
    poolContract.amtHigh(),//最大金额
  ]
  if (pool.airdrop) {
    const airdropContract = new Contract(pool.airdrop.address, pool.airdrop.abi)
    promiseList.push(airdropContract.allowList(account)) // 可领取的量
    promiseList.push(airdropContract.withdrawList(account)) // 是否已经领取过
    promiseList.push(airdropContract.begin()) // airdrop开始时间
  }
  // 追加可能存在的
  poolContract.time && promiseList.push(poolContract.time())
  poolContract.timeSettle && promiseList.push(poolContract.timeSettle())
  currencyToken && promiseList.push(currencyToken.allowance(account, pool.address))
  currencyToken && promiseList.push(currencyToken.balanceOf(account))
  const multicallProvider = getOnlyMultiCallProvider()
  return multicallProvider
    .all(promiseList).then(res => {
    const now = parseInt(Date.now() / 1000)
    const resData = processResult(res)
    let [
      price,
      totalPurchasedCurrency,
      purchasedCurrencyOf,
      // totalSettleable,
      settleable,
      totalSettledUnderlying,
      maxUser,//最多参与人数
      curUserCount,//当前参与人数
      amtLow,
      amtHigh,
    ] = resData
      let time,
        timeSettle,
        currency_allowance,
        balanceOf,
        allowList,
        withdrawList,
        airdropBegin

      if (pool.airdrop) {
        allowList = resData[9]
        withdrawList = resData[10]
        airdropBegin = resData[11]
        time = resData[12]
        timeSettle = resData[13]
        currency_allowance = resData[14]
        balanceOf = resData[15]
        pool.airdrop = Object.assign(pool.airdrop, {
          begin: airdropBegin,
          allowList: fromWei(allowList, 18).toFixed(6)*1,
          withdrawList: {
            'true': true,
            'false': false
          }[String(withdrawList)]
        })
      } else {
        time = resData[9]
        timeSettle = resData[10]
        currency_allowance = resData[11]
        balanceOf = resData[12]
      }
      // time = 1629118800
      //   timeSettle = 1629118800
      // curUserCount=0
      // purchasedCurrencyOf=0
    // const [
    //   total_completed_,
    //   total_amount,
    //   total_volume,
    //   total_rate,
    // ] = totalSettleable
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

    // // 招募满了
    // if (
    //   totalSettleable.volume == totalSettledUnderlying &&
    //   totalSettleable.volume > 0
    // ) {
    //   status = 3
    // }

    const totalPurchasedAmount = new BigNumber(
      fromWei(pool.amount, pool.decimal)
    )
      .multipliedBy(new BigNumber(price))
      .div(new BigNumber(fromWei('1', pool.underlying.decimal)))

    const totalPurchasedUnderlying = numToWei(
      new BigNumber(totalPurchasedCurrency)
        .dividedBy(new BigNumber(price))
        .toFixed(0, 1),
      pool.currency.decimal
    )
      // console.log('totalPurchasedAmount',pool.name, totalPurchasedAmount.toString())

    let is_join = false
    if (purchasedCurrencyOf > 0) {
      is_join = true
    }
    Object.assign(pool.currency, {
      allowance: currency_allowance,
    })
    const num = new BigNumber(10).pow(pool.currency.decimal).multipliedBy(new BigNumber(10).pow(18)).div(new BigNumber(price).multipliedBy(new BigNumber(10).pow(pool.underlying.decimal))).toFixed(6) * 1
    return Object.assign({}, pool, {
      ratio: `1 ${pool.currency.symbol} = ${new BigNumber(num).toFormat()} ${
        pool.underlying.symbol
      }`,
      progress:
        new BigNumber(totalPurchasedCurrency)
          .dividedBy(totalPurchasedAmount)
          .toFixed(2, 1)
          .toString(),
      status: status,
      time: time,
      timeClose,//结束时间time
      timeSettle,//claim开始时间
      is_join,
      totalPurchasedCurrency,
      totalPurchasedAmount: totalPurchasedAmount,
      totalPurchasedUnderlying,
      balanceOf: formatAmount(balanceOf, pool.currency.decimals, 6), // 余额
      purchasedCurrencyOf,
      // totalSettleable: {
      //   completed_: total_completed_,
      //   amount: total_amount, // 预计获得
      //   volume: total_volume,
      //   rate: total_rate,
      // },
      totalSettledUnderlying,
      settleable: {
        completed_,
        amount, // 未结算数量
        volume,// 预计中签量
        rate
      },
      pool_info: {
        ...pool.pool_info,
        maxAccount: maxUser, // 最多参与人数
        curUserCount, // 当前参与人数
        min_allocation: fromWei(amtLow, pool.currency.decimal)*1,
        max_allocation: fromWei(amtHigh, pool.currency.decimal)*1,
      }
    })
  })
}

// 授权
export const onApprove_ =  (contractAddress,poolAddress, callback = (status) => {}) => {
  let web3_ = new Web3(window.ethereum)
  let myContract = new web3_.eth.Contract(ERC20.abi, contractAddress);
  myContract.methods
    .approve(
      poolAddress,
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
export const onBurn_ = (_amount, iboData, callback) => {
  let web3_ = new Web3(window.ethereum)
  let myContract = new web3_.eth.Contract(iboData.abi, iboData.address, {
    gasPrice: Web3.utils.toWei('6', 'gwei')
  });
  myContract.methods
    .purchase(numToWei(String(_amount), iboData.currency.decimal))
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
// 第二次claim 空投
export const onAirdrop_ = (contractAddress,abi, callback) => {
  let web3_ = new Web3(window.ethereum)
  let myContract = new web3_.eth.Contract(abi, contractAddress);
  myContract.methods
    .withdraw()
    .send({ from: window.CURRENTADDRESS })
    .on('receipt', function() {
      callback(true)
    })
    .on('error', () => {
      callback(false)
    })
}
