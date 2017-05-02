const path = require('path');
const { uploadFile } = require('./../utils/upload');


const index = async (ctx) => {
  const serverFilePath = path.join(__dirname, './../upload-files');
  const result = await uploadFile(ctx, {
    fileType: 'common',
    path: serverFilePath,
  });
  console.log('result: ', result);
  ctx.body = result;
  ctx.body = {
    success: true,
    data: {},
  };
};


module.exports = {
  index,
};
