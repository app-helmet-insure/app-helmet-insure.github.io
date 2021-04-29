<template>
  <div class="nft_cardbook">
    <div class="nft_cardbook_title">
      <span>我的卡片<i></i></span>
    </div>
    <div class="nft_cardbook_balance">
      <p>我的 Dora NFT：2</p>
      <p>我的待兑换NFT：2</p>
    </div>
    <div class="nft_cardbook_cards">
      <div class="one_card">
        <div class="dora_card">
          <div
            class="dora_piece"
            v-for="item in cardList"
            :key="item.card_name"
            :style="`background-image:url(${require(`../../assets/img/nft/${item.card_img.toLowerCase()}_Dora.png`)}`"
          ></div>
        </div>
        <button>马上兑换</button>
        <a>查看 Dora NFT 合约地址</a>
      </div>
      <div class="eight_card">
        <div v-for="item in cardList" :key="item.card_name" class="item_card">
          <div
            :class="
              item.CardBalance != 0
                ? 'haveCard item_card_wrap'
                : 'zeroCard item_card_wrap'
            "
            :style="`--itemShadow:${item.boxShadow}; --itemBorder:${item.border}`"
          >
            <i class="balanceCard" v-if="item.CardBalance != 0">{{
              item.CardBalance > 99 ? 99 : item.CardBalance
            }}</i>
            <div>
              <p>{{ item.card_name }}</p>
              <img
                v-if="item.CardBalance != 0"
                :src="require(`~/assets/img/nft/have_${item.card_img}.png`)"
                alt=""
              />
              <img
                v-else
                :src="require(`~/assets/img/nft/zero_${item.card_img}.png`)"
                alt=""
              />

              <section>
                <button>share</button>
                <button>Donate</button>
              </section>
            </div>
            <a>{{ item.card_adress }}-NFT 合约地址</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { balanceOf } from "~/interface/nft.js";
export default {
  data() {
    return {
      cardList: [],
    };
  },
  mounted() {
    this.dataInit();
    setTimeout(() => {
      this.getCardBalance();
    }, 1000);
    this.$bus.$on("GET_CARD_BALANCE", () => {
      this.getCardBalance();
    });
  },
  methods: {
    dataInit() {
      let list = [
        {
          card_name: "Helmet",
          card_img: "Helmet",
          card_adress: "Helmet",
          ContractName: "NFT1",
          CardBalance: 0,
          boxShadow: "0px 0px 16px 0px #ffdf00;0px 0px 32px 0px #FFB04D inset;",
          border: "1px solid #FFDF00",
        },
        {
          card_name: "Tenet",
          card_img: "Tenet",
          card_adress: "Tenet",
          ContractName: "NFT5",
          CardBalance: 0,
          boxShadow: "0px 0px 32px 0px #494002 inset",
          border: "none",
        },
        {
          card_name: "PancakeSwap",
          card_img: "Pancake",
          card_adress: "Pancake",
          ContractName: "NFT2",
          CardBalance: 0,
          boxShadow: "0px 0px 32px 0px #804005 inset",
          border: "none",
        },
        {
          card_name: "Ditto",
          card_img: "Ditto",
          card_adress: "Ditto",
          ContractName: "NFT6",
          CardBalance: 0,
          boxShadow: "0px 0px 32px 0px #FCA1E7 inset",
          border: "none",
        },
        {
          card_name: "Soteria",
          card_img: "Soteria",
          card_adress: "Soteria",
          ContractName: "NFT3",
          CardBalance: 0,
          boxShadow: "0px 0px 32px 0px #F18F50 inset",
          border: "none",
        },
        {
          card_name: "Yieldwatch",
          card_img: "Yieldwatch",
          card_adress: "Watch",
          ContractName: "NFT7",
          CardBalance: 0,
          boxShadow: "0px 0px 32px 0px #F1DB90 inset",
          border: "none",
        },
        {
          card_name: "Berry",
          card_img: "Berry",
          card_adress: "Berry",
          ContractName: "NFT4",
          CardBalance: 0,
          boxShadow: "0px 0px 32px 0px #CB83FF inset",
          border: "none",
        },
        {
          card_name: "Belt",
          card_img: "Belt",
          card_adress: "Belt",
          ContractName: "NFT8",
          CardBalance: 0,
          boxShadow: "0px 0px 22px 0px #685155 inset",
          border: "none",
        },
      ];
      this.cardList = list;
    },
    async getCardBalance() {
      for (let i = 0; i < this.cardList.length; i++) {
        let item = this.cardList[i];
        let Card = "NFT_" + item.ContractName;
        let balance = await balanceOf(Card);
        item.CardBalance = balance;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.nft_cardbook {
  padding: 0 30px;
  &_title {
    height: 64px;
    border-bottom: 4px solid #342d37;
    span {
      width: 90px;
      display: flex;
      align-items: center;
      height: 64px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #999bfb;
      line-height: 64px;
      border-bottom: 4px solid #999bfb;
      justify-content: space-between;
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("../../assets/img/nft/crystal.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &_balance {
    width: 966px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 60px;
    p {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #ffffff;
      line-height: 20px;
      margin-right: 20px;
      &:last-of-type {
        margin: 0;
      }
    }
  }
  &_cards {
    width: 966px;
    margin: 0 auto;
    display: flex;
    .one_card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 309px;
      margin-right: 30px;
      .dora_card {
        width: 309px;
        height: 400px;
        background-image: url("../../assets/img/nft/zero_Dora.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        flex-shrink: 0;
        border-radius: 10px;
        position: relative;
        .dora_piece {
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          position: absolute;
          left: 0;
        }
      }
      > button {
        width: 240px;
        height: 46px;
        border-radius: 20px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        background: #999bfb;
        box-shadow: 0px 6px 0px 0px #9383e0;
        text-shadow: 0px 1px 0px #9383e0, 0px 1px 3px #e2dcff;
        text-align: center;
        margin-top: 30px;
        &:active {
          transition: all 0.5s;
          transform: translateY(4px);
          box-shadow: 0px 2px 0px 0px #9383e0;
        }
      }
      > a {
        font-size: 12px;
        font-family: IBMPlexSans;
        color: #ffffff;
        line-height: 14px;
        text-align: center;
        margin-top: 8px;
        text-decoration: underline;
        margin-top: 20px;
      }
    }
    .eight_card {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-shrink: 0;
      flex-wrap: wrap;
      height: 400px;
      .item_card {
        width: 25%;
      }
      .zeroCard {
        box-shadow: 0px 0px 32px 0px #aeaeae inset;
        p {
          color: #8c8c8c;
        }
      }
      .haveCard {
        box-shadow: var(--itemShadow);
        border: var(--itemBorder);
      }
      .balanceCard {
        width: 21px;
        height: 21px;
        background: #fd7e14;
        position: absolute;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-family: FredokaOne-Regular, FredokaOne;
        color: #ffffff;
        line-height: 12px;
        right: 0;
        top: 0;
        transform: translate(50%, -50%);
      }
      .item_card_wrap {
        margin: 0 auto;
        width: 140px;
        height: 180px;
        background: #ffffff;
        border-radius: 6px;
        position: relative;
        > div {
          width: 100%;
          padding: 20px;

          > p {
            font-size: 12px;
            font-family: FredokaOne-Regular;
            line-height: 12px;
            text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.8);
            text-align: center;
          }
          > img {
            width: 102px;
            height: 102px;
          }
          > section {
            display: flex;
            justify-content: space-between;
            button {
              height: 20px;
              padding: 0 4px;
              font-size: 12px;
              font-family: FredokaOne-Regular;
              color: #ffffff;
              line-height: 12px;
              background: #d0d0d0;
              box-shadow: 0px 2px 0px 0px #929292;
              border-radius: 10px;
            }
          }
        }
        > a {
          display: block;
          font-size: 12px;
          font-family: IBMPlexSans;
          color: #ffffff;
          line-height: 14px;
          text-align: center;
          margin-top: 8px;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>