const { query } = require('./../utils/mysql');


const gradeList = async (ctx) => {
  const result = { success: false };
  try {
    const sql = 'select * from grade';
    const list = await query(sql);
    result.success = true;
    result.list = list;
  } catch (e) {
    result.message(e.message || '查询成绩列表失败');
  } finally {
    ctx.body = result;
  }
};


module.exports = {
  gradeList,
};
