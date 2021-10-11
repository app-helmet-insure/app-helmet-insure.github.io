<template>
  <el-dialog
    top="35vh"
    title="NOTICE"
    footer
    append-to-body
    custom-class="risk_dialog"
    :visible.sync="DialogVisible"
    @close="DialogClose"
  >
    <div class="risk_dialog_body">
      <p>
        If you are a new Helmet Insure user, please do not trade any policies
        before getting a clear understanding about the trading risks and option
        trading logic. We recommend you read the 'Paper & Guide' section before
        proceeding.
      </p>
    </div>
    <div slot="footer" class="risk_dialog_footer">
      <div class="agreement_box" @click="toggleAgree">
        <span class="checkbox">
          <img v-if="isAgree" src="~/assets/img/helmet/checked2.png" />
          <img v-else src="~/assets/img/helmet/checked1.png" />
        </span>
        <label>{{ $t("Tip.RiskWarnCheck") }}</label>
      </div>
      <el-button
        type="primary"
        :disabled="!isAgree"
        @click="handleClickComfirm()"
        >Comfirm</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["DialogVisible", "DialogClose"],
  data() {
    return {
      isAgree: false,
    };
  },
  methods: {
    toggleAgree() {
      this.isAgree = !this.isAgree;
    },
    handleClickComfirm() {
      window.localStorage.setItem("readRisk", true);
      this.DialogClose();
    },
  },
};
</script>

<style lang='scss' >
@import "~/assets/css/themes.scss";
.el-dialog__title {
  font-size: 16px;
  font-weight: 600;
  @include themeify {
    color: themed("color-17173a");
  }
}
.risk_dialog_body {
  > p {
    margin-top: 10px;
    font-size: 14px;
    line-height: 24px;
    @include themeify {
      color: themed("color-17173a");
    }
  }
}
@media screen and(min-width:750px) {
  .risk_dialog {
    border-radius: 10px !important;
    width: 500px !important;
    padding: 10px 0;
    .el-dialog__close {
      margin-top: 10px;
    }
    .el-dialog__close::before {
      font-size: 24px;
    }
    .el-dialog__header {
      padding: 20px 30px 10px;
    }
    .el-dialog__body {
      padding: 10px 30px !important;
    }
    .risk_dialog_footer {
      padding: 0 10px;
      .agreement_box {
        display: flex;
        align-items: center;
        cursor: pointer;
        .checkbox {
          img {
            width: 24px;
            height: 24px;
            margin-right: 10px;
          }
        }
        label {
          font-size: 14px;
          @include themeify {
            color: themed("color-17173a");
          }
        }
      }
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
}
@media screen and(max-width:750px) {
  .risk_dialog {
    border-radius: 10px;
    width: 95% !important;
    .el-dialog__close::before {
      font-size: 24px;
    }
  }
}
</style>