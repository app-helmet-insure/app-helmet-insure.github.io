<template>
  <div class="migration_title">
    <h3>Migrate Helmet(BSC) to Guard(Polygon)</h3>
    <!-- <p>{{ $t("Migration.Tips7") }}</p> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
.migration_title {
  > h3 {
    text-align: center;
    font-size: 24px;
    font-family: IBMPlexSans-SemiBold, IBMPlexSans;
    font-weight: 600;
    @include themeify {
      color: themed("migration_color2");
    }
    line-height: 32px;
  }
  > p {
    background: rgba(255, 184, 1, 0.1);
    display: flex;
    margin: 0 auto;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #ffb801;
    line-height: 20px;
  }
}
@media screen and(min-width:750px) {
  .migration_title {
    h3 {
      margin: 30px auto;
    }
    > p {
      width: 878px;
      height: 30px;
      justify-content: center;
      padding-left: 10px;
    }
  }
}
@media screen and(max-width:750px) {
  .migration_title {
    h3 {
      margin: 0 auto;
      padding: 30px 0;
    }
    > p {
      width: 95%;
      padding: 5px 10px;
    }
  }
}
</style>