(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1433:function(t,e,n){var content=n(1450);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("027f3cc6",content,!0,{sourceMap:!1})},1438:function(t,e,n){t.exports=n.p+"img/loading.4b87f4a.png"},1439:function(t,e,n){var map={"./nodata_dark.png":1447,"./nodata_light.png":1448};function c(t){var e=o(t);return n(e)}function o(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}c.keys=function(){return Object.keys(map)},c.resolve=o,t.exports=c,c.id=1439},1442:function(t,e,n){"use strict";n(173),n(106);var c={props:{total:{type:Number,default:0},limit:{type:Number,default:10},page:{type:Number,default:1}},data:function(){return{pageList:[1,2,3,4]}},computed:{pageMax:function(){return Math.ceil(this.total/this.limit)}},created:function(){this.initData()},watch:{page:function(t){if(t<=3){this.pageList=[];var i=1;do{this.pageList.push(i),i++}while(i<=this.pageMax);this.pageList.length>4&&(this.pageList=this.pageList.slice(0,4))}else t===this.pageMax?this.pageList=[t-3,t-2,t-1,t]:t===this.pageMax-1?this.pageList=[t-2,t-1,t,t+1]:this.pageList=[t-1,t,t+1]},total:function(t){this.initData()}},methods:{prevChange:function(){this.page-1<1?this.pageChange(1):this.pageChange(this.page-1)},nextChange:function(){this.page+1>this.pageMax?this.pageChange(this.pageMax):this.pageChange(this.page+1)},pageChange:function(t){this.$emit("page-change",t)},initData:function(){this.pageList=[];var i=1;do{this.pageList.push(i),i++}while(i<=this.pageMax);this.pageList.length>4&&(this.pageList=this.pageList.slice(0,4))}}},o=(n(1449),n(20)),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("span",{staticClass:"page_side",staticStyle:{transform:"rotate(180deg)"},on:{click:function(e){return t.prevChange()}}},[n("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-right"}})])]),t._v(" "),t.pageList[2]-2>1?n("span",{staticClass:"page_com"},[t._v("···")]):t._e(),t._v(" "),t._l(t.pageList,(function(e){return n("span",{key:e,staticClass:"page_item",class:t.page==e?"page_active":"",on:{click:function(n){return t.pageChange(e)}}},[t._v(t._s(e))])})),t._v(" "),t.pageMax>4&&t.pageMax-t.page>1?n("span",{staticClass:"page_com"},[t._v("···")]):t._e(),t._v(" "),n("span",{staticClass:"page_side",on:{click:function(e){return t.nextChange()}}},[n("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-right"}})])])],2)}),[],!1,null,"689755a4",null);e.a=component.exports},1447:function(t,e,n){t.exports=n.p+"img/nodata_dark.ed62d69.png"},1448:function(t,e,n){t.exports=n.p+"img/nodata_light.0622e31.png"},1449:function(t,e,n){"use strict";n(1433)},1450:function(t,e,n){var c=n(32)(!1);c.push([t.i,".page[data-v-689755a4]{display:flex;height:30px}.page[data-v-689755a4],.page_item[data-v-689755a4]{align-items:center}.page_item[data-v-689755a4]{display:inline-block;width:28px;height:28px;display:flex;justify-content:center;margin:0 5px;background:transparent;font-weight:500;cursor:pointer}body.light .page_item[data-v-689755a4]{color:#17173a}body.dark .page_item[data-v-689755a4]{color:#e1e1e1}.page .page_active[data-v-689755a4]{border-radius:3px}body.light .page .page_active[data-v-689755a4]{background:#e8e8eb!important}body.dark .page .page_active[data-v-689755a4]{background:#222!important}.page_com[data-v-689755a4]{display:inline-block;font-weight:600;width:28px;display:flex;margin:0 5px;color:#17173a;font-size:12px}.page_com[data-v-689755a4],.page_side[data-v-689755a4]{height:28px;align-items:center;justify-content:center}.page_side[data-v-689755a4]{width:32px;cursor:pointer;flex:1;display:flex}.page_side .icon[data-v-689755a4]{width:20px;height:20px}.page_side .icon[data-v-689755a4]:hover{fill:#17173a!important}",""]),t.exports=c},1496:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB3klEQVRYR2NkgIL///8zMjAwyEExLwMDAzNMjkr0XwYGhs8MDAyPQJiRkfE/yFyQpQz////nYGBgMGJgYBCmkmWEjHnLwMBwjpGR8Qcj1OeWdLQc5jiQI46DHCDPwMCgR8jJNJK/BHKALQMDgwCNLCBk7AeQA7xokOAIWQyT/wtygC+xqkHqsm9mm+5/u9+cFD0gtXaCdqdmaM44ha6PZAfYnLYJP/r+aDSpDrAStFpx1PToslEHUBwC/Y/6lQ69P6SMLQqOvD/i8ubXG01sclSLAlxx73XBy2f7q+1puORp6gBCloMcRTMHeJ7z9NnxZgeKz5kYmX6Ks4nfeP7zuT4sRGjiAGw+B1leqFDYcuLDCQ3k7Ep1B+CzvEe15yJ6eUFVB+AKdpDPQZaDgp1mDiDGcpo5gFjLaeIAUiynugNwWV6kUNTcrdp9CVvhg15iWvNb3ytRKLlLclFMqs9JrSXxVse0thzcKsbVIKGH5TgdQC/LsTqAnARHarwjq0dplH5j+MakeECx9dWvV9owRaCyHV9qp8RyBgYGcKMUpVl+5/sdDutT1g2vfr7SorHlILeDm+UYHROQI+xO2VVGS0WvxZXPKfQ5TDu4YwLqHw5c1wzklAHtnMLCYqC65wDAuI4uVOZ/jgAAAABJRU5ErkJggg=="},1497:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABuUlEQVRYR2NkgIL///8zMjAwyEExLwMDAzNMjkr0XwYGhs8MDAyPQJiRkfE/yFyQpQz////nYGBgMGJgYBCmkmWEjHnLwMBwjpGR8Qcj1OeWdLQc5jiQI46DHCDPwMCgh+7kxxGp2SziYg8lJ7ZuIeQdCuQvgRxgy8DAIIBsyOOIlJxf9x65gcS4LE1n0dARH0AO8EJOcE+iM9J+3r7ng+wgGjriL8gBvsiWvZ00R+/j8jW1///+Y6eHIzAcALKUno7A6gB6OgKnA+jlCLwOoIcjCDqAXEf8OHZS5OOGnYawhMwqKf5GqDD9PHqZQZQDyHHEm55pxh9XbaiHO0Bc9LTc5qXNZDuAVEfQxAGkOIJmDiDWETR1ADGOoLkDCDmCVVb6OdUTIbZqF1exzSoueur3y9dmVM0FuOp9XI5AVs9KjWyIr+FByBFUcwB6CYfsqF937ur9evLcHptDqeaAN91TTT6u3lhHajNs1AFUC4FPa7fIf1y9AaUZR0x0sElKPBDvb8FoYWM0SokxjIpqwI1SjGY5FS0gZBS4WY61Y0JIJ5XkwR0TUP9w4LpmIJ8MaOcUFpQD1T0HANByoi4Pn6HNAAAAAElFTkSuQmCC"},1659:function(t,e,n){var content=n(1856);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("8287847e",content,!0,{sourceMap:!1})},1660:function(t,e,n){var content=n(1858);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("85f0ccd6",content,!0,{sourceMap:!1})},1855:function(t,e,n){"use strict";n(1659)},1856:function(t,e,n){var c=n(32),o=n(87),l=n(1496),r=n(1497),m=c(!1),d=o(l),_=o(r);m.push([t.i,"@media screen and (min-width:750px){.my_claim[data-v-07da762c]{position:relative;min-height:600px;display:flex;align-items:center;flex-direction:column}.my_claim .claim_item_H5[data-v-07da762c]{display:none}.my_claim .loading[data-v-07da762c]{width:100%;margin:auto 0}.my_claim .claim_title[data-v-07da762c],.my_claim .pages[data-v-07da762c]{width:100%}.my_claim .claim_text[data-v-07da762c]{width:100%;display:flex}.my_claim .claim_text span[data-v-07da762c]{font-size:14px;font-family:PingFangSC-Regular,PingFang SC;line-height:14px;margin-top:16px}body.light .my_claim .claim_text span[data-v-07da762c]{color:#000}body.dark .my_claim .claim_text span[data-v-07da762c]{color:#626262}.my_claim .claim_text span[data-v-07da762c]:first-of-type,.my_claim .claim_text span[data-v-07da762c]:nth-of-type(2),.my_claim .claim_text span[data-v-07da762c]:nth-of-type(3){flex:2}.my_claim .claim_text span[data-v-07da762c]:nth-of-type(4){flex:1}.my_claim .claim_item[data-v-07da762c]{width:100%;height:90px;margin-top:10px;display:flex;box-shadow:0 4px 8px 0 hsla(0,0%,60.8%,.02);border-radius:5px;align-items:center;padding:0 20px}body.light .my_claim .claim_item[data-v-07da762c]{background:#fff}body.dark .my_claim .claim_item[data-v-07da762c]{background:#1d1d1d}.my_claim .claim_item section[data-v-07da762c]:first-of-type{flex:2}.my_claim .claim_item section:first-of-type>span[data-v-07da762c]{margin-top:10px;font-size:16px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:24px;display:flex;align-items:center}.my_claim .claim_item section:first-of-type>span i[data-v-07da762c]{display:inline-block;width:16px;height:16px;background-repeat:no-repeat;background-size:cover;margin-left:4px}.my_claim .claim_item section:first-of-type>span .call_icon[data-v-07da762c]{background-image:url("+d+")}.my_claim .claim_item section:first-of-type>span .put_icon[data-v-07da762c]{background-image:url("+_+")}.my_claim .claim_item section:first-of-type>.call_text[data-v-07da762c]{color:#28a745}.my_claim .claim_item section:first-of-type>.put_text[data-v-07da762c]{color:#dc3545}.my_claim .claim_item section[data-v-07da762c]:nth-of-type(2),.my_claim .claim_item section[data-v-07da762c]:nth-of-type(3){flex:2}.my_claim .claim_item section:nth-of-type(2) span[data-v-07da762c],.my_claim .claim_item section:nth-of-type(3) span[data-v-07da762c]{font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:14px}body.light .my_claim .claim_item section:nth-of-type(2) span[data-v-07da762c],body.light .my_claim .claim_item section:nth-of-type(3) span[data-v-07da762c]{color:#17173a}body.dark .my_claim .claim_item section:nth-of-type(2) span[data-v-07da762c],body.dark .my_claim .claim_item section:nth-of-type(3) span[data-v-07da762c]{color:#e1e1e1}.my_claim .claim_item section[data-v-07da762c]:nth-of-type(4){flex:1;display:flex;justify-content:flex-end}.my_claim .claim_item section:nth-of-type(4) button[data-v-07da762c]{padding:0 20px;height:32px;border-radius:3px}body.light .my_claim .claim_item section:nth-of-type(4) button[data-v-07da762c]{color:#fff;background:#17173a}body.dark .my_claim .claim_item section:nth-of-type(4) button[data-v-07da762c]{color:#fd7e14;background:#2c2c2c}body.light .my_claim .claim_item section:nth-of-type(4) button[data-v-07da762c]:hover{background:#2c2c2c}body.dark .my_claim .claim_item section:nth-of-type(4) button[data-v-07da762c]:hover{background:#333232}}@media screen and (max-width:750px){.my_claim[data-v-07da762c]{position:relative;display:flex;align-items:center;flex-direction:column;margin:0 10px}.my_claim .claim_item[data-v-07da762c]{display:none}.my_claim .loading[data-v-07da762c]{width:100%;margin:auto 0}.my_claim .claim_title[data-v-07da762c],.my_claim .pages[data-v-07da762c]{width:100%}.my_claim .claim_title h3[data-v-07da762c]{height:44px;line-height:55px;padding-left:10px}.my_claim .claim_text[data-v-07da762c]{display:none}.my_claim .claim_item_H5[data-v-07da762c]{width:100%;margin-top:10px;display:flex;flex-direction:column;box-shadow:0 4px 8px 0 hsla(0,0%,60.8%,.02);border-radius:5px;padding:20px 16px}body.light .my_claim .claim_item_H5[data-v-07da762c]{background:#fff}body.dark .my_claim .claim_item_H5[data-v-07da762c]{background:#1d1d1d}.my_claim .claim_item_H5 section:first-of-type>span[data-v-07da762c]{margin-top:10px;font-size:16px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:24px;display:flex;align-items:center}.my_claim .claim_item_H5 section:first-of-type>span i[data-v-07da762c]{display:inline-block;width:16px;height:16px;background-repeat:no-repeat;background-size:cover;margin-left:4px}.my_claim .claim_item_H5 section:first-of-type>span .call_icon[data-v-07da762c]{background-image:url("+d+")}.my_claim .claim_item_H5 section:first-of-type>span .put_icon[data-v-07da762c]{background-image:url("+_+")}.my_claim .claim_item_H5 section:first-of-type>.call_text[data-v-07da762c]{color:#00b900}.my_claim .claim_item_H5 section:first-of-type>.put_text[data-v-07da762c]{color:#dc3545}.my_claim .claim_item_H5 section[data-v-07da762c]:nth-of-type(2){display:flex;margin-top:16px}.my_claim .claim_item_H5 section:nth-of-type(2) p[data-v-07da762c]{display:flex;flex-direction:column;flex:1}.my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-07da762c]:first-of-type{font-size:14px;font-family:PingFangSC-Regular,PingFang SC;line-height:14px}body.light .my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-07da762c]:first-of-type{color:#000}body.dark .my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-07da762c]:first-of-type{color:#626262}.my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-07da762c]:nth-of-type(2){margin-top:4px;font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:500;line-height:14px}body.light .my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-07da762c]:nth-of-type(2){color:#17173a}body.dark .my_claim .claim_item_H5 section:nth-of-type(2) span[data-v-07da762c]:nth-of-type(2){color:#e1e1e1}.my_claim .claim_item_H5 section[data-v-07da762c]:nth-of-type(3){width:100%;margin-top:16px}.my_claim .claim_item_H5 section:nth-of-type(3) button[data-v-07da762c]{width:100%;height:40px;border-radius:3px;color:#fff}body.light .my_claim .claim_item_H5 section:nth-of-type(3) button[data-v-07da762c]{color:#fff;background:#17173a}body.dark .my_claim .claim_item_H5 section:nth-of-type(3) button[data-v-07da762c]{color:#fd7e14;background:#2c2c2c}body.light .my_claim .claim_item_H5 section:nth-of-type(3) button[data-v-07da762c]:hover{background:#2c2c2c}body.dark .my_claim .claim_item_H5 section:nth-of-type(3) button[data-v-07da762c]:hover{background:#333232}}.icon[data-v-07da762c]{width:24px;height:24px;vertical-align:-.15em;fill:#787878;overflow:hidden}",""]),t.exports=m},1857:function(t,e,n){"use strict";n(1660)},1858:function(t,e,n){var c=n(32)(!1);c.push([t.i,"@media screen and (min-width:750px){.main_container[data-v-64862d70]{width:80%;min-width:1026px;margin:20px auto 0}}",""]),t.exports=c},1955:function(t,e,n){"use strict";n.r(e);var c=n(5),o=(n(31),n(106),n(173),n(765),n(40)),l=n(21),r=n(110),m=n(217),d=n(1430),_=n(7),f=n(3),y=n(12),h=n(26),v=n(4),x=(n(30),null),A=function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(x){t.next=4;break}return t.next=3,Object(y.b)();case 3:x=t.sent;case 4:return t.abrupt("return",x);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),C=function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(e,n){var c,data,o,r,m,address,d=arguments;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(c=d.length>2&&void 0!==d[2]?d[2]:{},data=d.length>3?d[3]:void 0,o=d.length>4?d[4]:void 0,"{}"!==JSON.stringify(data)){t.next=5;break}return t.abrupt("return",!1);case 5:return Object(l.a)(data.col+Number(data.longBalance),8),Object(l.a)(data.und,8),t.next=9,A();case 9:return r=t.sent,t.next=12,Object(_.f)(c._collateral);case 12:return m=t.sent,"lovelace"===m?6:18,address=window.CURRENTADDRESS,t.abrupt("return",r.methods.burn(e,Object(h.b)(n,c._collateral)).send({from:address}).on("transactionHash",(function(t){v.a.$emit("CLOSE_STATUS_DIALOG"),v.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:"<p>Settlement ".concat(Object(l.a)(data.claimBalance)," ").concat(data.collateral_symbol,"</p>")})})).on("receipt",(function(t){var e;window.statusDialog&&(v.a.$emit("CLOSE_STATUS_DIALOG"),v.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(f.a)(e,"buttonText","Confirm"),Object(f.a)(e,"showDialog",!1),e)));o("success"),v.a.$emit("REFRESH_BALANCE")})).on("error",(function(t,e){v.a.$emit("CLOSE_STATUS_DIALOG"),o("error")})));case 16:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),w=function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(e,data,n){var c,o,r,m,address;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("{}"!==JSON.stringify(data)){t.next=2;break}return t.abrupt("return",!1);case 2:return c=Object(l.a)(Number(data.col)+Number(data.claimBalance),8),o=Object(l.a)(data.und,8),r=o>0?"<p>Settlement <span>".concat(c+data.collateral_symbol," ").concat("And "+o+data.underlying_symbol,"</span></p>"):"<p>Settlement <span>".concat(c>0&&c+data.collateral_symbol,"</span></p>"),t.next=7,A();case 7:return m=t.sent,address=window.CURRENTADDRESS,t.abrupt("return",m.methods.settle(e).send({from:address}).on("transactionHash",(function(t){v.a.$emit("CLOSE_STATUS_DIALOG"),v.a.$emit("OPEN_STATUS_DIALOG",{title:"Waiting For Confirmation",layout:"layout2",loading:!0,buttonText:"Confirm",conTit:"Please Confirm the transaction in your wallet",conText:r})})).on("receipt",(function(t){var e;window.statusDialog&&(v.a.$emit("CLOSE_STATUS_DIALOG"),v.a.$emit("OPEN_STATUS_DIALOG",(e={title:"Transation submitted",layout:"layout2",buttonText:"Confirm",conText:'<a href="https://bscscan.com/tx/'.concat(t.transactionHash,'" target="_blank">View on BscScan</a>'),button:!0},Object(f.a)(e,"buttonText","Confirm"),Object(f.a)(e,"showDialog",!1),e)));n("success"),v.a.$emit("REFRESH_BALANCE")})).on("error",(function(t,e){v.a.$emit("CLOSE_STATUS_DIALOG"),n("error")})));case 10:case"end":return t.stop()}}),t)})));return function(e,n,c){return t.apply(this,arguments)}}(),L={components:{Page:n(1442).a},data:function(){return{precision:o.a,addCommom:l.a,autoRounding:l.b,toRounding:l.k,showList:[],claimList:[],FilterList:[],getTokenName:_.e,fixD:l.c,page:0,limit:10,isLoading:!0,isLogin:!1}},computed:{myAboutInfoSell:function(){return this.$store.state.myAboutInfoSell},userInfo:function(){return this.$store.state.userInfo},storeThemes:function(){return this.$store.state.themes}},watch:{userInfo:{handler:"userInfoWatch",immediate:!0},FilterList:{handler:"fliterListWatch",immediate:!0}},mounted:function(){this.getList()},methods:{fliterListWatch:function(t){if(t){this.page=0,this.limit=10;var e=t;this.showList=e.slice(0,this.limit)}},userInfoWatch:function(t){t&&(this.isLogin=t.data.isLogin)},getList:function(){var t=this;Object(r.c)().then((function(e){var n=e.data.data.options,r=[];t.isLoading=!0,n.forEach(function(){var e=Object(c.a)(regeneratorRuntime.mark((function e(n){var c,f,y,h,v,x,A,C,w,L,k;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=Object(m.d)(n.underlying),f=Object(_.e)(n.underlying),y=Object(m.d)(n.collateral),h=Object(_.e)(n.collateral),e.next=6,Object(d.d)(n.long,y);case 6:return v=e.sent,e.next=9,Object(d.d)(n.short,y);case 9:if(x=e.sent,"WBNB"==f?(n.TypeCoin=h,n.type="Call"):(n.TypeCoin=f,n.type="Put"),"BUSD"==f&&"WBNB"==h&&(n.TypeCoin=h,n.type="Call"),"BUSD"==h&&"WBNB"==f&&(n.TypeCoin=f,n.type="Put"),Number(Object(l.c)(x,8))>0&&Number(Object(l.c)(v,8))>0&&r.push({collateral:n.collateral,collateral_symbol:h,collateral_decimals:y,underlying:n.collateral,underlying_symbol:f,underlying_decimals:c,expiry:n.expiry,long:n.long,short:n.short,type:n.type,TypeCoin:n.TypeCoin,claimBalance:Number(x)>Number(v)?v:x,col:0,fee:0,und:0}),A=o.a.minus(x,v)+"",!(Number(A)>0)){e.next=27;break}return e.prev=16,C=Object(m.c)(A,y),e.next=20,Object(d.p)(n.short,C);case 20:w=e.sent,r.push({collateral:n.collateral,collateral_symbol:h,collateral_decimals:y,underlying:n.collateral,underlying_symbol:f,underlying_decimals:c,expiry:n.expiry,long:n.long,short:n.short,type:n.type,TypeCoin:n.TypeCoin,claimBalance:0,col:Object(m.b)(w.col,"Call"==n.type?c:y),fee:Object(m.b)(w.fee,"Call"==n.type?c:y),und:Object(m.b)(w.und,"Call"==n.type?c:y)}),e.next=27;break;case 24:e.prev=24,e.t0=e.catch(16),console.log(e.t0);case 27:return L={},k=[],r.forEach((function(t){L[t.collateral+t.underlying+t.short]||(L[t.collateral+t.underlying+t.short]=1,k.push(t))})),t.FilterList=k,t.isLoading=!1,e.abrupt("return",t.FilterList);case 33:case"end":return e.stop()}}),e,null,[[16,24]])})));return function(t){return e.apply(this,arguments)}}())}))},getDownTime:function(time){var t=1*new Date,e=1e3*time,n=(e=new Date(e))-t,c=Math.floor(n/864e5),o=Math.floor((n-24*c*36e5)/36e5),l=Math.floor((n-24*c*36e5-36e5*o)/6e4),r=Math.floor((n-24*c*36e5-36e5*o-6e4*l)/1e3);return"".concat(c,"天").concat(o,"时").concat(l,"分").concat(r,"秒")},toClaim:function(t){var e=this;console.log(t);var object={title:"WARNING",layout:"layout1",activeTip:!0,activeTipText1:"Please double check the price above，",activeTipText2:"Helmet team will not cover your loss on this.",loading:!1,button:!0,buttonText:"Confirm",showDialog:!0},data=t;if(0!=data.claimBalance)object.conText="<p>Settlement ".concat(Object(l.a)(data.claimBalance)," ").concat(data.collateral_symbol,"</p>"),this.$bus.$emit("OPEN_STATUS_DIALOG",object),this.$bus.$on("PROCESS_ACTION",(function(t){t&&C(data.short,data.claimBalance,{_collateral:data.collateral_symbol},data,(function(t){"success"==t&&e.getList()})),data={}}));else{var n=Object(l.a)(Number(data.col)+Number(data.claimBalance),8),c=Object(l.a)(data.und,8);object.conText=n&&c?"<p>Settlement <span>".concat(n+data.collateral_symbol," ").concat("And "+c+data.underlying_symbol,"</span></p>"):"<p>Settlement <span>".concat(!n&&c?c+" "+data.underlying_symbol:n+" "+data.collateral_symbol,"</span></p>"),this.$bus.$emit("OPEN_STATUS_DIALOG",object),this.$bus.$on("PROCESS_ACTION",(function(t){t&&w(data.short,data,(function(t){"success"==t&&e.getList()})),data={}}))}},handleClickChagePage:function(t){t-=1,this.page=t;var e=t,n=this.FilterList.slice(this.page*this.limit,(e+1)*this.limit);this.showList=n}}},k=(n(1855),n(20)),O={layout:"home",components:{MyClaim:Object(k.a)(L,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"my_claim"},[c("div",{staticClass:"claim_title"},[c("h3",[t._v(t._s(t.$t("Type.Claim")))])]),t._v(" "),t.showList.length?c("div",{staticClass:"claim_text"},[c("span",[t._v(t._s(t.$t("Table.Type")))]),t._v(" "),c("span",[t._v(t._s(t.$t("Table.DenAssets")))]),t._v(" "),c("span",[t._v(t._s(t.$t("Table.BaseAssets")))]),t._v(" "),c("span")]):t._e(),t._v(" "),t.isLogin?t._l(t.showList,(function(e,n){return c("div",{key:n+"key",staticClass:"claim_item",style:0==t.fixD(e.und,8)&&0==t.precision.plus(e.col,e.claimBalance)?"display:none":""},[c("section",[c("span",{class:"Call"==e.type?"call_text":"put_text"},[t._v("\n          "+t._s(e.TypeCoin)+"\n          "),c("i",{class:"Call"==e.type?"call_icon":"put_icon"})])]),t._v(" "),c("section",["call"==e.type?c("span",[t._v("\n          "+t._s(t.fixD(t.precision.plus(e.col,e.claimBalance),8))+"\n          "+t._s(e.collateral_symbol)+"\n        ")]):c("span",[t._v("\n          "+t._s(t.fixD(e.und,8))+"\n          "+t._s(e.underlying_symbol)+"\n        ")])]),t._v(" "),c("section",["call"==e.type?c("span",[t._v("\n          "+t._s(t.fixD(e.und,8))+"\n          "+t._s(e.underlying_symbol)+"\n        ")]):c("span",[t._v("\n          "+t._s(t.fixD(t.precision.plus(e.col,e.claimBalance),8))+"\n          "+t._s(e.collateral_symbol)+"\n        ")])]),t._v(" "),c("section",[c("button",{on:{click:function(n){return t.toClaim(e)}}},[t._v(t._s(t.$t("Table.GetBack")))])])])})):t._e(),t._v(" "),t._l(t.showList,(function(e,n){return c("div",{key:n+"1",staticClass:"claim_item_H5",style:0==t.fixD(e.und,8)&&0==t.precision.plus(e.col,e.claimBalance)?"display:none":""},[c("section",[c("span",{class:"Call"==e.type?"call_text":"put_text"},[t._v("\n          "+t._s(e.TypeCoin)+"\n          "),c("i",{class:"Call"==e.type?"call_icon":"put_icon"})])]),t._v(" "),c("section",[c("p",[c("span",[t._v(t._s(t.$t("Table.DenAssets")))]),t._v(" "),"call"==e.type?c("span",[t._v("\n            "+t._s(t.fixD(t.precision.plus(e.col,e.claimBalance),8))+"\n            "+t._s(e.collateral_symbol)+"\n          ")]):c("span",[t._v("\n            "+t._s(t.fixD(e.und,8))+"\n            "+t._s(e.underlying_symbol)+"\n          ")])]),t._v(" "),c("p",[c("span",[t._v(t._s(t.$t("Table.BaseAssets")))]),t._v(" "),"call"==e.type?c("span",[t._v("\n            "+t._s(t.fixD(e.und,8))+"\n            "+t._s(e.underlying_symbol)+"\n          ")]):c("span",[t._v("\n            "+t._s(t.fixD(t.precision.plus(e.col,e.claimBalance),8))+"\n            "+t._s(e.collateral_symbol)+"\n          ")])])]),t._v(" "),c("section",[c("button",{on:{click:function(n){return t.toClaim(e)}}},[t._v(t._s(t.$t("Table.GetBack")))])])])})),t._v(" "),t.isLoading&&t.isLogin?c("div",{staticClass:"loading"},[c("img",{attrs:{src:n(1438)}}),t._v(" "),c("div",{staticClass:"shadow"}),t._v(" "),c("p",[t._v(t._s(t.$t("Table.LoadingWallet")))])]):t._e(),t._v(" "),t.showList.length<1&&!t.isLoading||!t.isLogin?c("section",{staticClass:"noData"},[c("div",[c("img",{attrs:{src:n(1439)("./nodata_"+t.storeThemes+".png"),alt:""}}),t._v(" "),c("p",[t._v(t._s(t.$t("Table.NoData")))])])]):t._e(),t._v(" "),t.FilterList.length>10&&t.isLogin?c("section",{staticClass:"pages"},[c("Page",{attrs:{total:t.FilterList.length,limit:t.limit,page:t.page+1},on:{"page-change":t.handleClickChagePage}})],1):t._e()],2)}),[],!1,null,"07da762c",null).exports}},T=(n(1857),Object(k.a)(O,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"main_container"},[e("MyClaim")],1)}),[],!1,null,"64862d70",null));e.default=T.exports}}]);