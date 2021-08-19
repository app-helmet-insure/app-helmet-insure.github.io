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
  width: 1080px;
  height: 286px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.helmet_partner_wrap {
  display: flex;
  align-items: center;
  height: 100%;
  width: 4340px;
  animation: translatePartner 30s 0s linear infinite;
}
.helmet_partner_bg {
  width: 2170px;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/home/partner.png");
  background-repeat: no-repeat;
  background-size: 2170px 100%;
}
@keyframes translatePartner {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>