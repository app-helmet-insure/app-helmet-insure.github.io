(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{1301:function(t,n,e){"use strict";e.d(n,"k",(function(){return x})),e.d(n,"i",(function(){return w})),e.d(n,"j",(function(){return C})),e.d(n,"h",(function(){return y})),e.d(n,"g",(function(){return D})),e.d(n,"f",(function(){return L})),e.d(n,"b",(function(){return v})),e.d(n,"d",(function(){return E})),e.d(n,"e",(function(){return G})),e.d(n,"c",(function(){return I})),e.d(n,"a",(function(){return j}));var o=e(3),r=e(5),c=(e(32),e(46),e(89),e(90),e(199)),f=e(239),l=e(333),m=e(100),T=(e(1311),e(1318),e(1323)),O=e(332),A=e(198),S=e(51),h=e.n(S),d=e(4),_=(e(21),"0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D"),x=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,f,l,m,T,O,S;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.ContractAddress,f=n.DepositeVolume,l=n.Decimals,t.next=3,Object(A.f)(c.abi,r);case 3:return m=t.sent,t.next=6,Object(A.i)();case 6:T=t.sent,(O=Object(A.k)(l))?f=Object(A.m)(f,O):(S=new h.a(10).pow(l).toString(),f=new h.a(f).times(S).toString()),console.log(f);try{m.methods.stake(f).send({from:T}).on("transactionHash",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success")})).on("error",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),e("error")}))}catch(t){}case 11:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),w=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(A.f)(c.abi,n);case 2:return r=t.sent,t.next=5,Object(A.i)();case 5:f=t.sent;try{r.methods.getReward().send({from:f}).on("transactionHash",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success")})).on("error",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),e("error")}))}catch(t){}case 7:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),C=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e,r){var c,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(n,e),t.next=3,Object(A.f)(O.abi,n);case 3:return c=t.sent,t.next=6,Object(A.i)();case 6:f=t.sent;try{c.methods.getReward3(e).send({from:f}).on("transactionHash",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),r("success")})).on("error",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),r("error")}))}catch(t){}case 8:case"end":return t.stop()}}),t)})));return function(n,e,o){return t.apply(this,arguments)}}(),y=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(A.f)(c.abi,n);case 2:return r=t.sent,t.next=5,Object(A.i)();case 5:f=t.sent;try{r.methods.getDoubleReward().send({from:f}).on("transactionHash",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success")})).on("error",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),e("error")}))}catch(t){}case 7:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),D=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(A.f)(c.abi,n);case 2:return r=t.sent,t.next=5,Object(A.i)();case 5:f=t.sent;try{r.methods.exit().send({from:f}).on("transactionHash",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success")})).on("error",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),e("error")}))}catch(t){}case 7:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),L=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(A.f)(l.abi,n);case 2:return r=t.sent,t.next=5,Object(A.i)();case 5:c=t.sent;try{r.methods.compound().send({from:c}).on("transactionHash",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">View on BscScan</a>')})})).on("receipt",(function(t){var n;d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),e("success")})).on("error",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),e("error")}))}catch(t){}case 7:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),v=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e,r,c){var l,m;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(A.f)(f.abi,n);case 2:return l=t.sent,t.next=5,Object(A.i)();case 5:m=t.sent;try{l.methods.approve(e,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({from:m}).on("transactionHash",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:'<a href="https://bscscan.com/tx/'.concat(t,'" target="_blank">You will approve ').concat(r," to Helmet.insure</a>")})})).on("receipt",(function(t){var n;window.statusDialog&&(d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)));c("success")})).on("error",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),c("error")}))}catch(t){console.log(t)}case 7:case"end":return t.stop()}}),t)})));return function(n,e,o,r){return t.apply(this,arguments)}}(),E=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(data,n){var e,r,c,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(A.f)(m.abi,_);case 2:return e=t.sent,t.next=5,Object(A.i)();case 5:r=t.sent,c=Object(A.e)(data.buyNum,data.currentInsurance),f=data.askID;try{e.methods.buy(f,c).send({from:r}).on("transactionHash",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"<p>Buy <span>".concat(data.showNum," ").concat(data.currentInsurance,"\n                </span> Policys, with the strike price of <span>\n                ").concat(data.show_strikePrice," ").concat(data.settleToken_symbol,"\n                </span></p>")})})).on("receipt",(function(t){var e;window.statusDialog&&(d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(e,"buttonText","Confirm"),Object(o.a)(e,"showDialog",!1),e)));n("success")})).on("error",(function(t,n){d.a.$emit("OPEN_STATUS_DIALOG",{showDialog:!1}),d.a.$emit("CLOSE_STATUS_DIALOG"),callBack("error")}))}catch(t){console.log("error","Buy")}case 9:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),G=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,Object(A.f)(m.abi,_);case 4:return r=t.sent,t.next=7,Object(A.i)();case 7:if(c=t.sent,window.CURRENTADDRESS){t.next=10;break}return t.abrupt("return");case 10:r.methods.cancel(n).send({from:c}).on("transactionHash",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"Cancel your Policy supplying order."})})).on("receipt",(function(t){var n;window.statusDialog&&(d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)));e("success")})).on("error",(function(t,n){e("error")}));case 11:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),I=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e){var r,c,f,l,m,O=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=O.length>2&&void 0!==O[2]?O[2]:18,c=O.length>3?O[3]:void 0,t.next=4,Object(A.f)(T,n);case 4:return f=t.sent,t.next=7,Object(A.i)();case 7:l=t.sent,m=Object(A.k)(r),e=Object(A.m)(e,m),console.log(e),f.methods.burn(e).send({from:l}).on("transactionHash",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"Burn your HELMET to get GUARD."})})).on("receipt",(function(t){var n;window.statusDialog&&(d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)));c("success")})).on("error",(function(t,n){c("error")}));case 12:case"end":return t.stop()}}),t)})));return function(n,e){return t.apply(this,arguments)}}(),j=function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n,e,r){var c,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(A.f)(O.abi,n);case 2:return c=t.sent,t.next=5,Object(A.i)();case 5:f=t.sent,c.methods.applyReward3(e).send({from:f}).on("transactionHash",(function(t){d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"FREE DAYS 0 HELMET for GUARD Credits Confirm."})})).on("receipt",(function(t){var n;d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",(n={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(o.a)(n,"buttonText","Confirm"),Object(o.a)(n,"showDialog",!1),n)),r("success")})).on("error",(function(t,n){r("error")}));case 7:case"end":return t.stop()}}),t)})));return function(n,e,o){return t.apply(this,arguments)}}()},1319:function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC3UlEQVRoQ+2Z34vTQBDHv5Nc0toTbBXt9RT1DkXEIogHyl39C3zxRf8Wfeub/i364ot/gb1ywokgVRHFqsjVItoTvNomTVaSekd/JdlNNm0Dt5Cn7M7OZ2d2Z3aWkPBGCdcfhwCztqA0C7APF1L42ciCrAxMpoOY5n5OY2S6n0YGmNrGicIuXfzYlQEfCYBtX9fQeXcS6OXAWFpIIaIOsNBC+vIPWntpCo0d6BwKgD2+q2L5WR6KmYcFJezk7jgVNmytiZ3bTbr3xBKVJQzAnh/LAe2zABZEJwvo3wMyX+nW75aIXG4Axhhhc7EAZhZEJhDuS1oDG3sNImI8Y7kAGCsrqDw6D1g5HqHR+6gtlO5/JirbQbICAdyVr6ZXYdvZIGFy/zsQf+tBlggGqGSWY3cbL3LSGlRq7/gtjC/A/w27KndlRaVlPvltbE8A96gsPC3GcNqIEvTQuFPzOmK9AaK6jq1sD2mq2Guimh/093GliQBuhDVeFyMFKZkATrDTr9YmRezJANUjp2H1lkKvmDNQJoAjz8MKkwEq+hXh3GaUVjoAdahkvBmdZgzAzSq/f3E2b7QmG8DRZulcbTSLHQfYWszDNM5E0z4GF3IU0vRvdHOvOajbOMCL9AoM6/hcAujqL7rRqfsDVFKXwOyjcwlAyh8qdd/7A2zqRdgsNZcACnVpw6j5A1S1a5HO/33pcWxiFTatm69mAxBkUp5IzQUQlwvJAOByobg2sQwArk0c1zEqA4DrGJUVyIIUDvOfK5DJSiXCKBg0hieVcGQwGclckDKi/4kzmesDzPAe7AUmlE7LuNCIrrBff9ELzdxZQfRK6QIk/VLvQvTroMksq+y75Ew3dNTClmuFpJcW+xBlBdWHK1OrjyrKLtYf1KUUdw9cKcnl9cEjOrEPHEMQSX5iGgJxI/bbU7CtrHAhbJaPfJOifiKfWWWmO2FlBb7QhBU8rXGHANNaaa95/gHuU4JABGFw5QAAAABJRU5ErkJggg=="},1322:function(t,n,e){"use strict";var o={props:["activeData","activeFlag","activeType"],components:{PHeader:e(331).a},data:function(){return{wraperFlag:!1}},mounted:function(){var t=this;this.$bus.$on("OPEN_WRAPER_PAFE",(function(n){t.wraperFlag=n}))},methods:{}},r=(e(1557),e(20)),component=Object(r.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return t.wraperFlag?e("div",{staticClass:"wraper"},[e("PHeader"),t._v(" "),e("div",{staticClass:"wraper_slot"},[t._t("default",null,{activeData:t.activeData,activeFlag:t.activeFlag,activeType:t.activeType})],2)],1):t._e()}),[],!1,null,"5cb96a46",null);n.a=component.exports},1467:function(t,n,e){var content=e(1558);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(37).default)("e69f6688",content,!0,{sourceMap:!1})},1557:function(t,n,e){"use strict";e(1467)},1558:function(t,n,e){var o=e(36)(!1);o.push([t.i,"@media screen and (min-width:750px){.wraper[data-v-5cb96a46]{display:none}}@media screen and (max-width:750px){.wraper[data-v-5cb96a46]{position:fixed;top:0;left:0;width:100%;height:100vh;overflow:hidden;z-index:12;display:flex;flex-direction:column}body.light .wraper[data-v-5cb96a46]{background:#f8f9fa}body.dark .wraper[data-v-5cb96a46]{background:#121212}.wraper_slot[data-v-5cb96a46]{flex:1;overflow-y:scroll}}",""]),t.exports=o}}]);