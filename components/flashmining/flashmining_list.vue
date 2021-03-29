<template>
  <div class="flashmining_list">
    <div class="flashmining_title">
      <h3>闪电挖矿</h3>
      <span>···</span>
    </div>
    <div class="mining_item" v-for="item in miningList" :key="item.earn">
      <div
        :class="
          activeFlash == item.earn && showActiveFlash
            ? 'activeFlash flash_show'
            : 'flash_show'
        "
      >
        <img
          :src="require(`~/assets/img/flashmining/${item.earn}.png`)"
          alt=""
        />
        <section>
          <span>{{ item.miningName }}</span>
          <span>{{ item.desc }}</span>
        </section>
        <section>
          <p>
            Earn <span>{{ item.earn }} <i></i> </span>
          </p>
        </section>
        <section>
          <i></i>
          <p>
            <span v-if="typeof item.dueDate == 'object'">
              {{ item.dueDate.day }}<b>d</b> <i>/</i>{{ item.dueDate.hour
              }}<b>h</b>
            </span>
            <span v-else>
              {{ item.dueDate }}
            </span>
            <span>MIning Cutdown</span>
          </p>
        </section>
        <section>
          <span>{{ item.weekly }}</span>
          <span>{{ $t("Table.RewardsDistribution") + "(weekly)" }}</span>
        </section>
        <section>
          <span>{{
            item.dueDate == "Expired" ? "Infinity" + "%" : item.yearEarn + "%"
          }}</span>
          <span>APY</span>
        </section>
        <section>
          <button
            @click="StakeMining(item.earn)"
            :class="
              activeFlash == item.earn &&
              showActiveFlash &&
              activeType == 'STAKE'
                ? 'activeButton stakeFlash'
                : 'stakeFlash'
            "
          >
            质押挖矿
            <i class="selectDown"></i>
          </button>
          <button
            @click="ClaimMining(item.earn)"
            :class="
              activeFlash == item.earn &&
              showActiveFlash &&
              activeType == 'CLAIM'
                ? 'activeButton claimFlash'
                : 'claimFlash'
            "
          >
            赎回领取奖励
            <i class="selectDown"></i>
          </button>
        </section>
      </div>
      <div
        class="flash_detail"
        v-if="showActiveFlash && activeFlash == item.earn"
      >
        <HdodoPool
          v-if="activeFlash == 'hDODO' && showActiveFlash"
          :activeType="activeType"
        ></HdodoPool>
        <HmathPool
          v-if="activeFlash == 'hMATH' && showActiveFlash"
          :activeType="activeType"
        ></HmathPool>
        <HautoPool
          v-if="activeFlash == 'hAUTO' && showActiveFlash"
          :activeType="activeType"
        ></HautoPool>
        <Bnb500Pool
          v-if="activeFlash == 'BNB500' && showActiveFlash"
          :activeType="activeType"
        ></Bnb500Pool>
        <HctkPool
          v-if="activeFlash == 'hCTK' && showActiveFlash"
          :activeType="activeType"
        ></HctkPool>
        <HcctPool
          v-if="activeFlash == 'HCCT' && showActiveFlash"
          :activeType="activeType"
        ></HcctPool>
      </div>
    </div>
  </div>
</template>

<script>
import { totalSupply, balanceOf } from "~/interface/deposite";
import { fixD } from "~/assets/js/util.js";
import precision from "~/assets/js/precision.js";
import { uniswap } from "~/assets/utils/address-pool.js";
import HcctPool from "~/components/flashmining/hcct_pool.vue";
import HctkPool from "~/components/flashmining/hctk_pool.vue";
import Bnb500Pool from "~/components/flashmining/bnb500_pool.vue";
import HautoPool from "~/components/flashmining/hauto_pool.vue";
import HmathPool from "~/components/flashmining/hmath_pool.vue";
import HdodoPool from "~/components/flashmining/hdodo_pool.vue";
export default {
  components: {
    HcctPool,
    HctkPool,
    Bnb500Pool,
    HautoPool,
    HmathPool,
    HdodoPool,
  },
  data() {
    return {
      miningList: [],
      apyArray: {},
      activeType: "",
      showActiveFlash: false,
      activeFlash: "",
    };
  },
  mounted() {
    this.initFlashMiningData();
    setTimeout(() => {
      this.getAPY();
    }, 1000);
    setInterval(() => {
      setTimeout(() => {
        this.getAPY();
      });
    }, 20000);
  },
  computed: {
    indexArray() {
      return this.$store.state.allIndexPrice;
    },
  },
  watch: {
    apyArray: {
      handler: "apyArrayWatch",
      immediate: true,
    },
  },
  methods: {
    StakeMining(MiningType) {
      console.log(MiningType);
      this.activeType = "STAKE";
      this.showActiveFlash = true;
      this.activeFlash = MiningType;
    },
    ClaimMining(MiningType) {
      this.activeType = "CLAIM";
      this.showActiveFlash = true;
      this.activeFlash = MiningType;
    },
    apyArrayWatch(newValue) {
      if (newValue) {
        this.initFlashMiningData();
      }
    },
    initFlashMiningData() {
      let apyArray = this.apyArray;
      let arr = [
        {
          miningName: "hDODO Pool",
          desc: "By hMATH-Helmet LPT",
          earn: "hDODO",
          dueDate: this.getRemainTime("2021/04/10 00:00"),
          weekly: fixD((40000 / 15) * 7, 2) + " hDODO",
          yearEarn: apyArray["hDODO"] || "--",
        },
        {
          miningName: "hMATH Pool",
          desc: "By hAUTO-Helmet LPT",
          earn: "hMATH",
          dueDate: this.getRemainTime("2021/03/18 00:00"),
          weekly: fixD((30000 / 15) * 7, 2) + " hMATH",
          yearEarn: apyArray["hMATH"] || "--",
        },
        {
          miningName: "hAUTO Pool",
          desc: "By BNB500-Helmet LPT",
          earn: "hAUTO",
          dueDate: this.getRemainTime("2021/03/09 00:00"),
          weekly: fixD((10 / 14) * 7, 2) + " hAUTO",
          yearEarn: apyArray["hAUTO"] || "--",
        },
        {
          miningName: "BNB500 Pool",
          desc: "By hCTK-Helmet LPT",
          earn: "BNB500",
          dueDate: this.getRemainTime("2021/02/29 00:00"),
          weekly: fixD((1000 / 10) * 7, 2) + " BNB500",
          yearEarn: apyArray["BNB500"] || "--",
        },
        {
          miningName: "hCTK Pool",
          desc: "By HCCT-Helmet LPT",
          earn: "hCTK",
          dueDate: this.getRemainTime("2021/02/28 00:00"),
          weekly: fixD((70000 / 21) * 7, 2) + " hCTK",
          yearEarn: apyArray["hCTK"] || "--",
        },
        {
          miningName: "HCCT Pool",
          desc: "By LONG-Helmet LPT",
          earn: "HCCT",
          dueDate: this.getRemainTime("2021/02/13 00:00"),
          weekly: fixD(16000 * 7, 2) + " HCCT",
          yearEarn: apyArray["HCCT"] || "--",
        },
      ];
      this.miningList = arr;
    },
    getRemainTime(time) {
      let now = new Date() * 1;
      let dueDate = time;
      dueDate = new Date(dueDate);
      let DonwTime = dueDate - now;
      let day = Math.floor(DonwTime / (24 * 3600000));
      let hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000);
      let minute = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
      );
      let second = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      );
      let template;

      if (dueDate > now) {
        template = {
          day: day > 9 ? day : "0" + day,
          hour: hour > 9 ? hour : "0" + hour,
        };
        return template;
      } else {
        template = {
          day: "00",
          hour: "00",
        };
        return "Expired";
      }
    },
    getAPY() {
      this.GET_HAUTO_POOL_APY();
      this.GET_BNB500_POOL_APY();
      this.GET_HCTK_POOL_APY();
      this.GET_HDODO_POOL_APY();
      this.GET_HMATH_POOL_APY();
      this.GET_HCCT_POOL_APY();
    },
    async GET_HDODO_POOL_APY() {
      let HCTKHELMET = await uniswap("HDODO", "HELMET"); //Hlemt价格
      let HctkVolume = await totalSupply("HDODOPOOL"); //数量
      let LptVolume = await totalSupply("HDODOPOOL_LPT"); //发行
      let HelmetValue = await balanceOf("HELMET", "HDODOPOOL_LPT", true);
      // APY = 年产量*helmet价格/抵押价值
      let APY = fixD(
        precision.times(
          precision.divide(
            precision.times(HCTKHELMET, precision.divide(40000, 15), 365),
            precision.times(
              precision.divide(precision.times(HelmetValue, 2), LptVolume),
              HctkVolume
            )
          ),
          100
        ),
        2
      );
      if (this.expired) {
        this.miningList[0].yearEarn = "--";
      } else {
        this.apyArray.hDODO = fixD(APY, 2);
        this.miningList[0].yearEarn = fixD(APY, 2);
      }
    },
    async GET_HMATH_POOL_APY() {
      let HMATHHELMET = await uniswap("HMATH", "HELMET"); //Hlemt价格
      let HctkVolume = await totalSupply("HMATHPOOL"); //数量
      let LptVolume = await totalSupply("HMATHPOOL_LPT"); //发行
      let HelmetValue = await balanceOf("HELMET", "HMATHPOOL_LPT", true);
      // APY = 年产量*helmet价格/抵押价值
      let APY = fixD(
        precision.times(
          precision.divide(
            precision.times(HMATHHELMET, precision.divide(30000, 15), 365),
            precision.times(
              precision.divide(precision.times(HelmetValue, 2), LptVolume),
              HctkVolume
            )
          ),
          100
        ),
        2
      );
      if (this.expired) {
        this.miningList[1].yearEarn = "--";
      } else {
        this.apyArray.hMATH = fixD(APY, 2);
        this.miningList[1].yearEarn = fixD(APY, 2);
      }
    },
    async GET_HAUTO_POOL_APY() {
      let HAUTOHELMET = await uniswap("HAUTO", "HELMET"); //Hlemt价格
      let HctkVolume = await totalSupply("HAUTOPOOL"); //数量
      let LptVolume = await totalSupply("HAUTOPOOL_LPT"); //发行
      let HelmetValue = await balanceOf("HELMET", "HAUTOPOOL_LPT", true);
      // APY = 年产量*helmet价格/抵押价值
      let APY = fixD(
        precision.times(
          precision.divide(
            precision.times(HAUTOHELMET, precision.divide(10, 14), 365),
            precision.times(
              precision.divide(precision.times(HelmetValue, 2), LptVolume),
              HctkVolume
            )
          ),
          100
        ),
        2
      );
      if (this.expired) {
        this.miningList[2].yearEarn = "--";
      } else {
        this.apyArray.hAUTO = fixD(APY, 2);
        this.miningList[2].yearEarn = fixD(APY, 2);
      }
    },
    async GET_BNB500_POOL_APY() {
      let HCTKHELMET = await uniswap("BNB500", "HELMET"); //Hlemt价格
      let HctkVolume = await totalSupply("BNB500POOL"); //数量
      let LptVolume = await totalSupply("BNB500POOL_LPT"); //发行
      let HelmetValue = await balanceOf("HELMET", "BNB500POOL_LPT", true);
      // APY = 年产量*helmet价格/抵押价值
      let APY = fixD(
        precision.times(
          precision.divide(
            precision.times(HCTKHELMET, precision.divide(1000, 10), 365),
            precision.times(
              precision.divide(precision.times(HelmetValue, 2), LptVolume),
              HctkVolume
            )
          ),
          100
        ),
        2
      );
      if (this.expired) {
        this.miningList[3].yearEarn = "--";
      } else {
        this.apyArray.BNB500 = fixD(APY, 2);
        this.miningList[3].yearEarn = fixD(APY, 2);
      }
    },
    async GET_HCCT_POOL_APY() {
      let HCCTHELMET = await uniswap("HCCT", "HELMET");
      let HcctVolume = await totalSupply("HCCTPOOL");
      let LptVolume = await totalSupply("HCCTPOOL_LPT");
      let HelmetValue = await balanceOf("HELMET", "HCCTPOOL_LPT", true);
      let APY = fixD(
        precision.times(
          precision.divide(
            precision.times(HCCTHELMET, 16000, 365),
            precision.times(
              precision.divide(precision.times(HelmetValue, 2), LptVolume),
              HcctVolume
            )
          ),
          100
        ),
        2
      );
      if (this.expired) {
        this.miningList[4].yearEarn = "--";
      } else {
        this.apyArray.HCCT = fixD(APY, 2);
        this.miningList[4].yearEarn = fixD(APY, 2);
      }
    },
    async GET_HCTK_POOL_APY() {
      let HCTKHELMET = await uniswap("HCTK", "HELMET"); //Hlemt价格
      let HctkVolume = await totalSupply("HCTKPOOL"); //数量
      let LptVolume = await totalSupply("HCTKPOOL_LPT"); //发行
      let HelmetValue = await balanceOf("HELMET", "HCTKPOOL_LPT", true);
      // APY = 年产量*helmet价格/抵押价值
      let APY = fixD(
        precision.times(
          precision.divide(
            precision.times(HCTKHELMET, precision.divide(70000, 21), 365),
            precision.times(
              precision.divide(precision.times(HelmetValue, 2), LptVolume),
              HctkVolume
            )
          ),
          100
        ),
        2
      );
      if (this.expired) {
        this.miningList[5].yearEarn = "--";
      } else {
        this.apyArray.HCTK = fixD(APY, 2);
        this.miningList[5].yearEarn = fixD(APY, 2);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .flashmining_list {
    width: 100%;
    margin: 0 auto;
  }
  .flashmining_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-size: 18px;
      font-family: Helvetica;
      color: #17173a;
      line-height: 24px;
    }
    span {
      font-size: 20px;
      font-weight: 600;
      margin-right: 20px;
    }
  }
  .mining_item {
    width: 100%;
    margin-top: 10px;
    padding: 0 20px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    .activeFlash {
      border-bottom: 1px solid #e8e8eb;
    }
    .flash_show {
      width: 100%;
      height: 70px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      img {
        width: 54px;
        height: 54px;
        margin-right: 20px;
      }
      section {
        &:nth-of-type(1) {
          display: flex;
          flex-direction: column;
          flex: 2;
          span {
            &:nth-of-type(1) {
              font-size: 16px;
              font-family: IBMPlexSans-Medium, IBMPlexSans;
              font-weight: 600;
              color: #17173a;
              line-height: 16px;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              font-family: IBMPlexSans;
              color: rgba(23, 23, 58, 0.45);
              line-height: 12px;
              margin-top: 4px;
            }
          }
        }
        &:nth-of-type(2) {
          flex: 2;
          p {
            display: flex;
            align-items: center;
            font-size: 14px;
            font-family: IBMPlexSans;
            color: rgba(23, 23, 58, 0.45);
            line-height: 18px;
            > span {
              background: #f8f9fa;
              border-radius: 5px;
              display: flex;
              align-items: center;
              height: 28px;
              padding: 0 4px;
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #17173a;
              line-height: 14px;
              margin-left: 4px;
              min-width: 90px;
              justify-content: center;
              > i {
                display: block;
                width: 20px;
                height: 20px;
                background-image: url("../../assets/img/helmet/info.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                left: 42px;
                margin-left: 2px;
                cursor: pointer;
              }
            }
          }
        }
        &:nth-of-type(3) {
          display: flex;
          align-items: center;
          flex: 2;
          > i {
            display: block;
            width: 30px;
            height: 30px;
            background-image: url("../../assets/img/insurancelist/insuranceTime.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin-right: 8px;
          }
          p {
            display: flex;
            flex-direction: column;
            > span {
              &:nth-of-type(1) {
                display: flex;
                align-items: center;
                align-self: flex-start;
                background: #f7f7fa;
                border-radius: 3px;
                font-size: 14px;
                font-family: IBMPlexSans;
                color: #17173a;
                line-height: 14px;
                font-weight: 600;
                height: 18px;
                padding: 0 4px;
                b {
                  font-size: 10px;
                }
                i {
                  font-size: 12px;
                  font-family: IBMPlexSans-Bold, IBMPlexSans;
                  font-weight: bold;
                  color: #cfcfd2;
                  margin: 0 2px;
                }
              }
              &:nth-of-type(2) {
                margin-top: 4px;
                font-size: 12px;
                font-family: IBMPlexSans;
                color: rgba(23, 23, 58, 0.45);
                line-height: 12px;
              }
            }
          }
        }
        &:nth-of-type(4) {
          flex: 2;
          display: flex;
          flex-direction: column;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #17173a;
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              font-family: IBMPlexSans;
              color: rgba(23, 23, 58, 0.45);
              line-height: 12px;
              margin-top: 4px;
            }
          }
        }
        &:nth-of-type(5) {
          flex: 1;
          display: flex;
          flex-direction: column;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #17173a;
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              font-family: IBMPlexSans;
              color: rgba(23, 23, 58, 0.45);
              line-height: 12px;
              margin-top: 4px;
            }
          }
        }
        &:nth-of-type(6) {
          flex: 3;
          display: flex;
          justify-content: flex-end;
          .activeButton {
            border: 2px solid #fd7e14;
            padding: 0px 9px;
            color: #fd7e14;
            i {
              transform: rotate(180deg);
            }
          }
          button {
            padding: 0px 10px;
            height: 36px;
            background: #f8f9fa;
            border-radius: 5px;
            border: 1px solid #e8e8eb;
            margin-left: 20px;
            font-size: 14px;
            font-family: HelveticaNeue;
            color: #17173a;
            line-height: 24px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            &:nth-of-type(1) {
              margin: 0;
            }
            i {
              display: block;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              background-image: url("../../assets/img/insurancelist/select_down.png");
              background-size: 100%;
            }
          }
        }
      }
    }
  }
}
</style>