<template>
  <PDialog :title="$t('Tip.RiskWarning')" @close="closeDialog">
    <div class="risk-wraning">
      <p>{{ $t('Tip.RiskWarningContent') }}</p>
    </div>
    <template v-slot:footer>
      <div class="footer_risk">
        <div class="agreement-box" @click="toggleAgree">
          <span class="checkbox">
            <img v-if="isAgree" src="~/assets/img/helmet/checked2.png" />
            <img v-else src="~/assets/img/helmet/checked1.png" />
          </span>
          <label>{{ $t('Tip.RiskWarnCheck') }}</label>
        </div>
        <button
          class="o_button agreeButton"
          @click="confirmDialog"
          :disabled="!isAgree"
        >
          {{ $t('Table.Confirm') }}
        </button>
      </div>
    </template>
  </PDialog>
</template>
<script>
import PDialog from '~/components/common/p-dialog.vue'

export default {
  name: 'risk-warning',
  components: {
    PDialog,
  },
  data() {
    return {
      isAgree: false,
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    confirmDialog() {
      window.localStorage.setItem('readRisk', true)
      this.$emit('confirm')
    },
    toggleAgree() {
      this.isAgree = !this.isAgree
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/base.scss';
.risk-wraning {
  font-size: 16px;
  padding: 30px 20px 20px 20px;
  > p {
    line-height: 1.8;
    color: #1d1d1d;
  }
}
.footer_risk {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .agreement-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    .checkbox {
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
    label {
      font-size: 14px;
      color: #1d1d1d;
    }
  }
  .agreeButton {
    max-width: 120px;
    margin-top: 0px;
    cursor: pointer;
    &:hover {
      background: #ffa000;
    }
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      &:hover {
        background: #ffa000;
      }
    }
  }
}
</style>
