<template>
  <div class="mining_pool">
    <div class="deposit">
      <div class="title">
        <span>{{ $t('Table.DAvailable') }}：</span>
        <p>
          <countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(balance.Deposite)"
            :duration="2000"
            :decimals="8"
          />
          <span v-else>--</span>
          HELMET
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="deposit"
            type="text"
            v-model="DepositeNum"
            :class="activeType == 'STAKE' ? 'activeInput' : ''"
          />
          <span @click="DepositeNum = balance.Deposite">{{
            $t('Insurance.Insurance_text18')
          }}</span>
        </div>
      </div>
      <div class="button">
        <button
          @click="toDeposite"
          :class="stakeLoading ? 'disable b_button' : 'b_button'"
        >
          <i :class="stakeLoading ? 'loading_pic' : ''"></i
          >{{ $t('Table.ConfirmDeposit') }}
        </button>
        <p>
          <span>{{ $t('Table.MyDeposits') }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Withdraw)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;LPT</span
          >
        </p>
        <p>
          <span>{{ $t('Table.TotalDeposited') }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.TotalLPT)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;LPT</span
          >
        </p>
        <p>
          <span>{{ $t('Table.MyPoolShare') }}：</span>
          <span> {{ balance.Share }} %</span>
        </p>
      </div>
    </div>
    <i></i>
    <div class="withdraw">
      <div class="title">
        <span>{{ $t('Table.CallableMortgage') }}</span>
        <p>
          <countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(balance.Withdraw)"
            :duration="2000"
            :decimals="8"
          />
          <span v-else>--</span>
          HELMET
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="withdraw"
            type="text"
            v-model="balance.Withdraw"
            disabled
            :class="activeType == 'CLAIM' ? 'activeInput' : ''"
          />
          <span @click="WithdrawNum = balance.Withdraw">{{
            $t('Insurance.Insurance_text18')
          }}</span>
        </div>
      </div>
      <div class="button">
        <button
          @click="toExit"
          :class="exitLoading ? 'disable b_button' : 'b_button'"
        >
          <i :class="exitLoading ? 'loading_pic' : ''"></i
          >{{ $t('Table.ConfirmWithdraw') }} &
          {{ $t('Table.ClaimRewards') }}
        </button>
        <p>
          <span>HELMET {{ $t('Table.HELMETRewards') }}：</span>
          <span>
            <span>
              <countTo
                v-if="isLogin"
                :startVal="Number(0)"
                :endVal="Number(balance.Helmet)"
                :duration="2000"
                :decimals="8"
              />
              <span v-else>--</span>
              HELMET</span
            >
          </span>
        </p>
        <button
          @click="toCompound"
          :class="claimLoading ? 'disable o_button' : 'o_button'"
        >
          <i :class="claimLoading ? 'loading_pic' : ''"></i
          >{{ $t('Table.Compound') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  totalSupply,
  getLPTOKEN,
  CangetPAYA,
  getPAYA,
  exitStake,
  getBalance,
  toDeposite,
  RewardsDuration,
  compound,
} from '~/interface/deposite'
import precision from '~/assets/js/precision.js'
import { fixD, addCommom, autoRounding, toRounding } from '~/assets/js/util.js'
import countTo from 'vue-count-to'
export default {
  props: ['activeType'],
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: 'HELMET POOL',
      },
      textList: [
        {
          text: this.$t('Table.RewardsDistribution') + '（weekly）',
          num: 0,
          color: '#28a745',
          unit: '',
        },
        {
          text: this.$t('Table.PoolAPY'),
          num: 0,
          color: '#28a745',
          unit: '',
        },
        //  {
        //   text: this.$t('Table.TotalDeposited'),
        //   num: 0,
        //   color: '#17173a',
        //   unit: ''
        // },
        //  {
        //   text: this.$t('Table.MyDeposits'),
        //   num: 0,
        //   color: '#17173a',
        //   unit: ''
        // },
        // {
        //   text: this.$t('Table.MyRewards'),
        //   num: 0,
        //   color: '#28a745',
        //   unit: ''
        // }
      ],
      balance: {
        Deposite: 0,
        Withdraw: 0,
        Helmet: 0,
        TotalLPT: 0,
        Share: 0,
      },
      DepositeNum: '',
      WithdrawNum: '',
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
      helmetPrice: 0,
      apy: 0,
      isLogin: false,
    }
  },
  mounted() {
    this.$bus.$on('DEPOSITE_LOADING_HELMETPOOL', (data) => {
      this.stakeLoading = data.status
      this.DepositeNum = ''
    })
    this.$bus.$on('CLAIM_LOADING_HELMETPOOL', (data) => {
      this.claimLoading = false
    })
    this.$bus.$on('EXIT_LOADING_HELMETPOOL', (data) => {
      this.exitLoading = false
    })
    this.$bus.$on('RELOAD_DATA_HELMETPOOL', () => {
      this.getBalance()
    })
    this.$bus.$on('REFRESH_MINING', (data) => {
      this.getBalance()
    })
    setTimeout(() => {
      this.getBalance()
      this.getAPY()
    }, 1000)
    setInterval(() => {
      setTimeout(() => {
        this.getAPY()
      })
    }, 20000)
  },
  watch: {
    indexArray: {
      handler: 'WatchIndexArray',
      immediate: true,
    },
    apy(newValue, value) {
      this.apy = newValue
    },
    userInfo: {
      handler: 'userInfoWatch',
      immediate: true,
    },
  },
  computed: {
    indexArray() {
      return this.$store.state.allIndexPrice
    },
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  methods: {
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin
      }
    },
    WatchIndexArray(newValue, value) {
      if (newValue) {
        this.getAPY()
      }
    },
    async getAPY() {
      let HelmetVolume = await totalSupply('HELMETPOOL')
      let helmetTime = (await RewardsDuration('HELMETPOOL')) / 86400
      // （1+日产量/总质押量）^365
      let apy = fixD(
        Math.pow(
          precision.plus(1, precision.divide(33057.57, HelmetVolume)),
          365
        ) * 100,
        2
      )
      this.apy = HelmetVolume ? apy : 0
      this.textList[1].num = this.apy + '%'
    },
    async getBalance() {
      let helmetType = 'HELMETPOOL_LPT'
      let type = 'HELMETPOOL'
      // 可抵押数量
      let Deposite = await getBalance(helmetType)
      // 可赎回数量
      let Withdraw = await getLPTOKEN(type)
      // 总抵押
      let TotalLPT = await totalSupply(type)
      // 可领取Helmet
      let Helmet = await CangetPAYA(type)
      // 总Helmet
      let totalHelmet = await totalSupply(helmetType)

      this.balance.Deposite = fixD(Deposite, 4)
      this.balance.Withdraw = fixD(Withdraw, 4)
      this.balance.Helmet = fixD(Helmet, 8)
      this.balance.TotalLPT = fixD(TotalLPT, 4)
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2)
      this.textList[0].num = fixD(33057.57 * 7, 2) + ' HELMET'
      // this.textList[3].num = addCommom(Deposite, 4)
      // this.textList[4].num = addCommom(Helmet, 4)
    },
    // 抵押
    toDeposite() {
      if (!this.DepositeNum) {
        return
      }
      if (this.stakeLoading) {
        return
      }
      this.stakeLoading = true
      let type = 'HELMETPOOL'
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {})
    },
    // 复投
    toCompound() {
      this.$bus.$emit('OPEN_COMPOUND', {
        title: 'Compound HELMET Earned',
        number: this.balance.Helmet,
        pool: 'HELMETPOOL',
      })
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return
      }
      this.claimLoading = true
      let type = 'HELMETPOOL'
      let res = await getPAYA(type)
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return
      }
      this.exitLoading = true
      let type = 'HELMETPOOL'
      let res = await exitStake(type)
    },
  },
}
</script>

<style lang="scss" soped>
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878;
  overflow: hidden;
}
.b_button {
  width: 100%;
  margin-top: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.o_button {
  width: 100%;
  margin-top: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading_pic {
  display: block;
  width: 24px;
  height: 24px;
  background-image: url('../../assets/img/helmet/loading.png');
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
}
.compound {
  width: auto !important;
  min-width: 106px;
}
.disable {
  pointer-events: none;
}
.ContractAddress {
  font-size: 13px;
  color: #fd7e14;
  margin-top: 8px;
  span {
    color: #17173a;
  }
  p {
    display: flex;
    margin-top: 4px;
    align-items: center;
    font-weight: 550;
  }
  i {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-image: url('../../assets/img/helmet/copy.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    margin-left: 4px;
  }
}
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878;
  overflow: hidden;
}
.b_button {
  border-radius: 5px;
  width: 100%;
  margin-top: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.o_button {
  width: 100%;
  margin-top: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
.loading_pic {
  display: block;
  width: 24px;
  height: 24px;
  background-image: url('../../assets/img/helmet/loading.png');
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
}
.disable {
  pointer-events: none;
}
@media screen and (min-width: 750px) {
  .mining_pool {
    padding: 40px 0;
    display: flex;
    justify-content: space-evenly;
    > i {
      display: block;
      width: 1px;
      height: auto;
      background: #e8e8eb;
    }
    > div {
      width: 420px;
      .title {
        display: flex;
        justify-content: space-between;
        font-weight: 500;
        line-height: 16px;
        > span {
          font-size: 14px;
          font-weight: 500;
          color: rgba(23, 23, 58, 0.75);
          line-height: 14px;
        }
        p {
          font-size: 14px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          color: #17173a;
          line-height: 14px;
        }
      }
      .content {
        margin-top: 20px;
        input {
          width: 100%;
          height: 40px;
          background: transparent;
          padding: 0 100px 0 12px;
          color: #17173a;
          border-radius: 5px;
          border: 1px solid #e8e8eb;
        }
        .input {
          margin-top: 4px;
          position: relative;
          display: flex;
          align-items: center;
          span {
            display: flex;
            align-items: center;
            padding: 0 8px;
            height: 24px;
            position: absolute;
            right: 15px;
            font-size: 12px;
            cursor: pointer;
            color: #17173a;
            background: #f8f9fa;
            border-radius: 5px;
            border: 1px solid #e8e8eb;
          }
        }
      }
      .button {
        section {
          a {
            margin-top: 4px;
            font-size: 14px;
            font-weight: 500;
            color: #fd7e14;
            line-height: 20px;
            display: flex;
            align-items: center;
            i {
              display: block;
              width: 20px;
              height: 20px;
              background-image: url('../../assets/img/icon/pancake@2x.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin: 0 2px;
            }
          }
        }
      }
    }
    .deposit {
      .button {
        p {
          margin-top: 11px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          > span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              color: rgba(23, 23, 58, 0.7);
              line-height: 14px;
            }
            &:nth-of-type(2) {
              display: flex;
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #17173a;
              line-height: 14px;
            }
          }
        }
      }
    }
    .withdraw {
      .button {
        p {
          margin-top: 11px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          > span {
            &:nth-of-type(1) {
              font-size: 14px;
              color: rgba(23, 23, 58, 0.7);
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #17173a;
              line-height: 14px;
            }
          }
        }
      }
    }
  }
  .activeInput {
    border: 1px solid #fd7e14 !important;
  }
}
@media screen and (max-width: 750px) {
  .ContractAddress {
    p {
      font-size: 12px;
    }
  }
  .helmet_pool {
    background: #ffffff;
    padding: 40px 16px;
    position: relative;
    margin-top: 10px;
    > img {
      position: absolute;
      width: 36px;
      height: 36px;
      top: 0;
      transform: translateY(-5px);
    }
    > h3 {
      text-align: center;
    }
    .text {
      display: flex;
      flex-direction: column;
      // padding: 0 140px;
      // justify-content: space-between;
      .coin {
        display: flex;
        flex-direction: column;
        h3 {
          height: 32px;
          display: flex;
          margin-bottom: 8px;
          font-size: 24px;
          line-height: 32px;
          img {
            margin-left: 4px;
            width: 32px;
            height: 32px;
          }
        }
        > div {
          display: flex;
          > p {
            display: flex;
            align-items: center;
            color: #17173a;
            font-size: 14px;
            margin-right: 14px;
            img {
              width: 32px;
              height: 32px;
              margin-right: 4px;
            }
            span {
              margin-left: 4px;
              color: rgba(23, 23, 58, 0.4);
            }
          }
        }
      }
      .index {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        > p {
          display: flex;
          flex-direction: column;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              color: rgba(23, 23, 58, 0.4);
            }
            &:nth-of-type(2) {
              margin-top: 12px;
            }
          }
        }
      }
    }
    .pool {
      display: flex;
      // justify-content: space-between;
      flex-direction: column;
      margin-top: 30px;
      > div {
        height: 340px;
        padding: 30px 16px;
        .title {
          display: flex;
          justify-content: space-between;
          font-weight: 500;
          line-height: 16px;
          p {
            color: rgba(23, 23, 58, 0.4);
            font-size: 14px;
            line-height: 16px;
          }
        }
        .content {
          margin-top: 20px;
          label {
            font-size: 14px;
            color: rgba(23, 23, 58, 0.4);
            line-height: 20px;
          }
          input {
            width: 100%;
            height: 40px;
            border: 1px solid #cfcfd2;
            background: transparent;
            padding: 0 100px 0 12px;
            color: #17173a;
          }
          .input {
            margin-top: 4px;
            position: relative;
            display: flex;
            align-items: center;
            span {
              position: absolute;
              right: 15px;
              font-size: 14px;
              color: #17173a;
              cursor: pointer;
            }
          }
        }
      }
      .deposit {
        border-top: 2px solid #28a745;
        background: rgba(0, 185, 0, 0.04);
        .title {
          > span {
            color: #28a745;
          }
        }
        .button {
          p {
            margin-top: 11px;
            display: flex;
            flex-direction: column;
            > span:first-child {
              color: rgba(23, 23, 58, 0.4);
            }
            > span:last-child {
              color: #17173a;
            }
            > span {
              font-size: 14px;
              span {
                display: flex;
                flex-direction: column;
                color: #17173a;
              }
            }
          }
        }
      }
      .withdraw {
        border-top: 2px solid #dc3545;
        background: rgba(255, 100, 0, 0.04);
        .title {
          > span {
            color: #dc3545;
          }
        }
        .button {
          p {
            margin-top: 11px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:nth-of-type(1) span {
              font-size: 14px;
            }
            > span {
              font-size: 14px;
              color: rgba(23, 23, 58, 0.4);
              span {
                display: flex;
                color: #17173a;
              }
            }
          }
        }
      }
    }
  }
}
</style>
