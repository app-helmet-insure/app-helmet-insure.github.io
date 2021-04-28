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
        src="~/assets/img/flashmining/flash_link.png"
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
            <span v-if="typeof item.openDate == 'object'">
              {{ item.openDate.hour }}<b>{{ $t("Content.HourM") }}</b> <i>/</i
              >{{ item.openDate.minute }}<b>{{ $t("Content.MinM") }}</b>
            </span>
            <span v-else-if="typeof item.dueDate == 'object'">
              {{ item.dueDate.day }}<b>{{ $t("Content.DayM") }}</b> <i>/</i
              >{{ item.dueDate.hour }}<b>{{ $t("Content.HourM") }}</b>
            </span>
            <span v-else>
              {{ item.dueDate }}
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
            item.dueDate == "Finished" ? "--" : item.yearEarn + "%"
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
        src="~/assets/img/flashmining/flash_link.png"
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
            item.dueDate == "Finished" ? "--" : item.yearEarn + "%"
          }}</span>
          <span>APR</span>
        </p>
        <div>
          <i></i>
          <p>
            <span v-if="typeof item.openDate == 'object'">
              {{ item.openDate.hour }}<b>{{ $t("Content.HourM") }}</b> <i>/</i
              >{{ item.openDate.minute }}<b>{{ $t("Content.MinM") }}</b>
            </span>
            <span v-else-if="typeof item.dueDate == 'object'">
              {{ item.dueDate.day }}<b>{{ $t("Content.DayM") }}</b> <i>/</i
              >{{ item.dueDate.hour }}<b>{{ $t("Content.HourM") }}</b>
            </span>
            <span v-else>
              {{ item.dueDate }}
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
import { burgerswap } from "~/assets/utils/burgerswap.js";
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
          dueDate: this.getRemainTime("2021/05/12 00:00"),
          openDate: this.getMiningTime("2021/04/22 00:00"),
          weekly: fixD((20000 / 20) * 7, 2) + " hxBURGER",
          yearEarn: apyArray["hxBURGER"] || "--",
          expired: new Date("2021/05/12 00:00") * 1,
          started: new Date("2021/04/22 00:00") * 1,
        },
        {
          miningName: "<i>hTPT</i>&nbsp;Pool",
          desc: "By hDODO-Helmet LPT",
          earn: "hTPT",
          dueDate: this.getRemainTime("2021/04/26 00:00"),
          openDate: this.getMiningTime("2021/04/06 00:00"),
          weekly: fixD((2000000 / 21) * 7, 2) + " hTPT",
          yearEarn: apyArray["hTPT"] || "--",
          expired: new Date("2021/04/26 00:00") * 1,
          started: new Date("2021/04/06 00:00") * 1,
        },
        {
          miningName: "<i>hDODO</i>&nbsp;Pool",
          desc: "By hMATH-Helmet LPT",
          earn: "hDODO",
          dueDate: this.getRemainTime("2021/03/31 12:00"),
          openDate: "Mining",
          weekly: fixD((40000 / 15) * 7, 2) + " hDODO",
          yearEarn: apyArray["hDODO"] || "--",
          expired: new Date("2021/03/31 12:00") * 1,
        },
        {
          miningName: "<i>hMATH</i>&nbsp;Pool",
          desc: "By hAUTO-Helmet LPT",
          earn: "hMATH",
          dueDate: this.getRemainTime("2021/03/18 00:00"),
          openDate: "Mining",
          weekly: fixD((30000 / 15) * 7, 2) + " hMATH",
          yearEarn: apyArray["hMATH"] || "--",
          expired: new Date("2021/03/18 00:00") * 1,
        },
        {
          miningName: "<i>hAUTO</i>&nbsp;Pool",
          desc: "By BNB500-Helmet LPT",
          earn: "hAUTO",
          dueDate: this.getRemainTime("2021/03/09 00:00"),
          openDate: "Mining",
          weekly: fixD((10 / 14) * 7, 2) + " hAUTO",
          yearEarn: apyArray["hAUTO"] || "--",
          expired: new Date("2021/03/09 00:00") * 1,
        },
        {
          miningName: "<i>BNB500</i>&nbsp;Pool",
          desc: "By hCTK-Helmet LPT",
          earn: "BNB500",
          dueDate: this.getRemainTime("2021/02/29 00:00"),
          openDate: "Mining",
          weekly: fixD((1000 / 10) * 7, 2) + " BNB500",
          yearEarn: apyArray["BNB500"] || "--",
          expired: new Date("2021/02/29 00:00") * 1,
        },
        {
          miningName: "<i>hCTK</i>&nbsp;Pool",
          desc: "By HCCT-Helmet LPT",
          earn: "hCTK",
          dueDate: this.getRemainTime("2021/02/28 00:00"),
          openDate: "Mining",
          weekly: fixD((70000 / 21) * 7, 2) + " hCTK",
          yearEarn: apyArray["hCTK"] || "--",
          expired: new Date("2021/02/28 00:00") * 1,
        },
        {
          miningName: "<i>HCCT</i>&nbsp;Pool",
          desc: "By LONG-Helmet LPT",
          earn: "HCCT",
          dueDate: this.getRemainTime("2021/02/13 00:00"),
          openDate: "Mining",
          weekly: fixD(16000 * 7, 2) + " HCCT",
          yearEarn: apyArray["HCCT"] || "--",
          expired: new Date("2021/02/13 00:00") * 1,
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
      let HAUTOHELMET = await burgerswap("HXBURGER", "HELMET", 18); //Hlemt价格
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
    position: relative;
    .link_flash {
      width: 8px;
      height: 32px;
      position: absolute;
      left: 6px;
      top: -21px;
    }
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
          min-width: 160px;
          span {
            &:nth-of-type(1) {
              font-size: 16px;
              font-family: IBMPlexSans-Medium, IBMPlexSans;
              font-weight: 600;
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
          flex: 2.5;
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
          min-width: 220px;
          flex: 2;
          display: flex;
          justify-content: flex-end;
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
    background: #ffffff;
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
      border-bottom: 1px solid #e8e8eb;
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
                color: #17173a;
                line-height: 17px;
              }
              &:nth-of-type(2) {
                font-size: 12px;
                font-family: IBMPlexSans;
                color: rgba(23, 23, 58, 0.45);
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
      }
      &:nth-of-type(3) {
        margin-top: 16px;
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
          height: 36px;
          background: #f8f9fa;
          border-radius: 5px;
          border: 1px solid #e8e8eb;
          font-size: 14px;
          font-family: HelveticaNeue;
          color: #17173a;
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
      fill: #000;
      cursor: pointer;
    }
  }
}
</style>
