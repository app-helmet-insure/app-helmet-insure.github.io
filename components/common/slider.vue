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
            <svg
              width="33px"
              height="16px"
              class="hot"
              v-if="routeObj.name === 'mining'"
            >
              <path
                d="M5,0 L28,0 C30.7614237,-5.07265313e-16 33,2.23857625 33,5 L33,11 C33,13.7614237 30.7614237,16 28,16 L5,16 C2.23857625,16 3.38176876e-16,13.7614237 0,11 L0,5 C-3.38176876e-16,2.23857625 2.23857625,5.07265313e-16 5,0 Z"
                id="矩形"
                fill="#FD9743"
              ></path>
              <path
                d="M6.388,12 L6.388,8.352 L10.18,8.352 L10.18,12 L11.536,12 L11.536,3.624 L10.18,3.624 L10.18,7.152 L6.388,7.152 L6.388,3.624 L5.032,3.624 L5.032,12 L6.388,12 Z M16.84,12.144 C17.384,12.144 17.878,12.05 18.322,11.862 C18.766,11.674 19.146,11.398 19.462,11.034 C19.778,10.67 20.022,10.218 20.194,9.678 C20.366,9.138 20.452,8.516 20.452,7.812 C20.452,7.108 20.366,6.486 20.194,5.946 C20.022,5.406 19.778,4.954 19.462,4.59 C19.146,4.226 18.766,3.95 18.322,3.762 C17.878,3.574 17.384,3.48 16.84,3.48 C16.296,3.48 15.802,3.574 15.358,3.762 C14.914,3.95 14.534,4.226 14.218,4.59 C13.902,4.954 13.658,5.406 13.486,5.946 C13.314,6.486 13.228,7.108 13.228,7.812 C13.228,8.516 13.314,9.138 13.486,9.678 C13.658,10.218 13.902,10.67 14.218,11.034 C14.534,11.398 14.914,11.674 15.358,11.862 C15.802,12.05 16.296,12.144 16.84,12.144 Z M16.84,10.932 C16.512,10.932 16.216,10.876 15.952,10.764 C15.688,10.652 15.462,10.49 15.274,10.278 C15.086,10.066 14.94,9.808 14.836,9.504 C14.732,9.2 14.68,8.856 14.68,8.472 L14.68,8.472 L14.68,7.152 C14.68,6.768 14.732,6.424 14.836,6.12 C14.94,5.816 15.086,5.558 15.274,5.346 C15.462,5.134 15.688,4.972 15.952,4.86 C16.216,4.748 16.512,4.692 16.84,4.692 C17.16,4.692 17.454,4.748 17.722,4.86 C17.99,4.972 18.218,5.134 18.406,5.346 C18.594,5.558 18.74,5.816 18.844,6.12 C18.948,6.424 19,6.768 19,7.152 L19,7.152 L19,8.472 C19,8.856 18.948,9.2 18.844,9.504 C18.74,9.808 18.594,10.066 18.406,10.278 C18.218,10.49 17.99,10.652 17.722,10.764 C17.454,10.876 17.16,10.932 16.84,10.932 Z M25.252,12 L25.252,4.824 L27.748,4.824 L27.748,3.624 L21.4,3.624 L21.4,4.824 L23.896,4.824 L23.896,12 L25.252,12 Z"
                id="HOT"
                fill="#FFFFFF"
                fill-rule="nonzero"
              ></path>
            </svg>
            <svg width="33px" height="16px" class="hot" v-else>
              <path
                d="M5,0 L28,0 C30.7614237,-5.07265313e-16 33,2.23857625 33,5 L33,11 C33,13.7614237 30.7614237,16 28,16 L5,16 C2.23857625,16 3.38176876e-16,13.7614237 0,11 L0,5 C-3.38176876e-16,2.23857625 2.23857625,5.07265313e-16 5,0 Z"
                id="矩形"
                fill="#DC3545"
              ></path>
              <path
                d="M6.388,12 L6.388,8.352 L10.18,8.352 L10.18,12 L11.536,12 L11.536,3.624 L10.18,3.624 L10.18,7.152 L6.388,7.152 L6.388,3.624 L5.032,3.624 L5.032,12 L6.388,12 Z M16.84,12.144 C17.384,12.144 17.878,12.05 18.322,11.862 C18.766,11.674 19.146,11.398 19.462,11.034 C19.778,10.67 20.022,10.218 20.194,9.678 C20.366,9.138 20.452,8.516 20.452,7.812 C20.452,7.108 20.366,6.486 20.194,5.946 C20.022,5.406 19.778,4.954 19.462,4.59 C19.146,4.226 18.766,3.95 18.322,3.762 C17.878,3.574 17.384,3.48 16.84,3.48 C16.296,3.48 15.802,3.574 15.358,3.762 C14.914,3.95 14.534,4.226 14.218,4.59 C13.902,4.954 13.658,5.406 13.486,5.946 C13.314,6.486 13.228,7.108 13.228,7.812 C13.228,8.516 13.314,9.138 13.486,9.678 C13.658,10.218 13.902,10.67 14.218,11.034 C14.534,11.398 14.914,11.674 15.358,11.862 C15.802,12.05 16.296,12.144 16.84,12.144 Z M16.84,10.932 C16.512,10.932 16.216,10.876 15.952,10.764 C15.688,10.652 15.462,10.49 15.274,10.278 C15.086,10.066 14.94,9.808 14.836,9.504 C14.732,9.2 14.68,8.856 14.68,8.472 L14.68,8.472 L14.68,7.152 C14.68,6.768 14.732,6.424 14.836,6.12 C14.94,5.816 15.086,5.558 15.274,5.346 C15.462,5.134 15.688,4.972 15.952,4.86 C16.216,4.748 16.512,4.692 16.84,4.692 C17.16,4.692 17.454,4.748 17.722,4.86 C17.99,4.972 18.218,5.134 18.406,5.346 C18.594,5.558 18.74,5.816 18.844,6.12 C18.948,6.424 19,6.768 19,7.152 L19,7.152 L19,8.472 C19,8.856 18.948,9.2 18.844,9.504 C18.74,9.808 18.594,10.066 18.406,10.278 C18.218,10.49 17.99,10.652 17.722,10.764 C17.454,10.876 17.16,10.932 16.84,10.932 Z M25.252,12 L25.252,4.824 L27.748,4.824 L27.748,3.624 L21.4,3.624 L21.4,4.824 L23.896,4.824 L23.896,12 L25.252,12 Z"
                id="HOT"
                fill="#FFFFFF"
                fill-rule="nonzero"
              ></path>
            </svg>
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
          <nuxt-link to="/IIO" :class="routeObj.name === 'iiO' ? 'active' : ''">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-iio"></use>
            </svg>
            {{ $t("Header.IIO") }}
          </nuxt-link>
        </li>
        <li class="menu_item">
          <nuxt-link to="/NFT" :class="routeObj.name === 'nft' ? 'active' : ''">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-nft"></use>
            </svg>
            {{ $t("Header.NFT") }}
            <svg
              width="33px"
              height="16px"
              class="new"
              v-if="routeObj.name === 'nft'"
            >
              <path
                d="M5,0 L28,0 C30.7614237,-5.07265313e-16 33,2.23857625 33,5 L33,11 C33,13.7614237 30.7614237,16 28,16 L5,16 C2.23857625,16 3.38176876e-16,13.7614237 0,11 L0,5 C-3.38176876e-16,2.23857625 2.23857625,5.07265313e-16 5,0 Z"
                id="矩形"
                fill="#FD9743"
              ></path>
              <path
                d="M6.328,12 L6.328,5.592 L6.364,5.592 L7.288,7.368 L10.024,12 L11.536,12 L11.536,3.624 L10.24,3.624 L10.24,10.032 L10.204,10.032 L9.28,8.256 L6.544,3.624 L5.032,3.624 L5.032,12 L6.328,12 Z M18.964,12 L18.964,10.8 L14.956,10.8 L14.956,8.352 L18.592,8.352 L18.592,7.152 L14.956,7.152 L14.956,4.824 L18.964,4.824 L18.964,3.624 L13.6,3.624 L13.6,12 L18.964,12 Z M23.476,12 L24.568,7.668 L25.204,5.124 L25.228,5.124 L25.852,7.668 L26.92,12 L28.444,12 L30.508,3.624 L29.176,3.624 L28.3,7.656 L27.688,10.428 L27.652,10.428 L26.992,7.656 L26.008,3.624 L24.496,3.624 L23.5,7.656 L22.828,10.44 L22.792,10.44 L22.204,7.656 L21.352,3.624 L19.972,3.624 L21.952,12 L23.476,12 Z"
                id="NEW"
                fill="#FFFFFF"
                fill-rule="nonzero"
              ></path>
            </svg>
            <svg width="33px" height="16px" class="new" v-else>
              <path
                d="M5,0 L28,0 C30.7614237,-5.07265313e-16 33,2.23857625 33,5 L33,11 C33,13.7614237 30.7614237,16 28,16 L5,16 C2.23857625,16 3.38176876e-16,13.7614237 0,11 L0,5 C-3.38176876e-16,2.23857625 2.23857625,5.07265313e-16 5,0 Z"
                id="矩形"
                fill="#DC3545"
              ></path>
              <path
                d="M6.328,12 L6.328,5.592 L6.364,5.592 L7.288,7.368 L10.024,12 L11.536,12 L11.536,3.624 L10.24,3.624 L10.24,10.032 L10.204,10.032 L9.28,8.256 L6.544,3.624 L5.032,3.624 L5.032,12 L6.328,12 Z M18.964,12 L18.964,10.8 L14.956,10.8 L14.956,8.352 L18.592,8.352 L18.592,7.152 L14.956,7.152 L14.956,4.824 L18.964,4.824 L18.964,3.624 L13.6,3.624 L13.6,12 L18.964,12 Z M23.476,12 L24.568,7.668 L25.204,5.124 L25.228,5.124 L25.852,7.668 L26.92,12 L28.444,12 L30.508,3.624 L29.176,3.624 L28.3,7.656 L27.688,10.428 L27.652,10.428 L26.992,7.656 L26.008,3.624 L24.496,3.624 L23.5,7.656 L22.828,10.44 L22.792,10.44 L22.204,7.656 L21.352,3.624 L19.972,3.624 L21.952,12 L23.476,12 Z"
                id="NEW"
                fill="#FFFFFF"
                fill-rule="nonzero"
              ></path>
            </svg>
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
        .new,
        .hot {
          position: absolute;
          right: 20px;
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
    .logo_wrap {
      display: flex;
      transform: translateX(-10px);
      a {
        margin-right: 8px;
        height: 30px;
        padding: 0 8px;
        background: #f8f9fa;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          background: rgba(23, 23, 58, 0.3);
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
      border-bottom: 1px solid #e8e8eb;
      a {
        margin-right: 20px;
        &:last-of-type {
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
        .new,
        .hot {
          position: absolute;
          right: 20px;
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
    .logo_wrap {
      display: flex;
      margin-bottom: 10px;
      transform: translateX(-10px);
      margin-bottom: 20px;
      a {
        margin-right: 8px;
        height: 30px;
        padding: 0 8px;
        background: #f8f9fa;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          background: rgba(23, 23, 58, 0.3);
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
        &:last-of-type {
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
