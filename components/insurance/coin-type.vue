<template>
  <div class="coin_type">
    <button class="token_wrap" @click="SelectToken">
      <span>{{ $t("Content.SelectCoin") }}</span>
      <img
        src="~/assets/img/helmet/select@2x.png"
        alt=""
        :class="showTokens ? 'retote' : 'retoteback'"
      />
    </button>
    <button class="active curCoin" v-if="!showTokens">
      {{ curCoin }}
    </button>
    <div
      class="token_item"
      v-if="showTokens"
      :class="showTokens ? 'show_liner' : ''"
    >
      <div>
        <button
          v-for="coin in coinList"
          :key="coin"
          @click="handleClickCoin(coin)"
          :class="curCoin == coin ? 'active' : ''"
        >
          {{ coin == "FORTUBE" ? "FOR" : coin }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentCoin"],
  data() {
    return {
      curCoin: "ETH",
      showTokens: false,
    };
  },
  watch: {
    currentCoin(val) {
      this.curCoin = val;
    },
  },
  computed: {
    coinList() {
      return this.$store.state.coinList;
    },
  },
  methods: {
    handleClickCoin(coin) {
      this.$emit("changeCoin", coin);
      this.$bus.$emit("WATCH_COIN", coin);
      this.curCoin = coin;
      this.showTokens = false;
    },
    SelectToken() {
      this.showTokens = !this.showTokens;
    },
  },
};
</script>

<style lang='scss' scoped>
.retote {
  transform: rotate(180deg);
  transition: 0.5s;
}
.retoteback {
  transition: 0.5s;
}
.show_liner {
  animation: showliner 0.5s 0s linear forwards;
}

@media screen and (min-width: 750px) {
  .coin_type {
    @keyframes showliner {
      0% {
        left: 0;
        opacity: 0;
      }

      100% {
        opacity: 1;
        left: 155px;
      }
    }
    margin: 28px 0 29px;
    height: 40px;
    position: relative;
    display: flex;
    .token_wrap {
      justify-content: center;
      min-width: 140px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 40px;
      background: #ff9600;
      border-radius: 3px;
      position: absolute;
      z-index: 1;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #ffffff;
      }
      img {
        margin-left: 3px;
        width: 24px;
        height: 24px;
      }
    }
    .curCoin {
      margin-left: 155px;
    }
    .token_item {
      position: absolute;
      z-index: 0;
    }
    button {
      min-width: 76px;
      height: 40px;
      padding: 0 9px;
      margin-right: 14px;
      background: #f7f7fa;
      border-radius: 3px;
      color: #121212;
      &:hover {
        color: #ff9600;
      }
    }
    .active {
      background: #ff9600;
      color: #fff !important;
    }
  }
}
@media screen and (max-width: 750px) {
  @keyframes showliner {
    0% {
      left: 0;
      opacity: 0;
    }

    100% {
      opacity: 1;
      left: 155px;
    }
  }
  .coin_type {
    margin: 20px 0;
    height: 40px;
    display: flex;
    justify-content: space-between;
    .token_wrap {
      justify-content: center;
      min-width: 140px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 40px;
      background: #ff9600;
      border-radius: 3px;
      position: absolute;
      z-index: 1;
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #ffffff;
      }
      img {
        margin-left: 3px;
        width: 24px;
        height: 24px;
      }
    }
    .curCoin {
      margin-left: 155px;
    }
    .token_item {
      position: absolute;
      z-index: 0;
      width: calc(100% - 171px);
      overflow: hidden;
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #f5f5f5;
        border-radius: 10px;
      }

      ::-webkit-scrollbar {
        width: 0px;
        background-color: #f5f5f5;
        height: 0px !important;
        position: fixed;
        bottom: 0;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-image: -webkit-gradient(
          linear,
          left bottom,
          left top,
          color-stop(0.44, #873232),
          color-stop(0.72, #873232),
          color-stop(0.86, #873232)
        );
      }
      div {
        display: flex;
        overflow-x: scroll;

        > button {
          margin: 0 5px;
        }
      }
    }
    button {
      min-width: 76px;
      height: 40px;
      padding: 0 3px;
      background: #f7f7fa;
      border-radius: 3px;
      color: #121212;
      &:hover {
        color: #ff9600;
      }
    }
    .active {
      background: #ff9600;
      color: #fff !important;
    }
  }
}
</style>