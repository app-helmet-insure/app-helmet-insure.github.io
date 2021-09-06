<template>
  <div class="noData">
    <div>
      <img
        :src="require(`~/assets/img/helmet/nodata_${storeThemes}.png`)"
        alt=""
      />
      <p>{{ $t("Table.NoData") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    storeThemes() {
      return this.$store.state.themes;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../../assets/css/base.scss";
.noData {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.noData div {
  width: 80px;
  margin: 0 auto;
}

.noData div img {
  width: 80px;
  height: 80px;
}

.noData div p {
  text-align: center;
  font-size: 12px;
  @include themeify {
    color: darken($color: themed("color-17173a"), $amount: 60%);
  }
}
</style>