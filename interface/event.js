import Axios from "axios";
import FactoryABI from "~/abi/FactoryABI.json";
import OrderABI from "~/abi/OrderABI.json";
import moment from "moment";
import BigNumber from "bignumber.js";
import qs from "qs";
export const decodeLogs = function(event, log) {
  return window.WEB3.eth.abi.decodeLog(
    event.inputs,
    log.data,
    log.topics.slice(1)
  );
};
// 获取long, Sell, Buy映射
export const getLongList = async function(callback) {
  // let ContractAddress = getContract();
  let EventABI = FactoryABI.abi;
  let EventObject = EventABI.filter((item) => {
    return item.name == "OptionCreated" && item.type == "event";
  })[0];

  let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
  Axios({
    method: "get",
    url: "https://api.helmet.insure/contract/logs",
    params: {
      contract: "0x021297e233550eDBa8e6487EB7c6696cFBB63b88",
      include_data: true,
      topic0,
    },
    headers: {
      Authorization: "Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0",
    },
  }).then((res) => {
    let data = res.data.data;
    data.forEach((item) => {
      let returnValues = decodeLogs(EventObject, {
        data: item.data,
        topics: item.topics,
      });
      item.returnValues = returnValues;
    });
    callback(data);
  });
};
// 创建Sell 映射对象
export const getSellList = async function(callback) {
  // let ContractAddress = getContract();
  let EventABI = OrderABI;
  let EventObject = EventABI.filter((item) => {
    return item.name == "Sell" && item.type == "event";
  })[0];

  let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
  Axios({
    method: "get",
    url: "https://api.helmet.insure/contract/logs",
    params: {
      contract: "0x4c899b7C39ded9a06a5db387f0b0722a18B8d70d",
      include_data: true,
      topic0,
    },
    headers: {
      Authorization: "Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0",
    },
  }).then((res) => {
    let data = res.data.data;
    data.forEach((item) => {
      let returnValues = decodeLogs(EventObject, {
        data: item.data,
        topics: item.topics,
      });
      item.returnValues = returnValues;
    });

    callback(data);
  });
};
// 创建Buy 映射对象
export const getBuyList = async function(callback) {
  // let ContractAddress = getContract();
  let EventABI = OrderABI;
  let EventObject = EventABI.filter((item) => {
    return item.name == "Buy" && item.type == "event";
  })[0];

  let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
  Axios({
    method: "get",
    url: "https://api.helmet.insure/contract/logs",
    params: {
      contract: "0x4c899b7C39ded9a06a5db387f0b0722a18B8d70d",
      include_data: true,
      topic0,
    },
    headers: {
      Authorization: "Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0",
    },
  }).then((res) => {
    let data = res.data.data;
    data.forEach((item) => {
      let returnValues = decodeLogs(EventObject, {
        data: item.data,
        topics: item.topics,
      });
      item.returnValues = returnValues;
    });

    callback(data);
  });
};
// 创建修改价格 映射对象
export const getRePriceList = async function(callback) {
  // let ContractAddress = getContract();
  let EventABI = OrderABI;
  let EventObject = EventABI.filter((item) => {
    return item.name == "Reprice" && item.type == "event";
  })[0];

  let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
  Axios({
    method: "get",
    url: "https://api.helmet.insure/contract/logs",
    params: {
      contract: "0x4c899b7C39ded9a06a5db387f0b0722a18B8d70d",
      include_data: true,
      topic0,
    },
    headers: {
      Authorization: "Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0",
    },
  }).then((res) => {
    let data = res.data.data;
    data.forEach((item) => {
      let returnValues = decodeLogs(EventObject, {
        data: item.data,
        topics: item.topics,
      });
      item.returnValues = returnValues;
    });

    callback(data);
  });
};
//获取 mint
export const getMintList = async function(callback) {
  // let ContractAddress = getContract();
  let EventABI = OrderABI;
  let EventObject = EventABI.filter((item) => {
    return item.name == "Reprice" && item.type == "event";
  })[0];

  let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
  Axios({
    method: "get",
    url: "https://api.helmet.insure/contract/logs",
    params: {
      contract: "0x021297e233550eDBa8e6487EB7c6696cFBB63b88",
      include_data: true,
      topic0,
    },
    headers: {
      Authorization: "Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0",
    },
  }).then((res) => {
    let data = res.data.data;
    data.forEach((item) => {
      let returnValues = decodeLogs(EventObject, {
        data: item.data,
        topics: item.topics,
      });
      item.returnValues = returnValues;
    });
    callback(data);
  });
};
//获取 mint
export const getExerciseList = async function() {
  // let ContractAddress = getContract();
  let EventABI = OrderABI;
  let EventObject = EventABI.filter((item) => {
    return item.name == "Exercise" && item.type == "event";
  })[0];

  let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
  return Axios({
    method: "get",
    url: "https://api.helmet.insure/contract/logs",
    params: {
      contract: "0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D",
      include_data: true,
      topic0,
    },
    headers: {
      Authorization: "Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0",
    },
  }).then((res) => {
    let data = res.data.data;
    data.forEach((item) => {
      let returnValues = decodeLogs(EventObject, {
        data: item.data,
        topics: item.topics,
      });
      item.returnValues = returnValues;
    });
    return data;
  });
};
export const getInsuranceStatus = () => {
  return Axios({
    method: "post",
    url: "https://api.thegraph.com/index-node/graphql",
    data: {
      query: `{
        indexingStatusForCurrentVersion(subgraphName: "app-helmet-insure/helmet-insure") {
            synced
            health
            fatalError {
                message
                block {
                    number
                    hash
                }
                handler
            }
            chains {
                chainHeadBlock {
                    number
                }
                latestBlock {
                    number
                }
            }
        }
    }`,
    },
  }).then((res) => {
    let Status = res.data.data.indexingStatusForCurrentVersion.health;
  });
};
getInsuranceStatus();
//get Insurance
export const getInsuranceList = async function() {
  return Axios({
    method: "post",
    url:
      "https://api.thegraph.com/subgraphs/name/app-helmet-insure/helmet-insure",
    data: {
      query: `{
                options(first:1000) {
                  id
                  creator
                  collateral 
                  underlying
                  strikePrice
                  expiry
                  long
                  short
                  asks(first:1000) {
                    askID
                    seller
                    volume
                    settleToken
                    price
                    isCancel
                    binds {
                      bidID
                      askID
                      buyer
                      volume
                      amount
                    }
                  }
                }
              }
              `,
    },
  });
};
export const getLongType = async function() {
  let rightTime = parseInt(moment.now());
  let leftTime = parseInt(moment.now()) - 518400000;
  console.log(rightTime, leftTime);
  return Axios({
    method: "post",
    url:
      "https://api.thegraph.com/subgraphs/name/app-helmet-insure/helmet-insure",
    data: {
      query: `{
                options(first: 1000) {
                  id
                  creator
                  collateral 
                  underlying
                  strikePrice
                  expiry
                  long
                  short
                  asks(first:1000) {
                    askID
                    seller
                    volume
                    settleToken
                    price
                    isCancel
                    binds {
                      bidID
                      askID
                      buyer
                      volume
                      amount
                    }
                  }
                }
              }
              `,
    },
  }).then((res) => {
    return res.data.data.options.length;
  });
};
export const getSignDataSyn = (data, callback) => {
  let SignNumberFlag = true;
  let SignResultData = [];
  for (let index = 1; index < 6; index++) {
    let params = qs.stringify(data, { encodeValuesOnly: true });
    let Url = `https://node${index}.chainswap.exchange/web/getSignDataSyn`;
    Axios.get(Url + "?" + params).then((res) => {
      try {
        if (SignResultData.length === 3 && SignNumberFlag) {
          SignNumberFlag = false;
          console.log(SignResultData);
          callback(SignResultData);
        } else {
          if (SignResultData.length < 3) {
            let { signatory, signV, signR, signS } = res.data.data;
            SignResultData.push([signatory, signV, signR, signS]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
};
export const getLongTokenValue = (data) => {
  return Axios.get("https://api.llama.fi/protocols").then((res) => {
    let data = res.data;
    let filterData = data.filter((item) => item.id === "437")[0];
    let TVLS = filterData.chainTvls.Binance;
    return TVLS;
  });
};
export const getTokenPrice = (data) => {
  return Axios({
    method: "get",
    url: "https://api.1inch.exchange/v3.0/56/quote",
    params: { ...data },
  }).then((res) => {
    return res;
  });
};
