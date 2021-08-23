<template>
  <div class="lptMining">
    <div class="lptMiningBorder">
      <p class="lptMiningTitle">LPT Mining</p>
      <div class="lptMiningWrap">
        <div
          class="lptMiningItemWrap"
          v-for="item in lptPool"
          :key="item.REWARD_NAME"
        >
          <div :class="`lptMiningItem lp_${storeThemes}`">
            <section class="itemPoolNameWEB WEB">
              <span
                class="onePager"
                v-html="item.POOL_NAME"
                @click="hadnleShowOnePager($event, item.ONE_PAGER)"
              ></span>
            </section>
            <section class="itemPoolEarnWEB WEB">
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
            <section class="itemPoolTimeWEB WEB">
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
                <span v-else> {{ item.MING_TIME }} </span>
                <span>{{ $t("Table.MIningCutdown") }}</span>
              </p>
            </section>
            <section class="itemPoolYearWEB WEB">
              <span>{{ item.REWARD_YEAR }}</span>
              <span>{{ item.REWARD_TYPE }}</span>
            </section>
            <section class="itemPoolActionWEB WEB">
              <a
                href="https://www.guard.insure/mining"
                v-if="item.POOL_TYPE === 'link'"
                ><img src="~/assets/img/guard/Polygon.png" alt="" />
                <span>Mining on Polygon</span>
                <i></i>
              </a>
              <template v-else
                ><button
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
                  <i class="selectDown"></i></button
              ></template>
            </section>
            <section class="itemPoolNameH5 H5">
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
                    :src="
                      require(`~/assets/img/mining/${item.REWARD_NAME}.png`)
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
            <section class="itemPoolYearH5 H5">
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
            <section class="itemPoolActionH5 H5">
              <a
                href="https://www.guard.insure/mining"
                v-if="item.POOL_TYPE === 'link'"
                ><img src="~/assets/img/guard/Polygon.png" alt="" />
                <span>Mining on Polygon</span>
                <i></i>
              </a>
              <template v-else>
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
              </template>
            </section>
          </div>
          <div
            class="mining_detail WEB"
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
          <div
            class="wraper_title H5"
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
    </div>
  </div>
</template>

<script>
import { lptPool } from "~/config/mining.js";
import POOL from "./pool.vue";
import Wraper from "~/components/common/wraper.vue";
import { GetPoolAPR } from "./mining_apr.js";
import PHeader from "~/components/common/header.vue";
export default {
  components: {
    Wraper,
    POOL,
    PHeader,
  },
  data() {
    return {
      lptPool,
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
  computed: {
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  mounted() {
    this.GetPoolItemAPR();
  },
  methods: {
    HandleClickAction(PoolData, Action, Flag = false) {
      this.showActiveMining = true;
      this.activeData = PoolData;
      this.activeType = Action;
      this.activeFlag = Flag;
      this.activeMining = PoolData.REWARD_NAME;
    },
    async GetPoolItemAPR() {
      let arr = lptPool;
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item.REWARD_YEAR === "Infinity") {
          let res = await GetPoolAPR(item);
          item.REWARD_YEAR = res;
        } else {
          item.REWARD_YEAR = item.REWARD_YEAR;
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/base.scss";
.lptMining {
  width: 100%;
  background: #ffffff;
  padding: 2px;
  border-radius: 5px;
  @include themeify {
    background: themed("lptmining_border");
  }
  box-sizing: border-box;
  &Border {
    @include themeify {
      background: themed("swap_background");
    }
    border-radius: 5px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding: 20px;
  }
  &Title {
    font-size: 20px;
    font-family: IBMPlexSans-SemiBold, IBMPlexSans;
    font-weight: 600;
    @include themeify {
      color: themed("color-17173a");
    }
    padding-bottom: 10px;
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
  display: flex;
  flex-direction: column;
  .wraper {
    flex: 1;
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
@media screen and(min-width:750px) {
  .H5 {
    display: none !important;
  }
  .lptMiningItemWrap {
    display: flex;
    flex-direction: column;
  }
  .lptMiningItem {
    margin-top: 10px;
    width: 100%;
    height: 70px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    padding: 0 30px;
  }
  .lp_dark {
    background-image: url("../../assets/img/mining/lpmining_bg_dark.png");
  }
  .lp_light {
    background-image: url("../../assets/img/mining/lpmining_bg_light.png");
  }
  .itemPoolNameWEB {
    display: flex;
    align-items: center;
    flex: 3;
    span {
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("lptmining_color1");
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
  .itemPoolEarnWEB {
    flex: 3;
    p {
      font-size: 14px;
      font-family: IBMPlexSans;
      @include themeify {
        color: themed("lptmining_color3");
      }
      line-height: 18px;
      display: flex;
      align-items: center;
    }
    span {
      @include themeify {
        background: themed("lptmining_color2");
        color: themed("lptmining_color3");
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
  .itemPoolTimeWEB {
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
            background: themed("lptmining_color2");
            color: themed("lptmining_color1");
          }
          padding: 0 4px;
          display: flex;
          align-items: center;
          align-self: flex-start;
          border-radius: 3px;
          font-size: 14px;
          font-family: IBMPlexSans;
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
            color: themed("lptmining_color3");
          }
          line-height: 12px;
        }
      }
    }
  }
  .itemPoolYearWEB {
    flex: 2;
    display: flex;
    flex-direction: column;
    span {
      &:nth-of-type(1) {
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          color: themed("lptmining_color1");
        }
        line-height: 18px;
      }
      &:nth-of-type(2) {
        font-size: 12px;
        font-family: IBMPlexSans;
        @include themeify {
          color: themed("lptmining_color3");
        }
        line-height: 12px;
        margin-top: 4px;
      }
    }
  }
  .itemPoolActionWEB {
    flex: 3;
    display: flex;
    justify-content: flex-end;
    min-width: 200px;
    > a {
      width: 200px;
      height: 40px;
      background: rgba(#9f66ff, $alpha: 0.2);
      border-radius: 5px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      position: relative;
      > img {
        width: 24px;
        height: 24px;
      }
      > span {
        font-size: 14px;
        font-weight: 600;
        color: #9f66ff;
        line-height: 18px;
        margin-left: 4px;
      }
      i {
        position: absolute;
        right: 10px;
        display: block;
        width: 12px;
        height: 12px;
        background: url("../../assets/img/guard/right_double.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    button {
      padding: 0px 10px;
      height: 36px;
      @include themeify {
        background: themed("insure_button");
        color: themed("lptmining_color1");
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
    .activeButtonWEB {
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
@media screen and(max-width:750px) {
  .WEB {
    display: none !important;
  }
  .lptMining {
    margin-top: 20px;
  }
  .lptMiningBorder {
    padding: 10px;
  }
  .lptMiningItem {
    width: 100%;
    padding: 24px 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .lp_dark {
    background-image: url("../../assets/img/mining/lpmining_bg_dark_h5.png");
  }
  .lp_light {
    background-image: url("../../assets/img/mining/lpmining_bg_light_h5.png");
  }
  .itemPoolNameH5 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span {
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("lptmining_color1");
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
        color: themed("lptmining_color3");
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
          color: themed("lptmining_color3");
          background: themed("lptmining_color2");
        }
        border-radius: 5px;
        height: 28px;
      }
    }
  }
  .itemPoolYearH5 {
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
            color: themed("lptmining_color1");
          }
        }
        &:nth-of-type(2) {
          margin-top: 4px;
          font-size: 12px;
          font-family: IBMPlexSans;
          @include themeify {
            color: themed("lptmining_color3");
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
              color: themed("lptmining_color1");
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
              color: themed("lptmining_color3");
            }
            line-height: 12px;
          }
        }
      }
    }
  }
  .itemPoolActionH5 {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    .activeButton {
      border: 2px solid #fd7e14 !important;
      color: #fd7e14 !important;
    }
    > a {
      width: 100%;
      height: 40px;
      background: rgba(#9f66ff, $alpha: 0.2);
      border-radius: 5px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      position: relative;
      > img {
        width: 24px;
        height: 24px;
      }
      > span {
        font-size: 14px;
        font-weight: 600;
        color: #9f66ff;
        line-height: 18px;
        margin-left: 4px;
      }
      i {
        position: absolute;
        right: 10px;
        display: block;
        width: 12px;
        height: 12px;
        background: url("../../assets/img/guard/right_double.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    button {
      flex: 1;
      height: 36px;
      @include themeify {
        background: themed("insure_button");
        border: 1px solid themed("insure_button_border");
        color: themed("lptmining_color1");
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
</style>