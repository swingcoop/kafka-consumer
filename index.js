require('dotenv').config();

const Koa = require('koa');
const app = new Koa();

const consumer = require('./lib/consumer.js');
consumer.run();

app.use(async ctx => {
  ctx.body = 'Ok';
});

app.listen(process.env.PORT || 5000);