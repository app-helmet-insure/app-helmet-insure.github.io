(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1567:function(t,e,n){var content=n(1586);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("5dab18c8",content,!0,{sourceMap:!1})},1568:function(t,e,n){"use strict";n.d(e,"a",(function(){return v})),n.d(e,"b",(function(){return _})),n.d(e,"c",(function(){return x}));var o=n(57),r=(n(288),n(1569)),d=n(93),l=n(290),y=n(92),c=n(31),m=n(43),v=[{PoolAddress:"0x4E18F9Ed49ad3d3fDdadE4d1464ED71133AA1EAC",PoolABI:r,Title:"Proposal.Governance1.text1",Router:"link1",Perhaps:"Proposal.Governance1.text2",Details:["Proposal.Governance1.text2","Proposal.Governance1.text3","Proposal.Governance1.text4","Proposal.Governance1.text5","Proposal.Governance1.text6","Proposal.Governance1.text7","Proposal.Governance1.text8","Proposal.Governance1.text9","Proposal.Governance1.text10","Proposal.Governance1.text11","Proposal.Governance1.text12","Proposal.Governance1.text13","Proposal.Governance1.text14","Proposal.Governance1.text15","Proposal.Governance1.text16","Proposal.Governance1.text17","Proposal.Governance1.text18"],StartTime:"2021/10/19 24:00 UTC+8",FinishTime:"2021/12/31 24:00 UTC+8",Proposal:[{Text:1,ID:1},{Text:2,ID:2},{Text:3,ID:3}]}],_=function(t){for(var e=0;e<t.length;e++){var n=t[e],o=n.StartTime,r=n.FinishTime,d=Date.now(),l=1*new Date(o),y=1*new Date(r),c=d>l,m=d>y;c||(n.Status=1,n.StatusImg="unopen",n.StatusText="".concat(window.$nuxt.$t("Governance.Governance_text9")),n.ShowTime="Ongoing"!==o&&"Mining"!==r?f(l):"Ongoing"),c&&!m&&(n.Status=2,n.StatusImg="ongoing",n.StatusText="".concat(window.$nuxt.$t("Governance.Governance_text10")),"Ongoing"!==o&&"Mining"!==r&&(n.ShowTime=f(y))),m&&(n.Status=3,n.StatusImg="finish",n.StatusText="".concat(window.$nuxt.$t("Governance.Governance_text8")),n.ShowTime="Finished")}return t},f=function(time){var t=time-1*new Date,e=Math.floor(t/864e5),n=Math.floor((t-24*e*36e5)/36e5),o=Math.floor((t-24*e*36e5-36e5*n)/6e4),r=e>9?e:"0"+e,d=n>9?n:"0"+n,l=o>9?o:"0"+o;return Number(r)>0?"".concat(r,"<b>").concat(window.$nuxt.$t("Content.DayM"),"</b><i>/</i>").concat(d,"<b>").concat(window.$nuxt.$t("Content.HourM"),"</b>"):"".concat(d,"<b>").concat(window.$nuxt.$t("Content.HourM"),"</b><i>/</i>").concat(l,"<b>").concat(window.$nuxt.$t("Content.MinM"),"</b>")},x=function(t){var e=t.PoolAddress,n="0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",v=(new y.Contract(n,d),new y.Contract(n,l.abi)),_=new y.Contract(e,r),f=[v.allowance("0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699",e),_.rewardsDuration(),_.totalSupply()];return Object(m.h)().all(f).then((function(e){var n=Object(m.j)(e),r=Object(o.a)(n,3),d=r[0],l=r[1],y=r[2],v=(d=Object(m.f)(d))/(l/=86400),_=1+v/(y=Object(m.f)(y)),f=Object(c.c)(v/y*365*100,2)+"%",x=Object(c.c)(100*Math.pow(_,365),2)+"%";return console.log(_,Math.pow(_,365)),t.APR=f,t.APY=x}))}},1569:function(t){t.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousGovernor","type":"address"},{"indexed":true,"internalType":"address","name":"newGovernor","type":"address"}],"name":"GovernorshipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"proposalID","type":"uint256"}],"name":"StakeAndVote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"governor_","type":"address"}],"name":"__Governable_init_unchained","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"},{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"address","name":"_ecoAddr","type":"address"}],"name":"__StakingPool_init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ecoAddr","type":"address"}],"name":"__StakingPool_init_unchained","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"__StakingRewards_init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"name":"__StakingRewards_init_unchained","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"begin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"compound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"}],"name":"getConfig","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"}],"name":"getConfigA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getConfigI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"voter","type":"address"},{"internalType":"uint256","name":"proposalID","type":"uint256"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lep","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lep","type":"uint256"},{"internalType":"uint256","name":"_period","type":"uint256"},{"internalType":"uint256","name":"_span","type":"uint256"},{"internalType":"uint256","name":"_begin","type":"uint256"}],"name":"notifyRewardBegin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"period","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardDelta","outputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfigA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"key","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"setConfigI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stakeAndCompound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"proposalID","type":"uint256"}],"name":"stakeAndVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newGovernor","type":"address"}],"name":"transferGovernorship","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]')},1585:function(t,e,n){"use strict";n(1567)},1586:function(t,e,n){var o=n(28),r=n(78),d=n(1587),l=o(!1),y=r(d);l.push([t.i,".governance_title[data-v-6725de93]{background:#4b2910;border-radius:5px}.governance_title_wrap[data-v-6725de93]{width:100%;height:100%;background-image:url("+y+");background-repeat:no-repeat;background-position:50%}.governance_title_text h3[data-v-6725de93]{font-family:IBMPlexSans-SemiBold,IBMPlexSans;font-weight:600;color:#fff}.governance_title_text p[data-v-6725de93]{font-family:IBMPlexSans;color:#fff;line-height:20px}@media screen and (min-width:750px){.governance_title[data-v-6725de93]{width:100%;min-width:1026px;height:140px;margin:30px auto 10px}.governance_title_wrap[data-v-6725de93]{margin:0 auto;background-image:url("+y+");background-size:1026px 100%}.governance_title_text h3[data-v-6725de93]{font-size:24px;line-height:32px;padding:40px 0 0 40px}.governance_title_text p[data-v-6725de93]{font-size:16px;margin:11px 0 0 40px}}@media screen and (max-width:750px){.governance_title[data-v-6725de93]{width:95%;height:120px;margin:0 auto}.governance_title_wrap[data-v-6725de93]{background-image:url("+y+");background-size:100% 100%}.governance_title_text[data-v-6725de93]{width:100%;height:100%}.governance_title_text h3[data-v-6725de93]{width:335px;font-size:18px;padding:15px 0 0 16px}.governance_title_text p[data-v-6725de93]{width:329px;font-size:12px;margin:8px 0 0 16px}}",""]),t.exports=l},1587:function(t,e,n){t.exports=n.p+"img/governance_titlebg.218ecd5.png"},1588:function(t,e,n){t.exports=n.p+"img/unopen.c4f33cc.png"},1589:function(t,e,n){t.exports=n.p+"img/ongoing.6da611d.png"},1590:function(t,e,n){t.exports=n.p+"img/finish.97bf104.png"},1610:function(t,e,n){"use strict";var o={},r=(n(1585),n(19)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"governance_title"},[n("div",{staticClass:"governance_title_wrap"},[n("div",{staticClass:"governance_title_text"},[n("h3",[t._v(t._s(t.$t("Governance.Tips3")))]),t._v(" "),n("p",[t._v(t._s(t.$t("Governance.Tips4")))])])])])}),[],!1,null,"6725de93",null);e.a=component.exports},1633:function(t,e,n){var content=n(1807);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("1a960f02",content,!0,{sourceMap:!1})},1634:function(t,e,n){var content=n(1814);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("0014396e",content,!0,{sourceMap:!1})},1806:function(t,e,n){"use strict";n(1633)},1807:function(t,e,n){var o=n(28),r=n(78),d=n(1588),l=n(1589),y=n(1590),c=n(1808),m=n(1809),v=n(1810),_=n(1811),f=n(1812),x=o(!1),h=r(d),w=r(l),T=r(y),M=r(c),k=r(m),P=r(v),S=r(_),C=r(f);x.push([t.i,".governance_list[data-v-79083228]{margin-top:28px}.governance_list_item_wrap[data-v-79083228]{background:#fff3de}.governance_list_item[data-v-79083228]{margin-top:10px;width:100%;box-shadow:0 4px 8px 0 hsla(0,0%,60.8%,.02);border-radius:5px;padding:20px;position:relative;overflow:hidden}body.dark .governance_list_item[data-v-79083228],body.light .governance_list_item[data-v-79083228]{background:#fff3de}.status_img[data-v-79083228]{width:90px;height:36px;background-size:100% 100%;background-repeat:no-repeat;display:flex;justify-content:center;position:absolute;left:20px;top:0;padding-top:4px}.unopen[data-v-79083228]{background-image:url("+h+");font-size:14px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;line-height:20px}body.dark .unopen[data-v-79083228],body.light .unopen[data-v-79083228]{color:#ffe8d5}.ongoing[data-v-79083228]{background-image:url("+w+");font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:20px}body.dark .ongoing[data-v-79083228],body.light .ongoing[data-v-79083228]{color:#fce5ff}.finish[data-v-79083228]{background-image:url("+T+");font-size:14px;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;color:#fff;line-height:20px}.time[data-v-79083228]{display:flex;align-items:center;justify-content:center;min-width:161px;min-height:32px;border-radius:0 5px 0 0;padding:0 10px;background-image:url("+M+");background-repeat:no-repeat;background-size:100% 100%}.time span[data-v-79083228]{font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:18px}body.dark .time span[data-v-79083228],body.light .time span[data-v-79083228]{color:#17173a}.time p[data-v-79083228]{font-size:14px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:18px}body.dark .time p[data-v-79083228],body.light .time p[data-v-79083228]{color:#17173a}.title>h3[data-v-79083228]{font-size:16px;font-family:IBMPlexSans-Bold,IBMPlexSans;font-weight:700;line-height:16px}body.dark .title>h3[data-v-79083228],body.light .title>h3[data-v-79083228]{color:#17173a}.perhaps>p[data-v-79083228]{font-size:14px;font-family:IBMPlexSans;opacity:.7;line-height:22px}body.dark .perhaps>p[data-v-79083228],body.light .perhaps>p[data-v-79083228]{color:#17173a}.perhaps>button[data-v-79083228]{min-width:97px;padding:0 15px;height:40px;border-radius:5px;background-image:url("+k+");background-repeat:no-repeat;background-size:100% 100%;font-size:14px;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;color:#fff;line-height:18px}@media screen and (min-width:750px){.H5[data-v-79083228]{display:none}.governance_list[data-v-79083228]{min-width:1026px}.governance_list_item_title_web[data-v-79083228]{display:flex;align-items:center;justify-content:space-between;margin-top:25px}.governance_list_item_perhaps_web[data-v-79083228]{display:flex;align-items:center;margin-top:20px}.governance_list_item_perhaps_web>p[data-v-79083228]{flex:1;text-indent:2em}.governance_list_item_perhaps_web>button[data-v-79083228]{margin-left:200px;margin-top:0}.governance_list_item_duck[data-v-79083228]{width:100%;height:200px;background:url("+P+"),url("+S+");background-repeat:no-repeat,repeat;background-size:200px 200px,100% 200px;background-position:right 0,50%}}@media screen and (max-width:750px){.WEB[data-v-79083228]{display:none}.governance_list[data-v-79083228]{width:95%;margin:0 auto;padding-bottom:50px}.governance_list_item_time_h5[data-v-79083228]{position:absolute;right:0;top:0}.governance_list_item_top_h5[data-v-79083228]{display:flex;justify-content:space-between}.governance_list_item_title_h5[data-v-79083228]{margin-top:35px}.governance_list_item_perhaps_h5[data-v-79083228]{margin-top:20px;text-indent:2em}.governance_list_item_perhaps_h5>button[data-v-79083228]{margin:24px auto 0;display:flex;align-items:center;justify-content:center}.governance_list_item_duck[data-v-79083228]{width:100%;height:110px;background-image:url("+C+");background-repeat:no-repeat;background-size:100% 100%}}",""]),t.exports=x},1808:function(t,e,n){t.exports=n.p+"img/time_bg.fa856cb.png"},1809:function(t,e,n){t.exports=n.p+"img/vote_bg.3226bbd.png"},1810:function(t,e,n){t.exports=n.p+"img/duck_body.1c1e156.png"},1811:function(t,e,n){t.exports=n.p+"img/ground_bg.07320a4.png"},1812:function(t,e,n){t.exports=n.p+"img/duck_bg_h5.8b9969e.png"},1813:function(t,e,n){"use strict";n(1634)},1814:function(t,e,n){var o=n(28)(!1);o.push([t.i,"@media screen and (min-width:750px){.governance_container[data-v-98eabbf6]{width:80%;margin:0 auto;min-width:1026px}}",""]),t.exports=o},2200:function(t,e,n){"use strict";n.r(e);var title=n(1610),o=n(1568),r={data:function(){return{FixGovernanceList:[]}},mounted:function(){this.FixGovernanceList=Object(o.b)(o.a)},methods:{handleClickToDetails:function(t){this.$router.push({name:"governance-details",params:{details:t.Router}}),window.localStorage.setItem("Governance",t.Router)}}},d=(n(1806),n(19)),l=Object(d.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"governance_list"},[n("div",{staticClass:"governance_list_wrap"},[n("div",{staticClass:"governance_list_item_wrap"},[t._l(t.FixGovernanceList,(function(e){return n("div",{key:e.Title,staticClass:"governance_list_item"},[n("div",{class:["status_img",e.StatusImg]},[t._v("\n          "+t._s(e.StatusText)+"\n        ")]),t._v(" "),n("div",{staticClass:"governance_list_item_title_web WEB title"},[n("h3",[t._v(t._s(t.$t(e.Title)))]),t._v(" "),n("div",{staticClass:"governance_list_item_time_web WEB time"},[n("span",[t._v("Countdown:")]),t._v(" "),n("p",{domProps:{innerHTML:t._s(e.ShowTime)}})])]),t._v(" "),n("div",{staticClass:"governance_list_item_perhaps_web WEB perhaps"},[n("p",[t._v(t._s(t.$t(e.Perhaps)))]),t._v(" "),n("button",[t._v("\n            "+t._s(t.$t("Governance.Governance_text11"))+"\n          ")])]),t._v(" "),n("div",{staticClass:"governance_list_item_top_h5 H5"},[n("div",{class:["status_img",e.StatusImg]},[t._v("\n            "+t._s(e.StatusText)+"\n          ")]),t._v(" "),n("div",{staticClass:"governance_list_item_time_h5 H5 time"},[n("span",[t._v("Countdown:")]),t._v(" "),n("p",{domProps:{innerHTML:t._s(e.ShowTime)}})])]),t._v(" "),n("div",{staticClass:"governance_list_item_title_h5 H5 title"},[n("h3",[t._v(t._s(t.$t(e.Title)))])]),t._v(" "),n("div",{staticClass:"governance_list_item_perhaps_h5 H5 perhaps"},[n("p",[t._v(t._s(t.$t(e.Perhaps)))]),t._v(" "),n("button",[t._v("\n            "+t._s(t.$t("Governance.Governance_text11"))+"\n          ")])])])})),t._v(" "),n("div",{staticClass:"governance_list_item_duck"})],2)])])}),[],!1,null,"79083228",null).exports,y={layout:"home",name:"governance",components:{Title:title.a,List:l}},c=(n(1813),Object(d.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"governance_container"},[n("Title"),t._v(" "),n("List")],1)}),[],!1,null,"98eabbf6",null));e.default=c.exports}}]);