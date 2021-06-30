<template>
  <div class="flashmining_list">
    <div class="flashmining_title">
      <h3>{{ $t("Header.FlashMining") }}</h3>
    </div>
    <div class="flash_web">
      <div
        class="mining_item"
        v-for="(item, index) in miningList"
        :key="item.REWARD_NAME"
      >
        <img
          class="link_flash"
          :src="
            require(`~/assets/img/flashmining/flash_link_${storeThemes}.png`)
          "
          alt=""
          v-if="index != 0"
        />

        <div
          :class="
            activeFlash == item.TOKEN_NAME && showActiveFlash
              ? 'activeFlash flash_show'
              : 'flash_show'
          "
        >
          <img
            :src="require(`~/assets/img/flashmining/${item.REWARD_NAME}.png`)"
            alt=""
          />
          <section>
            <span
              class="onePager"
              v-html="item.POOL_NAME"
              @click="hadnleShowOnePager($event, item.REWARD_NAME)"
            ></span>
            <span>{{ item.POOL_DESC }}</span>
          </section>
          <section>
            <p>
              {{ $t("Table.EarnList") }}
              <span>
                {{ item.REWARD_NAME }}
              </span>
            </p>
          </section>
          <section>
            <i></i>
            <p>
              <span v-if="typeof item.OPEN_TIME == 'object'">
                {{ item.OPEN_TIME.hour }}<b>{{ $t("Content.HourM") }}</b>
                <i>/</i>{{ item.OPEN_TIME.minute
                }}<b>{{ $t("Content.MinM") }}</b>
              </span>
              <span v-else-if="typeof item.MING_TIME == 'object'">
                {{ item.MING_TIME.day }}<b>{{ $t("Content.DayM") }}</b> <i>/</i
                >{{ item.MING_TIME.hour }}<b>{{ $t("Content.HourM") }}</b>
              </span>
              <span v-else>
                {{ item.MING_TIME }}
              </span>
              <span>{{ $t("Table.MIningCutdown") }}</span>
            </p>
          </section>
          <section>
            <span>{{ item.REWARD_WEEKLY }} {{ item.REWARD_NAME }}</span>
            <span>{{ $t("Table.RewardsDistribution") + "(weekly)" }}</span>
          </section>
          <section>
            <span>{{ item.REWARD_YEAR }}</span>
            <span>APR</span>
          </section>
          <section>
            <button
              @click="HandleClickAction(item, 'STAKE')"
              :class="
                activeFlash == item.REWARD_NAME &&
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
              @click="HandleClickAction(item, 'CLAIM')"
              :class="
                activeFlash == item.REWARD_NAME &&
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
          v-if="showActiveFlash && activeFlash == item.REWARD_NAME"
        >
          <svg
            class="close"
            aria-hidden="true"
            @click="showActiveFlash = false"
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
    <div class="flash_h5">
      <div
        class="mining_item_h5"
        v-for="(item, index) in miningList"
        :key="item.REWARD_NAME + '1'"
      >
        <img
          class="link_flash"
          :src="
            require(`~/assets/img/flashmining/flash_link_${storeThemes}.png`)
          "
          alt=""
          v-if="index != 0"
        />
        <section>
          <div>
            <img
              :src="require(`~/assets/img/flashmining/${item.REWARD_NAME}.png`)"
              alt=""
            />
            <p>
              <span
                class="onePager"
                v-html="item.POOL_NAME"
                @click="hadnleShowOnePager($event, item.REWARD_NAME)"
              ></span>
              <span>{{ item.POOL_DESC }}</span>
            </p>
          </div>
          <p>
            {{ $t("Table.EarnList") }}
            <span>
              {{ item.REWARD_NAME }}
            </span>
          </p>
        </section>
        <section>
          <p>
            <span>{{ item.REWARD_YEAR }}</span>
            <span>APR</span>
          </p>
          <div>
            <i></i>
            <p>
              <span v-if="typeof item.OPEN_TIME == 'object'">
                {{ item.OPEN_TIME.hour }}<b>{{ $t("Content.HourM") }}</b>
                <i>/</i>{{ item.OPEN_TIME.minute
                }}<b>{{ $t("Content.MinM") }}</b>
              </span>
              <span v-else-if="typeof item.MING_TIME == 'object'">
                {{ item.MING_TIME.day }}<b>{{ $t("Content.DayM") }}</b> <i>/</i
                >{{ item.MING_TIME.hour }}<b>{{ $t("Content.HourM") }}</b>
              </span>
              <span v-else>
                {{ item.MING_TIME }}
              </span>
              <span>{{ $t("Table.MIningCutdown") }}</span>
            </p>
          </div>
        </section>
        <section>
          <span>{{ item.REWARD_WEEKLY }} {{ item.REWARD_NAME }}</span>
          <span>{{ $t("Table.RewardsDistribution") + "(weekly)" }} </span>
        </section>
        <section>
          <button
            @click="HandleClickAction(item, 'STAKE', true)"
            :class="
              activeFlash == item.REWARD_NAME &&
              showActiveFlash &&
              activeType == 'STAKE'
                ? 'activeButton stakeFlash'
                : 'stakeFlash'
            "
          >
            {{ $t("Insurance.Insurance_text23") }}
          </button>
          <button
            @click="HandleClickAction(item, 'CLAIM', true)"
            :class="
              activeFlash == item.REWARD_NAME &&
              showActiveFlash &&
              activeType == 'CLAIM'
                ? 'activeButton claimFlash'
                : 'claimFlash'
            "
          >
            {{ $t("Table.Claim") }}
          </button>
        </section>
        <div
          class="wraper_title"
          v-if="showActiveFlash && activeFlash == item.REWARD_NAME"
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
                @click="showActiveFlash = false"
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
  </div>
</template>

<script>
import Wraper from "~/components/common/wraper.vue";
import { fixD } from "~/assets/js/util.js";
import PHeader from "~/components/common/header.vue";
import POOL from "./pool.vue";
import { GetPoolAPR } from "./flashmining_apr.js";
import moment from "moment";
export default {
  components: {
    POOL,
    Wraper,
    PHeader,
  },
  data() {
    return {
      miningList: [],
      showActiveFlash: false,
      activeFlash: "",
      TradeType: "",
      activeType: "",
      activeData: {},
      activeFlag: "",
    };
  },
  mounted() {
    this.initFlashMiningData();
    this.GetPoolItemAPR();
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
    HandleClickAction(PoolData, Action, Flag = false) {
      this.showActiveFlash = true;
      this.activeData = PoolData;
      this.activeType = Action;
      this.activeFlag = Flag;
      this.activeFlash = PoolData.REWARD_NAME;
    },
    apyArrayWatch(newValue) {
      if (newValue) {
        this.initFlashMiningData();
      }
    },
    async initFlashMiningData() {
      let arr = [
        {
          POOL_NAME: "<i>hBMXX</i>&nbsp;Pool",
          POOL_DESC: "By SHIBh-Helmet LPT",
          TOKEN_NAME: "SHIBh",
          STAKE_SYMBOL: "SHIBh-Helmet LPT",
          REWARD_NAME: "hBMXX",
          START_TIME: "2021/06/30 00:00 UTC+8",
          END_TIME: "2021/07/13 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/06/30 00:00"),
          MING_TIME: this.getRemainTime("2021/07/13 00:00"),
          REWARD_WEEKLY: fixD((3600 / 13) * 7, 2),
          POOL_ADDRESS: "0xA93f7bAbaf1A0e95dC472eb7cD37C59ed009c728",
          STAKE_ADDRESS: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          ONELPT_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
          REWARD_ADDRESS: "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44",
          SWAP_TYPE: "PANCAKEV2",
          TOTAL_REWARDS: 3600,
          MINING_DAY: 13,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "SHIBh",
            ADDTOKEN_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
            ADDTOKEN_DECIMALS: 12,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "hBMXX",
            ADDTOKEN_ADDRESS: "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44",
            ADDTOKEN_DECIMALS: 18,
          },
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>hBABY</i>&nbsp;Pool",
          POOL_DESC: "By SHIBh-Helmet LPT",
          TOKEN_NAME: "SHIBh",
          STAKE_SYMBOL: "SHIBh-Helmet LPT",
          REWARD_NAME: "hBABY",
          START_TIME: "2021/06/25 00:00 UTC+8",
          END_TIME: "2021/07/08 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/06/25 00:00"),
          MING_TIME: this.getRemainTime("2021/07/08 00:00"),
          REWARD_WEEKLY: fixD((140000 / 13) * 7, 2),
          POOL_ADDRESS: "0x475e5A97cA24278E820F93A5423cc1F613658466",
          STAKE_ADDRESS: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          ONELPT_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
          REWARD_ADDRESS: "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624",
          SWAP_TYPE: "PANCAKEV2",
          TOTAL_REWARDS: 140000,
          MINING_DAY: 13,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "SHIBh",
            ADDTOKEN_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
            ADDTOKEN_DECIMALS: 12,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "hBABY",
            ADDTOKEN_ADDRESS: "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624",
            ADDTOKEN_DECIMALS: 18,
          },
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>hMTRG</i>&nbsp;Pool",
          POOL_DESC: "By SHIBh-Helmet LPT",
          TOKEN_NAME: "SHIBh",
          STAKE_SYMBOL: "SHIBh-Helmet LPT",
          REWARD_NAME: "hMTRG",
          START_TIME: "2021/06/24 00:00 UTC+8",
          END_TIME: "2021/07/01 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/06/24 00:00"),
          MING_TIME: this.getRemainTime("2021/07/01 00:00"),
          REWARD_WEEKLY: fixD((8000 / 7) * 7, 2),
          POOL_ADDRESS: "0x784a1507c2D2e90C3842929E06625b0D4e881071",
          STAKE_ADDRESS: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          ONELPT_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
          REWARD_ADDRESS: "0xa561926e81decb74b3d11e14680b3f6d1c5012bd",
          SWAP_TYPE: "PANCAKEV2",
          TOTAL_REWARDS: 8000,
          MINING_DAY: 7,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "SHIBh",
            ADDTOKEN_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
            ADDTOKEN_DECIMALS: 12,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "hMTRG",
            ADDTOKEN_ADDRESS: "0xa561926e81decb74b3d11e14680b3f6d1c5012bd",
            ADDTOKEN_DECIMALS: 18,
          },
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>hWINGS</i>&nbsp;Pool",
          POOL_DESC: "By SHIBh-Helmet LPT",
          TOKEN_NAME: "SHIBh",
          STAKE_SYMBOL: "SHIBh-Helmet LPT",
          REWARD_NAME: "hWINGS",
          START_TIME: "2021/06/11 00:00 UTC+8",
          END_TIME: "2021/06/25 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/06/11 00:00"),
          MING_TIME: this.getRemainTime("2021/06/25 00:00"),
          REWARD_WEEKLY: fixD((7500 / 14) * 7, 2),
          POOL_ADDRESS: "0x1CaB756c4B46B44a3012E74F1023ae972c1b1b60",
          STAKE_ADDRESS: "0x12fdd0aed56fb61fbf242ac783da600b322f64e6",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          ONELPT_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
          REWARD_ADDRESS: "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026",
          SWAP_TYPE: "PANCAKEV2",
          TOTAL_REWARDS: 7500,
          MINING_DAY: 14,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "SHIBh",
            ADDTOKEN_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
            ADDTOKEN_DECIMALS: 12,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "hWINGS",
            ADDTOKEN_ADDRESS: "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026",
            ADDTOKEN_DECIMALS: 18,
          },
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>hxBURGER</i>&nbsp;Pool",
          POOL_DESC: "By hTPT-Helmet LPT",
          TOKEN_NAME: "hTPT",
          STAKE_SYMBOL: "hTPT-Helmet LPT",
          REWARD_NAME: "hxBURGER",
          START_TIME: "2021/04/22 14:00 UTC+8",
          END_TIME: "2021/05/12 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/04/22 14:00"),
          MING_TIME: this.getRemainTime("2021/05/12 00:00"),
          REWARD_WEEKLY: fixD((20000 / 20) * 7, 2),
          POOL_ADDRESS: "0x40052013B8c019E999276885467AC156e86Fd1bD",
          STAKE_ADDRESS: "0x413da4890ab12b1a7e01d0bb7fc5cf6cadf5d565",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          ONELPT_ADDRESS: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
          REWARD_ADDRESS: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
          SWAP_TYPE: "BURGER",
          TOTAL_REWARDS: 20000,
          MINING_DAY: 20,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "hTPT",
            ADDTOKEN_ADDRESS: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
            ADDTOKEN_DECIMALS: 4,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "hxBURGER",
            ADDTOKEN_ADDRESS: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
            ADDTOKEN_DECIMALS: 18,
          },
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>hTPT</i>&nbsp;Pool",
          POOL_DESC: "By hDODO-Helmet LPT",
          TOKEN_NAME: "hDODO",
          STAKE_SYMBOL: "hDODO-Helmet LPT",
          REWARD_NAME: "hTPT",
          START_TIME: "2021/04/06 00:00 UTC+8",
          END_TIME: "2021/04/26 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/04/06 00:00"),
          MING_TIME: this.getRemainTime("2021/04/26 00:00"),
          REWARD_WEEKLY: fixD((2000000 / 21) * 7, 2),
          POOL_ADDRESS: "0xe71B586Be2c053E22a44556A7526B02428a943B0",
          STAKE_ADDRESS: "0x762D63a230C4e1EB2673cB5C4FadC5B68b3074c7",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 4,
          ONELPT_ADDRESS: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
          REWARD_ADDRESS: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
          SWAP_TYPE: "PANCAKEV1",
          TOTAL_REWARDS: 2000000,
          MINING_DAY: 20,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "hDODO",
            ADDTOKEN_ADDRESS: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "hTPT",
            ADDTOKEN_ADDRESS: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
            ADDTOKEN_DECIMALS: 4,
          },
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>hDODO</i>&nbsp;Pool",
          POOL_DESC: "By hMATH-Helmet LPT",
          TOKEN_NAME: "hMATH",
          STAKE_SYMBOL: "hMATH-Helmet LPT",
          REWARD_NAME: "hDODO",
          START_TIME: "2021/03/24 00:00 UTC+8",
          END_TIME: "2021/03/31 12:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/03/24 00:00"),
          MING_TIME: this.getRemainTime("2021/03/31 12:00"),
          REWARD_WEEKLY: fixD((40000 / 15) * 7, 2),
          POOL_ADDRESS: "0xc68CB0a3c5Cab3C9521E124Eff97A503c45bE9E4",
          STAKE_ADDRESS: "0xc840de3a061A73467bc98acD9A32aA3a281A380C",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          ONELPT_ADDRESS: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
          REWARD_ADDRESS: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
          SWAP_TYPE: "PANCAKEV1",
          TOTAL_REWARDS: 40000,
          MINING_DAY: 7,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "hMATH",
            ADDTOKEN_ADDRESS: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "hTPT",
            ADDTOKEN_ADDRESS: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
            ADDTOKEN_DECIMALS: 18,
          },
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>hMATH</i>&nbsp;Pool",
          POOL_DESC: "By hAUTO-Helmet LPT",
          TOKEN_NAME: "hAUTO",
          STAKE_SYMBOL: "hAUTO-Helmet LPT",
          REWARD_NAME: "hMATH",
          START_TIME: "2021/03/11 00:00 UTC+8",
          END_TIME: "2021/03/18 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/03/11 00:00"),
          MING_TIME: this.getRemainTime("2021/03/18 00:00"),
          REWARD_WEEKLY: fixD((30000 / 15) * 7, 2),
          POOL_ADDRESS: "0x630179cd153a009b4b864A5A5a3Ac5A0E70804Da",
          STAKE_ADDRESS: "0xB6F84EaD91Fb6d70B8f1E87759E7c95c440DD80C",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          ONELPT_ADDRESS: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
          REWARD_ADDRESS: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
          SWAP_TYPE: "PANCAKEV1",
          TOTAL_REWARDS: 30000,
          MINING_DAY: 7,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "hAUTO",
            ADDTOKEN_ADDRESS: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "hMATH",
            ADDTOKEN_ADDRESS: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
            ADDTOKEN_DECIMALS: 18,
          },
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>hAUTO</i>&nbsp;Pool",
          POOL_DESC: "By BNB500-Helmet LPT",
          TOKEN_NAME: "BNB500",
          STAKE_SYMBOL: "BNB500-Helmet LPT",
          REWARD_NAME: "hAUTO",
          START_TIME: "2021/03/02 00:00 UTC+8",
          END_TIME: "2021/03/09 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/03/02 00:00"),
          MING_TIME: this.getRemainTime("2021/03/09 00:00:00"),
          REWARD_WEEKLY: fixD((10 / 14) * 7, 2),
          POOL_ADDRESS: "0xe4a5d7cb5A9EbDC4370D0b4EBBd0C1656099b293",
          STAKE_ADDRESS: "0x6A829c3870Ab4ce228Cdf359E6F72295ef472F9d",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          ONELPT_ADDRESS: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
          REWARD_ADDRESS: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
          SWAP_TYPE: "PANCAKEV1",
          TOTAL_REWARDS: 10,
          MINING_DAY: 7,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "BNB500",
            ADDTOKEN_ADDRESS: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "hAUTO",
            ADDTOKEN_ADDRESS: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
            ADDTOKEN_DECIMALS: 18,
          },
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>BNB500</i>&nbsp;Pool",
          POOL_DESC: "By hCTK-Helmet LPT",
          TOKEN_NAME: "hCTK",
          STAKE_SYMBOL: "hCTK-Helmet LPT",
          REWARD_NAME: "BNB500",
          START_TIME: "2021/02/22 00:00 UTC+8",
          END_TIME: "2021/02/29 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/02/22 00:00"),
          MING_TIME: this.getRemainTime("2021/02/29 00:00"),
          REWARD_WEEKLY: fixD((1000 / 10) * 7, 2),
          POOL_ADDRESS: "0x6F131e8e5a93ac3Ae71FDdbbE1122cB69AF9Fc71",
          STAKE_ADDRESS: "0x9a6fCD063cA5a9bB31b9f8eE86eCB6476b981280",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          ONELPT_ADDRESS: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
          REWARD_ADDRESS: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
          SWAP_TYPE: "PANCAKEV1",
          TOTAL_REWARDS: 1000,
          MINING_DAY: 7,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "hCTK",
            ADDTOKEN_ADDRESS: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
            ADDTOKEN_DECIMALS: 6,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "BNB500",
            ADDTOKEN_ADDRESS: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
            ADDTOKEN_DECIMALS: 18,
          },
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>hCTK</i>&nbsp;Pool",
          POOL_DESC: "By HCCT-Helmet LPT",
          TOKEN_NAME: "HCCT",
          STAKE_SYMBOL: "HCCT-Helmet LPT",
          REWARD_NAME: "hCTK",
          START_TIME: "2021/02/21 00:00 UTC+8",
          END_TIME: "2021/02/28 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/02/21 00:00"),
          MING_TIME: this.getRemainTime("2021/02/28 00:00"),
          REWARD_WEEKLY: fixD((70000 / 21) * 7, 2),
          POOL_ADDRESS: "0xaF0e8747FA54b3E000FF1a0F87AF2DB4F1B7Fd87",
          STAKE_ADDRESS: "0xcBbD24DBbF6a487370211bb8B58C3b43C4C32b9E",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 6,
          ONELPT_ADDRESS: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
          REWARD_ADDRESS: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
          SWAP_TYPE: "PANCAKEV1",
          TOTAL_REWARDS: 70000,
          MINING_DAY: 7,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "HCCT",
            ADDTOKEN_ADDRESS: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "hCTK",
            ADDTOKEN_ADDRESS: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
            ADDTOKEN_DECIMALS: 6,
          },
          REWARD_YEAR: "Infinity",
        },
        {
          POOL_NAME: "<i>HCCT</i>&nbsp;Pool",
          POOL_DESC: "By LONG-Helmet LPT",
          TOKEN_NAME: "LONG",
          STAKE_SYMBOL: "LONG-Helmet LPT",
          REWARD_NAME: "HCCT",
          START_TIME: "2021/02/06 00:00 UTC+8",
          END_TIME: "2021/02/13 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/02/06 00:00"),
          MING_TIME: this.getRemainTime("2021/02/13 00:00"),
          REWARD_WEEKLY: fixD(16000 * 7, 2),
          POOL_ADDRESS: "0xB6ED9f3dCA5CeaaB25F24a377Ed2e47Ecb7dCA5D",
          STAKE_ADDRESS: "0x2ec7FC5A00d4E785821fc8D195291c970d79F0bF",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          ONELPT_ADDRESS: "0x17934fef9fc93128858e9945261524ab0581612e",
          REWARD_ADDRESS: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
          SWAP_TYPE: "PANCAKEV1",
          TOTAL_REWARDS: 16000,
          MINING_DAY: 7,
          LEFTTOKEN: {
            ADDTOKEN_SYMBOL: "LONG",
            ADDTOKEN_ADDRESS: "0x17934fef9fc93128858e9945261524ab0581612e",
            ADDTOKEN_DECIMALS: 18,
          },
          RIGHTTOKEN: {
            ADDTOKEN_SYMBOL: "HCCT",
            ADDTOKEN_ADDRESS: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
            ADDTOKEN_DECIMALS: 18,
          },
          REWARD_YEAR: "Infinity",
        },
      ];

      this.miningList = arr;
    },
    async GetPoolItemAPR() {
      let arr = this.miningList;
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let res = await GetPoolAPR(item);
        item.REWARD_YEAR = res;
      }
      this.$forceUpdate();
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
  },
};
</script>

<style lang="scss">
@import "~/assets/css/base.scss";
.onePager {
  > i {
    cursor: pointer;
    @include themeify {
      border-bottom: 2px dotted themed("color-17173a");
    }
    &:hover {
      color: #fd7e14;
      border-bottom: 2px dotted #fd7e14 !important;
    }
  }
}
</style>
<style lang="scss" scoped >
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .flash_h5 {
    display: none;
  }
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
  .flash_web {
    display: none;
  }
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
        @include themeify {
          color: themed("color-17173a");
        }
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
