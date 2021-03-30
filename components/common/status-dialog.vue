<template>
  <div class="status-dialog">
    <div class="mask" @click="closeDialog"></div>
    <div class="status-dialog-content">
      <h3 class="title">
        <img
          v-if="data.activeTip"
          class="activeBG"
          src="~/assets/img/helmet/activeWarn.png"
          alt=""
        />{{ data.title }}
      </h3>
      <span class="close" @click="closeDialog"></span>
      <div class="img-box">
        <!-- <img
          class="pending"
          v-if="data.type === 'pending'"
          src="~/assets/img/waitting.png"
        /> -->
        <!-- <img v-if="data.type === 'submit'" src="~/assets/img/submit.png" /> -->
        <!-- <img v-if="data.type === 'success'" src="~/assets/img/success.png" /> -->
      </div>
      <!-- 请在钱包中确认进行交易 -->
      <h3 class="con-tit" v-html="data.conTit"></h3>
      <div class="con-text" v-html="data.conText"></div>
      <div class="activeWarn" v-if="data.activeTip">{{ $t('Tip.Active') }}</div>
      <div class="loading_wrap" v-if="data.type != 'success'">
        <i class="loading_img"></i>
      </div>
      <div class="btn-box">
        <slot name="footer">
          <button
            @click="closeDialog"
            :style="data.btnText == 'Approve' ? 'display:none' : ''"
          >
            {{ data.btnText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'status-dialog',
  props: {
    // type: {
    //     type: String,
    //     default: 'pending', // warning info success error submit pending
    // },
    // title: {
    //     type: String,
    //     default: 'Waiting For Confirmation'
    // },
    // conTit: {
    //     type: String,
    //     default: 'Please confirm the transaction in the wallet'
    // },
    // conText: {
    //     type: String,
    //     default: ''
    // },
    // btnText: {
    //     type: String,
    //     default: 'I know'
    // }
    data: {
      type: Object,
      default: () => {
        return {
          type: '',
          title: '',
          conTit: '',
          conText: '',
          btnText: '',
          activeTip: false,
        }
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/css/base.scss';
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
  background-image: url('../../assets/img/helmet/jiazai.png');
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

    .status-dialog-content {
      background: #ffffff;
      padding: 16px 30px;
      position: relative;
      text-align: center;
      z-index: 102;
      width: 500px;
      min-height: 230px;
      > .title {
        font-size: 20px;
        color: $bg-d;
        text-align: left;
        padding-bottom: 16px;
      }
      .close {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url('../../assets/img/icon/guanbi.png');
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
        color: $bg-d;
        font-size: 16px;
        font-weight: 500;
        margin-top: 16px;
        span {
          color: #fd7e14;
        }
        a {
          color: #fd7e14;
          text-decoration: underline;
        }
      }
      .con-text {
        font-size: 14px;
        color: $bg-d;
        margin-top: 12px;
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
          min-width: 96px;
          height: 32px;
          padding: 0px 12px;
          background: #fd7e14;
          color: $text-m;
          font-size: 14px;
          &:hover {
            background: #ffa000;
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
    .mask {
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 101;
    }

    .status-dialog-content {
      background: #ffffff;
      padding: 16px 30px;
      position: relative;
      text-align: center;
      z-index: 102;
      width: 90%;
      > .title {
        font-size: 20px;
        color: $bg-d;
        text-align: left;
        padding-bottom: 16px;
      }
      .close {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url('../../assets/img/icon/guanbi.png');
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
        color: $bg-d;
        font-size: 16px;
        font-weight: 500;
        margin-top: 16px;
        span {
          color: #fd7e14;
        }
        a {
          color: #fd7e14;
          text-decoration: underline;
        }
      }
      .con-text {
        font-size: 14px;
        color: $bg-d;
        margin-top: 12px;
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
        padding-top: 35px;
        button {
          min-width: 96px;
          height: 32px;
          padding: 0px 12px;
          background: #fd7e14;
          color: $text-m;
          font-size: 14px;
          &:hover {
            background: #ffa000;
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
