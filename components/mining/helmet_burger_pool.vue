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
          LPT
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
          :style="
            expired ? 'background: #ccc !important; pointer-events: none' : ''
          "
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
        <section>
          <p>
            <span>{{ $t('Table.MyPoolShare') }}：</span>
            <span> {{ isLogin ? balance.Share : '--' }} %</span>
          </p>
          <a
            href="https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
            target="_blank"
            >From <i class="pancake"></i>Get HELMET-hBURGER LPT</a
          >
        </section>
      </div>
      <div class="ContractAddress">
        <span>hBURGER {{ $t('Table.ContractAddress') }}</span>
        <p>
          0x9ebbb98f2bc5d5d8e49579995c5efac487303bea
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0x9ebbb98f2bc5d5d8e49579995c5efac487303bea')
            "
          ></i>
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
          LPT
        </p>
      </div>
      <div class="content">
        <div class="input">
          <input
            name="withdraw"
            type="text"
            v-model="balance.Withdraw"
            disabled
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
          <span>BURGER {{ $t('Table.HELMETRewards') }}：</span>
          <span>
            <span>
              <countTo
                v-if="isLogin"
                :startVal="Number(0)"
                :endVal="Number(balance.Cake)"
                :duration="2000"
                :decimals="8"
              />
              <span v-else>--</span>
              BURGER</span
            >
          </span>
        </p>
        <p>
          <span>HELMET {{ $t('Table.HELMETRewards') }}：</span>
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
        </p>

        <button
          @click="toClaim"
          :class="claimLoading ? 'disable o_button' : 'o_button'"
          :style="
            expired ? 'background: #ccc !important; pointer-events: none' : ''
          "
        >
          <i :class="claimLoading ? 'loading_pic' : ''"></i
          >{{ $t('Table.ClaimAllRewards') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  totalSupply,
  balanceOf,
  getLPTOKEN,
  CangetPAYA,
  CangetUNI,
  getDoubleReward,
  exitStake,
  getBalance,
  toDeposite,
} from '~/interface/deposite'
import precision from '~/assets/js/precision.js'
import { fixD, addCommom, autoRounding, toRounding } from '~/assets/js/util.js'
import { uniswap } from '~/assets/utils/address-pool.js'
import Message from '~/components/common/Message'
import ClipboardJS from 'clipboard'
import countTo from 'vue-count-to'
export default {
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: 'HELMET-hBURGER LP',
        dueDate: '2021/03/07 00:00',
        DownTime: {
          day: '00',
          hour: '00',
          minute: '00',
          second: '00',
        },
      },
      textList: [
        {
          text: this.$t('Table.RewardsDistribution') + `（weekly）`,
          num: 0,
          color: '#00B900',
          unit: '',
          num1: 0,
        },
        {
          text: this.$t('Table.PoolAPR'),
          num: 0,
          color: '#00B900',
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
        //   color: '#00B900',
        //   unit: ''
        // }
      ],
      balance: {
        Deposite: 0,
        Withdraw: 0,
        Helmet: 0,
        Cake: 0,
        TotalLPT: 0,
        Share: 0,
      },
      DepositeNum: '',
      WithdrawNum: '',
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
      helmetPrice: 0,
      MingTime: '',
      isLogin: false,
      expired: false,
    }
  },
  mounted() {
    setInterval(() => {
      setTimeout(() => {
        this.getMiningTime()
        this.getDownTime()
      })
      clearTimeout()
    }, 1000)
    this.$bus.$on('DEPOSITE_LOADING_BURGERHELMET', (data) => {
      this.stakeLoading = data.status
      this.DepositeNum = ''
    })
    this.$bus.$on('CLAIM_LOADING_BURGERHELMET', (data) => {
      this.claimLoading = false
    })
    this.$bus.$on('EXIT_LOADING_BURGERHELMET', (data) => {
      this.exitLoading = false
    })
    this.$bus.$on('RELOAD_DATA_BURGERHELMET', () => {
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
    showOnepager() {
      this.$bus.$emit('OPEN_ONEPAGER', {
        showFlag: true,
        title: 'What is $hBurger?',
        text: [
          'A total of $450,000 $hBurger was given away to LPT Miners on helmet.insure (including Helmet-BNB, Helmet-LONG, Helmet-HCCT LPT Pool, PancakeSwap Helmet-BNB Farm) ',
          'Groundbreaking design of Policy Mining for Real Token!!! $60,000 COMBO Mining Bonus of $Helmet & $Burger !',
          'It is $Burger cover miss out policy. The reasonable activate price: 1 $Burger=0.07 BNB. For example, if $Burger hit 0.08 BNB, you could swap 0.07BNB+1$hBurger to 1 $Burger, and get 0.01BNB profit.',
          'Expire date: March, 9th, 2021',
          'More details in our Medium.',
        ],
      })
    },
    getDownTime() {
      let now = new Date() * 1
      let dueDate = this.list.dueDate
      dueDate = new Date(dueDate)
      let DonwTime = dueDate - now
      let day = Math.floor(DonwTime / (24 * 3600000))
      let hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000)
      let minute = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
      )
      let second = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      )
      let template

      if (dueDate > now) {
        template = {
          day: day > 9 ? day : '0' + day,
          hour: hour > 9 ? hour : '0' + hour,
        }
      } else {
        template = {
          day: '00',
          hour: '00',
        }
        this.expired = true
      }
      this.list.DownTime = template
    },
    getMiningTime() {
      let now = new Date() * 1
      let dueDate = '2021/02/10 15:00'
      dueDate = new Date(dueDate)
      let DonwTime = dueDate - now
      let day = Math.floor(DonwTime / (24 * 3600000))
      let hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000)
      let minute = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
      )
      let second = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      )
      let template
      if (dueDate < now) {
        template = `${0}${this.$t('Content.HourD')} ${0}${this.$t(
          'Content.MinD'
        )} ${0}${this.$t('Content.SecondD')}`
      } else {
        template = `${hour}${this.$t('Content.HourD')} ${minute}${this.$t(
          'Content.MinD'
        )} ${second}${this.$t('Content.SecondD')}`
      }
      this.MingTime = template
    },
    copyAdress(e, text) {
      let _this = this
      let copys = new ClipboardJS('.copy', { text: () => text })
      copys.on('success', function(e) {
        Message({
          message: 'Successfully copied',
          type: 'success',
          // duration: 0,
        })
        copys.destroy()
      })
      copys.on('error', function(e) {
        console.error('Action:', e.action)
        console.error('Trigger:', e.trigger)
        copys.destroy()
      })
    },
    WatchIndexArray(newValue, value) {
      if (newValue) {
        this.getAPY()
      }
    },
    async getAPY() {
      // BURGER的helmet价值
      let burgebnbrValue = await uniswap('BURGER', 'WBNB')
      let bnbhelmetValue = await uniswap('WBNB', 'HELMET')
      let burgerHelmet = burgebnbrValue * bnbhelmetValue
      let allVolume = burgerHelmet * 15000
      //总抵押
      let supplyVolume = await totalSupply('BURGERHELMET') //数量
      // 总发行
      let stakeVolue = await totalSupply('BURGERHELMET_LPT') //数量
      // 抵押总价值
      let stakeValue = await balanceOf('HELMET', 'BURGERHELMET_LPT', true)
      let burgerApy = fixD(
        precision.times(
          precision.divide(
            precision.times(precision.divide(allVolume, 25), 365),
            precision.times(
              precision.divide(precision.times(stakeValue, 2), stakeVolue),
              supplyVolume
            )
          ),
          100
        ),
        2
      )
      let helmetApy = fixD(
        precision.times(
          precision.divide(
            precision.times(precision.divide(75000, 25), 365),
            precision.times(
              precision.divide(precision.times(stakeValue, 2), stakeVolue),
              supplyVolume
            )
          ),
          100
        ),
        2
      )

      let apy = precision.plus(burgerApy, helmetApy)
      this.apy = apy ? apy : 0
      if (this.expired) {
        this.textList[1].num = '--'
      } else {
        this.textList[1].num = this.apy + '%'
      }
    },
    async getBalance() {
      let helmetType = 'BURGERHELMET_LPT'
      let type = 'BURGERHELMET'
      // 可抵押数量
      let Deposite = await getBalance(helmetType)
      // 可赎回数量
      let Withdraw = await getLPTOKEN(type)
      // 总抵押
      let TotalLPT = await totalSupply(type)
      // 可领取Helmet
      let Helmet = await CangetPAYA(type)
      //  可领取Cake
      let Cake = await CangetUNI(type)

      // 赋值
      this.balance.Deposite = fixD(Deposite, 4)
      this.balance.Withdraw = fixD(Withdraw, 4)
      this.balance.Helmet = fixD(Helmet, 8)
      this.balance.Cake = fixD(Cake, 8)
      this.balance.TotalLPT = fixD(TotalLPT, 4)
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2)
      this.textList[0].num = fixD((75000 / 25) * 7, 2) + ' HELMET'
      this.textList[0].num1 = fixD((15000 / 25) * 7, 2) + ' BURGER'
      if (this.expired) {
        this.textList[0].num = '--'
        this.textList[0].num1 = '--'
      } else {
        this.textList[0].num = fixD((75000 / 25) * 7, 2) + ' HELMET'
        this.textList[0].num1 = fixD((15000 / 25) * 7, 2) + ' BURGER'
      }
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
      let type = 'BURGERHELMET'
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {})
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return
      }
      this.claimLoading = true
      let type = 'BURGERHELMET'
      let res = await getDoubleReward(type)
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return
      }
      this.exitLoading = true
      let type = 'BURGERHELMET'
      let res = await exitStake(type)
    },
  },
}
</script>

<style lang="scss" scoped>
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
  .miningTime {
    position: absolute;
    right: 16px;
    top: 0px;
    font-size: 14px;
  }
  .burger_pool {
    background: #ffffff;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 40px 16px;
    position: relative;
    > .combo {
      width: 148px;
      transform: translateY(-8px);
      height: 28px;
    }
    .finished {
      position: absolute;
      width: 102px;
      height: 102px;
      top: 0;
      right: 0;
      transform: translateY(0);
    }
    > h3 {
      text-align: center;
    }
    .text {
      display: flex;
      flex-direction: column;
      // padding: 0 140px;
      .coin {
        display: flex;
        flex-direction: column;
        h3 {
          height: 55px;
          display: flex;
          margin-bottom: 8px;
          font-size: 24px;
          line-height: 32px;
          flex-direction: column;
          align-items: flex-start;
          img {
            margin-left: 4px;
            width: 32px;
            height: 32px;
          }
          p {
            margin: 4px 0;
            height: 16px;
            background: rgba(255, 150, 0, 0.1);
            border-radius: 8px;
            font-size: 12px;
            color: #fd7e14;
            line-height: 16px;
            display: flex;
            align-items: center;
            cursor: pointer;
            &:hover {
              color: #ff8200;
            }
            i {
              display: inline-block;
              width: 16px;
              height: 16px;
              background-image: url('../../assets/img/helmet/icon_long.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin-right: 3px;
            }
          }
        }
        > div {
          display: flex;
          flex-direction: column;
          > h4 {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            img {
              width: 58px;
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
          > p {
            margin-top: 5px;
            > span {
              display: flex;
              align-items: center;
              > i {
                display: inline-block;
                width: 12px;
                height: 12px;
                background-image: url('../../assets/img/flashmining/miningtime.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                margin-right: 3px;
              }
              > span {
                padding: 1px 3px;
                background: #f7f7fa;
                border-radius: 3px;
                color: #17173a;
                > i {
                  margin: 0 3px;
                  color: #cfcfd2;
                }
              }
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
        height: 293px;
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
        height: 363px;
        border-top: 2px solid #00b900;
        background: rgba(0, 185, 0, 0.04);
        .title {
          > span {
            color: #00b900;
          }
        }
        .button {
          section {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            a {
              font-size: 14px;
              font-weight: 500;
              color: #fd7e14;
              line-height: 20px;
              display: flex;
              align-items: center;
              margin-top: 8px;
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
        border-top: 2px solid #ff6400;
        background: rgba(255, 100, 0, 0.04);
        .title {
          > span {
            color: #ff6400;
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
