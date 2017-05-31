const router = require('koa-router')();
const apiLogin = require('../controllers/apiLogin');


router.post('/login', apiLogin.login);


module.exports = router;
