<template>
  <div class="footer-container">
    <div class="footer_top">
      <a href="https://twitter.com/Helmet_insure" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Twitter"></use>
        </svg>
        <span>Twitter</span>
      </a>
      <a href="https://t.me/helmet_insure" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Telegram"></use>
        </svg>
        <span>Telegram</span>
      </a>
      <a href="https://discord.gg/QtTJZEVds5" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-Discord"></use>
        </svg>
        <span>Discord</span>
      </a>
      <a href="https://helmet-insure.gitbook.io/helmet/" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-medium"></use>
        </svg>
        <span>Guidebook</span>
      </a>
      <a href="https://certik.foundation/projects/helmet" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-audit"></use>
        </svg>
        <span>Audit report</span>
      </a>
    </div>
    <div class="footer_bottom">
      <p>Powered by HELMET Core team</p>
    </div>
  </div>
</template>
<script>
import Langauage from "~/components/common/langauage.vue";
export default {
  name: "p-footer",
  components: { Langauage },
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/themes.scss";
@media screen and (min-width: 750px) {
  .footer-container {
    width: 100%;
    height: 240px;
    @include themeify {
      background: #121212;
    }
    display: flex;
    flex-direction: column;
    min-width: 1200px;
    .footer_top {
      width: 360px;
      flex: 1;
      margin: 74px auto 0;
      display: flex;
      justify-content: space-between;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
        }
        span {
          margin-top: 4px;
          font-size: 14px;
          color: #787878;
        }
      }
    }
    .footer_bottom {
      border-top: 1px solid #212121;
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      display: flex;
      p {
        font-size: 14px;
        font-weight: 400;
        color: #545454;
      }
    }
  }
}
@media screen and (min-width: 750px) and (max-width: 1280px) {
  .footer_bottom {
    padding: 0 50px !important;
  }
}

@media screen and (max-width: 750px) {
  .footer-container {
    width: 100%;
    height: 218px;
    background: #121212;
    display: flex;
    flex-direction: column;
    .footer_top {
      width: 300px;
      flex: 1;
      margin: 74px auto 0;
      display: flex;
      justify-content: space-around;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
        }
        span {
          display: none;
          margin-top: 4px;
          font-size: 14px;
          color: #787878;
        }
      }
    }
    .footer_bottom {
      border-top: 1px solid #212121;
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px !important;
      display: flex;
      p {
        width: 100%;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #545454;
      }
      .langauage {
        display: none;
      }
    }
  }
}
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878 !important;
  overflow: hidden;
  &:hover {
    fill: #fd7e14 !important;
  }
}
.footer_top {
  a:hover {
    .icon {
      fill: #fd7e14 !important;
    }
    span {
      color: #fd7e14 !important;
    }
  }
}
</style>
