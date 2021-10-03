<template>
  <div class="issue_insurance">
    <div class="issue_insurance_wrap">
      <div
        class="issue_call"
        v-if="ActiveType == 'Call' || ActiveType == 'All'"
      >
        <div class="insure_price">
          <p>{{ $t("Content.InsurancePrice") }}</p>
          <div class="input">
            <el-input
              v-model="CallStrikePrice"
              :maxlength="ActiveData.LastPriceDecimals"
              ref="CallStrikePrice"
            />
            <span>{{ ActiveData.InsurancePut }}</span>
          </div>
        </div>
        <div class="slider_call">
          <div class="slider_info">
            <span>+50%</span>
            <el-slider
              v-model="SliderCallStrikePrice"
              :min="50"
              :max="150"
              :step="1"
              :format-tooltip="formatCallStrikeTooltip"
            />
            <span>+150%</span>
          </div>
          <svg
            class="icon slider_change"
            aria-hidden="true"
            @click="handleClickCallStrikePrice"
          >
            <use xlink:href="#icon-change"></use>
          </svg>
        </div>
        <div class="insure_dpr">
          <div class="dpr_desc">
            <span class="left">DPR</span>
            <span class="info">
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
            </span>
          </div>
          <div class="dpr_check">
            <span
              v-for="DPR in PremiumDPR"
              :key="DPR.Number"
              :class="CallDPR === DPR.Number ? 'current_dpr' : ''"
              @click="CallDPR = DPR.Number"
            >
              {{ DPR.ShowNumber }}
            </span>
          </div>
        </div>
        <p class="expect_earn">
          {{ $t("Content.Earning") }}: {{ CallPremium }} HELMET
        </p>
        <div class="input">
          <el-input v-model="CallPolicyNumber" type="number" />
          <span class="text">{{ ActiveData.InsuranceName }}</span>
          <span class="max" @click="CallPolicyNumber = CallBalance">{{
            $t("Table.ALL")
          }}</span>
        </div>
        <p class="balance">
          {{ $t("Content.UsableBalance") }}: {{ CallBalance }}
          {{ ActiveData.InsuranceName }}
        </p>
        <button class="button call" @click="handleClickConfirm('Call')">
          {{
            CallApproveStatus
              ? $t("Insurance.Insurance_text9")
              : $t("Table.Approve")
          }}
        </button>
        <p
          class="insurance_tip"
          v-show="
            Number(CallStrikePrice) > 0 &&
            Number(CallStrikePrice) < Number(ActiveData.LastPrice)
          "
        >
          <i></i
          ><span>{{
            $t("Dialogs.InsuranceTip1", { name: ActiveData.InsuranceName })
          }}</span>
        </p>
      </div>
      <i></i>
      <div class="issue_put" v-if="ActiveType == 'Put' || ActiveType == 'All'">
        <div class="insure_price">
          <p>{{ $t("Content.InsurancePrice") }}</p>
          <div class="input">
            <el-input
              v-model="PutStrikePrice"
              :maxlength="ActiveData.LastPriceDecimals"
              ref="PutStrikePrice"
            />
            <span>
              {{ ActiveData.InsurancePut }}
            </span>
          </div>
        </div>
        <div class="slider_put">
          <div class="slider_info">
            <span>-25%</span>
            <el-slider
              v-model="SliderPutStrikePrice"
              :min="25"
              :max="75"
              :step="1"
              :format-tooltip="formatPutStrikeTooltip"
            />
            <span>-75%</span>
          </div>
          <svg
            class="slider_change"
            aria-hidden="true"
            @click="handleClickPutStrikePrice"
          >
            <use xlink:href="#icon-change"></use>
          </svg>
        </div>
        <div class="insure_dpr">
          <div class="dpr_desc">
            <span class="left">DPR</span>
            <span class="info">
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
            </span>
          </div>
          <div class="dpr_check">
            <span
              v-for="DPR in PremiumDPR"
              :key="DPR.Number"
              :class="PutDPR === DPR.Number ? 'current_dpr' : ''"
              @click="PutDPR = DPR.Number"
            >
              {{ DPR.ShowNumber }}
            </span>
          </div>
        </div>
        <p class="expect_earn">
          {{ $t("Content.Earning") }}: {{ PutPremium }} HELMET
        </p>
        <div class="input">
          <el-input v-model="PutPolicyNumber" type="number" />
          <span class="text">{{ ActiveData.InsurancePut }}</span>
          <span class="max" @click="PutPolicyNumber = PutBalance">{{
            $t("Table.ALL")
          }}</span>
        </div>
        <p class="balance">
          {{ $t("Content.UsableBalance") }}:
          {{ PutBalance }}
          {{ ActiveData.InsurancePut }}
        </p>
        <button class="button put" @click="handleClickConfirm('Put')">
          {{
            PutApproveStatus
              ? $t("Insurance.Insurance_text10")
              : $t("Table.Approve")
          }}
        </button>
        <p
          class="insurance_tip"
          v-show="
            Number(PutStrikePrice) > 0 &&
            Number(PutStrikePrice) > Number(ActiveData.LastPrice)
          "
        >
          <i></i
          ><span>{{
            $t("Dialogs.InsuranceTip1", { name: ActiveData.InsuranceName })
          }}</span>
        </p>
      </div>
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
import MiningABI from "~/web3/abis/MiningABI.json";
import { getContract } from "../../web3/index.js";
import { fromWei, toWei } from "~/web3/index.js";
import { getTokenPrice } from "~/interface/event.js";
import OrderABI from "~/web3/abis/OrderABI.json";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import WaitingConfirmationDialog from "~/components/dialogs/waiting-confirmation-dialog.vue";
import SuccessConfirmationDialog from "~/components/dialogs/success-confirmation-dialog.vue";
import { getCurrentInsurance } from "../../config/insurance.js";
const OrderAddress = "0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D";
export default {
  props: ["ActiveData", "ActiveType"],
  components: {
    WaitingConfirmationDialog,
    SuccessConfirmationDialog,
  },
  data() {
    return {
      precision,
      fixD,
      CallPremium: 0,
      PutPremium: 0,
      CallPolicyNumber: "",
      PutPolicyNumber: "",
      CallDPR: 0.0014,
      PutDPR: 0.0014,
      PutBalance: 0,
      CallBalance: 0,
      CallTokenToHelmetPrice: 0,
      PutTokenToHelmetPrice: 0,
      CallApproveStatus: false,
      PutApproveStatus: false,
      CallStrikePrice: "",
      SliderCallStrikePrice: 100,
      PutStrikePrice: "",
      SliderPutStrikePrice: 50,
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
        PutDPR: this.PutDPR,
        CallPolicyNumber: this.CallPolicyNumber,
        PutPolicyNumber: this.PutPolicyNumber,
        CallStrikePrice: this.CallStrikePrice,
        PutStrikePrice: this.PutStrikePrice,
      };
    },
    PremiumDPR() {
      return [
        {
          Number: 0.0014,
          ShowNumber: "0.14%",
        },
        {
          Number: 0.0028,
          ShowNumber: "0.28%",
        },
        {
          Number: 0.0056,
          ShowNumber: "0.56%",
        },
      ];
    },
    CurrentAccount() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    CurrentAccount: {
      handler: "reloadData",
      immediate: true,
    },
    PremiumGroup: {
      handler: {
        handler: "watchPremium",
        immediate: true,
      },
    },
    SliderCallStrikePrice: {
      handler: {
        handler: "watchSliderCall",
        immediate: true,
      },
    },
    SliderPutStrikePrice: {
      handler: {
        handler: "watchSliderPut",
        immediate: true,
      },
    },
  },
  methods: {
    reloadData(Value) {
      if (Value) {
        this.getBalance();
        this.getApproveStatus();
        this.$nextTick(() => {
          this.getPrice();
        });
      }
    },
    watchSliderCall(Value) {
      this.CallStrikePrice =
        fixD(
          this.ActiveData.LastPrice * (1 + Value / 100),
          this.ActiveData.LastPriceDecimals
        ) + "";
    },
    watchSliderPut(Value) {
      this.PutStrikePrice =
        fixD(
          this.ActiveData.LastPrice * (1 - Value / 100),
          this.ActiveData.LastPriceDecimals
        ) + "";
    },
    waitingClose() {
      this.WaitingVisible = false;
    },
    successClose() {
      this.SuccessVisible = false;
    },

    handleClickCallStrikePrice() {
      this.CallStrikePrice = "";
      this.$refs.CallStrikePrice.focus();
    },
    handleClickPutStrikePrice() {
      this.PutStrikePrice = "";
      this.$refs.PutStrikePrice.focus();
    },
    formatCallStrikeTooltip(value) {
      return `+${value}%`;
    },
    formatPutStrikeTooltip(value) {
      return `-${value}%`;
    },
    getBalance() {
      let CallInsurance = getCurrentInsurance({
        Type: "Call",
        Insurance: this.ActiveData.InsuranceName,
      });
      let PutInsurance = getCurrentInsurance({
        Type: "Put",
        Insurance: this.ActiveData.InsuranceName,
      });
      const CallCollateralAddress = CallInsurance.CollateralAddress;
      const CallCollateralDecimals = CallInsurance.CollateralDecimals;
      const CallCollateralSymbol = CallInsurance.CollateralSymbol;
      const PutCollateralAddress = PutInsurance.CollateralAddress;
      const PutCollateralDecimals = PutInsurance.CollateralDecimals;
      const PutCollateralSymbol = PutInsurance.CollateralSymbol;
      const Account = this.CurrentAccount.account;
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
            this.CallBalance = fixD(fromWei(res, CallCollateralDecimals), 8);
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
            this.PutBalance = fixD(fromWei(res, PutCollateralDecimals), 8);
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
      let {
        CallDPR,
        PutDPR,
        CallPolicyNumber,
        PutPolicyNumber,
        CallStrikePrice,
        PutStrikePrice,
      } = newValue;
      let { ShowExpiryDay, LastPrice } = this.ActiveData;
      let CallTokenToHelmetPrice = this.CallTokenToHelmetPrice;
      let PutTokenToHelmetPrice = this.PutTokenToHelmetPrice;
      if (CallPolicyNumber) {
        const NumberDPR =
          CallDPR * CallTokenToHelmetPrice * CallPolicyNumber * ShowExpiryDay;
        const NumberMIN =
          (Math.min(Number(LastPrice) - Number(CallStrikePrice), 0) *
            CallPolicyNumber) /
          CallTokenToHelmetPrice;
        const Premium = NumberDPR - NumberMIN;
        this.CallPremium = Premium > 0 ? fixD(Premium, 8) : 0;
      }
      if (PutPolicyNumber) {
        const NumberDPR =
          PutDPR * PutTokenToHelmetPrice * PutPolicyNumber * ShowExpiryDay;
        const NumberMIN =
          (Math.min(Number(PutStrikePrice) - Number(LastPrice), 0) *
            PutPolicyNumber) /
          PutTokenToHelmetPrice;
        const Premium = NumberDPR - NumberMIN;
        this.PutPremium = Premium > 0 ? fixD(Premium, 8) : 0;
      }
    },
    async getPrice() {
      let CallInsurance = getCurrentInsurance({
        Type: "Call",
        Insurance: this.ActiveData.InsuranceName,
      });
      let PutInsurance = getCurrentInsurance({
        Type: "Put",
        Insurance: this.ActiveData.InsuranceName,
      });
      const CallCollateralAddress = CallInsurance.CollateralAddress;
      const CallCollateralDecimals = CallInsurance.CollateralDecimals;
      const CallCollateralSymbol = CallInsurance.CollateralSymbol;
      let CallAmount = toWei("1", CallCollateralDecimals);
      const PutCollateralAddress = PutInsurance.CollateralAddress;
      const PutCollateralDecimals = PutInsurance.CollateralDecimals;
      const PutCollateralSymbol = PutInsurance.CollateralSymbol;
      const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
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
      let CallInsurance = getCurrentInsurance({
        Type: "Call",
        Insurance: this.ActiveData.InsuranceName,
      });
      let PutInsurance = getCurrentInsurance({
        Type: "Put",
        Insurance: this.ActiveData.InsuranceName,
      });
      let CallCollateralSymbol = CallInsurance.CollateralSymbol;
      let CallCollateralAddress = CallInsurance.CollateralAddress;
      let PutCollateralSymbol = PutInsurance.CollateralSymbol;
      let PutCollateralAddress = PutInsurance.CollateralAddress;
      let Account = this.CurrentAccount.account;
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
      let CallInsurance = getCurrentInsurance({
        Type: "Call",
        Insurance: this.ActiveData.InsuranceName,
      });
      let PutInsurance = getCurrentInsurance({
        Type: "Put",
        Insurance: this.ActiveData.InsuranceName,
      });
      let CallCollateralSymbol = CallInsurance.CollateralSymbol;
      let CallCollateralAddress = CallInsurance.CollateralAddress;
      let PutCollateralSymbol = PutInsurance.CollateralSymbol;
      let PutCollateralAddress = PutInsurance.CollateralAddress;
      let Account = this.CurrentAccount.account;
      const Infinity =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      if (Type === "Call") {
        let CallContracts = getContract(ERC20ABI.abi, CallCollateralAddress);
        CallContracts.methods
          .approve(OrderAddress, Infinity)
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
            this.WaitingText = `<p>You will approve <b>${CallCollateralSymbol}</b> to <b>Helmet</b></p>`;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.CallApproveStatus = true;
            }
          })
          .on("error", (error) => {
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
            this.WaitingText = `<p>You will approve <b>${PutCollateralSymbol}</b> to <b>Helmet</b></p>`;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.PutApproveStatus = true;
            }
          })
          .on("error", (error) => {
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
      if (
        (Type === "Call" && !this.CallPolicyNumber) ||
        !this.CallStrikePrice ||
        (Type === "Put" && !this.PutPolicyNumber) ||
        !this.PutStrikePrice
      ) {
        return;
      }
      let CurrentInsurance = getCurrentInsurance({
        Type: Type,
        Insurance: this.ActiveData.InsuranceName,
      });
      let symbol = CurrentInsurance.InsuranceName;
      let collateral = CurrentInsurance.CollateralSymbol;
      let underlying = CurrentInsurance.UnderlyingSymbol;
      let expiry = CurrentInsurance.ShowExpiry;
      let volume, price, strikeprice;
      let type = Type;
      if (Type === "Call") {
        volume = this.CallPolicyNumber;
        price = this.CallPremium;
        strikeprice = Number(this.CallStrikePrice);
      } else {
        volume = this.PutPolicyNumber;
        price = this.PutPremium;
        strikeprice = Number(this.PutStrikePrice);
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
        "NOTICE",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.supplyPolicy(Type);
        })
        .catch(() => {});
    },
    supplyPolicy(Type) {
      let CurrentInsurance = getCurrentInsurance({
        Type: Type,
        Insurance: this.ActiveData.InsuranceName,
      });
      let CallPolicyNumber = this.CallPolicyNumber;
      let PutPolicyNumber = this.PutPolicyNumber;
      let CallPremium = this.CallPremium;
      let PutPremium = this.PutPremium;
      let Private = false;
      const {
        InsuranceName,
        StrikePriceDecimals,
        PolicyPriceDecimals,
        CollateralDecimals,
        CollateralSymbol,
        CollateralAddress,
        UnderlyingAddress,
        Expiry,
        SettleTokenAddress,
      } = CurrentInsurance;

      let Volume, Price, StrikePrice, Premium;
      if (Type === "Call") {
        Volume = CallPolicyNumber;
        Premium = CallPremium;
        Price = fixD(CallPremium / CallPolicyNumber, 8) + "";
        StrikePrice = this.CallStrikePrice;
      } else {
        Volume = PutPolicyNumber;
        Premium = PutPremium;
        Price = fixD(PutPremium / PutPolicyNumber, 8) + "";
        StrikePrice = Number(1 / this.PutStrikePrice) + "";
      }
      const SellContracts = getContract(OrderABI, OrderAddress);
      const Account = this.CurrentAccount.account;
      if (CollateralSymbol !== "BNB") {
        SellContracts.methods
          .sell(
            Private,
            CollateralAddress,
            UnderlyingAddress,
            toWei(StrikePrice, StrikePriceDecimals),
            Expiry,
            toWei(Volume, CollateralDecimals),
            SettleTokenAddress,
            toWei(Price, PolicyPriceDecimals)
          )
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
            this.WaitingText = `
              <p>Supply <b>${Volume} ${InsuranceName}</b> Policys,</p>
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
          .on("error", (ereor) => {
            this.WaitingVisible = false;
          });
      } else {
        SellContracts.methods
          .sellOnETH(
            Private,
            UnderlyingAddress,
            toWei(StrikePrice, StrikePriceDecimals),
            Expiry,
            SettleTokenAddress,
            toWei(Price, PolicyPriceDecimals)
          )
          .send({ from: Account, value: toWei(Volume, CollateralDecimals) })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
            this.WaitingText = `
              <p>Supply <b>${Volume} ${InsuranceName}</b> Policys,</p>
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
          .on("error", (ereor) => {
            this.WaitingVisible = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/themes.scss";

.insure_price {
  display: flex;
  flex-direction: column;
  p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    @include themeify {
      color: themed("color-17173a");
    }
    opacity: 0.4;
    line-height: 14px;
  }
  .input {
    margin-top: 6px;
    width: 100%;
    position: relative;
    .el-input__inner {
      padding-right: 50px;
    }
    span {
      position: absolute;
      right: 10px;
      font-size: 14px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 600;
      @include themeify {
        color: themed("color-17173a");
      }

      line-height: 16px;
    }
  }
}
.slider_call,
.slider_put {
  width: 100%;
  margin: 15px auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.slider_info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  span {
    font-size: 14px;
    font-family: IBMPlexSans-Medium, IBMPlexSans;
    font-weight: 600;
    @include themeify {
      color: themed("color-17173a");
    }
  }
  > div {
    flex: 1;
    margin: 0 10px;
  }
}
.slider_change {
  width: 30px;
  height: 30px;
  @include themeify {
    fill: themed("color-17173a");
  }
  cursor: pointer;
}
.insure_dpr {
  margin-top: 16px;
  width: 100%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 14px;
  .dpr_desc {
    display: flex;
    align-items: center;
    .left {
      @include themeify {
        color: themed("color-17173a");
      }
      opacity: 0.4;
      left: 12px;
      z-index: 9;
    }
    .info {
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
  .dpr_check {
    display: flex;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-left: 20px;
      width: 60px;
      height: 32px;
      border-radius: 5px;
      font-size: 14px;
      line-height: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      @include themeify {
        color: themed("insure_button_text");
        background: themed("insure_button");
        border: 1px solid themed("insure_button_border");
      }
      &:hover {
        color: #fd7e14 !important;
        border: 1px solid #fd7e14 !important;
      }
    }
    .current_dpr {
      color: #fd7e14 !important;
      border: 1px solid #fd7e14 !important;
    }
  }
}
.expect_earn {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family: IBMPlexSans;
  @include themeify {
    color: themed("color-17173a");
  }
  opacity: 0.7;
}
.input {
  width: 100%;
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
    color: themed("color-17173a");
  }
  opacity: 0.7;
}
.button {
  display: block;
  width: 100%;
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
.insurance_tip {
  margin-top: 14px;
  padding: 6px 20px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  color: #ffb801;
  background: rgba(255, 184, 1, 0.1);
}
.issue_insurance {
  padding-bottom: 50px;
}
@media screen and (min-width: 750px) {
  .issue_insurance_wrap {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 40px 0;
    .issue_call,
    .issue_put {
      width: 370px;
    }
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
  .issue_call,
  .issue_put {
    width: 100%;
  }
  .issue_insurance_wrap {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    > i {
      display: none;
    }
  }
}
</style>
