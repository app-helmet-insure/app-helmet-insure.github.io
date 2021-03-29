<template>
  <div class="langauage">
    <img src="~/assets/img/helmet/globe@2x.png" alt="" />
    <ul>
      <li
        v-for="item in localeList"
        :key="item.key"
        @click="switchLang(item.key)"
      >
        {{ item.name }}<i v-if="item.key != 'zh_CN'">/</i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "langauage",
  data() {
    return {
      lang: "",
      langName: "",
    };
  },

  computed: {
    locales() {
      return this.$store.state.locales;
    },
    locale() {
      return this.$store.state.locale;
    },
    localeList() {
      return this.$store.state.localeList;
    },
  },
  watch: {
    lang(newVol) {
      // this.switchLang(newVol);
      this.langName = this.localeList.filter(
        (item) => item.key == newVol
      )[0].name;
    },
    locale: {
      handler: "watchLocale",
      immediate: true,
    },
  },
  mounted() {
    this.lang = window.localStorage.getItem("lang") || this.locale;
  },

  methods: {
    watchLocale(newVol) {
      this.lang = newVol;
    },
    switchLang(lang) {
      this.lang = lang;
      window.localStorage.setItem("lang", this.lang);
      this.$store.dispatch("setLanguage", this.lang);
      this.$i18n.locale = this.lang;
      window.location.reload();
    },
  },
};
</script>

<style lang='scss'>
@media screen and (min-width: 750px) {
  .langauage {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      margin-right: 6px;
    }
    ul {
      display: flex;
      li {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(23, 23, 58, 0.7);
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .langauage {
    display: none;
  }
}
</style>