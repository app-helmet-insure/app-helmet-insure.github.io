(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1580:function(e,t,n){"use strict";n.d(t,"a",(function(){return S}));n(88),n(87),n(50),n(144),n(145),n(3);var r=n(4),o=(n(44),n(89),n(90),n(30),n(22)),c=n(11),f=n(58),l=(n(115),n(40)),O=n(6),d=(n(253),n(41),n(1308),n(35)),w=n.n(d);var S=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(data,t,n){var r,d,S,m,x,A;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("{}"!==JSON.stringify(data)){e.next=2;break}return e.abrupt("return",!1);case 2:if(console.log(data),O.a.$emit("ONEXERCISE_PENDING",data.bidID),r=window.chainID,d=Object(c.a)(data.token,r),!data.flag){e.next=25;break}return e.next=9,Object(o.k)(d);case 9:return S=e.sent,e.next=12,Object(o.j)(data.long);case 12:return x=e.sent,e.next=15,Object(o.k)(data.long);case 15:if(m=e.sent,A=data.unit&&12!=data.unit?w()((data.vol*Math.pow(10,data.unit)+"").toString()).toFixed():Object(f.i)(data.vol,data.token),!data.approveAddress1){e.next=20;break}return e.next=20,T(S,data.approveAddress1,1e5,(function(e){"failed"===e&&O.a.$emit("CLOSE_STATUS_DIALOG")}));case 20:if(!data.approveAddress2){e.next=23;break}return e.next=23,T(m,data.approveAddress2,1e5,(function(e){"failed"===e&&O.a.$emit("CLOSE_STATUS_DIALOG")}));case 23:e.next=38;break;case 25:return e.next=27,Object(o.k)(d);case 27:return S=e.sent,e.next=30,Object(o.g)();case 30:return x=e.sent,e.next=33,Object(o.k)(data.long);case 33:return m=e.sent,e.next=36,T(S,"ORDER",1e5,(function(e){"failed"===e&&O.a.$emit("CLOSE_STATUS_DIALOG")}));case 36:return e.next=38,T(m,"ORDER",1e5,(function(e){"failed"===e&&O.a.$emit("CLOSE_STATUS_DIALOG")}));case 38:x.methods.exercise(data.flag?A:data.bidID).send({from:window.CURRENTADDRESS}).on("transactionHash",(function(e){O.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,conTit:"Please Confirm the transaction in your wallet",conText:"<p>You will swap<span> ".concat(Object(l.c)(data.show_strikePrice,8)," ").concat(data.token,"</span> to <span> ").concat(Object(l.c)(data.buyVolume,8)," ").concat(data.totoken,"</span></p>")})})).on("receipt",(function(e){window.statusDialog&&(O.a.$emit("CLOSE_STATUS_DIALOG"),O.a.$emit("OPEN_STATUS_DIALOG",{title:"Transation submitted",layout:"layout2",loading:!1,button:!0,buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(e.transactionHash,'" target="_blank">View on BscScan</a>'),showDialog:!1})),n("success")})).on("error",(function(e,t){O.a.$emit("CLOSE_STATUS_DIALOG")}));case 39:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),m=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(t,n){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.c)();case 2:return e.sent,e.next=5,t.methods.allowance(window.CURRENTADDRESS,Object(c.b)(n,window.chainID)).call({from:window.CURRENTADDRESS});case 5:return r=e.sent,e.abrupt("return",window.WEB3.utils.fromWei(r,Object(c.f)()));case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),x=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(t,n){var r,o,f,l=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=l.length>2&&void 0!==l[2]?l[2]:function(e){},e.next=3,Object(c.c)();case 3:return o=e.sent,e.next=6,t.methods.approve(Object(c.b)(n,o),"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({from:window.CURRENTADDRESS}).on("transactionHash",(function(e){r("approve")})).on("receipt",(function(e){r("success")})).on("error",(function(e,t){O.a.$emit("CLOSE_STATUS_DIALOG"),r("failed")}));case 6:return f=e.sent,e.abrupt("return",f);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),T=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(t,n,r,o){var c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t&&n){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,m(t,n);case 4:if(c=e.sent,!(parseInt(c)>=parseInt(r))){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,x(t,n,o);case 9:e.sent;case 10:case"end":return e.stop()}}),e)})));return function(t,n,r,o){return e.apply(this,arguments)}}()}}]);