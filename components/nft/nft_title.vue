<template>
  <div class="nft_title">
    <div class="nft_name">奖池</div>
    <div class="nft_earn">
      <span
        v-for="(item, index) in '8,292,429'"
        :key="index"
        :class="isNaN(item) ? '' : 'radius'"
      >
        {{ item }}
      </span>
    </div>
    <div class="nft_time">
      <p><i></i><span> 距奖池兑换 </span> 12:00:00</p>
    </div>
  </div>
</template>

<script>
import "~/assets/font/font.css";
export default {};
</script>

<style lang='scss' scoped>
.nft_name {
  width: 329px;
  height: 84px;
  background-image: url("../../assets/img/nft/title_bg_web.png");
  background-size: 100% 100%;
  margin: 0 auto;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #fcf4bd;
  text-align: center;
  line-height: 24px;
  padding-top: 17px;
}
.nft_earn {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    font-family: FredokaOne-Regular;
    color: #ffffff;
    margin: 0 2.5px;
  }
  .radius {
    width: 55px;
    height: 55px;
    background-image: url("../../assets/img/nft/earn_bg_web.png");
    background-size: 100% 100%;
  }
}
.nft_time {
  display: flex;
  justify-content: center;
  margin-top: 26px;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    position: relative;
    padding: 0px 10px 0px 15px;
    background: linear-gradient(180deg, #4f3e5b 0%, #4d3e57 100%);
    border-radius: 100px;
    font-size: 14px;
    font-family: FredokaOne-Regular;
    color: #ffffff;
    line-height: 14px;
    letter-spacing: 1px;
    height: 20px;
    i {
      display: block;
      width: 28px;
      height: 29px;
      background-image: url("../../assets/img/nft/down_time.png");
      background-size: 100% 100%;
      position: absolute;
      left: 0;
      transform: translateX(-50%);
    }
    span {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 14px;
      margin-right: 2px;
    }
  }
}
</style>