<template>
  <el-dialog
    center
    append-to-body
    custom-class="airdrop_dialog"
    :close-on-click-modal="false"
    :visible="DialogVisible"
    @close="DialogClose"
  >
    <div class="airdrop_dialog_body">
      <img class="left_candy_1" src="~/assets/img/airdrop/left_candy_1.png" />
      <img class="left_candy_2" src="~/assets/img/airdrop/left_candy_2.png" />
      <img class="left_candy_3" src="~/assets/img/airdrop/left_candy_3.png" />
      <img class="right_candy_1" src="~/assets/img/airdrop/right_candy_1.png" />
      <img class="right_candy_2" src="~/assets/img/airdrop/right_candy_2.png" />
      <img class="right_candy_3" src="~/assets/img/airdrop/right_candy_3.png" />
      <div class="airdrop_token_current">
        <h3 class="airdrop_token_name">{{ CurrentList[0].Symbol }}</h3>
        <p class="airdrop_token_volume">
          {{ fixD(CurrentList[0].Rewards, 4) }}
        </p>
        <button
          class="airdrop_token_button"
          @click="ClaimAirdropRewards(CurrentList[0])"
        >
          {{ $t("Migration.Claim") }}
        </button>
      </div>
      <div class="airdrop_token_history">
        <div
          class="airdrop_token_history_token"
          v-for="item in HistoryList"
          :key="item.Symbol"
        >
          <p>
            <span class="history">History</span
            ><span class="volume"
              >{{ fixD(item.Rewards, 4) }}&nbsp;{{ item.Symbol }}</span
            >
          </p>
          <span @click="ClaimAirdropRewards(item)">
            {{ $t("Migration.Claim") }}</span
          >
        </div>
      </div>
    </div>
    <!-- dialog -->
    <WaitingConfirmationDialog
      :DialogVisible="WaitingVisible"
      :DialogClose="waitingClose"
    >
      <div class="waiting_content">
        <p>{{ WaitingText }}</p>
      </div>
    </WaitingConfirmationDialog>
    <SuccessConfirmationDialog
      :DialogVisible="SuccessVisible"
      :DialogClose="successClose"
      :SuccessHash="SuccessHash"
    />
  </el-dialog>
</template>

<script>
import { fixD } from "~/assets/js/util.js";
import { AirdropList } from "~/config/airdrop.js";
import { Contract } from "ethers-multicall-x";
import {
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
  toWei,
  getContract,
} from "~/web3/index.js";
import SuccessConfirmationDialog from "~/components/dialogs/success-confirmation-dialog.vue";
import WaitingConfirmationDialog from "~/components/dialogs/waiting-confirmation-dialog.vue";
export default {
  props: ["DialogVisible", "DialogClose"],
  components: { SuccessConfirmationDialog, WaitingConfirmationDialog },
  data() {
    return {
      fixD,
      CurrentList: AirdropList.Current,
      HistoryList: AirdropList.History,
      WaitingVisible: false,
      SuccessVisible: false,
      SuccessHash: "",
      WaitingText: "",
    };
  },
  computed: {
    CurrentAccount() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    CurrentAccount: {
      handler: "reloadData",
      immediate: true,
    },
  },
  mounted() {
    this.getAirdropInfo();
  },
  methods: {
    reloadData(Value) {
      if (Value) {
        this.$nextTick(() => {
          this.getAirdropInfo();
        });
      }
    },
    waitingClose() {
      this.WaitingVisible = false;
    },
    successClose() {
      this.SuccessVisible = false;
    },
    getAirdropInfo() {
      const CurrentList = AirdropList.Current;
      const HistoryList = AirdropList.History;
      const Account = this.CurrentAccount.account;
      HistoryList.forEach((item) => {
        const PoolContracts = new Contract(item.PoolAddress, item.TokenABI);
        const TokenContracts = new Contract(item.TokenAddress, item.TokenABI);
        const PromiseList = [
          PoolContracts[item.RewardMethods](Account),
          TokenContracts[item.BalanceMethods](Account),
        ];
        const MulticallProvider = getOnlyMultiCallProvider();
        MulticallProvider.all(PromiseList).then((res) => {
          const FixData = processResult(res);
          const [Rewards, Balance] = FixData;
          return (
            (item.Rewards = fromWei(Rewards, item.Decimals)),
            (item.Balance = fromWei(Balance, item.Decimals))
          );
        });
      });
      CurrentList.forEach((item) => {
        const PoolContracts = new Contract(item.PoolAddress, item.TokenABI);
        const TokenContracts = new Contract(item.TokenAddress, item.TokenABI);
        const PromiseList = [
          PoolContracts[item.RewardMethods](Account),
          TokenContracts[item.BalanceMethods](Account),
        ];
        const MulticallProvider = getOnlyMultiCallProvider();
        MulticallProvider.all(PromiseList).then((res) => {
          const FixData = processResult(res);
          const [Rewards, Balance] = FixData;
          return (
            (item.Rewards = fromWei(Rewards, item.Decimals)),
            (item.Balance = fromWei(Balance, item.Decimals))
          );
        });
      });
    },
    ClaimAirdropRewards(Data) {
      const Contracts = getContract(Data.TokenABI, Data.PoolAddress);
      const Account = this.CurrentAccount.account;
      Contracts.methods[Data.ClaimMethods]()
        .send({ from: Account })
        .on("transactionHash", (hash) => {
          this.WaitingVisible = true;
        })
        .on("receipt", (receipt) => {
          if (!this.SuccessVisible) {
            this.SuccessHash = receipt.transactionHash;
            this.WaitingVisible = false;
            this.SuccessVisible = true;
            this.getAirdropInfo();
          }
        })
        .on("error", (error) => {
          this.WaitingVisible = false;
          this.SuccessVisible = false;
        });
    },
  },
};
</script>

<style lang='scss' >
@import "~/assets/css/themes.scss";
.success_title {
  font-size: 16px;
  font-family: IBMPlexSans-Bold, IBMPlexSans;
  font-weight: bold;
  @include themeify {
    color: themed("color-17173a");
  }
  line-height: 16px;
}
.success_tx {
  height: 18px;
  font-size: 14px;
  font-family: IBMPlexSans;
  color: #fd7e14;
  line-height: 18px;
  margin-top: 15px;
  &:hover {
    text-decoration: underline;
  }
}
.success_info {
  font-size: 14px;
  font-family: IBMPlexSans;
  @include themeify {
    color: themed("color-17173a");
  }
  line-height: 16px;
  margin-top: 15px;
}

.success_content {
  margin-top: 15px;
  width: 236px;
  p {
    text-align: center;
    font-size: 14px;
    font-family: IBMPlexSans;
    color: #fd7e14;
    line-height: 20px;
  }
}
.success_loading {
  display: block;
  width: 24px;
  height: 24px;
  background-image: url("../../assets/img/helmet/jiazai.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
  margin-top: 15px;
}
.success_confirm {
  width: 140px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 15px;
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
@media screen and(min-width:750px) {
  .airdrop_dialog {
    border-radius: 10px !important;
    width: 500px !important;
    background-color: transparent !important;
    box-shadow: none !important;
    .el-dialog__close::before {
      font-size: 24px;
      font-weight: 800 !important;
      color: #fff !important;
    }
    .airdrop_dialog_body {
      position: relative;
      height: 500px;
      background-image: url("../../assets/img/airdrop/airdrop_bg.png");
      background-repeat: no-repeat;
      background-size: 442px 418px;
      padding-right: 42px;
      text-align: center;
    }
    .left_candy_1 {
      width: 48px;
      position: absolute;
      left: 40px;
      animation: rotate_candy 1s linear infinite;
    }
    .left_candy_2 {
      width: 65px;
      position: absolute;
      left: -15px;
      top: 60px;
      animation: rotate_candy 1s linear infinite;
    }
    .left_candy_3 {
      width: 40px;
      position: absolute;
      left: -20px;
      top: 140px;
      animation: scale_candy 1s linear infinite;
    }
    .right_candy_1 {
      width: 40px;
      position: absolute;
      right: 40px;
      animation: scale_candy 1s linear infinite;
    }
    .right_candy_2 {
      width: 76px;
      position: absolute;
      right: -15px;
      top: 60px;
      animation: rotate_candy 1s linear infinite;
    }
    .right_candy_3 {
      width: 56px;
      position: absolute;
      right: -20px;
      top: 140px;
      animation: scale_candy 1s linear infinite;
    }
    .airdrop_token_name {
      padding-top: 260px;
      font-size: 18px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      color: #ffffff;
      line-height: 23px;
    }
    .airdrop_token_volume {
      margin-top: 10px;
      font-size: 30px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      color: #ffffff;
      line-height: 39px;
    }
    .airdrop_token_button {
      margin-top: 10px;
      padding: 0 40px;
      height: 40px;
      background: linear-gradient(180deg, #f3c95e 0%, #e39830 100%);
      box-shadow: 0px 4px 0px 0px rgba(196, 114, 0, 1);
      border-radius: 31px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 28px;
      text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.5);
      &:hover {
        color: #fd7e14;
      }
      &:active {
        transform: translateY(3px);
        transition: all 0.5s;
        box-shadow: 0px 1px 0px 0px #df8c37;
      }
    }
    .airdrop_token_history {
      margin-top: 74px;
      &_token {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        > p {
          > .history {
            font-size: 18px;
            font-family: IBMPlexSans;
            color: rgba(255, 255, 255, 0.6);
            margin-right: 10px;
          }
          > .volume {
            font-size: 18px;
            font-family: IBMPlexSans-Bold, IBMPlexSans;
            font-weight: bold;
            color: #ffffff;
          }
        }
        > span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 59px;
          height: 31px;
          border-radius: 15px;
          border: 1px solid #ffffff;
          font-size: 13px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 17px;
          text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          &:hover {
            color: #fd7e14;
            border: 1px solid #fd7e14;
          }
        }
      }
    }
  }
}
@media screen and(max-width:750px) {
  .airdrop_dialog {
    border-radius: 10px;
    width: 95% !important;
    background-color: transparent !important;
    box-shadow: none !important;
    .el-dialog__close::before {
      font-size: 24px;
      font-weight: 800 !important;
      color: #fff !important;
    }
    .airdrop_dialog_body {
      background-image: url("../../assets/img/airdrop/airdrop_bg.png");
      background-repeat: no-repeat;
      background-size: 292px 276px;
      padding-right: 42px;
      text-align: center;
    }
    .left_candy_1 {
      width: 32px;
      position: absolute;
      left: 30px;
      animation: rotate_candy 1s linear infinite;
    }
    .left_candy_2 {
      width: 40px;
      position: absolute;
      left: 15px;
      top: 95px;
      animation: rotate_candy 1s linear infinite;
    }
    .left_candy_3 {
      width: 28px;
      position: absolute;
      left: 10px;
      top: 145px;
      animation: scale_candy 1s linear infinite;
    }
    .right_candy_1 {
      width: 28px;
      position: absolute;
      right: 65px;
      top: 65px;
      animation: scale_candy 1s linear infinite;
    }
    .right_candy_2 {
      width: 50px;
      position: absolute;
      right: 15px;
      top: 92px;
      animation: rotate_candy 1s linear infinite;
    }
    .right_candy_3 {
      width: 35px;
      position: absolute;
      right: 15px;
      top: 155px;
      animation: scale_candy 1s linear infinite;
    }
    .airdrop_token_name {
      padding-top: 175px;
      font-size: 12px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      color: #ffffff;
      line-height: 23px;
    }
    .airdrop_token_volume {
      font-size: 16px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      color: #ffffff;
    }
    .airdrop_token_button {
      margin-top: 6px;
      padding: 0 20px;
      height: 30px;
      background: linear-gradient(180deg, #f3c95e 0%, #e39830 100%);
      box-shadow: 0px 4px 0px 0px rgba(196, 114, 0, 1);
      border-radius: 31px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.5);
      &:hover {
        color: #fd7e14;
      }
      &:active {
        transform: translateY(3px);
        transition: all 0.5s;
        box-shadow: 0px 1px 0px 0px #df8c37;
      }
    }
    .airdrop_token_history {
      margin-top: 44px;
      &_token {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        > p {
          > .history {
            font-size: 14px;
            font-family: IBMPlexSans;
            color: rgba(255, 255, 255, 0.6);
            margin-right: 10px;
          }
          > .volume {
            font-size: 14px;
            font-family: IBMPlexSans-Bold, IBMPlexSans;
            font-weight: bold;
            color: #ffffff;
          }
        }
        > span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 59px;
          height: 31px;
          border-radius: 15px;
          border: 1px solid #ffffff;
          font-size: 13px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 17px;
          text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          &:hover {
            color: #fd7e14;
            border: 1px solid #fd7e14;
          }
        }
      }
    }
  }
}
@keyframes scale_candy {
  0% {
    transform: translate(0);
  }
  25% {
    transform: scale(1.25);
  }
  50% {
    transform: translate(0);
  }
  75% {
    transform: scale(1.5);
  }
  100% {
    transform: translate(0);
  }
}
@keyframes rotate_candy {
  0% {
    transform: translate(0);
  }
  25% {
    transform: translate(5px, -5px) rotate(30deg);
  }
  50% {
    transform: translate(0);
  }
  75% {
    transform: translate(-5px, -5px) rotate(-30deg);
  }
  100% {
    transform: translate(0);
  }
}
</style>