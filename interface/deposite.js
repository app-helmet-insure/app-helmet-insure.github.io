import { Factory, Order, expERC20, Deposite, HelmetMining } from './index';
import {
    getAddress,
    getContract,
    getWei,
    getID,
} from '~/assets/utils/address-pool.js';
// import { oneKeyArrpove } from '~/interface/order.js';
import { toWei, fromWei } from '~/assets/utils/web3-fun.js';
import precision from '~/assets/js/precision.js';
import { fixD, toRounding } from '~/assets/js/util.js';
import bus from '~/assets/js/bus';
import Notification from '~/components/common/Notification';
import Message from '~/components/common/Message';

const netObj = {
    1: '',
    3: 'ropsten.',
    4: 'rinkeby.',
    56: 'BSC',
};
export const compound = async (address, type) => {
    const charID = window.chainID;
    let adress = address;
    if (address.indexOf('0x') === -1) {
        adress = getContract(address, charID);
    }
    let result;
    const account = window.CURRENTADDRESS;
    const HelmetMetheds = await HelmetMining(adress);
    bus.$emit('CLOSE_COMPOUND');
    try {
        result = HelmetMetheds.methods
            .compound()
            .send({ from: account })
            .on('transactionHash', function(hash) {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('OPEN_STATUS_DIALOG', {
                    type: 'submit',
                    conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
                });
            })
            .on('confirmation', function(confirmationNumber, receipt) {
                if (confirmationNumber === 0) {
                    if (window.statusDialog) {
                        bus.$emit('CLOSE_STATUS_DIALOG');
                        bus.$emit('OPEN_STATUS_DIALOG', {
                            type: 'success',
                            title: 'Successfully Compound',
                            conTit:
                                '<div>Compound activated successfully</div>',
                            conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
                        });
                    } else {
                        Message({
                            message: 'Compound activated successfully',
                            type: 'success',
                        });
                    }
                    setTimeout(() => {
                        bus.$emit('REFRESH_ASSETS');
                        bus.$emit('REFRESH_MINING');
                        bus.$emit('REFRESH_BALANCE');
                        bus.$emit(`RELOAD_DATA_${type}`);
                    }, 1000);
                }
            })
            .on('error', function(error, receipt) {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('REFRESH_BALANCE');
                // if (error && error.message) {
                //     Message({
                //         message: error && error.message,
                //         type: 'error',
                //     });
                // }
            });
    } catch {}
};
export const totalSupply = async (address) => {
    const charID = window.chainID;
    let adress = address;
    if (address.indexOf('0x') === -1) {
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
export const balanceOf = async (type, currcy, flag = false) => {
    const charID = window.chainID;
    let adress = type;
    if (flag) {
        if (type.indexOf('0x') === -1) {
            adress = getContract(type, charID);
        }
    } else {
        if (type.indexOf('0x') === -1) {
            adress = getAddress(type, charID);
        }
    }

    if (currcy.indexOf('0x') === -1) {
        currcy = getContract(currcy, charID);
    }
    if (!adress && !currcy) {
        return 0;
    }
    const contract = await expERC20(adress);
    return contract.methods
        .balanceOf(currcy)
        .call()
        .then((res) => {
            let tocurrcy = type || currcy;
            return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
        });
};
export const toDeposite = async (type, data, flag, callBack) => {
    const charID = window.chainID;
    const address = window.CURRENTADDRESS;
    let amount = data.amount;
    let num = data.amount;
    amount = toWei(amount, type);
    let adress = type;
    let adressLPT = type;
    if (type.indexOf('0x') === -1) {
        adress = getContract(type, charID);
        adressLPT = getContract(type + '_LPT', charID);
    }
    if (!adress || !adressLPT || !address) {
        return;
    }
    let result;
    bus.$emit(`DEPOSITE_LOADING_${type}`, { status: true });
    try {
        const Contract = await expERC20(adressLPT);
        if (flag) {
            await oneKeyArrpove(Contract, type, amount, (res) => {
                if (res === 'failed') {
                    bus.$emit(`DEPOSITE_LOADING_${type}`, { status: false });
                }
            });
        } else {
            await approve2(Contract, type, num, (res) => {
                if (res === 'failed') {
                    bus.$emit(`DEPOSITE_LOADING_${type}`, { status: false });
                }
            });
        }

        const deposite = await Deposite(adress);
        result = deposite.methods
            .stake(amount)
            .send({ from: address })
            .on('transactionHash', function(hash) {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('OPEN_STATUS_DIALOG', {
                    type: 'submit',
                    conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
                });
            })
            .on('confirmation', function(confirmationNumber, receipt) {
                if (confirmationNumber === 0) {
                    bus.$emit(`DEPOSITE_LOADING_${type}`, { status: false });
                    bus.$emit(`RELOAD_DATA_${type}`);
                    bus.$emit('REFRESH_BALANCE');
                    if (window.statusDialog) {
                        bus.$emit('CLOSE_STATUS_DIALOG');
                        bus.$emit('OPEN_STATUS_DIALOG', {
                            type: 'success',
                            title: 'Successfully stake',
                            conTit: '<div>Stake activated successfully</div>',
                            conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
                        });
                    } else {
                        Message({
                            message: 'Stake activated successfully',
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
                bus.$emit(`DEPOSITE_LOADING_${type}`, { status: false });
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('REFRESH_BALANCE');

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
export const toWithdraw = async (type, data, flag, callBack) => {
    const charID = window.chainID;
    const address = window.CURRENTADDRESS;
    let amount = data.amount;
    let num = data.amount;
    amount = toWei(amount);
    let adress = type;
    let adressLPT = type;
    if (type.indexOf('0x') === -1) {
        adress = getContract(type, charID);
        adressLPT = getContract(type + '_LPT', charID);
    }
    if (!adress || !adressLPT || !address) {
        return;
    }
    let result;
    bus.$emit('WITHDRAW_LOADING', {
        type: type,
        status: true,
    });
    try {
        const Contract = await expERC20(adressLPT);
        if (flag) {
            await oneKeyArrpove(Contract, type, amount, (res) => {
                if (res === 'failed') {
                    bus.$emit('WITHDRAW_LOADING', {
                        type: type,
                        status: false,
                    });
                }
            });
        } else {
            await approve2(Contract, type, num, (res) => {
                if (res === 'failed') {
                    bus.$emit('WITHDRAW_LOADING', {
                        type: type,
                        status: false,
                    });
                }
            });
        }

        const deposite = await Deposite(adress);
        result = deposite.methods
            .withdraw(amount)
            .send({ from: address })
            .on('transactionHash', function(hash) {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('OPEN_STATUS_DIALOG', {
                    type: 'submit',
                    conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
                });
            })
            .on('confirmation', function(confirmationNumber, receipt) {
                if (confirmationNumber === 0) {
                    bus.$emit('WITHDRAW_LOADING', {
                        type: type,
                        status: false,
                    });
                    if (window.statusDialog) {
                        bus.$emit('CLOSE_STATUS_DIALOG');
                        bus.$emit('OPEN_STATUS_DIALOG', {
                            type: 'success',
                            title: 'Successfully unstake',
                            conTit: '<div>Unstake activated successfully</div>',
                            conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>  `,
                        });
                    } else {
                        Message({
                            message: 'Unstake activated successfully',
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
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('WITHDRAW_LOADING', {
                    type: type,
                    status: false,
                });
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
export const WithdrawAvailable = async (type) => {
    const charID = window.chainID;
    let adress = type;
    if (type.indexOf('0x') === -1) {
        adress = getContract(type, charID);
    }
    if (!adress || !window.CURRENTADDRESS) {
        return 0;
    }
    const contract = await expERC20(adress);
    return contract.methods
        .balanceOf(window.CURRENTADDRESS)
        .call()
        .then((res) => {
            let tocurrcy = type;
            return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
        });
};
export const CangetPAYA = async (type, currcy) => {
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
        .earned(window.CURRENTADDRESS)
        .call()
        .then((res) => {
            let tocurrcy = currcy || 'HELMET';
            return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
        });
};
export const CangetUNI = async (type) => {
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
        .earned2(window.CURRENTADDRESS)
        .call()
        .then((res) => {
            let tocurrcy = type;
            return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
        });
};
export const getPAYA = async (type) => {
    const charID = window.chainID;
    let adress = type;
    if (type.indexOf('0x') === -1) {
        adress = getContract(type, charID);
    }
    if (!adress || !window.CURRENTADDRESS) {
        return 0;
    }
    const deposite = await Deposite(adress);
    let result;
    try {
        deposite.methods
            .getReward()
            .send({ from: window.CURRENTADDRESS })
            .on('transactionHash', function(hash) {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('OPEN_STATUS_DIALOG', {
                    type: 'submit',
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
                            type: 'success',
                            title: 'Successfully claim',
                            conTit: '<div>Claim activated successfully</div>',
                            conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
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

export const getDoubleReward = async (type) => {
    const charID = window.chainID;
    let adress = type;
    if (type.indexOf('0x') === -1) {
        adress = getContract(type, charID);
    }
    if (!adress || !window.CURRENTADDRESS) {
        return 0;
    }
    const deposite = await Deposite(adress);
    let result;
    try {
        deposite.methods
            .getDoubleReward()
            .send({ from: window.CURRENTADDRESS })
            .on('transactionHash', function(hash) {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('OPEN_STATUS_DIALOG', {
                    type: 'submit',
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
                            type: 'success',
                            title: 'Successfully claim',
                            conTit: '<div>Claim activated successfully</div>',
                            conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
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
                bus.$emit(`RELOAD_DATA_${type}`);
                bus.$emit('REFRESH_BALANCE');
                bus.$emit('CLOSE_STATUS_DIALOG');
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
export const getUNI = async (type) => {
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
        .getReward2()
        .send({ from: window.CURRENTADDRESS })
        .then((res) => {
            let tocurrcy = type;
            return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
        });
};
export const getLPTOKEN = async (type) => {
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
            let tocurrcy = type;
            return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
        });
};
const allowance = async (token_exp, contract_str) => {
    if (!window.CURRENTADDRESS) {
        return 0;
    }
    const result = await token_exp.methods
        .allowance(
            window.CURRENTADDRESS,
            getContract(contract_str, window.chainID)
        )
        .call({ from: window.CURRENTADDRESS });

    return window.WEB3.utils.fromWei(result, getWei());
};

// 一键授权
const oneKeyArrpove = async (token_exp, contract_str, num, callback) => {
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
const approve2 = async (
    token_exp,
    contract_str,
    num,
    callback = (status) => {}
) => {
    if (!window.CURRENTADDRESS) {
        return 0;
    }
    const awc = await allowance(token_exp, contract_str);
    if (awc >= num) {
        return;
    }
    num = toWei(num);
    const charID = await getID();
    const result = await token_exp.methods
        .approve(getContract(contract_str, charID), num)
        .send({ from: window.CURRENTADDRESS })
        .on('transactionHash', (hash) => {
            callback('approve');
        })
        .on('confirmation', (_, receipt) => {
            callback('success');
        })
        .on('error', (err, receipt) => {
            callback('failed');
        });
    return result;
};
const approve = async (token_exp, contract_str, callback = (status) => {}) => {
    // const WEB3 = await web3();
    if (!window.CURRENTADDRESS) {
        return 0;
    }
    const charID = await getID();
    const result = await token_exp.methods
        .approve(
            getContract(contract_str, charID),
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
            callback('failed');
        });
    return result;
};

export const getBalance = async (type, currcy) => {
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
            let tocurrcy = currcy ? currcy : type;
            return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
        });
};
export const getLastTime = async (type, currcy) => {
    const charID = window.chainID;
    let adress = type;
    if (type.indexOf('0x') === -1) {
        adress = getContract(type, charID);
    }
    if (!adress) {
        return 0;
    }
    const deposite = await Deposite(adress);
    return deposite.methods
        .lastTimeRewardApplicable()
        .call()
        .then((res) => {
            return res;
        });
};
export const exitStake = async (type) => {
    const charID = window.chainID;
    let adress = type;
    if (type.indexOf('0x') === -1) {
        adress = getContract(type, charID);
    }
    if (!adress || !window.CURRENTADDRESS) {
        return;
    }
    const deposite = await Deposite(adress);
    let result;
    try {
        deposite.methods
            .exit()
            .send({ from: window.CURRENTADDRESS })
            .on('transactionHash', function(hash) {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('OPEN_STATUS_DIALOG', {
                    type: 'submit',
                    conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
                });
            })
            .on('confirmation', function(confirmationNumber, receipt) {
                if (confirmationNumber === 0) {
                    bus.$emit(`EXIT_LOADING_${type}`);
                    bus.$emit(`RELOAD_DATA_${type}`);
                    bus.$emit('REFRESH_BALANCE');
                    if (window.statusDialog) {
                        bus.$emit('CLOSE_STATUS_DIALOG');
                        bus.$emit('OPEN_STATUS_DIALOG', {
                            type: 'success',
                            title: 'Successfully Claim&Unstake',
                            conTit:
                                '<div>Claim&Unstake activated successfully</div>',
                            conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
                        });
                    } else {
                        Message({
                            message: 'Claim&Unstake activated successfully',
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
                bus.$emit(`EXIT_LOADING_${type}`);
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('REFRESH_BALANCE');
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

export const approveStatus = async (type) => {
    const charID = window.chainID;
    let adress = type;
    let adressLPT = type;
    if (type.indexOf('0x') === -1) {
        adress = getContract(type, charID);
        adressLPT = getContract(type + '_LPT', charID);
    }
    const Contract = await expERC20(adressLPT);
    if (adress && adressLPT) {
        const awc = await allowance(Contract, type);
        return awc;
    } else {
        return 0;
    }
};
export const getAllHelmet = async (contractAdress, adress1, adress2) => {
    const charID = window.chainID;

    if (contractAdress.indexOf('0x') === -1) {
        contractAdress = getContract(contractAdress, charID);
    }
    if (adress1.indexOf('0x') === -1) {
        adress1 = getContract(adress1, charID);
    }
    if (adress2.indexOf('0x') === -1) {
        adress2 = getContract(adress2, charID);
    }
    const Contract = await expERC20(contractAdress);

    const result = await Contract.methods.allowance(adress1, adress2).call();

    return window.WEB3.utils.fromWei(result, getWei());
};
export const Rewards = async (contractAdress, adress1) => {
    const charID = window.chainID;

    if (contractAdress.indexOf('0x') === -1) {
        contractAdress = getContract(contractAdress, charID);
    }
    if (adress1 == 0) {
        adress1 = '0x0000000000000000000000000000000000000000';
    }
    if (adress1.indexOf('0x') === -1) {
        adress1 = getContract(adress1, charID);
    }

    const Contract = await Deposite(contractAdress);

    const result = await Contract.methods
        .rewards('0x0000000000000000000000000000000000000000')
        .call();

    return window.WEB3.utils.fromWei(result, getWei());
};
export const RewardsDuration = async (contractAdress) => {
    const charID = window.chainID;

    if (contractAdress.indexOf('0x') === -1) {
        contractAdress = getContract(contractAdress, charID);
    }

    const Contract = await Deposite(contractAdress);

    const result = await Contract.methods.rewardsDuration().call();

    return result;
};
