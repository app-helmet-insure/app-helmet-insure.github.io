<template>
  <div class="loading" v-if="isLoading">
    <img src="~/assets/img/loading.png" />
    <div class="shadow"></div>
    <p>{{ $t("Table.LoadingWallet") }}</p>
  </div>
</template>

<script>
export default {
  props: ["isLoading"],
};
</script>

<style>
</style>