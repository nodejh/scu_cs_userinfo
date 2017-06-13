const router = require('koa-router')();

const index = require('./index');
const mWechat = require('./mWechat');
const apiLogin = require('./apiLogin');


router.use('/', index.routes(), index.allowedMethods());
router.use('/mWechat', mWechat.routes(), mWechat.allowedMethods());
router.use('/api', apiLogin.routes(), apiLogin.allowedMethods());


module.exports = router;
