<template>
  <div class="slider">
    <a href="" class="logo"></a>
    <ul class="menu">
      <li>
        <nuxt-link to="/" :class="routeObj.name === '/' ? 'active' : ''">
          首页
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/tradingView"
          :class="routeObj.name === '/tradingView' ? 'active' : ''"
        >
          保险
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/mining" :class="routeObj.name === '/' ? 'active' : ''">
          挖矿
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/flashmining"
          :class="routeObj.name === '/' ? 'active' : ''"
        >
          闪电挖矿
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/burnbox" :class="routeObj.name === '/' ? 'active' : ''">
          燃烧挖矿
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/IIO" :class="routeObj.name === '/' ? 'active' : ''">
          IIO
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/" :class="routeObj.name === '/' ? 'active' : ''">
          使用指南
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/" :class="routeObj.name === '/' ? 'active' : ''">
          博客
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    routeObj() {
      return this.$route;
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .slider {
    width: 260px;
    height: calc(100vh - 50px);
    background-image: url("../../assets/img/slider/slider_logo_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 135px;
    padding: 30px 20px 40px;
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
    li {
      width: 100%;
      height: 50px;
      font-size: 16px;
      font-family: HelveticaNeue-Medium, HelveticaNeue;
      font-weight: 600;
      a {
        color: rgba(23, 23, 58, 0.7);
      }
      line-height: 50px;
      cursor: pointer;
    }
  }
}
</style>