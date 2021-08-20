<template>
  <div class="helmet_more">
    <h3>READ MORE ABOUT ME</h3>
    <div class="card_wrap">
      <a
        :class="`card_item card_item_${item.index}`"
        v-for="item in HelmetMoreCardInfo"
        :key="item.cardname"
        :href="item.link"
        target="_blank"
      >
        <div class="card_item_wrap">
          <h3>{{ item.cardname }}</h3>
          <p class="cardinfo" v-for="info in item.cardinfo" :key="info">
            {{ info }}
          </p>
        </div>
        <div class="card_item_mask"></div>
      </a>
    </div>
  </div>
</template>

<script>
import { HelmetMoreCardInfo } from "../../config/home.js";
export default {
  data() {
    return {
      HelmetMoreCardInfo,
    };
  },
};
</script>

<style lang='scss' scoped>
.helmet_more {
  h3 {
    text-align: center;
    font-family: Erbaum-Medium, Erbaum;
    font-weight: 500;
    color: #ffffff;
  }
  .card_wrap {
    position: relative;
    .card_item {
      overflow: hidden;
      position: absolute;
      cursor: pointer;
      &:hover {
        .card_item_wrap {
          border-image: linear-gradient(#ff3564, #da6a15, #000000) 1 1 1 !important;
        }
      }
    }
    .card_item_1 {
      background: linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
    }
    .card_item_2 {
      background: linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
    }
    .card_item_3 {
      background: linear-gradient(360deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
    }
    .card_item_wrap {
      width: 100%;
      height: 100%;
      border: 0.5px solid;
      border-image: linear-gradient(#786322, #000000) 1 1;
      padding: 25px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 10px;
      border-image-slice: 10%;

      h3 {
        font-family: Erbaum-Black, Erbaum;
        font-weight: 900;
        color: #c5c5c5;
        text-align: left;
      }
      p {
        font-family: Erbaum-Book, Erbaum;
        font-weight: normal;
        color: #9098a2;
      }
    }
    .card_item_mask {
      position: absolute;
      background: linear-gradient(360deg, #000000 10%, rgba(0, 0, 0, 0) 100%);
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}
@media screen and(min-width:750px) {
  .helmet_more {
    margin-top: 160px;
    h3 {
      font-size: 36px;
      line-height: 51px;
    }
    .card_wrap {
      width: 938px;
      height: 637px;
      display: flex;
      align-items: flex-end;
      margin: 50px auto 0px;
      justify-content: center;
      .card_item_wrap {
        h3 {
          font-size: 24px;
          line-height: 35px;
        }
        p {
          &:nth-of-type(1) {
            margin-top: 20px;
          }
          font-size: 16px;
          line-height: 26px;
        }
      }
      .card_item_1 {
        width: 420px;
        height: 410px;
        transform: rotate(-15deg);
        z-index: 1;
        left: 35px;
        bottom: 160px;
      }
      .card_item_2 {
        width: 420px;
        height: 410px;
        transform: rotate(-7deg);
        z-index: 3;
      }
      .card_item_3 {
        width: 385px;
        height: 380px;
        transform: rotate(15deg);
        z-index: 2;
        right: 100px;
        bottom: 145px;
      }
    }
  }
}
@media screen and(max-width:750px) {
  .helmet_more {
    margin-top: 100px;
    height: 700px;
    h3 {
      font-size: 24px;
      line-height: 34px;
    }
    .card_wrap {
      width: 94%;
      margin: 40px auto 0;
      .card_item_wrap {
        h3 {
          font-size: 16px;
          line-height: 24px;
        }
        p {
          &:nth-of-type(1) {
            margin-top: 15px;
          }
          font-size: 12px;
          line-height: 16px;
        }
      }
      .card_item_1 {
        width: 285px;
        height: 278px;
        left: 0;
        z-index: 1;
      }
      .card_item_2 {
        width: 285px;
        height: 271px;
        z-index: 3;
        left: 0;
        margin-top: 345px;
      }
      .card_item_3 {
        width: 285px;
        height: 246px;
        right: 0;
        margin-top: 188px;
        z-index: 2;
      }
    }
  }
}
</style>