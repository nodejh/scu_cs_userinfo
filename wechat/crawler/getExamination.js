// 考表
const iconv = require('iconv-lite');
const config = require('./../config/config');
const request = require('./../helper/request');
const log = require('./../helper/log');
const zhjwSpecialText = require('./zhjwSpecialText');
const cheerio = require('cheerio');


const website = config.zhjw;


const analyseUserInfo = (html) => {
  // log.debug('html: ', html);
  const errSpecialText = zhjwSpecialText(html);
  log.debug('errSpecialText: ', errSpecialText);
  if (errSpecialText) {
    return {
      error: errSpecialText,
    };
  }
  const $ = cheerio.load(html, {
    ignoreWhitespace: true,
    xmlMode: false,
    lowerCaseTags: false,
  });
  const userInfoTable = $('body').find('#user').eq(1).find('tr');
  log.debug('userInfoTable.length: ', userInfoTable.length);
  const examination = [];
  userInfoTable.each((index, item) => {
    log.debug('index, item', index);
    if (index > 0) {
      const examinationItem = {
        campus: $(item).find('td').eq(1)
            .text()
            .replace(/\s+/g, ''), // 校区
        teachingBuilding: $(item).find('td').eq(2)
            .text()
            .replace(/\s+/g, ''), // 教学楼
        classroom: $(item).find('td').eq(3)
            .text()
            .replace(/\s+/g, ''), // 教室
        class: $(item).find('td').eq(4)
            .text()
            .replace(/\s+/g, ''), // 课程
        weekNumber: $(item).find('td').eq(5)
            .text()
            .replace(/\s+/g, ''), // 考试周次
        week: $(item).find('td').eq(6)
            .text()
            .replace(/\s+/g, ''), // 考试星期
        date: $(item).find('td').eq(7)
            .text()
            .replace(/\s+/g, ''), // 考试日期
        time: $(item).find('td').eq(8)
            .text()
            .replace(/\s+/g, ''), // 考试时间
        seatNumber: $(item).find('td').eq(9)
            .text()
            .replace(/\s+/g, ''), // 座位号
      };
      examination.push(examinationItem);
      log.debug('examinationItem', examinationItem);
    }
  });
  log.debug('fetch: ', { examination });
  return {
    error: null,
    examination,
  };
};

/**
 * 获取考表
 * @param  {string} cookie  登录后的 cookie 信息
 * @return {promise}        课表页面html
 */
const fetchExamination = (cookie) => {
  log.debug('cookie: ', cookie);
  return new Promise((resolve, reject) => {
    const options = {
      url: website.url.examination,
      encoding: null,
      headers: {
        Cookie: cookie,
        'User-Agent': config.crawler['User-Agent'],
      },
    };
    request(options, (error, response, body) => {
      if (error) {
        log.error('获取考表失败: ', error);
        reject({
          code: 1047,
          error: '获取考表失败',
          detail: error,
        });
      }
      log.debug('response.statusCode: ', response.statusCode);
      if (response.statusCode !== 200) {
        reject({
          code: 1048,
          error: '获取考表失败',
          detail: response,
        });
      }
      const content = iconv.decode(body, 'GBK');
      // log.debug('content: ', content);
      const examination = analyseUserInfo(content);
      console.log('examination: ', examination);
      resolve(examination);
    });
  });
};


module.exports = fetchExamination;
