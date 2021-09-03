<template>
  <div class="helmet_partner">
    <div class="helmet_partner_wrap">
      <div class="helmet_partner_bg"></div>
      <div class="helmet_partner_bg"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.helmet_partner {
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.helmet_partner_wrap {
  display: flex;
  align-items: center;
  height: 100%;
  animation: translatePartner 30s 0s linear infinite;
}
.helmet_partner_bg {
  height: 100%;
  background-repeat: no-repeat;
}
@keyframes translatePartner {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@media screen and (min-width: 750px) {
  .helmet_partner {
    width: 1080px;
    height: 286px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .helmet_partner_wrap {
    width: 4340px;
  }
  .helmet_partner_bg {
    width: 2170px;
    background-image: url("../../assets/img/home/partner.png");
    background-size: 100% 100%;
  }
}
@media screen and (max-width: 750px) {
  .helmet_partner {
    width: 100%;
    height: 133px;
    margin: 25px auto 0;
    overflow: hidden;
    position: relative;
  }
  .helmet_partner_wrap {
    width: 2020px;
  }
  .helmet_partner_bg {
    width: 1010px;
    background-image: url("../../assets/img/home/partner_h5.png");
    background-size: 100% 100%;
  }
}
</style>