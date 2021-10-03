<template>
  <div class="governance_title">
    <div class="governance_title_wrap">
      <div class="governance_title_text">
        <h3>Governance 是Helmet DAO治理</h3>
        <p>你可以在投票参与DAO治理的同时享有HELMET奖励</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 
};
</script>

<style lang='scss' scoped>
@import "~/assets/css/themes.scss";
.governance_title {
  background: #b948ea;
  border-radius: 5px;
  &_wrap {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/img/flashmining/flashmining_titlebg.png");
    background-repeat: no-repeat;
    background-position: center center;
  }
  &_text {
    h3 {
      font-family: IBMPlexSans-SemiBold, IBMPlexSans;
      font-weight: 600;
      color: #fff;
    }
    p {
      font-family: IBMPlexSans;
      color: #fff;
      line-height: 20px;
    }
  }
}
@media screen and (min-width: 750px) {
  .governance_title {
    width: 100%;
    min-width: 1026px;
    height: 140px;
    margin: 30px auto 20px;
    &_wrap {
      margin: 0 auto;
      background-image: url("../../assets/img/flashmining/flashmining_titlebg.png");
      background-size: 1026px 100%;
    }
    &_text {
      h3 {
        font-size: 24px;
        line-height: 32px;
        padding: 40px 0 0 40px;
      }
      p {
        font-size: 16px;
        margin: 11px 0 0 40px;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .governance_title {
    width: 95%;
    height: 120px;
    margin: 0 auto;
    &_wrap {
      background-image: url("../../assets/img/flashmining/flashmining_titlebg_h5.png");
      background-size: 100% 100%;
    }
    &_text {
      width: 100%;
      height: 100%;
      h3 {
        width: 335px;
        font-size: 18px;
        padding: 15px 0 0 16px;
      }
      p {
        width: 329px;
        font-size: 12px;
        margin: 8px 0 0 16px;
      }
    }
  }
}
</style>