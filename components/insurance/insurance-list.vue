<template>
  <div class="insurance_list">
    <div class="insurance_title">
      <h3>保险交易</h3>
      <span>···</span>
    </div>
    <div class="insurance_type">
      <div class="insurance_text">
        <span>保险品种</span>
        <span>最新价</span>
        <span>保期</span>
        <span>操作</span>
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
                require(`~/assets/img/insurancetype/${item.InsuranceType}.png`)
              "
              alt=""
            />
            <span>{{ item.InsuranceType }}</span>
          </section>
          <section>
            <span>{{ item.InsurancePriceBNB }}BNB</span>
            <span>${{ item.InsurancePriceBUSD }}</span>
          </section>
          <section>
            <div>
              <i class="insureTime"></i>
              <p>
                <span>{{ item.InsuranceDate }}</span>
                <span>{{ item.InsuranceDay }}天</span>
              </p>
            </div>
          </section>
          <section>
            <button
              @click="buyPutInsurance(item.InsuranceType)"
              :class="
                activeInsurance == item.InsuranceType &&
                showActiveInsurance &&
                activeType == 'PUT'
                  ? 'activeButton buyPutInsurance'
                  : 'buyPutInsurance'
              "
            >
              购买腰斩险
              <i class="selectDown"></i>
            </button>
            <button
              @click="buyCallInsurance(item.InsuranceType)"
              :class="
                activeInsurance == item.InsuranceType &&
                showActiveInsurance &&
                activeType == 'CALL'
                  ? 'activeButton buyCallInsurance'
                  : 'buyCallInsurance'
              "
            >
              购买翻倍险
              <i class="selectDown"></i>
            </button>
            <button
              @click="issueInsurance(item.InsuranceType)"
              :class="
                activeInsurance == item.InsuranceType &&
                showActiveInsurance &&
                activeType == 'SELL'
                  ? 'activeButton issueInsurance'
                  : 'issueInsurance'
              "
            >
              发行保险
              <i class="selectDown"></i>
            </button>
          </section>
        </div>
        <div
          class="insurance_detail"
          v-if="showActiveInsurance && activeInsurance == item.InsuranceType"
        >
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
            v-if="activeType == 'SELL'"
          ></IssueInsurance>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fixD } from "~/assets/js/util.js";
import PutInsurance from "./put-insurance";
import CallInsurance from "./call-insurance";
import IssueInsurance from "./issue-insurance";
export default {
  components: {
    PutInsurance,
    CallInsurance,
    IssueInsurance,
  },
  data() {
    return {
      activeInsurance: "",
      showActiveInsurance: false,
      activeType: "",
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
    setTimeout(() => {
      this.InitInsuanceData;
    }, 2000);
  },
  methods: {
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
    async InitInsuanceData() {
      let InsuanceData = [
        {
          InsuranceType: "HELMET",
        },
        {
          InsuranceType: "ETH",
        },
        {
          InsuranceType: "BTCB",
        },
        {
          InsuranceType: "CAKE",
        },
        {
          InsuranceType: "CTK",
        },
        {
          InsuranceType: "BURGER",
        },
        {
          InsuranceType: "WBNB",
        },
        {
          InsuranceType: "MATH",
        },
      ];
      let InsuranceDate = this.$store.state.allDueDate[0];
      let InsurancePriceBNB = this.$store.state.allIndexPrice[1];
      let WBNB_BUSD_Price = this.$store.state.BNB_BUSD;
      var reg = new RegExp("/", "g");
      let nowTime = new Date() * 1;
      for (let i = 0; i < InsuanceData.length; i++) {
        let InsuranceTime = InsuranceDate[InsuanceData[i]["InsuranceType"]];
        let InunranceDay = Math.ceil(
          (new Date(InsuranceTime) * 1 - nowTime) / 86400000
        );
        // 保险周期
        InsuanceData[i].InsuranceDate = InsuranceTime.replace(reg, "-");
        // 保险剩余天数
        InsuanceData[i].InsuranceDay = InunranceDay;

        // BNB价格
        InsuanceData[i].InsurancePriceBNB = fixD(
          InsurancePriceBNB[InsuanceData[i]["InsuranceType"]],
          4
        );
        // BUSD价格
        InsuanceData[i].InsurancePriceBUSD = fixD(
          InsurancePriceBNB[InsuanceData[i]["InsuranceType"]] * WBNB_BUSD_Price,
          2
        );
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

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .insurance_list {
    width: 100%;
    margin: 0 auto;
  }
  .insurance_title {
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
      font-size: 24px;
      font-weight: 600;
      margin-right: 20px;
    }
  }
  .insurance_text {
    font-size: 14px;
    font-family: Sathu;
    color: rgba(23, 23, 58, 0.5);
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
        padding-left: 20px;
        flex: 3;
      }
      &:nth-of-type(4) {
        flex: 4;
        text-align: right;
        margin-right: 20px;
      }
    }
  }
  .insurance_item {
    width: 100%;
    margin-top: 10px;
    padding: 0 20px;
    background: #ffffff;
    .activeInsurance {
      border-bottom: 1px solid #e8e8eb;
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
          img {
            width: 32px;
            height: 32px;
            margin-right: 20px;
          }
          span {
            font-size: 16px;
            font-family: Helvetica;
            color: #17173a;
            line-height: 24px;
            font-weight: 600;
          }
        }
        &:nth-of-type(2) {
          flex: 3;
          display: flex;
          flex-direction: column;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #17173a;
              line-height: 14px;
              font-weight: 500;
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
        &:nth-of-type(3) {
          flex: 3;
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
                color: #17173a;
                line-height: 14px;
                font-weight: 600;
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
          justify-content: flex-end;
          .activeButton {
            border: 2px solid #fd7e14;
            padding: 0px 9px;
            color: #fd7e14;
            i {
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

            i {
              display: block;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              background-image: url("../../assets/img/insurancelist/select_down.png");
              background-size: 100%;
            }
          }
        }
      }
    }
  }
}
</style>