import { IIO, expERC20, Deposite } from './index.js';
import {
    getAddress,
    getContract,
    getWei,
    getID,
} from '~/assets/utils/address-pool.js';
import { toWei, fromWei } from '~/assets/utils/web3-fun.js';
import bus from '~/assets/js/bus';
import Message from '~/components/common/Message';
export const getBalance = async (type, Decimals = 18) => {
    // const WEB3 = await web3();
    // const charID = await getID();
    const charID = window.chainID;
    let adress = type;
    if (type.indexOf('0x') === -1) {
        adress = getContract(type, charID);
    }
    if (!adress || !window.CURRENTADDRESS) {
        return 0;
    }
    const deposite = await Deposite(adress);
    return deposite.methods
        .balanceOf(window.CURRENTADDRESS)
        .call()
        .then((res) => {
            if (Decimals != 18) {
                let result = Number(res) / Math.pow(10, Decimals);
                return result;
            } else {
                let result = fromWei(res);
                return result;
            }
        });
};
// 是否购买门票
export const applied3 = async (ContractAdress, RewardAdress) => {
    const charID = window.chainID;
    const account = window.CURRENTADDRESS;
    if (ContractAdress.indexOf('0x') === -1) {
        ContractAdress = getContract(ContractAdress, charID);
    }
    if (RewardAdress.indexOf('0x') === -1) {
        RewardAdress = getContract(RewardAdress, charID);
    }
    const IIOContract = await IIO(ContractAdress);
    return IIOContract.methods
        .applied3(RewardAdress, account)
        .call()
        .then((res) => {
            return res;
        });
};
// 门票价格
export const ticketVol3 = async (ContractAdress, TicketAddress) => {
    const charID = window.chainID;
    if (ContractAdress.indexOf('0x') === -1) {
        ContractAdress = getContract(ContractAdress, charID);
    }
    if (TicketAddress.indexOf('0x') === -1) {
        TicketAddress = getContract(TicketAddress, charID);
    }
    const IIOContract = await IIO(ContractAdress);
    return IIOContract.methods
        .ticketVol3(TicketAddress)
        .call()
        .then((res) => {
            let unit = TicketAddress;
            return window.WEB3.utils.fromWei(res, getWei(unit));
        });
};
// 可领取数量
export const earned3 = async (ContractAdress, RewardAdress, Decimals = 18) => {
    const charID = window.chainID;
    const account = window.CURRENTADDRESS;
    if (ContractAdress.indexOf('0x') === -1) {
        ContractAdress = getContract(ContractAdress, charID);
    }
    if (RewardAdress.indexOf('0x') === -1) {
        RewardAdress = getContract(RewardAdress, charID);
    }
    const IIOContract = await IIO(ContractAdress);
    return IIOContract.methods
        .earned3(RewardAdress, account)
        .call()
        .then((res) => {
            let result = Number(res) / Math.pow(10, Decimals);
            return result;
        });
};
// 领取奖励
export const getReward3 = async (type, RewardAdress) => {
    const charID = window.chainID;
    const account = window.CURRENTADDRESS;
    let ContractAdress;
    if (type.indexOf('0x') === -1) {
        ContractAdress = getContract(type, charID);
    }
    if (RewardAdress.indexOf('0x') === -1) {
        RewardAdress = getContract(RewardAdress, charID);
    }
    const IIOContract = await IIO(ContractAdress);
    try {
        IIOContract.methods
            .getReward3(RewardAdress)
            .send({ from: account })
            .on('transactionHash', function(hash) {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('OPEN_STATUS_DIALOG', {
                    title: 'Waiting For Confirmation',
                    layout: 'layout2',
                    loading: true,
                    buttonText: 'Confirm',
                    conTit: 'Please Confirm the transaction in your wallet',
                    conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
                });
            })
            .on('receipt', function(receipt) {
                bus.$emit(`CLAIM_LOADING_${type}`);
                bus.$emit('REFRESH_BALANCE');
                if (window.statusDialog) {
                    bus.$emit('CLOSE_STATUS_DIALOG');
                    bus.$emit('OPEN_STATUS_DIALOG', {
                        title: 'Transation submitted',
                        layout: 'layout2',
                        buttonText: 'Confirm',
                        conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
                        button: true,
                        buttonText: 'Confirm',
                        showDialog: false,
                    });
                } else {
                    Message({
                        message: 'Claim activated successfully',
                        type: 'success',
                    });
                }
            })
            .on('error', function(error, receipt) {
                bus.$emit(`CLAIM_LOADING_${type}`);
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('REFRESH_BALANCE');
            });
    } catch (error) {
        console.log(error);
    }
};
export const applyReward3 = async (data, callBack) => {
    let ContractAdress = data.ContractAdress;
    let RewardAdress = data.RewardAdress;
    let TicketAddress = data.TicketAddress;
    let TicketPrice = data.PassportPrice;
    if (!ContractAdress || !TicketAddress || !TicketPrice) {
        return;
    }
    const charID = window.chainID;
    const account = window.CURRENTADDRESS;
    if (ContractAdress.indexOf('0x') === -1) {
        ContractAdress = getContract(ContractAdress, charID);
    }
    if (RewardAdress.indexOf('0x') === -1) {
        RewardAdress = getContract(RewardAdress, charID);
    }
    if (TicketAddress.indexOf('0x') === -1) {
        TicketAddress = getContract(TicketAddress, charID);
    }
    try {
        const Contract = await expERC20(TicketAddress);
        await oneKeyArrpove(Contract, ContractAdress, 1000000, (res) => {
            if (res == 'failed') {
                bus.$emit('CLOSE_LOADING_STATUS');
            }
        });
        const IIOContract = await IIO(ContractAdress);
        IIOContract.methods
            .applyReward3(RewardAdress)
            .send({ from: account })
            .on('transactionHash', function(hash) {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('OPEN_STATUS_DIALOG', {
                    title: 'Waiting For Confirmation',
                    layout: 'layout2',
                    loading: true,
                    buttonText: 'Confirm',
                    conTit: 'Please Confirm the transaction in your wallet',
                    conText: `<span>It will cost ${TicketPrice} HELMET for the Ticket</span>`,
                });
            })
            .on('receipt', function(receipt) {
                if (window.statusDialog) {
                    bus.$emit('CLOSE_STATUS_DIALOG');
                    bus.$emit('OPEN_STATUS_DIALOG', {
                        title: 'Transation submitted',
                        layout: 'layout2',
                        buttonText: 'Confirm',
                        conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
                        button: true,
                        buttonText: 'Confirm',
                        showDialog: false,
                    });
                } else {
                    Message({
                        message: 'GetRewards Successfully',
                        type: 'success',
                    });
                }
                bus.$emit(`REFRESH_${data.ContractAdress}`);
                bus.$emit('CLOSE_LOADING_STATUS');
            })
            .on('error', function(error, receipt) {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('CLOSE_LOADING_STATUS');
            });
    } catch (error) {
        console.log(error);
    }
};
const allowance = async (token_exp, contract_str) => {
    // const WEB3 = await web3();
    const charID = await getID();
    const result = await token_exp.methods
        .allowance(window.CURRENTADDRESS, contract_str)
        .call({ from: window.CURRENTADDRESS });

    return window.WEB3.utils.fromWei(result, getWei());
};
// 一键授权
const oneKeyArrpove = async (token_exp, contract_str, num, callback) => {
    if (contract_str.indexOf('0x') === -1) {
        contract_str = getContract(contract_str, charID);
    }
    // 校验参数
    if (!token_exp || !contract_str) return;
    // 判断授权额度是否充足
    const awc = await allowance(token_exp, contract_str);
    if (parseInt(awc) >= parseInt(num)) {
        return;
    }
    // 无限授权
    const res = await approve(token_exp, contract_str, callback);
};

const approve = async (token_exp, contract_str, callback = (status) => {}) => {
    const charID = await getID();
    const result = await token_exp.methods
        .approve(
            contract_str,
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
        )
        .send({ from: window.CURRENTADDRESS })
        .on('transactionHash', (hash) => {
            callback('approve');
        })
        .on('receipt', function(receipt) {
            callback('success');
        })
        .on('error', (err, receipt) => {
            bus.$emit('CLOSE_STATUS_DIALOG');
            callback('failed');
        });
    return result;
};
