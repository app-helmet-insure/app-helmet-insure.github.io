<template>
  <div class="iio_banner">
    <div class="iio_wrap">
      <h3 class="iio_title">XXX 面向 LPT 持有者公开兑换池</h3>
      <div class="iio_address">
        0xdBa054fDb2A542E9128c91Ae62fE832177bf3536
        <i
          class="copy"
          id="copy_default"
          @click="
            copyAdress($event, '0x936909e72951A19a5e1d75A109B0D34f06f39838')
          "
        ></i>
      </div>
      <span class="ioo_tips">这是兑换池合约地址，请不要向合约地址直接转币</span>
      <div class="ioo_details">
        <p>
          <span>参与人数</span>
          <span>1000 人</span>
        </p>
        <i></i>
        <p>
          <span>总认筹金额</span>
          <span>100000 XXX</span>
        </p>
        <i></i>
        <p>
          <span>总质押金额</span>
          <span>121212 LPT</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
import Message from "~/components/common/Message";
export default {
  data() {
    return {};
  },
  methods: {
    copyAdress(e, text) {
      let _this = this;
      let copys = new ClipboardJS(".copy", { text: () => text });
      copys.on("success", function (e) {
        Message({
          message: "Successfully copied",
          type: "success",
          // duration: 0,
        });
        copys.destroy();
      });
      copys.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
        copys.destroy();
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@media screen and (min-width: 750px) {
  .iio_banner {
    width: 100%;
    height: 420px;
    background: url("../../assets/img/iio/iio_header_bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .iio_wrap {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .iio_title {
    width: 595px;
    font-size: 40px;
    font-weight: 600;
    color: #121212;
    text-align: center;
    padding-top: 80px;
  }
  .ioo_tips {
    margin-top: 20px;
    font-size: 14px;
    color: #787878;
  }
  .iio_address {
    width: 505px;
    display: flex;
    align-items: center;
    height: 36px;
    font-size: 18px;
    font-weight: 500;
    color: #ff9600;
    padding: 3px 30px;
    margin-top: 20px;
    background: rgba(255, 150, 0, 0.1);
    border-radius: 26px;
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url("../../assets/img/helmet/copy.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      margin-left: 4px;
    }
  }
  .ioo_details {
    display: flex;
    margin-top: 100px;
    p {
      width: 260px;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        &:nth-of-type(1) {
          font-size: 12px;
          font-weight: 400;
          color: #787878;
        }
        &:nth-of-type(2) {
          font-size: 18px;
          font-weight: bold;
          color: #121212;
          margin-top: 10px;
        }
      }
    }
    i {
      display: block;
      width: 1px;
      height: 54px;
      background: #cfcfd2;
    }
  }
}
@media screen and (max-width: 750px) {
  .iio_banner {
    width: 100%;
    background: url("../../assets/img/iio/iio_header_h5_bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .iio_wrap {
    width: 100%;
    padding: 40px 24px 30px;
    display: flex;
    flex-direction: column;
  }
  .iio_title {
    width: 211px;
    font-size: 24px;
    font-weight: 600;
    color: #121212;
    line-height: 33px;
  }
  .ioo_tips {
    font-size: 12px;
    color: #787878;
    text-align: center;
    margin-top: 12px;
  }
  .iio_address {
    width: 100%;
    display: flex;
    align-items: center;
    height: 36px;
    font-size: 12px;
    font-weight: 500;
    color: #ff9600;
    padding: 0px 14px;
    margin-top: 30px;
    background: rgba(255, 150, 0, 0.1);
    border-radius: 26px;
    i {
      display: block;
      width: 12px;
      height: 12px;
      background-image: url("../../assets/img/helmet/copy.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      margin-left: 4px;
    }
  }
  .ioo_details {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      &:first-child {
        align-items: flex-start;
      }
      &:last-child {
        align-items: flex-end;
      }
      span {
        &:nth-of-type(1) {
          font-size: 12px;
          color: #787878;
          line-height: 20px;
        }
        &:nth-of-type(2) {
          font-size: 14px;
          font-weight: bold;
          color: #121212;
          line-height: 20px;
        }
      }
    }
    i {
      display: block;
      width: 1px;
      height: 36px;
      background: #cfcfd2;
    }
  }
}
</style>