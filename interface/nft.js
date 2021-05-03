import { NFT, expERC20, Deposite, NFTusers } from './index';
import {
    getAddress,
    getContract,
    getWei,
    getID,
} from '~/assets/utils/address-pool.js';
import bus from '~/assets/js/bus';
import Message from '~/components/common/Message';
export const CardFilter = (address) => {
    let tokenAddress = address.toLowerCase();
    if (!tokenAddress) {
        return;
    }
    switch (tokenAddress) {
        case '0x8ae671d05937c78c4735c997974e38f54814d70a':
            return 'Helmet';
        case '0x6a2dfb87f5923a0d6ad8e5127ed001cde29fe77a':
            return 'Pancake';
        case '0xf56197bc80c70024c925a2cfe8ce27a5be7835d7':
            return 'Soteria';
        case '0x18869bc6a45ca83880d2564b249e61a793b794a1':
            return 'Berry';
        case '0x05f7bd01433bfab7b8511788e678de5fa92e276a':
            return 'Tenet';
        case '0xb962b860f880bb461eeb323fc33dc9efce157dac':
            return 'Ditto';
        case '0x7ece489d4b363f8a51ff35f8769da11231160b8d':
            return 'Yieldwatch';
        case '0x15b626735442f2aea386e4ec81de603902e344aa':
            return 'Belt';
        default:
            return '';
    }
};
export const usersCount = async (type) => {
    const charID = 56;
    let CardAdress = type;
    if (type.indexOf('0x') === -1) {
        CardAdress = getContract(type, charID);
    }
    const contract = await NFTusers(CardAdress);
    return contract.methods
        .usersCount()
        .call()
        .then((res) => {
            return res;
        });
};
export const bet = async (ContractType, ContractCost, callBack) => {
    const charID = 56;
    let ContractAdress;
    const account = window.CURRENTADDRESS;
    if (ContractType.indexOf('0x') === -1) {
        ContractAdress = getContract(ContractType, charID);
    }
    if (ContractCost.indexOf('0x') === -1) {
        ContractCost = getContract(ContractCost, charID);
    }
    const ArrpoveContract = await expERC20(ContractCost);

    await oneKeyArrpove(ArrpoveContract, ContractType, 100000, (res) => {
        if (res == 'approve') {
            bus.$emit('OPEN_STATUS_DIALOG', {
                title: 'Waiting For Confirmation',
                layout: 'layout2',
                loading: true,
                buttonText: 'Confirm',
                conTit: 'Please Confirm the transaction in your wallet',
                conText: `<p>You will approve helmet to pixel puzzle </p>`,
            });
        }
        if (res == 'success') {
            bus.$emit('CLOSE_STATUS_DIALOG');
        }
    });
    const IIOContract = await NFT(ContractAdress);
    try {
        IIOContract.methods
            .bet()
            .send({ from: account })
            .on('error', function(error) {
                callBack({ status: 'bet_error' });
            })
            .on('transactionHash', function(transactionHash) {
                callBack({ status: 'bet_pendding' });
            })
            .on('receipt', function(receipt) {
                callBack({ status: 'bet_success' }); // contains the new contract address
            })
            .on('confirmation', function(confirmationNumber, receipt) {})
            .then(function(newContractInstance) {});
    } catch (error) {
        console.log(error);
    }
};
export const bet10 = async (ContractType, ContractCost, callBack) => {
    const charID = 56;
    const account = window.CURRENTADDRESS;
    let ContractAdress;
    if (ContractType.indexOf('0x') === -1) {
        ContractAdress = getContract(ContractType, charID);
    }
    if (ContractCost.indexOf('0x') === -1) {
        ContractCost = getContract(ContractCost, charID);
    }
    const ArrpoveContract = await expERC20(ContractCost);
    await oneKeyArrpove(ArrpoveContract, ContractType, 100000, (res) => {
        if (res == 'approve') {
            bus.$emit('OPEN_STATUS_DIALOG', {
                title: 'Waiting For Confirmation',
                layout: 'layout2',
                loading: true,
                buttonText: 'Confirm',
                conTit: 'Please Confirm the transaction in your wallet',
                conText: `<p>You will approve helmet to pixel puzzle </p>`,
            });
        }
        if (res == 'success') {
            bus.$emit('CLOSE_STATUS_DIALOG');
        }
    });
    const IIOContract = await NFT(ContractAdress);
    try {
        IIOContract.methods
            .bet10()
            .send({ from: account })
            .on('transactionHash', function(transactionHash) {
                callBack({ status: 'bet_pendding' });
            })
            .on('receipt', function(receipt) {
                callBack({ status: 'bet_success' }); // contains the new contract address
            })
            .on('error', function(error) {
                callBack({ status: 'bet_error' });
            });
    } catch (error) {
        console.log(error);
    }
};
export const claim = async (ContractType, callBack) => {
    const charID = 56;
    const account = window.CURRENTADDRESS;
    let ContractAdress;
    if (ContractType.indexOf('0x') === -1) {
        ContractAdress = getContract(ContractType, charID);
    }
    try {
        const IIOContract = await NFT(ContractAdress);
        IIOContract.methods
            .claim()
            .send({ from: account })
            .on('transactionHash', function(transactionHash) {
                callBack({ status: 'claim_pendding' });
            })
            .on('receipt', function(receipt) {
                callBack({ status: 'claim_success' }); // contains the new contract address
            })
            .on('error', function(error) {
                callBack({ status: 'claim_error' });
            })
            .then((res) => {
                let data = {
                    status: 'dataSuccess',
                    data: [res.events.Claim.returnValues[1]],
                };
                callBack(data);
            });
    } catch (error) {
        console.log(error);
    }
};
export const claim10 = async (ContractType, callBack) => {
    const charID = 56;
    const account = window.CURRENTADDRESS;
    let ContractAdress;
    if (ContractType.indexOf('0x') === -1) {
        ContractAdress = getContract(ContractType, charID);
    }
    try {
        const IIOContract = await NFT(ContractAdress);
        IIOContract.methods
            .claim10()
            .send({ from: account })
            .on('transactionHash', function(transactionHash) {
                callBack({ status: 'claim_pendding' });
            })
            .on('receipt', function(receipt) {
                callBack({ status: 'claim_success' }); // contains the new contract address
            })
            .on('error', function(error) {
                callBack({ status: 'claim_error' });
            })
            .then((res) => {
                let data = {
                    status: 'dataSuccess',
                    data: res.events.Claim10.returnValues[1],
                };
                callBack(data);
            });
    } catch (error) {
        console.log(error);
    }
};
export const compose = async (ContractType, callBack) => {
    const charID = 56;
    const account = window.CURRENTADDRESS;
    let ContractAdress;
    if (ContractType.indexOf('0x') === -1) {
        ContractAdress = getContract(ContractType, charID);
    }
    try {
        const IIOContract = await NFT(ContractAdress);
        IIOContract.methods
            .compose()
            .send({ from: account })
            .on('transactionHash', function(transactionHash) {
                callBack({ status: 'compose_pendding' });
            })
            .on('receipt', function(receipt) {
                callBack({ status: 'compose_success' }); // contains the new contract address
            })
            .on('error', function(error) {
                callBack({ status: 'compose_error' });
            });
    } catch (error) {
        console.log(error);
    }
};
export const balanceOf = async (card) => {
    const charID = 56;
    const account = window.CURRENTADDRESS;
    let CardAdress = card;
    if (card.indexOf('0x') === -1) {
        CardAdress = getContract(card, charID);
    }
    const contract = await Deposite(CardAdress);
    return contract.methods
        .balanceOf(account)
        .call()
        .then((res) => {
            return res;
        });
};
export const getBalance = async (card, address) => {
    const charID = 56;
    const account = window.CURRENTADDRESS;
    let CardAdress = card;
    let PoolAdress;
    if (card.indexOf('0x') === -1) {
        CardAdress = getContract(card, charID);
    }
    if (address && address.indexOf('0x') === -1) {
        PoolAdress = getContract(address, charID);
    }
    const contract = await Deposite(CardAdress);
    return contract.methods
        .balanceOf(PoolAdress)
        .call()
        .then((res) => {
            let tocurrcy = card;
            return window.WEB3.utils.fromWei(res, getWei(tocurrcy));
        });
};
export const needClaim = async (type) => {
    const charID = 56;
    const account = window.CURRENTADDRESS;
    let ContarctAdress = type;
    if (type.indexOf('0x') === -1) {
        ContarctAdress = getContract(type, charID);
    }
    const contract = await NFT(ContarctAdress);
    return contract.methods
        .needClaim(account)
        .call()
        .then((res) => {
            return res;
        });
};
export const needClaim10 = async (type) => {
    const charID = 56;
    const account = window.CURRENTADDRESS;
    let ContarctAdress = type;
    if (type.indexOf('0x') === -1) {
        ContarctAdress = getContract(type, charID);
    }
    const contract = await NFT(ContarctAdress);
    return contract.methods
        .needClaim10(account)
        .call()
        .then((res) => {
            return res;
        });
};
export const composeEnable = async (type) => {
    const charID = 56;
    const account = window.CURRENTADDRESS;
    let ContarctAdress = type;
    if (type.indexOf('0x') === -1) {
        ContarctAdress = getContract(type, charID);
    }
    const contract = await NFT(ContarctAdress);
    return contract.methods
        .composeEnable(account)
        .call()
        .then((res) => {
            return res;
        });
};
export const transferFrom = async (ToAdress, TokenID) => {};
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
const allowance = async (token_exp, contract_str) => {
    const charID = await getID();
    const result = await token_exp.methods
        .allowance(window.CURRENTADDRESS, getContract(contract_str, 56))
        .call({ from: window.CURRENTADDRESS });

    return window.WEB3.utils.fromWei(result, getWei());
};
const approve = async (token_exp, contract_str, callback = (status) => {}) => {
    // const WEB3 = await web3();
    const charID = await getID();
    try {
        await token_exp.methods
            .approve(
                getContract(contract_str, 56),
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
    } catch (error) {
        console.log(error);
    }
};
