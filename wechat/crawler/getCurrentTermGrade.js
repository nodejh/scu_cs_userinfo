const cheerio = require('cheerio');
const request = require('./../helper/request');
const log = require('./../helper/log');
const config = require('./../config/config');
const calculateGpa = require('./../helper/calculateGpa').calculateGpa;


/**
 * 获取本学期成绩
 * @param {string} cookie cookie
 * @returns {Promise} 查询正确时返回成绩列表 { gradesList, gpa }
 */
const getCurrentTermGrade = (cookie) => {
  const postData = '';
  const options = {
    host: config.zhjw.url.hostname,
    method: 'GET',
    path: config.zhjw.url.currentTermGrade,
    headers: {
      Cookie: cookie,
    },
  };
  return request(postData, options)
    .then((result) => {
      const successText = '本学期成绩查询列表';
      const dom = result.body;
      log.text('dom.indexOf(successText): ', dom.indexOf(successText));
      if (dom.indexOf(successText) !== -1) {
        const $ = cheerio.load(dom, {
          ignoreWhitespace: true,
          xmlMode: false,
          lowerCaseTags: false,
        });
        const $list = $('body').find('table[id="user"]').find('tr');
        const gradesList = [];
        // eslint-disable-line
        $list.each(function item(index) {
          if (index > 0 && index < $list.length - 1) {
            gradesList.push({
              // 课程号
              courseNumber: $(this).find('td').eq(0).text()
                .replace(/\s+/g, ''),
              // 课序号
              lessonNumber: $(this).find('td').eq(1).text()
                .replace(/\s+/g, ''),
              // 课程名
              courseName: $(this).find('td').eq(2).text()
                .replace(/(^\s+)|(\s+$)/g, ''),
              // 英文课程名
              courseEnglishName: $(this).find('td').eq(3).text()
                .replace(/(^\s+)|(\s+$)/g, ''),
              // 学分
              credit: $(this).find('td').eq(4).text()
                .replace(/\s+/g, ''),
              // 课程属性
              courseProperty: $(this).find('td').eq(5).text()
                .replace(/\s+/g, ''),
              // 成绩
              grade: $(this).find('td').eq(6).text()
                .replace(/\s+/g, ''),
            });
          }
        });
        log.info('gradesList: ', gradesList);
        const gpa = calculateGpa(gradesList);
        return Promise.resolve({ gradesList, gpa });
      }
      return Promise.reject(new Error('身份信息失效，请重新登录后再查看成绩'));
    })
    .catch((excepiton) => {
      log.error('获取成绩列表失败');
      log.error(excepiton);
      return Promise.reject(new Error('获取成绩列表失败'));
    });
};


module.exports = getCurrentTermGrade;
