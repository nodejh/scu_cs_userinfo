const loginZhjw = require('./../crawler/loginZhjw');
const fetchUserInfo = require('./../crawler/userInfo').fetchUserInfo;
const query = require('./../utils/mysql').query;

/**
 * 登陆并绑定教务系统
 * @param  {object}  ctx context
 * @return {Promise}     ctx.body
 */
const login = async (ctx) => {
  let result;
  try {
    const { number, password } = ctx.request.body;
    // console.log('ctx.body: ', ctx.body);
    const cookies = await loginZhjw(number, password);
    // console.log('cookies: ', cookies);
    const userInfo = await fetchUserInfo(cookies);
    // TODO openid
    await query('insert into user_info set ? ', [userInfo]);
    // console.log('userInfo: ', userInfo);
    result = { success: true, message: 'login success' };
  } catch (e) {
    result = { success: false, message: e.message || '绑定教务系统失败，请重试' };
  } finally {
    ctx.body = result;
  }
};


module.exports = {
  login,
};
