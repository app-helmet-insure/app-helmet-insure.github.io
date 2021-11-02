import { JsonRpcProvider } from "@ethersproject/providers";
import { cloneDeep } from "lodash";
import Web3 from "web3";
import ERC20 from "~/web3/abis/ERC20ABI.json";
import { Contract, Provider, setMulticallAddress } from "ethers-multicall-x";
import BigNumber from "bignumber.js";
BigNumber.config({ EXPONENTIAL_AT: 100 });
const CHAIN_ID_LOCALHOST = 31337;
const BSCChainId = 56;
const BSCRpcUrl = "https://bsc-dataseed.binance.org/";
let testNetwork = null;
if (process.browser) {
  if (window.sessionStorage.getItem("helmet_test_chain")) {
    testNetwork = CHAIN_ID_LOCALHOST;
    console.log("helmet_test_chain", true);
  }
}
const multiCallChainId = testNetwork || BSCChainId;
const multiCallRPCUrl = testNetwork ? "http://localhost:8545" : BSCRpcUrl;
console.log(multiCallChainId, multiCallRPCUrl);

const getMultiCallProvider = (provider, chainId) => {
  setMulticallAddress(
    CHAIN_ID_LOCALHOST,
    "0x41263cba59eb80dc200f3e2544eda4ed6a90e76c"
  );
  return new Provider(provider, chainId);
};

export const getOnlyMultiCallProvider = () =>
  getMultiCallProvider(
    new JsonRpcProvider(multiCallRPCUrl, multiCallChainId),
    multiCallChainId
  );

export function processResult(data) {
  data = cloneDeep(data);
  if (Array.isArray(data)) {
    data.map((o, i) => {
      data[i] = processResult(o);
    });
    return data;
  } else if (data.toString) {
    return data.toString();
  } else if (typeof data === "object") {
    for (let key in data) {
      Object.assign(data, {
        [key]: processResult(0),
      });
    }
    return data;
  } else {
    return data;
  }
}
export const formatAmount = (value, decimals = 18, fixed = 6) => {
  return new BigNumber(
    fromWei(value, decimals).toFixed(fixed === -1 ? null : fixed, 1)
  )
    .toNumber()
    .toString();
};
export const fromWei = (value, decimals = 18) => {
  return new BigNumber(value).dividedBy(new BigNumber(10).pow(decimals));
};

const toWei = (value, decimals) => {
  return new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimals));
};

export const numToWei = (value, decimals = 18) => {
  return new BigNumber(
    toWei(value, decimals)
      .toNumber()
      .toFixed(decimals)
  ).toString();
};

const multicallProvider = getOnlyMultiCallProvider();

export const getPoolInfo = (pool) => {
  const poolContract = new Contract(pool.address, pool.abi);
  const account = window.CURRENTADDRESS;
  if (!account) {
    return Promise.all([]).then(() => pool);
  }
  const currencyContract = new Contract(pool.currency.address, ERC20.abi);
  const currencyToken = pool.currency.is_ht
    ? null
    : new Contract(pool.currency.address, ERC20.abi);
  const promiseList = [
    poolContract.price(),
    poolContract.totalPurchasedCurrency(),
    poolContract.purchasedCurrencyOf(account),
    // poolContract.totalSettleable(),
    poolContract.settleable(account),
    poolContract.totalSettledUnderlying(),
    poolContract.maxUser(),
    poolContract.curUserCount(),
    poolContract.amtLow(),
    poolContract.amtHigh(),
  ];
  if (pool.airdrop) {
    const airdropContract = new Contract(
      pool.airdrop.address,
      pool.airdrop.abi
    );
    promiseList.push(airdropContract.allowList(account));
    promiseList.push(airdropContract.withdrawList(account));
    promiseList.push(airdropContract.begin());
  }
  poolContract.time && promiseList.push(poolContract.time());
  poolContract.timeSettle && promiseList.push(poolContract.timeSettle());
  currencyToken &&
    promiseList.push(currencyToken.allowance(account, pool.address));
  currencyToken && promiseList.push(currencyToken.balanceOf(account));
  return multicallProvider
    .all(promiseList)
    .then((res) => {
      const now = parseInt(Date.now() / 1000);
      const resData = processResult(res);
      let [
        price,
        totalPurchasedCurrency,
        purchasedCurrencyOf,
        // totalSettleable,
        settleable,
        totalSettledUnderlying,
        maxUser,
        curUserCount,
        amtLow,
        amtHigh,
      ] = resData;
      let time,
        timeSettle,
        currency_allowance,
        balanceOf,
        allowList,
        withdrawList,
        airdropBegin;

      if (pool.airdrop) {
        allowList = resData[9];
        withdrawList = resData[10];
        airdropBegin = resData[11];
        time = resData[12];
        timeSettle = resData[13];
        currency_allowance = resData[14];
        balanceOf = resData[15];
        pool.airdrop = Object.assign(pool.airdrop, {
          begin: airdropBegin,
          allowList: fromWei(allowList, 18).toFixed(6) * 1,
          withdrawList: {
            true: true,
            false: false,
          }[String(withdrawList)],
        });
      } else {
        time = resData[9];
        timeSettle = resData[10];
        currency_allowance = resData[11];
        balanceOf = resData[12];
      }
      if (pool.airdrop) {
        price = new BigNumber(price).div(2).toString();
      }
      // time = 1629118800
      //   timeSettle = 1629118800
      // curUserCount=0
      // purchasedCurrencyOf=0
      // const [
      //   total_completed_,
      //   total_amount,
      //   total_volume,
      //   total_rate,
      // ] = totalSettleable
      const [completed_, amount, volume, rate] = settleable;

      let status = pool.status || 0;
      const timeClose = time;
      if (timeSettle) {
        time = timeSettle;
      }
      if (pool.start_at < now && status < 1) {
        status = 1;
      }
      if (time < now && status < 2) {
        status = 2;
      }

      // if (
      //   totalSettleable.volume == totalSettledUnderlying &&
      //   totalSettleable.volume > 0
      // ) {
      //   status = 3
      // }

      const totalPurchasedAmount = new BigNumber(
        fromWei(pool.amount, pool.decimal)
      )
        .multipliedBy(new BigNumber(price))
        .div(new BigNumber(fromWei("1", pool.underlying.decimal)));
      // console.log('totalPurchasedAmount',pool.name, totalPurchasedAmount.toString())

      const totalPurchasedUnderlying = numToWei(
        new BigNumber(totalPurchasedCurrency)
          .dividedBy(new BigNumber(price))
          .toFixed(0, 1),
        pool.currency.decimal
      );

      let is_join = false;
      if (purchasedCurrencyOf > 0) {
        is_join = true;
      }
      Object.assign(pool.currency, {
        allowance: currency_allowance,
      });
      // const num = new BigNumber(10).pow(pool.currency.decimal).multipliedBy(new BigNumber(10).pow(18)).div(new BigNumber(price).multipliedBy(new BigNumber(10).pow(pool.underlying.decimal))).toFixed(6) * 1

      const num =
        new BigNumber(1)
          .div(
            new BigNumber(price).div(
              new BigNumber(10).pow(18 + 18 - pool.underlying.decimal)
            )
          )
          .toFixed(6) * 1;

      return Object.assign({}, pool, {
        ratio: `1 ${pool.currency.symbol} = ${new BigNumber(num).toFormat()} ${
          pool.underlying.symbol
        }`,
        progress: new BigNumber(
          fromWei(totalPurchasedCurrency, pool.currency.decimal)
        )
          .div(new BigNumber(pool.amount).div(new BigNumber(num)))
          .toFixed(6)
          .toString(),
        status: status,
        time: time,
        timeClose,
        timeSettle,
        is_join,
        totalPurchasedCurrency,
        totalPurchasedAmount: totalPurchasedAmount,
        totalPurchasedUnderlying,
        balanceOf: formatAmount(balanceOf, pool.currency.decimals, 6),
        purchasedCurrencyOf,
        // totalSettleable: {
        //   completed_: total_completed_,
        //   amount: total_amount,
        //   volume: total_volume,
        //   rate: total_rate,
        // },
        totalSettledUnderlying,
        settleable: {
          completed_,
          amount,
          volume,
          rate,
        },
        pool_info: {
          ...pool.pool_info,
          maxAccount: maxUser,
          curUserCount,
          min_allocation: fromWei(amtLow, pool.currency.decimal) * 1,
          max_allocation: fromWei(amtHigh, pool.currency.decimal) * 1,
        },
      });
    })
    .catch(() => pool);
};

export const onApprove_ = (
  contractAddress,
  poolAddress,
  callback = (status) => {}
) => {
  let web3_ = new Web3(
    window.ethereum ||
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
  );
  let myContract = new web3_.eth.Contract(ERC20.abi, contractAddress);
  myContract.methods
    .approve(
      poolAddress,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
    .send({ from: window.CURRENTADDRESS })
    .on("receipt", function() {
      callback(true);
    })
    .on("error", () => {
      callback(false);
    });
};
export const onBurn_ = (_amount, iboData, callback) => {
  let web3_ = new Web3(
    window.ethereum ||
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
  );
  let myContract = new web3_.eth.Contract(iboData.abi, iboData.address, {
    gasPrice: Web3.utils.toWei("6", "gwei"),
  });
  myContract.methods
    .purchase(numToWei(String(_amount), iboData.currency.decimal))
    .send({ from: window.CURRENTADDRESS })
    .on("receipt", function() {
      callback(true);
    })
    .on("error", () => {
      callback(false);
    });
};
export const onClaim_ = (contractAddress, abi, callback) => {
  let web3_ = new Web3(
    window.ethereum ||
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
  );
  let myContract = new web3_.eth.Contract(abi, contractAddress);
  myContract.methods
    .settle()
    .send({ from: window.CURRENTADDRESS })
    .on("receipt", function() {
      callback(true);
    })
    .on("error", () => {
      callback(false);
    });
};
export const onAirdrop_ = (contractAddress, abi, callback) => {
  let web3_ = new Web3(
    window.ethereum ||
      new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
  );
  let myContract = new web3_.eth.Contract(abi, contractAddress);
  myContract.methods
    .withdraw()
    .send({ from: window.CURRENTADDRESS })
    .on("receipt", function() {
      callback(true);
    })
    .on("error", () => {
      callback(false);
    });
};
