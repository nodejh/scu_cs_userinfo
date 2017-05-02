/**
 * RESTFUL API 子路由
 */

const router = require('koa-router')();
const api = require('../controllers/api');
const upload = require('../controllers/upload');


router.get('/test', api.testPage);
router.post('/upload', upload.index);


module.exports = router;
