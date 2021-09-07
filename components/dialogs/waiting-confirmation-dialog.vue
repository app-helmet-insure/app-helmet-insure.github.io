<template>
  <el-dialog
    top="35vh"
    center
    append-to-body
    custom-class="waiting_dialog"
    :visible.sync="DialogVisible"
    @close="DialogClose"
  >
    <div class="waiting_dialog_body">
      <h3 class="waiting_title">Waiting For Confirmation</h3>
      <p class="waiting_info">Please Confirm the transaction in your wallet</p>
      <div class="waiting_content">
        <slot></slot>
      </div>
      <i class="waiting_loading"></i>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["DialogVisible", "DialogClose"],
  data() {
    return {};
  },
};
</script>

<style lang='scss' >
@import "~/assets/css/base.scss";
.waiting_title {
  font-size: 16px;
  font-family: IBMPlexSans-Bold, IBMPlexSans;
  font-weight: bold;
  color: #17173a;
  line-height: 16px;
}
.waiting_info {
  font-size: 14px;
  font-family: IBMPlexSans;
  color: #17173a;
  line-height: 16px;
  margin-top: 15px;
}
.waiting_content {
  margin-top: 15px;
  text-align: center;
  p {
    text-align: center;
    font-size: 14px;
    font-family: IBMPlexSans;
    color: #fd7e14;
    line-height: 20px;
  }
}
.waiting_loading {
  display: block;
  width: 36px;
  height: 36px;
  background-image: url("../../assets/img/helmet/jiazai.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
  margin-top: 15px;
}
.waiting_confirm {
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
  .waiting_dialog {
    border-radius: 10px !important;
    width: 400px !important;
    min-height: 220px;
    .el-dialog__close::before {
      font-size: 24px;
    }
    .waiting_dialog_body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
@media screen and(max-width:750px) {
  .waiting_dialog {
    border-radius: 10px;
    width: 95% !important;
    min-height: 220px;
    .el-dialog__close::before {
      font-size: 24px;
    }
  }
}
</style>