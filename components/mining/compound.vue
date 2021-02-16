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
          <button class="orange" @click="closeCompound">Cancel</button>
          <button class="black" @click="confirm">Confirm</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { compound } from "~/interface/deposite";
export default {
  data() {
    return {
      showFlag: false,
      title: "Compound HELMET Earned",
      number: 0,
      pool: "",
    };
  },
  mounted() {
    this.$bus.$on("OPEN_COMPOUND", (data) => {
      this.showFlag = true;
      this.title = data.title;
      this.number = data.number;
      this.pool = data.pool;
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
      await compound(this.pool, this.pool);
    },
  },
};
</script>

<style lang='scss' scoped>
.compound_mask {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba($color: #000000, $alpha: 0.9);
  left: 0;
  top: 0;
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
    background: #fff;
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
        color: #121212;
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
        color: #ff9600;
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
        border: 1px solid #ff9600;
        font-size: 14px;
        font-weight: 500;
        color: #ff9600;
        background: transparent;
      }
      .black {
        border: 1px solid #121212;
        background: #121212;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>