<template>
  <div class="helmet_media">
    <div class="helmet_media_wrap">
      <a
        class="helmet_media_item"
        href="https://twitter.com/Helmet_insure"
        target="_blank"
      >
        <svg width="20px" height="20px" class="icon" aria-hidden="true">
          <use xlink:href="#icon-twitter"></use>
        </svg>
      </a>
      <a
        class="helmet_media_item"
        href="https://twitter.com/Helmet_insure"
        target="_blank"
      >
        <svg width="20px" height="20px" class="icon" aria-hidden="true">
          <use xlink:href="#icon-telegram1"></use>
        </svg>
      </a>
      <a
        class="helmet_media_item"
        href="https://discord.com/invite/QtTJZEVds5"
        target="_blank"
      >
        <svg width="20px" height="20px" class="icon" aria-hidden="true">
          <use xlink:href="#icon-discord1"></use>
        </svg>
      </a>
      <a
        class="helmet_media_item"
        href="https://helmetinsure.medium.com/"
        target="_blank"
      >
        <svg width="20px" height="20px" class="icon" aria-hidden="true">
          <use xlink:href="#icon-medium2"></use>
        </svg>
      </a>
      <a
        class="helmet_media_item"
        href="https://github.com/app-helmet-insure"
        target="_blank"
      >
        <svg width="20px" height="20px" class="icon" aria-hidden="true">
          <use xlink:href="#icon-github"></use>
        </svg>
      </a>
    </div>
    <div class="powered">Powered by HELMET Core team</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang='scss' scoped>
.helmet_media {
  width: 100%;
  margin: 0 auto;
  height: 206px;
  border-top: 1px solid #212121;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.helmet_media_wrap {
  display: flex;
}
.helmet_media_item {
  width: 36px;
  height: 36px;
  background: rgba(87, 87, 87, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 12px;
  cursor: pointer;
  .icon {
    fill: #d8d8d8;
  }
  &:hover {
    .icon {
      fill: #fd7e14 !important;
    }
  }
}
.powered {
  font-size: 14px;
  font-family: Erbaum-Book, Erbaum;
  font-weight: normal;
  color: #787878;
  line-height: 20px;
  margin-top: 30px;
}
</style>