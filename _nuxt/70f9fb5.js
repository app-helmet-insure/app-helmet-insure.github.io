(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1552:function(t,e,n){"use strict";n.d(e,"g",(function(){return _})),n.d(e,"e",(function(){return h})),n.d(e,"f",(function(){return x})),n.d(e,"d",(function(){return v})),n.d(e,"b",(function(){return A})),n.d(e,"c",(function(){return C})),n.d(e,"a",(function(){return L}));var r=n(4),o=n(12),c=(n(42),n(48),n(111),n(112),n(85)),y=n(806),l=n(1578),m=(n(805),n(1564),n(1563),n(1576)),f=(n(1575),n(1577)),d=n(286),T=n(24),w=n(99),O=n.n(w),S=n(233),_=(n(30),function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e,n){var o,y,l,m,f,w,_;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=e.ContractAddress,y=e.DepositeVolume,l=e.Decimals,t.next=3,Object(d.d)(c,o);case 3:return m=t.sent,t.next=6,Object(d.f)();case 6:f=t.sent,(w=Object(d.h)(l))?y=Object(T.k)(y,w):(_=new O.a(10).pow(l).toString(),y=new O.a(y).times(_).toString());try{m.methods.stake(y).send({from:f}).on("transactionHash",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var e;S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(r.a)(e,"buttonText","Confirm"),Object(r.a)(e,"showDialog",!1),e)),n("success")})).on("error",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),n("error")}))}catch(t){}case 10:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),h=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e,n){var o,y;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(d.d)(c,e);case 2:return o=t.sent,t.next=5,Object(d.f)();case 5:y=t.sent;try{o.methods.getReward().send({from:y}).on("transactionHash",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var e;S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(r.a)(e,"buttonText","Confirm"),Object(r.a)(e,"showDialog",!1),e)),n("success")})).on("error",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),n("error")}))}catch(t){}case 7:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),x=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e,n,o){var c,y;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(d.d)(f.abi,e);case 2:return c=t.sent,t.next=5,Object(d.f)();case 5:y=t.sent;try{c.methods.getReward3(n).send({from:y}).on("transactionHash",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var e;S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(r.a)(e,"buttonText","Confirm"),Object(r.a)(e,"showDialog",!1),e)),o("success")})).on("error",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),o("error")}))}catch(t){}case 7:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),v=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e,n){var o,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(d.d)(l.abi,e);case 2:return o=t.sent,t.next=5,Object(d.f)();case 5:c=t.sent;try{o.methods.compound().send({from:c}).on("transactionHash",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var e;S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(r.a)(e,"buttonText","Confirm"),Object(r.a)(e,"showDialog",!1),e)),n("success")})).on("error",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),n("error")}))}catch(t){console.log(t)}case 7:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),A=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e,n,o,c){var l,m;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(d.d)(y.abi,e);case 2:return l=t.sent,t.next=5,Object(d.f)();case 5:m=t.sent;try{l.methods.approve(n,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({from:m}).on("transactionHash",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">You will approve ').concat(o," to Helmet</a>")})})).on("receipt",(function(t){var e;window.statusDialog&&(S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(r.a)(e,"buttonText","Confirm"),Object(r.a)(e,"showDialog",!1),e)));c("success")})).on("error",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),c("error")}))}catch(t){console.log(t)}case 7:case"end":return t.stop()}}),t)})));return function(e,n,r,o){return t.apply(this,arguments)}}(),C=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e,n){var o,c,y,l,f,w=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=w.length>2&&void 0!==w[2]?w[2]:18,c=w.length>3?w[3]:void 0,t.next=4,Object(d.d)(m,e);case 4:return y=t.sent,t.next=7,Object(d.f)();case 7:l=t.sent,f=Object(d.h)(o),n=Object(T.k)(n,f),y.methods.burn(n).send({from:l}).on("transactionHash",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"Burn your HELMET to get GUARD."})})).on("receipt",(function(t){var e;window.statusDialog&&(S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(r.a)(e,"buttonText","Confirm"),Object(r.a)(e,"showDialog",!1),e)));c("success")})).on("error",(function(t,e){c("error")}));case 11:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),L=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e,n,o){var c,y;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(d.d)(f.abi,e);case 2:return c=t.sent,t.next=5,Object(d.f)();case 5:y=t.sent,c.methods.applyReward3(n).send({from:y}).on("transactionHash",(function(t){S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"FREE DAYS 0 HELMET for GUARD Credits Confirm."})})).on("receipt",(function(t){var e;S.a.$emit("CLOSE_STATUS_DIALOG"),S.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(r.a)(e,"buttonText","Confirm"),Object(r.a)(e,"showDialog",!1),e)),o("success")})).on("error",(function(t,e){o("error")}));case 7:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}()},1578:function(t){t.exports=JSON.parse('{"abi":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousGovernor","type":"address"},{"indexed":true,"internalType":"address","name":"newGovernor","type":"address"}],"name":"GovernorshipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"begin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"compound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"}],"name":"getConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"}],"name":"getConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"},{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_ecoAddr","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"governor_","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lep","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lep","type":"uint256"},{"internalType":"uint256","name":"_period","type":"uint256"},{"internalType":"uint256","name":"_span","type":"uint256"},{"internalType":"uint256","name":"_begin","type":"uint256"}],"name":"notifyRewardBegin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"period","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardDelta","outputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newGovernor","type":"address"}],"name":"transferGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]}')}}]);