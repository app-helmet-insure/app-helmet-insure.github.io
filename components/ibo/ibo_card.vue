<template>
  <div
      class="ibo_item_warp"
      v-if="iboData"
  >
    <div class="ibo_item">
      <div class="ibo_item_title">
        <p class="ibo_item_title_left">
          <img :src='require(`~/assets/img/ibo/${iboData.icon}`)'/>
          <span>{{ iboData.name }}</span>
          <span style="margin-left: 5px;cursor:pointer;" @click="showTip = true">
            <svg

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
              ></path></svg>
          </span>
        </p>
        <p class="ibo_item_title_right">
          <span class="ibo_item_countdown">{{ countdown.d }}{{ $t("IBO.IBO_text1") }}/{{
              countdown.h
            }}{{ $t("IBO.IBO_text2") }}</span>
          <span v-if='iboData.status === 0' class="ibo_item_status ibo_item_status_ongoing">{{
              $t("IBO.IBO_text3")
            }}</span>
          <span v-if='iboData.status === 1 && (iboData.timeClose === 0 || iboData.timeClose > now)'
                class="ibo_item_status ibo_item_status_ongoing">{{ $t("IBO.IBO_text4") }}</span>
          <span v-if='iboData.status === 1 && !(iboData.timeClose === 0 || iboData.timeClose > now)'
                class="ibo_item_status ibo_item_status_ongoing">{{ $t("IBO.IBO_text5") }}</span>
          <span v-if='iboData.status === 2' class="ibo_item_status ibo_item_status_ongoing">{{
              $t("IBO.IBO_text6")
            }}</span>
          <span v-if='iboData.status === 3' class="ibo_item_status ibo_item_status_ongoing">{{
              $t("IBO.IBO_text7")
            }}</span>
        </p>
      </div>
      <div v-if='iboData.status !== 3'>
        <p class="ibo_item_radio">{{ iboData.ratio }}</p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text8") }}</span>
          <span class="value">{{ totalPurchasedAmount }} {{ iboData.totalPurchasedAmountSymbol }}</span>
        </p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text9") }}</span>
          <span class="value">{{ iboData.pool_info.maxAccount }}</span>
        </p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text10") }}</span>
          <span class="value">{{ iboData.progress * 100 }}%</span>
        </p>
        <a class="ibo_item_progress">
          <i
              class="ibo_item_progress_bar"
              :style="iboData.progress > 1 ? 'width: 100%' : iboData.progress == 0 ? 'display: none' : 'width: ' + iboData.progress * 100 + '%'">
          </i>
        </a>
        <div class="block">
          <el-slider
              v-model="amount"
              :min='iboData.pool_info.min_allocation'
              :max='iboData.pool_info.max_allocation'
              show-input>
          </el-slider>
          <p class="ibo_item_value slider_content">
            <span class="ibo_item_value_title">{{ $t("IBO.IBO_text11") }}</span>
            <span class="value">{{ $store.state.BalanceArray['HELMET'] }} {{ iboData.underlying.symbol }}</span>
          </p>
          <p class="min_max_value">
            <span>{{ $t("IBO.IBO_text12") }}{{ iboData.pool_info.min_allocation }}</span>
            <span>{{ $t("IBO.IBO_text13") }}{{ iboData.pool_info.max_allocation }}</span>
          </p>
        </div>
        <a class="ibo_item_btn" v-if="iboData.currency.allowance === '0'" @click='onApprove'>{{
            $t("Table.Approve")
          }}</a>
        <a :class="(iboData.status !== 1 || $store.state.userInfo.status !== 1) ? 'disabled ibo_item_btn' : 'ibo_item_btn'" @click='onBurn' v-else>{{ $t("Table.Burn") }}</a>
      </div>
      <div v-if='iboData.status === 3' class="finished_style">
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text20") }}</span>
          <span class="value">1.0s</span>
        </p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text21") }}</span>
          <span class="value">999%</span>
        </p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text22") }}</span>
          <span class="value">$999</span>
        </p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text23") }}</span>
          <span class="value">999 {{ iboData.underlying.symbol }}</span>
        </p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text24") }}</span>
          <span class="value">10,000 {{ iboData.underlying.symbol }}</span>
        </p>
      </div>

      <p class="ibo_item_value">
        <span class="ibo_item_value_title">{{ $t("IBO.IBO_text14", {icon: iboData.underlying.symbol}) }}</span>
        <span class="value">{{ purchasedCurrencyOf }}</span>
      </p>
      <p class="ibo_item_value">
        <span class="ibo_item_value_title">{{ $t("IBO.IBO_text15") }}</span>
        <span class="value">{{ rate }}%</span>
      </p>
      <p class="ibo_item_value">
        <span class="ibo_item_value_title">{{ $t("IBO.IBO_text16") }}</span>
        <span class="value">{{ rateValue }}</span>
      </p>
      <p class="claim_detail_btn" @click='showClaim'>
        <span></span>
        <a>{{ $t("IBO.IBO_text17") }}</a>
        <span></span>
      </p>
      <div v-if='claimFlag'>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text18", {icon: iboData.underlying.symbol}) }}</span>
          <span class="value">{{ notUsed }}</span>
        </p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text19") }}</span>
          <span class="value">{{volume}}</span>
        </p>
        <a :class="(iboData.status !== 2 || $store.state.userInfo.status !== 1) ? 'disabled ibo_item_btn ibo_item_claim' : 'ibo_item_btn ibo_item_claim'" @click='onClaim'>{{ $t("Table.Claim") }}</a>
      </div>
    </div>
    <Dialog
        title="Tip"
        :visible="showTip"
        :before-close="() => showTip = false"
        width="200">
      <div v-if="iboData.name === 'GAME1'" class="tip_box">
        <p>{{$t("IBO.IBO_text28")}}: {{$t("IBO.IBO_august") }}</p>
        <p>{{$t("IBO.IBO_text29")}}: Pancakeswap.finance</p>
        <p>TG: <a href="T.me/game1networkchat" target="_blank">T.me/game1networkchat</a></p>
        <p>{{$t("IBO.IBO_text30")}}: <a href="https://game1network.com" target="_blank">https://game1network.com</a></p>
      </div>
      <div v-else-if="iboData.name === 'UFOMO'" class="tip_box">
        <p>{{$t("IBO.IBO_text28")}}: {{$t("IBO.IBO_august2") }}</p>
        <p>{{$t("IBO.IBO_text29")}}: Pancakeswap.finance</p>
        <p>TG(EN): <a href="https://t.me/UFOMO_EN" target="_blank">https://t.me/UFOMO_EN</a></p>
        <p>TG(CN): <a href="https://t.me/UFOMO_cn" target="_blank">https://t.me/UFOMO_cn</a></p>
        <p>{{$t("IBO.IBO_text30")}}: <a href="https://crazyufo.vip/#/fomoGame" target="_blank">https://crazyufo.vip/#/fomoGame</a></p>
      </div>
    </Dialog>
  </div>
</template>

<script>
import {fromWei, getPoolInfo, onApprove_, onBurn_, onClaim_} from '../../interface/ibo'
import BigNumber from "bignumber.js";
import {Dialog} from 'element-ui'
export default {
  components: {Dialog},
  props: {
    pool: {
      type: Object
    }
  },
  data() {
    return {
      iboData: null,
      showTip: false,
      amount: 0,
      claimFlag: false,
      timer: null,
      now: parseInt(Date.now() / 1000),
      countdown: {
        d: '-',
        h: '-'
      }
    }
  },
  computed: {
    // 总释放
    totalPurchasedAmount: function () {
      return new BigNumber(this.iboData.totalPurchasedAmount).toFormat()
    },
    // 我的质押
    purchasedCurrencyOf: function () {
      return fromWei(this.iboData.purchasedCurrencyOf).toFixed(6, 1) * 1
    },
    // 中签率
    rate: function () {
      if (!this.iboData.settleable){
        return '-'
      }
      return fromWei(this.iboData.settleable.rate)
          .multipliedBy(new BigNumber(100))
          .toFixed(2, 1)
          .toString()
    },
    // 预计获得
    rateValue: function () {
      if (!this.iboData.settleable){
        return '-'
      }
      return this.iboData.settleable.volume
    },
    // 可领取
    volume: function () {
      if (this.iboData.settleable){
        return this.iboData.settleable.volume
      }
      return 0
    },
    // 未使用
    notUsed: function () {
      if (this.iboData.settleable) {
        return new BigNumber((1 - this.rate) * this.iboData.settleable.purchasedCurrencyOf).toFormat()
      }
      return 0
  }
  },
  created() {
    this.iboData = this.pool
    this.timer = setInterval(() => {
      this.getCountdownData()
    }, 1000)
    if (!this.iboData.is_coming) {
      this.init()
    }
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    getCountdownData() {
      const thisTime = new Date().getTime()
      const startTime = new Date(this.iboData.start_at * 1000)
      if (thisTime < startTime) {
        const t = startTime - thisTime
        this.countdown = {
          d: Math.floor(t / 86400000),
          h: Math.floor((t % 86400000) / 3600000)
        }
      }
    },
    init() {
      getPoolInfo(this.pool).then(newPool => {
        this.iboData = newPool
        console.log('newPool', JSON.parse(JSON.stringify(newPool)))
      })
    },
    showClaim() {
      this.claimFlag = !this.claimFlag
    },
    onApprove() {
      if (this.$store.state.userInfo.status !== 1) {
        return
      }
      console.log(this.$store.state.userInfo)
      onApprove_(this.iboData.currency.address, (success) => {
        success && this.init()
      })
    },
    onBurn() {
      if (this.iboData.status === 1 || this.$store.state.userInfo.status !== 1) {
        onBurn_(this.amount, this.iboData.currency.address, this.iboData.abi, (success) => {
          success && this.init()
        })
      }
    },
    onClaim() {
      if (this.iboData.status !== 2 || this.$store.state.userInfo.status !== 1) {
        onClaim_(this.iboData.currency.address,this.iboData.abi, (success) => {
          success && this.init()
        })
      }
    }
  }
}
</script>

<style lang='scss'>
@import "~/assets/css/reset-element.scss";
@import "~/assets/css/base.scss";

.tip_box{
  transform: translateY(-10px);
  p{
    font-size: 16px;
    line-height: 30px;
  }
}
.ibo_item_warp {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ibo_item_btn{
  background: #17173a;
  &.disabled{
    cursor: default;
    background: #cccccc!important;
  }
}
.ibo_item_claim{
  &.disabled{
    cursor: default;
    background: #cccccc!important;
  }
}

@media screen and (min-width: 750px) and (max-width: 1860px) {
  .ibo_item_warp {
    width: 33.3%;
  }
}

@media screen and (min-width: 1860px) {
  .ibo_item_warp {
    width: 25%;
  }
}

@media screen and (min-width: 2260px) {
  .ibo_item_warp {
    width: 20%;
  }
}

@media screen and (min-width: 750px) {

  .ibo_item {
    padding: 20px;
    width: 320px;
    min-height: 370px;
    @include themeify {
      background: themed("color-ffffff");
    }
    @include themeify {
      box-shadow: 0px -2px 0px 0px themed("color-e8e8eb");
    }

    border-radius: 10px;
    @include themeify {
      box-border: 1px solid themed("color-e8e8eb");
    }

    .ibo_item_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ibo_item_title_left {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      span{
        text-decoration: underline;
      }
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 28px;

      img {
        margin-right: 10px;
        width: 40px;
        height: 40px;
      }
    }

    .ibo_item_title_right {
      display: flex;
      flex-direction: column;
    }

    &_countdown {
      padding: 0 4px;
      height: 18px;
      font-size: 14px;
      font-family: IBMPlexSans;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 18px;
      @include themeify {
        background: themed("mining_earn");
      }
      border-radius: 3px;
    }

    &_status {
      margin-top: 4px;
      font-size: 12px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      @include themeify {
        color: themed("color-17173a");
      }
      opacity: 0.4;
      line-height: 12px;
      text-align: right;
    }

    &_status_ongoing {
      @include themeify {
        color: themed("color-fd7e14");
      }
      opacity: 1;
    }

    &_radio {
      margin-top: 20px;
      font-size: 18px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 28px;
    }

    &_value {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;

      .ibo_item_value_title {
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        @include themeify {
          color: themed("color-17173a");
        }
        opacity: 0.5;
        line-height: 14px;
      }

      .value {
        font-size: 14px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        @include themeify {
          color: themed("color-17173a");
        }
        line-height: 14px;
      }
    }

    &_progress {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 6px;
      background: #E8E8EB;
      border-radius: 100px;

      .ibo_item_progress_bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 6px;
        background: linear-gradient(180deg, #FDB514 0%, #FD7E14 100%);
        border-radius: 100px 0px 0px 100px;

        &:after {
          position: absolute;
          content: '';
          width: 1px;
          height: 10px;
          top: -2px;
          right: 0;
          background: #FD7E14;
        }
      }
    }

    .min_max_value {
      position: absolute;
      bottom: -3px;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      span {
        font-size: 12px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        @include themeify {
          color: themed("color-17173a");
        }
        line-height: 12px;
      }
    }

    &_btn {
      display: block;
      margin-top: 18px;
      width: 100%;
      height: 40px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFF;
      line-height: 40px;
      text-align: center;
      background: #17173A;
      @include themeify {
        background: themed("ibo_btn");
      }
      border-radius: 5px;

      &:hover {
        @include themeify {
          background: themed("ibo_btn_hover");
        }
      }
    }

    &_claim {
      @include themeify {
        background: themed("color-fd7e14");
      }

      &:hover {
        @include themeify {
          background: themed("color-fd7e14");
        }
      }
    }

    .claim_detail_btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;

      span {
        width: 84px;
        height: 1px;
        @include themeify {
          background: themed("color-e8e8eb");
        }
      }

      a {
        position: relative;
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        @include themeify {
          color: themed("color-17173a");
        }
        opacity: 0.4;
        line-height: 14px;

        &:hover {
          @include themeify {
            color: themed("color-fd7e14");
          }
          opacity: 1;

          &:after {
            content: '';
            position: absolute;
            top: 2px;
            right: -10px;
            width: 0;
            height: 0;
            @include themeify {
              border: 4px solid themed("color-fd7e14");
              border-left-color: transparent;
              border-bottom-color: transparent;
              border-right-color: transparent;
            }
            opacity: 1;
            transform: rotate(-180deg);
            // transition: 0.3s;
          }
        }

        &:after {
          content: '';
          position: absolute;
          top: 6px;
          right: -10px;
          width: 0;
          height: 0;
          @include themeify {
            border: 4px solid themed("color-17173a");
            border-left-color: transparent;
            border-bottom-color: transparent;
            border-right-color: transparent;
          }
          opacity: 0.4;
        }
      }
    }

    .finished_style {
      margin: 18px 0 20px;
      padding: 8px 10px 16px;
      @include themeify {
        background: themed("color-f8f9fa");
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .el-dialog{
    width: 90%;
  }
  .ibo_item {
    margin: 10px auto;
    padding: 20px;
    width: 320px;
    min-height: 370px;
    @include themeify {
      background: themed("color-ffffff");
    }
    @include themeify {
      box-shadow: 0px -2px 0px 0px themed("color-e8e8eb");
    }

    border-radius: 10px;
    @include themeify {
      box-border: 1px solid themed("color-e8e8eb");
    }

    .ibo_item_title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ibo_item_title_left {
      display: flex;
      align-items: center;
      font-size: 18px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 28px;

      img {
        margin-right: 10px;
        width: 40px;
        height: 40px;
      }
    }

    .ibo_item_title_right {
      display: flex;
      flex-direction: column;
    }

    &_countdown {
      padding: 0 4px;
      height: 18px;
      font-size: 14px;
      font-family: IBMPlexSans;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 18px;
      @include themeify {
        background: themed("mining_earn");
      }
      border-radius: 3px;
    }

    &_status {
      margin-top: 4px;
      font-size: 12px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      @include themeify {
        color: themed("color-17173a");
      }
      opacity: 0.4;
      line-height: 12px;
      text-align: right;
    }

    &_status_ongoing {
      @include themeify {
        color: themed("color-fd7e14");
      }
      opacity: 1;
    }

    &_radio {
      margin-top: 20px;
      font-size: 18px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 28px;
    }

    &_value {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;

      .ibo_item_value_title {
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        @include themeify {
          color: themed("color-17173a");
        }
        opacity: 0.5;
        line-height: 14px;
      }

      .value {
        font-size: 14px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        @include themeify {
          color: themed("color-17173a");
        }
        line-height: 14px;
      }
    }

    &_progress {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 6px;
      background: #E8E8EB;
      border-radius: 100px;

      .ibo_item_progress_bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 6px;
        background: linear-gradient(180deg, #FDB514 0%, #FD7E14 100%);
        border-radius: 100px 0px 0px 100px;

        &:after {
          position: absolute;
          content: '';
          width: 1px;
          height: 10px;
          top: -2px;
          right: 0;
          background: #FD7E14;
        }
      }
    }

    .min_max_value {
      position: absolute;
      bottom: -3px;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      span {
        font-size: 12px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        @include themeify {
          color: themed("color-17173a");
        }
        line-height: 12px;
      }
    }

    &_btn {
      display: block;
      margin-top: 18px;
      width: 100%;
      height: 40px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFF;
      line-height: 40px;
      text-align: center;
      @include themeify {
        background: themed("ibo_btn");
      }
      border-radius: 5px;

      &:hover {
        @include themeify {
          background: themed("ibo_btn_hover");
        }
      }
    }

    &_claim {
      @include themeify {
        background: themed("color-fd7e14");
      }

      &:hover {
        @include themeify {
          background: themed("color-fd7e14");
        }
      }
    }

    .claim_detail_btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;

      span {
        width: 84px;
        height: 1px;
        @include themeify {
          background: themed("color-e8e8eb");
        }
      }

      a {
        position: relative;
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        @include themeify {
          color: themed("color-17173a");
        }
        opacity: 0.4;
        line-height: 14px;

        &:hover {
          @include themeify {
            color: themed("color-fd7e14");
          }
          opacity: 1;

          &:after {
            content: '';
            position: absolute;
            top: 2px;
            right: -10px;
            width: 0;
            height: 0;
            @include themeify {
              border: 4px solid themed("color-fd7e14");
              border-left-color: transparent;
              border-bottom-color: transparent;
              border-right-color: transparent;
            }
            opacity: 1;
            transform: rotate(-180deg);
            // transition: 0.3s;
          }
        }

        &:after {
          content: '';
          position: absolute;
          top: 6px;
          right: -10px;
          width: 0;
          height: 0;
          @include themeify {
            border: 4px solid themed("color-17173a");
            border-left-color: transparent;
            border-bottom-color: transparent;
            border-right-color: transparent;
          }
          opacity: 0.4;
        }
      }
    }

    .finished_style {
      margin: 18px 0 20px;
      padding: 8px 10px 16px;
      @include themeify {
        background: themed("color-f8f9fa");
      }
    }
  }

}
</style>