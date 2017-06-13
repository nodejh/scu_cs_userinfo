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
  bind: async (isBind) => {
    if (isBind) {
      // 已经绑定过
      return constants.WECHAT_IS_BIND;
    }
    try {
      const res = await account.bind(openId, number, password);
      if (res.success) {
        // 绑定成功，返回绑定成功 + 个人信息
        return '绑定成功！\n' +
          '您的个人信息如下\n' +
          `姓名: ${bindResult.userInfo.name}\n` +
          `性别: ${bindResult.userInfo.gender}\n` +
          `年级: ${bindResult.userInfo.grade}\n` +
          `学院: ${bindResult.userInfo.college}\n` +
          `专业: ${bindResult.userInfo.major}`;
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
    return handle[key](isBind);
  }
  return constants.WECHAT_DEFAULT;


    const numberAndPassword = content.split('+');
    const number = parseInt(numberAndPassword[0], 10);
    const password = numberAndPassword[1];
    // console.log('number: ', number);
    // console.log('password: ', password);
    // 判断格式是否正确
    if (number && password && number.toString().length === 13 && password.length > 4) {
      // 正确
      const bindResult = await account.bind(openId, number, password);
      // console.log('bindResult: ', bindResult);
      if (bindResult.success) {
        // 绑定成功，返回绑定成功 + 个人信息
        return '绑定成功！\n' +
          '您的个人信息如下\n' +
          `姓名: ${bindResult.userInfo.name}\n` +
          `性别: ${bindResult.userInfo.gender}\n` +
          `年级: ${bindResult.userInfo.grade}\n` +
          `学院: ${bindResult.userInfo.college}\n` +
          `专业: ${bindResult.userInfo.major}`;
      }
        // 绑定失败，返回错误消息
      return bindResult.message;
    }
  }

  return defalutMessage;

  // if (content) { return constants.defalutMessage; }
  // const number = parseInt(message.Content, 10);
  // if (number) {
  //   // 根据 number 查询成绩
  //   const sql = 'select * from grade where number = ?';
  //   const res = await query(sql, [number]);
  //   if (res.length > 0) {
  //     // console.log('res: ', res);
  //     // number: 2013141223047,
  //     //   average_grade: 72.26,
  //     //   average_credit: 1.82,
  //     //   average_credit_grade: 55.97,
  //     //   ranking: 37
  //     return `学号:${res[0].number}\n` +
  //     `平均成绩:${res[0].average_grade} \n` +
  //     `平均学分绩点:${res[0].average_credit} \n` +
  //     `加权学分成绩:${res[0].average_credit_grade}\n` +
  //     `排名:${res[0].ranking}`;
  //   }
  //   return '学号不存在';
  // }
  // return '学号格式错误';
};


module.exports = {
  middleware,
};
