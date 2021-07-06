import Vue from 'vue';
import { getContract } from '~/assets/utils/address-pool.js';
import Web3 from 'web3';
import Axios from 'axios';
import ERC20_abi from '~/abi/ERC20_abi.json';
import payaso_abi from '~/abi/payaso_abi.json';
import factory_abi from '~/abi/factory_abi.json';
import order_abi from '~/abi/order_abi.json';
import deposite_abi from '~/abi/deposite_abi.json';
import token_abi from '~/abi/token_abi.json';
import helmet_abi from '~/abi/helmet_abi.json';
import precision from '~/assets/js/precision.js';
import { fixDEAdd } from '~/assets/js/util.js';
import {
    TokenNameFormWei,
    DecimalsFormWei,
    DecimalsToWei,
    AddressFormWei,
} from '~/interface/common_contract.js';
import { toWei, fromWei } from '~/assets/utils/web3-fun.js';
import moment from 'moment';
import BigNumber from 'bignumber.js';
export const decodeLogs = function(event, log) {
    return window.WEB3.eth.abi.decodeLog(
        event.inputs,
        log.data,
        log.topics.slice(1)
    );
};
export const getLongValues = async function(addressArray) {
    let newArr = [],
        obj = {};
    addressArray.forEach((item) => {
        for (let key in item) {
            let value = item[key];
            key in obj
                ? (obj[key] = new BigNumber(obj[key]).plus(
                      new BigNumber(value)
                  ))
                : (obj[key] = new BigNumber(value));
        }
    });
    for (let i in obj) {
        let o = {};
        o[i] = obj[i];
        newArr.push(o);
    }
    return Axios({
        method: 'post',
        url: 'https://api.helmet.insure/api/getTokenValueArray/',
        data: JSON.stringify(newArr),
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            // Authorization: "Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0",
        },
    });
};
export const getLongValue = async function(addressArray) {
    return Axios({
        method: 'post',
        url: 'https://api.helmet.insure/api/getTokenValueArray/',
        data: JSON.stringify(addressArray),
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            // Authorization: "Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0",
        },
    });
};
// 获取long, Sell, Buy映射
export const getLongList = async function(callback) {
    // let ContractAddress = getContract();
    let EventABI = factory_abi.abi;
    let EventObject = EventABI.filter((item) => {
        return item.name == 'OptionCreated' && item.type == 'event';
    })[0];

    let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
    Axios({
        method: 'get',
        url: 'https://api.helmet.insure/contract/logs',
        params: {
            contract: '0x021297e233550eDBa8e6487EB7c6696cFBB63b88',
            include_data: true,
            topic0,
        },
        headers: {
            Authorization: 'Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0',
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
    let EventABI = order_abi.abi;
    let EventObject = EventABI.filter((item) => {
        return item.name == 'Sell' && item.type == 'event';
    })[0];

    let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
    Axios({
        method: 'get',
        url: 'https://api.helmet.insure/contract/logs',
        params: {
            contract: '0x4c899b7C39ded9a06a5db387f0b0722a18B8d70d',
            include_data: true,
            topic0,
        },
        headers: {
            Authorization: 'Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0',
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
    let EventABI = order_abi.abi;
    let EventObject = EventABI.filter((item) => {
        return item.name == 'Buy' && item.type == 'event';
    })[0];

    let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
    Axios({
        method: 'get',
        url: 'https://api.helmet.insure/contract/logs',
        params: {
            contract: '0x4c899b7C39ded9a06a5db387f0b0722a18B8d70d',
            include_data: true,
            topic0,
        },
        headers: {
            Authorization: 'Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0',
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
    let EventABI = order_abi.abi;
    let EventObject = EventABI.filter((item) => {
        return item.name == 'Reprice' && item.type == 'event';
    })[0];

    let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
    Axios({
        method: 'get',
        url: 'https://api.helmet.insure/contract/logs',
        params: {
            contract: '0x4c899b7C39ded9a06a5db387f0b0722a18B8d70d',
            include_data: true,
            topic0,
        },
        headers: {
            Authorization: 'Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0',
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
    let EventABI = order_abi.abi;
    let EventObject = EventABI.filter((item) => {
        return item.name == 'Reprice' && item.type == 'event';
    })[0];

    let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
    Axios({
        method: 'get',
        url: 'https://api.helmet.insure/contract/logs',
        params: {
            contract: '0x021297e233550eDBa8e6487EB7c6696cFBB63b88',
            include_data: true,
            topic0,
        },
        headers: {
            Authorization: 'Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0',
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
    let EventABI = order_abi.abi;
    let EventObject = EventABI.filter((item) => {
        return item.name == 'Exercise' && item.type == 'event';
    })[0];

    let topic0 = window.WEB3.eth.abi.encodeEventSignature(EventObject);
    return Axios({
        method: 'get',
        url: 'https://api.helmet.insure/contract/logs',
        params: {
            contract: '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D',
            include_data: true,
            topic0,
        },
        headers: {
            Authorization: 'Bearer e5fa8358-42f3-4fa1-918d-2a972f4c5de0',
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
//get Insurance
export const getInsuranceList = async function() {
    let rightTime = parseInt(moment.now());
    let leftTime = parseInt(moment.now()) - 518400000;
    console.log(rightTime, leftTime);
    return Axios({
        method: 'post',
        url:
            'https://api.thegraph.com/subgraphs/name/app-helmet-insure/helmet-insure',
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
                  asks {
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
        method: 'post',
        url:
            'https://api.thegraph.com/subgraphs/name/app-helmet-insure/helmet-insure',
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
                  asks {
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
export const getLongValuess = async function() {
    let rightTime = parseInt(moment.now());
    let leftTime = parseInt(moment.now()) - 518400000;
    return Axios({
        method: 'post',
        url:
            'https://api.thegraph.com/subgraphs/name/app-helmet-insure/helmet-insure',
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
                  asks {
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
    }).then(async (res) => {
        let list = res.data.data.options;
        let longList = list.filter((item) => {
            return item.asks.length > 0;
        });
        let arr = [];
        let arr1 = [];
        longList.forEach((item) => {
            item.asks.forEach((itemAsks) => {
                let obj = Object.assign(itemAsks, item);
                itemAsks.binds.forEach((itemBids) => {
                    itemBids.buyVolume = itemBids.volume;
                    let obj1 = Object.assign(itemBids, obj);
                    if (
                        !itemBids.isCancel &&
                        item.expiry.length === 10 &&
                        itemBids.volume != 0
                    ) {
                        arr.push(obj1);
                    }
                });
            });
        });
        arr1 = arr.map((item) => {
            let key = item.collateral;
            let obj = {};
            obj[key] = item.buyVolume;
            return obj;
        });
        let result = await getLongValues(arr1);
        let value = 0;
        result.data.map((item) => {
            if (Object.values(item)[0] && Number(Object.values(item)[0] >= 0)) {
                value += Object.values(item)[0];
            }
            return value;
        });
        return value;
    });
};
