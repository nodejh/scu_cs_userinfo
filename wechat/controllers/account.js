
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
 * 解绑教务系统
 * @param  {string}  openId   微信 open id
 * @return {Promise}          {success, message}
 */
const unbind = async (openId) => {
  const res = { success: false, message: '解绑失败，请重试' };
  try {
    const sqlSelect = 'select * from users where open_id = ?';
    const users = await query(sqlSelect, [openId]);
    const sqlBackup = 'insert into users_backup set ?';
    const user = users[0];
    user.datetime = new Date();
    await query(sqlBackup, [user]);
    const sqlDelete = 'delete from users where open_id = ?';
    await query(sqlDelete, [openId]);
    res.success = true;
    res.message = '解绑成功！';
    return res;
  } catch (e) {
    res.message = e.message;
    return res;
  }
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
      datetime: new Date(),
    };
    await query(sql, [data]);
    res.success = true;
    res.message = '绑定成功！';
    res.userInfo = info;
    return res;
  } catch (e) {
    res.message = e.message;
    return res;
  }
};


const info = async (openId) => {
  const res = { success: false, message: '查询个人信息失败', info: {} };
  try {
    const sql = 'select * from users where open_id = ?';
    const infos = await query(sql, [openId]);
    if (infos.length > 0) {
      res.success = true;
      res.info = infos[0];
      res.message = '查询个人信息成功';
    }
    return res;
  } catch (e) {
    return res;
  }
};

const rank = async (openId) => {
  const res = { success: false, message: '查询排名失败', info: {} };
  try {
    const sql = 'select number from users where open_id = ?';
    const users = await query(sql, [openId]);
    if (users.length === 0) {
      res.message = '学号不存在';
      return res;
    }
    const number = users[0].number;
    const sqlRank = 'select * from grade where number = ?';
    const grades = await query(sqlRank, [number]);
    if (grades.length === 0) {
      res.message = '您的排名信息尚未录入';
      return res;
    }
    res.success = true;
    res.info = grades[0];
    res.message = '查询排名成功';
    return res;
  } catch (e) {
    return res;
  }
};


module.exports = {
  isBind,
  unbind,
  bind,
  info,
  rank,
};
