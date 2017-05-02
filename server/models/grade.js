const { query } = require('./../utils/mysql');

const insertMany = async (values) => {
  const sql = 'INSERT INTO grade (number, average_grade, average_credit, average_credit_grade) VALUES ?';
  const result = await query(sql, [values]);
  return result;
};


module.exports = {
  insertMany,
};
