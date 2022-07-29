---
title: 16 Promise 使用详解
author: 前端程序猿
tags:
  - javascript

categories:
  - 大前端
postImage: /images/javascript.webp
---

在 ES6 出来之后，有很多关于 Promise 的讲解、文章，也有很多经典的书籍讲解 Promise; 虽然等你学会 Promise 之后，会觉得 Promise 不过如此，但是在初次接触的时候都会觉得这个东西不好理解；

<!-- more -->

## 异步任务的处理

那么这里我从一个实际的例子来作为切入点：我们调用一个函数，这个函数中发送网络请求（我们可以用定时器来模拟）；如果发送网络请求成功了，那么告知调用者发送成功，并且将相关数据返回过去；如果发送网络请求失败了，那么告知调用者发送失败，并且告知错误信息；

```js
/**
 * 这种回调的方式有很多的弊端:
 *  1> 如果是我们自己封装的requestData,那么我们在封装的时候必须要自己设计好callback名称, 并且使用好
 *  2> 如果我们使用的是别人封装的requestData或者一些第三方库, 那么我们必须去看别人的源码或者文档, 才知道它这个函数需要怎么去获取到结果
 */

// request.js
function requestData(url, successCallback, failtureCallback) {
  // 模拟网络请求
  setTimeout(() => {
    // 拿到请求的结果
    // url传入的是coderwhy, 请求成功
    if (url === 'coderwhy') {
      // 成功
      let names = ['abc', 'cba', 'nba']
      successCallback(names)
    } else {
      // 否则请求失败
      // 失败
      let errMessage = '请求失败, url错误'
      failtureCallback(errMessage)
    }
  }, 3000)
}

// main.js
requestData(
  'kobe',
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(err)
  }
)

// 更规范/更好的方案 Promise承诺(规范好了所有的代码编写逻辑)
function requestData2() {
  return '承诺'
}

const chengnuo = requestData2()
```

## 什么是 Promise 呢？

在上面的解决方案中，我们确确实实可以解决请求函数得到结果之后，获取到对应的回调，但是它存在两个主要的
问题：

- 第一，我们需要自己来设计回调函数、回调函数的名称、回调函数的使用等；
- 第二，对于不同的人、不同的框架设计出来的方案是不同的，那么我们必须耐心去看别人的源码或者文档，以
  便可以理解它这个函数到底怎么用；

我们来看一下 Promise 的 API 是怎么样的：

Promise 是一个类，可以翻译成 承诺、许诺 、期约；当我们需要给予调用者一个承诺：待会儿我会给你回调数据时，就可以创建一个 Promise 的对象；

在通过 new 创建 Promise 对象时，我们需要传入一个回调函数，我们称之为 executor

- 这个回调函数会被立即执行，并且给传入另外两个回调函数 resolve、reject；
- 当我们调用 resolve 回调函数时，会执行 Promise 对象的 then 方法传入的回调函数；
- 当我们调用 reject 回调函数时，会执行 Promise 对象的 catch 方法传入的回调函数；

```js
function foo() {
  // Promise
  return new Promise((resolve, reject) => {
    resolve('success message')
    // reject("failture message")
  })
}

// main.js
const fooPromise = foo()
// then方法传入的回调函数两个回调函数:
// > 第一个回调函数, 会在Promise执行resolve函数时, 被回调
// > 第二个回调函数, 会在Promise执行reject函数时, 被回调
fooPromise.then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(err)
  }
)

// // catch方法传入的回调函数, 会在Promise执行reject函数时, 被回调
fooPromise.catch(() => {})

// 传入的这个函数, 被称之为 executor
// > resolve: 回调函数, 在成功时, 回调resolve函数
// >reject: 回调函数, 在失败时, 回调reject函数
// const promise = new Promise((resolve, reject) => {
//   // console.log("promise传入的函数被执行了")
//   // resolve()
//   reject()
// })

// promise.then(() => {

// })

// promise.catch(() => {

// })

// 钩子函数: hook
function foo(fn) {
  fn()
}

foo(() => {})
```

## Promise 的代码结构

我们来看一下 Promise 代码结构：

上面 Promise 使用过程，我们可以将它划分成三个状态：

- 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝；当执行 executor 中的代码时，处于该状态；
- 已兑现（fulfilled）: 意味着操作成功完成；执行了 resolve 时，处于该状态；
- 已拒绝（rejected）: 意味着操作失败；执行了 reject 时，处于该状态；

## Promise 重构请求

那么有了 Promise，我们就可以将之前的代码进行重构了：

```js
// request.js
function requestData(url) {
  // 异步请求的代码会被放入到executor中
  return new Promise((resolve, reject) => {
    // 模拟网络请求
    setTimeout(() => {
      // 拿到请求的结果
      // url传入的是coderwhy, 请求成功
      if (url === 'coderwhy') {
        // 成功
        let names = ['abc', 'cba', 'nba']
        resolve(names)
      } else {
        // 否则请求失败
        // 失败
        let errMessage = '请求失败, url错误'
        reject(errMessage)
      }
    }, 3000)
  })
}

// main.js
const promise = requestData('coderwhy')
promise.then(
  (res) => {
    console.log('请求成功:', res)
  },
  (err) => {
    console.log('请求失败:', err)
  }
)
```

## Executor

Executor 是在创建 Promise 时需要传入的一个回调函数，这个回调函数会被立即执行，并且传入两个参数：

通常我们会在 Executor 中确定我们的 Promise 状态：

- 通过 resolve，可以兑现（fulfilled）Promise 的状态，我们也可以称之为已决议（resolved）；
- 通过 reject，可以拒绝（reject）Promise 的状态；

这里需要注意：一旦状态被确定下来，Promise 的状态会被 锁死，该 Promise 的状态是不可更改的;

在我们调用 resolve 的时候，如果 resolve 传入的值本身不是一个 Promise，那么会将该 Promise 的状态变成 兑现（fulfilled）；

在之后我们去调用 reject 时，已经不会有任何的响应了（并不是这行代码不会执行，而是无法改变 Promise 状
态）；

```js
// const promise = new Promise((resolve, reject) => {

// })

// promise.then(res => {

// }, err => {

// })

// 完全等价于下面的代码
// 注意: Promise状态一旦确定下来, 那么就是不可更改的(锁定)
new Promise((resolve, reject) => {
  // pending状态: 待定/悬而未决的
  console.log('--------')
  reject() // 处于rejected状态(已拒绝状态)
  resolve() // 处于fulfilled状态(已敲定/兑现状态)
  console.log('++++++++++++')
}).then(
  (res) => {
    console.log('res:', res)
  },
  (err) => {
    console.log('err:', err)
  }
)

// err: undefined
```

## resolve 不同值的区别

- 情况一：如果 resolve 传入一个普通的值或者对象，那么这个值会作为 then 回调的参数；
- 情况二：如果 resolve 中传入的是另外一个 Promise，那么这个新 Promise 会决定原 Promise 的状态：
- 情况三：如果 resolve 中传入的是一个对象，并且这个对象有实现 then 方法，那么会执行该 then 方法，并且根据 then 方法的结果来决定 Promise 的状态：

```js
/**
 * resolve(参数)
 *  1> 普通的值或者对象  pending -> fulfilled
 *  2> 传入一个Promise
 *    那么当前的Promise的状态会由传入的Promise来决定
 *    相当于状态进行了移交
 *  3> 传入一个对象, 并且这个对象有实现then方法(并且这个对象是实现了thenable接口)
 *    那么也会执行该then方法, 并且又该then方法决定后续状态
 */

// 1.传入Promise的特殊情况
// const newPromise = new Promise((resolve, reject) => {
//   // resolve("aaaaaa")
//   reject("err message")
// })

// new Promise((resolve, reject) => {
//   // pending -> fulfilled
//   resolve(newPromise)
// }).then(res => {
//   console.log("res:", res)
// }, err => {
//   console.log("err:", err)
// })

// 2.传入一个对象, 这个兑现有then方法
new Promise((resolve, reject) => {
  // pending -> fulfilled
  const obj = {
    then: function (resolve, reject) {
      // resolve("resolve message")
      reject('reject message')
    },
  }
  resolve(obj)
}).then(
  (res) => {
    console.log('res:', res)
  },
  (err) => {
    console.log('err:', err)
  }
)

// eatable/runable
const obj = {
  eat: function () {},
  run: function () {},
}
```

## then 方法 – 接受两个参数

then 方法是 Promise 对象上的一个方法：它其实是放在 Promise 的原型上的 Promise.prototype.then

then 方法接受两个参数：

- fulfilled 的回调函数：当状态变成 fulfilled 时会回调的函数；
- reject 的回调函数：当状态变成 reject 时会回调的函数；

## then 方法 – 多次调用

一个 Promise 的 then 方法是可以被多次调用的：每次调用我们都可以传入对应的 fulfilled 回调；当 Promise 的状态变成 fulfilled 的时候，这些回调函数都会被执行；

## then 方法 – 返回值

then 方法本身是有返回值的，它的返回值是一个 Promise，所以我们可以进行如下的链式调用：但是 then 方法返回的 Promise 到底处于什么样的状态呢？

Promise 有三种状态，那么这个 Promise 处于什么状态呢？

当 then 方法中的回调函数本身在执行的时候，那么它处于 pending 状态；

当 then 方法中的回调函数返回一个结果时，那么它处于 fulfilled 状态，并且会将结果作为 resolve 的参数；

- 情况一：返回一个普通的值；
- 情况二：返回一个 Promise；
- 情况三：返回一个 thenable 值；

当 then 方法抛出一个异常时，那么它处于 reject 状态；

```js
// Promise有哪些对象方法
// console.log(Object.getOwnPropertyDescriptors(Promise.prototype))

const promise = new Promise((resolve, reject) => {
  resolve('hahaha')
})

// 1.同一个Promise可以被多次调用then方法
// 当我们的resolve方法被回调时, 所有的then方法传入的回调函数都会被调用
// promise.then(res => {
//   console.log("res1:", res)
// })

// promise.then(res => {
//   console.log("res2:", res)
// })

// promise.then(res => {
//   console.log("res3:", res)
// })

// 2.then方法传入的 "回调函数: 可以有返回值
// then方法本身也是有返回值的, 它的返回值是Promise

// 1> 如果我们返回的是一个普通值(数值/字符串/普通对象/undefined), 那么这个普通的值被作为一个新的Promise的resolve值
// promise.then(res => {
//   return "aaaaaa"
// }).then(res => {
//   console.log("res:", res)
//   return "bbbbbb"
// })

// 2> 如果我们返回的是一个Promise
// promise.then(res => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(111111)
//     }, 3000)
//   })
// }).then(res => {
//   console.log("res:", res)
// })

// 3> 如果返回的是一个对象, 并且该对象实现了thenable
promise
  .then((res) => {
    return {
      then: function (resolve, reject) {
        resolve(222222)
      },
    }
  })
  .then((res) => {
    console.log('res:', res)
  })
```

## catch 方法 – 多次调用

catch 方法也是 Promise 对象上的一个方法：它也是放在 Promise 的原型上的 Promise.prototype.catch

一个 Promise 的 catch 方法是可以被多次调用的：每次调用我们都可以传入对应的 reject 回调；当 Promise 的状态变成 reject 的时候，这些回调函数都会被执行；

## catch 方法 – 返回值

事实上 catch 方法也是会返回一个 Promise 对象的，所以 catch 方法后面我们可以继续调用 then 方法或者 catch 方法：

下面的代码，后续是 catch 中的 err2 打印，还是 then 中的 res 打印呢？

答案是 res 打印，这是因为 catch 传入的回调在执行完后，默认状态依然会是 fulfilled 的；

那么如果我们希望后续继续执行 catch，那么需要抛出一个异常：

```js
// const promise = new Promise((resolve, reject) => {
//   resolve()
//   // reject("rejected status")
//   // throw new Error("rejected status")
// })

// 1.当executor抛出异常时, 也是会调用错误(拒绝)捕获的回调函数的
// promise.then(undefined, err => {
//   console.log("err:", err)
//   console.log("----------")
// })

// 2.通过catch方法来传入错误(拒绝)捕获的回调函数
// promise/a+规范
// promise.catch(err => {
//   console.log("err:", err)
// })
// promise.then(res => {
//   // return new Promise((resolve, reject) => {
//   //   reject("then rejected status")
//   // })
//   throw new Error("error message")
// }).catch(err => {
//   console.log("err:", err)
// })

// 3.拒绝捕获的问题(前面课程)
// promise.then(res => {

// }, err => {
//   console.log("err:", err)
// })
// const promise = new Promise((resolve, reject) => {
//   reject("111111")
//   // resolve()
// })

// promise.then(res => {
// }).then(res => {
//   throw new Error("then error message")
// }).catch(err => {
//   console.log("err:", err)
// })

// promise.catch(err => {

// })

// 4.catch方法的返回值
const promise = new Promise((resolve, reject) => {
  reject('111111')
})

promise
  .then((res) => {
    console.log('res:', res)
  })
  .catch((err) => {
    console.log('err:', err)
    return 'catch return value'
  })
  .then((res) => {
    console.log('res result:', res)
  })
  .catch((err) => {
    console.log('err result:', err)
  })
```

## finally 方法

finally 是在 ES9（ES2018）中新增的一个特性：表示无论 Promise 对象无论变成 fulfilled 还是 reject 状态，最终都会被执行的代码。

finally 方法是不接收参数的，因为无论前面是 fulfilled 状态，还是 reject 状态，它都会执行。

```js
const promise = new Promise((resolve, reject) => {
  // resolve("resolve message")
  reject('reject message')
})

promise
  .then((res) => {
    console.log('res:', res)
  })
  .catch((err) => {
    console.log('err:', err)
  })
  .finally(() => {
    console.log('finally code execute')
  })
```

## resolve 方法

前面我们学习的 then、catch、finally 方法都属于 Promise 的实例方法，都是存放在 Promise 的 prototype 上的。下面我们再来学习一下 Promise 的类方法。

有时候我们已经有一个现成的内容了，希望将其转成 Promise 来使用，这个时候我们可以使用 Promise.resolve 方
法来完成。

Promise.resolve 的用法相当于 new Promise，并且执行 resolve 操作：

resolve 参数的形态：

- 情况一：参数是一个普通的值或者对象
- 情况二：参数本身是 Promise
- 情况三：参数是一个 thenable

```js
// 转成Promise对象
// function foo() {
//   const obj = { name: "why" }
//   return new Promise((resolve) => {
//     resolve(obj)
//   })
// }

// foo().then(res => {
//   console.log("res:", res)
// })

// 类方法Promise.resolve
// 1.普通的值
// const promise = Promise.resolve({ name: "why" })
// 相当于
// const promise2 = new Promise((resolve, reject) => {
//   resolve({ name: "why" })
// })

// 2.传入Promise
const promise = Promise.resolve(
  new Promise((resolve, reject) => {
    resolve('11111')
  })
)

promise.then((res) => {
  console.log('res:', res)
})

// 3.传入thenable对象
```

## reject 方法

reject 方法类似于 resolve 方法，只是会将 Promise 对象的状态设置为 reject 状态。

Promise.reject 的用法相当于 new Promise，只是会调用 reject：

Promise.reject 传入的参数无论是什么形态，都会直接作为 reject 状态的参数传递到 catch 的。

```js
// const promise = Promise.reject("rejected message")
// 相当于
// const promise2 = new Promsie((resolve, reject) => {
//   reject("rejected message")
// })

// 注意: 无论传入什么值都是一样的
const promise = Promise.reject(new Promise(() => {}))

promise
  .then((res) => {
    console.log('res:', res)
  })
  .catch((err) => {
    console.log('err:', err)
  })
```

## all 方法

另外一个类方法是 Promise.all：它的作用是将多个 Promise 包裹在一起形成一个新的 Promise；新的 Promise 状态由包裹的所有 Promise 共同决定：

当所有的 Promise 状态变成 fulfilled 状态时，新的 Promise 状态为 fulfilled，并且会将所有 Promise 的返回值 组成一个数组；

当有一个 Promise 状态为 reject 时，新的 Promise 状态为 reject，并且会将第一个 reject 的返回值作为参数；

```js
// 创建多个Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(11111)
  }, 1000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(22222)
  }, 2000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(33333)
  }, 3000)
})

// 需求: 所有的Promise都变成fulfilled时, 再拿到结果
// 意外: 在拿到所有结果之前, 有一个promise变成了rejected, 那么整个promise是rejected
Promise.all([p2, p1, p3, 'aaaa'])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log('err:', err)
  })
```

## allSettled 方法

all 方法有一个缺陷：当有其中一个 Promise 变成 reject 状态时，新 Promise 就会立即变成对应的 reject 状态。那么对于 resolved 的，以及依然处于 pending 状态的 Promise，我们是获取不到对应的结果的；

在 ES11（ES2020）中，添加了新的 API Promise.allSettled：

该方法会在所有的 Promise 都有结果（settled），无论是 fulfilled，还是 reject 时，才会有最终的状态；并且这个 Promise 的结果一定是 fulfilled 的；

我们来看一下打印的结果：allSettled 的结果是一个数组，数组中存放着每一个 Promise 的结果，并且是对应一个对象的；这个对象中包含 status 状态，以及对应的 value 值；

```js
// 创建多个Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(11111)
  }, 1000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(22222)
  }, 2000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(33333)
  }, 3000)
})

// allSettled
Promise.allSettled([p1, p2, p3])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
```

## race 方法

如果有一个 Promise 有了结果，我们就希望决定最终新 Promise 的状态，那么可以使用 race 方法：

race 是竞技、竞赛的意思，表示多个 Promise 相互竞争，谁先有结果，那么就使用谁的结果；

```js
// 创建多个Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(11111)
  }, 3000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(22222)
  }, 500)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(33333)
  }, 1000)
})

// race: 竞技/竞赛
// 只要有一个Promise变成fulfilled状态, 那么就结束
// 意外:
Promise.race([p1, p2, p3])
  .then((res) => {
    console.log('res:', res)
  })
  .catch((err) => {
    console.log('err:', err)
  })
```

## any 方法

any 方法是 ES12 中新增的方法，和 race 方法是类似的：any 方法会等到一个 fulfilled 状态，才会决定新 Promise 的状态；如果所有的 Promise 都是 reject 的，那么也会等到所有的 Promise 都变成 rejected 状态；

如果所有的 Promise 都是 reject 的，那么会报一个 AggregateError 的错误。

```js
// 创建多个Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(11111)
    reject(1111)
  }, 1000)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(22222)
  }, 500)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve(33333)
    reject(3333)
  }, 3000)
})

// any方法
Promise.any([p1, p2, p3])
  .then((res) => {
    console.log('res:', res)
  })
  .catch((err) => {
    console.log('err:', err.errors)
  })
```
