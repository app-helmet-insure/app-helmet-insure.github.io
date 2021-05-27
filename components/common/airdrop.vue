<template>
  <div class="mask" v-if="airdrop">
    <div class="airdrop">
      <p><span>Airdrop</span><i @click="closeAirdrop"></i></p>
      <div class="text">
        <span>{{ $t("Table.HELMETRewards") }}</span>
        <span>{{ addCommom(getReward, 8) }} SHIBh</span>
      </div>
      <button class="button" @click="claim">
        <i :class="claimLoading ? 'loading_pic' : ''"></i>Claim
      </button>
      <div class="smltext">
        <span>{{ $t("IIO.Balance") }}:</span>
        <span>{{ addCommom(myBalance, 8) }} SHIBh</span>
      </div>
      <div class="detail">
        <div class="ContractAddress">
          <span>SHIBh {{ $t("Table.ContractAddress") }}</span>
          <p>
            0x224b33139a377a62d4BaD3D58cEDb7807AE228eB
            <i
              class="copy"
              id="copy_default"
              @click="
                copyAdress($event, '0x224b33139a377a62d4BaD3D58cEDb7807AE228eB')
              "
            ></i>
          </p>
        </div>
        <div class="addToken">
          <p @click="addTokenFn('SHIBH', 'SHIBh', 12)">Add SHIBh to MetaMask</p>
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CangetPAYA, getBalance, getPAYA } from "~/interface/deposite";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import addToken from "~/assets/utils/addtoken.js";
import { getAddress, getContract } from "~/assets/utils/address-pool.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
export default {
  data() {
    return {
      airdrop: false,
      myBalance: 0,
      getReward: 0,
      claimLoading: false,
      addCommom,
    };
  },
  mounted() {
    this.$bus.$on("CLAIM_LOADING_AIRDROP", (data) => {
      this.claimLoading = false;
      this.closeAirdrop();
    });
    this.$bus.$on("RELOAD_DATA_AIRDROP", () => {
      this.getBalance();
    });
    setInterval(() => {
      setTimeout(() => {
        this.getBalance();
      });
      clearTimeout();
    }, 60000);
    setTimeout(() => {
      this.getBalance();
    }, 1000);
    this.$bus.$on("AIRDROP_DIALOG", (res) => {
      this.airdrop = res;
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
    async addTokenFn(token, tokenName, unit) {
      let tokenAddress = getAddress(token);
      let tokenAddress1 = getContract(token);
      let data = {
        tokenAddress: tokenAddress || tokenAddress1,
        tokenSymbol: tokenName || token,
        tokenDecimals: unit || 18,
        tokenImage: "",
      };
      await addToken(data);
    },
    closeAirdrop() {
      this.$bus.$emit("AIRDROP_DIALOG", false);
    },
    async getBalance() {
      let type = "AIRDROP";
      let helmetType = "AIRDROP_LPT";
      let reward = await CangetPAYA(type, "SHIB");
      let myBalance = await getBalance(helmetType, "SHIBh");
      this.getReward = reward;
      this.myBalance = myBalance;
    },
    async claim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "AIRDROP";
      let res = await getPAYA(type);
    },
  },
};
</script>

<style lang='scss' scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.ContractAddress {
  font-size: 14px;
  color: #fd7e14;
  margin-top: 8px;
  a span {
    color: #17173a;
  }
  p {
    display: flex;
    margin-top: 4px;
    align-items: center;
    font-weight: 550;
  }
  .copy {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-image: url("../../assets/img/helmet/copy.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    flex-shrink: 0;
  }
}
.addToken {
  font-size: 14px;
  color: #fd7e14;
  margin-top: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #fd8a2b;
  }
  p {
    font-weight: 550;
  }
  i {
    margin-left: 4px;
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url("../../assets/img/icon/sMetamask.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    flex-shrink: 0;
  }
}
@media screen and (min-width: 750px) {
  .airdrop {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 8px;
    padding: 30px 20px;
    > p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #17173a;
        line-height: 20px;
      }
      > i {
        display: block;
        width: 24px;
        height: 24px;
        background-image: url("../../assets/img/icon/guanbi.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .text {
      margin-top: 34px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(23, 23, 58, 0.7);
          line-height: 14px;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          color: #17173a;
          line-height: 14px;
        }
      }
    }
    .button {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      background: #17173a;
      border-radius: 5px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        margin-right: 4px;
      }
    }
    .smltext {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(23, 23, 58, 0.7);
        line-height: 14px;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .ContractAddress {
    p {
      font-size: 12px;
    }
    i {
      flex-shrink: 0;
    }
  }
  .airdrop {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 98%;
    background: #ffffff;
    border-radius: 8px;
    padding: 20px 16px;
    > p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #17173a;
        line-height: 20px;
      }
      i {
        display: block;
        width: 24px;
        height: 24px;
        background-image: url("../../assets/img/icon/guanbi.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .text {
      margin-top: 34px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        &:nth-of-type(1) {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(23, 23, 58, 0.7);
          line-height: 14px;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          color: #17173a;
          line-height: 14px;
        }
      }
    }
    .button {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      background: #17173a;
      border-radius: 5px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        margin-right: 4px;
      }
    }
    .smltext {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(23, 23, 58, 0.7);
        line-height: 14px;
      }
    }
  }
}
</style>