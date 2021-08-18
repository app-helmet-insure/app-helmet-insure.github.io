<template>
  <div class="helmet_home">
    <div class="helmet_logo">
      <a></a>
    </div>
    <IndexView />
    <IndexCity />
    <div class="helmet_info">
      <IndexCourse />
      <IndexMore />
      <h3>Strategic partners</h3>
    </div>
    <IndexPartner />
    <IndexMedia />
  </div>
</template>
<script>
import IndexView from "~/components/indexPage/indexView.vue";
import IndexCity from "~/components/indexPage/indexCity.vue";
import IndexCourse from "~/components/indexPage/indexCourse.vue";
import IndexMore from "~/components/indexPage/indexMore.vue";
import IndexPartner from "~/components/indexPage/indexPartner.vue";
import IndexMedia from "~/components/indexPage/indexMedia.vue";
import "~/assets/svg/iconfont.js";
export default {
  layout: "page",
  components: {
    IndexView,
    IndexCity,
    IndexCourse,
    IndexMore,
    IndexPartner,
    IndexMedia,
  },
  data() {
    return {
    };
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
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.helmet_home {
  min-width: 1280px;
  margin: 0 auto;
}
.helmet_logo {
  max-width: 1600px;
  margin: 0 auto;
  padding-top: 50px;
  a {
    display: block;
    width: 243px;
    height: 70px;
    background-image: url("../../assets/img/home/index_logo.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
.helmet_info {
  padding-top: 330px;
  height: 3100px;
  background-image: url("../../assets/img/home/roadmap_bg1_web.png"),
    url("../../assets/img/home/roadmap_bg2_web.png");
  background-position: top center, bottom center;
  background-size: 1920px 1023px, 1920px 1920px;
  background-repeat: no-repeat, no-repeat;
  background-color: #000;
  > h3 {
    font-size: 36px;
    font-family: Erbaum-Medium, Erbaum;
    font-weight: 500;
    color: #ffffff;
    line-height: 51px;
    text-align: center;
    margin-top: 160px;
  }
}
</style>
