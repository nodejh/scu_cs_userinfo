// 解析个人信息页面
const cheerio = require('cheerio');
const log = require('./../helper/log');
const config = require('./../config/config');
const request = require('./../helper/request');
const zhjwSpecialText = require('./zhjwSpecialText');

const website = config.zhjw;

const analyseUserInfo = (html) => {
  // console.log('html: ', html);
  const errSpecialText = zhjwSpecialText(html);
  // console.log('errSpecialText: ', errSpecialText);
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
  const userInfoTable = $('body').find('#tblView').eq(0);
  const userInfo = {
    name: $(userInfoTable).find('tr').eq(0).find('td')
      .eq(3)
      .text()
      .replace(/\s+/g, ''),
    gender: $(userInfoTable).find('tr').eq(3).find('td')
      .eq(1)
      .text()
      .replace(/\s+/g, ''),
    type: $(userInfoTable).find('tr').eq(3).find('td')
      .eq(3)
      .text()
      .replace(/\s+/g, ''), // 学生类别: 本科
    state: $(userInfoTable).find('tr').eq(4).find('td')
      .eq(3)
      .text()
      .replace(/\s+/g, ''), // 学籍状态: 在校
    college: $(userInfoTable).find('tr').eq(12).find('td')
      .eq(3)
      .text()
      .replace(/\s+/g, ''), // 学院
    major: $(userInfoTable).find('tr').eq(13).find('td')
      .eq(1)
      .text()
      .replace(/\s+/g, ''), // 专业
    grade: $(userInfoTable).find('tr').eq(14).find('td')
      .eq(1)
      .text()
      .replace(/\s+/g, ''), // 年级
  };
  // console.log('fetch: ', userInfo);
  return {
    error: null,
    userInfo,
  };
};


/**
 * 获取用户个人信息
 * @param  {string} cookie  登录后的 cookie 信息
 * @return {promise}        课表页面html
 */
const fetchUserInfo = (cookie) => {
  // console.log('cookie: ', cookie);
  const postData = '';
  const options = {
    host: website.url.hostname,
    method: 'GET',
    encoding: null,
    path: website.url.userInfo,
    headers: {
      Cookie: cookie,
      'User-Agent': config.crawler['User-Agent'],
    },
  };

  return request(postData, options)
    .then((result) => {
      // const body = result.body;
      // const content = iconv.decode(body, 'GBK');
      // console.log('body: ', body);
      // console.log('content: ', content);
      const userInfo = analyseUserInfo(result.body);
      // console.log('userInfo: ', userInfo);
      if (userInfo.error) {
        return Promise.reject(new Error(userInfo.error));
      }
      return Promise.resolve(userInfo.userInfo);
    })
      .catch((exception) => {
        log.error('登录教务系统失败');
        log.error(exception);
        return Promise.reject(exception);
      });
};


// const userInfo = async (cookie) => {
//   try {
//     const html = await fetchUserInfo(cookie);
//     const res = analyseUserInfo(html);
//     return res;
//   } catch (e) {
//     return {
//       error: e.message,
//     };
//   }
// };

const userInfo = cookie => fetchUserInfo(cookie)
    .then((html) => {
      const res = analyseUserInfo(html);
      if (res.error) {
        return Promise.reject(res.error);
      }
      return Promise.resolve(res.userInfo);
    })
    .catch(e => Promise.reject(e));

module.exports = {
  analyseUserInfo,
  fetchUserInfo,
  userInfo,
};
