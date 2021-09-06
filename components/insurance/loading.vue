<template>
  <div class="insurance_loading">
    <div class="loading" v-if="isLoading">
      <img src="~/assets/img/loading.png" />
      <div class="shadow"></div>
      <p>{{ $t("Table.LoadingWallet") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isLoading"],
};
</script>

<style lang='scss' scoped>
.insurance_loading {
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>