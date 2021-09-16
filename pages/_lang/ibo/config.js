
import starterLimitAbi from '../../../abi/IBO_StarterLimit.json'
import AirAllowListAbi from '../../../abi/AirAllowList.json'
import IBOTest from '../../../abi/ibo_test.json'

const StarterLimitAddress = '0x685f36fD01b749788BFa4d2526a77261EF604f3f'

const HELMET_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'

export const iboPools = [
  {
    name: 'MONI',
    address: '0x603366462A39CdbFCE7a7B274f5DA77cb51eA9b0',
    abi: starterLimitAbi,
    start_at: '1631790000',
    is_coming: false, // is_coming 为 true 则不请求合约
    currency: {
      address: HELMET_ADDRESS,
      decimal: 18,
      symbol: 'HELMET',
    },
    icon: 'MONI.png',
    underlying: {
      address: '0x9573c88aE3e37508f87649f87c4dd5373C9F31e0',
      decimal: 18,
      symbol: 'MONI',
      name: 'MONI',
    },
    amount: '175000', // token 总额
    pool_info: {
      min_allocation: 400,
      max_allocation: 1000,
      min_swap_level: '400 Helmet',
      maxAccount: 600,
    },
    progress: 0,
    status: 0,
    ratio: '1 HELMET = 0.675 MONI',
    time: '1634407500',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '259259259259259259175000',//总释放
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',

    duration: '', // 完成时间
    winningRate: '-', // 申请中签率
    committed: '', // 超募比例
    total: '', // 参与资金规模
    poolType: 0, // 值为 1 代表定向
    networkId: 56,
    claimTimeTipI18n: 'IBO.IBO_text47',
    light: true,
    airdrop: { // 空投
      begin: '1634407500',
      address: '0xDCBc091bC91b5b4DFB226C410Dc703dfF6a75eda',
      abi: AirAllowListAbi,
      amount: '175000', // 空投总额
      withdrawList: true,//是否已领取
      allowList: 0//可以领取的量
    }
  },

  {
    name: 'PRB',
    address: '0xE057daBC7630326819390e5D97B69633921cda65',
    abi: starterLimitAbi,
    start_at: '1631617200',
    is_coming: false, // is_coming 为 true 则不请求合约
    currency: {
      address: HELMET_ADDRESS,
      decimal: 18,
      symbol: 'HELMET',
    },
    icon: 'PRB.png',
    underlying: {
      address: '0x59ff585AA42939853E2587b07ee8F94017584A88',
      decimal: 18,
      symbol: 'PRB',
      name: 'PRB',
    },
    amount: '1600000', // token 总额
    pool_info: {
      min_allocation: 200,
      max_allocation: 500,
      min_swap_level: '200 Helmet',
      maxAccount: 200,
    },
    progress: 0,
    status: 0,
    ratio: '1 HELMET = 30 PRB',
    time: '1631802600',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '53333333333333332800000',//总释放
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',

    duration: '', // 完成时间
    winningRate: '-', // 申请中签率
    committed: '', // 超募比例
    total: '', // 参与资金规模
    poolType: 0, // 值为 1 代表定向
    networkId: 56,
    claimTimeTipI18n: 'IBO.IBO_text43',
    light: true
  },
  {
    name: 'PRED',
    address: '0x014e21ee729Bfb9b9D60f424Efcc4A72B9Ef9290',
    abi: starterLimitAbi,
    start_at: '1631538000',
    is_coming: false, // is_coming 为 true 则不请求合约
    currency: {
      address: HELMET_ADDRESS,
      decimal: 18,
      symbol: 'HELMET',
    },
    icon: 'PRED.png',
    underlying: {
      address: '0xbdd2e3fdb879aa42748e9d47b7359323f226ba22',
      decimal: 18,
      symbol: 'PRED',
      name: 'PRED',
    },
    amount: '2000', // token 总额
    pool_info: {
      min_allocation: 200,
      max_allocation: 500,
      min_swap_level: '200 Helmet',
      maxAccount: 300,
    },
    progress: 0,
    status: 0,
    ratio: '1 HELMET = 0.036 PRED',
    time: '1631624400',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '1388888888888888888900000000',//总释放
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',

    duration: '', // 完成时间
    winningRate: '-', // 申请中签率
    committed: '', // 超募比例
    total: '', // 参与资金规模
    poolType: 0, // 值为 1 代表定向
    networkId: 56,
    claimTimeTipI18n: 'IBO.IBO_text42',
    light: true
  },
  {
    name: 'RHINO',
    address: '0xdba27394D07F6C336B45419828Deea02bb166Bd9',
    abi: starterLimitAbi,
    start_at: '1630494000',
    is_coming: false, // is_coming 为 true 则不请求合约
    currency: {
      address: HELMET_ADDRESS,
      decimal: 18,
      symbol: 'HELMET',
    },
    icon: 'RHINO.png',
    underlying: {
      address: '0x0a95a36655424c46dB3aaeF0776961049Da722d1',
      decimal: 18,
      symbol: 'RHINO',
      name: 'RHINO',
    },
    amount: '50000000', // token 总额
    pool_info: {
      min_allocation: 200,
      max_allocation: 500,
      min_swap_level: '200 Helmet',
      maxAccount: 200,
    },
    progress: 0,
    status: 0,
    ratio: '1 HELMET = 1,800 DSN',
    time: '1630501200',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '27777777777777800000000',//总释放
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',

    duration: '', // 完成时间
    winningRate: '-', // 申请中签率
    committed: '', // 超募比例
    total: '', // 参与资金规模
    poolType: 0, // 值为 1 代表定向
    networkId: 56,
    claimTimeTipI18n: 'IBO.IBO_text40',
    light: false
  },
  {
    name: 'DSN',
    address: '0x374fBC93F4b835572CD4927ffF7D2d7C4a0245f3',
    abi: starterLimitAbi,
    start_at: '1630321200',
    is_coming: false, // is_coming 为 true 则不请求合约
    currency: {
      address: HELMET_ADDRESS,
      decimal: 18,
      symbol: 'HELMET',
    },
    icon: 'DSN.png',
    underlying: {
      address: '0x53f7C1dC33A6dBFCaDbBB07391D488D4Edca7Ff4',
      decimal: 18,
      symbol: 'DSN',
      name: 'DSN',
    },
    amount: '16558500', // token 总额
    pool_info: {
      min_allocation: 200,
      max_allocation: 500,
      min_swap_level: '200 Helmet',
      maxAccount: 200,
    },
    progress: 0,
    status: 0,
    ratio: '1 HELMET= 415 DSN',
    time: '1630328400',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '39900000000000008778000',//总释放
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',

    duration: '', // 完成时间
    winningRate: '-', // 申请中签率
    committed: '', // 超募比例
    total: '', // 参与资金规模
    poolType: 0, // 值为 1 代表定向
    networkId: 56,
    claimTimeTipI18n: 'IBO.IBO_text38'
  },
  {
    name: 'AXN',
    address: '0xa1D653b0fd3E56F7c389a6132472A9c2F37157A3',
    abi: starterLimitAbi,
    start_at: '1629460800',
    is_coming: false, // is_coming 为 true 则不请求合约
    currency: {
      address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      decimal: 18,
      symbol: 'HELMET',
    },
    icon: 'AXN.png',
    underlying: {
      address: '0x3A05E86c25366031d92e013Cac77Ff6c261cb09B',
      decimal: 9,
      symbol: 'AXN',
      name: 'AXN',
    },
    amount: '30000000000', // token 总额
    pool_info: {
      min_allocation: 200,
      max_allocation: 500,
      min_swap_level: '200 Helmet',
      maxAccount: 200,
    },
    progress: 0,
    status: 0,
    ratio: '1 HELMET= 750,000 AXN',
    time: '1629468000',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '27777750000000000000000',//总释放
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',

    duration: '', // 完成时间
    winningRate: '-', // 申请中签率
    committed: '', // 超募比例
    total: '', // 参与资金规模
    poolType: 0, // 值为 1 代表定向
    networkId: 56,
    claimTimeTipI18n: 'IBO.IBO_text37'
  },
  {
    name: 'UFOMO',
    address: '0x030EfF0f3dDf927CC0471cB6F8e01689AcF49678',
    abi: starterLimitAbi,
    start_at: '1629115200',
    is_top: true,
    is_coming: false, // is_coming 为 true 则不请求合约
    currency: {
      address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      decimal: 18,
      symbol: 'HELMET',
    },
    icon:'ibo_card_UFOMO@2x.png',
    underlying: {//我得到的
      address: '0xC9354034968F79f181b76a2f8A015fcdbaed2692',
      decimal: 18,
      symbol: 'UFOMO',
      name: 'UFOMO',
    },
    amount: '1100000000', // token 总额
    pool_info: {
      min_allocation: 200,
      max_allocation: 500,
      min_swap_level: '200 Helmet',
      maxAccount: 200,
    },
    progress: 0,
    status: 0,
    ratio: '1 HELMET = 27,500 UFOMO',
    time: '1629122400',
    purchasedCurrencyOf: 0, // 我的质押
    totalPurchasedAmount: '39999999999999600000000',
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',
    winningRate: '-', // 申请中签率
    committed: '', // 超募比例
    total: '', // 参与资金规模
    networkId: 56
  },
  {
    name: 'GAME1',
    address: '0x7A19bC605116d8843e4757Bb97ac31DD6d49E844',
    abi: starterLimitAbi,
    start_at: '1629122400',
    is_coming: false, // is_coming 为 true 则不请求合约
    currency: {
      address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      decimal: 18,
      symbol: 'HELMET',
    },
    icon: 'game.svg',
    underlying: {
      address: '0x0E52d24c87A5ca4F37E3eE5E16EF5913fb0cCEEB',
      decimal: 18,
      symbol: 'GAME1',
      name: 'GAME1',
    },
    amount: '111111', // token 总额
    pool_info: {
      min_allocation: 200,
      max_allocation: 500,
      min_swap_level: '200 Helmet',
      maxAccount: 200,
    },
    progress: 0,
    status: 0,
    ratio: '1 HELMET = 4 GAME1',
    time: '1629126000',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '27777750000000000000000',//总释放
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',

    duration: '', // 完成时间
    winningRate: '-', // 申请中签率
    committed: '', // 超募比例
    total: '', // 参与资金规模
    poolType: 0, // 值为 1 代表定向
    networkId: 56
  },
]
