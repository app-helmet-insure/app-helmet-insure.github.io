<template>
  <el-dialog
    top="35vh"
    center
    append-to-body
    custom-class="success_dialog"
    :visible.sync="DialogVisible"
    @close="DialogClose"
  >
    <div class="success_dialog_body">
      <h3 class="success_title">Transation submitted</h3>
      <a
        :href="`https://bscscan.com/tx/${SuccessHash}`"
        class="success_tx"
        target="_blank"
        >View on BscScan</a
      >
      <!-- <i class="success_loading"></i> -->
      <button class="success_confirm" @click="DialogClose">Confirm</button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["DialogVisible", "DialogClose", "SuccessHash"],
  data() {
    return {};
  },
};
</script>

<style lang='scss' >
@import "~/assets/css/themes.scss";
.success_title {
  font-size: 16px;
  font-family: IBMPlexSans-Bold, IBMPlexSans;
  font-weight: bold;
  @include themeify {
    color: themed("color-17173a");
  }
  line-height: 16px;
}
.success_tx {
  height: 18px;
  font-size: 14px;
  font-family: IBMPlexSans;
  color: #fd7e14;
  line-height: 18px;
  margin-top: 15px;
  &:hover {
    text-decoration: underline;
  }
}
.success_info {
  font-size: 14px;
  font-family: IBMPlexSans;
  @include themeify {
    color: themed("color-17173a");
  }
  line-height: 16px;
  margin-top: 15px;
}

.success_content {
  margin-top: 15px;
  width: 236px;
  p {
    text-align: center;
    font-size: 14px;
    font-family: IBMPlexSans;
    color: #fd7e14;
    line-height: 20px;
  }
}
.success_loading {
  display: block;
  width: 24px;
  height: 24px;
  background-image: url("../../assets/img/helmet/jiazai.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
  margin-top: 15px;
}
.success_confirm {
  width: 140px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 15px;
  @include themeify {
    background: themed("black_button");
    color: themed("black_button_text");
  }
  &:hover {
    @include themeify {
      background: themed("black_button_hover");
    }
  }
}
@media screen and(min-width:750px) {
  .success_dialog {
    border-radius: 10px !important;
    width: 400px !important;
    .el-dialog__close::before {
      font-size: 24px;
    }
    .success_dialog_body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
@media screen and(max-width:750px) {
  .success_dialog {
    border-radius: 10px;
    width: 95% !important;
    .el-dialog__close::before {
      font-size: 24px;
    }
  }
}
</style>