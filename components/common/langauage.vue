<template>
  <div class="langauage">
    <span>
      <svg
        t="1617088189707"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2166"
        width="24"
        height="24"
      >
        <path
          d="M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m-97.706667-99.541334A763.733333 763.733333 0 0 1 342.485333 554.666667H173.312a341.674667 341.674667 0 0 0 240.981333 284.458666zM427.946667 554.666667c6.442667 104.064 36.181333 201.813333 84.053333 288.085333A678.613333 678.613333 0 0 0 596.053333 554.666667h-168.106666z m422.741333 0h-169.173333a763.733333 763.733333 0 0 1-71.808 284.458666A341.674667 341.674667 0 0 0 850.688 554.666667zM173.312 469.333333h169.173333A763.733333 763.733333 0 0 1 414.293333 184.874667 341.674667 341.674667 0 0 0 173.312 469.333333z m254.677333 0h168.021334A678.613333 678.613333 0 0 0 512 181.248 678.613333 678.613333 0 0 0 427.946667 469.333333h0.042666z m181.717334-284.458666A763.733333 763.733333 0 0 1 681.514667 469.333333h169.173333a341.674667 341.674667 0 0 0-240.981333-284.458666z"
          p-id="2167"
        ></path></svg
      >{{ langName }}</span
    >
    <ul>
      <li
        v-for="item in localeList"
        :key="item.key"
        @click="switchLang(item.key)"
      >
        {{ item.name }}
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
    locale() {
      return this.$store.state.locale;
    },
    localeList() {
      return this.$store.state.localeList;
    },
  },
  watch: {},
  mounted() {
    let storageLang = window.localStorage.lang || this.locale || "en_US";
    let name = this.localeList.filter((item) => item.key === storageLang)[0]
      .name;
    this.langName = name;
  },
  methods: {
    switchLang(key) {
      this.$store.commit("SET_LANG", key);
      window.localStorage.setItem("lang", key);
      this.$i18n.locale = key;
      let name = this.localeList.filter((item) => item.key === key)[0].name;
      this.langName = name;
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/css/themes.scss";
.langauage {
  > span {
    .icon {
      @include themeify {
        fill: themed("media_icon");
      }
      margin-right: 10px;
    }
  }
}

@media screen and (min-width: 750px) {
  .langauage {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    span {
      width: 120px;
      display: flex;
      justify-content: center;
      padding: 0 8px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      @include themeify {
        color: darken($color: themed("color-17173a"), $amount: 30%);
      }
      cursor: pointer;
      height: 32px;
      align-items: center;
      text-align: left;
      &:hover {
        @include themeify {
          background: themed("color-f8f9fa");
        }
        border-radius: 5px;
      }
    }
    ul {
      display: none;
      width: 120px;
      padding: 10px 8px;
      @include themeify {
        background: themed("lang_icon");
      }
      box-shadow: 0px 0px 6px 0px rgba(122, 127, 130, 0.2);
      border-radius: 5px 5px 0px 0px;
      position: absolute;
      bottom: 45px;
      li {
        &:hover {
          @include themeify {
            background: themed("lang_icon_hover");
          }
          border-radius: 5px;
        }
        width: 100%;
        text-align: center;
        height: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #22292f;
        line-height: 32px;
        cursor: pointer;
        &:hover {
          color: #17173a;
        }
      }
    }
    &:hover {
      ul {
        display: block;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .langauage {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    span {
      width: 120px;
      display: flex;
      justify-content: center;
      padding: 0 8px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      @include themeify {
        color: darken($color: themed("color-17173a"), $amount: 30%);
      }
      cursor: pointer;
      height: 32px;
      align-items: center;
      text-align: left;
      &:hover {
        @include themeify {
          background: themed("color-f8f9fa");
        }
        border-radius: 5px;
      }
    }
    ul {
      display: none;
      width: 120px;
      padding: 10px 8px;
      @include themeify {
        background: themed("media_icon");
      }
      box-shadow: 0px 0px 6px 0px rgba(122, 127, 130, 0.2);
      border-radius: 5px 5px 0px 0px;
      position: absolute;
      bottom: 45px;
      li {
        &:hover {
          @include themeify {
            background: themed("media_icon_hover");
          }
          border-radius: 5px;
        }
        width: 100%;
        text-align: center;
        height: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #22292f;
        line-height: 32px;
        cursor: pointer;
        &:hover {
          color: #17173a;
        }
      }
    }
    &:hover {
      ul {
        display: block;
      }
    }
  }
}
</style>
