<template>
  <div class="migration_dialog" v-if="flag">
    <div class="migration_dialog_wrap">
      <h3>{{ $t("Migration.FreeDay") }}</h3>
      <div>{{ $t("Migration.Dialog") }}</div>
      <button class="button" @click="Submit">
        {{ $t("Migration.Confirm") }}
      </button>
    </div>
  </div>
</template>

<script>
import { ApplyRewards3 } from "~/interface/write_contract.js";
import { Applied3 } from "~/interface/read_contract.js";
let StakeAddress = "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571";
let PoolAddress = "0xA21B692B92Bbf0E34334f1548a0b51837CDDD0Bb";
let Earn3Address = "0x73f15cDBeaf9818a80b748F1389d791ce488d172";
export default {
  data() {
    return {
      flag: false,
      Status: false,
    };
  },
  watch: {
    Status(value) {
      if (value) {
        this.flag = false;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getApproveStatus();
    });
  },
  methods: {
    Submit() {
      this.flag = false;
      ApplyRewards3(PoolAddress, Earn3Address, (res) => {
        if (res == "success") {
          this.Status = true;
        }
      });
    },
    async getApproveStatus() {
      let Status = await Applied3(PoolAddress, Earn3Address);
      if (!Status) {
        this.flag = true;
      }
      this.Status = Status;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
.migration_dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.5);
}
@media screen and(min-width: 750px) {
  .migration_dialog_wrap {
    width: 400px;
    min-height: 200px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    > div {
      min-height: 60px;
      padding: 0 40px;
      margin-top: 30px;
      font-weight: 600;
      line-height: 150%;
    }
    .button {
      float: right;
      margin-right: 20px;
      margin-top: 30px;
      padding: 10px 20px;
      border-radius: 5px;
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
  }
}
@media screen and(max-width: 750px) {
  .migration_dialog_wrap {
    width: 95%;
    height: 200px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    > div {
      padding: 0 40px;
      margin-top: 30px;
      font-weight: 600;
      line-height: 150%;
    }
    .button {
      float: right;
      margin-right: 20px;
      margin-top: 30px;
      padding: 10px 20px;
      border-radius: 5px;
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
  }
}
</style>