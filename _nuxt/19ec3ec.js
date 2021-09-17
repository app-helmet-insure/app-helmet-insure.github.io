(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{1523:function(t){t.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousGovernor","type":"address"},{"indexed":true,"internalType":"address","name":"newGovernor","type":"address"}],"name":"GovernorshipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"acct","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalCurrency","type":"uint256"}],"name":"Purchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"acct","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"volume","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"}],"name":"Settle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"volume","type":"uint256"}],"name":"Withdrawn","type":"event"},{"stateMutability":"nonpayable","type":"fallback"},{"inputs":[{"internalType":"address","name":"governor_","type":"address"}],"name":"__Governable_init_unchained","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"governor_","type":"address"},{"internalType":"address","name":"currency_","type":"address"},{"internalType":"address","name":"underlying_","type":"address"},{"internalType":"uint256","name":"price_","type":"uint256"},{"internalType":"uint256","name":"time_","type":"uint256"},{"internalType":"uint256","name":"timeSettle_","type":"uint256"}],"name":"__Starter_init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"currency_","type":"address"},{"internalType":"address","name":"underlying_","type":"address"},{"internalType":"uint256","name":"price_","type":"uint256"},{"internalType":"uint256","name":"time_","type":"uint256"},{"internalType":"uint256","name":"timeSettle_","type":"uint256"}],"name":"__Starter_init_unchained","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"amtHigh","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amtLow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"completed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"curUserCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currency","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"}],"name":"getConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"}],"name":"getConfigA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getConfigI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"purchaseHT","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"purchasedCurrencyOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_dst","type":"address"}],"name":"rescueTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfigA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfigI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amtLow_","type":"uint256"},{"internalType":"uint256","name":"amtHigh_","type":"uint256"},{"internalType":"uint256","name":"maxUser_","type":"uint256"}],"name":"setLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"settle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"settleRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"acct","type":"address"}],"name":"settleable","outputs":[{"internalType":"bool","name":"completed_","type":"bool"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"volume","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"settledCurrencyOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"settledUnderlyingOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"time","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeSettle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPurchasedCurrency","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSettleable","outputs":[{"internalType":"bool","name":"completed_","type":"bool"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"volume","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSettledUnderlying","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newGovernor","type":"address"}],"name":"transferGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"underlying","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"volume","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawHT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_dst","type":"address"}],"name":"withdrawHT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawable","outputs":[{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"uint256","name":"vol","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]')},1609:function(t,e,n){"use strict";n.r(e),n.d(e,"iboPools",(function(){return r}));var y=n(1523),r=[{name:"UFOMO",address:"0x685f36fD01b749788BFa4d2526a77261EF604f3f",abi:y,start_at:"1629115200",is_top:!0,is_coming:!0,currency:{address:"0x68944B6333ddcd7AA3f550Fdf80524d32A1A937a",decimal:18,symbol:"CUSDT"},totalPurchasedAmountSymbol:"UFOMO",icon:"ibo_card_UFOMO@2x.png",type:1,isPrivate:!0,underlying:{address:"0xC78eEfDC4D31A44A45182713d64Dbc8505636CcB",decimal:18,symbol:"HELMET",name:"HELMET",total_supply:"100,000,000",holders:"-",transfers:"-"},amount:"12500",pool_info:{token_distribution:"July 30th 2021, 5:00PM SGT",min_allocation:100,max_allocation:500,min_swap_level:"100 Helmet",maxAccount:200},website:"https://xnft.net/",white_paper:"https://xnft.net/xNFT_Protocol_Whitepaper_EN.pdf",twitter:"https://twitter.com/xNFT_Protocol?s=09",Telegram_Channel:"https://t.me/xNFT_Global",Github:"-",yuque:"-",progress:0,status:0,ratio:" 1 HELMET= 27500 UFOMO",time:"1629122400",purchasedCurrencyOf:0,totalPurchasedAmount:"1100000000",totalPurchasedUnderlying:"0",totalPurchasedCurrency:"0",is_flash:!1,link_url:"https://xnft.net/",project_introduction:"The xNFT Protocol is an underlying technology that supports NFT transactions",duration:"",totalApplicants:"150",winningRate:"-",committed:"",total:"",poolType:0,networkId:56},{name:"GAME1",totalPurchasedAmountSymbol:"GAME1",address:"0x685f36fD01b749788BFa4d2526a77261EF604f3f",abi:y,start_at:"1629122400",is_top:!0,is_coming:!0,currency:{address:"0x68944B6333ddcd7AA3f550Fdf80524d32A1A937a",decimal:18,symbol:"CUSDT"},icon:"game.svg",type:1,isPrivate:!0,underlying:{address:"0xC78eEfDC4D31A44A45182713d64Dbc8505636CcB",decimal:18,symbol:"HELMET",name:"HELMET",total_supply:"100,000,000",holders:"-",transfers:"-"},amount:"12500",pool_info:{token_distribution:"July 30th 2021, 5:00PM SGT",min_allocation:100,max_allocation:500,min_swap_level:"100 Helmet",maxAccount:200},website:"https://xnft.net/",white_paper:"https://xnft.net/xNFT_Protocol_Whitepaper_EN.pdf",twitter:"https://twitter.com/xNFT_Protocol?s=09",Telegram_Channel:"https://t.me/xNFT_Global",Github:"-",yuque:"-",progress:0,status:0,ratio:" 1 HELMET= 4 GAME1",time:"1629122400",purchasedCurrencyOf:0,totalPurchasedAmount:"111111",totalPurchasedUnderlying:"0",totalPurchasedCurrency:"0",is_flash:!1,link_url:"https://xnft.net/",project_introduction:"The xNFT Protocol is an underlying technology that supports NFT transactions",duration:"",totalApplicants:"150",winningRate:"-",committed:"",total:"",poolType:0,networkId:56}]}}]);