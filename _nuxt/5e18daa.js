(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1664:function(e,t,n){"use strict";n.d(t,"a",(function(){return S}));n(90),n(89),n(51),n(117),n(118),n(4);var r=n(6),o=(n(52),n(115),n(116),n(37),n(34)),c=n(12),f=n(26),O=(n(121),n(31)),d=n(9),l=(n(278),n(47),n(290),n(104)),w=n.n(l);var S=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(data,t,n){var r,l,S,m,x,A;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("{}"!==JSON.stringify(data)){e.next=2;break}return e.abrupt("return",!1);case 2:if(d.a.$emit("ONEXERCISE_PENDING",data.bidID),r=window.chainID,l=Object(c.a)(data.token,r),!data.flag){e.next=24;break}return e.next=8,Object(o.i)(l);case 8:return S=e.sent,e.next=11,Object(o.h)(data.long);case 11:return x=e.sent,e.next=14,Object(o.i)(data.long);case 14:if(m=e.sent,A=data.unit&&12!=data.unit?w()((data.vol*Math.pow(10,data.unit)+"").toString()).toFixed():Object(f.k)(data.vol,data.token),!data.approveAddress1){e.next=19;break}return e.next=19,T(S,data.approveAddress1,1e5,(function(e){"failed"===e&&d.a.$emit("CLOSE_STATUS_DIALOG")}));case 19:if(!data.approveAddress2){e.next=22;break}return e.next=22,T(m,data.approveAddress2,1e5,(function(e){"failed"===e&&d.a.$emit("CLOSE_STATUS_DIALOG")}));case 22:e.next=37;break;case 24:return e.next=26,Object(o.i)(l);case 26:return S=e.sent,e.next=29,Object(o.g)();case 29:return x=e.sent,e.next=32,Object(o.i)(data.long);case 32:return m=e.sent,e.next=35,T(S,"ORDER",1e5,(function(e){"failed"===e&&d.a.$emit("CLOSE_STATUS_DIALOG")}));case 35:return e.next=37,T(m,"ORDER",1e5,(function(e){"failed"===e&&d.a.$emit("CLOSE_STATUS_DIALOG")}));case 37:x.methods.exercise(data.flag?A:data.bidID).send({from:window.CURRENTADDRESS}).on("transactionHash",(function(e){d.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,conTit:"Please Confirm the transaction in your wallet",conText:"<p>You will swap<span> ".concat(Object(O.c)(data.show_strikePrice,8)," ").concat(data.token,"</span> to <span> ").concat(Object(O.c)(data.buyVolume,8)," ").concat(data.totoken,"</span></p>")})})).on("receipt",(function(e){window.statusDialog&&(d.a.$emit("CLOSE_STATUS_DIALOG"),d.a.$emit("OPEN_STATUS_DIALOG",{title:"Transation submitted",layout:"layout2",loading:!1,button:!0,buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(e.transactionHash,'" target="_blank">View on BscScan</a>'),showDialog:!1})),n("success")})).on("error",(function(e,t){d.a.$emit("CLOSE_STATUS_DIALOG")}));case 38:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),m=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(t,n){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.c)();case 2:return e.sent,e.next=5,t.methods.allowance(window.CURRENTADDRESS,Object(c.b)(n,window.chainID)).call({from:window.CURRENTADDRESS});case 5:return r=e.sent,e.abrupt("return",window.WEB3.utils.fromWei(r,Object(c.f)()));case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),x=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(t,n){var r,o,f,O=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=O.length>2&&void 0!==O[2]?O[2]:function(e){},e.next=3,Object(c.c)();case 3:return o=e.sent,e.next=6,t.methods.approve(Object(c.b)(n,o),"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({from:window.CURRENTADDRESS}).on("transactionHash",(function(e){r("approve")})).on("receipt",(function(e){r("success")})).on("error",(function(e,t){d.a.$emit("CLOSE_STATUS_DIALOG"),r("failed")}));case 6:return f=e.sent,e.abrupt("return",f);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),T=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(t,n,r,o){var c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t&&n){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,m(t,n);case 4:if(c=e.sent,!(parseInt(c)>=parseInt(r))){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,x(t,n,o);case 9:e.sent;case 10:case"end":return e.stop()}}),e)})));return function(t,n,r,o){return e.apply(this,arguments)}}()}}]);