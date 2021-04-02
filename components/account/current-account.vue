<template>
  <div class="current-account">
    <div class="mask" @click="closeDialog"></div>
    <div class="current-account-block">
      <h3 class="title">{{ $t("Account.Account") }}</h3>
      <span class="close" @click="closeDialog"></span>
      <div class="account-box">
        <div class="address">
          <span class="address-text">{{ accountText }}</span>
        </div>
        <div class="copyAddress copy" @click="copyAdress($event, account)">
          <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <path
              d="M7,7 L7,4 C7,3.44771525 7.44771525,3 8,3 L20,3 C20.5522847,3 21,3.44771525 21,4 L21,16 C21,16.5522847 20.5522847,17 20,17 L17,17 L17,20 C17,20.552 16.55,21.0000528 15.993,21.0000528 L4.007,21.0000528 C3.74065346,21.0015966 3.48465319,20.8969771 3.29565863,20.7092963 C3.10666406,20.5216155 3.0002613,20.2663512 3,20 L3.003,8 C3.003,7.448 3.453,7 4.01,7 L7,7 Z M5.003,9 L5,19 L15,19 L15,9 L5.003,9 Z M9,7 L17,7 L17,15 L19,15 L19,5 L9,5 L9,7 Z"
              fill="#17173A"
              fill-rule="nonzero"
            ></path>
          </svg>
          <span>Copy Address</span>
        </div>
        <div class="switchWallet" @click="changeAccount">
          <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
            <path
              d="M16.05,12.05 L21,17 L16.05,21.95 L14.636,20.536 L17.172,17.999 L4,18 L4,16 L17.172,16 L14.636,13.464 L16.05,12.05 Z M7.95,2.05 L9.364,3.464 L6.828,6 L20,6 L20,8 L6.828,8 L9.364,10.536 L7.95,11.95 L3,7 L7.95,2.05 Z"
              fill="#17173A"
              fill-rule="nonzero"
            ></path>
          </svg>
          <span>Switch Wallet</span>
        </div>
        <button @click="SignoutAccount">{{ $t("Account.SignOut") }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
export default {
  name: "current-account",
  data() {
    return {
      accountText: "",
      account: "",
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
  },
  methods: {
    copyAdress(e, text) {
      let _this = this;
      let copys = new ClipboardJS(".copy", { text: () => text });
      copys.on("success", function (e) {
        Message({
          message: "Successfully copied",
          type: "success",
          // duration: 0,
        });
        copys.destroy();
      });
      copys.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
        copys.destroy();
      });
      this.closeDialog();
    },
    userInfoWatch(newValue) {
      let account = newValue.data.account;
      this.account = newValue.data.account;
      if (account) {
        this.accountText =
          account.substr(0, 1) +
          account.substr(1, 1).toLowerCase() +
          account.substr(2, 4) +
          "..." +
          account.substr(-5);
      }
    },
    closeDialog() {
      this.$emit("close");
    },
    changeAccount() {
      this.$emit("change");
      this.closeDialog();
    },
    SignoutAccount() {
      this.$store.dispatch("setUserInfo", {
        data: {
          isLogin: false,
          account: null,
          balace: "--",
        },
        status: 0,
      });
      this.closeDialog();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
@media screen and(min-width:750px) {
  .current-account {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    .mask {
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 101;
    }
    .current-account-block {
      border-radius: 8px;
      padding: 30px 40px;
      position: relative;
      background: #ffffff;
      z-index: 102;

      .title {
        font-size: 20px;
        color: $bg-d;
      }
      .close {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("../../assets/img/icon/guanbi.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        position: absolute;
        right: 30px;
        top: 20px;
      }
      .account-box {
        border-radius: 3px;
        padding: 16px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        .left {
          display: flex;
          flex-direction: column;
          > span {
            font-size: 14px;
            color: $text-d;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          > a {
            display: inline-block;
            background: #fd7e14;
            padding: 3px 15px;
            cursor: pointer;
            border: none;
            &:hover {
              background: #ffa000;
            }
          }
        }
        .address {
          display: flex;
          align-items: center;
          .address-text {
            width: 100%;
            text-align: center;
            font-size: 16px;
            font-family: IBMPlexSans;
            color: #fd7e14;
            line-height: 16px;
            font-weight: 550;
          }
        }
        .copyAddress {
          margin-top: 24px;
          width: 100%;
          min-width: 320px;
          height: 48px;
          display: flex;
          align-items: center;
          background: #f8f9fa;
          border: 2px solid #e8e8eb;
          border-radius: 5px;
          padding-left: 16px;
          span {
            margin-left: 16px;
          }
          cursor: pointer;
          &:hover {
            border: 2px solid rgba(253, 126, 20, 0.3);
            background: #fff;
          }
        }
        .switchWallet {
          margin-top: 24px;
          width: 100%;
          min-width: 320px;
          height: 48px;
          display: flex;
          align-items: center;
          background: #f8f9fa;
          border: 2px solid #e8e8eb;
          border-radius: 5px;
          padding-left: 16px;
          span {
            margin-left: 16px;
          }
          cursor: pointer;
          &:hover {
            border: 2px solid rgba(253, 126, 20, 0.3);
            background: #fff;
          }
        }
        > button {
          margin-top: 30px;
          width: 100%;
          height: 42px;
          background: #17173a;
          border-radius: 5px;
          font-size: 14px;
          font-family: IBMPlexSans;
          color: #ffffff;
          line-height: 18px;
        }
      }
    }
  }
}
@media screen and(max-width:750px) {
  .current-account {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    .mask {
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 101;
    }
    .current-account-block {
      width: 96%;
      border-radius: 8px;
      padding: 30px 20px;
      position: relative;
      background: #ffffff;
      z-index: 102;

      .title {
        font-size: 20px;
        color: $bg-d;
      }
      .close {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("../../assets/img/icon/guanbi.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        position: absolute;
        right: 30px;
        top: 20px;
      }
      .account-box {
        border-radius: 3px;
        padding: 16px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        .left {
          display: flex;
          flex-direction: column;
          > span {
            font-size: 14px;
            color: $text-d;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          > a {
            display: inline-block;
            background: #fd7e14;
            padding: 3px 15px;
            cursor: pointer;
            border: none;
            &:hover {
              background: #ffa000;
            }
          }
        }
        .address {
          display: flex;
          align-items: center;
          .address-text {
            width: 100%;
            text-align: center;
            font-size: 16px;
            font-family: IBMPlexSans;
            color: #fd7e14;
            line-height: 16px;
            font-weight: 550;
          }
        }
        .copyAddress {
          margin-top: 24px;
          width: 100%;
          height: 48px;
          display: flex;
          align-items: center;
          background: #f8f9fa;
          border: 2px solid #e8e8eb;
          border-radius: 5px;
          padding-left: 16px;
          span {
            margin-left: 16px;
          }
          cursor: pointer;
          &:hover {
            border: 2px solid rgba(253, 126, 20, 0.3);
            background: #fff;
          }
        }
        .switchWallet {
          margin-top: 24px;
          width: 100%;
          height: 48px;
          display: flex;
          align-items: center;
          background: #f8f9fa;
          border: 2px solid #e8e8eb;
          border-radius: 5px;
          padding-left: 16px;
          span {
            margin-left: 16px;
          }
          cursor: pointer;
          &:hover {
            border: 2px solid rgba(253, 126, 20, 0.3);
            background: #fff;
          }
        }
        > button {
          margin-top: 30px;
          width: 100%;
          height: 42px;
          background: #17173a;
          border-radius: 5px;
          font-size: 14px;
          font-family: IBMPlexSans;
          color: #ffffff;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
