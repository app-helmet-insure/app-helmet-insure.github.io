<template>
  <div class="flash_list">
    <div class="flash_title">
      <h3>{{ $t("Header.FlashMining") }}</h3>
    </div>
    <div
      class="flash_item_wrap"
      v-for="(item, index) in FixPoolList"
      :key="item.key"
    >
      <div class="flash_item">
        <img
          class="link_flash"
          :src="
            require(`~/assets/img/flashmining/flash_link_${storeThemes}.png`)
          "
          alt=""
          v-if="index != 0"
        />
        <section class="flash_pool_name_web WEB">
          <img
            :src="require(`~/assets/img/flashmining/${item.reward_symbol}.png`)"
            alt=""
          />
          <div>
            <span
              class="onePager"
              v-html="item.pool_name"
              @click="hadnleShowOnePager($event, item.reward_symbol)"
            ></span>
            <span>{{ item.pool_desc }}</span>
          </div>
        </section>
        <section class="flash_pool_earn_web WEB">
          <p>
            {{ $t("Table.EarnList") }}
            <span>
              {{ item.reward_symbol }}
            </span>
          </p>
        </section>
        <section class="flash_pool_time_web WEB">
          <i></i>
          <p>
            <span v-html="item.show_time"></span>
            <span>{{ $t("Table.MIningCutdown") }}</span>
          </p>
        </section>
        <section class="flash_pool_reward_web WEB">
          <span
            >{{ fixD((item.total_rewards / item.pool_process) * 7, 2) }}
            {{ item.reward_symbol }}</span
          >
          <span>{{ $t("Table.RewardsDistribution") + "(weekly)" }}</span>
        </section>
        <section class="flash_pool_apr_web WEB">
          <span>{{ item.apr }}</span>
          <span>APR</span>
        </section>
        <section class="flash_pool_action_web WEB">
          <button
            @click="HandleClickAction(item, 'STAKE')"
            :class="
              activeFlash == item.key &&
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
              activeFlash == item.key &&
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
        <!-- ------------------------------------------------ -->
        <section class="flash_pool_name_h5 H5">
          <div>
            <img
              :src="
                require(`~/assets/img/flashmining/${item.reward_symbol}.png`)
              "
              alt=""
            />
            <p>
              <span
                class="onePager"
                v-html="item.pool_name"
                @click="hadnleShowOnePager($event, item.reward_symbol)"
              ></span>
              <span>{{ item.pool_desc }}</span>
            </p>
          </div>
          <p>
            {{ $t("Table.EarnList") }}
            <span>
              {{ item.reward_symbol }}
            </span>
          </p>
        </section>
        <section class="flash_pool_time_h5 H5">
          <p>
            <span>{{ item.apr }}</span>
            <span>APR</span>
          </p>
          <div>
            <i></i>
            <p>
              <span v-html="item.show_time"></span>
              <span>{{ $t("Table.MIningCutdown") }}</span>
            </p>
          </div>
        </section>
        <section class="flash_pool_reward_h5 H5">
          <span
            >{{ fixD((item.total_rewards / item.pool_process) * 7, 2) }}
            {{ item.reward_symbol }}</span
          >
          <span>{{ $t("Table.RewardsDistribution") + "(weekly)" }} </span>
        </section>
        <section class="flash_pool_action_h5 H5">
          <button
            @click="HandleClickAction(item, 'STAKE', true)"
            :class="
              activeFlash == item.key &&
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
              activeFlash == item.key &&
              showActiveFlash &&
              activeType == 'CLAIM'
                ? 'activeButton claimFlash'
                : 'claimFlash'
            "
          >
            {{ $t("Table.Claim") }}
          </button>
        </section>
      </div>
      <div
        class="flash_detail WEB"
        v-if="showActiveFlash && activeFlash == item.key"
      >
        <svg class="close" aria-hidden="true" @click="showActiveFlash = false">
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
        v-if="showActiveFlash && activeFlash == item.key"
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
</template>

<script>
import Wraper from "~/components/common/wraper.vue";
import PHeader from "~/components/common/header.vue";
import { fixD } from "~/assets/js/util.js";
import POOL from "./flashPool.vue";
import { PoolList, formatMiningPool } from "../../config/flashMining.js";
export default {
  components: {
    POOL,
    Wraper,
    PHeader,
  },
  data() {
    return {
      FixPoolList: [],
      showActiveFlash: false,
      activeFlash: "",
      TradeType: "",
      activeType: "",
      activeData: {},
      activeFlag: "",
      fixD,
    };
  },
  mounted() {
    this.FixPoolList = formatMiningPool(PoolList);
  },
  computed: {
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  methods: {
    hadnleShowOnePager(e, earn) {
      if (e.target.tagName === "I") {
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
      this.activeFlash = PoolData.key;
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
.flash_list {
  width: 100%;
  margin: 0 auto;
}
.flash_title {
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
.flash_detail {
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
@media screen and (min-width: 750px) {
  .H5 {
    display: none;
  }
  .flash_item_wrap {
    @include themeify {
      background: themed("color-ffffff");
    }
  }
  .flash_item {
    width: 100%;
    margin-top: 10px;
    padding: 0 20px;
    height: 70px;
    display: flex;
    align-items: center;
    position: relative;
    .link_flash {
      width: 8px;
      height: 32px;
      position: absolute;
      left: 6px;
      top: -21px;
    }
    img {
      width: 54px;
      height: 54px;
      margin-right: 20px;
    }
    .flash_pool_name_web {
      display: flex;
      align-items: center;
      flex: 3;
      min-width: 160px;
      > div {
        display: flex;
        flex-direction: column;
      }
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
    .flash_pool_earn_web {
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
    .flash_pool_time_web {
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
    .flash_pool_reward_web {
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
    .flash_pool_apr_web {
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
    .flash_pool_action_web {
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

@media screen and (max-width: 750px) {
  .flash_list {
  }
  .flash_title {
    display: none !important;
  }
  .WEB {
    display: none !important;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
  .flash_item_wrap {
    margin: 0 10px;
  }
  .flash_item {
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

    .flash_pool_name_h5 {
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
    .flash_pool_time_h5 {
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
    .flash_pool_reward_h5 {
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
    .flash_pool_action_h5 {
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
}
</style>
