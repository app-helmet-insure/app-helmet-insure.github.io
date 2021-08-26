import { getTokenPrice } from "~/interface/event.js";
import { fixD } from "~/assets/js/util.js";
import ProxyPoolABI from "~/abi/ProxyPoolABI.json";
import MiningABI from "~/abi/MiningABI.json";
import ApproveABI from "~/abi/IPancakePair.json";
import { Contract } from "ethers-multicall-x";
import {
  toWei,
  getOnlyMultiCallProvider,
  processResult,
  fromWei,
} from "~/interface/index.js";
export const lptPoolList = [
  {
    pool_name: "HELMET-BNB MLP",
    stake_symbol: "HELMET-BNB MLP",
    stake_unit: "MLP",
    reward_volume: "two",
    reward_name: "mdx",
    reward_img: true,
    start_time: "Ongoing",
    finish_time: "Mining",
    iscombo: false,
    reward_year_type: "APR",
    have_onepager: false,
    pool_pid: "0x38",
    token1_decimals_number: 18,
    token1_symbol: "HELMET",
    token1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    token2_decimals_number: 18,
    token2_symbol: "WBNB",
    token2_address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    reward1_have: false,
    reward1_decimals_number: 18,
    reward1_symbol: "HELMET",
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_have: true,
    reward2_symbol: "MDX",
    reward2_address: "0x9c65ab58d8d978db963e63f2bfb7121627e3a739",
    reward2_decimals_number: 18,
    right_show_token: {
      add_token_symbol: "MDX",
      add_token_address: "0x9c65ab58d8d978db963e63f2bfb7121627e3a739",
      add_token_decimals: 18,
    },
    proxy_address: "0xc48fe252aa631017df253578b1405ea399728a50",
    pool_address: "0xD86577ea62FE1FD2cA0Be583c1A0ecf25F4FbF2B",
    stake_address: "0x83d8E2E030cD820dfdD94723c3bcf2BC52e1701A",
    reward1_address: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
    stake_decimals_number: 18,
    lpt_link1:
      "<a href='https://bsc.mdex.com/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='mdx'></i>Get HELMET-BNB MLP</a>",
    pool_type: "lpt",
  },
  {
    pool_name: `HELMET-BNB LPT`,
    stake_symbol: "HELMET-BNB LPT",
    stake_unit: "LPT",
    reward_volume: "one",
    reward_name: "helmet1",
    reward_img: true,
    start_time: "Ongoing",
    finish_time: "Mining",
    iscombo: false,
    isiio: false,
    reward_year_type: "APR",
    have_onepager: false,
    pool_pid: "0x11e",
    token1_decimals_number: 18,
    token1_symbol: "HELMET",
    token1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    token2_decimals_number: 18,
    token2_symbol: "WBNB",
    token2_address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    proxy_address: "0x73feaa1eE314F8c655E354234017bE2193C9E24E",
    pool_address: "0xA21B692B92Bbf0E34334f1548a0b51837CDDD0Bb",
    stake_address: "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571",
    reward1_have: true,
    reward1_decimals_number: 18,
    reward1_symbol: "HELMET",
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_have: false,
    reward2_decimals_number: 18,
    reward2_symbol: "CAKE",
    reward2_address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    stake_decimals_number: 18,
    lpt_link1:
      "<a href='https://exchange.pancakeswap.finance/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-BNB LPT(V2)</a>",
    pool_type: "lpt",
  },
  {
    pool_name: `HELMET-USDT LPT`,
    stake_symbol: "HELMET-USDT LPT",
    stake_unit: "LPT",
    reward_volume: "one",
    reward_name: "baby",
    reward_img: true,
    start_time: "Ongoing",
    finish_time: "Mining",
    iscombo: false,
    isiio: false,
    reward_year_type: "APR",
    have_onepager: false,
    pool_pid: "33",
    token1_decimals_number: 18,
    token1_symbol: "HELMET",
    token1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    token2_decimals_number: 18,
    token2_symbol: "BABY",
    token2_address: "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657",
    proxy_address: "0xdfaa0e08e357db0153927c7eabb492d1f60ac730",
    pool_address: "0x50a9C123536e69290a5dAb32ce514D0b9afcaDCc",
    stake_address: "0xdB4d03b1659fe7FAD33F840de481773A629d256b",
    reward1_have: false,
    reward1_decimals_number: 18,
    reward1_symbol: "HELMET",
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_have: true,
    reward2_decimals_number: 18,
    reward2_symbol: "BABY",
    reward2_address: "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657",
    stake_decimals_number: 18,
    lpt_link1:
      "<a href='https://exchange.babyswap.finance/#/add/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8/0x55d398326f99059fF775485246999027B3197955' target='_blank'>From <i class='babyswap'></i>Get HELMET-USDT LPT</a>",
    pool_type: "lpt",
  },
  {
    pool_name: `GUARD-USDC LPT`,
    stake_symbol: "GUARD-USDC LPT",
    stake_unit: "LPT",
    reward_volume: "two",
    reward_name: "guard_quick",
    reward_img: true,
    start_time: "Ongoing",
    finish_time: "Mining",
    reward_year_type: "APR",
    pool_type: "link",
  },
];
export const comboPoolList = [
  {
    key: "HELMET",
    pool_name: "HELMET POOL",
    stake_symbol: "HELMET",
    stake_unit: "HELMET",
    reward_volume: "one",
    reward_name: "helmet",
    reward_img: true,
    start_time: "Ongoing",
    finish_time: "Mining",
    iscombo: false,
    flash: false,
    reward_year_type: "APR",
    compound: true,
    have_onepager: false,
    reward1_symbol: "HELMET",
    pool_address: "0x279a073c491c873df040b05cc846a3c47252b52c",
    stake_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    stake_decimals_number: 18,
    reward1_decimals_number: 18,
    pool_type: "compound",
    apr: "--",
    apy: "--",
  },
  {
    key: "HELMETMCRN",
    pool_name: "HELMET-<i>hMCRN</i> LPT",
    stake_symbol: "HELMET-hMCRN LPT",
    stake_unit: "LPT",
    reward_volume: "two",
    reward_name: "helmet_mcrn",
    reward_img: true,
    start_time: "2021/08/02 00:00 UTC+8",
    finish_time: "2021/08/16 00:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: "hMCRN",
    reward1_symbol: "HELMET",
    reward2_symbol: "MCRN",
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_address: "0xacb2d47827c9813ae26de80965845d80935afd0b",
    reward1_volume: 28270,
    reward2_volume: 2740,
    pool_process: 14,
    left_show_token: {
      add_token_symbol: "hMCRN",
      add_token_address: "0x4c60bd0a7aa839e35882c7a9b9b240ea7e0657bf",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "MCRN",
      add_token_address: "0xacb2d47827c9813ae26de80965845d80935afd0b",
      add_token_decimals: 18,
    },
    pool_address: "0x6f70369E6705f8d32DF74Ca0115DC2F9bdd6cC20",
    stake_address: "0xb6d6079dacb091362bbbd7ed43f44d2727c257d0",
    stake_decimals_number: 18,
    lpt_link1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x4c60bd0a7aa839e35882c7a9b9b240ea7e0657bf/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hMCRN LPT</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "HELMETWIZARD",
    pool_name: "HELMET-<i>hWIZARD</i> LPT",
    stake_symbol: "HELMET-hWIZARD LPT",
    stake_unit: "LPT",
    reward_volume: "two",
    reward_name: "helmet_wizard",
    reward_img: true,
    start_time: "2021/08/02 00:00 UTC+8",
    finish_time: "2021/08/16 00:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: "hWIZARD",
    reward1_symbol: "HELMET",
    reward2_symbol: "WIZARD",
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_address: "0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18",
    reward1_volume: 60280,
    reward2_volume: 6670,
    pool_process: 14,
    left_show_token: {
      add_token_symbol: "hWIZARD",
      add_token_address: "0x792b733af7b9b83331f90dbbd297e519258b09bc",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "WIZARD",
      add_token_address: "0x5066c68cae3b9bdacd6a1a37c90f2d1723559d18",
      add_token_decimals: 18,
    },
    pool_address: "0xD5a042DEC6AF7D126fAE12B689f972061015A848",
    stake_address: "0x7cb1481fcd7d107211d57cb797dc7554086e31d7",
    stake_decimals_number: 18,
    lpt_link1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x792b733af7b9b83331f90dbbd297e519258b09bc/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hWIZARD LPT</a>",
    pool_type: "combo",
    apr: "--",
  },

  {
    key: "HELMETARGON",
    pool_name: "HELMET-<i>hARGON</i> LPT",
    stake_symbol: "HELMET-hARGON LPT",
    stake_unit: "LPT",
    reward_volume: "two",
    reward_name: "helmet_argon",
    reward_img: true,
    start_time: "2021/07/10 00:00 UTC+8",
    finish_time: "2021/07/25 00:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: "hARGON",
    reward1_symbol: "HELMET",
    reward2_symbol: "ARGON",
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_address: "0x851f7a700c5d67db59612b871338a85526752c25",
    reward1_volume: 35000,
    reward2_volume: 350000,
    pool_process: 15,
    left_show_token: {
      add_token_symbol: "hARGON",
      add_token_address: "0x4ce2d9804da7583c02f80fec087aea1d137214eb",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "ARGON",
      add_token_address: "0x851f7a700c5d67db59612b871338a85526752c25",
      add_token_decimals: 18,
    },
    pool_address: "0xC12D0dE9f64467f4Dd51e0313b3b801b5F945648",
    stake_address: "0x78c6c572a60cc7a2006513597a981fcd99d3ec77",
    stake_decimals_number: 18,
    lpt_link1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x4ce2d9804da7583c02f80fec087aea1d137214eb/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hARGON LPT</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "HELMETBMXX",
    pool_name: "HELMET-<i>hBMXX</i> LPT",
    stake_symbol: "HELMET-hBMXX LPT",
    stake_unit: "LPT",
    reward_volume: "two",
    reward_name: "helmet_bmxx",
    reward_img: true,
    start_time: "2021/07/01 00:00 UTC+8",
    finish_time: "2021/07/14 00:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: "hBMXX",
    reward1_symbol: "HELMET",
    reward2_symbol: "BMXX",
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_address: "0x4131b87f74415190425ccd873048c708f8005823",
    reward1_volume: 37500,
    reward2_volume: 3272.46,
    pool_process: 13,
    left_show_token: {
      add_token_symbol: "hBMXX",
      add_token_address: "0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "BMXX",
      add_token_address: "0x4131b87f74415190425ccd873048c708f8005823",
      add_token_decimals: 18,
    },
    pool_address: "0x088521b6207Cc083C252Eb44f232Ed418193eF25",
    stake_address: "0xdec93cf8345695094ea47b22dfe31d349190c5d0",
    stake_decimals_number: 18,
    lpt_link1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x6dab495c467c8fb326dc5e792cd7faeb9ecafe44/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hBMXX LPT</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "HELMETBABY",
    pool_name: "HELMET-<i>hBABY</i> LPT",
    stake_symbol: "HELMET-hBABY LPT",
    stake_unit: "LPT",
    reward_volume: "two",
    reward_name: "helmet_baby",
    reward_img: true,
    start_time: "2021/06/26 00:00 UTC+8",
    finish_time: "2021/07/09 00:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: "hBABY",
    reward1_symbol: "HELMET",
    reward2_symbol: "BABY",
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_address: "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657",
    reward1_volume: 37500,
    reward2_volume: 158931,
    pool_process: 13,
    left_show_token: {
      add_token_symbol: "hBABY",
      add_token_address: "0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "BABY",
      add_token_address: "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657",
      add_token_decimals: 18,
    },
    pool_address: "0xe9499FBB0832a4C374165106e1EDe589B42Ba57E",
    stake_address: "0x5e9a2d9a54958bf3c35dad24f32bb54dac97f6c6",
    stake_decimals_number: 18,
    lpt_link1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x06a954537cdcf6fa57eadf2e3e56e4325b7e9624/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hBABY LPT</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "HELMETMTRG",
    pool_name: "HELMET-<i>hMTRG</i> LPT",
    stake_symbol: "HELMET-hMTRG LPT",
    stake_unit: "LPT",
    reward_volume: "two",
    reward_name: "helmet_mtrg",
    reward_img: true,
    start_time: "2021/06/25 00:00 UTC+8",
    finish_time: "2021/07/04 00:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: "hMTRG",
    reward1_symbol: "HELMET",
    reward2_symbol: "MTRG",
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_address: "0xBd2949F67DcdC549c6Ebe98696449Fa79D988A9F",
    reward1_volume: 25000,
    reward2_volume: 2767,
    pool_process: 9,
    left_show_token: {
      add_token_symbol: "hMTRG",
      add_token_address: "0xa561926e81DEcb74B3d11e14680B3F6D1c5012bD",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "MTRG",
      add_token_address: "0xBd2949F67DcdC549c6Ebe98696449Fa79D988A9F",
      add_token_decimals: 18,
    },
    proxy_address: "",
    pool_address: "0xE3B9588d36854f6d97AeC34E65396197675a432a",
    stake_address: "0x179a6794fe86b28ee170e8e91672abe652e3e82c",
    stake_decimals_number: 18,
    lpt_link1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0xa561926e81DEcb74B3d11e14680B3F6D1c5012bD/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hMTRG LPT</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "HELMETWINGS",
    pool_name: "HELMET-<i>hWINGS</i> LPT",
    stake_symbol: "HELMET-hWINGS LPT",
    stake_unit: "LPT",
    reward_volume: "two",
    reward_name: "helmet_wings",
    reward_img: true,
    start_time: "2021/06/12 00:00 UTC+8",
    finish_time: "2021/06/26 00:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: "hWINGS",
    reward1_symbol: "HELMET",
    reward2_symbol: "WINGS",
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_address: "0x0487b824c8261462f88940f97053e65bdb498446",
    reward1_volume: 30000,
    reward2_volume: 4500,
    pool_process: 14,
    left_show_token: {
      add_token_symbol: "hWINGS",
      add_token_address: "0x34508EA9ec327ff3b98A2F10eEDc2950875bf026",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "WINGS",
      add_token_address: "0x0487b824c8261462f88940f97053e65bdb498446",
      add_token_decimals: 18,
    },
    proxy_address: "",
    pool_address: "0xBAd52954a2397A9A04c44440039904B0E1Cb8d0f",
    stake_address: "0x0ea990871e99c83c9800f7266e3b9c612dd68623",
    stake_decimals_number: 18,
    lpt_link1:
      "<a href='https://exchange.pancakeswap.finance/?_gl=1*d1kv5p*_ga*MTU5MDI5ODU1LjE2MTE5MzU1ODc.*_ga_334KNG3DMQ*MTYxMjg1NDcwNy4xOC4xLjE2MTI4NTQ4MzUuMA..#/add/0x34508EA9ec327ff3b98A2F10eEDc2950875bf026/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank'>From <i class='pancake'></i>Get HELMET-hWINGS LPT</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "BHELMETDODO",
    pool_name: "HELMET-BNB DLP",
    stake_symbol: "HELMET-BNB DLP",
    stake_unit: "DLP",
    reward_volume: "two",
    reward_name: "bhelmet_dodo",
    reward_img: true,
    start_time: "2021/05/10 12:00 UTC+8",
    finish_time: "2021/05/24 00:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: false,
    reward1_symbol: "BHELMET",
    reward2_symbol: "DODO",
    left_show_token: {
      add_token_symbol: "BHELMET",
      add_token_address: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "DODO",
      add_token_address: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
      add_token_decimals: 18,
    },
    proxy_address: "0x14b5E6158864a2F5E04C52F1858185b64aEddAf6",
    pool_address: "0x14b5E6158864a2F5E04C52F1858185b64aEddAf6",
    stake_address: "0x9CE69450FDCc3b6058F7c430ef0A8C051b2300c6",
    reward1_address: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
    reward2_address: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
    stake_decimals_number: 18,
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    lpt_link1:
      "<a href='https://app.dodoex.io/liquidity?poolAddress=0x80B5abD78878B709F58b46e94CF6A194A9A65234' target='_blank'>From <i class='dodo'></i>Get HELMET-BNB DLP</a>",
    pool_type: "combo",
    apr: "--",
  },

  {
    key: "BHELMETxBURGER",
    pool_name: "HELMET-<i>hxBURGER</i> BLP",
    stake_symbol: "HELMET-hxBURGER BLP",
    stake_unit: "BLP",
    reward_volume: "two",
    reward_name: "bhelmet_xburger",
    reward_img: true,
    start_time: "2021/05/02 12:00 UTC+8",
    finish_time: "2021/05/22 00:00 UTC+8",
    iscombo: true,
    flash: false,
    reward_year_type: "APR",
    have_onepager: "hxBURGER",
    reward1_symbol: "BHELMET",
    reward2_symbol: "xBURGER",
    left_show_token: {
      add_token_symbol: "hxBURGER",
      add_token_address: "0xCa7597633927A98B800738eD5CD2933a74a80e8c",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "xBURGER",
      add_token_address: "0xAFE24E29Da7E9b3e8a25c9478376B6AD6AD788dD",
      add_token_decimals: 18,
    },
    proxy_address: "",
    pool_address: "0xD23B7cD539f7FB4f27EbEDEB2c56a791639C38Fb",
    stake_address: "0xCf8F78E34135168230969124CF56A37Ae5e8bD4D",
    reward1_address: "0x15DA1D8e207AB1e1Bc7FD1cca52a55a598518672",
    reward2_address: "0xAFE24E29Da7E9b3e8a25c9478376B6AD6AD788dD",
    stake_decimals_number: 18,
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    lpt_link1:
      "<a href='https://burgerswap.org/trade/pool?from=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8&to=0xCa7597633927A98B800738eD5CD2933a74a80e8c' target='_blank' >From <i class='burger'></i>Get HELMET-hxBURGER BLP</a>",
    pool_type: "combo",
    apr: "--",
  },

  {
    key: "FEIQFEI",
    pool_name: "FEI(BSC) POOL",
    stake_symbol: "FEI",
    stake_unit: "FEI",
    reward_volume: "one",
    reward_name: "QFEI",
    reward_img: false,
    start_time: "2021/04/10 00:00 UTC+8",
    finish_time: "2021/04/17 00:00 UTC+8",
    SERIAL_FLAG: true,
    reward_year_type: "APR",
    have_onepager: false,
    reward1_symbol: "QFEI",
    left_show_token: {
      add_token_symbol: "FEI",
      add_token_address: "0x219Cf9729BB21BBe8dD2101C8B6ec21c03dd0F31",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "QFEI",
      add_token_address: "0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a",
      add_token_decimals: 18,
    },
    proxy_address: "",
    pool_address: "0xf1569d9b3aeCA99a2774Ac66731b707C1249642A",
    stake_address: "0x219Cf9729BB21BBe8dD2101C8B6ec21c03dd0F31",
    reward1_address: "0x7f6ff473adba47ee5ee5d5c7e6b9d41d61c32c6a",
    stake_decimals_number: 18,
    reward1_decimals_number: 18,
    lpt_link1:
      "<a href='https://www.chainswap.exchange/' target='_blank'>Swap FEI(ETH) to BSC By <i class='chainswap'></i> ChainSwap</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "KUN",
    pool_name: "<i>QFEI</i>-QSD DLP",
    stake_symbol: "QFEI-QSD DLP",
    stake_unit: "DPT",
    reward_volume: "one",
    reward_name: "kun",
    reward_img: true,
    start_time: "2021/04/12 00:00 UTC+8",
    finish_time: "2021/05/02 00:00 UTC+8",
    SERIAL_NEXT_FLAG: true,
    reward_year_type: "APR",
    have_onepager: "QFEI",
    reward1_symbol: "KUN",
    left_show_token: {
      add_token_symbol: "QSD",
      add_token_address: "0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "KUN",
      add_token_address: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
      add_token_decimals: 18,
    },
    pool_address: "0x10ebD347A44a40BEE9BDFb0E4c809F82f3d4C2f9",
    stake_address: "0x14616328f4Ce3082187B4f1Ee4863DA5516B178A",
    reward1_address: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
    stake_decimals_number: 18,
    reward1_decimals_number: 18,
    lpt_link1:
      "<a href='https://app.dodoex.io/liquidity?poolAddress=0x14616328f4Ce3082187B4f1Ee4863DA5516B178A' target='_blank' >From <i class='dodo'></i>Get QFEI-QSD DLP</a>",
    lpt_link2:
      " <a href='https://bsc.qian.finance/chemix/' target='_blank'> Or From <i class='qian'></i> Mint QSD</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "QHELMET",
    pool_name: "HELMET-KUN DLP",
    stake_symbol: "HELMET-KUN DLP",
    stake_unit: "DPT",
    reward_volume: "one",
    reward_name: "QHELMET",
    reward_img: false,
    start_time: "2021/04/21 00:00 UTC+8",
    finish_time: "2021/05/10 00:00 UTC+8",
    SERIAL_NEXT_FLAG: true,
    reward_year_type: "APR",
    have_onepager: false,
    reward1_symbol: "QHELMET",
    left_show_token: {
      add_token_symbol: "KUN",
      add_token_address: "0x1a2fb0af670d0234c2857fad35b789f8cb725584",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "QHELMET",
      add_token_address: "0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99",
      add_token_decimals: 18,
    },
    proxy_address: "",
    pool_address: "0x76c415ececd88f76d6e6b5401a82b5ba075819f4",
    stake_address: "0xd7eed218538b3fa3e20d24f43100790f0d03538a",
    reward1_address: "0xBf5fC08754ba85075d2d0dB370D6CA9aB4db0F99",
    stake_decimals_number: 18,
    reward1_decimals_number: 18,
    lpt_link1:
      "<a href='https://app.dodoex.io/liquidity?poolAddress=0xd7eed218538b3fa3e20d24f43100790f0d03538a' target='_blank' >From <i class='dodo'></i>Get HELMET-KUN DLP</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "HELMETCAKE",
    pool_name: `HELMET-BNB LPT`,
    stake_symbol: "HELMET-BNB LPT",
    stake_unit: "LPT",
    reward_volume: "two",
    reward_name: "helmet_cake_v1",
    reward_img: true,
    finish_time: "Mining",
    start_time: "",
    finish_time: "2021/04/25 17:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: false,
    reward1_symbol: "HELMET",
    reward2_symbol: "CAKE",
    left_show_token: {
      add_token_symbol: "Cake-LPT",
      add_token_address: "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "HELMET",
      add_token_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
      add_token_decimals: 18,
    },
    proxy_address: "0x73feaa1eE314F8c655E354234017bE2193C9E24E",
    pool_address: "0xb22425206D40605E9bE5a5460786DBaB5aBA9485",
    stake_address: "0xC869A9943b702B03770B6A92d2b2d25cf3a3f571",
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    stake_decimals_number: 18,
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    lpt_link1:
      "<a href='https://v1exchange.pancakeswap.finance/#/add/BNB/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank' >From <i class='pancake'></i>Get HELMET-BNB LPT(V1 Old)</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "HELMETDODO",
    pool_name: "HELMET-<i>hDODO</i> DLP",
    stake_symbol: "HELMET-hDODO DLP",
    stake_unit: "DPT",
    reward_volume: "two",
    reward_name: "helmet_dodo",
    reward_img: true,
    finish_time: "Mining",
    start_time: "",
    finish_time: "2021/04/10 00:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: "hDODO",
    reward1_symbol: "HELMET",
    reward2_symbol: "DODO",
    left_show_token: {
      add_token_symbol: "hDODO",
      add_token_address: "0xfeD2e6A6105E48A781D0808E69460bd5bA32D3D3",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "DODO",
      add_token_address: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
      add_token_decimals: 18,
    },
    proxy_address: "",
    pool_address: "0x041C1BF8E085e4987404b88441599EE6d1bCD684",
    stake_address: "0x7F6ea24c10E32C8a5fd1c9b2C1239340671460cC",
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_address: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
    stake_decimals_number: 18,
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    lpt_link1:
      "<a href='https://app.dodoex.io/liquidity?poolAddress=0x7f6ea24c10e32c8a5fd1c9b2c1239340671460cc' target='_blank' >From <i class='dodo'></i>Get HELMET-hDODO DLP</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "HELMETFOR",
    pool_name: "HELMET-<i>hFOR</i> LPT",
    stake_symbol: "HELMET-hFOR LPT",
    stake_unit: "LPT",
    reward_volume: "two",
    reward_name: "helmet_for",
    reward_img: true,
    finish_time: "Mining",
    start_time: "",
    finish_time: "2021/03/20 00:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: "hFOR",
    reward1_symbol: "HELMET",
    reward2_symbol: "FOR",
    left_show_token: {
      add_token_symbol: "HFOR",
      add_token_address: "0xb779F208f8d662558dF8E2b6bFE3b6305CC13389",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "FOR",
      add_token_address: "0x658a109c5900bc6d2357c87549b651670e5b0539",
      add_token_decimals: 18,
    },
    proxy_address: "",
    pool_address: "0x2295876146ED2A4C8c391ca09dFD9b42329D22a9",
    stake_address: "0xc3f103b7f36690c70b4a682c760fe3b8951cefd1",
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_address: "0x658a109c5900bc6d2357c87549b651670e5b0539",
    stake_decimals_number: 18,
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    lpt_link1:
      "<a href='https://exchange.pancakeswap.finance/#/add/0xb779F208f8d662558dF8E2b6bFE3b6305CC13389/0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8' target='_blank' >From <i class='pancake'></i>Get HELMET-hFOR LPT</a>",
    pool_type: "combo",
    apr: "--",
  },
  {
    key: "HELMETBURGER",
    pool_name: "HELMET-<i>hBURGER</i> LPT",
    stake_symbol: "HELMET-hBURGER LPT",
    stake_unit: "LPT",
    reward_volume: "two",
    reward_name: "helmet_burger",
    reward_img: true,
    finish_time: "Mining",
    start_time: "",
    finish_time: "2021/03/07 00:00 UTC+8",
    iscombo: true,
    reward_year_type: "APR",
    have_onepager: "hBURGER",
    reward1_symbol: "HELMET",
    reward2_symbol: "BURGER",
    left_show_token: {
      add_token_symbol: "hBURGER",
      add_token_address: "0x9ebbb98f2bC5d5D8E49579995C5efaC487303BEa",
      add_token_decimals: 18,
    },
    right_show_token: {
      add_token_symbol: "BURGER",
      add_token_address: "0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f",
      add_token_decimals: 18,
    },
    proxy_address: "",
    pool_address: "0x9216508886fEA6bF9334a59F9C90411fc6c400e5",
    stake_address: "0x7a0068a1896F82D8F47086E3f2CE3CcEA75d5493",
    reward1_address: "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8",
    reward2_address: "0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f",
    stake_decimals_number: 18,
    reward1_decimals_number: 18,
    reward2_decimals_number: 18,
    lpt_link1:
      "<a href='https://burgerswap.org/trade/pool?from=0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8&to=0xCa7597633927A98B800738eD5CD2933a74a80e8c' target='_blank' >From <i class='burger'></i>Get HELMET-hxBURGER BLP</a>",
    pool_type: "combo",
    apr: "--",
  },
];
export const formatMiningPool = (PoolData) => {
  for (let Key = 0; Key < PoolData.length; Key++) {
    const ItemPool = PoolData[Key];
    const { start_time, finish_time } = ItemPool;
    const PresentTime = Date.now();
    const StartTime = new Date(start_time) * 1;
    const FinishTime = new Date(finish_time) * 1;
    const PoolStarted = PresentTime > StartTime ? true : false;
    const PoolFinished = PresentTime > FinishTime ? true : false;
    if (!PoolStarted) {
      ItemPool.status = 1;
      if (start_time !== "Ongoing" && finish_time !== "Mining") {
        ItemPool.show_time = getShowTime(StartTime);
      } else {
        ItemPool.show_time = "Ongoing";
        if (ItemPool.pool_type === "lpt") {
          ItemPool.apr = getLptAPR(ItemPool);
        }
      }
    }
    if (PoolStarted && !PoolFinished) {
      ItemPool.status = 2;
      if (start_time !== "Ongoing" && finish_time !== "Mining") {
        ItemPool.show_time = getShowTime(FinishTime);
      }
      if (ItemPool.pool_type === "combo") {
        ItemPool.apr = getComboAPR(ItemPool);
      }
    }
    if (PoolFinished) {
      ItemPool.status = 3;
      ItemPool.show_time = "Finished";
    }
  }
  return PoolData;
};
const getShowTime = (time) => {
  const now = new Date() * 1;
  const dueDate = time;
  const DonwTime = dueDate - now;
  const day = Math.floor(DonwTime / (24 * 3600000));
  const hour = Math.floor((DonwTime - day * 24 * 3600000) / 3600000);
  const minute = Math.floor(
    (DonwTime - day * 24 * 3600000 - hour * 3600000) / 60000
  );
  const FixDay = day > 9 ? day : "0" + day;
  const FixHour = hour > 9 ? hour : "0" + hour;
  const FixMinute = minute > 9 ? minute : "0" + minute;
  let template;
  if (Number(FixDay) > 0) {
    template = `${FixDay}<b>${window.$nuxt.$t(
      "Content.DayM"
    )}</b><i>/</i>${FixHour}<b>${window.$nuxt.$t("Content.HourM")}</b>`;
  } else {
    template = `${FixHour}<b>${window.$nuxt.$t(
      "Content.HourM"
    )}</b><i>/</i>${FixMinute}<b>${window.$nuxt.$t("Content.MinM")}</b>`;
  }
  return template;
};
const getComboAPR = async (PoolData) => {
  const Reward1Address = PoolData.reward1_address;
  const Reward2Address = PoolData.reward2_address;
  const StakeAddress = PoolData.stake_address;
  const PoolAddress = PoolData.pool_address;
  const Reward2Decimals = PoolData.reward2_decimals_number;
  const PoolProcess = PoolData.pool_process;
  const StakeDecimals = PoolData.stake_decimals_number;
  const Reward1Volume = PoolData.reward1_volume;
  const Reward2Volume = PoolData.reward2_volume;
  const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const HelmetDecimals = 18;
  const Amount = toWei("1", Reward2Decimals);
  let Reward1HelmetVolume;
  if (Reward1Address.toUpperCase() !== HelmetAddress.toUpperCase()) {
    const Data1 = await getTokenPrice({
      fromTokenAddress: Reward1Address,
      toTokenAddress: HelmetAddress,
      amount: Amount,
    });
    Reward1HelmetVolume = fromWei(Data1.data.toTokenAmount);
  } else {
    Reward1HelmetVolume = 1;
  }
  const Data2 = await getTokenPrice({
    fromTokenAddress: Reward2Address,
    toTokenAddress: HelmetAddress,
    amount: Amount,
  });
  const Reward2HelmetVolume = fromWei(Data2.data.toTokenAmount);
  if (Reward1HelmetVolume && Reward2HelmetVolume) {
    const Reward1HelmetPrice = Reward1HelmetVolume;
    const Reward2HelmetPrice = Reward2HelmetVolume;
    const PoolContracts = new Contract(PoolAddress, MiningABI);
    const StakeContracts = new Contract(StakeAddress, MiningABI);
    const HelmetContracts = new Contract(HelmetAddress, MiningABI);
    const PromiseList = [
      PoolContracts.totalSupply(),
      StakeContracts.totalSupply(),
      HelmetContracts.balanceOf(StakeAddress),
    ];
    const MulticallProvider = getOnlyMultiCallProvider();
    return MulticallProvider.all(PromiseList).then((res) => {
      const FixData = processResult(res);
      let [TotalStakeVolume, TotalLptVolume, LptHelmetValue] = FixData;
      const FixTotalStakeVolume = fromWei(TotalStakeVolume, 18);
      const FixTotalLptVolume = fromWei(TotalLptVolume, StakeDecimals);
      const FixLptHelmetValue = fromWei(LptHelmetValue, HelmetDecimals);
      const Numerator1 =
        ((Reward1HelmetPrice * Reward1Volume) / PoolProcess) * 365;
      const Numerator2 =
        ((Reward2HelmetPrice * Reward2Volume) / PoolProcess) * 365;

      const Denominator =
        ((FixLptHelmetValue * 2) / FixTotalLptVolume) * FixTotalStakeVolume;
      const APR1 = Numerator1 / Denominator;
      const APR2 = Numerator2 / Denominator;
      const APR = fixD(APR1 + APR2 / 100, 2) + "%";
      return (PoolData.apr = APR || "--");
    });
  } else {
    return "--";
  }
};
const getLptAPR = async (PoolData) => {
  const HelmetFarm = "0x1e2798eC9fAe03522a9Fa539C7B4Be5c4eF04699";
  const HelmetAddress = "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8";
  const ProxyAddress = PoolData.proxy_address;
  const ProxyPoolPid = PoolData.pool_pid;
  const HelmetDecimals = 18;
  const StakeAddress = PoolData.stake_address;
  const PoolAddress = PoolData.pool_address;
  const Reward1Have = PoolData.reward1_have;
  const Reward2Have = PoolData.reward2_have;

  const PoolContracts = new Contract(PoolAddress, MiningABI);
  const StakeContracts = new Contract(StakeAddress, MiningABI);
  const HelmetContracts = new Contract(HelmetAddress, MiningABI);
  const ProxyContracts = new Contract(ProxyAddress, ProxyPoolABI);
  const ApproveContracts = new Contract(HelmetAddress, ApproveABI);
  const PromiseList = [
    PoolContracts.totalSupply(),
    StakeContracts.totalSupply(),
    HelmetContracts.balanceOf(StakeAddress),
    ProxyContracts.cakePerBlock(),
    ProxyContracts.totalAllocPoint(),
    ProxyContracts.poolInfo(ProxyPoolPid),
    ApproveContracts.allowance(HelmetFarm,PoolAddress),
    PoolContracts.rewards('0x0000000000000000000000000000000000000000'),
    PoolContracts.rewardsDuration()
  ];
  const MulticallProvider = getOnlyMultiCallProvider();
  MulticallProvider.all(PromiseList).then((res) => {

  });
  if (Reward1Have) {
    const Reward1Address = PoolData.reward1_address;
    const Reward1Decimals = PoolData.reward1_decimals_number;
    const Reward1HelmetPrice = 1;
  }
  if (Reward2Have) {
    const Reward2Address = PoolData.reward2_address;
    const Reward2Symbol = PoolData.reward2_symbol;
    const Reward2Decimals = PoolData.reward2_decimals_number;
    const Amount = toWei("1", Reward2Decimals);
    const Data = await getTokenPrice({
      fromTokenAddress: Reward2Address,
      toTokenAddress: HelmetAddress,
      amount: Amount,
    });
    const Reward2HelmetPrice = fromWei(Data.data.toTokenAmount);
  }
};
