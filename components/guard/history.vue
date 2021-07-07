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
          <span>{{ item.Amounts }}</span>
        </section>
        <section>11</section>
      </div>
    </div>
  </div>
</template>

<script>
import { SentCount, Sent } from "~/interface/read_contract.js";
import { TokenNameFormWei, getAccounts } from "~/interface/common_contract.js";
export default {
  data() {
    return {
      BSCTOMAGIC: {
        FromChainID: 56,
        FromToken: "HELMET",
        FromChainName: "BSC",
        ToChainID: 137,
        ToToken: "GUARD",
        ToChainName: "Polygon",
      },
      History: [],
      Account: "",
    };
  },
  async mounted() {
    this.$bus.$on("GET_GUARD_HISTORY", async () => {
      await this.getSendVolume();
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
      console.log(this.BSCTOMAGIC.ToChainID);
      let MaxNonce = await SentCount(this.BSCTOMAGIC.ToChainID);
      return MaxNonce;
    },
    async getSendVolume() {
      let MaxNonce = await this.getMaxNonce();
      console.log(MaxNonce);
      let History = [];
      for (let Nonce = 0; Nonce < MaxNonce; Nonce++) {
        let Amounts = await Sent(this.BSCTOMAGIC.ToChainID, Nonce);
        let HistoryItem = this.BSCTOMAGIC;
        HistoryItem.Amounts = TokenNameFormWei(
          Amounts,
          this.BSCTOMAGIC.FromToken
        );
        console.log(HistoryItem);
        History.push(HistoryItem);
      }
      this.History = History;
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
    }
  }
}
</style>