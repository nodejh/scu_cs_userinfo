const defalutMessage = `欢迎使用计算机学院微信公众平台！
您可以回复：
[学号+密码] 绑定教务系统（如 2014141400000+000000）
[1] 个人信息填写
[2] 排名查询
[3] 成绩查询
[4] 考表查询
[5] 个人信息查询

也可以回复 成绩、排名等关键字，我也会聊天哦～
`;

const bindMessage = '您还没绑定教务系统哦～\n请回复 [学号+密码]（如 2014141400000+000000）绑定教务系统';

const primaryKeysWithBind = [
  '1', '2', '3', '4', '5', '成绩', '排名', '个人信息',
];

const primaryKeysWithoutBind = [];


module.exports = {
  defalutMessage,
  bindMessage,
  primaryKeysWithBind,
  primaryKeysWithoutBind,
};
