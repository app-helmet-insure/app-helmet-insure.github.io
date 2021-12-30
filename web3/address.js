import CalcAbi_ from './abis/Calc.json'
import NFTHelperAbi from './abis/NFTHelper.json'
export const ChainId = {
  BSC: 56,
  HECO: 128,
  MATIC: 137,
  LOCALHOST: 31337
}

export function CALC_ADDRESS(chainId){
  switch (chainId) {
    case ChainId.BSC:
      return '0xE3FC5294Bc1360274eEd5eFD5eEb084b36BbaF0e'
    case ChainId.MATIC:
      return '0x4dFeCeE12bd7cA3899D26643F20C79F4a2147EBf'
  }
}
export const CalcAbi = CalcAbi_

export function RPC_URLS (chainId) {
  return {
    [ChainId.HECO]: 'https://http-mainnet-node.huobichain.com',
    [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
    [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com'
  }[chainId]
}
export const NFTHelper = {
  address: '0x4B9B1c34A83c6D814AB4a909eae95F4f218606F9',
  abi: NFTHelperAbi
}
