(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{1442:function(t,n,e){"use strict";e.d(n,"l",(function(){return C})),e.d(n,"m",(function(){return w})),e.d(n,"j",(function(){return y})),e.d(n,"k",(function(){return L})),e.d(n,"i",(function(){return D})),e.d(n,"h",(function(){return j})),e.d(n,"f",(function(){return E})),e.d(n,"b",(function(){return I})),e.d(n,"d",(function(){return U})),e.d(n,"e",(function(){return G})),e.d(n,"c",(function(){return $})),e.d(n,"a",(function(){return v})),e.d(n,"g",(function(){return k})),e.d(n,"n",(function(){return P}));var o=e(3),r=e(4),c=(e(33),e(48),e(86),e(87),e(239)),f=e(262),m=e(566),l=e(103),T=(e(1504),e(1510),e(1594)),O=e(1593),S=e(381),h=e(210),_=e(53),A=e.n(_),x=e(5),d=(e(24),"0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D"),C=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,f,m,l,T,O,S;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.ContractAddress,f=n.DepositeVolume,m=n.Decimals,t.next=3,Object(h.f)(c.abi,r);case 3:return l=t.sent,t.next=6,Object(h.i)();case 6:T=t.sent,(O=Object(h.k)(m))?f=Object(h.m)(f,O):(S=new A.a(10).pow(m).toString(),f=new A.a(f).times(S).toString()),console.log(f);try{l.methods.stake(f).send({from:T}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success")})).on("error",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),e("error")}))}catch(t){}case 11:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),w=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,f,m,l,T,O,S;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.ContractAddress,f=n.DepositeVolume,m=n.Decimals,t.next=3,Object(h.f)(c.abi,r);case 3:return l=t.sent,t.next=6,Object(h.i)();case 6:T=t.sent,(O=Object(h.k)(m))?f=Object(h.m)(f,O):(S=new A.a(10).pow(m).toString(),f=new A.a(f).times(S).toString()),console.log(f);try{l.methods.stakeAndCompound(f).send({from:T}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success")})).on("error",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),e("error")}))}catch(t){}case 11:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),y=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(h.f)(c.abi,n);case 2:return r=t.sent,t.next=5,Object(h.i)();case 5:f=t.sent;try{r.methods.getReward().send({from:f}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success")})).on("error",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),e("error")}))}catch(t){}case 7:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),L=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e,r){var c,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(n,e),t.next=3,Object(h.f)(S.abi,n);case 3:return c=t.sent,t.next=6,Object(h.i)();case 6:f=t.sent;try{c.methods.getReward3(e).send({from:f}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),r("success")})).on("error",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),r("error")}))}catch(t){}case 8:case"end":return t.stop()}}),t)})));return function(n,e,o){return t.apply(this,arguments)}}(),D=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(h.f)(c.abi,n);case 2:return r=t.sent,t.next=5,Object(h.i)();case 5:f=t.sent;try{r.methods.getDoubleReward().send({from:f}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success")})).on("error",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),e("error")}))}catch(t){}case 7:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),j=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(h.f)(c.abi,n);case 2:return r=t.sent,t.next=5,Object(h.i)();case 5:f=t.sent;try{r.methods.exit().send({from:f}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success")})).on("error",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),e("error")}))}catch(t){}case 7:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),E=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(h.f)(m.abi,n);case 2:return r=t.sent,t.next=5,Object(h.i)();case 5:c=t.sent;try{r.methods.compound().send({from:c}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success")})).on("error",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),e("error")}))}catch(t){}case 7:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),I=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e,r,c){var m,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(h.f)(f.abi,n);case 2:return m=t.sent,t.next=5,Object(h.i)();case 5:l=t.sent;try{m.methods.approve(e,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({from:l}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">You will approve ').concat(r," to Helmet.insure</a>")})})).on("receipt",(function(t){var n;window.statusDialog&&(x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)));c("success")})).on("error",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),c("error")}))}catch(t){console.log(t)}case 7:case"end":return t.stop()}}),t)})));return function(n,e,o,r){return t.apply(this,arguments)}}(),U=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(data,n){var e,r,c,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(h.f)(l.abi,d);case 2:return e=t.sent,t.next=5,Object(h.i)();case 5:r=t.sent,c=Object(h.e)(data.buyNum,data.currentInsurance),f=data.askID;try{e.methods.buy(f,c).send({from:r}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"<p>Buy <span>".concat(data.showNum," ").concat(data.currentInsurance,"\n                </span> Policys, with the strike price of <span>\n                ").concat(data.show_strikePrice," ").concat(data.settleToken_symbol,"\n                </span></p>")})})).on("receipt",(function(t){var e;window.statusDialog&&(x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(e,"buttonText","Confirm"),Object(o.a)(e,"showDialog",!1),e)));n("success")})).on("error",(function(t,n){x.a.$emit("OPEN_STATUS_DIALOG",{showDialog:!1}),x.a.$emit("CLOSE_STATUS_DIALOG"),callBack("error")}))}catch(t){console.log("error","Buy")}case 9:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),G=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,Object(h.f)(l.abi,d);case 4:return r=t.sent,t.next=7,Object(h.i)();case 7:if(c=t.sent,window.CURRENTADDRESS){t.next=10;break}return t.abrupt("return");case 10:r.methods.cancel(n).send({from:c}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"Cancel your Policy supplying order."})})).on("receipt",(function(t){var n;window.statusDialog&&(x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)));e("success")})).on("error",(function(t,n){e("error")}));case 11:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),$=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,c,f,m,l,O=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=O.length>2&&void 0!==O[2]?O[2]:18,c=O.length>3?O[3]:void 0,t.next=4,Object(h.f)(T,n);case 4:return f=t.sent,t.next=7,Object(h.i)();case 7:m=t.sent,l=Object(h.k)(r),e=Object(h.m)(e,l),console.log(e),f.methods.burn(e).send({from:m}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"Burn your HELMET to get GUARD."})})).on("receipt",(function(t){var n;window.statusDialog&&(x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)));c("success")})).on("error",(function(t,n){c("error")}));case 12:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),v=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e,r){var c,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(h.f)(S.abi,n);case 2:return c=t.sent,t.next=5,Object(h.i)();case 5:f=t.sent,c.methods.applyReward3(e).send({from:f}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"FREE DAYS 0 HELMET for GUARD Credits Confirm."})})).on("receipt",(function(t){var n;x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),r("success")})).on("error",(function(t,n){r("error")}));case 7:case"end":return t.stop()}}),t)})));return function(n,e,o){return t.apply(this,arguments)}}(),k=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,c,f,m,l,T,S;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.ContractAddress,c=n.Pid,f=n.DepositeVolume,console.log(callBack),t.next=4,Object(h.f)(O,r);case 4:return m=t.sent,t.next=7,Object(h.i)();case 7:l=t.sent,console.log(S),T=Object(h.k)(18),S=Object(h.m)(f,T);try{m.methods.deposit(c,S).send({from:l}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;window.statusDialog&&(x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success"))})).on("error",(function(t,n){e("error")}))}catch(t){}case 12:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),P=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,c,f,m,l,T,S;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.ContractAddress,c=n.Pid,f=n.DepositeVolume,t.next=3,Object(h.f)(O,r);case 3:return m=t.sent,t.next=6,Object(h.i)();case 6:l=t.sent,console.log(r,c,f),T=Object(h.k)(18),S=Object(h.m)(f,T);try{m.methods.withdraw(c,S).send({from:l}).on("transactionHash",(function(t){x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;window.statusDialog&&(x.a.$emit("CLOSE_STATUS_DIALOG"),x.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success"))})).on("error",(function(t,n){e("error")}))}catch(t){}case 11:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}()}}]);