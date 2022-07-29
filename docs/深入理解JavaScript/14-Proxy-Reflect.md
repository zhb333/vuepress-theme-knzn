---
title: 14 Proxy-Reflect vue2-vue3 响应式原理
author: 前端程序猿
tags:
  - javascript

categories:
  - 大前端
postImage: /images/javascript.webp
---

我们先来看一个需求：有一个对象，我们希望监听这个对象中的属性被设置或获取的过程

通过我们前面所学的知识，能不能做到这一点呢？其实是可以的，我们可以通过之前的属性描述符中的存储属性描述符来做到；

<!-- more -->

## 监听对象的操作

但是这样做有什么缺点呢？

首先，Object.defineProperty 设计的初衷，不是为了去监听拦截一个对象中所有的属性的。我们在定义某些属性的时候，初衷其实是定义普通的属性，但是后面我们强行将它变成了数据属性描述符。

其次，如果我们想监听更加丰富的操作，比如新增属性、删除属性，那么 Object.defineProperty 是无能为力的。

所以我们要知道，存储数据描述符设计的初衷并不是为了去监听一个完整的对象。

```js
const obj = {
  name: 'why',
  age: 18,
}

// Object.defineProperty(obj, "name", {
//   get: function() {
//     console.log("监听到obj对象的name属性被访问了")
//   },
//   set: function() {
//     console.log("监听到obj对象的name属性被设置值")
//   }
// })

Object.keys(obj).forEach((key) => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    get: function () {
      console.log(`监听到obj对象的${key}属性被访问了`)
      return value
    },
    set: function (newValue) {
      console.log(`监听到obj对象的${key}属性被设置值`)
      value = newValue
    },
  })
})

obj.name = 'kobe'
obj.age = 30

console.log(obj.name)
console.log(obj.age)

// 新增属性, 不会触发拦截操作
obj.height = 1.88
```

## Proxy 基本使用

在 ES6 中，新增了一个 Proxy 类，这个类从名字就可以看出来，是用于帮助我们创建一个代理的：也就是说，如果我们希望监听一个对象的相关操作，那么我们可以先创建一个代理对象（Proxy 对象）；之后对该对象的所有操作，都通过代理对象来完成，代理对象可以监听我们想要对原对象进行哪些操作；

首先，我们需要 new Proxy 对象，并且传入需要侦听的对象以及一个处理对象，可以称之为 handler；

```js
const p = new Proxy(target, handler)
```

其次，我们之后的操作都是直接对 Proxy 的操作，而不是原有的对象，因为我们需要在 handler 里面进行侦听；

## Proxy 的 set 和 get 捕获器

如果我们想要侦听某些具体的操作，那么就可以在 handler 中添加对应的捕捉器（Trap）：

set 和 get 分别对应的是函数类型；

set 函数有四个参数：

- target：目标对象（侦听的对象）；
- property：将被设置的属性 key；
- value：新属性值；
- receiver：调用的代理对象；

get 函数有三个参数：

- target：目标对象（侦听的对象）；
- property：被获取的属性 key；
- receiver：调用的代理对象；

```js
const obj = {
  name: 'why',
  age: 18,
}

const objProxy = new Proxy(obj, {
  // 获取值时的捕获器
  get: function (target, key) {
    console.log(`监听到对象的${key}属性被访问了`, target)
    return target[key]
  },

  // 设置值时的捕获器
  set: function (target, key, newValue) {
    console.log(`监听到对象的${key}属性被设置值`, target)
    target[key] = newValue
  },
})

console.log(objProxy.name)
console.log(objProxy.age)

objProxy.name = 'kobe'
objProxy.age = 30
```

## Proxy 所有捕获器

13 个捕获器分别是做什么的呢？

- handler.getPrototypeOf(): Object.getPrototypeOf 方法的捕捉器。
- handler.setPrototypeOf(): Reflect.setPrototypeOf 方法的捕捉器。
- handler.isExtensible(): Object.isExtensible 方法的捕捉器。
- handler.preventExtensions(): Object.preventExtensions 方法的捕捉器。
- handler.getOwnPropertyDescriptor(): Object.getOwnPropertyDescriptor 方法的捕捉器。
- handler.defineProperty(): Object.defineProperty 方法的捕捉器。
- handler.ownKeys(): Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
- handler.has(): in 操作符的捕捉器。
- handler.get(): 属性读取操作的捕捉器。
- handler.set(): 属性设置操作的捕捉器。
- handler.deleteProperty(): delete 操作符的捕捉器。
- handler.apply(): 函数调用操作的捕捉器。
- handler.construct(): new 操作符的捕捉器。

```js
const obj = {
  name: 'why', // 数据属性描述符
  age: 18,
}

// 变成一个访问属性描述符
// Object.defineProperty(obj, "name", {

// })

const objProxy = new Proxy(obj, {
  // 获取值时的捕获器
  get: function (target, key) {
    console.log(`监听到对象的${key}属性被访问了`, target)
    return target[key]
  },

  // 设置值时的捕获器
  set: function (target, key, newValue) {
    console.log(`监听到对象的${key}属性被设置值`, target)
    target[key] = newValue
  },

  // 监听in的捕获器
  has: function (target, key) {
    console.log(`监听到对象的${key}属性in操作`, target)
    return key in target
  },

  // 监听delete的捕获器
  deleteProperty: function (target, key) {
    console.log(`监听到对象的${key}属性delete操作`, target)
    delete target[key]
  },
})

// in操作符
console.log('name' in objProxy)

// delete操作
delete objProxy.name
```

## Proxy 的 construct 和 apply

我们看到捕捉器中还有 construct 和 apply，它们是应用于函数对象的：

```js
function foo() {}

const fooProxy = new Proxy(foo, {
  apply: function (target, thisArg, argArray) {
    console.log('对foo函数进行了apply调用')
    return target.apply(thisArg, argArray)
  },
  construct: function (target, argArray, newTarget) {
    console.log('对foo函数进行了new调用')
    return new target(...argArray)
  },
})

fooProxy.apply({}, ['abc', 'cba'])
new fooProxy('abc', 'cba')
```

## Reflect 的作用

Reflect 也是 ES6 新增的一个 API，它是一个对象，字面的意思是反射。

那么这个 Reflect 有什么用呢？

它主要提供了很多操作 JavaScript 对象的方法，有点像 Object 中操作对象的方法；

- 比如 Reflect.getPrototypeOf(target)类似于 Object.getPrototypeOf()；
- 比如 Reflect.defineProperty(target, propertyKey, attributes)类似于 Object.defineProperty()；

如果我们有 Object 可以做这些操作，那么为什么还需要有 Reflect 这样的新增对象呢？

这是因为在早期的 ECMA 规范中没有考虑到这种对 对象本身 的操作如何设计会更加规范，所以将这些 API 放到了 Object 上面；但是 Object 作为一个构造函数，这些操作实际上放到它身上并不合适；另外还包含一些类似于 in、delete 操作符，让 JS 看起来是会有一些奇怪；所以在 ES6 中新增了 Reflect，让我们这些操作都集中到了 Reflect 对象上；

Object 和 Reflect 对象之间的 API 关系，可以参考 MDN 文档: [比较 Reflect 和 Object 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods)

## Reflect 的常见方法

Reflect 中有哪些常见的方法呢？它和 Proxy 是一一对应的，也是 13 个：

- Reflect.getPrototypeOf(target): 类似于 Object.getPrototypeOf()。
- Reflect.setPrototypeOf(target, prototype): 设置对象原型的函数. 返回一个 Boolean， 如果更新成功，则返
  回 true。
- Reflect.isExtensible(target): 类似于 Object.isExtensible()
- Reflect.preventExtensions(target): 类似于 Object.preventExtensions()。返回一个 Boolean。
- Reflect.getOwnPropertyDescriptor(target, propertyKey): 类似于 Object.getOwnPropertyDescriptor()。如果对象中存在该属性，则返回对应的属性描述符, 否则返回 undefined.
- Reflect.defineProperty(target, propertyKey, attributes): 和 Object.defineProperty() 类似。如果设置成功就会返回 true
- Reflect.ownKeys(target): 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受 enumerable 影响).
- Reflect.has(target, propertyKey): 判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
- Reflect.get(target, propertyKey[, receiver]): 获取对象身上某个属性的值，类似于 target[name]。
- Reflect.set(target, propertyKey, value[, receiver]): 将值分配给属性的函数。返回一个 Boolean，如果更新成功，则返回 true。
- Reflect.deleteProperty(target, propertyKey): 作为函数的 delete 操作符，相当于执行 delete target[name]。
- Reflect.apply(target, thisArgument, argumentsList): 对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和
  Function.prototype.apply() 功能类似。
- Reflect.construct(target, argumentsList[, newTarget]): 对构造函数进行 new 操作，相当于执行 new target(...args)。

## Reflect 的使用

那么我们可以将之前 Proxy 案例中对原对象的操作，都修改为 Reflect 来操作：

```js
const obj = {
  name: 'why',
  age: 18,
}

const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    console.log('get---------')
    return Reflect.get(target, key)
  },
  set: function (target, key, newValue, receiver) {
    console.log('set---------')
    const result = Reflect.set(target, key, newValue)
    if (result) {
    } else {
    }
  },
})

objProxy.name = 'kobe'
console.log(objProxy.name)
```

## Receiver 的作用

我们发现在使用 getter、setter 的时候有一个 receiver 的参数，它的作用是什么呢？

如果我们的源对象（obj）有 setter、getter 的访问器属性，那么可以通过 receiver 来改变里面的 this；

```js
const obj = {
  _name: 'why',
  get name() {
    return this._name
  },
  set name(newValue) {
    this._name = newValue
  },
}

const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    // receiver是创建出来的代理对象
    console.log('get方法被访问--------', key, receiver)
    console.log(receiver === objProxy)
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, newValue, receiver) {
    console.log('set方法被访问--------', key)
    Reflect.set(target, key, newValue, receiver)
  },
})

console.log(objProxy.name)
objProxy.name = 'kobe'
```

## Reflect 的 construct

```js
function Student(name, age) {
  this.name = name
  this.age = age
}

function Teacher() {}

// const stu = new Student("why", 18)
// console.log(stu)
// console.log(stu.__proto__ === Student.prototype)

// 执行Student函数中的内容, 但是创建出来对象是Teacher对象
const teacher = Reflect.construct(Student, ['why', 18], Teacher)
console.log(teacher)
console.log(teacher.__proto__ === Teacher.prototype)
```
