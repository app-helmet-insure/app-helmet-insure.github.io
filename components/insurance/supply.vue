<template>
  <div class="issue-insurance">
    <div
      class="issue-call"
      v-if="InsureTypeActive == 'Call' || InsureTypeActive == 'All'"
    >
      <p class="insure">
        <span>{{ $t("Content.InsurancePrice") }}</span>
        <span>
          {{ ActiveData.InsuranceName }} :
          {{ ActiveData.Call.StrikePrice }}
          {{ ActiveData.Call.UnderlyingSymbol }}
        </span>
      </p>
      <div class="dpr">
        <span class="left">DPR</span>
        <div class="info">
          <el-tooltip
            effect="dark"
            placement="top-start"
            :content="$t(`Tip.Dpr`)"
          >
            <svg
              t="1617039040708"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1287"
              width="16px"
              height="16px"
            >
              <path
                d="M512 43.904c258.112 0 468.096 209.984 468.096 468.096 0 258.112-209.984 468.096-468.096 468.096C253.888 980.096 43.904 770.112 43.904 512 43.904 253.888 253.888 43.904 512 43.904z m0 643.648a58.432 58.432 0 1 0-0.128 116.928A58.432 58.432 0 0 0 512 687.552z m0-468.096c-96.768 0-175.552 71.424-175.552 159.232 0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.112-20.352 50.112-45.568 0-37.632 33.792-68.224 75.264-68.224 41.472 0 75.264 30.592 75.264 68.224 0 37.696-33.792 68.288-75.264 68.288-27.712 0-50.176 20.352-50.176 45.504v91.008c0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.176-20.352 50.176-45.568V530.56c72.192-19.712 125.376-79.936 125.376-151.872 0-87.808-78.72-159.232-175.552-159.232z"
                p-id="1288"
              ></path>
            </svg>
          </el-tooltip>
        </div>
        <el-select
          v-model="ShowCallDPR"
          style="width: 100%"
          @change="handleChangeCallDPR"
        >
          <el-option key="0.0014" value="0.0014" label="0.14%">0.14%</el-option>
          <el-option key="0.0028" value="0.0028" label="0.28%">0.28%</el-option>
          <el-option key="0.0056" value="0.0056" label="0.56%">0.56%</el-option>
        </el-select>
      </div>
      <p class="expect_earn">
        {{ $t("Content.Earning") }}: {{ CallPremium }} HELMET
      </p>
      <div class="input">
        <el-input v-model="CallPolicyNumber" type="number" />
        <span class="text">{{ ActiveData.Call.CollateralSymbol }}</span>
        <span class="max" @click="CallPolicyNumber = CallBalance">{{
          $t("Table.ALL")
        }}</span>
      </div>
      <p class="balance">
        {{ $t("Content.UsableBalance") }}: {{ CallBalance }}
        {{ ActiveData.Call.CollateralSymbol }}
      </p>
      <button class="button call" @click="handleClickConfirm('Call')">
        {{ CallApproveStatus ? $t("Insurance.Insurance_text9") : "授权" }}
      </button>
    </div>
    <i></i>
    <div
      class="issue-put"
      v-if="InsureTypeActive == 'Put' || InsureTypeActive == 'All'"
    >
      <p class="insure">
        <span>{{ $t("Content.InsurancePrice") }}</span>
        <span>
          {{ ActiveData.InsuranceName }} :
          {{ ActiveData.Put.StrikePrice }}
          {{ ActiveData.Call.UnderlyingSymbol }}
        </span>
      </p>
      <div class="dpr">
        <span class="left">DPR</span>
        <div class="info">
          <el-tooltip
            effect="dark"
            placement="top-start"
            :content="$t(`Tip.Dpr`)"
          >
            <svg
              t="1617039040708"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1287"
              width="16px"
              height="16px"
            >
              <path
                d="M512 43.904c258.112 0 468.096 209.984 468.096 468.096 0 258.112-209.984 468.096-468.096 468.096C253.888 980.096 43.904 770.112 43.904 512 43.904 253.888 253.888 43.904 512 43.904z m0 643.648a58.432 58.432 0 1 0-0.128 116.928A58.432 58.432 0 0 0 512 687.552z m0-468.096c-96.768 0-175.552 71.424-175.552 159.232 0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.112-20.352 50.112-45.568 0-37.632 33.792-68.224 75.264-68.224 41.472 0 75.264 30.592 75.264 68.224 0 37.696-33.792 68.288-75.264 68.288-27.712 0-50.176 20.352-50.176 45.504v91.008c0 25.216 22.4 45.568 50.176 45.568 27.712 0 50.176-20.352 50.176-45.568V530.56c72.192-19.712 125.376-79.936 125.376-151.872 0-87.808-78.72-159.232-175.552-159.232z"
                p-id="1288"
              ></path>
            </svg>
          </el-tooltip>
        </div>
        <el-select
          v-model="ShowPutDPR"
          style="width: 100%"
          @change="handleChangePutDPR"
        >
          <el-option key="0.0014" value="0.0014" label="0.14%">0.14%</el-option>
          <el-option key="0.0028" value="0.0028" label="0.28%">0.28%</el-option>
          <el-option key="0.0056" value="0.0056" label="0.56%">0.56%</el-option>
        </el-select>
      </div>
      <p class="expect_earn">
        {{ $t("Content.Earning") }}: {{ PutPremium }} HELMET
      </p>
      <div class="input">
        <el-input v-model="PutPolicyNumber" type="number" />
        <span class="text">{{ ActiveData.Put.CollateralSymbol }}</span>
        <span class="max" @click="PutPolicyNumber = PutBalance">{{
          $t("Table.ALL")
        }}</span>
      </div>
      <p class="balance">
        {{ $t("Content.UsableBalance") }}:
        {{ PutBalance }}
        {{ ActiveData.Put.CollateralSymbol }}
      </p>
      <button class="button put" @click="handleClickConfirm('Put')">
        {{ PutApproveStatus ? $t("Insurance.Insurance_text10") : "授权" }}
      </button>
    </div>
    <!-- dialog -->
    <WaitingConfirmationDialog
      :DialogVisible="WaitingVisible"
      :DialogClose="waitingClose"
    >
      <div class="waiting_content" v-html="WaitingText"></div>
    </WaitingConfirmationDialog>
    <SuccessConfirmationDialog
      :DialogVisible="SuccessVisible"
      :DialogClose="successClose"
      :SuccessHash="SuccessHash"
    />
  </div>
</template>

<script>
import precision from "~/assets/js/precision.js";
import { fixD } from "~/assets/js/util.js";
import MiningABI from "../../abi/MiningABI.json";
import { getContract } from "../../web3/index.js";
import { fromWei, toWei } from "~/web3/index.js";
import { getTokenPrice } from "~/interface/event.js";
import OrderABI from "../../abi/OrderABI.json";
import ERC20ABI from "../../abi/ERC20ABI.json";
import WaitingConfirmationDialog from "~/components/dialogs/waiting-confirmation-dialog.vue";
import SuccessConfirmationDialog from "~/components/dialogs/success-confirmation-dialog.vue";
import { Order } from "../../interface";
const OrderAddress = "0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D";
export default {
  props: ["ActiveData", "InsureTypeActive"],
  components: {
    WaitingConfirmationDialog,
    SuccessConfirmationDialog,
  },
  data() {
    return {
      precision,
      CallPremium: 0,
      PutPremium: 0,
      CallPolicyNumber: "",
      PutPolicyNumber: "",
      ShowCallDPR: "0.14%",
      ShowPutDPR: "0.14%",
      CallDPR: 0.0014,
      PutDPR: 0.0014,
      PutBalance: 0,
      CallBalance: 0,
      CallTokenToHelmetPrice: 0,
      PutTokenToHelmetPrice: 0,
      CallApproveStatus: false,
      PutApproveStatus: false,
      WaitingVisible: false,
      SuccessVisible: false,
      WaitingText: "",
      SuccessHash: "",
    };
  },
  computed: {
    PremiumGroup() {
      return {
        CallDPR: this.CallDPR,
        PutDPR: this.CallDPR,
        CallPolicyNumber: this.CallPolicyNumber,
        PutPolicyNumber: this.PutPolicyNumber,
      };
    },
  },
  mounted() {
    this.getBalance();
    this.getApproveStatus();
    this.$nextTick(() => {
      this.getPrice();
    });
  },
  watch: {
    PremiumGroup: {
      handler: {
        handler: "watchPremium",
        immediate: true,
      },
    },
  },
  methods: {
    waitingClose() {
      this.WaitingVisible = false;
    },
    successClose() {
      this.SuccessVisible = false;
    },
    getBalance() {
      const Data = this.ActiveData;
      const CallCollateralAddress = Data.Call.CollateralAddress;
      const CallCollateralSymbol = Data.Call.CollateralSymbol;
      const PutCollateralAddress = Data.Put.CollateralAddress;
      const PutCollateralSymbol = Data.Put.CollateralSymbol;
      const Account = window.CURRENTADDRESS;
      if (CallCollateralSymbol === "BNB") {
        window.WEB3.eth.getBalance(Account).then((res) => {
          this.CallBalance = fixD(fromWei(res), 8);
        });
      } else {
        const Contracts = getContract(MiningABI, CallCollateralAddress);
        Contracts.methods
          .balanceOf(Account)
          .call()
          .then((res) => {
            this.CallBalance = fixD(fromWei(res), 8);
          });
      }
      if (PutCollateralSymbol === "BNB") {
        window.WEB3.eth.getBalance(Account).then((res) => {
          this.PutBalance = fixD(fromWei(res), 8);
        });
      } else {
        const Contracts = getContract(MiningABI, PutCollateralAddress);
        Contracts.methods
          .balanceOf(Account)
          .call()
          .then((res) => {
            this.PutBalance = fixD(fromWei(res), 8);
          });
      }
    },
    handleChangeCallDPR(value) {
      this.CallDPR = value;
    },
    handleChangePutDPR(value) {
      this.PutDPR = value;
    },
    async watchPremium(newValue) {
      let { CallDPR, PutDPR, CallPolicyNumber, PutPolicyNumber } = newValue;
      let { ShowExpiryDay, LastPrice } = this.ActiveData;
      let CallStrikePrice = this.ActiveData.Call.StrikePrice;
      let PutStrikePrice = this.ActiveData.Put.StrikePrice;
      let CallTokenToHelmetPrice = this.CallTokenToHelmetPrice;
      let PutTokenToHelmetPrice = this.PutTokenToHelmetPrice;
      if (CallPolicyNumber) {
        const NumberDPR =
          CallDPR * CallTokenToHelmetPrice * CallPolicyNumber * ShowExpiryDay;
        const NumberMIN =
          (Math.min(LastPrice - CallStrikePrice, 0) * CallPolicyNumber) /
          CallTokenToHelmetPrice;
        const Premium = NumberDPR - NumberMIN;
        this.CallPremium = Premium > 0 ? fixD(Premium, 8) : 0;
      }
      if (PutPolicyNumber) {
        const NumberDPR =
          PutDPR * PutTokenToHelmetPrice * PutPolicyNumber * ShowExpiryDay;
        const NumberMIN =
          (Math.min(PutStrikePrice - LastPrice, 0) * PutPolicyNumber) /
          PutTokenToHelmetPrice;
        const Premium = NumberDPR - NumberMIN;
        this.PutPremium = Premium > 0 ? fixD(Premium, 8) : 0;
      }
    },
    async getPrice() {
      const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
      let CallCollateralAddress = this.ActiveData.Call.CollateralAddress;
      let CallCollateralSymbol = this.ActiveData.Call.CollateralSymbol;
      let CallCollateralDecimals = this.ActiveData.Call.CollateralDecimals;
      let CallAmount = toWei("1", CallCollateralDecimals);
      let PutCollateralAddress = this.ActiveData.Put.CollateralAddress;
      let PutCollateralSymbol = this.ActiveData.Put.CollateralSymbol;
      let PutCollateralDecimals = this.ActiveData.Put.CollateralDecimals;
      let PutAmount = toWei("1", PutCollateralDecimals);
      let CallData;
      if (CallCollateralSymbol === "HELMET") {
        CallData = "1";
      } else {
        CallData = await getTokenPrice({
          fromTokenAddress: CallCollateralAddress,
          toTokenAddress: HelmetAddress,
          amount: CallAmount,
        });
      }
      let PutData = await getTokenPrice({
        fromTokenAddress: PutCollateralAddress,
        toTokenAddress: HelmetAddress,
        amount: PutAmount,
      });
      this.CallTokenToHelmetPrice =
        CallCollateralSymbol === "HELMET"
          ? "1"
          : fromWei(CallData.data.toTokenAmount);
      this.PutTokenToHelmetPrice = fromWei(PutData.data.toTokenAmount);
    },
    getApproveStatus() {
      let CallCollateralSymbol = this.ActiveData.Call.CollateralSymbol;
      let CallCollateralAddress = this.ActiveData.Call.CollateralAddress;
      let PutCollateralSymbol = this.ActiveData.Put.CollateralSymbol;
      let PutCollateralAddress = this.ActiveData.Put.CollateralAddress;
      let Account = window.CURRENTADDRESS;
      if (CallCollateralSymbol !== "BNB") {
        let CallContracts = getContract(ERC20ABI.abi, CallCollateralAddress);
        CallContracts.methods
          .allowance(Account, OrderAddress)
          .call()
          .then((res) => {
            if (Number(res) > 0) {
              this.CallApproveStatus = true;
            } else {
              this.CallApproveStatus = false;
            }
          });
      } else {
        this.CallApproveStatus = true;
      }
      if (PutCollateralSymbol !== "BNB") {
        let PutContracts = getContract(ERC20ABI.abi, PutCollateralAddress);
        PutContracts.methods
          .allowance(Account, OrderAddress)
          .call()
          .then((res) => {
            if (Number(res) > 0) {
              this.PutApproveStatus = true;
            } else {
              this.PutApproveStatus = false;
            }
          });
      } else {
        this.PutApproveStatus = true;
      }
    },
    ApproveToken(Type) {
      let CallCollateralSymbol = this.ActiveData.Call.CollateralSymbol;
      let CallCollateralAddress = this.ActiveData.Call.CollateralAddress;
      let PutCollateralSymbol = this.ActiveData.Put.CollateralSymbol;
      let PutCollateralAddress = this.ActiveData.Put.CollateralAddress;
      let Account = window.CURRENTADDRESS;
      const Infinity =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      if (Type === "Call") {
        let CallContracts = getContract(ERC20ABI.abi, CallCollateralAddress);
        CallContracts.methods
          .approve(OrderAddress, Infinity)
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
            this.WaitingText = `<p>You will approve <b>${CallCollateralSymbol}</b> to <b>Helmet.insure</b></p>`;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.CallApproveStatus = true;
            }
          })
          .on("error", function (error) {
            this.WaitingVisible = false;
            this.SuccessVisible = false;
            this.CallApproveStatus = false;
          });
      } else {
        let PutContracts = getContract(ERC20ABI.abi, PutCollateralAddress);
        PutContracts.methods
          .approve(OrderAddress, Infinity)
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
            this.WaitingText = `<p>You will approve <b>${PutCollateralSymbol}</b> to <b>Helmet.insure</b></p>`;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.PutApproveStatus = true;
            }
          })
          .on("error", function (error) {
            this.WaitingVisible = false;
            this.SuccessVisible = false;
            this.PutApproveStatus = false;
          });
      }
    },
    handleClickConfirm(Type) {
      if (Type === "Call") {
        if (this.CallApproveStatus) {
          this.waitConfirm(Type);
        } else {
          this.ApproveToken(Type);
        }
      } else {
        if (this.PutApproveStatus) {
          this.waitConfirm(Type);
        } else {
          this.ApproveToken(Type);
        }
      }
    },
    waitConfirm(Type) {
      if (!this.CallPolicyNumber && !this.PutPolicyNumber) {
        return;
      }
      let ActiveData = this.ActiveData;
      let symbol = ActiveData.InsuranceName;
      let volume, price;
      let collateral = ActiveData[Type].CollateralSymbol;
      let underlying = ActiveData[Type].UnderlyingSymbol;
      let strikeprice = ActiveData[Type].StrikePrice;
      let expiry = ActiveData.ShowExpiry;
      let type = Type;
      if (Type === "Call") {
        volume = this.CallPolicyNumber;
        price = this.CallPremium;
      } else {
        volume = this.PutPolicyNumber;
        price = this.PutPremium;
      }
      this.$confirm(
        this.$t("Dialogs.WaitText1", {
          symbol,
          type,
          volume,
          collateral,
          strikeprice,
          underlying,
          price,
          expiry,
        }),
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.supplyPolicy(Type);
        })
        .catch(() => {});
    },
    supplyPolicy(Type) {
      let ActiveData = this.ActiveData;
      let CallPolicyNumber = this.CallPolicyNumber;
      let PutPolicyNumber = this.PutPolicyNumber;
      let CallPremium = this.CallPremium;
      let PutPremium = this.PutPremium;
      let Private = false;
      let InsuranceType = ActiveData.InsuranceName;
      let StrikePriceDecimals = ActiveData[Type].StrikePriceDecimals;
      let PolicyPriceDecimals = ActiveData[Type].PolicyPriceDecimals;
      let CollateralDecimals = ActiveData[Type].CollateralDecimals;
      let CollateralSymbol = ActiveData[Type].CollateralSymbol;
      let Collateral = ActiveData[Type].CollateralAddress;
      let Underlying = ActiveData[Type].UnderlyingAddress;
      let Expiry = ActiveData.Expiry;
      let SettleToken = ActiveData.SettleTokenAddress;
      let Volume, Price, StrikePrice, Premium;
      if (Type === "Call") {
        Volume = CallPolicyNumber;
        Premium = CallPremium;
        Price = fixD(CallPremium / CallPolicyNumber, 8) + "";
        StrikePrice = ActiveData[Type].StrikePrice;
      } else {
        Volume = PutPolicyNumber;
        Premium = PutPremium;
        Price = fixD(PutPremium / PutPolicyNumber, 8) + "";
        StrikePrice = Number(1 / ActiveData[Type].StrikePrice) + "";
      }
      const SellContracts = getContract(OrderABI, OrderAddress);
      const Account = window.CURRENTADDRESS;
      if (CollateralSymbol !== "BNB") {
        SellContracts.methods
          .sell(
            Private,
            Collateral,
            Underlying,
            toWei(StrikePrice, StrikePriceDecimals),
            Expiry,
            toWei(Volume, CollateralDecimals),
            SettleToken,
            toWei(Price, PolicyPriceDecimals)
          )
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
            this.WaitingText = `
              <p>Supply <b>${Volume} ${InsuranceType}</b> Policys,</p>
              <p>Expected maximum is <b>${Premium}</b> HELMET</p>
            `;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
            }
          })
          .on("error", function (ereor) {
            this.WaitingVisible = false;
          });
      } else {
        SellContracts.methods
          .sellOnETH(
            Private,
            Underlying,
            toWei(StrikePrice, StrikePriceDecimals),
            Expiry,
            SettleToken,
            toWei(Price, PolicyPriceDecimals)
          )
          .send({ from: Account, value: toWei(Volume, CollateralDecimals) })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
            this.WaitingText = `
              <p>Supply <b>${Volume} ${InsuranceType}</b> Policys,</p>
              <p>Expected maximum is <b>${Premium}</b> HELMET</p>
            `;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
            }
          })
          .on("error", function (ereor) {
            this.WaitingVisible = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.insure {
  display: flex;
  flex-direction: column;
  span {
    &:nth-of-type(1) {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      @include themeify {
        color: darken($color: themed("color-17173a"), $amount: 50%);
      }
      line-height: 14px;
    }
    &:nth-of-type(2) {
      font-size: 16px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 16px;
      margin-top: 12px;
    }
  }
}
.dpr {
  margin-top: 20px;
  width: 370px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 14px;
  position: relative;
  .left {
    position: absolute;
    @include themeify {
      color: themed("color-17173a");
    }
    left: 12px;
    z-index: 9;
  }
  .info {
    position: absolute;
    display: flex;
    align-items: center;
    left: 40px;
    height: 100%;
    justify-content: center;
    z-index: 9;
    svg {
      margin: 0 4px 0 2px;
      cursor: pointer;
      width: 16px !important;
      height: 16px !important;
      fill: rgba(164, 162, 178, 1);
      &:hover {
        fill: #fd7e14;
      }
    }
  }
  ::v-deep .el-input__inner {
    padding-left: 60px;
  }
}
.expect_earn {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family: IBMPlexSans;
  @include themeify {
    color: darken($color: themed("color-17173a"), $amount: 30%);
  }
}
.input {
  width: 370px;
  height: 40px;
  border-radius: 5px;
  @include themeify {
    background: themed("color-ffffff");
  }
  display: flex;
  align-items: center;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    font-size: 14px;
    font-family: IBMPlexSans;
    @include themeify {
      background: themed("color-ffffff");
      color: themed("color-17173a");
    }
  }
  .text {
    position: absolute;
    font-size: 14px;
    font-family: IBMPlexSans;
    @include themeify {
      color: themed("color-17173a");
    }
    right: 62px;
  }
  .max {
    position: absolute;
    right: 12px;
    padding: 0px 8px;
    min-width: 40px;
    height: 24px;
    @include themeify {
      background: themed("insure_button");
      border: 1px solid themed("insure_button_border");
      color: themed("color-17173a");
    }
    &:hover {
      border: 1px solid themed("color-fd7e14") !important;
      color: themed("color-fd7e14") !important;
    }
    border-radius: 5px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
.balance {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family: IBMPlexSans;
  @include themeify {
    color: darken($color: themed("color-17173a"), $amount: 30%);
  }
}
.button {
  display: block;
  width: 370px;
  height: 40px;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
}
.call {
  background: #28a745;
  &:hover {
    background: #3daf57;
  }
}
.put {
  background: #dc3545;
  &:hover {
    background: #df4857;
  }
}
@media screen and (min-width: 750px) {
  .issue-insurance {
    display: flex;
    justify-content: space-evenly;
    padding: 40px 0;

    > i {
      display: block;
      width: 1px;
      height: auto;
      @include themeify {
        background: themed("color-e8e8eb");
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .icon {
    width: 20px;
    height: 20px;
  }
  .issue-insurance {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 16px 18px;
    > div {
      width: 100%;
      > p {
        display: flex;
        flex-direction: column;
        span {
          &:nth-of-type(1) {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            @include themeify {
              color: darken($color: themed("color-17173a"), $amount: 50%);
            }
            line-height: 14px;
          }
          &:nth-of-type(2) {
            font-size: 16px;
            font-family: IBMPlexSans-Medium, IBMPlexSans;
            font-weight: 600;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 16px;
            margin-top: 12px;
          }
        }
      }
      > span {
        font-size: 12px;
        font-family: IBMPlexSans;
        @include themeify {
          color: darken($color: themed("color-17173a"), $amount: 30%);
        }
        line-height: 14px;
      }
      > button {
        display: block;
        width: 100%;
        height: 40px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        margin-top: 20px;
      }
      .call {
        background: #28a745;
        &:hover {
          background: #3daf57;
        }
      }
      .put {
        background: #dc3545;
        &:hover {
          background: #df4857;
        }
      }
    }

    .input {
      margin-top: 16px;
      width: 100%;
      height: 40px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      position: relative;
      @include themeify {
        background: themed("color-ffffff");
        border: 2px solid themed("color-e8e8eb");
      }
      input {
        width: 100%;
        height: 100%;
        padding-left: 10px;
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          background: themed("color-ffffff");
          color: themed("color-17173a");
        }
      }
      .text {
        position: absolute;
        font-size: 14px;
        font-family: IBMPlexSans;
        @include themeify {
          color: themed("color-17173a");
        }
        right: 62px;
      }
      .max {
        position: absolute;
        right: 12px;
        padding: 0px 8px;
        min-width: 40px;
        height: 24px;
        @include themeify {
          background: themed("color-f8f9fa");
          border: 1px solid themed("color-e8e8eb");
          color: themed("color-17173a");
        }
        &:hover {
          border: 1px solid themed("color-fd7e14") !important;
          color: themed("color-fd7e14") !important;
        }
        border-radius: 5px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }

    > i {
      display: none;
    }
  }
}
</style>
