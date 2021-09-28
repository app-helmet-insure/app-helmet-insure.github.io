<template>
  <div class="insurance_data">
    <ul>
      <li>
        <div class="label_data">
          <!-- 已成交保单 -->
          <p>
            <label>{{ $t("Banner.HelmetBurn") }}</label>
            <span>{{ isLogin ? addCommom(Helmetvolume, 0) : "--" }}</span>
          </p>
        </div>
        <!-- 销毁 -->
        <!-- <div>
          <p><img src="~/assets/img/icon/helmet.svg" alt="" /></p>

          <p>
            <span class="title_name">{{ $t("Banner.HelmetBurn") }}</span
            ><span class="number">{{ addCommom(Helmetvolume, 0) }}</span>
          </p>
        </div> -->
        <!-- <div>
          <p><img src="~/assets/img/icon/guard.svg" alt="" /></p>
          <p>
            <span class="title_name">{{ $t("Banner.GuardSupply") }}</span
            ><span class="number">{{ addCommom(GuardVolume, 0) }}</span>
          </p>
        </div> -->
      </li>
      <li>
        <div class="label_data">
          <!-- 已成交保单 -->
          <p>
            <label>{{ $t("Banner.ClosedPolicy") }}</label>
            <span>{{ isLogin ? HelmetVarieties : "--" }}</span>
          </p>
        </div>
      </li>
      <li>
        <!-- LONG当前总价值 -->
        <div class="label_data">
          <p>
            <label>{{ $t("Banner.LongValue") }}</label>
            <span v-if="isLogin">
              <template>
                $<countTo
                  :startVal="Number(0)"
                  :endVal="Number(TotalHelmetsBorrowedVolume)"
                  :duration="2000"
                  :decimals="2"
                />
              </template>
            </span>
            <span v-else>--</span>
          </p>
        </div>
      </li>
      <li>
        <!-- Helmet流通量 -->
        <div class="label_data">
          <p>
            <label>
              <span>{{ $t("Banner.HelmetPcice") }}</span>
              <span>
                $ {{ isLogin ? addCommom(HelmetPrice, 4) : "--" }}
                <a @click="handleClickBuy">Buy</a></span
              >
            </label>
            <span>
              From:&nbsp;
              <i></i>
              &nbsp;
              <a
                href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
                target="_blank"
              >
                pancakeswap.finance
              </a>
            </span>
          </p>
        </div>
      </li>
    </ul>
    <BuyHelmetDialog
      :DialogVisible="BuyHelmetVisible"
      :DialogClose="BuyHelmetClose"
    />
  </div>
</template>
<script>
import { fixD, addCommom } from "~/assets/js/util.js";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import {
  getLongType,
  getLongTokenValue,
  getTokenPrice,
} from "~/interface/event.js";
import countTo from "vue-count-to";
import { fromWei } from "../../web3/index.js";
import { TokenBalance } from "~/web3/index.js";
import BuyHelmetDialog from "../../components/dialogs/buy-helmet-dialog.vue";
import Web3 from "web3";
export default {
  name: "insurance_data",
  components: {
    countTo,
    BuyHelmetDialog
  },
  data() {
    return {
      addCommom,
      HelmetPrice: 0,
      isLogin: false,
      HelmetVarieties: "--",
      TotalHelmetsBorrowedVolume: 0,
      Helmetvolume: 0,
      GuardVolume: 0,
      BuyHelmetVisible: false,
    };
  },
  computed: {
    indexArray() {
      let list = this.$store.state.allIndexPrice;
      return list;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
  },
  mounted() {
    this.$nextTick(async () => {
      getLongType().then((res) => {
        this.HelmetVarieties = res;
      });
      getLongTokenValue().then((res) => {
        this.TotalHelmetsBorrowedVolume = res;
      });
      this.getHelmetVolume().then((res) => {
        console.log(res);
        this.Helmetvolume = res;
      });

      this.getHelmetPrice().then((res) => {
        this.HelmetPrice = fromWei(res.data.toTokenAmount);
      });
    });
  },
  methods: {
    handleClickBuy() {
      this.BuyHelmetVisible = true;
    },
    BuyHelmetClose() {
      this.BuyHelmetVisible = false;
    },
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.isLogin;
      }
    },
    async getHelmetPrice() {
      let helmetConrtact = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
      let busdConrtact = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
      return getTokenPrice({
        fromTokenAddress: helmetConrtact,
        toTokenAddress: busdConrtact,
        amount: "1000000000000000000",
      });
    },
    async getHelmetVolume() {
      let helmetConrtact = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
      let deadContract = "0x000000000000000000000000000000000000dead";
      return await TokenBalance(helmetConrtact, 18, deadContract);
    },
    async getGuardVolume() {
      const HttpWeb3 = new Web3(
        new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com")
      );
      let Contracts = new HttpWeb3.eth.Contract(
        ERC20ABI.abi,
        "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
      );
      return await Contracts.methods
        .balanceOf("0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699")
        .call()
        .then((res) => {
          return fromWei(res);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/themes.scss";
.insurance_data {
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
  .insurance_data {
    width: 100%;
    height: 200px;
    margin: 0 auto;
    font-size: 16px;
    color: #ffffff;
    margin-bottom: 10px;
    ul {
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: space-between;
      li {
        width: 20%;
        min-width: 230px;
        height: 120px;
        border-radius: 10px;
        > .label_data {
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
          > p {
            display: flex;
            flex-direction: column;
            text-align: left;
            label {
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              @include themeify {
                color: #fff;
              }
              line-height: 16px;
            }
            span {
              font-size: 24px;
              font-family: NotoSansOriya-Bold, NotoSansOriya;
              font-weight: bold;
              @include themeify {
                color: #fff;
              }
              line-height: 24px;
              margin-top: 16px;
            }
          }
        }
        // &:nth-of-type(1) {
        //   display: flex;
        //   flex-direction: column;
        //   justify-content: center;
        //   padding: 0 20px;
        //   > div {
        //     display: flex;
        //     align-items: center;
        //     margin: 5px 0;
        //     p {
        //       &:nth-of-type(1) {
        //         width: 36px;
        //         height: 36px;
        //         background: rgba(255, 255, 255, 0.3);
        //         border-radius: 5px;
        //         display: flex;
        //         align-items: center;
        //         justify-content: center;
        //       }
        //       &:nth-of-type(2) {
        //         margin-left: 20px;
        //         display: flex;
        //         flex-direction: column;
        //         align-items: flex-start;
        //         span {
        //           margin: 0;
        //         }
        //         .title_name {
        //           font-size: 12px;
        //           color: #ffffff;
        //         }
        //         .number {
        //           font-size: 18px;
        //           font-weight: 600;
        //           color: #ffffff;
        //         }
        //       }
        //     }
        //   }
        // }
        &:nth-of-type(4) {
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
                display: flex;
                align-items: center;
                &:nth-of-type(1) {
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  @include themeify {
                    color: #fff;
                  }
                  line-height: 16px;
                  margin-top: 0;
                }
                &:nth-of-type(2) {
                  font-size: 24px;
                  font-family: NotoSansOriya-Bold, NotoSansOriya;
                  font-weight: bold;
                  @include themeify {
                    color: #fff;
                  }
                  line-height: 24px;
                  margin-top: 16px;
                }
                > a {
                  display: block;
                  width: 38px;
                  height: 20px;
                  @include themeify {
                    background: #fff;
                  }
                  border-radius: 5px;
                  font-size: 14px;
                  font-family: IBMPlexSans-Medium, IBMPlexSans;
                  font-weight: 500;
                  color: #7b9dfe;
                  text-align: center;
                  line-height: 20px;
                  margin-left: 4px;
                }
              }
            }
            > span {
              position: absolute;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              @include themeify {
                color: #fff;
              }
              line-height: 12px;
              bottom: 12px;
              display: flex;
              align-items: center;
              i {
                display: block;
                width: 12px;
                height: 12px;
                background-image: url("../../assets/img/insurancelist/share_icon.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
              a {
                @include themeify {
                  color: #fff;
                }
                text-decoration: underline;
              }
            }
          }
        }
      }
      li:nth-of-type(1) {
        margin: 0;
        background: linear-gradient(314deg, #38ede8 0%, #20d3ce 100%);
        > div {
          background-image: url("../../assets/img/insurancelist/card4@2x.png");
        }
      }
      li:nth-of-type(2) {
        background: linear-gradient(227deg, #c48dfe 0%, #8f3fff 100%);
        box-shadow: 0px 1px 8px 0px rgba(155, 155, 155, 0.1);
        > div {
          background-image: url("../../assets/img/insurancelist/card1@2x.png");
        }
      }
      li:nth-of-type(3) {
        background: linear-gradient(222deg, #ffdb57 0%, #f76b1c 100%);
        box-shadow: 0px 1px 8px 0px rgba(155, 155, 155, 0.1);
        > div {
          background-image: url("../../assets/img/insurancelist/card2@2x.png");
        }
      }
      li:nth-of-type(4) {
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
  .insurance_data {
    width: 100%;
    height: 160px;
    font-size: 16px;
    display: flex;
    align-items: center;
    overflow: hidden;
    ::-webkit-scrollbar {
      height: 0px !important;
    }
    ul {
      display: flex;
      align-items: center;
      text-align: center;
      overflow-y: scroll;
      width: 100%;
      margin: 0 10px;
      li {
        width: 288px;
        height: 120px;
        border-radius: 10px;
        flex-shrink: 0;
        margin-left: 10px;
        > .label_data {
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
            @include themeify {
              color: #fff;
            }
            line-height: 16px;
          }
          span {
            font-size: 24px;
            font-family: NotoSansOriya-Bold, NotoSansOriya;
            font-weight: bold;
            @include themeify {
              color: #fff;
            }
            line-height: 24px;
            margin-top: 16px;
          }
        }
        // &:nth-of-type(1) {
        //   display: flex;
        //   flex-direction: column;
        //   justify-content: center;
        //   padding: 0 20px;
        //   > div {
        //     display: flex;
        //     align-items: center;
        //     margin: 5px 0;
        //     p {
        //       &:nth-of-type(1) {
        //         width: 36px;
        //         height: 36px;
        //         background: rgba(255, 255, 255, 0.3);
        //         border-radius: 5px;
        //         display: flex;
        //         align-items: center;
        //         justify-content: center;
        //       }
        //       &:nth-of-type(2) {
        //         margin-left: 20px;
        //         display: flex;
        //         flex-direction: column;
        //         align-items: flex-start;
        //         span {
        //           margin: 0;
        //         }
        //         .title_name {
        //           font-size: 12px;
        //           color: #ffffff;
        //         }
        //         .number {
        //           font-size: 18px;
        //           font-weight: 600;
        //           color: #ffffff;
        //         }
        //       }
        //     }
        //   }
        // }
        &:nth-of-type(4) {
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
                display: flex;
                align-items: center;
                &:nth-of-type(1) {
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  @include themeify {
                    color: #fff;
                  }
                  line-height: 16px;
                  margin-top: 0;
                }
                &:nth-of-type(2) {
                  font-size: 24px;
                  font-family: NotoSansOriya-Bold, NotoSansOriya;
                  font-weight: bold;
                  @include themeify {
                    color: #fff;
                  }
                  line-height: 24px;
                  margin-top: 16px;
                }
                > a {
                  display: block;
                  width: 38px;
                  height: 20px;
                  @include themeify {
                    background: #fff;
                  }
                  border-radius: 5px;
                  font-size: 14px;
                  font-family: IBMPlexSans-Medium, IBMPlexSans;
                  font-weight: 500;
                  color: #7b9dfe;
                  text-align: center;
                  line-height: 20px;
                  margin-left: 4px;
                }
              }
            }
            > span {
              position: absolute;
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              @include themeify {
                color: #fff;
              }
              line-height: 12px;
              bottom: 12px;
              display: flex;
              align-items: center;
              i {
                display: block;
                width: 12px;
                height: 12px;
                background-image: url("../../assets/img/insurancelist/share_icon.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
              a {
                @include themeify {
                  color: #fff;
                }
                text-decoration: underline;
              }
            }
          }
        }
      }
      li:nth-of-type(1) {
        margin: 0;
        background: linear-gradient(314deg, #38ede8 0%, #20d3ce 100%);
        > div {
          background-image: url("../../assets/img/insurancelist/card4@2x.png");
        }
      }
      li:nth-of-type(2) {
        margin: 0;
        background: linear-gradient(227deg, #c48dfe 0%, #8f3fff 100%);
        box-shadow: 0px 1px 8px 0px rgba(155, 155, 155, 0.1);
        margin-left: 10px;
        > div {
          background-image: url("../../assets/img/insurancelist/card1@2x.png");
        }
      }
      li:nth-of-type(3) {
        background: linear-gradient(222deg, #ffdb57 0%, #f76b1c 100%);
        box-shadow: 0px 1px 8px 0px rgba(155, 155, 155, 0.1);
        > div {
          background-image: url("../../assets/img/insurancelist/card2@2x.png");
        }
      }
      li:nth-of-type(4) {
        background: linear-gradient(222deg, #a0b9ff 0%, #4d7bfe 100%);
        box-shadow: 0px 1px 8px 0px rgba(155, 155, 155, 0.1);
        > div {
          background-image: url("../../assets/img/insurancelist/card3@2x.png");
        }
      }
    }
  }
}
</style>
