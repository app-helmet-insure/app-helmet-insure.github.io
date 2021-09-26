<template>
  <div class="my_policy">
    <div class="policy_title">
      <h3>{{ $t("Type.MyGuarantee") }}</h3>
    </div>
    <Loading v-if="isLoading" :isLoading="isLoading" />
    <div
      class="my_policy_wrap"
      v-if="!isLoading && PolicyList && PolicyList.length"
    >
      <div
        class="policy_item"
        v-for="item in PolicyList.slice(MinNumber, MaxNumber)"
        :key="item.BidID"
      >
        <section class="policy_item_id_web WEB">
          <p>
            <span>{{ $t("Table.ID") }}:{{ item.BidID }}</span>
            <span>{{ item.ShowExpiry }}</span>
          </p>
          <span :class="item.Type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.CallToken }} {{ item.Type }} {{ item.ShowStrikePrice }}
            {{ item.PutToken }}
            {{ item.symbol ? "(" + item.symbol + ")" : "" }}
            <i :class="item.Type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section class="policy_item_strikeprice_web WEB">
          <p>
            <span>{{ $t("Insurance.Insurance_text11") }}: </span>
            <span>{{ item.ShowStrikePrice }} {{ item.PutToken }}</span>
          </p>
          <p>
            <span>{{ $t("Table.Position") }}: </span>
            <span>{{ fixD(item.ShowVolume, 8) }}</span>
          </p>
        </section>
        <section class="policy_item_price_web WEB">
          <p>
            <span>{{ $t("Table.PolicyPrice") }}: </span>
            <span>{{ fixD(item.ShowPrice, 8) }} HELMET</span>
          </p>
          <p>
            <span>{{ $t("Table.Premium") }}: </span>
            <span>{{ fixD(item.Premium, 8) }} HELMET</span>
          </p>
        </section>
        <section class="policy_item_action_web WEB">
          <!-- <button @click="toActive(item)">
            {{
              item.Status == "Expired"
                ? $t("Insurance.Insurance_text13")
                : $t("Table.outSure")
            }}
            <i class="selectDown"></i>
          </button> -->
          <button v-if="item.Status == 'Normal'" @click="toActive(item)">
            {{ $t("Insurance.outSure") }}
            <i class="selectDown"></i>
          </button>
          <button v-if="item.Status == 'Expired'">
            {{ $t("Insurance.Insurance_text13") }}
            <i class="selectDown"></i>
          </button>
        </section>
        <!-- ================= -->
        <section class="policy_item_id_h5 H5">
          <p>
            <span>{{ $t("Table.ID") }}:{{ item.AskID }}</span>
            <span>{{ item.ShowExpiry }}</span>
          </p>
        </section>
        <section class="policy_item_type_h5 H5">
          <span :class="item.Type == 'Call' ? 'call_text' : 'put_text'">
            {{ item.CallToken }} {{ item.Type }} {{ item.ShowStrikePrice }}
            {{ item.PutToken }}
            {{ item.symbol ? "(" + item.symbol + ")" : "" }}
            <i :class="item.Type == 'Call' ? 'call_icon' : 'put_icon'"> </i>
          </span>
        </section>
        <section class="policy_item_price_h5 H5">
          <p>
            <span>{{ $t("Insurance.Insurance_text11") }}: </span>
            <span>{{ item.ShowStrikePrice }} {{ item.PutToken }}</span>
          </p>
          <p>
            <span>{{ $t("Table.PolicyPrice") }}: </span>
            <span>{{ fixD(item.ShowPrice, 8) }} HELMET</span>
          </p>
        </section>
        <section class="policy_item_volume_h5 H5">
          <p>
            <span>{{ $t("Table.Position") }}: </span>
            <span>{{ fixD(item.ShowVolume, 8) }}</span>
          </p>
          <p>
            <span>{{ $t("Table.Premium") }}: </span>
            <span>{{ item.Premium }} HELMET</span>
          </p>
        </section>
        <section class="policy_item_action_h5 H5">
          <button @click="toActive(item)">
            {{
              item.Status == "Expired"
                ? $t("Insurance.Insurance_text13")
                : $t("Table.outSure")
            }}
            <i class="selectDown"></i>
          </button>
        </section>
      </div>
    </div>
    <NoData v-if="!isLoading && (!PolicyList || !PolicyList.length)" />
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="5"
        :hide-on-single-page="PolicyList.length < PageSize"
        :total="PolicyList.length"
        @current-change="changePage"
      >
      </el-pagination>
    </div>
    <WaitingConfirmationDialog
      :DialogVisible="WaitingVisible"
      :DialogClose="waitingClose"
    >
      <div class="waiting_content">
        <p v-html="WaitingText"></p>
      </div>
    </WaitingConfirmationDialog>
    <SuccessConfirmationDialog
      :DialogVisible="SuccessVisible"
      :DialogClose="successClose"
      :SuccessHash="SuccessHash"
    />
  </div>
</template>

<script>
import { fixD } from "~/assets/js/util.js";
import { onExercise } from "~/interface/order.js";
import { getBalance } from "~/interface/deposite";
import { getInsuranceList } from "~/interface/event.js";
import moment from "moment";
import NoData from "./no-data.vue";
import Loading from "./loading.vue";
import { fromWei } from "~/web3/index.js";
import { getCurrentInsurance } from "~/config/insurance.js";
import BigNumber from "bignumber.js";
import OrderABI from "~/web3/abis/OrderABI.json";
import ERC20ABI from "~/web3/abis/ERC20ABI.json";
import { getContract } from "../../web3/index.js";
import WaitingConfirmationDialog from "~/components/dialogs/waiting-confirmation-dialog.vue";
import SuccessConfirmationDialog from "~/components/dialogs/success-confirmation-dialog.vue";
const OrderAddress = "0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D";
export default {
  components: {
    WaitingConfirmationDialog,
    SuccessConfirmationDialog,
    NoData,
    Loading,
  },
  data() {
    return {
      fixD,
      CurrentPage: 1,
      PageSize: 10,
      MinNumber: 0,
      MaxNumber: 10,
      isLoading: true,
      isLogin: false,
      SuccessHash: "",
      WaitingText: "",
      WaitingVisible: false,
      SuccessVisible: false,
      PolicyList: [],
    };
  },
  computed: {
    CurrentAccount() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    CurrentAccount: {
      handler: "reloadData",
      immediate: true,
    },
  },
  methods: {
    reloadData(Value) {
      if (Value) {
        this.isLogin = Value.isLogin;
        this.isLoading = true;
        this.getPolicysList();
      }
    },
    waitingClose() {
      this.WaitingVisible = false;
    },
    successClose() {
      this.SuccessVisible = false;
    },
    changePage(value) {
      this.CurrentPage = value;
      if (this.CurrentPage <= 1) {
        this.MinNumber = 0;
        this.MaxNumber = this.PageSize;
      } else {
        this.MinNumber = (value - 1) * this.PageSize;
        this.MaxNumber = (value - 1) * this.PageSize + this.PageSize;
      }
    },
    getBindItem(bidID) {
      const BidContracts = getContract(OrderABI, OrderAddress);
      return BidContracts.methods.bids(bidID).call();
    },
    getPolicysList() {
      getInsuranceList().then((res) => {
        let nowDate = parseInt(moment.now() / 1000);
        if (res && res.data.data.options) {
          let Account = this.CurrentAccount.account;
          const ReturnList = res.data.data.options;
          const AskAssign = [];
          const BidAssign = [];
          const FilterList = ReturnList.filter(
            (item) => item.expiry * 1 + 5814000 > nowDate
          );
          FilterList.forEach((item) => {
            const CurrentInsurance = getCurrentInsurance({
              CollateralAddress: item.collateral,
              UnderlyingAddress: item.underlying,
            });
            if (CurrentInsurance) {
              let {
                Type,
                ShowExpiry,
                StrikePriceDecimals,
                CollateralSymbol,
                CollateralAddress,
                CollateralDecimals,
                UnderlyingSymbol,
                UnderlyingAddress,
                UnderlyingDecimals,
                SettleTokenSymbol,
                SettleTokenDecimals,
                PolicyPriceDecimals,
                CallToken,
                PutToken,
              } = CurrentInsurance;
              const ResultItem = {
                Type,
                Expiry: item.expiry,
                ShowExpiry: moment(new Date(item.expiry * 1000)).format(
                  "YYYY/MM/DD HH:mm:ss"
                ),
                Long: item.long,
                Short: item.short,
                StrikePrice: item.strikePrice,
                CollateralAddress: item.collateral,
                CollateralSymbol,
                CollateralDecimals,
                UnderlyingAddress: item.underlying,
                UnderlyingSymbol,
                UnderlyingDecimals,
                CallToken,
                PutToken,
              };
              ResultItem.Status =
                item.expiry * 1 > nowDate ? "Normal" : "Expired";
              item.asks.filter((itemAsk) => {
                const ResultItemAsk = {
                  Binds: itemAsk.binds,
                  AskID: itemAsk.askID,
                  IsCancel: itemAsk.isCancel,
                  ShowID:
                    itemAsk.seller.substr(0, 2) +
                    itemAsk.seller.substr(2, 3) +
                    "..." +
                    itemAsk.seller.substr(-4).toUpperCase(),
                  SettleTokenSymbol,
                  ShowPrice: fromWei(itemAsk.price, PolicyPriceDecimals),
                  Price: itemAsk.price,
                  Volume: itemAsk.volume,
                };
                const AllItem = Object.assign(ResultItemAsk, ResultItem);
                AskAssign.push(AllItem);
              });
            }
          });
          AskAssign.forEach((itemAsks) => {
            const CurrentInsurance = getCurrentInsurance({
              CollateralAddress: itemAsks.CollateralAddress,
              UnderlyingAddress: itemAsks.UnderlyingAddress,
            });

            let { StrikePriceDecimals, CollateralDecimals, LastPriceDecimals } =
              CurrentInsurance;
            if (itemAsks.Binds.length) {
              itemAsks.Binds.forEach((itemBid) => {
                if (
                  Account &&
                  itemBid.buyer.toUpperCase() === Account.toUpperCase()
                ) {
                  const ResultItemBid = {
                    BidID: itemBid.bidID,
                    Volume: itemAsks.volume,
                    ShowVolume: fromWei(itemBid.volume, CollateralDecimals),
                    Premium: new BigNumber(
                      (
                        itemAsks.ShowPrice *
                        fromWei(itemBid.volume, CollateralDecimals)
                      ).toFixed(8)
                    ).toString(),
                  };
                  const ReturnItem = Object.assign(ResultItemBid, itemAsks);
                  if (ReturnItem.Type === "Put") {
                    ReturnItem.ShowVolume = Number(
                      ReturnItem.ShowVolume /
                        (1 / fromWei(itemAsks.StrikePrice, StrikePriceDecimals))
                    ).toFixed(8);
                    ReturnItem.ShowStrikePrice = Number(
                      1 / fromWei(itemAsks.StrikePrice, StrikePriceDecimals)
                    ).toFixed(LastPriceDecimals);
                  } else {
                    ReturnItem.ShowStrikePrice = fromWei(
                      itemAsks.StrikePrice,
                      StrikePriceDecimals
                    );
                    ReturnItem.ShowVolume = Number(
                      ReturnItem.ShowVolume
                    ).toFixed(8);
                  }

                  BidAssign.push(ReturnItem);
                }
              });
            }
          });
          if (
            FilterList.length === 0 ||
            AskAssign.length === 0 ||
            BidAssign.length === 0
          ) {
            this.isLoading = false;
          }
          Promise.all(
            BidAssign.map((itemBids) => this.getBindItem(itemBids.BidID))
          ).then((BidAssignList) => {
            let returnList = BidAssign.map((list, index) => {
              list.remain = BidAssignList[index].remain;
              return list;
            });
            returnList = returnList.filter((filter) => filter.remain !== "0");
            returnList = returnList.sort(
              (a, b) => Number(b.BidID) - Number(a.BidID)
            );
            this.PolicyList = returnList;
            console.log(returnList);
            this.isLoading = false;
          });
        }
      });
    },
    getLongApporve(data) {
      let Account = this.CurrentAccount.account;
      const Erc20ContractsLong = getContract(ERC20ABI.abi, data.Long);
      return Erc20ContractsLong.methods
        .allowance(Account, OrderAddress)
        .call()
        .then((res) => {
          if (Number(res) > 0) {
            return true;
          }
          return false;
        });
    },
    getUnderlyingApprove(data) {
      let Account = this.CurrentAccount.account;
      const Erc20ContractsLong = getContract(
        ERC20ABI.abi,
        data.UnderlyingAddress
      );
      return Erc20ContractsLong.methods
        .allowance(Account, OrderAddress)
        .call()
        .then((res) => {
          if (Number(res) > 0) {
            return true;
          }
          return false;
        });
    },
    actionApproveUnderlying(data) {
      this.SuccessVisible = false;
      const Erc20Contracts = getContract(ERC20ABI.abi, data.UnderlyingAddress);
      const Infinitys =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      let Account = this.CurrentAccount.account;
      Erc20Contracts.methods
        .approve(OrderAddress, Infinitys)
        .send({ from: Account })
        .on("transactionHash", (hash) => {
          this.WaitingVisible = true;
          this.WaitingText = `You will approve <b>${data.UnderlyingSymbol}</b> to <b>Helmet.insure</b>`;
        })
        .on("receipt", (receipt) => {
          if (!this.SuccessVisible) {
            this.WaitingVisible = false;
            this.SuccessVisible = true;
            this.SuccessHash = receipt.transactionHash;
            this.WaitingText = "";
            this.actionWithDraw(data);
          }
        })
        .on("error", (ereor) => {
          this.WaitingVisible = false;
        });
    },
    actionApproveLong(data, approveFlag) {
      const Erc20Contracts = getContract(ERC20ABI.abi, data.Long);
      const Infinitys =
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      let Account = this.CurrentAccount.account;
      Erc20Contracts.methods
        .approve(OrderAddress, Infinitys)
        .send({ from: Account })
        .on("transactionHash", (hash) => {
          this.WaitingVisible = true;
          this.WaitingText = `You will approve <b>LONG</b> to <b>Helmet.insure</b>`;
        })
        .on("receipt", (receipt) => {
          if (!this.SuccessVisible) {
            this.WaitingVisible = false;
            this.SuccessVisible = true;
            this.SuccessHash = receipt.transactionHash;
            this.WaitingText = "";
            if (approveFlag) {
              this.actionWithDraw(data);
            } else {
              this.actionApproveUnderlying(data);
            }
          }
        })
        .on("error", (ereor) => {
          this.WaitingVisible = false;
          this.WaitingText = "";
        });
    },
    async toActive(data) {
      let LongApproveStatus = await this.getLongApporve(data);
      let UnderlyingApproveStatus = await this.getUnderlyingApprove(data);
      if (!LongApproveStatus && !UnderlyingApproveStatus) {
        this.actionApproveLong(data);
        return;
      }
      if (!LongApproveStatus && UnderlyingApproveStatus) {
        this.actionApproveLong(data, true);
        return;
      }
      if (!UnderlyingApproveStatus && LongApproveStatus) {
        this.actionApproveUnderlying(data);
        return;
      }
      if (LongApproveStatus && UnderlyingApproveStatus) {
        this.actionWithDraw(data);
        return;
      }
    },
    actionWithDraw(data) {
      let Account = this.CurrentAccount.account;
      let Contracts = getContract(OrderABI, OrderAddress);
      Contracts.methods
        .exercise(data.BidID)
        .send({ from: Account })
        .on("transactionHash", (hash) => {
          this.WaitingVisible = true;
          // this.WaitingText = `<p>You will approve <b>LONG</b> to <b>Helmet.insure</b></p>`;
        })
        .on("receipt", (receipt) => {
          if (!this.SuccessVisible) {
            this.SuccessHash = receipt.transactionHash;
            this.WaitingVisible = false;
            this.SuccessVisible = true;
            this.WaitingText = "";
            this.getPolicysList();
          }
        })
        .on("error", (error) => {
          this.WaitingVisible = false;
          this.SuccessVisible = false;
          this.WaitingText = "";
        });
    },
    async HBURGERPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 4,
          bidID: 4,
          buyer: myAddress,
          show_price: 1,
          premium: volume * 1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1615226400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xae9269f27437f0fcbc232d39ec814844a51d6b8f",
          show_strikePrice: 0.07,
          _strikePrice: 0.07,
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1615226400000,
          transfer: true,
          longAdress: "0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa",
          type: "Call",
          symbol: "hBURGER",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.07,
          outPriceUnit: "BNB",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0xae9269f27437f0fcbc232d39ec814844a51d6b8f"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async LISHIPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x9eC5F3216c381715d7Bd06E00879a95d9Dd8e417"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x9eC5F3216c381715d7Bd06E00879a95d9Dd8e417");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 5,
          bidID: 5,
          buyer: myAddress,
          show_price: "redbag.png",
          premium: "redbag.png",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1613577600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          show_strikePrice: 0.1,
          _strikePrice: 0.1,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1613577600000,
          transfer: true,
          longAdress: "0x9eC5F3216c381715d7Bd06E00879a95d9Dd8e417",
          type: "Call",
          symbol: "LiShi",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.1,
          outPriceUnit: "BUSD",
          showType: "img",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async hMATHPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0xdD9b5801e8A38ef7A728A42492699521C6A7379b"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xdD9b5801e8A38ef7A728A42492699521C6A7379b");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 7,
          bidID: 7,
          buyer: myAddress,
          show_price: 1,
          premium: volume * 1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1616428800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xf218184af829cf2b0019f8e6f0b2423498a36983",
          show_strikePrice: 0.014,
          _strikePrice: 0.014,
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1616428800000,
          transfer: true,
          longAdress: "0xdD9b5801e8A38ef7A728A42492699521C6A7379b",
          type: "Call",
          symbol: "hMATH",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.014,
          outPriceUnit: "BNB",
          // showType: "img",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0xf218184af829cf2b0019f8e6f0b2423498a36983"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async HCCTIIPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x9065fcbb5f73B908aC4B05BdB81601Eec2065522"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x9065fcbb5f73B908aC4B05BdB81601Eec2065522");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 9,
          bidID: 9,
          buyer: myAddress,
          show_price: "--",
          premium: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1617897600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          show_strikePrice: 0.1,
          _strikePrice: 0.1,
          _underlying: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
          _expiry: 1617897600000,
          transfer: true,
          longAdress: "0x9065fcbb5f73B908aC4B05BdB81601Eec2065522",
          type: "Call",
          symbol: "HCCTII",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.1,
          outPriceUnit: "CAKE",
          // showType: "img",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async hDODOPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 10,
          bidID: 10,
          buyer: myAddress,
          show_price: 1,
          premium: volume * 1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1618416000000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2",
          show_strikePrice: 10,
          _strikePrice: 10,
          _underlying: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          _expiry: 1618416000000,
          transfer: true,
          longAdress: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
          type: "Call",
          symbol: "hDODO",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 10,
          outPriceUnit: "HELMET",
          // showType: "img",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async hTPTPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
        "hTPT"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 11,
          bidID: 11,
          buyer: myAddress,
          show_price: 0.01,
          premium: volume * 0.01,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1620057600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xeca41281c24451168a37211f0bc2b8645af45092",
          show_strikePrice: 0.06,
          _strikePrice: 0.06,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1620057600000,
          transfer: true,
          longAdress: "0x412B6d4C3ca1F0a9322053490E49Bafb0D57dD7c",
          type: "Call",
          symbol: "hTPT",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.06,
          outPriceUnit: "BUSD",
          // showType: "img",
          unit: 4,
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0xeca41281c24451168a37211f0bc2b8645af45092"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async QFEIPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 12,
          bidID: 12,
          buyer: myAddress,
          show_price: 0.1,
          premium: volume * 0.1,
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1620576000000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x07aaa29e63ffeb2ebf59b33ee61437e1a91a3bb2",
          show_strikePrice: 1,
          _strikePrice: 1,
          _underlying: "0x219cf9729bb21bbe8dd2101c8b6ec21c03dd0f31",
          _expiry: 1620576000000,
          transfer: true,
          longAdress: "0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a",
          type: "Call",
          symbol: "QFEI",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 1,
          outPriceUnit: "QSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x219cf9729bb21bbe8dd2101c8b6ec21c03dd0f31"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async qHELMETPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 14,
          bidID: 14,
          buyer: myAddress,
          show_price: "--",
          premium: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1624118400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8",
          show_strikePrice: 1.5,
          _strikePrice: 1.5,
          _underlying: "0x07aaa29e63ffeb2ebf59b33ee61437e1a91a3bb2",
          _expiry: 1624118400000,
          transfer: true,
          longAdress: "0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99",
          type: "Call",
          symbol: "QHELMET",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 1.5,
          outPriceUnit: "QSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async xhBURGERPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0xCa7597633927A98B800738eD5CD2933a74a80e8c"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xCa7597633927A98B800738eD5CD2933a74a80e8c");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 15,
          bidID: 15,
          buyer: myAddress,
          show_price: "--",
          premium: "--",
          volume: volume,
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1621612800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xafe24e29da7e9b3e8a25c9478376b6ad6ad788dd",
          show_strikePrice: 0.1,
          _strikePrice: 0.1,
          _underlying: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          _expiry: 1621612800000,
          transfer: true,
          longAdress: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
          type: "Call",
          symbol: "hxBURGER",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.1,
          outPriceUnit: "BNB",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0xafe24e29da7e9b3e8a25c9478376b6ad6ad788dd"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async SHIBHRPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
        "SHIBh"
      );

      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x224b33139a377a62d4BaD3D58cEDb7807AE228eB");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 16,
          bidID: 16,
          buyer: myAddress,
          show_price: "Airdrop",
          premium: "Airdrop",
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1626105600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          show_strikePrice: 0.000001,
          _strikePrice: 0.000001,
          _underlying: "0xaf90e457f4359adcc8b37e8df8a27a1ff4c3f561",
          _expiry: 1626105600000,
          transfer: true,
          longAdress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
          type: "Put",
          symbol: "SHIBh",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.000001,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          unit: 12,
          TypeCoin: getTokenName("0xaf90e457f4359adcc8b37e8df8a27a1ff4c3f561"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async HWINGSRPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026"
      );

      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x34508EA9ec327ff3b98A2F10eEDc2950875bf026");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 17,
          bidID: 17,
          buyer: myAddress,
          show_price: 1,
          premium: 1 * volume,
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1625932800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x0487b824c8261462f88940f97053e65bdb498446",
          show_strikePrice: 9,
          _strikePrice: 9,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1625932800000,
          transfer: true,
          longAdress: "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026",
          type: "Call",
          symbol: "hWINGS",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 9,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x0487b824c8261462f88940f97053e65bdb498446"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async HMTRGPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0xa561926e81decb74b3d11e14680b3f6d1c5012bd"
      );

      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0xa561926e81decb74b3d11e14680b3f6d1c5012bd");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 18,
          bidID: 18,
          buyer: myAddress,
          show_price: "--",
          premium: "--",
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1626969600000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xbd2949f67dcdc549c6ebe98696449fa79d988a9f",
          show_strikePrice: 4.7,
          _strikePrice: 4.7,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1626969600000,
          transfer: true,
          longAdress: "0xa561926e81decb74b3d11e14680b3f6d1c5012bd",
          type: "Call",
          symbol: "hMTRG",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 4.7,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0xbd2949f67dcdc549c6ebe98696449fa79d988a9f"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async HBABYPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624"
      );

      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 19,
          bidID: 19,
          buyer: myAddress,
          show_price: "--",
          premium: "--" * volume,
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1627228800000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x53e562b9b7e5e94b81f10e96ee70ad06df3d2657",
          show_strikePrice: 0.4,
          _strikePrice: 0.4,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1627228800000,
          transfer: true,
          longAdress: "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624",
          type: "Call",
          symbol: "hBABY",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.4,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x53e562b9b7e5e94b81f10e96ee70ad06df3d2657"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async HBMXXPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44"
      );

      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 20,
          bidID: 20,
          buyer: myAddress,
          show_price: "--",
          premium: "--" * volume,
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1627574400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x4131b87f74415190425ccd873048c708f8005823",
          show_strikePrice: 20,
          _strikePrice: 20,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1627574400000,
          transfer: true,
          longAdress: "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44",
          type: "Call",
          symbol: "hBMXX",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 20,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x4131b87f74415190425ccd873048c708f8005823"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async HARGONPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x4ce2d9804da7583c02f80fec087aea1d137214eb"
      );

      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x4ce2d9804da7583c02f80fec087aea1d137214eb");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 21,
          bidID: 21,
          buyer: myAddress,
          show_price: "--",
          premium: "--" * volume,
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1628352000000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x851f7a700c5d67db59612b871338a85526752c25",
          show_strikePrice: 0.15,
          _strikePrice: 0.15,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1628352000000,
          transfer: true,
          longAdress: "0x4ce2d9804da7583c02f80fec087aea1d137214eb",
          type: "Call",
          symbol: "hARGON",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 0.15,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x851f7a700c5d67db59612b871338a85526752c25"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async HMCRNPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x4c60bd0a7aa839e35882c7a9b9b240ea7e0657bf"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x4c60bd0a7aa839e35882c7a9b9b240ea7e0657bf");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 22,
          bidID: 22,
          buyer: myAddress,
          show_price: "--",
          premium: "--" * volume,
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1630166400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0xacb2d47827c9813ae26de80965845d80935afd0b",
          show_strikePrice: 7,
          _strikePrice: 7,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1630166400000,
          transfer: true,
          longAdress: "0x4c60bd0a7aa839e35882c7a9b9b240ea7e0657bf",
          type: "Call",
          symbol: "hMCRN",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 7,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0xacb2d47827c9813ae26de80965845d80935afd0b"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
    async HWIZARDPolicy() {
      let myAddress =
        this.$store.state.userInfo &&
        this.$store.state.userInfo.account &&
        this.$store.state.userInfo.account.toLowerCase();
      let volume = await getBalance(
        "0x792b733af7b9b83331f90dbbd297e519258b09bc"
      );
      let currentTime = new Date().getTime();
      if (fixD(volume, 8) != 0) {
        let Token = getTokenName("0x792b733af7b9b83331f90dbbd297e519258b09bc");
        let resultItem;
        resultItem = {
          askID: "air",
          id: 23,
          bidID: 23,
          buyer: myAddress,
          show_price: "--",
          premium: "--" * volume,
          volume: volume.toString(),
          settleToken: "0x948d2a81086a075b3130bac19e4c6dee1D2e3fe8",
          dueDate: moment(new Date(1630166400000)).format(
            "YYYY/MM/DD HH:mm:ss"
          ),
          _collateral: "0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18",
          show_strikePrice: 7,
          _strikePrice: 7,
          _underlying: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
          _expiry: 1630166400000,
          transfer: true,
          longAdress: "0x792b733af7b9b83331f90dbbd297e519258b09bc",
          type: "Call",
          symbol: "hWIZARD",
          approveAddress1: "FACTORY",
          approveAddress2: "",
          outPrice: 7,
          outPriceUnit: "BUSD",
          showVolume: volume,
          buyVolume: volume,
          TypeCoin: getTokenName("0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18"),
        };
        if (resultItem._expiry < currentTime) {
          resultItem["status"] = "Expired";
          resultItem["sort"] = 2;
          resultItem["dueDate"] = "Expired";
        } else {
          resultItem["status"] = "Unactivated";
          resultItem["sort"] = 0;
        }
        if (resultItem._expiry + 5184000000 < currentTime) {
          resultItem["status"] = "Hidden";
          resultItem["sort"] = 3;
        }
        return resultItem;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/themes.scss";
.icon {
  width: 24px;
  height: 24px;
  vertical-align: -0.15em;
  fill: #787878;
  overflow: hidden;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
}
@media screen and (min-width: 750px) {
  .H5 {
    display: none;
  }
  .my_policy {
    position: relative;
    min-height: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .policy_item_H5 {
      display: none;
    }
    .loading {
      width: 100%;
      margin: auto 0;
    }
    .pages {
      width: 100%;
    }
    .policy_title {
      width: 100%;
      h3 {
        @include themeify {
          color: themed("color-17173a");
        }
      }
    }
    .my_policy_wrap {
      width: 100%;
    }
    .policy_item {
      width: 100%;
      height: 90px;
      margin-top: 10px;
      display: flex;
      @include themeify {
        background: themed("color-ffffff");
      }
      box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
      border-radius: 5px;
      align-items: center;
      padding: 0 20px;
      .policy_item_id_web {
        flex: 5;
        min-width: 300px;
        > p {
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            font-family: IBMPlexSans;
            @include themeify {
              color: themed("media_icon");
            }
            line-height: 14px;
            &:nth-of-type(1) {
              width: 90px;
              display: block;
            }
            &:nth-of-type(2) {
              margin-left: 52px;
            }
          }
        }
        > span {
          margin-top: 10px;
          font-size: 16px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          line-height: 24px;
          display: flex;
          align-items: center;
          i {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            background-size: cover;
            margin-left: 4px;
          }
          .call_icon {
            background-image: url("../../assets/img/helmet/tablecall.png");
          }
          .put_icon {
            background-image: url("../../assets/img/helmet/tableput.png");
          }
        }
        > .call_text {
          color: #00b900;
        }
        > .put_text {
          color: #dc3545;
        }
      }
      .policy_item_strikeprice_web {
        flex: 4;
        display: flex;
        flex-direction: column;
        min-width: 150px;
        p {
          &:nth-of-type(2) {
            margin-top: 12px;
          }
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              @include themeify {
                color: themed("media_icon");
              }
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-family: IBMPlexSans;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 14px;
            }
          }
        }
      }
      .policy_item_price_web {
        flex: 4;
        display: flex;
        flex-direction: column;
        min-width: 200px;
        p {
          &:nth-of-type(2) {
            margin-top: 12px;
          }
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              @include themeify {
                color: themed("media_icon");
              }
              line-height: 14px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
              font-family: IBMPlexSans;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 14px;
            }
          }
        }
      }
      .policy_item_action_web {
        flex: 3;
        display: flex;
        justify-content: flex-end;
        min-width: 120px;
        button {
          padding: 0px 10px;
          height: 36px;
          @include themeify {
            background: themed("insure_button");
            border: 1px solid themed("insure_button_border");
            color: themed("insure_button_text");
          }
          border-radius: 5px;
          margin-left: 20px;
          font-size: 14px;
          font-family: HelveticaNeue;
          line-height: 24px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 92px;
          &:hover {
            border: 1px solid themed("color-fd7e14") !important;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .WEB {
    display: none;
  }
  .my_policy {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 10px;

    .policy_title {
      width: 100%;
      height: 44px;
      margin-left: 10px;
      line-height: 55px;
      h3 {
        @include themeify {
          color: themed("color-17173a");
        }
      }
    }
    .my_policy_wrap {
      width: 100%;
    }
    .policy_item {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      display: flex;
      @include themeify {
        background: themed("color-ffffff");
      }
      box-shadow: 0px 4px 8px 0px rgba(155, 155, 155, 0.02);
      border-radius: 5px;
      padding: 20px 16px;
      .policy_item_id_h5 {
        > p {
          display: flex;
          align-items: center;
          span {
            font-size: 14px;
            font-family: IBMPlexSans;
            @include themeify {
              color: themed("media_icon");
            }
            line-height: 14px;
            &:nth-of-type(1) {
              width: 90px;
              display: block;
            }
          }
        }
      }
      .policy_item_type_h5 {
        display: flex;
        flex-direction: column;
        > span {
          margin-top: 10px;
          font-size: 16px;
          font-family: IBMPlexSans-Bold, IBMPlexSans;
          font-weight: bold;
          line-height: 24px;
          display: flex;
          align-items: center;
          i {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            background-size: cover;
            margin-left: 4px;
          }
          .call_icon {
            background-image: url("../../assets/img/helmet/tablecall.png");
          }
          .put_icon {
            background-image: url("../../assets/img/helmet/tableput.png");
          }
        }
        > .call_text {
          color: #00b900;
        }
        > .put_text {
          color: #dc3545;
        }
      }
      .policy_item_price_h5 {
        display: flex;
        align-items: center;
        margin-top: 16px;
        p {
          display: flex;
          flex-direction: column;
          flex: 1;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              @include themeify {
                color: themed("media_icon");
              }
              line-height: 14px;
            }
            &:nth-of-type(2) {
              margin-top: 4px;
              font-size: 14px;
              font-family: IBMPlexSans;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 14px;
              font-weight: 500;
            }
          }
        }
      }
      .policy_item_volume_h5 {
        display: flex;
        align-items: center;
        margin-top: 16px;
        p {
          display: flex;
          flex-direction: column;
          flex: 1;
          span {
            &:nth-of-type(1) {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              @include themeify {
                color: themed("media_icon");
              }
              line-height: 14px;
            }
            &:nth-of-type(2) {
              margin-top: 4px;
              font-size: 14px;
              font-family: IBMPlexSans;
              @include themeify {
                color: themed("color-17173a");
              }
              line-height: 14px;
              font-weight: 500;
            }
          }
        }
      }
      .policy_item_action_h5 {
        display: flex;
        margin-top: 16px;
        button {
          width: 100%;
          height: 36px;
          border-radius: 5px;
          @include themeify {
            background: themed("insure_button");
            border: 1px solid themed("insure_button_border");
            color: themed("insure_button_text");
          }
          font-size: 14px;
          font-family: HelveticaNeue;
          line-height: 24px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            border: 1px solid themed("color-fd7e14") !important;
          }
        }
      }
    }
  }
}
</style>
