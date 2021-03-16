<template>
  <div class="current-account">
    <div class="mask" @click="closeDialog"></div>
    <div class="current-account-block">
      <h3 class="title">Account</h3>
      <span class="close" @click="closeDialog"></span>
      <div class="account-box">
        <div class="left">
          <span>Connected with {{ userInfo.data.name }}</span>
          <div class="address">
            <span class="circle"></span>
            <span class="address-text">{{ accountText }}</span>
            <img
              class="copy"
              src="~/assets/img/icon/copy.png"
              @click="copyAdress($event, account)"
            />
          </div>
        </div>
        <div class="right">
          <a @click="changeAccount">Change</a>
          <a @click="SignoutAccount">SignOut</a>
        </div>
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
  mounted() {},
  methods: {
    copyAdress(e, text) {
      let _this = this;
      let copys = new ClipboardJS(".copy", {
        text: () => text,
      });
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
    width: 510px;
    padding: 16px 30px;
    position: relative;
    background: #ffffff;
    z-index: 102;
    .title {
      font-size: 20px;
      color: $bg-d;
      text-align: left;
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
      border: 1px solid rgba($bg-a, 0.1);
      padding: 16px;
      padding-bottom: 20px;
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
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
          background: #ff9600;
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
        padding-top: 16px;
        .circle {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: #14b465;
          border-radius: 100%;
        }
        .address-text {
          font-size: 20px;
          font-weight: 500;
          color: #101010;
          padding-left: 8px;
        }
        > img {
          width: 20px;
          height: 20px;
          margin-left: 4px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>