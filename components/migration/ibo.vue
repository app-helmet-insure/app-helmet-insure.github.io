<template>
  <div class="migration_ibo">
    <h3 class="migration_ibo_title">Migrate to GUARD for IBO</h3>
    <div class="migration_ibo_countdown">
      <div>Countdown</div>
      <p>11</p>
      <span>:</span>
      <p>11</p>
      <span>:</span>
      <p>11</p>
    </div>
    <div class="migration_ibo_text">
      <span>Helmet</span>
      <span>0.00010000 </span>
    </div>
    <div class="migration_ibo_input">
      <input type="text" />
      <span>最大量</span>
    </div>
    <button class="b_button migration_ibo_button">Migrate</button>
    <p class="migration_ibo_tips">
      Tips: 此次跨链燃烧每个地址限量 2,000 Helmet, 跨链总额 100,000 Helmet,
      先到先得.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.migration_ibo {
  height: 307px;
  background: #f9f4ef;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.migration_ibo_title {
  font-size: 16px;
  font-family: IBMPlexSans-Bold, IBMPlexSans;
  font-weight: bold;
  color: #17173a;
  line-height: 20px;
}
.migration_ibo_countdown {
  font-size: 14px;
  font-family: IBMPlexSans;
  color: rgba(23, 23, 58, 0.7);
  line-height: 18px;
  display: flex;
  align-items: center;
  margin-top: 7px;
  >div{
    margin-right: 4px;
  }
  > p {
    width: 18px;
    height: 18px;
    background: #f2f0eb;
    border-radius: 3px;
    font-size: 12px;
    font-family: IBMPlexSans;
    color: #17173a;
    line-height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > span {
    margin: 0 2px;
    font-size: 12px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(23, 23, 58, 0.3);
    line-height: 12px;
  }
}
.migration_ibo_text {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  span {
    &:nth-of-type(1) {
      font-size: 14px;
      font-family: IBMPlexSans-Bold, IBMPlexSans;
      font-weight: bold;
      color: rgba(23, 23, 58, 0.7);
      line-height: 18px;
    }
    &:nth-of-type(2) {
      font-size: 14px;
      font-family: IBMPlexSans;
      color: #22292f;
      line-height: 18px;
    }
  }
}
.migration_ibo_input {
  margin-top: 5px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #979797;
  position: relative;
  display: flex;
  align-items: center;
  > input {
    width: 100%;
    height: 100%;
    background: transparent;
    padding-left: 15px;
  }
  > span {
    width: 52px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    border-radius: 5px;
    border: 1px solid #e8e8eb;
    font-size: 12px;
    font-family: IBMPlexSans-Medium, IBMPlexSans;
    font-weight: 500;
    color: #17173a;
    line-height: 12px;
    position: absolute;
    right: 8px;
    cursor: pointer;
    &:hover {
      color: #fd7e14;
      border: 1px solid #fd7e14;
    }
  }
}
.migration_ibo_button {
  border-radius: 5px;
}
.migration_ibo_tips {
  margin-top: 10px;
  height: 40px;
  font-size: 12px;
  font-family: IBMPlexSans;
  color: rgba(23, 23, 58, 0.6);
  line-height: 20px;
}
@media screen and (min-width: 750px) {
  .migration_ibo {
    width: 878px;
    background-image: url("../../assets/img/migration/migration_ibo_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 301px;
    background-position: center center;
    padding-top: 30px;
    margin: 30px auto 0;
  }
  .migration_ibo_text {
    width: 320px;
  }
  .migration_ibo_input {
    width: 320px;
  }
  .migration_ibo_button {
    width: 320px;
  }
  .migration_ibo_tips {
    width: 320px;
  }
}
@media screen and (max-width: 750px) {
  .migration_ibo {
    width: 95%;
    background-image: url("../../assets/img/migration/migration_ibo_bg.png");
    background-repeat: no-repeat;
    background-size: auto 301px;
    background-position: center center;
    margin: 30px auto 0;
    padding: 30px 10px 0;
  }
  .migration_ibo_text {
    width: 100%;
  }
  .migration_ibo_input {
    width: 100%;
  }
  .migration_ibo_button {
    width: 100%;
  }
  .migration_ibo_tips {
    width: 100%;
  }
}
</style>