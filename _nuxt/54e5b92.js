(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1562:function(e,t,n){e.exports=function(e){function t(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var i={};return t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=2)}([function(e,t,i){var n=i(4)(i(1),i(5),null,null);e.exports=n.exports},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(3);t.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(e){return e>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(e,t,i,n){return i*(1-Math.pow(2,-10*e/n))*1024/1023+t}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,n.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,n.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,n.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,n.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(e){this.startTime||(this.startTime=e),this.timestamp=e;var t=e-this.startTime;this.remaining=this.localDuration-t,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(t,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(t,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(t/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(t/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),t<this.localDuration?this.rAF=(0,n.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(e){return!isNaN(parseFloat(e))},formatNumber:function(e){e=e.toFixed(this.decimals);var t=(e+="").split("."),i=t[0],n=t.length>1?this.decimal+t[1]:"",a=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;a.test(i);)i=i.replace(a,"$1"+this.separator+"$2");return this.prefix+i+n+this.suffix}},destroyed:function(){(0,n.cancelAnimationFrame)(this.rAF)}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){return e&&e.__esModule?e:{default:e}}(i(0));t.default=a.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",a.default)},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=0,a="webkit moz ms o".split(" "),o=void 0,r=void 0;if("undefined"==typeof window)t.requestAnimationFrame=o=function(){},t.cancelAnimationFrame=r=function(){};else{t.requestAnimationFrame=o=window.requestAnimationFrame,t.cancelAnimationFrame=r=window.cancelAnimationFrame;for(var s=void 0,u=0;u<a.length&&(!o||!r);u++)s=a[u],t.requestAnimationFrame=o=o||window[s+"RequestAnimationFrame"],t.cancelAnimationFrame=r=r||window[s+"CancelAnimationFrame"]||window[s+"CancelRequestAnimationFrame"];o&&r||(t.requestAnimationFrame=o=function(e){var t=(new Date).getTime(),i=Math.max(0,16-(t-n)),a=window.setTimeout((function(){e(t+i)}),i);return n=t+i,a},t.cancelAnimationFrame=r=function(e){window.clearTimeout(e)})}t.requestAnimationFrame=o,t.cancelAnimationFrame=r},function(e,t){e.exports=function(e,t,i,n){var a,o=e=e||{},r=typeof e.default;"object"!==r&&"function"!==r||(a=e,o=e.default);var s="function"==typeof o?o.options:o;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),i&&(s._scopeId=i),n){var u=Object.create(s.computed||null);Object.keys(n).forEach((function(e){var t=n[e];u[e]=function(){return t}})),s.computed=u}return{esModule:a,exports:o,options:s}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("span",[e._v("\n  "+e._s(e.displayValue)+"\n")])},staticRenderFns:[]}}])},1595:function(e,t,n){var content=n(1676);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(26).default)("5dab18c8",content,!0,{sourceMap:!1})},1675:function(e,t,n){"use strict";n(1595)},1676:function(e,t,n){var o=n(25),r=n(63),l=n(1677),c=o(!1),d=r(l);c.push([e.i,".governance_title[data-v-6725de93]{background:#4b2910;border-radius:5px}.governance_title_wrap[data-v-6725de93]{width:100%;height:100%;background-image:url("+d+");background-repeat:no-repeat;background-position:50%}.governance_title_text h3[data-v-6725de93]{font-family:IBMPlexSans-SemiBold,IBMPlexSans;font-weight:600;color:#fff}.governance_title_text p[data-v-6725de93]{font-family:IBMPlexSans;color:#fff;line-height:20px}@media screen and (min-width:750px){.governance_title[data-v-6725de93]{width:100%;min-width:1026px;height:140px;margin:30px auto 10px}.governance_title_wrap[data-v-6725de93]{margin:0 auto;background-image:url("+d+");background-size:1026px 100%}.governance_title_text h3[data-v-6725de93]{font-size:24px;line-height:32px;padding:40px 0 0 40px}.governance_title_text p[data-v-6725de93]{font-size:16px;margin:11px 0 0 40px}}@media screen and (max-width:750px){.governance_title[data-v-6725de93]{width:95%;height:120px;margin:0 auto}.governance_title_wrap[data-v-6725de93]{background-image:url("+d+");background-size:100% 100%}.governance_title_text[data-v-6725de93]{width:100%;height:100%}.governance_title_text h3[data-v-6725de93]{width:335px;font-size:18px;padding:15px 0 0 16px}.governance_title_text p[data-v-6725de93]{width:329px;font-size:12px;margin:8px 0 0 16px}}",""]),e.exports=c},1677:function(e,t,n){e.exports=n.p+"img/governance_titlebg.218ecd5.png"},1678:function(e,t,n){e.exports=n.p+"img/unopen.c4f33cc.png"},1679:function(e,t,n){e.exports=n.p+"img/ongoing.6da611d.png"},1680:function(e,t,n){e.exports=n.p+"img/finish.97bf104.png"},1692:function(e,t,n){"use strict";var o={},r=(n(1675),n(16)),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"governance_title"},[n("div",{staticClass:"governance_title_wrap"},[n("div",{staticClass:"governance_title_text"},[n("h3",[e._v(e._s(e.$t("Governance.Tips3")))]),e._v(" "),n("p",[e._v(e._s(e.$t("Governance.Tips4")))])])])])}),[],!1,null,"6725de93",null);t.a=component.exports},1820:function(e,t,n){var content=n(2282);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(26).default)("5fd23392",content,!0,{sourceMap:!1})},1821:function(e,t,n){var content=n(2284);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(26).default)("aed0f60c",content,!0,{sourceMap:!1})},1822:function(e,t,n){var content=n(2288);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(26).default)("2f193a9e",content,!0,{sourceMap:!1})},1823:function(e,t,n){var content=n(2291);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(26).default)("180be05a",content,!0,{sourceMap:!1})},2281:function(e,t,n){"use strict";n(1820)},2282:function(e,t,n){var o=n(25)(!1);o.push([e.i,"@media screen and (min-width:750px){.governance_dialog{border-radius:10px!important;width:450px!important}}@media screen and (max-width:750px){.governance_dialog{width:95%!important}}.governance_dialog .between{display:flex;justify-content:space-between;align-items:center;margin-top:10px}.governance_dialog .between>span{font-size:14px;font-family:PingFangSC-Regular,PingFang SC;line-height:14px}body.light .governance_dialog .between>span{color:#17173a}body.dark .governance_dialog .between>span{color:#e1e1e1}.governance_dialog .between>p{display:flex;font-size:14px;font-family:IBMPlexSans;font-weight:700;line-height:14px}body.light .governance_dialog .between>p{color:#17173a}body.dark .governance_dialog .between>p{color:#e1e1e1}.governance_dialog_input{margin-top:10px}.governance_dialog_button{margin-top:20px}.governance_dialog_button button{border-radius:5px}.governance_dialog_tips{margin-top:8px;height:72px;font-size:14px;font-family:PingFangSC-Regular,PingFang SC;opacity:.7;line-height:24px}body.light .governance_dialog_tips{color:#17173a}body.dark .governance_dialog_tips{color:#e1e1e1}.governance_dialog_tips>a{color:#fd7e14;text-decoration:underline}.governance_dialog_tips>a:hover{color:#ff9600}",""]),e.exports=o},2283:function(e,t,n){"use strict";n(1821)},2284:function(e,t,n){var o=n(25),r=n(63),l=n(1678),c=n(1679),d=n(1680),f=n(2285),v=n(2286),_=o(!1),h=r(l),m=r(c),x=r(d),y=r(f),w=r(v);_.push([e.i,".governance_proposal[data-v-0cfa19a2]{flex:2;position:relative}.status_img[data-v-0cfa19a2]{width:90px;height:36px;background-size:100% 100%;background-repeat:no-repeat;display:flex;justify-content:center;align-items:center;position:absolute;left:0;top:0}.unopen[data-v-0cfa19a2]{background-image:url("+h+");font-size:14px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;line-height:20px}body.dark .unopen[data-v-0cfa19a2],body.light .unopen[data-v-0cfa19a2]{color:#fff}.ongoing[data-v-0cfa19a2]{background-image:url("+m+");font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:20px}body.dark .ongoing[data-v-0cfa19a2],body.light .ongoing[data-v-0cfa19a2]{color:#fff}.finish[data-v-0cfa19a2]{background-image:url("+x+");font-size:14px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;color:rgba(23,23,58,.4);line-height:20px}.perhaps>p[data-v-0cfa19a2]{font-size:14px;font-family:IBMPlexSans;opacity:.7;margin-top:10px;text-indent:2em;line-height:22px}body.dark .perhaps>p[data-v-0cfa19a2],body.light .perhaps>p[data-v-0cfa19a2]{color:#17173a}.governance_proposal_title[data-v-0cfa19a2]{display:flex;align-items:center}.governance_proposal_title>h3[data-v-0cfa19a2]{font-size:16px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;margin-top:45px}body.dark .governance_proposal_title>h3[data-v-0cfa19a2],body.light .governance_proposal_title>h3[data-v-0cfa19a2]{color:#17173a}.governance_proposal_perhaps[data-v-0cfa19a2]{margin-top:15px}.governance_proposal_action[data-v-0cfa19a2]{margin-top:20px;border-radius:10px}body.dark .governance_proposal_action[data-v-0cfa19a2],body.light .governance_proposal_action[data-v-0cfa19a2]{border:1px solid #f7c396}.governance_proposal_action_title[data-v-0cfa19a2]{font-size:16px;font-family:PingFangSC-Medium,PingFang SC;font-weight:600;line-height:40px;padding-left:20px}body.dark .governance_proposal_action_title[data-v-0cfa19a2],body.light .governance_proposal_action_title[data-v-0cfa19a2]{color:#17173a;border-bottom:1px solid #f7c396}.governance_proposal_action_wrap[data-v-0cfa19a2]{padding:24px 20px}.governance_proposal_action_item[data-v-0cfa19a2]{display:flex;align-items:center;justify-content:center;margin-top:20px;width:100%;height:40px;background-image:url("+y+");background-repeat:no-repeat;background-size:100% 100%;border-radius:5px;font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:18px;cursor:pointer}body.dark .governance_proposal_action_item[data-v-0cfa19a2],body.light .governance_proposal_action_item[data-v-0cfa19a2]{color:#fff;border:1px solid #f7c396}.governance_proposal_action_item[data-v-0cfa19a2]:hover,.governance_proposal_action_item_active[data-v-0cfa19a2]{border:2px solid #fd7e14!important}.governance_proposal_action_button[data-v-0cfa19a2]{width:100%;height:40px;border-radius:5px;margin-top:16px;background-image:url("+w+");background-repeat:no-repeat;background-size:100% 100%;font-size:14px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;color:#fff;line-height:18px}.governance_proposal_history[data-v-0cfa19a2]{border-radius:10px;margin-top:20px}body.dark .governance_proposal_history[data-v-0cfa19a2],body.light .governance_proposal_history[data-v-0cfa19a2]{border:1px solid #f7c396}.governance_proposal_history_title[data-v-0cfa19a2]{font-family:PingFangSC-Medium,PingFang SC;font-weight:600;line-height:40px;padding-left:20px}body.dark .governance_proposal_history_title[data-v-0cfa19a2],body.light .governance_proposal_history_title[data-v-0cfa19a2]{color:#17173a;border-bottom:1px solid #f7c396}.governance_proposal_history_item_wrap[data-v-0cfa19a2]{max-height:480px;overflow-y:auto}body.light .governance_proposal_history_item_wrap[data-v-0cfa19a2]::-webkit-scrollbar-track{background:#fff}body.dark .governance_proposal_history_item_wrap[data-v-0cfa19a2]::-webkit-scrollbar-track{background:#1d1d1d}.governance_proposal_history_item_wrap[data-v-0cfa19a2]::-webkit-scrollbar{width:6px!important;height:40px!important;position:fixed;bottom:0}.governance_proposal_history_item_wrap[data-v-0cfa19a2]::-webkit-scrollbar-thumb{height:40px}body.light .governance_proposal_history_item_wrap[data-v-0cfa19a2]::-webkit-scrollbar-thumb{background:rgba(23,23,58,.4)}body.dark .governance_proposal_history_item_wrap[data-v-0cfa19a2]::-webkit-scrollbar-thumb{background:hsla(0,0%,100%,.4)}.governance_proposal_history_item[data-v-0cfa19a2]{height:48px;padding:0 20px;display:flex;align-items:center;justify-content:space-between}body.dark .governance_proposal_history_item[data-v-0cfa19a2],body.light .governance_proposal_history_item[data-v-0cfa19a2]{border-bottom:1px solid #f7c396}.governance_proposal_history_item span[data-v-0cfa19a2]{flex:1;font-size:14px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;line-height:20px}body.dark .governance_proposal_history_item span[data-v-0cfa19a2],body.light .governance_proposal_history_item span[data-v-0cfa19a2]{color:#17173a}.governance_proposal_history_item span[data-v-0cfa19a2]:nth-of-type(3){text-align:right}.governance_proposal_history_item span[data-v-0cfa19a2]:first-of-type{flex:2}.governance_proposal_history_button[data-v-0cfa19a2]{height:48px;display:flex;align-items:center;justify-content:center;font-size:14px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;line-height:20px;cursor:pointer}body.dark .governance_proposal_history_button[data-v-0cfa19a2],body.light .governance_proposal_history_button[data-v-0cfa19a2]{color:#17173a}@media screen and (min-width:750px){.governance_proposal[data-v-0cfa19a2]{padding-bottom:50px}}@media screen and (max-width:750px){.governance_proposal_title h3[data-v-0cfa19a2]{width:100%;text-align:center}}",""]),e.exports=_},2285:function(e,t,n){e.exports=n.p+"img/type_button.758b211.png"},2286:function(e,t,n){e.exports=n.p+"img/submit_button.12ef723.png"},2287:function(e,t,n){"use strict";n(1822)},2288:function(e,t,n){var o=n(25),r=n(63),l=n(2289),c=o(!1),d=r(l);c.push([e.i,'.governance_details[data-v-72e8e44a]{flex:1;padding:50px 0}.between[data-v-72e8e44a]{display:flex;justify-content:space-between;align-items:center}.governance_details_infomation[data-v-72e8e44a]{min-width:326px;border-radius:10px}body.dark .governance_details_infomation[data-v-72e8e44a],body.light .governance_details_infomation[data-v-72e8e44a]{border:1px solid #f7c396}.governance_details_infomation_title[data-v-72e8e44a]{font-size:16px;font-family:PingFangSC-Medium,PingFang SC;font-weight:600;line-height:40px;padding-left:20px}body.dark .governance_details_infomation_title[data-v-72e8e44a],body.light .governance_details_infomation_title[data-v-72e8e44a]{color:#17173a;border-bottom:1px solid #f7c396}.governance_details_infomation_wrap[data-v-72e8e44a]{padding:20px}.governance_details_infomation_wrap .between[data-v-72e8e44a]{margin-top:16px}.governance_details_infomation_wrap .between[data-v-72e8e44a]:first-of-type{margin-top:0}.governance_details_infomation_wrap .between>span[data-v-72e8e44a]:first-of-type{font-size:14px;font-family:PingFangSC-Regular,PingFang SC;line-height:20px;opacity:.7}body.dark .governance_details_infomation_wrap .between>span[data-v-72e8e44a]:first-of-type,body.light .governance_details_infomation_wrap .between>span[data-v-72e8e44a]:first-of-type{color:#17173a}.governance_details_infomation_wrap .between>span[data-v-72e8e44a]:nth-of-type(2){font-size:14px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;line-height:20px}body.dark .governance_details_infomation_wrap .between>span[data-v-72e8e44a]:nth-of-type(2),body.light .governance_details_infomation_wrap .between>span[data-v-72e8e44a]:nth-of-type(2){color:#17173a}.governance_details_votes[data-v-72e8e44a]{margin-top:20px;min-width:326px;border-radius:10px}body.dark .governance_details_votes[data-v-72e8e44a],body.light .governance_details_votes[data-v-72e8e44a]{border:1px solid #f7c396}.governance_details_votes_title[data-v-72e8e44a]{font-size:16px;font-family:PingFangSC-Medium,PingFang SC;font-weight:600;line-height:40px;padding-left:20px}body.dark .governance_details_votes_title[data-v-72e8e44a],body.light .governance_details_votes_title[data-v-72e8e44a]{color:#17173a;border-bottom:1px solid #f7c396}.governance_details_votes_wrap[data-v-72e8e44a]{padding:20px}.governance_details_votes_slider[data-v-72e8e44a]{margin-top:16px}.governance_details_votes_slider[data-v-72e8e44a]:first-of-type{margin-top:0}.governance_details_votes_slider .between>span[data-v-72e8e44a]:first-of-type{font-size:14px;font-family:PingFangSC-Regular,PingFang SC;opacity:.5;font-weight:600;line-height:20px}body.dark .governance_details_votes_slider .between>span[data-v-72e8e44a]:first-of-type,body.light .governance_details_votes_slider .between>span[data-v-72e8e44a]:first-of-type{color:#17173a}.governance_details_votes_slider .between>span:first-of-type>span[data-v-72e8e44a]{display:inline-block;margin-right:4px}.governance_details_votes_slider .between>span[data-v-72e8e44a]:nth-of-type(2){font-size:14px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:700;line-height:20px}body.dark .governance_details_votes_slider .between>span[data-v-72e8e44a]:nth-of-type(2),body.light .governance_details_votes_slider .between>span[data-v-72e8e44a]:nth-of-type(2){color:#17173a}.governance_details_votes_slider .slider_wrap[data-v-72e8e44a]{margin-top:6px;width:100%;height:6px;border-radius:100px;overflow:hidden}body.dark .governance_details_votes_slider .slider_wrap[data-v-72e8e44a],body.light .governance_details_votes_slider .slider_wrap[data-v-72e8e44a]{background:#fde4ce}.governance_details_votes_slider .slider_wrap .slider_bar[data-v-72e8e44a]{height:100%;background:linear-gradient(180deg,#fdb514,#fd7e14)}.win_governance[data-v-72e8e44a]{position:relative}.win_governance[data-v-72e8e44a]:before{display:block;content:" ";background:url('+d+") no-repeat;background-size:100% 100%;width:32px;height:32px;position:absolute;transform:translateX(calc(-100% - 3px))}.governance_details_self[data-v-72e8e44a]{margin-top:20px;border-radius:10px}body.dark .governance_details_self[data-v-72e8e44a],body.light .governance_details_self[data-v-72e8e44a]{border:1px solid #f7c396}.governance_details_self_title[data-v-72e8e44a]{font-size:16px;font-family:PingFangSC-Medium,PingFang SC;font-weight:600;line-height:40px;padding-left:20px}body.dark .governance_details_self_title[data-v-72e8e44a],body.light .governance_details_self_title[data-v-72e8e44a]{color:#17173a;border-bottom:1px solid #f7c396}.governance_details_self_wrap[data-v-72e8e44a]{padding:20px}.governance_details_self_votes[data-v-72e8e44a]{margin-top:20px}.governance_details_self_votes[data-v-72e8e44a]:first-of-type{margin-top:0}.governance_details_self_votes span[data-v-72e8e44a]:first-of-type{padding:0 10px;min-width:48px;display:flex;align-items:center;justify-content:center;height:32px;background:transparent;border-radius:5px;font-size:14px;font-family:PingFangSC-Regular,PingFang SC;line-height:24px}body.dark .governance_details_self_votes span[data-v-72e8e44a]:first-of-type,body.light .governance_details_self_votes span[data-v-72e8e44a]:first-of-type{border:1px solid #f7c396;color:#17173a}.governance_details_self_votes span[data-v-72e8e44a]:nth-of-type(2){font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:14px}body.dark .governance_details_self_votes span[data-v-72e8e44a]:nth-of-type(2),body.light .governance_details_self_votes span[data-v-72e8e44a]:nth-of-type(2){color:#17173a}@media screen and (min-width:750px){.governance_details[data-v-72e8e44a]{margin-left:20px}.governance_details_infomation[data-v-72e8e44a],.governance_details_self[data-v-72e8e44a],.governance_details_votes[data-v-72e8e44a]{min-width:326px}}@media screen and (max-width:750px){.governance_details[data-v-72e8e44a]{margin-top:20px}}",""]),e.exports=c},2289:function(e,t,n){e.exports=n.p+"img/win.aea1205.png"},2290:function(e,t,n){"use strict";n(1823)},2291:function(e,t,n){var o=n(25)(!1);o.push([e.i,".governance_comeback[data-v-13895a67]{cursor:pointer;display:flex;align-items:center;margin-bottom:10px;width:130px}.governance_comeback .icon[data-v-13895a67]{transform:rotate(180deg);width:40px;height:40px}body.light .governance_comeback .icon[data-v-13895a67]{fill:#17173a}body.dark .governance_comeback .icon[data-v-13895a67]{fill:#e1e1e1}.governance_comeback span[data-v-13895a67]{font-size:20px;line-height:24px;font-family:IBMPlexSans-SemiBold,IBMPlexSans;font-weight:600}body.light .governance_comeback span[data-v-13895a67]{color:#17173a}body.dark .governance_comeback span[data-v-13895a67]{color:#e1e1e1}.governance_comeback:hover .icon[data-v-13895a67]{fill:#fd7e14!important}.governance_comeback:hover span[data-v-13895a67]{color:#fd7e14!important}@media screen and (min-width:750px){.governance_container[data-v-13895a67]{width:80%;min-width:1026px;margin:0 auto;background:transparent}.governance_infomation_wrap[data-v-13895a67]{min-width:1026px;margin:0 auto;box-shadow:0 4px 8px 0 hsla(0,0%,60.8%,.02);border-radius:5px}body.dark .governance_infomation_wrap[data-v-13895a67],body.light .governance_infomation_wrap[data-v-13895a67]{background:#fff3de}.governance_infomation[data-v-13895a67]{display:flex;width:1026px;margin:0 auto;padding:0 20px}}@media screen and (max-width:750px){.governance_infomation_wrap[data-v-13895a67]{width:95%;margin:0 auto;box-shadow:0 4px 8px 0 hsla(0,0%,60.8%,.02)}body.dark .governance_infomation_wrap[data-v-13895a67],body.light .governance_infomation_wrap[data-v-13895a67]{background:#fff3de}.governance_infomation[data-v-13895a67]{width:100%;display:flex;flex-direction:column;border-radius:5px;padding:0 10px}}",""]),e.exports=o},2360:function(e,t,n){"use strict";n.r(t);var title=n(1692),o=n(31),r=(n(48),n(1562)),l={props:["DialogVisible","DialogClose","CanDeposite","MiningData","toDeposite","ApproveStatus"],components:{countTo:n.n(r).a},data:function(){return{isLogin:!1,StakeVolume:""}},computed:{CurrentAccount:function(){return this.$store.state.userInfo}},watch:{CurrentAccount:{handler:"reloadData",immediate:!0}},mounted:function(){},methods:{reloadData:function(e){e&&(this.isLogin=e.isLogin,this.$nextTick((function(){})))},handleClickVotes:function(){this.toDeposite(this.StakeVolume)}}},c=(n(2281),n(16)),d=Object(c.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{title:e.$t("Governance.Governance_text15"),footer:"","append-to-body":"","custom-class":"governance_dialog","close-on-click-modal":!1,visible:e.DialogVisible},on:{close:e.DialogClose}},[n("div",{staticClass:"governance_dialog_title between"},[n("span",[e._v(e._s(e.$t("Governance.Governance_text20")))]),e._v(" "),n("p",[e.isLogin?n("countTo",{attrs:{startVal:Number(0),endVal:Number(e.CanDeposite),duration:1e3,decimals:4}}):n("span",[e._v("--")]),e._v("\n       "+e._s(e.MiningData.StakeUnit)+"\n    ")],1)]),e._v(" "),n("div",{staticClass:"governance_dialog_input"},[n("el-input",{attrs:{type:"number"},model:{value:e.StakeVolume,callback:function(t){e.StakeVolume=t},expression:"StakeVolume"}})],1),e._v(" "),n("div",{staticClass:"governance_dialog_button"},[n("button",{class:3===e.MiningData.Status?"disable_button o_button":"o_button",on:{click:e.handleClickVotes}},[e._v("\n      "+e._s(e.ApproveStatus?e.$t("Governance.Governance_text6"):e.$t("Table.Approve"))+"\n    ")])]),e._v(" "),n("div",{staticClass:"governance_dialog_tips",domProps:{innerHTML:e._s(e.$t("Governance.Tips2"))}})])}),[],!1,null,null,null).exports,f=n(408),v=n(409),_=n(1581),h=n(1587),m=n(233),x=n(287),y=n(29),w=n(43),S=n(21),C={components:{GovernanceVotesDialog:d,SuccessConfirmationDialog:f.a,WaitingConfirmationDialog:v.a},data:function(){return{fixD:y.c,Proposal:{},Mining:{},PropoaslID:1,CanDeposite:0,VotesVisible:!1,WaitingVisible:!1,SuccessVisible:!1,ApproveStatus:!1,SuccessHash:"",WaitingText:"",CurrentPage:1,PageSize:5,MinNumber:0,MaxNumber:5,GovernanceTxList:[]}},computed:{CurrentAccount:function(){return this.$store.state.userInfo},GovernanceList:function(){return[{PropoaslType:this.$t("Governance.Governance_text3"),PropoaslID:1},{PropoaslType:this.$t("Governance.Governance_text4"),PropoaslID:2},{PropoaslType:this.$t("Governance.Governance_text5"),PropoaslID:3}]}},watch:{CurrentAccount:{handler:"reloadData",immediate:!0}},mounted:function(){var e=this.$route.params.details||window.localStorage.Governance||"link1",t=Object(_.b)(_.a),n=Object(h.d)(h.a);this.Proposal=t.filter((function(t){return t.Router===e}))[0],this.Mining=n.filter((function(t){return t.Router===e}))[0]},methods:{reloadData:function(e){var t=this;e&&(this.isLogin=e.isLogin,this.$nextTick((function(){t.getGovernanceList(),t.getBalance()})))},changePage:function(){this.CurrentPage=this.CurrentPage+1,this.CurrentPage<=1?(this.MinNumber=0,this.MaxNumber=this.PageSize):(this.MinNumber=0,this.MaxNumber=(this.CurrentPage-1)*this.PageSize+this.PageSize),console.log(this.MinNumber,this.MaxNumber)},votesClose:function(){this.VotesVisible=!1},waitingClose:function(){this.WaitingVisible=!1},successClose:function(){this.SuccessVisible=!1},handleClickVotes:function(){this.VotesVisible=!0},getBalance:function(){var e=this,t=this.Mining,n=t.StakeAddress,r=t.PoolAddress,l=t.StakeDecimals,c=(t.RewardDecimals,t.NoProxy,t.PoolABI,t.StakeABI),d=(t.ProxyPid,t.PoolType,t.CanWithDrawMethods,t.CanClaim1Methods,t.CanClaim2Methods,t.RewardPerMethods,t.HaveReward2,new w.Contract(n,c)),f=new w.Contract(n,m.abi),v=this.CurrentAccount.account;if(v){var _=[d.balanceOf(v),f.allowance(v,r)];Object(S.i)().all(_).then((function(t){var n=Object(S.l)(t),r=Object(o.a)(n,2),c=r[0],d=r[1];e.CanDeposite=Object(S.f)(c,l),e.ApproveStatus=d>0}))}},getGovernanceList:function(){var e=this;Object(x.b)().then((function(t){var n=[];t.data.data.votes.forEach((function(t){var o=e.getProposalStatus(t.proposalID);n.push({ShowAddress:t.address.substr(0,1)+t.address.substr(1,1).toLowerCase()+t.address.substr(2,3)+"..."+t.address.substr(-4),Address:t.address,Amount:Object(S.f)(t.amount),ShowAmount:Object(y.c)(Object(S.f)(t.amount),4),ProposalID:t.proposalID,ShowProposalID:o})})),e.GovernanceTxList=n}))},getProposalStatus:function(e){switch(this.Proposal.Proposal.filter((function(t){return t.ID==e}))[0].Text){case 1:return this.$t("Governance.Governance_text3");case 2:return this.$t("Governance.Governance_text4");case 3:return this.$t("Governance.Governance_text5");default:return"error"}},toDeposite:function(e){var t=this;if(e){var n=this.Mining.PoolAddress,o=this.Mining.StakeAddress,r=this.Mining.StakeSymbol,l=this.Mining.StakeDecimals,c=this.Mining.PoolABI,d=this.PropoaslID,f=this.Mining.StakeMethods,v=Object(S.m)(e+"",l),_=this.CurrentAccount.account;if(this.StakeLoading=!0,this.ApproveStatus){var h,x=[v,d];(h=Object(S.h)(c,n).methods)[f].apply(h,x).send({from:_}).on("transactionHash",(function(e){t.WaitingVisible=!0})).on("receipt",(function(e){t.SuccessVisible||(t.SuccessHash=e.transactionHash,t.WaitingVisible=!1,t.VotesVisible=!1,t.SuccessVisible=!0,t.$store.dispatch("refreshData"))})).on("error",(function(e){t.WaitingVisible=!1,t.SuccessVisible=!1}))}else{Object(S.h)(m.abi,o).methods.approve(n,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff").send({from:_}).on("transactionHash",(function(e){t.WaitingVisible=!0,t.WaitingText="You will approve ".concat(r," to Helmet")})).on("receipt",(function(e){t.SuccessVisible||(t.SuccessHash=e.transactionHash,t.WaitingVisible=!1,t.SuccessVisible=!0,t.ApproveStatus=!0,t.WaitingText="",t.$store.dispatch("refreshData"))})).on("error",(function(e){t.WaitingVisible=!1,t.SuccessVisible=!1,t.ApproveStatus=!1}))}}}}},k=(n(2283),Object(c.a)(C,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"governance_proposal"},[n("div",{class:["status_img",e.Proposal.StatusImg]},[e._v("\n    "+e._s(e.Proposal.StatusText)+"\n  ")]),e._v(" "),n("div",{staticClass:"governance_proposal_title"},[n("h3",[e._v(e._s(e.$t(e.Proposal.Title)))])]),e._v(" "),n("div",{staticClass:"governance_proposal_perhaps perhaps"},e._l(e.Proposal.Details,(function(t,o){return n("p",{key:o},[n("span",{domProps:{innerHTML:e._s(e.$t(t))}})])})),0),e._v(" "),n("div",{staticClass:"governance_proposal_action"},[n("div",{staticClass:"governance_proposal_action_title"},[e._v("\n      "+e._s(e.$t("Governance.Governance_text14"))+"\n    ")]),e._v(" "),n("div",{staticClass:"governance_proposal_action_wrap"},[n("div",{staticClass:"governance_proposal_action_item_wrap"},e._l(e.GovernanceList,(function(t){return n("div",{key:t.PropoaslID,class:["governance_proposal_action_item",e.PropoaslID===t.PropoaslID?"governance_proposal_action_item_active":""],on:{click:function(n){e.PropoaslID=t.PropoaslID}}},[e._v("\n          "+e._s(t.PropoaslType)+"\n        ")])})),0),e._v(" "),n("button",{staticClass:"governance_proposal_action_button",on:{click:e.handleClickVotes}},[e._v("\n        "+e._s(e.$t("Governance.Governance_text14"))+"\n      ")])])]),e._v(" "),n("div",{staticClass:"governance_proposal_history"},[n("div",{staticClass:"governance_proposal_history_title"},[e._v("\n      "+e._s(e.$t("Governance.Governance_text14"))+"\n    ")]),e._v(" "),n("div",{staticClass:"governance_proposal_history_wrap"},[n("div",{staticClass:"governance_proposal_history_item_wrap"},e._l(e.GovernanceTxList.slice(e.MinNumber,e.MaxNumber),(function(t,o){return n("div",{key:o,staticClass:"governance_proposal_history_item"},[n("span",[e._v(e._s(t.ShowAddress))]),e._v(" "),n("span",[e._v(e._s(t.ShowProposalID))]),e._v(" "),n("span",[e._v(e._s(t.ShowAmount))])])})),0),e._v(" "),n("div",{staticClass:"governance_proposal_history_button",on:{click:e.changePage}},[e._v("\n        "+e._s(e.$t("Governance.Governance_text12"))+"\n      ")])])]),e._v(" "),n("GovernanceVotesDialog",{attrs:{DialogVisible:e.VotesVisible,DialogClose:e.votesClose,CanDeposite:e.CanDeposite,MiningData:e.Mining,toDeposite:e.toDeposite,ApproveStatus:e.ApproveStatus}}),n("WaitingConfirmationDialog",{attrs:{DialogVisible:e.WaitingVisible,DialogClose:e.waitingClose}},[n("div",{staticClass:"waiting_content"},[n("p",[e._v(e._s(e.WaitingText))])])]),e._v(" "),n("SuccessConfirmationDialog",{attrs:{DialogVisible:e.SuccessVisible,DialogClose:e.successClose,SuccessHash:e.SuccessHash}})],1)}),[],!1,null,"0cfa19a2",null).exports),P={data:function(){return{fixD:y.c,Proposal:{},Type1:0,Type2:0,Type3:0,SelfType1:0,SelfType2:0,SelfType3:0,Type1Number:0,Type2Number:0,Type3Number:0}},mounted:function(){var e=this.$route.params.details||window.localStorage.Governance||"link1",t=Object(_.b)(_.a);this.Proposal=t.filter((function(t){return t.Router===e}))[0]},computed:{CurrentAccount:function(){return this.$store.state.userInfo}},watch:{CurrentAccount:{handler:"reloadData",immediate:!0}},methods:{reloadData:function(e){var t=this;e&&(this.isLogin=e.isLogin,this.$nextTick((function(){t.getSelfInfo()})))},getInfoData:function(){var e=this,t=this.$route.params.details||window.localStorage.Governance||"link1",n=Object(_.b)(_.a).filter((function(e){return e.Router===t}))[0],o=this.CurrentAccount.account||window.CURRENTADDRESS;Object(x.b)().then((function(t){var r=t.data.data.votes,l=r.filter((function(e){return e.proposalID==n.Proposal[0].ID})),c=r.filter((function(e){return e.proposalID==n.Proposal[1].ID})),d=r.filter((function(e){return e.proposalID==n.Proposal[2].ID})),f=r.filter((function(e){return e.proposalID==n.Proposal[0].ID&&e.address.toUpperCase()==o.toUpperCase()})),v=r.filter((function(e){return e.proposalID==n.Proposal[1].ID&&e.address.toUpperCase()==o.toUpperCase()})),_=r.filter((function(e){return e.proposalID==n.Proposal[2].ID&&e.address.toUpperCase()==o.toUpperCase()})),h=l.reduce((function(e,t){return 1*Object(S.f)(t.amount)+e}),0),m=c.reduce((function(e,t){return 1*Object(S.f)(t.amount)+e}),0),x=d.reduce((function(e,t){return 1*Object(S.f)(t.amount)+e}),0),w=f.reduce((function(e,t){return 1*Object(S.f)(t.amount)+e}),0),C=v.reduce((function(e,t){return 1*Object(S.f)(t.amount)+e}),0),k=_.reduce((function(e,t){return 1*Object(S.f)(t.amount)+e}),0),P=h+m+x;e.Type1=h,e.Type2=m,e.Type3=x,e.SelfType1=w,e.SelfType2=C,e.SelfType3=k,e.AllType=P,e.Type1Number=h>0?Object(y.c)(h/P*100,2)+"%":"0%",e.Type2Number=m>0?Object(y.c)(m/P*100,2)+"%":"0%",e.Type3Number=x>0?Object(y.c)(x/P*100,2)+"%":"0%"}))},getSelfInfo:function(){var e=this,t=this.$route.params.details||window.localStorage.Governance||"link1",n=Object(_.b)(_.a).filter((function(e){return e.Router===t}))[0],r=n.PoolAddress,l=n.PoolABI,c=new w.Contract(r,l),d="0x0000000000000000000000000000000000000000",f=this.CurrentAccount.account,v=[c.getVotes(d,n.Proposal[0].ID),c.getVotes(d,n.Proposal[1].ID),c.getVotes(d,n.Proposal[2].ID),c.getVotes(f,n.Proposal[0].ID),c.getVotes(f,n.Proposal[1].ID),c.getVotes(f,n.Proposal[2].ID)];Object(S.i)().all(v).then((function(t){var n=Object(S.l)(t),r=Object(o.a)(n,6),l=r[0],c=r[1],d=r[2],f=r[3],v=r[4],_=r[5];e.Type1=Object(S.f)(l),e.Type2=Object(S.f)(c),e.Type3=Object(S.f)(d),e.SelfType1=Object(S.f)(f),e.SelfType2=Object(S.f)(v),e.SelfType3=Object(S.f)(_);var h=1*Object(S.f)(l)+1*Object(S.f)(c)+1*Object(S.f)(d);e.AllType=h,e.Type1Number=Object(S.f)(l)>0?Object(y.c)(Object(S.f)(l)/h*100,2)+"%":"0%",e.Type2Number=Object(S.f)(c)>0?Object(y.c)(Object(S.f)(c)/h*100,2)+"%":"0%",e.Type3Number=Object(S.f)(d)>0?Object(y.c)(Object(S.f)(d)/h*100,2)+"%":"0%"}))}}},details=(n(2287),Object(c.a)(P,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"governance_details"},[n("div",{staticClass:"governance_details_infomation"},[n("div",{staticClass:"governance_details_infomation_title"},[e._v("\n      "+e._s(e.$t("Governance.Governance_text13"))+"\n    ")]),e._v(" "),n("div",{staticClass:"governance_details_infomation_wrap"},[n("div",{staticClass:"between"},[n("span",[e._v(e._s(e.$t("Governance.Governance_text16")))]),e._v(" "),n("span",[e._v("helmet.exchange")])]),e._v(" "),n("div",{staticClass:"between"},[n("span",[e._v(e._s(e.$t("Governance.Governance_text17")))]),e._v(" "),n("span",[e._v("Radio")])]),e._v(" "),n("div",{staticClass:"between"},[n("span",[e._v(e._s(e.$t("Governance.Governance_text18")))]),e._v(" "),n("span",[e._v(e._s(e.Proposal.StartTime))])]),e._v(" "),n("div",{staticClass:"between"},[n("span",[e._v(e._s(e.$t("Governance.Governance_text19")))]),e._v(" "),n("span",[e._v(e._s(e.Proposal.FinishTime))])])])]),e._v(" "),n("div",{staticClass:"governance_details_votes"},[n("div",{staticClass:"governance_details_votes_title"},[e._v("\n      "+e._s(e.$t("Governance.Governance_text24"))+"\n    ")]),e._v(" "),n("div",{staticClass:"governance_details_votes_wrap"},[n("div",{staticClass:"governance_details_votes_slider",class:3===e.Proposal.Status&&e.Type1Number>e.Type2Number&&e.Type1Number>e.Type3Number?"win_governance":""},[n("p",{staticClass:"between"},[n("span",[e._v(e._s(e.$t("Governance.Governance_text3")))]),e._v(" "),n("span",[e._v(e._s(e.fixD(e.Type1,0))+"("+e._s(e.Type1Number)+")")])]),e._v(" "),n("div",{staticClass:"slider_wrap"},[n("div",{staticClass:"slider_bar",style:"width:"+e.Type1Number})])]),e._v(" "),n("div",{staticClass:"governance_details_votes_slider",class:3===e.Proposal.Status&&e.Type2Number>e.Type1Number&&e.Type2Number>e.Type3Number?"win_governance":""},[n("p",{staticClass:"between"},[n("span",[e._v(e._s(e.$t("Governance.Governance_text4")))]),e._v(" "),n("span",[e._v(e._s(e.fixD(e.Type2,0))+"("+e._s(e.Type2Number)+")")])]),e._v(" "),n("div",{staticClass:"slider_wrap"},[n("div",{staticClass:"slider_bar",style:"width:"+e.Type2Number})])]),e._v(" "),n("div",{staticClass:"governance_details_votes_slider",class:3===e.Proposal.Status&&e.Type3Number>e.Type1Number&&e.Type3Number>e.Type2Number?"win_governance":""},[n("p",{staticClass:"between"},[n("span",[e._v(e._s(e.$t("Governance.Governance_text5"))+" ")]),e._v(" "),n("span",[e._v(e._s(e.fixD(e.Type3,0))+"("+e._s(e.Type3Number)+")")])]),e._v(" "),n("div",{staticClass:"slider_wrap"},[n("div",{staticClass:"slider_bar",style:"width:"+e.Type3Number})])])])]),e._v(" "),n("div",{staticClass:"governance_details_self"},[n("div",{staticClass:"governance_details_self_title"},[e._v("\n      "+e._s(e.$t("Governance.Governance_text21"))+"\n    ")]),e._v(" "),n("div",{staticClass:"governance_details_self_wrap"},[n("div",{staticClass:"governance_details_self_votes between"},[n("span",[e._v(e._s(e.$t("Governance.Governance_text3")))]),e._v(" "),n("span",[e._v(e._s(e.fixD(e.SelfType1,4)))])]),e._v(" "),n("div",{staticClass:"governance_details_self_votes between"},[n("span",[e._v(e._s(e.$t("Governance.Governance_text4")))]),e._v(" "),n("span",[e._v(e._s(e.fixD(e.SelfType2,4)))])]),e._v(" "),n("div",{staticClass:"governance_details_self_votes between"},[n("span",[e._v(e._s(e.$t("Governance.Governance_text5")))]),e._v(" "),n("span",[e._v(e._s(e.fixD(e.SelfType3,4)))])])])])])}),[],!1,null,"72e8e44a",null).exports),D={layout:"home",name:"governance-details",components:{Title:title.a,Proposal:k,Details:details}},V=(n(2290),Object(c.a)(D,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"governance_container"},[n("Title"),e._v(" "),n("nuxt-link",{staticClass:"governance_comeback",attrs:{tag:"div",to:"/governance"}},[n("svg",{staticClass:"icon svg-icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-rightSelect"}})]),e._v(" "),n("span",[e._v(e._s(e.$t("Governance.Governance_text22")))])]),e._v(" "),n("div",{staticClass:"governance_infomation_wrap"},[n("div",{staticClass:"governance_infomation"},[n("Proposal"),e._v(" "),n("Details")],1)])],1)}),[],!1,null,"13895a67",null));t.default=V.exports}}]);