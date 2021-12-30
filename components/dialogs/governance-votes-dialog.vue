<template>
  <el-dialog
    :title="$t('Governance.Governance_text15')"
    footer
    append-to-body
    custom-class="governance_dialog"
    :close-on-click-modal="false"
    :visible="DialogVisible"
    @close="DialogClose"
  >
    <div class="governance_dialog_title between">
      <span>{{ $t("Governance.Governance_text20") }}</span>
      <p>
        <countTo
          v-if="isLogin"
          :startVal="Number(0)"
          :endVal="Number(CanDeposite)"
          :duration="1000"
          :decimals="4"
        />
        <span v-else>--</span>
        &nbsp;{{ MiningData.StakeUnit }}
      </p>
    </div>
    <div class="governance_dialog_input">
      <el-input v-model="StakeVolume" type="number" />
    </div>
    <div class="governance_dialog_button">
      <button
        @click="handleClickVotes"
        :class="
          MiningData.Status === 3 ? 'disable_button o_button' : 'o_button'
        "
      >
        {{
          ApproveStatus
            ? $t("Governance.Governance_text6")
            : $t("Table.Approve")
        }}
      </button>
    </div>
    <div class="governance_dialog_tips" v-html="$t('Governance.Tips2')"></div>
  </el-dialog>
</template> 

<script>
import countTo from "vue-count-to";

export default {
  props: [
    "DialogVisible",
    "DialogClose",
    "CanDeposite",
    "MiningData",
    "toDeposite",
    "ApproveStatus",
  ],
  components: { countTo },
  data() {
    return {
      isLogin: false,
      StakeVolume: "",
    };
  },
  computed: {
    CurrentAccount() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    CurrentAccount: {
      handler: "reloadData",
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    reloadData(Value) {
      if (Value) {
        this.isLogin = Value.isLogin;
        this.$nextTick(() => {});
      }
    },
    handleClickVotes() {
      this.toDeposite(this.StakeVolume);
    },
  },
};
</script>

<style lang='scss'>
@import "~assets/css/themes.scss";
@media screen and(min-width:750px) {
  .governance_dialog {
    border-radius: 10px !important;
    width: 450px !important;
  }
}
@media screen and(max-width:750px) {
  .governance_dialog {
    width: 95% !important;
  }
}
.governance_dialog {
  .between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    > span {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      line-height: 14px;
      @include themeify {
        color: themed("color-17173a");
      }
    }
    > p {
      display: flex;
      font-size: 14px;
      font-family: IBMPlexSans;
      font-weight: bold;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 14px;
    }
  }
}
.governance_dialog_input {
  margin-top: 10px;
}
.governance_dialog_button {
  margin-top: 20px;
  button {
    border-radius: 5px;
  }
}
.governance_dialog_tips {
  margin-top: 8px;
  height: 72px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  @include themeify {
    color: themed("color-17173a");
  }
  opacity: 0.7;
  line-height: 24px;
  > a {
    color: #fd7e14;
    text-decoration: underline;
    &:hover {
      color: #ff9600;
    }
  }
}
</style>