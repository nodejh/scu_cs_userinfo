
const query = require('./../utils/mysql').query;
const loginZhjw = require('./../crawler/loginZhjw');
const { fetchUserInfo } = require('./../crawler/userInfo');
const constants = require('./../config/constants');

/**
 * 判断是否已经绑定教务系统
 * @param  {string}  openId 微信 open id
 * @return {Promise}        true|false
 */
const isBind = async (openId) => {
  const sql = 'select id from users where open_id = ? and status = ?';
  const res = await query(sql, [openId, constants.USERS_STATUS_OK]);
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
    const info = await fetchUserInfo(cookies);
    const sql = 'insert into users set ?';
    const data = {
      open_id: openId,
      name: info.name,
      number,
      password,
      gender: info.gender,
      college: info.college,
      major: info.major,
      grade: info.grade,
      status: 0,
    };
    console.log('info: ', info);

    const insertRes = await query(sql, [data]);
    console.log('insertRes: ', insertRes);
    res.success = true;
    res.message = '绑定成功！';
    res.userInfo = info;
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
