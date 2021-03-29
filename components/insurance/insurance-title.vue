.<template>
  <div class="insurance_title">
    <div class="strikePrice">
      <span>{{ $t("Content.InsurancePrice") }}</span>
      <span>
        {{ activeInsurance }}:
        {{
          activeType == "CALL"
            ? callStrikePrice[activeInsurance]
            : putStrikePrice[activeInsurance]
        }}
        {{
          activeType == "CALL"
            ? callStrikeUnit[activeInsurance]
            : putStrikeUnit[activeInsurance]
        }}</span
      >
    </div>
    <div class="echartPrice"></div>
    <div class="myBalance">
      <span>{{ $t("Content.UsableBalance") }}</span>
      <p>
        <span>
          <img src="~/assets/img/insurancelist/bnbCoin.png" alt="" />
          <i>{{ BalanceArray["BNB"] ? BalanceArray["BNB"] : 0 }} BNB</i>
        </span>
        <span>
          <img src="~/assets/img/insurancelist/helmetCoin.png" alt="" />
          <i
            >{{ BalanceArray["HELMET"] ? BalanceArray["HELMET"] : 0 }} HELMET</i
          ></span
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activeInsurance", "activeType"],
  data() {
    return {};
  },
  computed: {
    putStrikePrice() {
      return this.$store.state.strikePriceArray[1];
    },
    putStrikeUnit() {
      return this.$store.state.policyColArray[1];
    },
    callStrikePrice() {
      return this.$store.state.strikePriceArray[0];
    },
    callStrikeUnit() {
      return this.$store.state.policyUndArray[0];
    },
    BalanceArray() {
      return this.$store.state.BalanceArray;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 750px) {
  .insurance_title {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    .strikePrice {
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: rgba(23, 23, 58, 0.5);
          line-height: 14px;
        }
        &:nth-of-type(2) {
          margin-top: 13px;
          font-size: 16px;
          font-family: Helvetica;
          color: #17173a;
          line-height: 16px;
          font-weight: 600;
        }
      }
    }
    .echartPrice {
      width: 246px;
      height: 40px;
      background: #fcc;
      margin-left: 60px;
    }
    .myBalance {
      margin-left: 60px;
      display: flex;
      flex-direction: column;
      > span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(23, 23, 58, 0.5);
        line-height: 14px;
      }
      p {
        margin-top: 13px;
        display: flex;
        align-items: center;
        span {
          display: flex;
          align-items: center;
          &:nth-of-type(1) {
            margin-right: 20px;
          }
          img {
            width: 18px;
            height: 18px;
            margin-right: 4px;
          }
          i {
            font-size: 16px;
            font-family: Helvetica;
            color: #17173a;
            line-height: 16px;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
