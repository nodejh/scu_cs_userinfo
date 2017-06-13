const constants = require('./../config/constants');
const account = require('./account');
const changeMessageTokey = require('./../helper/changeMessageToKey');

const {
  defalutMessage,
  bindMessage,
  primaryKeysWithBind,
  // primaryKeysWithoutBind,
} = constants;


const handle = {
  1: (isBind) => {
    console.log('isBind: ', isBind);
    return isBind;
  },
  2: isBind => isBind,
  3: isBind => isBind,
  4: isBind => isBind,
  grade: () => {

  },
  unbind: isBind => isBind,
  bind: async (openId, isBind, content) => {
    if (isBind) {
      // 已经绑定过
      return constants.WECHAT_IS_BIND;
    }
    try {
      const numberAndPassword = content.split('+');
      const number = numberAndPassword[0];
      const password = numberAndPassword[1];
      const res = await account.bind(openId, number, password);
      if (res.success) {
        // 绑定成功，返回绑定成功 + 个人信息
        return '绑定成功！\n' +
          '您的个人信息如下\n' +
          `姓名: ${res.userInfo.name}\n` +
          `性别: ${res.userInfo.gender}\n` +
          `年级: ${res.userInfo.grade}\n` +
          `学院: ${res.userInfo.college}\n` +
          `专业: ${res.userInfo.major}`;
      }
      return res.message;
    } catch (e) {
      return e.message;
    }
  },
};

const middleware = async (message) => {
  console.log('message: ', message);
  const openId = message.FromUserName;
  const content = message.Content;

  // 判断是否已经绑定
  const isBind = await account.isBind(openId);
  const key = changeMessageTokey(content);
  if (Object.keys(handle).indexOf(key) !== -1) {
    return handle[key](isBind, content);
  }
  return constants.WECHAT_DEFAULT;
};


module.exports = {
  middleware,
};
