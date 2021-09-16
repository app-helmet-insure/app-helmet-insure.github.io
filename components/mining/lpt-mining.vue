<template>
  <div class="lpt_mining">
    <div class="lpt_mining_border">
      <p class="lpt_mining_title">LPT Mining</p>
      <div class="lpt_mining_wrap">
        <div
          class="lpt_mining_item_wrap"
          v-for="item in FixPoolList"
          :key="item.RewardSymbol"
        >
          <div :class="`lpt_mining_item lp_${storeThemes}`">
            <section class="item_pool_name_web WEB">
              <span>
                <img
                  :src="require(`~/assets/img/icon/${item.PoolSwap}@2x.png`)"
                  alt=""
                />{{ item.PoolName }}
              </span>
            </section>
            <section class="item_pool_earn_web WEB">
              <p>
                {{ $t("Table.EarnList") }}
                <span>
                  <img
                    v-if="item.ImgReward"
                    :src="
                      require(`~/assets/img/mining/${
                        item.Status === 3
                          ? item.RewardSymbol + '_expired'
                          : item.RewardSymbol
                      }.png`)
                    "
                    :class="item.RewardVolume"
                    alt=""
                  />
                  <template v-else style="color: #17173a">{{
                    item.RewardSymbol
                  }}</template>
                </span>
              </p>
            </section>
            <section class="item_pool_item_time WEB">
              <i></i>
              <p>
                <span v-html="item.ShowTime"></span>
                <span>{{ $t("Table.MIningCutdown") }}</span>
              </p>
            </section>
            <section class="item_pool_year_web WEB">
              <span>{{ item.APR || "--" }}</span>
              <span>{{ item.YearEarnType }}</span>
            </section>
            <section class="item_pool_action_web WEB">
              <a
                href="https://www.guard.insure/mining"
                v-if="item.PoolType === 'link'"
                ><img src="~/assets/img/guard/Polygon.png" alt="" />
                <span>Mining on Polygon</span>
                <i></i>
              </a>
              <template v-else
                ><button
                  @click="HandleClickAction(item, 'Stake')"
                  :class="
                    ActiveMining == item.RewardSymbol &&
                    ShowActiveMining &&
                    ActiveType == 'Stake'
                      ? 'activeButton stakeMining'
                      : 'stakeMining'
                  "
                >
                  {{ $t("Table.Stakeing") }}
                  <i class="selectDown"></i>
                </button>
                <button
                  @click="HandleClickAction(item, 'Claim')"
                  :class="
                    ActiveMining == item.RewardSymbol &&
                    ShowActiveMining &&
                    ActiveType == 'Claim'
                      ? 'activeButton claimMining'
                      : 'claimMining'
                  "
                >
                  {{ $t("Table.Claim") }}
                  <i class="selectDown"></i></button
              ></template>
            </section>
            <section class="item_pool_name_h5 H5">
              <span>
                <img
                  :src="require(`~/assets/img/icon/${item.PoolSwap}@2x.png`)"
                  alt=""
                />{{ item.PoolName }}
              </span>
              <p>
                {{ $t("Table.EarnList") }}
                <span>
                  <img
                    v-if="item.ImgReward"
                    :src="
                      require(`~/assets/img/mining/${item.RewardSymbol}.png`)
                    "
                    :class="item.RewardVolume"
                    alt=""
                  />
                  <template v-else style="color: #17173a">{{
                    item.RewardSymbol
                  }}</template>
                </span>
              </p>
            </section>
            <section class="item_pool_year_h5 H5">
              <p>
                <span>{{ item.APR || "--" }}</span>
                <span>{{ item.YearEarnType }}</span>
              </p>
              <div>
                <i></i>
                <p>
                  <span v-html="item.ShowTime"></span>
                  <span>{{ $t("Table.MIningCutdown") }}</span>
                </p>
              </div>
            </section>
            <section class="item_pool_action_h5 H5">
              <a
                href="https://www.guard.insure/mining"
                v-if="item.PoolType === 'link'"
                ><img src="~/assets/img/guard/Polygon.png" alt="" />
                <span>Mining on Polygon</span>
                <i></i>
              </a>
              <template v-else>
                <button
                  @click="HandleClickAction(item, 'Stake', true)"
                  :class="
                    ActiveMining == item.RewardSymbol &&
                    ShowActiveMining &&
                    ActiveType == 'Stake'
                      ? 'activeButton stakeMining'
                      : 'stakeMining'
                  "
                  style="margin-right: 10px"
                >
                  {{ $t("Table.Stakeing") }}
                </button>
                <button
                  @click="HandleClickAction(item, 'Claim', true)"
                  :class="
                    ActiveMining == item.RewardSymbol &&
                    ShowActiveMining &&
                    ActiveType == 'Claim'
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
            v-if="ShowActiveMining && ActiveMining == item.RewardSymbol"
          >
            <svg
              class="close"
              aria-hidden="true"
              @click="ShowActiveMining = false"
            >
              <use xlink:href="#icon-close"></use>
            </svg>
            <Pool
              :ActiveData="ActiveData"
              :ActiveFlag="ActiveFlag"
              :ActiveType="ActiveType"
            />
          </div>
          <div
            class="wraper_title H5"
            v-if="ShowActiveMining && ActiveMining == item.RewardSymbol"
          >
            <PHeader></PHeader>
            <div class="wraper">
              <div class="wraper_header">
                <h3 class="">
                  {{
                    ActiveType == "Stake"
                      ? $t("Insurance.Insurance_text23")
                      : $t("Table.Claim")
                  }}
                </h3>
                <svg
                  class="close"
                  aria-hidden="true"
                  @click="ShowActiveMining = false"
                >
                  <use xlink:href="#icon-close"></use>
                </svg>
              </div>
              <Pool
                :ActiveData="ActiveData"
                :ActiveFlag="ActiveFlag"
                :ActiveType="ActiveType"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { lptPoolList, formatMiningPool, getLptAPR } from "~/config/mining.js";
import Pool from "./mining-pool.vue";
import Wraper from "~/components/common/wraper.vue";
import PHeader from "~/components/common/header.vue";
import moment from "moment";
export default {
  components: {
    Wraper,
    Pool,
    PHeader,
  },
  data() {
    return {
      FixPoolList: [],
      ActiveType: "",
      ShowActiveMining: false,
      ActiveMining: "",
      TradeType: "", //H5 tradingType
      claimLoading: false,
      HelmetBalance: 0,
      ActiveData: {},
      ActiveFlag: "",
    };
  },
  computed: {
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  mounted() {
    this.FixPoolList = formatMiningPool(lptPoolList);
    this.$nextTick(() => {
      this.initPool();
    });
  },
  methods: {
    initPool() {
      lptPoolList.forEach(async (item) => {
        if (item.PoolType === "lpt") {
          await getLptAPR(item);
        }
      });
    },
    HandleClickAction(PoolData, Action, Flag = false) {
      this.ShowActiveMining = true;
      this.ActiveData = PoolData;
      this.ActiveType = Action;
      this.ActiveFlag = Flag;
      this.ActiveMining = PoolData.RewardSymbol;
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

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
.lpt_mining {
  width: 100%;
  background: #ffffff;
  padding: 2px;
  border-radius: 5px;
  @include themeify {
    background: themed("lptmining_border");
  }
  box-sizing: border-box;
  &_border {
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
  &_title {
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
  .lpt_mining_item_wrap {
    display: flex;
    flex-direction: column;
  }
  .lpt_mining_item {
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
  .item_pool_name_web {
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
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 4px;
      }
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
  .item_pool_earn_web {
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
  .item_pool_item_time {
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
  .item_pool_year_web {
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
  .item_pool_action_web {
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
  .lpt_mining {
    margin-top: 20px;
  }
  .lpt_mining_border {
    padding: 10px;
  }
  .lpt_mining_item {
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
  .item_pool_name_h5 {
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
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 4px;
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
  .item_pool_year_h5 {
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
  .item_pool_action_h5 {
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