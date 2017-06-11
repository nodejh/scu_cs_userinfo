
const query = require('./../utils/mysql').query;


const isBind = async (openId) => {
  const sql = 'select id from users where open_id = ?';
  const res = await query(sql, [openId]);
  if (res.length === 0) {
    return false;
  }
  return true;
};


module.export = {
  isBind,
};
