<template>
  <el-dialog top="35vh" :visible.sync="DialogVisible" center>
    <div class="waiting_dialog_body">
      <h3 class="waiting_title">Waiting For Confirmation</h3>
      <a href="11" class="waiting_tx">View on BscScan</a>
      <i class="waiting_loading"></i>
      <button class="waiting_confirm">Confirm</button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["DialogVisible"],
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
.waiting_tx {
  font-size: 14px;
  font-family: IBMPlexSans;
  color: #fd7e14;
  line-height: 18px;
  margin-top: 10px;
}
.waiting_loading {
  display: block;
  width: 36px;
  height: 36px;
  background-image: url("../../assets/img/helmet/jiazai.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
  margin-top: 10px;
}
.waiting_confirm {
  width: 140px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 10px;
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
  .el-dialog {
    border-radius: 10px !important;
    width: 400px !important;
  }
  .el-dialog__close::before {
    font-size: 24px;
  }
  .waiting_dialog_body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media screen and(max-width:750px) {
  .el-dialog {
    border-radius: 10px;
    width: 95% !important;
  }
  .el-dialog__close::before {
    font-size: 24px;
  }
}
</style>