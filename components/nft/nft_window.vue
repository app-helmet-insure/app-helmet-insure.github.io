<template>
  <div class="nft_window_mask" @touchmove.prevent.self v-if="windowFlag">
    <div class="nft_window">
      <p><i @click="closeWindow"></i></p>
      <div class="nft_window_bg">
        <div class="nft_share" v-if="action == 'share'">
          <div>
            {{ $t("NFT.Text1", { card_Name: card_Name }) }}
            <a href="https://app.helmet.insure/#/nft"
              >https://app.helmet.insure/#/nft</a
            >
          </div>
          <span
            class="copy"
            id="copy_default"
            @click="
              copyAdress(
                $event,
                $t('NFT.Text1', { card_Name: card_Name }) +
                  `https://app.helmet.insure/#/nft`
              )
            "
            >{{ $t("NFT.Copy") }}</span
          >
        </div>
        <div class="nft_send" v-if="action == 'donate'">
          <label>{{ $t("NFT.EnterAdress") }}</label>
          <input type="text" v-model="ToAdress" />
          <div>
            <i
              @click="handleCheck"
              :class="checkFlag ? 'checktrue checkbox' : 'checkfalse checkbox'"
            ></i>
            <p>
              {{ $t("NFT.Text1", { card_Name: card_Name }) }}
            </p>
          </div>
          <div class="button">
            <button @click="closeWindow">{{ $t("NFT.Cancel") }}</button>
            <button @click="Send">{{ $t("NFT.Send") }}</button>
          </div>
        </div>
        <div class="nft_adress" v-if="action == 'adress'">
          <p>
            <span> {{ card_Name }}NFT:</span>
            <span> {{ getContract(`NFT_${ContractName}`) }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
import Message from "~/components/common/Message";
import { getContract } from "~/assets/utils/address-pool.js";
import { NFTContract } from "~/interface/index";
export default {
  data() {
    return {
      card_Name: "",
      action: "",
      checkFlag: false,
      windowFlag: false,
      ContractName: "",
      getContract,
      ToAdress: "",
    };
  },
  mounted() {
    this.$bus.$on("NFT_WINDOW_STATUS", (data) => {
      this.windowFlag = data.flag;
      this.card_Name = data.card_Name;
      this.action = data.action;
      this.ContractName = data.ContractName;
    });
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
    },
    handleCheck() {
      this.checkFlag = !this.checkFlag;
    },
    closeWindow() {
      this.$bus.$emit("NFT_WINDOW_STATUS", { flag: false });
    },
    async Send() {
      const MyContract = await NFTContract(
        "0xBcE765FB9497942Fe854188E79A056bAaEe5c7AC"
      );
      // tokenOfOwnerByIndex
      await MyContract.methods
        .transferFrom(window.CURRENTADDRESS, this.ToAdress, "1")
        .send({ from: window.CURRENTADDRESS });
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and(min-width:750px) {
  .nft_window_mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    z-index: 1;
  }
  .nft_window {
    width: 497px;
    min-height: 279px;
    background: linear-gradient(180deg, #716a88 0%, #84787b 100%);
    box-shadow: 0px 1px 3px 0px rgba(165, 165, 165, 0.5);
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 10px 17px 10px;
    display: flex;
    flex-direction: column;
    p {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 4px;
    }
    i {
      display: block;
      width: 14px;
      height: 14px;
      background-image: url("../../assets/img/nft/close.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
    &_bg {
      flex: 1;
      background-image: url("../../assets/img/nft/dialog_bg_ten.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .nft_share {
    flex: 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 27px;
    > div {
      width: 339px;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #d47a52;
      line-height: 21px;
      margin: 0 auto;
    }
    a {
      color: #d47a52;
    }
    span {
      margin-top: 15px;
      width: 24px;
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #d47a52;
      line-height: 12px;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .nft_send {
    width: 320px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    label {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(23, 23, 58, 0.7);
      line-height: 14px;
      margin-top: 34px;
    }
    input {
      margin-top: 20px;
      width: 320px;
      height: 40px;
      border-radius: 5px;
      border: 2px solid #fd7e14;
      background: transparent;
      padding-left: 12px;
      font-size: 14px;
      color: rgba(23, 23, 58, 0.7);
    }
    > div {
      display: flex;
      margin-top: 7px;
      align-items: flex-start;
      flex-shrink: 0;
      .checkbox {
        display: block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 4px;
        flex-shrink: 0;
      }
      .checkfalse {
        background-image: url("../../assets/img/nft/checkfalse.png");
      }
      .checktrue {
        background-image: url("../../assets/img/nft/checktrue.png");
      }
      p {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(23, 23, 58, 0.7);
        line-height: 18px;
      }
    }
    .button {
      display: flex;
      margin-top: 16px;
      align-items: center;
      justify-content: center;
      button {
        margin: 0 15px;
        &:nth-of-type(1) {
          width: 32px;
          height: 16px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(23, 23, 58, 0.7);
          line-height: 16px;
          background: transparent;
        }
        &:nth-of-type(2) {
          width: 77px;
          height: 32px;
          background: #999bfb;
          box-shadow: 0px 3px 0px 0px #9383e0;
          border-radius: 16px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 19px;
          text-shadow: 0px 2px 0px #9383e0, 0px 2px 5px #e2dcff;
        }
      }
    }
  }
  .nft_adress {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
    p {
      display: flex;
      flex-direction: column;
      width: 339px;
      height: 42px;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #d47a52;
      line-height: 21px;
    }
  }
}
@media screen and(max-width:750px) {
  .nft_window_mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    z-index: 1;
  }
  .nft_window {
    width: 95%;
    min-height: 279px;
    padding: 20px 0 0 60px;
    background: linear-gradient(180deg, #716a88 0%, #84787b 100%);
    box-shadow: 0px 1px 3px 0px rgba(165, 165, 165, 0.5);
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 10px 17px 10px;
    display: flex;
    flex-direction: column;
    p {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 4px;
    }
    i {
      display: block;
      width: 14px;
      height: 14px;
      background-image: url("../../assets/img/nft/close.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
    &_bg {
      flex: 1;
      background-image: url("../../assets/img/nft/dialog_bg_ten.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .nft_share {
    flex: 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 27px;
    > div {
      width: 85%;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #d47a52;
      line-height: 21px;
      margin: 0 auto;
    }
    a {
      color: #d47a52;
    }
    span {
      margin-top: 15px;
      width: 24px;
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #d47a52;
      line-height: 12px;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .nft_share {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 27px;
    > div {
      width: 90%;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #d47a52;
      line-height: 21px;
      margin: 0 auto;
    }
    a {
      color: #d47a52;
    }
    span {
      margin-top: 15px;
      width: 24px;
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #d47a52;
      line-height: 12px;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .nft_send {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    label {
      width: 70px;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(23, 23, 58, 0.7);
      line-height: 14px;
      margin-top: 44px;
    }
    input {
      margin-top: 20px;
      height: 40px;
      border-radius: 5px;
      border: 2px solid #fd7e14;
      background: transparent;
      padding-left: 12px;
      font-size: 14px;
      color: rgba(23, 23, 58, 0.7);
    }
    > div {
      display: flex;
      margin-top: 7px;
      align-items: flex-start;
      flex-shrink: 0;
      .checkbox {
        display: block;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 4px;
        flex-shrink: 0;
      }
      .checkfalse {
        background-image: url("../../assets/img/nft/checkfalse.png");
      }
      .checktrue {
        background-image: url("../../assets/img/nft/checktrue.png");
      }
      p {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(23, 23, 58, 0.7);
        line-height: 18px;
      }
    }
    .button {
      display: flex;
      margin-top: 26px;
      align-items: center;
      justify-content: center;
      button {
        margin: 0 15px;
        &:nth-of-type(1) {
          width: 32px;
          height: 16px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(23, 23, 58, 0.7);
          line-height: 16px;
          background: transparent;
        }
        &:nth-of-type(2) {
          width: 77px;
          height: 32px;
          background: #999bfb;
          box-shadow: 0px 3px 0px 0px #9383e0;
          border-radius: 16px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 19px;
          text-shadow: 0px 2px 0px #9383e0, 0px 2px 5px #e2dcff;
        }
      }
    }
  }
  .nft_adress {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
    p {
      display: flex;
      flex-direction: column;
      width: 339px;
      height: 42px;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #d47a52;
      line-height: 21px;
    }
  }
}
</style>