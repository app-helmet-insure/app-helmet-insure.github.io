
import starterLimitAbi from '../../../abi/IBO_StarterLimit.json'
import IBOTest from '../../../abi/ibo_test.json'

const StarterLimitAddress = '0x685f36fD01b749788BFa4d2526a77261EF604f3f'

export const iboPools = [
  {
    name: 'UFOMO',
    address: '0x685f36fD01b749788BFa4d2526a77261EF604f3f',
    abi: starterLimitAbi,
    start_at: '1628906820',
    is_top: true,
    is_coming: false, // is_coming 为 true 则不请求合约
    currency: {
      address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      decimal: 18,
      symbol: 'HELMET',
    },
    icon:'ibo_card_UFOMO@2x.png',
    type: 1,
    isPrivate: true,
    underlying: {//我得到的
      address: '0xC78eEfDC4D31A44A45182713d64Dbc8505636CcB',
      decimal: 18,
      symbol: 'UFOMO',
      name: 'UFOMO',
      total_supply: '100,000,000',
      holders: '-',
      transfers: '-',
    },
    amount: '12500', // token 总额
    pool_info: {
      token_distribution: 'July 30th 2021, 5:00PM SGT',
      min_allocation: 100,
      max_allocation: 500,
      min_swap_level: '100 Helmet',
      maxAccount: 200,
    },
    website: 'https://xnft.net/',
    white_paper: 'https://xnft.net/xNFT_Protocol_Whitepaper_EN.pdf',
    twitter: 'https://twitter.com/xNFT_Protocol?s=09',
    Telegram_Channel: 'https://t.me/xNFT_Global',
    Github: '-',
    yuque: '-',
    progress: 0,
    status: 0,
    ratio: ' 1 HELMET= 27500 UFOMO',
    time: '1629122400',
    purchasedCurrencyOf: 0, // 我的质押
    totalPurchasedAmount: '1100000000',
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',
    is_flash: false,
    link_url: 'https://xnft.net/', // 跳转外链接
    project_introduction:
      'The xNFT Protocol is an underlying technology that supports NFT transactions',
    duration: '', // 完成时间
    totalApplicants: '150', // 申请总人数
    winningRate: '-', // 申请中签率
    committed: '', // 超募比例
    total: '', // 参与资金规模
    poolType: 0, // 值为 1 代表定向
    networkId: 56
  },
  {
    name: 'GAME1',
    address: '0x685f36fD01b749788BFa4d2526a77261EF604f3f',
    abi: starterLimitAbi,
    start_at: '1629122400',
    is_top: true,
    is_coming: false, // is_coming 为 true 则不请求合约
    currency: {
      address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
      decimal: 18,
      symbol: 'HELMET',
    },
    icon: 'game.svg',
    type: 1,
    isPrivate: true,
    underlying: {
      address: '0xC78eEfDC4D31A44A45182713d64Dbc8505636CcB',
      decimal: 18,
      symbol: 'GAME1',
      name: 'GAME1',
      total_supply: '100,000,000',
      holders: '-',
      transfers: '-',
    },
    amount: '12500', // token 总额
    pool_info: {
      token_distribution: 'July 30th 2021, 5:00PM SGT',
      min_allocation: 100,
      max_allocation: 500,
      min_swap_level: '100 Helmet',
      maxAccount: 200,
    },
    website: 'https://xnft.net/',
    white_paper: 'https://xnft.net/xNFT_Protocol_Whitepaper_EN.pdf',
    twitter: 'https://twitter.com/xNFT_Protocol?s=09',
    Telegram_Channel: 'https://t.me/xNFT_Global',
    Github: '-',
    yuque: '-',
    progress: 0,
    status: 0,
    ratio: ' 1 HELMET= 4 GAME1',
    time: '1629122400',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '111111',//总释放
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',
    is_flash: false,
    link_url: 'https://xnft.net/', // 跳转外链接
    project_introduction:
      'The xNFT Protocol is an underlying technology that supports NFT transactions',
    duration: '', // 完成时间
    totalApplicants: '150', // 申请总人数
    winningRate: '-', // 申请中签率
    committed: '', // 超募比例
    total: '', // 参与资金规模
    poolType: 0, // 值为 1 代表定向
    networkId: 56
  },
  {
    name: 'TEST',
    address: '0x685f36fD01b749788BFa4d2526a77261EF604f3f',
    abi: IBOTest,
    start_at: '1629083871',
    is_top: true,
    is_coming: true, // is_coming 为 true 则不请求合约
    currency: {
      address: '0x68944B6333ddcd7AA3f550Fdf80524d32A1A937a',
      decimal: 18,
      symbol: 'CUSDT',
    },
    icon: 'game.svg',
    type: 1,
    isPrivate: true,
    underlying: {
      address: '0xC78eEfDC4D31A44A45182713d64Dbc8505636CcB',
      decimal: 18,
      symbol: 'CTT',
      name: 'CTT',
      total_supply: '100,000,000',
      holders: '-',
      transfers: '-',
    },
    amount: '12500', // token 总额
    pool_info: {
      token_distribution: 'July 30th 2021, 5:00PM SGT',
      min_allocation: 100,
      max_allocation: 500,
      min_swap_level: '100 Helmet',
      maxAccount: 200,
    },
    website: 'https://xnft.net/',
    white_paper: 'https://xnft.net/xNFT_Protocol_Whitepaper_EN.pdf',
    twitter: 'https://twitter.com/xNFT_Protocol?s=09',
    Telegram_Channel: 'https://t.me/xNFT_Global',
    Github: '-',
    yuque: '-',
    progress: 0,
    status: 0,
    ratio: ' 1 HELMET= 4 GAME1',
    time: '1629122400',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '800',//总释放
    totalPurchasedUnderlying: '0',
    totalPurchasedCurrency: '0',
    is_flash: false,
    link_url: 'https://xnft.net/', // 跳转外链接
    project_introduction:
      'The xNFT Protocol is an underlying technology that supports NFT transactions',
    duration: '', // 完成时间
    totalApplicants: '8', // 申请总人数
    winningRate: '-', // 申请中签率
    committed: '', // 超募比例
    total: '', // 参与资金规模
    poolType: 0, // 值为 1 代表定向
    networkId: 56
  },
]