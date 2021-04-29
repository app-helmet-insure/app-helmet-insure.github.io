import { NFT, expERC20, Deposite } from './index';
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
        case '0xb8ed5c338c55ee6044d526186e468f79233db260':
            return 'Helmet';
        case '0x8c0e49434fb47bfa608f38d791067fc1724139ff':
            return 'Pancake';
        case '0xbd84ba7380c085741f56efa27a590f22bda41cab':
            return 'Soteria';
        case '0x36d2dbaf48c549de81986283ea97be4001fd71d8':
            return 'Berry';
        case '0xc472fd7f7e082cea78cf7cf46804eb0c2fa0f5c7':
            return 'Tenet';
        case '0x179783849e72bf5359c7e7e766f23853b097a979':
            return 'Ditto';
        case '0x5d48e0feb8d4771fa87ab5224f4dd24d5df399ad':
            return 'Yieldwatch';
        case '0x8b1040c273d09e6eb92f5a9b9febd629d872a3e7':
            return 'Belt';
        default:
            return '';
    }
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
    await oneKeyArrpove(ArrpoveContract, ContractType, 100000);
    const IIOContract = await NFT(ContractAdress);
    try {
        IIOContract.methods
            .bet()
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
    await oneKeyArrpove(ArrpoveContract, ContractType, 100000);
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
export const balanceOf = async (card) => {
    const charID = 56;
    const account = window.CURRENTADDRESS;
    let CardAdress = card;
    if (card.indexOf('0x') === -1) {
        CardAdress = getContract(card, charID);
    }
    console.log(card, CardAdress);
    const contract = await Deposite(CardAdress);
    return contract.methods
        .balanceOf(account)
        .call()
        .then((res) => {
            return res;
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
    // const WEB3 = await web3();
    console.log(token_exp, contract_str);
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
