<template>
  <div class="iio_about" v-if="iioPage === 'iio-id'">
    <div class="iio_about_table">
      <table>
        <thead>
          <tr>
            <th>Project Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>Project Name</span>
              <span>{{ About.ProjcetInformation.ProjectName }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>i{{ About.Token }} Distributing</span>
              <span>{{ About.ProjcetInformation.Distributing }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>i{{ About.Token }} Activating</span>
              <span>{{ About.ProjcetInformation.Activating }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>i{{ About.Token }} Activate Period</span>
              <span>
                <i class="warn"></i>
                {{ About.ProjcetInformation.ActivatePeriod }}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Activating Price</span>
              <span>{{ About.ProjcetInformation.ActivatingxPrice }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Ticket Price</span>
              <span>{{ About.ProjcetInformation.TicketPrice }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>{{ About.Token }} Token Information</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>Token Name</span>
              <span>{{ About.TokenInformation.TokenName }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Address</span
              ><span>
                <section>{{ About.TokenInformation.Address }}</section>
                <i
                  class="copy"
                  id="copy_default"
                  @click="copyAdress($event, About.TokenInformation.Address)"
                ></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Initial Circulating Supply (Day of sale)</span
              ><span>{{ About.TokenInformation.Supply }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Total Supply</span
              ><span>{{ About.TokenInformation.TotalSupply }}</span>
            </td>
          </tr>
          <tr class="none">
            <td><span></span><span></span></td>
          </tr>
          <tr class="none">
            <td><span></span><span></span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="iio_about_dsc">
      <h3>About</h3>
      <p v-for="(item, index) in About.About" :key="index + 'About'">
        {{ item }}
      </p>
      <h3>Token Distribution</h3>
      <p
        v-for="(item, index) in About.TokenDistribution"
        :key="index + 'TokenDistribution'"
      >
        {{ item }}
      </p>
    </div>
    <div class="iio_about_media">
      <p>
        <svg width="24px" height="24px">
          <path
            d="M8.612,20.12 C5.868,21.61 3.499,21.919 2.19,20.61 C0.846,19.27 1.562,15.759 3.503,12.237 C4.48905504,10.4454692 5.70761023,8.79214804 7.127,7.32 C7.314,7.133 8.252,6.196 8.314,6.196 C8.314,6.196 7.814,6.509 7.752,6.509 C5.802,7.604 4.089,9.589 3.715,10.034 C4.69287207,5.67085866 8.72446377,2.68633962 13.183,3.025 C16.278,1.623 19.157,1.299 20.375,2.515 C21.5000106,3.638 21.437,5.51 20.5,7.757 C20.49,7.778 20.482,7.8 20.473,7.821 C21.149735,9.10988697 21.5022346,10.5442545 21.5000106,12 C21.5000106,12.38 21.477,12.753 21.431,13.12 L20.627,13.12 C20.5796875,13.121819 20.5323471,13.1228192 20.485,13.123 L8.689,13.123 L8.689,13.31 C8.751,15.307 10.501,17.054 12.626,17.054 C14.126,17.054 15.563,16.243 16.188,15.057 L20.968,15.057 C20.1040327,17.4500702 18.2678528,19.3658525 15.9135797,20.3305405 C13.5593066,21.2952284 10.9067742,21.2187429 8.612,20.12 L8.612,20.12 Z M8.005,19.799 C6.1640117,18.7352544 4.7574308,17.0559979 4.033,15.057 C2.872,17.339 2.573,19.247 3.564,20.237 C4.377,21.049 6.002,20.861 8.002,19.801 L8.005,19.799 Z M20.172,7.292 C20.1769743,7.28065534 20.1819743,7.26932198 20.187,7.258 C20.937,5.636 21,4.264 20.312,3.452 C19.443,2.584 17.772,2.702 15.79,3.62 C17.60974,4.33722436 19.1474731,5.625804 20.172,7.292 Z M16.563,10.752 L16.563,10.691 C16.438,8.631 14.813,7.071 12.813,7.071 C10.688,7.071 8.877,8.756 8.752,10.691 L8.752,10.753 L16.563,10.753 L16.563,10.752 Z"
            id="形状"
            fill="#17173A"
            fill-rule="nonzero"
          ></path>
        </svg>
        <span>Website: </span>
        <a :href="About.Media.Website.link" target="_blank">{{
          About.Media.Website.show
        }}</a>
      </p>
      <p>
        <svg width="24px" height="24px">
          <path
            d="M22.162,5.656 C21.398557,5.99369373 20.5889601,6.21547339 19.76,6.314 C20.6337508,5.79143332 21.2877055,4.96901423 21.6,4 C20.78,4.488 19.881,4.83 18.944,5.015 C17.6498495,3.63031951 15.5862776,3.28908903 13.9152663,4.18345292 C12.244255,5.07781681 11.3836288,6.98414575 11.818,8.829 C8.45502254,8.66044327 5.32174389,7.07199458 3.198,4.459 C2.82629012,5.09745032 2.63095514,5.82322672 2.632,6.562 C2.632,8.012 3.37,9.293 4.492,10.043 C3.82800881,10.0220962 3.1786324,9.84278055 2.598,9.52 L2.598,9.572 C2.59841319,11.5630358 4.00151442,13.2781232 5.953,13.673 C5.33661503,13.8400369 4.69030669,13.8646582 4.063,13.745 C4.61012698,15.4491831 6.18045142,16.6167778 7.97,16.65 C6.21794158,18.0260194 3.99074,18.6491034 1.779,18.382 C3.69069779,19.6114328 5.91609682,20.2641239 8.189,20.2620052 C15.882,20.2620052 20.089,13.889 20.089,8.362 C20.089,8.182 20.084,8 20.076,7.822 C20.8948641,7.23016766 21.6015987,6.49701939 22.163,5.657 L22.162,5.656 Z"
            id="路径"
            fill="#17173A"
            fill-rule="nonzero"
          ></path>
        </svg>
        <span>Twitter: </span>
        <a :href="About.Media.Twitter.link" target="_blank">{{
          About.Media.Twitter.show
        }}</a>
      </p>
      <p>
        <svg width="24px" height="24px">
          <path
            d="M12,22 C6.477,22 2,17.523 2,12 C2,6.477 6.477,2 12,2 C17.523,2 22,6.477 22,12 C22,17.523 17.523,22 12,22 Z M8.89,13.17 L8.903,13.163 L9.773,16.033 C9.885,16.344 10.039,16.4 10.226,16.374 C10.414,16.349 10.513,16.248 10.636,16.13 L11.824,14.982 L14.374,16.87 C14.84,17.127 15.175,16.994 15.291,16.438 L16.948,8.616 C17.131,7.888 16.811,7.596 16.246,7.828 L6.513,11.588 C5.849,11.854 5.853,12.226 6.393,12.391 L8.89,13.171 L8.89,13.17 Z"
            id="形状"
            fill="#17173A"
            fill-rule="nonzero"
          ></path>
        </svg>
        <span>Telegram (EN): </span>
        <a :href="About.Media.Telegram.link" target="_blank">{{
          About.Media.Telegram.show
        }}</a>
      </p>
      <p>
        <svg width="24px" height="24px">
          <path
            d="M4,3 L20,3 C20.5522847,3 21,3.44771525 21,4 L21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 Z M17.3,15.94 C17.2,15.89 17.15,15.74 17.15,15.639 L17.15,8.006 C17.15,7.906 17.2,7.756 17.3,7.655 L18.255,6.55 L18.255,6.5 L14.84,6.5 L12.28,12.978 L9.366,6.5 L5.852,6.5 L5.852,6.55 L6.755,7.806 C6.956,8.006 7.006,8.308 7.006,8.559 L7.006,14.082 C7.056,14.384 7.006,14.735 6.856,15.036 L5.5,16.894 L5.5,16.944 L9.116,16.944 L9.116,16.894 L7.76,15.087 C7.61,14.785 7.559,14.484 7.61,14.133 L7.61,9.11 C7.66,9.21 7.71,9.21 7.76,9.411 L11.174,17.044 L11.224,17.044 L14.54,8.76 C14.49,9.06 14.49,9.412 14.49,9.664 L14.49,15.589 C14.49,15.739 14.44,15.839 14.34,15.94 L13.335,16.894 L13.335,16.944 L18.256,16.944 L18.256,16.894 L17.302,15.94 L17.3,15.94 Z"
            id="形状"
            fill="#17173A"
            fill-rule="nonzero"
          ></path>
        </svg>
        <span>Medium: </span>
        <a :href="About.Media.Medium.link" target="_blank">{{
          About.Media.Medium.show
        }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import Information from "./Iio_information.js";
export default {
  data() {
    return {
      About: [],
    };
  },
  mounted() {
    let name = this.$route.params.id;
    this.About = Information[name];
  },
  computed: {
    iioType() {
      return this.$route.params.id;
    },
    iioPage() {
      return this.$route.name;
    },
  },
  watch: {
    iioType: {
      handler: "WatchIIOType",
      immediate: true,
    },
  },

  methods: {
    WatchIIOType(newValue, oldValue) {
      this.About = Information[newValue];
    },
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
  .iio_about {
    width: 1200px;
    margin: 0 auto 40px;
    background: #fff;
    padding: 40px 0;
    &_table {
      width: 960px;
      margin: 0 auto;
      border-spacing: 0;
      display: flex;
      border-collapse: collapse;
      table {
        width: 50%;
        border-collapse: collapse;
        tr {
          border: 1px solid #e8e8eb;
        }
        &:nth-of-type(2) {
          tr {
            border-left: 0;
          }
        }
        th {
          width: 50%;
          text-align: left;
          height: 64px;
          padding: 0 20px;
        }
        td {
          width: 50%;
          flex: 1;
          height: 50px;
          padding: 0 20px;
          span {
            &:nth-of-type(1) {
              float: left;
              font-size: 14px;
              font-family: IBMPlexSans;
              color: rgba(23, 23, 58, 0.6);
            }
            &:nth-of-type(2) {
              display: flex;
              align-items: center;
              i {
                margin-right: 4px;
                width: 20px;
                height: 20px;
                display: block;
              }
              .warn {
                background-image: url("../../assets/img/helmet/wran.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
              }
              > .copy {
                width: 16px;
                height: 20px;
                background-image: url("../../assets/img/icon/copy.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
              }
              float: right;
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #17173a;
            }
          }
        }
      }
    }
    &_dsc {
      width: 946px;
      margin: 0 auto;
      h3 {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #17173a;
        line-height: 22px;
        margin-top: 30px;
      }
      p {
        font-size: 14px;
        font-family: IBMPlexSans;
        color: #17173a;
        line-height: 22px;
        margin-top: 15px;
      }
    }
    &_media {
      width: 946px;
      display: flex;
      flex-wrap: wrap;
      margin: 20px auto 0;
      flex-shrink: 0;
      p {
        width: 50%;
        display: flex;
        align-items: center;
        margin-top: 24px;
        span {
          margin-left: 12px;
          font-size: 14px;
          font-family: IBMPlexSans;
          color: #17173a;
          line-height: 24px;
        }
        a {
          font-size: 14px;
          font-family: IBMPlexSans;
          color: #17173a;
          line-height: 24px;
          text-decoration: underline;
          margin-left: 4px;
          &:hover {
            color: rgba(23, 23, 58, 0.7);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .iio_about {
    width: 100%;
    background: #fff;
    padding: 40px 16px;
    &_table {
      width: 100%;
      margin: 0 auto;
      table {
        border: 1px solid #e8e8eb;
        border-collapse: collapse;
        border-radius: 5px;
        &:nth-of-type(2) {
          margin-top: 20px;
        }
        tr {
          border: 1px solid #e8e8eb;
        }
        .none {
          display: none;
        }
      }
      th {
        width: 50%;
        text-align: left;
        height: 64px;
        padding: 0 20px;
      }
      td {
        width: 50%;
        flex: 1;
        height: 50px;
        padding: 0 20px;
        span {
          display: block;
          width: 50%;
          max-width: 170px;
          &:nth-of-type(1) {
            float: left;
            font-size: 14px;
            font-family: IBMPlexSans;
            color: rgba(23, 23, 58, 0.6);
          }
          &:nth-of-type(2) {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            section {
              width: 150px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            i {
              margin-right: 4px;
              width: 20px;
              height: 20px;
              display: block;
            }
            .warn {
              background-image: url("../../assets/img/helmet/wran.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
            > .copy {
              width: 16px;
              height: 20px;
              background-image: url("../../assets/img/icon/copy.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              cursor: pointer;
            }
            float: right;
            font-size: 14px;
            font-family: IBMPlexSans;
            color: #17173a;
          }
        }
        i {
          width: 16px;
          height: 16px;
          display: block;
          background-image: url("../../assets/img/icon/copy.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    &_dsc {
      width: 100%;
      margin: 0 auto;
      h3 {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #17173a;
        line-height: 22px;
        margin-top: 30px;
      }
      p {
        font-size: 14px;
        font-family: IBMPlexSans;
        color: #17173a;
        line-height: 22px;
        margin-top: 15px;
      }
    }
    &_media {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 0px auto 0;
      flex-shrink: 0;
      p {
        display: flex;
        align-items: center;
        margin-top: 24px;
        span {
          margin-left: 12px;
          font-size: 14px;
          font-family: IBMPlexSans;
          color: #17173a;
          line-height: 24px;
        }
        a {
          font-size: 14px;
          font-family: IBMPlexSans;
          color: #17173a;
          line-height: 24px;
          text-decoration: underline;
          margin-left: 4px;
          &:hover {
            color: rgba(23, 23, 58, 0.7);
          }
        }
      }
    }
  }
}
</style>