<template>
  <div class="migration_dialog" v-if="flag">
    <div class="migration_dialog_wrap">
      <h3>{{ $t("Migration.Notice") }}</h3>
      <div>{{ $t("Migration.Jump", { number: count }) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      count: 5,
    };
  },
  mounted() {
    this.$bus.$on("GUARD_DIALOG", (flag) => {
      this.flag = flag;
      if (flag) {
        let timer1 = setInterval(() => {
          this.count--;
        }, 1000);
        let timer = setTimeout(() => {
          window.location.href =
            "https://www.guard.insure/insurance?action=claim";
          clearInterval(timer1);
          clearTimeout(timer);
        }, 5000);
      }
    });
  },
};
</script>

<style lang='scss' scoped>
.migration_dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.5);
}
@media screen and(min-width: 750px) {
  .migration_dialog_wrap {
    width: 400px;
    height: 200px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    > div {
      padding: 0 40px;
      text-align: center;
      margin-top: 40px;
      font-weight: 600;
    }
  }
}
@media screen and(min-width: 750px) {
  .migration_dialog_wrap {
    width: 95%;
    height: 200px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    > div {
      padding: 0 40px;
      text-align: center;
      margin-top: 40px;
      font-weight: 600;
    }
  }
}
</style>