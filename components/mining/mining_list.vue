<template>
  <div class="mining_list">
    <div class="mining_title">
      <h3>{{ $t("Header.Mining") }}</h3>
    </div>
    <div v-for="item in miningList" :key="item.REWARD_NAME">
      <div
        :class="['finshed_line', 'finshed_pc']"
        v-if="item.REWARD_NAME == 'bhelmet_dodo'"
      >
        <p></p>
        <i :class="storeThemes + '_star'"></i>
        <span>Finished</span>
        <i :class="storeThemes + '_star'"></i>
        <p></p>
      </div>
      <div class="mining_item">
        <div
          :class="
            activeMining == item.REWARD_NAME && showActiveMining
              ? 'activeMining mining_show'
              : 'mining_show'
          "
        >
          <img
            class="combo_img"
            :src="
              require(`~/assets/img/mining/combo_${
                item.MING_TIME == 'Finished' ? 'expired_' + storeThemes : 'web'
              }.png`)
            "
            alt=""
            v-if="item.COMBO_FLAG"
          />
          <img
            class="combo_img"
            style="width: 116px"
            :src="
              require(`~/assets/img/mining/${
                item.MING_TIME == 'Finished'
                  ? 'serial_web_expired_' + storeThemes
                  : 'serial_web'
              }.png`)
            "
            alt=""
            v-if="item.SERIAL_FLAG"
          />
          <img
            class="combo_img"
            style="width: 32px; height: 32px; left: 10px"
            :src="
              require(`~/assets/img/mining/${
                item.MING_TIME == 'Finished'
                  ? 'serialnext_web_expired_' + storeThemes
                  : 'serialnext_web'
              }.png`)
            "
            alt=""
            v-if="item.SERIAL_NEXT_FLAG"
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
              v-html="item.POOL_NAME"
              @click="hadnleShowOnePager($event, item.ONE_PAGER)"
            ></span>
          </section>
          <section>
            <p>
              {{ $t("Table.EarnList") }}
              <span>
                <img
                  v-if="item.REARD_IMGSHOW"
                  :src="
                    require(`~/assets/img/mining/${
                      item.MING_TIME == 'Finished'
                        ? item.REWARD_NAME + '_expired'
                        : item.REWARD_NAME
                    }.png`)
                  "
                  :class="item.REARD_VOLUME"
                  alt=""
                />
                <template v-else style="color: #17173a">{{
                  item.REWARD_NAME
                }}</template>
              </span>
            </p>
          </section>
          <section>
            <i></i>
            <p>
              <span v-if="typeof item.OPEN_TIME == 'object'">
                {{ item.OPEN_TIME.hour }}<b>{{ $t("Content.HourM") }}</b>
                <i>/</i>
                {{ item.OPEN_TIME.minute }}<b>{{ $t("Content.MinM") }}</b>
                <i>/</i>
              </span>
              <span v-else-if="typeof item.MING_TIME == 'object'">
                <template v-if="item.MING_TIME.day != '00'">
                  {{ item.MING_TIME.day }}<b>{{ $t("Content.DayM") }}</b>
                  <i>/</i>
                </template>
                <template>
                  {{ item.MING_TIME.hour }}<b>{{ $t("Content.HourM") }}</b>
                  <i>/</i>
                </template>
                <template v-if="item.MING_TIME.day == '00'">
                  {{ item.MING_TIME.minute }}<b>{{ $t("Content.MinM") }}</b>
                  <i>/</i>
                </template>
              </span>
              <span v-else>
                {{ item.MING_TIME }}
              </span>
              <span>{{ $t("Table.MIningCutdown") }}</span>
            </p>
          </section>
          <section>
            <span>{{ item.REWARD_YEAR }}</span>
            <span>{{ item.REWARD_TYPE }}</span>
          </section>
          <section>
            <button
              @click="HandleClickAction(item, 'STAKE')"
              :class="
                activeMining == item.REWARD_NAME &&
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
              @click="HandleClickAction(item, 'CLAIM')"
              :class="
                activeMining == item.REWARD_NAME &&
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
          v-if="showActiveMining && activeMining == item.REWARD_NAME"
        >
          <svg
            class="close"
            aria-hidden="true"
            @click="showActiveMining = false"
          >
            <use xlink:href="#icon-close"></use>
          </svg>
          <POOL
            :activeData="activeData"
            :activeFlag="activeFlag"
            :activeType="activeType"
          />
        </div>
      </div>
    </div>
    <div v-for="item in miningList" :key="item.REWARD_NAME + '1'">
      <div
        class="finshed_line finshed_h5"
        v-if="item.REWARD_NAME == 'bhelmet_dodo'"
      >
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
              item.MING_TIME == 'Finished' ? 'expired_' + storeThemes : 'web'
            }.png`)
          "
          alt=""
          v-if="item.COMBO_FLAG"
        />
        <img
          class="combo_img"
          style="width: 116px"
          :src="
            require(`~/assets/img/mining/${
              item.MING_TIME == 'Finished'
                ? 'serial_web_expired_' + storeThemes
                : 'serial_web'
            }.png`)
          "
          alt=""
          v-if="item.SERIAL_FLAG"
        />
        <img
          class="combo_img"
          style="width: 32px; height: 32px; left: 10px"
          :src="
            require(`~/assets/img/mining/${
              item.MING_TIME == 'Finished'
                ? 'serialnext_web_expired_' + storeThemes
                : 'serialnext_web'
            }.png`)
          "
          alt=""
          v-if="item.SERIAL_NEXT_FLAG"
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
            v-html="item.POOL_NAME"
            @click="hadnleShowOnePager($event, item.ONE_PAGER)"
          ></span>
          <p>
            {{ $t("Table.EarnList") }}
            <span>
              <img
                v-if="item.REARD_IMGSHOW"
                :src="require(`~/assets/img/mining/${item.REWARD_NAME}.png`)"
                :class="item.REARD_VOLUME"
                alt=""
              />
              <template v-else style="color: #17173a">{{
                item.REWARD_NAME
              }}</template>
            </span>
          </p>
        </section>
        <section>
          <p>
            <span>{{ item.REWARD_YEAR }}</span>
            <span>{{ item.REWARD_TYPE }}</span>
          </p>
          <div>
            <i></i>
            <p>
              <span v-if="typeof item.OPEN_TIME == 'object'">
                {{ item.OPEN_TIME.hour }}<b>{{ $t("Content.HourM") }}</b>
                <i>/</i>
                {{ item.OPEN_TIME.minute }}<b>{{ $t("Content.MinM") }}</b>
                <i>/</i>
              </span>
              <span v-else-if="typeof item.MING_TIME == 'object'">
                <template v-if="item.MING_TIME.day != '00'">
                  {{ item.MING_TIME.day }}<b>{{ $t("Content.DayM") }}</b>
                  <i>/</i>
                </template>
                <template>
                  {{ item.MING_TIME.hour }}<b>{{ $t("Content.HourM") }}</b>
                  <i>/</i>
                </template>
                <template v-if="item.MING_TIME.day == '00'">
                  {{ item.MING_TIME.minute }}<b>{{ $t("Content.MinM") }}</b>
                  <i>/</i>
                </template>
              </span>
              <span v-else>
                {{ item.MING_TIME }}
              </span>
              <span>{{ $t("Table.MIningCutdown") }}</span>
            </p>
          </div>
        </section>
        <section>
          <button
            @click="HandleClickAction(item, 'STAKE', true)"
            :class="
              activeMining == item.REWARD_NAME &&
              showActiveMining &&
              activeType == 'STAKE'
                ? 'activeButton stakeMining'
                : 'stakeMining'
            "
            style="margin-right: 10px"
          >
            {{ $t("Table.Stakeing") }}
          </button>
          <button @click="toCompound" v-if="item.COMPOUND">
            <i :class="claimLoading ? 'loading_pic' : ''"></i
            >{{ $t("Table.Compound") }}
          </button>
          <button
            @click="HandleClickAction(item, 'CLAIM', true)"
            :class="
              activeMining == item.REWARD_NAME &&
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
      <div
        class="wraper_title"
        v-if="showActiveMining && activeMining == item.REWARD_NAME"
      >
        <PHeader></PHeader>
        <div class="wraper">
          <div class="wraper_header">
            <h3 class="">
              {{
                activeType == "STAKE"
                  ? $t("Insurance.Insurance_text23")
                  : $t("Table.Claim")
              }}
            </h3>
            <svg
              class="close"
              aria-hidden="true"
              @click="showActiveMining = false"
            >
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
          <POOL
            :activeData="activeData"
            :activeFlag="activeFlag"
            :activeType="activeType"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Earned } from "~/interface/read_contract.js";
import Wraper from "~/components/common/wraper.vue";
import { fixD } from "~/assets/js/util.js";
import POOL from "./pool.vue";
import moment from "moment";
import PHeader from "~/components/common/header.vue";
import { GetPoolAPR } from "./mining_apr.js";
export default {
  components: {
    Wraper,
    POOL,
    PHeader,
  },
  data() {
    return {
      miningList: [],
      activeType: "",
      showActiveMining: false,
      activeMining: "",
      TradeType: "", //H5 tradingType
      claimLoading: false,
      HelmetBalance: 0,
      activeData: {},
      activeFlag: "",
    };
  },
  mounted() {
    this.initMiningData();
    this.GetPoolItemAPR();
    this.getHelmetBalance();
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
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  watch: {
    storeThemes(newValue) {
      if (newValue) {
        this.initMiningData();
      }
    },
  },
  methods: {
    hadnleShowOnePager(e, ONE_PAGER) {
      if (e.target.tagName === "I" && ONE_PAGER) {
        let Earn = ONE_PAGER;
        this.$bus.$emit("OPEN_ONEPAGER", {
          showFlag: true,
          title: `What is $${ONE_PAGER}?`,
          text: ONE_PAGER,
        });
      } else {
        return;
      }
    },
    // 复投
    toCompound() {
      this.$bus.$emit("OPEN_COMPOUND", {
        title: "Compound HELMET Earned",
        number: this.HelmetBalance,
        poolAddress: "0x279a073c491c873df040b05cc846a3c47252b52c",
      });
    },
    HandleClickAction(PoolData, Action, Flag = false) {
      this.showActiveMining = true;
      this.activeData = PoolData;
      this.activeType = Action;
      this.activeFlag = Flag;
      this.activeMining = PoolData.REWARD_NAME;
    },
    async getHelmetBalance() {
      let Helmet = await Earned(
        "0x279a073c491c873df040b05cc846a3c47252b52c",
        18
      );
      this.HelmetBalance = Helmet;
    },
    initMiningData() {
      let apyArray = this.apyArray;
      let arr = [
        {
          POOL_NAME: `HELMET-BNB&nbsp;LP <i class=v2_${this.storeThemes}></i>`,
          STAKE_SYMBOL: "HELMET-BNB LP",
          STAKE_UNIT: "LPT",
          REARD_VOLUME: "two",
          REWARD_NAME: "helmet_cake_v2",
          REARD_IMGSHOW: true,
          MING_TIME: "Ongoing",
          OPEN_TIME: "Mining",
          COMBO_FLAG: true,
          iio: true,
          REWARD_TYPE: "APR",
          ONE_PAGER: false,
          POOL_PID: "0x11e",
          TOKEN1_DECIMALS: 18,
          TOKEN1_SYMBOL: "HELMET",
          TOKEN1_ADDRESS: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
          TOKEN2_DECIMALS: 18,
          TOKEN2_SYMBOL: "WBNB",
          TOKEN2_ADDRESS: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          PROXY_ADDRESS: "0x73feaa1eE314F8c655E354234017bE2193C9E24E",
          POOL_ADDRESS: "0xA21B692B92Bbf0E34334f1548a0b51837CDDD0Bb",
          STAKE_ADDRESS: "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571",
          REWARD1_DECIMALS: 18,
          REWARD1_SYMBOL: "HELMET",
          REWARD1_ADDRESS: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
          REWARD2_DECIMALS: 18,
          REWARD2_SYMBOL: "CAKE",
          REWARD2_ADDRESS: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
          STAKE_DECIMALS: 18,
          SWAP_TYPE: "PANCAKEV2",
          JUMP1_TEXT:
            "<a href=https://exchange.pancakeswap.finance/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-BNB LPT(V2)</a>",
          APRTYPE: "CakeDoublePoolAPR",
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "HELMET&nbsp;POOL",
          STAKE_SYMBOL: "HELMET",
          STAKE_UNIT: "HELMET",
          REARD_VOLUME: "one",
          REWARD_NAME: "helmet",
          REARD_IMGSHOW: true,
          MING_TIME: "Ongoing",
          OPEN_TIME: "Mining",
          COMBO_FLAG: false,
          flash: false,
          REWARD_TYPE: "APY",
          COMPOUND: true,
          ONE_PAGER: false,
          LEFT_ADDRESS: "",
          REWARD1_SYMBOL: "HELMET",
          POOL_ADDRESS: "0x279a073c491c873df040b05cc846a3c47252b52c",
          STAKE_ADDRESS: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
          REWARD1_ADDRESS: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
          STAKE_DECIMALS: 18,
          REWARD1_DECIMALS: 18,
          SWAP_TYPE: "PANCAKEV2",
          APRTYPE: "CompoundPoolAPY",
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "HELMET-BNB&nbsp;MLP",
          STAKE_SYMBOL: "HELMET-BNB MLP",
          STAKE_UNIT: "MLP",
          REARD_VOLUME: "two",
          REWARD_NAME: "mdx",
          REARD_IMGSHOW: true,
          MING_TIME: "Ongoing",
          OPEN_TIME: "Mining",
          COMBO_FLAG: false,
          REWARD_TYPE: "APR",
          ONE_PAGER: false,
          POOL_PID: "0x38",
          TOKEN1_DECIMALS: 18,
          TOKEN1_SYMBOL: "HELMET",
          TOKEN1_ADDRESS: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
          TOKEN2_DECIMALS: 18,
          TOKEN2_SYMBOL: "WBNB",
          TOKEN2_ADDRESS: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          REWARD2_SYMBOL: "MDX",
          REWARD2_ADDRESS: "0x9c65ab58d8d978db963e63f2bfb7121627e3a739",
          REWARD2_DECIMALS: 18,
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "MDX",
            ADDTOKEN_ADDRESS: "0x9c65ab58d8d978db963e63f2bfb7121627e3a739",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHT_ADDRESS: "0x9c65ab58d8d978db963e63f2bfb7121627e3a739",
          PROXY_ADDRESS: "0xc48fe252aa631017df253578b1405ea399728a50",
          POOL_ADDRESS: "0xD86577ea62FE1FD2cA0Be583c1A0ecf25F4FbF2B",
          STAKE_ADDRESS: "0x83d8E2E030cD820dfdD94723c3bcf2BC52e1701A",
          REWARD1_ADDRESS: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
          STAKE_DECIMALS: 18,
          SWAP_TYPE: "MDEX",
          JUMP1_TEXT:
            "<a href='https://bsc.mdex.com/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='mdx'></i>Get HELMET-BNB MLP</a>",
          APRTYPE: "MdexDoublePoolAPR",
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "HELMET-<i>hWINGS</i>&nbsp;LP",
          STAKE_SYMBOL: "HELMET-hWINGS LP",
          STAKE_UNIT: "LPT",
          REARD_VOLUME: "two",
          REWARD_NAME: "helmet_wings",
          REARD_IMGSHOW: true,
          OPEN_TIME: this.getMiningTime("2021/06/12 00:00"),
          MING_TIME: this.getRemainTime("2021/06/26 00:00"),
          START_TIME: "2021/06/12 00:00 UTC+8",
          END_TIME: "2021/06/26 00:00 UTC+8",
          COMBO_FLAG: true,
          REWARD_TYPE: "APR",
          ONE_PAGER: "hWINGS",
          REWARD1_SYMBOL: "HELMET",
          REWARD2_SYMBOL: "WINGS",
          REWARD1_DECIMALS: 18,
          REWARD2_DECIMALS: 18,
          REWARD1_ADDRESS: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
          REWARD2_ADDRESS: "0x0487b824c8261462f88940f97053e65bdb498446",
          REWARD1_VOLUME: 30000,
          REWARD2_VOLUME: 4500,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "hWINGS",
            ADDTOKEN_ADDRESS: "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "WINGS",
            ADDTOKEN_ADDRESS: "0x0487b824c8261462f88940f97053e65bdb498446",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHT_ADDRESS: "0x9c65ab58d8d978db963e63f2bfb7121627e3a739",
          PROXY_ADDRESS: "",
          POOL_ADDRESS: "0xBAd52954a2397A9A04c44440039904B0E1Cb8d0f",
          STAKE_ADDRESS: "0x0ea990871e99c83c9800f7266e3b9c612dd68623",
          STAKE_DECIMALS: 18,
          SWAP_TYPE: "PANCAKEV2",
          JUMP1_TEXT:
            "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x34508EA9ec327ff3b98A2F10eEDc2950875bf026/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hWINGS LP</a>",
          APRTYPE: "hTokenDoublePoolAPR",
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "HELMET-BNB&nbsp;DLP",
          STAKE_SYMBOL: "HELMET-BNB DLP",
          STAKE_UNIT: "DLP",
          REARD_VOLUME: "two",
          REWARD_NAME: "bhelmet_dodo",
          REARD_IMGSHOW: true,
          OPEN_TIME: this.getMiningTime("2021/05/10 12:00"),
          MING_TIME: this.getRemainTime("2021/05/24 00:00"),
          START_TIME: "2021/05/10 12:00 UTC+8",
          END_TIME: "2021/05/24 00:00 UTC+8",
          COMBO_FLAG: true,
          REWARD_TYPE: "APR",
          ONE_PAGER: false,
          REWARD1_SYMBOL: "BHELMET",
          REWARD2_SYMBOL: "DODO",
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "BHELMET",
            ADDTOKEN_ADDRESS: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "DODO",
            ADDTOKEN_ADDRESS: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHT_ADDRESS: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
          PROXY_ADDRESS: "0x14b5E6158864a2F5E04C52F1858185b64aEddAf6",
          POOL_ADDRESS: "0x14b5E6158864a2F5E04C52F1858185b64aEddAf6",
          STAKE_ADDRESS: "0x9CE69450FDCc3b6058F7c430ef0A8C051b2300c6",
          REWARD1_ADDRESS: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
          REWARD2_ADDRESS: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
          STAKE_DECIMALS: 18,
          REWARD1_DECIMALS: 18,
          REWARD2_DECIMALS: 18,
          SWAP_TYPE: "DODO",
          JUMP1_TEXT:
            "<a href=https://app.dodoex.io/liquidity?poolAddress=0x80B5abD78878B709F58b46e94CF6A194A9A65234' target='_blank'>From <i class='dodo'></i>Get HELMET-BNB DLP</a>",
          REWARD_YEAR: "Infinity",
        },

        {
          POOL_NAME: "HELMET-<i>hxBURGER</i>&nbsp;BLP",
          STAKE_SYMBOL: "HELMET-hxBURGER BLP",
          STAKE_UNIT: "BLP",
          REARD_VOLUME: "two",
          REWARD_NAME: "bhelmet_xburger",
          REARD_IMGSHOW: true,
          OPEN_TIME: this.getMiningTime("2021/05/02 12:00"),
          MING_TIME: this.getRemainTime("2021/05/22 00:00"),
          START_TIME: "2021/05/02 12:00 UTC+8",
          END_TIME: "2021/05/22 00:00 UTC+8",
          COMBO_FLAG: true,
          flash: false,
          REWARD_TYPE: "APR",
          ONE_PAGER: "hxBURGER",
          REWARD1_SYMBOL: "BHELMET",
          REWARD2_SYMBOL: "xBURGER",
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "hxBURGER",
            ADDTOKEN_ADDRESS: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "xBURGER",
            ADDTOKEN_ADDRESS: "0xAFE24E29Da7E9b3e8a25c9478376B6AD6AD788dD",
            ADDTOKEN_DECIMALS: 18,
          },
          LEFT_ADDRESS: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
          RIGHT_ADDRESS: "0xAFE24E29Da7E9b3e8a25c9478376B6AD6AD788dD",
          PROXY_ADDRESS: "",
          POOL_ADDRESS: "0xD23B7cD539f7FB4f27EbEDEB2c56a791639C38Fb",
          STAKE_ADDRESS: "0xCf8F78E34135168230969124CF56A37Ae5e8bD4D",
          REWARD1_ADDRESS: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
          REWARD2_ADDRESS: "0xAFE24E29Da7E9b3e8a25c9478376B6AD6AD788dD",
          STAKE_DECIMALS: 18,
          REWARD1_DECIMALS: 18,
          REWARD2_DECIMALS: 18,
          SWAP_TYPE: "BURGER",
          JUMP1_TEXT:
            "<a href='https://burgerswap.org/trade/pool?from=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8&to=0xCa7597633927A98B800738eD5CD2933a74a80e8c' target='_blank' >From <i class='burger'></i>Get HELMET-hxBURGER BLP</a>",
          REWARD_YEAR: "Infinity",
        },

        {
          POOL_NAME: "FEI(BSC)&nbsp;POOL",
          STAKE_SYMBOL: "FEI",
          STAKE_UNIT: "FEI",
          REARD_VOLUME: "one",
          REWARD_NAME: "QFEI",
          REARD_IMGSHOW: false,
          OPEN_TIME: this.getMiningTime("2021/04/10 00:00"),
          MING_TIME: this.getRemainTime("2021/04/17 00:00"),
          START_TIME: "2021/04/10 00:00 UTC+8",
          END_TIME: "2021/04/17 00:00 UTC+8",
          SERIAL_FLAG: true,
          REWARD_TYPE: "APR",
          ONE_PAGER: false,
          REWARD1_SYMBOL: "QFEI",
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "FEI",
            ADDTOKEN_ADDRESS: "0x219Cf9729BB21BBe8dD2101C8B6ec21c03dd0F31",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "QFEI",
            ADDTOKEN_ADDRESS: "0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a",
            ADDTOKEN_DECIMALS: 18,
          },
          LEFT_ADDRESS: "0x219Cf9729BB21BBe8dD2101C8B6ec21c03dd0F31",
          RIGHT_ADDRESS: "0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a",
          PROXY_ADDRESS: "",
          POOL_ADDRESS: "0xf1569d9b3aeCA99a2774Ac66731b707C1249642A",
          STAKE_ADDRESS: "0x219Cf9729BB21BBe8dD2101C8B6ec21c03dd0F31",
          REWARD1_ADDRESS: "0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a",
          STAKE_DECIMALS: 18,
          REWARD1_DECIMALS: 18,
          SWAP_TYPE: "DODO",
          JUMP1_TEXT:
            "<a href='https://www.chainswap.exchange/' target='_blank'>Swap FEI(ETH) to BSC By <i class='chainswap'></i> ChainSwap</a>",
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>QFEI</i>-QSD&nbsp;DLP",
          STAKE_SYMBOL: "QFEI-QSD DLP",
          STAKE_UNIT: "DPT",
          REARD_VOLUME: "one",
          REWARD_NAME: "kun",
          REARD_IMGSHOW: true,
          OPEN_TIME: this.getMiningTime("2021/04/12 00:00"),
          MING_TIME: this.getRemainTime("2021/05/02 00:00"),
          START_TIME: "2021/04/12 00:00 UTC+8",
          END_TIME: "2021/05/02 00:00 UTC+8",
          SERIAL_NEXT_FLAG: true,
          REWARD_TYPE: "APR",
          ONE_PAGER: "QFEI",
          REWARD1_SYMBOL: "KUN",
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "QSD",
            ADDTOKEN_ADDRESS: "0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "KUN",
            ADDTOKEN_ADDRESS: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
            ADDTOKEN_DECIMALS: 18,
          },
          LEFT_ADDRESS: "0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2",
          RIGHT_ADDRESS: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
          POOL_ADDRESS: "0x10ebD347A44a40BEE9BDFb0E4c809F82f3d4C2f9",
          STAKE_ADDRESS: "0x14616328f4Ce3082187B4f1Ee4863DA5516B178A",
          REWARD1_ADDRESS: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
          STAKE_DECIMALS: 18,
          REWARD1_DECIMALS: 18,
          SWAP_TYPE: "DODO",
          JUMP1_TEXT:
            "<a href='https://app.dodoex.io/liquidity?poolAddress=0x14616328f4Ce3082187B4f1Ee4863DA5516B178A' target='_blank' >From <i class='dodo'></i>Get QFEI-QSD DLP</a>",
          JUMP2_TEXT:
            " <a href='https://bsc.qian.finance/chemix/' target='_blank'>&nbsp;Or From <i class='qian'></i> Mint QSD</a>",
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "HELMET-KUN&nbsp;DLP",
          STAKE_SYMBOL: "HELMET-KUN DLP",
          STAKE_UNIT: "DPT",
          REARD_VOLUME: "one",
          REWARD_NAME: "QHELMET",
          REARD_IMGSHOW: false,
          OPEN_TIME: this.getMiningTime("2021/04/21 00:00"),
          MING_TIME: this.getRemainTime("2021/05/11 00:00"),
          START_TIME: "2021/04/21 00:00 UTC+8",
          END_TIME: "2021/05/10 00:00 UTC+8",
          SERIAL_NEXT_FLAG: true,
          REWARD_TYPE: "APR",
          ONE_PAGER: false,
          REWARD1_SYMBOL: "QHELMET",
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "KUN",
            ADDTOKEN_ADDRESS: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "QHELMET",
            ADDTOKEN_ADDRESS: "0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99",
            ADDTOKEN_DECIMALS: 18,
          },
          LEFT_ADDRESS: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
          RIGHT_ADDRESS: "0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99",
          PROXY_ADDRESS: "",
          POOL_ADDRESS: "0x76c415ececd88f76d6e6b5401a82b5ba075819f4",
          STAKE_ADDRESS: "0xd7eed218538b3fa3e20d24f43100790f0d03538a",
          REWARD1_ADDRESS: "0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99",
          STAKE_DECIMALS: 18,
          REWARD1_DECIMALS: 18,
          SWAP_TYPE: "DODO",
          JUMP1_TEXT:
            "<a href='https://app.dodoex.io/liquidity?poolAddress=0xd7eed218538b3fa3e20d24f43100790f0d03538a' target='_blank' >From <i class='dodo'></i>Get HELMET-KUN DLP</a>",
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: `HELMET-BNB&nbsp;LP <i class=v1_${this.storeThemes}></i>`,
          STAKE_SYMBOL: "HELMET-BNB LP",
          STAKE_UNIT: "LPT",
          REARD_VOLUME: "two",
          REWARD_NAME: "helmet_cake_v1",
          REARD_IMGSHOW: true,
          OPEN_TIME: "Mining",
          MING_TIME: this.getRemainTime("2021/04/25 17:00"),
          START_TIME: "",
          END_TIME: "2021/04/25 17:00 UTC+8",
          COMBO_FLAG: true,
          REWARD_TYPE: "APR",
          ONE_PAGER: false,
          REWARD1_SYMBOL: "HELMET",
          REWARD2_SYMBOL: "CAKE",
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "Cake-LP",
            ADDTOKEN_ADDRESS: "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "HELMET",
            ADDTOKEN_ADDRESS: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
            ADDTOKEN_DECIMALS: 18,
          },
          PROXY_ADDRESS: "0x73feaa1eE314F8c655E354234017bE2193C9E24E",
          POOL_ADDRESS: "0xb22425206D40605E9bE5a5460786DBaB5aBA9485",
          STAKE_ADDRESS: "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571",
          REWARD1_ADDRESS: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
          REWARD2_ADDRESS: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
          STAKE_DECIMALS: 18,
          REWARD1_DECIMALS: 18,
          REWARD2_DECIMALS: 18,
          SWAP_TYPE: "PANCAKEV1",
          JUMP1_TEXT:
            "<a href='https://v1exchange.pancakeswap.finance/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank' >From <i class='pancake'></i>Get HELMET-BNB LPT(V1 Old)</a>",
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "HELMET-<i>hDODO</i>&nbsp;DLP",
          STAKE_SYMBOL: "HELMET-hDODO DLP",
          STAKE_UNIT: "DPT",
          REARD_VOLUME: "two",
          REWARD_NAME: "helmet_dodo",
          REARD_IMGSHOW: true,
          OPEN_TIME: "Mining",
          MING_TIME: this.getRemainTime("2021/04/10 00:00"),
          START_TIME: "",
          END_TIME: "2021/04/10 00:00 UTC+8",
          COMBO_FLAG: true,
          REWARD_TYPE: "APR",
          ONE_PAGER: "hDODO",
          REWARD1_SYMBOL: "HELMET",
          REWARD2_SYMBOL: "DODO",
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "hDODO",
            ADDTOKEN_ADDRESS: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "DODO",
            ADDTOKEN_ADDRESS: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
            ADDTOKEN_DECIMALS: 18,
          },
          LEFT_ADDRESS: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
          RIGHT_ADDRESS: "",
          PROXY_ADDRESS: "",
          POOL_ADDRESS: "0x041C1BF8E085e4987404b88441599EE6d1bCD684",
          STAKE_ADDRESS: "0x7F6ea24c10E32C8a5fd1c9b2C1239340671460cC",
          REWARD1_ADDRESS: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
          REWARD2_ADDRESS: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
          STAKE_DECIMALS: 18,
          REWARD1_DECIMALS: 18,
          REWARD2_DECIMALS: 18,
          SWAP_TYPE: "DODO",
          JUMP1_TEXT:
            "<a href='https://app.dodoex.io/liquidity?poolAddress=0x7f6ea24c10e32c8a5fd1c9b2c1239340671460cc' target='_blank' >From <i class='dodo'></i>Get HELMET-hDODO DLP</a>",
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "HELMET-<i>hFOR</i>&nbsp;LP",
          STAKE_SYMBOL: "HELMET-hFOR LP",
          STAKE_UNIT: "LPT",
          REARD_VOLUME: "two",
          REWARD_NAME: "helmet_for",
          REARD_IMGSHOW: true,
          OPEN_TIME: "Mining",
          MING_TIME: this.getRemainTime("2021/03/20 00:00"),
          START_TIME: "",
          END_TIME: "2021/03/20 00:00 UTC+8",
          COMBO_FLAG: true,
          REWARD_TYPE: "APR",
          ONE_PAGER: "hFOR",
          REWARD1_SYMBOL: "HELMET",
          REWARD2_SYMBOL: "FOR",
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "HFOR",
            ADDTOKEN_ADDRESS: "0xb779F208f8d662558dF8E2b6bFE3b6305CC13389",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "FOR",
            ADDTOKEN_ADDRESS: "0x658a109c5900bc6d2357c87549b651670e5b0539",
            ADDTOKEN_DECIMALS: 18,
          },
          LEFT_ADDRESS: "0xb779F208f8d662558dF8E2b6bFE3b6305CC13389",
          RIGHT_ADDRESS: "",
          PROXY_ADDRESS: "",
          POOL_ADDRESS: "0x2295876146ED2A4C8c391ca09dFD9b42329D22a9",
          STAKE_ADDRESS: "0xc3f103b7f36690c70b4a682c760fe3b8951cefd1",
          REWARD1_ADDRESS: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
          REWARD2_ADDRESS: "0x658a109c5900bc6d2357c87549b651670e5b0539",
          STAKE_DECIMALS: 18,
          REWARD1_DECIMALS: 18,
          REWARD2_DECIMALS: 18,
          SWAP_TYPE: "PANCAKEV1",
          JUMP1_TEXT:
            "<a href='https://exchange.pancakeswap.finance/#/add/0xb779F208f8d662558dF8E2b6bFE3b6305CC13389/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank' >From <i class='pancake'></i>Get HELMET-hFOR LPT</a>",
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "HELMET-<i>hBURGER</i>&nbsp;LP",
          STAKE_SYMBOL: "HELMET-hBURGER LP",
          STAKE_UNIT: "LPT",
          REARD_VOLUME: "two",
          REWARD_NAME: "helmet_burger",
          REARD_IMGSHOW: true,
          OPEN_TIME: "Mining",
          MING_TIME: this.getRemainTime("2021/03/07 00:00"),
          START_TIME: "",
          END_TIME: "2021/03/07 00:00 UTC+8",
          COMBO_FLAG: true,
          REWARD_TYPE: "APR",
          ONE_PAGER: "hBURGER",
          REWARD1_SYMBOL: "HELMET",
          REWARD2_SYMBOL: "BURGER",
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "hBURGER",
            ADDTOKEN_ADDRESS: "0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "BURGER",
            ADDTOKEN_ADDRESS: "0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f",
            ADDTOKEN_DECIMALS: 18,
          },
          LEFT_ADDRESS: "0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa",
          RIGHT_ADDRESS: "",
          PROXY_ADDRESS: "",
          POOL_ADDRESS: "0x9216508886fEA6bF9334a59F9C90411fc6c400e5",
          STAKE_ADDRESS: "0x7a0068a1896F82D8F47086E3f2CE3CcEA75d5493",
          REWARD1_ADDRESS: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
          REWARD2_ADDRESS: "0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f",
          STAKE_DECIMALS: 18,
          REWARD1_DECIMALS: 18,
          REWARD2_DECIMALS: 18,
          SWAP_TYPE: "PANCAKEV1",
          JUMP1_TEXT:
            "<a href='https://burgerswap.org/trade/pool?from=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8&to=0xCa7597633927A98B800738eD5CD2933a74a80e8c' target='_blank' >From <i class='burger'></i>Get HELMET-hxBURGER BLP</a>",
          REWARD_YEAR: "Infinity",
        },
      ];
      this.miningList = arr;
      this.$forceUpdate();
    },
    async GetPoolItemAPR() {
      let arr = this.miningList;
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let res = await GetPoolAPR(item);
        item.REWARD_YEAR = res;
      }
      // this.$forceUpdate();
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
.ONE_PAGER {
  display: flex;
  align-items: center;
  .v1_light,
  .v2_light,
  .v1_dark,
  .v2_dark {
    border: none !important;
    display: inline-block;
    margin-left: 4px;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    &:hover {
      border: none !important;
    }
  }
  .v1_light {
    background-image: url("../../assets/img/mining/v1_icon_light.png");
  }
  .v2_light {
    background-image: url("../../assets/img/mining/v2_icon_light.png");
  }
  .v1_dark {
    background-image: url("../../assets/img/mining/v1_icon_dark.png");
  }
  .v2_dark {
    background-image: url("../../assets/img/mining/v2_icon_dark.png");
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
      color: darken($color: themed("color-17173a"), $amount: 60%);
    }
    line-height: 20px;
    margin: 0 16px;
  }
  i {
    display: block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .light_star {
    background-image: url("../../assets/img/mining/finished_light.png");
  }
  .dark_star {
    background-image: url("../../assets/img/mining/finished_dark.png");
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
              color: darken($color: themed("color-17173a"), $amount: 45%);
            }
            line-height: 18px;
            display: flex;
            align-items: center;
          }
          span {
            @include themeify {
              background: themed("mining_earn");
              color: darken($color: themed("color-17173a"), $amount: 45%);
            }
            padding: 2px 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 57px;
            height: 28px;

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
                @include themeify {
                  background: themed("mining_earn");
                }
                padding: 0 4px;
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
                  color: darken($color: themed("color-17173a"), $amount: 45%);
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
                color: darken($color: themed("color-17173a"), $amount: 45%);
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
              background: themed("insure_button");
              color: themed("insure_button_text");
              border: 1px solid themed("insure_button_border");
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
              color: #fd7e14 !important;
              i {
                border-right: 5px solid transparent;
                border-top: 6px solid #fd7e14 !important;
                border-left: 5px solid transparent;
              }
            }
            i {
              position: relative;
              @include themeify {
                border-top: 6px solid themed("color-17173a");
              }
              margin-left: 6px;
              border-right: 5px solid transparent;
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
            color: darken($color: themed("color-17173a"), $amount: 55%);
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
                color: darken($color: themed("color-17173a"), $amount: 55%);
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
                  color: darken($color: themed("color-17173a"), $amount: 55%);
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
            background: themed("insure_button");
            border: 1px solid themed("insure_button_border");
            color: themed("insure_button_text");
          }
          border-radius: 5px;
          font-size: 14px;
          font-family: HelveticaNeue;
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
  .wraper_title {
    width: 100%;
    height: 100vh;
    position: fixed;
    @include themeify {
      background: themed("color-f8f9fa");
    }
    top: 0;
    left: 0;
    z-index: 99;
    .wraper {
      flex: 1;
      overflow-y: scroll;
      .wraper_header {
        height: 44px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .close {
        width: 24px;
        height: 24px;
        fill: #ccc;
        cursor: pointer;
      }
    }
  }
}
</style>
