import MiningABI from '~/abi/deposite_abi.json';
import ApproveABI from '~/abi/IPancakePair.json';
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

