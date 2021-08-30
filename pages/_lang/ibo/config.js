
import starterLimitAbi from '../../../abi/IBO_StarterLimit.json'
import IBOTest from '../../../abi/ibo_test.json'

const StarterLimitAddress = '0x685f36fD01b749788BFa4d2526a77261EF604f3f'

const HELMET_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'

export const iboPools = [
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
      total_supply: '100,000,000',
      holders: '-',
      transfers: '-',
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
      total_supply: '100,000,000',
      holders: '-',
      transfers: '-',
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
      total_supply: '100,000,000',
      holders: '-',
      transfers: '-',
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
      total_supply: '100,000,000',
      holders: '-',
      transfers: '-',
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