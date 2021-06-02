<template>
  <div class="status-dialog">
    <div class="mask" @click="closeDialog"></div>
    <div :class="`status-dialog-content ${data.layout}`">
      <h3 class="layout1_title" v-if="data.layout == 'layout1'">
        <span>
          <img
            v-if="data.activeTip"
            class="activeBG"
            src="~/assets/img/helmet/activeWarn.png"
            alt=""
          />{{ data.title }}
        </span>
        <span class="close" @click="closeDialog"></span>
      </h3>
      <h3 class="layout2_title" v-if="data.layout == 'layout2'">
        <span>
          {{ data.title }}
        </span>
        <span class="close" @click="closeDialog"></span>
      </h3>
      <h3 class="con-tit" v-if="data.conTit" v-html="data.conTit"></h3>
      <div class="con-text" v-if="data.conText" v-html="data.conText"></div>
      <div class="activeWarn" v-if="data.activeTip">
        {{ data.activeTipText1 }}
      </div>
      <div class="activeWarn" v-if="data.activeTip">
        {{ data.activeTipText2 }}
      </div>
      <div class="loading_wrap" v-if="data.loading">
        <i class="loading_img"></i>
      </div>
      <div class="btn-box" v-if="data.button">
        <slot name="footer">
          <button @click="closeDialog">
            {{ data.buttonText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "status-dialog",
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          title: "",
          conTit: "",
          conText: "",
          layout: "",
          activeTip: false,
          activeTipText1: "",
          activeTipText2: "",
          loading: true,
          button: false,
          buttonText: "",
          showDialog: true,
        };
      },
    },
  },
  mounted() {
    console.log(this.data);
  },
  methods: {
    async closeDialog() {
      this.$bus.$emit("PROCESS_ACTION", this.data.showDialog);
      this.$emit("close");
      if (this.data.action == "netWork") {
        let ethereum = window.ethereum;
        const data = [
          {
            chainId: "0x38",
            chainName: "Binance Smart Chain",
            nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18,
            },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com/"],
          },
        ];
        await ethereum
          .request({ method: "wallet_addEthereumChain", params: data })
          .catch();
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/css/base.scss";
.loading_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0 5px 0;
}
.loading_img {
  display: block;
  width: 36px;
  height: 36px;
  background-image: url("../../assets/img/helmet/jiazai.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media screen and(min-width:750px) {
  .status-dialog {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    /* background-color: rgba(0, 0, 0, 0.8); */
    .activeWarn {
      margin-top: 10px;
      font-size: 14px;
    }
    .mask {
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 101;
    }
    > .layout1 {
      text-align: left;
      min-width: 400px;
    }
    > .layout2 {
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 400px;
    }
    .status-dialog-content {
      background: #ffffff;
      padding: 30px;
      position: relative;
      z-index: 102;
      // min-height: 230px;
      border-radius: 8px;
      .layout1_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > .close {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url("../../assets/img/icon/guanbi.png");
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
      .layout2_title {
        height: 50px;
        line-height: 50px;
        > .close {
          position: absolute;
          display: inline-block;
          width: 20px;
          height: 20px;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url("../../assets/img/icon/guanbi.png");
          background-size: 100% 100%;
          right: 30px;
          top: 30px;
          cursor: pointer;
        }
      }
      > .title {
        font-size: 20px;
        color: #101010;
        text-align: left;
        padding-bottom: 16px;
      }
      > .close {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url("../../assets/img/icon/guanbi.png");
        background-size: 100% 100%;
        position: absolute;
        right: 20px;
        top: 20px;
      }
      .img-box {
        padding-top: 10px;
        img {
          width: 40px;
          height: 40px;
          &.pending {
            -webkit-animation: animal 2s infinite linear;
            -webkit-transform-origin: center center;
            -ms-transform-origin: center center;
            transform-origin: center center;
          }
        }
      }
      .con-tit {
        color: #101010;
        font-size: 16px;
        font-weight: 500;
        margin-top: 16px;
        span {
          color: #fd7e14;
          font-weight: 600;
        }
        a {
          color: #fd7e14;
          text-decoration: underline;
        }
      }
      .con-text {
        margin-top: 12px;
        font-size: 14px;
        color: #101010;
        p {
          color: #fd7e14;
        }
        span {
          color: #fd7e14;
        }
        a {
          color: #fd7e14;
          text-decoration: underline;
        }
      }
      .btn-box {
        text-align: right;
        padding-top: 20px;
        button {
          min-width: 141px;
          height: 40px;
          background: #17173a;
          border-radius: 5px;
          min-width: 96px;
          height: 32px;
          padding: 0px 12px;
          color: #fff;
          font-size: 14px;
          &:hover {
            background: #2c2c2c;
          }
        }
      }
    }
  }

  @keyframes animal {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
}
@media screen and(max-width:750px) {
  .status-dialog {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    /* background-color: rgba(0, 0, 0, 0.8); */
    .activeWarn {
      margin-top: 10px;
      font-size: 14px;
    }
    .mask {
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 101;
    }
    > .layout1 {
      text-align: left;
    }
    > .layout2 {
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .status-dialog-content {
      background: #ffffff;
      padding: 30px;
      position: relative;
      z-index: 102;
      min-height: 230px;
      border-radius: 8px;
      width: 96%;
      .layout1_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > .close {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url("../../assets/img/icon/guanbi.png");
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
      .layout2_title {
        height: 50px;
        line-height: 50px;
        > .close {
          position: absolute;
          display: inline-block;
          width: 20px;
          height: 20px;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url("../../assets/img/icon/guanbi.png");
          background-size: 100% 100%;
          right: 30px;
          top: 30px;
          cursor: pointer;
        }
      }
      > .title {
        font-size: 20px;
        color: #101010;
        text-align: left;
        padding-bottom: 16px;
      }
      > .close {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url("../../assets/img/icon/guanbi.png");
        background-size: 100% 100%;
        position: absolute;
        right: 20px;
        top: 20px;
      }
      .img-box {
        padding-top: 10px;
        img {
          width: 40px;
          height: 40px;
          &.pending {
            -webkit-animation: animal 2s infinite linear;
            -webkit-transform-origin: center center;
            -ms-transform-origin: center center;
            transform-origin: center center;
          }
        }
      }
      .con-tit {
        color: #101010;
        font-size: 16px;
        font-weight: 500;
        margin-top: 16px;
        span {
          color: #fd7e14;
          font-weight: 600;
        }
        a {
          color: #fd7e14;
          text-decoration: underline;
        }
      }
      .con-text {
        margin-top: 12px;
        font-size: 14px;
        color: #101010;
        p {
          color: #fd7e14;
        }
        span {
          color: #fd7e14;
        }
        a {
          color: #fd7e14;
          text-decoration: underline;
        }
      }
      .btn-box {
        text-align: right;
        padding-top: 20px;
        button {
          min-width: 141px;
          height: 40px;
          background: #17173a;
          border-radius: 5px;
          min-width: 96px;
          height: 32px;
          padding: 0px 12px;
          color: #fff;
          font-size: 14px;
          &:hover {
            background: #2c2c2c;
          }
        }
      }
    }
  }

  @keyframes animal {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
    }
  }
}

.activeBG {
  width: 24px;
  height: 24px;
  margin-right: 4px;
  transform: translateY(4px);
}
</style>
