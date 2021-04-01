<template>
  <div class="burn_list">
    <div class="burn_title">
      <h3>{{ $t("Table.BurnMining") }}</h3>
    </div>
    <div class="burn_item" v-for="item in burnList" :key="item.earn">
      <div
        :class="
          activeBurn == item.icon && showActiveBurn
            ? 'activeBurn burn_show'
            : 'burn_show'
        "
      >
        <img
          v-if="item.dueDate == 'Expired'"
          :src="require(`~/assets/img/burnmining/expired_${item.icon}.png`)"
          alt=""
        />
        <img
          v-else
          :src="require(`~/assets/img/burnmining/${item.icon}.png`)"
          alt=""
        />
        <section>
          <span
            >{{ item.burnName }}
            <!-- <i @click="onepager(item.icon)"
              ><svg
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
                ></path></svg></i
          >-->
          </span>
        </section>
        <section>
          <p>
            {{ $t("Table.EarnList") }} <span>{{ item.earn }} </span>
          </p>
        </section>
        <section>
          <i></i>
          <p>
            <span v-if="typeof item.dueDate == 'object'">
              {{ item.dueDate.day }}<b>{{ $t("Content.DayM") }}</b> <i>/</i
              >{{ item.dueDate.hour }}<b>{{ $t("Content.HourM") }}</b>
            </span>
            <span v-else>
              {{
                item.dueDate == "Expired"
                  ? $t("Insurance.Insurance_text22")
                  : item.dueDate
              }}
            </span>
            <span>{{ $t("Table.MIningCutdown") }}</span>
          </p>
        </section>
        <section>
          <span>{{ item.bonus + " " + item.earn }}</span>
          <span>{{ $t("Table.Bonus") }}</span>
        </section>
        <section>
          <button
            @click="StakeMining(item.icon)"
            :class="
              activeBurn == item.icon && showActiveBurn && activeType == 'STAKE'
                ? 'activeButton stakeFlash'
                : 'stakeFlash'
            "
          >
            {{ $t("Table.Burn") }}
            <i class="selectDown"></i>
          </button>
          <button
            @click="ClaimMining(item.icon)"
            :class="
              activeBurn == item.icon && showActiveBurn && activeType == 'CLAIM'
                ? 'activeButton claimFlash'
                : 'claimFlash'
            "
          >
            {{ $t("Table.ReceiveAward") }}
            <i class="selectDown"></i>
          </button>
        </section>
      </div>
      <div class="burn_detail" v-if="showActiveBurn && activeBurn == item.icon">
        <svg class="close" aria-hidden="true" @click="showActiveBurn = false">
          <use xlink:href="#icon-close"></use>
        </svg>
        <HCTKBURN
          v-if="activeBurn == 'hCTK' && showActiveBurn"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HCTKBURN>
        <HCCTBURN
          v-if="activeBurn == 'HCCT' && showActiveBurn"
          :activeType="activeType"
          :TradeType="'ALL'"
        ></HCCTBURN>
      </div>
    </div>
    <div class="burn_item_h5" v-for="item in burnList" :key="item.earn + '1'">
      <section>
        <img
          v-if="item.dueDate == 'Expired'"
          :src="require(`~/assets/img/burnmining/expired_${item.icon}.png`)"
          alt=""
        />
        <img
          v-else
          :src="require(`~/assets/img/burnmining/${item.icon}.png`)"
          alt=""
        />
        <div>
          <span> {{ item.burnName }}</span>
          <p>
            {{ $t("Table.EarnList") }} <span>{{ item.earn }} </span>
          </p>
        </div>
      </section>
      <section>
        <p>
          <span>{{ item.bonus + " " + item.earn }}</span>
          <span>{{ $t("Table.Bonus") }}</span>
        </p>
        <div>
          <i></i>
          <p>
            <span v-if="typeof item.dueDate == 'object'">
              {{ item.dueDate.day }}<b>{{ $t("Content.DayM") }}</b> <i>/</i
              >{{ item.dueDate.hour }}<b>{{ $t("Content.HourM") }}</b>
            </span>
            <span v-else>
              {{
                item.dueDate == "Expired"
                  ? $t("Insurance.Insurance_text22")
                  : item.dueDate
              }}
            </span>
            <span>{{ $t("Table.MIningCutdown") }}</span>
          </p>
        </div>
      </section>
      <section>
        <button
          @click="StakeMiningH5(item.icon)"
          :class="
            activeBurn == item.icon && showActiveBurn && activeType == 'STAKE'
              ? 'activeButton stakeFlash'
              : 'stakeFlash'
          "
        >
          {{ $t("Table.Burn") }}
        </button>
        <button
          @click="ClaimMiningH5(item.icon)"
          :class="
            activeBurn == item.icon && showActiveBurn && activeType == 'CLAIM'
              ? 'activeButton claimFlash'
              : 'claimFlash'
          "
        >
          {{ $t("Table.ReceiveAward") }}
        </button>
      </section>
    </div>
    <Wraper>
      <h3 class="wraper_title">
        {{ activeType == "STAKE" ? "燃烧" : "奖励" }}
      </h3>
      <HCTKBURN
        v-if="activeBurn == 'hCTK'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HCTKBURN>
      <HCCTBURN
        v-if="activeBurn == 'HCCT'"
        :activeType="activeType"
        :TradeType="activeType"
      ></HCCTBURN>
    </Wraper>
  </div>
</template>

<script>
import Wraper from "~/components/common/wraper.vue";
import HCCTBURN from "~/components/burnbox/hcct_burn.vue";
import HCTKBURN from "~/components/burnbox/hctk_burn.vue";
export default {
  components: {
    Wraper,
    HCCTBURN,
    HCTKBURN,
  },
  data() {
    return {
      burnList: [],
      showActiveBurn: false,
      activeBurn: "",
      activeType: "",
      TradeType: "",
    };
  },
  mounted() {
    this.initBurnBox();
  },
  methods: {
    StakeMiningH5(MiningType) {
      this.activeType = "STAKE";
      this.showActiveBurn = true;
      this.Trade = "STAKE";
      this.activeBurn = MiningType;
      this.$bus.$emit("OPEN_WRAPER_PAFE", true);
    },
    ClaimMiningH5(MiningType) {
      this.activeType = "CLAIM";
      this.showActiveBurn = true;
      this.Trade = "CLAIM";
      this.activeBurn = MiningType;
      this.$bus.$emit("OPEN_WRAPER_PAFE", true);
    },
    StakeMining(MiningType) {
      console.log(MiningType);
      this.activeType = "STAKE";
      this.showActiveBurn = true;
      this.activeBurn = MiningType;
    },
    ClaimMining(MiningType) {
      this.activeType = "CLAIM";
      this.showActiveBurn = true;
      this.activeBurn = MiningType;
    },
    initBurnBox() {
      let arr = [
        {
          burnName: "hCTK Burning Box",
          earn: "hDODO",
          bonus: 10000,
          dueDate: this.getRemainTime("2021/03/23 00:00"),
          icon: "hCTK",
        },
        {
          burnName: "HCCT Burning Box",
          earn: "HCCTII",
          bonus: 100000,
          dueDate: this.getRemainTime("2021/03/19 00:00"),
          icon: "HCCT",
        },
      ];
      this.burnList = arr;
    },
    getRemainTime(time) {
      let now = new Date() * 1;
      let dueDate = time;
      dueDate = new Date(dueDate);
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
        return "Expired";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 750px) {
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
      color: #17173a;
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
    background: #ffffff;
    display: flex;
    flex-direction: column;
    .activeBurn {
      border-bottom: 1px solid #e8e8eb;
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
            display: flex;
            align-items: center;
            font-size: 16px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 600;
            color: #17173a;
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
        }
        &:nth-of-type(2) {
          flex: 4;
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
          flex: 4;
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
            background: #f8f9fa;
            border-radius: 5px;
            border: 1px solid #e8e8eb;
            margin-left: 20px;
            font-size: 14px;
            font-family: HelveticaNeue;
            color: #17173a;
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
  }
  .burn_detail {
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

@media screen and (max-width: 750px) {
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
    background: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    .activeBurn {
      border-bottom: 1px solid #e8e8eb;
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
          align-items: center;
          margin-left: 10px;
          > span {
            display: flex;
            align-items: center;
            font-size: 16px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 600;
            color: #17173a;
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
          background: #f8f9fa;
          border-radius: 5px;
          border: 1px solid #e8e8eb;
          margin-left: 20px;
          font-size: 14px;
          font-family: HelveticaNeue;
          color: #17173a;
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
          background: #f8f9fa;
          border-radius: 5px;
          border: 1px solid #e8e8eb;
          margin-left: 20px;
          font-size: 14px;
          font-family: HelveticaNeue;
          color: #17173a;
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
    height: 44px;
    padding-left: 10px;
    line-height: 44px;
  }
}
</style>
