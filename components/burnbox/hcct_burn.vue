<template>
  <div class="burnbox">
    <div class="burn_wrap">
      <div class="process">
        <div class="name">
          <span>{{ $t('Table.FireProcess') }}</span>
          <span style="display: flex">
            <span>{{ isLogin ? list.rewards : '--' }}</span>
            /
            <span>{{ isLogin ? list.bonusValue : '--' }}</span>
          </span>
        </div>
        <div class="control">
          <div class="control_wrap">
            <div
              class="control_real"
              :style="`width:${list.process}%;max-width:100%`"
            >
              <i class="fire" v-if="list.process != 0"></i>
            </div>
          </div>
        </div>
      </div>
      <p>
        <span>{{ $t('Table.DAvailable') }}</span>
        <span>
          <countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(balance.Deposite)"
            :duration="2000"
            :decimals="8"
          />
          <span v-else>--</span>
          HCCT
        </span>
      </p>
      <div class="input">
        <input
          type="text"
          v-model="DepositeNum"
          :style="
            DepositeNum == balance.Deposite
              ? 'border: 1px solid #fd7e14 !important'
              : ''
          "
        />
        <p>
          <span>HCCT</span>|<i @click="DepositeNum = balance.Deposite">{{
            $t('Table.Max')
          }}</i>
        </p>
      </div>
      <div class="text">
        <p>
          <span>{{ $t('Table.MyBurn') }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.Withdraw)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;hCTK</span
          >
        </p>
        <p>
          <span>{{ $t('Table.TotalBurn') }}</span>
          <span>
            <countTo
              v-if="isLogin"
              :startVal="Number(0)"
              :endVal="Number(balance.TotalLPT)"
              :duration="2000"
              :decimals="4"
            />
            <span v-else>--</span>
            &nbsp;hCTK</span
          >
        </p>
        <p class="bigsize">
          <span>{{ $t('Table.MyPoolShare') }} </span>
          <span> {{ isLogin ? balance.Share : '--' }} % </span>
        </p>
      </div>
      <button
        class="submit_burn"
        @click="toDeposite"
        :style="
          expired ? 'background: #ccc !important; pointer-events: none' : ''
        "
      >
        <i :class="stakeLoading ? 'loading_pic' : ''"></i>{{ $t('Table.Burn') }}
      </button>
      <div class="ContractAddress">
        <span>HCCT {{ $t('Table.ContractAddress') }}</span>
        <p>
          0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0xf1be411556e638790dcdecd5b0f8f6d778f2dfd5')
            "
          ></i>
        </p>
      </div>
    </div>
    <div class="claim_wrap">
      <div class="process"></div>
      <p>
        <span>HCCTII {{ $t('Table.HELMETRewards') }}</span>
        <span
          ><countTo
            v-if="isLogin"
            :startVal="Number(0)"
            :endVal="Number(balance.Earn)"
            :duration="2000"
            :decimals="8"
          />
          HCCTII</span
        >
      </p>
      <div class="input">
        <input
          v-if="isLogin"
          type="text"
          v-model="balance.Earn"
          disabled
          style="border: 1px solid #fd7e14 !important"
        />
        <input
          v-else
          type="text"
          disabled
          style="border: 1px solid #fd7e14 !important"
        />
        <p>
          <span>HCCTII</span>|<i
            @click="WithdrawNum = balance.Earn"
            style="background: rgba(255, 150, 0, 0.1)"
            >{{ $t('Table.Max') }}</i
          >
        </p>
      </div>

      <button class="submit_burn" @click="toClaim">
        <i :class="claimLoading ? 'loading_pic' : ''"></i
        >{{ $t('Table.Claim') }}
      </button>
      <div class="ContractAddress">
        <span>HCCTII {{ $t('Table.ContractAddress') }}</span>
        <p>
          0x9065fcbb5f73b908ac4b05bdb81601eec2065522
          <i
            class="copy"
            id="copy_default"
            @click="
              copyAdress($event, '0x9065fcbb5f73b908ac4b05bdb81601eec2065522')
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
import { fixD, addCommom, autoRounding, toRounding } from '~/assets/js/util.js'
import precision from '~/assets/js/precision.js'
import countTo from 'vue-count-to'
import ClipboardJS from 'clipboard'
import Message from '~/components/common/Message'
export default {
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: 'HCCT Burning Box',
        endTime: '2021/03/19 00:00',
        startTime: '2021/03/12 00:00',
        bonusValue: 100000,
        DownTime: {
          day: '00',
          hour: '00',
        },
        rewards: 0,
        process: 0,
      },
      balance: {
        Deposite: 0,
        Withdraw: 0,
        Earn: 0,
        TotalLPT: 0,
        Share: 0,
      },
      DepositeNum: '',
      MingTime: {
        hour: '00',
        minute: '00',
        second: '00',
      },
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
      actionType: 'burn',
      isLogin: false,
      expired: false,
      openMining: false,
    }
  },
  watch: {
    userInfo: {
      handler: 'userInfoWatch',
      immediate: true,
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  mounted() {
    this.$bus.$on('DEPOSITE_LOADING_BURNHCCT', (data) => {
      this.stakeLoading = data.status
      this.DepositeNum = ''
    })
    this.$bus.$on('CLAIM_LOADING_BURNHCCT', (data) => {
      this.claimLoading = false
    })
    this.$bus.$on('RELOAD_DATA_BURNHCCT', () => {
      this.getBalance()
    })
    this.$bus.$on('SHOW_HCCT_BURN_ONEPAGER', () => {
      this.showOnepager()
    })
    setTimeout(() => {
      this.getDownTime()
      this.getMiningTime()
      this.getBalance()
      this.getProcess()
    }, 1000)
    if (!this.expired) {
      setInterval(() => {
        setTimeout(() => {
          this.getDownTime()
          this.getMiningTime()
        })
        clearTimeout()
      }, 1000)
      setInterval(() => {
        setTimeout(() => {
          this.getProcess()
        })
      }, 20000)
    }
    this.$bus.$on('REFRESH_MINING', (data) => {
      this.getBalance()
    })
  },
  methods: {
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
    userInfoWatch(newValue) {
      if (newValue) {
        this.isLogin = newValue.data.isLogin
      }
    },
    showOnepager() {
      this.$bus.$emit('OPEN_ONEPAGER', {
        showFlag: true,
        title: 'What is $HCCTII?',
        text: [
          'HCCTII is the call option of HELMET.',
          'Total Supply: 500,000 (400,000 for CAKE miners on PancakeSwap; 100,000 for Burning BOX on helmet.insure) ',
          'Reasonable activate price: 1 HELMET = 0.1CAKE',
          'Expire date: Apr. 8th 24:00 SGT',
          "Example: If you get 1 HCCT II, you could swap 0.1 CAKE to 1 HELMET by click the 'activate' button on TradingView Tab. To be specific, if HELMET hit $2 and CAKE hit $15, you could get $0.5 profit by this 'Activate' behavior.",
        ],
      })
    },
    async getBalance() {
      let helmetType = 'BURNHCCT_LPT'
      let type = 'BURNHCCT'
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
      this.balance.Earn = fixD(Helmet, 8)
      this.balance.TotalLPT = fixD(TotalLPT, 8)
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2)
    },
    //   获取矿池结束倒计时
    getDownTime() {
      let now = new Date() * 1
      let dueDate = this.list.endTime
      dueDate = new Date(dueDate) * 1
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
        this.actionType = 'claim'
      }
      this.list.DownTime = template
    },
    getMiningTime() {
      let now = new Date() * 1
      let dueDate = '2021/03/12 00:00'
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
      hour = hour + day * 24
      let template = {}
      if (dueDate < now) {
        template = {
          hour: '00',
          minute: '00',
          second: '00',
        }
        this.openMining = true
      } else {
        template = {
          hour: hour > 9 ? hour : '0' + hour,
          minute: minute > 9 ? minute : '0' + minute,
          second: second > 9 ? second : '0' + second,
        }
      }
      this.MingTime = template
    },
    getProcess() {
      let now = new Date() * 1
      let startTime = new Date(this.list.startTime) * 1
      let endTime = new Date(this.list.endTime) * 1
      let process = precision.divide(now - startTime, endTime - startTime)
      if (this.expired) {
        this.list.process = 100
        this.list.rewards = this.list.bonusValue
      } else {
        this.list.process = process > 0 ? fixD(process * 100, 2) : 0
        this.list.rewards = process > 0 ? fixD(process * 100000, 4) : 0
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
      let type = 'BURNHCCT'
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {})
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return
      }
      this.claimLoading = true
      let type = 'BURNHCCT'
      let res = await getPAYA(type)
    },
  },
}
</script>

<style lang="scss" scoped>
.loading_pic {
  display: block;
  width: 24px;
  height: 24px;
  background-image: url('../../assets/img/helmet/loading.png');
  background-repeat: no-repeat;
  background-size: cover;
  animation: loading 2s 0s linear infinite;
}
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
@media screen and (min-width: 750px) {
  .burnbox {
    padding: 40px 0;
    display: flex;
    justify-content: space-evenly;
    .process {
      height: 70px;
    }
    .burn_wrap {
      > .process {
        display: flex;
        flex-direction: column;
        > .name {
          padding: 0 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          > span {
            &:nth-of-type(1) {
              font-size: 12px;
              color: #9b9b9b;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              color: #000000;
            }
          }
        }
        > .control {
          width: 100%;
          .control_wrap {
            margin-top: 10px;
            width: 100%;
            height: 6px;
            border-radius: 6px;
            background: #fff;
            .control_real {
              height: 100%;
              border-radius: 6px;
              background: #fd7e14;
              position: relative;
              .fire {
                display: block;
                width: 20px;
                height: 20px;
                background-image: url('../../assets/img/burnmining/fire.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                position: absolute;
                top: 100%;
                right: 0;
              }
            }
          }
        }
      }
      > p {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #9b9b9b;
        > span {
          &:nth-of-type(1) {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: rgba(23, 23, 58, 0.7);
            line-height: 14px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            font-family: IBMPlexSans-Bold, IBMPlexSans;
            font-weight: bold;
            color: #17173a;
            line-height: 14px;
          }
        }
      }
      > .input {
        margin-top: 20px;
        width: 100%;
        height: 40px;
        position: relative;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          height: 100%;
          background: transparent;
          padding: 0 150px 0 12px;
          font-size: 14px;
          color: #9b9b9b;
          border-radius: 6px;
          border: 1px solid #e8e8eb;
          &:focus {
            border: 1px solid #fd7e14;
          }
        }
        p {
          position: absolute;
          right: 12px;
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            font-weight: 600;
            color: #17173a;
            margin-right: 12px;
          }
          i {
            display: inline-block;
            padding: 6px 8px;
            border-radius: 6px;
            border: 1px solid #fd7e14;
            font-size: 12px;
            color: #fd7e14;
            margin-left: 12px;
            cursor: pointer;
          }
        }
      }
      .text {
        display: flex;
        align-items: center;
        flex-direction: column;
        > p {
          display: flex;
          margin-top: 14px;
          justify-content: space-between;
          width: 100%;
          align-items: center;
          &:last-child {
            text-align: right;
          }
          > span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              color: rgba(23, 23, 58, 0.7);
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-family: IBMPlexSans;
              color: #17173a;
              line-height: 14px;
              font-weight: 500;
            }
          }
        }
      }
      .submit_burn {
        width: 100%;
        height: 40px;
        background: #17173a;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
    .claim_wrap {
      > p {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #9b9b9b;
        > span {
          &:nth-of-type(1) {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: rgba(23, 23, 58, 0.7);
            line-height: 14px;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            font-family: IBMPlexSans-Bold, IBMPlexSans;
            font-weight: bold;
            color: #17173a;
            line-height: 14px;
          }
        }
      }
      > .input {
        margin-top: 20px;
        width: 100%;
        height: 40px;
        position: relative;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          height: 100%;
          background: transparent;
          padding: 0 150px 0 12px;
          font-size: 14px;
          color: #9b9b9b;
          border: 1px solid #e8e8eb;
          border-radius: 6px;
          &:focus {
            border: 1px solid #fd7e14;
          }
        }
        p {
          position: absolute;
          right: 12px;
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            font-weight: 600;
            color: #17173a;
            margin-right: 12px;
          }
          i {
            display: inline-block;
            padding: 6px 8px;
            border-radius: 6px;
            border: 1px solid #fd7e14;
            font-size: 12px;
            color: #fd7e14;
            margin-left: 12px;
            cursor: pointer;
          }
        }
      }
      .text {
        display: flex;
        justify-content: flex-start;
        margin-top: 14px;
        > p {
          display: flex;
          flex-direction: column;
          > span {
            &:nth-of-type(1) {
              font-size: 12px;
              color: #9b9b9b;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-weight: bold;
              color: #17173a;
              margin-top: 10px;
            }
          }
        }
      }
      .submit_burn {
        width: 100%;
        height: 40px;
        background: #17173a;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .expiredBg {
    background-image: url('../../assets/img/burnmining/expired_h5_bg.png');
  }
  .activeBg {
    background-image: url('../../assets/img/burnmining/burn_h5bg.png');
  }
  .ContractAddress {
    font-size: 12px;
  }
  .burnbox {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-bottom: 50px;
    position: relative;
    padding: 14% 14% 20px 20px;
    min-height: 470px;
    width: 100%;
    > .coin {
      width: 64px;
      height: 64px;
      position: absolute;
      left: 50%;
      top: -45px;
      transform: translateX(-50%);
    }
    > .title {
      height: 50px;
      display: flex;
      justify-content: space-between;
      > .pool_detail {
        h3 {
          font-size: 18px;
          color: #17173a;
          line-height: 25px;
          display: flex;
          align-items: center;
          i {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url('../../assets/img/helmet/icon_long.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin-left: 3px;
            cursor: pointer;
          }
        }
        > span {
          font-size: 14px;
          color: #9b9b9b;
          display: flex;
          align-items: center;
          margin-top: 4px;
          span {
            font-size: 14px;
            font-weight: bold;
            color: #17173a;
          }
          img {
            width: 24px;
            height: 24px;
            margin-left: 4px;
          }
        }
      }
      > .pool_time {
        padding-top: 8px;
        text-align: right;
        > h3 {
          font-size: 12px;
          color: #ffffff;
          padding: 2px 5px;
          background: #fd7e14;
          border-radius: 3px;
          font-weight: normal;
        }
        span {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 4px;
          i {
            display: inline-block;
            padding: 2px 1px;
            background: #ffe3bb;
            font-size: 12px;
            font-weight: 600;
            color: #22292f;
          }
          b {
            margin: 0 2px;
            font-weight: 600;
          }
        }
      }
    }
    > .text {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;

      > p {
        display: flex;
        flex-direction: column;
        &:first-child {
          span {
            &:nth-of-type(1) {
              display: flex;
              align-items: center;
              i {
                display: inline-block;
                width: 12px;
                height: 12px;
                background-image: url('../../assets/img/flashmining/miningtime.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                margin-right: 3px;
              }
            }
            &:nth-of-type(2) {
              padding: 1px 4px;
              background: #ffe3bb;
              border-radius: 3px;
              color: #17173a;
              display: flex;
              align-self: baseline;
            }
          }
        }
        &:last-child {
          text-align: right;
        }
        > span {
          &:nth-of-type(1) {
            font-size: 12px;
            color: #9b9b9b;
          }
          &:nth-of-type(2) {
            font-size: 14px;
            font-weight: bold;
            color: #17173a;
            margin-top: 4px;
          }
        }
      }
    }
    > .process {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
      > .name {
        padding: 0 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > span {
          &:nth-of-type(1) {
            font-size: 12px;
            color: #9b9b9b;
          }
          &:nth-of-type(2) {
            font-size: 12px;
            color: #000000;
          }
        }
      }
      > .control {
        width: 100%;
        .control_wrap {
          margin-top: 10px;
          width: 100%;
          height: 14px;
          border-radius: 6px;
          background: #fff;
          .control_real {
            height: 100%;
            border-radius: 6px;
            background: #dc3545;
            position: relative;
            .fire {
              display: block;
              width: 20px;
              height: 20px;
              background-image: url('../../assets/img/burnmining/fire.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              position: absolute;
              top: 100%;
              right: 0;
            }
          }
        }
      }
    }
    .button_wrap {
      width: 100%;
      height: 40px;
      display: flex;
      background: #fff7ec;
      border-radius: 10px;
      align-items: center;
      padding: 0 3px;
      margin-top: 20px;
      button {
        flex: 1;
        height: 34px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        background: #fff7ec;
        color: #17173a;
      }
      .active {
        background: #fd7e14;
        color: #fff;
      }
    }
    .burn_wrap {
      margin-top: 10px;
      > p {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #9b9b9b;
      }
      > .input {
        margin-top: 4px;
        width: 100%;
        height: 40px;
        position: relative;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          height: 100%;
          background: transparent;
          padding: 0 150px 0 12px;
          font-size: 14px;
          color: #9b9b9b;
          border: 1px solid #17173a;
          border-radius: 6px;
          &:focus {
            border: 1px solid #fd7e14;
          }
        }
        p {
          position: absolute;
          right: 12px;
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            font-weight: 600;
            color: #17173a;
            margin-right: 12px;
          }
          i {
            display: inline-block;
            padding: 6px 8px;
            border-radius: 6px;
            border: 1px solid #fd7e14;
            font-size: 12px;
            color: #fd7e14;
            margin-left: 12px;
            cursor: pointer;
          }
        }
      }
      .text {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        > p {
          display: flex;
          flex-direction: column;
          &:last-child {
            text-align: right;
          }
          > span {
            &:nth-of-type(1) {
              font-size: 12px;
              color: #9b9b9b;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-weight: bold;
              color: #17173a;
              margin-top: 5px;
            }
          }
        }
      }
      .submit_burn {
        width: 100%;
        height: 40px;
        background: #17173a;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
    .claim_wrap {
      margin-top: 28px;
      > p {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #9b9b9b;
      }
      > .input {
        width: 100%;
        height: 40px;
        position: relative;
        display: flex;
        align-items: center;
        input {
          width: 100%;
          height: 100%;
          background: transparent;
          padding: 0 150px 0 12px;
          font-size: 14px;
          color: #9b9b9b;
          border: 1px solid #17173a;
          border-radius: 6px;
          &:focus {
            border: 1px solid #fd7e14;
          }
        }
        p {
          position: absolute;
          right: 12px;
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            font-weight: 600;
            color: #17173a;
            margin-right: 12px;
          }
          i {
            display: inline-block;
            padding: 6px 8px;
            border-radius: 6px;
            border: 1px solid #fd7e14;
            font-size: 12px;
            color: #fd7e14;
            margin-left: 12px;
            cursor: pointer;
          }
        }
      }
      .text {
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
        > p {
          display: flex;
          flex-direction: column;
          > span {
            &:nth-of-type(1) {
              font-size: 12px;
              color: #9b9b9b;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-weight: bold;
              color: #17173a;
              margin-top: 5px;
            }
          }
        }
      }
      .submit_burn {
        width: 100%;
        height: 40px;
        background: #17173a;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #2c2c2c;
        }
      }
    }
  }
}
</style>
