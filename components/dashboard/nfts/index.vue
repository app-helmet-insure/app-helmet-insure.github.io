<template>
  <div class="nfts-view">
    <div class="list-view">
      <div v-if="metaDusk721.length > 0 || metaDusk1155.length > 0 || dora721Ids.length > 0 || dora1155.length > 0" class="nft-list">
        <div v-for="(item, index) in metaDusk721" :key="'_' + index" class="nft721">
          <img :src="getIPFSFile(item.content.photo)" alt="">
          <div class="desc">
            <p>Name: {{ item.content.name }}</p>
            <p>ID: {{ item.tokenId }}</p>
            <p>Contract: {{ item.contract }}</p>
            <p class="introduce">Introduce: {{ item.content.introduction || item.content.story }}</p>
          </div>
        </div>
        <div class="nft-1155" v-for="(item, index) in metaDusk1155" :key="index">
          <img :src="getIPFSFile(item.photo)" alt="">
          <div>
            <p>Name: {{item.name}}</p>
            <p>ID: {{item.id}}</p>
            <p>Count: {{item.count}}</p>
          </div>
        </div>

        <div class="nft721 buy-nft">
          <img :src="require('~/assets/img/dashboard/buy-nft-icon.png')" alt="">
          <a href="https://metadusk.io/auction" target="_blank">Buy NFT</a>
        </div>

        <div v-for="doraId in dora721Ids" :key="doraId" class="nft721 nft-dora">
          <img :src="require('~/assets/img/dashboard/dora.png')" alt="">
          <div class="desc">
            <p>Name: Dora</p>
            <p>ID: {{ doraId }}</p>
            <p>Contract: {{ DORA }}</p>
          </div>
        </div>
        <template v-for="(item, index) in dora1155">
          <div class="nft-1155 nft1155-dora" v-for="id in item.ids" :key="index +'_' + id">
            <p class="card-title">{{item.card_name}}</p>
            <img :src="require(`~/assets/img/nft/have_${item.card_img}.png`)" alt="">
            <p class="card-id"><strong>ID: {{id}}</strong></p>
          </div>
        </template>
      </div>
      <div class="loading" v-else-if="metaDuskLoading">loading...</div>
      <div v-else>
        <div class="nft721 buy-nft">
          <img :src="require('~/assets/img/dashboard/buy-nft-icon.png')" alt="">
          <a href="https://metadusk.io/auction" target="_blank">Buy NFT</a>
        </div>
        <div class="no-data">No NFT</div>
      </div>
    </div>
  </div>
</template>

<script>
import {ChainId, NFTHelper} from "../../../web3/address";
import {Contract} from "ethers-multicall-x";
import {getOnlyMultiCallProviderPlus, processResult} from "../../../web3";
import {getIPFSJson} from "../../../assets/utils/ipfs";
import ERC1155Abi from '../../../web3/abis/ERC1155.json'
import {getIPFSFile} from '../../../assets/utils/ipfs';
import {getContract} from "../../../assets/utils/address-pool";
import ERC20 from "~/web3/abis/ERC20ABI.json";
const DORA = '0x0edcc38505a514c7ecd6d9d2758a65ba8d5fd68f'
export default {
  name: "index",
  props: ['setDuskNftAvatar'],
  data() {
    return {
      metaDusk721: [],
      metaDusk1155: [],
      metaDuskLoading: false,
      doraLoading: false,
      dora721Ids: [],
      dora1155: [],
      DORA
    }
  },
  computed: {
    account() {
      return this.$store.state.userInfo.account
    }
  },
  watch: {
    account: function () {
      this.getData()
    }
  },
  methods: {
    getIPFSFile(hash) {
      return getIPFSFile(hash)
    },
    getData() {
      if (!this.account) {
        return
      }
      this.getNFT721()
      this.getMetaDusk1155()
      this.getDora1155()
    },
    async getNftContent(duskIds, duskUrls, DuskNFT) {
      const nfts = []
      for (let i = 0; i < duskIds.length; i++) {
        const item = {
          tokenURI: duskUrls[i].split('/').pop(),
          tokenId: duskIds[i],
          contract: DuskNFT
        }
        await getIPFSJson(item.tokenURI).then(res => {
          item.content = res.data
          nfts.push(item)
        })
      }
      return nfts
    },
    getNFT721() {
      this.metaDuskLoading = true
      this.doraLoading = true
      const DuskNFT = "0xeDfbf15775a2E42E03d059Fb98DA6e92284de7be"
      const JustineDusk = "0x17DFb8867184aFa9116Db927B87C27CC27A92F89"
      const SantaPunkDusk = '0xF73396d2BD425413e4957bB0FB6C0fd945F31739'
      const WARBadge = "0xcc7dbBe86356f570aD0ba5937D764e64E9931593"//heco
      const nfts = [DuskNFT, JustineDusk, SantaPunkDusk, DORA]
      const multicall = getOnlyMultiCallProviderPlus(ChainId.BSC)
      const contract = new Contract(NFTHelper.address, NFTHelper.abi)
      const calls = nfts.reduce((calls_, nftAddress) => {
        calls_.push(contract.getAll(nftAddress, this.account))
        return calls_
      }, [])
      multicall.all(calls).then(async res => {
        const [[duskIds, duskUrls], [justineIds, justineUrls],[santaPunkIds, SantaPunkUrls], [dora721Ids]] = processResult(res)
        this.dora721Ids = dora721Ids
        this.doraLoading = false
        if (justineIds.length > 0){
          this.setDuskNftAvatar('justineDusk')
        } else if (santaPunkIds.length > 0) {
          this.setDuskNftAvatar('santaPunkDusk')
        } else if (duskIds.length > 0) {
          this.setDuskNftAvatar('dusk')
        }
        const duskNfts = await this.getNftContent(duskIds, duskUrls, DuskNFT)
        const justineNfts = await this.getNftContent(justineIds, justineUrls, JustineDusk)
        this.metaDusk721 = [...duskNfts, ...justineNfts]
        this.metaDuskLoading = false
      })
    },
    getMetaDusk1155() {
      const NFTDuskKit = "0x9f39766E4A8d2E6D55F406C71140089096687382"
      const multicall = getOnlyMultiCallProviderPlus(ChainId.BSC)
      const contract = new Contract(NFTDuskKit, ERC1155Abi)
      const kitIds = ["1", "2", "3", "4", "5", "6", "7", "8"]
      const calls = kitIds.reduce((calls_, id) => {
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
          let url = data[i*2+1]
          if (url.indexOf('https') === 0){
            const url_ = url.split('/')
            url = url_[url_.length - 2]
          }


          exhibitsPromise.push(getIPFSJson(url + `/${kitIds[i]}.json`))
        }
        const nfts = []
        Promise.all(exhibitsPromise)
            .then(res => {
              for (let i = 0; i < kitIds.length; i++) {
                if (data[i * 2] > 0) {
                  res[i].data.count = data[i * 2]
                  res[i].data.id = kitIds[i]
                  nfts.push(res[i].data)
                }
              }
              this.metaDusk1155 = nfts
            })
      })
    },
    getDora1155(){
      let list = [
        {
          card_name: "Helmet",
          card_img: "Helmet",
          card_adress: "Helmet",
          ContractName: "NFT1",
          CardBalance: 0,
        },
        {
          card_name: "Tenet",
          card_img: "Tenet",
          card_adress: "Tenet",
          ContractName: "NFT5",
          CardBalance: 0,
        },
        {
          card_name: "PancakeSwap",
          card_img: "Pancake",
          card_adress: "Pancake",
          ContractName: "NFT2",
          CardBalance: 0,
        },
        {
          card_name: "Ditto",
          card_img: "Ditto",
          card_adress: "Ditto",
          ContractName: "NFT6",
          CardBalance: 0,
        },
        {
          card_name: "Soteria",
          card_img: "Soteria",
          card_adress: "Soteria",
          ContractName: "NFT3",
          CardBalance: 0,
        },
        {
          card_name: "Yieldwatch",
          card_img: "Yieldwatch",
          card_adress: "Watch",
          ContractName: "NFT7",
          CardBalance: 0,
        },
        {
          card_name: "Berry",
          card_img: "Berry",
          card_adress: "Berry",
          ContractName: "NFT4",
          CardBalance: 0,
        },
        {
          card_name: "Belt",
          card_img: "Belt",
          card_adress: "Belt",
          ContractName: "NFT8",
          CardBalance: 0,
        }
        ]
      const multicall = getOnlyMultiCallProviderPlus(ChainId.BSC)
      const calls = []
      const helperContract = new Contract(NFTHelper.address, NFTHelper.abi)
      for (let i = 0; i < list.length; i++) {
        calls.push(helperContract.getAll(getContract(`NFT_${list[i].ContractName}`), this.account))
      }
      multicall.all(calls).then(res => {
        const data = processResult(res)
        const filterList = []
        for (let i = 0; i < list.length; i++) {
          if (data[i][0].length > 0){
            list[i].ids = data[i][0]
            filterList.push(list[i])
          }
        }
        this.dora1155 = filterList
      })

    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
@import "~/assets/css/themes.scss";
.nfts-view {
  .list-view {
    width: 100%;
    min-height: 193px;
    @include themeify {
      background: themed("dashboard_color1");
      border: 2px solid themed("dashboard_color2");
    }
    box-shadow: 0px 4px 9px 0px rgba(255, 255, 255, 0.02);
    border-radius: 22px;
    padding: 26px 33px;
    margin-bottom: 11px;

    & > h1 {
      font-size: 22px;
      font-family: IBMPlexSans-Medium, IBMPlexSans;
      font-weight: 500;
      @include themeify {
        color: themed("dashboard_color3");
      }
      line-height: 22px;
    }

    .nft-list {
      display: flex;
      flex-wrap: wrap;
    }

    .nft721 {
      position: relative;
      width: 154px;
      height: 220px;
      margin: 0 10px 10px 0;
      &.nft-dora{
        width: 154px;
        height: 191px;
        padding: 12px;
        background: #F5D2EB;
        border-radius: 15px;
        display: flex;
        .desc {
          flex: 1;
          left: 12px;
          top: 12px;
          border-radius: 15px;
          background: #CD71BC;
        }
      }
      & > img {
        width: 100%;
        height: 100%;
      }

      &:hover {
        .desc {
          display: block;
        }
      }

      .desc {
        display: none;
        width: calc(100% - 24px);
        height: calc(100% - 24px);
        position: absolute;
        left: 9px;
        top: 12px;
        background: #380035;
        border-radius: 20px;
        padding: 4px;
        overflow-y: auto;

        &::-webkit-scrollbar {
          width: 0;
        }

        p {
          font-size: 13px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 15px;
          margin-top: 6px;
          word-wrap: break-word;
          word-break: break-all;
        }

        //.introduce{
        //  display: -webkit-box;
        //  -webkit-box-orient: vertical;
        //  -webkit-line-clamp: 5;
        //  overflow: hidden;
        //}
      }
    }
    .nft-1155{
      width: 154px;
      margin: 0 10px 10px 0;
      background: #040004;
      border-radius: 5px;
      img{
        width: 100%;
        border-radius: 5px;
      }
      div{
        color: #ffffff;
        padding: 2px 10px;
        border-radius: 5px;
        p{
          font-size: 13px;
          font-family: IBMPlexSans-Medium, IBMPlexSans;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 15px;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
    }
    .nft1155-dora{
      box-shadow: inset 0 0 32px 0 #aeaeae;
      padding: 10px;
      border-radius: 15px;
      margin: 0 10px 10px 0;
      background: #FFFAF6;
      height: 191px;
      p{
        text-align: center;
      }
      img{
        width: 100%;
        transform: translateY(-10px);
      }
      .card-title{
        transform: translateY(10px);
      }
      .card-id{
        transform: translateY(-20px);
      }
    }

    .buy-nft{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #380035;
      background-image: url("../../../assets/img/dashboard/empty-nft.png");
      background-size: 100% 100%;
      border-radius: 10px;
      img{
        width: 60px;
        height: 60px;
        margin-bottom: 27px;
      }
      a{
        width: 100px;
        height: 30px;
        background: #DE6FE1;
        border-radius: 7px;
        text-decoration: none;
        font-size: 14px;
        font-family: IBMPlexSans-Medium, IBMPlexSans;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .nft-list {
      padding: 20px 0;
    }
  }

  .no-data, .loading {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cccccc;
  }
}
@media (max-width: 750px) {
  .nfts-view {
    .list-view {
      padding: 10px;
      .nft-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 10px;
        grid-column-gap: 10px;
      }
      .nft721, .nft-1155{
        width: 100% !important;
        height: auto!important;
      }
      .buy-nft{
        min-height: 260px;
        img{
          width: 80px;
          height: 80px;
        }
      }
    }
  }
}
</style>
