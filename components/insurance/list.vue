<template>
  <div class="insurance_list">
    <div class="insurance_title">
      <h3>{{ $t("Insurance.Insurance_text1") }}</h3>
    </div>
    <div class="insurance_type">
      <div class="insurance_text_web WEB">
        <span>{{ $t("Insurance.Insurance_text2") }}</span>
        <span>{{ $t("Insurance.Insurance_text3") }}</span>
        <span>{{ $t("Insurance.Insurance_text4") }}</span>
        <span>{{ $t("Insurance.Insurance_text5") }}</span>
      </div>
      <div class="insurance_text_h5 H5">
        <span>{{ $t("Insurance.Insurance_text2") }}</span>
        <span>{{ $t("Insurance.Insurance_text3") }}</span>
      </div>
      <div
        class="insurance_item_wrap"
        v-for="item in InsuanceData"
        :key="item.InsuranceName"
      >
        <div class="insurance_item">
          <div v-if="item.InsuranceName === 'APPLY'">
            <div class="apply WEB">
              <div>
                <img src="~/assets/img/insurancetype/APPLY.png" alt="" />
                <p>Want to add the insurance for your project?</p>
              </div>
              <a href="https://forms.gle/3Cd4Rk5YMLHMhDZp9" target="_blank">
                <i></i> Apply Now
              </a>
            </div>
            <div class="apply H5">
              <img src="~/assets/img/insurancetype/APPLY.png" alt="" />
              <div>
                <p>Want to add the insurance for your project?</p>
                <a href="https://forms.gle/3Cd4Rk5YMLHMhDZp9" target="_blank">
                  <i></i> Apply Now
                </a>
              </div>
            </div>
          </div>
          <div v-else>
            <section class="insurance_name_web WEB">
              <img :src="item.InsuranceLogo" alt="" />
              <span>{{ item.InsuranceName }}</span>
            </section>
            <section class="insurance_price_web WEB">
              <span>
                {{ fixD(item.LastPrice, item.LastPriceDecimals) }}
                {{ item.Call.UnderlyingSymbol }}
              </span>
              <span>
                $ {{ fixD(item.LastUsdtPrice, item.LastUsdtPriceDecimals) }}
              </span>
            </section>
            <section class="insurance_time_web WEB">
              <div>
                <i class="insureTime"></i>
                <p>
                  <span>{{ item.ShowExpiry }}</span>
                  <span>{{ item.ShowExpiryDay }}{{ $t("Content.Day") }}</span>
                </p>
              </div>
            </section>
            <section class="insurance_action_web WEB">
              <button
                @click="buyInsurance(item, 'Put')"
                :class="
                  ActiveInsurance == item.InsuranceName &&
                  TradeType == 'Buy' &&
                  ActiveType == 'Put'
                    ? 'activeButton buyPutInsurance'
                    : 'buyPutInsurance'
                "
              >
                {{ $t("Insurance.Insurance_text6") }}
                <i class="selectDown"></i>
              </button>
              <button
                @click="buyInsurance(item, 'Call')"
                :class="
                  ActiveInsurance == item.InsuranceName &&
                  TradeType == 'Buy' &&
                  ActiveType == 'Call'
                    ? 'activeButton buyCallInsurance'
                    : 'buyCallInsurance'
                "
              >
                {{ $t("Insurance.Insurance_text7") }}
                <i class="selectDown"></i>
              </button>
              <button
                @click="sellInsurance(item)"
                :class="
                  ActiveInsurance == item.InsuranceName && TradeType == 'Sell'
                    ? 'activeButton issueInsurance'
                    : 'issueInsurance'
                "
              >
                {{ $t("Insurance.Insurance_text8") }}
                <i class="selectDown"></i>
              </button>
            </section>
            <section class="insurance_name_h5 H5">
              <div>
                <img :src="item.InsuranceLogo" alt="" />
                <span>{{ item.InsuranceName }}</span>
              </div>
              <p>
                <span>
                  {{ fixD(item.LastPrice, item.LastPriceDecimals) }}
                  {{ item.Call.UnderlyingSymbol }}
                </span>
                <span>
                  $ {{ fixD(item.LastUsdtPrice, item.LastUsdtPriceDecimals) }}
                </span>
              </p>
            </section>
            <section class="insurance_action_h5 H5">
              <button @click="buyInsurance(item, ActiveType, true)">
                {{ $t("Insurance.Insurance_text24") }}
              </button>
              <button @click="sellInsurance(item, true)">
                {{ $t("Insurance.Insurance_text8") }}
              </button>
            </section>
          </div>
        </div>
        <div
          class="insurance_detail_web WEB"
          v-if="ActiveInsurance === item.InsuranceName"
        >
          <svg class="close" aria-hidden="true" @click="ActiveInsurance = ''">
            <use xlink:href="#icon-close"></use>
          </svg>
          <Market
            :ActiveData="ActiveData"
            :ActiveType="ActiveType"
            v-if="TradeType == 'Buy'"
          />
          <Supply
            :ActiveData="ActiveData"
            :ActiveType="'All'"
            v-if="TradeType == 'Sell'"
          />
        </div>
        <Wraper>
          <template class="insurance_detail_h5 H5">
            <div class="insurance_title_h5">
              <h3>
                {{ $t("Insurance.Insurance_text1") }}
              </h3>
              <svg class="icon close" aria-hidden="true" @click="closeWarpper">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
            <div class="checkType">
              <span
                @click="ActiveType = 'Call'"
                :class="ActiveType == 'Call' ? 'activeAction' : ''"
                >{{ $t("Insurance.Insurance_text7") }}</span
              >
              <span
                @click="ActiveType = 'Put'"
                :class="ActiveType == 'Put' ? 'activeAction' : ''"
                >{{ $t("Insurance.Insurance_text6") }}</span
              >
            </div>
            <div class="activePage">
              <Market
                :ActiveData="ActiveData"
                :ActiveType="ActiveType"
                v-if="TradeType == 'Buy'"
              />
              <Supply
                :ActiveData="ActiveData"
                :ActiveType="ActiveType"
                v-if="TradeType == 'Sell'"
              />
            </div>
          </template>
        </Wraper>
      </div>
    </div>
  </div>
</template>

<script>
import { fixD, toRounding } from "~/assets/js/util.js";
import Market from "./market";
import Supply from "./supply";
import Wraper from "~/components/common/wraper.vue";
import { InsuranceTypeList } from "../../config/insurance.js";
import { getTokenPrice } from "../../interface/event.js";
import { fromWei, toWei } from "../../web3/index.js";
export default {
  components: {
    Market,
    Supply,
    Wraper,
  },
  data() {
    return {
      ActiveType: "",

      toRounding,
      fixD,
      InsuanceData: [],
      ActiveData: [],
      ActiveType: "Call",
      ActiveInsurance: "",
      TradeType: "Buy",
    };
  },
  mounted() {
    this.formatInsuranceData();
    this.InsuanceData = InsuranceTypeList;
  },
  methods: {
    formatInsuranceData() {
      InsuranceTypeList.map(async (Item) => {
        if (Item.Call) {
          const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
          const {
            CollateralAddress,
            CollateralDecimals,
            UnderlyingAddress,
            UnderlyingDecimals,
          } = Item.Call;
          let Amount = toWei("1", CollateralDecimals);
          let Data = await getTokenPrice({
            fromTokenAddress: CollateralAddress,
            toTokenAddress: UnderlyingAddress,
            amount: Amount,
          });
          let Data1 = await getTokenPrice({
            fromTokenAddress: CollateralAddress,
            toTokenAddress: BUSD,
            amount: Amount,
          });
          return (
            (Item.LastPrice = fromWei(
              Data.data.toTokenAmount,
              UnderlyingDecimals
            )),
            (Item.LastUsdtPrice = fromWei(
              Data1.data.toTokenAmount,
              UnderlyingDecimals
            ))
          );
        }
      });
    },
    buyInsurance(data, type, isH5) {
      this.ActiveInsurance = data.InsuranceName;
      this.ActiveData = data;
      this.ActiveType = type;
      this.TradeType = "Buy";
      if (isH5) {
        this.$bus.$emit("OPEN_WRAPER_PAFE", true);
      }
    },
    sellInsurance(data, isH5) {
      this.ActiveInsurance = data.InsuranceName;
      this.ActiveData = data;
      this.TradeType = "Sell";
      if (isH5) {
        this.$bus.$emit("OPEN_WRAPER_PAFE", true);
      }
    },
    closeWarpper() {
      this.$bus.$emit("OPEN_WRAPER_PAFE", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/themes.scss";
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
@media screen and (min-width: 750px) {
  .insurance_list {
    width: 100%;
    margin: 0 auto 100px;
    min-height: 300px;
  }
  .H5 {
    display: none !important;
  }
  .insurance_text_web {
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
  .insurance_item_wrap {
    width: 100%;
    margin-top: 10px;
    padding: 0 20px;
    @include themeify {
      background: themed("color-ffffff");
    }
  }
  .insurance_item {
    width: 100%;
    div {
      width: 100%;
      display: flex;
      align-items: center;
      height: 70px;
      border-radius: 5px;
    }
    .insurance_name_web {
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
    .insurance_price_web {
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
    .insurance_time_web {
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
    .insurance_action_web {
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
  .insurance_detail_web {
    @include themeify {
      border-top: 1px solid themed("color-e8e8eb");
    }
    position: relative;
    .close {
      position: absolute;
      right: 10px;
      width: 24px;
      height: 24px;
      top: 20px;
      fill: #ccc;
      cursor: pointer;
    }
  }
  .apply {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    > div {
      display: flex;
      align-items: center;
      height: 100%;
    }
    img {
      height: 100%;
    }
    p {
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 22px;
      margin-left: 15px;
    }
    > a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 110px;
      height: 36px;
      background: #fd7e14;
      box-shadow: 0px 2px 6px 0px rgba(253, 126, 20, 0.6);
      border-radius: 3px;
      font-size: 12px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      color: #ffffff;
      line-height: 15px;
      i {
        display: block;
        width: 16px;
        height: 16px;
        background-image: url("../../assets/img/iio/add_bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        margin-right: 4px;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .WEB {
    display: none !important;
  }
  .insurance_list {
    width: 100%;
    @include themeify {
      background: themed("color-f8f9fa");
    }
    padding: 20px 10px 50px;
  }
  .insurance_title_h5 {
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
  .insurance_text_h5 {
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
  .insurance_item_wrap {
    width: 100%;
    padding: 16px 10px 20px;
    @include themeify {
      background: themed("color-ffffff");
    }
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
    border-radius: 5px;
    margin-top: 12px;
  }
  .insurance_item {
    .insurance_name_h5 {
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
    .insurance_action_h5 {
      display: flex;
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
  .checkType {
    display: flex;
    height: 32px;
    margin: 0 10px 16px 10px;
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
  .apply {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    > div {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    img {
      height: 100%;
    }
    p {
      font-size: 14px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 22px;
      margin-left: 15px;
    }
    a {
      margin-left: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 110px;
      height: 36px;
      background: #fd7e14;
      box-shadow: 0px 2px 6px 0px rgba(253, 126, 20, 0.6);
      border-radius: 3px;
      font-size: 12px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      color: #ffffff;
      line-height: 15px;
      i {
        display: block;
        width: 16px;
        height: 16px;
        background-image: url("../../assets/img/iio/add_bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        margin-right: 4px;
      }
    }
  }
}
</style>
