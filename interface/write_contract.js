import MiningABI from "~/abi/deposite_abi.json";
import ApproveABI from "~/abi/IPancakePair.json";
import CompoundABI from "~/abi/helmet_abi.json";
import OrderABI from "~/abi/order_abi.json";
import ChainSwapABI from "~/abi/ChainSwap.json";
import BurnSwapABI from "~/abi/BurnSwap.json";
import MigrationABI from "~/abi/Migration.json";
import IIOABI from "~/abi/iio_abi.json";

import {
  Web3Contract,
  getAccounts,
  getDecimals,
  TokenNameToWei,
  toWei,
  fromWei,
} from "./common_contract.js";
import BigNumber from "bignumber.js";
import bus from "~/assets/js/bus";
import { fixD } from "~/assets/js/util.js";
let OrderContractAddress = "0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D";
let BurnSwapContractAddress = "0x6Bab2711Ca22fE7395811022F92bB037cd4af7bc"; //燃烧地址
let BurnSignContractAddress = "0x81d82a35253B982E755c4D7d6AADB6463305B188"; //燃烧签名地址
let StakingContractAddress = "0x910651F81a605a6Ef35d05527d24A72fecef8bF0"; //质押地址
export const Stake = async (
  { ContractAddress, DepositeVolume, Decimals },
  callback
) => {
  let Contracts = await Web3Contract(MiningABI.abi, ContractAddress);
  let Account = await getAccounts();
  let DecimalsUnit = getDecimals(Decimals);
  if (DecimalsUnit) {
    DepositeVolume = toWei(DepositeVolume, DecimalsUnit);
  } else {
    let powNumber = new BigNumber(10).pow(Decimals).toString();
    DepositeVolume = new BigNumber(DepositeVolume).times(powNumber).toString();
  }
  console.log(DepositeVolume);
  try {
    Contracts.methods
      .stake(DepositeVolume)
      .send({ from: Account })
      .on("transactionHash", (hash) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
        });
      })
      .on("receipt", (receipt) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Transation submitted",
          layout: "layout2",
          buttonText: "Confirm",
          conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
          button: true,
          buttonText: "Confirm",
          showDialog: false,
        });
        callback("success");
      })
      .on("error", (error) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        callback("error");
      });
  } catch (error) {}
};
export const StakeAndComound = async (
  { ContractAddress, DepositeVolume, Decimals },
  callback
) => {
  let Contracts = await Web3Contract(MiningABI.abi, ContractAddress);
  let Account = await getAccounts();
  let DecimalsUnit = getDecimals(Decimals);
  if (DecimalsUnit) {
    DepositeVolume = toWei(DepositeVolume, DecimalsUnit);
  } else {
    let powNumber = new BigNumber(10).pow(Decimals).toString();
    DepositeVolume = new BigNumber(DepositeVolume).times(powNumber).toString();
  }
  console.log(DepositeVolume);
  try {
    Contracts.methods
      .stakeAndCompound(DepositeVolume)
      .send({ from: Account })
      .on("transactionHash", (hash) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
        });
      })
      .on("receipt", (receipt) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Transation submitted",
          layout: "layout2",
          buttonText: "Confirm",
          conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
          button: true,
          buttonText: "Confirm",
          showDialog: false,
        });
        callback("success");
      })
      .on("error", (error) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        callback("error");
      });
  } catch (error) {}
};
export const GetReward = async (ContractAddress, callback) => {
  let Contracts = await Web3Contract(MiningABI.abi, ContractAddress);
  let Account = await getAccounts();
  try {
    Contracts.methods
      .getReward()
      .send({ from: Account })
      .on("transactionHash", (hash) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
        });
      })
      .on("receipt", (receipt) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Transation submitted",
          layout: "layout2",
          buttonText: "Confirm",
          conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
          button: true,
          buttonText: "Confirm",
          showDialog: false,
        });
        callback("success");
      })
      .on("error", (error) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        callback("error");
      });
  } catch (error) {}
};
export const GetReward3 = async (ContractAddress, RewardAddress, callback) => {
  console.log(ContractAddress, RewardAddress);
  let Contracts = await Web3Contract(IIOABI.abi, ContractAddress);
  let Account = await getAccounts();
  try {
    Contracts.methods
      .getReward3(RewardAddress)
      .send({ from: Account })
      .on("transactionHash", (hash) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
        });
      })
      .on("receipt", (receipt) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Transation submitted",
          layout: "layout2",
          buttonText: "Confirm",
          conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
          button: true,
          buttonText: "Confirm",
          showDialog: false,
        });
        callback("success");
      })
      .on("error", (error) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        callback("error");
      });
  } catch (error) {}
};
export const GetDoubleReward = async (ContractAddress, callback) => {
  let Contracts = await Web3Contract(MiningABI.abi, ContractAddress);
  let Account = await getAccounts();
  try {
    Contracts.methods
      .getDoubleReward()
      .send({ from: Account })
      .on("transactionHash", (hash) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
        });
      })
      .on("receipt", (receipt) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Transation submitted",
          layout: "layout2",
          buttonText: "Confirm",
          conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
          button: true,
          buttonText: "Confirm",
          showDialog: false,
        });
        callback("success");
      })
      .on("error", (error) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        callback("error");
      });
  } catch (error) {}
};
export const Exit = async (ContractAddress, callback) => {
  let Contracts = await Web3Contract(MiningABI.abi, ContractAddress);
  let Account = await getAccounts();
  try {
    Contracts.methods
      .exit()
      .send({ from: Account })
      .on("transactionHash", (hash) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
        });
      })
      .on("receipt", (receipt) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Transation submitted",
          layout: "layout2",
          buttonText: "Confirm",
          conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
          button: true,
          buttonText: "Confirm",
          showDialog: false,
        });
        callback("success");
      })
      .on("error", (error) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        callback("error");
      });
  } catch (error) {}
};
export const Compound = async (ContractAddress, callback) => {
  let Contracts = await Web3Contract(CompoundABI.abi, ContractAddress);
  let Account = await getAccounts();
  try {
    Contracts.methods
      .compound()
      .send({ from: Account })
      .on("transactionHash", (hash) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
        });
      })
      .on("receipt", (receipt) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Transation submitted",
          layout: "layout2",
          buttonText: "Confirm",
          conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
          button: true,
          buttonText: "Confirm",
          showDialog: false,
        });
        callback("success");
      })
      .on("error", (error) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        callback("error");
      });
  } catch (error) {}
};
export const Approve = async (
  TokenAddress,
  SepnderAddress,
  TokenSymbol,
  callback
) => {
  let Contracts = await Web3Contract(ApproveABI.abi, TokenAddress);
  let Account = await getAccounts();
  try {
    Contracts.methods
      .approve(
        SepnderAddress,
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
      )
      .send({ from: Account })
      .on("transactionHash", (hash) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">You will approve ${TokenSymbol} to Helmet.insure</a>`,
        });
      })
      .on("receipt", (receipt) => {
        if (window.statusDialog) {
          bus.$emit("CLOSE_STATUS_DIALOG");
          bus.$emit("OPEN_STATUS_DIALOG", {
            title: "Transation submitted",
            layout: "layout2",
            buttonText: "Confirm",
            conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
            button: true,
            buttonText: "Confirm",
            showDialog: false,
          });
        }
        callback("success");
      })
      .on("error", (err) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        callback("error");
      });
  } catch (error) {
    console.log(error);
  }
};
export const Buy = async (data, callback) => {
  let Contracts = await Web3Contract(OrderABI.abi, OrderContractAddress);
  let Account = await getAccounts();
  let SubmitVolume = TokenNameToWei(data.buyNum, data.currentInsurance);
  let AskID = data.askID;
  try {
    Contracts.methods
      .buy(AskID, SubmitVolume)
      .send({ from: Account })
      .on("transactionHash", (hash) => {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<p>Buy <span>${data.showNum} ${data.currentInsurance}
                </span> Policys, with the strike price of <span>
                ${data.show_strikePrice} ${data.settleToken_symbol}
                </span></p>`,
        });
      })
      .on("receipt", function(receipt) {
        if (window.statusDialog) {
          bus.$emit("CLOSE_STATUS_DIALOG");
          bus.$emit("OPEN_STATUS_DIALOG", {
            title: "Transation submitted",
            layout: "layout2",
            buttonText: "Confirm",
            conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
            button: true,
            buttonText: "Confirm",
            showDialog: false,
          });
        }
        callback("success");
      })
      .on("error", function(error, receipt) {
        bus.$emit("OPEN_STATUS_DIALOG", { showDialog: false });
        bus.$emit("CLOSE_STATUS_DIALOG");
        callBack("error");
      });
  } catch (error) {
    console.log("error", "Buy");
  }
};
export const Cancel = async (askID, callBack) => {
  // const WEB3 = await web3();
  if (!askID) {
    return;
  }
  let Contracts = await Web3Contract(OrderABI.abi, OrderContractAddress);
  let Account = await getAccounts();
  if (!window.CURRENTADDRESS) {
    return;
  }
  Contracts.methods
    .cancel(askID)
    .send({ from: Account })
    .on("transactionHash", (hash) => {
      bus.$emit("CLOSE_STATUS_DIALOG");
      bus.$emit("OPEN_STATUS_DIALOG", {
        title: "Waiting For Confirmation",
        layout: "layout2",
        loading: true,
        buttonText: "Confirm",
        conTit: "Please Confirm the transaction in your wallet",
        conText: `Cancel your Policy supplying order.`,
      });
    })
    .on("receipt", function(receipt) {
      if (window.statusDialog) {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Transation submitted",
          layout: "layout2",
          buttonText: "Confirm",
          conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
          button: true,
          buttonText: "Confirm",
          showDialog: false,
        });
      }
      callBack("success");
    })
    .on("error", (err, receipt) => {
      callBack("error");
    });
};
export const BurnHelmet = async (
  ContractAddress,
  Volume,
  Decimals = 18,
  callBack
) => {
  let Contracts = await Web3Contract(MigrationABI, ContractAddress);
  let Account = await getAccounts();
  let DecimalsUnit = getDecimals(Decimals);
  Volume = toWei(Volume, DecimalsUnit);
  console.log(Volume);
  Contracts.methods
    .burn(Volume)
    .send({ from: Account })
    .on("transactionHash", (hash) => {
      bus.$emit("CLOSE_STATUS_DIALOG");
      bus.$emit("OPEN_STATUS_DIALOG", {
        title: "Waiting For Confirmation",
        layout: "layout2",
        loading: true,
        buttonText: "Confirm",
        conTit: "Please Confirm the transaction in your wallet",
        conText: `Burn your HELMET to get GUARD.`,
      });
    })
    .on("receipt", function(receipt) {
      if (window.statusDialog) {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Transation submitted",
          layout: "layout2",
          buttonText: "Confirm",
          conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
          button: true,
          buttonText: "Confirm",
          showDialog: false,
        });
      }
      callBack("success");
    })
    .on("error", (err, receipt) => {
      callBack("error");
    });
};
export const ApplyRewards3 = async (ContractAddress, EarnAddress, callBack) => {
  let Contracts = await Web3Contract(IIOABI.abi, ContractAddress);
  let Account = await getAccounts();
  Contracts.methods
    .applyReward3(EarnAddress)
    .send({ from: Account })
    .on("transactionHash", (hash) => {
      bus.$emit("CLOSE_STATUS_DIALOG");
      bus.$emit("OPEN_STATUS_DIALOG", {
        title: "Waiting For Confirmation",
        layout: "layout2",
        loading: true,
        buttonText: "Confirm",
        conTit: "Please Confirm the transaction in your wallet",
        conText: `FREE DAYS 0 HELMET for GUARD Credits Confirm.`,
      });
    })
    .on("receipt", function(receipt) {
      bus.$emit("CLOSE_STATUS_DIALOG");
      bus.$emit("OPEN_STATUS_DIALOG", {
        title: "Transation submitted",
        layout: "layout2",
        buttonText: "Confirm",
        conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
        button: true,
        buttonText: "Confirm",
        showDialog: false,
      });
      callBack("success");
    })
    .on("error", (err, receipt) => {
      callBack("error");
    });
};
