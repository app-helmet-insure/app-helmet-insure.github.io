(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1752:function(e,t,n){"use strict";n.r(t),n.d(t,"iboPools",(function(){return r}));var y=n(1753),r=(n(1754),[{name:"UFOMO",address:"0x030EfF0f3dDf927CC0471cB6F8e01689AcF49678",abi:y,start_at:"1629115200",is_top:!0,is_coming:!1,currency:{address:"0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",decimal:18,symbol:"HELMET"},icon:"ibo_card_UFOMO@2x.png",underlying:{address:"0xC9354034968F79f181b76a2f8A015fcdbaed2692",decimal:18,symbol:"UFOMO",name:"UFOMO",total_supply:"100,000,000",holders:"-",transfers:"-"},amount:"1100000000",pool_info:{min_allocation:200,max_allocation:500,min_swap_level:"200 Helmet",maxAccount:200},progress:0,status:0,ratio:"1 HELMET = 27,500 UFOMO",time:"1629122400",purchasedCurrencyOf:0,totalPurchasedAmount:"39999999999999600000000",totalPurchasedUnderlying:"0",totalPurchasedCurrency:"0",winningRate:"-",committed:"",total:"",networkId:56},{name:"GAME1",address:"0x7A19bC605116d8843e4757Bb97ac31DD6d49E844",abi:y,start_at:"1629122400",is_coming:!1,currency:{address:"0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",decimal:18,symbol:"HELMET"},icon:"game.svg",underlying:{address:"0x0E52d24c87A5ca4F37E3eE5E16EF5913fb0cCEEB",decimal:18,symbol:"GAME1",name:"GAME1",total_supply:"100,000,000",holders:"-",transfers:"-"},amount:"111111",pool_info:{min_allocation:200,max_allocation:500,min_swap_level:"200 Helmet",maxAccount:200},progress:0,status:0,ratio:"1 HELMET = 4 GAME1",time:"1629126000",purchasedCurrencyOf:0,totalPurchasedAmount:"27777750000000000000000",totalPurchasedUnderlying:"0",totalPurchasedCurrency:"0",duration:"",winningRate:"-",committed:"",total:"",poolType:0,networkId:56},{name:"AXN",address:"0x7A19bC605116d8843e4757Bb97ac31DD6d49E844",abi:y,start_at:"1629460800",is_coming:!0,currency:{address:"0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",decimal:18,symbol:"HELMET"},icon:"AXN.png",underlying:{address:"0x0E52d24c87A5ca4F37E3eE5E16EF5913fb0cCEEB",decimal:18,symbol:"AXN",name:"AXN",total_supply:"100,000,000",holders:"-",transfers:"-"},amount:"30000000000",pool_info:{min_allocation:200,max_allocation:500,min_swap_level:"200 Helmet",maxAccount:200},progress:0,status:0,ratio:"1 HELMET= 750,000 AXN",time:"1629468000",purchasedCurrencyOf:0,totalPurchasedAmount:"27777750000000000000000",totalPurchasedUnderlying:"0",totalPurchasedCurrency:"0",duration:"",winningRate:"-",committed:"",total:"",poolType:0,networkId:56}])},1753:function(e){e.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousGovernor","type":"address"},{"indexed":true,"internalType":"address","name":"newGovernor","type":"address"}],"name":"GovernorshipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"acct","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalCurrency","type":"uint256"}],"name":"Purchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"acct","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"volume","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"}],"name":"Settle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"volume","type":"uint256"}],"name":"Withdrawn","type":"event"},{"stateMutability":"nonpayable","type":"fallback"},{"inputs":[{"internalType":"address","name":"governor_","type":"address"}],"name":"__Governable_init_unchained","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"governor_","type":"address"},{"internalType":"address","name":"currency_","type":"address"},{"internalType":"address","name":"underlying_","type":"address"},{"internalType":"uint256","name":"price_","type":"uint256"},{"internalType":"uint256","name":"time_","type":"uint256"},{"internalType":"uint256","name":"timeSettle_","type":"uint256"}],"name":"__Starter_init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"currency_","type":"address"},{"internalType":"address","name":"underlying_","type":"address"},{"internalType":"uint256","name":"price_","type":"uint256"},{"internalType":"uint256","name":"time_","type":"uint256"},{"internalType":"uint256","name":"timeSettle_","type":"uint256"}],"name":"__Starter_init_unchained","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"amtHigh","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amtLow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"completed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"curUserCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currency","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"}],"name":"getConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"}],"name":"getConfigA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getConfigI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"purchaseHT","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"purchasedCurrencyOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_dst","type":"address"}],"name":"rescueTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfigA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfigI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amtLow_","type":"uint256"},{"internalType":"uint256","name":"amtHigh_","type":"uint256"},{"internalType":"uint256","name":"maxUser_","type":"uint256"}],"name":"setLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"settle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"settleRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"acct","type":"address"}],"name":"settleable","outputs":[{"internalType":"bool","name":"completed_","type":"bool"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"volume","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"settledCurrencyOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"settledUnderlyingOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"time","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeSettle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPurchasedCurrency","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSettleable","outputs":[{"internalType":"bool","name":"completed_","type":"bool"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"volume","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSettledUnderlying","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newGovernor","type":"address"}],"name":"transferGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"underlying","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"volume","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawHT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_dst","type":"address"}],"name":"withdrawHT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawable","outputs":[{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"uint256","name":"vol","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]')},1754:function(e){e.exports=JSON.parse("{}")}}]);