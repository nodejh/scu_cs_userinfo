/**
 * 将收到的微信消息转换为对应的关键字
 * 以便程序判断回复什么类型的消息
 * @param  {String} message 微信消息
 * @return {String}         1|2|3|4|5|成绩|排名
 */
const changeMessageTokey = (message) => {
  const data = message.toString();
  if (data === '1') {
    return '1';
  }
  if (data === '2') {
    return '2';
  }
  if (data === '4' || data.indexOf('所有成绩') !== -1) {
    return 'allPassGrades';
  }
  if (data === '3' || data.indexOf('本学期成绩') !== -1 || data.indexOf('这学期成绩') !== -1 || data.indexOf('成绩') !== -1) {
    return 'currentTermGrade';
  }
  if (data === '5' || data.indexOf('考表') !== -1 || data.indexOf('考试') !== -1) {
    return 'examination';
  }
  if (data === 'unbind') {
    return 'unbind';
  }
  if (data.length <= 4 && data.indexOf('排名') !== -1) {
    return 'rank';
  }
  if (data.length <= 4 && data.indexOf('信息') !== -1) {
    return 'info';
  }
  if (data.indexOf('+') !== -1) {
    const numberAndPassword = data.split('+');
    const number = parseInt(numberAndPassword[0], 10);
    const password = numberAndPassword[1];
    if (number && password && number.toString().length === 13 && password.length > 4) {
      return 'bind';
    }
  }
  return '';
};


module.exports = changeMessageTokey;
