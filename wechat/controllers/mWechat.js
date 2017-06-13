const query = require('./../utils/mysql').query;
const { FORM_INFO } = require('./../config/constants');

const editInfoPage = async (ctx) => {
  // 获取基本信息
  const { id } = ctx.session;
  if (!id) {
    await ctx.redirect('/mWechat/login');
    return true;
  }

  // 判断是否绑定
  const sqlUsers = 'select name,gender,number from users where id = ?';
  const users = await query(sqlUsers, [id]);
  const sql = 'select * from info where uid = ?';
  const infos = await query(sql, [id]);
  let info;
  if (infos.length > 0) {
    info = infos[0];
  } else {
    info = users[0] || {};
  }
  const form = {
    one: { name: '基本信息', data: [] }, // 基本信息
    two: { name: '家庭信息', data: [] }, // 家庭信息
    three: { name: '经济情况', data: [] }, // 经济情况
    four: { name: '学习情况', data: [] }, // 学习情况
  };
  const formInfo = {};
  Object.keys(FORM_INFO).forEach((item) => {
    formInfo[item] = FORM_INFO[item];
  });
  Object.keys(formInfo).forEach((item) => {
    if (info[item]) {
      formInfo[item].value = info[item];
    }
    if (formInfo[item].group === '基本信息') {
      form.one.data.push(formInfo[item]);
    } else if (formInfo[item].group === '家庭信息') {
      form.two.data.push(formInfo[item]);
    } else if (formInfo[item].group === '经济情况') {
      form.three.data.push(formInfo[item]);
    } else if (formInfo[item].group === '学习情况') {
      form.four.data.push(formInfo[item]);
    }
  });
  // console.log('form: ', form);
  // 合并 info
  await ctx.render('edit_info_wechat', {
    form,
  });
  return true;
};


const loginPage = async (ctx) => {
  await ctx.render('login_wechat');
};


module.exports = {
  editInfoPage,
  loginPage,
};
