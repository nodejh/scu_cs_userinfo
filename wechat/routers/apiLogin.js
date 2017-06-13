const router = require('koa-router')();
const apiLogin = require('../controllers/apiLogin');


router.post('/login', apiLogin.login);
router.get('/logout', apiLogin.logout);

module.exports = router;
