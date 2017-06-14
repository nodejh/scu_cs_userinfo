const router = require('koa-router')();

const index = require('./index');
const mWechat = require('./mWechat');
const apiLogin = require('./apiLogin');
const apiInfo = require('./apiInfo');


router.use('/', index.routes(), index.allowedMethods());
router.use('/mWechat', mWechat.routes(), mWechat.allowedMethods());
router.use('/api', apiLogin.routes(), apiLogin.allowedMethods());
router.use('/api', apiInfo.routes(), apiInfo.allowedMethods());


module.exports = router;
