(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{1585:function(e,t,n){"use strict";n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return x})),n.d(t,"c",(function(){return w}));var o=n(32),r=(n(232),n(1592)),d=n(85),l=n(813),c=n(43),y=n(107),m=n.n(y),v=n(30),_=n(22),f=[{PoolAddress:"0x4E18F9Ed49ad3d3fDdadE4d1464ED71133AA1EAC",PoolABI:r,Title:"Proposal.Governance1.text1",Router:"link1",Perhaps:"Proposal.Governance1.text2",Details:["Proposal.Governance1.text2","Proposal.Governance1.text3","Proposal.Governance1.text4","Proposal.Governance1.text5","Proposal.Governance1.text6","Proposal.Governance1.text7","Proposal.Governance1.text8","Proposal.Governance1.text9","Proposal.Governance1.text10","Proposal.Governance1.text11","Proposal.Governance1.text12","Proposal.Governance1.text13","Proposal.Governance1.text14","Proposal.Governance1.text15","Proposal.Governance1.text16","Proposal.Governance1.text17","Proposal.Governance1.text18"],StartTime:"2021/11/02 00:00 UTC+8",FinishTime:"2021/11/22 00:00 UTC+8",Proposal:[{Text:1,ID:1},{Text:2,ID:2},{Text:3,ID:3}]}],x=function(e){for(var t=0;t<e.length;t++){var n=e[t],o=n.StartTime,r=n.FinishTime,d=Date.now(),l=1*new Date(o),c=1*new Date(r),y=d>l,m=d>c;y||(n.Status=1,n.StatusImg="unopen",n.StatusText="".concat(window.$nuxt.$t("Governance.Governance_text9")),n.ShowTime="Ongoing"!==o&&"Mining"!==r?h(l):"Ongoing"),y&&!m&&(n.Status=2,n.StatusImg="ongoing",n.StatusText="".concat(window.$nuxt.$t("Governance.Governance_text10")),"Ongoing"!==o&&"Mining"!==r&&(n.ShowTime=h(c))),m&&(n.Status=3,n.StatusImg="finish",n.StatusText="".concat(window.$nuxt.$t("Governance.Governance_text8")),n.ShowTime="Finished")}return e},h=function(time){var e=time-1*new Date,t=Math.floor(e/864e5),n=Math.floor((e-24*t*36e5)/36e5),o=Math.floor((e-24*t*36e5-36e5*n)/6e4),r=t>9?t:"0"+t,d=n>9?n:"0"+n,l=o>9?o:"0"+o;return Number(r)>0?"".concat(r,"<b>").concat(window.$nuxt.$t("Content.DayM"),"</b><i>/</i>").concat(d,"<b>").concat(window.$nuxt.$t("Content.HourM"),"</b>"):"".concat(d,"<b>").concat(window.$nuxt.$t("Content.HourM"),"</b><i>/</i>").concat(l,"<b>").concat(window.$nuxt.$t("Content.MinM"),"</b>")},w=function(e){if(2!=!e.Status)return e.APR="--";var t=e.PoolAddress,n="0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",y=(new c.Contract(n,d),new c.Contract(n,l.abi)),f=new c.Contract(t,r),x=[y.allowance("0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699",t),f.rewardsDuration(),f.totalSupply()];return Object(_.i)().all(x).then((function(t){var n=Object(_.l)(t),r=Object(o.a)(n,3),d=r[0],l=r[1],c=r[2],y=(d=Object(_.f)(d))/(l/=86400),f=1+y/(c=Object(_.f)(c)),x=Object(v.c)(y/c*365*100,2)+"%",h=new m.a(100*Math.pow(f,365)).toFixed(2)+"%";return e.APR=x,e.APY=h}))}},1592:function(e){e.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousGovernor","type":"address"},{"indexed":true,"internalType":"address","name":"newGovernor","type":"address"}],"name":"GovernorshipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"proposalID","type":"uint256"}],"name":"StakeAndVote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"governor_","type":"address"}],"name":"__Governable_init_unchained","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"},{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_ecoAddr","type":"address"}],"name":"__StakingPool_init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ecoAddr","type":"address"}],"name":"__StakingPool_init_unchained","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"__StakingRewards_init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"__StakingRewards_init_unchained","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"begin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"compound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"}],"name":"getConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"}],"name":"getConfigA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getConfigI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"voter","type":"address"},{"internalType":"uint256","name":"proposalID","type":"uint256"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lep","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lep","type":"uint256"},{"internalType":"uint256","name":"_period","type":"uint256"},{"internalType":"uint256","name":"_span","type":"uint256"},{"internalType":"uint256","name":"_begin","type":"uint256"}],"name":"notifyRewardBegin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"period","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardDelta","outputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfigA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfigI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stakeAndCompound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"proposalID","type":"uint256"}],"name":"stakeAndVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newGovernor","type":"address"}],"name":"transferGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]')},1599:function(e,t,n){var content=n(1682);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(26).default)("5dab18c8",content,!0,{sourceMap:!1})},1681:function(e,t,n){"use strict";n(1599)},1682:function(e,t,n){var o=n(25),r=n(63),d=n(1683),l=o(!1),c=r(d);l.push([e.i,".governance_title[data-v-6725de93]{background:#4b2910;border-radius:5px}.governance_title_wrap[data-v-6725de93]{width:100%;height:100%;background-image:url("+c+");background-repeat:no-repeat;background-position:50%}.governance_title_text h3[data-v-6725de93]{font-family:IBMPlexSans-SemiBold,IBMPlexSans;font-weight:600;color:#fff}.governance_title_text p[data-v-6725de93]{font-family:IBMPlexSans;color:#fff;line-height:20px}@media screen and (min-width:750px){.governance_title[data-v-6725de93]{width:100%;min-width:1026px;height:140px;margin:30px auto 10px}.governance_title_wrap[data-v-6725de93]{margin:0 auto;background-image:url("+c+");background-size:1026px 100%}.governance_title_text h3[data-v-6725de93]{font-size:24px;line-height:32px;padding:40px 0 0 40px}.governance_title_text p[data-v-6725de93]{font-size:16px;margin:11px 0 0 40px}}@media screen and (max-width:750px){.governance_title[data-v-6725de93]{width:95%;height:120px;margin:0 auto}.governance_title_wrap[data-v-6725de93]{background-image:url("+c+");background-size:100% 100%}.governance_title_text[data-v-6725de93]{width:100%;height:100%}.governance_title_text h3[data-v-6725de93]{width:335px;font-size:18px;padding:15px 0 0 16px}.governance_title_text p[data-v-6725de93]{width:329px;font-size:12px;margin:8px 0 0 16px}}",""]),e.exports=l},1683:function(e,t,n){e.exports=n.p+"img/governance_titlebg.218ecd5.png"},1684:function(e,t,n){e.exports=n.p+"img/unopen.c4f33cc.png"},1685:function(e,t,n){e.exports=n.p+"img/ongoing.6da611d.png"},1686:function(e,t,n){e.exports=n.p+"img/finish.97bf104.png"},1698:function(e,t,n){"use strict";var o={},r=(n(1681),n(16)),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"governance_title"},[n("div",{staticClass:"governance_title_wrap"},[n("div",{staticClass:"governance_title_text"},[n("h3",[e._v(e._s(e.$t("Governance.Tips3")))]),e._v(" "),n("p",[e._v(e._s(e.$t("Governance.Tips4")))])])])])}),[],!1,null,"6725de93",null);t.a=component.exports},1750:function(e,t,n){var content=n(2002);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(26).default)("97d269e6",content,!0,{sourceMap:!1})},1751:function(e,t,n){var content=n(2009);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(26).default)("0014396e",content,!0,{sourceMap:!1})},2001:function(e,t,n){"use strict";n(1750)},2002:function(e,t,n){var o=n(25),r=n(63),d=n(1684),l=n(1685),c=n(1686),y=n(2003),m=n(2004),v=n(2005),_=n(2006),f=n(2007),x=o(!1),h=r(d),w=r(l),T=r(c),k=r(y),M=r(m),P=r(v),S=r(_),C=r(f);x.push([e.i,".governance_list[data-v-3782caec]{margin-top:28px}.governance_list_item_wrap[data-v-3782caec]{background:#fff3de}.governance_list_item[data-v-3782caec]{margin-top:10px;width:100%;box-shadow:0 4px 8px 0 hsla(0,0%,60.8%,.02);border-radius:5px;padding:20px;position:relative;overflow:hidden}body.dark .governance_list_item[data-v-3782caec],body.light .governance_list_item[data-v-3782caec]{background:#fff3de}.status_img[data-v-3782caec]{width:90px;height:36px;background-size:100% 100%;background-repeat:no-repeat;display:flex;justify-content:center;position:absolute;left:20px;top:0;padding-top:4px}.unopen[data-v-3782caec]{background-image:url("+h+");font-size:14px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;line-height:20px}body.dark .unopen[data-v-3782caec],body.light .unopen[data-v-3782caec]{color:#ffe8d5}.ongoing[data-v-3782caec]{background-image:url("+w+");font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:20px}body.dark .ongoing[data-v-3782caec],body.light .ongoing[data-v-3782caec]{color:#fce5ff}.finish[data-v-3782caec]{background-image:url("+T+");font-size:14px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;color:#fff;line-height:20px}.time[data-v-3782caec]{display:flex;align-items:center;justify-content:center;min-width:161px;min-height:32px;border-radius:0 5px 0 0;padding:0 10px;background-image:url("+k+");background-repeat:no-repeat;background-size:100% 100%}.time span[data-v-3782caec]{font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:18px}body.dark .time span[data-v-3782caec],body.light .time span[data-v-3782caec]{color:#17173a}.time p[data-v-3782caec]{font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:18px}body.dark .time p[data-v-3782caec],body.light .time p[data-v-3782caec]{color:#17173a}.title>h3[data-v-3782caec]{font-size:16px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:16px}body.dark .title>h3[data-v-3782caec],body.light .title>h3[data-v-3782caec]{color:#17173a}.perhaps>p[data-v-3782caec]{font-size:14px;font-family:IBMPlexSans;opacity:.7;line-height:22px}body.dark .perhaps>p[data-v-3782caec],body.light .perhaps>p[data-v-3782caec]{color:#17173a}.perhaps>button[data-v-3782caec]{min-width:97px;padding:0 15px;height:40px;border-radius:5px;background-image:url("+M+");background-repeat:no-repeat;background-size:100% 100%;font-size:14px;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;color:#fff;line-height:18px}@media screen and (min-width:750px){.H5[data-v-3782caec]{display:none}.governance_list[data-v-3782caec]{min-width:1026px}.governance_list_item_title_web[data-v-3782caec]{display:flex;align-items:center;justify-content:space-between;margin-top:25px}.governance_list_item_perhaps_web[data-v-3782caec]{display:flex;align-items:center;margin-top:20px}.governance_list_item_perhaps_web>p[data-v-3782caec]{flex:1;text-indent:2em}.governance_list_item_perhaps_web>button[data-v-3782caec]{margin-left:200px;margin-top:0}.governance_list_item_duck[data-v-3782caec]{width:100%;height:200px;background:url("+P+"),url("+S+");background-repeat:no-repeat,repeat;background-size:200px 200px,100% 200px;background-position:right 0,50%}}@media screen and (max-width:750px){.WEB[data-v-3782caec]{display:none}.governance_list[data-v-3782caec]{width:95%;margin:0 auto;padding-bottom:50px}.governance_list_item_time_h5[data-v-3782caec]{position:absolute;right:0;top:0}.governance_list_item_top_h5[data-v-3782caec]{display:flex;justify-content:space-between}.governance_list_item_title_h5[data-v-3782caec]{margin-top:35px}.governance_list_item_perhaps_h5[data-v-3782caec]{margin-top:20px;text-indent:2em}.governance_list_item_perhaps_h5>button[data-v-3782caec]{margin:24px auto 0;display:flex;align-items:center;justify-content:center}.governance_list_item_duck[data-v-3782caec]{width:100%;height:110px;background-image:url("+C+");background-repeat:no-repeat;background-size:100% 100%}}",""]),e.exports=x},2003:function(e,t,n){e.exports=n.p+"img/time_bg.fa856cb.png"},2004:function(e,t,n){e.exports=n.p+"img/vote_bg.3226bbd.png"},2005:function(e,t,n){e.exports=n.p+"img/duck_body.1c1e156.png"},2006:function(e,t,n){e.exports=n.p+"img/ground_bg.07320a4.png"},2007:function(e,t,n){e.exports=n.p+"img/duck_bg_h5.8b9969e.png"},2008:function(e,t,n){"use strict";n(1751)},2009:function(e,t,n){var o=n(25)(!1);o.push([e.i,"@media screen and (min-width:750px){.governance_container[data-v-98eabbf6]{width:80%;margin:0 auto;min-width:1026px}}",""]),e.exports=o},2370:function(e,t,n){"use strict";n.r(t);var title=n(1698),o=n(1585),r={data:function(){return{FixGovernanceList:[]}},mounted:function(){this.FixGovernanceList=Object(o.b)(o.a)},methods:{handleClickToDetails:function(e){this.$router.push({name:"governance-details",params:{details:e.Router}}),window.localStorage.setItem("Governance",e.Router)}}},d=(n(2001),n(16)),l=Object(d.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"governance_list"},[n("div",{staticClass:"governance_list_wrap"},[n("div",{staticClass:"governance_list_item_wrap"},[e._l(e.FixGovernanceList,(function(t){return n("div",{key:t.Title,staticClass:"governance_list_item"},[n("div",{class:["status_img",t.StatusImg]},[e._v("\n          "+e._s(t.StatusText)+"\n        ")]),e._v(" "),n("div",{staticClass:"governance_list_item_title_web WEB title"},[n("h3",[e._v(e._s(e.$t(t.Title)))]),e._v(" "),n("div",{staticClass:"governance_list_item_time_web WEB time"},[n("span",[e._v("Countdown:")]),e._v(" "),n("p",{domProps:{innerHTML:e._s(t.ShowTime)}})])]),e._v(" "),n("div",{staticClass:"governance_list_item_perhaps_web WEB perhaps"},[n("p",[e._v(e._s(e.$t(t.Perhaps)))]),e._v(" "),n("button",{on:{click:function(n){return e.handleClickToDetails(t)}}},[e._v("\n            "+e._s(e.$t("Governance.Governance_text11"))+"\n          ")])]),e._v(" "),n("div",{staticClass:"governance_list_item_top_h5 H5"},[n("div",{class:["status_img",t.StatusImg]},[e._v("\n            "+e._s(t.StatusText)+"\n          ")]),e._v(" "),n("div",{staticClass:"governance_list_item_time_h5 H5 time"},[n("span",[e._v("Countdown:")]),e._v(" "),n("p",{domProps:{innerHTML:e._s(t.ShowTime)}})])]),e._v(" "),n("div",{staticClass:"governance_list_item_title_h5 H5 title"},[n("h3",[e._v(e._s(e.$t(t.Title)))])]),e._v(" "),n("div",{staticClass:"governance_list_item_perhaps_h5 H5 perhaps"},[n("p",[e._v(e._s(e.$t(t.Perhaps)))]),e._v(" "),n("button",{on:{click:function(n){return e.handleClickToDetails(t)}}},[e._v("\n            "+e._s(e.$t("Governance.Governance_text11"))+"\n          ")])])])})),e._v(" "),n("div",{staticClass:"governance_list_item_duck"})],2)])])}),[],!1,null,"3782caec",null).exports,c={layout:"home",name:"governance",components:{Title:title.a,List:l}},y=(n(2008),Object(d.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"governance_container"},[n("Title"),e._v(" "),n("List")],1)}),[],!1,null,"98eabbf6",null));t.default=y.exports}}]);