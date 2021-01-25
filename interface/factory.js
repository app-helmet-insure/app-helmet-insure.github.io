import { Factory } from './index.js';
import { getWei } from '~/assets/utils/address-pool.js';
import { toWei, fromWei } from '~/assets/utils/web3-fun.js';
import bus from '~/assets/js/bus';
import Message from '~/components/common/Message';
import { fixD, addCommom } from '~/assets/js/util.js';

let factoryObj = null;
const netObj = {
    1: '',
    3: 'ropsten.',
    4: 'rinkeby.',
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

export const burn = async (longOrshort, volume, opt = {}, data) => {
    let colValue = addCommom(data.col + Number(data.longBalance), 4);
    let undValue = addCommom(data.und, 4);
    bus.$emit('OPEN_STATUS_DIALOG', {
        type: 'pending',
        conText: `<p>Settlement ${addCommom(volume)} ${data._collateral}</p>`,
    });
    const factory = await getFactory();
    const wei = await getWei(opt._collateral);
    let fix = wei === 'lovelace' ? 6 : 18;
    const fixedVolume = fixD(volume, fix);
    // const address = window.CURRENTADDRESS;
    const address = window.CURRENTADDRESS;
    // return;
    return factory.methods
        .burn(longOrshort, toWei(fixedVolume, opt._collateral))
        .send({ from: address })
        .on('transactionHash', (hash) => {
            bus.$emit('CLOSE_STATUS_DIALOG');
            bus.$emit('OPEN_STATUS_DIALOG', {
                type: 'submit',
                conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
            });
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            // callBack('success');
            if (confirmationNumber === 0) {
                let confirmationTit = `<div>${data._collateral} ${', ' +
                    data._underlying} settlement is successful, Please check in the <span>wallet</span></div>`;
                if (window.statusDialog) {
                    bus.$emit('CLOSE_STATUS_DIALOG');
                    bus.$emit('OPEN_STATUS_DIALOG', {
                        type: 'success',
                        title: 'Successfully rented',
                        conTit: confirmationTit,
                        conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
                    });
                } else {
                    Message({
                        message: `${colValue > 0 &&
                            data._collateral} ${undValue > 0 &&
                            ', ' +
                                data._underlying} settlement is successful, Please check in the wallet`,
                        type: 'success',
                        // duration: 0,
                    });
                }
                setTimeout(() => {
                    bus.$emit('reload_my_settle');
                }, 1000);
            }
        })
        .on('error', function(error, receipt) {
            bus.$emit('CLOSE_STATUS_DIALOG');
            if (error && error.message) {
                Message({
                    message: error && error.message,
                    type: 'error',
                    // duration: 0,
                });
            }
        });
};

export const settle = async (short, data) => {
    console.log(data);
    // let colValue = addCommom(Number(data.col) + Number(data.longBalance), 4);
    // let undValue = addCommom(data.und, 4);
    bus.$emit('OPEN_STATUS_DIALOG', {
        type: 'pending',
        //   conText: `<p>Settlement <span>${data_.volume} ${data}.category}</span> </p>`,
        conText: `<p>Settlement ${addCommom(data.shortBalance)} ${
            data._collateral
        }</p>`,
    });

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
                type: 'submit',
                conText: `<a href="https://bscscan.com/tx/${hash}" target="_blank">View on BscScan</a>`,
            });
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            // callBack('success');
            if (confirmationNumber === 0) {
                let confirmationTit = `<div>${colValue > 0 &&
                    data._collateral} ${undValue > 0 &&
                    ', ' +
                        data._underlying} settlement is successful, Please check in the <span>wallet</span></div>`;
                if (window.statusDialog) {
                    bus.$emit('CLOSE_STATUS_DIALOG');
                    bus.$emit('OPEN_STATUS_DIALOG', {
                        type: 'success',
                        title: 'Successfully rented',
                        conTit: confirmationTit,
                        conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
                    });
                } else {
                    Message({
                        message: `${colValue > 0 &&
                            data._collateral} ${undValue > 0 &&
                            ', ' +
                                data._underlying} settlement is successful, Please check in the wallet`,
                        type: 'success',
                        // duration: 0,
                    });
                }
                setTimeout(() => {
                    bus.$emit('reload_my_settle');
                }, 1000);
            }
        })
        .on('error', function(error, receipt) {
            bus.$emit('CLOSE_STATUS_DIALOG');
            if (error && error.message) {
                Message({
                    message: error && error.message,
                    type: 'error',
                    // duration: 0,
                });
            }
        });
    // }
};
// };
export const onExercise = async (data, callBack) => {
    bus.$emit('OPEN_STATUS_DIALOG', {
        type: 'pending',
        // 租用 0.5 个WETH 帽子，执行价格为300 USDT
        conText: `<p>you will swap<span> ${toRounding(
            data._underlying_vol,
            8
        )} ${data._underlying}</span> to <span> ${data.vol} ${
            data._collateral
        }</span></p>`,
    });
    bus.$emit('ONEXERCISE_PENDING', data.bidID);

    // const WEB3 = await web3();
    const charID = window.chainID;
    let adress = getAddress(data.token, charID);

    const Contract = await expERC20(adress);
    const long = await expERC20(data.long);
    const order = await Order();

    // 一键判断是否需要授权，给予无限授权
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
        // .on('receipt', function(receipt){
        //     console.log('methods.sell##receipt###', receipt, '###时间###',new Date());
        // })
        .on('confirmation', function(confirmationNumber, receipt) {
            if (confirmationNumber === 0) {
                if (window.statusDialog) {
                    bus.$emit('CLOSE_STATUS_DIALOG');
                    bus.$emit('OPEN_STATUS_DIALOG', {
                        type: 'success',
                        title: 'Successfully rented',
                        conTit: '<div>Activated successfully</div>',
                        conText: `<a href="https://bscscan.com/tx/${receipt.transactionHash}" target="_blank">View on BscScan</a>`,
                    });
                } else {
                    Message({
                        message: 'Activated successfully',
                        type: 'success',
                        // duration: 0,
                    });
                }
                setTimeout(() => {
                    bus.$emit('REFRESH_ALL_DATA');
                }, 1000);
            }
        })
        .on('error', function(error, receipt) {
            bus.$emit('CLOSE_STATUS_DIALOG');

            if (error && error.message) {
                Message({
                    message: error && error.message,
                    type: 'error',
                    // duration: 0,
                });
            }
        });
};
