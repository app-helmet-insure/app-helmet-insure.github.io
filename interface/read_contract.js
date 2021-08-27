import MiningABI from "~/abi/MiningABI.json";
import ApproveABI from "~/abi/IPancakePair.json";
import CakePoolABI from "~/abi/CakePoolABI.json";
import MdexPoolABI from "~/abi/MdexPoolABI.json";
import OrderABI from "~/abi/order_abi.json";
import FectoryABI from "~/abi/factory_abi.json";
import BurnSwapABI from "~/abi/BurnSwap.json";
import ChainSwapABI from "~/abi/ChainSwap.json";
import MigrationABI from "~/abi/Migration.json";
import IIOABI from "~/abi/iio_abi.json";
import {
  Web3Contract,
  getAccounts,
  getDecimals,
  toWei,
  fromWei,
  BlockNumber,
  getBlockNumber,
} from "./common_contract.js";
import BigNumber from "bignumber.js";
let OrderContractAddress = "0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D";
let FectoryContractAddress = "0x021297e233550eDBa8e6487EB7c6696cFBB63b88";
let BurnSwapContractAddress = "0x6Bab2711Ca22fE7395811022F92bB037cd4af7bc"; //燃烧地址
let BurnSignContractAddress = "0x81d82a35253B982E755c4D7d6AADB6463305B188"; //燃烧签名地址
let StakingContractAddress = "0x910651F81a605a6Ef35d05527d24A72fecef8bF0"; //质押地址
// Balanceof
export const BalanceOf = async (
  ContractAddress,
  Decimals = 18,
  TokenAddress
) => {
  let Contracts = await Web3Contract(MiningABI, ContractAddress);
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
export const TotalSupply = async (ContractAddress, Decimals = 18) => {
  let Contracts = await Web3Contract(MiningABI, ContractAddress);
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
export const Earned = async (ContractAddress, Decimals = 18) => {
  let Contracts = await Web3Contract(MiningABI, ContractAddress);
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
export const Earned2 = async (ContractAddress, Decimals = 18) => {
  let Contracts = await Web3Contract(MiningABI, ContractAddress);
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
// Pool Reward3
export const Earned3 = async (
  ContractAddress,
  RewardAddress,
  Decimals = 18
) => {
  let Contracts = await Web3Contract(IIOABI.abi, ContractAddress);
  let Account = await getAccounts();
  let DecimalsUnit = getDecimals(Decimals);
  return Contracts.methods
    .earned3(RewardAddress, Account)
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
  let Contracts = await Web3Contract(CakePoolABI, ContractAddress);
  return Contracts.methods
    .totalAllocPoint()
    .call()
    .then((res) => {
      return fromWei(res);
    });
};
// Daily output
export const PoolInfo = async (ContractAddress, PoolPid) => {
  let Contracts = await Web3Contract(CakePoolABI, ContractAddress);
  return Contracts.methods
    .poolInfo(PoolPid)
    .call()
    .then((res) => {
      return res;
    });
};
// Cake per block
export const CakePerBlock = async (ContractAddress) => {
  let Contracts = await Web3Contract(CakePoolABI, ContractAddress);
  return Contracts.methods
    .cakePerBlock()
    .call()
    .then((res) => {
      return fromWei(res);
    });
};
// Mdex per block
export const MdexPerBlock = async (ContractAddress) => {
  let Contracts = await Web3Contract(MdexPoolABI, ContractAddress);
  return Contracts.methods
    .mdxPerBlock()
    .call()
    .then((res) => {
      return fromWei(res);
    });
};
// Mdex Reward
export const Reward = async (ContractAddress) => {
  let Contracts = await Web3Contract(MdexPoolABI, ContractAddress);
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
  let Contracts = await Web3Contract(ApproveABI.abi, TokenAddress);
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
  let Contracts = await Web3Contract(ApproveABI.abi, TokenAddress);
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
  let Contracts = await Web3Contract(MiningABI, Contractaddress);
  if (address == 0) {
    address = "0x0000000000000000000000000000000000000000";
  }
  return Contracts.methods
    .rewards(address)
    .call()
    .then((res) => {
      return fromWei(res);
    });
};
export const RewardsDuration = async (ContractAddress) => {
  let Contracts = await Web3Contract(MiningABI, ContractAddress);
  return Contracts.methods
    .rewardsDuration()
    .call()
    .then((res) => {
      return res;
    });
};
export const Asks = async (AskID) => {
  let Contracts = await Web3Contract(OrderABI.abi, OrderContractAddress);
  return Contracts.methods.asks(AskID).call();
};
export const Bids = async (BidID) => {
  let Contracts = await Web3Contract(OrderABI.abi, OrderContractAddress);
  return Contracts.methods.bids(BidID).call();
};
export const Settleable = async (seller, short) => {
  let Contracts = await Web3Contract(FectoryABI.abi, FectoryContractAddress);
  return Contracts.methods.settleable(seller, short).call();
};
export const RestQuota = async (ContractAddress, Address = null) => {
  let Contracts = await Web3Contract(MigrationABI, ContractAddress);
  let Account = await getAccounts();
  Address ? Address : Account;
  return Contracts.methods
    .restQuota()
    .call()
    .then((res) => {
      return fromWei(res);
    });
};
export const Quotas = async (ContractAddress, Address = null) => {
  let Contracts = await Web3Contract(MigrationABI, ContractAddress);
  let Account = await getAccounts();
  Address ? Address : Account;
  return Contracts.methods
    .quotas(Address)
    .call()
    .then((res) => {
      return fromWei(res);
    });
};
export const TotalBurns = async (ContractAddress, Address) => {
  let Contracts = await Web3Contract(MigrationABI, ContractAddress);
  let Account = await getAccounts();
  Address ? Address : Account;
  console.log(ContractAddress, Address);
  return Contracts.methods
    .totalBurns(Address)
    .call()
    .then((res) => {
      return fromWei(res);
    });
};
export const Applied3 = async (ContractAddress, RewardAdress) => {
  let Contracts = await Web3Contract(IIOABI.abi, ContractAddress);
  let Account = await getAccounts();
  return Contracts.methods.applied3(RewardAdress, Account).call();
};
