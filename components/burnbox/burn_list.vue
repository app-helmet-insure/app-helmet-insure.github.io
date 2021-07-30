<template>
  <div class="burn_list">
    <div class="burn_title">
      <h3>{{ $t("Table.BurnMining") }}</h3>
    </div>
    <div class="burn_web">
      <div class="burn_item" v-for="item in burnList" :key="item.POOL_NAME">
        <div class="burn_show">
          <img
            :src="
              require(`~/assets/img/burnmining/${
                item.MING_TIME == 'Expired'
                  ? 'expired_' + item.TOKEN_NAME
                  : item.TOKEN_NAME
              }.png`)
            "
            alt=""
          />
          <!-- td1 -->
          <section>
            <span
              class="onePager"
              v-html="item.POOL_NAME"
              @click="hadnleShowOnePager($event, item.TOKEN_NAME)"
            ></span>
          </section>
          <!-- td2 -->
          <section>
            <p>
              {{ $t("Table.EarnList") }}
              <span>{{ item.REWARD_NAME }} </span>
            </p>
          </section>
          <!-- td3 -->
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
          <!-- td4 -->
          <section>
            <span>{{ item.TOTAL_BONUS + " " + item.REWARD_NAME }}</span>
            <span>{{ $t("Table.Bonus") }}</span>
          </section>
          <!-- td5 -->
          <section>
            <button
              @click="HandleClickAction(item, 'STAKE')"
              :class="
                activeBurn == item.INDEX &&
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
                activeBurn == item.INDEX &&
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
        </div>
        <div
          class="burn_detail"
          v-if="showActiveBurn && activeBurn == item.INDEX"
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
      </div>
    </div>
    <div class="burn_h5">
      <div
        class="burn_item_h5"
        v-for="item in burnList"
        :key="item.POOL_NAME + item.TOKEN_NAME"
      >
        <section>
          <img
            :src="
              require(`~/assets/img/burnmining/${
                item.MING_TIME == 'Expired'
                  ? 'expired_' + item.TOKEN_NAME
                  : item.TOKEN_NAME
              }.png`)
            "
            alt=""
          />
          <div>
            <span
              class="onePager"
              v-html="item.POOL_NAME"
              @click="hadnleShowOnePager($event, item.TOKEN_NAME)"
            ></span>
            <p>
              {{ $t("Table.EarnList") }}
              <span>{{ item.TOKEN_NAME }} </span>
            </p>
          </div>
        </section>
        <section>
          <p>
            <span>{{ item.TOTAL_BONUS + " " + item.TOKEN_NAME }}</span>
            <span>{{ $t("Table.Bonus") }}</span>
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
              activeBurn == item.INDEX &&
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
              activeBurn == item.INDEX &&
              showActiveBurn &&
              activeType == 'CLAIM'
                ? 'activeButton claimFlash'
                : 'claimFlash'
            "
          >
            {{ $t("Table.ReceiveAward") }}
          </button>
        </section>
        <div
          class="wraper_title"
          v-if="showActiveBurn && activeBurn == item.INDEX"
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
import POOL from "./pool.vue";
import moment from "moment";
export default {
  components: {
    Wraper,
    POOL,
    PHeader,
  },
  data() {
    return {
      burnList: [],
      showActiveBurn: false,
      activeType: "",
      activeData: {},
      activeBurn: "",
      activeFlag: "",
    };
  },
  mounted() {
    this.initBurnBox();
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
      this.showActiveBurn = true;
      this.activeData = PoolData;
      this.activeType = Action;
      this.activeFlag = Flag;
      this.activeBurn = PoolData.INDEX;
    },
    close_wraper() {
      this.$bus.$emit("OPEN_WRAPER_PAFE", false);
    },
    initBurnBox() {
      let arr = [
        {
          INDEX: "SHIBHHMCRN",
          POOL_NAME: "<i>hMCRN</i>&nbsp;Burning&nbsp;Box",
          REWARD_NAME: "hMCRN",
          TOTAL_BONUS: 2900,
          START_TIME: "2021/07/31 00:00 UTC+8",
          END_TIME: "2021/08/05 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/07/31 00:00"),
          MING_TIME: this.getRemainTime("2021/08/05 00:00"),
          TOKEN_NAME: "SHIBh",
          STAKE_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
          STAKE_DECIMALS: 12,
          REWARD_DECIMALS: 18,
          POOL_ADDRESS: "0x6ac3B230bB6F337f043E943D212D7Ae6a7174fa8",
          ONELPT_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
          REWARD_ADDRESS: "0x4c60bd0a7aa839e35882c7a9b9b240ea7e0657bf",
        },
        {
          INDEX: "SHIBHHWIZARD",
          POOL_NAME: "<i>hWIZARD</i>&nbsp;Burning&nbsp;Box",
          REWARD_NAME: "hWIZARD",
          TOTAL_BONUS: 5000,
          START_TIME: "2021/07/31 00:00 UTC+8",
          END_TIME: "2021/08/05 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/07/31 00:00"),
          MING_TIME: this.getRemainTime("2021/08/05 00:00"),
          TOKEN_NAME: "SHIBh",
          STAKE_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
          STAKE_DECIMALS: 12,
          REWARD_DECIMALS: 18,
          POOL_ADDRESS: "0x3670893F84dc477Bd0a0F4bE74B6916F4CD3074e",
          ONELPT_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
          REWARD_ADDRESS: "0x792b733af7b9b83331f90dbbd297e519258b09bc",
        },
        {
          INDEX: "BHELMETHBABY",
          POOL_NAME: "<i>BHELMET</i>&nbsp;Burning&nbsp;Box",
          REWARD_NAME: "hBABY",
          TOTAL_BONUS: 60000,
          START_TIME: "2021/06/25 00:00 UTC+8",
          END_TIME: "2021/07/08 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/06/25 00:00"),
          MING_TIME: this.getRemainTime("2021/07/08 00:00"),
          TOKEN_NAME: "BHELMET",
          STAKE_ADDRESS: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          POOL_ADDRESS: "0xA8e5F1Ad35D7980c7c1B71A177ECF84a3Ab30ba9",
          ONELPT_ADDRESS: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
          REWARD_ADDRESS: "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624",
        },
        {
          INDEX: "HFORSHIBH",
          POOL_NAME: "<i>hFOR</i>&nbsp;Burning&nbsp;Box",
          REWARD_NAME: "SHIBh",
          TOTAL_BONUS: 15000000000,
          START_TIME: "2021/05/13 00:00 UTC+8",
          END_TIME: "2021/05/28 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/05/13 00:00"),
          MING_TIME: this.getRemainTime("2021/05/28 00:00"),
          TOKEN_NAME: "hFOR",
          STAKE_ADDRESS: "0xb779F208f8d662558dF8E2b6bFE3b6305CC13389",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 12,
          POOL_ADDRESS: "0x494DEdee44af333628BBC8B860dfE7576E78d878",
          ONELPT_ADDRESS: "0xb779F208f8d662558dF8E2b6bFE3b6305CC13389",
          REWARD_ADDRESS: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
        },
        {
          INDEX: "HAUTOHTPT",
          POOL_NAME: "<i>hAUTO</i>&nbsp;Burning&nbsp;Box",
          REWARD_NAME: "hTPT",
          TOTAL_BONUS: 1000000,
          START_TIME: "2021/04/05 00:00 UTC+8",
          END_TIME: "2021/04/12 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/04/05 00:00"),
          MING_TIME: this.getRemainTime("2021/04/12 00:00"),
          TOKEN_NAME: "hAUTO",
          STAKE_ADDRESS: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 4,
          POOL_ADDRESS: "0x32eBB78cb307D00Ebb19EF22A40F0C449925Da86",
          ONELPT_ADDRESS: "0xfeF73F4eeE23E78Ee14b6D2B6108359E8fbe6112",
          REWARD_ADDRESS: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
        },
        {
          INDEX: "BNB500HTPT",
          POOL_NAME: "<i>BNB500</i>&nbsp;Burning&nbsp;Box",
          REWARD_NAME: "hTPT",
          TOTAL_BONUS: 1000000,
          START_TIME: "2021/04/05 00:00 UTC+8",
          END_TIME: "2021/04/12 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/04/05 00:00"),
          MING_TIME: this.getRemainTime("2021/04/12 00:00"),
          TOKEN_NAME: "BNB500",
          STAKE_ADDRESS: "0xe204c4c21c6ed90e37cb06cb94436614f3208d58",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 4,
          POOL_ADDRESS: "0x42401De1BA3339dE146b481C1C0A72469fBf4DB9",
          ONELPT_ADDRESS: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
          REWARD_ADDRESS: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
        },
        {
          INDEX: "HCTKHDODO",
          POOL_NAME: "<i>hCTK</i>&nbsp;Burning&nbsp;Box",
          REWARD_NAME: "hDODO",
          TOTAL_BONUS: 10000,
          START_TIME: "2021/03/16 00:00 UTC+8",
          END_TIME: "2021/03/23 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/03/16 00:00"),
          MING_TIME: this.getRemainTime("2021/03/23 00:00"),
          TOKEN_NAME: "hCTK",
          STAKE_ADDRESS: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
          STAKE_DECIMALS: 6,
          REWARD_DECIMALS: 18,
          POOL_ADDRESS: "0x6cDCD70F96C415dcA390e310127A7cac74BAa293",
          ONELPT_ADDRESS: "0x936909e72951A19a5e1d75A109B0D34f06f39838",
          REWARD_ADDRESS: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
        },
        {
          INDEX: "HCCTHCCTII",
          POOL_NAME: "<i>HCCT</i>&nbsp;Burning&nbsp;Box",
          REWARD_NAME: "HCCTII",
          TOTAL_BONUS: 100000,
          START_TIME: "2021/03/12 00:00 UTC+8",
          END_TIME: "2021/03/19 00:00 UTC+8",
          OPEN_TIME: this.getMiningTime("2021/03/12 00:00"),
          MING_TIME: this.getRemainTime("2021/03/19 00:00"),
          TOKEN_NAME: "HCCT",
          STAKE_ADDRESS: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
          STAKE_DECIMALS: 18,
          REWARD_DECIMALS: 18,
          POOL_ADDRESS: "0x88a97a7dA82655C3Ee72A078a5cD853C7db4ad9B",
          ONELPT_ADDRESS: "0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5",
          REWARD_ADDRESS: "0x9065fcbb5f73b908ac4b05bdb81601eec2065522",
        },
      ];
      this.burnList = arr;
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
        return "Expired";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .burn_h5 {
    display: none;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
  .burn_list {
    width: 100%;
    margin: 0 auto;
    .burn_item_h5 {
      display: none;
    }
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
  .burn_item {
    width: 100%;
    margin-top: 10px;
    padding: 0 20px;
    @include themeify {
      background: themed("color-ffffff");
    }
    display: flex;
    flex-direction: column;
    .activeBurn {
      @include themeify {
        border: 1px solid themed("color-e8e8eb");
      }
    }

    .burn_show {
      width: 100%;
      height: 70px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        margin-right: 20px;
      }
      section {
        &:nth-of-type(1) {
          flex: 5;
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
        &:nth-of-type(2) {
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
        &:nth-of-type(3) {
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
        &:nth-of-type(4) {
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
        &:nth-of-type(5) {
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
    }
  }
  .burn_detail {
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
  .burn_web {
    display: none;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
  .burn_list {
    width: 100%;
    margin: 0 auto;
    padding-bottom: 50px;
    .burn_item {
      display: none;
    }
  }
  .burn_title {
    display: none;
  }
  .burn_item_h5 {
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
    section {
      &:nth-of-type(1) {
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
            align-items: center;
            font-size: 16px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 600;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 16px;
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
      &:nth-of-type(2) {
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
      &:nth-of-type(3) {
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
      &:nth-of-type(4) {
        flex: 4;
        display: flex;
        flex-direction: column;
      }
      &:nth-of-type(5) {
        flex: 4;
        display: flex;
        justify-content: flex-end;
        min-width: 200px;
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
          @include themeify {
            background: themed("color-f8f9fa");
          }
          border-radius: 5px;
          @include themeify {
            border: 1px solid themed("color-e8e8eb");
          }
          margin-left: 20px;
          font-size: 14px;
          font-family: HelveticaNeue;
          @include themeify {
            color: themed("color-17173a");
          }
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
