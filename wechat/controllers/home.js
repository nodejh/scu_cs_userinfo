const indexPage = async (ctx) => {
  const data = ctx.params;

    console.log('Request URL: ', data);
    const signature = data.signature;
    const timestamp = data.timestamp;
    const nonce = data.nonce;
    const echostr = data.echostr;
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
        res.end(echostr);
        console.log('Check Success');
    } else {
        res.end('failed');
        console.log('Check Failed');
    }
  const title = 'Home Page';

};


module.exports = {
  indexPage,
};
