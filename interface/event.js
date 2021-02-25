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
