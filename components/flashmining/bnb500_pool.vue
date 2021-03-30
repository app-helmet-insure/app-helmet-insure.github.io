<template>
  <div class="flash_pool">
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
            :style="
              DepositeNum == balance.Deposite
                ? 'border: 1px solid #fd7e14 !important'
                : ''
            "
          />
          <span
            @click="DepositeNum = balance.Deposite"
            :style="
              DepositeNum == balance.Deposite
                ? 'background: rgba(255, 150, 0, 0.1);'
                : ''
            "
            >{{ $t('Table.Max') }}</span
          >
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
        <p>
          <span>{{ $t('Table.MyPoolShare') }}：</span>
          <span> {{ isLogin ? balance.Share : '--' }} %</span>
        </p>
        <a
          href="https://exchange.pancakeswap.finance/?_gl=1*1p30wvd*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMzY1MjU0OS40OC4xLjE2MTM2NTI3NzMuMA..#/add/0x936909e72951A19a5e1d75A109B0D34f06f39838/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
          target="_blank"
          >From <i class="pancake"></i> Get hCTK-HELMET LPT</a
        >
      </div>
      <div class="ContractAddress">
        <span>hCTK {{ $t('Table.ContractAddress') }}</span>
        <p>
          0x936909e72951A19a5e1d75A109B0D34f06f39838
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0x936909e72951A19a5e1d75A109B0D34f06f39838')
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
            style="border: 1px solid #fd7e14 !important"
          />
          <!-- <input name="withdraw" type="text" v-model="WithdrawNum" /> -->
          <span
            @click="WithdrawNum = balance.Withdraw"
            style="background: rgba(255, 150, 0, 0.1)"
            >{{ $t('Table.Max') }}</span
          >
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
          <span>BNB500 {{ $t('Table.HELMETRewards') }}：</span>
          <span>
            <span>
              <countTo
                v-if="isLogin"
                :startVal="Number(0)"
                :endVal="Number(balance.hCTK)"
                :duration="2000"
                :decimals="8"
              />
              <span v-else>--</span>
              BNB500</span
            >
          </span>
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
      <div class="ContractAddress">
        <span>BNB500 {{ $t('Table.ContractAddress') }}</span>
        <p>
          0xe204c4c21c6ed90e37cb06cb94436614f3208d58
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0xe204c4c21c6ed90e37cb06cb94436614f3208d58')
            "
          ></i>
        </p>
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
  getPAYA,
  exitStake,
  getLastTime,
  approveStatus,
  getBalance,
  toDeposite,
  getMined,
  WithdrawAvailable,
  getAllHelmet,
  Rewards,
} from '~/interface/deposite'
import precision from '~/assets/js/precision.js'
import { fixD, addCommom, autoRounding, toRounding } from '~/assets/js/util.js'
import { uniswap } from '~/assets/utils/address-pool.js'
import Message from '~/components/common/Message'
import ClipboardJS from 'clipboard'
import countTo from 'vue-count-to'
import { template } from '@antv/g2plot/lib/utils'
export default {
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: 'BNB500 Pool (By hCTK-Helmet LPT)',
        dueDate: '2021/02/29 00:00',
        DownTime: {
          houer: 0,
          minute: 0,
          second: 0,
        },
      },
      textList: [
        {
          text: this.$t('Table.RewardsDistribution') + '（weekly）',
          num: 0,
          color: '#28a745',
          unit: '',
        },
        {
          text: this.$t('Table.PoolAPR'),
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
        hCTK: 0,
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
      MingTime: 0,
      actionType: 'deposit',
      fixD,
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
    this.$bus.$on('DEPOSITE_LOADING_BNB500POOL', (data) => {
      this.stakeLoading = data.status
      this.DepositeNum = ''
    })
    this.$bus.$on('CLAIM_LOADING_BNB500POOL', (data) => {
      this.claimLoading = false
    })
    this.$bus.$on('EXIT_LOADING_BNB500POOL', (data) => {
      this.exitLoading = false
    })
    this.$bus.$on('RELOAD_DATA_BNB500POOL', () => {
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
    showOnepager() {
      this.$bus.$emit('OPEN_ONEPAGER', {
        showFlag: true,
        title: 'What is $BNB500?',
        text: [
          '$BNB500 is BNB cover miss out policy.',
          'Limited edition: 1500 ( 500 for Airdrop to LP Miners on helmet.insure and 1000 for Flash Mining)',
          'In this policy, we set a ratio: ',
          'BNB : BUSD = 1:500 ',
          'it means that you could swap 500 BUSD+1$BNB500 to 1BNB. It is the reasonable active price, for example, if BNB hit $600, you could active the policy and swap 500 BUSD + 1 $BNB500 to 1 BNB with 100BUSD profit.',
          'Flash Mining Type: ',
          '$hCTK-$Helmet LP Mining Pool Notice: $hCTK will be expired on 20th Feb. 0:00 SGT , you could activate it ASAP or take part in $BNB500 Flash Mining.',
          'Flash Mining Start: 18th Feb. 24:00 SGT',
          'Flash Mining End: 28th Feb. 24:00 SGT',
          'Expire date: 20th Mar. 24:00 SGT',
        ],
      })
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
      let template = {}
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
        this.actionType = 'withdraw'
      }
      this.list.DownTime = template
    },
    getMiningTime() {
      let now = new Date() * 1
      let dueDate = '2021/02/19 00:00'
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
      let template = {}
      if (dueDate < now) {
        template = {
          hour: '00',
          minute: '00',
          second: '00',
        }
      } else {
        template = {
          hour: hour > 9 ? hour : '0' + hour,
          minute: minute > 9 ? minute : '0' + minute,
          second: second > 9 ? second : '0' + second,
        }
      }
      this.MingTime = template
    },
    async getAPY() {
      let HCTKHELMET = await uniswap('BNB500', 'HELMET') //Hlemt价格
      let HctkVolume = await totalSupply('BNB500POOL') //数量
      let LptVolume = await totalSupply('BNB500POOL_LPT') //发行
      let HelmetValue = await balanceOf('HELMET', 'BNB500POOL_LPT', true)
      // APY = 年产量*helmet价格/抵押价值
      let apy = fixD(
        precision.times(
          precision.divide(
            precision.times(HCTKHELMET, precision.divide(1000, 10), 365),
            precision.times(
              precision.divide(precision.times(HelmetValue, 2), LptVolume),
              HctkVolume
            )
          ),
          100
        ),
        2
      )
      this.apy = apy ? apy : 0
      if (this.expired) {
        this.textList[1].num = '--'
      } else {
        this.textList[1].num = this.apy + '%'
      }
    },
    async getBalance() {
      let helmetType = 'BNB500POOL_LPT'
      let type = 'BNB500POOL'
      // 可抵押数量
      let Deposite = await getBalance(helmetType)
      // 可赎回数量
      let Withdraw = await getLPTOKEN(type)
      // 总抵押
      let TotalLPT = await totalSupply(type)
      // 可领取Helmet
      let Helmet = await CangetPAYA(type)
      // 总Helmet
      // let LptVolume = await totalSupply(helmetType); //发行

      this.balance.Deposite = fixD(Deposite, 8)
      this.balance.Withdraw = fixD(Withdraw, 8)
      this.balance.hCTK = fixD(Helmet, 8)
      this.balance.TotalLPT = fixD(TotalLPT, 8)
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2)
      if (this.expired) {
        this.textList[0].num = '--'
      } else {
        this.textList[0].num = fixD((1000 / 10) * 7, 2) + ' BNB500'
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
      let type = 'BNB500POOL'
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {})
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return
      }
      this.claimLoading = true
      let type = 'BNB500POOL'
      let res = await getPAYA(type)
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return
      }
      this.exitLoading = true
      let type = 'BNB500POOL'
      let res = await exitStake(type)
    },
  },
}
</script>

<style lang="scss" soped>
.ContractAddress {
  font-size: 14px;
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
  width: 100%;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.o_button {
  width: 100%;
  margin-top: 16px;
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
.disable {
  pointer-events: none;
}
@media screen and (min-width: 750px) {
  .ContractAddress {
    p {
      font-size: 14px;
    }
  }
  .flash_pool {
    padding: 40px 0;
    display: flex;
    justify-content: space-evenly;
    > i {
      display: block;
      width: 1px;
      height: auto;
      background: #e8e8eb;
    }
    .deposit,
    .withdraw {
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
      > .content {
        margin-top: 20px;
        .input {
          width: 100%;
          height: 40px;
          position: relative;
          margin-top: 6px;
          display: flex;
          align-items: center;
          input {
            width: 100%;
            height: 100%;
            border: 1px solid #cfcfd2;
            border-radius: 6px;
            padding: 0 100px 0 12px;
            font-size: 14px;
            color: #17173a;
          }
          input:focus {
            border: 1px solid #fd7e14;
          }
          span {
            position: absolute;
            display: block;
            right: 12px;
            padding: 6px 8px;
            border: 1px solid #fd7e14;
            border-radius: 6px;
            font-size: 12px;
            color: #fd7e14;
            cursor: pointer;
            &:hover {
              color: #ff8200;
            }
          }
        }
      }
      > .button {
        > button {
          font-weight: 550;
          border-radius: 6px;
        }

        > p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: rgba(23, 23, 58, 0.4);
          margin-top: 8px;
          span:nth-of-type(2) {
            color: #17173a;
            font-weight: 550;
          }
        }
        > a {
          font-size: 14px;
          font-weight: 550;
          color: #fd7e14;
          margin-top: 8px;
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
}
@media screen and (max-width: 750px) {
  .ContractAddress {
    p {
      font-size: 12px;
    }
  }
  .flash_pool {
    width: 100%;
    margin-bottom: 20px;
    background: #ffffff;
    padding: 40px 16px;
    position: relative;
    border-radius: 10px;
    > .miningTime {
      position: absolute;
      left: 75%;
      top: 10px;
      font-size: 14px;
      transform: translateX(5%);
    }
    > img {
      position: absolute;
      width: 36px;
      height: 36px;
      top: 0;
      transform: translateY(-5px);
    }
    .finished {
      width: 102px;
      height: 102px;
      top: 0;
      right: 0;
      transform: translateY(0);
    }
    .circle {
      width: 102px;
      height: 102px;
      top: 0;
      transform: translateY(0);
    }
    .right {
      right: 0;
    }
    .left {
      left: 0;
    }
    > h3 {
      text-align: center;
    }
    .text {
      .coin {
        display: flex;
        flex-direction: column;
        h3 {
          display: flex;
          align-items: center;
          img {
            width: 54px;
            height: 54px;
            margin-right: 8px;
          }
          > div {
            display: flex;
            font-size: 14px;
            flex-direction: column;
            width: 80%;
            img {
              margin-left: 4px;
              width: 32px;
              height: 32px;
            }
            span {
              padding-right: 60px;
            }
            > div {
              display: flex;
              .onepager {
                margin: 8px 0;
                align-self: flex-start;
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
              > .starttime {
                display: none;
              }
            }
          }
        }
        > .starttime {
          font-size: 14px;
          color: #9b9b9b;
          line-height: 16px;
          display: flex;
          align-items: center;
          margin-bottom: 4px;
          span {
            &:nth-of-type(1) {
              display: flex;
              align-items: center;
              i {
                display: inline-block;
                width: 14px;
                height: 14px;
                background-image: url('../../assets/img/flashmining/miningtime.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                margin-right: 3px;
              }
              color: #9b9b9b;
            }
            &:nth-of-type(2) {
              padding: 1px 3px;
              background: #f7f7fa;
              border-radius: 3px;
              color: #17173a;
              i {
                color: #cfcfd2;
              }
            }
          }
        }
        > div {
          display: flex;
          flex-direction: column;
          > div {
            display: flex;
            p {
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
            color: rgba(23, 23, 58, 0.4);
            font-size: 14px;
            margin: 5px 0;
          }
        }
      }
      .index {
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
              margin-top: 8px;
            }
          }
        }
      }
    }
    .pool {
      display: flex;
      flex-direction: column;
      background: #f7f7fa;
      border-radius: 10px;
      margin-top: 20px;
      padding: 20px 16px;
      box-sizing: border-box;
      min-height: 352px;
      .pool_tab {
        display: flex;
        button {
          min-width: 50%;
          height: 40px;
          border-radius: 6px;
          background: transparent;
          font-weight: 550;
          font-size: 16px;
          margin: 0 4px;
        }
        .deposit_btn {
          color: #28a745;
        }
        .withdraw_btn {
          color: #dc3545;
        }
        .deposit_active {
          color: #ffffff;
          background: #28a745;
        }
        .withdraw_active {
          color: #ffffff;
          background: #dc3545;
        }
      }
      .pool_content {
        .deposit,
        .withdraw {
          > .title {
            p {
              font-size: 13px;
              margin: 12px 0 10px 0;
            }
          }
          > .content {
            label {
              font-size: 14px;
              color: rgba(23, 23, 58, 0.4);
            }
            .input {
              width: 100%;
              height: 40px;
              position: relative;
              margin-top: 6px;
              display: flex;
              align-items: center;
              input {
                width: 100%;
                height: 100%;
                border: 1px solid #cfcfd2;
                border-radius: 6px;
                padding: 0 100px 0 12px;
                font-size: 14px;
                color: #17173a;
              }
              input:focus {
                border: 1px solid #fd7e14;
              }
              span {
                position: absolute;
                display: block;
                right: 12px;
                padding: 6px 8px;
                border: 1px solid #fd7e14;
                border-radius: 6px;
                font-size: 12px;
                color: #fd7e14;
                cursor: pointer;
                &:hover {
                  color: #ff8200;
                }
              }
            }
          }
          > .button {
            > button {
              font-weight: 550;
              border-radius: 6px;
            }
            > p {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 13px;
              color: rgba(23, 23, 58, 0.4);
              margin-top: 8px;
              span:nth-of-type(2) {
                color: #17173a;
                font-weight: 550;
              }
            }
            > a {
              font-size: 13px;
              font-weight: 550;
              color: #fd7e14;
              margin-top: 8px;
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
    }
  }
}
</style>
