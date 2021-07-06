import { web3 } from '~/assets/utils/web3-obj.js';
import { Contract, Provider } from 'ethers-multicall';
import MiningABI from '~/abi/deposite_abi.json';
import { Web3Provider } from '@ethersproject/providers';
import addressList from '~/abi/config.js';
let OrderContractAddress = '0x4C899b7C39dED9A06A5db387f0b0722a18B8d70D';
// 1: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
// 3: '0xF24b01476a55d635118ca848fbc7Dab69d403be3',
// 4: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
// 5: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
// 42: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
// 56: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
// 100: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
// 1337: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
export const Web3Contract = async (ABI, ContractAdress) => {
    let WEB3 = await web3();
    return await new WEB3.eth.Contract(ABI, ContractAdress);
};
export const MulticallContract = async (ABI, ContractAdress) => {
    return await new Contract(ContractAdress, ABI);
};
const selectNetwork = (charID) => {
    switch (charID) {
        case 1:
            return 'Main';
        case 3:
            return 'Ropsten';
        case 56:
            return 'BSC';
        default:
            return 'Rinkeby';
    }
};
export const getAccounts = async () => {
    const WEB3 = await new web3();
    let account = await WEB3.eth.getAccounts();
    return (account = account[0]);
};
export const getBlockNumber = async () => {
    const WEB3 = await new web3();
    let blockNumber = await WEB3.eth.getBlockNumber();
    return blockNumber;
};
export const getAddress = (symbol, char_id) => {
    const charID = char_id || window.chainID || 56;
    const network = selectNetwork(charID);
    let address = addressList[`${network}_${symbol}`];
    if (address) {
        return address.toLowerCase();
    } else {
        return null;
    }
};
// 获取合约
export const getContract = (name, charID = 56) => {
    const network = selectNetwork(charID);
    let contract = addressList[`${network}_CONTRACT_${name}`];
    if (contract) {
        return contract.toLowerCase();
    } else {
        return null;
    }
};
export const TokenDecimals = (Address) => {
    console.log(Address);
    Address = Address.toLowerCase();
    switch (Address) {
        case '0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8': //HELMET
            return 18;
        case '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c': //BNB
            return 18;
        case '0xa8c2b8eec3d368c0253ad3dae65a5f2bbb89c929': //CTK
            return 6;
        default:
            return 18;
    }
};
export const getDecimals = (Decimals) => {
    switch (Decimals) {
        case 0:
            return 'noether';
        case 1:
            return 'wei';
        case 3:
            return 'kwei';
        case 6:
            return 'mwei';
        case 9:
            return 'gwei';
        case 12:
            return 'microether';
        case 15:
            return 'milliether';
        case 18:
            return 'ether';
        case 21:
            return 'kether';
        case 24:
            return 'mether';
        case 27:
            return 'gether';
        case 30:
            return 'tether';
        default:
            return '';
    }
};
export const toWei = (bigNumber, DecimalsUnit) => {
    try {
        return window.WEB3.utils.toWei(bigNumber, DecimalsUnit);
    } catch (e) {
        console.log('fromWei###Error###', e);
    }
};
export const AddressToWei = (FixNumber, Address) => {
    let NumberDecimals = TokenDecimals(Address);
    let ResultDecimals = getDecimals(NumberDecimals);
    return toWei(FixNumber, ResultDecimals);
};
export const DecimalsToWei = (FixNumber, Decimals) => {
    let ResultDecimals = getDecimals(Decimals);
    return toWei(FixNumber, ResultDecimals);
};
export const TokenNameToWei = (FixNumber, TokenName) => {
    let TokenAddress = getAddress(TokenName);
    return AddressToWei(FixNumber, TokenAddress);
};
export const fromWei = (bigNumber, DecimalsUnit) => {
    try {
        return window.WEB3.utils.fromWei(bigNumber, DecimalsUnit);
    } catch (e) {
        console.log('fromWei###Error###', e);
    }
};
export const AddressFormWei = (FixNumber, Address) => {
    let NumberDecimals = TokenDecimals(Address);
    let ResultDecimals = getDecimals(NumberDecimals);
    return fromWei(FixNumber, ResultDecimals);
};
export const DecimalsFormWei = (FixNumber, Decimals) => {
    let ResultDecimals = getDecimals(Decimals);
    return fromWei(FixNumber, ResultDecimals);
};
export const TokenNameFormWei = (FixNumber, TokenName) => {
    let TokenAddress = getAddress(TokenName);
    return AddressFormWei(FixNumber, TokenAddress);
};
export const ShowMiningData = async (ContractAdress, ParamsAddress) => {
    let WEB3 = await web3();
    let CurrentProvider = new Web3Provider(WEB3.currentProvider);
    let MulticallProvider = new Provider(CurrentProvider, 56);
    const MulticallContract = new Contract(ContractAdress, MiningABI.abi);
};
