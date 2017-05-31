const router = require('koa-router')();

const index = require('./index');
const apiLogin = require('./apiLogin');


router.use('/', index.routes(), index.allowedMethods());
router.use('/api', apiLogin.routes(), apiLogin.allowedMethods());


module.exports = router;
