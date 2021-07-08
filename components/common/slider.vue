<template>
  <div
    :class="
      sliderShowFlag
        ? `openSlider slider ${storeThemes}slider`
        : `closeSlider slider storeThemes + ${storeThemes}slider`
    "
    @click.self="CloseMask"
  >
    <div class="slider_wrap">
      <a
        href="https://www.helmet.insure/"
        @mouseenter="whirlLogo(true)"
        @mouseleave="whirlLogo(false)"
        :class="['logo', whirlLogoFlag && 'whirl_logo', storeThemes + '_logo']"
      ></a>
      <div class="menu">
        <div class="menu_group">
          <div class="menu_item">
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
                    ? 'right'
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
          </div>
          <div
            class="child_menu"
            v-if="
              sliderFlag ||
              routeObj.name == 'myPolicy' ||
              routeObj.name == 'mySupply' ||
              routeObj.name == 'myClaim'
            "
          >
            <p class="child_menu_item">
              <nuxt-link
                to="/myPolicy"
                :class="routeObj.name === 'myPolicy' ? 'child_active ' : ''"
              >
                {{ $t("Type.MyGuarantee") }}
              </nuxt-link>
            </p>
            <p class="child_menu_item">
              <nuxt-link
                to="/mySupply"
                :class="routeObj.name === 'mySupply' ? 'child_active ' : ''"
              >
                {{ $t("Type.IssueInsurance") }}
              </nuxt-link>
            </p>
            <p class="child_menu_item">
              <nuxt-link
                to="/myClaim"
                :class="routeObj.name === 'myClaim' ? 'child_active ' : ''"
              >
                {{ $t("Type.Claim") }}
              </nuxt-link>
            </p>
          </div>
        </div>
        <div class="menu_item">
          <nuxt-link
            to="/mining"
            :class="routeObj.name === 'mining' ? 'active' : ''"
          >
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-mining1"></use>
            </svg>
            {{ $t("Header.Mining") }}
            <i class="num">5</i>
          </nuxt-link>
        </div>
        <div class="menu_item">
          <nuxt-link
            to="/flashmining"
            :class="routeObj.name === 'flashmining' ? 'active' : ''"
          >
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-flashmining"></use>
            </svg>
            {{ $t("Header.FlashMining") }}
            <i class="num">2</i>
          </nuxt-link>
        </div>
        <div class="menu_item">
          <nuxt-link
            to="/burnbox"
            :class="routeObj.name === 'burnbox' ? 'active' : ''"
          >
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-burnbox"></use>
            </svg>
            {{ $t("Header.BruningBox") }}
            <!-- <i class="num">1</i> -->
          </nuxt-link>
        </div>
        <div class="menu_item">
          <nuxt-link
            to="/iio"
            :class="routeObj.name.includes('iio') ? 'active' : ''"
          >
            <svg class="hot" aria-hidden="true">
              <use
                :href="`#icon-${
                  routeObj.name.includes('iio') ? 'hot1' : 'hot'
                }`"
              ></use>
            </svg>
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-iio"></use>
            </svg>
            {{ $t("Header.IIO") }}
            <!-- <i class="num">1</i> -->
          </nuxt-link>
        </div>
        <div class="menu_item">
          <nuxt-link to="/nft" :class="routeObj.name === 'nft' ? 'active' : ''">
            <!-- <svg class="hot" aria-hidden="true">
              <use
                :href="`#icon-${
                  routeObj.name.includes('nft') ? 'new1' : 'new'
                }`"
              ></use>
            </svg> -->
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-nft"></use>
            </svg>
            {{ $t("Header.NFT") }}
          </nuxt-link>
        </div>
        <div class="menu_item">
          <a href="https://helmet-insure.gitbook.io/helmet/" target="_blank">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-papar"></use>
            </svg>
            {{ $t("Header.GuideBook") }}
          </a>
        </div>
        <div class="menu_item">
          <a href="https://helmetinsure.medium.com/" target="_blank">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-medium"></use>
            </svg>
            {{ $t("Header.Medium") }}</a
          >
        </div>
      </div>
      <div class="footer">
        <div class="logo_wrap">
          <a
            href="https://www.coingecko.com/en/coins/helmet-insure"
            target="_blank"
            ><img src="~/assets/img/slider/coingecko.png" alt=""
          /></a>
          <a
            href="https://coinmarketcap.com/currencies/helmet-insure/"
            target="_blank"
            ><img src="~/assets/img/slider/cmc.png" alt=""
          /></a>
        </div>
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
          <a href="https://certik.foundation/projects/helmet" target="_blank">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-audit"></use>
            </svg>
          </a>
          <a
            href="https://line.me/ti/g2/PEPrGL03FLQFz2d06z3UaA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
            target="_blank"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-line"></use>
            </svg>
          </a>
        </div>
        <div class="footer_bottom">
          <Langauage class="langauage" />
          <div class="themes">
            <div
              :class="['light', storeThemes == 'light' ? 'active_themes' : '']"
              @click="changeThemes('light')"
            >
              <svg width="24px" height="24px" class="icon">
                <path
                  d="M12,18 C8.6862915,18 6,15.3137085 6,12 C6,8.6862915 8.6862915,6 12,6 C15.3137085,6 18,8.6862915 18,12 C18,15.3137085 15.3137085,18 12,18 L12,18 Z M12,16 C14.209139,16 16,14.209139 16,12 C16,9.790861 14.209139,8 12,8 C9.790861,8 8,9.790861 8,12 C8,14.209139 9.790861,16 12,16 Z M11,1 L13,1 L13,4 L11,4 L11,1 Z M11,20 L13,20 L13,23 L11,23 L11,20 Z M3.515,4.929 L4.929,3.515 L7.05,5.636 L5.636,7.05 L3.515,4.93 L3.515,4.929 Z M16.95,18.364 L18.364,16.95 L20.485,19.071 L19.071,20.485 L16.95,18.364 Z M19.071,3.514 L20.485,4.929 L18.364,7.05 L16.95,5.636 L19.071,3.515 L19.071,3.514 Z M5.636,16.95 L7.05,18.364 L4.929,20.485 L3.515,19.071 L5.636,16.95 L5.636,16.95 Z M23,11 L23,13 L20,13 L20,11 L23,11 Z M4,11 L4,13 L1,13 L1,11 L4,11 Z"
                  id="形状"
                  fill-rule="nonzero"
                ></path>
              </svg>
            </div>
            <div
              :class="['dark', storeThemes == 'dark' ? 'active_themes' : '']"
              @click="changeThemes('dark')"
            >
              <svg width="24px" height="24px" class="icon">
                <path
                  d="M10,7 C9.99958529,9.84442777 11.7204262,12.4062838 14.3537762,13.4815684 C16.9871263,14.556853 20.0093153,13.9317342 22,11.9 L22,12 C22,17.523 17.523,22 12,22 C6.477,22 2,17.523 2,12 C2,6.477 6.477,2 12,2 L12.1,2 C10.754595,3.31542865 9.99735164,5.11838892 10,7 L10,7 Z M3.99999933,12 C3.99850457,15.6728076 6.49807006,18.8748141 10.0614119,19.7648215 C13.6247537,20.6548289 17.3363575,19.0041715 19.062,15.762 C16.0273256,16.4769455 12.8387967,15.5703746 10.634211,13.365789 C8.42962536,11.1612033 7.52305447,7.97267439 8.238,4.938 C5.62888012,6.32799482 3.99913736,9.04372001 3.99999933,12 L3.99999933,12 Z"
                  id="形状"
                  fill-rule="nonzero"
                ></path>
              </svg>
            </div>
          </div>
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
      sliderShowFlag: false,
      whirlLogoFlag: false,
    };
  },
  computed: {
    routeObj() {
      return this.$route;
    },
    storeThemes() {
      return this.$store.state.themes;
    },
  },
  mounted() {
    this.$bus.$on("OPEN_SILDER", (res) => {
      this.sliderShowFlag = res;
    });
  },
  watch: {
    $route() {
      this.$route.path !== "/";
    },
    storeThemes(newValue) {
      console.log(newValue);
    },
  },
  methods: {
    changeThemes(value) {
      this.$store.dispatch("setThemes", value);
    },
    CloseMask() {
      this.sliderShowFlag = false;
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
@import "~/assets/css/base.scss";
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
    @include themeify {
      background-color: themed("color-ffffff");
    }
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
  .darkslider {
    background-image: url("../../assets/img/slider/slider_logo_bg_dark.png");
  }
  .lightslider {
    background-image: url("../../assets/img/slider/slider_logo_bg_light.png");
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
    background-repeat: no-repeat;
    background-size: 150px 40px;
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    animation: rotation_0 1s linear;
    -moz-animation: rotation_0 1s linear;
    -webkit-animation: rotation_0 1s linear;
    -o-animation: rotation_0 1s linear;
  }
  .dark_logo {
    background-image: url("../../assets/img/slider/slider_logo_dark.png");
  }
  .light_logo {
    background-image: url("../../assets/img/slider/slider_logo_light.png");
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
    overflow-y: auto;
    &_group {
      height: auto;
      position: relative;
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
            height: 40px;
            padding-left: 40px;
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-family: HelveticaNeue;
            @include themeify {
              color: themed("media_icon");
            }
            line-height: 20px;
            font-weight: normal;
            border-radius: 5px;
            &:hover {
              @include themeify {
                color: themed("media_icon_hover");
              }
            }
          }
          .child_active {
            width: 180px;
            height: 40px;
            background: #fd7e14;
            border-radius: 5px;
            @include themeify {
              color: themed("color-ffffff");
            }
            &:hover {
              @include themeify {
                color: themed("color-ffffff");
              }
            }
          }
        }
      }
    }
    &_item {
      width: 100%;
      font-size: 16px;
      font-family: HelveticaNeue-Medium, HelveticaNeue;
      font-weight: 600;
      line-height: 50px;
      cursor: pointer;
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      > a {
        @include themeify {
          color: themed("media_icon");
        }
        display: block;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        position: relative;
        .num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          background: #dc3545;
          position: absolute;
          border-radius: 50%;
          right: 20px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          @include themeify {
            color: themed("color-ffffff");
          }
          line-height: 12px;
        }
        .hot {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 0;
          top: 0;
        }
        > .icon {
          width: 24px;
          height: 24px;
          margin-right: 16px;
          display: block;
          flex-shrink: 0;
          @include themeify {
            fill: themed("media_icon");
          }
        }
        .right {
          width: 24px;
          height: 24px;
          position: absolute;
          @include themeify {
            fill: themed("media_icon");
          }
          right: 20px;
        }
        &:hover {
          @include themeify {
            color: themed("media_icon_hover");
          }
          > .icon {
            @include themeify {
              fill: themed("media_icon_hover");
            }
          }
          > .right {
            @include themeify {
              fill: themed("media_icon_hover");
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
      @include themeify {
        color: themed("color-ffffff");
      }
      .num {
        background: #ff9c4b;
      }
      .icon {
        width: 24px;
        height: 24px;
        @include themeify {
          fill: themed("color-ffffff") !important;
        }
      }
      .right {
        transform: rotate(90deg) !important;
        @include themeify {
          fill: themed("color-ffffff") !important;
        }
      }
      &:hover {
        @include themeify {
          color: themed("color-ffffff");
        }
        .icon {
          @include themeify {
            fill: themed("color-ffffff");
          }
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
    .logo_wrap {
      display: flex;
      transform: translateX(-10px);
      a {
        margin-right: 8px;
        height: 30px;
        padding: 0 8px;
        @include themeify {
          background: themed("coin_link");
        }
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          @include themeify {
            background: themed("coin_link_hover");
          }
        }
        &:last-of-type {
          margin: 0;
        }
        img {
          height: 16px;
        }
      }
    }
    .footer_top {
      height: 64px;
      display: flex;
      align-items: center;
      @include themeify {
        border-bottom: 1px solid themed("color-e8e8eb");
      }
      a {
        margin-right: 20px;
        &:last-of-type {
          margin: 0;
        }
        .icon {
          width: 24px;
          height: 24px;
          @include themeify {
            fill: themed("media_icon");
          }
          &:hover {
            @include themeify {
              fill: themed("media_icon_hover");
            }
          }
        }
      }
    }
    .footer_bottom {
      height: 64px;
      display: flex;
      align-items: center;
      .themes {
        width: 80px;
        height: 32px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        @include themeify {
          border-bottom: 1px solid themed("insure_button");
        }
        div {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .icon {
          width: 24px;
          height: 24px;
          @include themeify {
            fill: themed("media_icon");
          }
          &:hover {
            @include themeify {
              fill: themed("media_icon_hover");
            }
          }
        }
      }
      .active_themes {
        @include themeify {
          background: themed("insure_button");
        }
        .icon {
          @include themeify {
            fill: themed("media_icon_hover");
          }
        }
      }
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
      @include themeify {
        background-color: themed("color-ffffff");
      }
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
    background-repeat: no-repeat;
    background-size: 150px 40px;
  }
  .dark_logo {
    background-image: url("../../assets/img/slider/slider_logo_h5_dark.png");
  }
  .light_logo {
    background-image: url("../../assets/img/slider/slider_logo_h5_light.png");
  }
  .menu {
    margin-top: 40px;
    flex: 1;
    overflow-y: auto;
    &_group {
      height: auto;
      position: relative;
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
            @include themeify {
              color: themed("media_icon");
            }
            line-height: 20px;
            font-weight: normal;
            &:hover {
              @include themeify {
                color: themed("media_icon_hover");
              }
            }
          }
          .child_active {
            width: 180px;
            height: 30px;
            background: #fd7e14;
            border-radius: 5px;
            @include themeify {
              color: themed("color-ffffff");
            }
            &:hover {
              @include themeify {
                color: themed("color-ffffff");
              }
            }
          }
        }
      }
    }

    &_item {
      width: 100%;
      font-size: 14px;
      font-family: HelveticaNeue-Medium, HelveticaNeue;
      font-weight: 600;
      line-height: 40px;
      cursor: pointer;
      border-radius: 5px;
      overflow: hidden;
      > a {
        @include themeify {
          color: themed("media_icon");
        }
        display: block;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        position: relative;
        .num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          background: #dc3545;
          position: absolute;
          border-radius: 50%;
          right: 20px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          @include themeify {
            color: themed("color-ffffff");
          }
          line-height: 12px;
        }
        .hot {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 0;
          top: 0;
        }
        > .icon {
          width: 20px;
          height: 20px;
          margin-right: 8px;
          display: block;
          @include themeify {
            fill: themed("media_icon");
          }
        }
        .right {
          position: absolute;
          right: 20px;
          width: 20px;
          height: 20px;
          @include themeify {
            fill: themed("media_icon");
          }
        }
        &:hover {
          background: #fd7e14;

          > .icon {
            @include themeify {
              fill: themed("media_icon_hover");
            }
          }
          > .right {
            @include themeify {
              fill: themed("media_icon_hover");
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
      @include themeify {
        color: themed("color-ffffff");
      }
      .num {
        background: #ff9c4b;
      }
      .icon {
        width: 20px;
        height: 20px;
        @include themeify {
          fill: themed("color-ffffff") !important;
        }
      }
      .right {
        transform: rotate(90deg);
        @include themeify {
          fill: themed("color-ffffff") !important;
        }
      }
      &:hover {
        @include themeify {
          color: themed("color-ffffff");
        }
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
    .logo_wrap {
      display: flex;
      margin-bottom: 10px;
      transform: translateX(-10px);
      margin-bottom: 20px;
      a {
        margin-right: 8px;
        height: 30px;
        padding: 0 8px;
        @include themeify {
          background: themed("coin_link");
        }
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          @include themeify {
            background: themed("coin_link_hover");
          }
        }
        &:last-of-type {
          margin: 0;
        }
        img {
          height: 16px;
        }
      }
    }
    .footer_top {
      height: 36px;
      display: flex;
      align-items: center;
      @include themeify {
        border-bottom: 1px solid themed("color-e8e8eb");
      }
      padding-bottom: 20px;
      a {
        margin-right: 20px;
        .icon {
          width: 20px;
          height: 20px;
          @include themeify {
            fill: themed("media_icon");
          }
          &:hover {
            @include themeify {
              fill: themed("media_icon_hover");
            }
          }
        }
        &:last-of-type {
          margin: 0;
        }
      }
    }
    .footer_bottom {
      height: 64px;
      display: flex;
      align-items: center;
      .themes {
        width: 80px;
        height: 32px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        @include themeify {
          border: 1px solid themed("insure_button");
        }
        div {
          height: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .icon {
          width: 24px;
          height: 24px;
          @include themeify {
            fill: themed("media_icon");
          }
          &:hover {
            @include themeify {
              fill: themed("media_icon_hover");
            }
          }
        }
      }
      .active_themes {
        @include themeify {
          background: themed("insure_button");
        }
        .icon {
          @include themeify {
            fill: themed("media_icon_hover");
          }
        }
      }
    }
  }
}
</style>
