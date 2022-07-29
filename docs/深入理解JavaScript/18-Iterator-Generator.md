---
title: 18 Iterator-Generator
author: 前端程序猿
tags:
  - javascript

categories:
  - 大前端
postImage: /images/javascript.webp
---

迭代器（iterator），是确使用户可在容器对象（container，例如链表或数组）上遍访的对象，使用该接口无需关心对象的内部实现细节。

<!-- more -->

## 什么是迭代器？

其行为像数据库中的光标，迭代器最早出现在 1974 年设计的 CLU 编程语言中；在各种编程语言的实现中，迭代器的实现方式各不相同，但是基本都有迭代器，比如 Java、Python 等；

从迭代器的定义我们可以看出来，迭代器是帮助我们对某个数据结构进行遍历的对象。

在 JavaScript 中，迭代器也是一个具体的对象，这个对象需要符合迭代器协议（iterator protocol）：

迭代器协议定义了产生一系列值（无论是有限还是无限个）的标准方式；在 js 中这个标准就是一个特定的 next 方法；

next 方法有如下的要求：一个无参数或者一个参数的函数，返回一个应当拥有以下两个属性的对象：

- done（boolean）
  - 如果迭代器可以产生序列中的下一个值，则为 false。
  - 如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
- value: 迭代器返回的任何 JavaScript 值。done 为 true 时可省略。

```js
// 编写的一个迭代器
const iterator = {
  next: function () {
    return { done: true, value: 123 }
  },
}

// 数组
const names = ['abc', 'cba', 'nba']

// 创建一个迭代器对象来访问数组
let index = 0

const namesIterator = {
  next: function () {
    if (index < names.length) {
      return { done: false, value: names[index++] }
    } else {
      return { done: true, value: undefined }
    }
  },
}

console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next()) // { done: false, value: "nba" }
console.log(namesIterator.next()) // { done: true, value: undefined }
```

## 迭代器的代码练习

```js
function createArrayIterator(arr) {
  let index = 0
  return {
    next: function () {
      if (index < arr.length) {
        return { done: false, value: arr[index++] }
      } else {
        return { done: true, value: undefined }
      }
    },
  }
}

const names = ['abc', 'cba', 'nba']
const nums = [10, 22, 33, 12]

const namesIterator = createArrayIterator(names)
const numsIterator = createArrayIterator(nums)
```

创建一个无限的迭代器

```js
function createNumberIterator() {
  let index = 0
  return {
    next: function () {
      return { done: false, value: index++ }
    },
  }
}
```

## 可迭代对象

但是上面的代码整体来说看起来是有点奇怪的：

我们获取一个数组的时候，需要自己创建一个 index 变量，再创建一个所谓的迭代器对象；事实上我们可以对上面的代码进行进一步的封装，让其变成一个可迭代对象；

什么又是可迭代对象呢？

它和迭代器是不同的概念；

当一个对象实现了 iterable protocol 协议时，它就是一个可迭代对象；这个对象的要求是必须实现 @@iterator 方法，在代码中我们使用 Symbol.iterator 访问该属性；

```js
// 创建一个迭代器对象来访问数组
const iterableObj = {
  names: ['abc', 'cba', 'nba'],
  [Symbol.iterator]: function () {
    let index = 0
    return {
      next: () => {
        if (index < this.names.length) {
          return { done: false, value: this.names[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },
    }
  },
}

const iterator = iterableObj[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
```

我们要问一个问题，我们转成这样的一个东西有什么好处呢？

当一个对象变成一个可迭代对象的时候，进行某些迭代操作，比如 for...of 操作时，其实就会调用它的
@@iterator 方法

```js
for (const item of iterableObj) {
  console.log(item)
}
```

## 原生迭代器对象

事实上我们平时创建的很多原生对象已经实现了可迭代协议，会生成一个迭代器对象的：String、Array、Map、Set、arguments 对象、NodeList 集合；

```js
const names = ['abc', 'cba', 'nba']
console.log(names[Symbol.iterator])

// const iterator1 = names[Symbol.iterator]()
// console.log(iterator1.next())
// console.log(iterator1.next())
// console.log(iterator1.next())
// console.log(iterator1.next())

for (const item of names) {
  console.log(item)
}

// Map/Set
const set = new Set()
set.add(10)
set.add(100)
set.add(1000)

console.log(set[Symbol.iterator])

for (const item of set) {
  console.log(item)
}

// 函数中arguments也是一个可迭代对象
function foo(x, y, z) {
  console.log(arguments[Symbol.iterator])
  for (const arg of arguments) {
    console.log(arg)
  }
}

foo(10, 20, 30)
```

## 可迭代对象的应用

那么这些东西可以被用在哪里呢？

- JavaScript 中语法：for ...of、展开语法（spread syntax）、yield\*（后面讲）、解构赋值（Destructuring_assignment）；
- 创建一些对象时：new Map([Iterable])、new WeakMap([iterable])、new Set([iterable])、new WeakSet([iterable]);
- 一些方法的调用：Promise.all(iterable)、Promise.race(iterable)、Array.from(iterable);

```js
// 1.for of场景

// 2.展开语法(spread syntax)
const iterableObj = {
  names: ['abc', 'cba', 'nba'],
  [Symbol.iterator]: function () {
    let index = 0
    return {
      next: () => {
        if (index < this.names.length) {
          return { done: false, value: this.names[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },
    }
  },
}

const names = ['abc', 'cba', 'nba']
const newNames = [...names, ...iterableObj]
console.log(newNames)

const obj = { name: 'why', age: 18 }
// for (const item of obj) {

// }
// ES9(ES2018)中新增的一个特性: 用的不是迭代器
const newObj = { ...obj }
console.log(newObj)

// 3.解构语法
const [name1, name2] = names
// const { name, age } = obj 不一样ES9新增的特性

// 4.创建一些其他对象时
const set1 = new Set(iterableObj)
const set2 = new Set(names)

const arr1 = Array.from(iterableObj)

// 5.Promise.all
Promise.all(iterableObj).then((res) => {
  console.log(res)
})
```

## 自定义类的迭代

在前面我们看到 Array、Set、String、Map 等类创建出来的对象都是可迭代对象：

在面向对象开发中，我们可以通过 class 定义一个自己的类，这个类可以创建很多的对象：如果我们也希望自己的类创建出来的对象默认是可迭代的，那么在设计类的时候我们就可以添加上@@iterator 方法；

案例：创建一个 classroom 的类

- 教室中有自己的位置、名称、当前教室的学生；
- 这个教室可以进来新学生（push）；
- 创建的教室对象是可迭代对象；

## 自定义类的迭代实现

迭代器在某些情况下会在没有完全迭代的情况下中断：

比如遍历的过程中通过 break、continue、return、throw 中断了循环操作；在解构的时候，没有解构所有的值；

那么这个时候我们想要监听中断的话，可以添加 return 方法：

```js
// 案例: 创建一个教室类, 创建出来的对象都是可迭代对象
class Classroom {
  constructor(address, name, students) {
    this.address = address
    this.name = name
    this.students = students
  }

  entry(newStudent) {
    this.students.push(newStudent)
  }

  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.students.length) {
          return { done: false, value: this.students[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },
      return: () => {
        console.log('迭代器提前终止了~')
        return { done: true, value: undefined }
      },
    }
  }
}

const classroom = new Classroom('3幢5楼205', '计算机教室', [
  'james',
  'kobe',
  'curry',
  'why',
])
classroom.entry('lilei')

for (const stu of classroom) {
  console.log(stu)
  if (stu === 'why') break
}
```

## 什么是生成器？

生成器是 ES6 中新增的一种函数控制、使用的方案，它可以让我们更加灵活的控制函数什么时候继续执行、暂停执
行等。

平时我们会编写很多的函数，这些函数终止的条件通常是返回值或者发生了异常。

生成器函数也是一个函数，但是和普通的函数有一些区别：

- 首先，生成器函数需要在 function 的后面加一个符号：`*`
- 其次，生成器函数可以通过 yield 关键字来控制函数的执行流程：
- 最后，生成器函数的返回值是一个 Generator（生成器）：生成器事实上是一种特殊的迭代器；

```js
function* foo() {
  console.log('函数开始执行~')

  const value1 = 100
  console.log('第一段代码:', value1)
  yield

  const value2 = 200
  console.log('第二段代码:', value2)
  yield

  const value3 = 300
  console.log('第三段代码:', value3)
  yield

  console.log('函数执行结束~')
}

// 调用生成器函数时, 会给我们返回一个生成器对象
const generator = foo()

// 开始执行第一段代码
generator.next()

// 开始执行第二端代码
console.log('-------------')
generator.next()
generator.next()
console.log('----------')
generator.next()
```

## 生成器函数执行

我们发现上面的生成器函数 foo 的执行体压根没有执行，它只是返回了一个生成器对象。

那么我们如何可以让它执行函数中的东西呢？调用 next 即可；我们之前学习迭代器时，知道迭代器的 next 是会有返回值的；但是我们很多时候不希望 next 返回的是一个 undefined，这个时候我们可以通过 yield 来返回结果；

```js
// 当遇到yield时候值暂停函数的执行
// 当遇到return时候生成器就停止执行
function* foo() {
  console.log('函数开始执行~')

  const value1 = 100
  console.log('第一段代码:', value1)
  yield value1

  const value2 = 200
  console.log('第二段代码:', value2)
  yield value2

  const value3 = 300
  console.log('第三段代码:', value3)
  yield value3

  console.log('函数执行结束~')
  return '123'
}

// generator本质上是一个特殊的iterator
const generator = foo()
console.log('返回值1:', generator.next())
console.log('返回值2:', generator.next())
console.log('返回值3:', generator.next())
console.log('返回值3:', generator.next())
```

## 生成器传递参数 – next 函数

函数既然可以暂停来分段执行，那么函数应该是可以传递参数的，我们是否可以给每个分段来传递参数呢？答案是可以的；

- 我们在调用 next 函数的时候，可以给它传递参数，那么这个参数会作为上一个 yield 语句的返回值；
- 注意：也就是说我们是为本次的函数代码块执行提供了一个值；

```js
function* foo(num) {
  console.log('函数开始执行~')

  const value1 = 100 * num
  console.log('第一段代码:', value1)
  const n = yield value1

  const value2 = 200 * n
  console.log('第二段代码:', value2)
  const count = yield value2

  const value3 = 300 * count
  console.log('第三段代码:', value3)
  yield value3

  console.log('函数执行结束~')
  return '123'
}

// 生成器上的next方法可以传递参数
const generator = foo(5)
console.log(generator.next())
// 第二段代码, 第二次调用next的时候执行的
console.log(generator.next(10))
console.log(generator.next(25))
```

## 生成器提前结束 – return 函数

还有一个可以给生成器函数传递参数的方法是通过 return 函数：return 传值后这个生成器函数就会结束，之后调用 next 不会继续生成值了；

## 生成器抛出异常 – throw 函数

除了给生成器函数内部传递参数之外，也可以给生成器函数内部抛出异常：

抛出异常后我们可以在生成器函数中捕获异常；

但是在 catch 语句中不能继续 yield 新的值了，但是可以在 catch 语句外使用 yield 继续中断函数的执行；

## 生成器替代迭代器

我们发现生成器是一种特殊的迭代器，那么在某些情况下我们可以使用生成器来替代迭代器：

事实上我们还可以使用 `yield*`来生产一个可迭代对象：

这个时候相当于是一种 yield 的语法糖，只不过会依次迭代这个可迭代对象，每次迭代其中的一个值；

## 自定义类迭代 – 生成器实现

在之前的自定义类迭代中，我们也可以换成生成器：

## 对生成器的操作

既然生成器是一个迭代器，那么我们可以对其进行如下的操作：

## 异步处理方案

学完了我们前面的 Promise、生成器等，我们目前来看一下异步代码的最终处理方案。

需求：

- 我们需要向服务器发送网络请求获取数据，一共需要发送三次请求；
- 第二次的请求 url 依赖于第一次的结果；
- 第三次的请求 url 依赖于第二次的结果；
- 依次类推；

## Generator 方案

但是上面的代码其实看起来也是阅读性比较差的，有没有办法可以继续来对上面的代码进行优化呢？

## 自动执行 generator 函数

目前我们的写法有两个问题：

- 第一，我们不能确定到底需要调用几层的 Promise 关系；
- 第二，如果还有其他需要这样执行的函数，我们应该如何操作呢？

所以，我们可以封装一个工具函数 execGenerator 自动执行生成器函数：
