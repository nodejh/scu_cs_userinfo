const XLSX = require('xlsx');


/**
 * 读取 excel
 * @param {string} path excel文件的路径
 * @return {object} workbook
 */
function readXLSX(path) {
  return XLSX.readFile(path);
}


/**
 * 将 excel 文件的内容转换为 Object
 * @param {object} workbook 读取 excel 后的对象
 * @return {object} 转换后的对象
 */
function xlsxToObject(workbook) {
  const result = {};
  // 获取 Excel 中所有表名
  // const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
  // console.log('sheetNames: ', sheetNames);
  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
  });
  // console.log(`打印表信息 ${JSON.stringify(result, 2, 2)}`);  // 显示格式{"表1":[],"表2":[]}
  return result;
}


/**
 * 将 excel 文件的第一个 sheet 的内容转换为 Object
 * @param {object} workbook 读取 excel 后的对象
 * @return {object} 转换后的对象
 */
function xlsxSheetOneToObject(workbook) {
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(worksheet);
}


module.exports = {
  readXLSX,
  xlsxToObject,
  xlsxSheetOneToObject,
};
