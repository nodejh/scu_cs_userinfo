const crypto = require('crypto');
function sha1(str) {
  const md5sum = crypto.createHash('sha1');
  md5sum.update(str);
  const ciphertext = md5sum.digest('hex');
  return ciphertext;
}

const indexPage = async (ctx) => {
  const data = ctx.request.query;
  console.log('Request URL: ', data);
  const signature = data.signature;
  const timestamp = data.timestamp;
  const nonce = data.nonce;
  const echostr = data.echostr;
  const token = 'scu_cs';
  console.log('timestamp: ', timestamp);
  console.log('nonce: ', nonce);
  console.log('signature: ', signature);
    // 将 token/timestamp/nonce 三个参数进行字典序排序
  const tmpArr = [token, timestamp, nonce];
  const tmpStr = sha1(tmpArr.sort().join(''));
  console.log('Sha1 String: ', tmpStr);
    // 验证排序并加密后的字符串与 signature 是否相等
  if (tmpStr === signature) {
        // 原样返回echostr参数内容
    ctx.body = echostr;
    console.log('Check Success');
  } else {
    ctx.body = 'failed';
    console.log('Check Failed');
  }
};
module.exports = {
  indexPage,
};
