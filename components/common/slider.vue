<template>
  <div class="slider">
    <a href="https://helmet.insure" class="logo"></a>
    <ul class="menu">
      <li class="menu_group menu_item">
        <nuxt-link
          to="/"
          :class="
            routeObj.name === 'index'
              ? 'active'
              : routeObj.name == 'myPolicy' ||
                routeObj.name == 'mySupply' ||
                routeObj.name == 'myClaim'
              ? 'active_child_one'
              : ''
          "
        >
          <svg class="icon svg-icon" aria-hidden="true">
            <use xlink:href="#icon-insurance"></use>
          </svg>
          {{ $t("Table.safe") }}
          <svg class="icon svg-icon right" aria-hidden="true">
            <use xlink:href="#icon-right"></use>
          </svg>
        </nuxt-link>
        <ul
          class="child_menu"
          v-if="
            routeObj.name == 'index' ||
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
</template>

<script>
import Langauage from "~/components/common/langauage.vue";
export default {
  components: { Langauage },

  computed: {
    routeObj() {
      console.log(this.$route);
      return this.$route;
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 750px) {
  .icon {
    width: 24px;
    height: 24px;
  }
  .slider {
    width: 260px;
    height: calc(100vh - 50px);
    background-image: url("../../assets/img/slider/slider_logo_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 135px;
    padding: 30px 20px 0;
    display: flex;
    flex-direction: column;
  }
  .logo {
    display: block;
    width: 150px;
    height: 40px;
    background-image: url("../../assets/img/slider/slider_logo.png");
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
    .right {
      position: absolute;
      right: 20px;
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
        > .icon {
          width: 24px;
          height: 24px;
          margin-right: 16px;
          display: block;
          fill: opacify($color: #17173a, $amount: 0.7);
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
            padding-left: 40px;
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-family: HelveticaNeue;
            color: rgba(23, 23, 58, 0.8);
            line-height: 40px;
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
        fill: #fff;
      }
      .right {
        transform: rotate(90deg);
      }
    }
    .active_child_one {
      color: #fd7e14;
      .icon {
        fill: #fd7e14;
      }
      .right {
        transform: rotate(90deg);
        fill: #fd7e14 !important;
      }
    }
  }
  .footer {
    height: 128px;
    padding: 0 20px;
    .footer_top {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      border-bottom: 1px solid #e8e8eb;
      a {
        .icon {
          &:hover {
            fill: #ff9600;
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
</style>
