import { IIO, expERC20 } from './index.js';
import {
    getAddress,
    getContract,
    getWei,
    getID,
} from '~/assets/utils/address-pool.js';
import bus from '~/assets/js/bus';
import Message from '~/components/common/Message';
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
export const earned3 = async (ContractAdress) => {
    const charID = window.chainID;
    const account = window.CURRENTADDRESS;
    if (ContractAdress.indexOf('0x') === -1) {
        ContractAdress = getContract(ContractAdress, charID);
    }
    const IIOContract = await IIO(ContractAdress);
    return IIOContract.methods
        .earned3(account)
        .call()
        .then((res) => {
            let unit = ContractAdress;
            return window.WEB3.utils.fromWei(res, getWei(unit));
        });
};
// 领取奖励
export const getReward3 = async (type) => {
    const charID = window.chainID;
    const account = window.CURRENTADDRESS;
    let ContractAdress;
    if (type.indexOf('0x') === -1) {
        ContractAdress = getContract(type, charID);
    }
    const IIOContract = await IIO(ContractAdress);
    try {
        IIOContract.methods
            .getReward3()
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
            .on('confirmation', function(confirmationNumber, receipt) {
                if (confirmationNumber === 0) {
                    bus.$emit(`CLAIM_LOADING_${type}`);
                    bus.$emit(`RELOAD_DATA_${type}`);
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
                    setTimeout(() => {
                        bus.$emit('REFRESH_ASSETS');
                        bus.$emit('REFRESH_MINING');
                    }, 1000);
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
    console.log(data);
    let ContractAdress = data.ContractAdress;
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
    if (TicketAddress.indexOf('0x') === -1) {
        TicketAddress = getContract(TicketAddress, charID);
    }

    try {
        const Contract = await expERC20(TicketAddress);
        await oneKeyArrpove(Contract, ContractAdress, 1000000, callBack);
        const IIOContract = await IIO(ContractAdress);
        IIOContract.methods
            .applyReward3()
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
            .on('confirmation', function(confirmationNumber, receipt) {
                if (confirmationNumber === 0) {
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
                    setTimeout(() => {
                        console.log(data);
                        bus.$emit(`REFRESH_${data.ContractAdress}`);
                    }, 1000);
                }
            })
            .on('error', function(error, receipt) {
                bus.$emit('CLOSE_STATUS_DIALOG');
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
        // console.log("额度充足", parseInt(awc));
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
        .on('confirmation', (_, receipt) => {
            callback('success');
        })
        .on('error', (err, receipt) => {
            bus.$emit('CLOSE_STATUS_DIALOG');
            callback('failed');
        });
    return result;
};
