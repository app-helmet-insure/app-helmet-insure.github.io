<template>
  <el-dialog
    top="35vh"
    title="You Must Change Networks"
    footer
    append-to-body
    custom-class="network_dialog"
    :visible.sync="DialogVisible"
    @close="DialogClose"
  >
    <div class="network_dialog_body">
      <p>
        We've detected that you need to switch your wallet's network from local
        to mainnet network for this Dapp.
      </p>
      <p>
        *Some wallets may not support changing networks. If you can not change
        networks in your wallet you may consider switching to a different
        wallet.
      </p>
    </div>
    <div slot="footer" class="network_dialog_footer">
      <el-button
        type="primary"
        :loading="Loading"
        @click="handleClickChangeNetwork()"
        >Switch Network</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["DialogVisible", "DialogClose"],
  data() {
    return {
      Loading: false,
    };
  },
  methods: {
    async handleClickChangeNetwork() {
      this.Loading = true;
      let ethereum = window.ethereum;
      const data = [
        {
          chainId: "0x38",
          chainName: "Binance Smart Chain",
          nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
          },
          rpcUrls: ["https://bsc-dataseed.binance.org/"],
          blockExplorerUrls: ["https://bscscan.com/"],
        },
      ];
      await ethereum
        .request({ method: "wallet_addEthereumChain", params: data })
        .catch();
    },
  },
};
</script>

<style lang='scss' >
.el-dialog__title {
  font-size: 16px;
  font-weight: 600;
}
.network_dialog_body {
  > p {
    margin-top: 10px;
    font-size: 14px;
    line-height: 24px;
    color: #17173a;
  }
}
@media screen and(min-width:750px) {
  .network_dialog {
    border-radius: 10px !important;
    width: 500px !important;
    padding: 10px 0;
    .el-dialog__close {
      margin-top: 10px;
    }
    .el-dialog__close::before {
      font-size: 24px;
    }
    .el-dialog__header {
      padding: 20px 30px 10px;
    }
    .el-dialog__body {
      padding: 10px 30px !important;
    }
    .network_dialog_footer {
      margin-top: 10px;
    }
  }
}
</style>