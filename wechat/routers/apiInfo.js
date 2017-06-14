const router = require('koa-router')();
const apiInfo = require('../controllers/apiInfo');


router.post('/info', apiInfo.updateInfo);


module.exports = router;
