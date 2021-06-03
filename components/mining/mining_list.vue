<template>
  <div class="mining_list">
    <div class="mining_title">
      <h3>{{ $t("Header.Mining") }}</h3>
    </div>
    <div v-for="item in miningList" :key="item.earn">
      <div class="finshed_line finshed_pc" v-if="item.earn == 'bhelmet_dodo'">
        <p></p>
        <i></i>
        <span>Finished</span>
        <i></i>
        <p></p>
      </div>
      <div class="mining_item">
        <div
          :class="
            activeMining == item.earn && showActiveMining
              ? 'activeMining mining_show'
              : 'mining_show'
          "
        >
          <img
            class="combo_img"
            :src="
              require(`~/assets/img/mining/combo_${
                timeArray[item.earn].dueDate == 'Finished' ? 'expired' : 'web'
              }.png`)
            "
            alt=""
            v-if="item.combo"
          />
          <img
            class="combo_img"
            style="width: 116px"
            :src="
              require(`~/assets/img/mining/${
                timeArray[item.earn].dueDate == 'Finished'
                  ? 'serial_web_expired'
                  : 'serial_web'
              }.png`)
            "
            alt=""
            v-if="item.serial"
          />
          <img
            class="combo_img"
            style="width: 32px; height: 32px; left: 10px"
            :src="
              require(`~/assets/img/mining/${
                timeArray[item.earn].dueDate == 'Finished'
                  ? 'serialnext_web_expired'
                  : 'serialnext_web'
              }.png`)
            "
            alt=""
            v-if="item.serialNext"
          />
          <img
            class="combo_img"
            style="width: 83px; height: 28px; left: 376px"
            src="~/assets/img/mining/iiostark.png"
            alt=""
            v-if="item.iio"
          />

          <section>
            <span
              class="onePager"
              v-html="item.miningName"
              @click="hadnleShowOnePager($event, item.onePager)"
            ></span>
          </section>
          <section>
            <p>
              {{ $t("Table.EarnList") }}
              <span>
                <img
                  v-if="item.earnImg"
                  :src="
                    require(`~/assets/img/mining/${
                      timeArray[item.earn].dueDate == 'Finished'
                        ? item.earn + '_expired'
                        : item.earn
                    }.png`)
                  "
                  :class="item.earnNum"
                  alt=""
                />
                <template v-else style="color: #17173a">{{
                  item.earn
                }}</template>
              </span>
            </p>
          </section>
          <section>
            <i></i>
            <p>
              <span v-if="typeof timeArray[item.earn].openDate == 'object'">
                {{ timeArray[item.earn].openDate.hour
                }}<b>{{ $t("Content.HourM") }}</b>
                <i>/</i>
                {{ timeArray[item.earn].openDate.minute
                }}<b>{{ $t("Content.MinM") }}</b>
                <i>/</i>
              </span>
              <span v-else-if="typeof timeArray[item.earn].dueDate == 'object'">
                <template v-if="timeArray[item.earn].dueDate.day != '00'">
                  {{ timeArray[item.earn].dueDate.day
                  }}<b>{{ $t("Content.DayM") }}</b>
                  <i>/</i>
                </template>
                <template>
                  {{ timeArray[item.earn].dueDate.hour
                  }}<b>{{ $t("Content.HourM") }}</b>
                  <i>/</i>
                </template>
                <template v-if="timeArray[item.earn].dueDate.day == '00'">
                  {{ timeArray[item.earn].dueDate.minute
                  }}<b>{{ $t("Content.MinM") }}</b>
                  <i>/</i>
                </template>
              </span>
              <span v-else>
                {{ timeArray[item.earn].dueDate }}
              </span>
              <span>{{ $t("Table.MIningCutdown") }}</span>
            </p>
          </section>
          <section>
            <span>{{
              timeArray[item.earn].dueDate == "Finished"
                ? "--"
                : apyArray[item.earn] + "%"
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
          <svg
            class="close"
            aria-hidden="true"
            @click="showActiveMining = false"
          >
            <use xlink:href="#icon-close"></use>
          </svg>
          <HelmetBnbPool
            v-if="activeMining == 'helmet_cake_v1' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
          <HelmetBnb1Pool
            v-if="activeMining == 'helmet_cake_v2' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
          <HelmetMdxPool
            v-if="activeMining == 'mdx' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
          <BhelmetDodoPool
            v-if="activeMining == 'bhelmet_dodo' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
          <HelmetDodoPool
            v-if="activeMining == 'helmet_dodo' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
          <FeiFeiPool
            v-if="activeMining == 'QFEI' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
          <QfeiQsdPool
            v-if="activeMining == 'kun' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
          <HelmetKunPool
            v-if="activeMining == 'QHELMET' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
          <HelmetHelmetPool
            v-if="activeMining == 'helmet' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
          <HelmetForPool
            v-if="activeMining == 'helmet_for' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
          <HelmetBurgerPool
            v-if="activeMining == 'helmet_burger' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
          <HelmetXburgerPool
            v-if="activeMining == 'bhelmet_xburger' && showActiveMining"
            :activeType="activeType"
            :TradeType="'ALL'"
          />
        </div>
      </div>
    </div>
    <div v-for="item in miningList" :key="item.earn + '1'">
      <div class="finshed_line finshed_h5" v-if="item.earn == 'bhelmet_dodo'">
        <p></p>
        <i></i>
        <span>Finished</span>
        <i></i>
        <p></p>
      </div>

      <div class="mining_item_h5">
        <img
          class="combo_img"
          :src="
            require(`~/assets/img/mining/combo_${
              timeArray[item.earn].dueDate == 'Finished' ? 'expired' : 'web'
            }.png`)
          "
          alt=""
          v-if="item.combo"
        />
        <img
          class="combo_img"
          style="width: 116px"
          :src="
            require(`~/assets/img/mining/${
              timeArray[item.earn].dueDate == 'Finished'
                ? 'serial_web_expired'
                : 'serial_web'
            }.png`)
          "
          alt=""
          v-if="item.serial"
        />
        <img
          class="combo_img"
          style="width: 32px; height: 32px; left: 10px"
          :src="
            require(`~/assets/img/mining/${
              timeArray[item.earn].dueDate == 'Finished'
                ? 'serialnext_web_expired'
                : 'serialnext_web'
            }.png`)
          "
          alt=""
          v-if="item.serialNext"
        /><img
          class="combo_img"
          style="
            width: 83px;
            height: 28px;
            left: 100%;
            transform: translateX(-100%);
          "
          src="~/assets/img/mining/iiostark.png"
          alt=""
          v-if="item.iio"
        />
        <section>
          <span
            class="onePager"
            v-html="item.miningName"
            @click="hadnleShowOnePager($event, item.onePager)"
          ></span>
          <p>
            {{ $t("Table.EarnList") }}
            <span>
              <img
                v-if="item.earnImg"
                :src="require(`~/assets/img/mining/${item.earn}.png`)"
                :class="item.earnNum"
                alt=""
              />
              <template v-else style="color: #17173a">{{ item.earn }}</template>
            </span>
          </p>
        </section>
        <section>
          <p>
            <span>{{
              timeArray[item.earn].dueDate == "Finished"
                ? "--"
                : apyArray[item.earn] + "%"
            }}</span>
            <span>{{ item.earnName }}</span>
          </p>
          <div>
            <i></i>
            <p>
              <span v-if="typeof timeArray[item.earn].openDate == 'object'">
                {{ timeArray[item.earn].openDate.hour
                }}<b>{{ $t("Content.HourM") }}</b>
                <i>/</i>
                {{ timeArray[item.earn].openDate.minute
                }}<b>{{ $t("Content.MinM") }}</b>
                <i>/</i>
              </span>
              <span v-else-if="typeof timeArray[item.earn].dueDate == 'object'">
                <template v-if="timeArray[item.earn].dueDate.day != '00'">
                  {{ timeArray[item.earn].dueDate.day
                  }}<b>{{ $t("Content.DayM") }}</b>
                  <i>/</i>
                </template>
                <template>
                  {{ timeArray[item.earn].dueDate.hour
                  }}<b>{{ $t("Content.HourM") }}</b>
                  <i>/</i>
                </template>
                <template v-if="timeArray[item.earn].dueDate.day == '00'">
                  {{ timeArray[item.earn].dueDate.minute
                  }}<b>{{ $t("Content.MinM") }}</b>
                  <i>/</i>
                </template>
              </span>
              <span v-else>
                {{ timeArray[item.earn].dueDate }}
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
            style="margin-right: 10px"
          >
            {{ $t("Table.Stakeing") }}
          </button>
          <button @click="toCompound" v-if="item.compound">
            <i :class="claimLoading ? 'loading_pic' : ''"></i
            >{{ $t("Table.Compound") }}
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
            style="margin-left: 10px"
          >
            {{ $t("Table.Claim") }}
          </button>
        </section>
      </div>
    </div>
    <div class="h5_wrap">
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
          v-if="activeMining == 'helmet_cake_v1'"
          :activeType="activeType"
          :TradeType="activeType"
        />
        <HelmetBnb1Pool
          v-if="activeMining == 'helmet_cake_v2'"
          :activeType="activeType"
          :TradeType="activeType"
        />
        <HelmetMdxPool
          v-if="activeMining == 'mdx'"
          :activeType="activeType"
          :TradeType="activeType"
        />
        <BhelmetDodoPool
          v-if="activeMining == 'bhelmet_dodo'"
          :activeType="activeType"
          :TradeType="activeType"
        />
        <HelmetXburgerPool
          v-if="activeMining == 'bhelmet_xburger'"
          :activeType="activeType"
          :TradeType="activeType"
        />
        <HelmetDodoPool
          v-if="activeMining == 'helmet_dodo'"
          :activeType="activeType"
          :TradeType="activeType"
        />
        <FeiFeiPool
          v-if="activeMining == 'QFEI'"
          :activeType="activeType"
          :TradeType="activeType"
        />
        <QfeiQsdPool
          v-if="activeMining == 'kun'"
          :activeType="activeType"
          :TradeType="activeType"
        />
        <HelmetKunPool
          v-if="activeMining == 'QHELMET'"
          :activeType="activeType"
          :TradeType="activeType"
        />
        <HelmetHelmetPool
          v-if="activeMining == 'helmet'"
          :activeType="activeType"
          :TradeType="activeType"
        />
        <HelmetForPool
          v-if="activeMining == 'helmet_for'"
          :activeType="activeType"
          :TradeType="activeType"
        />
        <HelmetBurgerPool
          v-if="activeMining == 'helmet_burger'"
          :activeType="activeType"
          :TradeType="activeType"
        />
      </Wraper>
    </div>
  </div>
</template>

<script>
import {
  totalSupply,
  balanceOf,
  getAllHelmet,
  Rewards,
  RewardsDuration,
  CangetPAYA,
} from "~/interface/deposite";
import Wraper from "~/components/common/wraper.vue";
import precision from "~/assets/js/precision.js";
import { pancakeswap } from "~/assets/utils/pancakeswap.js";
import { burgerswaptoken } from "~/assets/utils/burgerswap.js";
import { dodoswap } from "~/assets/utils/dodoswap.js";
import { fixD } from "~/assets/js/util.js";
import HelmetBnbPool from "~/components/mining/helmet_bnb_pool.vue";
import HelmetBnb1Pool from "~/components/mining/helmet_bnb1_pool.vue";
import HelmetMdxPool from "~/components/mining/helmet_mdx_pool.vue";
import BhelmetDodoPool from "~/components/mining/bhelmet_dodo_pool.vue";
import HelmetForPool from "~/components/mining/helmet_for_pool.vue";
import HelmetKunPool from "~/components/mining/helmet_kun_pool.vue";
import FeiFeiPool from "~/components/mining/fei_fei_pool.vue";
import QfeiQsdPool from "~/components/mining/qfei_qsd_pool.vue";
import HelmetHelmetPool from "~/components/mining/helmet_helmet_pool.vue";
import HelmetBurgerPool from "~/components/mining/helmet_burger_pool.vue";
import HelmetDodoPool from "~/components/mining/helmet_dodo_pool.vue";
import HelmetXburgerPool from "~/components/mining/helmet_xburger.vue";
import moment from "moment";

export default {
  components: {
    Wraper,
    HelmetHelmetPool,
    HelmetBnb1Pool,
    HelmetMdxPool,
    BhelmetDodoPool,
    HelmetKunPool,
    FeiFeiPool,
    QfeiQsdPool,
    HelmetBurgerPool,
    HelmetForPool,
    HelmetBnbPool,
    HelmetDodoPool,
    HelmetXburgerPool,
  },
  data() {
    return {
      apyArray: {
        helmet_cake_v2: 0,
        mdx: 0,
        bhelmet_dodo: 0,
        helmet: 0,
        QFEI: 0,
        kun: 0,
        QHELMET: 0,
        helmet_cake_v1: 0,
        helmet_dodo: 0,
        helmet_for: 0,
        helmet_burger: 0,
        bhelmet_xburger: 0,
      },
      timeArray: {
        helmet_cake_v2: {
          dueDate: "Ongoing",
          openDate: "Mining",
        },
        mdx: {
          dueDate: "Ongoing",
          openDate: "Mining",
        },
        bhelmet_dodo: {
          openDate: this.getMiningTime("2021/05/10 12:00"),
          dueDate: this.getRemainTime("2021/05/24 00:00"),
          started: new Date("2021/05/10 12:00") * 1,
          expired: new Date("2021/05/24 00:00") * 1,
        },
        helmet: {
          dueDate: "Ongoing",
          openDate: "Mining",
        },
        bhelmet_xburger: {
          openDate: this.getMiningTime("2021/05/02 12:00"),
          dueDate: this.getRemainTime("2021/05/22 00:00"),
          started: new Date("2021/05/02 12:00") * 1,
          expired: new Date("2021/05/22 00:00") * 1,
        },
        QFEI: {
          openDate: this.getMiningTime("2021/04/10 00:00"),
          dueDate: this.getRemainTime("2021/04/17 00:00"),
          started: new Date("2021/04/10 00:00") * 1,
          expired: new Date("2021/04/17 00:00") * 1,
        },
        kun: {
          openDate: this.getMiningTime("2021/04/12 00:00"),
          dueDate: this.getRemainTime("2021/05/02 00:00"),
          started: new Date("2021/04/12 00:00") * 1,
          expired: new Date("2021/05/02 00:00") * 1,
        },
        QHELMET: {
          openDate: this.getMiningTime("2021/04/21 00:00"),
          dueDate: this.getRemainTime("2021/05/11 00:00"),
          started: new Date("2021/04/21 00:00") * 1,
          expired: new Date("2021/05/10 00:00") * 1,
        },
        helmet_cake_v1: {
          dueDate: this.getRemainTime("2021/04/25 17:00"),
          openDate: "Mining",
        },
        helmet_dodo: {
          dueDate: this.getRemainTime("2021/04/10 00:00"),
          openDate: "Mining",
        },
        helmet_for: {
          dueDate: this.getRemainTime("2021/03/20 00:00"),
          openDate: "Mining",
        },
        helmet_burger: {
          dueDate: this.getRemainTime("2021/03/07 00:00"),
          openDate: "Mining",
        },
      },
      miningList: [],
      activeType: "",
      showActiveMining: false,
      activeMining: "",
      TradeType: "", //H5 tradingType
      claimLoading: false,
      HelmetBalance: 0,
    };
  },
  mounted() {
    this.$bus.$on("CLAIM_LOADING_HELMETPOOL", (data) => {
      this.claimLoading = false;
    });
    this.initMiningData();
    this.getAPY();
    this.getHelmetBalance();
    let timer = setInterval(() => {
      this.getAPY();
    }, 20000);
    this.$once("hook:beforeDestroy", () => {
      clearTimeout(timer);
    });
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    if (this.$route.params.earn) {
      this.activeMining = this.$route.params.earn;
      this.showActiveMining = true;
      this.activeType = "STAKE";
      if (flag) {
        this.$bus.$emit("OPEN_WRAPER_PAFE", true);
        this.TradeType = "STAKE";
      } else {
        this.TradeType = "STAKE";
      }
    }
  },
  computed: {
    indexArray() {
      return this.$store.state.allIndexPrice;
    },
    HELMET_BUSD() {
      return this.$store.state.HELMET_BUSD;
    },
  },
  watch: {
    apyArray: {
      handler: "apyArrayWatch",
      immediate: true,
    },
  },
  methods: {
    hadnleShowOnePager(e, onePager) {
      if (e.target.tagName === "I" && onePager) {
        let Earn = onePager;
        this.$bus.$emit("OPEN_ONEPAGER", {
          showFlag: true,
          title: `What is $${onePager}?`,
          text: onePager,
        });
      } else {
        return;
      }
    },
    apyArrayWatch(newValue) {
      if (newValue) {
        this.initMiningData();
      }
    },
    // 复投
    toCompound() {
      this.$bus.$emit("OPEN_COMPOUND", {
        title: "Compound HELMET Earned",
        number: this.HelmetBalance,
        pool: "HELMETPOOL",
      });
    },
    StakeMiningH5(MiningType) {
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
    async getHelmetBalance() {
      let type = "HELMETPOOL";
      let Helmet = await CangetPAYA(type);
      this.HelmetBalance = Helmet;
    },
    initMiningData() {
      let apyArray = this.apyArray;
      let arr = [
        {
          miningName: "HELMET-BNB&nbsp;LP <i class='v2'></i>",
          earnNum: "two",
          earn: "helmet_cake_v2",
          earnImg: true,
          dueDate: "Ongoing",
          openDate: "Mining",
          combo: true,
          info: true,
          iio: true,
          earnName: "APR",
          onePager: false,
        },
        {
          miningName: "HELMET&nbsp;POOL",
          earn: "helmet",
          earnImg: true,
          earnNum: "one",
          dueDate: "Ongoing",
          openDate: "Mining",
          combo: false,
          flash: false,
          info: true,
          earnName: "APY",
          compound: true,
          onePager: false,
        },
        {
          miningName: "HELMET-BNB&nbsp;MLP",
          earnNum: "two",
          earn: "mdx",
          earnImg: true,
          dueDate: "Ongoing",
          openDate: "Mining",
          combo: false,
          info: true,
          earnName: "APR",
          onePager: false,
        },
        {
          miningName: "HELMET-BNB&nbsp;DLP",
          earnNum: "two",
          earn: "bhelmet_dodo",
          earnImg: true,
          combo: true,
          info: true,
          earnName: "APR",
          onePager: false,
        },
        {
          miningName: "HELMET-<i>hxBURGER</i>&nbsp;BLP",
          earn: "bhelmet_xburger",
          earnImg: true,
          earnNum: "two",
          combo: true,
          flash: false,
          info: true,
          earnName: "APR",
          compound: false,
          onePager: "hxBURGER",
        },

        {
          miningName: "FEI(BSC)&nbsp;POOL",
          earn: "QFEI",
          earnImg: false,
          earnNum: "one",
          serial: true,
          info: true,
          earnName: "APR",
          onePager: false,
        },
        {
          miningName: "<i>QFEI</i>-QSD&nbsp;DLP",
          earn: "kun",
          earnImg: true,
          earnNum: "one",
          serialNext: true,
          info: true,
          earnName: "APR",
          onePager: "QFEI",
        },
        {
          miningName: "HELMET-KUN&nbsp;DLP",
          earn: "QHELMET",
          earnImg: false,
          earnNum: "one",
          serialNext: true,
          info: true,
          earnName: "APR",
          onePager: false,
        },
        {
          miningName: "HELMET-BNB&nbsp;LP <i class='v1'></i>",
          earnNum: "two",
          earn: "helmet_cake_v1",
          earnImg: true,
          combo: true,
          info: true,
          earnName: "APR",
          onePager: false,
        },
        {
          miningName: "HELMET-<i>hDODO</i>&nbsp;DLP",
          earn: "helmet_dodo",
          earnImg: true,
          earnNum: "two",
          combo: true,
          info: true,
          earnName: "APR",
          onePager: "hDODO",
        },

        {
          miningName: "HELMET-<i>hFOR</i>&nbsp;LP",
          earn: "helmet_for",
          earnImg: true,
          earnNum: "two",
          combo: true,
          info: true,
          earnName: "APR",
          onePager: "hFOR",
        },
        {
          miningName: "HELMET-<i>hBURGER</i>&nbsp;LP",
          earn: "helmet_burger",
          earnImg: true,
          earnNum: "two",
          combo: true,
          info: true,
          earnName: "APR",
          onePager: "hBURGER",
        },
      ];
      this.miningList = arr;
      this.$forceUpdate();
    },
    getAPY() {
      this.HELMET_BNB_LP_V1_APY();
      this.HELMET_BNB_LP_V2_APY();
      this.HELMET_hDODO_DLP_APY();
      this.BHELMET_DODO_LP_APY();
      this.FEI_POOL_APY();
      this.QFEI_QSD_DLP_APY();
      this.HELMET_KUN_DLP_APY();
      this.HELMET_POOL_APY();
      this.HELMET_hFOR_LP_APY();
      this.HELMET_hBURGER_LP_APY();
      this.HELMET_MDX_LP_APY();
      this.BHELMET_XBURGER_APY();
    },

    async HELMET_BNB_LP_V2_APY() {
      this.helmetPrice = this.indexArray[1]["HELMET"];
      let cakePrice = this.$store.state.CAKE_BUSD;
      let bnbPrice = this.$store.state.BNB_BUSD;
      // 总LPT
      let totalHelmet = await totalSupply("HELMETBNB1_LPT");
      let HelmetAllowance = await getAllHelmet("HELMET", "FARM", "HELMETBNB1");
      let helmetReward = await Rewards("HELMETBNB1", "0");
      // BNB总价值
      let bnbValue = (await balanceOf("WBNB", "HELMETBNB1_LPT")) * 2;
      // BNB总价值不翻倍
      let cakeValue = await balanceOf("HELMETBNB1_LPT", "CAKEHELMET", true);
      let miningTime = (await RewardsDuration("HELMETBNB1")) / 86400;
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
        precision.times(precision.divide(cakePrice, bnbPrice), 1200000),
        precision.times(precision.divide(bnbValue, totalHelmet), cakeValue)
      );
      console.log(cakeapy, helmetapy);
      let APY = (cakeapy + helmetapy) * 100;

      this.apyArray.helmet_cake_v2 = fixD(APY, 2);
    },

    async BHELMET_DODO_LP_APY() {
      let lptBnbValue = await pancakeswap("BHELMET", "HELMET");
      let allVolume = lptBnbValue * 12000 * 36;
      //总抵押
      let supplyVolume = await totalSupply("HELMETDODOPOOL"); //数量
      let supplyVolumedodo = await totalSupply(
        "0x38E02C8AB552DEE3a79E32eB4665ceae538fD145"
      ); //数量
      // 总发行
      let stakeVolue = await totalSupply("HELMETDODOPOOL_LPT"); //数量
      // 抵押总价值
      let stakeValue = await balanceOf("HELMET", "HELMETDODOPOOL_LPT");
      // （1+日产量/总质押量）^365
      let helmetAPY =
        precision.divide(
          precision.times(precision.divide(allVolume, 36), 365),
          precision.times(
            precision.divide(precision.times(stakeValue, 2), stakeVolue),
            supplyVolume
          )
        ) * 100;
      let lptBnbValue1 = await pancakeswap("USDT", "WBNB");
      let lptHelmetValue1 = await pancakeswap("WBNB", "HELMET");
      let stakeValue1 = 36 * 5000 * (lptBnbValue1 * lptHelmetValue1);
      let dodoAPR =
        precision.divide(
          precision.times(precision.divide(stakeValue1, 36), 365),
          precision.times(
            precision.divide(precision.times(stakeValue, 2), stakeVolue),
            supplyVolumedodo
          )
        ) * 100;
      let APY = helmetAPY + dodoAPR;
      let startedTime = this.timeArray.bhelmet_dodo.started;
      let nowTime = new Date() * 1;
      if (nowTime < startedTime) {
        this.apyArray.bhelmet_dodo = "--";
      } else {
        this.apyArray.bhelmet_dodo = fixD(APY, 2);
      }
    },
    async HELMET_POOL_APY() {
      let HelmetVolume = await totalSupply("HELMETPOOL");
      // （1+日产量/总质押量）^365
      let APY =
        Math.pow(
          precision.plus(1, precision.divide(33057.57, HelmetVolume)),
          365
        ) * 100;

      this.apyArray.helmet = fixD(APY, 2);
    },
    async BHELMET_XBURGER_APY() {
      let BHELMETHelmetValue = (await pancakeswap("BHELMET", "HELMET")) * 60000;
      let XBURGERBnbValue = await burgerswaptoken(
        "0xeE679fACDaC1A80e05e1F749Ac451b98c4A33B0e"
      );
      let BNBHELMETValue = await pancakeswap("WBNB", "HELMET");
      let XBURGERHELMETValue = XBURGERBnbValue * BNBHELMETValue * 2500;
      // XBURGER/WBNB
      let RewardValue = BHELMETHelmetValue + XBURGERHELMETValue;
      let supplyVolume = await totalSupply("XBURGERBHELMET"); //数量
      let stakeVolue = await totalSupply("XBURGERBHELMET_LPT"); //数量
      let stakeValue = await balanceOf(
        "HELMET",
        "0xFC63E62e950fAFC056C8024B20d1899154e55340"
      );
      let APY =
        precision.divide(
          precision.times(precision.divide(RewardValue, 20), 365),
          precision.times(
            precision.divide(precision.times(stakeValue, 2), stakeVolue),
            supplyVolume
          )
        ) * 100;
      let startedTime = this.timeArray.bhelmet_xburger.started;
      let nowTime = new Date() * 1;
      if (nowTime < startedTime) {
        this.apyArray.bhelmet_xburger = "--";
      } else {
        this.apyArray.bhelmet_xburger = fixD(APY, 2);
        // this.apyArray.bhelmet_xburger = "--";
      }
    },
    async HELMET_MDX_LP_APY() {
      let lptBnbValue = await pancakeswap("BHELMET", "HELMET");
      let DODOHELMET = lptBnbValue;
      let allVolume = DODOHELMET * 180000;
      //总抵押
      let supplyVolume = await totalSupply("HELMETMDXPOOL"); //数量
      // 总发行
      let stakeVolue = await totalSupply("HELMETMDXPOOL_LPT"); //数量
      // 抵押总价值
      let stakeValue = await balanceOf("HELMET", "HELMETMDXPOOL_LPT");
      // （1+日产量/总质押量）^365
      let helmetAPY =
        precision.divide(
          precision.times(precision.divide(allVolume, 30), 365),
          precision.times(
            precision.divide(precision.times(stakeValue, 2), stakeVolue),
            supplyVolume
          )
        ) * 100;
      let lptBnbValue1 = await pancakeswap("MDX", "WBNB");
      let lptHelmetValue1 = await pancakeswap("WBNB", "HELMET");
      let stakeValue1 = lptBnbValue1 * lptHelmetValue1 * 30 * 5483.52;
      let supplyVolume1 = await balanceOf(
        "HELMETMDXPOOL_LPT",
        "0xc48fe252aa631017df253578b1405ea399728a50",
        true
      );
      let mdxAPY =
        precision.divide(
          precision.times(precision.divide(stakeValue1, 30), 365),
          precision.times(
            precision.divide(precision.times(stakeValue, 2), stakeVolue),
            supplyVolume1
          )
        ) * 100;
      let APY = mdxAPY;
      let startedTime = this.timeArray.mdx.started;
      let nowTime = new Date() * 1;
      if (nowTime < startedTime) {
        this.apyArray.mdx = "--";
      } else {
        this.apyArray.mdx = fixD(APY, 2);
      }
    },
    async FEI_POOL_APY() {
      let lptBnbValue = await pancakeswap("QFEI", "QSD");
      let DODOHELMET = lptBnbValue;
      let allVolume = DODOHELMET * 200000;
      //总抵押
      let supplyVolume = await totalSupply("FEIPOOL"); //数量
      // 总发行
      let stakeVolue = await totalSupply("FEIPOOL_LPT"); //数量
      // 抵押总价值
      let lptBnbValue1 = await pancakeswap("FEI", "WBNB");
      let lptHelmetValue1 = await pancakeswap("WBNB", "QSD");
      let stakeValue = lptBnbValue1 * lptHelmetValue1;
      // （1+日产量/总质押量）^365
      let APY =
        precision.divide(
          precision.times(precision.divide(allVolume, 7), 365),
          precision.times(stakeValue, supplyVolume)
        ) * 100;

      let startedTime = this.timeArray.QFEI.started;
      let nowTime = new Date() * 1;
      if (nowTime < startedTime) {
        this.apyArray.qfei = "--";
      } else {
        this.apyArray.qfei = fixD(APY, 2);
      }
    },
    async QFEI_QSD_DLP_APY() {
      let lptBnbValue = await pancakeswap("KUN", "WBNB");
      let lptHelmetValue = await pancakeswap("WBNB", "QSD");
      let DODOHELMET = lptBnbValue * lptHelmetValue;
      let allVolume = DODOHELMET * 150000;
      //总抵押
      let supplyVolume = await totalSupply("KUNPOOL"); //数量
      // 总发行
      let stakeVolue = await totalSupply("KUNPOOL_LPT"); //数量
      // 抵押总价值
      let stakeValue = await balanceOf("QSD", "KUNPOOL_LPT");
      let APY =
        precision.divide(
          precision.times(precision.divide(allVolume, 20), 365),
          precision.times(
            precision.divide(precision.times(stakeValue, 2), stakeVolue),
            supplyVolume
          )
        ) * 100;
      let startedTime = this.timeArray.kun.started;
      let nowTime = new Date() * 1;
      if (nowTime < startedTime) {
        this.apyArray.kun = "--";
      } else {
        this.apyArray.kun = fixD(APY, 2);
      }
    },
    async HELMET_KUN_DLP_APY() {
      let lptBnbValue = await pancakeswap("QHELMET", "QSD");
      let HelmetWBNBValue = await pancakeswap("HELMET", "WBNB");
      let WBNBUSDValue = await pancakeswap("WBNB", "USDT");
      let HelmetUsdtValue = HelmetWBNBValue * WBNBUSDValue;
      let allVolume = lptBnbValue * 60000;
      //总抵押
      let supplyVolume = await totalSupply("QHELMETPOOL"); //数量
      // 总发行
      let stakeVolue = await totalSupply("QHELMETPOOL_LPT"); //数量
      // 抵押总价值
      let stakeValue =
        (await balanceOf("HELMET", "QHELMETPOOL_LPT")) * HelmetUsdtValue;
      let APY =
        precision.divide(
          precision.times(precision.divide(allVolume, 20), 365),
          precision.times(
            precision.divide(precision.times(stakeValue, 2), stakeVolue),
            supplyVolume
          )
        ) * 100;
      let startedTime = this.timeArray.QHELMET.started;
      let nowTime = new Date() * 1;
      if (nowTime < startedTime) {
        this.apyArray.QHELMET = "--";
      } else {
        this.apyArray.QHELMET = fixD(APY, 2);
      }
    },
    async HELMET_BNB_LP_V1_APY() {
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
        precision.times(cakePrice, 1200000),
        precision.times(
          precision.divide(bnbValue, totalHelmet),
          cakeValue,
          bnbPrice
        )
      );
      let APY = helmetapy * 100;
      this.apyArray.helmet_cake_v1 = fixD(APY, 2);
    },
    async HELMET_hDODO_DLP_APY() {
      let lptBnbValue = await pancakeswap("DODO", "WBNB");
      let lptHelmetValue = await pancakeswap("WBNB", "HELMET");
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
    },
    async HELMET_hFOR_LP_APY() {
      let lptBnbValue = await pancakeswap("FOR", "WBNB");
      let lptHelmetValue = await pancakeswap("WBNB", "HELMET");
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
    },
    async HELMET_hBURGER_LP_APY() {
      let burgebnbrValue = await pancakeswap("BURGER", "WBNB");
      let bnbhelmetValue = await pancakeswap("WBNB", "HELMET");
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
          minute: minute > 9 ? minute : "0" + minute,
        };
        return template;
      } else {
        template = {
          day: "00",
          hour: "00",
          minute: "00",
        };
        return "Finished";
      }
    },
  },
};
</script>
<style  lang='scss'>
.onePager {
  display: flex;
  align-items: center;
  .v1,
  .v2 {
    border: none;
    display: inline-block;
    margin-left: 4px;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &:hover {
      border: none;
    }
  }
  .v1 {
    background-image: url("../../assets/img/mining/v1_icon.png");
  }
  .v2 {
    background-image: url("../../assets/img/mining/v2_icon.png");
  }
}
</style>
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.finshed_line {
  width: 100%;
  margin: 20px 0 21px 0;
  display: flex;
  align-items: center;
  p {
    flex: 1;
    height: 1px;
    @include themeify {
      background: themed("color-e8e8eb");
    }
  }
  span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    @include themeify {
      color: lighten($color: themed("color-17173a"), $amount: 0.4);
    }
    line-height: 20px;
    margin: 0 16px;
  }
  i {
    display: block;
    width: 16px;
    height: 16px;
    background-image: url("../../assets/img/mining/finished.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}

@media screen and (min-width: 750px) {
  .h5_wrap {
    display: none;
  }
  .finshed_h5 {
    display: none;
  }
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
    margin-bottom: 20px;
    h3 {
      font-size: 18px;
      font-family: Helvetica;
      @include themeify {
        color: themed("color-17173a");
      }
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
    @include themeify {
      background: themed("color-ffffff");
    }
    display: flex;
    flex-direction: column;
    position: relative;
    .activeMining {
      @include themeify {
        border: 1px solid themed("color-e8e8eb");
      }
    }
    .combo_img {
      position: absolute;
      width: 156px;
      height: 37px;
      left: -8px;
      top: -11px;
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
          flex: 3;
          span {
            font-size: 16px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 600;
            @include themeify {
              color: themed("color-17173a");
            }
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
          flex: 3;
          p {
            font-size: 14px;
            font-family: IBMPlexSans;
            @include themeify {
              color: lighten($color: themed("color-17173a"), $amount: 0.45);
            }
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
            @include themeify {
              color: themed("color-17173a");
            }
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
                border-radius: 3px;
                font-size: 14px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: themed("color-17173a");
                }
                line-height: 14px;
                font-weight: 600;
                height: 18px;
                b {
                  font-size: 10px;
                }
                i {
                  font-size: 12px;
                  font-family: IBMPlexSans-Bold, IBMPlexSans;
                  font-weight: bold;
                  color: #cfcfd2;
                  margin: 0 2px;
                  &:last-of-type {
                    display: none;
                  }
                }
              }
              &:nth-of-type(2) {
                margin-top: 4px;
                font-size: 12px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: lighten($color: themed("color-17173a"), $amount: 0.45);
                }
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
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 18px;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              font-family: IBMPlexSans;
              @include themeify {
                color: lighten($color: themed("color-17173a"), $amount: 0.45);
              }
              line-height: 12px;
              margin-top: 4px;
            }
          }
        }
        &:nth-of-type(5) {
          flex: 3;
          display: flex;
          justify-content: flex-end;
          min-width: 200px;
          button {
            padding: 0px 10px;
            height: 36px;
            @include themeify {
              background: themed("color-f8f9fa");
              color: themed("color-17173a");
              border: 1px solid themed("color-e8e8eb");
            }
            border-radius: 5px;
            margin-left: 20px;
            font-size: 14px;
            font-family: HelveticaNeue;
            line-height: 24px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            &:hover {
              padding: 0px 9px;
              height: 36px;
              border: 2px solid #fd7e14 !important;
              color: #fd7e14;
              i {
                border-right: 5px solid transparent;
                border-top: 6px solid #fd7e14 !important;
                border-left: 5px solid transparent;
              }
            }
            i {
              @include themeify {
                border-top: 6px solid themed("color-17173a");
              }
              margin-left: 6px;
              border-right: 5px solid transparent;
              border-left: 5px solid transparent;
            }
          }
          .activeButton {
            border: 2px solid #fd7e14 !important;
            padding: 0px 9px !important;
            color: #fd7e14 !important;
            i {
              border-right: 5px solid transparent;
              border-top: 6px solid #fd7e14 !important;
              border-left: 5px solid transparent;
              transform: rotate(180deg);
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
      right: 0;
      width: 24px;
      height: 24px;
      top: 10px;
      fill: #ccc;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 750px) {
  .finshed_pc {
    display: none;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
  .mining_list {
    width: 100%;
    margin: 20px auto 0;
    @include themeify {
      background: themed("color-f8f9fa");
    }
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
      fill: #ccc;
      cursor: pointer;
    }
  }
  .mining_item_h5 {
    width: 100%;
    padding: 24px 10px;
    @include themeify {
      background: themed("color-ffffff");
    }
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    border-radius: 5px;
    position: relative;
    .activeMining {
      @include themeify {
        border: 1px solid themed("color-e8e8eb");
      }
    }
    .combo_img {
      position: absolute;
      width: 156px;
      height: 37px;
      left: -8px;
      top: -11px;
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
          @include themeify {
            color: themed("color-17173a");
          }
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
          @include themeify {
            color: lighten($color: themed("color-17173a"), $amount: 0.45);
          }
          line-height: 18px;
          font-weight: normal;
          .two {
            width: 35px;
            height: 20px;
          }
          .one {
            width: 20px;
            height: 20px;
          }
          > span {
            text-align: center;
            min-width: 60px;
            margin-left: 10px;
            padding: 4px 11px;
            @include themeify {
              color: themed("color-f8f9fa");
            }
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
              @include themeify {
                color: themed("color-17173a");
              }
            }
            &:nth-of-type(2) {
              margin-top: 4px;
              font-size: 12px;
              font-family: IBMPlexSans;
              @include themeify {
                color: lighten($color: themed("color-17173a"), $amount: 0.45);
              }
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
                border-radius: 3px;
                font-size: 14px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: themed("color-17173a");
                }
                line-height: 14px;
                font-weight: 500;
                height: 18px;
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
                  &:last-of-type {
                    display: none;
                  }
                }
              }
              &:nth-of-type(2) {
                margin-top: 4px;
                font-size: 12px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: lighten($color: themed("color-17173a"), $amount: 0.45);
                }
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
          border: 2px solid #fd7e14 !important;
          color: #fd7e14 !important;
        }
        button {
          flex: 1;
          height: 36px;
          @include themeify {
            background: themed("color-f8f9fa");
          }
          border-radius: 5px;
          @include themeify {
            border: 1px solid themed("color-e8e8eb");
          }
          font-size: 14px;
          font-family: HelveticaNeue;
          @include themeify {
            background: themed("color-17173a");
          }
          border: 2px solid transparent;
          line-height: 24px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
