
import starterLimitAbi from '../../../abi/IBO_StarterLimit.json'
import IBOTest from '../../../abi/ibo_test.json'
import {utils} from "web3";

const StarterLimitAddress = '0x685f36fD01b749788BFa4d2526a77261EF604f3f'

export const iboPools = [
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
    ratio: '1 HELMET = 27,500.0 UFOMO',
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
    ratio: '1 HELMET = 4.0 GAME1',
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
  // {
  //   name: 'TEST',
  //   address: '0x82c8d09aFd9922C38bFF99D6F07C765364c1e726',
  //   abi: IBOTest,
  //   start_at: '1629104850',
  //   is_top: true,
  //   is_coming: false, // is_coming 为 true 则不请求合约
  //   currency: {
  //     address: '0x68944B6333ddcd7AA3f550Fdf80524d32A1A937a',
  //     decimal: 18,
  //     symbol: 'CUSDT',
  //   },
  //   icon: 'game.svg',
  //   type: 1,
  //   isPrivate: true,
  //   underlying: {
  //     address: '0xC78eEfDC4D31A44A45182713d64Dbc8505636CcB',
  //     decimal: 18,
  //     symbol: 'CTT',
  //     name: 'CTT',
  //     total_supply: '100,000,000',
  //     holders: '-',
  //     transfers: '-',
  //   },
  //   amount: '400', // token 总额 总释放
  //   pool_info: {
  //     token_distribution: 'July 30th 2021, 5:00PM SGT',
  //     min_allocation: 100,
  //     max_allocation: 500,
  //     min_swap_level: '100 Helmet',
  //     maxAccount: 200,
  //   },
  //   website: 'https://xnft.net/',
  //   white_paper: 'https://xnft.net/xNFT_Protocol_Whitepaper_EN.pdf',
  //   twitter: 'https://twitter.com/xNFT_Protocol?s=09',
  //   Telegram_Channel: 'https://t.me/xNFT_Global',
  //   Github: '-',
  //   yuque: '-',
  //   progress: 0,
  //   status: 0,
  //   ratio: ' 1 CUSDT = 0.5 CTT',
  //   time: '1629122400',
  //   purchasedCurrencyOf: 0,
  //   totalPurchasedAmount: utils.toWei('400'),//总释放
  //   totalPurchasedUnderlying: '0',
  //   totalPurchasedCurrency: '0',
  //   is_flash: false,
  //   link_url: 'https://xnft.net/', // 跳转外链接
  //   project_introduction:
  //     'The xNFT Protocol is an underlying technology that supports NFT transactions',
  //   duration: '', // 完成时间
  //   totalApplicants: '8', // 申请总人数
  //   winningRate: '-', // 申请中签率
  //   committed: '', // 超募比例
  //   total: '', // 参与资金规模
  //   poolType: 0, // 值为 1 代表定向
  //   networkId: 56
  // },
]