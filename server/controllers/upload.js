const path = require('path');
const { query } = require('./../utils/mysql');
const { uploadFile } = require('./../utils/upload');
const { readXLSX, xlsxSheetOneToObject } = require('./../utils/xlsx');

const index = async (ctx) => {
  const result = { success: false };
  try {
    const serverFilePath = path.join(__dirname, './../upload-files');
    // 上传文件
    const uploadRes = await uploadFile(ctx, {
      fileType: 'common',
      path: serverFilePath,
    });
 /*   const workbook = readXLSX(uploadRes.saveTo);
    const sheetObject = xlsxSheetOneToObject(workbook);
    const sql = 'INSERT INTO grade (number, average_grade, average_credit, average_credit_grade, ranking) VALUES ?';
    const values = sheetObject.map((item) => {
      const keys = Object.keys(item);
      return [
        parseInt(item[keys[1]].replace(/\s+/g, ''), 10),
        parseFloat(item[keys[2]].replace(/\s+/g, '')),
        parseFloat(item[keys[3]].replace(/\s+/g, '')),
        parseFloat(item[keys[4]].replace(/\s+/g, '')),
        parseInt(item[keys[5]].replace(/\s+/g, ''), 10),
      ];
    });
    await query(sql, [values]);*/
    if(uploadRes.success) {
        result.success = true;
        result.saveTo=uploadRes.saveTo;
    }
  } catch (e) {
    // console.log('e: ', e);
    result.error = e;
    result.message = e.message || '上传文件失败，请重试';
  } finally {
    console.log(result);
    ctx.body = result;
  }
};


module.exports = {
  index,
};
