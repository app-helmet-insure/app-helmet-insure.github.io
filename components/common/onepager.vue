<template>
  <transition name="onepager" @touchmove.prevent>
    <div class="onepager_mask" v-if="showFlag">
      <div class="onepager_wrapper">
        <div class="title">
          <i @click="closeOnepager"></i>
        </div>
        <h3>
          <span>
            {{ this.title }}
          </span>
        </h3>
        <div class="content">
          <section>
            <div>
              <p v-for="(item, index) in text" :key="index">{{ item }}</p>
            </div>
          </section>
          <div class="bg"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import onepagerList from "./onepager.js";
export default {
  data() {
    return {
      showFlag: false,
      title: "",
      text: [],
      onepagerList,
    };
  },
  mounted() {
    this.$bus.$on("OPEN_ONEPAGER", (data) => {
      this.showFlag = data.showFlag;
      this.title = data.title;
      this.text = onepagerList[data.text];
    });
    this.$bus.$on("CLOSE_ONEPAGER", () => {
      this.showFlag = false;
    });
  },
  methods: {
    closeOnepager() {
      this.$bus.$emit("CLOSE_ONEPAGER");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.onepager_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
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
  .onepager_wrapper {
    width: 627px;
    @include themeify {
      background: themed("color-ffffff");
    }
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    .title {
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
    h3 {
      text-align: center;
      height: 24px;
      background: linear-gradient(180deg, #ffffff 0%, #ffcb82 150%);
      align-self: center;
      transform: translateY(10px);
      padding: 0 10px;
      min-width: 196px;
      span {
        display: inline-block;
        transform: translateY(-5px);
      }
    }
    .content {
      border: 1px solid #f96001;
      border-radius: 20px;
      padding: 30px 20px;
      background-image: url("../../assets/img/flashmining/pagerlogo.png");
      background-repeat: no-repeat;
      background-size: 160px 120px;
      background-position: 95% 92%;
      p {
        margin: 10px 0;
        font-size: 14px;
        @include themeify {
          color: themed("color-17173a");
        }
        line-height: 28px;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .onepager_wrapper {
    width: 90%;
    height: 80%;
    max-height: 550px;
    @include themeify {
      background: themed("color-ffffff");
    }
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    .title {
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
    h3 {
      text-align: center;
      height: 24px;
      background: linear-gradient(180deg, #ffffff 0%, #ffcb82 150%);
      align-self: center;
      transform: translateY(10px);
      padding: 0 10px;
      min-width: 196px;
      span {
        display: inline-block;
        transform: translateY(-5px);
      }
    }
    .content {
      flex: 1;
      border: 1px solid #f96001;
      border-radius: 20px;
      padding: 30px 20px 0;
      overflow: hidden;
      section {
        overflow-y: scroll;
        height: 80%;
        p {
          margin: 10px 0;
          font-size: 14px;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 28px;
        }
      }

      .bg {
        width: 100%;
        height: 70px;
        background-image: url("../../assets/img/flashmining/pagerlogo.png");
        background-repeat: no-repeat;
        background-size: 96px 70px;
        background-position: right;
      }
    }
  }
}
</style>
