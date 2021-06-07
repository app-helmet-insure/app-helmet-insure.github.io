<template>
  <div class="flashmining_list">
    <div class="flashmining_title">
      <h3>{{ $t("Header.FlashMining") }}</h3>
    </div>
    <div
      class="mining_item"
      v-for="(item, index) in miningList"
      :key="item.earn"
    >
      <img
        class="link_flash"
        :src="require(`~/assets/img/flashmining/flash_link_${storeThemes}.png`)"
        alt=""
        v-if="index != 0"
      />
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
          <span
            class="onePager"
            v-html="item.miningName"
            @click="hadnleShowOnePager($event, item.earn)"
          ></span>
          <span>{{ item.desc }}</span>
        </section>
        <section>
          <p>
            {{ $t("Table.EarnList") }}
            <span>
              {{ item.earn }}
            </span>
          </p>
        </section>
        <section>
          <i></i>
          <p>
            <span v-if="typeof timeArray[item.earn].openDate == 'object'">
              {{ timeArray[item.earn].openDate.hour
              }}<b>{{ $t("Content.HourM") }}</b> <i>/</i
              >{{ timeArray[item.earn].openDate.minute
              }}<b>{{ $t("Content.MinM") }}</b>
            </span>
            <span v-else-if="typeof timeArray[item.earn].dueDate == 'object'">
              {{ timeArray[item.earn].dueDate.day
              }}<b>{{ $t("Content.DayM") }}</b> <i>/</i
              >{{ timeArray[item.earn].dueDate.hour
              }}<b>{{ $t("Content.HourM") }}</b>
            </span>
            <span v-else>
              {{ timeArray[item.earn].dueDate }}
            </span>
            <span>{{ $t("Table.MIningCutdown") }}</span>
          </p>
        </section>
        <section>
          <span>{{ item.weekly }}</span>
          <span>{{ $t("Table.RewardsDistribution") + "(weekly)" }}</span>
        </section>
        <section>
          <span>{{
            timeArray[item.earn].dueDate == "Finished"
              ? "--"
              : item.yearEarn + "%"
          }}</span>
          <span>APR</span>
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
            {{ $t("Insurance.Insurance_text23") }}
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
            {{ $t("Table.Claim") }}
            <i class="selectDown"></i>
          </button>
        </section>
      </div>
      <div
        class="flash_detail"
        v-if="showActiveFlash && activeFlash == item.earn"
      >
        <svg class="close" aria-hidden="true" @click="showActiveFlash = false">
          <use xlink:href="#icon-close"></use>
        </svg>
        <Hxburgerpool
          v-if="activeFlash == 'hxBURGER' && showActiveFlash"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></Hxburgerpool>
        <HtptPool
          v-if="activeFlash == 'hTPT' && showActiveFlash"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HtptPool>
        <HdodoPool
          v-if="activeFlash == 'hDODO' && showActiveFlash"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HdodoPool>
        <HmathPool
          v-if="activeFlash == 'hMATH' && showActiveFlash"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HmathPool>
        <HautoPool
          v-if="activeFlash == 'hAUTO' && showActiveFlash"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HautoPool>
        <Bnb500Pool
          v-if="activeFlash == 'BNB500' && showActiveFlash"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></Bnb500Pool>
        <HctkPool
          v-if="activeFlash == 'hCTK' && showActiveFlash"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HctkPool>
        <HcctPool
          v-if="activeFlash == 'HCCT' && showActiveFlash"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HcctPool>
      </div>
    </div>
    <div
      class="mining_item_h5"
      v-for="(item, index) in miningList"
      :key="item.earn + '1'"
    >
      <img
        class="link_flash"
        :src="require(`~/assets/img/flashmining/flash_link_${storeThemes}.png`)"
        alt=""
        v-if="index != 0"
      />
      <section>
        <div>
          <img
            :src="require(`~/assets/img/flashmining/${item.earn}.png`)"
            alt=""
          />
          <p>
            <span
              class="onePager"
              v-html="item.miningName"
              @click="hadnleShowOnePager($event, item.earn)"
            ></span>
            <span>{{ item.desc }}</span>
          </p>
        </div>
        <p>
          {{ $t("Table.EarnList") }}
          <span>
            {{ item.earn }}
          </span>
        </p>
      </section>
      <section>
        <p>
          <span>{{
            timeArray[item.earn].dueDate == "Finished"
              ? "--"
              : item.yearEarn + "%"
          }}</span>
          <span>APR</span>
        </p>
        <div>
          <i></i>
          <p>
            <span v-if="typeof timeArray[item.earn].openDate == 'object'">
              {{ timeArray[item.earn].openDate.hour
              }}<b>{{ $t("Content.HourM") }}</b> <i>/</i
              >{{ timeArray[item.earn].openDate.minute
              }}<b>{{ $t("Content.MinM") }}</b>
            </span>
            <span v-else-if="typeof timeArray[item.earn].dueDate == 'object'">
              {{ timeArray[item.earn].dueDate.day
              }}<b>{{ $t("Content.DayM") }}</b> <i>/</i
              >{{ timeArray[item.earn].dueDate.hour
              }}<b>{{ $t("Content.HourM") }}</b>
            </span>
            <span v-else>
              {{ timeArray[item.earn].dueDate }}
            </span>
            <span>{{ $t("Table.MIningCutdown") }}</span>
          </p>
        </div>
      </section>
      <section>
        <span>{{ item.weekly }}</span>
        <span>{{ $t("Table.RewardsDistribution") + "(weekly)" }} </span>
      </section>
      <section>
        <button
          @click="StakeMiningH5(item.earn)"
          :class="
            activeFlash == item.earn && showActiveFlash && activeType == 'STAKE'
              ? 'activeButton stakeFlash'
              : 'stakeFlash'
          "
        >
          {{ $t("Insurance.Insurance_text23") }}
        </button>
        <button
          @click="ClaimMiningH5(item.earn)"
          :class="
            activeFlash == item.earn && showActiveFlash && activeType == 'CLAIM'
              ? 'activeButton claimFlash'
              : 'claimFlash'
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
      <Hxburgerpool
        v-if="activeFlash == 'hxBURGER'"
        :activeType="activeType"
        :TradeType="activeType"
      ></Hxburgerpool>
      <HtptPool
        v-if="activeFlash == 'hTPT'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HtptPool>
      <HdodoPool
        v-if="activeFlash == 'hDODO'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HdodoPool>
      <HmathPool
        v-if="activeFlash == 'hMATH'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HmathPool>
      <HautoPool
        v-if="activeFlash == 'hAUTO'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HautoPool>
      <Bnb500Pool
        v-if="activeFlash == 'BNB500'"
        :activeType="activeType"
        :TradeType="activeType"
      ></Bnb500Pool>
      <HctkPool
        v-if="activeFlash == 'hCTK'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HctkPool>
      <HcctPool
        v-if="activeFlash == 'HCCT'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HcctPool>
    </Wraper>
  </div>
</template>

<script>
import Wraper from "~/components/common/wraper.vue";
import { totalSupply, balanceOf } from "~/interface/deposite";
import { fixD } from "~/assets/js/util.js";
import precision from "~/assets/js/precision.js";
import { pancakeswap } from "~/assets/utils/pancakeswap.js";
import { burgerswaplpt } from "~/assets/utils/burgerswap.js";
import Hxburgerpool from "~/components/flashmining/hxburger_pool.vue";
import HtptPool from "~/components/flashmining/htpt_pool.vue";
import HcctPool from "~/components/flashmining/hcct_pool.vue";
import HctkPool from "~/components/flashmining/hctk_pool.vue";
import Bnb500Pool from "~/components/flashmining/bnb500_pool.vue";
import HautoPool from "~/components/flashmining/hauto_pool.vue";
import HmathPool from "~/components/flashmining/hmath_pool.vue";
import HdodoPool from "~/components/flashmining/hdodo_pool.vue";
import moment from "moment";
export default {
  components: {
    Wraper,
    Hxburgerpool,
    HtptPool,
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
      TradeType: "",
      apyArray: {
        hxBURGER: 0,
        hTPT: 0,
        hDODO: 0,
        hMATH: 0,
        hAUTO: 0,
        hCTK: 0,
        HCCT: 0,
      },
      timeArray: {
        hxBURGER: {
          dueDate: this.getRemainTime("2021/05/12 00:00"),
          openDate: this.getMiningTime("2021/04/22 00:00"),
          expired: new Date("2021/05/12 00:00") * 1,
          started: new Date("2021/04/22 00:00") * 1,
        },
        hTPT: {
          dueDate: this.getRemainTime("2021/04/26 00:00"),
          openDate: this.getMiningTime("2021/04/06 00:00"),
          expired: new Date("2021/04/26 00:00") * 1,
          started: new Date("2021/04/06 00:00") * 1,
        },
        hDODO: {
          dueDate: this.getRemainTime("2021/03/31 12:00"),
          openDate: this.getMiningTime("2021/03/24 00:00"),
          expired: new Date("2021/03/31 12:00") * 1,
          expired: new Date("2021/03/24 12:00") * 1,
        },
        hMATH: {
          dueDate: this.getRemainTime("2021/03/18 00:00"),
          openDate: this.getRemainTime("2021/03/11 00:00"),
          expired: new Date("2021/03/18 00:00") * 1,
          started: new Date("2021/03/11 12:00") * 1,
        },
        hAUTO: {
          dueDate: this.getRemainTime("2021/03/09 00:00"),
          openDate: this.getRemainTime("2021/03/02 00:00"),
          expired: new Date("2021/03/29 00:00") * 1,
          started: new Date("2021/03/02 12:00") * 1,
        },
        BNB500: {
          dueDate: this.getRemainTime("2021/02/29 00:00"),
          openDate: this.getRemainTime("2021/02/22 00:00"),
          expired: new Date("2021/02/29 00:00") * 1,
          started: new Date("2021/02/22 12:00") * 1,
        },
        hCTK: {
          dueDate: this.getRemainTime("2021/02/28 00:00"),
          openDate: this.getRemainTime("2021/02/21 00:00"),
          expired: new Date("2021/02/28 00:00") * 1,
          started: new Date("2021/02/21 12:00") * 1,
        },
        HCCT: {
          dueDate: this.getRemainTime("2021/02/13 00:00"),
          openDate: this.getRemainTime("2021/02/06 00:00"),
          expired: new Date("2021/02/13 00:00") * 1,
          started: new Date("2021/02/06 12:00") * 1,
        },
      },
    };
  },
  mounted() {
    this.initFlashMiningData();
    this.getAPY();
    let timer = setInterval(() => {
      this.getAPY();
    }, 20000);
    this.$once("hook:beforeDestroy", () => {
      clearTimeout(timer);
    });
  },
  computed: {
    storeThemes() {
      return this.$store.state.themes;
    },
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
    hadnleShowOnePager(e, earn) {
      if (e.target.tagName === "I") {
        let Earn = earn;
        this.$bus.$emit("OPEN_ONEPAGER", {
          showFlag: true,
          title: `What is $${earn}?`,
          text: earn,
        });
      } else {
        return;
      }
    },
    StakeMiningH5(MiningType) {
      this.activeType = "STAKE";
      this.TradeType = "STAKE";
      this.showActiveFlash = true;
      this.activeFlash = MiningType;
      this.$bus.$emit("OPEN_WRAPER_PAFE", true);
    },
    ClaimMiningH5(MiningType) {
      this.activeType = "CLAIM";
      this.TradeType = "CLAIM";
      this.showActiveFlash = true;
      this.activeFlash = MiningType;
      this.$bus.$emit("OPEN_WRAPER_PAFE", true);
    },
    StakeMining(MiningType) {
      this.activeType = "STAKE";
      this.showActiveFlash = true;
      this.activeFlash = MiningType;
    },
    ClaimMining(MiningType) {
      this.activeType = "CLAIM";
      this.showActiveFlash = true;
      this.activeFlash = MiningType;
    },
    close_wraper() {
      this.$bus.$emit("OPEN_WRAPER_PAFE", false);
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
          miningName: "<i>hxBURGER</i>&nbsp;Pool",
          desc: "By hTPT-Helmet LPT",
          earn: "hxBURGER",
          weekly: fixD((20000 / 20) * 7, 2) + " hxBURGER",
        },
        {
          miningName: "<i>hTPT</i>&nbsp;Pool",
          desc: "By hDODO-Helmet LPT",
          earn: "hTPT",
          weekly: fixD((2000000 / 21) * 7, 2) + " hTPT",
        },
        {
          miningName: "<i>hDODO</i>&nbsp;Pool",
          desc: "By hMATH-Helmet LPT",
          earn: "hDODO",
          weekly: fixD((40000 / 15) * 7, 2) + " hDODO",
        },
        {
          miningName: "<i>hMATH</i>&nbsp;Pool",
          desc: "By hAUTO-Helmet LPT",
          earn: "hMATH",
          weekly: fixD((30000 / 15) * 7, 2) + " hMATH",
        },
        {
          miningName: "<i>hAUTO</i>&nbsp;Pool",
          desc: "By BNB500-Helmet LPT",
          earn: "hAUTO",
          weekly: fixD((10 / 14) * 7, 2) + " hAUTO",
        },
        {
          miningName: "<i>BNB500</i>&nbsp;Pool",
          desc: "By hCTK-Helmet LPT",
          earn: "BNB500",
          weekly: fixD((1000 / 10) * 7, 2) + " BNB500",
        },
        {
          miningName: "<i>hCTK</i>&nbsp;Pool",
          desc: "By HCCT-Helmet LPT",
          earn: "hCTK",
          weekly: fixD((70000 / 21) * 7, 2) + " hCTK",
        },
        {
          miningName: "<i>HCCT</i>&nbsp;Pool",
          desc: "By LONG-Helmet LPT",
          earn: "HCCT",
          weekly: fixD(16000 * 7, 2) + " HCCT",
        },
      ];
      this.miningList = arr;
    },
    getRemainTime(time) {
      let now = new Date() * 1;
      let dueDate = time;
      dueDate = new Date(moment(dueDate + " UTC+8")) * 1;
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
        return "Finished";
      }
    },
    getMiningTime(time) {
      let now = new Date() * 1;
      let dueDate = time;
      dueDate = new Date(moment(dueDate + " UTC+8")) * 1;
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
          minute: minute > 9 ? minute : "0" + minute,
        };
        return template;
      } else {
        return "Mining";
      }
    },
    getAPY() {
      this.GET_HAUTO_POOL_APY();
      this.GET_BNB500_POOL_APY();
      this.GET_HCTK_POOL_APY();
      this.GET_HDODO_POOL_APY();
      this.GET_HMATH_POOL_APY();
      this.GET_HCCT_POOL_APY();
      this.GET_HTPT_POOL_APY();
      this.GET_HXBURGER_POOL_APY();
    },
    async GET_HXBURGER_POOL_APY() {
      let HAUTOHELMET = await burgerswaplpt("HXBURGER", "HELMET", 18); //Hlemt价格
      let HctkVolume = await totalSupply("HXBURGERPOOL"); //数量
      let LptVolume = await totalSupply("HXBURGERPOOL_LPT"); //发行
      let HelmetValue = await balanceOf("HELMET", "HXBURGERPOOL_LPT", true);
      // APY = 年产量*helmet价格/抵押价值
      let APY = fixD(
        precision.times(
          precision.divide(
            precision.times(HAUTOHELMET, precision.divide(20000, 20), 365),
            precision.times(
              precision.divide(precision.times(HelmetValue, 2), LptVolume),
              HctkVolume
            )
          ),
          100
        ),
        2
      );
      let startedTime = this.miningList[0].started;
      let nowTime = new Date() * 1;
      if (nowTime < startedTime) {
        this.miningList[0].yearEarn = "Infinity";
      } else {
        // this.apyArray.hxBURGER = "--";
        // this.miningList[0].yearEarn = "--";
        this.apyArray.hxBURGER = fixD(APY, 2);
        this.miningList[0].yearEarn = fixD(APY, 2);
      }
    },
    async GET_HTPT_POOL_APY() {
      let HAUTOHELMET = await pancakeswap("HTPT", "HELMET"); //Hlemt价格
      let HctkVolume = await totalSupply("HTPTPOOL"); //数量
      let LptVolume = await totalSupply("HTPTPOOL_LPT"); //发行
      let HelmetValue = await balanceOf("HELMET", "HTPTPOOL_LPT", true);
      // APY = 年产量*helmet价格/抵押价值

      let APY = fixD(
        precision.times(
          precision.divide(
            precision.times(HAUTOHELMET, precision.divide(2000000, 21), 365),
            precision.times(
              precision.divide(precision.times(HelmetValue, 2), LptVolume),
              HctkVolume
            )
          ),
          100
        ),
        2
      );

      let startedTime = this.miningList[1].started;
      let nowTime = new Date() * 1;
      if (nowTime < startedTime) {
        this.miningList[1].yearEarn = "Infinity";
      } else {
        this.apyArray.hTPT = fixD(APY, 2);
        this.miningList[1].yearEarn = fixD(APY, 2);
      }
    },
    async GET_HDODO_POOL_APY() {
      let HCTKHELMET = await pancakeswap("HDODO", "HELMET"); //Hlemt价格
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
        this.miningList[2].yearEarn = "--";
      } else {
        this.apyArray.hDODO = fixD(APY, 2);
        this.miningList[2].yearEarn = fixD(APY, 2);
      }
    },
    async GET_HMATH_POOL_APY() {
      let HMATHHELMET = await pancakeswap("HMATH", "HELMET"); //Hlemt价格
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
        this.miningList[3].yearEarn = "--";
      } else {
        this.apyArray.hMATH = fixD(APY, 2);
        this.miningList[3].yearEarn = fixD(APY, 2);
      }
    },
    async GET_HAUTO_POOL_APY() {
      let HAUTOHELMET = await pancakeswap("HAUTO", "HELMET"); //Hlemt价格
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
        this.miningList[4].yearEarn = "--";
      } else {
        this.apyArray.hAUTO = fixD(APY, 2);
        this.miningList[4].yearEarn = fixD(APY, 2);
      }
    },
    async GET_BNB500_POOL_APY() {
      let HCTKHELMET = await pancakeswap("BNB500", "HELMET"); //Hlemt价格
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
        this.miningList[5].yearEarn = "--";
      } else {
        this.apyArray.BNB500 = fixD(APY, 2);
        this.miningList[5].yearEarn = fixD(APY, 2);
      }
    },
    async GET_HCCT_POOL_APY() {
      let HCCTHELMET = await pancakeswap("HCCT", "HELMET");
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
        this.miningList[6].yearEarn = "--";
      } else {
        this.apyArray.HCCT = fixD(APY, 2);
        this.miningList[6].yearEarn = fixD(APY, 2);
      }
    },
    async GET_HCTK_POOL_APY() {
      let HCTKHELMET = await pancakeswap("HCTK", "HELMET"); //Hlemt价格
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
        this.miningList[7].yearEarn = "--";
      } else {
        this.apyArray.HCTK = fixD(APY, 2);
        this.miningList[7].yearEarn = fixD(APY, 2);
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/css/base.scss";
.onePager {
  > i {
    cursor: pointer;
    border-bottom: 2px dotted rgba(23, 23, 58, 0.45);
    &:hover {
      color: #fd7e14;
      border-bottom: 2px dotted #fd7e14;
    }
  }
}
</style>
<style lang="scss" scoped >
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .icon {
    width: 20px;
    height: 20px;
  }
  .flashmining_list {
    width: 100%;
    margin: 0 auto;
    .mining_item_h5 {
      display: none;
    }
  }
  .flashmining_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-size: 18px;
      font-family: Helvetica;
      @include themeify {
        color: themed("color-17173a");
      }
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
    @include themeify {
      background: themed("color-ffffff");
    }
    display: flex;
    flex-direction: column;
    position: relative;
    .link_flash {
      width: 8px;
      height: 32px;
      position: absolute;
      left: 6px;
      top: -21px;
    }
    .activeFlash {
      @include themeify {
        border-bottom: 1px solid themed("color-e8e8eb");
      }
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
          min-width: 160px;
          span {
            &:nth-of-type(1) {
              font-size: 16px;
              font-family: IBMPlexSans-Medium, IBMPlexSans;
              font-weight: 600;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 18px;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              font-family: IBMPlexSans;
              @include themeify {
                color: darken($color: themed("color-17173a"), $amount: 55%);
              }
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
            @include themeify {
              color: darken($color: themed("color-17173a"), $amount: 55%);
            }
            line-height: 18px;
            > span {
              @include themeify {
                background: themed("mining_earn");
              }
              border-radius: 5px;
              display: flex;
              align-items: center;
              height: 28px;
              padding: 0 4px;
              font-size: 14px;
              font-family: IBMPlexSans;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 16px;
              margin-left: 4px;
              min-width: 90px;
              justify-content: center;
            }
          }
        }
        &:nth-of-type(3) {
          display: flex;
          align-items: center;
          flex: 2;
          min-width: 160px;
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
                @include themeify {
                  background: themed("color-f8f9fa");
                }
                border-radius: 3px;
                font-size: 14px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: themed("color-17173a");
                }
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
                @include themeify {
                  color: darken($color: themed("color-17173a"), $amount: 55%);
                }
                line-height: 12px;
              }
            }
          }
        }
        &:nth-of-type(4) {
          flex: 2.5;
          display: flex;
          flex-direction: column;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: IBMPlexSans;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              font-family: IBMPlexSans;
              @include themeify {
                color: darken($color: themed("color-17173a"), $amount: 55%);
              }
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
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              font-family: IBMPlexSans;
              @include themeify {
                color: darken($color: themed("color-17173a"), $amount: 55%);
              }
              line-height: 12px;
              margin-top: 4px;
            }
          }
        }
        &:nth-of-type(6) {
          min-width: 220px;
          flex: 2;
          display: flex;
          justify-content: flex-end;
          .activeButton {
            border: 2px solid #fd7e14 !important;
            padding: 0px 9px;
            color: #fd7e14 !important;
            i {
              border-right: 5px solid transparent;
              border-top: 6px solid #fd7e14 !important;
              border-left: 5px solid transparent;
              transform: rotate(180deg);
            }
          }
          button {
            padding: 0px 10px;
            height: 36px;
            @include themeify {
              background: themed("insure_button");
              border: 1px solid themed("insure_button_border");
              color: themed("insure_button_text");
            }
            border-radius: 5px;
            margin-left: 20px;
            font-size: 14px;
            font-family: HelveticaNeue;
            line-height: 18px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            &:nth-of-type(1) {
              margin: 0;
            }
            &:hover {
              padding: 0px 9px;
              height: 36px;
              border: 2px solid #fd7e14 !important;
              color: #fd7e14 !important;
              i {
                border-right: 5px solid transparent;
                border-top: 6px solid #fd7e14 !important;
                border-left: 5px solid transparent;
              }
            }
            i {
              position: relative;
              margin-left: 6px;
              border-right: 5px solid transparent;
              @include themeify {
                border-top: 6px solid themed("color-17173a");
              }
              border-left: 5px solid transparent;
              &::after {
                content: "";
                position: absolute;
                top: -6px;
                left: -3px;
                border-right: 3px solid transparent;
                @include themeify {
                  border-top: 4px solid themed("color-f8f9fa");
                }
                border-left: 3px solid transparent;
              }
            }
          }
        }
      }
    }
    .flash_detail {
      position: relative;
      .close {
        position: absolute;
        right: 0;
        width: 24px;
        height: 24px;
        top: 10px;
        fill: #ccc;
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .icon {
    width: 20px;
    height: 20px;
  }
  .flashmining_list {
    margin: 0 10px;
    padding-bottom: 50px;
    border-radius: 5px;
    .mining_item {
      display: none;
    }
  }
  .flashmining_title {
    display: none;
  }
  .mining_item_h5 {
    width: 100%;
    margin-top: 10px;
    padding: 5px 10px 20px;
    @include themeify {
      background: themed("color-ffffff");
    }
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    position: relative;
    .link_flash {
      width: 8px;
      height: 32px;
      position: absolute;
      left: 10px;
      top: -21px;
    }
    .activeFlash {
      @include themeify {
        border-bottom: 1px solid themed("color-e8e8eb");
      }
    }

    section {
      &:nth-of-type(1) {
        display: flex;
        justify-content: space-between;
        > div {
          display: flex;
          align-items: center;
          img {
            width: 54px;
            height: 54px;
          }
          p {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            span {
              &:nth-of-type(1) {
                font-size: 16px;
                font-family: IBMPlexSans-Medium, IBMPlexSans;
                font-weight: 600;
                @include themeify {
                  color: themed("color-17173a");
                }
                line-height: 17px;
              }
              &:nth-of-type(2) {
                font-size: 12px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: darken($color: themed("color-17173a"), $amount: 55%);
                }
                line-height: 14px;
                margin-top: 2px;
              }
            }
          }
        }
        > p {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-family: IBMPlexSans;
          @include themeify {
            color: darken($color: themed("color-17173a"), $amount: 55%);
          }
          line-height: 18px;
          > span {
            @include themeify {
              background: themed("color-f8f9fa");
            }
            border-radius: 5px;
            display: flex;
            align-items: center;
            height: 28px;
            padding: 0 4px;
            font-size: 14px;
            font-family: IBMPlexSans;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 14px;
            margin-left: 4px;
            min-width: 90px;
            justify-content: center;
          }
        }
      }
      &:nth-of-type(2) {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        p {
          display: flex;
          flex-direction: column;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: IBMPlexSans;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              font-family: IBMPlexSans;
              @include themeify {
                color: darken($color: themed("color-17173a"), $amount: 55%);
              }
              line-height: 12px;
              margin-top: 4px;
            }
          }
        }
        div {
          display: flex;
          align-items: center;
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
                @include themeify {
                  background: themed("color-f8f9fa");
                }
                border-radius: 3px;
                font-size: 14px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: themed("color-17173a");
                }
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
                @include themeify {
                  color: darken($color: themed("color-17173a"), $amount: 55%);
                }
                line-height: 12px;
              }
            }
          }
        }
      }
      &:nth-of-type(3) {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            font-family: IBMPlexSans;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 14px;
          }
          &:nth-of-type(2) {
            font-size: 12px;
            font-family: IBMPlexSans;
            @include themeify {
              color: darken($color: themed("color-17173a"), $amount: 55%);
            }
            line-height: 12px;
            margin-top: 4px;
          }
        }
      }

      &:nth-of-type(4) {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        .activeButton {
          border: 2px solid #fd7e14;
          padding: 0px 9px;
          color: #fd7e14;
          background: #fffaf3;
        }
        button {
          min-width: 148px;
          @include themeify {
            background: themed("insure_button");
            border: 1px solid themed("insure_button_border");
            color: themed("insure_button_text");
          }
          height: 36px;
          border-radius: 5px;
          font-size: 14px;
          font-family: HelveticaNeue;
          line-height: 18px;
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
    .flash_detail {
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
      fill: #ccc;
      cursor: pointer;
    }
  }
}
</style>
