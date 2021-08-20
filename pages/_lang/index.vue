<template>
  <div class="helmet_home">
    <div class="helmet_logo animate__animated animate__bounce">
      <a></a>
    </div>
    <IndexView />
    <IndexCity :ClassName="HelmetCityInfoClass" />
    <div class="helmet_info">
      <IndexCourse
        :LeftClassName="HelmetCourseLeftClass"
        :RightClassName="HelmetCourseRightClass"
      />
      <IndexMore />
      <h3>Strategic partners</h3>
    </div>
    <IndexPartner />
    <IndexInvested />
    <IndexMedia />
  </div>
</template>
<script>
import IndexView from "~/components/indexPage/indexView.vue";
import IndexCity from "~/components/indexPage/indexCity.vue";
import IndexCourse from "~/components/indexPage/indexCourse.vue";
import IndexMore from "~/components/indexPage/indexMore.vue";
import IndexPartner from "~/components/indexPage/indexPartner.vue";
import IndexInvested from "~/components/indexPage/indexInvested.vue";
import IndexMedia from "~/components/indexPage/indexMedia.vue";

export default {
  layout: "page",
  components: {
    IndexView,
    IndexCity,
    IndexCourse,
    IndexMore,
    IndexPartner,
    IndexInvested,
    IndexMedia,
  },
  data() {
    return {
      HelmetCityInfoClass: [],
      HelmetCourseLeftClass: [],
      HelmetCourseRightClass: [],
      Flag1: false,
      Flag2: false,
      Flag3: false,
      Flag4: false,
      Flag5: false,
      Flag6: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  methods: {
    scrollToTop() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 400 && !this.Flag1) {
        this.HelmetCityInfoClass = [
          "animate__zoomIn animate__animated show_info",
          "animate__zoomIn animate__animated show_info",
        ];
        this.Flag1 = true;
      }
      if (scrollTop >= 1500 && !this.Flag2) {
        this.HelmetCourseLeftClass = [
          "animate__bounceInLeft animate__animated show_info",
        ];
        this.Flag2 = true;
      }
      if (scrollTop >= 1700 && !this.Flag3) {
        this.HelmetCourseRightClass = [
          "animate__bounceInRight animate__animated show_info",
        ];
        this.Flag3 = true;
      }
      if (scrollTop >= 2000 && !this.Flag4) {
        this.HelmetCourseLeftClass = [
          "animate__bounceInLeft animate__animated show_info",
          "animate__bounceInLeft animate__animated show_info",
        ];
        this.Flag4 = true;
      }
      if (scrollTop >= 2300 && !this.Flag5) {
        this.HelmetCourseRightClass = [
          "animate__bounceInRight animate__animated show_info",
          "animate__bounceInRight animate__animated show_info",
        ];
        this.Flag5 = true;
      }
      if (scrollTop >= 2600 && !this.Flag6) {
        this.HelmetCourseLeftClass = [
          "animate__bounceInLeft animate__animated show_info",
          "animate__bounceInLeft animate__animated show_info",
          "animate__bounceInLeft animate__animated show_info",
        ];
        window.removeEventListener("scroll", this.scrollToTop);
        this.Flag6 = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/css/base.scss";
.helmet_home {
  margin: 0 auto;
}
.helmet_logo {
  margin: 0 auto;
  a {
    display: block;
    background-image: url("../../assets/img/home/index_logo.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
.helmet_info {
  > h3 {
    font-family: Erbaum-Medium, Erbaum;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
  }
}
@media screen and (min-width: 750px) {
  .helmet_home {
    min-width: 1280px;
  }
  .helmet_logo {
    max-width: 1600px;
    padding-top: 50px;
    a {
      width: 243px;
      height: 70px;
    }
  }
  .helmet_info {
    height: 3000px;
    background-image: url("../../assets/img/home/roadmap_bg1_web.png"),
      url("../../assets/img/home/roadmap_bg2_web.png");
    background-position: top center, bottom center;
    background-size: 1920px 1023px, 1920px 1920px;
    background-repeat: no-repeat, no-repeat;
    background-color: #000;
    > h3 {
      font-size: 36px;
      line-height: 51px;
    }
  }
}
@media screen and (max-width: 750px) {
  .helmet_home {
    width: 94%;
  }
  .helmet_logo {
    max-width: 1600px;
    padding-top: 15px;
    a {
      width: 122px;
      height: 35px;
    }
  }
  .helmet_info {
    background-image: url("../../assets/img/home/roadmap_bg1_h5.png"),
      url("../../assets/img/home/roadmap_bg2_h5.png");
    background-position: top center, center center;
    background-size: 100vw auto, 100vw auto;
    background-repeat: no-repeat, no-repeat;
    background-color: #000;
    > h3 {
      font-size: 24px;
      line-height: 34px;
      margin-top: 50px;
    }
  }
}
</style>
