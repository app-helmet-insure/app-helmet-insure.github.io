<template>
  <div class="guard_migrate">
    <div class="guard_migrate_wrap">
      <h3 class="guard_migrate_title">Migrate to Polygon</h3>
      <div class="guard_migrate_swap">
        <div class="guard_migrate_swap_from">
          <div class="header">
            <div class="logo">From <i class="binance"></i> BSC</div>
            <span>HELMET</span>
          </div>
        </div>
        <div class="guard_migrate_swap_to">
          <div class="header">
            <div class="logo">From <i class="polygon"></i> Polygon</div>
            <span>GUARD</span>
          </div>
        </div>
      </div>
      <div class="input_box">
        <input type="text" name="" id="" placeholder="输入划转数量" />
        <span class="max">最大量</span>
        <p>HELMET</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.guard_migrate {
  width: 100%;
  min-width: 1200px;
  height: 420px;
  background: #ffffff;
  box-shadow: 0px 4px 8px 0px rgba(236, 232, 232, 0.02);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &_wrap {
    width: 320px;
    h3 {
      font-size: 24px;
      font-family: IBMPlexSans-SemiBold, IBMPlexSans;
      font-weight: 600;
      color: #17173a;
      line-height: 32px;
      text-align: center;
    }
  }
  &_swap {
    margin-top: 20px;
    width: 100%;
    height: 240px;
    display: flex;
    flex-direction: column;
    border: 1px solid #e8e8eb;
    border-radius: 5px;
    &_from {
      flex: 1;
    }
    &_to {
      background: #f7f7fa;
      flex: 1;
    }
    .input_box {
      margin-top: 30px;
      width: 100%;
      height: 40px;
      border: 2px solid #e8e8e8;
      border-radius: 5px;
      display: flex;
      align-items: center;
      position: relative;
      input {
        width: 250px;
        height: 100%;
        padding-left: 12px;
        &::placeholder {
          color: rgba(23, 23, 58, 0.4);
        }
      }
      > span {
        position: absolute;
        display: block;
        font-size: 12px;
        padding: 6px 8px;
        height: 24px;
        background: #f8f9fa;
        border-radius: 5px;
        border: 1px solid #e8e8eb;
        color: #17173a;
        right: 81px;
        display: flex;
        align-items: center;
      }
      > p {
        height: 100%;
        flex: 1;
        border-left: 1px solid #e8e8e8;
      }
    }
  }
}
</style>