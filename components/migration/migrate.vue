<template>
  <div class="migrate">
    <div class="migrate_text">
      <span>Helmet</span>
      <span>{{ fixD(HelmetBalance, 4) }}</span>
    </div>
    <div class="migrate_input">
      <input type="text" v-model="BurnVolume" />
      <span @click="handleClickMax">{{
        $t("Insurance.Insurance_text18")
      }}</span>
    </div>
    <button class="b_button migrate_button" @click="handleClickMigrate">
      {{ ApproveStatus ? $t("Migration.Migrate") : $t("Migration.Approve") }}
    </button>
    <div class="migrate_tips_wrap">
      <p class="migrate_tips_span"><span>Tips</span></p>
      <p class="migrate_tips">
        {{ $t("Migration.Tips8") }}
      </p>
      <p class="migrate_tips">
        {{ $t("Migration.Tips9") }}
      </p>
    </div>
    <div class="migrate_info_wrap">
      <p class="migrate_info_item">
        <span>Max. Swap Amount</span> <span>26,000,000 Helmet</span>
      </p>
      <p class="migrate_info_item">
        <span>Min. Swap Amount</span> <span>260.00 Helmet</span>
      </p>
      <p class="migrate_info_item">
        <span>Swap Fee</span> <span>0.1000%</span>
      </p>
      <p class="migrate_info_item">
        <span>Max. Fee</span> <span>5,140.00 Helmet</span>
      </p>
      <p class="migrate_info_item">
        <span>Min. Fee</span> <span>26.00 Helmet</span>
      </p>
      <span>Depositing 5,200,000 Guard could take up to 12 hours</span>
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
  </div>
</template>

<script>
import { fixD } from "~/assets/js/util.js";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import BurnSwapABI from "~/web3/abis/BurnSwap.json";
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
const BurnContractAddress = "0x035B5c1f21E0b5B8cb2adEBB5d2DB7B0e8ad8BF8";
const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
const Infinity =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
export default {
  components: {
    SuccessConfirmationDialog,
    WaitingConfirmationDialog,
  },
  data() {
    return {
      fixD,
      HelmetBalance: 0,
      ApproveStatus: false,
      BurnVolume: "",
      WaitingVisible: false,
      SuccessVisible: false,
      SuccessHash: "",
      WaitingText: "",
      Start: 0,
      Span: 0,
      TimeForMat: null,
      MigrationStatus: "UnOpen",
      Time: {
        Hour: "00",
        Minute: "00",
        Second: "00",
      },
    };
  },
  computed: {
    CurrentAccount() {
      return this.$store.state.userInfo;
    },
    RefreshData() {
      return this.$store.state.refreshNumber;
    },
  },
  watch: {
    CurrentAccount: {
      handler: "reloadData",
      immediate: true,
    },
    RefreshData: {
      handler: "refreshData",
      immediate: true,
    },
  },
  methods: {
    reloadData(Value) {
      if (Value) {
        this.$nextTick(() => {
          this.getBurnsInfo();
        });
      }
    },
    refreshData(NewValue, Value) {
      if (Value != NewValue && NewValue > Value) {
        this.getBurnsInfo();
      }
    },
    waitingClose() {
      this.WaitingVisible = false;
    },
    successClose() {
      this.SuccessVisible = false;
    },
    handleClickMax() {
      this.BurnVolume = Math.min(Number(this.HelmetBalance), 2000);
    },
    getBurnsInfo() {
      const HelmetContracts = new Contract(HelmetAddress, ERC20ABI.abi);
      const MulticallProvider = getOnlyMultiCallProvider();
      const Account = this.CurrentAccount.account;
      const PromiseList = [
        HelmetContracts.balanceOf(Account),
        HelmetContracts.allowance(Account, BurnContractAddress),
      ];
      MulticallProvider.all(PromiseList).then((res) => {
        const FixData = processResult(res);
        const [HelmetBalance, ApproveStatus] = FixData;
        this.HelmetBalance = fromWei(HelmetBalance);
        this.ApproveStatus = ApproveStatus > 0;
      });
    },
    handleClickMigrate() {
      if (!this.BurnVolume) {
        return;
      }
      const Account = this.CurrentAccount.account;
      if (this.ApproveStatus) {
        const BurnContracts = getContract(BurnSwapABI, BurnContractAddress);
        BurnContracts.methods
          .burnSwap(toWei(this.BurnVolume + ""), Account)
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.StakeLoading = false;
              this.$store.dispatch("refreshData");
              this.getBurnsInfo();
            }
          })
          .on("error", (error) => {
            this.StakeLoading = false;
            this.WaitingVisible = false;
            this.SuccessVisible = false;
          });
      } else {
        const ApproveContracts = getContract(ERC20ABI.abi, HelmetAddress);
        ApproveContracts.methods
          .approve(BurnContractAddress, Infinity)
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
            this.WaitingText = `You will approve HELMET to Helmet`;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.ApproveStatus = true;
              this.WaitingText = "";
              this.$store.dispatch("refreshData");
              this.getBurnsInfo();
            }
          })
          .on("error", (error) => {
            this.WaitingVisible = false;
            this.SuccessVisible = false;
            this.ApproveStatus = false;
          });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.migrate {
  background: #f9f4ef;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.migrate_title {
  font-size: 16px;
  font-family: IBMPlexSans-Bold, IBMPlexSans;
  font-weight: bold;
  color: #17173a;
  line-height: 20px;
}
.migrate_countdown {
  font-size: 14px;
  font-family: IBMPlexSans;
  color: rgba(23, 23, 58, 0.7);
  line-height: 18px;
  display: flex;
  align-items: center;
  margin-top: 7px;
  > div {
    margin-right: 4px;
  }
  > p {
    min-width: 18px;
    padding: 0 2px;
    height: 18px;
    background: #f2f0eb;
    border-radius: 3px;
    font-size: 12px;
    font-family: IBMPlexSans;
    color: #17173a;
    line-height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > span {
    margin: 0 2px;
    font-size: 12px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(23, 23, 58, 0.3);
    line-height: 12px;
  }
}
.migrate_text {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  span {
    &:nth-of-type(1) {
      font-size: 14px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      color: rgba(23, 23, 58, 0.7);
      line-height: 18px;
    }
    &:nth-of-type(2) {
      font-size: 14px;
      font-family: IBMPlexSans;
      color: #22292f;
      line-height: 18px;
    }
  }
}
.migrate_input {
  margin-top: 5px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #979797;
  position: relative;
  display: flex;
  align-items: center;
  > input {
    width: 100%;
    height: 100%;
    background: transparent;
    padding-left: 15px;
  }
  > span {
    width: 52px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    border-radius: 5px;
    border: 1px solid #e8e8eb;
    font-size: 12px;
    font-family: IBMPlexSans-Medium, IBMPlexSans;
    font-weight: 500;
    color: #17173a;
    line-height: 12px;
    position: absolute;
    right: 8px;
    cursor: pointer;
    &:hover {
      color: #fd7e14;
      border: 1px solid #fd7e14;
    }
  }
}
.migrate_button {
  border-radius: 5px;
}
.migrate_tips_wrap {
  width: 320px;
}
.migrate_tips_span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 17px;
  background: #17173a;
  border-radius: 2px;
  transform: skew(-20deg);
  margin-top: 7px;
  > span {
    display: block;
    transform: skew(20deg);
    font-size: 12px;
    font-family: IBMPlexSans;
    color: #ffffff;
  }
}
.migrate_tips {
  margin-top: 5px;
  font-size: 12px;
  font-family: IBMPlexSans;
  color: rgba(23, 23, 58, 0.6);
}
.migrate_info_wrap {
  width: 320px;
  margin-top: 20px;
}
.migrate_info_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 33px;
  border-bottom: 1px solid #d9d2cb;

  > span {
    &:nth-of-type(1) {
      font-size: 12px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 500;
      color: rgba(23, 23, 58, 0.7);
      line-height: 16px;
    }
    &:nth-of-type(2) {
      font-size: 12px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      color: #17173a;
      line-height: 16px;
    }
  }
}
@media screen and (min-width: 750px) {
  .migrate {
    width: 878px;
    background-image: url("../../assets/img/migration/migrate_bg.png");
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center center;
    padding: 30px;
    margin: 0 auto;
  }
  .migrate_text {
    width: 320px;
  }
  .migrate_input {
    width: 320px;
  }
  .migrate_button {
    width: 320px;
  }
  .migrate_tips {
    width: 320px;
  }
}
@media screen and (max-width: 750px) {
  .migrate {
    width: 95%;
    background-image: url("../../assets/img/migration/migrate_bg.png");
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center center;
    margin: 0 auto;
    padding: 30px 10px;
  }
  .migrate_text {
    width: 100%;
  }
  .migrate_input {
    width: 100%;
  }
  .migrate_button {
    width: 100%;
  }
  .migrate_tips {
    width: 100%;
  }
}
</style>