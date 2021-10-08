<template>
  <div class="mining_pool">
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
            :decimals="4"
          />
          <span v-else>--</span>
          {{ ActiveData.StakeUnit }}
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
          <span @click="handleClickMax()">{{ $t("Table.Max") }}</span>
        </div>
      </div>
      <div class="button">
        <button
          v-if="ActiveData.PoolType === 'compound'"
          @click="toDeposite"
          :class="
            (StakeLoading ? 'disable b_button' : 'b_button',
            ActiveData.Status == 3 ? 'disable_button b_button' : 'b_button')
          "
        >
          <i :class="StakeLoading ? 'loading_pic' : ''"></i
          >{{
            !ApproveStatus
              ? $t("Table.Approve")
              : Number(CanClaim1)
              ? $t("Table.StakeAndCompound")
              : $t("Table.ConfirmDeposit")
          }}
        </button>
        <button
          v-else
          @click="toDeposite"
          :class="
            (StakeLoading ? 'disable b_button' : 'b_button',
            ActiveData.Status == 3 ||
            (ActiveData.Max && Number(MaxStaking) === Number(CanWithdraw))
              ? 'disable_button b_button'
              : 'b_button')
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
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ ActiveData.StakeUnit }}</span
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
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ ActiveData.StakeUnit }}</span
          >
        </p>
        <section>
          <p>
            <span>{{ $t("Table.MyPoolShare") }}：</span>
            <span> {{ isLogin ? MyPoolShare : "--" }} %</span>
          </p>
          <div style="display: flex">
            <p
              class="jump_text"
              v-html="ActiveData.JumpLink1"
              v-if="ActiveData.JumpLink1"
            ></p>
            <p
              class="jump_text"
              v-html="ActiveData.JumpLink2"
              v-if="ActiveData.JumpLink2"
            ></p>
          </div>
        </section>
      </div>
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
      <div v-if="ActiveData.Max">
        <p class="jump_text">
          <a> {{ $t("Dialogs.MaxStaking", { number: MaxStaking }) }}</a>
        </p>
      </div>
    </div>
    <div
      class="withdraw"
      v-if="!ActiveFlag || (ActiveFlag && ActiveType == 'Claim')"
    >
      <div class="title">
        <span>{{ $t("Table.CallableMortgage") }}</span>
        <p>
          <countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(CanWithdraw)"
            :duration="2000"
            :decimals="4"
          />
          <span v-else>--</span>
          {{ ActiveData.StakeUnit }}
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="withdraw"
            type="text"
            v-model="CanWithdraw"
            disabled
            :class="ActiveType == 'Claim' ? 'activeInput' : ''"
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
        <p v-if="ActiveData.HaveReward1">
          <span
            ><i>{{ ActiveData.Reward1Symbol }}</i>
            {{ $t("Table.HELMETRewards") }}：</span
          >
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(CanClaim1)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            {{ ActiveData.Reward1Symbol }}</span
          >
        </p>
        <p v-if="ActiveData.HaveReward2">
          <span
            ><i>{{ ActiveData.Reward2Symbol }}</i>
            {{ $t("Table.HELMETRewards") }}：</span
          >
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(CanClaim2)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            {{ ActiveData.Reward2Symbol }}</span
          >
        </p>
        <!-- compound -->
        <button
          v-if="ActiveData.Compound"
          @click="toCompound"
          :class="ClaimLoading ? 'disable o_button' : 'o_button'"
        >
          <i :class="ClaimLoading ? 'loading_pic' : ''"></i
          >{{ $t("Table.Compound") }}
        </button>
        <!-- claim -->
        <button
          v-else
          @click="toClaim"
          :class="
            (ClaimLoading ? 'disable o_button' : 'o_button',
            ActiveData.Status === 3 ? 'disable_button o_button' : 'o_button')
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
      <div class="tips" v-if="ActiveData.Tips">
        {{ $t("Tip.MiningTip3") }}
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
  </div>
</template>

<script>
import { fixD } from "~/assets/js/util.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import countTo from "vue-count-to";
import { addToken } from "~/web3/wallet.js";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
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
  props: ["ActiveData", "ActiveFlag", "ActiveType"],
  components: {
    countTo,
    SuccessConfirmationDialog,
    WaitingConfirmationDialog,
  },
  data() {
    return {
      CanDeposite: 0,
      CanWithdraw: 0,
      TotalDeposite: 0,
      CanClaim1: 0,
      CanClaim2: 0,
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
      MaxStaking: 0,
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

  methods: {
    reloadData(Value) {
      if (Value) {
        this.isLogin = Value.isLogin;
        this.$nextTick(() => {
          this.getPoolInfo();
        });
      }
    },
    waitingClose() {
      this.WaitingVisible = false;
    },
    successClose() {
      this.SuccessVisible = false;
    },
    handleClickMax() {
      if (this.ActiveData.Max) {
        this.StakeVolume = Math.min(
          this.CanDeposite,
          this.MaxStaking - this.CanWithdraw
        );
      } else {
        this.StakeVolume = this.CanDeposite;
      }
    },
    async addTokenFn(options) {
      let data = {
        tokenAddress: options.AddTokenAddress,
        tokenSymbol: options.AddTokenSymbol,
        tokenDecimals: options.ADDTOKEN_DECIMALS,
        tokenImage: "",
      };
      await addToken(data);
    },
    hadnleShowOnePager(e, onePager) {
      if (e.target.tagName === "I" && onePager) {
        let Earn = onePager;
        this.$bus.$emit("OPEN_ONEPAGER", {
          showFlag: true,
          title: `What is $${onePager}?`,
          text: onePager,
        });
      } else {
        return;
      }
    },

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
    getPoolInfo() {
      let {
        StakeAddress,
        PoolAddress,
        StakeDecimals,
        RewardDecimals,
        NoProxy,
        PoolABI,
        StakeABI,
        ProxyPid,
        PoolType,
        CanWithDrawMethods,
        CanClaim1Methods,
        CanClaim2Methods,
      } = this.ActiveData;
      const PoolContracts = new Contract(PoolAddress, PoolABI);
      const StakeContracts = new Contract(StakeAddress, StakeABI);
      const ApproveContracts = new Contract(StakeAddress, ERC20ABI.abi);
      const Account = this.CurrentAccount.account;

      let PromiseList;
      let Params = NoProxy ? [ProxyPid, Account] : [Account];
      if (PoolType === "candy") {
        PromiseList = [
          StakeContracts.balanceOf(Account),
          PoolContracts.balanceOf(Account),
          PoolContracts.totalSupply(),
          PoolContracts.earned(Account),
          PoolContracts.stakingMax(),
          ApproveContracts.allowance(Account, PoolAddress),
        ];
      } else {
        PromiseList = [
          StakeContracts.balanceOf(Account),
          PoolContracts[CanWithDrawMethods](...Params),
          NoProxy ? StakeContracts.totalSupply() : PoolContracts.totalSupply(),
          PoolContracts[CanClaim1Methods](...Params),
          ApproveContracts.allowance(Account, PoolAddress),
        ];
        if (CanClaim2Methods) {
          PromiseList.push(PoolContracts[CanClaim2Methods](...Params));
        }
      }
      const MulticallProvider = getOnlyMultiCallProvider();
      MulticallProvider.all(PromiseList).then((res) => {
        const FixData = processResult(res);
        if (PoolType === "candy") {
          const [
            CanDeposite,
            CanWithdraw,
            TotalDeposite,
            CanClaim1,
            MaxStaking,
            ApproveStatus,
          ] = FixData;
          this.CanDeposite = fromWei(CanDeposite, StakeDecimals);
          this.CanWithdraw = fromWei(
            NoProxy ? CanWithdraw[0] : CanWithdraw,
            StakeDecimals
          );
          this.TotalDeposite = fromWei(TotalDeposite, StakeDecimals);
          this.CanClaim1 = fromWei(CanClaim1, RewardDecimals);
          this.MaxStaking = fromWei(MaxStaking, RewardDecimals);
          this.MyPoolShare = fixD(
            (this.CanWithdraw / this.TotalDeposite) * 100,
            2
          );
          this.ApproveStatus = ApproveStatus > 0;
          if (this.ActiveData.Max) {
            this.StakeVolume = Math.min(
              this.CanDeposite,
              Number(this.MaxStaking) - Number(this.CanWithdraw)
            );
          }
        } else {
          const [
            CanDeposite,
            CanWithdraw,
            TotalDeposite,
            CanClaim1,
            ApproveStatus,
            CanClaim2,
          ] = FixData;

          this.CanDeposite = fromWei(CanDeposite, StakeDecimals);
          this.CanWithdraw = fromWei(
            NoProxy ? CanWithdraw[0] : CanWithdraw,
            StakeDecimals
          );
          this.TotalDeposite = fromWei(TotalDeposite, StakeDecimals);
          this.CanClaim1 = fromWei(CanClaim1, RewardDecimals);
          this.CanClaim2 = CanClaim2 ? fromWei(CanClaim2, RewardDecimals) : 0;
          this.MyPoolShare = fixD(
            (this.CanWithdraw / this.TotalDeposite) * 100,
            2
          );
          this.ApproveStatus = ApproveStatus > 0;
        }
      });
    },
    async toDeposite() {
      if (!this.StakeVolume || this.StakeLoading) {
        return;
      }
      const PoolAddress = this.ActiveData.PoolAddress;
      const StakeAddress = this.ActiveData.StakeAddress;
      const TokenSymbol = this.ActiveData.StakeSymbol;
      const Decimals = this.ActiveData.StakeDecimals;
      const PoolABI = this.ActiveData.PoolABI;
      const ProxyPid = this.ActiveData.ProxyPid;
      const StakeMethods = this.ActiveData.StakeMethods;
      const NoProxy = this.ActiveData.NoProxy;
      const Volume = toWei(this.StakeVolume + "", Decimals);
      const Account = this.CurrentAccount.account;
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
            this.WaitingText = `You will approve ${TokenSymbol} to Helmet`;
          })
          .on("receipt", (receipt) => {
            if (!this.SuccessVisible) {
              this.SuccessHash = receipt.transactionHash;
              this.WaitingVisible = false;
              this.SuccessVisible = true;
              this.StakeLoading = false;
              this.ApproveStatus = true;
              this.WaitingText = "";
              this.$store.dispatch("refreshData");
              this.getPoolInfo();
            }
          })
          .on("error", (error) => {
            this.WaitingVisible = false;
            this.SuccessVisible = false;
            this.ApproveStatus = false;
            this.StakeLoading = false;
          });
      } else {
        const Contracts = getContract(PoolABI, PoolAddress);
        let Params;
        if (NoProxy) {
          Params = [ProxyPid, Volume];
        } else {
          Params = [Volume];
        }
        Contracts.methods[StakeMethods](...Params)
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
              this.getPoolInfo();
            }
          })
          .on("error", (error) => {
            this.StakeLoading = false;
            this.WaitingVisible = false;
            this.SuccessVisible = false;
          });
      }
    },

    async toClaim() {
      if (this.ClaimLoading) {
        return;
      }
      this.ClaimLoading = true;
      const ContractAddress = this.ActiveData.PoolAddress;
      const WithDrawMethods = this.ActiveData.WithDrawMethods;
      const PoolABI = this.ActiveData.PoolABI;
      const NoProxy = this.ActiveData.NoProxy;
      const ProxyPid = this.ActiveData.ProxyPid;
      const Account = this.CurrentAccount.account;
      const Contracts = getContract(PoolABI, ContractAddress);
      let Params;
      if (NoProxy) {
        Params = [ProxyPid, 0];
      } else {
        Params = [];
      }
      Contracts.methods[WithDrawMethods](...Params)
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
            this.$store.dispatch("refreshData");
            this.getPoolInfo();
          }
        })
        .on("error", (error) => {
          this.WaitingVisible = false;
          this.SuccessVisible = false;
          this.ClaimLoading = false;
        });
    },
    toCompound() {
      this.$bus.$emit("OPEN_COMPOUND", {
        title: "Compound HELMET Earned",
        number: this.CanClaim1,
        poolAddress: this.ActiveData.PoolAddress,
      });
    },
    async toExit() {
      if (this.ExitLoading) {
        return;
      }
      this.ExitLoading = true;
      let ContractAddress = this.ActiveData.PoolAddress;
      const PoolABI = this.ActiveData.PoolABI;
      const NoProxy = this.ActiveData.NoProxy;
      const ProxyPid = this.ActiveData.ProxyPid;
      const Decimals = this.ActiveData.StakeDecimals;
      const ExitMethods = this.ActiveData.ExitMethods;
      const Account = this.CurrentAccount.account;
      const Contracts = getContract(PoolABI, ContractAddress);
      let Params;
      if (NoProxy) {
        Params = [ProxyPid, toWei(this.CanWithdraw, Decimals)];
      } else {
        Params = [];
      }
      Contracts.methods[ExitMethods](...Params)
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
            this.$store.dispatch("refreshData");
            this.getPoolInfo();
          }
        })
        .on("error", (error) => {
          this.WaitingVisible = false;
          this.SuccessVisible = false;
          this.ExitLoading = false;
        });
    },
  },
};
</script>
<style lang='scss'>
.jump_text {
  a {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #fd7e14;
    line-height: 20px;
    display: flex;
    align-items: center;
    i {
      display: block;
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 0 4px;
    }
    .pancake {
      background-image: url("../../assets/img/icon/pancake@2x.png");
    }
    .dodo {
      background-image: url("../../assets/img/icon/dodo@2x.png");
    }
    .chainswap {
      background-image: url("../../assets/img/icon/chainswap@2x.png");
    }
    .qian {
      background-image: url("../../assets/img/icon/qian@2x.png");
    }
    .mdx {
      background-image: url("../../assets/img/icon/mdx@2x.png");
    }
    .burger {
      background-image: url("../../assets/img/icon/burgerswap@2x.png");
    }
    .babyswap {
      background-image: url("../../assets/img/icon/babyswap@2x.png");
    }
    .acsi {
      background-image: url("../../assets/img/icon/acsi@2x.png");
    }
    .cafeswap {
      background-image: url("../../assets/img/icon/cafeswap@2x.png");
    }
    .xms {
      background-image: url("../../assets/img/icon/xms@2x.png");
    }
  }
  .H5_link {
    display: none;
  }
}
</style>
<style lang='scss'scoped>
@import "../../assets/css/mining_pool.scss";
</style>