---
title: 07 深入 JS 面向对象 一
author: 前端程序猿
tags:
  - javascript

categories:
  - 大前端
postImage: /images/javascript.webp
---

对象是 JavaScript 中一个非常重要的概念，这是因为对象可以将多个相关联的数据封装到一起，更好的描述一个事物：

比如我们可以描述一辆车：Car，具有颜色（color）、速度（speed）、品牌（brand）、价格（price），行驶（travel）等
等；

比如我们可以描述一个人：Person，具有姓名（name）、年龄（age）、身高（height），吃东西（eat）、跑步（run）
等等；

<!-- more -->

## 面向对象是现实的抽象方式

用对象来描述事物，更有利于我们将现实的事物，抽离成代码中某个数据结构：

所以有一些编程语言就是纯面向对象的编程语言，比 Java；

你在实现任何现实抽象时都需要先创建一个类，根据类再去创建对象；

![面向对象是现实的抽象方式](./07-images/1.jpg)

## JavaScript 的面向对象

JavaScript 其实支持多种编程范式的，包括函数式编程和面向对象编程：

JavaScript 中的对象被设计成一组属性的无序集合，像是一个哈希表，有 key 和 value 组成；key 是一个标识符名称，value 可以是任意类型，也可以是其他对象或者函数类型；key 是一个标识符名称，value 可以是任意类型，也可以是其他对象或者函数类型；

如何创建一个对象呢？

早期使用创建对象的方式最多的是使用 Object 类，并且使用 new 关键字来创建一个对象：这是因为早期很多 JavaScript 开发者是从 Java 过来的，它们也更习惯于 Java 中通过 new 的方式创建一个对象； 后来很多开发者为了方便起见，都是直接通过字面量的形式来创建对象：这种形式看起来更加的简洁，并且对象和属性之间的内聚性也更强，所以这种方式后来就流行了起来；

## 创建对象的两种方式

创建方式一: 通过 new Object()创建

```js
var obj = new Object()
obj.name = 'why'
obj.age = 18
obj.height = 1.88
obj.running = function () {
  console.log(this.name + '在跑步~')
}
```

创建方式二: 字面量形式

```js
var info = {
  name: 'kobe',
  age: 40,
  height: 1.98,
  eating: function () {
    console.log(this.name + '在吃东西~')
  },
}
```

## 对属性操作的控制

在前面我们的属性都是直接定义在对象内部，或者直接添加到对象内部的：

但是这样来做的时候我们就不能对这个属性进行一些限制：比如这个属性是否是可以通过 delete 删除的？这个
属性是否在 for-in 遍历的时候被遍历出来呢？

```js
var obj = {
  name: 'why',
  age: 18,
}

// 获取属性
console.log(obj.name)

// 给属性赋值
obj.name = 'kobe'
console.log(obj.name)

// 删除属性
delete obj.name
console.log(obj)

// 遍历属性
for (var key in obj) {
  console.log(key)
}
```

如果我们想要对属性进行操作时, 进行一些限制，那么我们就可以使用属性描述符;

限制: 不允许某一个属性被赋值/不允许某个属性被删除/不允许某些属性在遍历时被遍历出来

通过属性描述符可以精准的添加或修改对象的属性；属性描述符需要使用 Object.defineProperty 来对属性进行添加或者修改；

## Object.defineProperty

Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此
对象。

```js
Object.defineProperty(obj, prop, descriptor)
```

可接收三个参数：

- obj 要定义属性的对象；
- prop 要定义或修改的属性的名称或 Symbol；
- descriptor 要定义或修改的属性描述符；

返回值：

- 被传递给函数的对象。

```js
var obj = {
  name: 'why',
  age: 18,
}

// 属性描述符是一个对象
Object.defineProperty(obj, 'height', {
  // 很多的配置
  value: 1.88,
})

console.log(obj)
console.log(obj.height)
```

## 属性描述符分类

属性描述符的类型有两种：

- 数据属性（Data Properties）描述符（Descriptor）；
- 存取属性（Accessor 访问器 Properties）描述符（Descriptor）；

|            | configurable | enumerable | value | writable | get | set |
| :--------: | :----------: | :--------: | :---: | :------: | :-: | :-: |
| 数据描述符 |     yes      |    yes     |  yes  |   yes    | no  | no  |
| 存取描述符 |     yes      |    yes     |  no   |    no    | yes | yes |

## 数据属性描述符

数据数据描述符有如下四个特性：

- [[Configurable]]：表示属性是否可以通过 delete 删除属性，是否可以修改它的特性，或者是否可以将它修改为存取属性
  描述符；
  - 当我们直接在一个对象上定义某个属性时，这个属性的[[Configurable]]为 true；
  - 当我们通过属性描述符定义一个属性时，这个属性的[[Configurable]]默认为 false；
- [[Enumerable]]：表示属性是否可以通过 for-in 或者 Object.keys()返回该属性；
  - 当我们直接在一个对象上定义某个属性时，这个属性的[[Enumerable]]为 true；
  - 当我们通过属性描述符定义一个属性时，这个属性的[[Enumerable]]默认为 false；
- [[Writable]]：表示是否可以修改属性的值；
  - 当我们直接在一个对象上定义某个属性时，这个属性的[[Writable]]为 true；
  - 当我们通过属性描述符定义一个属性时，这个属性的[[Writable]]默认为 false；
- [[value]]：属性的 value 值，读取属性时会返回该值，修改属性时，会对其进行修改；
  - 默认情况下这个值是 undefined；

```js
var obj = {
  name: 'why',
  age: 18,
}

// 数据属性描述符
// 用了属性描述符, 那么会有默认的特性
Object.defineProperty(obj, 'address', {
  // 很多配置
  value: '北京市', // 默认值undefined
  // 该特殊不可删除/也不可以重新定义属性描述符
  configurable: false, // 默认值false
  // // 该特殊是配置对应的属性(address)是否是可以枚举
  enumerable: true, // 默认值false
  // // 该特性是属性是否是可以赋值(写入值)
  writable: false, // 默认值false
})
```

## 数据属性描述符测试代码

测试 configurable 的作用

```js
delete obj.name
console.log(obj.name) // undefined
delete obj.address
console.log(obj.address) // 北京市
```

测试 enumerable 的作用

```js
for (var key in obj) {
  console.log(key)
}
console.log(Object.keys(obj)) // ['age', 'address']
```

测试 Writable 的作用

```js
obj.address = '上海市'
console.log(obj.address) // 北京市
```

## 存取属性描述符

隐藏某一个私有属性不希望直接被外界使用和赋值; 如果我们希望截获某一个属性访问和设置值的过程时, 也会使用存储属性描述符

数据数据描述符有如下四个特性：

- [[Configurable]]：表示属性是否可以通过 delete 删除属性，是否可以修改它的特性，或者是否可以将它修改为存取属性
  描述符；
  - 和数据属性描述符是一致的；
- [Enumerable]]：表示属性是否可以通过 for-in 或者 Object.keys()返回该属性；
  - 和数据属性描述符是一致的；
- [[get]]：获取属性时会执行的函数。默认为 undefined
- [[set]]：设置属性时会执行的函数。默认为 undefined

## 存储属性描述符测试代码

```js
Object.defineProperty(obj, 'address', {
  enumerable: true,
  configurable: true,
  get: function () {
    foo()
    return this._address
  },
  set: function (value) {
    bar()
    this._address = value
  },
})

console.log(obj.address)

obj.address = '上海市'
console.log(obj.address)

function foo() {
  console.log('获取了一次address的值')
}

function bar() {
  console.log('设置了addres的值')
}
```

直接在对象字面量上定义存取器

```js
var obj = {
  // 私有属性(js里面是没有严格意义的私有属性)
  _age: 18,
  set age(value) {
    this._age = value
  },
  get age() {
    return this._age
  },
}
```

## 同时定义多个属性

Object.defineProperties() 方法直接在一个对象上定义 多个 新的属性或修改现有属性，并且返回该对象。

```js
var obj = {
  _age: 18,
}
Object.defineProperties(obj, {
  name: {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'why',
  },
  age: {
    configurable: true,
    enumerable: true,
    get: function () {
      return this._age
    },
    set: function (value) {
      this._age = value
    },
  },
})
```

## 对象方法补充

获取对象的属性描述符：

- getOwnPropertyDescriptor
- getOwnPropertyDescriptors

```js
// 获取某一个特性属性的属性描述符
console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
console.log(Object.getOwnPropertyDescriptor(obj, 'age'))

// 获取对象的所有属性描述符
console.log(Object.getOwnPropertyDescriptors(obj))
```

- 禁止对象扩展新属性： preventExtensions

  - 给一个对象添加新的属性会失败（在严格模式下会报错）；

```js
var obj = {
  name: 'why',
  age: 18,
}

// 1.禁止对象继续添加新的属性
Object.preventExtensions(obj)

obj.height = 1.88
obj.address = '广州市'

console.log(obj) // {name: 'why', age: 18}
```

- 密封对象，不允许配置和删除属性： seal

  - 实际是调用 preventExtensions
  - 并且将现有属性的 configurable:false

```js
// 2.禁止对象配置/删除里面的属性 且禁止添加新属性

// for (var key in obj) {
//   Object.defineProperty(obj, key, {
//     configurable: false,
//     enumerable: true,
//     writable: true,
//     value: obj[key]
//   })
// }

Object.seal(obj)

delete obj.name
console.log(obj.name) // why
```

- 冻结对象，不允许修改现有属性： freeze
  - 实际上是调用 seal
  - 并且将现有属性的 writable: false

```js
// 3.让属性不可以修改(writable: false)
Object.freeze(obj)

obj.name = 'kobe'
console.log(obj.name)
```
