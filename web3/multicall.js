import {ChainId, config, multicallClient, Contract as ClientContract} from "@chainstarter/multicall-client.js";

config({
  defaultChainId: ChainId.BSC,
  allowFailure: false
})

export {
  ChainId,
  multicallClient,
  ClientContract
}
