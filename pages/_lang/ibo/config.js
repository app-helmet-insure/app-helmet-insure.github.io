import GameIcon from '../../../assets/img/ibo/game.svg'

import starterLimitAbi from '../../../abi/IBO_StarterLimit.json'

const StarterLimitAddress = '0x685f36fD01b749788BFa4d2526a77261EF604f3f'

export const iboPools = [
  {
    name: 'Helmet',
    address: '0x685f36fD01b749788BFa4d2526a77261EF604f3f',
    abi: starterLimitAbi,
    start_at: '1627635600',
    is_top: true,
    is_coming: false, // is_coming 为 true 则不请求合约
    currency: {
      address: '0x68944B6333ddcd7AA3f550Fdf80524d32A1A937a',
      decimal: 18,
      symbol: 'CUSDT',
    },
    icon: '',
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
      min_allocation: 0,
      max_allocation: 666,
      min_swap_level: '66,600 WAR',
    },
    website: 'https://xnft.net/',
    white_paper: 'https://xnft.net/xNFT_Protocol_Whitepaper_EN.pdf',
    twitter: 'https://twitter.com/xNFT_Protocol?s=09',
    Telegram_Channel: 'https://t.me/xNFT_Global',
    Github: '-',
    yuque: '-',
    progress: 0.2,
    status: 0,
    ratio: '1 XXX=0.1 Helmet',
    time: '1627639200',
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: '12500',
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
    networkId: 56,
  },
]