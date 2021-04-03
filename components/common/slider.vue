<template>
  <div
    :class="sliderFlag ? 'openSlider slider' : 'closeSlider slider'"
    @touchmove.prevent
    @click.self="CloseMask"
  >
    <div class="slider_wrap">
      <a
        href="https://www.helmet.insure/"
        @mouseenter="whirlLogo(true)"
        @mouseleave="whirlLogo(false)"
        :class="['logo', whirlLogoFlag && 'whirl_logo']"
      ></a>
      <ul class="menu">
        <li class="menu_group menu_item">
          <a
            @click="sliderClick"
            :class="
              routeObj.name === 'index'
                ? 'active'
                : routeObj.name == 'myPolicy' ||
                  routeObj.name == 'mySupply' ||
                  routeObj.name == 'myClaim'
                ? 'active_child'
                : ''
            "
          >
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-insurance"></use>
            </svg>
            {{ $t("Table.safe") }}
            <svg
              :class="
                routeObj.name === 'index'
                  ? 'right active'
                  : routeObj.name == 'myPolicy' ||
                    routeObj.name == 'mySupply' ||
                    routeObj.name == 'myClaim'
                  ? 'active_child right'
                  : 'right'
              "
            >
              <use xlink:href="#icon-rightSelect"></use>
            </svg>
          </a>
          <ul
            class="child_menu"
            v-if="
              sliderFlag ||
              routeObj.name == 'myPolicy' ||
              routeObj.name == 'mySupply' ||
              routeObj.name == 'myClaim'
            "
          >
            <li class="child_menu_item">
              <nuxt-link
                to="/myPolicy"
                :class="routeObj.name === 'myPolicy' ? 'child_active ' : ''"
              >
                {{ $t("Type.MyGuarantee") }}
              </nuxt-link>
            </li>
            <li class="child_menu_item">
              <nuxt-link
                to="/mySupply"
                :class="routeObj.name === 'mySupply' ? 'child_active ' : ''"
              >
                {{ $t("Type.IssueInsurance") }}
              </nuxt-link>
            </li>
            <li class="child_menu_item">
              <nuxt-link
                to="/myClaim"
                :class="routeObj.name === 'myClaim' ? 'child_active ' : ''"
              >
                {{ $t("Type.Claim") }}
              </nuxt-link>
            </li>
          </ul>
        </li>
        <li class="menu_item">
          <nuxt-link
            to="/mining"
            :class="routeObj.name === 'mining' ? 'active' : ''"
          >
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-mining1"></use>
            </svg>
            {{ $t("Header.Mining") }}
          </nuxt-link>
        </li>
        <li class="menu_item">
          <nuxt-link
            to="/flashmining"
            :class="routeObj.name === 'flashmining' ? 'active' : ''"
          >
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-flashmining"></use>
            </svg>
            {{ $t("Header.FlashMining") }}
          </nuxt-link>
        </li>
        <li class="menu_item">
          <nuxt-link
            to="/burnbox"
            :class="routeObj.name === 'burnbox' ? 'active' : ''"
          >
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-burnbox"></use>
            </svg>
            {{ $t("Table.BurnMining") }}
          </nuxt-link>
        </li>
        <li class="menu_item">
          <nuxt-link to="/IIO" :class="routeObj.name === 'IIO' ? 'active' : ''">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-iio"></use>
            </svg>
            {{ $t("Header.IIO") }}
          </nuxt-link>
        </li>
        <li class="menu_item">
          <a href="https://helmet-insure.gitbook.io/helmet/" target="_blank">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-papar"></use>
            </svg>
            {{ $t("Header.GuideBook") }}
          </a>
        </li>
        <li class="menu_item">
          <a href="https://helmetinsure.medium.com/" target="_blank">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-medium"></use>
            </svg>
            {{ $t("Header.Medium") }}</a
          >
        </li>
      </ul>
      <div class="footer">
        <div class="footer_top">
          <a href="https://twitter.com/Helmet_insure" target="_blank">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Twitter"></use>
            </svg>
          </a>
          <a href="https://t.me/helmet_insure" target="_blank">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Telegram"></use>
            </svg>
          </a>
          <a href="https://discord.gg/QtTJZEVds5" target="_blank">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-Discord"></use>
            </svg>
          </a>
          <!-- <a href="https://helmet-insure.gitbook.io/helmet/" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-medium"></use>
        </svg>
      </a> -->
          <a href="https://certik.foundation/projects/helmet" target="_blank">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-audit"></use>
            </svg>
          </a>
        </div>
        <div class="footer_bottom">
          <Langauage class="langauage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Langauage from "~/components/common/langauage.vue";
export default {
  components: { Langauage },
  data() {
    return {
      sliderFlag: false,
      whirlLogoFlag: false,
    };
  },
  computed: {
    routeObj() {
      return this.$route;
    },
  },
  mounted() {
    this.$bus.$on("OPEN_SILDER", (res) => {
      this.sliderFlag = res;
    });
  },
  watch: {
    $route() {
      this.$route.path !== "/" && (this.sliderFlag = false);
    },
  },
  methods: {
    CloseMask() {
      this.sliderFlag = false;
    },
    sliderClick() {
      this.sliderFlag = !this.sliderFlag;
      this.$router.push("/");
    },
    whirlLogo(val) {
      if (this.whirlLogoFlag === val) return;
      this.whirlLogoFlag = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 750px) {
  .openSlider {
    display: block;
  }
  .closeSlider {
    display: block;
  }
  .slider {
    position: relative;
    width: 260px;
    height: calc(100vh - 50px);
    background-image: url("../../assets/img/slider/slider_logo_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 135px;
    padding: 70px 20px 30px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    .slider_wrap {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: 100%;
    }
  }
  @keyframes rotation_0 {
    from {
      -webkit-transform: rotate(180deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes rotation_0 {
    from {
      -webkit-transform: rotate(180deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  .logo {
    display: block;
    position: absolute;
    left: 20px;
    top: 30px;
    width: 150px;
    height: 40px;
    background-image: url("../../assets/img/slider/slider_logo.png");
    background-repeat: no-repeat;
    background-size: 150px 40px;
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    animation: rotation_0 1s linear;
    -moz-animation: rotation_0 1s linear;
    -webkit-animation: rotation_0 1s linear;
    -o-animation: rotation_0 1s linear;
  }
  @keyframes rotation_180 {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(180deg);
    }
  }
  @-webkit-keyframes rotation_180 {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(180deg);
    }
  }
  .whirl_logo {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    animation: rotation_180 1s linear;
    -moz-animation: rotation_180 1s linear;
    -webkit-animation: rotation_180 1s linear;
    -o-animation: rotation_180 1s linear;
  }
  .menu {
    margin-top: 40px;
    flex: 1;
    &_group {
      height: auto;
      position: relative;
    }
    &_item {
      width: 100%;
      font-size: 16px;
      font-family: HelveticaNeue-Medium, HelveticaNeue;
      font-weight: 600;
      line-height: 50px;
      cursor: pointer;
      > a {
        color: rgba(23, 23, 58, 0.7);
        display: block;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        position: relative;
        > .icon {
          width: 24px;
          height: 24px;
          margin-right: 16px;
          display: block;
          flex-shrink: 0;
        }
        .right {
          width: 24px;
          height: 24px;
          position: absolute;
          fill: #17173a;
          right: 20px;
        }
        &:hover {
          color: #17173a;
          > .icon {
            fill: #17173a;
          }
          > .right {
            fill: #17173a;
          }
        }
      }
      .child_menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &_item {
          height: 40px;
          width: 180px;
          display: flex;
          align-items: center;
          > a {
            height: 50px;
            padding-left: 40px;
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-family: HelveticaNeue;
            color: rgba(23, 23, 58, 0.8);
            line-height: 20px;
            font-weight: normal;
            &:hover {
              color: #17173a;
            }
          }
          .child_active {
            width: 180px;
            height: 40px;
            background: #fd7e14;
            border-radius: 5px;
            color: #ffffff;
            &:hover {
              color: #fff;
            }
          }
        }
      }
    }
    .active {
      width: 100%;
      height: 50px;
      background: #fd7e14;
      border-radius: 5px;
      color: #ffffff;
      .icon {
        width: 24px;
        height: 24px;
        fill: #fff !important;
      }
      .right {
        transform: rotate(90deg) !important;
        fill: #fff !important;
      }
      &:hover {
        color: #ffffff;
        .icon {
          fill: #fff;
        }
      }
    }
    .active_child {
      color: #fd7e14;
      line-height: 50px;
      .icon {
        fill: #fd7e14;
      }
      .right {
        fill: #fd7e14;
        transform: rotate(90deg) !important;
      }
    }
    .retote {
      transform: rotate(0) !important;
    }
  }
  .footer {
    height: 128px;
    padding: 0 20px;
    .footer_top {
      height: 64px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e8e8eb;
      a {
        margin-right: 20px;
        &:nth-of-type(4) {
          margin: 0;
        }
        .icon {
          width: 24px;
          height: 24px;
          fill: rgba(23, 23, 58, 0.7);
          &:hover {
            fill: #17173a;
          }
        }
        &:nth-of-type(4) {
          margin: 0;
        }
      }
    }
    .footer_bottom {
      height: 64px;
      display: flex;
      align-items: center;
    }
  }
}
@media screen and (max-width: 750px) {
  .openSlider {
    display: block;
  }
  .closeSlider {
    display: none;
  }
  .slider {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    .slider_wrap {
      width: 230px;
      height: 100%;
      padding: 50px 20px 0;
      display: flex;
      position: relative;
      flex-direction: column;
      flex-shrink: 0;
      background: #ffffff;
      background-image: url("../../assets/img/slider/slider_logo_bg_h5.png");
      background-repeat: no-repeat;
      background-size: 100% 93px;
      animation: slider 1s forwards;
      -o-animation: slider 1s forwards;
      -webkit-animation: slider 1s forwards;
      -moz-animation: slider 1s forwards;
    }
    @keyframes slider {
      0% {
        transform: translate(-100%);
      }
      100% {
        transform: translate(0%);
      }
    }
  }
  .logo {
    display: block;
    position: absolute;
    left: 20px;
    top: 30px;
    width: 150px;
    height: 40px;
    background-image: url("../../assets/img/slider/slider_logo_h5.png");
    background-repeat: no-repeat;
    background-size: 150px 40px;
  }
  .menu {
    margin-top: 40px;
    flex: 1;
    &_group {
      height: auto;
      position: relative;
    }

    &_item {
      width: 100%;
      font-size: 14px;
      font-family: HelveticaNeue-Medium, HelveticaNeue;
      font-weight: 600;
      line-height: 40px;
      cursor: pointer;
      > a {
        color: rgba(23, 23, 58, 0.7);
        display: block;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        position: relative;
        > .icon {
          width: 20px;
          height: 20px;
          margin-right: 8px;
          display: block;
          fill: rgba(23, 23, 58, 0.7);
        }
        .right {
          position: absolute;
          right: 20px;
          width: 20px;
          height: 20px;
          fill: rgba(23, 23, 58, 0.7);
        }
        &:hover {
          color: #17173a;
          > .icon {
            fill: #17173a;
          }
          > .right {
            fill: #17173a;
          }
        }
      }
      .child_menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &_item {
          height: 30px;
          width: 150px;
          display: flex;
          align-items: center;
          > a {
            padding-left: 30px;
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 12px;
            font-family: HelveticaNeue;
            color: rgba(23, 23, 58, 0.8);
            line-height: 20px;
            font-weight: normal;
            &:hover {
              color: #17173a;
            }
          }
          .child_active {
            width: 180px;
            height: 30px;
            background: #fd7e14;
            border-radius: 5px;
            color: #ffffff;
            &:hover {
              color: #fff;
            }
          }
        }
      }
    }
    .active {
      width: 100%;
      height: 4 0px;
      background: #fd7e14;
      border-radius: 5px;
      color: #ffffff;
      .icon {
        width: 20px;
        height: 20px;
        fill: #fff !important;
      }
      .right {
        transform: rotate(90deg);
        fill: #fff !important;
      }
      &:hover {
        color: #ffffff;
        .icon {
          fill: #fff;
        }
      }
    }
    .active_child {
      color: #fd7e14;
      .icon {
        fill: #fd7e14;
      }
      .right {
        fill: #fd7e14;
        transform: rotate(90deg) !important;
      }
    }
    .retote {
      transform: rotate(0) !important;
    }
  }
  .footer {
    padding: 0 10px;
    .footer_top {
      height: 36px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e8e8eb;
      padding-bottom: 20px;
      a {
        margin-right: 20px;
        .icon {
          width: 20px;
          height: 20px;
          fill: rgba(23, 23, 58, 0.7);
          &:hover {
            fill: #17173a;
          }
        }
        &:nth-of-type(4) {
          margin: 0;
        }
      }
    }
    .footer_bottom {
      height: 64px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
