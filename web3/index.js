import Web3 from "web3";
export const getContract = (abi, address) => {
  const web3 = new Web3(window.ethereum);
  return new web3.eth.Contract(abi, address);
};
