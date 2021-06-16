import MiningABI from '~/abi/deposite_abi.json';
import ApproveABI from '~/abi/IPancakePair.json';
import CakePoolABI from '~/abi/cake_pool_abi.json';
import MdexPoolABI from '~/abi/mdex_pool_abi.json';
import {
    Contract,
    getAccounts,
    getDecimals,
    toWei,
    fromWei,
    BlockNumber,
    getBlockNumber,
} from './common_contract.js';
import BigNumber from 'bignumber.js';
// Balanceof
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
// TotalSupply
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
// Pool Reward
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
// Pool Reward2
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
// Total daily output
export const TotalAllocPoint = async (ContractAddress) => {
    let Contracts = await Contract(CakePoolABI, ContractAddress);
    return Contracts.methods
        .totalAllocPoint()
        .call()
        .then((res) => {
            return fromWei(res);
        });
};
// Daily output
export const PoolInfo = async (ContractAddress, PoolPid) => {
    let Contracts = await Contract(CakePoolABI, ContractAddress);
    return Contracts.methods
        .poolInfo(PoolPid)
        .call()
        .then((res) => {
            return res;
        });
};
// Cake per block
export const CakePerBlock = async (ContractAddress) => {
    let Contracts = await Contract(CakePoolABI, ContractAddress);
    return Contracts.methods
        .cakePerBlock()
        .call()
        .then((res) => {
            return fromWei(res);
        });
};
// Mdex per block
export const MdexPerBlock = async (ContractAddress) => {
    let Contracts = await Contract(MdexPoolABI, ContractAddress);
    return Contracts.methods
        .mdxPerBlock()
        .call()
        .then((res) => {
            return fromWei(res);
        });
};
// Mdex Reward
export const Reward = async (ContractAddress) => {
    let Contracts = await Contract(MdexPoolABI, ContractAddress);
    let BlockNumber = await getBlockNumber();
    return Contracts.methods
        .reward(BlockNumber)
        .call()
        .then((res) => {
            return fromWei(res);
        });
};
// Number of Approve
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
// Number of Approve to Pool
export const PoolAllowance = async (
    TokenAddress,
    FarmAddress,
    SpenderAddress,
    TokenDecimals
) => {
    let Contracts = await Contract(ApproveABI.abi, TokenAddress);
    let DecimalsUnit = getDecimals(TokenDecimals);
    return Contracts.methods
        .allowance(FarmAddress, SpenderAddress)
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

export const Rewards = async (Contractaddress, address) => {
    let Contracts = await Contract(MiningABI.abi, Contractaddress);
    if (address == 0) {
        address = '0x0000000000000000000000000000000000000000';
    }
    return Contracts.methods
        .rewards(address)
        .call()
        .then((res) => {
            return fromWei(res);
        });
};
export const RewardsDuration = async (ContractAddress) => {
    let Contracts = await Contract(MiningABI.abi, ContractAddress);
    return Contracts.methods
        .rewardsDuration()
        .call()
        .then((res) => {
            return res;
        });
};
