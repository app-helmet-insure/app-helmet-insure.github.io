<template>
  <div class="governance_list">
    <div class="governance_list_wrap">
      <div class="governance_list_item_wrap">
        <div
          class="governance_list_item"
          v-for="Item in FixGovernanceList"
          :key="Item.Title"
        >
          <div :class="['status_img', Item.StatusImg]">
            {{ Item.StatusText }}
          </div>
          <div class="governance_list_item_title_web WEB title">
            <h3>{{ $t(Item.Title) }}</h3>
            <div class="governance_list_item_time_web WEB time">
              <span>Countdown:</span>
              <p v-html="Item.ShowTime"></p>
            </div>
          </div>
          <div class="governance_list_item_perhaps_web WEB perhaps">
            <p>{{ $t(Item.Perhaps) }}</p>
            <button @click="handleClickToDetails(Item)">
              {{ $t("Governance.Governance_text11") }}
            </button>
          </div>
          <div class="governance_list_item_top_h5 H5">
            <div :class="['status_img', Item.StatusImg]">
              {{ Item.StatusText }}
            </div>
            <div class="governance_list_item_time_h5 H5 time">
              <span>Countdown:</span>
              <p v-html="Item.ShowTime"></p>
            </div>
          </div>
          <div class="governance_list_item_title_h5 H5 title">
            <h3>{{ $t(Item.Title) }}</h3>
          </div>
          <div class="governance_list_item_perhaps_h5 H5 perhaps">
            <p>{{ $t(Item.Perhaps) }}</p>
            <button @click="handleClickToDetails(Item)">
              {{ $t("Governance.Governance_text11") }}
            </button>
          </div>
        </div>
        <div class="governance_list_item_duck"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { GovernanceList, formatGovernance } from "~/config/governance.js";
export default {
  data() {
    return {
      FixGovernanceList: [],
    };
  },
  mounted() {
    this.FixGovernanceList = formatGovernance(GovernanceList);
  },
  methods: {
    handleClickToDetails(Data) {
      this.$router.push({
        path: `governance/detail?id=${Data.Router}`,
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~assets/css/themes.scss";
.governance_list {
  margin-top: 28px;
}
.governance_list_item_wrap {
  background: #fff3de;
}
.governance_list_item {
  margin-top: 10px;
  width: 100%;
  @include themeify {
    // background: themed("color-ffffff");
    background: #fff3de;
  }
  box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
  border-radius: 5px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}
.status_img {
  width: 90px;
  height: 36px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 20px;
  top: 0;
  padding-top: 4px;
}
.unopen {
  background-image: url("~/assets/img/governance/unopen.png");
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  @include themeify {
    color: #ffe8d5;
  }
  line-height: 20px;
}
.ongoing {
  background-image: url("~/assets/img/governance/ongoing.png");
  font-size: 14px;
  font-family: IBMPlexSans-Bold, IBMPlexSans;
  font-weight: bold;
  @include themeify {
    color: #fce5ff;
  }
  line-height: 20px;
}
.finish {
  background-image: url("~/assets/img/governance/finish.png");
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #fff;
  line-height: 20px;
}
.time {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 161px;
  min-height: 32px;
  border-radius: 0px 5px 0px 0px;
  padding: 0 10px;
  background-image: url("../../assets/img/governance/time_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  span {
    font-size: 14px;
    font-family: IBMPlexSans-Bold, IBMPlexSans;
    font-weight: bold;
    @include themeify {
      color: #17173a;
    }
    line-height: 18px;
  }
  p {
    font-size: 14px;
    font-family: IBMPlexSans-Bold, IBMPlexSans;
    font-weight: bold;
    @include themeify {
      color: #17173a;
    }
    line-height: 18px;
  }
}
.title {
  > h3 {
    font-size: 16px;
    font-family: IBMPlexSans-Bold, IBMPlexSans;
    font-weight: bold;
    @include themeify {
      color: #17173a;
    }
    line-height: 16px;
  }
}
.perhaps {
  > p {
    font-size: 14px;
    font-family: IBMPlexSans;
    @include themeify {
      color: #17173a;
    }
    opacity: 0.7;
    line-height: 22px;
  }
  > button {
    width: 97px;
    height: 40px;
    border-radius: 5px;
    background-image: url("../../assets/img/governance/vote_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 18px;
  }
}
@media screen and(min-width:750px) {
  .H5 {
    display: none;
  }
  .governance_list {
    min-width: 1026px;
  }
  .governance_list_item {
  }
  .governance_list_item_time_web {
  }
  .governance_list_item_title_web {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 25px;
    > h3 {
    }
  }
  .governance_list_item_perhaps_web {
    display: flex;
    align-items: center;
    margin-top: 20px;
    > p {
      flex: 1;
      text-indent: 2em;
    }
    > button {
      margin-left: 200px;
      margin-top: 0;
    }
  }
  .governance_list_item_duck {
    width: 100%;
    height: 200px;
    background-image: url("../../assets/img/governance/duck_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
@media screen and(max-width:750px) {
  .WEB {
    display: none;
  }
  .governance_list {
    width: 95%;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .governance_list_item_time_h5 {
    position: absolute;
    right: 0;
    top: 0;
  }
  .governance_list_item_top_h5 {
    display: flex;
    justify-content: space-between;
  }
  .governance_list_item_title_h5 {
    margin-top: 35px;
  }
  .governance_list_item_perhaps_h5 {
    margin-top: 20px;
    text-indent: 2em;
    > button {
      margin: 24px auto 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .governance_list_item_duck {
    width: 100%;
    height: 110px;
    background-image: url("../../assets/img/governance/duck_bg_h5.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>
