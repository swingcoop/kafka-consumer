const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Ok';
});

app.listen(process.env.PORT || 5000);