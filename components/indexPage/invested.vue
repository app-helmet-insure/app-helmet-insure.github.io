<template>
  <div class="helmet_invested">
    <div class="invested"></div>
    <p class="introduction">
      Helmet.insure is invested by Binance in March 2021 to provide a more
      competitive option and insurance protocol for on-chain and cross-chain
      trading.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.invested {
  width: 473px;
  height: 90px;
  background-image: url("../../assets/img/home/invested.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
}
.introduction {
  font-family: Erbaum-Book, Erbaum;
  font-weight: normal;
  color: #9098a2;
  text-align: center;
  margin: 30px auto 0;
}
@media screen and (min-width: 750px) {
  .helmet_invested {
    margin-top: 170px;
  }
  .invested {
    width: 473px;
    height: 90px;
  }
  .introduction {
    font-size: 20px;
    line-height: 40px;
    width: 990px;
  }
}
@media screen and (max-width: 750px) {
  .helmet_invested {
    margin-top: 80px;
  }
  .invested {
    width: 237px;
    height: 45px;
  }
  .introduction {
    font-size: 14px;
    line-height: 24px;
  }
}
</style>