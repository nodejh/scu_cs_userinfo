
const query = require('./../utils/mysql').query;
const loginZhjw = require('./../crawler/loginZhjw');
const { analyseUserInfo } = require('./../crawler/userInfo');


/**
 * 判断是否已经绑定教务系统
 * @param  {string}  openId 微信 open id
 * @return {Promise}        true|false
 */
const isBind = async (openId) => {
  const sql = 'select id from users where open_id = ?';
  const res = await query(sql, [openId]);
  if (res.length === 0) {
    return false;
  }
  return true;
};


/**
 * 绑定教务系统
 * @param  {string}  openId   微信 open id
 * @param  {string}  number   学号
 * @param  {string}  password 密码
 * @return {Promise}          {success, message, userInfo}
 */
const bind = async (openId, number, password) => {
  const res = { success: false, message: '绑定失败，请重试', userInfo: {} };
  try {
    const cookies = await loginZhjw(number, password);
    const info = await analyseUserInfo(cookies);
    if (info.error) {
      res.message = info.error;
    } else {
      res.success = true;
      res.message = '绑定成功！';
      res.userInfo = info.userInfo;
    }
    return res;
  } catch (e) {
    res.message = e.message;
    return res;
  }
};


module.exports = {
  isBind,
  bind,
};
