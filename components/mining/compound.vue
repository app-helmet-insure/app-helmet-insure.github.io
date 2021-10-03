<template>
  <transition name="onepager">
    <div class="compound_mask" v-if="showFlag">
      <div class="compound">
        <div class="title">
          <span>{{ title }}</span>
          <i @click="closeCompound"></i>
        </div>
        <div class="content">
          <p>{{ number }}</p>
        </div>
        <div class="button">
          <button class="orange" @click="closeCompound">
            {{ $t("Table.Cancel") }}
          </button>
          <button class="black" @click="confirm">
            {{ $t("Table.Confirm") }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Compound } from "~/interface/write_contract.js";
export default {
  data() {
    return {
      showFlag: false,
      title: "Compound HELMET Earned",
      number: 0,
      poolAddress: "",
      tokenDecimals: "",
    };
  },
  mounted() {
    this.$bus.$on("OPEN_COMPOUND", (data) => {
      this.showFlag = true;
      this.title = data.title;
      this.number = data.number;
      this.poolAddress = data.poolAddress;
    });
    this.$bus.$on("CLOSE_COMPOUND", () => {
      this.showFlag = false;
    });
  },
  methods: {
    closeCompound() {
      this.$bus.$emit("CLOSE_COMPOUND");
    },
    async confirm() {
      await Compound(this.poolAddress, (res) => {
        if (res == "success" || res == "error") {
          this.$bus.$emit("CLOSE_COMPOUND");
          this.$bus.$emit("GET_BALANCE");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/themes.scss";
.compound_mask {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba($color: #000000, $alpha: 0.9);
  left: 0;
  top: 0;
  z-index: 999;
}
.onepager-enter-active {
  animation: onepager-in 0.5s;
}
.onepager-leave-active {
  animation: onepager-in 0.5s reverse;
}
@keyframes onepager-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
@media screen and (min-width: 750px) {
  .compound {
    width: 368px !important;
    @include themeify {
      background: themed("color-ffffff");
    }
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    padding: 35px 30px;
    .title {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        font-weight: 600;
        @include themeify {
          color: themed("color-17173a");
        }
        line-height: 19px;
      }
      i {
        width: 24px;
        height: 24px;
        display: inline-block;
        background-repeat: no-repeat;
        background-image: url("../../assets/img/icon/guanbi.png");
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .content {
      margin: 40px 0;
      p {
        font-size: 24px;
        font-weight: bold;
        color: #fd7e14;
        line-height: 20px;
        text-align: center;
      }
    }
    .button {
      display: flex;
      justify-content: center;
      button {
        padding: 10px 26px;
        min-width: 100px;
        margin: 0px 6px;
      }
      .orange {
        border: 1px solid #fd7e14;
        font-size: 14px;
        font-weight: 500;
        color: #fd7e14;
        background: transparent;
      }
      .black {
        border: 1px solid #17173a;
        @include themeify {
          background: themed("color-17173a");
        }
        font-size: 14px;
        font-weight: 500;
        @include themeify {
          color: themed("color-ffffff");
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .compound {
    width: 90% !important;
    @include themeify {
      background: themed("color-ffffff");
    }
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    padding: 35px 30px;
    .title {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        font-weight: 600;
        @include themeify {
          color: themed("color-17173a");
        }
        line-height: 19px;
      }
      i {
        width: 24px;
        height: 24px;
        display: inline-block;
        background-repeat: no-repeat;
        background-image: url("../../assets/img/icon/guanbi.png");
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .content {
      margin: 40px 0;
      p {
        font-size: 24px;
        font-weight: bold;
        color: #fd7e14;
        line-height: 20px;
        text-align: center;
      }
    }
    .button {
      display: flex;
      justify-content: center;
      button {
        padding: 10px 26px;
        min-width: 100px;
        margin: 0px 6px;
      }
      .orange {
        border: 1px solid #fd7e14;
        font-size: 14px;
        font-weight: 500;
        color: #fd7e14;
        background: transparent;
      }
      .black {
        border: 1px solid #17173a;
        @include themeify {
          background: themed("color-17173a");
        }
        font-size: 14px;
        font-weight: 500;
        @include themeify {
          color: themed("color-ffffff");
        }
      }
    }
  }
}
</style>
