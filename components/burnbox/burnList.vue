<template>
  <div class="burn_list">
    <div class="burn_title">
      <h3>{{ $t("Table.BurnMining") }}</h3>
    </div>
    <div class="burn_wrap">
      <div class="burn_item_wrap" v-for="item in FixPoolList" :key="item.key">
        <div class="burn_item">
          <!-- td1 -->
          <section class="burn_pool_name_web WEB">
            <img
              :src="
                require(`~/assets/img/burnmining/${
                  item.status === 3
                    ? 'expired_' + item.stake_symbol
                    : item.stake_symbol
                }.png`)
              "
              alt=""
            />
            <span
              class="onePager"
              v-html="item.pool_name"
              @click="hadnleShowOnePager($event, item.stake_symbol)"
            ></span>
          </section>
          <!-- td2 -->
          <section class="burn_pool_earn_web WEB">
            <p>
              {{ $t("Table.EarnList") }}
              <span>{{ item.reward_symbol }} </span>
            </p>
          </section>
          <!-- td3 -->
          <section class="burn_pool_time_web WEB">
            <i></i>
            <p>
              <span v-html="item.show_time"></span>
              <span>{{ $t("Table.MIningCutdown") }}</span>
            </p>
          </section>
          <!-- td4 -->
          <section class="burn_pool_bonus_web WEB">
            <span>{{ item.total_bonus + " " + item.reward_symbol }}</span>
            <span>{{ $t("Table.Bonus") }}</span>
          </section>
          <!-- td5 -->
          <section class="burn_pool_action_web WEB">
            <button
              @click="HandleClickAction(item, 'STAKE')"
              :class="
                activeBurn == item.key &&
                showActiveBurn &&
                activeType == 'STAKE'
                  ? 'activeButton stakeFlash'
                  : 'stakeFlash'
              "
            >
              {{ $t("Table.Burn") }}
              <i class="selectDown"></i>
            </button>
            <button
              @click="HandleClickAction(item, 'CLAIM')"
              :class="
                activeBurn == item.key &&
                showActiveBurn &&
                activeType == 'CLAIM'
                  ? 'activeButton claimFlash'
                  : 'claimFlash'
              "
            >
              {{ $t("Table.ReceiveAward") }}
              <i class="selectDown"></i>
            </button>
          </section>

          <!---------------------------------------------------->
          <section class="burn_pool_name_h5 H5">
            <img
              :src="
                require(`~/assets/img/burnmining/${
                  item.status === 3
                    ? 'expired_' + item.stake_symbol
                    : item.stake_symbol
                }.png`)
              "
              alt=""
            />
            <div>
              <span
                class="onePager"
                v-html="item.pool_name"
                @click="hadnleShowOnePager($event, item.stake_symbol)"
              ></span>
              <p>
                {{ $t("Table.EarnList") }}
                <span>{{ item.reward_symbol }} </span>
              </p>
            </div>
          </section>
          <section class="burn_pool_time_h5 H5">
            <p>
              <span>{{ item.total_bonus + " " + item.reward_symbol }}</span>
              <span>{{ $t("Table.Bonus") }}</span>
            </p>
            <div>
              <i></i>
              <p>
                <span v-html="item.show_time"></span>
                <span>{{ $t("Table.MIningCutdown") }}</span>
              </p>
            </div>
          </section>
          <section class="burn_pool_action_h5 H5">
            <button
              @click="HandleClickAction(item, 'STAKE', true)"
              :class="
                activeBurn == item.key &&
                showActiveBurn &&
                activeType == 'STAKE'
                  ? 'activeButton stakeFlash'
                  : 'stakeFlash'
              "
            >
              {{ $t("Table.Burn") }}
            </button>
            <button
              @click="HandleClickAction(item, 'CLAIM', true)"
              :class="
                activeBurn == item.key &&
                showActiveBurn &&
                activeType == 'CLAIM'
                  ? 'activeButton claimFlash'
                  : 'claimFlash'
              "
            >
              {{ $t("Table.ReceiveAward") }}
            </button>
          </section>
        </div>
        <div
          class="burn_detail WEB"
          v-if="showActiveBurn && activeBurn == item.key"
        >
          <svg class="close" aria-hidden="true" @click="showActiveBurn = false">
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
          v-if="showActiveBurn && activeBurn == item.key"
        >
          <PHeader></PHeader>
          <div class="wraper">
            <div class="wraper_header">
              <h3 class="">
                {{
                  activeType == "STAKE" ? $t("Table.Burn") : $t("Table.Bonus")
                }}
              </h3>
              <svg
                class="close"
                aria-hidden="true"
                @click="showActiveBurn = false"
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
import PHeader from "~/components/common/header.vue";
import { PoolList, formatMiningPool } from "../../config/burningBox.js";
import POOL from "./burnPool.vue";
export default {
  components: {
    Wraper,
    POOL,
    PHeader,
  },
  data() {
    return {
      FixPoolList: [],
      showActiveBurn: false,
      activeType: "",
      activeData: {},
      activeBurn: "",
      activeFlag: "",
    };
  },
  mounted() {
    this.FixPoolList = formatMiningPool(PoolList);
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
      this.showActiveBurn = true;
      this.activeData = PoolData;
      this.activeType = Action;
      this.activeFlag = Flag;
      this.activeBurn = PoolData.key;
    },
    
  },
};
</script>
<style lang="scss">
@import "~/assets/css/base.scss";
.onePager {
  > i {
    cursor: pointer;
    margin-right: 4px;
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
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.burn_list {
  width: 100%;
  margin: 0 auto;
}
.burn_title {
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
.burn_detail {
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
@media screen and(min-width: 750px) {
  .H5 {
    display: none !important;
  }
  .burn_item_wrap {
    @include themeify {
      background: themed("color-ffffff");
    }
  }
  .burn_item {
    width: 100%;
    margin-top: 10px;
    padding: 0 20px;
    height: 70px;
    display: flex;
    align-items: center;
    .activeBurn {
      @include themeify {
        border: 1px solid themed("color-e8e8eb");
      }
    }
  }
  .burn_pool_name_web {
    flex: 6;
    display: flex;
    align-items: center;
    min-width: 280px;
    img {
      width: 60px;
      height: 60px;
      margin-right: 20px;
    }
    span {
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 18px;
      i {
        margin-right: 4px;
      }
    }
  }
  .burn_pool_earn_web {
    flex: 4;
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
        line-height: 14px;
        margin-left: 4px;
        min-width: 80px;
        justify-content: center;
      }
    }
  }
  .burn_pool_time_web {
    display: flex;
    align-items: center;
    flex: 5;
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
            background: themed("mining_earn");
            color: themed("color-17173a");
          }
          border-radius: 3px;
          font-size: 14px;
          font-family: IBMPlexSans;

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
  .burn_pool_bonus_web {
    flex: 4;
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
  .burn_pool_action_web {
    flex: 4;
    display: flex;
    justify-content: flex-end;
    min-width: 200px;
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
      line-height: 24px;
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

@media screen and (max-width: 750px) {
  .burn_title {
    display: none !important;
  }
  .WEB {
    display: none !important;
  }
  .burn_item_wrap {
  }
  .burn_item {
    margin: 0 10px;
    margin-top: 10px;
    padding: 10px 10px 18px;
    @include themeify {
      color: themed("color-ffffff");
    }
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    .activeBurn {
      @include themeify {
        border: 1px solid themed("color-e8e8eb");
      }
    }
    .burn_pool_name_h5 {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
      }
      div {
        display: flex;
        flex-direction: column;
        // align-items: center;
        margin-left: 20px;
        > span {
          display: flex;
          font-size: 16px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 600;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 20px;
          > i {
            margin-left: 2px;
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
          margin-top: 4px;
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
            line-height: 14px;
            margin-left: 4px;
            min-width: 80px;
            justify-content: center;
          }
        }
      }
    }
    .burn_pool_time_h5 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
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
                background: themed("mining_earn");
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
    .burn_pool_action_h5 {
      margin-top: 14px;
      display: flex;
      justify-content: space-between;
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
        min-width: 148px;
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

        line-height: 24px;
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
</style>
