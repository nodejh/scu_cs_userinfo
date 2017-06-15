/**
 * RESTFUL API 子路由
 */

const router = require('koa-router')();
const api = require('../controllers/api');
const upload = require('../controllers/upload');
const { checkLoginAdminJson,checkNotLoginAdminJson}=require('./../utils/passport');

router.get('/grade', api.gradeList);
router.post('/upload', upload.index);
router.post('/login',checkNotLoginAdminJson);
router.post('/login',api.login);
router.post('/submit',api.submit)
module.exports = router;
