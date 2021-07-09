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
import ChainSwapABI from "~/abi/ChainSwap.json";
import { getSignDataSyn } from "~/interface/event.js";
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
      History: [],
      Account: "",
      CurrentData: {},
    };
  },
  async mounted() {
    this.$bus.$on("GET_GUARD_HISTORY", async () => {
      await this.getSendVolume();
    });
    this.$bus.$on("HISTORY_GUARD_SWAP", async (Step) => {
      await this.GuardSwapToken(this.CurrentData);
    });

    this.MyAccount();
    await this.getSendVolume();
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
    async getSendVolume() {
      let MaxNonce = await this.getMaxNonce();
      let Account = await getAccounts();
      let BSCweb3 = new Web3(
        new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
      );
      let BSCContracts = new BSCweb3.eth.Contract(
        ChainSwapABI,
        this.BSCTOMATIC.ContractAddress
      );
      let MATICweb3 = new Web3(
        new Web3.providers.HttpProvider("https://rpc-mainnet.maticvigil.com")
      );
      let MATICContracts = new MATICweb3.eth.Contract(
        ChainSwapABI,
        this.BSCTOMATIC.ContractAddress
      );
      let History = [];
      for (let Nonce = 0; Nonce < MaxNonce; Nonce++) {
        let ChainswapAmounts = await BSCContracts.methods
          .sent(this.BSCTOMATIC.ToChainID, Account, Nonce)
          .call();
        let ReceiveAmounts = await MATICContracts.methods
          .received(this.BSCTOMATIC.FromChainID, Account, Nonce)
          .call();
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
    async getSwapToken(data) {
      this.CurrentData = data;
      this.$bus.$emit("OPEN_GUARD_DIALOG", { Step: 2, Type: "pendding" });
    },
    async GuardSwapToken(data) {
      let Account = await getAccounts();
      let web3 = new Web3(window.ethereum);
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