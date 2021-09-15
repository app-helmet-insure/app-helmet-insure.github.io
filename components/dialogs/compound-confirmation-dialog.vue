<template>
  <el-dialog
    top="35vh"
    center
    append-to-body
    :visible.sync="DialogVisible"
    custom-class="compound_dialog"
    @close="DialogClose"
  >
    <div class="compound_dialog_body">
      <h3 class="compound_title">Compound HELMET Earned</h3>
      <p class="compound_earn"></p>
      <i class="compound_loading"></i>
      <button class="compound_confirm" @click="DialogClose">Confirm</button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["DialogVisible", "DialogClose", "CompoundNumber", "ActiveData"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.CompoundNumber, this.ActiveData);
  },
};
</script>

<style lang='scss' >
@import "~/assets/css/themes.scss";
.compound_title {
  font-size: 16px;
  font-family: IBMPlexSans-Bold, IBMPlexSans;
  font-weight: bold;
  color: #17173a;
  line-height: 16px;
}
.compound_earn {
}
.compound_info {
  font-size: 14px;
  font-family: IBMPlexSans;
  color: #17173a;
  line-height: 16px;
  margin-top: 15px;
}

.compound_content {
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
.compound_loading {
  display: block;
  width: 24px;
  height: 24px;
  background-image: url("../../assets/img/helmet/jiazai.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
  margin-top: 15px;
}
.compound_confirm {
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
  .compound_dialog {
    border-radius: 10px !important;
    width: 400px !important;
    .el-dialog__close::before {
      font-size: 24px;
    }
    .compound_dialog_body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
@media screen and(max-width:750px) {
  .compound_dialog {
    border-radius: 10px !important;
    width: 95% !important;
    .el-dialog__close::before {
    }
    font-size: 24px;
  }
}
</style>