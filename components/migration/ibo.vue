<template>
  <div class="migration_ibo">
    <h3 class="migration_ibo_title">Migrate to GUARD for IBO</h3>
    <div class="migration_ibo_countdown">
      <div>Countdown</div>
      <p>{{ Time.Hour > 0 ? Time.Hour : "00" }}</p>
      <span>:</span>
      <p>{{ Time.Minute > 0 ? Time.Minute : "00" }}</p>
      <span>:</span>
      <p>{{ Time.Second > 0 ? Time.Second : "00" }}</p>
    </div>
    <div class="migration_ibo_text">
      <span>Helmet</span>
      <span>{{ fixD(HelmetBalance, 4) }}</span>
    </div>
    <div class="migration_ibo_input">
      <input type="text" v-model="BurnVolume" />
      <span @click="handleClickMax">{{
        $t("Insurance.Insurance_text18")
      }}</span>
    </div>
    <button
      class="b_button migration_ibo_button"
      v-if="MigrationStatus === 'UnOpen'"
    >
      {{ ApproveStatus ? $t("Migration.Migrate") : $t("Migration.Approve") }}
    </button>
    <button
      class="b_button migration_ibo_button"
      @click="handleClickMigrate"
      v-if="MigrationStatus === 'Ongoing'"
    >
      {{ ApproveStatus ? $t("Migration.Migrate") : $t("Migration.Approve") }}
    </button>
    <button
      class="b_button migration_ibo_button"
      v-if="MigrationStatus === 'Expired'"
    >
      {{ $t("NFT.Finished") }}
    </button>
    <p class="migration_ibo_tips">
      {{ $t("Migration.Tips8") }}
    </p>
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
import Migration from "~/web3/abis/Migration.json";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import OrderABI from "~/web3/abis/OrderABI.json";
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
const BurnContractAddress = "0x4F17B8f8BBebf9F73CF76992aa3F464821a27595";
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
  mounted() {
    this.TimeForMat = setInterval(() => {
      this.forMatTime();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.TimeForMat);
  },
  methods: {
    reloadData(Value) {
      if (Value) {
        this.$nextTick(() => {
          this.getBurnsInfo();
          this.getBurnsTime();
        });
      }
    },
    refreshData(Value, NewValue) {
      if (Value != NewValue) {
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
    getBurnsTime() {
      const TimeContracts = new Contract(BurnContractAddress, OrderABI);
      const BSCMulticallProvider = getOnlyMultiCallProvider();
      const PromiseList = [TimeContracts.begin(), TimeContracts.span()];
      BSCMulticallProvider.all(PromiseList).then((res) => {
        const FixData = processResult(res);
        const [Start, Span] = FixData;
        this.Start = Start;
        this.Span = Span;
      });
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
    forMatTime() {
      let NowTime = Date.now() / 1000;
      let StartTime = this.Start * 1;
      let FinishTime = this.Start * 1 + this.Span * 1;
      console.log(NowTime, StartTime, FinishTime, StartTime - NowTime > 0);
      let DownTime =
        StartTime - NowTime > 0 ? StartTime - NowTime : FinishTime - NowTime;
      const Day = Math.floor(DownTime / (24 * 3600));
      const Hour = Math.floor((DownTime - Day * 24 * 3600) / 3600);
      const Minute = Math.floor(
        (DownTime - Day * 24 * 3600 - Hour * 3600) / 60
      );
      const Second = Math.floor(
        DownTime - Day * 24 * 3600 - Hour * 3600 - Minute * 60
      );
      const FixHour = Hour > 9 ? Hour : "0" + Hour;
      const FixMinute = Minute > 9 ? Minute : "0" + Minute;
      const FixSecond = Second > 9 ? Second : "0" + Second;
      if (NowTime > StartTime && NowTime < FinishTime) {
        this.Time = {
          Hour: FixHour,
          Minute: FixMinute,
          Second: FixSecond,
        };
        this.MigrationStatus = "Ongoing";
      } else if (NowTime < StartTime) {
        this.Time = {
          Hour: FixHour,
          Minute: FixMinute,
          Second: FixSecond,
        };
        this.MigrationStatus = "UnOpen";
      } else {
        this.Time = {
          Hour: "00",
          Minute: "00",
          Second: "00",
        };
        this.MigrationStatus = "Expired";
      }
    },
    handleClickMigrate() {
      if (!this.BurnVolume) {
        return;
      }
      const Account = this.CurrentAccount.account;
      if (this.ApproveStatus) {
        const BurnContracts = getContract(Migration, BurnContractAddress);
        BurnContracts.methods
          .burn(toWei(this.BurnVolume + ""))
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
.migration_ibo {
  height: 307px;
  background: #f9f4ef;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.migration_ibo_title {
  font-size: 16px;
  font-family: IBMPlexSans-Bold, IBMPlexSans;
  font-weight: bold;
  color: #17173a;
  line-height: 20px;
}
.migration_ibo_countdown {
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
.migration_ibo_text {
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
.migration_ibo_input {
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
.migration_ibo_button {
  border-radius: 5px;
}
.migration_ibo_tips {
  margin-top: 10px;
  height: 40px;
  font-size: 12px;
  font-family: IBMPlexSans;
  color: rgba(23, 23, 58, 0.6);
  line-height: 20px;
}
@media screen and (min-width: 750px) {
  .migration_ibo {
    width: 878px;
    background-image: url("../../assets/img/migration/migration_ibo_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 301px;
    background-position: center center;
    padding-top: 30px;
    margin: 30px auto 0;
  }
  .migration_ibo_text {
    width: 320px;
  }
  .migration_ibo_input {
    width: 320px;
  }
  .migration_ibo_button {
    width: 320px;
  }
  .migration_ibo_tips {
    width: 320px;
  }
}
@media screen and (max-width: 750px) {
  .migration_ibo {
    width: 95%;
    background-image: url("../../assets/img/migration/migration_ibo_bg.png");
    background-repeat: no-repeat;
    background-size: auto 301px;
    background-position: center center;
    margin: 30px auto 0;
    padding: 30px 10px 0;
  }
  .migration_ibo_text {
    width: 100%;
  }
  .migration_ibo_input {
    width: 100%;
  }
  .migration_ibo_button {
    width: 100%;
  }
  .migration_ibo_tips {
    width: 100%;
  }
}
</style>