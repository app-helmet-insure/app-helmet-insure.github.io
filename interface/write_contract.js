import MiningABI from '~/abi/deposite_abi.json';
import ApproveABI from '~/abi/IPancakePair.json';
import CompoundABI from '~/abi/helmet_abi.json';
import {
    Contract,
    getAccounts,
    getDecimals,
    toWei,
    fromWei,
} from './common_contract.js';
import BigNumber from 'bignumber.js';
import bus from '~/assets/js/bus';

export const Stake = async (
    { ContractAddress, DepositeVolume, Decimals },
    callback
) => {
    let Contracts = await Contract(MiningABI.abi, ContractAddress);
    let Account = await getAccounts();
    let DecimalsUnit = getDecimals(Decimals);
    if (DecimalsUnit) {
        DepositeVolume = toWei(DepositeVolume, DecimalsUnit);
    } else {
        let powNumber = new BigNumber(10).pow(Decimals).toString();
        DepositeVolume = new BigNumber(DepositeVolume)
            .times(powNumber)
            .toString();
    }
    try {
        Contracts.methods
            .stake(DepositeVolume)
            .send({ from: Account })
            .on('transactionHash', (hash) => {
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
            .on('receipt', (receipt) => {
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
                callback('success');
            })
            .on('error', (error) => {
                bus.$emit('CLOSE_STATUS_DIALOG');
                callback('error');
            });
    } catch (error) {}
};
export const GetReward = async (ContractAddress, callback) => {
    let Contracts = await Contract(MiningABI.abi, ContractAddress);
    let Account = await getAccounts();
    try {
        Contracts.methods
            .getReward()
            .send({ from: Account })
            .on('transactionHash', (hash) => {
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
            .on('receipt', (receipt) => {
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
                callback('success');
            })
            .on('error', (error) => {
                bus.$emit('CLOSE_STATUS_DIALOG');
                callback('error');
            });
    } catch (error) {}
};
export const GetDoubleReward = async (ContractAddress, callback) => {
    let Contracts = await Contract(MiningABI.abi, ContractAddress);
    let Account = await getAccounts();
    try {
        Contracts.methods
            .getDoubleReward()
            .send({ from: Account })
            .on('transactionHash', (hash) => {
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
            .on('receipt', (receipt) => {
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
                callback('success');
            })
            .on('error', (error) => {
                bus.$emit('CLOSE_STATUS_DIALOG');
                callback('error');
            });
    } catch (error) {}
};
export const Exit = async (ContractAddress, callback) => {
    let Contracts = await Contract(MiningABI.abi, ContractAddress);
    let Account = await getAccounts();
    try {
        Contracts.methods
            .exit()
            .send({ from: Account })
            .on('transactionHash', (hash) => {
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
            .on('receipt', (receipt) => {
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
                callback('success');
            })
            .on('error', (error) => {
                bus.$emit('CLOSE_STATUS_DIALOG');
                callback('error');
            });
    } catch (error) {}
};
export const Compound = async (ContractAddress, callback) => {
    let Contracts = await Contract(CompoundABI.abi, ContractAddress);
    let Account = await getAccounts();
    try {
        Contracts.methods
            .compound()
            .send({ from: Account })
            .on('transactionHash', (hash) => {
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
            .on('receipt', (receipt) => {
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
                callback('success');
            })
            .on('error', (error) => {
                bus.$emit('CLOSE_STATUS_DIALOG');
                callback('error');
            });
    } catch (error) {}
};
export const Approve = async (
    TokenAddress,
    SepnderAddress,
    TokenSymbol,
    callback
) => {
    let Contracts = await Contract(ApproveABI.abi, TokenAddress);
    let Account = await getAccounts();
    try {
        Contracts.methods
            .approve(
                SepnderAddress,
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
            )
            .send({ from: Account })
            .on('transactionHash', (hash) => {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('OPEN_STATUS_DIALOG', {
                    title: 'Waiting For Confirmation',
                    layout: 'layout2',
                    loading: true,
                    buttonText: 'Confirm',
                    conTit: 'Please Confirm the transaction in your wallet',
                    conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">You will approve ${TokenSymbol} to HELMET</a>`,
                });
            })
            .on('receipt', (receipt) => {
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
                callback('success');
            })
            .on('error', (err) => {
                bus.$emit('CLOSE_STATUS_DIALOG');
                callback('error');
            });
    } catch (error) {
        console.log(error);
    }
};
