<template>
  <div class="guard_history">
    <h3 class="guard_history_title">History</h3>
    <div class="guard_history_list_title">
      <p>Assets</p>
      <p>From</p>
      <p>To</p>
      <p>Destination</p>
      <p>Amounts</p>
      <p></p>
    </div>
    <div class="guard_history_list">
      <div
        class="guard_history_list_item"
        v-for="(item, index) in History"
        :key="index"
      >
        <section>
          <p>
            <img
              :src="require(`~/assets/img/guard/${item.FromToken}.png`)"
              alt=""
            />{{ item.FromToken }}
          </p>
          <i>→</i>
          <p>
            <img
              :src="require(`~/assets/img/guard/${item.ToToken}.png`)"
              alt=""
            />{{ item.ToToken }}
          </p>
        </section>
        <section>
          <img
            :src="require(`~/assets/img/guard/${item.FromChainName}.png`)"
            alt=""
          />
          <span>{{ item.FromChainName }} </span>
        </section>
        <section>
          <img
            :src="require(`~/assets/img/guard/${item.ToChainName}.png`)"
            alt=""
          />
          <span>{{ item.ToChainName }} </span>
        </section>
        <section>
          <span>
            {{ Account.substr(0, 6) + "......" + Account.substr(-4) }}</span
          >
        </section>
        <section>
          <span>{{ item.ChainswapAmounts }}</span>
        </section>
        <section>
          <button @click="getSwapToken(item)" :class="item.Status + 'button'">
            {{ item.Status == "Finished" ? "Finished" : "Withdraw" }}
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DecimalsFormWei,
  getAccounts,
  DecimalsToWei,
} from "~/interface/common_contract.js";
import Web3 from "web3";
import ChainSwapABI from "~/web3/abis/ChainSwap.json";
import { getSignDataSyn } from "~/interface/request.js";
import ChainSwapConfig from "./config";
export default {
  data() {
    return {
      BSCTOMATIC: {
        FromChainID: 56,
        FromToken: "HELMET",
        FromChainName: "BSC",
        ToChainID: 137,
        ToToken: "GUARD",
        ToChainName: "Polygon",
        ContractAddress: "0x81d82a35253B982E755c4D7d6AADB6463305B188",
        TokenDecimals: 18,
        FromContract: "0x81d82a35253B982E755c4D7d6AADB6463305B188",
        ToContract: "0x81d82a35253B982E755c4D7d6AADB6463305B188",
        MainContract: "0x81d82a35253B982E755c4D7d6AADB6463305B188",
      },
      FromNetwork: "BSC",
      ToNetwork: "Polygon",
      History: [],
      Account: "",
      CurrentData: {},
    };
  },
  computed: {
    BridgeConfig() {
      return ChainSwapConfig(this.FromNetwork, this.ToNetwork);
    },
    ChainID() {
      let chainID = this.$store.state.chainID;
      return chainID;
    },
  },
  async mounted() {
    this.$bus.$on("GET_GUARD_HISTORY", async () => {
      this.getHistoryList();
    });
    this.$bus.$on("HISTORY_GUARD_SWAP", async (Step) => {
      if (Step === 1) {
        await this.SwitchSwapToken();
      }
      if (Step === 2) {
        await this.ClickSwapToken(this.CurrentData);
      }
    });
    this.MyAccount();
    // this.getHistoryList();
  },
  methods: {
    async MyAccount() {
      let Account = await getAccounts();
      this.Account = Account;
    },
    async getMaxNonce() {
      let Account = await getAccounts();
      let web3 = new Web3(
        new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
      );
      let Contracts = new web3.eth.Contract(
        ChainSwapABI,
        this.BSCTOMATIC.ContractAddress
      );
      let MaxNonce = Contracts.methods
        .sentCount(this.BSCTOMATIC.ToChainID, Account)
        .call();

      return MaxNonce;
    },
    async getHistoryList() {
      let MaxNonce = await this.getMaxNonce();
      let Account = await getAccounts();
      let History = [];
      for (let Nonce = 0; Nonce < MaxNonce; Nonce++) {
        let ChainswapAmounts = await this.AskChainSwapAmounts(
          this.BSCTOMATIC.ToChainID,
          Account,
          Nonce
        );
        let ReceiveAmounts = await this.AskReceiveAmounts(
          this.BSCTOMATIC.FromChainID,
          Account,
          Nonce
        );
        ChainswapAmounts = DecimalsFormWei(
          ChainswapAmounts,
          this.BSCTOMATIC.TokenDecimals
        );
        ReceiveAmounts = DecimalsFormWei(
          ReceiveAmounts,
          this.BSCTOMATIC.TokenDecimals
        );
        let HistoryItem = { ...this.BSCTOMATIC };
        HistoryItem.ChainswapAmounts = ChainswapAmounts;
        HistoryItem.ReceiveAmounts = ReceiveAmounts;
        HistoryItem.Nonce = Nonce;
        HistoryItem.Status =
          ChainswapAmounts == ReceiveAmounts ? "Finished" : "";
        HistoryItem.Sort = ChainswapAmounts == ReceiveAmounts ? 1 : 0;
        History.push(HistoryItem);
      }
      this.History = History.sort(function (a, b) {
        return a.Sort - b.Sort;
      });
    },
    async AskChainSwapAmounts(ToChainID, Account, Nonce) {
      let BSCweb3 = new Web3(
        new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
      );
      let BSCContracts = new BSCweb3.eth.Contract(
        ChainSwapABI,
        this.BSCTOMATIC.ContractAddress
      );
      let ChainswapAmounts = await BSCContracts.methods
        .sent(ToChainID, Account, Nonce)
        .call();
      return ChainswapAmounts;
    },
    async AskReceiveAmounts(FromChainID, Account, Nonce) {
      let MATICweb3 = new Web3(
        new Web3.providers.HttpProvider("https://polygon-rpc.com")
      );
      let MATICContracts = new MATICweb3.eth.Contract(
        ChainSwapABI,
        this.BSCTOMATIC.ContractAddress
      );
      let ReceiveAmounts = await MATICContracts.methods
        .received(FromChainID, Account, Nonce)
        .call();
      return ReceiveAmounts;
    },
    async getSwapToken(data) {
      this.CurrentData = data;
      this.$bus.$emit("OPEN_GUARD_DIALOG", {
        Type: "SWITCHANDWITHDRAW",
        Function: "SwitchAndWithdraw",
        Button: "Switch to Matic & Withdraw",
      });
    },
    async SwitchSwapToken() {
      let { FromChainID, ToChainID, BurnSwapContracts, FromAssets, ToAssets } =
        this.BridgeConfig;
      if (this.ChainID != ToChainID) {
      }
      let Account = await getAccounts();
      let web3 = new Web3(window.ethereum||
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));
      let MaxNonce = await this.getMaxNonce();
      let ChainswapAmounts = await this.AskChainSwapAmounts(
        ToChainID,
        Account,
        Number(MaxNonce) - 1
      );
      let SignData = {
        contractAddress: this.BSCTOMATIC.ContractAddress,
        fromChainId: this.BSCTOMATIC.FromChainID,
        nonce: Number(MaxNonce) - 1,
        to: Account,
        toChainId: this.BSCTOMATIC.ToChainID,
        fromContract: this.BSCTOMATIC.FromContract,
        toContract: this.BSCTOMATIC.ToContract,
        mainContract: this.BSCTOMATIC.MainContract,
      };
      let Contracts = new web3.eth.Contract(
        ChainSwapABI,
        this.BSCTOMATIC.ContractAddress
      );
      getSignDataSyn(SignData, async (Signs) => {
        if (Signs) {
          await Contracts.methods
            .receive(
              this.BSCTOMATIC.FromChainID,
              Account,
              Number(MaxNonce) - 1,
              DecimalsToWei(ChainswapAmounts, ToAssets.Decimals),
              Signs
            )
            .send({ from: Account, value: "5000000000000000" })
            .on("transactionHash", (hash) => {})
            .on("receipt", (_, receipt) => {
              this.$bus.$emit("GET_GUARD_HISTORY");
              this.$bus.$emit("CLOSE_GUARD_DIALOG");
              this.$bus.$emit("OPEN_GUARD_DIALOG", {
                Step: 1,
                Type: "success",
              });
            })
            .on("error", (err, receipt) => {
              this.$bus.$emit("CLOSE_GUARD_DIALOG");
            });
        }
      });
    },
    async ClickSwapToken(data) {
      let Account = await getAccounts();
      let web3 = new Web3(window.ethereum||
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));
      let Contracts = new web3.eth.Contract(
        ChainSwapABI,
        this.BSCTOMATIC.ContractAddress
      );
      let SignData = {
        contractAddress: this.BSCTOMATIC.ContractAddress,
        fromChainId: this.BSCTOMATIC.FromChainID,
        nonce: data.Nonce,
        to: Account,
        toChainId: this.BSCTOMATIC.ToChainID,
        fromContract: this.BSCTOMATIC.FromContract,
        toContract: this.BSCTOMATIC.ToContract,
        mainContract: this.BSCTOMATIC.MainContract,
      };
      getSignDataSyn(SignData, async (Signs) => {
        if (Signs) {
          await Contracts.methods
            .receive(
              this.BSCTOMATIC.FromChainID,
              Account,
              data.Nonce,
              DecimalsToWei(data.ChainswapAmounts, data.TokenDecimals),
              Signs
            )
            .send({ from: Account, value: "5000000000000000" })
            .on("transactionHash", (hash) => {})
            .on("receipt", (_, receipt) => {
              this.$bus.$emit("GET_GUARD_HISTORY");
              this.$bus.$emit("CLOSE_GUARD_DIALOG");
              this.$bus.$emit("OPEN_GUARD_DIALOG", {
                Step: 1,
                Type: "success",
              });
            })
            .on("error", (err, receipt) => {
              this.$bus.$emit("CLOSE_GUARD_DIALOG");
            });
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.guard_history {
  margin-bottom: 50px;
  &_title {
    font-size: 30px;
    line-height: 40px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  &_list_title {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    p {
      width: 100px;
      font-size: 16px;
      color: #7a7f82;
      line-height: 24px;
      &:nth-of-type(1) {
        width: 200px;
      }
    }
  }
  &_list {
    &_item {
      width: 100%;
      height: 75px;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
      border-radius: 5px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      justify-content: space-between;
    }
    section {
      width: 100px;
      &:nth-of-type(1) {
        width: 200px;
        display: flex;
        align-items: center;
        p {
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: 600;
          color: #17173a;
          line-height: 17px;
          img {
            width: 36px;
            height: 36px;
            margin-right: 6px;
          }
        }
        i {
          margin: 0 8px;
        }
      }
      &:nth-of-type(2),
      &:nth-of-type(3) {
        display: flex;
        align-items: center;
        img {
          width: 36px;
          height: 36px;
          margin-right: 6px;
        }
        span {
          font-size: 16px;
          font-weight: 600;
          color: #17173a;
          line-height: 17px;
        }
      }
      &:nth-of-type(4),
      &:nth-of-type(5) {
        display: flex;
        align-items: center;
        span {
          font-size: 16px;
          font-weight: 600;
          color: #17173a;
          line-height: 17px;
        }
      }
      &:nth-of-type(6) {
        button {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          color: #ffffff;
          line-height: 24px;
          padding: 8px 18px;
          background: #17173a;
          border-radius: 5px;
          font-weight: 600;
          width: 100px;
          border: 1px solid #17173a;
        }
        .Finishedbutton {
          border: 1px solid #e8e8eb;
          background: #f8f9fa;
          color: rgba(23, 23, 58, 0.4);
          pointer-events: none;
        }
      }
    }
  }
}
</style>
