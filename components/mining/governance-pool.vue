<template>
  <div class="governance_pool_wrap">
    <div class="tips">
      Helmet治理，抵押即投票：选择持方后，抵押相应的HELMET进行抵押投票，抵押的HELMET投票结束后才可取回
    </div>
    <div class="governance_pool">
      <div
        class="grovernance_deposit"
        v-if="!ActiveFlag || (ActiveFlag && ActiveType == 'Stake')"
      >
        <div class="governance_type">
          <div class="governance_type_title">
            <span>选择持方</span><a href="#">查看提案详情></a>
          </div>
          <div class="governance_type_wrap">
            <div
              :class="[
                'governance_type_item',
                PropoaslID === Governance.PropoaslID
                  ? 'governance_type_item_active'
                  : '',
              ]"
              v-for="Governance in GovernanceList"
              :key="Governance.PropoaslID"
              @click="handleClickSetPropoaslID(Governance.PropoaslID)"
            >
              {{ Governance.PropoaslType }}
            </div>
          </div>
        </div>
        <div class="title between">
          <span>可抵押&投票</span>
          <p>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(CanDeposite)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ ActiveData.StakeUnit }}
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
        <button
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
          >{{ !ApproveStatus ? $t("Table.Approve") : "抵押&投票" }}
        </button>
        <div class="between">
          <span>{{ $t("Table.MyDeposits") }}</span>
          <p>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(CanWithdraw)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ ActiveData.StakeUnit }}
          </p>
        </div>
        <div class="between">
          <span>{{ $t("Table.TotalDeposited") }}</span>
          <p>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(TotalDeposite)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ ActiveData.StakeUnit }}
          </p>
        </div>
      </div>
      <div class="grovernance_cutline" />
      <div
        class="grovernance_withdraw"
        v-if="!ActiveFlag || (ActiveFlag && ActiveType == 'Claim')"
      >
        <div class="title between">
          <span>{{ $t("Table.CallableMortgage") }}</span>
          <p>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(ActiveData.Status === 3 ? CanWithdraw : 0)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ ActiveData.StakeUnit }}
          </p>
        </div>
        <div class="between">
          <span>待释放</span>
          <p class="bold">
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(ActiveData.Status === 3 ? 0 : CanWithdraw)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;{{ ActiveData.StakeUnit }}
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
        <button
          @click="toExit"
          :class="ExitLoading ? 'disable b_button' : 'b_button'"
        >
          <i :class="ExitLoading ? 'loading_pic' : ''"></i
          >{{ $t("Table.ConfirmWithdraw") }} &
          {{ $t("Table.ClaimRewards") }}
        </button>
        <button
          @click="toClaim"
          :class="
            (ClaimLoading ? 'disable o_button' : 'o_button',
            ActiveData.Status === 3 ? 'disable_button o_button' : 'o_button')
          "
        >
          <i :class="ClaimLoading ? 'loading_pic' : ''"></i
          >{{ $t("Table.ClaimAllRewards") }}
        </button>
        <div v-if="ActiveData.HaveReward1" class="between">
          <span
            ><i>{{ ActiveData.Reward1Symbol }}</i>
            {{ $t("Table.HELMETRewards") }}：</span
          >
          <p>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(CanClaim1)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            &nbsp;{{ ActiveData.Reward1Symbol }}
          </p>
        </div>
        <div v-if="ActiveData.HaveReward2" class="between">
          <span
            ><i>{{ ActiveData.Reward2Symbol }}</i>
            {{ $t("Table.HELMETRewards") }}：</span
          >
          <p>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(CanClaim2)"
              :duration="2000"
              :decimals="8"
            />
            <span v-else>--</span>
            &nbsp;{{ ActiveData.Reward2Symbol }}
          </p>
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
  </div>
</template>

<script>
import { fixD } from "~/assets/js/util.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import countTo from "vue-count-to";
import { addToken } from "~/web3/wallet.js";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import GovernanceABI from "~/web3/abis/Governance.json";
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
      fixD,
      CanDeposite: 0,
      CanWithdraw: 0,
      TotalDeposite: 0,
      CanClaim1: 0,
      CanClaim2: 0,
      RewardPerToken: 0,
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
      PropoaslID: 1,
      GovernanceList: [
        {
          PropoaslType: "同意",
          PropoaslID: 1,
        },
        {
          PropoaslType: "不同意",
          PropoaslID: 2,
        },
        {
          PropoaslType: "弃权",
          PropoaslID: 3,
        },
      ],
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
        console.log(Value);
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
    handleClickSetPropoaslID(PropoaslID) {
      this.PropoaslID = PropoaslID;
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
        RewardPerMethods,
        HaveReward2,
      } = this.ActiveData;
      const PoolContracts = new Contract(PoolAddress, PoolABI);
      const StakeContracts = new Contract(StakeAddress, StakeABI);
      const ApproveContracts = new Contract(StakeAddress, ERC20ABI.abi);
      const GovernanceContracts = new Contract(PoolAddress, GovernanceABI);

      const Account = this.CurrentAccount.account;

      let Params = NoProxy ? [ProxyPid, Account] : [Account];
      let PromiseList = [
        StakeContracts.balanceOf(Account),
        PoolContracts[CanWithDrawMethods](...Params),
        NoProxy ? StakeContracts.totalSupply() : PoolContracts.totalSupply(),
        PoolContracts[CanClaim1Methods](...Params),
        GovernanceContracts[RewardPerMethods](),
        ApproveContracts.allowance(Account, PoolAddress),
      ];
      if (CanClaim2Methods) {
        PromiseList.push(PoolContracts[CanClaim2Methods](...Params));
      }
      const MulticallProvider = getOnlyMultiCallProvider();
      MulticallProvider.all(PromiseList).then((res) => {
        const FixData = processResult(res);
        const [
          CanDeposite,
          CanWithdraw,
          TotalDeposite,
          CanClaim1,
          RewardPerToken,
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
        this.RewardPerToken = fromWei(RewardPerToken, RewardDecimals);
        this.CanClaim2 = CanClaim2 ? fromWei(CanClaim2, RewardDecimals) : 0;
        this.MyPoolShare = fixD(
          (this.CanWithdraw / this.TotalDeposite) * 100,
          2
        );
        this.ApproveStatus = ApproveStatus > 0;
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
      const PropoaslID = this.PropoaslID;
      const StakeMethods = this.ActiveData.StakeMethods;
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
        let Params = [Volume, PropoaslID];
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
<style lang='scss'scoped>
@import "~assets/css/themes.scss";
.tips {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fffaf3;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #fd7e14;
  line-height: 16px;
}
.tool_tips {
  cursor: pointer;
  @include themeify {
    border-bottom: 2px dotted themed("color-17173a");
  }
  &:hover {
    color: #fd7e14 !important;
    border-bottom: 2px dotted #fd7e14 !important;
  }
}
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878;
  overflow: hidden;
}
.b_button {
  border-radius: 5px;
  width: 100%;
  margin-top: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.o_button {
  width: 100%;
  margin-top: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
.loading_pic {
  display: block;
  width: 24px;
  height: 24px;
  background-image: url("../../assets/img/helmet/loading.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
}
.disable {
  pointer-events: none;
}
.governance_type {
  &_title {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 14px;
      font-family: IBMPlexSans;
      color: rgba(23, 23, 58, 0.7);
      line-height: 14px;
      opacity: 0.7;
    }
    a {
      font-size: 14px;
      font-family: IBMPlexSans;
      color: #fd7e14;
      line-height: 14px;
    }
  }
  &_wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  &_item {
    min-width: 90px;
    height: 32px;
    border-radius: 5px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    border-radius: 5px;
    @include themeify {
      color: themed("color-17173a");
      background: transparent;
      border: 2px solid themed("color-e8e8eb");
    }
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      border: 2px solid #fd7e14 !important;
      color: #fd7e14 !important;
    }
  }
  &_item_active {
    border: 2px solid #fd7e14 !important;
    color: #fd7e14 !important;
  }
}
.governance_pool {
  display: flex;
  justify-content: space-evenly;
}
.grovernance_deposit,
.grovernance_withdraw {
  .title {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    line-height: 16px;
    > span {
      font-size: 14px;
      font-weight: 500;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 14px;
      opacity: 0.7;
    }
    p {
      font-size: 14px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      @include themeify {
        color: themed("color-17173a");
      }
      line-height: 14px;
    }
  }
  .content {
    input {
      width: 100%;
      height: 40px;
      padding: 0 100px 0 12px;
      background: transparent;
      border-radius: 5px;
      @include themeify {
        color: themed("color-17173a");
        border: 1px solid themed("color-e8e8eb");
      }
    }
    .input {
      margin-top: 4px;
      position: relative;
      display: flex;
      align-items: center;
      span {
        display: flex;
        align-items: center;
        padding: 4px 8px;
        min-height: 24px;
        position: absolute;
        right: 15px;
        font-size: 12px;
        cursor: pointer;
        border-radius: 5px;
        @include themeify {
          color: themed("color-17173a");
          background: themed("insure_button");
          border: 1px solid themed("insure_button_border");
        }
      }
    }
  }
}
.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  > span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 14px;
    opacity: 0.7;
    @include themeify {
      color: themed("color-17173a");
    }
  }
  > p {
    display: flex;
    font-size: 14px;
    font-family: IBMPlexSans;
    @include themeify {
      color: themed("color-17173a");
    }
    line-height: 14px;
  }
}
.bold {
  font-weight: bold;
}
.activeInput {
  border: 1px solid #fd7e14 !important;
}
@media screen and (min-width: 750px) {
  .tips {
    height: 40px;
  }
  .ContractAddress {
    p {
      font-size: 14px;
    }
    i {
      flex-shrink: 0;
    }
  }
  .governance_pool {
    padding: 40px 0;
  }
  .grovernance_cutline {
    display: block;
    width: 1px;
    height: auto;
    @include themeify {
      background: themed("insure_button_border");
    }
  }
  .grovernance_deposit,
  .grovernance_withdraw {
    width: 320px;
    .title {
      margin-top: 20px;
    }
    .content {
      margin-top: 10px;
      .input {
        span {
          &:hover {
            border: 1px solid #fd7e14 !important;
            color: #fd7e14 !important;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .tips {
    margin: 0 10px;
  }
  .ContractAddress {
    p {
      font-size: 12px;
    }
    i {
      flex-shrink: 0;
    }
  }
  .governance_pool {
    margin: 0 10px;
  }
  .grovernance_cutline {
    display: none;
  }
  .grovernance_deposit,
  .grovernance_withdraw {
    width: 100%;
    padding: 28px 17px;
    @include themeify {
      background: themed("color-ffffff");
    }
    box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
    border-radius: 5px;
    .content {
      margin-top: 20px;
      .input {
        span {
          &:hover {
            border: 1px solid #fd7e14 !important;
            color: #fd7e14 !important;
          }
        }
      }
    }
  }
}
</style>