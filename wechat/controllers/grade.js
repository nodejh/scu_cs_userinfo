const query = require('./../utils/mysql').query;
const constants = require('./../config/constants');
const getCurrentTermGrade = require('./../crawler/getCurrentTermGrade');
const getAllPassGrades = require('./../crawler/getAllPassGrades');
const loginZhjw = require('./../crawler/loginZhjw');


const currentTermGrade = async (openId) => {
  const res = { success: false, message: '获取本学期成绩失败', grades: {} };
  try {
    const sqlSelect = 'select * from users where open_id = ?';
    const users = await query(sqlSelect, [openId]);
    if (users.length === 0) {
      // 没有对应的用户信息 => 用户未绑定教务系统
      res.message = constants.WECHAT_NOT_BIND;
      return res;
    }
    const cookies = await loginZhjw(users[0].number, users[0].password);
    const grades = await getCurrentTermGrade(cookies);
    // console.log('grades: ', grades);
    res.grades = grades;
    res.success = true;
    res.message = '获取本学期成绩成功';
    return res;
  } catch (e) {
    res.message = e.message;
    return res;
  }
};


const allPassGrades = async (openId) => {
  const res = { success: false, message: '获取所有学期成绩失败', grades: {} };
  try {
    const sqlSelect = 'select * from users where open_id = ?';
    const users = await query(sqlSelect, [openId]);
    if (users.length === 0) {
      // 没有对应的用户信息 => 用户未绑定教务系统
      res.message = constants.WECHAT_NOT_BIND;
      return res;
    }
    const cookies = await loginZhjw(users[0].number, users[0].password);
    const grades = await getAllPassGrades(cookies);
    // console.log('grades: ', grades);
    res.grades = grades;
    res.success = true;
    res.message = '获取所有学期成绩成功';
    return res;
  } catch (e) {
    res.message = e.message;
    return res;
  }
};


module.exports = {
  currentTermGrade,
  allPassGrades,
};
