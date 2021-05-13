import { isArray, isFunction } from '@ali/f2x-util';

function objToString(obj: any) {
  return Object.prototype.toString.call(obj);
}

function objectKeys(obj: any) {
  return Object.keys(obj);
}

function equal(a: any, b: any): boolean {
  if (a === b) return true;

  if (typeof a !== typeof b) {
    return false;
  }

  // null 和 undefined
  if (a == null || b == null) {
    return false;
  }

  // 特殊处理NaN
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  // 值类型，Number String Boolean
  if (typeof a !== 'object') {
    return false;
  }

  if (objToString(a) !== objToString(b)) {
    return false;
  }

  // 如果是function， 则认为是相对
  if (isFunction(a)) {
    return true;
  }

  if (isArray(a)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = a.length - 1; i >= 0; i--) {
      if (!equal(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  const ka = objectKeys(a);
  const kb = objectKeys(b);
  // having the same number of owned properties (keys incorporates hasOwnProperty)
  if (ka.length !== kb.length) {
    return false;
  }

  // the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  // ~~~cheap key test
  for (let i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) {
      return false;
    }
  }

  // equivalent values for every corresponding key, and ~~~possibly expensive deep test
  for (let i = ka.length - 1; i >= 0; i--) {
    const key = ka[i];
    if (!equal(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

export default (a, b) => {
  return equal(a, b);
}