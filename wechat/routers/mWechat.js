/**
 * 微信网页路由
 */

const router = require('koa-router')();
const mWechat = require('../controllers/mWechat');


router.get('/info', mWechat.editInfoPage);
router.get('/login', mWechat.loginPage);

module.exports = router;
