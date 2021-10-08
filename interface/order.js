// import {web3} from '~/assets/utils/web3-obj.js';
import { Factory, Order, TokenOrder, expERC20, TokenExpERC20 } from "./index";
import {
  getAddress,
  getContract,
  getWei,
  getID,
  getStrikePriceFix,
  getWeiWithFix,
} from "~/assets/utils/address-pool.js";
import { toWei, fromWei } from "~/web3/index.js";
import precision from "~/assets/js/precision.js";
import { fixD, toRounding } from "~/assets/js/util.js";
import bus from "~/assets/js/bus";
import Notification from "~/components/common/Notification";
import Message from "~/components/common/Message";
import { getExerciseList } from "~/interface/event.js";
import BigNumber from "bignumber.js";
const netObj = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  56: "BSC",
};
export const onIssueSell = async (data_, callBack) => {
  if (JSON.stringify(data_) === "{}") {
    return false;
  }
  let data = { ...data_ };
  data.category = getAddress(data.category);
  data.currency = getAddress(data.currency);
  data.settleToken = getAddress(data.settleToken);
  let cwei = getWei(data.currency);
  let fix = cwei === "lovelace" ? 6 : 18;
  data.expire = new Date(data.expire).getTime();
  data.expire = parseInt(precision.divide(data.expire, 1000));

  let volume = toWei(data_.volume, data_.currency);
  data.volume = volume;

  let priceFix = getStrikePriceFix(data_.currency, data_.category);
  let priceUnit = getWeiWithFix(priceFix);
  let price = fixD(data.price, priceFix);
  data.total = toWei(
    fixD(precision.times(data_.price, data_.volume), 10),
    priceFix
  );
  if (data_.divide) {
    price = fixD(precision.divide(1, data.price), fix);
    price = window.WEB3.utils.toWei(String(price), priceUnit);
  } else {
    price = window.WEB3.utils.toWei(String(data.price), priceUnit);
  }
  data.price = price;
  let premiumFix = getStrikePriceFix(data_.currency, data_.category);
  let premiumUnit = getWeiWithFix(premiumFix);
  let premium = fixD(precision.divide(data_.premium, data_.volume), premiumFix);
  premium = window.WEB3.utils.toWei(String(premium), premiumUnit);
  data.premium = premium;
  try {
    const Contract = await expERC20(data.currency);
    await oneKeyArrpove(Contract, "ORDER", data.total, callBack);
    const orderContract = await Order();
    orderContract.methods
      .sell(
        false,
        data.currency, 
        data.category, 
        data.price, 
        data.expire,
        data.volume, 
        data.settleToken, 
        data.premium 
      )
      .send({ from: window.CURRENTADDRESS })
      .on("transactionHash", function(hash) {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<p>Supply <span>${data_.volume} ${data_.currency}</span> Policys, with the strike price of <span>${data_.price} ${data_.showType}</span></p>`,
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
        } else {
          Message({
            message: "The rental advertisement is published successfully",
            type: "success",
            // duration: 0,
          });
        }
        bus.$emit("REFRESH_BALANCE");
      })
      .on("error", function(error, receipt) {
        bus.$emit("OPEN_STATUS_DIALOG", { showDialog: false });
        bus.$emit("CLOSE_STATUS_DIALOG");
        // if (error && error.message) {
        //     Message({
        //         message: error && error.message,
        //         type: 'error',
        //     });
        // }
      });
  } catch (error) {
    console.log("onIssueSell", error);
  }
};
export const onIssueSellOnETH = async (data_, callBack) => {
  if (JSON.stringify(data_) === "{}") {
    return false;
  }
  let data = { ...data_ };
  data.category = getAddress(data.category);
  data.currency = getAddress(data.currency);
  data.settleToken = getAddress(data.settleToken);
  let cwei = getWei(data.category);
  let fix = cwei === "lovelace" ? 6 : 18;
  // let fix = 18;
  data.expire = new Date(data.expire).getTime();
  data.expire = parseInt(precision.divide(data.expire, 1000));
  data.total = toWei(
    fixD(precision.times(data.price, data.volume), 10),
    data_.currency
  );
  // let premium = fixD(precision.divide(data.premium, data.price), 18);
  let premium = fixD(precision.divide(data.premium, data.volume), 18);
  // premium = toWei(premium, data_.currency);
  premium = toWei(premium);
  data.premium = premium;
  // let volume = fixD(precision.times(data.volume, data.price), fix);
  let volume = toWei(data_.volume, data_.currency);
  // volume = toWei(volume);
  data.volume = volume;

  // let priceFix = getStrikePriceFix(data_.category, data_.currency);
  // let priceUnit = getWeiWithFix(priceFix);
  // let price = fixD(precision.divide(1, data.price), fix);
  let price = fixD(precision.divide(1, data.price), fix);
  // price = toWei(price, data_.currency);
  price = window.WEB3.utils.toWei(String(price), getWei(data_.category));
  // window.WEB3.utils.toWei(String(number), unit);
  data.price = price;
  try {
    const Contract = await expERC20(data.currency);
    await oneKeyArrpove(Contract, "ORDER", data.total, callBack);
    const orderContract = await Order();
    orderContract.methods
      .sellOnETH(
        false,
        // data.currency, 
        data.category, 
        data.price, 
        data.expire,
        // data.volume, // 200
        data.settleToken, 
        data.premium 
      )
      .send({ from: window.CURRENTADDRESS, value: data.volume })
      .on("transactionHash", function(hash) {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<p>Supply <span>${
            data_.volume
          } ${"BNB"}</span> Policys, with the strike price of <span>${
            data_.price
          } ${"BNB"}</span></p>`,
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
        } else {
          Message({
            message: "The rental advertisement is published successfully",
            type: "success",
          });
        }
        bus.$emit("REFRESH_BALANCE");
      })
      .on("error", function(error, receipt) {
        bus.$emit("OPEN_STATUS_DIALOG", { showDialog: false });
        bus.$emit("CLOSE_STATUS_DIALOG");
        // if (error && error.message) {
        //     Message({
        //         message: error && error.message,
        //         type: 'error',
        //     });
        // }
      });
  } catch (error) {
    console.log("onIssueSellOnETH", error);
  }
};
export const buyInsuranceBuy = async (_data, callBack) => {
  if (JSON.stringify(_data) === "{}") {
    return false;
  }
  let data = { ..._data };

  const charID = window.chainID;
  data.settleToken = getAddress(data.settleToken, charID);
  let cwei = getWei(data._collateral);
  let fix = cwei === "lovelace" ? 6 : 18;
  // let fix = 18;
  let payPrice = fixD(
    precision.times(
      precision.divide(_data.volume, _data._strikePrice),
      _data.price
    ),
    fix
  );
  payPrice = toWei(payPrice);
  data.payPrice = payPrice;

  let fixVolume = fixD(_data.volume, fix);
  let volume = toWei(fixVolume, _data._collateral);

  data.volume = volume;
  // let pay = precision.times(_data._strikePrice, _data.volume);

  // data.pay = toWei(pay, _data.settleToken);

  const Contract = await expERC20(data.settleToken);
  try {
    await oneKeyArrpove(Contract, "ORDER", data.payPrice, callBack);
    const orderContract = await Order();
    orderContract.methods
      .buy(data.askID, data.volume)
      .send({ from: window.CURRENTADDRESS })
      .on("transactionHash", function(hash) {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Waiting For Confirmation",
          layout: "layout2",
          loading: true,
          buttonText: "Confirm",
          conTit: "Please Confirm the transaction in your wallet",
          conText: `<p>Buy <span>${_data.showVolueme} ${_data.showType}
                    </span> Policys, with the strike price of <span>
                    ${fixD(_data.price * _data.volume, 8)} ${_data.settleToken}
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
        } else {
          Message({
            message: "The policy is rented successfully",
            type: "success",
          });
        }
        bus.$emit("REFRESH_BALANCE");
      })
      .on("error", function(error, receipt) {
        bus.$emit("OPEN_STATUS_DIALOG", { showDialog: false });
        bus.$emit("CLOSE_STATUS_DIALOG");
        // if (error && error.message) {
        //     Message({
        //         message: error && error.message,
        //         type: 'error',
        //     });
        // }
      });
  } catch (error) {}
};

export const asks = async (askID, type = "default", token = "ether") => {
  // const WEB3 = await web3();
  // console.log(askID)
  if (!askID) return 0;
  const order = await Order();
  if (type === "default") {
    return order.methods.asks(askID).call();
  }
  const res = await order.methods.asks(askID).call();

  return fromWei(res.remain, token);
};
export const claim = async () => {
  const order = await Order();
  let result;
  if (!window.CURRENTADDRESS) {
    return;
  }
  try {
    order.methods
      .claim()
      .send({ from: window.CURRENTADDRESS })
      .on("transactionHash", function(hash) {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          type: "submit",
          conText: `https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
        });
      })
      .on("receipt", function(receipt) {
        if (window.statusDialog) {
          ``;
          bus.$emit("CLOSE_STATUS_DIALOG");
          bus.$emit("OPEN_STATUS_DIALOG", {
            type: "success",
            title: "Successfully rented",
            conTit: "<div>Policy activated successfully</div>",
            conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
          });
        } else {
          Message({
            message: "Policy activated successfully",
            type: "success",
          });
        }
        bus.$emit("REFRESH_ASSETS");
      })
      .on("error", function(error, receipt) {
        bus.$emit("CLOSE_STATUS_DIALOG");
        // if (error && error.message) {
        //     Message({
        //         message: error && error.message,
        //         type: 'error',
        //     });
        // }
      });
  } catch (error) {
    console.log(error);
  }
  return result;
};
export const bids = async (bidID, type = "default", token = "default") => {
  // const WEB3 = await web3();
  // console.log(bidID)
  if (!bidID) return 0;
  const order = await Order();
  if (type === "sync") {
    const res = await order.methods.bids(bidID).call();
    return window.WEB3.utils.fromWei(res.remain, getWei(token));
  }

  return order.methods.bids(bidID).call();
};

export const getBalance = async (type, currcy) => {
  // const WEB3 = await web3();
  // const charID = await getID();
  const charID = window.chainID;
  let adress = type;
  if (type.indexOf("0x") === -1) {
    adress = getAddress(type, charID);
  }
  if (!adress || !window.CURRENTADDRESS) {
    // bus.$emit("REFRESH_BALANCE");
    return 0;
  }
  const contract = await expERC20(adress);
  return contract.methods
    .balanceOf(window.CURRENTADDRESS)
    .call()
    .then((res) => {
      let tocurrcy = currcy || type;
      return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
    });
};
export const totalSupply = async (address) => {
  const charID = window.chainID;
  let adress = address;
  if (address.indexOf("0x") === -1) {
    adress = getContract(address, charID);
  }
  if (!adress) {
    return 0;
  }
  const Contract = await expERC20(adress);
  return Contract.methods
    .totalSupply()
    .call()
    .then((res) => {
      let tocurrcy = adress;
      return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
    });
};
export const BalanceMine = async (address1, address2) => {
  const charID = window.chainID;
  let adress1 = address1;
  let adress2 = address2;
  if (address1.indexOf("0x") === -1) {
    adress1 = getContract(address1, charID);
  }
  if (address2.indexOf("0x") === -1) {
    adress2 = getContract(address2, charID);
  }
  if (!adress1 || !adress2) {
    return 0;
  }
  const contract = await expERC20(adress1);
  return contract.methods
    .balanceOf(adress2)
    .call()
    .then((res) => {
      let tocurrcy = address1;
      return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
    });
};
export const claimable = async (address1, address2) => {
  const charID = window.chainID;
  let adress1 = address1;
  if (address1.indexOf("0x") === -1) {
    adress1 = getContract(address1, charID);
  }
  if (!adress1 || (!address2 && !window.CURRENTADDRESS)) {
    return 0;
  }
  const order = await Order(adress1);
  return order.methods
    .claimable(address2 || window.CURRENTADDRESS)
    .call()
    .then((res) => {
      let tocurrcy = address1;
      return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
    });
};

export const MyPayaso = async (address1) => {
  const charID = window.chainID;
  let adress = address1;
  if (address1.indexOf("0x") === -1) {
    adress = getContract(address1, charID);
  }
  if (!adress || !window.CURRENTADDRESS) {
    return 0;
  }
  const contract = await expERC20(adress);
  return contract.methods
    .balanceOf(window.CURRENTADDRESS)
    .call()
    .then((res) => {
      let tocurrcy = address1;
      return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
    });
};
export const onExercise = async (data, flag, callback) => {
  if (JSON.stringify(data) === "{}") {
    return false;
  }
  bus.$emit("ONEXERCISE_PENDING", data.bidID);
  const charID = window.chainID;
  let adress = getAddress(data.token, charID);
  let Contract;
  let long;
  let order;
  let value;

  if (data.flag) {
    Contract = await expERC20(adress);
    order = await TokenOrder(data.long);
    long = await expERC20(data.long);
    if (data.unit && data.unit != 12) {
      value = BigNumber(
        (data.vol * Math.pow(10, data.unit) + "").toString()
      ).toFixed();
    } else {
      value = toWei(data.vol, data.token);
    }
    if (data.approveAddress1) {
      await oneKeyArrpove(Contract, data.approveAddress1, 100000, (res) => {
        if (res === "failed") {
          bus.$emit("CLOSE_STATUS_DIALOG");
        }
      });
    }
    if (data.approveAddress2) {
      await oneKeyArrpove(long, data.approveAddress2, 100000, (res) => {
        if (res === "failed") {
          bus.$emit("CLOSE_STATUS_DIALOG");
        }
      });
    }
  } else {
    Contract = await expERC20(adress);
    order = await Order();
    long = await expERC20(data.long);
    await oneKeyArrpove(Contract, "ORDER", 100000, (res) => {
      if (res === "failed") {
        bus.$emit("CLOSE_STATUS_DIALOG");
      }
    });
    await oneKeyArrpove(long, "ORDER", 100000, (res) => {
      if (res === "failed") {
        bus.$emit("CLOSE_STATUS_DIALOG");
      }
    });
  }
  order.methods
    .exercise(data.flag ? value : data.bidID)
    .send({ from: window.CURRENTADDRESS })
    .on("transactionHash", function(hash) {
      bus.$emit("OPEN_STATUS_DIALOG", {
        title: "Waiting For Confirmation",
        layout: "layout2",
        loading: true,
        conTit: "Please Confirm the transaction in your wallet",
        conText: `<p>You will swap<span> ${fixD(data.show_strikePrice, 8)} ${
          data.token
        }</span> to <span> ${fixD(data.buyVolume, 8)} ${
          data.totoken
        }</span></p>`,
      });
    })
    .on("receipt", function(receipt) {
      if (window.statusDialog) {
        bus.$emit("CLOSE_STATUS_DIALOG");
        bus.$emit("OPEN_STATUS_DIALOG", {
          title: "Transation submitted",
          layout: "layout2",
          loading: false,
          button: true,
          buttonText: "Confirm",
          conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
          showDialog: false,
        });
      }
      callback("success");
    })
    .on("error", function(error, receipt) {
      bus.$emit("CLOSE_STATUS_DIALOG");
      // if (error && error.message) {
      //     Message({
      //         message: error && error.message,
      //         type: 'error',
      //         // duration: 0,
      //     });
      // }
    });
};

const allowance = async (token_exp, contract_str) => {
  // const WEB3 = await web3();
  const charID = await getID();
  const result = await token_exp.methods
    .allowance(window.CURRENTADDRESS, getContract(contract_str, window.chainID))
    .call({ from: window.CURRENTADDRESS });

  return window.WEB3.utils.fromWei(result, getWei());
};

const approve = async (token_exp, contract_str, callback = (status) => {}) => {
  // const WEB3 = await web3();
  const charID = await getID();
  const result = await token_exp.methods
    .approve(
      getContract(contract_str, charID),
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
    .send({ from: window.CURRENTADDRESS })
    .on("transactionHash", (hash) => {
      callback("approve");
    })
    .on("receipt", function(receipt) {
      callback("success");
    })
    .on("error", (err, receipt) => {
      bus.$emit("CLOSE_STATUS_DIALOG");
      callback("failed");
    });
  return result;
};

const oneKeyArrpove = async (token_exp, contract_str, num, callback) => {
  if (!token_exp || !contract_str) return;
  const awc = await allowance(token_exp, contract_str);
  if (parseInt(awc) >= parseInt(num)) {
    return;
  }
  const res = await approve(token_exp, contract_str, callback);
};

export const onCancel = async (askID, callBack) => {
  // const WEB3 = await web3();
  if (!askID) {
    return;
  }
  const order = await Order();
  if (!window.CURRENTADDRESS) {
    return;
  }
  order.methods
    .cancel(askID)
    .send({ from: window.CURRENTADDRESS })
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
    })
    .on("error", (err, receipt) => {
      callBack("failed");
    });
};

export const onWaive = async (data) => {
  bus.$emit("ONWAIVE_PENDING", data.bidID);
  const charID = window.chainID;
  // let adress = getAddress(data._underlying, charID);
  // const Contract = await expERC20(adress);
  const long = await expERC20(data.long);
  const order = await Order();

  // await oneKeyArrpove(Contract, "ORDER", 100000, (res) => {
  //   if (res === "failed") {
  //     bus.$emit("ONWAIVE_END", data.bidID);
  //   }
  // });
  await oneKeyArrpove(long, "ORDER", 100000, (res) => {
    if (res === "failed") {
      bus.$emit("ONWAIVE_END", data.bidID);
    }
  });

  // const order = await Order();
  order.methods
    .waive(data.bidID)
    .send({ from: window.CURRENTADDRESS })
    .on("transactionHash", (hash) => {})
    .on("receipt", function(receipt) {
      bus.$emit("ONWAIVE_END", data.bidID);
    })
    .on("error", (err, receipt) => {
      bus.$emit("ONWAIVE_END", data.bidID);
    });
};
