<template>
  <div class="bnb500_pool">
    <!-- <span class="miningTime"> {{ MingTime }}</span> -->
    <img src="~/assets/img/helmet/star.png" alt="" />
    <img class="circle left" src="~/assets/img/helmet/leftCircle.png" alt="" />
    <div class="text">
      <div class="coin">
        <h3>
          <span>{{ list.name }}</span>
          <p @click="showOnepager"><i></i>What is BNB500 token？</p>
        </h3>
        <div>
          <!-- <div>
            <p>
              <img src="~/assets/img/helmet/hctkCoin.png" alt="" />
              50%
              <span> hCTK </span>
            </p>
            <p>
              <img src="~/assets/img/helmet/helmetCoin.png" alt="" />
              50%
              <span> HELMET </span>
            </p>
          </div> -->
          <p>
            <span>
              {{ $t("Table.SurplusTime") }}：
              <span>
                {{ list.DownTime }}
              </span>
            </span>
          </p>
        </div>
      </div>
      <div class="index">
        <p v-for="(item, index) in textList" :key="index">
          <span>{{ item.text }}</span>
          <span :style="`color:${item.color}`">{{ item.num }} </span>
        </p>
      </div>
    </div>
    <div class="pool">
      <div class="pool_tab">
        <button
          :class="
            actionType == 'deposit'
              ? 'deposit_btn deposit_active'
              : 'deposit_btn'
          "
          @click="actionType = 'deposit'"
        >
          {{ $t("Table.Deposit") }}
        </button>
        <button
          :class="
            actionType == 'withdraw'
              ? 'withdraw_btn withdraw_active'
              : 'withdraw_btn'
          "
          @click="actionType = 'withdraw'"
        >
          {{ $t("Table.Claim") }}
        </button>
      </div>
      <div class="pool_content">
        <div class="deposit" v-if="actionType == 'deposit'">
          <div class="title">
            <p>
              <countTo
                :startVal="Number(0)"
                :endVal="Number(balance.Deposite)"
                :duration="2000"
                :decimals="8"
              />
              LPT
              {{ $t("Table.DAvailable") }}
            </p>
          </div>
          <div class="content">
            <label for="deposit">{{ $t("Table.AmountDeposit") }}</label>
            <div class="input">
              <input name="deposit" type="text" v-model="DepositeNum" />
              <span @click="DepositeNum = balance.Deposite">{{
                $t("Table.Max")
              }}</span>
            </div>
          </div>
          <div class="button">
            <button
              @click="toDeposite"
              :class="stakeLoading ? 'disable b_button' : 'b_button'"
            >
              <i :class="stakeLoading ? 'loading_pic' : ''"></i
              >{{ $t("Table.ConfirmDeposit") }}
            </button>
            <p>
              <span
                >{{ $t("Table.MyDeposits") }}/{{
                  $t("Table.TotalDeposited")
                }}：</span
              >
              <span style="display: flex; align-self: flex-start">
                <countTo
                  :startVal="Number(0)"
                  :endVal="Number(balance.Withdraw)"
                  :duration="2000"
                  :decimals="4"
                />
                /
                <countTo
                  :startVal="0"
                  :endVal="Number(balance.TotalLPT)"
                  :duration="2000"
                  :decimals="4"
                />
                LPT
              </span>
            </p>
            <p>
              <span>My Pool Share：</span>
              <span> {{ balance.Share }} %</span>
            </p>
            <a
              href="https://exchange.pancakeswap.finance/?_gl=1*1p30wvd*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMzY1MjU0OS40OC4xLjE2MTM2NTI3NzMuMA..#/add/0x936909e72951A19a5e1d75A109B0D34f06f39838/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8"
              target="_blank"
              >Get hCTK-HELMET LPT</a
            >
          </div>
          <div class="ContractAddress">
            <span>hCTK Contract Address：</span>
            <p>
              0x936909e72951A19a5e1d75A109B0D34f06f39838
              <i
                class="copy"
                id="copy_default"
                @click="
                  copyAdress(
                    $event,
                    '0x936909e72951A19a5e1d75A109B0D34f06f39838'
                  )
                "
              ></i>
            </p>
          </div>
        </div>
        <div class="withdraw" v-if="actionType == 'withdraw'">
          <div class="title">
            <p>
              <countTo
                :startVal="Number(0)"
                :endVal="Number(balance.Withdraw)"
                :duration="2000"
                :decimals="8"
              />
              LPT {{ $t("Table.WAvailable") }}
            </p>
          </div>
          <div class="content">
            <label for="withdraw">{{ $t("Table.AmountWithdraw") }}</label>
            <div class="input">
              <input
                name="withdraw"
                type="text"
                v-model="balance.Withdraw"
                disabled
              />
              <!-- <input name="withdraw" type="text" v-model="WithdrawNum" /> -->
              <span @click="WithdrawNum = balance.Withdraw">{{
                $t("Table.Max")
              }}</span>
            </div>
          </div>
          <div class="button">
            <button
              @click="toExit"
              :class="exitLoading ? 'disable b_button' : 'b_button'"
            >
              <i :class="exitLoading ? 'loading_pic' : ''"></i
              >{{ $t("Table.ConfirmWithdraw") }} &
              {{ $t("Table.ClaimRewards") }}
            </button>
            <p>
              <span>BNB500 {{ $t("Table.HELMETRewards") }}：</span>
              <span>
                <span>
                  <countTo
                    :startVal="Number(0)"
                    :endVal="Number(balance.hCTK)"
                    :duration="2000"
                    :decimals="8"
                  />
                  BNB500</span
                >
              </span>
            </p>
            <button
              @click="toClaim"
              :class="claimLoading ? 'disable o_button' : 'o_button'"
            >
              <i :class="claimLoading ? 'loading_pic' : ''"></i
              >{{ $t("Table.ClaimAllRewards") }}
            </button>
          </div>
          <div class="ContractAddress">
            <span>BNB500 Contract Address：</span>
            <p>
              0xe204c4c21c6ed90e37cb06cb94436614f3208d58
              <i
                class="copy"
                id="copy_default"
                @click="
                  copyAdress(
                    $event,
                    '0xe204c4c21c6ed90e37cb06cb94436614f3208d58'
                  )
                "
              ></i>
            </p>
          </div>
        </div>
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
} from "~/interface/deposite";
import precision from "~/assets/js/precision.js";
import { fixD, addCommom, autoRounding, toRounding } from "~/assets/js/util.js";
import { uniswap } from "~/assets/utils/address-pool.js";
import Message from "~/components/common/Message";
import ClipboardJS from "clipboard";
import countTo from "vue-count-to";
export default {
  components: {
    countTo,
  },
  data() {
    return {
      list: {
        name: "BNB500 Pool (By hCTK-Helmet LPT)",
        dueDate: "2021-02-29 00:00",
        DownTime: "--",
      },
      textList: [
        {
          text: this.$t("Table.RewardsDistribution") + "（weekly）",
          num: 0,
          color: "#00B900",
          unit: "",
        },
        {
          text: this.$t("Table.PoolAPR"),
          num: 0,
          color: "#00B900",
          unit: "",
        },
        //  {
        //   text: this.$t('Table.TotalDeposited'),
        //   num: 0,
        //   color: '#121212',
        //   unit: ''
        // },
        //  {
        //   text: this.$t('Table.MyDeposits'),
        //   num: 0,
        //   color: '#121212',
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
        hCTK: 0,
        TotalLPT: 0,
        Share: 0,
      },
      DepositeNum: "",
      WithdrawNum: "",
      stakeLoading: false,
      claimLoading: false,
      exitLoading: false,
      helmetPrice: 0,
      apy: 0,
      MingTime: 0,
      actionType: "deposit",
      fixD,
    };
  },
  mounted() {
    setInterval(() => {
      setTimeout(() => {
        this.getMiningTime();
        this.getDownTime();
      });
      clearTimeout();
    }, 1000);
    this.$bus.$on("DEPOSITE_LOADING_BNB500POOL", (data) => {
      this.stakeLoading = data.status;
      this.DepositeNum = "";
    });
    this.$bus.$on("CLAIM_LOADING_BNB500POOL", (data) => {
      this.claimLoading = false;
    });
    this.$bus.$on("EXIT_LOADING_BNB500POOL", (data) => {
      this.exitLoading = false;
    });
    this.$bus.$on("RELOAD_DATA_BNB500POOL", () => {
      this.getBalance();
    });
    setTimeout(() => {
      this.getBalance();
      this.getAPY();
    }, 1000);
    setInterval(() => {
      setTimeout(() => {
        this.getAPY();
      });
    }, 20000);
  },
  watch: {
    indexArray: {
      handler: "WatchIndexArray",
      immediate: true,
    },
    apy(newValue, value) {
      this.apy = newValue;
    },
  },
  computed: {
    indexArray() {
      return this.$store.state.allIndexPrice;
    },
  },
  methods: {
    showOnepager() {
      this.$bus.$emit("OPEN_ONEPAGER", {
        showFlag: true,
        title: "What is $BNB500?",
        text: [
          "$BNB500 is BNB cover miss out policy.",
          "Limited edition: 1500 ( 500 for Airdrop to LP Miners on helmet.insure and 1000 for Flash Mining)",
          "In this policy, we set a ratio: ",
          "BNB : BUSD = 1:500 ",
          "it means that you could swap 500 BUSD+1$BNB500 to 1BNB. It is the reasonable active price, for example, if BNB hit $600, you could active the policy and swap 500 BUSD + 1 $BNB500 to 1 BNB with 100BUSD profit.",
          "Flash Mining Type: ",
          "$hCTK-$Helmet LP Mining Pool Notice: $hCTK will be expired on 20th Feb. 0:00 SGT , you could activate it ASAP or take part in $BNB500 Flash Mining.",
          "Flash Mining Start: 18th Feb. 24:00 SGT",
          "Flash Mining End: 28th Feb. 24:00 SGT",
          "Expire date: 20th Mar. 24:00 SGT",
        ],
      });
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
    WatchIndexArray(newValue, value) {
      if (newValue) {
        this.getAPY();
      }
    },
    getDownTime() {
      let now = new Date() * 1;
      let dueDate = this.list.dueDate;
      dueDate = new Date(dueDate);
      let DonwTime = dueDate - now;
      let day = Math.floor(DonwTime / (24 * 3600000));
      let hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000);
      let minute = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
      );
      let second = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      );
      let template;
      if (dueDate > now) {
        template = `${day}${this.$t("Content.DayD")} ${hour}${this.$t(
          "Content.HourD"
        )}`;
      } else {
        template = `${0}${this.$t("Content.DayD")} ${0}${this.$t(
          "Content.HourD"
        )}`;
      }
      this.list.DownTime = template;
    },
    getMiningTime() {
      let now = new Date() * 1;
      let dueDate = "2021-02-19 00:00";
      dueDate = new Date(dueDate);
      let DonwTime = dueDate - now;
      let day = Math.floor(DonwTime / (24 * 3600000));
      let hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000);
      let minute = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
      );
      let second = Math.floor(
        (DonwTime - day * 24 * 3600000 - hour * 3600000 - minute * 60000) / 1000
      );
      let template;
      if (dueDate < now) {
        template = `${0}${this.$t("Content.HourD")} ${0}${this.$t(
          "Content.MinD"
        )} ${0}${this.$t("Content.SecondD")}`;
      } else {
        template = `${hour}${this.$t("Content.HourD")} ${minute}${this.$t(
          "Content.MinD"
        )} ${second}${this.$t("Content.SecondD")}`;
      }
      this.MingTime = template;
    },
    async getAPY() {
      let HCTKHELMET = await uniswap("WBNB", "HELMET"); //Hlemt价格
      let HctkVolume = await totalSupply("BNB500POOL"); //数量
      let LptVolume = await totalSupply("BNB500POOL_LPT"); //发行
      let HelmetValue = await balanceOf("HELMET", "BNB500POOL_LPT", true);
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
      );
      this.apy = apy ? apy : 0;
      this.textList[1].num = this.apy + "%";
    },
    async getBalance() {
      let helmetType = "BNB500POOL_LPT";
      let type = "BNB500POOL";
      // 可抵押数量
      let Deposite = await getBalance(helmetType);
      // 可赎回数量
      let Withdraw = await getLPTOKEN(type);
      // 总抵押
      let TotalLPT = await totalSupply(type);
      // 可领取Helmet
      let Helmet = await CangetPAYA(type);
      // 总Helmet
      // let LptVolume = await totalSupply(helmetType); //发行

      this.balance.Deposite = fixD(Deposite, 8);
      this.balance.Withdraw = fixD(Withdraw, 8);
      this.balance.hCTK = fixD(Helmet, 8);
      this.balance.TotalLPT = fixD(TotalLPT, 8);
      this.balance.Share = fixD((Withdraw / TotalLPT) * 100, 2);
      this.textList[0].num = fixD((1000 / 10) * 7, 2) + " BNB500";
    },
    // 抵押
    toDeposite() {
      if (!this.DepositeNum) {
        return;
      }
      if (this.stakeLoading) {
        return;
      }
      this.stakeLoading = true;
      let type = "BNB500POOL";
      toDeposite(type, { amount: this.DepositeNum }, true, (status) => {});
    },
    // 结算Paya
    async toClaim() {
      if (this.claimLoading) {
        return;
      }
      this.claimLoading = true;
      let type = "BNB500POOL";
      let res = await getPAYA(type);
    },
    // 退出
    async toExit() {
      if (this.exitLoading) {
        return;
      }
      this.exitLoading = true;
      let type = "BNB500POOL";
      let res = await exitStake(type);
    },
  },
};
</script>

<style lang='scss' soped>
.ContractAddress {
  font-size: 14px;
  color: #ff9600;
  margin-top: 8px;
  span {
    color: #121212;
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
    background-image: url("../../assets/img/helmet/copy.png");
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
  background-image: url("../../assets/img/helmet/loading.png");
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
  .bnb500_pool {
    width: 500px;
    margin-bottom: 20px;
    background: #ffffff;
    padding: 40px;
    position: relative;
    border-radius: 10px;
    > .miningTime {
      position: absolute;
      left: 75%;
      top: 10px;
      font-size: 20px;
      transform: translateX(5%);
    }
    > img {
      position: absolute;
      width: 36px;
      height: 36px;
      top: 0;
      transform: translateY(-5px);
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
          font-size: 22px;
          line-height: 32px;
          flex-direction: column;
          margin-bottom: 10px;
          img {
            margin-left: 4px;
            width: 32px;
            height: 32px;
          }
          p {
            height: 16px;
            background: rgba(255, 150, 0, 0.1);
            border-radius: 8px;
            font-size: 12px;
            color: #ff9600;
            line-height: 16px;
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-top: 3px;
            align-self: flex-start;
            &:hover {
              color: #ff8200;
            }
            i {
              display: inline-block;
              width: 16px;
              height: 16px;
              background-image: url("../../assets/img/helmet/icon_long.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin-right: 3px;
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
              color: #121212;
              font-size: 14px;
              margin-right: 14px;
              img {
                width: 32px;
                height: 32px;
                margin-right: 4px;
              }
              span {
                margin-left: 4px;
                color: #919aa6;
              }
            }
          }
          > p {
            color: #919aa6;
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
              color: #919aa6;
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
      padding: 20px 30px;
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
          color: #00b900;
        }
        .withdraw_btn {
          color: #ff6400;
        }
        .deposit_active {
          color: #ffffff;
          background: #00b900;
        }
        .withdraw_active {
          color: #ffffff;
          background: #ff6400;
        }
      }
      .pool_content {
        .deposit,
        .withdraw {
          > .title {
            p {
              font-size: 14px;
              margin: 12px 0 10px 0;
            }
          }
          > .content {
            label {
              font-size: 14px;
              color: #919aa6;
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
                color: #121212;
              }
              input:focus {
                border: 1px solid #ff9600;
              }
              span {
                position: absolute;
                display: block;
                right: 12px;
                padding: 6px 8px;
                border: 1px solid #ff9600;
                border-radius: 6px;
                font-size: 12px;
                color: #ff9600;
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
              color: #919aa6;
              margin-top: 8px;
              span:nth-of-type(2) {
                color: #121212;
                font-weight: 550;
              }
            }
            > a {
              font-size: 14px;
              font-weight: 550;
              color: #ff9600;
              margin-top: 8px;
              display: block;
            }
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
  .bnb500_pool {
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
          font-size: 22px;
          line-height: 32px;
          flex-direction: column;
          width: 80%;
          img {
            margin-left: 4px;
            width: 32px;
            height: 32px;
          }
          p {
            margin: 8px 0;
            align-self: flex-start;
            height: 16px;
            background: rgba(255, 150, 0, 0.1);
            border-radius: 8px;
            font-size: 12px;
            color: #ff9600;
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
              background-image: url("../../assets/img/helmet/icon_long.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin-right: 3px;
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
              color: #121212;
              font-size: 14px;
              margin-right: 14px;
              img {
                width: 32px;
                height: 32px;
                margin-right: 4px;
              }
              span {
                margin-left: 4px;
                color: #919aa6;
              }
            }
          }
          > p {
            color: #919aa6;
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
              color: #919aa6;
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
          color: #00b900;
        }
        .withdraw_btn {
          color: #ff6400;
        }
        .deposit_active {
          color: #ffffff;
          background: #00b900;
        }
        .withdraw_active {
          color: #ffffff;
          background: #ff6400;
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
              color: #919aa6;
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
                color: #121212;
              }
              input:focus {
                border: 1px solid #ff9600;
              }
              span {
                position: absolute;
                display: block;
                right: 12px;
                padding: 6px 8px;
                border: 1px solid #ff9600;
                border-radius: 6px;
                font-size: 12px;
                color: #ff9600;
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
              color: #919aa6;
              margin-top: 8px;
              span:nth-of-type(2) {
                color: #121212;
                font-weight: 550;
              }
            }
            > a {
              font-size: 13px;
              font-weight: 550;
              color: #ff9600;
              margin-top: 8px;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>