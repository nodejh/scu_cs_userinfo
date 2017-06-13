// const loginZhjw = require('./../crawler/loginZhjw');
// const fetchUserInfo = require('./../crawler/userInfo').fetchUserInfo;
const query = require('./../utils/mysql').query;
//
// /**
//  * 登陆并绑定教务系统
//  * @param  {object}  ctx context
//  * @return {Promise}     ctx.body
//  */
// const login = async (ctx) => {
//   let result;
//   try {
//     const { number, password } = ctx.request.body;
//     // console.log('ctx.body: ', ctx.body);
//     const cookies = await loginZhjw(number, password);
//     // console.log('cookies: ', cookies);
//     const userInfo = await fetchUserInfo(cookies);
//     // TODO openid
//     await query('insert into users set ? ', [userInfo]);
//     // console.log('userInfo: ', userInfo);
//     result = { success: true, message: 'login success' };
//   } catch (e) {
//     result = { success: false, message: e.message || '绑定教务系统失败，请重试' };
//   } finally {
//     ctx.body = result;
//   }
// };

const login = async (ctx) => {
  const result = { success: false, message: '登录失败，请重试' };
  try {
    const { number, password } = ctx.request.body;
    const sql = 'select id, password from users where number = ?';
    const users = await query(sql, [number]);

    if (users.length === 0) {
      // 没有绑定账号
      result.message = '请先到微信公众平台 Fuyeking 绑定账号后再登录';
      ctx.body = result;
      return false;
    }

    if (users[0].password !== password) {
      // 密码错误
      result.message = '密码错误';
      ctx.body = result;
      return false;
    }

    ctx.session.id = users[0].id;
    console.log('ctx.session: ', ctx.session);
    result.success = true;
    result.message = '登录成功';
    ctx.body = result;
    return true;
  } catch (e) {
    result.message = e.message || result.message;
    ctx.body = result;
    return false;
  }
};


const logout = async (ctx) => {
  ctx.session = null;
};


module.exports = {
  login,
  logout,
};
