---
title: 15 响应式原理实现
author: 前端程序猿
tags:
  - javascript

categories:
  - 大前端
postImage: /images/javascript.webp
---

我们先来看一下响应式意味着什么？我们来看一段代码：

m 有一个初始化的值，有一段代码使用了这个值；那么在 m 有一个新的值时，这段代码可以自动重新执行；

<!-- more -->

## 什么是响应式？

```js
// let m = 100

// // 一段代码
// console.log(m)
// console.log(m * 2)
// console.log(m ** 2)
// console.log("Hello World")

// m = 200
```

上面的这样一种可以自动响应数据变量的代码机制，我们就称之为是响应式的。

那么我们再来看一下对象的响应式：

```js
// 对象的响应式
const obj = {
  name: 'why',
  age: 18,
}

const newName = obj.name
console.log('你好啊, 李银河')
console.log('Hello World')
console.log(obj.name) // 100行

obj.name = 'kobe'
```

![](./images/1.jpg)

## 响应式函数设计

首先，执行的代码中可能不止一行代码，所以我们可以将这些代码放到一个函数中：那么我们的问题就变成了，当数据发生变化时，自动去执行某一个函数；

![](./images/2.jpg)

但是有一个问题：在开发中我们是有很多的函数的，我们如何区分一个函数需要响应式，还是不需要响应式呢？

很明显，下面的函数中 foo 需要在 obj 的 name 发生变化时，重新执行，做出相应；

bar 函数是一个完全独立于 obj 的函数，它不需要执行任何响应式的操作；

## 响应式函数的实现 watchFn

但是我们怎么区分呢？

这个时候我们封装一个新的函数 watchFn；凡是传入到 watchFn 的函数，就是需要响应式的；其他默认定义的函数都是不需要响应式的；

```js
// 封装一个响应式的函数
let reactiveFns = []
function watchFn(fn) {
  reactiveFns.push(fn)
}

// 对象的响应式
const obj = {
  name: 'why',
  age: 18,
}

watchFn(function () {
  const newName = obj.name
  console.log('你好啊, 李银河')
  console.log('Hello World')
  console.log(obj.name) // 100行
})

watchFn(function () {
  console.log(obj.name, 'demo function -------')
})

function bar() {
  console.log('普通的其他函数')
  console.log('这个函数不需要有任何响应式')
}

obj.name = 'kobe'
reactiveFns.forEach((fn) => {
  fn()
})
```

## 响应式依赖的收集

目前我们收集的依赖是放到一个数组中来保存的，但是这里会存在数据管理的问题：

我们在实际开发中需要监听很多对象的响应式；这些对象需要监听的不只是一个属性，它们很多属性的变化，都会有对应的响应式函数；我们不可能在全局维护一大堆的数组来保存这些响应函数

所以我们要设计一个类，这个类用于管理某一个对象的某一个属性的所有响应式函数：相当于替代了原来的简单 reactiveFns 的数组；

```js
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify() {
    this.reactiveFns.forEach((fn) => {
      fn()
    })
  }
}

// 封装一个响应式的函数
const depend = new Depend()
function watchFn(fn) {
  depend.addDepend(fn)
}

// 对象的响应式
const obj = {
  name: 'why', // depend对象
  age: 18, // depend对象
}

watchFn(function () {
  const newName = obj.name
  console.log('你好啊, 李银河')
  console.log('Hello World')
  console.log(obj.name) // 100行
})

watchFn(function () {
  console.log(obj.name, 'demo function -------')
})

obj.name = 'kobe'
depend.notify()
```

## 监听对象的变化

那么我们接下来就可以通过之前学习的方式来监听对象的属性：

- 方式一：通过 Object.defineProperty 的方式（vue2 采用的方式）；
- 方式二：通过 new Proxy 的方式（vue3 采用的方式）；

我们这里先以 Proxy 的方式来监听：

```js
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify() {
    this.reactiveFns.forEach((fn) => {
      fn()
    })
  }
}

// 封装一个响应式的函数
const depend = new Depend()
function watchFn(fn) {
  depend.addDepend(fn)
}

// 对象的响应式
const obj = {
  name: 'why', // depend对象
  age: 18, // depend对象
}

// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    depend.notify()
  },
})

watchFn(function () {
  const newName = objProxy.name
  console.log('你好啊, 李银河')
  console.log('Hello World')
  console.log(objProxy.name) // 100行
})

watchFn(function () {
  console.log(objProxy.name, 'demo function -------')
})

watchFn(function () {
  console.log(objProxy.age, 'age 发生变化是需要执行的----1')
})

watchFn(function () {
  console.log(objProxy.age, 'age 发生变化是需要执行的----2')
})

objProxy.name = 'kobe'
objProxy.name = 'james'
objProxy.name = 'curry'

objProxy.age = 100
```

## 对象的依赖管理

我们目前是创建了一个 Depend 对象，用来管理对于 name 变化需要监听的响应函数：

但是实际开发中我们会有不同的对象，另外会有不同的属性需要管理；我们如何可以使用一种数据结构来管理不同对象的不同依赖关系呢？

在前面我们刚刚学习过 WeakMap，并且在学习 WeakMap 的时候我讲到了后面通过 WeakMap 如何管理这种响应式的数据依赖：

![](./images/3.jpg)

## 对象依赖管理的实现

我们可以写一个 getDepend 函数专门来管理这种依赖关系：

```js
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify() {
    this.reactiveFns.forEach((fn) => {
      fn()
    })
  }
}
// 封装一个获取depend函数
const targetMap = new WeakMap()
function getDepend(target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 根据key获取depend对象
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}

// 对象的响应式
const obj = {
  name: 'why', // depend对象
  age: 18, // depend对象
}

// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    // depend.notify()
    const depend = getDepend(target, key)
    depend.notify()
  },
})
```

## 正确的依赖收集

我们之前收集依赖的地方是在 watchFn 中：

但是这种收集依赖的方式我们根本不知道是哪一个 key 的哪一个 depend 需要收集依赖；你只能针对一个单独的 depend 对象来添加你的依赖对象；

那么正确的应该是在哪里收集呢？应该在我们调用了 Proxy 的 get 捕获器时,因为如果一个函数中使用了某个对象的 key，那么它应该被收集依赖；

```js
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify() {
    console.log(this.reactiveFns)
    this.reactiveFns.forEach((fn) => {
      fn()
    })
  }
}

// 封装一个响应式的函数
let activeReactiveFn = null
function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

// 封装一个获取depend函数
const targetMap = new WeakMap()
function getDepend(target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 根据key获取depend对象
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}

// 对象的响应式
const obj = {
  name: 'why', // depend对象
  age: 18, // depend对象
}

// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    // 根据target.key获取对应的depend
    const depend = getDepend(target, key)
    // 给depend对象中添加响应函数
    depend.addDepend(activeReactiveFn)

    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    // depend.notify()
    const depend = getDepend(target, key)
    depend.notify()
  },
})

watchFn(function () {
  console.log('-----第一个name函数开始------')
  console.log('你好啊, 李银河')
  console.log('Hello World')
  console.log(objProxy.name) // 100行
  console.log('-----第一个name函数结束------')
})

watchFn(function () {
  console.log(objProxy.name, 'demo function -------')
})

watchFn(function () {
  console.log(objProxy.age, 'age 发生变化是需要执行的----1')
})

watchFn(function () {
  console.log(objProxy.age, 'age 发生变化是需要执行的----2')
})

watchFn(function () {
  console.log(objProxy.name, '新函数')
  console.log(objProxy.age, '新函数')
})

console.log('------------------------------改变obj的name值')

objProxy.name = 'kobe'
```

## 对 Depend 重构

但是这里有两个问题：

- 问题一：如果函数中有用到两次 key，比如 name，那么这个函数会被收集两次；
- 问题二：我们并不希望将添加 reactiveFn 放到 get 中，以为它是属于 Dep 的行为；

所以我们需要对 Depend 类进行重构：

- 解决问题一的方法：不使用数组，而是使用 Set；
- 解决问题二的方法：添加一个新的方法，用于收集依赖；

```js
// 保存当前需要收集的响应式函数
let activeReactiveFn = null

/**
 * Depend优化:
 *  1> depend方法
 *  2> 使用Set来保存依赖函数, 而不是数组[]
 */

class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  // addDepend(reactiveFn) {
  //   this.reactiveFns.add(reactiveFn)
  // }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach((fn) => {
      fn()
    })
  }
}

// 封装一个响应式的函数
function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

// 封装一个获取depend函数
const targetMap = new WeakMap()
function getDepend(target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 根据key获取depend对象
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}

// 对象的响应式
const obj = {
  name: 'why', // depend对象
  age: 18, // depend对象
}

// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    // 根据target.key获取对应的depend
    const depend = getDepend(target, key)
    // 给depend对象中添加响应函数
    // depend.addDepend(activeReactiveFn)
    depend.depend()

    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    // depend.notify()
    const depend = getDepend(target, key)
    depend.notify()
  },
})

// watchFn
watchFn(() => {
  console.log(objProxy.name, '-------')
  console.log(objProxy.name, '+++++++')
})

objProxy.name = 'kobe'
```

## 创建响应式对象

我们目前的响应式是针对于 obj 一个对象的，我们可以创建出来一个函数，针对所有的对象都可以变成响应式对象：

```js
// 保存当前需要收集的响应式函数
let activeReactiveFn = null

/**
 * Depend优化:
 *  1> depend方法
 *  2> 使用Set来保存依赖函数, 而不是数组[]
 */

class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  // addDepend(reactiveFn) {
  //   this.reactiveFns.add(reactiveFn)
  // }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach((fn) => {
      fn()
    })
  }
}

// 封装一个响应式的函数
function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

// 封装一个获取depend函数
const targetMap = new WeakMap()
function getDepend(target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 根据key获取depend对象
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}

function reactive(obj) {
  return new Proxy(obj, {
    get: function (target, key, receiver) {
      // 根据target.key获取对应的depend
      const depend = getDepend(target, key)
      // 给depend对象中添加响应函数
      // depend.addDepend(activeReactiveFn)
      depend.depend()

      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)
      // depend.notify()
      const depend = getDepend(target, key)
      depend.notify()
    },
  })
}

// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = reactive({
  name: 'why', // depend对象
  age: 18, // depend对象
})

const infoProxy = reactive({
  address: '广州市',
  height: 1.88,
})

watchFn(() => {
  console.log(infoProxy.address)
})

infoProxy.address = '北京市'

const foo = reactive({
  name: 'foo',
})

watchFn(() => {
  console.log(foo.name)
})

foo.name = 'bar'
```

## Vue2 响应式原理

我们前面所实现的响应式的代码，其实就是 Vue3 中的响应式原理：

Vue3 主要是通过 Proxy 来监听数据的变化以及收集相关的依赖的；

Vue2 中通过我们前面学习过的 Object.defineProerty 的方式来实现对象属性的监听；

我们可以将 reactive 函数进行如下的重构：在传入对象时，我们可以遍历所有的 key，并且通过属性存储描述符来监听属性的获取和修改；在 setter 和 getter 方法中的逻辑和前面的 Proxy 是一致的；

```js
function reactive(obj) {
  // {name: "why", age: 18}
  // ES6之前, 使用Object.defineProperty
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get: function () {
        const depend = getDepend(obj, key)
        depend.depend()
        return value
      },
      set: function (newValue) {
        value = newValue
        const depend = getDepend(obj, key)
        depend.notify()
      },
    })
  })
  return obj
}
```
