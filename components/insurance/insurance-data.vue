<template>
  <div class="insurance-banner">
    <ul>
      <li>
        <div>
          <!-- 已成交保单 -->
          <p>
            <label>{{ $t("Banner.ClosedPolicy") }}</label>
            <span>{{ isLogin ? helmetVarieties : "--" }}</span>
          </p>
        </div>
      </li>
      <li>
        <!-- LONG当前总价值 -->
        <div>
          <p>
            <label>{{ $t("Banner.LongValue") }}</label>
            <span v-if="isLogin">
              <template>
                <countTo
                  :startVal="Number(0)"
                  :endVal="Number(totalHelmetsBorrowedVolume)"
                  :duration="2000"
                  :decimals="2"
                />$
              </template>
            </span>
            <span v-else>--</span>
          </p>
        </div>
      </li>
      <li>
        <!-- Helmet流通量 -->
        <div>
          <p>
            <label>
              <span>{{ $t("Banner.HelmetPcice") }}</span>
              <span> {{ isLogin ? helmetPrice : "--" }} USD </span>
            </label>
            <span>
              From:&nbsp;
              <i></i>
              &nbsp;
              <a
                href="https://exchange.pancakeswap.finance/#/swap"
                target="_blank"
              >
                pancakeswap.finance
              </a>
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import precision from '~/assets/js/precision.js'
import { fixD, addCommom, autoRounding, toRounding } from '~/assets/js/util.js'
import countTo from 'vue-count-to'
export default {
  name: 'insurance-banner',
  components: {
    countTo,
  },
  data() {
    return {
      precision: precision,
      fixD: fixD,
      addCommom: addCommom,
      helmetPrice: 0,
      isLogin: false,
    }
  },
  computed: {
    helmetVarieties() {
      // 已经成交的保险品种的种类
      return this.$store.state.helmetVarieties
    },
    totalHelmetsBorrowedVolume() {
      // 保险交易过的资金量
      return this.$store.state.totalHelmetsBorrowedVolume
    },
    longTokenCreatedVolume() {
      // 24小时Long token 铸造量
      return this.$store.state.longTokenCreatedVolume
    },
    totalHelmet() {
      return this.$store.state.assets.totalHelmet
    },
    balanceMine() {
      return this.$store.state.assets.balanceMine
    },
    claimAbleHelmet() {
      return this.$store.state.assets.claimAbleHelmet
    },
    frequency() {
      return this.$store.state.assets.validBorrowing
    },
    indexArray() {
      let list = this.$store.state.allIndexPrice
      return list
    },
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  watch: {
    indexArray: {
      handler: 'IndexWacth',
      immediate: true,
    },
    userInfo: {
      handler: 'userInfoWatch',
      immediate: true,
    },
  },
  mounted() {
    if (window.chainID == 56) {
      this.getBannerData()
    }
  },
  methods: {
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin
      }
    },
    async getBannerData() {
      setTimeout(() => {
        this.$store.dispatch('getTotalHelmet') //获取 Helmet 总量
        this.$store.dispatch('getBalanceMine') //获取 Helmet 矿山余额
        this.$store.dispatch('getClaimAbleHelmet') //获取 所有待结算 Helmet
        this.$store.dispatch('getValidBorrowing') //获取 有效成交
        this.getPrice()
      }, 2000)
    },
    getPrice() {
      this.helmetPrice = toRounding(
        precision.times(
          this.indexArray[1]['HELMET'],
          this.$store.state.BNB_BUSD
        ),
        4
      )
    },
    IndexWacth(newValue, val) {
      if (newValue) {
        this.getPrice()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/base.scss';
.insurance-banner {
  ul {
    height: 100%;
    label {
      font-size: 16px;
      color: #7d7d7d;
    }
    p {
      font-size: 26px;
      color: #dbdbdb;
    }
  }
}
@media screen and (min-width: 750px) {
  .insurance-banner {
    width: 100%;
    height: 200px;
    margin: 0 auto;
    font-size: 16px;
    color: $text-m;
    margin-bottom: 10px;
    ul {
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: space-between;
      li {
        width: 30%;
        min-width: 328px;
        height: 120px;
        border-radius: 10px;
        > div {
          width: 100%;
          height: 100%;
          display: flex;
          padding: 0 20px;
          justify-content: space-between;
          align-items: center;
          position: relative;
          background-repeat: no-repeat;
          background-size: 108px 86px;
          background-position: right bottom;
          border-radius: 10px;
        }
        p {
          display: flex;
          flex-direction: column;
          text-align: left;
          label {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #ffffff;
            line-height: 16px;
          }
          span {
            font-size: 24px;
            font-family: NotoSansOriya-Bold, NotoSansOriya;
            font-weight: bold;
            color: #ffffff;
            line-height: 24px;
            margin-top: 16px;
          }
        }
        &:nth-of-type(3) {
          position: relative;
          p {
            display: flex;
            flex-direction: column;
            text-align: left;
            label {
              display: flex;
              flex-direction: column;
              text-align: left;
              > span {
                &:nth-of-type(1) {
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  color: #ffffff;
                  line-height: 16px;
                  margin-top: 0;
                }
                &:nth-of-type(2) {
                  font-size: 24px;
                  font-family: NotoSansOriya-Bold, NotoSansOriya;
                  font-weight: bold;
                  color: #ffffff;
                  line-height: 24px;
                  margin-top: 16px;
                }
              }
            }
            > span {
              position: absolute;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #ffffff;
              line-height: 12px;
              bottom: 12px;
              display: flex;
              align-items: center;
              i {
                display: block;
                width: 12px;
                height: 12px;
                background-image: url('../../assets/img/insurancelist/share_icon.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
              a {
                color: #ffffff;
                text-decoration: underline;
              }
            }
          }
        }
      }
      li:nth-of-type(1) {
        background: linear-gradient(227deg, #c48dfe 0%, #8f3fff 100%);
        box-shadow: 0px 1px 8px 0px rgba(155, 155, 155, 0.1);
        > div {
          background-image: url("../../assets/img/insurancelist/card1@2x.png");
        }
      }
      li:nth-of-type(2) {
        background: linear-gradient(222deg, #ffdb57 0%, #f76b1c 100%);
        box-shadow: 0px 1px 8px 0px rgba(155, 155, 155, 0.1);
        > div {
          background-image: url("../../assets/img/insurancelist/card2@2x.png");
        }
      }
      li:nth-of-type(3) {
        background: linear-gradient(222deg, #a0b9ff 0%, #4d7bfe 100%);
        box-shadow: 0px 1px 8px 0px rgba(155, 155, 155, 0.1);
        > div {
          background-image: url("../../assets/img/insurancelist/card3@2x.png");
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .insurance-banner {
    padding: 20px 16px;
    font-size: 16px;
    color: $text-m;
    margin-bottom: 10px;
    ul {
      li {
        padding: 20px 20px;
        width: 100%;
        height: 120px;
        display: flex;
        justify-content: space-between;
        p {
          display: flex;
          flex-direction: column;
          text-align: left;
          position: relative;
          justify-content: center;
          span {
            margin-top: 8px;
            font-size: 20px;
            font-weight: bold;
            color: #17173a;
          }
          label {
            color: rgba(23, 23, 58, 0.4);
            span {
              display: flex;
              font-weight: normal;
              color: rgba(23, 23, 58, 0.4);
              &:nth-of-type(1) {
                font-size: 16px;
              }
              &:nth-of-type(2) {
                font-size: 14px;
                margin-top: 0;
              }
              > a {
                font-size: 14px;
                color: #fd7e14;
                font-weight: 600;
                position: relative;
                z-index: 1;
              }
            }
          }
        }
        img {
          width: 120px;
          height: 80px;
          position: absolute;
          right: 16px;
          z-index: 0;
        }
      }
      li:nth-of-type(1) {
        background: #f7f7fa;
        margin-bottom: 20px;
        border-radius: 3px;
      }
      li:nth-of-type(2) {
        background: #fd7e14;
        margin-bottom: 20px;
        border-radius: 3px;
        p {
          span {
            color: #fff !important;
          }
        }
      }
      li:nth-of-type(3) {
        background: #f7f7fa;
        border-radius: 3px;
      }
    }
  }
}
</style>
