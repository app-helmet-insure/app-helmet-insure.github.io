<template>
  <div class="burn_helmet">
    <div class="burn_helmet_wrap">
      <div class="downTime">
        <span>
          {{ number }}″
        </span>
      </div>
      <div class="transfrom">
        <div class="transfrom_wrap">
          <div class="burn_helmet_img"></div>
        </div>
        <div class="black_hole">
          <div class="black_hole_wrap">
            <div class="hole_top"></div>
            <div class="hole_bot"></div>
          </div>
        </div>
      </div>
      <div class="descirtion">
        <span class="desc">1HELMET BURNT</span>
        <i>/</i>
        <span class="number">16</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 16,
    };
  },
  mounted() {
    this.downTime();
  },
  watch: {
    number(value) {
      if (value == 0) {
        this.number = 16;
      }
    },
  },
  methods: {
    downTime() {
      clearInterval(timer);
      let timer = setInterval(() => {
        this.number--;
      }, 1000);
    },
  },
};
</script>

<style lang='scss'>
.burn_helmet {
  width: 100%;
  height: 60px;
  background-color: #000;
  border-radius: 30px;
  background-image: url("../../assets/img/helmet/burn_helmet.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 13px;
}
.burn_helmet_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.downTime {
  display: flex;
  align-items: center;
  margin-right: 23px;
  font-size: 24px;
  font-family: IBMPlexSans-SemiBold, IBMPlexSans;
  font-weight: 600;
  color: #ffffff;
  line-height: 24px;
  width: 50px;
  span{
    display: block;
    width: 100%;
    text-align: center;
  }
}
.transfrom {
  width: 50px;
  height: 100%;
  position: relative;
  margin-right: 23px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &_wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
  .burn_helmet_img {
    width: 32px;
    height: 68px;
    background-image: url("../../assets/img/helmet/burnhelmet.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    animation: burnHelmet 16s 0s linear infinite;
  }
  .black_hole {
    width: 50px;
    height: 14px;
    background: #000;
    overflow: hidden;
    position: static;
    &_wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 1px;
    }
  }
  .hole_top {
    flex: 1;
    border-radius: 50% 50% 0 0;
    background: #363636;
  }
  .hole_bot {
    flex: 1;
    border-radius: 0 0 50% 50%;
    background: #363636;
    position: static;
    z-index: 1;
  }
}
@keyframes burnHelmet {
  0% {
    top: -16px;
  }
  94% {
    top: -16px;
  }
  100% {
    top: 18px;
  }
}

.descirtion {
  .desc {
    font-size: 20px;
    font-family: IBMPlexSans-SemiBold, IBMPlexSans;
    font-weight: 600;
    color: #ffffff;
    line-height: 25px;
    background: linear-gradient(180deg, #ffffff 0%, #ffd08d 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  > i {
    font-size: 26px;
    color: #ffffff;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
  }
  .number {
    font-size: 24px;
    font-family: IBMPlexSans-SemiBold, IBMPlexSans;
    font-weight: 600;
    color: #ffffff;
    line-height: 24px;
  }
}
</style>