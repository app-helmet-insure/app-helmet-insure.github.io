(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1243:function(t,e,n){var content=n(1253);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(28).default)("027f3cc6",content,!0,{sourceMap:!1})},1246:function(t,e,n){t.exports=n.p+"img/loading.4b87f4a.png"},1247:function(t,e,n){var map={"./nodata_dark.png":1250,"./nodata_light.png":1251};function o(t){var e=c(t);return n(e)}function c(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}o.keys=function(){return Object.keys(map)},o.resolve=c,t.exports=o,o.id=1247},1248:function(t,e,n){"use strict";n(120),n(85);var o={props:{total:{type:Number,default:0},limit:{type:Number,default:10},page:{type:Number,default:1}},data:function(){return{pageList:[1,2,3,4]}},computed:{pageMax:function(){return Math.ceil(this.total/this.limit)}},created:function(){this.initData()},watch:{page:function(t){if(t<=3){this.pageList=[];var i=1;do{this.pageList.push(i),i++}while(i<=this.pageMax);this.pageList.length>4&&(this.pageList=this.pageList.slice(0,4))}else t===this.pageMax?this.pageList=[t-3,t-2,t-1,t]:t===this.pageMax-1?this.pageList=[t-2,t-1,t,t+1]:this.pageList=[t-1,t,t+1]},total:function(t){this.initData()}},methods:{prevChange:function(){this.page-1<1?this.pageChange(1):this.pageChange(this.page-1)},nextChange:function(){this.page+1>this.pageMax?this.pageChange(this.pageMax):this.pageChange(this.page+1)},pageChange:function(t){this.$emit("page-change",t)},initData:function(){this.pageList=[];var i=1;do{this.pageList.push(i),i++}while(i<=this.pageMax);this.pageList.length>4&&(this.pageList=this.pageList.slice(0,4))}}},c=(n(1252),n(16)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("span",{staticClass:"page_side",staticStyle:{transform:"rotate(180deg)"},on:{click:function(e){return t.prevChange()}}},[n("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-right"}})])]),t._v(" "),t.pageList[2]-2>1?n("span",{staticClass:"page_com"},[t._v("···")]):t._e(),t._v(" "),t._l(t.pageList,(function(e){return n("span",{key:e,staticClass:"page_item",class:t.page==e?"page_active":"",on:{click:function(n){return t.pageChange(e)}}},[t._v(t._s(e))])})),t._v(" "),t.pageMax>4&&t.pageMax-t.page>1?n("span",{staticClass:"page_com"},[t._v("···")]):t._e(),t._v(" "),n("span",{staticClass:"page_side",on:{click:function(e){return t.nextChange()}}},[n("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-right"}})])])],2)}),[],!1,null,"689755a4",null);e.a=component.exports},1250:function(t,e,n){t.exports=n.p+"img/nodata_dark.ed62d69.png"},1251:function(t,e,n){t.exports=n.p+"img/nodata_light.0622e31.png"},1252:function(t,e,n){"use strict";n(1243)},1253:function(t,e,n){var o=n(27)(!1);o.push([t.i,".page[data-v-689755a4]{display:flex;height:30px}.page[data-v-689755a4],.page_item[data-v-689755a4]{align-items:center}.page_item[data-v-689755a4]{display:inline-block;width:28px;height:28px;display:flex;justify-content:center;margin:0 5px;background:transparent;font-weight:500;cursor:pointer}body.light .page_item[data-v-689755a4]{color:#17173a}body.dark .page_item[data-v-689755a4]{color:#e1e1e1}.page .page_active[data-v-689755a4]{border-radius:3px}body.light .page .page_active[data-v-689755a4]{background:#e8e8eb!important}body.dark .page .page_active[data-v-689755a4]{background:#222!important}.page_com[data-v-689755a4]{display:inline-block;font-weight:600;width:28px;display:flex;margin:0 5px;color:#17173a;font-size:12px}.page_com[data-v-689755a4],.page_side[data-v-689755a4]{height:28px;align-items:center;justify-content:center}.page_side[data-v-689755a4]{width:32px;cursor:pointer;flex:1;display:flex}.page_side .icon[data-v-689755a4]{width:20px;height:20px}.page_side .icon[data-v-689755a4]:hover{fill:#17173a!important}",""]),t.exports=o},1265:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB3klEQVRYR2NkgIL///8zMjAwyEExLwMDAzNMjkr0XwYGhs8MDAyPQJiRkfE/yFyQpQz////nYGBgMGJgYBCmkmWEjHnLwMBwjpGR8Qcj1OeWdLQc5jiQI46DHCDPwMCgR8jJNJK/BHKALQMDgwCNLCBk7AeQA7xokOAIWQyT/wtygC+xqkHqsm9mm+5/u9+cFD0gtXaCdqdmaM44ha6PZAfYnLYJP/r+aDSpDrAStFpx1PToslEHUBwC/Y/6lQ69P6SMLQqOvD/i8ubXG01sclSLAlxx73XBy2f7q+1puORp6gBCloMcRTMHeJ7z9NnxZgeKz5kYmX6Ks4nfeP7zuT4sRGjiAGw+B1leqFDYcuLDCQ3k7Ep1B+CzvEe15yJ6eUFVB+AKdpDPQZaDgp1mDiDGcpo5gFjLaeIAUiynugNwWV6kUNTcrdp9CVvhg15iWvNb3ytRKLlLclFMqs9JrSXxVse0thzcKsbVIKGH5TgdQC/LsTqAnARHarwjq0dplH5j+MakeECx9dWvV9owRaCyHV9qp8RyBgYGcKMUpVl+5/sdDutT1g2vfr7SorHlILeDm+UYHROQI+xO2VVGS0WvxZXPKfQ5TDu4YwLqHw5c1wzklAHtnMLCYqC65wDAuI4uVOZ/jgAAAABJRU5ErkJggg=="},1266:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABuUlEQVRYR2NkgIL///8zMjAwyEExLwMDAzNMjkr0XwYGhs8MDAyPQJiRkfE/yFyQpQz////nYGBgMGJgYBCmkmWEjHnLwMBwjpGR8Qcj1OeWdLQc5jiQI46DHCDPwMCgh+7kxxGp2SziYg8lJ7ZuIeQdCuQvgRxgy8DAIIBsyOOIlJxf9x65gcS4LE1n0dARH0AO8EJOcE+iM9J+3r7ng+wgGjriL8gBvsiWvZ00R+/j8jW1///+Y6eHIzAcALKUno7A6gB6OgKnA+jlCLwOoIcjCDqAXEf8OHZS5OOGnYawhMwqKf5GqDD9PHqZQZQDyHHEm55pxh9XbaiHO0Bc9LTc5qXNZDuAVEfQxAGkOIJmDiDWETR1ADGOoLkDCDmCVVb6OdUTIbZqF1exzSoueur3y9dmVM0FuOp9XI5AVs9KjWyIr+FByBFUcwB6CYfsqF937ur9evLcHptDqeaAN91TTT6u3lhHajNs1AFUC4FPa7fIf1y9AaUZR0x0sElKPBDvb8FoYWM0SokxjIpqwI1SjGY5FS0gZBS4WY61Y0JIJ5XkwR0TUP9w4LpmIJ8MaOcUFpQD1T0HANByoi4Pn6HNAAAAAElFTkSuQmCC"},1363:function(t,e,n){var content=n(1550);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(28).default)("76fab27e",content,!0,{sourceMap:!1})},1364:function(t,e,n){var content=n(1552);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(28).default)("41dc514a",content,!0,{sourceMap:!1})},1549:function(t,e,n){"use strict";n(1363)},1550:function(t,e,n){var o=n(27),c=n(65),l=n(1265),r=n(1266),m=o(!1),d=c(l),_=c(r);m.push([t.i,"@media screen and (min-width:750px){.my_claim[data-v-4a97404d]{position:relative;min-height:600px;display:flex;align-items:center;flex-direction:column}.my_claim .claim_item_H5[data-v-4a97404d]{display:none}.my_claim .loading[data-v-4a97404d]{width:100%;margin:auto 0}.my_claim .claim_title[data-v-4a97404d],.my_claim .pages[data-v-4a97404d]{width:100%}.my_claim .claim_text[data-v-4a97404d]{width:100%;display:flex}.my_claim .claim_text span[data-v-4a97404d]{font-size:14px;font-family:PingFangSC-Regular,PingFang SC;line-height:14px;margin-top:16px}body.light .my_claim .claim_text span[data-v-4a97404d]{color:#000}body.dark .my_claim .claim_text span[data-v-4a97404d]{color:#626262}.my_claim .claim_text span[data-v-4a97404d]:first-of-type,.my_claim .claim_text span[data-v-4a97404d]:nth-of-type(2),.my_claim .claim_text span[data-v-4a97404d]:nth-of-type(3){flex:2}.my_claim .claim_text span[data-v-4a97404d]:nth-of-type(4){flex:1}.my_claim .claim_item[data-v-4a97404d]{width:100%;height:90px;margin-top:10px;display:flex;box-shadow:0 4px 8px 0 hsla(0,0%,60.8%,.02);border-radius:5px;align-items:center;padding:0 20px}body.light .my_claim .claim_item[data-v-4a97404d]{background:#fff}body.dark .my_claim .claim_item[data-v-4a97404d]{background:#1d1d1d}.my_claim .claim_item section[data-v-4a97404d]:first-of-type{flex:2}.my_claim .claim_item section:first-of-type>span[data-v-4a97404d]{margin-top:10px;font-size:16px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:24px;display:flex;align-items:center}.my_claim .claim_item section:first-of-type>span i[data-v-4a97404d]{display:inline-block;width:16px;height:16px;background-repeat:no-repeat;background-size:cover;margin-left:4px}.my_claim .claim_item section:first-of-type>span .call_icon[data-v-4a97404d]{background-image:url("+d+")}.my_claim .claim_item section:first-of-type>span .put_icon[data-v-4a97404d]{background-image:url("+_+")}.my_claim .claim_item section:first-of-type>.call_text[data-v-4a97404d]{color:#28a745}.my_claim .claim_item section:first-of-type>.put_text[data-v-4a97404d]{color:#dc3545}.my_claim .claim_item section[data-v-4a97404d]:nth-of-type(2),.my_claim .claim_item section[data-v-4a97404d]:nth-of-type(3){flex:2}.my_claim .claim_item section:nth-of-type(2) span[data-v-4a97404d],.my_claim .claim_item section:nth-of-type(3) span[data-v-4a97404d]{font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:14px}body.light .my_claim .claim_item section:nth-of-type(2) span[data-v-4a97404d],body.light .my_claim .claim_item section:nth-of-type(3) span[data-v-4a97404d]{color:#17173a}body.dark .my_claim .claim_item section:nth-of-type(2) span[data-v-4a97404d],body.dark .my_claim .claim_item section:nth-of-type(3) span[data-v-4a97404d]{color:#e1e1e1}.my_claim .claim_item section[data-v-4a97404d]:nth-of-type(4){flex:1;display:flex;justify-content:flex-end}.my_claim .claim_item section:nth-of-type(4) button[data-v-4a97404d]{padding:0 20px;height:32px;border-radius:3px}body.light .my_claim .claim_item section:nth-of-type(4) button[data-v-4a97404d]{color:#fff;background:#17173a}body.dark .my_claim .claim_item section:nth-of-type(4) button[data-v-4a97404d]{color:#fd7e14;background:#2c2c2c}body.light .my_claim .claim_item section:nth-of-type(4) button[data-v-4a97404d]:hover{background:#2c2c2c}body.dark .my_claim .claim_item section:nth-of-type(4) button[data-v-4a97404d]:hover{background:#333232}}@media screen and (max-width:750px){.my_claim[data-v-4a97404d]{position:relative;display:flex;align-items:center;flex-direction:column;margin:0 10px}.my_claim .claim_item[data-v-4a97404d]{display:none}.my_claim .loading[data-v-4a97404d]{width:100%;margin:auto 0}.my_claim .claim_title[data-v-4a97404d],.my_claim .pages[data-v-4a97404d]{width:100%}.my_claim .claim_title h3[data-v-4a97404d]{height:44px;line-height:55px;padding-left:10px}.my_claim .claim_text[data-v-4a97404d]{display:none}.my_claim .claim_item_H5[data-v-4a97404d]{width:100%;margin-top:10px;display:flex;flex-direction:column;box-shadow:0 4px 8px 0 hsla(0,0%,60.8%,.02);border-radius:5px;padding:20px 16px}body.light .my_claim .claim_item_H5[data-v-4a97404d]{background:#fff}body.dark .my_claim .claim_item_H5[data-v-4a97404d]{background:#1d1d1d}.my_claim .claim_item_H5 section:first-of-type>span[data-v-4a97404d]{margin-top:10px;font-size:16px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:24px;display:flex;align-items:center}.my_claim .claim_item_H5 section:first-of-type>span i[data-v-4a97404d]{display:inline-block;width:16px;height:16px;background-repeat:no-repeat;background-size:cover;margin-left:4px}.my_claim .claim_item_H5 section:first-of-type>span .call_icon[data-v-4a97404d]{background-image:url("+d+")}.my_claim .claim_item_H5 section:first-of-type>span .put_icon[data-v-4a97404d]{background-image:url("+_+")}.my_claim .claim_item_H5 section:first-of-type>.call_text[data-v-4a97404d]{color:#00b900}.my_claim .claim_item_H5 section:first-of-type>.put_text[data-v-4a97404d]{color:#dc3545}.my_claim .claim_item_H5 section[data-v-4a97404d]:nth-of-type(2){display:flex;margin-top:16px}.my_claim .claim_item_H5 section:nth-of-type(2) p[data-v-4a97404d]{display:flex;flex-direction:column;flex:1}.my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-4a97404d]:first-of-type{font-size:14px;font-family:PingFangSC-Regular,PingFang SC;line-height:14px}body.light .my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-4a97404d]:first-of-type{color:#000}body.dark .my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-4a97404d]:first-of-type{color:#626262}.my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-4a97404d]:nth-of-type(2){margin-top:4px;font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:500;line-height:14px}body.light .my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-4a97404d]:nth-of-type(2){color:#17173a}body.dark .my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-4a97404d]:nth-of-type(2){color:#e1e1e1}.my_claim .claim_item_H5 section[data-v-4a97404d]:nth-of-type(3){width:100%;margin-top:16px}.my_claim .claim_item_H5 section:nth-of-type(3) button[data-v-4a97404d]{width:100%;height:40px;border-radius:3px;color:#fff}body.light .my_claim .claim_item_H5 section:nth-of-type(3) button[data-v-4a97404d]{color:#fff;background:#17173a}body.dark .my_claim .claim_item_H5 section:nth-of-type(3) button[data-v-4a97404d]{color:#fd7e14;background:#2c2c2c}body.light .my_claim .claim_item_H5 section:nth-of-type(3) button[data-v-4a97404d]:hover{background:#2c2c2c}body.dark .my_claim .claim_item_H5 section:nth-of-type(3) button[data-v-4a97404d]:hover{background:#333232}}.icon[data-v-4a97404d]{width:24px;height:24px;vertical-align:-.15em;fill:#787878;overflow:hidden}",""]),t.exports=m},1551:function(t,e,n){"use strict";n(1364)},1552:function(t,e,n){var o=n(27)(!1);o.push([t.i,"@media screen and (min-width:750px){.main_container[data-v-5429fd7e]{width:80%;min-width:1026px;margin:20px auto 0}}",""]),t.exports=o},1690:function(t,e,n){"use strict";n.r(e);var o=n(5),c=(n(25),n(120),n(85),n(489),n(31)),l=n(15),r=n(64),m=n(6),d=n(19),_=n(3),f=n(10),h=n(4),y=n(20),v=null,x=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(v){t.next=4;break}return t.next=3,Object(f.b)();case 3:v=t.sent;case 4:return t.abrupt("return",v);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),A=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e,n){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x();case 2:return o=t.sent,t.abrupt("return",o.methods.settleable(e,n).call().then((function(t){return t})));case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),w=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e,n){var o,data,c,r,f,v,address,A=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=A.length>2&&void 0!==A[2]?A[2]:{},data=A.length>3?A[3]:void 0,"{}"!==JSON.stringify(data)){t.next=4;break}return t.abrupt("return",!1);case 4:return c=Object(l.a)(data.col+Number(data.longBalance),8),r=Object(l.a)(data.und,8),t.next=8,x();case 8:return f=t.sent,t.next=11,Object(m.f)(o._collateral);case 11:return v=t.sent,"lovelace"===v?6:18,address=window.CURRENTADDRESS,t.abrupt("return",f.methods.burn(e,Object(d.b)(n,o._collateral)).send({from:address}).on("transactionHash",(function(t){h.a.$emit("CLOSE_STATUS_DIALOG"),h.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"<p>Settlement ".concat(Object(l.a)(data.longBalance)," ").concat(data._collateral,"</p>")})})).on("receipt",(function(t){var e;window.statusDialog?(h.a.$emit("CLOSE_STATUS_DIALOG"),h.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(_.a)(e,"buttonText","Confirm"),Object(_.a)(e,"showDialog",!1),e))):Object(y.a)({message:"".concat(c>0&&data._collateral," ").concat(r>0&&", "+data._underlying," settlement is successful, Please check in the wallet"),type:"success"});h.a.$emit("REFRESH_ALL_DATA"),h.a.$emit("REFRESH_BALANCE")})).on("error",(function(t,e){h.a.$emit("CLOSE_STATUS_DIALOG")})));case 15:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),C=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e,data){var n,o,c,r,address;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("{}"!==JSON.stringify(data)){t.next=2;break}return t.abrupt("return",!1);case 2:return n=Object(l.a)(Number(data.col)+Number(data.longBalance),8),o=Object(l.a)(data.und,8),c=o>0?"<p>Settlement <span>".concat(n>0&&n+data._collateral," ").concat(o>0&&"And"+o+data._underlying,"</span></p>"):"<p>Settlement <span>".concat(n>0&&n+data._collateral,"</span></p>"),t.next=7,x();case 7:return r=t.sent,address=window.CURRENTADDRESS,t.abrupt("return",r.methods.settle(e).send({from:address}).on("transactionHash",(function(t){h.a.$emit("CLOSE_STATUS_DIALOG"),h.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:c})})).on("receipt",(function(t){var e;window.statusDialog?(h.a.$emit("CLOSE_STATUS_DIALOG"),h.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(_.a)(e,"buttonText","Confirm"),Object(_.a)(e,"showDialog",!1),e))):Object(y.a)({message:"".concat(n>0&&data._collateral," ").concat(o>0&&", "+data._underlying," settlement is successful, Please check in the wallet"),type:"success"});h.a.$emit("REFRESH_ALL_DATA"),h.a.$emit("REFRESH_BALANCE")})).on("error",(function(t,e){h.a.$emit("CLOSE_STATUS_DIALOG")})));case 10:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),k={components:{Page:n(1248).a},data:function(){return{precision:c.a,addCommom:l.a,autoRounding:l.b,toRounding:l.k,showList:[],claimList:[],getTokenName:m.e,fixD:l.c,page:0,limit:10,isLoading:!0,isLogin:!1}},computed:{myAboutInfoSell:function(){return this.$store.state.myAboutInfoSell},userInfo:function(){return this.$store.state.userInfo},storeThemes:function(){return this.$store.state.themes}},watch:{myAboutInfoSell:{handler:"myAboutInfoSellWatch",immediate:!0},userInfo:{handler:"userInfoWatch",immediate:!0}},methods:{userInfoWatch:function(t){t&&(this.isLogin=t.data.isLogin)},myAboutInfoSellWatch:function(t){t&&(this.page=0,this.limit=10,this.setSettlementList(t))},setSettlementList:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var o,l,_,f,h,y,v,x,i,w,C,k;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e.isLoading=!0,e.showList=[],o=[],[],{},i=0;case 6:if(!(i<t.length)){n.next=37;break}return l=t[i],h=Object(m.e)(l.longInfo._collateral,window.chainID),n.next=11,Object(r.g)(l.longInfo.long,h);case 11:return _=n.sent,y=Object(m.e)(l.longInfo._underlying,window.chainID),n.next=15,Object(r.g)(l.longInfo.short,h);case 15:if(f=n.sent,"WBNB"==y?y:h,"WBNB"==y?(l.TypeCoin=h,l.type="Call"):(l.TypeCoin=y,l.type="Put"),"BUSD"==y&&"WBNB"==h&&(l.TypeCoin=h,l.type="Call"),"BUSD"==h&&"WBNB"==y&&(l.TypeCoin=y,l.type="Put"),Number(f)>0&&Number(_)>0&&o.push({creator:l.seller,_collateral:h,_underlying:y,col:0,fee:0,und:0,long:l.longInfo.long,short:l.longInfo.short,longBalance:Number(f)>Number(_)?_:f,type:l.type,TypeCoin:l.TypeCoin}),v=c.a.minus(f,_),!(Number(v)>0)){n.next=34;break}return n.prev=23,x=Object(d.b)(v,h),n.next=27,A(l.longInfo.short,x);case 27:"0"===(w=n.sent).col&&"0"===w.und||o.push({creator:l.seller,_collateral:h,_underlying:y,col:Object(d.a)(w.col,h),fee:Object(d.a)(w.fee,h),und:Object(d.a)(w.und,h),long:l.longInfo.long,short:l.longInfo.short,longBalance:0,type:l.type,TypeCoin:l.TypeCoin}),n.next=34;break;case 31:n.prev=31,n.t0=n.catch(23),console.log("setSettlementList##err###",n.t0);case 34:i++,n.next=6;break;case 37:C={},k=[],o.forEach((function(t){C[t._collateral+t._underlying+t.short]||(C[t._collateral+t._underlying+t.short]=1,k.push(t))})),e.isLoading=!1,e.claimList=k,e.showList=k;case 43:case"end":return n.stop()}}),n,null,[[23,31]])})))()},getDownTime:function(time){var t=1*new Date,e=1e3*time,n=(e=new Date(e))-t,o=Math.floor(n/864e5),c=Math.floor((n-24*o*36e5)/36e5),l=Math.floor((n-24*o*36e5-36e5*c)/6e4),r=Math.floor((n-24*o*36e5-36e5*c-6e4*l)/1e3);return"".concat(o,"天").concat(c,"时").concat(l,"分").concat(r,"秒")},toClaim:function(t){var object={title:"WARNING",layout:"layout1",activeTip:!0,activeTipText1:"Please double check the price above，",activeTipText2:"Helmet team will not cover your loss on this.",loading:!1,button:!0,buttonText:"Confirm",showDialog:!0},data=t;if(console.log(data,data.longBalance),0!=data.longBalance)object.conText="<p>Settlement ".concat(Object(l.a)(data.longBalance)," ").concat(data._collateral,"</p>"),this.$bus.$emit("OPEN_STATUS_DIALOG",object),this.$bus.$on("PROCESS_ACTION",(function(t){t&&w(data.short,data.longBalance,{_collateral:data._collateral},data),data={}}));else{var e=Object(l.a)(Number(data.col)+Number(data.longBalance),8),n=Object(l.a)(data.und,8);object.conText=e&&n?"<p>Settlement <span>".concat(e+data._collateral," ").concat("And"+n+data._underlying,"</span></p>"):"<p>Settlement <span>".concat(!e&&n?n+data._underlying:e+data._collateral,"</span></p>"),this.$bus.$emit("OPEN_STATUS_DIALOG",object),this.$bus.$on("PROCESS_ACTION",(function(t){t&&C(data.short,data),data={}}))}},handleClickChagePage:function(t){t-=1,this.page=t;var e=t,n=this.claimList.slice(this.page*this.limit,(e+1)*this.limit);this.showList=n}}},L=(n(1549),n(16)),T={components:{MyClaim:Object(L.a)(k,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"my_claim"},[o("div",{staticClass:"claim_title"},[o("h3",[t._v(t._s(t.$t("Type.Claim")))])]),t._v(" "),t.showList.length?o("div",{staticClass:"claim_text"},[o("span",[t._v(t._s(t.$t("Table.Type")))]),t._v(" "),o("span",[t._v(t._s(t.$t("Table.DenAssets")))]),t._v(" "),o("span",[t._v(t._s(t.$t("Table.BaseAssets")))]),t._v(" "),o("span")]):t._e(),t._v(" "),t.isLogin?t._l(t.showList,(function(e,n){return o("div",{key:n+"key",staticClass:"claim_item"},[o("section",[o("span",{class:"Call"==e.type?"call_text":"put_text"},[t._v("\n          "+t._s(e.TypeCoin)+"\n          "),o("i",{class:"Call"==e.type?"call_icon":"put_icon"})])]),t._v(" "),o("section",["call"==e.type?o("span",[t._v("\n          "+t._s(t.fixD(t.precision.plus(e.col,e.longBalance),8))+"\n          "+t._s(e._collateral)+"\n        ")]):o("span",[t._v("\n          "+t._s(t.fixD(e.und,8))+"\n          "+t._s(e._underlying)+"\n        ")])]),t._v(" "),o("section",["call"==e.type?o("span",[t._v("\n          "+t._s(t.fixD(e.und,8))+"\n          "+t._s(e._underlying)+"\n        ")]):o("span",[t._v("\n          "+t._s(t.fixD(t.precision.plus(e.col,e.longBalance),8))+"\n          "+t._s(e._collateral)+"\n        ")])]),t._v(" "),o("section",[o("button",{on:{click:function(n){return t.toClaim(e)}}},[t._v(t._s(t.$t("Table.GetBack")))])])])})):t._e(),t._v(" "),t._l(t.showList,(function(e,n){return o("div",{key:n+"1",staticClass:"claim_item_H5"},[o("section",[o("span",{class:"Call"==e.type?"call_text":"put_text"},[t._v("\n          "+t._s(e.TypeCoin)+"\n          "),o("i",{class:"Call"==e.type?"call_icon":"put_icon"})])]),t._v(" "),o("section",[o("p",[o("span",[t._v(t._s(t.$t("Table.DenAssets")))]),t._v(" "),"call"==e.type?o("span",[t._v("\n            "+t._s(t.fixD(t.precision.plus(e.col,e.longBalance),8))+"\n            "+t._s(e._collateral)+"\n          ")]):o("span",[t._v("\n            "+t._s(t.fixD(e.und,8))+"\n            "+t._s(e._underlying)+"\n          ")])]),t._v(" "),o("p",[o("span",[t._v(t._s(t.$t("Table.BaseAssets")))]),t._v(" "),"call"==e.type?o("span",[t._v("\n            "+t._s(t.fixD(e.und,8))+"\n            "+t._s(e._underlying)+"\n          ")]):o("span",[t._v("\n            "+t._s(t.fixD(t.precision.plus(e.col,e.longBalance),8))+"\n            "+t._s(e._collateral)+"\n          ")])])]),t._v(" "),o("section",[o("button",{on:{click:function(n){return t.toClaim(e)}}},[t._v(t._s(t.$t("Table.GetBack")))])])])})),t._v(" "),t.isLoading&&t.isLogin?o("div",{staticClass:"loading"},[o("img",{attrs:{src:n(1246)}}),t._v(" "),o("div",{staticClass:"shadow"}),t._v(" "),o("p",[t._v(t._s(t.$t("Table.LoadingWallet")))])]):t._e(),t._v(" "),t.showList.length<1&&!t.isLoading||!t.isLogin?o("section",{staticClass:"noData"},[o("div",[o("img",{attrs:{src:n(1247)("./nodata_"+t.storeThemes+".png"),alt:""}}),t._v(" "),o("p",[t._v(t._s(t.$t("Table.NoData")))])])]):t._e()],2)}),[],!1,null,"4a97404d",null).exports}},S=(n(1551),Object(L.a)(T,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"main_container"},[e("MyClaim")],1)}),[],!1,null,"5429fd7e",null));e.default=S.exports}}]);