<template>
  <div class="mining_list">
    <div class="mining_title">
      <h3>{{ $t("Header.Mining") }}</h3>
    </div>
    <div class="mining_item" v-for="item in miningList" :key="item.earn">
      <div
        :class="
          activeMining == item.earn && showActiveMining
            ? 'activeMining mining_show'
            : 'mining_show'
        "
      >
        <img src="" alt="" />
        <section>
          <span>{{ item.miningName }}</span>
          <!-- <i v-if="item.info"
            ><svg
              t="1617039040708"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1287"
              width="16"
              height="16"
            >
              <path
                d="M512 43.904c258.112 0 468.096 209.984 468.096 468.096 0 258.112-209.984 468.096-468.096 468.096C253.888 980.096 43.904 770.112 43.904 512 43.904 253.888 253.888 43.904 512 43.904z m0 643.648a58.432 58.432 0 1 0-0.128 116.928A58.432 58.432 0 0 0 512 687.552z m0-468.096c-96.768 0-175.552 71.424-175.552 159.232 0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.112-20.352 50.112-45.568 0-37.632 33.792-68.224 75.264-68.224 41.472 0 75.264 30.592 75.264 68.224 0 37.696-33.792 68.288-75.264 68.288-27.712 0-50.176 20.352-50.176 45.504v91.008c0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.176-20.352 50.176-45.568V530.56c72.192-19.712 125.376-79.936 125.376-151.872 0-87.808-78.72-159.232-175.552-159.232z"
                p-id="1288"
              ></path>
            </svg>
          </i> -->
        </section>
        <section>
          <p>
            {{ $t("Table.EarnList") }}
            <span>
              <img
                :src="require(`~/assets/img/mining/${item.earn}.png`)"
                :class="item.earnNum"
                alt=""
              />
            </span>
          </p>
        </section>
        <section>
          <i></i>
          <p>
            <span v-if="typeof item.dueDate == 'object'">
              {{ item.dueDate.day }}<b>{{ $t("Content.DayM") }}</b> <i>/</i
              >{{ item.dueDate.hour }}<b>{{ $t("Content.HourM") }}</b>
            </span>
            <span v-else>
              {{
                item.dueDate == "Expired"
                  ? $t("Insurance.Insurance_text22")
                  : item.dueDate
              }}
            </span>
            <span>{{ $t("Table.MIningCutdown") }}</span>
          </p>
        </section>
        <section>
          <span>{{
            item.dueDate == "Expired" ? "--" : item.yearEarn + "%"
          }}</span>
          <span>{{ item.earnName }}</span>
        </section>
        <section>
          <button
            @click="StakeMining(item.earn)"
            :class="
              activeMining == item.earn &&
              showActiveMining &&
              activeType == 'STAKE'
                ? 'activeButton stakeMining'
                : 'stakeMining'
            "
          >
            {{ $t("Table.Stakeing") }}
            <i class="selectDown"></i>
          </button>
          <button
            @click="ClaimMining(item.earn)"
            :class="
              activeMining == item.earn &&
              showActiveMining &&
              activeType == 'CLAIM'
                ? 'activeButton claimMining'
                : 'claimMining'
            "
          >
            {{ $t("Table.Claim") }}
            <i class="selectDown"></i>
          </button>
        </section>
      </div>
      <div
        class="mining_detail"
        v-if="showActiveMining && activeMining == item.earn"
      >
        <svg class="close" aria-hidden="true" @click="showActiveMining = false">
          <use xlink:href="#icon-close"></use>
        </svg>
        <HelmetBnbPool
          v-if="activeMining == 'helmet_cake' && showActiveMining"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HelmetBnbPool>
        <HelmetDodoPool
          v-if="activeMining == 'helmet_dodo' && showActiveMining"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HelmetDodoPool>
        <HelmetHelmetPool
          v-if="activeMining == 'helmet' && showActiveMining"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HelmetHelmetPool>
        <HelmetForPool
          v-if="activeMining == 'helmet_for' && showActiveMining"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HelmetForPool>
        <HelmetBurgerPool
          v-if="activeMining == 'helmet_burger' && showActiveMining"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HelmetBurgerPool>
      </div>
    </div>
    <div
      class="mining_item_h5"
      v-for="item in miningList"
      :key="item.earn + '1'"
    >
      <section>
        <span>{{ item.miningName }}</span>
        <p>
          {{ $t("Table.EarnList") }}
          <span>
            <img
              :src="require(`~/assets/img/mining/${item.earn}.png`)"
              :class="item.earnNum"
              alt=""
            />
          </span>
        </p>
      </section>
      <section>
        <p>
          <span>{{
            item.dueDate == "Expired" ? "--" : item.yearEarn + "%"
          }}</span>
          <span>{{ item.earnName }}</span>
        </p>
        <div>
          <i></i>
          <p>
            <span v-if="typeof item.dueDate == 'object'">
              {{ item.dueDate.day }}<b>{{ $t("Content.DayM") }}</b> <i>/</i
              >{{ item.dueDate.hour }}<b>{{ $t("Content.HourM") }}</b>
            </span>
            <span v-else>
              {{
                item.dueDate == "Expired"
                  ? $t("Insurance.Insurance_text22")
                  : item.dueDate
              }}
            </span>
            <span>{{ $t("Table.MIningCutdown") }}</span>
          </p>
        </div>
      </section>
      <section>
        <button
          @click="StakeMiningH5(item.earn)"
          :class="
            activeMining == item.earn &&
            showActiveMining &&
            activeType == 'STAKE'
              ? 'activeButton stakeMining'
              : 'stakeMining'
          "
        >
          {{ $t("Table.Stakeing") }}
        </button>
        <button
          @click="ClaimMiningH5(item.earn)"
          :class="
            activeMining == item.earn &&
            showActiveMining &&
            activeType == 'CLAIM'
              ? 'activeButton claimMining'
              : 'claimMining'
          "
        >
          {{ $t("Table.Claim") }}
        </button>
      </section>
    </div>
    <Wraper>
      <div class="wraper_title">
        <h3>
          {{
            activeType == "STAKE"
              ? $t("Insurance.Insurance_text23")
              : $t("Table.Claim")
          }}
        </h3>
        <svg class="icon close" aria-hidden="true" @click="close_wraper">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
      <HelmetBnbPool
        v-if="activeMining == 'helmet_cake'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HelmetBnbPool>
      <HelmetDodoPool
        v-if="activeMining == 'helmet_dodo'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HelmetDodoPool>
      <HelmetHelmetPool
        v-if="activeMining == 'helmet'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HelmetHelmetPool>
      <HelmetForPool
        v-if="activeMining == 'helmet_for'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HelmetForPool>
      <HelmetBurgerPool
        v-if="activeMining == 'helmet_burger'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HelmetBurgerPool>
    </Wraper>
  </div>
</template>

<script>
import {
  totalSupply,
  balanceOf,
  getAllHelmet,
  Rewards,
  RewardsDuration,
} from "~/interface/deposite";
import Wraper from "~/components/common/wraper.vue";
import precision from "~/assets/js/precision.js";
import { uniswap } from "~/assets/utils/address-pool.js";
import { fixD } from "~/assets/js/util.js";
import HelmetBnbPool from "~/components/mining/helmet_bnb_pool.vue";
import HelmetForPool from "~/components/mining/helmet_for_pool.vue";
import HelmetHelmetPool from "~/components/mining/helmet_helmet_pool.vue";
import HelmetBurgerPool from "~/components/mining/helmet_burger_pool.vue";
import HelmetDodoPool from "~/components/mining/helmet_dodo_pool.vue";

export default {
  components: {
    Wraper,
    HelmetHelmetPool,
    HelmetBurgerPool,
    HelmetForPool,
    HelmetBnbPool,
    HelmetDodoPool,
  },
  data() {
    return {
      apyArray: {},
      miningList: [],
      activeType: "",
      showActiveMining: false,
      activeMining: "",
      TradeType: "", //H5 tradingType
    };
  },
  mounted() {
    this.initMiningData();
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
    apyArrayWatch(newValue) {
      if (newValue) {
        this.initMiningData();
      }
    },
    StakeMiningH5(MiningType) {
      console.log(MiningType);
      this.activeType = "STAKE";
      this.showActiveMining = true;
      this.activeMining = MiningType;
      this.$bus.$emit("OPEN_WRAPER_PAFE", true);
    },
    ClaimMiningH5(MiningType) {
      this.activeType = "CLAIM";
      this.showActiveMining = true;
      this.activeMining = MiningType;
      this.$bus.$emit("OPEN_WRAPER_PAFE", true);
    },
    StakeMining(MiningType) {
      console.log(MiningType);
      this.activeType = "STAKE";
      this.showActiveMining = true;
      this.activeMining = MiningType;
    },
    ClaimMining(MiningType) {
      this.activeType = "CLAIM";
      this.showActiveMining = true;
      this.activeMining = MiningType;
    },
    close_wraper() {
      this.$bus.$emit("OPEN_WRAPER_PAFE", false);
    },
    initMiningData() {
      let apyArray = this.apyArray;
      let arr = [
        {
          miningName: "HELMET-BNB LP",
          earnNum: "two",
          earn: "helmet_cake",
          dueDate: "Ongoing",
          como: true,
          info: true,
          earnName: "APR",
          yearEarn: apyArray["helmet_cake"] || "--",
        },
        {
          miningName: "HELMET-hDODO DLP",
          earn: "helmet_dodo",
          earnNum: "two",
          dueDate: this.getRemainTime("2021/04/10 00:00"),
          como: true,
          info: true,
          earnName: "APR",
          yearEarn: apyArray["helmet_dodo"] || "--",
        },
        {
          miningName: "HELMET POOL",
          earn: "helmet",
          earnNum: "one",
          dueDate: "Ongoing",
          como: false,
          info: true,
          earnName: "APY",
          yearEarn: apyArray["helmet"] || "--",
        },
        {
          miningName: "HELMET-hFOR LP",
          earn: "helmet_for",
          earnNum: "two",
          dueDate: this.getRemainTime("2021/03/20 00:00"),
          como: true,
          info: true,
          earnName: "APR",
          yearEarn: apyArray["helmet_for"] || "--",
        },
        {
          miningName: "HELMET-hBURGER LP",
          earn: "helmet_burger",
          earnNum: "two",
          dueDate: this.getRemainTime("2021/03/07 00:00"),
          como: true,
          info: true,
          earnName: "APR",
          yearEarn: apyArray["helmet_burger"] || "--",
        },
      ];
      this.miningList = arr;
      this.$forceUpdate();
    },
    getAPY() {
      this.HELMET_BNB_LP_APY();
      this.HELMET_hDODO_DLP_APY();
      this.HELMET_POOL_APY();
      this.HELMET_hFOR_LP_APY();
      this.HELMET_hBURGER_LP_APY();
    },
    async HELMET_BNB_LP_APY() {
      this.helmetPrice = this.indexArray[1]["HELMET"];
      let cakePrice = this.$store.state.CAKE_BUSD;
      let bnbPrice = this.$store.state.BNB_BUSD;
      // 总LPT
      let totalHelmet = await totalSupply("HELMETBNB_LPT");
      let HelmetAllowance = await getAllHelmet("HELMET", "FARM", "HELMETBNB");
      let helmetReward = await Rewards("HELMETBNB", "0");
      // BNB总价值
      let bnbValue = (await balanceOf("WBNB", "HELMETBNB_LPT")) * 2;
      // BNB总价值不翻倍
      let cakeValue = await balanceOf("HELMETBNB_LPT", "CAKEHELMET", true);
      let miningTime = (await RewardsDuration("HELMETBNB")) / 86400;
      let dayHelmet = totalHelmet;
      let helmetapy = precision.divide(
        precision.times(
          this.helmetPrice,
          precision.minus(HelmetAllowance, helmetReward),
          365
        ),
        precision.times(miningTime, bnbValue)
      );
      let cakeapy = precision.divide(
        precision.times(cakePrice, 1480000),
        precision.times(
          precision.divide(bnbValue, totalHelmet),
          cakeValue,
          bnbPrice
        )
      );

      let APY = precision.plus(helmetapy, cakeapy) * 100;
      this.apyArray.helmet_cake = fixD(APY, 2);
      this.miningList[0].yearEarn = fixD(APY, 2);
    },
    async HELMET_hDODO_DLP_APY() {
      let lptBnbValue = await uniswap("DODO", "WBNB");
      let lptHelmetValue = await uniswap("WBNB", "HELMET");
      let DODOHELMET = lptBnbValue * lptHelmetValue;
      let allVolume = DODOHELMET * 10000;
      //总抵押
      let supplyVolume = await totalSupply("DODOHELMET"); //数量
      // 总发行
      let stakeVolue = await totalSupply("DODOHELMET_LPT"); //数量
      // 抵押总价值
      let stakeValue = await balanceOf("HELMET", "DODOHELMET_LPT", true);
      let burgerApy = precision.divide(
        precision.times(precision.divide(allVolume, 21), 365),
        precision.times(
          precision.divide(precision.times(stakeValue, 2), stakeVolue),
          supplyVolume
        )
      );
      let helmetApy = precision.divide(
        precision.times(precision.divide(25000, 21), 365),
        precision.times(
          precision.divide(precision.times(stakeValue, 2), stakeVolue),
          supplyVolume
        )
      );

      let APY = precision.plus(burgerApy, helmetApy) * 100;
      this.apyArray.helmet_dodo = fixD(APY, 2);
      this.miningList[1].yearEarn = fixD(APY, 2);
    },
    async HELMET_POOL_APY() {
      let HelmetVolume = await totalSupply("HELMETPOOL");
      let helmetTime = (await RewardsDuration("HELMETPOOL")) / 86400;
      // （1+日产量/总质押量）^365
      let APY =
        Math.pow(
          precision.plus(1, precision.divide(33057.57, HelmetVolume)),
          365
        ) * 100;

      this.apyArray.helmet = fixD(APY, 2);
      this.miningList[2].yearEarn = fixD(APY, 2);
    },
    async HELMET_hFOR_LP_APY() {
      let lptBnbValue = await uniswap("FOR", "WBNB");
      let lptHelmetValue = await uniswap("WBNB", "HELMET");
      let FORHELMET = lptBnbValue * lptHelmetValue;
      let allVolume = FORHELMET * 182010;
      //总抵押
      let supplyVolume = await totalSupply("FORHELMET"); //数量
      // 总发行
      let stakeVolue = await totalSupply("FORHELMET_LPT"); //数量
      // 抵押总价值
      let stakeValue = await balanceOf("HELMET", "FORHELMET_LPT", true);
      let forApy = precision.divide(
        precision.times(precision.divide(allVolume, 15), 365),
        precision.times(
          precision.divide(precision.times(stakeValue, 2), stakeVolue),
          supplyVolume
        )
      );
      let helmetApy = precision.divide(
        precision.times(precision.divide(10000, 15), 365),
        precision.times(
          precision.divide(precision.times(stakeValue, 2), stakeVolue),
          supplyVolume
        )
      );

      let APY = precision.plus(forApy, helmetApy) * 100;
      this.apyArray.helmet_for = fixD(APY, 2);
      this.miningList[3].yearEarn = fixD(APY, 2);
    },
    async HELMET_hBURGER_LP_APY() {
      let burgebnbrValue = await uniswap("BURGER", "WBNB");
      let bnbhelmetValue = await uniswap("WBNB", "HELMET");
      let burgerHelmet = burgebnbrValue * bnbhelmetValue;
      let allVolume = burgerHelmet * 15000;
      //总抵押
      let supplyVolume = await totalSupply("BURGERHELMET"); //数量
      // 总发行
      let stakeVolue = await totalSupply("BURGERHELMET_LPT"); //数量
      // 抵押总价值
      let stakeValue = await balanceOf("HELMET", "BURGERHELMET_LPT", true);
      let burgerApy = precision.divide(
        precision.times(precision.divide(allVolume, 25), 365),
        precision.times(
          precision.divide(precision.times(stakeValue, 2), stakeVolue),
          supplyVolume
        )
      );
      let helmetApy = fixD(
        precision.divide(
          precision.times(precision.divide(75000, 25), 365),
          precision.times(
            precision.divide(precision.times(stakeValue, 2), stakeVolue),
            supplyVolume
          )
        )
      );
      let APY = precision.plus(burgerApy, helmetApy) * 100;
      this.apyArray.helmet_burger = fixD(APY, 2);
      this.miningList[4].yearEarn = fixD(APY, 2);
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
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 750px) {
  .icon {
    width: 20px;
    height: 20px;
  }
  .mining_list {
    width: 100%;
    margin: 0 auto;
    .mining_item_h5 {
      display: none;
    }
  }
  .mining_title {
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
      font-size: 24px;
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
    .activeMining {
      border-bottom: 1px solid #e8e8eb;
    }
    .mining_show {
      width: 100%;
      height: 70px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      section {
        &:nth-of-type(1) {
          display: flex;
          align-items: center;
          flex: 4;
          span {
            font-size: 16px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 600;
            color: #17173a;
            line-height: 16px;
          }
          > i {
            margin: 0 4px 0 2px;
            cursor: pointer;
            svg {
              fill: rgba(164, 162, 178, 1);
            }
            &:hover {
              svg {
                fill: #fd8a2b;
              }
            }
          }
        }
        &:nth-of-type(2) {
          flex: 2;
          p {
            font-size: 14px;
            font-family: IBMPlexSans;
            color: rgba(23, 23, 58, 0.45);
            line-height: 18px;
            display: flex;
            align-items: center;
          }
          span {
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 57px;
            height: 28px;
            background: #f8f9fa;
            border-radius: 5px;
            padding: 0 11px;
            margin-left: 4px;
            .two {
              width: 35px;
              height: 20px;
            }
            .one {
              width: 20px;
              height: 20px;
            }
          }
        }
        &:nth-of-type(3) {
          display: flex;
          align-items: center;
          flex: 3;
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
              line-height: 18px;
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
          flex: 4;
          display: flex;
          justify-content: flex-end;
          min-width: 200px;
          .activeButton {
            border: 2px solid #fd7e14;
            padding: 0px 9px;
            color: #fd7e14;
            background: #fffaf3;
            i {
              border-right: 5px solid transparent;
              border-top: 6px solid #fd7e14;
              border-left: 5px solid transparent;
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
            box-sizing: border-box;
            &:hover {
              padding: 0px 9px;
              height: 36px;
              border: 2px solid #fd7e14;
              color: #fd7e14;
              background: #fffaf3;
              i {
                border-right: 5px solid transparent;
                border-top: 6px solid #fd7e14;
                border-left: 5px solid transparent;
              }
            }
            i {
              position: relative;
              margin-left: 6px;
              border-right: 5px solid transparent;
              border-top: 6px solid rgba(23, 23, 58, 0.6);
              border-left: 5px solid transparent;
              &::after {
                content: "";
                position: absolute;
                top: -6px;
                left: -3px;
                border-right: 3px solid transparent;
                border-top: 4px solid #f8f9fa;
                border-left: 3px solid transparent;
              }
            }
          }
        }
      }
    }
  }
  .mining_detail {
    position: relative;
    .close {
      position: absolute;
      right: 20px;
      width: 24px;
      height: 24px;
      top: 20px;
      fill: #ccc;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 750px) {
  .icon {
    width: 20px;
    height: 20px;
  }
  .mining_list {
    width: 100%;
    margin: 20px auto 0;
    background: #f8f9fa;
    padding-bottom: 50px;
    .mining_item {
      display: none;
    }
  }
  .mining_title {
    display: none;
  }
  .wraper_title {
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .close {
      width: 24px;
      height: 24px;
      fill: #000;
      cursor: pointer;
    }
  }
  .mining_item_h5 {
    width: 100%;
    padding: 24px 10px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    border-radius: 5px;
    .activeMining {
      border-bottom: 1px solid #e8e8eb;
    }
    section {
      &:nth-of-type(1) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > span {
          font-size: 16px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 600;
          color: #17173a;
          line-height: 16px;
          > i {
            margin: 0 4px 0 2px;
            cursor: pointer;
            svg {
              fill: rgba(164, 162, 178, 1);
            }
            &:hover {
              svg {
                fill: #fd8a2b;
              }
            }
          }
        }
        p {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-family: IBMPlexSans;
          color: rgba(23, 23, 58, 0.45);
          line-height: 18px;
          font-weight: normal;
          img {
            width: 35px;
            height: 20px;
          }
          > span {
            margin-left: 10px;
            padding: 4px 11px;
            background: #f8f9fa;
            border-radius: 5px;
            height: 28px;
          }
        }
      }
      &:nth-of-type(2) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 14px;
        p {
          display: flex;
          flex-direction: column;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #17173a;
            }
            &:nth-of-type(2) {
              margin-top: 4px;
              font-size: 12px;
              font-family: IBMPlexSans;
              color: rgba(23, 23, 58, 0.45);
            }
          }
        }
        div {
          display: flex;
          align-items: center;
          > i {
            display: block;
            width: 24px;
            height: 24px;
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
                font-weight: 500;
                height: 18px;
                padding: 0 4px;
                b {
                  font-size: 10px;
                  font-weight: 500;
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
      }
      &:nth-of-type(3) {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        .activeButton {
          border: 2px solid #fd7e14;
          padding: 0px 9px;
          color: #fd7e14;
          background: #fffaf3;
        }
        button {
          min-width: 148px;
          height: 36px;
          background: #f8f9fa;
          border-radius: 5px;
          border: 1px solid #e8e8eb;
          font-size: 14px;
          font-family: HelveticaNeue;
          color: #17173a;
          line-height: 24px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          &:hover {
            padding: 0px 9px;
            height: 36px;
            border: 2px solid #fd7e14;
            color: #fd7e14;
            background: #fffaf3;
          }
        }
      }
    }
  }
}
.mining_detail {
  position: relative;
  .close {
    position: absolute;
    right: 20px;
    width: 24px;
    height: 24px;
    top: 20px;
    fill: #ccc;
    cursor: pointer;
  }
}
</style>
