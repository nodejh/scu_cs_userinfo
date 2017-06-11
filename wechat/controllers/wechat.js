const { query } = require('./../utils/mysql');
const constants = require('./../constants/constants');
const account = require('./account');

const middleware = async (message) => {
  console.log('message: ', message);
  const openId = message.FromUserName;
  const isBind = await account.isBind(openId);
  console.log('isBind: ', isBind);

  return constants.default;
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


module.export = {
  middleware,
};
