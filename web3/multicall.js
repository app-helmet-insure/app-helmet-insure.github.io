import {ChainId, config, multicallClient, Contract as clientContract} from "@chainstarter/multicall-client.js/build/index.js";

config({
  defaultChainId: ChainId.BSC,
  allowFailure: false
})

export {
  ChainId,
  multicallClient,
  clientContract
}
