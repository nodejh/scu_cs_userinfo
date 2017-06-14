const query = require('./../utils/mysql').query;


const updateInfo = async (ctx) => {
  const result = { success: false, message: '更新失败' };
  const { id } = ctx.session;
  if (!id) {
    result.message = '请您先登录！';
    ctx.body = result;
    return false;
  }
  try {
    const data = ctx.request.body;
    const sqlSelect = 'select uid from info where uid = ?';
    const infos = await query(sqlSelect, [id]);
    let sql = 'update info set ? where uid = ?';
    if (infos.length === 0) {
      sql = 'insert into info set ?';
      data.uid = id;
      await query(sql, [data]);
    } else {
      await query(sql, [data, id]);
    }
    result.success = true;
    result.message = '保存个人信息成功';
    ctx.body = result;
    return true;
  } catch (e) {
    console.log('e: ', e);
    result.message = e.message;
    ctx.body = result;
    return false;
  }
};


module.exports = {
  updateInfo,
};
