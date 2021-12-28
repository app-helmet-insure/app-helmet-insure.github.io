<template>
<div>
  nfts
</div>
</template>

<script>
import {ChainId, NFTHelper} from "../../../web3/address";
import {Contract} from "ethers-multicall-x";
import {getOnlyMultiCallProviderPlus, processResult} from "../../../web3";
import {getIPFSJson} from "../../../assets/utils/ipfs";
import ERC1155Abi from '../../../web3/abis/ERC1155.json'

export default {
  name: "index",
  data(){
    return {
      nfts721: [],
      nfts1155: []
    }
  },
  computed: {
    account(){
      return this.$store.state.userInfo.account
    }
  },
  watch: {
    '$store.state.userInfo.account': function (){
      this.getData()
    }
  },
  methods: {
    getData(){
      console.log(this.account)
      if (!this.account){
        return
      }
      this.getNFTs721()
      this.getNFTs1155()
    },
    getNFTs721(){
      const DuskNFT = "0xeDfbf15775a2E42E03d059Fb98DA6e92284de7be"
      const JustineDusk = "0x17DFb8867184aFa9116Db927B87C27CC27A92F89"
      const WARBadge = "0xcc7dbBe86356f570aD0ba5937D764e64E9931593"//heco
      const nfts = [DuskNFT, JustineDusk]
      const multicall = getOnlyMultiCallProviderPlus(ChainId.BSC)
      const contract = new Contract(NFTHelper.address, NFTHelper.abi)
      const calls = nfts.reduce((calls_, nftAddress)=>{
        calls_.push(contract.getAll(nftAddress, this.account))
        return calls_
      }, [])
      multicall.all(calls).then(async res => {
        const [[ids, urls]] = processResult(res)
        const nfts = []
        for (let i = 0; i < ids.length; i++) {
          const item = {
            tokenURI: urls[i],
            tokenId: ids[i],
          }
          await getIPFSJson(item.tokenURI).then(res => {
            item.content = res.data
            nfts.push(item)
          })
        }
        this.nfts721 = nfts
        console.log(this.nfts721)
      })
    },
    getNFTs1155(){
      const NFTDuskKit = "0x9f39766E4A8d2E6D55F406C71140089096687382"
      const multicall = getOnlyMultiCallProviderPlus(ChainId.BSC)
      const contract = new Contract(NFTDuskKit, ERC1155Abi)
      const kitIds = ["1", "2", "3", "4", "5", "6", "7", "8"]
      const calls = kitIds.reduce((calls_, id)=>{
        calls_.push(
            contract.balanceOf(this.account, id),
            contract.uri(id)
        )
        return calls_
      }, [])
      multicall.all(calls).then(res => {
        const data = processResult(res)
        const exhibitsPromise = []
        for (let i = 0; i < kitIds.length; i++) {
          exhibitsPromise.push(getIPFSJson(data[i*2+1] + `/${kitIds[i]}.json`))
        }
        const nfts = []
        Promise.all(exhibitsPromise)
            .then(res => {
              for (let i = 0; i < kitIds.length; i++) {
                if (data[i*2] > 0) {
                  res[i].data.count = data[i*2]
                  nfts.push(res[i].data)
                }
              }
              this.nfts1155 = nfts
            })
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>

</style>
