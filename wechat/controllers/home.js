const crypto = require('crypto');
function sha1(str) {
  const md5sum = crypto.createHash('sha1');
  md5sum.update(str);
  const ciphertext = md5sum.digest('hex');
  return ciphertext;
}

const indexPage = async (ctx) =>{

};
module.exports = {
  indexPage,
};
