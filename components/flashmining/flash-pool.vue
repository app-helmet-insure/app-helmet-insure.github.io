<template>
  <div class="flash_pool">
    <div
      class="deposit"
      v-if="!ActiveFlag || (ActiveFlag && ActiveType == 'Stake')"
    >
      <div class="title">
        <span>{{ $t("Table.DAvailable") }}：</span>
        <p>
          <countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(CanDeposite)"
            :duration="2000"
            :decimals="8"
          />
          <span v-else>--</span>
          LPT
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="deposit"
            type="text"
            v-model="StakeVolume"
            :class="ActiveType == 'Stake' ? 'activeInput' : ''"
          />
          <span @click="StakeVolume = CanDeposite">{{ $t("Table.Max") }}</span>
        </div>
      </div>
      <div class="button">
        <button
          @click="toDeposite"
          :class="
            (StakeLoading ? 'disable b_button' : 'b_button',
            ActiveData.Status == 3 ? 'disable_button b_button' : 'b_button')
          "
        >
          <i :class="StakeLoading ? 'loading_pic' : ''"></i
          >{{
            !ApproveStatus ? $t("Table.Approve") : $t("Table.ConfirmDeposit")
          }}
        </button>
        <p>
          <span>{{ $t("Table.MyDeposits") }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(CanWithdraw)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            &nbsp;LPT</span
          >
        </p>
        <p>
          <span>{{ $t("Table.TotalDeposited") }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(TotalDeposite)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            &nbsp;LPT</span
          >
        </p>
        <p>
          <span>{{ $t("Table.MyPoolShare") }}：</span>
          <span> {{ isLogin ? MyPoolShare : "--" }} %</span>
        </p>
      </div>
      <a
        :href="`https://exchange.pancakeswap.finance/#/add/${ActiveData.OneLpAddress}/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8`"
        target="_blank"
        >From <i class="pancake"></i>Get {{ ActiveData.OneLpSymbol }}-HELMET
        LPT</a
      >
      <div class="ContractAddress" v-if="ActiveData.LeftShowToken">
        <span
          >{{ ActiveData.LeftShowToken.AddTokenSymbol }}
          {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ ActiveData.LeftShowToken.AddTokenAddress.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, ActiveData.LeftShowToken.AddTokenAddress)
            "
          ></i>
        </p>
      </div>
      <div class="addToken" v-if="ActiveData.LeftShowToken">
        <p @click="addTokenFn(ActiveData.LeftShowToken)">
          Add {{ ActiveData.LeftShowToken.AddTokenSymbol }} to MetaMask
        </p>
        <i></i>
      </div>
    </div>
    <i></i>
    <div
      class="withdraw"
      v-if="!ActiveFlag || (ActiveFlag && ActiveType == 'CLAIM')"
    >
      <div class="title">
        <span>{{ $t("Table.CallableMortgage") }}</span>
        <p>
          <countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(CanWithdraw)"
            :duration="2000"
            :decimals="8"
          />
          <span v-else>--</span>
          LPT
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="withdraw"
            type="text"
            v-model="CanWithdraw"
            disabled
            :class="ActiveType == 'CLAIM' ? 'activeInput' : ''"
          />
        </div>
      </div>
      <div class="button">
        <button
          @click="toExit"
          :class="ExitLoading ? 'disable b_button' : 'b_button'"
        >
          <i :class="ExitLoading ? 'loading_pic' : ''"></i
          >{{ $t("Table.ConfirmWithdraw") }} &
          {{ $t("Table.ClaimRewards") }}
        </button>
        <p>
          <span>
            {{ ActiveData.RewardSymbol }}
            {{ $t("Table.HELMETRewards") }}：</span
          >
          <span>
            <span>
              <countTo
                v-if="isLogin"
                :startVal="Number(0)"
                :endVal="Number(CanClaim)"
                :duration="2000"
                :decimals="8"
              />
              <span v-else>--</span>
              {{ ActiveData.RewardSymbol }}</span
            >
          </span>
        </p>
        <button
          @click="toClaim"
          :class="
            (ClaimLoading ? 'disable o_button' : 'o_button',
            ActiveData.Status == 3 ? 'disable_button o_button' : 'o_button')
          "
        >
          <i :class="ClaimLoading ? 'loading_pic' : ''"></i
          >{{ $t("Table.ClaimAllRewards") }}
        </button>
      </div>
      <div class="ContractAddress" v-if="ActiveData.RightShowToken">
        <span
          >{{ ActiveData.RightShowToken.AddTokenSymbol }}
          {{ $t("Table.ContractAddress") }}</span
        >
        <p>
          {{ ActiveData.RightShowToken.AddTokenAddress.toLowerCase() }}
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, ActiveData.RightShowToken.AddTokenAddress)
            "
          ></i>
        </p>
      </div>
      <div class="addToken" v-if="ActiveData.RightShowToken">
        <p @click="addTokenFn(ActiveData.RightShowToken)">
          Add {{ ActiveData.RightShowToken.AddTokenSymbol }} to MetaMask
        </p>
        <i></i>
      </div>
    </div>
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
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import countTo from "vue-count-to";
import { addToken } from "~/web3/wallet.js";
import MiningABI from "~/web3/abis/MiningABI.json";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import { getContract, toWei } from "../../web3/index.js";
import { Contract } from "ethers-multicall-x";
import WaitingConfirmationDialog from "~/components/dialogs/waiting-confirmation-dialog.vue";
import SuccessConfirmationDialog from "~/components/dialogs/success-confirmation-dialog.vue";
import {
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
} from "~/web3/index.js";
export default {
  props: ["ActiveData", "ActiveFlag", "ActiveType"],
  components: {
    countTo,
    SuccessConfirmationDialog,
    WaitingConfirmationDialog,
  },
  data() {
    return {
      fixD,
      CanDeposite: 0,
      CanWithdraw: 0,
      TotalDeposite: 0,
      CanClaim: 0,
      MyPoolShare: 0,
      StakeVolume: "",
      StakeLoading: false,
      ClaimLoading: false,
      ExitLoading: false,
      isLogin: false,
      ApproveStatus: false,
      WaitingVisible: false,
      SuccessVisible: false,
      SuccessHash: "",
      WaitingText: "",
    };
  },
  async mounted() {
    this.$nextTick(() => {
      this.getPoolInfo();
    });
  },
  watch: {
    userInfo: {
      handler: "userInfoWatch",
      immediate: true,
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    waitingClose() {
      this.WaitingVisible = false;
    },
    successClose() {
      this.SuccessVisible = false;
    },
    async addTokenFn(options) {
      let data = {
        tokenAddress: options.AddTokenAddress,
        tokenSymbol: options.AddTokenSymbol,
        tokenDecimals: options.add_token_decimals,
        tokenImage: "",
      };
      await addToken(data);
    },
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.isLogin;
      }
    },
    copyAdress(e, text) {
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
    getPoolInfo() {
      let { StakeAddress, PoolAddress, StakeDecimals, RewardDecimals } =
        this.ActiveData;
      const PoolContracts = new Contract(PoolAddress, MiningABI);
      const StakeContracts = new Contract(StakeAddress, MiningABI);
      const ApproveContracts = new Contract(StakeAddress, ERC20ABI.abi);
      const Account = window.CURRENTADDRESS;
      const PromiseList = [
        StakeContracts.balanceOf(Account),
        PoolContracts.balanceOf(Account),
        PoolContracts.totalSupply(),
        PoolContracts.earned(Account),
        ApproveContracts.allowance(Account, PoolAddress),
      ];
      const MulticallProvider = getOnlyMultiCallProvider();
      MulticallProvider.all(PromiseList).then((res) => {
        const FixData = processResult(res);
        const [
          CanDeposite,
          CanWithdraw,
          TotalDeposite,
          CanClaim,
          ApproveStatus,
        ] = FixData;
        this.CanDeposite = fromWei(CanDeposite, StakeDecimals);
        this.CanWithdraw = fromWei(CanWithdraw, StakeDecimals);
        this.TotalDeposite = fromWei(TotalDeposite, StakeDecimals);
        this.CanClaim = fromWei(CanClaim, RewardDecimals);
        this.MyPoolShare = fixD(
          (this.CanWithdraw / this.TotalDeposite) * 100,
          2
        );
        this.ApproveStatus = ApproveStatus > 0;
      });
    },
    // 抵押
    async toDeposite() {
      if (!this.StakeVolume || this.StakeLoading) {
        return;
      }
      const PoolAddress = this.ActiveData.PoolAddress;
      const StakeAddress = this.ActiveData.StakeAddress;
      const TokenSymbol = this.ActiveData.StakeSymbol;
      const Decimals = this.ActiveData.StakeDecimals;
      const Volume = toWei(this.StakeVolume, Decimals);
      const Account = window.CURRENTADDRESS;
      const Infinity =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      this.StakeLoading = true;

      if (!this.ApproveStatus) {
        const Contracts = getContract(ERC20ABI.abi, StakeAddress);
        Contracts.methods
          .approve(PoolAddress, Infinity)
          .send({ from: Account })
          .on("transactionHash", (hash) => {
            this.WaitingVisible = true;
            this.WaitingText = `You will approve ${TokenSymbol} to Helmet.insure`;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.StakeLoading = false;
              this.ApproveStatus = true;
              this.getPoolInfo();
            }
          })
          .on("error", function (error) {
            this.WaitingVisible = false;
            this.SuccessVisible = false;
            this.ApproveStatus = false;
            this.StakeLoading = false;
          });
      } else {
        const Contracts = getContract(MiningABI, PoolAddress);
        Contracts.methods
          .stake(Volume)
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
              this.getPoolInfo();
            }
          })
          .on("error", function (error) {
            this.WaitingVisible = false;
            this.SuccessVisible = false;
            this.StakeLoading = false;
          });
      }
    },
    async toClaim() {
      if (this.ClaimLoading) {
        return;
      }
      this.ClaimLoading = true;
      const ContractAddress = this.ActiveData.PoolAddress;
      const Account = window.CURRENTADDRESS;
      const Contracts = getContract(MiningABI, ContractAddress);
      Contracts.methods
        .getReward()
        .send({ from: Account })
        .on("transactionHash", (hash) => {
          this.WaitingVisible = true;
        })
        .on("receipt", (receipt) => {
          if (!this.SuccessVisible) {
            this.SuccessHash = receipt.transactionHash;
            this.WaitingVisible = false;
            this.SuccessVisible = true;
            this.ClaimLoading = false;
            this.getPoolInfo();
          }
        })
        .on("error", function (error) {
          this.WaitingVisible = false;
          this.SuccessVisible = false;
          this.ClaimLoading = false;
        });
    },
    // 退出
    async toExit() {
      if (this.ExitLoading) {
        return;
      }
      this.ExitLoading = true;
      let ContractAddress = this.ActiveData.PoolAddress;
      const Account = window.CURRENTADDRESS;
      const Contracts = getContract(MiningABI, ContractAddress);
      Contracts.methods
        .exit()
        .send({ from: Account })
        .on("transactionHash", (hash) => {
          this.WaitingVisible = true;
        })
        .on("receipt", (receipt) => {
          if (!this.SuccessVisible) {
            this.SuccessHash = receipt.transactionHash;
            this.WaitingVisible = false;
            this.SuccessVisible = true;
            this.ExitLoading = false;
            this.getPoolInfo();
          }
        })
        .on("error", function (error) {
          this.WaitingVisible = false;
          this.SuccessVisible = false;
          this.ExitLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" soped>
@import "../../assets/css/flash_pool.scss";
</style>