<template>
  <div class="guard_migrate">
    <div class="guard_migrate_wrap">
      <h3 class="guard_migrate_title">Migrate to Polygon</h3>
      <div class="guard_migrate_swap">
        <div class="guard_migrate_swap_from">
          <div class="header">
            <div class="logo">
              From <img src="~/assets/img/icon/binance.png" alt="" /><span>{{
                FromNetwork
              }}</span>
            </div>
            <span>HELMET</span>
          </div>
          <div class="input_box">
            <input type="text" v-model="SwapNumber" placeholder="0.00" />
            <p>
              <span class="max" @click="SwapNumber = BalanceArray.HELMET"
                >最大量</span
              >
              <img src="~/assets/img/icon/helmet.png" alt="" />
            </p>
          </div>
        </div>
        <div class="guard_migrate_swap_to">
          <div class="header">
            <div class="logo">
              To <img src="~/assets/img/icon/polygon.png" alt="" /><span>{{
                ToNetwork
              }}</span>
            </div>
            <span>GUARD</span>
          </div>
          <div class="input_box">
            <input
              type="text"
              v-model="SwapNumber"
              readonly
              placeholder="0.00"
            />
            <p>
              <img src="~/assets/img/icon/guard.png" alt="" />
            </p>
          </div>
        </div>
      </div>
      <div class="guard_migrate_destination">
        <h3>Destination</h3>
        <div class="account">
          {{ Account.substr(0, 12) + "..." + Account.substr(-15) }}
        </div>
        <button @click="SendConfirm" v-if="ChainID == 56">
          <i v-if="ConfirmLoading" class="loading_pic"></i>
          {{
            ConfirmLoading ? "This process may take some time..." : "Confirm"
          }}
        </button>
        <button @click="SwitchNetwork" v-else>Switch to BSC</button>
        <p>注意：该过程是不可逆过程,BSC资产将会彻底转化成 Polygon 资产</p>
        <span>Powered by BlackHole & ChainSwap</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAccounts,
  TokenNameToWei,
  DecimalsToWei,
  bscNetwork,
} from "~/interface/common_contract.js";
import { Allowance } from "~/interface/read_contract.js";
import { Approve } from "~/interface/write_contract.js";
import Web3 from "web3";
import ChainSwapConfig from "./config";
export default {
  data() {
    return {
      SwapNumber: "",
      Account: "",
      NeedApprove: "",
      FromNetwork: "BSC",
      ToNetwork: "Polygon",
      MATICSignData: {
        contractAddress: "0x81d82a35253B982E755c4D7d6AADB6463305B188",
        fromChainId: 56,
        nonce: 3,
        to: "0x8Fa3f933DCf5E7ca57fdf22048286ea2d5Bd3d15",
        toChainId: 137,
        fromContract: "0x81d82a35253B982E755c4D7d6AADB6463305B188",
        toContract: "0x81d82a35253B982E755c4D7d6AADB6463305B188",
        mainContract: "0x81d82a35253B982E755c4D7d6AADB6463305B188",
      },
      ConfirmLoading: false,
    };
  },
  computed: {
    BalanceArray() {
      return this.$store.state.BalanceArray;
    },
    ChainID() {
      let chainID = this.$store.state.chainID;
      return chainID;
    },
    BridgeConfig() {
      return ChainSwapConfig(this.FromNetwork, this.ToNetwork);
    },
  },
  watch: {
    ChainID(newValue) {
      this.chainID = newValue;
    },
  },
  mounted() {
    this.MyAccount();
    // this.ApproveFlagFn();
  },
  methods: {
    async MyAccount() {
      let Account = await getAccounts();
      this.Account = Account;
    },
    async ApproveFlagFn() {
      let ApproveFlag = await Allowance(
        "0x910651F81a605a6Ef35d05527d24A72fecef8bF0",
        "0x6Bab2711Ca22fE7395811022F92bB037cd4af7bc"
      );
      this.NeedApprove = ApproveFlag;
    },
    async ApproveToken() {
      Approve(
        "0x910651F81a605a6Ef35d05527d24A72fecef8bF0",
        "0x6Bab2711Ca22fE7395811022F92bB037cd4af7bc",
        "WAR",
        (res) => {
          if (res) {
            console.log(res);
          }
        }
      );
    },
    async SwitchNetwork() {
      let ethereum = window.ethereum;
      await ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [{ ...bscNetwork }],
        })
        .then(() => {});
    },
    async SendConfirm() {
      this.$bus.$emit("OPEN_GUARD_DIALOG", {
        Type: "SWITCHANDWITHDRAW",
        Status: "PENDDING",
        Button: "Switch to Matic & Withdraw",
      });
      if (!this.SwapNumber) {
        return;
      }
      this.ConfirmLoading = true;
      let { ToChainID, BurnSwapContracts, FromAssets, ToAssets } =
        this.BridgeConfig;
      let web3 = new Web3(window.ethereum);
      let Contracts = new web3.eth.Contract(
        BurnSwapContracts.ABI,
        BurnSwapContracts.Address
      );
      let Volume = DecimalsToWei(this.SwapNumber, FromAssets.Decimals);
      let Account = await getAccounts();
      Contracts.methods[BurnSwapContracts.Method](Volume, ToChainID, Account)
        .send({ from: Account, value: DecimalsToWei("0.005", 18) })
        .on("transactionHash", (hash) => {})
        .on("receipt", (_, receipt) => {
          this.$bus.$emit("REFRESH_BALANCE");
          this.$bus.$emit("GET_GUARD_HISTORY");
          this.$bus.$emit("OPEN_GUARD_DIALOG", {
            Type: "SWITCHANDWITHDRAW",
            ClickFn: "SwitchAndWithdraw",
            Button: "Switch to Matic & Withdraw",
          });
          this.ConfirmLoading = false;
        })
        .on("error", (err, receipt) => {
          this.ConfirmLoading = false;
          console.log(err);
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.guard_migrate {
  width: 100%;
  min-width: 1200px;
  background: #ffffff;
  box-shadow: 0px 4px 8px 0px rgba(236, 232, 232, 0.02);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  &_wrap {
    width: 480px;
    h3 {
      font-size: 24px;
      font-family: IBMPlexSans-SemiBold, IBMPlexSans;
      font-weight: 600;
      color: #17173a;
      line-height: 32px;
      text-align: center;
    }
  }
  &_swap {
    margin-top: 20px;
    width: 100%;
    height: 360px;
    display: flex;
    flex-direction: column;
    border: 2px solid #e8e8eb;
    border-radius: 5px;
    &_from {
      flex: 1;
      padding: 0 24px;
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo {
          margin: 24px 0 0 0px;
          width: 180px;
          height: 45px;
          background: #fff4d0;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 30px;
            height: 30px;
            margin: 0 9px;
          }
          font-size: 21px;
          font-weight: 600;
          color: rgba(23, 23, 58, 0.7);
          line-height: 16px;
          span {
            color: #f0b90b;
          }
        }
        > span {
          font-size: 21px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          color: #17173a;
          line-height: 14px;
          margin-top: 24px;
        }
      }
      .input_box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 36px;
        margin-top: 24px;
        input {
          width: 250px;
          height: 100%;
          font-size: 26px;
          flex-shrink: 0;
          font-weight: 600;
          color: #17173a;
          &::placeholder {
            color: #17173a;
          }
        }
        p {
          display: flex;
          align-items: center;
          .max {
            padding: 6px 12px;
            background: #f8f9fa;
            border-radius: 5px;
            border: 1px solid #e8e8eb;
            margin: 0 12px;
            cursor: pointer;
            flex-shrink: 0;
            &:hover {
              border: 1px solid #ff9600;
              color: #ff9600;
            }
          }
          img {
            width: 36px;
            height: 36px;
            flex-shrink: 0;
          }
        }
      }
    }
    &_to {
      background: #f7f7fa;
      flex: 1;
      padding: 0 24px;
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo {
          margin: 39px 0 0 0px;
          width: 180px;
          height: 45px;
          background: #ddc8ff;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 30px;
            height: 30px;
            margin: 0 9px;
          }
          font-size: 21px;
          font-weight: 600;
          color: rgba(23, 23, 58, 0.7);
          line-height: 16px;
          span {
            color: #9f66ff;
          }
        }
        > span {
          font-size: 21px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          color: #17173a;
          line-height: 14px;
          margin-top: 24px;
        }
      }
      .input_box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 36px;
        margin-top: 24px;
        input {
          width: 250px;
          height: 100%;
          font-size: 26px;
          flex-shrink: 0;
          font-weight: 600;
          background: transparent;
          pointer-events: none;
          color: rgba(23, 23, 58, 0.4);
          &::placeholder {
            color: rgba(23, 23, 58, 0.4);
          }
        }
        p {
          display: flex;
          align-items: center;
          img {
            width: 36px;
            height: 36px;
            flex-shrink: 0;
          }
        }
      }
    }
  }
  &_destination {
    h3 {
      font-size: 21px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #17173a;
      line-height: 20px;
      margin-top: 20px;
      margin-bottom: 8px;
      text-align: left;
    }
    .account {
      width: 100%;
      height: 60px;
      border-radius: 5px;
      border: 2px solid #e8e8eb;
      font-size: 21px;
      font-family: IBMPlexSans-SemiBold, IBMPlexSans;
      font-weight: 600;
      color: rgba(23, 23, 58, 0.4);
      padding: 0 18px;
      display: flex;
      align-items: center;
    }
    button {
      width: 100%;
      height: 60px;
      background: #17173a;
      border-radius: 5px;
      font-size: 21px;
      font-family: IBMPlexSans-SemiBold, IBMPlexSans;
      font-weight: 600;
      color: #ffffff;
      margin-top: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        width: 30px;
        height: 30px;
      }
    }
    > p {
      font-size: 18px;
      font-family: IBMPlexSans-SemiBold, IBMPlexSans;
      font-weight: 600;
      color: rgba(23, 23, 58, 0.4);
      white-space: nowrap;
      display: flex;
      justify-content: center;
      margin-top: 18px;
    }
    > span {
      display: flex;
      justify-content: center;
      height: 12px;
      font-size: 18px;
      font-family: IBMPlexSans-SemiBold, IBMPlexSans;
      font-weight: 600;
      color: rgba(23, 23, 58, 0.7);
      margin-top: 14px;
    }
  }
}
</style>