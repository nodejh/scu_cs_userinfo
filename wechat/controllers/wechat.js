const constants = require('./../config/constants');
const account = require('./account');
const grade = require('./grade');
const changeMessageTokey = require('./../helper/changeMessageToKey');
const examination = require('./examination');

const handle = {
  1: (openId, isBind) => {
    if (!isBind) {
      // 没有绑定
      return constants.WECHAT_NOT_BIND;
    }
    return `点击此链接编辑个人信息：<a href="http://115.159.65.172:3333/mWechat/info?openId=${openId}">http://115.159.65.172:3333/mWechat/info</a>`;
  },
  2: openId => openId,
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
        text += `必修绩点必修绩点: ${term.averageGpaObligatory}\n`;
        text += `必修平均分必修绩点: ${term.averageGradeObligatory}\n`;
        text += `平均绩点必修绩点: ${term.averageGpa}\n`;
        text += `平均分必修绩点: ${term.averageGrade}\n`;
        // text += `总学分: ${term.sumCredit}\n`;
        // text += `必修总学分: ${term.sumCreditObligatory}\n`;
        text += '\n';
        // term.list.forEach((item) => {
        //   if (!isNaN(parseInt(item.grade, 10))) {
        //     text += `${item.courseName} [${item.courseProperty}]\n`;
        //     text += `${item.courseNumber}-${item.lessonNumber}\n`;
        //     text += `学分: ${item.credit}\n`;
        //     text += `成绩: ${item.grade}\n`;
        //     text += '\n';
        //   }
        // });
        text += '\n';
      });
      // eslint-disable-next-line
      console.log('text: ', text.length);
      // return '消息过长，无法显示 T_T';
      return text.substring(0, 1200);
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
      text += `共有 ${res.examination.length} 门考试\n`;
      res.examination.forEach((item) => {
        text += `${item.date} ${item.time}\n`;
        text += `${item.class}\n`;
        text += `${item.campus} ${item.teachingBuilding}\n`;
        text += `教室: ${item.classroom}\n`;
        text += `座位号: ${item.seatNumber}\n`;
        text += `第${item.weekNumber}周 星期${item.week}\n`;
        text += '\n';
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
  info: async (openId, isBind) => {
    if (!isBind) {
      return constants.WECHAT_NOT_BIND;
    }
    try {
      const res = await account.info(openId);
      if (res.success) {
        return '您的个人信息如下\n' +
          `姓名: ${res.info.name}\n` +
          `性别: ${res.info.gender}\n` +
          `年级: ${res.info.grade}\n` +
          `学院: ${res.info.college}\n` +
          `专业: ${res.info.major}`;
      }
      return res.message;
    } catch (e) {
      return e.message;
    }
  },
  // rank
  rank: async (openId, isBind) => {
    if (!isBind) {
      return constants.WECHAT_NOT_BIND;
    }
    try {
      const res = await account.rank(openId);
      console.log('res: ', res);
      if (res.success) {
        return '您的个人信息如下\n' +
          `学号: ${res.info.number}\n` +
          `排名: ${res.info.ranking}\n` +
          `平均成绩: ${res.info.average_grade}\n` +
          `绩点: ${res.info.average_credit}\n` +
          `加权学分成绩: ${res.info.average_credit_grade}`;
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
