import precision from "./precision";

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}


export const autoprefixer = function(style) {
  if (typeof style !== "object") return style;
  const rules = ["transform", "transition", "animation"];
  const prefixes = ["ms-", "webkit-"];
  rules.forEach((rule) => {
    const value = style[rule];
    if (rule && value) {
      prefixes.forEach((prefix) => {
        style[prefix + rule] = value;
      });
    }
  });
  return style;
};


export const fixDEAdd = (num, precision, autoFix = true) => {
  if (`${num}` === "0") {
    if (!parseFloat(precision) || !autoFix) return 0;
    return "0.".padEnd(precision + 2, "0");
  }
  if (!num) return "--";
  const number = parseFloat(num);
  const strN = num.toString();
  const flag = number < 0;
  let result = strN;

  if (strN.toLowerCase().indexOf("e") > -1) {
    const n = strN.match(/(\d+?)(?:\.(\d*))?e([+-])(\d+)/);
    const nl = n[1]; 
    const nr = n[2]; 
    const type = n[3]; 
    const floatN = n[4]; 
    let params = "";
    let pr = nr ? nr.substr(floatN) : "";

    if (pr) pr = `.${pr}`;
    if (type !== "-") {
      for (let i = 0; i < floatN; i += 1) {
        const p = nr[i] || "0";
        params += p;
      }
      result = nl + params + pr;
    } else {
      let strl = "0";
      for (let i = 0; i < floatN; i += 1) {
        const p = nl[nl.length - i - 1] || "0";
        params = p + params;
      }
      if (nl.length > floatN) strl = nl.substr(0, nl.length - floatN);
      result = `${strl}.${params}${nr}`;
    }
  }

  if (precision && autoFix) {
    let pal = `${result.split(".")[0]}.`;
    const par = result.split(".")[1] || "";

    for (let i = 0; i < precision; i += 1) {
      pal += par[i] || "0";
    }
    result = pal;
  }

  if (result.length > 14) {
    const arry = result.split(".");
    if (arry[0].length > 14) {
      result = `${arry[0].slice(0, 14)}+`;
    } else {
      result = result.slice(0, 13);
      if (result.indexOf(".") === 12) {
        result = result.slice(0, 12);
      }
    }
  }

  return `${flag ? "-" : ""}${result}`;
};

export const fixD = (num, precision) => {
  precision = precision > -1 ? precision : 0;
  if (`${num}` === "0") {
    if (!parseFloat(precision)) {
      return 0;
    }
    return "0.".padEnd(precision + 2, "0");
  }
  if (!num) {
    return "--";
  }
  let flag = false;
  if (parseFloat(num) < 0) {
    flag = true;
  }

  const newnum = `${Math.abs(parseFloat(num))}`;
  if (newnum === "NaN") {
    return "--";
  }
  let fixNum = newnum;
  if (newnum.toLowerCase().indexOf("e") > -1) {
    if (newnum.toLowerCase().indexOf("+") > -1)
      return fixDEAdd(newnum, precision);
    const a = newnum.toLowerCase().split("e");
    let b = a[0];
    const c = Math.abs(parseFloat(a[1]));
    let d = "";
    let h = b.length;
    let i;
    if (a[0].split(".")[1]) {
      b = a[0].split(".")[0] + a[0].split(".")[1];
      h = a[0].split(".")[0].length;
    }
    for (i = 0; i < c - h; i += 1) {
      d += "0";
    }
    fixNum = `0.${d}${b}`;
  }
  if (`${precision}` !== "0" && !precision) {
    return (flag ? "-" : "") + fixNum;
  }
  if (`${parseFloat(num)}` === "NaN") {
    return (flag ? "-" : "") + fixNum;
  }
  const fNum = fixNum.split(".");
  if (precision === 0) {
    fixNum = parseInt(fixNum, 10);
  } else if (precision > 0 && fNum[1]) {
    if (fNum[1].length > precision) {
      if (fNum[1].indexOf("999999999") > -1) {
        const s = parseFloat(fixNum).toFixed(precision + 1);
        fixNum = s.slice(0, s.length - 1);
      } else {
        fixNum = `${fNum[0]}.${fNum[1].slice(0, precision)}`;
      }
    } else {
      fixNum = parseFloat(fixNum).toFixed(precision);
    }
  } else {
    fixNum = parseFloat(fixNum).toFixed(precision);
  }
  if (fixNum.length >= 14 && fixNum.indexOf(".") > -1) {
    const arry = fixNum.split(".");
    if (arry[0].length > 14) {
      fixNum = `${arry[0].slice(0, 14)}+`;
    } else {
      fixNum = fixNum.slice(0, 19);
      if (fixNum.indexOf(".") === 18) {
        fixNum = fixNum.slice(0, 18);
      }
    }
  }
  return (flag ? "-" : "") + fixNum;
};

export const fixInput = (val, fixs) => {
  let fix = fixs;
  if (!fix === 0) {
    fix = fix || 10;
  }

  let v = `${fixDEAdd(val, fixs, false)}`;
  if (v.charAt(0) === ".") {
    v = "0.";
  }
  const strArr = [...v].reduce((res, c) => {
    if (res[c]) {
      res[c] += 1;
    } else {
      res[c] = 1;
    }
    return res;
  }, {});
  if (strArr["."] === 2) {
    const arr = v.split(".");
    v = `${arr[0]}.${arr[1]}`;
  }
  if (v.indexOf(".") !== -1) {
    const integer = v.split(".")[0];
    let decimal = v.split(".")[1]; 
    if (decimal.length > fix) {
      decimal = decimal.substring(0, fix);
      v = `${integer}.${decimal}`;
    }
  }
  const strKey = Object.keys(strArr);
  strKey.forEach((c) => {
    let str = "01234567890.";
    if (fix === 0) {
      str = "01234567890";
    }
    if (str.indexOf(c) === -1) {
      v = v.split(c)[0] + (v.split(c)[1] || "");
    }
  });
  if (v.length > 20) {
    v = v.substring(0, 20);
  }
  return v;
};

export const mathCeil = (val, n) => {
  let d = fixD(val, n + 1);
  const f = Math.pow(10, n);
  d = precision.times(d, f);
  let result;
  if (d > 0) {
    result = precision.divide(Math.ceil(d), f);
  } else {
    result = precision.divide(Math.floor(d), f);
  }
  return fixD(result, n);
};

export const addCommom = (num, len) => {
  if (isNaN(num) || !num) return num;
  num = String(num);
  if (!isNaN(len)) {
    if (len === 0) {
      num = num.split(".")[0];
    }
    return num.replace(/(\d+)(\.\d+)?/, (a, b, c) => {
      return (
        b.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") +
        (c ? c.slice(0, len + 1) : "")
      );
    });
  } else {
    return num.replace(/^\d+/, (a) => {
      return a.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    });
  }
};

export const timeFormat = (time, type) => {
  let date = getTimeZone(time);
  if (!type) return getYMD(date) + " " + getHMS(date);
  switch (type) {
    case "HMS":
      return getHMS(date);
    case "YMD":
      return getYMD(date);
  }
};

function singleFormat(str) {
  return str.toString().length === 1 ? "0" + str : str;
}

function getYMD(time) {
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  return year + "-" + singleFormat(month) + "-" + singleFormat(date);
}

function getHMS(time) {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  return (
    singleFormat(hours) +
    ":" +
    singleFormat(minutes) +
    ":" +
    singleFormat(seconds)
  );
}
function getTimeZone(time) {
  let GTM_8 = 480; // -480
  let date = new Date(time);
  let subMin = date.getTimezoneOffset() + GTM_8;
  date.setMinutes(date.getMinutes() + subMin);
  return date;
}

export const formatNumW = (num) => {
  if (Number(num) > 10000) {
    return fixD(Number(num) / 10000, 2) + "万";
  }
  return num;
};

export const formatNumM = (num) => {
  if (Number(num) > 1000000) {
    return fixD(Number(num) / 1000000, 2) + "M";
  }
  return num;
};

export const isPC = () => {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return false;
  } else {
    return true;
  }
};

export const toPrecision = (num, wei = 2) => {
  let n = Number(num).toPrecision(wei);
  return Number(n);
};



export const autoRounding = (num) => {
  const arr = String(num).split(".");
  if (!arr[1]) return num; 

  if (arr[0].length > 2) {
    return Number(num).toFixed(0);
  } else {
    if (arr[0] != 0) {
      return Number(num).toFixed(2);
    } else {
      let w = 0;
      let i = 0;
      while (!Number(arr[1][i])) {
        i++;
        w++;
      }
      return Number(num).toFixed(w + 2);
    }
  }
};

/**
 * 四舍五入
 */
export const toRounding = (num, fix = 4) => {
  return parseFloat(Number(num).toFixed(fix));
};
