---
title: Koa 路由中间件原理及使用技巧
date: 2020-06-20 22:36:09
categories:
 - frontEnd
tags:
 - koa
 - nodejs
---

> 本文主要是为了介绍路由的作用，以及在 Koa 路由中间件的使用，一些高级用法，和实用技巧等

## 什么是路由？

- 处理不同的 `URL`
- 处理不同的 `HTTP` 方法 (`GET`、`POST`、`PUT`、`DELETE`、`PATCH`、`OPTIONS`)
- 解析 `URL` 上的参数

**于 `HTTP` 协议而言，路由可以理解为，根据不同的 `HTTP` 请求，返回不同的响应；**

如果没有路由会怎么样？请看下面的代码：

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'hello world'
})

app.listen(3000)
```

**通过 `Postman` 访问 `3000` 端口，无论是何种 `HTTP` 方法，还是不同的 `URL`  都将返回相同的内容**  

这种没有**路由**的`WEB`服务，几乎做不了什么有价值的事情


## 自定义 `Koa` 路由中间件

> 路由，最基本的功能就是可以处理不同的`URL`, 不同的 `HTTP`方法, 以及解析 `URL` 参数

### 处理不同的 `HTTP` 方法

```js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  if (ctx.method === 'GET') {
    ctx.body = 'GET 请求'
  } else if (ctx.method === 'POST') {
    ctx.body = 'POST 请求'
  } else if (ctx.method === 'PUT') {
    ctx.body = 'PUT 请求'
  } else if (ctx.method === 'DELETE') {
    ctx.body = 'DELETE 请求'
  }
})

app.listen(3000)
```

### 处理不同的 `URL`

```js
app.use(async ctx => {
  if (ctx.method === 'GET') {
    switch (ctx.url) {
      case '/': ctx.body = '首页'; break;
      case '/users': ctx.body = '用户列表'; break;
      case '/articles': ctx.body = '文章列表'; break;
      default: ctx.status = 404
    }
  }
})
```

### 解析 `URL` 参数

```js
app.use(async ctx => {
  if (ctx.method === 'GET') {
    // 根据用户 ID 获取用户信息
    if (/^\/users\/(\w+)$/.test(ctx.url)) {
      return ctx.body = `用户 ID 为： ${RegExp.$1}`
    }
    ctx.status = 404
  }
})
```

**上面的演示代码只是最最基本的路由概念，完整的路由逻辑实际需要考虑的情况更加复杂**

### 建议

> 一个优秀、优雅的程序，需要独立维护的代码越少越好，千万不要干重复造轮子的事情，生命有限！使用官方的中间件，或者其它第三方优秀的中间件，可以节省开发时间，提高开发效率！

## koa-router


### koa-router 的基本使用

#### 安装

```sh
yarn add koa-router
```

#### 基本使用

```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 处理不同的 HTTP 方法
router
  .get('/users', ctx => {
    ctx.body = '获取用户列表'
  })
  .post('/users', ctx => {
    ctx.body = '创建用户'
  })
  .put('/users/:id', ctx => {
    // 解析 URL 参数
    ctx.body = `更新 ID 为 ${ctx.params.id} 的用户`
  })
  .delete('/users/:id', ctx => {
    // 解析 URL 参数
    ctx.body = `删除 ID 为 ${ctx.params.id} 的用户`
  })

// 注册路由中间件
app.use(router.routes())

app.listen(3000)
```

### 路由前缀

> 配置 `koa-router` 的路由前缀，实现路由分类

```js {6,7}
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const articleRouter = new Router({ prefix: '/articles' }) // 文章接口
const userRouter = new Router({ prefix: '/users' }) // 用户接口

articleRouter.get('/', ctx => ctx.body = '文章列表')
userRouter.get('/', ctx => ctx.body = '用户列表')

app.use(articleRouter.routes())
app.use(userRouter.routes())

app.listen(3000)
```

### 使用 `koa-router` 的 `allowedMethods` 方法, 可以实现 `HTTP`的`OPTIONS`方法请求

> `OPTIONS` 请求可以检测接口所支持的请求方法

假如有如下代码，通过 userRouter.allowedMethods() 中间件，让 /users 接口实现 options 方法

```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const userRouter = new Router({ prefix: '/users' }) // 用户接口

userRouter.get('/', ctx => ctx.body = '用户列表')
userRouter.post('/', ctx => ctx.body = '创建用户')
userRouter.put('/:id', ctx => ctx.body = ctx.params.id)

// 使用了 userRouter.allowedMethods() 中间件，让 /users 接口实现 options 方法
app.use(userRouter.routes()).use(userRouter.allowedMethods())

app.listen(3000)
```

**使用 `postman` 测试 `OPOTIONS` 方法**  
![2020-03-23_013731.jpg](https://upload-images.jianshu.io/upload_images/12493822-850831c945d39971.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**响应头信息中的 `ALLOW` 字段中，显示了 `/users` 接口支持的 `HTTP` 方法有 `GET`、`POST`、`PUT`**  

**如果 `OPTIONS` 方法请求接口没有实现的 `HTTP` 方法，将会返回 `405` 的状态码**

![2020-03-23_014618.jpg](https://upload-images.jianshu.io/upload_images/12493822-0f20602897e0a0ae.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**如果 `OPTIONS` 方法请求 `HTTP` 不支持的方法，将会返回 `501` 的状态码**

![2020-03-23_014835.jpg](https://upload-images.jianshu.io/upload_images/12493822-042919241a6e96d5.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## koa 多路由注册的技巧

> 在实际的项目中，我们的接口是多种多样的，不可能在入口文件中定义全部路由

**创建 `routes` 文件夹，存放所有不同的路由接口**

├── routes (路由)  
│   └── articles.js   
│   └── users.js   
│   └── index.js   
│    
├── index.js (入口)   
│   
└── package.json  

```js
// routes/articles.js  

const Router = require('koa-router')
const router = new Router({ prefix: '/articles' })

router.get('/', ctx => ctx.body = '文章列表')

module.exports = router
```

```js
// routes/users.js  

const Router = require('koa-router')
const router = new Router({ prefix: '/users' })

router.get('/', ctx => ctx.body = '文章列表')

module.exports = router
```

```js
// routes/index.js  

const fs = require('fs');
module.exports = (app) => {
  // 使用 fs 模块自动读取并注册 routes 文件夹下所有路由接口
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') { return; }
    const route = require(`./${file}`);
    app.use(route.routes()).use(route.allowedMethods());
  });
}
```
```js
const Koa = require('koa');
const app = new Koa();
const routing = require('./routes');

// 一次性注册路由
routing(app)

app.listen(3000)
```