import MiningABI from "~/web3/abis/MiningABI.json";
export const AirdropList = {
  Current: [
    {
      TokenABI: MiningABI,
      RewardMethods: "earned",
      BalanceMethods: "balanceOf",
      ClaimMethods: "getReward",
      Symbol: "BNB1000",
      Decimals: 13,
      TokenAddress: "0x7aae192b83589784851a7df13c225fda2e3d87c5",
      PoolAddress: "0xE4574280b431580794713F50f68C6ccb9134AD8a",
      Rewards: 0,
      Balance: 0,
    },
  ],
  History: [
    {
      TokenABI: MiningABI,
      RewardMethods: "earned",
      BalanceMethods: "balanceOf",
      ClaimMethods: "getReward",
      Symbol: "SHIBh",
      Decimals: 12,
      TokenAddress: "0x224b33139a377a62d4BaD3D58cEDb7807AE228eB",
      PoolAddress: "0x0472b48623aAFCcbE440CC178B1D0ab7c5263daF",
      Rewards: 0,
      Balance: 0,
    },
  ],
};
