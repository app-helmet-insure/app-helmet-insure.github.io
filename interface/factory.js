import { Factory } from './index.js';
import { getWei } from '~/assets/utils/address-pool.js';
import { toWei, fromWei } from '~/web3/index.js';
import bus from '~/assets/js/bus';
import Message from '~/components/common/Message';
import { fixD, addCommom } from '~/assets/js/util.js';

let factoryObj = null;
const netObj = {
    1: '',
    3: 'ropsten.',
    4: 'rinkeby.',
    56: 'BSC',
};
const getFactory = async () => {
    if (!factoryObj) {
        factoryObj = await Factory();
    }
    return factoryObj;
};

export const settleable = async (seller, short) => {
    const factory = await getFactory();
    return factory.methods
        .settleable(seller, short)
        .call()
        .then((res) => {
            return res;
        });
};

export const burn = async (longOrshort, volume, opt = {}, data, callback) => {
    if (JSON.stringify(data) === '{}') {
        return false;
    }
    let colValue = addCommom(data.col + Number(data.longBalance), 8);
    let undValue = addCommom(data.und, 8);
    const factory = await getFactory();
    const wei = await getWei(opt._collateral);
    let fix = wei === 'lovelace' ? 6 : 18;
    // const address = window.CURRENTADDRESS;
    const address = window.CURRENTADDRESS;
    // return;
    return factory.methods
        .burn(longOrshort, toWei(volume, opt._collateral))
        .send({ from: address })
        .on('transactionHash', (hash) => {
            bus.$emit('CLOSE_STATUS_DIALOG');
            bus.$emit('OPEN_STATUS_DIALOG', {
                title: 'Waiting For Confirmation',
                layout: 'layout2',
                loading: true,
                buttonText: 'Confirm',
                conTit: 'Please Confirm the transaction in your wallet',
                conText: `<p>Settlement ${addCommom(data.claimBalance)} ${
                    data.collateral_symbol
                }</p>`,
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
            }
            callback('success');
            bus.$emit('REFRESH_BALANCE');
        })
        .on('error', function(error, receipt) {
            bus.$emit('CLOSE_STATUS_DIALOG');
            callback('error');
        });
};

export const settle = async (short, data, callback) => {
    if (JSON.stringify(data) === '{}') {
        return false;
    }
    let colValue = addCommom(Number(data.col) + Number(data.claimBalance), 8);
    let undValue = addCommom(data.und, 8);
    let conText;
    if (undValue > 0) {
        conText = `<p>Settlement <span>${colValue +
            data.collateral_symbol} ${'And ' +
            undValue +
            data.underlying_symbol}</span></p>`;
    } else {
        conText = `<p>Settlement <span>${colValue > 0 &&
            colValue + data.collateral_symbol}</span></p>`;
    }
    const factory = await getFactory();
    // const address = window.CURRENTADDRESS;
    const address = window.CURRENTADDRESS;

    return factory.methods
        .settle(short)
        .send({ from: address })
        .on('transactionHash', (hash) => {
            // callBack('approve');
            bus.$emit('CLOSE_STATUS_DIALOG');
            bus.$emit('OPEN_STATUS_DIALOG', {
                title: 'Waiting For Confirmation',
                layout: 'layout2',
                loading: true,
                buttonText: 'Confirm',
                conTit: 'Please Confirm the transaction in your wallet',
                conText: conText,
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
            }
            callback('success');
            bus.$emit('REFRESH_BALANCE');
        })
        .on('error', function(error, receipt) {
            bus.$emit('CLOSE_STATUS_DIALOG');
            callback('error');
        });
};
export const onExercise = async (data, callBack) => {
    bus.$emit('OPEN_STATUS_DIALOG', {
        type: 'pending',
        title: 'WARNING',
        layout: 'layout1',
        conText: `<p>You will swap<span> ${toRounding(
            data._underlying_vol,
            8
        )} ${data._underlying}</span> to <span> ${data.vol} ${
            data._collateral
        }</span></p>`,
    });
    bus.$emit('ONEXERCISE_PENDING', data.bidID);

    const charID = window.chainID;
    let adress = getAddress(data.token, charID);

    const Contract = await expERC20(adress);
    const long = await expERC20(data.long);
    const order = await Order();

    await oneKeyArrpove(Contract, 'ORDER', 100000, (res) => {
        if (res === 'failed') {
            bus.$emit('CLOSE_STATUS_DIALOG');
        }
    });
    await oneKeyArrpove(long, 'ORDER', 100000, (res) => {
        if (res === 'failed') {
            bus.$emit('CLOSE_STATUS_DIALOG');
        }
    });

    order.methods
        .exercise(data.bidID)
        .send({ from: window.CURRENTADDRESS })
        .on('transactionHash', function(hash) {
            bus.$emit('CLOSE_STATUS_DIALOG');
            bus.$emit('OPEN_STATUS_DIALOG', {
                type: 'submit',
                conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
            });
        })
        .on('receipt', function(receipt) {
            if (window.statusDialog) {
                bus.$emit('CLOSE_STATUS_DIALOG');
                bus.$emit('OPEN_STATUS_DIALOG', {
                    type: 'success',
                    title: 'Successfully rented',
                    conTit: '<div>Activated successfully</div>',
                    conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
                });
            }
            bus.$emit('REFRESH_BALANCE');
        })
        .on('error', function(error, receipt) {
            bus.$emit('CLOSE_STATUS_DIALOG');
        });
};
