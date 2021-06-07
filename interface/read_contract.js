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
export const BalanceOf = async (ContractAddress, Decimals, TokenAddress) => {
    let Contracts = await Contract(MiningABI.abi, ContractAddress);
    if (!TokenAddress) {
        TokenAddress = await getAccounts();
    }
    let DecimalsUnit = getDecimals(Decimals);
    return Contracts.methods
        .balanceOf(TokenAddress)
        .call()
        .then((res) => {
            if (DecimalsUnit) {
                return fromWei(res, DecimalsUnit);
            } else {
                let powNumber = new BigNumber(10).pow(Decimals).toString();
                return new BigNumber(res).div(powNumber).toString();
            }
        });
};
export const TotalSupply = async (ContractAddress, Decimals) => {
    let Contracts = await Contract(MiningABI.abi, ContractAddress);
    let DecimalsUnit = getDecimals(Decimals);
    return Contracts.methods
        .totalSupply()
        .call()
        .then((res) => {
            if (DecimalsUnit) {
                return fromWei(res, DecimalsUnit);
            } else {
                let powNumber = new BigNumber(10).pow(Decimals).toString();
                return new BigNumber(res).div(powNumber).toString();
            }
        });
};
export const Earned = async (ContractAddress, Decimals) => {
    let Contracts = await Contract(MiningABI.abi, ContractAddress);
    let Account = await getAccounts();
    let DecimalsUnit = getDecimals(Decimals);
    return Contracts.methods
        .earned(Account)
        .call()
        .then((res) => {
            if (DecimalsUnit) {
                return fromWei(res, DecimalsUnit);
            } else {
                let powNumber = new BigNumber(10).pow(Decimals).toString();
                return new BigNumber(res).div(powNumber).toString();
            }
        });
};
export const Earned2 = async (ContractAddress, Decimals) => {
    let Contracts = await Contract(MiningABI.abi, ContractAddress);
    let Account = await getAccounts();
    let DecimalsUnit = getDecimals(Decimals);
    return Contracts.methods
        .earned2(Account)
        .call()
        .then((res) => {
            if (DecimalsUnit) {
                return fromWei(res, DecimalsUnit);
            } else {
                let powNumber = new BigNumber(10).pow(Decimals).toString();
                return new BigNumber(res).div(powNumber).toString();
            }
        });
};
export const Allowance = async (TokenAddress, SpenderAddress) => {
    let Contracts = await Contract(ApproveABI.abi, TokenAddress);
    let Account = await getAccounts();
    return Contracts.methods
        .allowance(Account, SpenderAddress)
        .call()
        .then((res) => {
            if (Number(res) > 0) {
                return false;
            } else {
                return true;
            }
        });
};
