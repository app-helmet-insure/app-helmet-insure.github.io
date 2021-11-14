import starterLimitAbi from "~/web3/abis/IBO_StarterLimit.json";
import AirAllowListAbi from "~/web3/abis/AirAllowList.json";
import IBOTest from "~/web3/abis/ibo_test.json";
import { CHAIN_ID_LOCALHOST } from "../web3";

const StarterLimitAddress = "0x685f36fD01b749788BFa4d2526a77261EF604f3f";

const HELMET_ADDRESS = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
let testNetwork = null;
if (process.browser) {
  if (sessionStorage.getItem("helmet_test_chain")) {
    testNetwork = CHAIN_ID_LOCALHOST;
  }
}

export const iboPools = [
  // {
  //   name: 'ROB',
  //   address: '0x0fF47b1544378bd88dDaab6b002c09cF13F5ED6A',
  //   abi: starterLimitAbi,
  //   start_at: '1634220000',
  //   is_coming: true,
  //   currency: {
  //     address: HELMET_ADDRESS,
  //     decimal: 18,
  //     symbol: 'HELMET',
  //   },
  //   icon: 'rob.png',
  //   underlying: {
  //     address: '0xA53d857f0C3731b72C7e7013526442A09fcC7833',
  //     decimal: 9,
  //     symbol: 'ROB',
  //     name: 'ROB',
  //   },
  //   amount: '1250000000',
  //   pool_info: {
  //     min_allocation: 200,
  //     max_allocation: 500,
  //     maxAccount: 300,
  //   },
  //   progress: 0,
  //   status: 0,
  //   ratio: '1 HELMET = 15,600 ROB',
  //   time: '1634306400',
  //   purchasedCurrencyOf: 0,
  //   totalPurchasedAmount: '80128205128205000000000',
  //   totalPurchasedUnderlying: '0',
  //   totalPurchasedCurrency: '0',

  //   duration: '',
  //   winningRate: '-',
  //   committed: '',
  //   total: '',
  //   poolType: 0,
  //   networkId: testNetwork || 56,
  //   claimTimeTipI18n: 'IBO.IBO_text51',
  // },
  {
    name: "BOB",
    address: "0xAA90d31E11a886B8b57a5188F9bd3dfA3e907416",
    abi: starterLimitAbi,
    start_at: "1634047200",
    is_coming: false,
    currency: {
      address: HELMET_ADDRESS,
      decimal: 18,
      symbol: "HELMET",
    },
    icon: "baby.png",
    underlying: {
      address: "0xE798e8f65E4252A55FFc552C17C576Ba9B05C15b",
      decimal: 18,
      symbol: "BOB",
      name: "BOB",
    },
    amount: "129032258",
    pool_info: {
      min_allocation: 10,
      max_allocation: 500,
      maxAccount: 100,
    },
    progress: 0,
    status: 0,
    ratio: "1 HELMET = 5,200 BOB",
    time: "1634144400",
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: "24813895769230794044665",
    totalPurchasedUnderlying: "0",
    totalPurchasedCurrency: "0",

    duration: "",
    winningRate: "-",
    committed: "",
    total: "",
    poolType: 0,
    networkId: testNetwork || 56,
    claimTimeTipI18n: "IBO.IBO_text50",
    airdrop: {
      begin: "1636822800",
      address: "0x3D584BC1B18446730E7D27380D2BB008eF7478B8",
      abi: AirAllowListAbi,
      amount: "64516129",
      withdrawList: true,
      allowList: 0,
    },
  },
  {
    name: "MONI",
    address: "0x603366462A39CdbFCE7a7B274f5DA77cb51eA9b0",
    abi: starterLimitAbi,
    start_at: "1631790000",
    is_coming: false,
    currency: {
      address: HELMET_ADDRESS,
      decimal: 18,
      symbol: "HELMET",
    },
    icon: "MONI.png",
    underlying: {
      address: "0x9573c88aE3e37508f87649f87c4dd5373C9F31e0",
      decimal: 18,
      symbol: "MONI",
      name: "MONI",
    },
    amount: "200000",
    pool_info: {
      min_allocation: 400,
      max_allocation: 1000,
      maxAccount: 600,
    },
    progress: 0,
    status: 0,
    ratio: "1 HELMET = 1.35 MONI",
    time: "1631815380",
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: "259259259259259259175000",
    totalPurchasedUnderlying: "0",
    totalPurchasedCurrency: "0",
    duration: "",
    winningRate: "-",
    committed: "",
    total: "",
    poolType: 0,
    networkId: testNetwork || 56,
    claimTimeTipI18n: "IBO.IBO_text46",
    airdrop: {
      begin: "1634407500",
      address: "0xDCBc091bC91b5b4DFB226C410Dc703dfF6a75eda",
      abi: AirAllowListAbi,
      amount: "175000",
      withdrawList: true,
      allowList: 0,
    },
  },
  // {
  //   name: 'PRB',
  //   address: '0xE057daBC7630326819390e5D97B69633921cda65',
  //   abi: starterLimitAbi,
  //   start_at: '1631617200',
  //   is_coming: false,
  //   currency: {
  //     address: HELMET_ADDRESS,
  //     decimal: 18,
  //     symbol: 'HELMET',
  //   },
  //   icon: 'PRB.png',
  //   underlying: {
  //     address: '0x59ff585AA42939853E2587b07ee8F94017584A88',
  //     decimal: 18,
  //     symbol: 'PRB',
  //     name: 'PRB',
  //   },
  //   amount: '1600000',
  //   pool_info: {
  //     min_allocation: 200,
  //     max_allocation: 500,
  //     maxAccount: 200,
  //   },
  //   progress: 0,
  //   status: 0,
  //   ratio: '1 HELMET = 30 PRB',
  //   time: '1631802600',
  //   purchasedCurrencyOf: 0,
  //   totalPurchasedAmount: '53333333333333332800000',
  //   totalPurchasedUnderlying: '0',
  //   totalPurchasedCurrency: '0',
  //   duration: '',
  //   winningRate: '-',
  //   committed: '',
  //   total: '',
  //   poolType: 0,
  //   networkId: testNetwork || 56,
  //   claimTimeTipI18n: 'IBO.IBO_text43',
  // },
  {
    name: "PRED",
    address: "0x014e21ee729Bfb9b9D60f424Efcc4A72B9Ef9290",
    abi: starterLimitAbi,
    start_at: "1631538000",
    is_coming: false,
    currency: {
      address: HELMET_ADDRESS,
      decimal: 18,
      symbol: "HELMET",
    },
    icon: "PRED.png",
    underlying: {
      address: "0xbdd2e3fdb879aa42748e9d47b7359323f226ba22",
      decimal: 18,
      symbol: "PRED",
      name: "PRED",
    },
    amount: "2000",
    pool_info: {
      min_allocation: 200,
      max_allocation: 500,
      maxAccount: 300,
    },
    progress: 0,
    status: 0,
    ratio: "1 HELMET = 0.036 PRED",
    time: "1631624400",
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: "1388888888888888888900000000",
    totalPurchasedUnderlying: "0",
    totalPurchasedCurrency: "0",
    duration: "",
    winningRate: "-",
    committed: "",
    total: "",
    poolType: 0,
    networkId: testNetwork || 56,
    claimTimeTipI18n: "IBO.IBO_text42",
  },
  {
    name: "RHINO",
    address: "0xdba27394D07F6C336B45419828Deea02bb166Bd9",
    abi: starterLimitAbi,
    start_at: "1630494000",
    is_coming: false,
    currency: {
      address: HELMET_ADDRESS,
      decimal: 18,
      symbol: "HELMET",
    },
    icon: "RHINO.png",
    underlying: {
      address: "0x0a95a36655424c46dB3aaeF0776961049Da722d1",
      decimal: 18,
      symbol: "RHINO",
      name: "RHINO",
    },
    amount: "50000000",
    pool_info: {
      min_allocation: 200,
      max_allocation: 500,
      maxAccount: 200,
    },
    progress: 0,
    status: 0,
    ratio: "1 HELMET = 1,800 DSN",
    time: "1630501200",
    purchasedCurrencyOf: 0,
    totalPurchasedAmount: "27777777777777800000000",
    totalPurchasedUnderlying: "0",
    totalPurchasedCurrency: "0",
    duration: "",
    winningRate: "-",
    committed: "",
    total: "",
    poolType: 0,
    networkId: testNetwork || 56,
    claimTimeTipI18n: "IBO.IBO_text40",
  },
  // {
  //   name: 'DSN',
  //   address: '0x374fBC93F4b835572CD4927ffF7D2d7C4a0245f3',
  //   abi: starterLimitAbi,
  //   start_at: '1630321200',
  //   is_coming: false,
  //   currency: {
  //     address: HELMET_ADDRESS,
  //     decimal: 18,
  //     symbol: 'HELMET',
  //   },
  //   icon: 'DSN.png',
  //   underlying: {
  //     address: '0x53f7C1dC33A6dBFCaDbBB07391D488D4Edca7Ff4',
  //     decimal: 18,
  //     symbol: 'DSN',
  //     name: 'DSN',
  //   },
  //   amount: '16558500',
  //   pool_info: {
  //     min_allocation: 200,
  //     max_allocation: 500,
  //     maxAccount: 200,
  //   },
  //   progress: 0,
  //   status: 0,
  //   ratio: '1 HELMET= 415 DSN',
  //   time: '1630328400',
  //   purchasedCurrencyOf: 0,
  //   totalPurchasedAmount: '39900000000000008778000',
  //   totalPurchasedUnderlying: '0',
  //   totalPurchasedCurrency: '0',
  //   duration: '',
  //   winningRate: '-',
  //   committed: '',
  //   total: '',
  //   poolType: 0,
  //   networkId: testNetwork || 56,
  //   claimTimeTipI18n: 'IBO.IBO_text38'
  // },
  // {
  //   name: 'AXN',
  //   address: '0xa1D653b0fd3E56F7c389a6132472A9c2F37157A3',
  //   abi: starterLimitAbi,
  //   start_at: '1629460800',
  //   is_coming: false,
  //   currency: {
  //     address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
  //     decimal: 18,
  //     symbol: 'HELMET',
  //   },
  //   icon: 'AXN.png',
  //   underlying: {
  //     address: '0x3A05E86c25366031d92e013Cac77Ff6c261cb09B',
  //     decimal: 9,
  //     symbol: 'AXN',
  //     name: 'AXN',
  //   },
  //   amount: '30000000000',
  //   pool_info: {
  //     min_allocation: 200,
  //     max_allocation: 500,
  //     maxAccount: 200,
  //   },
  //   progress: 0,
  //   status: 0,
  //   ratio: '1 HELMET= 750,000 AXN',
  //   time: '1629468000',
  //   purchasedCurrencyOf: 0,
  //   totalPurchasedAmount: '27777750000000000000000',
  //   totalPurchasedUnderlying: '0',
  //   totalPurchasedCurrency: '0',
  //   duration: '',
  //   winningRate: '-',
  //   committed: '',
  //   total: '',
  //   poolType: 0,
  //   networkId: testNetwork || 56,
  //   claimTimeTipI18n: 'IBO.IBO_text37'
  // },
  // {
  //   name: 'UFOMO',
  //   address: '0x030EfF0f3dDf927CC0471cB6F8e01689AcF49678',
  //   abi: starterLimitAbi,
  //   start_at: '1629115200',
  //   is_top: true,
  //   is_coming: false,
  //   currency: {
  //     address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
  //     decimal: 18,
  //     symbol: 'HELMET',
  //   },
  //   icon:'ibo_card_UFOMO@2x.png',
  //   underlying: {
  //     address: '0xC9354034968F79f181b76a2f8A015fcdbaed2692',
  //     decimal: 18,
  //     symbol: 'UFOMO',
  //     name: 'UFOMO',
  //   },
  //   amount: '1100000000',
  //   pool_info: {
  //     min_allocation: 200,
  //     max_allocation: 500,
  //     maxAccount: 200,
  //   },
  //   progress: 0,
  //   status: 0,
  //   ratio: '1 HELMET = 27,500 UFOMO',
  //   time: '1629122400',
  //   purchasedCurrencyOf: 0,
  //   totalPurchasedAmount: '39999999999999600000000',
  //   totalPurchasedUnderlying: '0',
  //   totalPurchasedCurrency: '0',
  //   winningRate: '-',
  //   committed: '',
  //   total: '',
  //   networkId: testNetwork || 56
  // },
  // {
  //   name: 'GAME1',
  //   address: '0x7A19bC605116d8843e4757Bb97ac31DD6d49E844',
  //   abi: starterLimitAbi,
  //   start_at: '1629122400',
  //   is_coming: false,
  //   currency: {
  //     address: '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
  //     decimal: 18,
  //     symbol: 'HELMET',
  //   },
  //   icon: 'game.svg',
  //   underlying: {
  //     address: '0x0E52d24c87A5ca4F37E3eE5E16EF5913fb0cCEEB',
  //     decimal: 18,
  //     symbol: 'GAME1',
  //     name: 'GAME1',
  //   },
  //   amount: '111111',
  //   pool_info: {
  //     min_allocation: 200,
  //     max_allocation: 500,
  //     maxAccount: 200,
  //   },
  //   progress: 0,
  //   status: 0,
  //   ratio: '1 HELMET = 4 GAME1',
  //   time: '1629126000',
  //   purchasedCurrencyOf: 0,
  //   totalPurchasedAmount: '27777750000000000000000',
  //   totalPurchasedUnderlying: '0',
  //   totalPurchasedCurrency: '0',
  //   duration: '',
  //   winningRate: '-',
  //   committed: '',
  //   total: '',
  //   poolType: 0,
  //   networkId: testNetwork || 56
  // },
];