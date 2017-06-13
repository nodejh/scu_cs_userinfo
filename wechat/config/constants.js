module.exports = {
  // database
  // 规则：表名_字段名_状态
  USERS_STATUS_OK: 0, // 用户表信息合法
  USERS_STATUS_DELETE: 1, // 用户取消绑定
  USERS_STATUS_ILLEGAL: 2, // 用户非法

  // wechat
  WECHAT_DEFAULT: '欢迎使用计算机学院微信公众平台！您可以回复：\n' +
    '[学号+密码] 绑定教务系统（如 2014141400000+000000）\n' +
    '[1] 个人信息填写\n' +
    '[2] 排名查询\n' +
    '[3] 成绩查询\n' +
    '[4] 考表查询\n' +
    '[5] 个人信息查询\n' +
    '也可以回复 成绩、排名等关键字，我也会聊天哦～',
  WECHAT_NOT_BIND: '您还没绑定教务系统哦～\n请回复 [学号+密码]（如 2014141400000+000000）绑定',
  WECHAT_IS_BIND: '您已经绑定了教务系统哦，无需再次绑定~\n解绑请回复 unbind',
};
