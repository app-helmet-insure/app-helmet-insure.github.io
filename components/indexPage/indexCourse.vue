<template>
  <div class="helmet_course">
    <h3>Roadmap</h3>
    <div class="helmet_course_q">
      <div class="helmet_course_q_l">
        <div
          v-for="(item, index) in LeftCourseInfo"
          :key="item.quarter"
          :style="`margin-top:${item.margintop}px;`"
          :class="`quarter quarter_${item.direction} ${LeftClassName[index]}`"
        >
          <div :class="`start_line start_line_${item.direction}`">
            <span>{{ item.quarter }}</span>
            <p></p>
            <i></i>
          </div>
          <p
            :class="`quarter_info quarter_info_${item.direction}`"
            v-for="info in item.infomation"
            :key="info"
          >
            <i v-if="item.finish"></i>{{ info }}
          </p>
        </div>
      </div>
      <div class="quarter_line"></div>
      <div class="helmet_course_q_r">
        <div
          v-for="(item, index) in RightCourseInfo"
          :key="item.quarter"
          :style="`margin-top:${item.margintop}px`"
          :class="`quarter quarter_${item.direction} ${RightClassName[index]}`"
        >
          <div :class="`start_line start_line_${item.direction}`">
            <span>{{ item.quarter }}</span>
            <p></p>
            <i></i>
          </div>
          <p
            :class="`quarter_info quarter_info_${item.direction}`"
            v-for="info in item.infomation"
            :key="info"
          >
            <i v-if="item.finish"></i>{{ info }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HelmetCourseInfo } from "../../config/home.js";
export default {
  props: ["LeftClassName", "RightClassName"],
  data() {
    return {};
  },
  computed: {
    LeftCourseInfo() {
      return HelmetCourseInfo.filter((item) => item.direction === "left");
    },
    RightCourseInfo() {
      return HelmetCourseInfo.filter((item) => item.direction === "right");
    },
  },
};
</script>

<style lang='scss' scoped>
.helmet_course {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 160px;
  > h3 {
    font-size: 36px;
    font-family: Erbaum-Medium, Erbaum;
    font-weight: 500;
    color: #ffffff;
    line-height: 51px;
  }
  &_q {
    &_l {
      width: 540px;
      visibility: hidden;
    }
    &_r {
      width: 540px;
      visibility: hidden;
    }
    margin-top: 25px;
    display: flex;
    justify-content: center;
    .quarter_left {
      transform: translateX(8px);
    }
    .quarter_right {
      transform: translateX(-8px);
    }
    .quarter_line {
      width: 1px;
      height: 1588px;
      background: #27282a;
      flex-shrink: 0;
    }
    .start_line {
      display: flex;
      align-items: center;
      width: 540px;
      flex-shrink: 0;
      > span {
        font-size: 24px;
        font-family: Erbaum-Book, Erbaum;
        font-weight: normal;
        line-height: 24px;
        color: transparent;
        background-image: linear-gradient(148deg, #ff0099 0%, #ff9600 100%);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
      }
      > p {
        flex: 1;
        height: 1px;
        background: #786322;
      }
      i {
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #000000;
        border: 1px solid #f0b90b;
      }
    }
    .start_line_left {
      p {
        margin-left: 4px;
      }
    }
    .start_line_right {
      flex-direction: row-reverse;
      p {
        margin-right: 4px;
      }
    }
    .quarter_info {
      width: 100%;
      display: flex;
      margin-top: 4px;
      font-size: 16px;
      font-family: Erbaum-Book, Erbaum;
      font-weight: normal;
      color: #9098a2;
      line-height: 24px;
      margin-top: 20px;
      i {
        display: inline-block;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        background-image: url("../../assets/img/home/finish.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-right: 4px;
      }
      &:nth-of-type(1) {
        margin-top: 40px;
      }
    }
    .quarter_info_left {
      padding-right: 40px;
    }
    .quarter_info_right {
      padding-left: 40px;
    }
  }
}
.show_info {
  visibility: visible !important;
}
</style>