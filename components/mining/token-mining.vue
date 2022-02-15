<template>
  <div class="mining_list">
    <div v-for="item in FixPoolList" :key="item.Key">
      <div class="finshed_line" v-if="item.Key == 'HELMET'">
        <p></p>
        <i :class="storeThemes + '_star'"></i>
        <span>Finished</span>
        <i :class="storeThemes + '_star'"></i>
        <p></p>
      </div>
      <div class="mining_item_wrap">
        <div class="mining_item">
          <img
            class="combo_img"
            :src="
              require(`~/assets/img/mining/combo_${
                item.Status === 3 ? 'expired_' + storeThemes : 'web'
              }.png`)
            "
            alt=""
            v-if="item.IsCombo"
          />
          <img
            class="combo_img"
            style="width: 148px"
            :src="
              require(`~/assets/img/mining/partner_${
                item.Status === 3 ? 'expired_' + storeThemes : 'web'
              }.png`)
            "
            alt=""
            v-if="item.IsPartner"
          />
          <img
            class="combo_img"
            style="width: 116px"
            :src="
              require(`~/assets/img/mining/${
                item.Status === 3
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
                item.Status === 3
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
            v-if="item.isIIO"
          />

          <section class="mining_pool_name_web WEB">
            <span
              class="onePager"
              v-html="item.PoolName"
              @click="hadnleShowOnePager($event, item.HaveOnePager)"
            ></span>
          </section>
          <section class="mining_pool_earn_web WEB">
            <p>
              {{ $t("Table.EarnList") }}
              <span>
                <img
                  v-if="item.ImgReward"
                  :src="require(`~/assets/img/mining/${item.RewardSymbol}.png`)"
                  :class="item.RewardVolume"
                  alt=""
                  :style="item.Status === 3 ? 'filter: grayscale(1);' : ''"
                />
                <template v-else style="color: #17173a">{{
                  item.RewardSymbol
                }}</template>
              </span>
            </p>
          </section>
          <section class="mining_pool_time_web WEB">
            <i></i>
            <p>
              <span v-html="item.ShowTime"></span>
              <span>{{ $t("Table.MIningCutdown") }}</span>
            </p>
          </section>
          <section v-if="!item.APY" class="mining_pool_reward_web WEB">
            <span>{{ item.APR }}</span>
            <span>{{ item.YearEarnType }}</span>
          </section>
          <section class="APY mining_pool_reward_web WEB" v-else>
            <span>{{ item.APR }}</span>
            <span>
              {{ item.YearEarnType }}
              <el-tooltip effect="dark" placement="top-start">
                <div slot="content" style="width: 200px">
                  <p>{{ $t("Tip.APR") }} : {{ item.APR }}</p>
                  <p>{{ $t("Tip.APY") }} : {{ item.APY }}</p>
                  <p>{{ $t("Tip.EarnTip1") }}</p>
                  <p>{{ $t("Tip.EarnTip2") }}</p>
                </div>
                <svg
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
              </el-tooltip>
            </span>
          </section>
          <section class="mining_pool_action_web WEB">
            <button
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
              <i class="selectDown"></i>
            </button>
          </section>
          <!-- -------------------------- -->
          <section class="mining_pool_name_h5 H5">
            <span
              class="onePager"
              v-html="item.PoolName"
              @click="hadnleShowOnePager($event, item.HaveOnePager)"
            ></span>
            <p>
              {{ $t("Table.EarnList") }}
              <span>
                <img
                  v-if="item.ImgReward"
                  :src="require(`~/assets/img/mining/${item.RewardSymbol}.png`)"
                  :class="item.RewardVolume"
                  alt=""
                  :style="item.Status === 3 ? 'filter: grayscale(1);' : ''"
                />
                <template v-else style="color: #17173a">{{
                  item.RewardSymbol
                }}</template>
              </span>
            </p>
          </section>
          <section class="mining_pool_reward_h5 H5">
            <p v-if="!item.APY">
              <span>{{ item.APR }}</span>
              <span>{{ item.YearEarnType }}</span>
            </p>
            <p class="APY" v-else>
              <span>{{ item.APR }}</span>
              <span>
                {{ item.YearEarnType }}
                <el-tooltip effect="dark" placement="top-start">
                  <div slot="content" style="width: 150px">
                    <p>{{ $t("Tip.APR") }} : {{ item.APR }}</p>
                    <p>{{ $t("Tip.APY") }} : {{ item.APY }}</p>
                    <p>{{ $t("Tip.EarnTip1") }}</p>
                    <p>{{ $t("Tip.EarnTip2") }}</p>
                  </div>
                  <svg
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
                </el-tooltip>
              </span>
            </p>
            <div>
              <i></i>
              <p>
                <span v-html="item.ShowTime"></span>
                <span>{{ $t("Table.MIningCutdown") }}</span>
              </p>
            </div>
          </section>
          <section class="mining_pool_action_h5 H5">
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
            <button @click="toCompound" v-if="item.Compound">
              <i :class="claimLoading ? 'loading_pic' : ''"></i
              >{{ $t("Table.Compound") }}
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
</template>

<script>
import { Earned } from "~/interface/read_contract.js";
import Wraper from "~/components/common/wraper.vue";
import Pool from "./mining-pool.vue";
import PHeader from "~/components/common/header.vue";
import {
  TokenPoolList,
  formatMiningPool,
  getComboAPR,
  getAPRAndAPY,
  getCandyAPR,
} from "../../config/mining.js";
export default {
  components: {
    Wraper,
    Pool,
    PHeader,
  },
  data() {
    return {
      ActiveType: "",
      ShowActiveMining: false,
      ActiveMining: "",
      TradeType: "", //H5 tradingType
      claimLoading: false,
      HelmetBalance: 0,
      ActiveData: {},
      ActiveFlag: "",
      FixPoolList: [],
    };
  },
  mounted() {
    this.FixPoolList = formatMiningPool(TokenPoolList);
    this.$nextTick(() => {
      this.initPool();
    });
    this.getHelmetBalance();
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    if (this.$route.params.earn) {
      this.ActiveMining = this.$route.params.earn;
      this.ShowActiveMining = true;
      this.ActiveType = "Stake";
      if (flag) {
        this.$bus.$emit("OPEN_WRAPER_PAFE", true);
        this.TradeType = "Stake";
      } else {
        this.TradeType = "Stake";
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
  methods: {
    initPool() {
      TokenPoolList.forEach(async (item) => {
        if (item.PoolType === "combo") {
          await getComboAPR(item);
        }
        if (item.PoolType === "compound") {
          await getAPRAndAPY(item);
        }
        if (item.PoolType === "candy") {
          await getCandyAPR(item);
        }
      });
    },
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
    toCompound() {
      this.$bus.$emit("OPEN_COMPOUND", {
        title: "Compound HELMET Earned",
        number: this.HelmetBalance,
        poolAddress: "0x279a073c491c873df040b05cc846a3c47252b52c",
      });
    },
    HandleClickAction(PoolData, Action, Flag = false) {
      this.ShowActiveMining = true;
      this.ActiveData = PoolData;
      this.ActiveType = Action;
      this.ActiveFlag = Flag;
      this.ActiveMining = PoolData.RewardSymbol;
    },
    async getHelmetBalance() {
      let Helmet = await Earned(
        "0x279a073c491c873df040b05cc846a3c47252b52c",
        18
      );
      this.HelmetBalance = Helmet;
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
@import "~/assets/css/themes.scss";
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
  .H5 {
    display: none;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
  .mining_list {
    width: 100%;
    margin: 0 auto;
  }
  .APY {
    display: flex;
    flex-direction: column;
    span {
      display: flex;
      align-items: center;
    }
    svg {
      width: 14px;
      height: 14px;
      margin-left: 4px;
      cursor: pointer;
      @include themeify {
        fill: themed("color-17173a");
      }
    }
  }
  .mining_item_wrap {
    width: 100%;
    margin-top: 10px;
    padding: 0 20px;
    @include themeify {
      background: themed("color-ffffff");
    }
  }
  .mining_item {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    position: relative;
    .combo_img {
      position: absolute;
      width: 156px;
      height: 37px;
      left: -28px;
      top: -11px;
    }
    .mining_pool_name_web {
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
    .mining_pool_earn_web {
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
    .mining_pool_time_web {
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
    .mining_pool_reward_web {
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
    .mining_pool_action_web {
      flex: 3;
      display: flex;
      justify-content: flex-end;
      min-width: 200px;
      .stakeMining {
        margin-left: 0;
      }
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
  .mining_detail {
    position: relative;
    .close {
      position: absolute;
      right: 10px;
      width: 24px;
      height: 24px;
      top: 10px;
      fill: #ccc;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 750px) {
  .WEB {
    display: none !important;
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
  }
  .APY {
    display: flex;
    flex-direction: column;
    flex: 3;
    span {
      display: flex;
      align-items: center;
    }
    svg {
      width: 14px;
      height: 14px;
      margin-left: 4px;
      cursor: pointer;
      @include themeify {
        fill: themed("color-17173a");
      }
    }
  }
  .mining_item_wrap {
    width: 100%;
    margin-bottom: 10px;
    @include themeify {
      background: themed("color-ffffff");
    }
  }
  .mining_item {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 24px 10px;
    position: relative;
    .combo_img {
      position: absolute;
      width: 156px;
      height: 37px;
      left: -8px;
      top: -11px;
    }
    .mining_pool_name_h5 {
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
    .mining_pool_reward_h5 {
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
    .mining_pool_action_h5 {
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
}
</style>
