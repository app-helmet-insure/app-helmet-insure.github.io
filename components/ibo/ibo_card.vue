<template>
  <div class="ibo_card">
    <div class="ibo_project">
      <div 
        class="ibo_item_warp"
        v-for='(item, index) in iboData'
        :key='index'
      >
        <div class="ibo_item">
          <div class="ibo_item_title">
            <p class="ibo_item_title_left">
              <img :src='require(`~/assets/img/ibo/ibo_card_${item.name}@2x.png`)' />
              {{item.name}}
            </p>
            <p class="ibo_item_title_right">
              <span class="ibo_item_countdown">05d/01h</span>
              <span v-if='item.status === 0' class="ibo_item_status ibo_item_status_ongoing">Will start in</span>
              <span v-if='item.status === 1 && (item.timeClose === 0 || item.timeClose > now)' class="ibo_item_status ibo_item_status_ongoing">Undergoing</span>
              <span v-if='item.status === 1 && !(item.timeClose === 0 || item.timeClose > now)' class="ibo_item_status ibo_item_status_ongoing">Waiting</span>
              <span v-if='item.status === 2' class="ibo_item_status ibo_item_status_ongoing">Calculating</span>
              <span v-if='item.status === 3' class="ibo_item_status ibo_item_status_ongoing">Finished</span>
            </p>
          </div>
          <p class="ibo_item_radio">{{item.ratio}}</p>
          <p class="ibo_item_value">
            <span class="ibo_item_value_title">Total Releases</span>
            <span class="value">{{item.totalPurchasedAmount}}</span>
          </p>
          <p class="ibo_item_value">
            <span class="ibo_item_value_title">Max members</span>
            <span class="value">{{item.pool_info.max_allocation}}</span>
          </p>
          <p class="ibo_item_value">
            <span class="ibo_item_value_title">progress</span>
            <span class="value">{{item.progress}}%</span>
          </p>
          <a class="ibo_item_progress">
            <i 
              class="ibo_item_progress_bar" 
              :style="item.progress > 1 ? 'width: 100%' : item.progress == 0 ? 'display: none' : 'width: ' + item.progress * 100 + '%'">
            </i>
          </a>
          <div class="block">
            <el-slider
              v-model="value"
              :min='item.pool_info.min_allocation'
              :max='item.pool_info.max_allocation'
              show-input>
            </el-slider>
            <p class="ibo_item_value slider_content">
              <span class="ibo_item_value_title">Available:</span>
              <span class="value">999</span>
            </p>
            <p class="min_max_value">
              <span>Min:{{item.pool_info.min_allocation}}</span>
              <span>Max:{{item.pool_info.max_allocation}}</span>
            </p>
          </div>
          <a class="ibo_item_btn" @click='onApprove'>{{ $t("Table.Burn") }}</a>
          <p class="ibo_item_value">
            <span class="ibo_item_value_title">My Helmet</span>
            <span class="value">999</span>
          </p>
          <p class="ibo_item_value">
            <span class="ibo_item_value_title">Winning Rate</span>
            <span class="value">10,000</span>
          </p>
          <p class="ibo_item_value">
            <span class="ibo_item_value_title">Token Get(EST)</span>
            <span class="value">10%</span>
          </p>
          <p class="claim_detail_btn" @click='showClaim'>
            <span></span>
            <a>Claim Details</a>
            <span></span>
          </p>
          <div v-if='claimFlag'>
            <p class="ibo_item_value">
            <span class="ibo_item_value_title">Unused Helmet</span>
            <span class="value">10,000</span>
          </p>
          <p class="ibo_item_value">
            <span class="ibo_item_value_title">Token Get</span>
            <span class="value">10%</span>
          </p>
          <a class="ibo_item_btn ibo_item_claim" @click='onApprove'>{{ $t("Table.Claim") }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
   export default {
     data() {
       return {
         iboData: [
            {
              name: 'Helmet',
              address: '0x1',
              abi: null,
              start_at: '1627635600',
              is_top: true,
              is_coming: false, // is_coming 为 true 则不请求合约
              currency: {
                address: '0x910651F81a605a6Ef35d05527d24A72fecef8bF0', // 如果是0x0则是ht
                decimal: 18,
                symbol: 'WAR',
              },
              icon: '',
              type: 1,
              isPrivate: true,
              underlying: {
                address: '0xE5944B50DF84001a36c7DE0d5Cb4da7ab21407D2',
                decimal: 18,
                symbol: 'XNFT',
                name: 'XNFT',
                total_supply: '100,000,000',
                holders: '-',
                transfers: '-',
              },
              amount: '12500', // token 总额
              pool_info: {
                token_distribution: 'July 30th 2021, 5:00PM SGT',
                min_allocation: 0,
                max_allocation: 666,
                min_swap_level: '66,600 WAR',
              },
              website: 'https://xnft.net/',
              white_paper: 'https://xnft.net/xNFT_Protocol_Whitepaper_EN.pdf',
              twitter: 'https://twitter.com/xNFT_Protocol?s=09',
              Telegram_Channel: 'https://t.me/xNFT_Global',
              Github: '-',
              yuque: '-',
              progress: 0.2,
              status: 0,
              ratio: '1 XXX=0.1 Helmet',
              time: '1627639200',
              purchasedCurrencyOf: 0,
              totalPurchasedAmount: '66600000000000000000000',
              totalPurchasedUnderlying: '0',
              totalPurchasedCurrency: '0',
              is_flash: false,
              link_url: 'https://xnft.net/', // 跳转外链接
              project_introduction:
                'The xNFT Protocol is an underlying technology that supports NFT transactions',
              duration: '', // 完成时间
              totalApplicants: '150', // 申请总人数
              winningRate: '-', // 申请中签率
              committed: '', // 超募比例
              total: '', // 参与资金规模
              poolType: 0, // 值为 1 代表定向
              networkId: 56,
            },
         ],
         value: 0,
         claimFlag: false,
         now: parseInt(Date.now() / 1000)
       }
     },
     methods: {
      showClaim() {
        this.claimFlag = !this.claimFlag
      },
      onApprove() {
        console.log('approve')
      }
     }
   }
</script>

<style lang='scss'>
  @import "~/assets/css/reset-element.scss";
  @import "~/assets/css/base.scss";
  .ibo_item_warp {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (min-width: 750px) and (max-width: 1860px) {
    .ibo_item_warp {
      width: 33.3%;
    }
  }
  @media screen and (min-width: 1860px) {
    .ibo_item_warp {
      width: 25%;
    }
  }
  @media screen and (min-width: 2260px) {
    .ibo_item_warp {
      width: 20%;
    }
  }
  @media screen and (min-width: 750px) {
    .ibo_project {
      display: flex;
      flex-wrap: wrap;
      .ibo_item {
        padding: 20px;
        width: 320px;
        min-height: 476px;
        @include themeify {
          background: themed("color-ffffff");
        }
        @include themeify {
          box-shadow: 0px -2px 0px 0px themed("color-e8e8eb");
        }
        
        border-radius: 10px;
        @include themeify {
          box-border: 1px solid themed("color-e8e8eb");
        }
        .ibo_item_title {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ibo_item_title_left {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 28px;
          img {
            margin-right: 10px;
            width: 40px;
            height: 40px;
          }
        }
        .ibo_item_title_right {
          display: flex;
          flex-direction: column;
        }
        &_countdown {
          padding: 0 4px;
          height: 18px;
          font-size: 14px;
          font-family: IBMPlexSans;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 18px;
          @include themeify {
            background: themed("mining_earn");
          }
          border-radius: 3px;
        }
        &_status {
          margin-top: 4px;
          font-size: 12px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          @include themeify {
            color: themed("color-17173a");
          }
          opacity: 0.4;
          line-height: 12px;
          text-align: right;
        }
        &_status_ongoing {
          @include themeify {
            color: themed("color-fd7e14");
          }
          opacity: 1;
        }
        &_radio {
          margin-top: 20px;
          font-size: 18px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 28px;
        }
        &_value {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          .ibo_item_value_title {
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            @include themeify {
              color: themed("color-17173a");
            }
            opacity: 0.5;
            line-height: 14px;
          }
          .value {
            font-size: 14px;
            font-family: IBMPlexSans-Bold, IBMPlexSans;
            font-weight: bold;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 14px;
          }
        }
        &_progress {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 6px;
          background: #E8E8EB;
          border-radius: 100px;
          .ibo_item_progress_bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 6px;
            background: linear-gradient(180deg, #FDB514 0%, #FD7E14 100%);
            border-radius: 100px 0px 0px 100px;
            &:after {
              position: absolute;
              content: '';
              width: 1px;
              height: 10px;
              top: -2px;
              right: 0;
              background: #FD7E14;
            }
          }
        }
        .min_max_value {
          position: absolute;
          bottom: -3px;
          left: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          span {
            font-size: 12px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 12px;
          }
        }
        &_btn {
          display: block;
          margin-top: 18px;
          width: 100%;
          height: 40px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFF;
          line-height: 40px;
          text-align: center;
          @include themeify {
            background: themed("ibo_btn");
          }
          border-radius: 5px;
          &:hover {
            @include themeify {
              background: themed("ibo_btn_hover");
            }
          }
        }
        &_claim {
          @include themeify {
            background: themed("color-fd7e14");
          }
          &:hover {
            @include themeify {
              background: themed("color-fd7e14");
            }
          }
        }
        .claim_detail_btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          span {
            width: 84px;
            height: 1px;
            @include themeify {
              background: themed("color-e8e8eb");
            }
          }
          a {
            position: relative;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            @include themeify {
              color: themed("color-17173a");
            }
            opacity: 0.4;
            line-height: 14px;
            &:hover {
              @include themeify {
                color: themed("color-fd7e14");
              }
              opacity: 1;
              &:after {
                content: '';
                position: absolute;
                top: 2px;
                right: -10px;
                width: 0;
                height: 0;
                @include themeify {
                  border: 4px solid themed("color-fd7e14");
                  border-left-color: transparent;
                  border-bottom-color: transparent;
                  border-right-color: transparent;
                }
                opacity: 1;
                transform: rotate(-180deg);
                // transition: 0.3s;
              }
            }
            &:after {
              content: '';
              position: absolute;
              top: 6px;
              right: -10px;
              width: 0;
              height: 0;
              @include themeify {
                border: 4px solid themed("color-17173a");
                border-left-color: transparent;
                border-bottom-color: transparent;
                border-right-color: transparent;
              }
              opacity: 0.4;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 750px) {
     .ibo_project {
       padding-bottom: 30px;
      .ibo_item {
        margin: 10px auto;
        padding: 20px;
        width: 320px;
        min-height: 476px;
        @include themeify {
          background: themed("color-ffffff");
        }
        @include themeify {
          box-shadow: 0px -2px 0px 0px themed("color-e8e8eb");
        }
        
        border-radius: 10px;
        @include themeify {
          box-border: 1px solid themed("color-e8e8eb");
        }
        .ibo_item_title {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ibo_item_title_left {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 28px;
          img {
            margin-right: 10px;
            width: 40px;
            height: 40px;
          }
        }
        .ibo_item_title_right {
          display: flex;
          flex-direction: column;
        }
        &_countdown {
          padding: 0 4px;
          height: 18px;
          font-size: 14px;
          font-family: IBMPlexSans;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 18px;
          @include themeify {
            background: themed("mining_earn");
          }
          border-radius: 3px;
        }
        &_status {
          margin-top: 4px;
          font-size: 12px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          @include themeify {
            color: themed("color-17173a");
          }
          opacity: 0.4;
          line-height: 12px;
          text-align: right;
        }
        &_status_ongoing {
          @include themeify {
            color: themed("color-fd7e14");
          }
          opacity: 1;
        }
        &_radio {
          margin-top: 20px;
          font-size: 18px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          @include themeify {
            color: themed("color-17173a");
          }
          line-height: 28px;
        }
        &_value {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          .ibo_item_value_title {
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            @include themeify {
              color: themed("color-17173a");
            }
            opacity: 0.5;
            line-height: 14px;
          }
          .value {
            font-size: 14px;
            font-family: IBMPlexSans-Bold, IBMPlexSans;
            font-weight: bold;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 14px;
          }
        }
        &_progress {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 6px;
          background: #E8E8EB;
          border-radius: 100px;
          .ibo_item_progress_bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 6px;
            background: linear-gradient(180deg, #FDB514 0%, #FD7E14 100%);
            border-radius: 100px 0px 0px 100px;
            &:after {
              position: absolute;
              content: '';
              width: 1px;
              height: 10px;
              top: -2px;
              right: 0;
              background: #FD7E14;
            }
          }
        }
        .min_max_value {
          position: absolute;
          bottom: -3px;
          left: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          span {
            font-size: 12px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            @include themeify {
              color: themed("color-17173a");
            }
            line-height: 12px;
          }
        }
        &_btn {
          display: block;
          margin-top: 18px;
          width: 100%;
          height: 40px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFF;
          line-height: 40px;
          text-align: center;
          @include themeify {
            background: themed("ibo_btn");
          }
          border-radius: 5px;
          &:hover {
            @include themeify {
              background: themed("ibo_btn_hover");
            }
          }
        }
        &_claim {
          @include themeify {
            background: themed("color-fd7e14");
          }
          &:hover {
            @include themeify {
              background: themed("color-fd7e14");
            }
          }
        }
        .claim_detail_btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          span {
            width: 84px;
            height: 1px;
            @include themeify {
              background: themed("color-e8e8eb");
            }
          }
          a {
            position: relative;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            @include themeify {
              color: themed("color-17173a");
            }
            opacity: 0.4;
            line-height: 14px;
            &:hover {
              @include themeify {
                color: themed("color-fd7e14");
              }
              opacity: 1;
              &:after {
                content: '';
                position: absolute;
                top: 2px;
                right: -10px;
                width: 0;
                height: 0;
                @include themeify {
                  border: 4px solid themed("color-fd7e14");
                  border-left-color: transparent;
                  border-bottom-color: transparent;
                  border-right-color: transparent;
                }
                opacity: 1;
                transform: rotate(-180deg);
                // transition: 0.3s;
              }
            }
            &:after {
              content: '';
              position: absolute;
              top: 6px;
              right: -10px;
              width: 0;
              height: 0;
              @include themeify {
                border: 4px solid themed("color-17173a");
                border-left-color: transparent;
                border-bottom-color: transparent;
                border-right-color: transparent;
              }
              opacity: 0.4;
            }
          }
        }
      }
    }
  }
</style>