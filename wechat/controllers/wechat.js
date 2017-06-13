const constants = require('./../config/constants');
const account = require('./account');
const grade = require('./grade');
const changeMessageTokey = require('./../helper/changeMessageToKey');
const examination = require('./examination');

const handle = {
  1: (isBind) => {
    console.log('isBind: ', isBind);
    return isBind;
  },
  2: isBind => isBind,
  // 本学期成绩查询
  currentTermGrade: async (openId, isBind) => {
    if (!isBind) {
      // 没有绑定
      return constants.WECHAT_NOT_BIND;
    }
    try {
      const res = await grade.currentTermGrade(openId);
      if (!res.success) {
        return res.message;
      }
      const { gpa, gradesList } = res.grades;
      // console.log('gpa: ', gpa);
      let text = '';
      text += `必修绩点: ${gpa.averageGpaObligatory}\n`;
      text += `所有科目平均绩点: ${gpa.averageGpa}\n`;
      text += `必修成绩: ${gpa.averageGradeObligatory}\n`;
      text += `所有科目平均成绩: ${gpa.averageGrade}\n`;
      text += '\n\n';
      // 已出成绩
      const getGradeNumber = gradesList.filter(item => !isNaN(parseInt(item.grade, 10))).length;
      text += `已出成绩/课程总门数: ${getGradeNumber}/${gradesList.length}\n`;
      gradesList.forEach((item) => {
        if (!isNaN(parseInt(item.grade, 10))) {
          text += `${item.courseName} [${item.courseProperty}]\n`;
          text += `${item.courseNumber}-${item.lessonNumber}\n`;
          text += `学分: ${item.credit}\n`;
          text += `成绩: ${item.grade}\n`;
          text += '\n';
        }
      });
      return text;
    } catch (e) {
      return e.message;
    }
  },
  allPassGrades: async (openId, isBind) => {
    if (!isBind) {
      // 没有绑定
      return constants.WECHAT_NOT_BIND;
    }
    try {
      const res = await grade.allPassGrades(openId);
      console.log('res: ', res);
      if (!res.success) {
        return res.message;
      }
      let text = '';
      res.grades.forEach((term) => {
        text += `${term.term}\n`;
        text += `必修绩点: ${term.averageGpaObligatory}\n`;
        text += `所有科目平均绩点: ${term.averageGpa}\n`;
        text += `必修成绩: ${term.averageGradeObligatory}\n`;
        text += `所有科目平均成绩: ${term.averageGrade}\n`;
        text += `总学分: ${term.sumCredit}\n`;
        text += `必修总学分: ${term.sumCreditObligatory}\n`;
        text += '\n';
        term.list.forEach((item) => {
          if (!isNaN(parseInt(item.grade, 10))) {
            text += `${item.courseName} [${item.courseProperty}]\n`;
            text += `${item.courseNumber}-${item.lessonNumber}\n`;
            text += `学分: ${item.credit}\n`;
            text += `成绩: ${item.grade}\n`;
            text += '\n';
          }
        });
        text += '\n';
      });
      // eslint-disable-next-line
      console.log('text: ', text);
      return '消息过长，无法显示 T_T';
    } catch (e) {
      return e.message;
    }
  },
  examination: async (openId, isBind) => {
    if (!isBind) {
      // 没有绑定
      return constants.WECHAT_NOT_BIND;
    }
    try {
      let text = '';
      const res = await examination.getExamination(openId);
      if (!res.success) {
        return res.message;
      }
      res.examination.forEach((item) => {
        text += `时间: ${item.date} ${item.time} (星期`;
        text += `课程: ${item.class}\n`;
        text += `地点: ${item.campus} ${item.teachingBuilding}\n`;
        text += `教室: ${item.classroom}\n`;
        text += `座位号: ${item.seatNumber}\n`;
        text += `第${item.weekNumber}周 ${item.week})\n`;
      });
      return text;
    } catch (e) {
      return e.message;
    }
  },
  /**
   * 解绑
   * @param  {String}  openId open id
   * @param  {Boolean} isBind is bind or not
   * @return {Promise}        reply message
   */
  unbind: async (openId, isBind) => {
    if (!isBind) {
      // 没有绑定
      return constants.WECHAT_NOT_BIND;
    }
    try {
      const res = await account.unbind(openId);
      if (res.success) {
        return '解绑成功！';
      }
      return res.message;
    } catch (e) {
      return e.message;
    }
  },
  /**
   * 绑定教务系统
   * @param  {String}  openId  open id
   * @param  {Boolean} isBind  is bind or not
   * @param  {String}  content user message
   * @return {Promise}         reply message
   */
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
  // eslint-disable-next-line
  console.log('message: ', message);
  const openId = message.FromUserName;
  const content = message.Content;

  // 判断是否已经绑定
  const isBind = await account.isBind(openId);
  const key = changeMessageTokey(content);
  if (Object.keys(handle).indexOf(key) !== -1) {
    return handle[key](openId, isBind, content);
  }
  return constants.WECHAT_DEFAULT;
};


module.exports = {
  middleware,
};
