<template>
  <Dialog
      title="Tip"
      :visible="visible"
      :before-close="onClose"
      width="200"
  >
    <div v-if="iboData.name === 'GAME1'" class="tip_box">
      <p>{{ $t("IBO.IBO_text28") }}: {{ $t("IBO.IBO_august") }}</p>
      <p>{{ $t("IBO.IBO_text29") }}: Pancakeswap.finance</p>
      <p>
        SC: 0x0e52d24c87a5ca4f37e3ee5e16ef5913fb0cceeb
        <i
            class="copy"
            @click="
              copyAdress($event, '0x0e52d24c87a5ca4f37e3ee5e16ef5913fb0cceeb')
            "
        ></i>
      </p>
      <p>
        TG:
        <a href="T.me/game1networkchat" target="_blank"
        >T.me/game1networkchat</a
        >
      </p>
      <p>
        {{ $t("IBO.IBO_text30") }}:
        <a href="https://game1network.com" target="_blank"
        >https://game1network.com</a
        >
      </p>
    </div>
    <div v-else-if="iboData.name === 'UFOMO'" class="tip_box">
      <p>{{ $t("IBO.IBO_text28") }}: {{ $t("IBO.IBO_august2") }}</p>
      <p>{{ $t("IBO.IBO_text29") }}: Pancakeswap.finance</p>
      <p>
        SC: 0xc9354034968f79f181b76a2f8a015fcdbaed2692
        <i
            class="copy"
            @click="
              copyAdress($event, '0xc9354034968f79f181b76a2f8a015fcdbaed2692')
            "
        ></i>
      </p>
      <p>
        TG(EN):
        <a href="https://t.me/UFOMO_EN" target="_blank"
        >https://t.me/UFOMO_EN</a
        >
      </p>
      <p>
        TG(CN):
        <a href="https://t.me/UFOMO_cn" target="_blank"
        >https://t.me/UFOMO_cn</a
        >
      </p>
      <p>
        {{ $t("IBO.IBO_text30") }}:
        <a href="https://crazyufo.vip/#/fomoGame" target="_blank"
        >https://crazyufo.vip/#/fomoGame</a
        >
      </p>
    </div>
    <div v-else-if="iboData.name === 'AXN'" class="tip_box">
      <p>{{ $t("IBO.IBO_text36") }}: {{ $t("IBO.IBO_text37") }}</p>
      <p>{{ $t("IBO.IBO_text28") }}: {{ $t("IBO.IBO_text37") }}</p>
      <p>{{ $t("IBO.IBO_text29") }}: Babyswap, Pancakeswap</p>
      <p>
        SC: 0x3a05e86c25366031d92e013cac77ff6c261cb09b
        <i
            class="copy"
            @click="
              copyAdress($event, '0x3a05e86c25366031d92e013cac77ff6c261cb09b')
            "
        ></i>
      </p>
      <p>
        TG:
        <a href="https://t.me/Axieninjaofficial" target="_blank"
        >https://t.me/Axieninjaofficial</a
        >
      </p>
      <p>
        {{ $t("IBO.IBO_text30") }}:
        <a href="https://www.axieninja.app/" target="_blank"
        >https://www.axieninja.app/</a
        >
      </p>
    </div>
    <div v-else-if="iboData.name === 'DSN'" class="tip_box">
      <p>{{ $t("IBO.IBO_text36") }}: {{ $t("IBO.IBO_text38") }}</p>
      <p>{{ $t("IBO.IBO_text28") }}: {{ $t("IBO.IBO_text39") }}</p>
      <p>{{ $t("IBO.IBO_text29") }}: Pancakeswap</p>
      <p>
        SC: {{ iboData.underlying.address }}
        <i
            class="copy"
            @click="copyAdress($event, iboData.underlying.address)"
        ></i>
      </p>
      <p>
        TG:
        <a href="https://t.me/DimensionCommChinese" target="_blank"
        >https://t.me/DimensionCommChinese</a
        >
      </p>
      <p>
        {{ $t("IBO.IBO_text30") }}:
        <a href="https://dimension.best" target="_blank"
        >https://dimension.best</a
        >
      </p>
    </div>
    <div v-else-if="iboData.name === 'RHINO'" class="tip_box">
      <p>{{ $t("IBO.IBO_text36") }}: {{ $t("IBO.IBO_text40") }}</p>
      <p>{{ $t("IBO.IBO_text28") }}: {{ $t("IBO.IBO_text40") }}</p>
      <p>{{ $t("IBO.IBO_text29") }}: Babyswap, Pancakeswap</p>
      <p>
        SC: {{ iboData.underlying.address }}
        <i
            class="copy"
            @click="copyAdress($event, iboData.underlying.address)"
        ></i>
      </p>
      <p>
        TG:
        <a href="https://t.me/rhinobsc" target="_blank"
        >https://t.me/rhinobsc</a
        >
      </p>
      <p>
        {{ $t("IBO.IBO_text30") }}:
        <a href="https://rhinobsc.com" target="_blank"
        >https://rhinobsc.com</a
        >
      </p>
    </div>
    <div v-else-if="iboData.name === 'PRED'" class="tip_box">
      <p>{{ $t("IBO.IBO_text36") }}: {{ $t("IBO.IBO_text42") }}</p>
      <p>{{ $t("IBO.IBO_text28") }}: {{ $t("IBO.IBO_text42") }}</p>
      <p>{{ $t("IBO.IBO_text29") }}: Pancakeswap</p>
      <p>
        SC: {{ iboData.underlying.address }}
        <i
            class="copy"
            @click="copyAdress($event, iboData.underlying.address)"
        ></i>
      </p>
      <p>
        TG:
        <a href="https://t.me/Predictcoin" target="_blank"
        >https://t.me/Predictcoin</a
        >
      </p>
      <p>
        {{ $t("IBO.IBO_text30") }}:
        <a href="https://predictcoin.finance" target="_blank"
        >https://predictcoin.finance</a
        >
      </p>
    </div>
    <div v-else-if="iboData.name === 'PRB'" class="tip_box">
      <p>{{ $t("IBO.IBO_text36") }}: {{ $t("IBO.IBO_text43") }}</p>
      <p>{{ $t("IBO.IBO_text28") }}: {{ $t("IBO.IBO_text43") }}</p>
      <p>{{ $t("IBO.IBO_text29") }}: Apeswap or Babyswap</p>
      <p>
        SC: {{ iboData.underlying.address }}
        <i
            class="copy"
            @click="copyAdress($event, iboData.underlying.address)"
        ></i>
      </p>
      <p>
        TG:
        <a href="https://t.me/premiumblock" target="_blank"
        >https://t.me/premiumblock</a
        >
      </p>
      <p>
        {{ $t("IBO.IBO_text30") }}:
        <a href="https://www.premiumblock.org" target="_blank"
        >https://www.premiumblock.org</a
        >
      </p>
    </div>
    <div v-else-if="iboData.name === 'MONI'" class="tip_box">
      <p>{{ $t("IBO.IBO_text45") }}: {{ $t("IBO.IBO_text46") }}</p>
      <p>{{ $t("IBO.IBO_text28") }}: {{ $t("IBO.IBO_text46") }}</p>
      <p>{{ $t("IBO.IBO_text29") }}: Pancakeswap</p>
      <p>
        SC: {{ iboData.underlying.address }}
        <i
            class="copy"
            @click="copyAdress($event, iboData.underlying.address)"
        ></i>
      </p>
      <p>
        TG:
        <a href="https://t.me/monstainfinite" target="_blank"
        >https://t.me/monstainfinite</a
        >
      </p>
      <p>
        {{ $t("IBO.IBO_text30") }}:
        <a href="https://monstainfinite.com" target="_blank"
        >https://monstainfinite.com</a
        >
      </p>
    </div>
    <div v-else-if="iboData.name === 'BOB'" class="tip_box">
      <p>{{ $t("IBO.IBO_text45") }}: {{ $t("IBO.IBO_text50") }}</p>
      <p>{{ $t("IBO.IBO_text28") }}: {{ $t("IBO.IBO_text50") }}</p>
      <p>{{ $t("IBO.IBO_text29") }}: <a href="https://home.babyswap.io/" target="_blank">Babyswap</a>, <a href="https://pancakeswap.finance/" target="_blank">pancakeswap</a></p>
      <p>
        SC: {{ iboData.underlying.address }}
        <i
            class="copy"
            @click="copyAdress($event, iboData.underlying.address)"
        ></i>
      </p>
      <p>
        TG:
        <a href="https://t.me/babyobabyofficial" target="_blank"
        >https://t.me/babyobabyofficial</a
        >
      </p>
      <p>
        {{ $t("IBO.IBO_text30") }}:
        <a href="https://babyobaby.club/" target="_blank"
        >https://babyobaby.club/</a
        >
      </p>
    </div>
    <div v-else-if="iboData.name === 'ROB'" class="tip_box">
      <p>{{ $t("IBO.IBO_text36") }}: {{ $t("IBO.IBO_text51") }}</p>
      <p>{{ $t("IBO.IBO_text28") }}: {{ $t("IBO.IBO_text51") }}</p>
      <p>{{ $t("IBO.IBO_text29") }}: <a href="https://pancakeswap.finance/" target="_blank">pancakeswap</a></p>
      <p>
        SC: {{ iboData.underlying.address }}
        <i
            class="copy"
            @click="copyAdress($event, iboData.underlying.address)"
        ></i>
      </p>
      <p>
        TG:
        <a href="https://t.me/RobMusk" target="_blank"
        >https://t.me/RobMusk</a
        >
      </p>
      <p>
        TG(CN):
        <a href="https://t.me/ROBMUSK_CN" target="_blank"
        >https://t.me/ROBMUSK_CN</a
        >
      </p>
      <p>
        {{ $t("IBO.IBO_text30") }}:
        <a href="https://www.robmusk.com" target="_blank"
        >https://www.robmusk.com</a
        >
      </p>
    </div>
    <div v-else-if="iboData.name === 'GRVS'" class="tip_box">
      <p>{{ $t("IBO.IBO_text28") }}: {{ $t("IBO.IBO_text51") }}</p>
      <p>{{ $t("IBO.IBO_text36") }}: </p>
      <p v-for="(item, index) in iboData.claimTimeTipI18nList" :key="index" style="padding-left: 10px">
            {{ $t("IBO.IBO_text52") }}{{index+1}}: {{ $t(item.timeTxt) }} {{item.rate}}
      </p>
      <p>{{ $t("IBO.IBO_text29") }}: <a href="https://gswap.exchange/swap?network=56" target="_blank">Gswap</a></p>
      <p>
        SC: {{ iboData.underlying.address }}
        <i
            class="copy"
            @click="copyAdress($event, iboData.underlying.address)"
        ></i>
      </p>
      <p>
        TG:
        <a href="https://t.me/Gravis_Finance_en" target="_blank">https://t.me/Gravis_Finance_en</a>
      </p>
      <p>
        Twitter:
        <a href="https://twitter.com/gammarosigma" target="_blank">https://twitter.com/gammarosigma</a>
      </p>
      <p>
        Medium:
        <a href="https://gravis-finance.medium.com/" target="_blank">https://gravis-finance.medium.com</a>
      </p>
      <p>
        {{ $t("IBO.IBO_text30") }}:
        <a href="https://gravis.finance/" target="_blank"
        >https://gravis.finance</a
        >
      </p>
    </div>
  </Dialog>
</template>

<script>
import {Dialog} from "element-ui";
import ClipboardJS from "clipboard";
import Message from "~/components/common/Message";
export default {
  name: "ibo_tip_dialog",
  props: {
    visible: {
      type: Boolean
    },
    iboData: {
      type: Object
    },
    onClose: {
      type: Function
    }
  },
  components: {Dialog},
  methods: {
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
  }
}
</script>

<style scoped>

</style>
