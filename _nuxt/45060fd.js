(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{1100:function(e,t,n){e.exports=function(e){function t(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var i={};return t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=2)}([function(e,t,i){var n=i(4)(i(1),i(5),null,null);e.exports=n.exports},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(3);t.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(e){return e>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(e,t,i,n){return i*(1-Math.pow(2,-10*e/n))*1024/1023+t}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,n.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,n.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,n.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,n.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(e){this.startTime||(this.startTime=e),this.timestamp=e;var t=e-this.startTime;this.remaining=this.localDuration-t,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(t,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(t,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(t/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(t/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),t<this.localDuration?this.rAF=(0,n.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(e){return!isNaN(parseFloat(e))},formatNumber:function(e){e=e.toFixed(this.decimals);var t=(e+="").split("."),i=t[0],n=t.length>1?this.decimal+t[1]:"",a=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;a.test(i);)i=i.replace(a,"$1"+this.separator+"$2");return this.prefix+i+n+this.suffix}},destroyed:function(){(0,n.cancelAnimationFrame)(this.rAF)}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){return e&&e.__esModule?e:{default:e}}(i(0));t.default=a.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",a.default)},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=0,a="webkit moz ms o".split(" "),r=void 0,o=void 0;if("undefined"==typeof window)t.requestAnimationFrame=r=function(){},t.cancelAnimationFrame=o=function(){};else{t.requestAnimationFrame=r=window.requestAnimationFrame,t.cancelAnimationFrame=o=window.cancelAnimationFrame;for(var s=void 0,u=0;u<a.length&&(!r||!o);u++)s=a[u],t.requestAnimationFrame=r=r||window[s+"RequestAnimationFrame"],t.cancelAnimationFrame=o=o||window[s+"CancelAnimationFrame"]||window[s+"CancelRequestAnimationFrame"];r&&o||(t.requestAnimationFrame=r=function(e){var t=(new Date).getTime(),i=Math.max(0,16-(t-n)),a=window.setTimeout((function(){e(t+i)}),i);return n=t+i,a},t.cancelAnimationFrame=o=function(e){window.clearTimeout(e)})}t.requestAnimationFrame=r,t.cancelAnimationFrame=o},function(e,t){e.exports=function(e,t,i,n){var a,r=e=e||{},o=typeof e.default;"object"!==o&&"function"!==o||(a=e,r=e.default);var s="function"==typeof r?r.options:r;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),i&&(s._scopeId=i),n){var u=Object.create(s.computed||null);Object.keys(n).forEach((function(e){var t=n[e];u[e]=function(){return t}})),s.computed=u}return{esModule:a,exports:r,options:s}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("span",[e._v("\n  "+e._s(e.displayValue)+"\n")])},staticRenderFns:[]}}])},1101:function(e,t,n){e.exports=n.p+"img/loading.a310216.png"},1102:function(e,t,n){e.exports=n.p+"img/pancake@2x.ac05570.png"},1103:function(e,t,n){e.exports=n.p+"img/dodo@2x.c08f379.png"},1244:function(e,t,n){var content=n(1261);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(27).default)("263c10bb",content,!0,{sourceMap:!1})},1245:function(e,t,n){var content=n(1263);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(27).default)("ebd28dc8",content,!0,{sourceMap:!1})},1249:function(e,t,n){var map={"./af":1104,"./af.js":1104,"./ar":1105,"./ar-dz":1106,"./ar-dz.js":1106,"./ar-kw":1107,"./ar-kw.js":1107,"./ar-ly":1108,"./ar-ly.js":1108,"./ar-ma":1109,"./ar-ma.js":1109,"./ar-sa":1110,"./ar-sa.js":1110,"./ar-tn":1111,"./ar-tn.js":1111,"./ar.js":1105,"./az":1112,"./az.js":1112,"./be":1113,"./be.js":1113,"./bg":1114,"./bg.js":1114,"./bm":1115,"./bm.js":1115,"./bn":1116,"./bn-bd":1117,"./bn-bd.js":1117,"./bn.js":1116,"./bo":1118,"./bo.js":1118,"./br":1119,"./br.js":1119,"./bs":1120,"./bs.js":1120,"./ca":1121,"./ca.js":1121,"./cs":1122,"./cs.js":1122,"./cv":1123,"./cv.js":1123,"./cy":1124,"./cy.js":1124,"./da":1125,"./da.js":1125,"./de":1126,"./de-at":1127,"./de-at.js":1127,"./de-ch":1128,"./de-ch.js":1128,"./de.js":1126,"./dv":1129,"./dv.js":1129,"./el":1130,"./el.js":1130,"./en-au":1131,"./en-au.js":1131,"./en-ca":1132,"./en-ca.js":1132,"./en-gb":1133,"./en-gb.js":1133,"./en-ie":1134,"./en-ie.js":1134,"./en-il":1135,"./en-il.js":1135,"./en-in":1136,"./en-in.js":1136,"./en-nz":1137,"./en-nz.js":1137,"./en-sg":1138,"./en-sg.js":1138,"./eo":1139,"./eo.js":1139,"./es":1140,"./es-do":1141,"./es-do.js":1141,"./es-mx":1142,"./es-mx.js":1142,"./es-us":1143,"./es-us.js":1143,"./es.js":1140,"./et":1144,"./et.js":1144,"./eu":1145,"./eu.js":1145,"./fa":1146,"./fa.js":1146,"./fi":1147,"./fi.js":1147,"./fil":1148,"./fil.js":1148,"./fo":1149,"./fo.js":1149,"./fr":1150,"./fr-ca":1151,"./fr-ca.js":1151,"./fr-ch":1152,"./fr-ch.js":1152,"./fr.js":1150,"./fy":1153,"./fy.js":1153,"./ga":1154,"./ga.js":1154,"./gd":1155,"./gd.js":1155,"./gl":1156,"./gl.js":1156,"./gom-deva":1157,"./gom-deva.js":1157,"./gom-latn":1158,"./gom-latn.js":1158,"./gu":1159,"./gu.js":1159,"./he":1160,"./he.js":1160,"./hi":1161,"./hi.js":1161,"./hr":1162,"./hr.js":1162,"./hu":1163,"./hu.js":1163,"./hy-am":1164,"./hy-am.js":1164,"./id":1165,"./id.js":1165,"./is":1166,"./is.js":1166,"./it":1167,"./it-ch":1168,"./it-ch.js":1168,"./it.js":1167,"./ja":1169,"./ja.js":1169,"./jv":1170,"./jv.js":1170,"./ka":1171,"./ka.js":1171,"./kk":1172,"./kk.js":1172,"./km":1173,"./km.js":1173,"./kn":1174,"./kn.js":1174,"./ko":1175,"./ko.js":1175,"./ku":1176,"./ku.js":1176,"./ky":1177,"./ky.js":1177,"./lb":1178,"./lb.js":1178,"./lo":1179,"./lo.js":1179,"./lt":1180,"./lt.js":1180,"./lv":1181,"./lv.js":1181,"./me":1182,"./me.js":1182,"./mi":1183,"./mi.js":1183,"./mk":1184,"./mk.js":1184,"./ml":1185,"./ml.js":1185,"./mn":1186,"./mn.js":1186,"./mr":1187,"./mr.js":1187,"./ms":1188,"./ms-my":1189,"./ms-my.js":1189,"./ms.js":1188,"./mt":1190,"./mt.js":1190,"./my":1191,"./my.js":1191,"./nb":1192,"./nb.js":1192,"./ne":1193,"./ne.js":1193,"./nl":1194,"./nl-be":1195,"./nl-be.js":1195,"./nl.js":1194,"./nn":1196,"./nn.js":1196,"./oc-lnc":1197,"./oc-lnc.js":1197,"./pa-in":1198,"./pa-in.js":1198,"./pl":1199,"./pl.js":1199,"./pt":1200,"./pt-br":1201,"./pt-br.js":1201,"./pt.js":1200,"./ro":1202,"./ro.js":1202,"./ru":1203,"./ru.js":1203,"./sd":1204,"./sd.js":1204,"./se":1205,"./se.js":1205,"./si":1206,"./si.js":1206,"./sk":1207,"./sk.js":1207,"./sl":1208,"./sl.js":1208,"./sq":1209,"./sq.js":1209,"./sr":1210,"./sr-cyrl":1211,"./sr-cyrl.js":1211,"./sr.js":1210,"./ss":1212,"./ss.js":1212,"./sv":1213,"./sv.js":1213,"./sw":1214,"./sw.js":1214,"./ta":1215,"./ta.js":1215,"./te":1216,"./te.js":1216,"./tet":1217,"./tet.js":1217,"./tg":1218,"./tg.js":1218,"./th":1219,"./th.js":1219,"./tk":1220,"./tk.js":1220,"./tl-ph":1221,"./tl-ph.js":1221,"./tlh":1222,"./tlh.js":1222,"./tr":1223,"./tr.js":1223,"./tzl":1224,"./tzl.js":1224,"./tzm":1225,"./tzm-latn":1226,"./tzm-latn.js":1226,"./tzm.js":1225,"./ug-cn":1227,"./ug-cn.js":1227,"./uk":1228,"./uk.js":1228,"./ur":1229,"./ur.js":1229,"./uz":1230,"./uz-latn":1231,"./uz-latn.js":1231,"./uz.js":1230,"./vi":1232,"./vi.js":1232,"./x-pseudo":1233,"./x-pseudo.js":1233,"./yo":1234,"./yo.js":1234,"./zh-cn":1235,"./zh-cn.js":1235,"./zh-hk":1236,"./zh-hk.js":1236,"./zh-mo":1237,"./zh-mo.js":1237,"./zh-tw":1238,"./zh-tw.js":1238};function r(e){var t=o(e);return n(t)}function o(e){if(!n.o(map,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return map[e]}r.keys=function(){return Object.keys(map)},r.resolve=o,e.exports=r,r.id=1249},1255:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC3UlEQVRoQ+2Z34vTQBDHv5Nc0toTbBXt9RT1DkXEIogHyl39C3zxRf8Wfeub/i364ot/gb1ywokgVRHFqsjVItoTvNomTVaSekd/JdlNNm0Dt5Cn7M7OZ2d2Z3aWkPBGCdcfhwCztqA0C7APF1L42ciCrAxMpoOY5n5OY2S6n0YGmNrGicIuXfzYlQEfCYBtX9fQeXcS6OXAWFpIIaIOsNBC+vIPWntpCo0d6BwKgD2+q2L5WR6KmYcFJezk7jgVNmytiZ3bTbr3xBKVJQzAnh/LAe2zABZEJwvo3wMyX+nW75aIXG4Axhhhc7EAZhZEJhDuS1oDG3sNImI8Y7kAGCsrqDw6D1g5HqHR+6gtlO5/JirbQbICAdyVr6ZXYdvZIGFy/zsQf+tBlggGqGSWY3cbL3LSGlRq7/gtjC/A/w27KndlRaVlPvltbE8A96gsPC3GcNqIEvTQuFPzOmK9AaK6jq1sD2mq2Guimh/093GliQBuhDVeFyMFKZkATrDTr9YmRezJANUjp2H1lkKvmDNQJoAjz8MKkwEq+hXh3GaUVjoAdahkvBmdZgzAzSq/f3E2b7QmG8DRZulcbTSLHQfYWszDNM5E0z4GF3IU0vRvdHOvOajbOMCL9AoM6/hcAujqL7rRqfsDVFKXwOyjcwlAyh8qdd/7A2zqRdgsNZcACnVpw6j5A1S1a5HO/33pcWxiFTatm69mAxBkUp5IzQUQlwvJAOByobg2sQwArk0c1zEqA4DrGJUVyIIUDvOfK5DJSiXCKBg0hieVcGQwGclckDKi/4kzmesDzPAe7AUmlE7LuNCIrrBff9ELzdxZQfRK6QIk/VLvQvTroMksq+y75Ew3dNTClmuFpJcW+xBlBdWHK1OrjyrKLtYf1KUUdw9cKcnl9cEjOrEPHEMQSX5iGgJxI/bbU7CtrHAhbJaPfJOifiKfWWWmO2FlBb7QhBU8rXGHANNaaa95/gHuU4JABGFw5QAAAABJRU5ErkJggg=="},1256:function(e,t,n){e.exports=n.p+"img/pagerlogo.e2040e8.png"},1258:function(e,t,n){"use strict";var r={hTPT:["hTPT is the call option of TPT.","Total Supply: 5,000,000 (20% for TPT-BUSD LP on Pancakeswap, 40% for FLASH Mining, 40% for Burning BOX) Reasonable strike price: 1 TPT= 0.06BUSD","Expire date: May 3th 24:00 SGT","Example: If you get 1 hTPT, you could swap 0.06 BUSD to 1 TPT by click the ‘activate’ button on TradingView Tab. To be specific, if TPT hit $0.07, you could get $0.01 NET profit by this clicking ‘Activate’ behavior.","If hTPT get expired, it could be a souvenir token","Please do not trade heavily on hTPT."],hDODO:["hDODO is the call option of DODO.","Total Supply: 75,000 (22,000 for vDODO holders, 40,000 for FLASH Mining, 10,000 for Burning BOX) Reasonable strike price: 1 DODO= 10 HELMET","Expire date: Apr. 14th 24:00 SGT","Example: If you get 1 hDODO, you could swap 10 HELMET to 1 DODO by click the 'activate' button on TradingView Tab. To be specific, if DODO hit $21 and HELMET hit $2, you could get $1 profit by this 'Activate' behavior.","If hDODO get expired, it could be souvenir token","Please do not trade heavily on hDODO."],hMATH:["MATH cover miss out policy. (It performs more like a call option of MATH)","In this policy, the ratio of MATH & BNB is 1MATH = 0.014BNB","It is the reasonable activate price, meaning that you could swap 0.014BNB+1$hMATH to 1MATH before the expire date.","For example, if $MATH hit 0.015BNB, you could activate the policy and swap 0.014BNB + 1$hMATH to 1 $MATH on www.helmet.insure, and get 0.001BNB as profit.","Do not trade heavily on $hMATH unless you are clear about the trading risk","As policy holding certification, there is an expiration date for the $hMATH, but as token, it is alive forever."],hAUTO:["AUTO cover miss out policy. (It performs more like a call option of AUTO)","The reasonable activate price is 1AUTO=42BNB, meaning that you could swap 42BNB+1$hAUTO to 1AUTO before the expire date.","For example, if $AUTO hit 50BNB, you could activate the policy and swap 42BNB + 1$hAUTO to 1 $AUTO on www.helmet.insure, and get 8BNB as profit.","$hAUTO Flash Mining","Start: Feb. 23rd 20:00 SGT","End: Mar.9th 24:00","Policy Expire date: Mar. 24th 24:00 SGT"],BNB500:["$BNB500 is BNB cover miss out policy.","Limited edition: 1500 ( 500 for Airdrop to LP Miners on helmet.insure and 1000 for Flash Mining)","In this policy, we set a ratio: ","BNB : BUSD = 1:500 ","it means that you could swap 500 BUSD+1$BNB500 to 1BNB. It is the reasonable active price, for example, if BNB hit $600, you could active the policy and swap 500 BUSD + 1 $BNB500 to 1 BNB with 100BUSD profit.","Flash Mining Type: ","$hCTK-$Helmet LP Mining Pool Notice: $hCTK will be expired on 20th Feb. 0:00 SGT , you could activate it ASAP or take part in $BNB500 Flash Mining.","Flash Mining Start: 18th Feb. 24:00 SGT","Flash Mining End: 28th Feb. 24:00 SGT","Expire date: 20th Mar. 24:00 SGT"],hCTK:["$CTK cover miss out policy.","In this policy, we set a ratio of Helmet& CTK. HELMET : CTK = 2.5:1 (Anchored $1)","it means that you could swap 2.5Helmet+1$hCTK to 1CTK. It is the reasonable active price, for example, if $CTK hit $1.2, you could active the policy and swap 2.5 $helmet + 1$hCTK to 1 $CTK on www.helmet.insure)","You could activate you policy after all airdrop landing. Since we have more than 9500 addresses to airdrop, it gonna take some time for them to land into your wallet.","Do not trade heavily on LONG & HCCT & hCTK unless you get clear cognition of the trading risk","As policy holding certification, there is an expiration date for the activation, but as token, LONG & HCCT & hCTK is alive forever."],HCCT:["HCCT is the abbreviation of Helmet Cover Cake TokenLiterally, it is the CAKE Cover Miss Out policy ( it is more like the call option of CAKE )","Underlying asset: Cake","Denominated asset: Helmet (it means that if you activate this policy, you would swap 10Helmet for 1Cake with HCCT)","Premium：1Helmet（ from Helmet Vault）","Insurance Price：1CAKE=10Helmet (it means that if you activate this policy, you would swap 10Helmet for 1Cake with 1HCCT)","Supply: 300,000 (80% minted by mining, 20% as initial liquidity)","Reference Activate Price: When “Cake:Helmet ＞1:10”, you could activate this policy ( plz recheck the price to make sure this activation is profitable)","Insurance Period：2021, Feb.15","More details in our Medium."],hFOR:["It is $FOR cover miss out insurance policy (like the call option of $FOR). The reasonable activate price: 1 $FOR=0.25 HELMET.","For example, if $FOR hit 0.3 HELMET, you could swap only 0.25HELMET+1$hFOR to 1 $FOR, and get 0.05HELMET profit.","COMBO Mining period: 15days, from Mar.4th 24:00 SGT to Mar.19th 24:00 SGT (snapshot and Airdrop will be finished before Mar.4th 24:00 SGT)","Expire date: April 4th, 2021","if $hFOR expired, it could be a souvenir token","$hFOR is totally from Airdrop, please do not trade heavily on $hFOR"],hBURGER:["A total of $450,000 $hBurger was given away to LPT Miners on helmet.insure (including Helmet-BNB, Helmet-LONG, Helmet-HCCT LPT Pool, PancakeSwap Helmet-BNB Farm) ","Groundbreaking design of Policy Mining for Real Token!!! $60,000 COMBO Mining Bonus of $Helmet & $Burger !","It is $Burger cover miss out policy. The reasonable activate price: 1 $Burger=0.07 BNB. For example, if $Burger hit 0.08 BNB, you could swap 0.07BNB+1$hBurger to 1 $Burger, and get 0.01BNB profit.","Expire date: March, 9th, 2021","More details in our Medium."],QFEI:["It is the call option of $QSD","The ratio of $QSD & $FEI = 1:1","With 1 $QFEI, you could swap 1 $FEI to 1$QSD on the Insurance- Policy you hold Tab before expire date.","Expire date: May 10th","You could farm $KUN by $QFEI-$QSD LPT","Please do not trade heavily on $QFEI."],BHELMET:["Total Supply: 190,000","Activate price: 1HELMET=1.5BUSD, meaning that you could get 1 $HELMET by just $1.5","Expire date: June 16th 00:00 SGT ","$BHELMET is the reward for HELMET-BNB MLP, allowing Helmeters to get Helmet at lower price. ","Remember to activate $bHELMET on 'Policy You Hold' tab and do not trade heavily on $BHELMET."],iTOKEN:["iToken is the certificate to swap/activate for TOKEN.","Only users who hold iToken could get TOKEN during April 23rd 21:00 SGT - April 24th 21:00 SGT","iToken cannot be activated before/after that time period","iTOKEN activate/swap formula: 1 iTOKEN+0.3BUSD = 1TOKEN","The lifetime of iToken is from Apr. 23rd 21:00 SGT - Apr. 24th 21:00 SGT. ","Please be sure to activate the iToken within the validity period."],QHELMET:["$QHELMET is the policy that allow users to buy HELMET at almost $1.5 ","Total Supply: 60,000","Activate price: 1HELMET=1.5QSD, meaning that you could get 1 $HELMET by just 1.5QSD","Expire date: June 19th 24:00 SGT","$QHELMET is the reward for HELMET-KUN DLP, allowing users to get Helmet at lower price.","Remember to activate $QHELMET on 'Policy You Hold' tab and do not trade heavily on $QHELMET."],hxBURGER:["It is $xBurger's cover miss out policy ( CALL Option of $xBurger). The reasonable activate price: 1 $xBurger=0.1 BNB.","For example, if $xBurger hit 0.2 BNB, you could swap 0.1BNB+1 $hxBurger to 1 $xBurger, and get net 0.1BNB profit.","Total supply: 20,000","Expire date: May, 21st, 2021","Helmet team took 20,000 Helmet as premium for supporting $hxBurger policy creating.","Do not trade heavily on $hxBurger, since if xBurger fail to hit 0.1BNB, $hxBurger would just be a souvenir token."],iBLACK:["iBLACK is the certificate to swap/activate for BLACK. ","Only users who hold iBLACK could get BLACK during April 29th 21:00 SGT — April 30th 21:00 SGT(️iBLACK cannot be activated before/after that time period))","iBLACK activate/swap formula: 1iBLACK+0.05BUSD = 1BLACK","The lifetime of iBLACK is from Apr. 29th 21:00 SGT — Apr. 30th 21:00 SGT. ","Please be sure to activate the iBLACK within the validity period."],iWAR:["iWAR is the certificate to swap/activate for WAR.","Only users who hold iWAR could get WAR during Apr. 30th 21:00 SGT — May 1st 21:00 SGT(iWAR cannot be activated before/after that time period)","iWAR activate/swap formula: 1 iWAR+0.25BUSD  1 WAR","The lifetime of iWAR is from Apr. 30th 21:00 SGT — May 1st 21:00 SGT. ","Please be sure to activate the iWAR within the validity period."],iLEV:["iLEV is the certificate to swap/activate for LEV.","Only users who hold iLEV could get LEV during May 7th 20:00 SGT — May 8th 20:00 SGT (iLEV cannot be activated before/after that time period)","iLEV activate/swap formula: 1 iLEV+0.5BUSD  1 LEV","The lifetime of iLEV is from May 7th 20:00 SGT — May 8th 20:00 SGT. ","Please be sure to activate the iLEV within the validity period."],iWMASS:["IIO WMASS Supply: $50,000 worth of WMASS","iWMASS activate/swap formula: 1 iWMASS+0.35BUSD Swap 1 WMASS","iWMASS Distribution: May 20th 21:00 SGT — May 22nd 21:00 SGT","Activate/swap iWMASS period: May 22nd 21:00 SGT — May 23rd 21:00 SGT."],iCOW:["iCOW is the certificate to swap/activate for COW.","Only users who hold iCOW could get COW during May 25th 22:00 SGT — May 26th 22:00 SGT.(iCOW cannot be activated before/after that time period)","iCOW activate/swap formula: 1 iCOW+0.5BUSD  1 COW","The lifetime of iCOW is from May 25th 22:00 SGT — May 26th 22:00 SGT. ","Please be sure to activate iCOW within the ruled period."],iCTT:["iCTT is the certificate to swap/activate for CTT. ","Only users who hold iCTT could get CTT during May 25th 21:00 SGT — May 26th 21:00 SGT.(iCTT cannot be activated before/after that time period)","iCTT activate/swap formula: 1 iCTT+30BUSD 1 CTT","The lifetime of iCTT is from May 25th 21:00 SGT — May 26th 21:00 SGT. ","Please be sure to activate the iCTT within the validity period."],iPAUL:["IIO PAUL Supply: 100,000,000","iPAUL activate/swap formula: 1 iPAUL+0.002 BUSD Swap 1 PAUL","iPAUL Distribution: May 30th 21:00 SGT - June 1st 21:00 SGT","Activate/swap iPAUL period: June 2nd 21:00 SGT - June 3rd 21:00 SGT","IIO Ticket: 1 $HELMET"],hWINGS:["It is $WINGS cover miss out policy ( CALL Option of $WINGS).","The reasonable activate price: 1 $WINGS=9 BUSD.","For example, if $WINGS hit 10 BUSD, you could swap 9BUSD+1 $hWINGS to 1 $WINGS, and get net 1 BUSD profit.","Total supply: 7500","Expire date: July, 10th, 2021"," Do not trade heavily on $hWINGS, b/c if $WINGS fail to hit 9BUSD, $hWING would just be used as short-term mining shovel and a souvenir token."]},o={data:function(){return{showFlag:!1,title:"",text:[],onepagerList:r}},mounted:function(){var e=this;this.$bus.$on("OPEN_ONEPAGER",(function(data){e.showFlag=data.showFlag,e.title=data.title,e.text=r[data.text]})),this.$bus.$on("CLOSE_ONEPAGER",(function(){e.showFlag=!1}))},methods:{closeOnepager:function(){this.$bus.$emit("CLOSE_ONEPAGER")}}},l=(n(1262),n(16)),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"onepager"},on:{touchmove:function(e){e.preventDefault()}}},[e.showFlag?n("div",{staticClass:"onepager_mask"},[n("div",{staticClass:"onepager_wrapper"},[n("div",{staticClass:"title"},[n("i",{on:{click:e.closeOnepager}})]),e._v(" "),n("h3",[n("span",[e._v("\n          "+e._s(this.title)+"\n        ")])]),e._v(" "),n("div",{staticClass:"content"},[n("section",[n("div",e._l(e.text,(function(t,r){return n("p",{key:r},[e._v(e._s(t))])})),0)]),e._v(" "),n("div",{staticClass:"bg"})])])]):e._e()])}),[],!1,null,"2596e634",null);t.a=component.exports},1259:function(e,t,n){"use strict";var r={components:{PHeader:n(283).a},data:function(){return{wraperFlag:!1}},mounted:function(){var e=this;this.$bus.$on("OPEN_WRAPER_PAFE",(function(t){e.wraperFlag=t}))},methods:{}},o=(n(1260),n(16)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.wraperFlag?n("div",{staticClass:"wraper"},[n("PHeader"),e._v(" "),n("div",{staticClass:"wraper_slot"},[e._t("default")],2)],1):e._e()}),[],!1,null,"7b7e81fe",null);t.a=component.exports},1260:function(e,t,n){"use strict";n(1244)},1261:function(e,t,n){var r=n(26)(!1);r.push([e.i,"@media screen and (min-width:750px){.wraper[data-v-7b7e81fe]{display:none}}@media screen and (max-width:750px){.wraper[data-v-7b7e81fe]{position:fixed;top:0;left:0;width:100%;height:100vh;overflow:hidden;z-index:12;display:flex;flex-direction:column}body.light .wraper[data-v-7b7e81fe]{background:#f8f9fa}body.dark .wraper[data-v-7b7e81fe]{background:#121212}.wraper_slot[data-v-7b7e81fe]{flex:1;overflow-y:scroll}}",""]),e.exports=r},1262:function(e,t,n){"use strict";n(1245)},1263:function(e,t,n){var r=n(26),o=n(65),l=n(86),d=n(1256),c=r(!1),h=o(l),m=o(d);c.push([e.i,".onepager_mask[data-v-2596e634]{position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.8);z-index:999}.onepager-enter-active[data-v-2596e634]{-webkit-animation:onepager-in-data-v-2596e634 .5s;animation:onepager-in-data-v-2596e634 .5s}.onepager-leave-active[data-v-2596e634]{animation:onepager-in-data-v-2596e634 .5s reverse}@-webkit-keyframes onepager-in-data-v-2596e634{0%{transform:scale(0)}50%{transform:scale(1.25)}to{transform:scale(1)}}@keyframes onepager-in-data-v-2596e634{0%{transform:scale(0)}50%{transform:scale(1.25)}to{transform:scale(1)}}@media screen and (min-width:750px){.onepager_wrapper[data-v-2596e634]{width:627px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:8px;padding:30px;display:flex;flex-direction:column}body.light .onepager_wrapper[data-v-2596e634]{background:#fff}body.dark .onepager_wrapper[data-v-2596e634]{background:#1d1d1d}.onepager_wrapper .title[data-v-2596e634]{display:flex;align-items:center;justify-content:flex-end}.onepager_wrapper .title i[data-v-2596e634]{width:24px;height:24px;display:inline-block;background-repeat:no-repeat;background-image:url("+h+");background-size:100% 100%;cursor:pointer}.onepager_wrapper h3[data-v-2596e634]{text-align:center;height:24px;align-self:center;transform:translateY(10px);padding:0 10px;min-width:196px}body.light .onepager_wrapper h3[data-v-2596e634]{background:linear-gradient(180deg,#fff,#ffcb82 150%);color:#17173a}body.dark .onepager_wrapper h3[data-v-2596e634]{background:linear-gradient(180deg,#1d1d1d,#2c2c2c 150%);color:#e1e1e1}.onepager_wrapper h3 span[data-v-2596e634]{display:inline-block;transform:translateY(-5px)}.onepager_wrapper .content[data-v-2596e634]{border:1px solid #f96001;border-radius:20px;padding:30px 20px;background-image:url("+m+");background-repeat:no-repeat;background-size:160px 120px;background-position:95% 92%}.onepager_wrapper .content p[data-v-2596e634]{margin:10px 0;font-size:14px;line-height:28px}body.light .onepager_wrapper .content p[data-v-2596e634]{color:#17173a}body.dark .onepager_wrapper .content p[data-v-2596e634]{color:#e1e1e1}}@media screen and (max-width:750px){.onepager_wrapper[data-v-2596e634]{width:90%;height:80%;max-height:550px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:8px;padding:20px 10px;display:flex;flex-direction:column}body.light .onepager_wrapper[data-v-2596e634]{background:#fff}body.dark .onepager_wrapper[data-v-2596e634]{background:#1d1d1d}.onepager_wrapper .title[data-v-2596e634]{display:flex;align-items:center;justify-content:flex-end}.onepager_wrapper .title i[data-v-2596e634]{width:24px;height:24px;display:inline-block;background-repeat:no-repeat;background-image:url("+h+");background-size:100% 100%;cursor:pointer}.onepager_wrapper h3[data-v-2596e634]{text-align:center;height:24px;align-self:center;transform:translateY(10px);padding:0 10px;min-width:196px}body.light .onepager_wrapper h3[data-v-2596e634]{background:linear-gradient(180deg,#fff,#ffcb82 150%);color:#17173a}body.dark .onepager_wrapper h3[data-v-2596e634]{background:linear-gradient(180deg,#1d1d1d,#2c2c2c 150%);color:#e1e1e1}.onepager_wrapper h3 span[data-v-2596e634]{display:inline-block;transform:translateY(-5px)}.onepager_wrapper .content[data-v-2596e634]{flex:1;border:1px solid #f96001;border-radius:20px;padding:30px 20px 0;overflow:hidden}.onepager_wrapper .content section[data-v-2596e634]{overflow-y:scroll;height:80%}.onepager_wrapper .content section p[data-v-2596e634]{margin:10px 0;font-size:14px;line-height:28px}body.light .onepager_wrapper .content section p[data-v-2596e634]{color:#17173a}body.dark .onepager_wrapper .content section p[data-v-2596e634]{color:#e1e1e1}.onepager_wrapper .content .bg[data-v-2596e634]{width:100%;height:70px;background-image:url("+m+");background-repeat:no-repeat;background-size:96px 70px;background-position:100%}}",""]),e.exports=c},1309:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return y}));var r=n(5),o=(n(120),n(24),n(1437)),l=n(268),d=n(6),c=(n(20),n(23)),h=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(address){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.a)();case 2:return t=e.sent,e.next=5,new t.eth.Contract(o.abi,"0x1eCaeE6e4e01C45712ccd9262c3e9F623A6ac7ed");case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(t,n,r){var o,l,c,m;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=window.chainID||56,l=Object(d.a)(t,o),c=Object(d.a)(n,o),e.next=5,h();case 5:return m=e.sent,e.abrupt("return",m.methods.getLpValueByFactory("0x1eCaeE6e4e01C45712ccd9262c3e9F623A6ac7ed",l,c,"1000000000000000000").call().then((function(e){return Number(e[0])/Math.pow(10,e[1])})));case 7:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),y=function(){var e=Object(r.a)(regeneratorRuntime.mark((function e(address){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.a)();case 2:return t=e.sent,e.next=5,new t.eth.Contract(l.abi,address);case 5:return n=e.sent,e.abrupt("return",n.methods.getReserves().call().then((function(e){var t=e.reserve0;return e.reserve1/t})));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},1437:function(e){e.exports=JSON.parse('{"abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"chainSymbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpToken","type":"address"},{"internalType":"address","name":"_baseToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getDemaxLpValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"getDemaxPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenA","type":"address"},{"internalType":"address","name":"_tokenB","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getLpValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_tokenA","type":"address"},{"internalType":"address","name":"_tokenB","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getLpValueByFactory","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"getPairByFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"getSwapPairReserve","outputs":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint256","name":"decimals0","type":"uint256"},{"internalType":"uint256","name":"decimals1","type":"uint256"},{"internalType":"uint256","name":"reserve0","type":"uint256"},{"internalType":"uint256","name":"reserve1","type":"uint256"},{"internalType":"uint256","name":"totalSupply","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"getSwapPairReserveByTokens","outputs":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint256","name":"decimals0","type":"uint256"},{"internalType":"uint256","name":"decimals1","type":"uint256"},{"internalType":"uint256","name":"reserve0","type":"uint256"},{"internalType":"uint256","name":"reserve1","type":"uint256"},{"internalType":"uint256","name":"totalSupply","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_swapFactory","type":"address"},{"internalType":"address","name":"_swapDemaxFactory","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"queryToken","outputs":[{"components":[{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"decimals","type":"uint256"},{"internalType":"uint256","name":"balanceOf","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"internalType":"struct Query.Token","name":"tk","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"queryTokenList","outputs":[{"components":[{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"decimals","type":"uint256"},{"internalType":"uint256","name":"balanceOf","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"internalType":"struct Query.Token[]","name":"token_list","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapDemaxFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]}')}}]);