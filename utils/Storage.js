const config = {
  type: "localStorage", // 本地存储类型 localStorage/sessionStorage
  prefix: "PGS_0.0.1", // 名称前缀 建议：项目名 + 项目版本
  expire: 7 * 24 * 60 * 60, //过期时间 单位：秒 天：24*60*60；周：7*24*60*60；月：30*24*60*60；年：365*24*60*60
};

export const setStorage = (key, value, expire) => {
  if (value === "" || value === null || value === undefined) {
    value = null;
  }

  if (expire) {
    if (isNaN(expire) || expire < 1) throw new Error("Expire must be a number");
  }

  expire = (expire ? expire : config.expire) * 1000;

  let data = {
    value: value, // 存储值
    time: Date.now(), //存值时间戳
    expire: expire, // 过期时间
  };

  console.log(`time: `, new Date(data.time));
  // console.log(`expire: `, new Date(data.expire).getSeconds() + `s`);
  console.log(`expire: `, new Date(data.expire + data.time));

  window[config.type].setItem(key, [JSON.stringify(data)]);
};

export const getStorage = (key) => {
  // key = autoAddPrefix(key);
  // key 不存在判断
  if (
    !window[config.type].getItem(key) ||
    JSON.stringify(window[config.type].getItem(key)) === "null"
  ) {
    return null;
  }

  // 优化 持续使用中续期
  const storage = JSON.parse(window[config.type].getItem(key));
  console.log(`storage`, storage);

  let nowTime = Date.now();

  console.log(config.expire, `s`, (nowTime - storage.time) / 1000, `s`);

  // 过期删除
  if (storage.expire && config.expire * 1000 < nowTime - storage.time) {
    removeStorage(key);
    return null;
  } else {
    //  持续使用时会自动续期
    // setStorage(autoRemovePrefix(key), storage.value);
    setStorage(key, storage.value);
    return storage.value;
  }
};

// 获取全部 getAllStorage
export const getAllStorage = () => {
  let len = window[config.type].length; // 获取长度
  let arr = new Array(); // 定义数据集
  for (let i = 0; i < len; i++) {
    // 获取key 索引从0开始
    let getKey = window[config.type].key(i);
    // 获取key对应的值
    let getVal = window[config.type].getItem(getKey);
    // 放进数组
    arr[i] = { key: getKey, val: getVal };
  }
  return arr;
};

// 名称前自动添加前缀
const autoAddPrefix = (key) => {
  const prefix = config.prefix ? config.prefix + "_" : "";
  return prefix + key;
};

// 删除 removeStorage
export const removeStorage = (key) => {
  window[config.type].removeItem(autoAddPrefix(key));
};

// 清空 clearStorage
export const clearStorage = () => {
  window[config.type].clear();
};
