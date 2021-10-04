<template>
  <div class="governance_details">
    <div class="governance_details_infomation">
      <div class="governance_details_infomation_title">
        {{ $t("Governance.Governance_text19") }}
      </div>
      <div class="governance_details_infomation_wrap">
        <div class="between">
          <span>{{ $t("Governance.Governance_text16") }}</span>
          <span>inkymaze</span>
        </div>
        <div class="between">
          <span>{{ $t("Governance.Governance_text17") }}</span>
          <span>inkymaze</span>
        </div>
        <div class="between">
          <span>{{ $t("Governance.Governance_text18") }}</span>
          <span>inkymaze</span>
        </div>
        <div class="between">
          <span>{{ $t("Governance.Governance_text19") }}</span>
          <span>inkymaze</span>
        </div>
      </div>
    </div>
    <div class="governance_details_votes">
      <div class="governance_details_votes_title">
        {{ $t("Governance.Governance_text13") }}
      </div>
      <div class="governance_details_votes_wrap">
        <div class="governance_details_votes_slider">
          <p class="between">
            <span>YAE {{ 111 }} HELMET</span> <span>10%</span>
          </p>
          <div class="slider_wrap">
            <div class="slider_bar" :style="`width:10%`"></div>
          </div>
        </div>
        <div class="governance_details_votes_slider">
          <p class="between"><span>NO 0 HELMET</span> <span>0%</span></p>
          <div class="slider_wrap">
            <div class="slider_bar" :style="`width:0%`"></div>
          </div>
        </div>
        <div class="governance_details_votes_slider">
          <p class="between"><span>ABSTAIN 0 HELMET</span> <span>0%</span></p>
          <div class="slider_wrap">
            <div class="slider_bar" :style="`width:0%`"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="governance_details_self">
      <div class="governance_details_self_title">
        {{ $t("Governance.Governance_text21") }}
      </div>
      <div class="governance_details_self_wrap">
        <div class="governance_details_self_votes between">
          <span>YAE</span>
          <span>1000.11</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GovernanceList, formatGovernance } from "~/config/governance.js";
export default {
  data() {
    return {
      Proposal: {},
    };
  },
  mounted() {
    let Router = this.$route.params.id;
    let FixGovernanceList = formatGovernance(GovernanceList);
    this.Proposal = FixGovernanceList.filter(
      (item) => item.Router === Router
    )[0];
  },
};
</script>

<style lang='scss' scoped>
@import "~assets/css/themes.scss";
.governance_details {
  flex: 1;
}
.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.governance_details_infomation {
  min-width: 326px;
  border-radius: 10px;
  @include themeify {
    border: 1px solid themed("insure_button_border");
  }
  &_title {
    @include themeify {
      color: themed("color-17173a");
      border-bottom: 1px solid themed("insure_button_border");
    }
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    line-height: 40px;
    padding-left: 20px;
  }
  &_wrap {
    padding: 20px;
    .between {
      margin-top: 16px;
      &:nth-of-type(1) {
        margin-top: 0;
      }
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          @include themeify {
            color: themed("color-17173a");
          }
          opacity: 0.7;
          line-height: 20px;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 20px;
        }
      }
    }
  }
}
.governance_details_votes {
  margin-top: 20px;
  min-width: 326px;
  border-radius: 10px;
  @include themeify {
    border: 1px solid themed("insure_button_border");
  }
  &_title {
    @include themeify {
      color: themed("color-17173a");
      border-bottom: 1px solid themed("insure_button_border");
    }
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    line-height: 40px;
    padding-left: 20px;
  }
  &_wrap {
    padding: 20px;
  }
  &_slider {
    margin-top: 16px;
    &:nth-of-type(1) {
      margin-top: 0;
    }
    .between {
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          @include themeify {
            color: themed("color-17173a");
          }
          opacity: 0.5;
          font-weight: 600;
          line-height: 20px;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 700;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 20px;
        }
      }
    }
    .slider_wrap {
      margin-top: 6px;
      width: 100%;
      height: 6px;
      @include themeify {
        background: themed("color-e8e8eb");
      }
      border-radius: 100px;
      overflow: hidden;
      .slider_bar {
        height: 100%;
        background: linear-gradient(180deg, #fdb514 0%, #fd7e14 100%);
      }
    }
  }
}
.governance_details_self {
  margin-top: 20px;
  border-radius: 10px;
  @include themeify {
    border: 1px solid themed("insure_button_border");
  }
  &_title {
    @include themeify {
      color: themed("color-17173a");
      border-bottom: 1px solid themed("insure_button_border");
    }
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    line-height: 40px;
    padding-left: 20px;
  }
  &_wrap {
    padding: 20px;
  }
  &_votes {
    span {
      &:nth-of-type(1) {
        padding: 0 10px;
        min-width: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        background: #f8f9fa;
        border-radius: 5px;
        @include themeify {
          background: themed("color-f8f9fa");
          border: 1px solid themed("insure_button_border");
          color: themed("color-17173a");
        }
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 24px;
      }
      &:nth-of-type(2) {
        font-size: 14px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        @include themeify {
          color: themed("color-17173a");
        }
        line-height: 14px;
      }
    }
  }
}
@media screen and(min-width:750px) {
  .governance_details {
    margin-left: 20px;
  }
  .governance_details_infomation {
    min-width: 326px;
  }
  .governance_details_votes {
    min-width: 326px;
  }
  .governance_details_self {
    min-width: 326px;
  }
}
@media screen and(max-width:750px) {
  .governance_details {
    margin-top: 20px;
  }
}
</style>