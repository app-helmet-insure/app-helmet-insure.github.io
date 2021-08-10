<template>
  <div class="burn_helmet">
    <div class="burn_helmet_wrap">
      <div class="transfrom">
        <div class="transfrom_wrap">
          <div class="helmet"></div>
          <div class="time_helmet"></div>
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
        <span class="number">{{ number }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 6,
    };
  },
  mounted() {
    this.downTime();
  },
  watch: {
    number(value) {
      if (value == 0) {
        this.number = 6;
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
  .helmet {
    width: 32px;
    height: 32px;
    background-image: url("../../assets/img/helmet/burncoin.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: -16px;
    animation: burnHelmet 6s 0s linear infinite;
  }
  .time_helmet {
    width: 32px;
    height: 32px;
    background-image: url("../../assets/img/helmet/burncoin.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: IBMPlexSans-Medium, IBMPlexSans;
    font-weight: 600;
    color: #000000;
    position: absolute;
    animation: timeHelmet 6s 0s linear infinite;
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
  50% {
    top: -16px;
  }
  100% {
    top: 22px;
  }
}
@keyframes timeHelmet {
  0% {
    bottom: 6px;
  }
  50% {
    bottom: -48px;
    display: none;
  }

  60% {
    top: -80px;
  }
  70% {
    top: -128px;
  }
  80% {
    top: -48px;
  }
  90% {
    top: -32px;
  }
  100% {
    top: -16px;
    display: block;
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