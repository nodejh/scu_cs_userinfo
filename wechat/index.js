const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const wechat = require('co-wechat');
const { query } = require('./utils/mysql');

const config = require('./config/config');
const routers = require('./routers/routers');


const app = new Koa();


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

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

app.use(wechat(config.wechat.token).middleware(async (message) => {
  const number = parseInt(message.Content, 10);
  if (number) {
    // 根据 number 查询成绩
    const sql = 'select * from grade where number = ?';
    const res = await query(sql, [number]);
    if (res.length > 0) {
      // console.log('res: ', res);
      // number: 2013141223047,
      //   average_grade: 72.26,
      //   average_credit: 1.82,
      //   average_credit_grade: 55.97,
      //   ranking: 37
      return `学号:${res[0].number}\n` +
      `平均成绩:${res[0].average_grade} \n` +
      `平均学分绩点:${res[0].average_credit} \n` +
      `加权学分成绩:${res[0].average_credit_grade}\n` +
      `排名:${res[0].ranking}`;
    }
    return '学号不存在';
  }
  return '学号格式错误';
}));


// 监听启动端口
app.listen(config.port);
console.log(`the server is start at port ${config.port}`);
