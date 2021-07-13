<template>
  <div class="insurance_list">
    <div class="insurance_title">
      <h3>{{ $t("Insurance.Insurance_text1") }}</h3>
    </div>
    <div class="insurance_type">
      <div class="insurance_text">
        <span>{{ $t("Insurance.Insurance_text2") }}</span>
        <span>{{ $t("Insurance.Insurance_text3") }}</span>
        <span>{{ $t("Insurance.Insurance_text4") }}</span>
        <span>{{ $t("Insurance.Insurance_text5") }}</span>
      </div>
      <div
        class="insurance_item"
        v-for="item in InsuanceData"
        :key="item.InsuranceType"
      >
        <div
          :class="
            activeInsurance == item.InsuranceType && showActiveInsurance
              ? 'activeInsurance insurance_show'
              : 'insurance_show'
          "
        >
          <section>
            <img
              :src="
                require(`~/assets/img/insurancetype/${item.InsuranceImg}.png`)
              "
              alt=""
            />
            <span>{{ item.InsuranceType }}</span>
          </section>
          <section>
            <span v-if="item.InsuranceType == 'SHIB'"
              >{{ fixD(item.InsurancePriceBNB, 10) || "--" }} BNB</span
            >
            <span v-else-if="item.InsuranceType == 'COIN(BSC)'">-- BNB</span>
            <span v-else
              >{{ toRounding(item.InsurancePriceBNB, 4) || "--" }} BNB</span
            >
            <span v-if="item.InsuranceType == 'SHIB'"
              >${{ fixD(item.InsurancePriceBUSD, 10) || "--" }}</span
            >
            <span v-else-if="item.InsuranceType == 'COIN(BSC)'">$--</span>
            <span v-else
              >${{ toRounding(item.InsurancePriceBUSD, 4) || "--" }}</span
            >
          </section>
          <section>
            <div>
              <i class="insureTime"></i>
              <p>
                <span>{{ item.InsuranceDate }}</span>
                <span>{{ item.InsuranceDay }}{{ $t("Content.Day") }}</span>
              </p>
            </div>
          </section>
          <section>
            <button
              @click="buyPutInsurance(item.InsuranceType)"
              :class="
                (activeInsurance == item.InsuranceType &&
                showActiveInsurance &&
                activeType == 'PUT'
                  ? 'activeButton buyPutInsurance'
                  : 'buyPutInsurance',
                item.InsuranceImg == 'COIN' ? 'disable_insurance' : '')
              "
            >
              {{ $t("Insurance.Insurance_text6") }}
              <i class="selectDown"></i>
            </button>
            <button
              @click="buyCallInsurance(item.InsuranceType)"
              :class="
                (activeInsurance == item.InsuranceType &&
                showActiveInsurance &&
                activeType == 'CALL'
                  ? 'activeButton buyCallInsurance'
                  : 'buyCallInsurance',
                item.InsuranceImg == 'COIN' ? 'disable_insurance' : '')
              "
            >
              {{ $t("Insurance.Insurance_text7") }}
              <i class="selectDown"></i>
            </button>
            <button
              @click="issueInsurance(item.InsuranceType)"
              :class="
                (activeInsurance == item.InsuranceType &&
                showActiveInsurance &&
                activeType == 'SELL'
                  ? 'activeButton issueInsurance'
                  : 'issueInsurance',
                item.InsuranceImg == 'COIN' ? 'disable_insurance' : '')
              "
            >
              {{ $t("Insurance.Insurance_text8") }}
              <i class="selectDown"></i>
            </button>
          </section>
        </div>
        <div
          class="insurance_detail"
          v-if="showActiveInsurance && activeInsurance == item.InsuranceType"
        >
          <svg
            class="close"
            aria-hidden="true"
            @click="showActiveInsurance = false"
          >
            <use xlink:href="#icon-close"></use>
          </svg>
          <PutInsurance
            :activeInsurance="activeInsurance"
            v-if="activeType == 'PUT'"
          ></PutInsurance>
          <CallInsurance
            :activeInsurance="activeInsurance"
            v-if="activeType == 'CALL'"
          ></CallInsurance
          ><IssueInsurance
            :activeInsurance="activeInsurance"
            :InsureTypeActive="'ALL'"
            v-if="activeType == 'SELL'"
          ></IssueInsurance>
        </div>
      </div>
    </div>
    <div class="insurance_type_H5">
      <div class="insurance_text_H5">
        <span>{{ $t("Insurance.Insurance_text2") }}</span>
        <span>{{ $t("Insurance.Insurance_text3") }}</span>
      </div>
      <div
        class="insurance_item_H5"
        v-for="item in InsuanceData"
        :key="item.InsuranceType"
      >
        <section>
          <div>
            <img
              :src="
                require(`~/assets/img/insurancetype/${item.InsuranceImg}.png`)
              "
              alt=""
            />
            <span>{{ item.InsuranceType }}</span>
          </div>
          <p>
            <span v-if="item.InsuranceType == 'SHIB'"
              >{{ fixD(item.InsurancePriceBNB, 10) || "--" }} BNB</span
            >
            <span v-else-if="item.InsuranceType == 'COIN(BSC)'">-- BNB</span>
            <span v-else
              >{{ toRounding(item.InsurancePriceBNB, 4) || "--" }} BNB</span
            >
            <span v-if="item.InsuranceType == 'SHIB'"
              >${{ fixD(item.InsurancePriceBUSD, 10) || "--" }}</span
            >
            <span v-else-if="item.InsuranceType == 'COIN(BSC)'">$--</span>
            <span v-else
              >${{ toRounding(item.InsurancePriceBUSD, 4) || "--" }}</span
            >
          </p>
        </section>
        <section>
          <button
            @click="buyInsurance_h5(item.InsuranceType)"
            :class="item.InsuranceImg == 'COIN' ? 'disable_insurance' : ''"
          >
            {{ $t("Insurance.Insurance_text24") }}
          </button>
          <button
            @click="issueInsurance_h5(item.InsuranceType)"
            :class="item.InsuranceImg == 'COIN' ? 'disable_insurance' : ''"
          >
            {{ $t("Insurance.Insurance_text8") }}
          </button>
        </section>
      </div>
    </div>
    <Wraper>
      <template class="insurance_detail_H5">
        <div class="insurance_title_H5">
          <h3>
            {{ $t("Insurance.Insurance_text1") }}
          </h3>
          <svg class="icon close" aria-hidden="true" @click="close_wraper">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>

        <div class="checkType">
          <span
            @click="InsureTypeActive = 'CALL'"
            :class="InsureTypeActive == 'CALL' ? 'activeAction' : ''"
            >{{ $t("Insurance.Insurance_text7") }}</span
          >
          <span
            @click="InsureTypeActive = 'PUT'"
            :class="InsureTypeActive == 'PUT' ? 'activeAction' : ''"
            >{{ $t("Insurance.Insurance_text6") }}</span
          >
        </div>
        <div class="activePage">
          <PutInsurance
            :activeInsurance="activeInsurance"
            v-if="InsureTypeActive == 'PUT' && TradeType == 'BUY'"
          ></PutInsurance>
          <CallInsurance
            :activeInsurance="activeInsurance"
            v-if="InsureTypeActive == 'CALL' && TradeType == 'BUY'"
          ></CallInsurance>
          <IssueInsurance
            :activeInsurance="activeInsurance"
            :InsureTypeActive="InsureTypeActive"
            v-if="TradeType == 'SELL'"
          ></IssueInsurance>
        </div>
      </template>
    </Wraper>
  </div>
</template>

<script>
import { fixD, toRounding } from "~/assets/js/util.js";
import PutInsurance from "./put-insurance";
import CallInsurance from "./call-insurance";
import IssueInsurance from "./issue-insurance";
import Wraper from "~/components/common/wraper.vue";

export default {
  components: {
    PutInsurance,
    CallInsurance,
    IssueInsurance,
    Wraper,
  },
  data() {
    return {
      activeInsurance: "",
      showActiveInsurance: false,
      activeType: "",
      InsureTypeActive: "CALL", //H5 tab
      TradeType: "", // h5 action type
      toRounding,
      fixD,
    };
  },
  computed: {
    InsuranceDate() {
      return this.$store.state.allDueDate[0];
    },
    InsurancePriceBNB() {
      return this.$store.state.allIndexPrice[1];
    },
    WBNB_BUSD_Price() {
      return this.$store.state.BNB_BUSD;
    },
  },
  watch: {
    WBNB_BUSD_Price: {
      handler: "WBNB_BUSD_Price_Watch",
      immediate: true,
    },
    InsurancePriceBNB: {
      handler: "InsurancePriceBNB_Watch",
      immediate: true,
    },
  },
  mounted() {
    let timer = setTimeout(() => {
      this.InitInsuanceData;
    }, 2000);
    this.$once("hook:beforeDestroy", () => {
      clearTimeout(timer);
    });
  },
  methods: {
    buyInsurance_h5(insuranceType) {
      this.activeInsurance = insuranceType;
      this.TradeType = "BUY";
      this.$bus.$emit("OPEN_WRAPER_PAFE", true);
    },
    issueInsurance_h5(insuranceType) {
      this.activeInsurance = insuranceType;
      this.TradeType = "SELL";
      this.$bus.$emit("OPEN_WRAPER_PAFE", true);
    },
    WBNB_BUSD_Price_Watch(newValue) {
      if (newValue) {
        this.InitInsuanceData();
      }
    },
    InsurancePriceBNB_Watch(newValue) {
      if (newValue) {
        this.InitInsuanceData();
      }
    },
    close_wraper() {
      this.$bus.$emit("OPEN_WRAPER_PAFE", false);
    },
    async InitInsuanceData() {
      let InsuanceData = [
        {
          InsuranceType: "HELMET",
          InsuranceImg: "HELMET",
        },
        {
          InsuranceType: "SHIB",
          InsuranceImg: "SHIB",
        },
        {
          InsuranceType: "ETH",
          InsuranceImg: "ETH",
        },
        {
          InsuranceType: "BTCB",
          InsuranceImg: "BTCB",
        },
        {
          InsuranceType: "CAKE",
          InsuranceImg: "CAKE",
        },
        {
          InsuranceType: "CTK",
          InsuranceImg: "CTK",
        },
        {
          InsuranceType: "BURGER",
          InsuranceImg: "BURGER",
        },
        {
          InsuranceType: "WBNB",
          InsuranceImg: "WBNB",
        },
        {
          InsuranceType: "MATH",
          InsuranceImg: "MATH",
        },
        {
          InsuranceType: "COIN(BSC)",
          InsuranceImg: "COIN",
        },
      ];
      let InsuranceDate = this.$store.state.allDueDate[0];
      let InsurancePriceBNB = this.$store.state.allIndexPrice[1];
      let WBNB_BUSD_Price = this.$store.state.BNB_BUSD;
      var reg = new RegExp("/", "g");
      let nowTime = new Date() * 1;
      for (let i = 0; i < InsuanceData.length; i++) {
        let InsuranceTime = InsuranceDate[InsuanceData[i]["InsuranceType"]];
        let InunranceDay =
          Math.ceil((new Date(InsuranceTime) * 1 - nowTime) / 86400000) > 0
            ? Math.ceil((new Date(InsuranceTime) * 1 - nowTime) / 86400000)
            : 0;

        // 保险周期
        InsuanceData[i].InsuranceDate = InsuranceTime
          ? InsuranceTime.replace(reg, "-")
          : "--";
        // 保险剩余天数
        InsuanceData[i].InsuranceDay = InunranceDay || "--";

        // BNB价格
        InsuanceData[i].InsurancePriceBNB =
          InsurancePriceBNB[InsuanceData[i]["InsuranceType"]];
        // BUSD价格
        InsuanceData[i].InsurancePriceBUSD =
          InsurancePriceBNB[InsuanceData[i]["InsuranceType"]] * WBNB_BUSD_Price;
      }
      this.InsuanceData = InsuanceData;
      this.$forceUpdate();
    },
    buyPutInsurance(insuranceType) {
      this.activeInsurance = insuranceType;
      this.showActiveInsurance = true;
      this.activeType = "PUT";
    },
    buyCallInsurance(insuranceType) {
      this.activeInsurance = insuranceType;
      this.showActiveInsurance = true;
      this.activeType = "CALL";
    },
    issueInsurance(insuranceType) {
      this.activeInsurance = insuranceType;
      this.showActiveInsurance = true;
      this.activeType = "SELL";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";
@media screen and (min-width: 750px) {
  .insurance_list {
    width: 100%;
    margin: 0 auto 100px;
    min-height: 300px;
    .insurance_detail_H5 {
      display: none;
    }
    .insurance_list_H5 {
      display: none;
    }
    .insurance_type_H5 {
      display: none;
    }
    .insurance_item_H5 {
      display: none;
    }
  }

  .insurance_title {
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
      font-size: 24px;
      font-weight: 600;
      margin-right: 20px;
    }
  }

  .insurance_type > .insurance_text {
    font-size: 14px;
    font-family: Sathu;
    @include themeify {
      color: darken($color: themed("color-17173a"), $amount: 50%);
    }
    line-height: 14px;
    display: flex;
    align-items: center;
    margin: 16px 0 12px;
    span {
      &:nth-of-type(1) {
        flex: 3;
      }
      &:nth-of-type(2) {
        flex: 3;
        padding-left: 20px;
      }
      &:nth-of-type(3) {
        flex: 3;
      }
      &:nth-of-type(4) {
        flex: 4;
        text-align: right;
        margin-right: 20px;
        min-width: 420px;
      }
    }
  }
  .insurance_type > .insurance_item {
    width: 100%;
    margin-top: 10px;
    padding: 0 20px;
    @include themeify {
      background: themed("color-ffffff");
    }
    @include themeify {
      background: themed("color-ffffff");
    }
    .activeInsurance {
      @include themeify {
        border-bottom: 1px solid themed("color-e8e8eb");
      }
    }
    .insurance_show {
      height: 70px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      section {
        &:nth-of-type(1) {
          display: flex;
          align-items: center;
          flex: 3;
          min-width: 150px;
          img {
            width: 32px;
            height: 32px;
            margin-right: 20px;
          }
          span {
            font-size: 16px;
            font-family: Helvetica;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 24px;
            font-weight: 600;
          }
        }
        &:nth-of-type(2) {
          flex: 3;
          display: flex;
          flex-direction: column;
          min-width: 120px;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: IBMPlexSans;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 14px;
              font-weight: 500;
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
        &:nth-of-type(3) {
          flex: 3;
          min-width: 200px;
          > div {
            display: flex;
            align-items: center;
          }
          i {
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
            span {
              &:nth-of-type(1) {
                font-size: 14px;
                font-family: IBMPlexSans;
                @include themeify {
                  color: themed("color-17173a");
                }
                line-height: 14px;
                font-weight: 500;
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
          justify-content: flex-end;
          min-width: 420px;
          .activeButton {
            border: 2px solid #fd7e14 !important;
            padding: 0px 9px !important;
            color: #fd7e14 !important;
            @include themeify {
              background: themed("color-fffaf3");
            }
            i {
              border-right: 5px solid transparent;
              border-top: 6px solid #fd7e14;
              border-left: 5px solid transparent;
              transform: rotate(180deg);
            }
          }
          button {
            padding: 0px 10px;
            height: 40px;
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
              height: 40px;
              border: 2px solid #fd7e14 !important;
              color: #fd7e14 !important;
              @include themeify {
                background: themed("color-fffaf3");
              }
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
              border-top: 6px solid
                darken($color: themed("color-17173a"), $amount: 0.6);
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
          .disable_insurance {
            @include themeify {
              color: themed("insure_button_disable");
              pointer-events: none;
            }
          }
        }
      }
    }
    .insurance_detail {
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
  .insurance_list {
    width: 100%;
    @include themeify {
      background: themed("color-f8f9fa");
    }
    padding: 20px 10px 50px;
    .insurance_detail {
      display: none;
    }
    .insurance_list {
      display: none;
    }
    .insurance_type {
      display: none;
    }
    .insurance_item {
      display: none;
    }
    .insurance_title {
      display: none;
    }
    .insurance_text {
      display: none;
    }
  }
  .insurance_title_H5 {
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

  .insurance_type_H5 {
    width: 100%;
    padding: 0 10px;
  }
  .insurance_text_H5 {
    margin: 16px 10px 0;
    display: flex;
    span {
      flex: 1;
      font-size: 14px;
      font-family: Sathu;
      @include themeify {
        color: darken($color: themed("color-17173a"), $amount: 50%);
      }
      line-height: 14px;
      &:nth-of-type(1) {
        margin-right: 20px;
      }
      &:nth-of-type(2) {
        margin-left: 20px;
      }
    }
  }
  .insurance_item_H5 {
    width: 100%;
    padding: 16px 10px 20px;
    @include themeify {
      background: themed("color-ffffff");
    }
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
    border-radius: 5px;
    margin-top: 12px;
    section {
      &:nth-of-type(1) {
        display: flex;
        align-items: center;
        > div {
          display: flex;
          align-items: center;
          flex: 1;
          margin-right: 20px;
          img {
            width: 32px;
            height: 32px;
            margin-right: 8px;
          }
          span {
            font-size: 14px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 600;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 24px;
          }
        }
        p {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          text-align: left;
          span {
            margin-top: 4px;
            &:nth-of-type(1) {
              font-size: 12px;
              font-family: IBMPlexSans;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 12px;
            }
            &:nth-of-type(2) {
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
      &:nth-of-type(2) {
        display: flex;
        // justify-content: space-between;
        margin-top: 12px;
        button {
          flex: 1;
          min-width: 108px;
          height: 32px;
          @include themeify {
            background: themed("insure_button");
            border: 1px solid themed("insure_button_border");
            color: themed("insure_button_text");
          }
          border-radius: 5px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;

          line-height: 24px;
          &:focus {
            @include themeify {
              background: themed("color-fffaf3");
            }
            border: 2px solid #fd7e14;
            color: #fd7e14;
          }
          &:nth-of-type(1) {
            margin-right: 20px;
          }
          &:nth-of-type(2) {
            margin-left: 20px;
          }
        }
        .disable_insurance {
          @include themeify {
            color: themed("insure_button_disable");
            pointer-events: none;
          }
        }
      }
    }
  }
  .checkType {
    display: flex;
    height: 32px;
    margin: 16px 10px;
    @include themeify {
      background: themed("color-e8e8eb");
    }
    border-radius: 8px;
    align-items: center;
    padding: 0 2px;
    span {
      flex: 1;
      text-align: center;
      line-height: 32px;
      border: 1px solid transparent;
      font-size: 14px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: darken($color: themed("color-17173a"), $amount: 50%);
      }
    }
    .activeAction {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      @include themeify {
        background: themed("color-ffffff");
      }
      border-radius: 7px;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.04);
      font-size: 14px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("color-17173a");
      }
    }
  }
  .activePage {
    margin: 0 10px;
    padding: 17px 18px;
    @include themeify {
      background: themed("color-ffffff");
    }
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
    border-radius: 5px;
  }
}
</style>
