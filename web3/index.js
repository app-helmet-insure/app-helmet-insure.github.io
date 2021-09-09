import MiningABI from "~/abi/MiningABI.json";
import Web3 from "web3";
import { fromWei } from "~/interface/index.js";
export const getContract = (abi, address) => {
  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(abi, address);
};
export const HelmetBalance = () => {
  const Helmet = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const Contracts = getContract(MiningABI, Helmet);
  const Account = window.CURRENTADDRESS;
  return Contracts.methods
    .balanceOf(Account)
    .call()
    .then((res) => {
      let Balance = Number(fromWei(res)).toFixed(4);
      return Balance;
    });
};
export const ETHBalance = () => {
  const Account = window.CURRENTADDRESS;
  return window.WEB3.eth.getBalance(Account).then((res) => {
    let Balance = Number(fromWei(res)).toFixed(4);
    return Balance;
  });
};
