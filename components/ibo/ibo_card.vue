<template>
  <div class="ibo_item_warp" v-if="iboData">
    <div class="ibo_item" :class="{ active: iboData.time > now && iboData.name !== 'AXN'}">
      <div class="ibo_item_title">
        <p class="ibo_item_title_left">
          <img :src="require(`~/assets/img/ibo/${iboData.icon}`)" />
          <span>{{ iboData.name }}</span>
          <span
            style="margin-left: 5px; cursor: pointer"
            @click="showTip = true"
          >
            <svg
              :fill="$store.state.themes === 'dark' ? '#ffffff' : '#000000'"
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
              ></path>
            </svg>
          </span>
        </p>
        <p class="ibo_item_title_right">
          <span class="ibo_item_countdown"
            >{{ countdown.h }}{{ $t("IBO.IBO_text2") }}/{{ countdown.m
            }}{{ $t("IBO.IBO_text1") }}</span
          >
          <span class="ibo_item_status ibo_item_status_ongoing">{{
            $t(countdown.statusTxt)
          }}</span>
        </p>
      </div>
      <div v-if="iboData.status !== 3">
        <p class="ibo_item_radio">{{ iboData.ratio }}</p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text8") }}</span>
          <span class="value"
            >{{ totalTokenAmount }} {{ iboData.underlying.symbol }}</span
          >
        </p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text9") }}</span>
          <span class="value">{{ iboData.pool_info.maxAccount }}</span>
        </p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text10") }}</span>
          <span class="value">{{ (iboData.progress * 100).toFixed(2)*1 }}%</span>
        </p>
        <a class="ibo_item_progress">
          <i
            class="ibo_item_progress_bar"
            :style="
              iboData.progress > 1
                ? 'width: 100%'
                : iboData.progress == 0
                ? 'display: none'
                : 'width: ' + iboData.progress * 100 + '%'
            "
          >
          </i>
        </a>
        <div class="block">
          <span
            class="slider-max"
            v-if="this.iboData.purchasedCurrencyOf <= 0"
            @click="onMax"
            >{{ $t("Table.Max") }}</span
          >
          <template>
            <el-slider
                v-model="amount"
                :min="iboData.pool_info.min_allocation"
                :max="iboData.pool_info.max_allocation"
                show-input
                :disabled="this.iboData.purchasedCurrencyOf > 0"
            >
            </el-slider>
          </template>
          <p class="ibo_item_value slider_content">
            <span class="ibo_item_value_title">{{ $t("IBO.IBO_text11") }}</span>
            <span class="value"
              >{{ available }} {{ iboData.currency.symbol }}</span
            >
          </p>
          <p class="min_max_value">
            <span
              >{{ $t("IBO.IBO_text12")
              }}{{ iboData.pool_info.min_allocation }}</span
            >
            <span
              >{{ $t("IBO.IBO_text13")
              }}{{ iboData.pool_info.max_allocation }}</span
            >
          </p>
        </div>
        <a
          class="ibo_item_btn"
          :class="
            iboData.status !== 1 ||
            parseInt(iboData.pool_info.curUserCount) >=
              parseInt(iboData.pool_info.maxAccount)
              ? 'disabled'
              : ''
          "
          v-if="iboData.currency.allowance === '0'"
          :style="{
            background: $store.state.themes === 'dark' ? '#ffffff' : '#17173A',
            color: $store.state.themes === 'dark' ? '#000000' : '#ffffff',
          }"
          @click="onApprove"
        >
          <i class="el-icon-loading" v-if="approvalLoading"></i>
          {{
            $t(
              parseInt(iboData.pool_info.curUserCount) >=
                parseInt(iboData.pool_info.maxAccount)
                ? "IBO.IBO_text34"
                : "IBO.Approve"
            )
          }}
        </a>
        <a
          :class="
            !(
              iboData.status === 1 &&
              iboData.pool_info.curUserCount <
                iboData.pool_info.maxAccount
            ) ||
            iboData.purchasedCurrencyOf > 0 ||
            now > parseInt(iboData.timeClose)
              ? 'disabled ibo_item_btn'
              : 'ibo_item_btn'
          "
          :style="{
            background: $store.state.themes === 'dark' ? '#ffffff' : '#17173A',
            color: $store.state.themes === 'dark' ? '#000000' : '#ffffff',
          }"
          @click="onBurn"
          v-else
        >
          <i class="el-icon-loading" v-if="burnLoading"></i>
          {{
            $t(
              parseInt(iboData.pool_info.curUserCount) >=
                parseInt(iboData.pool_info.maxAccount)
                ? "IBO.IBO_text34"
                : iboData.poolType === 3 ? "IBO.IBO_join" : "Table.Burn"
            )
          }}
        </a>
      </div>
      <div v-if="iboData.status === 3" class="finished_style">
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
        <span class="ibo_item_value_title">{{
          $t("IBO.IBO_text14", { icon: iboData.currency.symbol })
        }}</span>
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
      <p class="claim_detail_btn" @click="showClaim">
        <span></span>
        <a>{{ $t("IBO.IBO_text17") }}</a>
        <span></span>
      </p>
      <div v-if="claimFlag">
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{
            $t("IBO.IBO_text18", { icon: iboData.currency.symbol })
          }}</span>
          <span class="value">{{ notUsed }}</span>
        </p>
        <p class="ibo_item_value">
          <span class="ibo_item_value_title">{{ $t("IBO.IBO_text19") }}</span>
          <span class="value">{{ volume }}</span>
        </p>
        <template v-if="iboData.poolType === 3">
          <p class="ibo_item_value">
            <span class="ibo_item_value_title">{{ $t("IBO.IBO_received") }}</span>
            <span class="value">{{ iboData.settledUnderlyingOf }}</span>
          </p>
          <p class="ibo_item_value">
            <span class="ibo_item_value_title">{{ $t("IBO.IBO_unlockVolume") }}</span>
            <span class="value">{{ iboData.settleable.unlockVolume }}</span>
          </p>
        </template>
        <a
          :class="
            this.activeClaim()
              ? 'ibo_item_btn ibo_item_claim'
              : 'ibo_item_btn ibo_item_claim disabled'
          "
          :style="{
            color:
              $store.state.themes === 'dark' && !this.activeClaim()
                ? '#000000'
                : '#ffffff',
          }"
          @click="onClaim"
        >
          <i class="el-icon-loading" v-if="claimLoading"></i>
          {{ $t("Table.Claim") }}
        </a>
        <p class="ibo_item_value" v-if="iboData.claimTimeTipI18n">
          <span class="ibo_item_value_title"
            >{{ $t("IBO.IBO_text36") }} {{ $t(iboData.claimTimeTipI18n) }}</span
          >
        </p>
        <template v-if="iboData.claimTimeTipI18nList">
          <p class="ibo_item_value" v-for="(item, index) in iboData.claimTimeTipI18nList" :key="index">
            <span class="ibo_item_value_title"
            >{{ $t("IBO.IBO_text52") }}{{index+1}}: {{ $t(item.timeTxt) }} {{item.rate}}</span
            >
          </p>
        </template>
        <template v-if="iboData.airdrop">
          <p class="ibo_item_value">
            <span class="ibo_item_value_title">{{ $t("IBO.IBO_text48") }}</span>
            <span class="value">{{ iboData.airdrop.allowList }}</span>
          </p>
          <a
            :class="
              activeAirdrop()
                ? 'ibo_item_btn ibo_item_claim'
                : 'ibo_item_btn ibo_item_claim disabled'
            "
            :style="{
              color:
                $store.state.themes === 'dark' && !activeAirdrop()
                  ? '#000000'
                  : '#ffffff',
            }"
            @click="onAirdrop"
          >
            <i class="el-icon-loading" v-if="airdropLoading"></i>
            {{ $t("Table.Claim") }}
          </a>
          <p class="ibo_item_value">
            <span class="ibo_item_value_title">{{
              $t("IBO.IBO_text49", { token: iboData.name })
            }}</span>
          </p>
        </template>
      </div>
    </div>
    <TipDialog :visible="showTip" :iboData="iboData" :onClose="() => (showTip = false)"/>
  </div>
</template>

<script>
import {
  formatAmount,
  fromWei,
  getPoolInfo,
  onAirdrop_,
  onApprove_,
  onBurn_,
  onClaim_,
} from "../../interface/ibo";
import BigNumber from "bignumber.js";
import { Dialog, Input, MessageBox } from "element-ui";
import ClipboardJS from "clipboard";
import Message from "~/components/common/Message";
import TipDialog from "~/components/ibo/ibo_tip_dialog";

export default {
  components: { Dialog, Input, TipDialog },
  props: {
    pool: {
      type: Object,
    },
  },
  data() {
    return {
      iboData: null,
      showTip: false,
      amount: null,
      claimFlag: false,
      timer: null,
      now: parseInt(Date.now() / 1000),
      countdown: {
        h: "-",
        m: "-",
        statusTxt: "IBO.IBO_text3",
      },
      approvalLoading: false,
      claimLoading: false,
      burnLoading: false,
      initLoading: false,
      initTimer: null,
      airdropLoading: false,
      d_: false
    };
  },
  computed: {
    totalTokenAmount: function () {
      return new BigNumber(this.iboData.amount).toFormat();
    },
    purchasedCurrencyOf: function () {

      return fromWei(this.iboData.purchasedCurrencyOf, this.iboData.currency.decimal).toFixed(6, 1) * 1;
    },
    rate: function () {
      if (!this.iboData.settleable || this.iboData.status === 0) {
        return "-";
      }
      return fromWei(this.iboData.settleable.rate)
        .multipliedBy(new BigNumber(100))
        .toFixed(2, 1)
        .toString();
    },
    rateValue: function () {
      if (!this.iboData.settleable) {
        return "-";
      }
      return formatAmount(
        this.iboData.settleable.volume,
        this.iboData.underlying.decimal
      );
    },
    volume: function () {
      if (this.iboData.settleable) {
        return formatAmount(
          this.iboData.settleable.volume,
          this.iboData.underlying.decimal
        );
      }
      return 0;
    },
    notUsed: function () {
      if (this.iboData.settleable) {
        if (this.iboData.settleable.amount == "0") {
          return 0;
        }
        return new BigNumber(fromWei(this.iboData.settleable.amount, this.iboData.currency.decimal)).toFormat(
          6
        );
      }
      return 0;
    },
    available: function () {

      return this.getAvailable();
    },
  },
  created() {
    this.iboData = this.pool;
    this.timer = setInterval(() => {
      this.getCountdownData();
    }, 1000);
    this.initTimer = setInterval(() => {
      this.init();
    }, 16000);
    this.init();
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.initTimer);
  },
  methods: {
    copyAdress(e, text) {
      let _this = this;
      let copys = new ClipboardJS(".copy", { text: () => text });
      copys.on("success", function (e) {
        Message({
          message: "Successfully copied",
          type: "success",
          // duration: 0,
        });
        copys.destroy();
      });
      copys.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
        copys.destroy();
      });
    },
    getAvailable() {
      const purchasedCurrencyOf =
        fromWei(this.iboData.purchasedCurrencyOf, this.iboData.currency.decimal).toFixed(6, 1) * 1;
      const balanceOf = this.iboData.balanceOf || 0;
      const remainingLimit =
        this.iboData.pool_info.max_allocation - purchasedCurrencyOf;
      return Math.min(remainingLimit, balanceOf);
    },
    getCountdownData() {

      const thisTime = parseInt(new Date().getTime() / 1000);
      this.now = thisTime;
      let t = 0;
      let statusTxt = "IBO.IBO_text3";
      switch (this.iboData.status) {
        case 0:
          t = this.iboData.start_at - thisTime;
          statusTxt = "IBO.IBO_text3";
          break;
        case 1:
          if (
            this.iboData.timeClose === 0 ||
            this.iboData.timeClose > thisTime
          ) {
            t = this.iboData.timeClose - thisTime;
            statusTxt = "IBO.IBO_text4";
          } else {
            statusTxt = "IBO.IBO_text7";
          }
          break;
        case 2:
          t = this.iboData.timeSettle - thisTime;
          statusTxt = "IBO.IBO_text7";
          break;
        case 3:
          statusTxt = "IBO.IBO_text7";
      }
      let h = "-";
      let m = "-";
      if (t > 0) {
        h = Math.floor(t / 3600);
        m = Math.floor((t % 3600) / 60);
      } else if (this.iboData.status !== 2 && !this.d_) {
        this.init();
        this.d_ = true
      }
      this.countdown = {
        h,
        m,
        statusTxt,
      };
    },
    init() {
      if (this.iboData.is_coming) {
        return;
      }
      this.initLoading = true;
      getPoolInfo(this.pool).then((newPool) => {
        this.iboData = newPool;
        if (newPool.name === 'ROB') {
          console.log(newPool.name, newPool)
        }
        const purchasedCurrencyOf =
          fromWei(newPool.purchasedCurrencyOf).toFixed(6, 1) * 1;
        if (purchasedCurrencyOf > 0) {
          this.amount = purchasedCurrencyOf;
        }
        this.initLoading = false;
      });
    },
    showClaim() {
      this.claimFlag = !this.claimFlag;
    },
    onApprove() {
      if (
        this.iboData.status !== 1 ||
        this.approvalLoading ||
        parseInt(this.iboData.pool_info.curUserCount) >=
          parseInt(this.iboData.pool_info.maxAccount)
      ) {
        return;
      }
      this.approvalLoading = true;
      onApprove_(
        this.iboData.currency.address,
        this.iboData.address,
        (success) => {
          success && this.init();
          this.approvalLoading = false;
        }
      );
    },
    onBurn() {
      if (
        !this.amount ||
        isNaN(Number(this.amount)) ||
        parseInt(this.iboData.pool_info.curUserCount) >=
          parseInt(this.iboData.pool_info.maxAccount) ||
        this.iboData.purchasedCurrencyOf > 0 ||
        this.now > parseInt(this.iboData.timeClose)
      ) {
        return;
      }
      if (
        this.iboData.status === 1 &&
        !this.burnLoading
      ) {
        MessageBox.confirm(
          this.$t("IBO.IBO_text27"),
          this.$t("IBO.IBO_text33"),
          {
            confirmButtonText: this.$t("IBO.IBO_text31"),
            cancelButtonText: this.$t("IBO.IBO_text32"),
            showCancelButton: true,
            customClass: "confirm-tip",
          }
        )
          .then(() => {
            this.burnLoading = true;
            onBurn_(this.amount, this.iboData, (success) => {
              success && this.init();
              this.burnLoading = false;
            });
          })
          .catch(() => {});
      }
    },
    activeClaim() {
      return (
        this.iboData.status === 2 &&(
            (this.iboData.settleable.volume > 0 && this.iboData.poolType === 0) ||
            (this.iboData.settleable.unlockVolume > 0 && this.iboData.poolType === 3)
        )
      );
    },
    onClaim() {
      if (this.claimLoading || !this.activeClaim()) {
        return;
      }
      this.claimLoading = true;
      onClaim_(this.iboData.address, this.iboData.abi, (success) => {
        success && this.init();
        this.claimLoading = false;
      });
    },

    activeAirdrop: function () {
      return (
        this.now > this.iboData.airdrop.begin &&
        !this.iboData.airdrop.withdrawList &&
        this.iboData.airdrop.allowList > 0
      );
    },
    onAirdrop() {
      if (this.airdropLoading || !this.activeAirdrop()) {
        return;
      }
      this.airdropLoading = true;
      onAirdrop_(
        this.iboData.airdrop.address,
        this.iboData.airdrop.abi,
        (success) => {
          success && this.init();
          this.airdropLoading = false;
        }
      );
    },
    onMax() {
      const available = this.getAvailable();
      if (this.iboData.pool_info.min_allocation <= available) {
        this.amount = Math.min(
          this.iboData.pool_info.max_allocation,
          available
        );
      }
    },
  },
};
</script>

<style lang='scss'>
@import "~/assets/css/reset-element.scss";
@import "~/assets/css/themes.scss";

.claim-time-tip {
}

.copy {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-image: url("../../assets/img/helmet/copy.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  flex-shrink: 0;
}

.tip_box {
  transform: translateY(-10px);

  p {
    font-size: 16px;
    line-height: 30px;
  }
}

.ibo_item_warp {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.el-slider__button-wrapper {
  z-index: 99;
}

.ibo_item_btn {
  background: #17173a;

  &.disabled {
    cursor: default;
    background: #cccccc !important;
  }
}

.ibo_item_claim {
  &.disabled {
    cursor: default;
    background: #cccccc !important;
  }
}

.input-max-btn {
  position: absolute;
  left: 0;
  top: 10px;
  transform: translateX(-100%);
  padding: 2px 4px;
  background: #cccccc;
  color: #ffffff;
  cursor: pointer;
  border-radius: 4px;
}

.confirm-tip {
  max-width: 95vw;

  .el-button--primary {
    background: #17173a;
    border-color: #17173a;
  }
}

.slider-max {
  position: absolute;
  right: 5px;
  top: 18px;
  z-index: 9;
  width: 52px;
  height: 24px;
  background: #f8f9fa;
  border-radius: 5px;
  border: 1px solid #e8e8eb;
  color: #17173a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: #fffaf3;
    border: 1px solid #fd7e14;
    color: #fd7e14;
  }
}

.ibo_item.active {
  @include themeify {
    border-color: themed("color-fd7e14");
    box-shadow: 0px 0px 4px 0px themed("color-fd7e14");
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
      border: 1px solid themed("color-e8e8eb");
      box-shadow: 0px 0px 4px 0px themed("color-e8e8eb");
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
      background: #e8e8eb;
      border-radius: 100px;

      .ibo_item_progress_bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 6px;
        background: linear-gradient(180deg, #fdb514 0%, #fd7e14 100%);
        border-radius: 100px 0px 0px 100px;

        &:after {
          position: absolute;
          content: "";
          width: 1px;
          height: 10px;
          top: -2px;
          right: 0;
          background: #fd7e14;
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
      color: #fff;
      line-height: 40px;
      text-align: center;
      @include themeify {
        background: themed("ibo_btn");
      }
      border-radius: 5px;

      &.disabled {
        cursor: default;

        @include themeify {
          background: themed("ibo_disable");
        }
        @include themeify {
          color: themed("ibo_disable_text");
        }

        &:hover {
          @include themeify {
            background: themed("ibo_disable");
          }
          @include themeify {
            color: themed("ibo_disable_text");
          }
        }
      }

      &:hover {
        @include themeify {
          background: themed("black_button_hover");
        }
      }
    }

    &_claim {
      @include themeify {
        background: themed("color-fd7e14");
      }

      &.disabled {
        cursor: default;
        @include themeify {
          background: themed("ibo_disable");
        }
        @include themeify {
          color: themed("ibo_disable_text");
        }

        &:hover {
          @include themeify {
            background: themed("ibo_disable");
          }
          @include themeify {
            color: themed("ibo_disable_text");
          }
        }
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
        color: #fd7e14;
        line-height: 14px;

        &:hover {
          color: #fd7e14;

          &:after {
            content: "";
            position: absolute;
            top: 2px;
            right: -10px;
            width: 0;
            height: 0;
            border: 4px solid #fd7e14;
            border-left-color: transparent;
            border-bottom-color: transparent;
            border-right-color: transparent;
            transform: rotate(-180deg);
            // transition: 0.3s;
          }
        }

        &:after {
          content: "";
          position: absolute;
          top: 6px;
          right: -10px;
          width: 0;
          height: 0;
          border: 4px solid #fd7e14;
          border-left-color: transparent;
          border-bottom-color: transparent;
          border-right-color: transparent;
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
  .el-dialog {
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
      border: 1px solid themed("color-e8e8eb");
      box-shadow: 0px 0px 4px 0px themed("color-e8e8eb");
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
      background: #e8e8eb;
      border-radius: 100px;

      .ibo_item_progress_bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 6px;
        background: linear-gradient(180deg, #fdb514 0%, #fd7e14 100%);
        border-radius: 100px 0px 0px 100px;

        &:after {
          position: absolute;
          content: "";
          width: 1px;
          height: 10px;
          top: -2px;
          right: 0;
          background: #fd7e14;
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
      color: #fff;
      line-height: 40px;
      text-align: center;
      @include themeify {
        background: themed("ibo_btn");
      }
      border-radius: 5px;

      &.disabled {
        cursor: default;

        @include themeify {
          background: themed("ibo_disable");
        }
        @include themeify {
          color: themed("ibo_disable_text");
        }

        &:hover {
          @include themeify {
            background: themed("ibo_disable");
          }
          @include themeify {
            color: themed("ibo_disable_text");
          }
        }
      }

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

      &.disabled {
        cursor: default;
        @include themeify {
          background: themed("ibo_disable");
        }
        @include themeify {
          color: themed("ibo_disable_text");
        }

        &:hover {
          @include themeify {
            background: themed("ibo_disable");
          }
          @include themeify {
            color: themed("ibo_disable_text");
          }
        }
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
        color: #fd7e14;
        line-height: 14px;

        &:hover {
          color: #fd7e14;

          &:after {
            content: "";
            position: absolute;
            top: 2px;
            right: -10px;
            width: 0;
            height: 0;
            border: 4px solid #fd7e14;
            border-left-color: transparent;
            border-bottom-color: transparent;
            border-right-color: transparent;
            transform: rotate(-180deg);
            // transition: 0.3s;
          }
        }

        &:after {
          content: "";
          position: absolute;
          top: 6px;
          right: -10px;
          width: 0;
          height: 0;
          border: 4px solid #fd7e14;
          border-left-color: transparent;
          border-bottom-color: transparent;
          border-right-color: transparent;
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
