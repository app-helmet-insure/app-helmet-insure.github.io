import MiningABI from '~/abi/deposite_abi.json';
import {
    Contract,
    getAccounts,
    getDecimals,
    toWei,
    fromWei,
} from './common_contract.js';
import BigNumber from 'bignumber.js';
export const BalanceOf = async (ContractAddress, Decimals) => {
    let Contracts = await Contract(MiningABI.abi, ContractAddress);
    let Account = await getAccounts();
    let DecimalsUnit = getDecimals(Decimals);
    return Contracts.methods
        .balanceOf(Account)
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
                console.log(
                    DecimalsUnit,
                    ContractAddress,
                    Decimals,
                    fromWei(res, DecimalsUnit)
                );
                return fromWei(res, DecimalsUnit);
            } else {
                let powNumber = new BigNumber(10).pow(Decimals).toString();
                return new BigNumber(res).div(powNumber).toString();
            }
        });
};
