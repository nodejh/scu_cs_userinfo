const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const wechat = require('co-wechat');
const session = require('koa-generic-session');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/config');
const routers = require('./routers/routers');
const { middleware } = require('./controllers/wechat');

const app = new Koa();

const THIRTY_MINTUES = 30 * 60 * 1000;

app.keys = ['my-session-secret'];
app.use(session({
  store: new MysqlStore(config.mysql),
  rolling: true,
  cookie: {
    maxage: THIRTY_MINTUES,
  },
}));

// 配置控制台日志中间件
app.use(logger());

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, './static')));


// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs',
}));

// test
// const a = async () => {
//   // eslint-disable-next-line
//   const account = require('./controllers/account.js');
//   const bindResult = await account.bind('x', 2013141223047, 273915);
//   console.log('bindResult: ', bindResult);
// };
// a();

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());
app.use(wechat(config.wechat.token).middleware(middleware));


// 监听启动端口
app.listen(config.port);
// eslint-disable-next-line
console.log(`the server is start at port ${config.port}`);
