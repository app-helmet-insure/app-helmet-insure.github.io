<template>
  <div class="mask">
    <div class="airdrop">
      <p><span>AirDrop</span><i></i></p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
@media screen and (min-width: 750px) {
  .airdrop {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    height: 286px;
    background: #ffffff;
    border-radius: 8px;
    padding: 30px 20px;
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 16px;
        font-family: IBMPlexSans-Bold, IBMPlexSans;
        font-weight: bold;
        color: #17173a;
        line-height: 20px;
      }
      i {
        display: block;
        width: 24px;
        height: 24px;
        background-image: url("../../assets/img/icon/guanbi.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .airdrop {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 286px;
    background: #ffffff;
    border-radius: 8px;
  }
}
</style>