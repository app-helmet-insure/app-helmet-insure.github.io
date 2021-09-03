import MiningABI from "../abi/MiningABI.json";
import { getContract } from "../web3/index.js";
import { toWei } from "./index";

export const stake = ({ ContractAddress, Volume, Decimals = 18 }, Callback) => {
  let Account = window.CURRENTADDRESS;
  let Contracts = getContract(MiningABI, ContractAddress);
  Volume = toWei(Volume, Decimals);
  Contracts.methods
    .stake(Volume)
    .send({ from: Account })
    .on("transactionHash", function(hash) {
      Callback({ Status: "Pending" });
    })
    .on("receipt", function(receipt) {
      Callback({ Status: "Success", Hash: receipt.transactionHash });
    })
    .on("error", function(error) {
      Callback({ Status: "Error" });
    });
};
export const exit = ({ ContractAddress }, Callback) => {
  let Account = window.CURRENTADDRESS;
  let Contracts = getContract(MiningABI, ContractAddress);
  Contracts.methods
    .exit()
    .send({ from: Account })
    .on("transactionHash", function(hash) {
      Callback({ Status: "Pending" });
    })
    .on("receipt", function(receipt) {
      Callback({ Status: "Success", Hash: receipt.transactionHash });
    })
    .on("error", function(error) {
      Callback({ Status: "Error" });
    });
};
